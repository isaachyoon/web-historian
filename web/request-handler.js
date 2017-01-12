var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helpers = require('./http-helpers');
var serveAssets = helpers.serveAssets;
var addSite = helpers.addSite;


exports.handleRequest = function (req, res) {

  var serveAssetCallback = function(staticContent, err) {
    if (err) {
      res.end();
    } else {
      res.end(staticContent);
    }
  };
  if (req.method === 'GET') {
    if (req.url === '/') {
      serveAssets(res, archive.paths.siteAssets + '/index.html', serveAssetCallback);
    } else {
      serveAssets(res, archive.paths.archivedSites + '/' + req.url, serveAssetCallback);
    }
  } else if (req.method === 'POST') {
    var url = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
      url += chunk;
    }).on('end', function() {
      url = url.split('=')[1].trim();
      addSite(res, url);
    });
  }
  
  // res.end(archive.paths.list);
};
