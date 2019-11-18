import React from 'react';
import {addFilm, getFilm} from '../store/film';
import {connect} from 'react-redux';
class DisconnectedDetailedView extends React.Component {
  componentDidMount() {
    this.props.getFilm(this.props.match.params.filmId);
  }
  render() {
    return (
      <div>
        <img src={this.props.film.poster} />
        <h4>
          {this.props.film.title} ({this.props.film.year})
        </h4>
        <h5>{this.props.film.actors}</h5>
        <p>{this.props.film.plot}</p>
        <div>
          <button
            type="submit"
            className="btn-large green waves-effect waves-light"
            onClick={() => this.props.addFilm(this.props.film)}
          >
            Add Me!
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    film: state.film.currentFilm
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addFilm: film => dispatch(addFilm(film)),
    getFilm: filmId => dispatch(getFilm(filmId))
  };
};
const DetailedView = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedDetailedView
);

export default DetailedView;
