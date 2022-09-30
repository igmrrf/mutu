import ReportRepository from "containers/report/ReportRepository";
import dbHandler from "helpers/testConfig";
import models from "containers/models";
import { expect } from "chai";
import MOCK_DATA from "./MOCK_DATA";

const { reportPayload, userPayload } = MOCK_DATA;

describe("********** ReportRepository **********", () => {
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

  it("creates a Report", async () => {
    const newReport = new ReportRepository(dbModels);
    newReport.currentUser = userPayload;
    const createdReport = await newReport.create(reportPayload);
    expect(createdReport).to.be.an("object");
    expect(createdReport).to.haveOwnProperty("_id");
  });

  it("updates a Report", async () => {
    const newReport = new ReportRepository(dbModels);
    newReport.currentUser = userPayload;
    const createdReport = await newReport.create(reportPayload);
    reportPayload._id = createdReport._id;
    const updatedReport = await newReport.update(reportPayload);
    expect(updatedReport).to.be.an("object");
    expect(updatedReport).to.haveOwnProperty("_id");
  });

  it("deletes a Report", async () => {
    const newReport = new ReportRepository(dbModels);
    newReport.currentUser = userPayload;
    const createdReport = await newReport.create(reportPayload);
    reportPayload._id = createdReport._id;
    const deleteReport = await newReport.delete(reportPayload);
    expect(deleteReport).to.be.an("object");
    expect(deleteReport).to.haveOwnProperty("_id");
  });

  it("Get all Report(s)", async () => {
    const newReport = new ReportRepository(dbModels);
    const getReports = await newReport.get();
    getReports.forEach((element) => {
      expect(element).to.be.an("object");
      expect(element).to.haveOwnProperty("_id");
    });
  });

  it("Get one Report", async () => {
    const newReport = new ReportRepository(dbModels);
    newReport.currentUser = userPayload;
    const createdReport = await newReport.create(reportPayload);
    reportPayload._id = createdReport._id;
    const getReport = await newReport.getOne(reportPayload);
    expect(getReport).to.be.an("object");
    expect(getReport).to.haveOwnProperty("_id");
  });
});
