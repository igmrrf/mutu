import { default as BaseController } from "interfaces/http/controllers";
import { pick } from "lodash";

class ProjectController extends BaseController {
  constructor({ createProject, updateProject, deleteProject, getProject, getProjects }) {
    super();
    this.create = createProject;
    this.update = updateProject;
    this.delete = deleteProject;
    this.getOne = getProject;
    this.get = getProjects;
  }

  async createProject(req, res) {
    const payload = pick(req.body, ["", ""]);
    const response = await this.create.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Project added successfully");
  }

  async updateProject(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const body = pick(req.body, ["", ""]);
    const payload = { ...body, _id };
    const response = await this.update.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Project udpated successfully");
  }

  async deleteProject(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.delete.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Project deleted successfully!");
  }

  async getProjects(req, res) {
    const response = await this.get.execute();
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Project(s) fetched successfully!");
  }

  async getProject(req, res) {
    const { id: _id } = pick(req.params, ["id"]);
    const payload = { _id };
    const response = await this.getOne.execute(payload);
    return this.responseBuilder.getResponseHandler(res).onSuccess(response, "Project fetched successfully!");
  }
}

export default ProjectController;
