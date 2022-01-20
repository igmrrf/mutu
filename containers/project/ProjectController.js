const Project = require('./ProjectModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    const count = await Project.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no project(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} project(s)`, projects);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const project = new Project({ ...req.body });
    await project.save();
    return responseHandler(res, 201, 'Account Successfully Created', project);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!project)
      return next(new CustomError(404, 'Invalid ID provided for project'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      project
    );
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project)
      return next(
        new CustomError(404, "There's no project with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      project
    );
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project)
      return next(
        new CustomError(404, "There's no project with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', project);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  updateProject,
  getProjects,
  getProject,
  deleteProject,
};
