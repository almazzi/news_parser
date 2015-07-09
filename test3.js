/**
 * Created by almazbeck on 6/15/15.
 */var request = require('request');
var async = require('async');
var cheerio = require('cheerio');


request('http://kabarlar.org/', function (err, response, html) {

  var $ = cheerio.load(html);



  });

