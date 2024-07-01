import React from 'react';

function Photo({ photos }) {
  return (
    <>
      {photos.map(photo => (
        <li key={photo.id}>
          <img src={photo.url} alt="" />
        </li>
      ))}
    </>
  );
}

export default Photo;
