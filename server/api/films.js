const router = require('express').Router();
const imdb = require('imdb-api');
const {API_KEY} = require('../../secrets');
const client = new imdb.Client({apiKey: API_KEY});
const {Film, User} = require('../db/models');

//have to parse incoming data to match parameter names. I.E, north by northwest must be north+by+northwest after user submits. Helper func?
//if response true, send back
//post/put methods add to own database if user wants to mark as favorite
//update route for films that are not fully complete in database -- do advanced search

//in search when you click on title it does advanced search for you?
//option to only add when user clicks button add. this will add to database. button is listed next to all search options. however the limitation to this is
//the bigger search doesn't list all the information in returned obj

//should eventually be homepage of all movies in db
router.get('/', async (req, res, next) => {
  try {
    const films = await Film.findAll();
    res.json(films);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
router.get('/:filmId', async (req, res, next) => {
  try {
    const film = await Film.findByPk(req.params.filmId);
    res.json(film);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.get('/watchlist/:userId', async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.userId);
    const watchlist = await currentUser.getFilms();
    res.json(watchlist);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
//returns a list of films given a title keyword
router.get('/search/:keyword', async (req, res, next) => {
  try {
    const search = await client.search({name: req.params.keyword});
    res.json(search.results);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
//client.get will be for known title if you want to get more information
//req.body.title
//if response is true in query, add film to own database
router.put('/advancedSearch/:filmTitle', async (req, res, next) => {
  try {
    const film = await client.get({name: req.params.filmTitle});
    if (film.response === 'True') {
      const title = film.title;
      //check current db
      const dbfilm = await Film.findOne({where: {title: title}});
      if (dbfilm) {
        res.json(dbfilm);
      } else {
        const newFilm = await Film.create({
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
        res.json(newFilm);
      }
    }
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.put('/watchlist/add/:userId', async (req, res, next) => {
  try {
    const film = await Film.findByPk(req.body.filmId);
    const user = await User.findByPk(req.params.userId);
    await user.addFilm(film);
    res.json(film);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.put('/watchlist/remove/:userId', async (req, res, next) => {
  try {
    const film = await Film.findByPk(req.body.filmId);
    const user = await User.findByPk(req.params.userId);
    await user.removeFilm(film);
    res.json(film);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

//other routes -- add to watchlist creates new movie obj that persists in database
//remove -- removes from watchlist and removes from database
//add to favorites/ or rating. saves a new rating value column from 1-5. Could be useful for recommendation portion

module.exports = router;
