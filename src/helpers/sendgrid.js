/* eslint-disable no-underscore-dangle */
import sgMail from "@sendgrid/mail";
import config from "config";
import {
  WelcomeMail,
  newStaff,
  newPartner,
  forgotPassword,
  newGroupInvite,
  newUserEmail,
  newUser,
  accountVerifiedEmail,
  otpRequestEmail,
  newRequest,
  newInvite,
  newRequestDetails,
  currentTrack,
  trackCompleted,
} from "./emails/templates/user.templates";

sgMail.setApiKey(config.get("sendgrid.apiKey"));

export const sendMail = async (recipient) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient,
    from: "Welcome to Mutu<support@usemutu.com>",
    subject: "Mutu Waitlist",
    html: WelcomeMail(recipient),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendStaffInviteMail = async ({ recipient }) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient["0"].email,
    from: "Mutu Staff Invite<support@usemutu.com>",
    subject: "Mutu Invite",
    html: newStaff(recipient),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};
export const sendInviteMail = async (recipient) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient.email,
    from: "Mutu Invite<support@usemutu.com>",
    subject: "Mutu Invite",
    html: newInvite(recipient.sender),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendPartnerInviteMail = async ({ recipient }) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient["0"].email,
    from: "Mutu Partner Invite<support@usemutu.com>",
    subject: "Mutu Invite",
    html: newPartner(recipient),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendUserInviteMail = async (recipient) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient.email,
    from: "Mutu User Invite<support@usemutu.com>",
    subject: "Mutu Invite",
    html: newUser(recipient),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendForgotPasswordMail = async ({ recipient }) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient._doc.email,
    from: "Forgot Password<support@usemutu.com>",
    subject: "Password Reset Request",
    html: forgotPassword(recipient._doc),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendEmailVerificationEmail = async (recipient) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient.email,
    from: "New Email Verification<support@usemutu.com>",
    subject: "Welcome to Mutu",
    html: newUserEmail(recipient),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendAccountVerifiedEmail = async ({ recipient }) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient._doc.email,
    from: "Account Verification<support@usemutu.com>",
    subject: "Account Verified",
    html: accountVerifiedEmail(recipient._doc),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendNewEmailVerificationRequest = async ({ recipient }) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient._doc.email,
    from: "New Email Verification<support@usemutu.com>",
    subject: "Email Verification OTP",
    html: otpRequestEmail(recipient._doc),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendNewRequest = async ({ recipient }) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient.email,
    from: "Mutu Business Request<support@usemutu.com>",
    subject: "Business Request Recieved",
    html: newRequest(recipient.name),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendNewRequestDetails = async ({ recipient }) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: "edith@usemutu.com",
    from: "Business Request Details<support@usemutu.com>",
    subject: "Business Request Details",
    html: newRequestDetails(recipient),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendGroupArrivedAtDestinationMail = async ({ recipient }) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient,
    from: "Mutu Tracking<support@usemutu.com>",
    subject: "Shipment Delivered",
    html: trackCompleted(),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendGroupCurrentTrack = async ({ email, current, completed }) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: email,
    from: "Mutu Tracking<support@usemutu.com>",
    subject: "Shipment Track Updated",
    html: currentTrack({ current, completed }),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};

export const sendGroupInviteMail = async ({ recipient }) => {
  if (process.env.NODE_ENV === "test") return "test";
  const msg = {
    to: recipient.email,
    from: "Mutu Group Invite<support@usemutu.com>",
    subject: "Group Invite",
    html: newGroupInvite(recipient),
  };
  let info;
  try {
    info = await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      return error.response.body;
    }
  }
  return info;
};
