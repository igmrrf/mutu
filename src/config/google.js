const config = {
  clientId: {
    doc: "Google api client id",
    format: "*",
    default: null,
    env: "CLIENT_ID",
    sensitive: true,
  },
  clientId: {
    doc: "Google api client secret",
    format: "*",
    default: null,
    env: "CLIENT_SECRET",
    sensitive: true,
  },
};

exports.google = config;
