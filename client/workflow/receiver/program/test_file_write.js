

var fs = require('fs'); 
var html_str = "abc123";
var clientTime = new (require('./zt_client_time'));
var time_now = clientTime.now();


     var dir_and_filename = "./email/"+"spreadsheet_"+time_now;
     var file = fs.createWriteStream(dir_and_filename);
     file.on('error', function(err) {  console.log("error opening file in email_message_receiver.js");  /* error handling */ });

     console.log("dir_and_filename in email_message_receiver.js: "+dir_and_filename);
     file.write(html_str+'\n');
     file.end();

