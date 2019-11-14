const router = require('express').Router();
const imdb = require('imdb-api');
const {API_KEY} = require('../../secrets');
const client = new imdb.Client({apiKey: API_KEY});
const {Film, User} = require('../db/models');

//have to parse incoming data to match parameter names. I.E, north by northwest must be north+by+northwest. Helper func?
//if response true, send back
//post/put methods add to own database if user wants to mark as favorite

//should eventually be homepage of all movies in db
//client.get will be for known title if you want to get more information

//if response is true in query, add film to own database

router.get('/', async (req, res, next) => {
  try {
    const films = await Film.findAll();
    res.json(films);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
router.get('/watchlist', async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id);
    const watchlist = await currentUser.getFilms();
    res.json(watchlist);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const search = await client.search({name: req.body.title});
    res.json(search.results);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
//client.get will be for known title if you want to get more information
//req.body.title
router.get('/advancedSearch', async (req, res, next) => {
  try {
    const film = await client.get({name: req.body.title});
    if (film.response === 'True') {
      await Film.create({
        title: film.title,
        year: film.year,
        rated: film.rated,
        runtime: film.runtime,
        genres: film.genres,
        director: film.director,
        actors: film.actors,
        plot: film.plot,
        type: film.type,
        imdbid: film.imdbid,
        poster: film.poster
      });
    }
    res.json(film);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

//other routes -- add to watchlist creates new movie obj that persists in database
//remove -- removes from watchlist and removes from database
//add to favorites/ or rating. saves a new rating value column from 1-5. Could be useful for recommendation portion

module.exports = router;
