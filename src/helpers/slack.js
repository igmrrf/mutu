import config from "config";

const token = config.get("slack.token");
const webhookUrl = config.get("slack.webhookUrl");

const axios = require("axios");

export const signUpNotifier = async (data) => {
  if (process.env.NODE_ENV !== "production") return "ok";

  const fields = Object.keys(data).map((detail) => ({
    type: "mrkdwn",
    text: `*${detail}*\n${data[detail]}`,
  }));

  const res = await axios.post(
    webhookUrl,
    {
      channel: "#random",
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: "New Registration!" },
          fields,
        },
      ],
    },
    { headers: { authorization: `Bearer ${token}` } }
  );

  return res.data;
};

export const waitListNotifier = async (email) => {
  const res = await axios.post(
    webhookUrl,
    {
      channel: "#waitlist",
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: "New Waitlist!" },
          fields: [
            {
              type: "mrkdwn",
              text: `*Email*\n${email}`,
            },
          ],
        },
      ],
    },
    { headers: { authorization: `Bearer ${token}` } }
  );

  return res.data;
};

export const requestNotifier = async (request) => {
  const res = await axios.post(
    webhookUrl,
    {
      channel: "#random",
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: "New Business Request!" },
          fields: [
            {
              type: "mrkdwn",
              text: `*Name*\n${request.name}`,
            },
            {
              type: "mrkdwn",
              text: `*Email*\n${request.email}`,
            },
            {
              type: "mrkdwn",
              text: `*Phone*\n${request.phone}`,
            },
            {
              type: "mrkdwn",
              text: `*Message*\n${request.message}`,
            },
          ],
        },
      ],
    },
    { headers: { authorization: `Bearer ${token}` } }
  );

  return res.data;
};

export const recipeNotifier = async (data) => {
  if (process.env.NODE_ENV !== "production") return "ok";

  const fields = Object.keys(data).map((detail) => ({
    type: "mrkdwn",
    text: `*${detail}*\n${data[detail]}`,
  }));

  const res = await axios.post(
    webhookUrl,
    {
      channel: "#random",
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: "New Recipe!" },
          fields,
        },
      ],
    },
    { headers: { authorization: `Bearer ${token}` } }
  );

  return res.data;
};
