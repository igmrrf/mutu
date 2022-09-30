import { expect } from "chai";
import Email from "containers/email/EmailEntity";

describe("********** Email entity ***********", () => {
  it("getPublicFields", () => {
    const email = new Email({
      key: "value",
      anotherKey: "another value",
    });

    const publicFields = email.getPublicFields();
    expect(publicFields).to.be.an("object");
    expect(publicFields).to.have.property("_id");
  });
});
