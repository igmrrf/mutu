import { default as BaseController } from "interfaces/http/controllers";
import { pick } from "lodash";

class ReportController extends BaseController {
  constructor({ createReport, updateReport, deleteReport, getReport, getReports }) {
    super();
    this.create = createReport;
    this.update = updateReport;
    this.delete = deleteReport;
    this.getOne = getReport;
    this.get = getReports;
  }

  async createReport(req, res) {
    const payload = pick(req.body, ["", ""]);
    const response = await this.create.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Report added successfully");
  }

  async updateReport(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const body = pick(req.body, ["", ""]);
    const payload = { ...body, _id };
    const response = await this.update.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Report udpated successfully");
  }

  async deleteReport(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.delete.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Report deleted successfully!");
  }

  async getReports(req, res) {
    const response = await this.get.execute();
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Report(s) fetched successfully!");
  }

  async getReport(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.getOne.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Report fetched successfully!");
  }
}

export default ReportController;
