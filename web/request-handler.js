var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helpers = require('./http-helpers');
var serveAssets = helpers.serveAssets;
var addSite = helpers.addSite;
var fetchHtml = require('../workers/htmlfetcher').fetchHtml;


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
      // url = url.split('=')[1].trim();
      url = url.split('=')[1];
      console.log('got url: ', url);
      archive.isUrlInList(url, function(err, exists) {
        if (exists) {
          serveAssets(res, archive.paths.archivedSites + '/' + url + '.html', serveAssetCallback);
        } else {
          console.log('url not found in sites.txt');
          //check to see if worker is already fetching site

          //start worker to fetch url html -- callback will write to sites.txt
          fetchHtml(url);

          //send loading.html back
          serveAssets(res, archive.paths.siteAssets + '/loading.html', serveAssetCallback);



        }
      });
      //call isUrlList yes ? serveAssets : addSite

      // addSite(res, url);
    });
  }
  
  // res.end(archive.paths.list);
};
