/* eslint-disable import/named */
import dayjs from "dayjs";
import ConflictError from "interfaces/http/errors/ConflictError";
import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";
import password from "helpers/password";
import { signUpNotifier } from "helpers/slack";
import _ from "lodash";
import randomatic from "randomatic";
import jwt from "helpers/jwt";
import {
  sendForgotPasswordMail,
  sendEmailVerificationEmail,
  sendAccountVerifiedEmail,
  sendUserInviteMail,
  sendNewEmailVerificationRequest,
} from "helpers/sendgrid";
import BaseRepository from "base/repositories";

class UserRepository extends BaseRepository {
  constructor({ models: { User }, currentUser }) {
    super({ Model: User });
    this.User = User;
    this.currentUser = currentUser;
  }

  async getCurrentUser() {
    return this.currentUser.getPublicFields();
  }

  async getUsersStatistics() {
    const monthlySignups = await this.count({
      created_at: { $gte: dayjs().date(1).hour(0).minute(59).toDate() },
    });

    const allSignUps = await this.count();

    return { month: monthlySignups, total: allSignUps };
  }

  async get(payload) {
    const getUsers = await this.find({ ...payload }, undefined, { lean: true }, true, undefined, undefined, {
      created_at: -1,
    });
    const sanitize = getUsers.map((item) =>
      _.omit(item, [
        "confirm_password_expiry",
        "confirm_password_token",
        "confirm_email_token",
        "confirm_email_expiry",
        "password",
      ])
    );
    return sanitize;
  }

  async getOne(payload) {
    const findUser = await this.findById(payload._id);
    if (!findUser) {
      throw new ResourceNotFoundError("User not found");
    }
    return findUser.getPublicFields();
  }

  async create(payload) {
    if (payload.email) {
      const existingUser = await this.find({ email: payload.email }, { email: 1 }, { lean: true });
      if (existingUser) {
        throw new ConflictError("An account with this email already exists.");
      }
    }
    const username = await this.User.generateUsername(payload.first_name);
    const hash = await password.hash(payload.password);
    const confirm_email_token = randomatic("00000");
    const confirm_email_expiry = dayjs().add(7, "days");

    const createdUser = await this.createDoc({
      ...payload,
      password: hash,
      username,
      confirm_email_token,
      confirm_email_expiry,
    });

    /**
     * TODO Send welcome email, email confirmation email, etc. Alternatively, you can publish
     * an event to a queue so other services can respond to a user signing up i.e index user
     * data to an Elastic Search index, send a slack notification, etc
     */
    const publicFields = createdUser.getPublicFields();
    await signUpNotifier(publicFields);
    const token = jwt.generate({ userId: publicFields._id, type: "user" });
    const mailSent = sendEmailVerificationEmail(createdUser);
    if (mailSent.errors) throw new ConflictError(mailSent.errors[0].message);
    return {
      token,
      user: publicFields,
    };
  }

  async verifyAccountEmail(payload) {
    const existingUser = await this.findById(this.currentUser._id, undefined, { lean: true });
    const tokenExpired = dayjs().subtract(7, "days").isAfter(existingUser.confirm_email_token);
    if (tokenExpired) {
      throw new ConflictError("Token expired");
    }
    if (payload.confirm_email_token !== existingUser.confirm_email_token) {
      throw new ConflictError("Token not correct");
    }

    const verified = await this.findOneAndUpdate(
      {
        _id: existingUser._id,
      },
      {
        email_verified: true,
      },
      { new: true }
    );
    const mailSent = sendAccountVerifiedEmail({ recipient: { ...verified } });
    if (mailSent.errors) throw new ConflictError(mailSent.errors[0].message);
    return verified.getPublicFields();
  }

  async googleCreate(payload) {
    if (payload.email) {
      const existingUser = await this.find({ email: payload.email }, { email: 1 }, { lean: true });
      if (existingUser) {
        throw new ConflictError("An account with this email already exists.");
      }
    }

    const username = await this.User.generateUsername(payload.given_name);
    const hash = await password.hash(payload.at_hash);
    const confirm_email_token = randomatic("00000");
    const confirm_email_expiry = dayjs().add(7, "day");

    const createdUser = await this.createDoc({
      ...payload,
      first_name: payload.given_name,
      last_name: payload.family_name,
      password: hash,
      username,
      email_verified: true,
      confirm_email_token,
      confirm_email_expiry,
    });
    /**
     * TODO Send welcome email, email confirmation email, etc. Alternatively, you can publish
     * an event to a queue so other services can respond to a user signing up i.e index user
     * data to an Elastic Search index, send a slack notification, etc
     */
    const publicFields = createdUser.getPublicFields();
    await signUpNotifier(publicFields);

    return { pass: payload.at_hash, user: publicFields };
  }

