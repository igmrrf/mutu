import ProjectRepository from "containers/project/ProjectRepository";
import dbHandler from "helpers/testConfig";
import models from "containers/models";
import { expect } from "chai";
import MOCK_DATA from "./MOCK_DATA";

const { projectPayload, userPayload } = MOCK_DATA;

describe("********** ProjectRepository **********", () => {
  const dbModels = {
    models,
  };
  /**
   * Connect to a new in-memory database before running any tests.
   */
  before(async () => dbHandler.connect());

  /**
   * Creates a subscription before every test
   */

  /**
   * Clear all test data after every test.
   */
  afterEach(async () => dbHandler.clearDatabase());

  /**
   * Remove and close the db and server.
   */
  after(async () => dbHandler.closeDatabase());

  it("creates a Project", async () => {
    const newProject = new ProjectRepository(dbModels);
    newProject.currentUser = userPayload;
    const createdProject = await newProject.create(projectPayload);
    expect(createdProject).to.be.an("object");
    expect(createdProject).to.haveOwnProperty("_id");
  });

  it("updates a Project", async () => {
    const newProject = new ProjectRepository(dbModels);
    newProject.currentUser = userPayload;
    const createdProject = await newProject.create(projectPayload);
    projectPayload._id = createdProject._id;
    const updatedProject = await newProject.update(projectPayload);
    expect(updatedProject).to.be.an("object");
    expect(updatedProject).to.haveOwnProperty("_id");
  });

  it("deletes a Project", async () => {
    const newProject = new ProjectRepository(dbModels);
    newProject.currentUser = userPayload;
    const createdProject = await newProject.create(projectPayload);
    projectPayload._id = createdProject._id;
    const deleteProject = await newProject.delete(projectPayload);
    expect(deleteProject).to.be.an("object");
    expect(deleteProject).to.haveOwnProperty("_id");
  });

  it("Get all Project(s)", async () => {
    const newProject = new ProjectRepository(dbModels);
    const getProjects = await newProject.get();
    getProjects.forEach((element) => {
      expect(element).to.be.an("object");
      expect(element).to.haveOwnProperty("_id");
    });
  });

  it("Get one Project", async () => {
    const newProject = new ProjectRepository(dbModels);
    newProject.currentUser = userPayload;
    const createdProject = await newProject.create(projectPayload);
    projectPayload._id = createdProject._id;
    const getProject = await newProject.getOne(projectPayload);
    expect(getProject).to.be.an("object");
    expect(getProject).to.haveOwnProperty("_id");
  });
});
