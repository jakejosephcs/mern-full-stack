const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location.js');
const Place = require('../models/place');
const User = require('../models/user');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'CN Tower',
    description: 'In the 6ix',
    imageUrl:
      'https://media.blogto.com/articles/2020624-cn-tower-toronto-2.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70',
    address: '290 Bremner Blvd, Toronto, ON M5V 3L9',
    location: {
      lat: 43.6425662,
      lng: -79.3892508,
    },
    creator: 'u1',
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError(
      'Something went wrong, could not find a place',
      500
    );
    return next(err);
  }

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id', 404)
    );
  }

  res.json({
    place: place.toObject({ getters: true }),
  });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    return next(
      new HttpError('Fetching places failed, please try again later', 500)
    );
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id', 404)
    );
  }

  res.json({
    places: places.map(place => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid Inputs passed, please check your data', 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      'https://media.cntraveler.com/photos/5b2c0684a98055277ea83e26/4:5/w_767,c_limit/CN-Tower_GettyImages-615764386.jpg',
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(
      new HttpError('Creating place failed, please try again later', 500)
    );
  }

  if (!user) {
    return next(new HttpError('Could not find user for provided id', 404));
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    const err = new HttpError('Creating place failed, please try again', 500);
    return next(err);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid Inputs passed, please check your data', 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not update palce', 500)
    );
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not update place', 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not delete place', 500)
    );
  }

  try {
    await place.remove();
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not delete place', 500)
    );
  }

  res.status(200).json({
    message: 'Deleted place',
  });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
