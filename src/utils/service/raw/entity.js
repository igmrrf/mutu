module.exports = (name) => `/**
 https://mongoosejs.com/docs/4.x/docs/advanced_schemas.html
 *A class method maps to a schema method, a static method maps to a schema static,
 and getters/setters map to virtuals.
*/

class ${name} {
  getPublicFields() {
    return {
      
      created_by: this.created_by,
      _id: this._id,
      country_code: this.country_code,
      symbol: this.symbol,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default ${name};
`;
