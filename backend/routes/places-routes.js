const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_PLACES = [
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

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find(p => p.id === placeId);

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id', 404)
    );
  }

  res.json({
    place,
  });
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find(p => p.creator === userId);

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided user id', 404)
    );
  }

  res.json({
    place,
  });
});

module.exports = router;
