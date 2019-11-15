import React from 'react';
import {searchImdb} from '../store/film';
import {connect} from 'react-redux';
import {urlFriendly} from '../helperFunctions';
import {Redirect} from 'react-router-dom';

class DisconnectedSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.search(urlFriendly(this.state.keyword));
    this.setState({
      redirect: true
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/search/:${this.state.keyword}`} />;
    }
    return (
      <div>
        <label htmlFor="search">
          <small>Search for film: </small>
        </label>
        <input
          name="keyword"
          type="text"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Search
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: keyword => dispatch(searchImdb(keyword))
  };
};

const Search = connect(null, mapDispatchToProps)(DisconnectedSearch);

export default Search;
