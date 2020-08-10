const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Jake Joseph',
    email: 'test@test.com',
    password: 'testers',
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  const { name, email, password, places } = req.body;

  let exisitingUser;
  try {
    exisitingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError('Signing up failed, please try again later', 500)
    );
  }

  if (exisitingUser) {
    return next(
      new HttpError('User exists already, please login instead', 422)
    );
  }

  const createdUser = new User({
    name,
    email,
    image:
      'https://media.cntraveler.com/photos/5b2c0684a98055277ea83e26/4:5/w_767,c_limit/CN-Tower_GettyImages-615764386.jpg',
    password,
    places,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError('Signing up failed, please try again', 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let exisitingUser;

  try {
    exisitingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError('Login failed, please try again later', 500));
  }

  if (!exisitingUser || exisitingUser.password !== password) {
    return next(
      new HttpError('Invalid credentials, could not log you in.', 401)
    );
  }

  res.json({ message: 'Logged in' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
