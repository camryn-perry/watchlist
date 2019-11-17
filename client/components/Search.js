import React from 'react';
import {searchImdb, searchFilm} from '../store/film';
import {connect} from 'react-redux';
import {urlFriendly} from '../helperFunctions';
import {Redirect} from 'react-router-dom';

//incorporate advanced search option below general search for exact titles

class DisconnectedSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      title: '',
      redirectKeyword: false,
      redirectAdvanced: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeywordSubmit = this.handleKeywordSubmit.bind(this);
    this.handleAdvancedSubmit = this.handleAdvancedSubmit.bind(this);
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleKeywordSubmit = e => {
    e.preventDefault();
    this.props.search(urlFriendly(this.state.keyword));
    this.setState({
      redirectKeyword: true
    });
  }
  handleAdvancedSubmit = e => {
    e.preventDefault();
    this.props.advancedSearch(urlFriendly(this.state.title));
    this.setState({
      redirectAdvanced: true
    });
  }

  render() {
    if (this.state.redirectKeyword) {
      return <Redirect to={`/search/${this.state.keyword}`} />;
    } else if (this.state.redirectAdvanced) {
      return <Redirect to={`advancedSearch/${this.state.title}`} />;
    }
    return (
      <div>
        <label htmlFor="search">Search for film by keyword:</label>
        <input
          name="keyword"
          type="text"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="btn blue waves-effect waves-light"
          onClick={this.handleKeywordSubmit}
        >
          Search
        </button>
        <label htmlFor="search">Advanced search by title:</label>
        <input
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="btn blue waves-effect waves-light"
          onClick={this.handleAdvancedSubmit}
        >
          Advanced Search
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    search: keyword => dispatch(searchImdb(keyword)),
    advancedSearch: title => dispatch(searchFilm(title))
  };
};

const Search = connect(null, mapDispatchToProps)(DisconnectedSearch);

export default Search;
