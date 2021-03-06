import axios from 'axios';
import history from '../history';
//INITIAL STATE
const initialState = {
  allFilms: [],
  currentFilm: {},
  watchlist: [],
  search: [],
  currentSearch: {}
};

//action types
const LOAD_FILMS = 'LOAD_FILMS';
const GET_FILM = 'GET_FILM';
const GET_WATCHLIST = 'GET_WATCHLIST';
const ADD_FILM = 'ADD_FILM';
const REMOVE_FILM = 'REMOVE_FILM';
const SEARCH_FILM = 'SEARCH_FILM';
const SEARCH_IMDB = 'SEARCH_IMDB';

//action creators
//need one for search route and advanced search
const loadedFilms = allFilms => ({type: LOAD_FILMS, allFilms});
const gotFilm = film => ({type: GET_FILM, film});
const gotWatchlist = watchlist => ({type: GET_WATCHLIST, watchlist});
const addedFilm = film => ({type: ADD_FILM, film});
const removedFilm = film => ({type: REMOVE_FILM, film});
const searchedFilm = film => ({type: SEARCH_FILM, film});
const searchedImdb = searchResults => ({type: SEARCH_IMDB, searchResults});

//thunk creators
export const loadFilms = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/films');
    dispatch(loadedFilms(data));
  } catch (err) {
    console.error(err);
  }
};
export const getFilm = filmId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/films/${filmId}`);
    //history.push(`/films/${data.id}`);
    dispatch(gotFilm(data));
  } catch (err) {
    console.error(err);
  }
};
export const getWatchlist = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id;
    if (userId) {
      const {data} = await axios.get(`/api/films/watchlist/${userId}`);
      dispatch(gotWatchlist(data));
    }
  } catch (err) {
    console.error(err);
  }
};
export const addFilm = film => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id;
    if (userId) {
      const {data} = await axios.put(`/api/films/watchlist/add/${userId}`, {
        filmId: film.id
      });
      dispatch(addedFilm(data));
    }
  } catch (err) {
    console.error(err);
  }
};

export const removeFilm = film => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me');
    const userId = data.id;
    if (userId) {
      const {data} = await axios.put(`/api/films/watchlist/remove/${userId}`, {
        filmId: film.id
      });
      dispatch(removedFilm(data));
    }
  } catch (err) {
    console.error(err);
  }
};
export const searchFilm = filmTitle => async dispatch => {
  try {
    const {data} = await axios.put(`/api/films/advancedSearch/${filmTitle}`, {
      title: filmTitle
    });
    if (data) {
      history.push(`/advancedSearch/${data.title}`);
      dispatch(searchedFilm(data));
    }
  } catch (err) {
    console.error(err);
  }
};
export const searchImdb = keyword => async dispatch => {
  try {
    const {data} = await axios.get(`/api/films/search/${keyword}`);
    if (data) {
      dispatch(searchedImdb(data));
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
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
    case SEARCH_FILM:
      return {...state, currentSearch: action.film};
    case SEARCH_IMDB:
      return {...state, search: [...action.searchResults]};
    default:
      return state;
  }
}
