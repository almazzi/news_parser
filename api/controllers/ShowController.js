module.exports = {

  check: function (req,res) {
    if(!req.param('text')) {
      return res.badRequest('No search text provided');
    }

    ParserService.takeLinks(req.param('type'),req.param('text'),function (err, links,ht) {
      if(err){
       return res.serverError(err);
      }
      if(!links){
       return res.serverError("Empty array");
      }

      async.each(links,
                function(link,callback){
                    ParserService.takeContent(link,ht,function(err, arr){
                    if(err) {
                      return callback(err);
                    }
                    if(!arr){
                      return callback('Net Arraya');
                    }

                    Article.create(arr).exec(function (err) {
                      if(err){
                        console.log(err);
                        return callback(err);
                      }
                      callback(null);
                    });
                      
                  })
                },
                function (err) {
                if(err){
                  console.log(err);
                  res.serverError(err);
                }
                else{
                  console.log('Everything is done');
                  res.ok('It seems to be done ');
                }
      });

    });

  }
}