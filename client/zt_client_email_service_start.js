//  Copyright 2025 Zinfinitem LLC

//# Licensed under the Apache License, Version 2.0 (the "License");
//# you may not use this file except in compliance with the License.
//# You may obtain a copy of the License at
//#
//# http://www.apache.org/licenses/LICENSE-2.0
//#
//# Unless required by applicable law or agreed to in writing, software
//# distributed under the License is distributed on an "AS IS" BASIS,
//# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//# See the License for the specific language governing permissions and
//# limitations under the License.


var express = require('express');
var request = require('request');
var moment = require('moment');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");
var bodyParser = require('body-parser');   
//var jsonParser = bodyParser.json()
var HashMap = require('hashmap');


const axios = require("axios");
const { generateConfig } = require("./utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("./constants");
const { google } = require("googleapis");

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });






/* Routes */
var app = express();
app.set('port', process.env.PORT || 4001);


app.use(bodyParser.json({limit: '50mb', extended: true}));                        
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));



//app.use(express.static("public"));
app.use(express.static(__dirname + '/images'));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});



// email service start




var clientZTICDomain =   new DsClientZTICDomain(); 





var zticns_test1 = new ZTICNS("1","abc.com/test1");
var zticns_base = new ZTICNS("2","131131/21");
var zticns_addr = new ZTICNS("3","zinfinitree.com/address");
var zticns_doc =  new ZTICNS("4","zinfinitree.com/document");
var zticns_ssht  = new ZTICNS("5","zinfinitree.com/spreadsheet");
var zticns_mmo = new ZTICNS("6","zinfinitree.com/multimedia_object");
var zticns_msg = new ZTICNS("7","131131/22");
var zticns_wf   = new ZTICNS("8","zinfinitree.com/workflow");
var zticns_svr_config = new ZTICNS("9","zinfinitree.com/server_config");
var zticns_messaging = new ZTICNS("11","zinfinitree.com/messaging");


var idx = 0;
var ZTICNS_ARx = [];
ZTICNS_ARx.push(zticns_test1);
ZTICNS_ARx.push(zticns_base);
ZTICNS_ARx.push(zticns_addr);
ZTICNS_ARx.push(zticns_doc);
ZTICNS_ARx.push(zticns_ssht);  // 20221102
ZTICNS_ARx.push(zticns_mmo);  
ZTICNS_ARx.push(zticns_msg); 
ZTICNS_ARx.push(zticns_wf);
ZTICNS_ARx.push(zticns_svr_config);  
ZTICNS_ARx.push(zticns_messaging);

var wf_domain_zticx = 8;
var wf_domain_codex = "10001";
var TargetNSx = "abc.com/test1";
var langx = 1;
var user_namex = "x";
var wf_domain_AR = [];


var obj_zticx;
var obj_codex;


app.post('/ds2/send_email', function(req,res){

app.use(bodyParser.json({limit: '50mb'}));                        
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


//console.log("running send_email in ds2g_client_email_service_start.js");
//console.log("** 20221117 req.body.recipient_email: "+req.body.recipient_email);
//console.log("            req.body.html: "+req.body.html);
//console.log("             req.body.attachment: "+req.body.attachment);
 
sendMail(req, res);

res.send("response from app.post send_email");

});   // end of app.post  for send_email




async function sendMail(req, res) {
 
 
  //console.log("req.body: "+req.body);
  //var attachment_txt = req.body.attachment;
  var attachment_txt = "Attachment text 20221117a";
  //var htmlx          = req.body.html;
  //var recipient_email = req.body.recipient_email;
  var recipient_email = "my_email@example.com";
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...CONSTANTS.auth,
        accessToken: accessToken,
      },
    });
    var attachment_txt = 'this is the content to put in an attached file HWH';
    const mailOptions = {
      ...CONSTANTS.mailoptions,
      subject: 'Nice Nodemailer test',
      to: recipient_email,
      text: "The Gmail API with NodeJS works, yes it does -- HWH20221117a",
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer 20221117a',
      //  html: htmlx,
          attachments: [
        // String attachment
        {
            filename: 'notes.txt',
           // content: 'new important notes',
            content: attachment_txt,
            contentType: 'text/plain' // optional, would be detected from the filename
        },
                ],
    };

    const result = await transport.sendMail(mailOptions);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}




function DsClientZTICDomain() {
   //this.tn_prfx = "";
   this.ZTICNS_AR = [];

} // end of function DsClientZTICDomain


DsClientZTICDomain.prototype.pushNamespace = function(namespacex) {

        var lastCodeUsed = 0;
        var alreadyAdded = false;
        for(var i = 0; i < this.ZTICNS_AR.length; i++){
              if(this.ZTICNS_AR[i].code > lastCodeUsed){lastCodeUsed = this.ZTICNS_AR[i].code}; 
              if(this.ZTICNS_AR[i].namespace == namespacex) {alreadyAdded = true};
                
        }
        if(!alreadyAdded){
           lastCodeUsed++
           var ns =  new ZTICNS(lastCodeUsed, namespacex);
           this.ZTICNS_AR.push(ns);
        
        }
       return lastCodeUsed.toString().trim();

     }


DsClientZTICDomain.prototype.getCodeForNamespace = function(namespacex) {
      var returnCode = null;
      var found = false;
      for(var i = 0; i < this.ZTICNS_AR.length; i++){
      
          if(namespacex.trim() == this.ZTICNS_AR[i].namespace.trim()) {returnCode = this.ZTICNS_AR[i].code; found = true};
      
      }
      if(!found){

        returnCode = this.pushNamespace(namespacex);
      }

     return returnCode.toString().trim();
}

DsClientZTICDomain.prototype.getNamespaceForCode = function(codex) {
      var returnNamespace = null;
      for(var i = 0; i < this.ZTICNS_AR.length; i++){
      
          if(codex.trim() == this.ZTICNS_AR[i].code.trim()) {returnNamespace = this.ZTICNS_AR[i].namespace};
      
      }
     return returnNamespace.trim();
}


function ZTICNS(code, namespace) {
   this.code = code;
   this.namespace = namespace;
} // end of function ZTICNS







