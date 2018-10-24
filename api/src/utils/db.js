import _ from 'lodash';
import validation from '../utils/validations';

export default {
  /**
   * methodo responsavel para poder preparar as informações
   * do sql que será inserido, ex: $1, $2, $3... apartir do
   * array
   * 
   * @param {Array} data
   * 
   * @return {JSON} json com os dados de index,fields, data onde cada um tem 
   * uma função simples e basica no retoro para 
   * 
   */
  prepareParamsSql(data) {
    const fieldsIds = [];
    const fieldsName = [];
    const fieldsData = [];
    const fieldsDataBind = [];
    let i = 1;

    // pegando todo o conteudo do array e separando pro fields(nome do campo), ids($1 $2), dado
    _.forEach(data, (v, field) => {
      const value = validation.isEmpty(v) ? null : v;

      fieldsIds.push(`$${i}`);
      fieldsName.push(field);
      fieldsData.push(value);
      fieldsDataBind.push(`${field}=$${i}`);
      i += 1;
    });

    return {
      ids: fieldsIds.join(', '),
      names: fieldsName.join(', '),
      data: fieldsData,
      dataBind: fieldsDataBind.join(' and ')
    };
  },
  prepareParamsSqlByArray(data, ids = 1) {
    const fieldsIds = [];
    const fieldsData = [];

    // pegando todo o conteudo do array e separando pro fields(nome do campo), ids($1 $2), dado
    _.forEach(data, (v) => {
      const value = validation.isEmpty(v) ? null : v;

      fieldsIds.push(`$${ids}`);
      fieldsData.push(value);
      ids += 1;
    });
    
    return {
      ids: fieldsIds.join(', '),
      data: fieldsData
    };
  },
  /**
   * Methodo responsavel por criar a query de update
   * onde é o campo e o dado qeu sera subistituido 
   * pela lib do psgres. ex: field1 = $1, field2 = $2
   * 
   */
  prepareSqlUpdate(fields) {
    const fieldsSql = [];
    const data = [];
    let index = 0;

    _.forEach(fields, (v, key) => {
      const value = validation.isEmpty(v) ? null : v;
      index += 1;

      data.push(value);
      fieldsSql.push(`${key}=$${index}`);
    });

    return {
      fields: fieldsSql.join(', '),
      data
    };
  }
};
