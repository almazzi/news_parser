/**
 * Created by almazbeck on 6/15/15.
 */var request = require('request');
var async = require('async');
var cheerio = require('cheerio');
var querystring = require('querystring');
var url = require('url');

request('http://www.knews.kg//politics/66291_djoomart_otorbaev_v_2014_godu_zarabotal_na_80_tyis_somov_menshe_chem_prezident_almazbek_atambaev/',
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            console.log($('img.photo.image').attr('src'));
          }});

