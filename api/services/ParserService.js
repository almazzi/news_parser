var request = require('request');
var async = require('async');
var cheerio = require('cheerio');
var querystring = require('querystring');
var url = require('url');

var ParserService;
ParserService = {
  takeLinks: function (type,text,callback) {
    if(!text||!type){
      return callback("no  parameter provided");
    }
    var form,options, formData, contentLength,ht;
    switch (type){
      case 'kabarlar':
          form = {
            do: 'search',
            subaction: 'search',
            story: text},
          formData = querystring.stringify(form),
          contentLength = formData.length,
          options = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': contentLength
            },
            url: 'http://kabarlar.org/index.php?do=search',
            body: formData,
            method: 'POST'
          }
          ht=sails.config.sites.kabarlar;
        break;
      case 'twentyfour':
        options= {
           url:"http://24.kg/poisk_po_sajtu/",
           qs:{
             txt:text,
             ok:'OK'
           }
         },
          ht=sails.config.sites.twentyfour;
            break;
      case 'knews':
            options={
              url:"http://knews.kg/poisk_po_sajtu/",
              qs:{
                txt:text
              }
            },
              ht=sails.config.sites.knews;
            break;
    }
    request(options,
      function (err, response, html) {
        var links = [];
        if (err) {
          callback(err);
        }
        if (!err) {
          var $ = cheerio.load(html);
          $(ht.iden.links).each(function (i, element) {
            if(ht==sails.config.sites.twentyfour){
              links.push('http://24.kg'+$(this).attr('href'));
            }
            else if(ht=sails.config.sites.knews){
              links.push("http://knews.kg/"+$(this).attr('href'));
            }
          })

          callback(null, links,ht);
        }

      })
  },
  takeContent: function (link,ht, callback) {

    request(link, function (err, response, html) {

      if (err) {
        return callback(err);
      }
      if (response.statusCode == 200) {
        var $ = cheerio.load(html);
        var st = {
          title: $(ht.iden.title).text(),
          text: $(ht.iden.text).text(),
          source: link
        };

        if ($(ht.iden.img).attr('src')) {
          st.imgSource = $(ht.iden.img).attr('src');
        }


        callback(null, st);
      }
    });
  },
  anotherSite: function () {

  }


};

module.exports = ParserService;
