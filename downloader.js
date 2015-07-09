var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("file.jpg");
//var request = http.get("http://192.185.228.226/projects/medical-pro/img/gallery/1.jpg",
//                        function(response) {
//                            response.pipe(file);
//                        })
fs.readdir('http://192.185.228.226/projects/medical-pro/img/gallery/',function(err,files){
  if(err) console.log(err);
  files.forEach(function (err,file) {
    if(err) console.log(err);
    else{
      console.log(file);
    }
  });
});
