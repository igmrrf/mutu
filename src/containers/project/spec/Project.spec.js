import { expect } from "chai";
import Project from "containers/project/ProjectEntity";

describe("********** Project entity ***********", () => {
  it("getPublicFields", () => {
    const project = new Project({
      key: "value",
      anotherKey: "another value",
    });

    const publicFields = project.getPublicFields();
    expect(publicFields).to.be.an("object");
    expect(publicFields).to.have.property("_id");
  });
});
