import React from 'react';
import {connect} from 'react-redux';
import {addFilm} from '../store/film';

class DisconnectedAdvancedFilmView extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <img src={this.props.film.poster} />
        <h3>
          {this.props.film.title} ({this.props.film.year})
        </h3>
        <h5>{this.props.film.actors}</h5>
        <p>{this.props.film.plot}</p>
        <div>
          <button
            type="submit"
            onClick={() => this.props.addFilm(this.props.film)}
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    film: state.film.currentSearch,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addFilm: film => dispatch(addFilm(film))
  };
};

const AdvancedFilmView = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAdvancedFilmView
);

export default AdvancedFilmView;
