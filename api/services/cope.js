var request = require('request');
var async = require('async');
var cheerio = require('cheerio');
var querystring = require('querystring');

var ParserService = {


  takeLinks: function(text, callback ){
    var form = {
        do:'search',
        subaction:'search',
        story: text
      },
      formData = querystring.stringify(form),
      contentLength = formData.length,
      options = {
        headers:{   'Content-Type':'application/x-www-form-urlencoded',
          'Content-Length':contentLength
        },
        url:'http://kabarlar.org/index.php?do=search',
        body:formData,
        method:'POST'
      },
      iden = {
        links:'.uk-shortstory-header a',
        title:'.uk-article-title',
      }

    request(options,
      function (err, response, html) {
        var links =[];
        if(err){
          callback(err);
        }
        if(!err) {
          var $ = cheerio.load(html);
          $(iden.links).each(function (i, element) {
            links.push($(this).attr('href'));
          })
          callback(null,links);
        }

      })
  },
  takeContent:function(link, callback) {

    request(link, function (err, response, html) {

      if (err) {
        callback(err);
      }
      if (!err && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var st = {
          title: $().text(),
          text: $('div.uk-clearfix:nth-child(5)').text(),
          source:link
        };

        if($('div.uk-clearfix img').attr('src')) {
          st.imgSource = $('div.uk-clearfix img').attr('src');
        }


        callback(null, st);
      }
    });
  }


};

module.exports = ParserService;
//async.parallel(functions.push(function (item,cb) {
//  request(item,function(err, response, html){
//    if(err){ cb(err);}
//    if (!err && response.statusCode == 200) {
//      var $ = cheerio.load(html);
//      var containers = [];
//      $(kabarlar.item).each(function (i,element) {
//          containers.push($(this).attr('href'));
//        }
//      );
//      cb(null,containers);
//    }
//
//  });
//}))
