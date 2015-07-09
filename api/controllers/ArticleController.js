/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	show: function(req, res){
    Article.find({published:false}).exec(function (err,articles) {
      if (err) return res.serverError(err);
      return res.view('pokaji' ,{
        'articles': articles

      });


    })},
  remove: function(req, res){
    if(!req.param('id')){
      return res.badRequest('No id provided');
    }
    Article.destroy({id:req.param('id')}).exec(function(err, deleted){
      if(err){
        return res.serverError(err);
      }
      console.log(deleted);
      return res.redirect('/pokaji/');
    });
  }



};

