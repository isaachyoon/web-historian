var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  console.log('asset: ', asset);
  fs.readFile(asset, 'utf8', function (err, data) {
    if (err) {
      res.statusCode = 404;
      //console.log(err);
      callback(null, err);
      return;
      // return;
    }
    res.statusCode = 200;
    callback(data, null);
  });
};

exports.addSite = function(res, url) {
  console.log('asdfasdfasdf', url);
  console.log('pathlist: ', archive.paths.list);
  fs.appendFile(archive.paths.list, url + '\n', (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.statusCode = 302;
    res.end();
  });
};


// As you progress, keep thinking about what helper functions you can put here!
