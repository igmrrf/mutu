const config = {
  token: {
    doc: "Slack app token",
    format: "*",
    default: null,
    env: "SLACK_APP_TOKEN",
    sensitive: true,
  },
  webhookUrl: {
    doc: "Slack webhook url",
    format: "*",
    default: null,
    env: "WEBHOOK_URL",
    sensitive: true,
  },
};

exports.slack = config;