  async reset(payload) {
    if (payload.old_password === payload.new_password) {
      throw new ConflictError("Old password and new password cannot be the same");
    }
    if (payload.new_password !== payload.confirm_password) {
      throw new ConflictError("Passwords do not match");
    }

    const existingUser = await this.findById(this.currentUser._id, { password: 1 }, { lean: true });
    const comparePassword = await password.compare(payload.old_password, existingUser.password);
    if (!comparePassword) {
      throw new ConflictError("password not correct");
    }

    const hash = await password.hash(payload.confirm_password);

    const newPassword = await this.findOneAndUpdate(
      {
        _id: this.currentUser._id,
      },
      { password: hash }
    );

    return newPassword.getPublicFields();
  }

  async update(payload) {
    const newProfile = await this.findOneAndUpdate(
      {
        _id: this.currentUser._id,
      },
      { ...payload },
      { new: true }
    );
    return newProfile.getPublicFields();
  }

  async verify(payload) {
    const findUser = await this.findById(payload._id);
    if (!findUser) {
      throw new ResourceNotFoundError("User not found");
    }
    if (findUser.account_verfied) {
      throw new ConflictError("User account already verified");
    }
    const verified = await this.findOneAndUpdate(
      {
        _id: payload._id,
      },
      { account_verified: true },
      { new: true }
    );
    return verified.getPublicFields();
  }

  async initiatePasswordChange(payload) {
    const existingUser = await this.find({ email: payload.email }, undefined, { lean: true });
    if (!existingUser) {
      throw new ResourceNotFoundError("An account with this email does not exist.");
    }
    const confirm_password_token = randomatic("00000");
    const confirm_password_expiry = dayjs().add(1, "day");
    const forgotPassword = await this.findOneAndUpdate(
      {
        _id: existingUser._id,
      },
      {
        confirm_password_token,
        confirm_password_expiry,
      },
      { new: true }
    );
    const mailSent = sendForgotPasswordMail({ recipient: { ...forgotPassword } });
    if (mailSent.errors) throw new ConflictError(mailSent.errors[0].message);
    return {
      email: payload.email,
    };
  }

  async passwordChange(payload) {
    let existingUser;
    if (payload.email) {
      existingUser = await this.find({ email: payload.email }, undefined, { lean: true });
      if (!existingUser) {
        throw new ResourceNotFoundError("An account with this email does not exist.");
      }
    }
    if (payload.token !== existingUser.confirm_password_token) {
      throw new ConflictError("Token not correct");
    }
    const tokenExpired = dayjs().subtract(1, "days").isAfter(existingUser.confirm_password_expiry);
    if (tokenExpired) {
      throw new ConflictError("Token expired");
    }
    if (payload.new_password !== payload.confirm_password) {
      throw new ConflictError("Passwords do not match");
    }
    const hash = await password.hash(payload.confirm_password);

    await this.findOneAndUpdate(
      {
        _id: existingUser._id,
      },
      {
        password: hash,
      },
      { new: true }
    );
    return {
      email: payload.email,
    };
  }

  async requestEmailOtp() {
    const confirm_email_token = randomatic("00000");
    const confirm_email_expiry = dayjs().add(7, "days");
    const verified = await this.findOneAndUpdate(
      {
        _id: this.currentUser._id,
      },
      {
        confirm_email_expiry,
        confirm_email_token,
      },
      { new: true }
    );
    const mailSent = sendNewEmailVerificationRequest({ recipient: { ...verified } });
    if (mailSent.errors) throw new ConflictError(mailSent.errors[0].message);
  }

  async verifyAccount(payload) {
    const existingUser = await this.findById(this.currentUser._id, undefined, { lean: true });
    if (existingUser.account_verified === true || existingUser.verification_status === "Pending") {
      throw new ConflictError("Account already verified or in progress of verification");
    }
    await this.findOneAndUpdate(
      {
        _id: existingUser._id,
      },
      {
        ...payload,
        verification_status: "Not Started",
      },
      { new: true }
    );
  }

  async user(payload) {
    if (payload.email) {
      const existingUser = await this.find({ email: payload.email }, { email: 1 }, { lean: true });
      if (existingUser) {
        throw new ConflictError("An account with this email already exists.");
      }
    }
    const randomPassword = await this.User.generateRandomPassword(payload.last_name);
    const username = await this.User.generateUsername(payload.first_name);
    const hash = await password.hash(randomPassword);

    const createdUser = await this.createDoc({
      ...payload,
      password: hash,
      username,
      created_by: this.currentUser._id,
      email_verified: true,
    });
    /**
     * TODO Send welcome email, email confirmation email, etc. Alternatively, you can publish
     * an event to a queue so other services can respond to a user signing up i.e index user
     * data to an Elastic Search index, send a slack notification, etc
     */
    const publicFields = createdUser.getPublicFields();
    await signUpNotifier(publicFields);
    const mailSent = sendUserInviteMail(createdUser);
    if (mailSent.errors) throw new ConflictError(mailSent.errors[0].message);
    return publicFields;
  }
}

export default UserRepository;
