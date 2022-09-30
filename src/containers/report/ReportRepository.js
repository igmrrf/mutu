import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";
import ConflictError from "interfaces/http/errors/ConflictError";
import { default as BaseRepository } from "base/repositories";

class ReportRepository extends BaseRepository {
  constructor({ models: { Report }, currentUser }) {
    super({ Model: Report });
    this.Report = Report;
    this.currentUser = currentUser;
  }

  async create(payload) {
    if (payload.email) {
      const existingReport = await this.find({ description: payload.description }, undefined, {
        lean: true,
      });
      if (existingReport) {
        throw new ConflictError("Report already exists");
      }
    }
    const newReport = await this.createDoc({
      ...payload,
      created_by: this.currentUser._id,
    });
    return newReport.getPublicFields();
  }

  async update(payload) {
    const existingReport = await this.findById(payload._id, undefined, { lean: true });
    if (!existingReport) {
      throw new ResourceNotFoundError("Report not found");
    }
    const newReport = await this.findOneAndUpdate(
      {
        _id: payload._id,
      },
      { ...payload },
      { new: true }
    );
    return newReport.getPublicFields();
  }

  async delete(payload) {
    const existingReport = await this.findById(payload._id, undefined, { lean: true });
    if (!existingReport) {
      throw new ResourceNotFoundError("Report not found");
    }
    const removeReport = await this.findOneAndDelete({
      _id: payload._id,
    });
    return removeReport.getPublicFields();
  }

  async get() {
    const existingReports = await this.find({}, undefined, { lean: true }, true);
    return existingReports;
  }

  async getOne(payload) {
    const existingReport = await this.findById(payload._id, undefined, { lean: true });
    if (!existingReport) {
      throw new ResourceNotFoundError("Report not found");
    }
    const getReport = await this.find({ _id: payload._id }, undefined, {
      lean: true,
    });
    return getReport;
  }
}

export default ReportRepository;
