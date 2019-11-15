import React from 'react';
import {connect} from 'react-redux';

//user will be redirected to this page after searching.
//will either display list of search results listed from search results in store, or will display friendly message
//need single film component view for formatting sake

class DisconnectedSearchResults extends React.Component {
  render() {
    if (!this.props.results.length) {
      return (
        <div>
          <h3>no results, sorry :(</h3>
        </div>
      );
    }
    return (
      <div>
        {this.props.results.map(film => (
          <div key={film.id}>
            <img src={film.poster} />
            <h3>
              {film.title} ({film.year})
            </h3>
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
