import { expect } from "chai";
import Report from "containers/report/ReportEntity";

describe("********** Report entity ***********", () => {
  it("getPublicFields", () => {
    const report = new Report({
      key: "value",
      anotherKey: "another value",
    });

    const publicFields = report.getPublicFields();
    expect(publicFields).to.be.an("object");
    expect(publicFields).to.have.property("_id");
  });
});
