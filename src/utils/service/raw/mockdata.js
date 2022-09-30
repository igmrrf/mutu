module.exports = (name) => `import userPayload from "utils/userMockPayload";

const MOCK_DATA = {
  userPayload,
  ${name.toLowerCase()}Payload: {
    key: "Value",
    anotherKey: "Another Value",
  },
};

export default MOCK_DATA;`;
