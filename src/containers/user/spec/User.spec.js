import { expect } from "chai";
import User from "containers/user/UserEntity";

describe("********** User entity ***********", () => {
  it("getPublicFields", () => {
    const user = new User({
      key: "value",
      anotherKey: "another value",
    });

    const publicFields = user.getPublicFields();
    expect(publicFields).to.be.an("object");
    expect(publicFields).to.have.property("_id");
  });
});
