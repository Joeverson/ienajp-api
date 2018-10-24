import logger from '../utils/logger';
import utilsDB from '../utils/db';
import pool from './database';
import DAOException from '../exceptions/DAOException';
import FacadeException from '../exceptions/FacadeException';
import _ from '../utils/validations';

const ALIASES = {
  ascending: 'ASC',
  descending: 'DESC'
};

/**
 *
 * the instance of module, you need say the table name
 * for dinamizar the class
 *
 */
export default class Schema {
  constructor(table) {
    this.table = table;
  }
  /**
   * method for insert anything data in tables
   *
   * os nomes dos json 'data' devem ser os nomes do campo do banco de dados
   * com isso facilita o insert, no caso o que passar ele vai inserir no db
   *
   */
  async insert(data) {
    const props = utilsDB.prepareParamsSql(data);
    const sql = `INSERT INTO DASHBOARD.${this.table} (${props.names}) VALUES (${props.ids}) RETURNING *`;
    try {
      const result = await pool.query(sql, props.data);
      
      return result.rows[0];
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }

  /**
   * update anything data in tables by id
   */
  async update(id, data) {
    const prepareSqlUpdate = utilsDB.prepareSqlUpdate(data);
    const sql = `UPDATE DASHBOARD.${this.table} SET ${prepareSqlUpdate.fields} WHERE ID = ${id} RETURNING *`;

    try {
      const result = await pool.query(sql, prepareSqlUpdate.data);
      return result.rows[0];
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }
  /**
   * delete anything data in tables by id
   * 
   * @param {Number} id 
   * @param {String} msgDependency 
   */
  async delete(id, msgDependency = null) {
    const sql = `DELETE FROM DASHBOARD.${this.table} WHERE id = $1 RETURNING *;`;

    try {
      if (await this.existsDependency(id)) {
        throw new FacadeException(1, msgDependency || 'message.deleteNotDependency');
      }

      const result = await pool.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      logger.error(err);
      
      if (err instanceof FacadeException) {
        throw err;
      }

      throw new DAOException(1, 'DAOException');
    }
  }
  /**
   * select especific data in anything tables by id
   */
  async find(id) {
    const sql = `select * from DASHBOARD.${this.table} where id = $1`;

    try {
      const result = await pool.query(sql, [id]);
      return result.rows;
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }

  /**
   * search anything data in tables by informations
   */
  async search(data, pagePos, pageSize) {
    const props = utilsDB.prepareParamsSql(data);

    const sqlBase = `SELECT * FROM DASHBOARD.${this.table} where ${props.dataBind}`;
    const sqlPaginator = (pageSize && pagePos) ? ` OFFSET ${(pagePos * pageSize)} LIMIT ${pageSize};` : '';

    try {
      const result = await pool.query((sqlBase + sqlPaginator), props.data);
      return result.rows;
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }

  /**
   * select all date of the table
   */
  async all(pagePos, pageSize) {
    const sqlBase = `SELECT * FROM DASHBOARD.${this.table} ORDER BY ID DESC`;
    const sqlPaginator = (pageSize && pagePos) ? ` OFFSET ${(pagePos * pageSize)} LIMIT ${pageSize};` : '';

    const result = await pool.query((sqlBase + sqlPaginator));

    return result.rows;
  }


  /**
   * search anything data in tables by informations
   */
  async paginate(fields, pagePos, pageSize, order = null, orderBy = null) {
    fields = fields.join(', ');

    const sqlBase = `
      SELECT ${fields}
      FROM DASHBOARD.${this.table}
      ${order !== null ? `ORDER BY ${orderBy} ${ALIASES[order]}` : 'ORDER BY ID DESC'}
    `;
    const sqlPaginator = (pageSize && pagePos) ? ` OFFSET ${(pagePos * pageSize)} LIMIT ${pageSize};` : '';

    try {
      const result = await pool.query((sqlBase + sqlPaginator));
      return result.rows;
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }
  /*
   * search anything data in tables by filter and paginate
   * 
   * Esse método faz a paginação considerando um texto como filtro e alguns
   * campos como filtráveis ("filterables" e "filter"). Esse método irá ver
   * quais dos campos filtraveis possuem ocorrência do texto em filtro.
   * 
   * O parâmetro cleanFilter é passado em casos onde a tabela possui colunas
   * com dados informados com formatação.
   */
  async paginateByFilter(
    fields,
    pagePos,
    pageSize,
    filterables,
    filter,
    order = null,
    orderBy = null
  ) {
    fields = fields.join(', ');

    /* 
     * strFilter é uma constante que serve para prevenir
     * casos em que o usuário informar aspa simples como:
     * d'agua. Sem isso a consulta retornará erro.
     */ 
    const strFilter = filter.replace(/'/g, "''");

    const sqlBase = `SELECT ${fields} FROM DASHBOARD.${this.table} `;

    const sqlFilter = filterables.map(filterable => `lower(${filterable}::text) like lower('${strFilter}%')`);

    const sqlOrder = `${order !== null ? `ORDER BY ${orderBy} ${ALIASES[order]}` : 'ORDER BY ID DESC'}`;
    /*
     * Caso cleanFilter seja informado as mesmas condições 
     * presentes em sqlFilter são aplicadas ao parâmetro cleanFilter
     */ 
    const sqlPaginator = (pageSize && pagePos) ? `WHERE ${sqlFilter.join(' OR ')} ${sqlOrder} OFFSET ${(pagePos * pageSize)} LIMIT ${pageSize};` : '';
    
    try {
      const result = await pool.query((sqlBase + sqlPaginator));
      return result.rows;
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }

  /**
   * you can create your query postgres with this method
   *
   * @param String sql for create querys
   * @param Array arrays of the params
   *
   */
  async query(sql, params) {
    // value default
    params = params || [];

    try {
      const result = await pool.query(sql, params);
      return result.rows;
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }
  /**
   * where id in ($1,$2,$3) query []
   *
   * get count of the table
   *
   */
  async count(sql) {
    sql = sql || `SELECT count(*) as counter FROM DASHBOARD.${this.table}`;

    try {
      const count = await pool.query(sql);
      if (_.isEmpty(count) || _.isEmpty(count.rows[0])
        || _.isEmpty(count.rows[0].counter)) {
        return -1;
      }
      return count.rows[0].counter;
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }


  async countCustom(filter, filterables) {
    try {
      if (filter === null) return this.count();
      /* 
       * strFilter é uma constante que serve para prevenir
       * casos em que o usuário informar aspa simples como:
       * d'agua. Sem isso a consulta retornará erro.
       */
      const strFilter = filter.replace(/'/g, "''");
      const sqlFilter = filter ? filterables.map(filterable => `lower(${filterable}::text) like lower('${strFilter}%')`) : [];
      const sql = `
      SELECT
        count(*) as COUNTER
      FROM
        dashboard.${this.table}
      ${filter ? `WHERE ${sqlFilter.join(' OR ')}` : ''}`;

      const count = await pool.query(sql);
      if (_.isEmpty(count) || _.isEmpty(count.rows[0])
        || _.isEmpty(count.rows[0].counter)) {
        return -1;
      }
      return count.rows[0].counter;
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }

  /**
   * search anything data in tables by informations with custom query
   */
  async paginateCustom(query, pagePos, pageSize) {
    const sqlBase = query;
    const sqlPaginator = (pageSize && pagePos) ? ` OFFSET ${(pagePos * pageSize)} LIMIT ${pageSize};` : '';

    try {
      const result = await pool.query((sqlBase + sqlPaginator));
      return result.rows;
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }
  /**
   * Metodo responsável por retornar a conexão do poll
   */
  async getConnect() {
    const connect = await pool.connect();

    return connect;
  }

  /**
   * Metodo responsável por trazer todos os registros de uma determinada tabela
   */
  async findAll() {
    const sql = `SELECT * FROM DASHBOARD.${this.table}`;

    const result = await this.query(sql);

    return result;
  }

  /**
   * Metodo responsável por limpar dados de uma tabela (DEVE SER USADO SOMENTE NOS TESTES)
   */
  async wipe() {
    const sql = 'SELECT DASHBOARD.wipe_db() as wd';

    const result = await this.query(sql);

    return result;
  }

  /**
   * Metodo responsável por verificar se existe um registro
   * no banco de dados na tabela e com o id informado
   */
  async exists(table, idValue) {
    if (_.isEmpty(table) || _.isEmpty(idValue)) {
      throw new DAOException(1, '[TABLE] and [ID VALUE] not found in exists() function');
    }

    try {
      const count =
        await this.count(`SELECT 
                            count(*) as counter 
                          FROM
                            DASHBOARD.${table}
                          WHERE
                            id = ${idValue}`);
      return count;
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }

  async insertCustom(data, tableName) {
    const props = utilsDB.prepareParamsSql(data);
    const sql = `INSERT INTO DASHBOARD.${tableName} (${props.names}) VALUES (${props.ids}) RETURNING *`;
    try {
      const result = await pool.query(sql, props.data);
      return result.rows[0];
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }

  /**
   * Método responsável por realizar consultas nas tabelas com dependência
   * e verificar a existencia de dados.
   * 
   * @param {Array} listDependency 
   * @param {Number} dependencyId 
   * 
   * @returns {Boolean}
   */
  async checkIfHasDependencies(listDependency, dependencyId) {
    const promises = [];
    listDependency.rows.forEach((dependency) => {
      promises.push(pool.query(`SELECT * FROM ${dependency.table_name} WHERE ${dependency.column_name} = ${dependencyId}`));
    });
    return Promise.all(promises).then((results) => {
      const res = results.filter(result => result.rows.length > 0);
      return !!res.length;
    });
  }
  
  /**
   * Método responsável por listar em quais tabelas existe 
   * uma "FK" referenciando a tabela atual, em seguida irá 
   * realizar consulta para confirmar ou não a existência de uma dependência.
   * 
   * @param {Number} id 
   * @returns {Boolean}
   */
  async existsDependency(id) {
    try {
      const sqlListDependency = `
      select
        rc.constraint_schema || '.' || tc.table_name as table_name,
        kcu.column_name
      from
        information_schema.referential_constraints as rc
      join information_schema.table_constraints as tc
          using(
          constraint_catalog,
          constraint_schema,
          constraint_name
        )
      join information_schema.key_column_usage as kcu
          using(
          constraint_catalog,
          constraint_schema,
          constraint_name
        )
      join information_schema.key_column_usage as ccu on
        (
          ccu.constraint_catalog = rc.unique_constraint_catalog
          and ccu.constraint_schema = rc.unique_constraint_schema
          and ccu.constraint_name = rc.unique_constraint_name
        )
      where
        ccu.table_schema = 'dashboard'
        and ccu.table_name = '${this.table}'
        and ccu.column_name = 'id'`;
  
      const listDependency = await pool.query(sqlListDependency);

      if (listDependency.rows.length > 0) {
        return this.checkIfHasDependencies(listDependency, id);
      }

      return false;
    } catch (err) {
      logger.error(err);
      throw new DAOException(1, 'DAOException');
    }
  }
}

