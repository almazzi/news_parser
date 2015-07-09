/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	show: function(req, res){
    //exec method can provide used data
    Article.find({published:false}).exec(function (err,articles) {
      if (err) return res.serverError(err);
      return res.view('pokaji' ,{
        'articles': articles
      });
    })},
  //word delete is reserved word
  remove: function(req, res){
    if(!req.param('id')){
      return res.badRequest('No id provided');
    }
    // params() function returns null when it does not find so it catches error
    //params method did not do it
    Article.destroy({id:req.param('id')}).exec(function(err, deleted){
      if(err){
        return res.serverError(err);
      }
      //after deletion redirect back
      return res.redirect('/pokaji/');
    });
  }



};

