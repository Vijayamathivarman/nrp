
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    
   
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    // isEmailVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    
    // projectCode: {
    //   type: String,
    //   required: false,
    //   trim: true,
    // },
    projectCode: {
      type: String,
      required: false,
      trim: true,
      match: /^[a-zA-Z0-9]*$/, // Enforce alphanumeric constraint
  },
    projectactivity: {
      type: String,
      required: false,
      trim: true,
    },
    projectMaster: {
      type: String,
      required: false,
      trim: true,
    },
    employeeCode: {
      type: Number,
      required: false,
      trim: true,
    },
    designation: {
      type: String,
      required: false,
      trim: true,
    },
    design: {
      type: String,
      required: false,
      trim: true,
    },
    contactnumber: {
      type: Number,
      required: false,
      trim: true,
    },
    projectCompany: {
      type: String,
      required: false,
      trim: true,
    },
    location: {
      type: String,
      required: false,
      trim: true,
    },
    createAt: {
      type: Date,
      required: false
  },
  updateAt: {
      type: Date,
      required: false
  }
  },
  {
    timestamps: true,
  }
);

// userSchema.pre('validate', function (next) {
//   if (this.role !== 'user') {
//     this.projectCode = undefined;
//   }
//   next();
// });

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;