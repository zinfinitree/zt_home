class ClientEmailReceiver {



    constructor(urlx, email_msgx, ZTICNS_ARx, TargetNSx, wf_domain_idx, workflow_idx, msg_container_idx) {
      this.url = urlx;
      this.email_msg = email_msgx;
      this.ZTICNS_AR      = ZTICNS_ARx;
      this.TargetNS       = TargetNSx;
      this.wf_domain_idx  = wf_domain_idx;
      this.workflow_idx   = workflow_idx;
      this.msg_container_idx = msg_container_idx;
      this.resp_msg = "";
    
  } // end of constructor





passMessage(){

var fs = require('fs'); 

  console.log("20240302a running passMessage() in email_message_receiver.js");
  console.log("this.url: "+this.url);
  console.log("this.email_msg: "+this.email_msg);

  var resp_msg = JSON.parse(this.email_msg);

console.log("resp_msg.queryResponseSetMemberWA_AR.length in email_message_receiver: "+resp_msg.queryResponseSetMemberWA_AR.length);
console.log("   display template values");
for(var h = 0; h < resp_msg.queryResponseSetMemberWA_AR.length; h++){
  if(resp_msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQset"){

     for(var k = 0; k < resp_msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
        console.log("Object: ");
    //  console.log("Object: "+ this.msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectCode);
        var objx = resp_msg.queryResponseObjectWA_AR[resp_msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
          console.log("objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
          console.log("objx.id - objx.parentId - objx.levelsDown: "+objx.objectKindZTIC+"/"+objx.objectKindCode+"/"+objx.objectZTIC+"/"+objx.objectCode+"  = "+objx.id + " - " + objx.parentId + " - " + objx.levelsDown);

           console.log("Object Element values");
     
        for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

            console.log(resp_msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC + " - "+
            resp_msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode + " - " +
            resp_msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);


        } // endfor loop through objx.objectElement_idx_AR

     }  // endfor loop through msg.queryResponseSetMemberWA_AR[h].object_idx_AR
  }  // endif setMemberID == "ObjectQset"

} // endfor loop through msg.queryResponseSetMemberWA_AR


console.log("  display object values");
for(var h = 0; h < resp_msg.queryResponseSetMemberWA_AR.length; h++){
  if(resp_msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){

     for(var k = 0; k < resp_msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
        console.log("Object: ");
    //  console.log("Object: "+ this.msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectCode);
        var objx = resp_msg.queryResponseObjectWA_AR[resp_msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
          console.log("objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
          console.log("objx.id - objx.parentId - objx.levelsDown: "+objx.objectKindZTIC+"/"+objx.objectKindCode+"/"+objx.objectZTIC+"/"+objx.objectCode+"  = "+objx.id + " - " + objx.parentId + " - " + objx.levelsDown);

           console.log("Object Element values");
     
        for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

            console.log(resp_msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC + " - "+
            resp_msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode + " - " +
            resp_msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);


        } // endfor loop through objx.objectElement_idx_AR

     }  // endfor loop through msg.queryResponseSetMemberWA_AR[h].object_idx_AR
  }  // endif setMemberID == "ObjectQset"

} // endfor loop through msg.queryResponseSetMemberWA_AR



  // NOTE: temporarily doing mapping to html here



    //var sess_str = './ds2b_client_session'; 
    const sess_str = process.env.ZT_CLIENT_HOME_DIR + "/zt_client_session";  // 20240225
    console.log("20240225b sess_str: "+sess_str);
    var idx = "1";
    var langx = "1";           
    var sess = new (require(sess_str))(idx, this.ZTICNS_AR, langx, this.TargetNS);
    var obj_zticx = "";
    var obj_codex = "1050";

var test1_ztic;
var spreadsheet_ztic;
for(var i = 0; i < this.ZTICNS_AR.length; i++){
 // console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "abc.com/test1"){
       test1_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

for(var i = 0; i < this.ZTICNS_AR.length; i++){
 // console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/spreadsheet"){
       spreadsheet_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


var clientTime = new (require('./zt_client_time'));
var time_now = clientTime.now();
var request = require('request');
require("dotenv").config();   // 20230310

obj_zticx = test1_ztic;

    sess.setValuesFromInitialMessage(resp_msg, obj_zticx, obj_codex);


   console.log("20221102 starting list of html for spreadsheet in email_message_receiver");
   console.log("20221102 sess.workbook_AR.length: "+sess.workbook_AR.length);

    for(var i = 0; i < sess.workbook_AR.length; i++){
      var sheet_idx = 0;    // TEMP -- REVISIT
      var templ_zticx = spreadsheet_ztic;
      var templ_codex = "1";
      var maint_modex = "display";
      var sheet_idx = 0;

      var html_str = sess.workbook_AR[i].getHtmlForTemplate_Spreadsheet(sess, templ_zticx, templ_codex, maint_modex, sheet_idx, false);
      console.log("html_str in email_message_receiver: "+ html_str);

    //var dir_and_filename = file_directoryx + file_namex;
    // var dir_and_filename = "./email/"+"spreadsheet_"+time_now;
    var time_now_int = time_now * 10000;
    var time_now_str = time_now_int.toString().trim();
    var dir_and_filename =  __dirname+"/email/spreadsheet_"+time_now_str+".html";    // 20230311
     var file = fs.createWriteStream(dir_and_filename);
     file.on('error', function(err) {  console.log("error opening file in email_message_receiver.js");  /* error handling */ });

     console.log("dir_and_filename in email_message_receiver.js: "+dir_and_filename);
     file.write(html_str+'\n');
     file.end();

// send_email




var urlx = "http://"+ process.env.ZT_EMAIL_SVC_URI +":"+process.env.ZT_EMAIL_SVC_PORT+"/send_email";  // 20230310
console.log("urlx in email_message_receiver:"+urlx);
//var urlx = "http://localhost:8000/send_email";                                                         // (del) 20230310
var recipient_emailx = "my_email@example.com";  //(del) 20230919
//var recipient_emailx = "my_email@example.com";    // 20230919
//var htmlx = '<b>Hey, Look at this!! </b><br>Message SENT with Nodemailer by HWH using POST 20230309a';
var htmlx = html_str;
var attachmentx = ""; //'This is the content to put in an attached file using POST from send_email from email folder 20231102a';
const subjectx = "Agile Task List";
var options = {
  method: 'post',

  body: {recipient_email: recipient_emailx, html: htmlx, attachment: attachmentx, subject: subjectx},
  json: true, // Use,If you are sending JSON data
  //url: "http://localhost:3001/zt/process_message"
  //url: "http://localhost:5001/zt/process_message"
  url: urlx,

}
 
request(options, function (err, res, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  console.log(' Body :', body);  //(del) 20200103

});


// end insert 20230310 to send via email




    } //  endfor loop through workbook_AR 
    





}  // end of passMessage




} // end of class ClientEmailReceiver




module.exports = ClientEmailReceiver;
