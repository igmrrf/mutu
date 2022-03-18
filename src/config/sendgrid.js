const config = {
  apiKey: {
    doc: "Sendgrid api key",
    format: "*",
    default: null,
    env: "SENDGRID_API_KEY",
    sensitive: true,
  },
  templateId: {
    doc: "Sendgrid mail template id",
    format: "*",
    default: null,
    env: "SENDGRID_TEMPLATE_ID",
    sensitive: true,
  },
};

exports.sendgrid = config;
