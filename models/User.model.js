const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      requiere: true,
      unique: true,
    },
    email: {
      type: String,
      requiere: true,
      unique: true,
    },
    password: {
      type: String,
      min: 5,
      requiere: true
    }
  },
  {

    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
