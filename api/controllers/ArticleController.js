/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	show: function(req, res){
    Article.find().exec(function (err,articles) {
      if (err) return res.serverError(err);
      console.log(articles);
      return res.view('pokaji' ,{
        'articles': articles

      });

    })}



};

