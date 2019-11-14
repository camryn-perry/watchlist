const Sequelize = require('sequelize');
const db = require('../db');

const Film = db.define('film', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.NUMBER
  },
  rated: {
    type: Sequelize.STRING
  },
  runtime: {
    type: Sequelize.STRING
  },
  genres: {
    type: Sequelize.STRING
  },
  director: {
    type: Sequelize.STRING
  },
  actors: {
    type: Sequelize.STRING
  },
  plot: {
    type: Sequelize.TEXT
  },
  type: {
    type: Sequelize.STRING
  },
  imdbid: {
    type: Sequelize.STRING
  },
  poster: {
    type: Sequelize.STRING
  }
});

module.exports = Film;
