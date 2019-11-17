import React from 'react';
import {loadFilms, addFilm, getFilm} from '../store/film';
import {connect} from 'react-redux';
import FilmView from './FilmView';
import DetailedView from './DetailedView';
import {Redirect} from 'react-router-dom';
//all films view
//user should see a list of all films (at this point, it shows all films in database which are the films the user has explicitly searched for)
//view should show poster, title, and year

class DisconnectedAllFilms extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      title: ''
    };
  }
  componentDidMount() {
    this.props.loadFilms();
  }
  renderDetailedView(film) {
    console.log(film.id);
    this.props.getFilm(film.id);
    this.setState({redirect: true, title: film.title});
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/${this.state.title}`} />;
    }
    return (
      <div className="row">
        {this.props.allFilms.map(film => (
          <div
            key={film.id}
            className="card"
            onClick={() => this.renderDetailedView(film)}
          >
            <FilmView film={film} />
            <div className="card-action center">
              <button
                type="submit"
                className="btn-large green waves-effect waves-light"
                onClick={() => this.props.addFilm(film)}
              >
                Add me
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allFilms: state.film.allFilms,
    currentFilm: state.film.currentFilm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadFilms: () => dispatch(loadFilms()),
    addFilm: film => dispatch(addFilm(film)),
    getFilm: filmId => dispatch(getFilm(filmId))
  };
};
const AllFilms = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAllFilms
);
export default AllFilms;
