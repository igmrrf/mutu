import BaseController from "interfaces/http/controllers";
import { pick } from "lodash";

class ContractController extends BaseController {
  constructor({ createContract, updateContract, deleteContract, getContract, getContracts }) {
    super();
    this.create = createContract;
    this.update = updateContract;
    this.delete = deleteContract;
    this.getOne = getContract;
    this.get = getContracts;
  }

  async createContract(req, res) {
    const payload = pick(req.body, ["", ""]);
    const response = await this.create.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Contract added successfully");
  }

  async updateContract(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const body = pick(req.body, ["", ""]);
    const payload = { ...body, _id };
    const response = await this.update.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Contract udpated successfully");
  }

  async deleteContract(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.delete.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Contract deleted successfully!");
  }

  async getContracts(req, res) {
    const response = await this.get.execute();
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Contract(s) fetched successfully!");
  }

  async getContract(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.getOne.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Contract fetched successfully!");
  }
}

export default ContractController;
