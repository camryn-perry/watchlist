import React from 'react';

{
  /* <div className="center single-product">
<div className="card">
  <div className="card-image center">
    <img className="single-product-image" src={props.product.image} />
    <span className="card-title"> */
}

const FilmView = props => {
  return (
    <div className="center single-film">
      <div className="blue-grey darken-1">
        <img className="card-image center" src={props.film.poster} />
        <div className="card-title">
          <span>
            {props.film.title} ({props.film.year})
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilmView;
