import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";
import ConflictError from "interfaces/http/errors/ConflictError";
import { default as BaseRepository } from "base/repositories";

class ContractRepository extends BaseRepository {
  constructor({ models: { Contract }, currentUser }) {
    super({ Model: Contract });
    this.Contract = Contract;
    this.currentUser = currentUser;
  }

  async create(payload) {
    if (payload.email) {
      const existingContract = await this.find({ description: payload.description }, undefined, {
        lean: true,
      });
      if (existingContract) {
        throw new ConflictError("Contract already exists");
      }
    }
    const newContract = await this.createDoc({
      ...payload,
      created_by: this.currentUser._id,
    });
    return newContract.getPublicFields();
  }

  async update(payload) {
    const existingContract = await this.findById(payload._id, undefined, { lean: true });
    if (!existingContract) {
      throw new ResourceNotFoundError("Contract not found");
    }
    const newContract = await this.findOneAndUpdate(
      {
        _id: payload._id,
      },
      { ...payload },
      { new: true }
    );
    return newContract.getPublicFields();
  }

  async delete(payload) {
    const existingContract = await this.findById(payload._id, undefined, { lean: true });
    if (!existingContract) {
      throw new ResourceNotFoundError("Contract not found");
    }
    const removeContract = await this.findOneAndDelete({
      _id: payload._id,
    });
    return removeContract.getPublicFields();
  }

  async get() {
    const existingContracts = await this.find({}, undefined, { lean: true }, true);
    return existingContracts;
  }

  async getOne(payload) {
    const existingContract = await this.findById(payload._id, undefined, { lean: true });
    if (!existingContract) {
      throw new ResourceNotFoundError("Contract not found");
    }
    const getContract = await this.find({ _id: payload._id }, undefined, {
      lean: true,
    });
    return getContract;
  }
}

export default ContractRepository;
