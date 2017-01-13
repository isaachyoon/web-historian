// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var request = require('request');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.fetchHtml = function(url) {
  console.log('URL IN fetchHtml', url);
  request('https://' + url, function (error, response, body) {
    console.log(error);
    if (!error && response.statusCode === 200) {
      console.log('body ', body);
      fs.writeFile(archive.paths.archivedSites + '/' + url + '.html', body, function(err) {
        if (err) {
          throw err;
        }
        archive.addUrlToList(url, function(err) {
          if (err) {
            throw err;
          }
        });
      });
    }
  });
};