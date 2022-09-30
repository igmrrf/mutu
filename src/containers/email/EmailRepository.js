import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";
import ConflictError from "interfaces/http/errors/ConflictError";
import { default as BaseRepository } from "base/repositories";

class EmailRepository extends BaseRepository {
  constructor({ models: { Email }, currentUser }) {
    super({ Model: Email });
    this.Email = Email;
    this.currentUser = currentUser;
  }

  async create(payload) {
    if (payload.email) {
      const existingEmail = await this.find({ description: payload.description }, undefined, {
        lean: true,
      });
      if (existingEmail) {
        throw new ConflictError("Email already exists");
      }
    }
    const newEmail = await this.createDoc({
      ...payload,
      created_by: this.currentUser._id,
    });
    return newEmail.getPublicFields();
  }

  async update(payload) {
    const existingEmail = await this.findById(payload._id, undefined, { lean: true });
    if (!existingEmail) {
      throw new ResourceNotFoundError("Email not found");
    }
    const newEmail = await this.findOneAndUpdate(
      {
        _id: payload._id,
      },
      { ...payload },
      { new: true }
    );
    return newEmail.getPublicFields();
  }

  async delete(payload) {
    const existingEmail = await this.findById(payload._id, undefined, { lean: true });
    if (!existingEmail) {
      throw new ResourceNotFoundError("Email not found");
    }
    const removeEmail = await this.findOneAndDelete({
      _id: payload._id,
    });
    return removeEmail.getPublicFields();
  }

  async get() {
    const existingEmails = await this.find({}, undefined, { lean: true }, true);
    return existingEmails;
  }

  async getOne(payload) {
    const existingEmail = await this.findById(payload._id, undefined, { lean: true });
    if (!existingEmail) {
      throw new ResourceNotFoundError("Email not found");
    }
    const getEmail = await this.find({ _id: payload._id }, undefined, {
      lean: true,
    });
    return getEmail;
  }
}

export default EmailRepository;
