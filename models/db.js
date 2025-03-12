const Sequelize = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: '../database/pokemon.sqlite',
  logging: false
});

module.exports = { db };