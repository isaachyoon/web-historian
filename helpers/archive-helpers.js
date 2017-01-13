var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  fetcher: path.join(__dirname, '../web/workers/htmlfetcher.js')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, (err, data) => {
    if (err) {
      throw err;
      return;
    }
    cb(err, data.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(err, urls) {
    if (err) {
      throw err;
      return;
    } else {
      cb(err, urls.indexOf(url) !== -1);
    }
  });
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, url + '\n', (err) => {
    if (err) {
      console.log(err);
      return;
    }
    cb(err);
  });
};

exports.isUrlArchived = function(url, cb) {
  fs.readFile(exports.paths.archivedSites + '/' + url, function (err, data) {
    if (err) {
      cb(null, false);
      return;
    }
    cb(null, true);
  });
};

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i ++) {
    fs.writeFile(exports.paths.archivedSites + '/' + urls[i] + '.html', '', (err) => {
      if (err) {
        throw err;
        return;
      }
      //todo call html fetcher 
      console.log('It\'s saved!');
    });
  }
  
};
