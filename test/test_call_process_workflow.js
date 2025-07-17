


var urlx = "http://localhost:4000/zt/process_workflow";
var msg_AR = [];
var wf_ztic = "";
var wf_code = "";
var wf_domain_idx = "";
var workflow_idx   = "";


var done = false;
var cntr = 0;

//while(!done){


var request = require('request')


var resp_msg;
var options = {
  method: 'post',
  //body: msg_AR,
  body: {wf_ztic: wf_ztic, wf_code: wf_code, wf_domain_idx: wf_domain_idx, workflow_idx: workflow_idx},
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

//setTimeout(function() {
//  console.log('This printed after about 15 second');
//}, 15000);

cntr++;
if(cntr == 2){ done = true;}

//}  // endwhile



