import React from 'react';
import {connect} from 'react-redux';
import FilmView from './FilmView';

//user will be redirected to this page after searching.
//will either display list of search results listed from search results in store, or will display friendly message
//need single film component view for formatting sake

class DisconnectedSearchResults extends React.Component {
  componentDidMount() {
    return (
      <div>
        <h3>loading...</h3>
      </div>
    );
  }
  render() {
    if (!this.props.results.length) {
      return <div />;
    }
    return (
      <div>
        {this.props.results.map(film => (
          <div key={film.imdbid}>
            <FilmView film={film} />
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

const SearchResults = connect(mapStateToProps, null)(DisconnectedSearchResults);

export default SearchResults;
