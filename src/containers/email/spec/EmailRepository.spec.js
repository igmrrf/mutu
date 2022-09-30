import EmailRepository from "containers/email/EmailRepository";
import dbHandler from "helpers/testConfig";
import models from "containers/models";
import { expect } from "chai";
import MOCK_DATA from "./MOCK_DATA";

const { emailPayload, userPayload } = MOCK_DATA;

describe("********** EmailRepository **********", () => {
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

  it("creates a Email", async () => {
    const newEmail = new EmailRepository(dbModels);
    newEmail.currentUser = userPayload;
    const createdEmail = await newEmail.create(emailPayload);
    expect(createdEmail).to.be.an("object");
    expect(createdEmail).to.haveOwnProperty("_id");
  });

  it("updates a Email", async () => {
    const newEmail = new EmailRepository(dbModels);
    newEmail.currentUser = userPayload;
    const createdEmail = await newEmail.create(emailPayload);
    emailPayload._id = createdEmail._id;
    const updatedEmail = await newEmail.update(emailPayload);
    expect(updatedEmail).to.be.an("object");
    expect(updatedEmail).to.haveOwnProperty("_id");
  });

  it("deletes a Email", async () => {
    const newEmail = new EmailRepository(dbModels);
    newEmail.currentUser = userPayload;
    const createdEmail = await newEmail.create(emailPayload);
    emailPayload._id = createdEmail._id;
    const deleteEmail = await newEmail.delete(emailPayload);
    expect(deleteEmail).to.be.an("object");
    expect(deleteEmail).to.haveOwnProperty("_id");
  });

  it("Get all Email(s)", async () => {
    const newEmail = new EmailRepository(dbModels);
    const getEmails = await newEmail.get();
    getEmails.forEach((element) => {
      expect(element).to.be.an("object");
      expect(element).to.haveOwnProperty("_id");
    });
  });

  it("Get one Email", async () => {
    const newEmail = new EmailRepository(dbModels);
    newEmail.currentUser = userPayload;
    const createdEmail = await newEmail.create(emailPayload);
    emailPayload._id = createdEmail._id;
    const getEmail = await newEmail.getOne(emailPayload);
    expect(getEmail).to.be.an("object");
    expect(getEmail).to.haveOwnProperty("_id");
  });
});
