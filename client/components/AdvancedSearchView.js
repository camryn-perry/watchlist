import React from 'react';
import {connect} from 'react-redux';
import {addFilm, searchFilm} from '../store/film';
import {urlFriendly} from '../helperFunctions';
class DisconnectedAdvancedSearchView extends React.Component {
  componentDidMount() {
    this.props.advancedSearch(urlFriendly(this.props.match.params.filmTitle));
  }
  render() {
    if (!this.props.film.title) {
      return <div />;
    }
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
    film: state.film.currentSearch
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addFilm: film => dispatch(addFilm(film)),
    advancedSearch: filmTitle => dispatch(searchFilm(filmTitle))
  };
};

const AdvancedSearchView = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAdvancedSearchView
);

export default AdvancedSearchView;
