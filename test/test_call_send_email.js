


//var urlx = "http://localhost:4000/ds2/process_workflow";
var urlx = "http://localhost:4001/zt/send_email";
var msg_AR = [];


var recipient_email = "email_address_of_recipient";
var html = "<h1>email html</h1>";
var attachment = "this is the text for the attachment";



var request = require('request')


var resp_msg;
//var options = {
//  method: 'post',
//  //body: msg_AR,
//  body: {wf_ztic: wf_ztic, wf_code: wf_code, wf_domain_idx: wf_domain_idx, workflow_idx: workflow_idx},
//  json: true, // Use,If you are sending JSON data

//  url: urlx,

//}


var options = {
  method: 'post',
  //body: msg_AR,
  body: {recipient_email: recipient_email, html: html, attachment: attachment},
  json: true, // Use,If you are sending JSON data

  url: urlx,

}



request(options, function (err, res, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
 // console.log(' Body :', body);  //(del) 20221015
 // console.log(' res  :'. res);

  resp_msg = body;

});  // end of request





