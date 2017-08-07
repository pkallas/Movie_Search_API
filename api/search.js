const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const qs = require('querystring');


router.get('/', (req, res) => {
  res.send('Try searching for something by appending /search to the page')
});

router.get('/search', (req, res) => {
  res.send('Now try adding a / and a query next')
});

router.get('/search/:query', (req, res) => {
  let userInput = req.params.query
  let imdbPath = qs.stringify(
      {ref_ : 'nv_sr_fn',
      q: userInput,
      s: 'a'});
  // This object specifies the path to request, and then passes the successful response to cheerio
  let imdbMoviesPage = {
    uri: 'http://www.imdb.com/find?' + imdbPath,
    transform: (body) => cheerio.load(body)
  };
  rp(imdbMoviesPage)
  // After successfully receiving the body, use cheerio to only get the information desired, in this case,
  // the result of searching imdb for titles
    .then(($) => {
      let searchResults = $('.findSection')
        .first()
        .find('.result_text')
        .map((index, element) => $(element).text()).toArray();
      // Put search results into an object
      let searchResultsObj = {movies: searchResults};
      // Make search results a JSON object
      // Send the result of the search to the user
      res.json(searchResultsObj)
    })
  // If imdb couldn't be loaded into cheerio successfully, log and throw the error
    .catch((err) => {
      console.log('Problem loading imdb!');
      throw err
    });
})

module.exports = router;
