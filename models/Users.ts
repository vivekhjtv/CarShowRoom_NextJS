const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        required: false,
      },
  },
  { timestamps: true }
);

const Users = mongoose.models.allUsers || mongoose.model('allUsers', usersSchema);

export default Users;