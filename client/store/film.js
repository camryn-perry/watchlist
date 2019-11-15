import axios from 'axios';

//INITIAL STATE
const intitialState = {
  allFilms: [],
  currentFilm: {},
  watchlist: []
};

//action types
const LOAD_FILMS = 'LOAD_FILMS';
const GET_FILM = 'GET_FILM';
const GET_WATCHLIST = 'GET_WATCHLIST';
const ADD_FILM = 'ADD_FILM';
const REMOVE_FILM = 'REMOVE_FILM';

//action creators
const loadedFilms = allFilms => ({type: LOAD_FILMS, allFilms});
const gotFilm = film => ({type: GET_FILM, film});
const gotWatchlist = watchlist => ({type: GET_WATCHLIST, watchlist});
const addedFilm = film => ({type: ADD_FILM, film});
const removedFilm = () => ({type: REMOVE_FILM});

//thunk creators
export const loadFilms = {};
export const getFilm = {};
export const getWatchlist = {};
export const addFilm = {};
export const removeFilm = {};

/**
 * REDUCER
 */
export default function(state = intitialState, action) {
  switch (action.type) {
    case LOAD_FILMS:
      return {...state, allFilms: [...action.allFilms]};
    case GET_FILM:
      return {...state, currentFilm: action.film};
    case GET_WATCHLIST:
      return {...state, watchlist: [...action.watchlist]};
    case ADD_FILM:
      return {...state, watchlist: [...state.watchlist, action.film]};
    case REMOVE_FILM:
      const removed = state.watchlist.filter(
        current => current.id !== action.film.id
      );
      return {...state, watchlist: [...removed]};
    default:
      return state;
  }
}
