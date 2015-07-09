var async= require('async');

var arr = ['Asan', 'Almaz','Uson','Adil','Urmat'];

async.each( arr ,
    function( item , callback)
        {
          if(item == 'Almaz'){
            callback('No permission for' + item);
          }
          else  {
            if (item == 'Uson') {
              setTimeout(function () {
                console.log(item, 'ok');
                callback(null);
              }, 5000);
            }

            else
            {
              console.log(item, 'ok');
              callback(null);
            }
          }
        },
    function(err) {
        if(err)
        {
          console.log('Occured  error :' + err );
        }
          else
        {
          console.log('Every item has controlled');
        }
    }
);
