import React from 'react';
import {connect} from 'react-redux';
import FilmView from './FilmView';
import {searchFilm} from '../store/film';
import {Link, Redirect} from 'react-router-dom';
import {urlFriendly} from '../helperFunctions';

//user will be redirected to this page after searching.
//will either display list of search results listed from search results in store, or will display friendly message
//need single film component view for formatting sake

class DisconnectedSearchResults extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      title: ''
    };
  }
  componentDidMount() {
    return (
      <div>
        <h3>loading...</h3>
      </div>
    );
  }
  onClick(filmTitle) {
    this.props.advancedSearch(urlFriendly(filmTitle));
    this.setState({redirect: true, title: filmTitle});
  }
  render() {
    if (!this.props.results.length) {
      return <div />;
    }
    if (this.state.redirect) {
      return (
        <Redirect
          to={`/advancedSearch/${this.state.title}`}
          props={this.state.props}
        />
      );
    }
    return (
      <div>
        {this.props.results.map(film => (
          <div key={film.imdbid}>
            <Link
              to={`/advancedSearch${film.title}`}
              onClick={() => this.onClick(film.title)}
            >
              <FilmView film={film} />
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.film.search
  };
};
const mapDispatchToProps = dispatch => {
  return {
    advancedSearch: filmTitle => dispatch(searchFilm(filmTitle))
  };
};

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSearchResults
);

export default SearchResults;
