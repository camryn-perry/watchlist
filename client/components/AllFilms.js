import React from 'react';
import {loadFilms, addFilm, getFilm} from '../store/film';
import {connect} from 'react-redux';
import FilmView from './FilmView';
import {Redirect, Route, Link} from 'react-router-dom';
import DetailedView from './DetailedView';
//all films view
//user should see a list of all films (at this point, it shows all films in database which are the films the user has explicitly searched for)
//view should show poster, title, and year

class DisconnectedAllFilms extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      filmId: 0
    };
  }
  componentDidMount() {
    this.props.loadFilms();
  }
  renderDetailedView(filmId) {
    //this.props.getFilm(film.id);
    this.setState({redirect: true, filmId: filmId});
    //console.log(typeof filmId, filmId);
  }
  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={`films/${this.state.filmId}`} />;
    // }
    return (
      <div>
        <form>
          <div className="input-field">
            <input id="search" type="search" required />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
        <div className="row">
          {this.props.allFilms.map(film => (
            <div key={film.id} className="card">
              <Link to={`/films/${film.id}`}>
                <div>
                  <FilmView film={film} />
                </div>
              </Link>
              <Route path={`/films/${film.id}`} component={DetailedView} />
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
