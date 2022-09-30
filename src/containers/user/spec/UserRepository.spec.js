import UserRepository from "containers/user/UserRepository";
import dbHandler from "helpers/testConfig";
import models from "containers/models";
import { expect } from "chai";
import MOCK_DATA from "./MOCK_DATA";

const { userPayload } = MOCK_DATA;

describe("********** UserRepository **********", () => {
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

  it("creates a User", async () => {
    const newUser = new UserRepository(dbModels);
    newUser.currentUser = userPayload;
    const createdUser = await newUser.create(userPayload);
    expect(createdUser).to.be.an("object");
    expect(createdUser).to.haveOwnProperty("_id");
  });

  it("updates a User", async () => {
    const newUser = new UserRepository(dbModels);
    newUser.currentUser = userPayload;
    const createdUser = await newUser.create(userPayload);
    userPayload._id = createdUser._id;
    const updatedUser = await newUser.update(userPayload);
    expect(updatedUser).to.be.an("object");
    expect(updatedUser).to.haveOwnProperty("_id");
  });

  it("deletes a User", async () => {
    const newUser = new UserRepository(dbModels);
    newUser.currentUser = userPayload;
    const createdUser = await newUser.create(userPayload);
    userPayload._id = createdUser._id;
    const deleteUser = await newUser.delete(userPayload);
    expect(deleteUser).to.be.an("object");
    expect(deleteUser).to.haveOwnProperty("_id");
  });

  it("Get all User(s)", async () => {
    const newUser = new UserRepository(dbModels);
    const getUsers = await newUser.get();
    getUsers.forEach((element) => {
      expect(element).to.be.an("object");
      expect(element).to.haveOwnProperty("_id");
    });
  });

  it("Get one User", async () => {
    const newUser = new UserRepository(dbModels);
    newUser.currentUser = userPayload;
    const createdUser = await newUser.create(userPayload);
    userPayload._id = createdUser._id;
    const getUser = await newUser.getOne(userPayload);
    expect(getUser).to.be.an("object");
    expect(getUser).to.haveOwnProperty("_id");
  });
});
