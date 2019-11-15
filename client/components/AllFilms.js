import React from 'react';
import {loadFilms} from '../store/film';
import {connect} from 'react-redux';
import FilmView from './FilmView';
//all films view
//user should see a list of all films (at this point, it shows all films in database which are the films the user has explicitly searched for)
//view should show poster, title, and year

class DisconnectedAllFilms extends React.Component {
  componentDidMount() {
    this.props.loadFilms();
  }
  render() {
    return (
      <div>
        {this.props.allFilms.map(film => (
          <div key={film.id}>
            <FilmView film={film} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allFilms: state.film.allFilms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadFilms: () => dispatch(loadFilms())
  };
};
const AllFilms = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAllFilms
);
export default AllFilms;
