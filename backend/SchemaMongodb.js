const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,    // Removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,   // converts email to lowercase
  },
  password: {
    type: String,
    required: function() {
      return !this.isGoogleAuth; // Password only required for non-Google auth users
    }
  },
  isGoogleAuth: {
    type: Boolean,
    default: false
  },
  picture: {
    type: String,
    required: false
  }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const User = mongoose.model("User", userSchema);    // model is used to connect schema to mongodb database

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  // likes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  comments: [{
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      // default: Date.now
    }
  }],
  // tags: [{
  //   type: String,
  //   trim: true
  // }],
  date: {
    type: Date,
    // default: Date.now.toISOString().split("T")[0]
  },
  status: {
    type: String,
    // enum: ['Upcoming', 'Closed', 'In progress'],   // 👈 Only these values are allowed in the string
    // default: 'active'
  }
}, { timestamps: true });

const Thread = mongoose.model("Thread", threadSchema);

module.exports = { User, Thread };