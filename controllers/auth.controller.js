const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const pick = require('../utils/pick');

//register
const register = catchAsync(async (req, res) => {
  
  const { role } = req.body;

  if (role === 'manager') {
    if (!req.body.projectCode) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'projectCode is required for the manager role' });
    }
  } else if (role === 'engineer') {
    if (!req.body.projectCode) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'projectCode is required for the engineer role' });
    }
  }

 const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});


// get all registers 
const getUsers = catchAsync(async (req, res) => {
 
  const {role, username,projectCode,projectMaster,employeeCode,projectactivity,name,contactnumber}=req.query;
   filter={};
  if (role)filter.role=role;
  if (username)filter.username=username;
  if (projectCode)filter.projectCode=projectCode;
  if (username)filter.username=username;
  if (employeeCode)filter.employeeCode=employeeCode;
  if (projectMaster)filter.projectMaster=projectMaster;
  if (projectactivity)filter.projectactivity=projectactivity;
  if (name)filter.name=name;
  if (contactnumber)filter.contactnumber=contactnumber;

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.sortBy = options.sortBy || 'createdAt:desc'; 
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

//get user ID
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

//update 
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

//delete
const deleteUser = catchAsync(async (req, res) => {
  const result= await userService.deleteUserById(req.params.userId);
  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({ message: ' id not found' });
  } else {
    res.status(httpStatus.OK).send(' deleted successfully');
  }
});

//usercount
const userrolescount = catchAsync(async (req, res) => {
 const filter = {};

  const roleCounts = await userService.countUsersByRole(filter);

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.sortBy = options.sortBy || 'createdAt:desc';
;

  res.send({ roleCounts });
});


const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithUsernameAndPassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  userrolescount
  
};
