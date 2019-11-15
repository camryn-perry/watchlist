import React from 'react';
import loadFilms from '../store/film';
import {connect} from 'react-redux';
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
            <img src={film.poster} />
            <h3>{film.title}</h3>
            <h5>{film.year}</h5>
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
