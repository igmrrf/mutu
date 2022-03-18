import { default as BaseController } from "interfaces/http/controllers";
import { pick } from "lodash";
const CustomError = require("../../interfaces/http/errors/errorResponse");
const responseHandler = require("../../interfaces/http/response/successResponse");

class AccessLogController extends BaseController {
  constructor({ createAccesslog, updateAccesslog, deleteAccesslog, getAccesslog, getAccessLogs }) {
    super();
    this.create = createAccesslog;
    this.update = updateAccesslog;
    this.delete = deleteAccesslog;
    this.getOne = getAccesslog;
    this.get = getAccessLogs;
  }

  async createAccesslog(req, res) {
    const payload = pick(req.body, ["email", "description"]);
    const response = await this.create.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Access Log added successfully");
  }

  async updateAccesslog(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const body = pick(req.body, ["email", "description"]);
    const payload = { ...body, _id };
    const response = await this.update.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Access Log udpated successfully");
  }

  async deleteAccessLog(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.delete.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Access Log deleted successfully!");
  }

  async getAccessLogs(req, res) {
    const response = await this.get.execute();
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Access Logs fetched successfully!");
  }

  async getAccessLog(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.getOne.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Access Log fetched successfully!");
  }
}

export default AccessLogController;
