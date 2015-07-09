module.exports = {

  attributes: {
    title:{
      type:'string',
      required:true
    },
    text:{
      type:'string',
      required:true
    },
    source:{
      type:'string',
      required:true
    },
    imgSource:{
      type:'string'
    },
    published:{
      type:'boolean',
      defaultsTo:false
    }

  },

  beforeCreate:function(values, cb){
    values.text = values.text.replace(/(\r\n|\n|\r|\t)/gm,"");
    if(values.imgSource){
      values.imgSource = 'http://kabarlar.org'+values.imgSource;
    }
    cb();

  }



};

