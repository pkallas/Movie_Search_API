// Change input to be the request sent in http, rather than in node
// const movieSearchFunction = require('./movieSearchFunction');
const express = require('express');
const router = express.Router();
// const appRouter = () => {

router.get('/', (req, res) => {
  res.send('Try searching for something')
});

router.get('/search', (req, res) => {
  res.send('Working!')
});

module.exports = router;
