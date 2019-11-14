const router = require('express').Router();
const imdb = require('imdb-api');
const {API_KEY} = require('../../secrets');
const client = new imdb.Client({apiKey: API_KEY});

//have to parse incoming data to match parameter names. I.E, north by northwest must be north+by+northwest. Helper func?

router.get('/', async (req, res, next) => {
  try {
    const movie = await client.get({name: 'Batman'});
    res.json(movie);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

module.exports = router;
