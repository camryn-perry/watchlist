const router = require('express').Router();
const imdb = require('imdb-api');
const {API_KEY} = require('../../secrets');
const client = new imdb.Client({apiKey: API_KEY});
const {Film} = require('../db/models');

//have to parse incoming data to match parameter names. I.E, north by northwest must be north+by+northwest. Helper func?
//if response true, send back
//post/put methods add to own database if user wants to mark as favorite

//should eventually be homepage of all movies in db
//client.get will be for known title if you want to get more information
router.get('/', async (req, res, next) => {
  try {
    const films = await Film.findAll();
    res.json(films);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

//client.get will be for known title if you want to get more information
router.get('/', async (req, res, next) => {
  try {
    const movie = await client.get({name: 'Batman'});
    res.json(movie);
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

//other routes -- add to watchlist creates new movie obj that persists in database
//remove -- removes from watchlist and removes from database
//add to favorites/ or rating. saves a new rating value column from 1-5. Could be useful for recommendation portion

module.exports = router;
