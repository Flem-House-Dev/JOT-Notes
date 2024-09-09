const { Schema, model } = require("mongoose");
// ToDo: add bcrypt

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Email address is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Must be a valid email address format",
    ],
  },
  password: {
    type: String,
    required: true,
  },
});

// ToDo: add password hashing 
// ToDo: add password comparison

const User = model("User", userSchema);

module.exports = User;
