import mongoose from "mongoose";

const userPayload = {
  _id: mongoose.Types.ObjectId(),
  first_name: "Test",
  account_verified: true,
  last_name: "Password",
  email: "test@useakaani.com",
  password: "123abc120",
  phone: "1111111111111",
};

export default userPayload;
