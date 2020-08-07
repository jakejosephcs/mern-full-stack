import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItems from './PlaceItem';

import './PlaceList.css';

function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No palces found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='place-list'>
      {props.items.map(place => {
        return (
          <PlaceItems
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
          />
        );
      })}
    </ul>
  );
}

export default PlaceList;
