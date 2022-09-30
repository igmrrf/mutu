import { default as BaseController } from "interfaces/http/controllers";
import { pick } from "lodash";

class UserController extends BaseController {
  constructor({ createUser, updateUser, deleteUser, getUser, getUsers }) {
    super();
    this.create = createUser;
    this.update = updateUser;
    this.delete = deleteUser;
    this.getOne = getUser;
    this.get = getUsers;
  }

  async createUser(req, res) {
    const payload = pick(req.body, ["", ""]);
    const response = await this.create.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "User added successfully");
  }

  async updateUser(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const body = pick(req.body, ["", ""]);
    const payload = { ...body, _id };
    const response = await this.update.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "User udpated successfully");
  }

  async deleteUser(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.delete.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "User deleted successfully!");
  }

  async getUsers(req, res) {
    const response = await this.get.execute();
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "User(s) fetched successfully!");
  }

  async getUser(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.getOne.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "User fetched successfully!");
  }
}

export default UserController;
