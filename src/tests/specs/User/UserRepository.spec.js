/* eslint-disable no-unused-vars */
import UserRepository from "base/repositories/UserRepository";
import dbHandler from "helpers/testConfig";
import models from "base/database/models";
import { expect } from "chai";
import ConflictError from "interfaces/http/errors/ConflictError";
import MOCK_DATA from "./MOCK_DATA";

const { newUserPayload, useremail, userPayload, passwordData, wrongPassword, forgotPassword, updateProfile } =
  MOCK_DATA;

describe("********** UserRepository **********", () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  before(async () => dbHandler.connect());

  /**
   * Clear all test data after every test.
   */
  afterEach(async () => dbHandler.clearDatabase());

  /**
   * Remove and close the db and server.
   */
  after(async () => dbHandler.closeDatabase());

  const dbModels = {
    models,
  };

  it("creates a user", async () => {
    const newUser = new UserRepository(dbModels);
    const res = await newUser.create(newUserPayload);
    expect(res).to.be.an("object");
    const { user } = res;
    expect(res).to.haveOwnProperty("token");
    expect(user.first_name).to.equal(newUserPayload.first_name);
    expect(user).to.haveOwnProperty("_id");
  });

  it("updates the user password", async () => {
    const newUser = new UserRepository(dbModels);
    const res = await newUser.create(newUserPayload);
    const { user } = res;
    newUser.currentUser = user;
    const updatedUser = await newUser.reset(passwordData);
    expect(updatedUser).to.be.an("object");
    expect(updatedUser.first_name).to.equal(newUserPayload.first_name);
    expect(updatedUser).to.haveOwnProperty("_id");
  });

  it("does not update the user password if details don't match", async () => {
    const newUser = new UserRepository(dbModels);
    newUser.currentUser = userPayload;
    try {
      await newUser.reset(wrongPassword);
    } catch (error) {
      const err = new ConflictError("Passwords do not match");
      expect(error.message).to.eq(err.message);
    }
  });

  it("it updates user profile", async () => {
    const newUser = new UserRepository(dbModels);
    const res = await newUser.create(newUserPayload);
    const { user } = res;
    newUser.currentUser = user;
    const updatedUser = await newUser.update(updateProfile);
    expect(updatedUser).to.be.an("object");
    expect(updatedUser.first_name).to.equal(updateProfile.first_name);
    expect(updatedUser.username).to.equal(updateProfile.username);
    expect(updatedUser.last_name).to.equal(updateProfile.last_name);
    expect(updatedUser).to.haveOwnProperty("_id");
  });

  it("it initiates forgot password process", async () => {
    const newUser = new UserRepository(dbModels);
    const res = await newUser.create(newUserPayload);
    const { user } = res;
    const findUser = await newUser.find({ email: user.email }, undefined, { lean: true });
    const updatedPassword = await newUser.initiatePasswordChange(user);
    expect(updatedPassword).to.be.an("object");
  });

  it("it updates user password for forgot password", async () => {
    const newUser = new UserRepository(dbModels);
    const res = await newUser.create(newUserPayload);
    const { user } = res;
    const obj = { ...forgotPassword, ...user };
    try {
      const updatedpassword = await newUser.passwordChange(obj);
    } catch (error) {
      let err;
      err = new ConflictError("Passwords do not match");
      err = new ConflictError("Token expired");
      err = new ConflictError("Token not correct");
      expect(error.message).to.eq(err.message);
    }
  });

  it("it gets total number of user signups and for the current month", async () => {
    const newUser = new UserRepository(dbModels);
    const res = await newUser.create(newUserPayload);
    const { user } = res;
    newUser.currentUser = user;
    const stats = await newUser.getUsersStatistics();
    expect(stats).to.be.an("object");
    expect(stats.month).to.equal(1);
    expect(stats.total).to.equal(1);
  });
});
