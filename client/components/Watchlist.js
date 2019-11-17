import React from 'react';
import {connect} from 'react-redux';
import {getWatchlist, removeFilm} from '../store/film';
import FilmView from './FilmView';

class DisconnectedWatchlist extends React.Component {
  componentDidMount() {
    this.props.getWatchlist();
  }
  render() {
    return (
      <div className="row">
        {this.props.watchlist.map(film => (
          <div key={film.id} className="card">
            <FilmView film={film} />
            <div className="card-action center">
              <button
                type="submit"
                className="btn-large red waves-effect waves-light"
                onClick={() => this.props.removeFilm(film)}
              >
                Remove
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
    watchlist: state.film.watchlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWatchlist: () => dispatch(getWatchlist()),
    removeFilm: film => dispatch(removeFilm(film))
  };
};

const Watchlist = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedWatchlist
);

export default Watchlist;
