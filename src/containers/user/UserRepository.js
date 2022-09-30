import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";
import ConflictError from "interfaces/http/errors/ConflictError";
import { default as BaseRepository } from "base/repositories";

class UserRepository extends BaseRepository {
  constructor({ models: { User }, currentUser }) {
    super({ Model: User });
    this.User = User;
    this.currentUser = currentUser;
  }

  async create(payload) {
    if (payload.email) {
      const existingUser = await this.find({ description: payload.description }, undefined, {
        lean: true,
      });
      if (existingUser) {
        throw new ConflictError("User already exists");
      }
    }
    const newUser = await this.createDoc({
      ...payload,
      created_by: this.currentUser._id,
    });
    return newUser.getPublicFields();
  }

  async update(payload) {
    const existingUser = await this.findById(payload._id, undefined, { lean: true });
    if (!existingUser) {
      throw new ResourceNotFoundError("User not found");
    }
    const newUser = await this.findOneAndUpdate(
      {
        _id: payload._id,
      },
      { ...payload },
      { new: true }
    );
    return newUser.getPublicFields();
  }

  async delete(payload) {
    const existingUser = await this.findById(payload._id, undefined, { lean: true });
    if (!existingUser) {
      throw new ResourceNotFoundError("User not found");
    }
    const removeUser = await this.findOneAndDelete({
      _id: payload._id,
    });
    return removeUser.getPublicFields();
  }

  async get() {
    const existingUsers = await this.find({}, undefined, { lean: true }, true);
    return existingUsers;
  }

  async getOne(payload) {
    const existingUser = await this.findById(payload._id, undefined, { lean: true });
    if (!existingUser) {
      throw new ResourceNotFoundError("User not found");
    }
    const getUser = await this.find({ _id: payload._id }, undefined, {
      lean: true,
    });
    return getUser;
  }
}

export default UserRepository;
