import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";
import ConflictError from "interfaces/http/errors/ConflictError";
import { default as BaseRepository } from "base/repositories";

class AccessLogRepository extends BaseRepository {
  constructor({ models: { AccessLog }, currentUser }) {
    super({ Model: AccessLog });
    this.AccessLog = AccessLog;
    this.currentUser = currentUser;
  }

  async create(payload) {
    if (payload.email) {
      const existingAccessLog = await this.find({ description: payload.description }, undefined, {
        lean: true,
      });
      if (existingAccessLog) {
        throw new ConflictError("Access Log already exists");
      }
    }
    const newAccessLog = await this.createDoc({
      ...payload,
      created_by: this.currentUser._id,
    });
    return newAccessLog.getPublicFields();
  }

  async update(payload) {
    const existingAccessLog = await this.findById(payload._id, undefined, { lean: true });
    if (!existingAccessLog) {
      throw new ResourceNotFoundError("Access Log not found");
    }
    const newAccessLog = await this.findOneAndUpdate(
      {
        _id: payload._id,
      },
      { ...payload },
      { new: true }
    );
    return newAccessLog.getPublicFields();
  }

  async delete(payload) {
    const existingAccessLog = await this.findById(payload._id, undefined, { lean: true });
    if (!existingAccessLog) {
      throw new ResourceNotFoundError("Access Log not found");
    }
    const removeAccessLog = await this.findOneAndDelete({
      _id: payload._id,
    });
    return removeAccessLog.getPublicFields();
  }

  async get() {
    const existingAccessLogs = await this.find({}, undefined, { lean: true }, true);
    return existingAccessLogs;
  }

  async getOne(payload) {
    const existingAccessLog = await this.findById(payload._id, undefined, { lean: true });
    if (!existingAccessLog) {
      throw new ResourceNotFoundError("Access Log not found");
    }
    const getAccessLog = await this.find({ _id: payload._id }, undefined, {
      lean: true,
    });
    return getAccessLog;
  }
}

export default AccessLogRepository;
