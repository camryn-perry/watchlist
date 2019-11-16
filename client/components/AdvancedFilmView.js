import React from 'react';
import {connect} from 'react-redux';
import {addFilm, removeFilm} from '../store/film';

//add and remove buttons for adding to watchlist
class DisconnectedAdvancedFilmView extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.film.poster} />
        <h3>
          {this.props.film.title} ({this.props.film.year})
        </h3>
        <h5>{this.props.film.actors}</h5>
        <p>{this.props.film.plot}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    film: state.film.currentSearch
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addFilm: film => dispatch(addFilm(film)),
    removeFilm: film => dispatch(removeFilm(film))
  };
};

const AdvancedFilmView = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAdvancedFilmView
);

export default AdvancedFilmView;
