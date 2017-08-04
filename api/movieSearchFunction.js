const rp = require('request-promise');
const cheerio = require('cheerio');
const qs = require('querystring');
// Change input to be the request sent in http, rather than in node
const input = process.argv[2];
// Set the query of imdb to take user input to search for the titles they want
// querystring will format the query, making sure to format reserved characters properly
const imdbPath = qs.stringify(
    {ref_ : 'nv_sr_fn',
    q: input,
    s: 'a'});
// This object specifies the path to request, and then passes the successful response to cheerio
const imdbMoviesPage = {
  uri: 'http://www.imdb.com/find?' + imdbPath,
  transform: (body) => cheerio.load(body)
};

const movieSearchFunction = rp(imdbMoviesPage)
// After successfully receiving the body, use cheerio to only get the information desired, in this case,
// the result of searching imdb for titles
  .then(($) => {
    // let titles = $('.result_text').map((i, elm) => $(elm).text()).toArray().join('\n');
    let titles = $('.result_text').map((index, element) => $(element).text()).toArray();
    console.log(titles)
  })
// If imdb couldn't be loaded into cheerio successfully, log and throw the error
  .catch((err) => {
    console.log('Problem loading imdb!');
    throw err
  });

module.exports = movieSearchFunction;
