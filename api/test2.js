var request = require('request');
var cheerio = require('cheerio');
var async =   require('async');
var kabarlar ={
  url : 'http://kabarlar.org/whatsapp',
  pagination: 'ul.uk-pagination li:nth-child(2) a',
  item:'div.uk-width-1-3 a',
  title:'.uk-article-lead p:nth-child(1)',
  date:'.uk-article-meta a'


}
function getArrayOfLinks (kabarlar,callback){

  request(kabarlar.url , function (err, response, html) {
    //we check if there is error
    if(err){ callback(err);}

    if (!err && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var links = [];
      $(kabarlar.pagination).each(function (i,element) {
        links.push($(this).attr('href'));
      });
      callback(null,links);
    }
  })
}

function getContainers ( err, links, callback){
  if(err){ return console.log(err);}

  async.each( links,
              function (link, cb) {
                request(link,function(err, response, html){
                                    if(err){ cb(err);}
                                    if (!err && response.statusCode == 200) {
                                        var $ = cheerio.load(html);
                                        var containers = [];
                                        $(kabarlar.item).each(function (i,element) {
                                          containers.push($(this).attr('href'));

                                        }

                                    );


                                } cb(null);
                });
              },
              function(err){
                if(err){
                  console.log(err)
                }
                else{console.log('Everything ok!');}
              }
  )
}



function cb (err, links){
  if(err){
    console.log(err);
  }
  links.forEach(function(item){
    console.log(item);
  });
}
getArrayOfLinks(kabarlar, getContainers);
