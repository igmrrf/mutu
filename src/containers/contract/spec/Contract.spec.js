import { expect } from "chai";
import Contract from "containers/contract/ContractEntity";

describe("********** Contract entity ***********", () => {
  it("getPublicFields", () => {
    const contract = new Contract({
      key: "value",
      anotherKey: "another value",
    });

    const publicFields = contract.getPublicFields();
    expect(publicFields).to.be.an("object");
    expect(publicFields).to.have.property("_id");
  });
});
