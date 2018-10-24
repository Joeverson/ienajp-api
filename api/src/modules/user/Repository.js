import Schema from '../../db/schema';

export default class extends Schema {
  constructor() {
    super('users');
  }

  async existsEmail(user, update) {
    let sql = `SELECT 
                count(*) as COUNTER
              FROM 
                dashboard.users
              WHERE
                email = '${user.email}' `;

    if (update) {
      sql += ` AND id <> ${user.id}`;
    }
    const count = await this.count(sql);
    return (count > 0);
  }

  async isBlocked(id) {
    const result = await this.query(`select blocked from dashboard.users where id = ${id}`);
    return result[0].blocked;
  }

  /**
   * Metodo responsável por retornar o usuario atraves da matricula e do password
   * @param {String} matriculation 
   * @param {String} password
   * @return User 
   */
  async findByMatriculationAndPassword(matriculation, password) {
    const sql = `SELECT
                  *
                FROM
                  dashboard.users
                WHERE
                  matriculation = $1
                AND
                  password = $2`;

    const user = await this.query(sql, [matriculation, password]);

    return user[0];
  }

  async findByMatriculation(matriculation, id = null) {
    let sql = `SELECT
                  *
                FROM
                  dashboard.users
                WHERE
                  matriculation = $1`;
    
    if (id) {
      sql += ` AND id <> ${id}`;
    }
    
    const user = await this.query(sql, [matriculation]);

    return user[0];
  }

  /**
   * Metodo responsável por realizar a paginação
   * 
   * @param {int} pagePos 
   * @param {int} pageSize
   * @return {Array<User>} 
   */
  async paginate(pagePos, pageSize, order, orderBy) {
    const fields = ['id', 'email', 'name', 'matriculation', 'TO_CHAR(moment_created, \'DD/MM/YYYY HH24:MI\') as moment_created'];

    const users = await super.paginate(fields, pagePos, pageSize, order, orderBy);
    
    return users;
  }

  /**
   * Metodo responsável por encontrar pela coluna blocked através do parâmetro passado
   * 
   * @param {Boolean} isBlocked 
   * @return {Array<User>}
   */
  async findByBlocked(isBlocked) {
    const sql = `SELECT
                  id,
                  name
                FROM
                  dashboard.users
                WHERE
                  blocked = $1`;

    const user = await this.query(sql, [isBlocked]);

    return user;
  }

  async getByEmailAndPassword(email, doubleEncryptedPassword) {
    const sql = `
              SELECT 
                id, name, email, blocked, id_access_profile,
                blocked, matriculation
              FROM 
                dashboard.users
              WHERE
                email = '${email}' 
              AND
                password = '${doubleEncryptedPassword}';`;

    const res = await this.query(sql);
    return res;
  }
}
