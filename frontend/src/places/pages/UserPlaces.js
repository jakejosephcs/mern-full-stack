import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

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
  {
    id: 'p2',
    title: 'CN Tower',
    description: 'In the 6ix',
    imageUrl:
      'https://media.blogto.com/articles/2020624-cn-tower-toronto-2.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70',
    address: '290 Bremner Blvd, Toronto, ON M5V 3L9',
    location: {
      lat: 43.6425662,
      lng: -79.3892508,
    },
    creator: 'u2',
  },
];

function UserPlaces() {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;
