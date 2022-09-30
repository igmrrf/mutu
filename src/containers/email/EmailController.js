import { default as BaseController } from "interfaces/http/controllers";
import { pick } from "lodash";

class EmailController extends BaseController {
  constructor({ createEmail, updateEmail, deleteEmail, getEmail, getEmails }) {
    super();
    this.create = createEmail;
    this.update = updateEmail;
    this.delete = deleteEmail;
    this.getOne = getEmail;
    this.get = getEmails;
  }

  async createEmail(req, res) {
    const payload = pick(req.body, ["", ""]);
    const response = await this.create.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Email added successfully");
  }

  async updateEmail(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const body = pick(req.body, ["", ""]);
    const payload = { ...body, _id };
    const response = await this.update.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Email udpated successfully");
  }

  async deleteEmail(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.delete.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Email deleted successfully!");
  }

  async getEmails(req, res) {
    const response = await this.get.execute();
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Email(s) fetched successfully!");
  }

  async getEmail(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.getOne.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Email fetched successfully!");
  }
}

export default EmailController;
