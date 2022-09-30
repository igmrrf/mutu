import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";
import ConflictError from "interfaces/http/errors/ConflictError";
import { default as BaseRepository } from "base/repositories";

class ProjectRepository extends BaseRepository {
  constructor({ models: { Project }, currentUser }) {
    super({ Model: Project });
    this.Project = Project;
    this.currentUser = currentUser;
  }

  async create(payload) {
    if (payload.email) {
      const existingProject = await this.find({ description: payload.description }, undefined, {
        lean: true,
      });
      if (existingProject) {
        throw new ConflictError("Project already exists");
      }
    }
    const newProject = await this.createDoc({
      ...payload,
      created_by: this.currentUser._id,
    });
    return newProject.getPublicFields();
  }

  async update(payload) {
    const existingProject = await this.findById(payload._id, undefined, { lean: true });
    if (!existingProject) {
      throw new ResourceNotFoundError("Project not found");
    }
    const newProject = await this.findOneAndUpdate(
      {
        _id: payload._id,
      },
      { ...payload },
      { new: true }
    );
    return newProject.getPublicFields();
  }

  async delete(payload) {
    const existingProject = await this.findById(payload._id, undefined, { lean: true });
    if (!existingProject) {
      throw new ResourceNotFoundError("Project not found");
    }
    const removeProject = await this.findOneAndDelete({
      _id: payload._id,
    });
    return removeProject.getPublicFields();
  }

  async get() {
    const existingProjects = await this.find({}, undefined, { lean: true }, true);
    return existingProjects;
  }

  async getOne(payload) {
    const existingProject = await this.findById(payload._id, undefined, { lean: true });
    if (!existingProject) {
      throw new ResourceNotFoundError("Project not found");
    }
    const getProject = await this.find({ _id: payload._id }, undefined, {
      lean: true,
    });
    return getProject;
  }
}

export default ProjectRepository;
