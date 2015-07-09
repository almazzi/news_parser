/**
 * Created by almazbeck on 6/15/15.
 */

/**
 * Created by almazbeck on 6/11/15.
 */
var request = require('request');
var async = require('async');
var cheerio = require('cheerio');
    //sails.config.sites.kabarlar.url
var kabarlar ={
  url : 'http://kabarlar.org/whatsapp',
  pagination: 'ul.uk-pagination li:nth-child(2) a',
  item:'div.uk-width-1-3 a',
  title:'.uk-article-lead p:nth-child(1)',
  date:'.uk-article-meta a'


}

    request(kabarlar.url,function(err,response, html){



        if(err){ console.log(err);}
        var $ = cheerio.load(html);


        var links = [];
        //fill the array by links
        $(kabarlar.pagination).each(function (i,element) {
          links.push($(this).attr('href'));

        });

        async.each(links,
          function(link,callback){

            request(link,function(err,response, html){
                var container = [];
                var count = 0;


                if(err){ callback(err);}
                var $ = cheerio.load(html);
                $(kabarlar.item).each(function(i,element){
                  container.push($(this).attr('href'));


                });
                container.forEach(function (item) {
                    request(item, function (err, response, html) {
                      var $ = cheerio.load(html);
                      var st={
                        title: $(kabarlar.title).text(),
                        date: $(kabarlar.date).text()
                      };
                      console.log(st);
                      console.log(count++ );
                      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@'+$('title').text());

                      });


                    })

                  }
                );







              },
          function(err){if(err)console.log(err);})


      }
    );


