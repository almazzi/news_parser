/**
 * Created by almazbeck on 6/15/15.
 */var request = require('request');
var async = require('async');
var cheerio = require('cheerio');
var querystring = require('querystring');
var url = require('url');
// Set the headers

// Configure the request


// Start the request





var postData = querystring.stringify({
  'txt' : 'президент'
});

var options = {
  url:'http://knews.kg/poisk_po_sajtu/?txt=парламент',
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

request(options,
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      console.log($('div#content ul.newslist li div.info a.title').text());
      console.log('/n');
    }});
