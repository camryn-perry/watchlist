import React from 'react';

const FilmView = props => {
  return (
    <div>
      <img src={props.film.poster} />
      <h3>
        {props.film.title} ({props.film.year})
      </h3>
    </div>
  );
};

export default FilmView;
