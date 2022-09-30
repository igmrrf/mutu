/**
 https://mongoosejs.com/docs/4.x/docs/advanced_schemas.html
 *A class method maps to a schema method, a static method maps to a schema static,
 and getters/setters map to virtuals.
*/
import randomatic from "randomatic";

class User {
  getPublicFields() {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
      email: this.email,
      username: this.username,
      email_verified: this.email_verified,
      account_verified: this.account_verified,
      verification_status: this.verification_status,
      isonboarded: this.isonboarded,
      _id: this._id,
      aud: this.aud,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  // generateUsername will now exist on the mongodb User model as a static method
  static async generateUsername(name) {
    const count = await this.countDocuments({ username: name });
    if (!count) {
      return name;
    }
    const randomDigit = Math.floor(1000 + Math.random() * 9000);
    return this.generateUsername(`${name}${randomDigit}`);
  }

  static async generateRandomPassword(name) {
    return randomatic("?", 8, { chars: name });
  }
}

export default User;
