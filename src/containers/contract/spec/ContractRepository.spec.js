import ContractRepository from "containers/contract/ContractRepository";
import dbHandler from "helpers/testConfig";
import models from "containers/models";
import { expect } from "chai";
import MOCK_DATA from "./MOCK_DATA";

const { contractPayload, userPayload } = MOCK_DATA;

describe("********** ContractRepository **********", () => {
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

  it("creates a Contract", async () => {
    const newContract = new ContractRepository(dbModels);
    newContract.currentUser = userPayload;
    const createdContract = await newContract.create(contractPayload);
    expect(createdContract).to.be.an("object");
    expect(createdContract).to.haveOwnProperty("_id");
  });

  it("updates a Contract", async () => {
    const newContract = new ContractRepository(dbModels);
    newContract.currentUser = userPayload;
    const createdContract = await newContract.create(contractPayload);
    contractPayload._id = createdContract._id;
    const updatedContract = await newContract.update(contractPayload);
    expect(updatedContract).to.be.an("object");
    expect(updatedContract).to.haveOwnProperty("_id");
  });

  it("deletes a Contract", async () => {
    const newContract = new ContractRepository(dbModels);
    newContract.currentUser = userPayload;
    const createdContract = await newContract.create(contractPayload);
    contractPayload._id = createdContract._id;
    const deleteContract = await newContract.delete(contractPayload);
    expect(deleteContract).to.be.an("object");
    expect(deleteContract).to.haveOwnProperty("_id");
  });

  it("Get all Contract(s)", async () => {
    const newContract = new ContractRepository(dbModels);
    const getContracts = await newContract.get();
    getContracts.forEach((element) => {
      expect(element).to.be.an("object");
      expect(element).to.haveOwnProperty("_id");
    });
  });

  it("Get one Contract", async () => {
    const newContract = new ContractRepository(dbModels);
    newContract.currentUser = userPayload;
    const createdContract = await newContract.create(contractPayload);
    contractPayload._id = createdContract._id;
    const getContract = await newContract.getOne(contractPayload);
    expect(getContract).to.be.an("object");
    expect(getContract).to.haveOwnProperty("_id");
  });
});
