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

require("dotenv").config(); 


/* Routes */
var app = express();
app.set('port', process.env.ZT_WORKFLOW_ENGINE_PORT || 4000);

//app.use(bodyParser.json());  // (del) 20160330
//app.use(bodyParser.urlencoded({extended:false}));  // (del) 20160330

app.use(bodyParser.json({limit: '50mb', extended: true}));                        
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));



//app.use(express.static("public"));
app.use(express.static(__dirname + '/images'));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});






// workflow engine start


// 1. query the server for a workflow domain specified in a config file or hard-coded for now
// 2. load workflow domain data from the response into an instance of the workflow domain object
// 3. query the server for the adapter domain specified in a config file or hard-coded for now
// 4. load adapter domain data from the response into an instance of the adapter domain object
// 5. periodically loop through workflow and execute any pending steps
// 6. when a specific workflow is done executing any steps that can be currently executed, update the server with workflow status and log entries 




var clientZTICDomain =   new DsClientZTICDomain(); 



var zticns_test1 = new ZTICNS("1",process.env.ZT_WORKFLOW_DOMAIN_NS);
var zticns_base = new ZTICNS("2","131131/21");
var zticns_addr = new ZTICNS("3","zinfinitree.com/address");
var zticns_doc =  new ZTICNS("4","zinfinitree.com/document");
var zticns_ssht  = new ZTICNS("5","zinfinitree.com/spreadsheet");
var zticns_mmo = new ZTICNS("6","zinfinitree.com/multimedia_object");
var zticns_msg = new ZTICNS("7","131131/22");
var zticns_wf   = new ZTICNS("8","zinfinitree.com/workflow");
var zticns_svr_config = new ZTICNS("9","zinfinitree.com/server_config");
var zticns_address_app_data = new ZTICNS("10","zinfinitree.com/address_app_data");
var zticns_messaging = new ZTICNS("11","zinfinitree.com/messaging");
// start 20231024
var zticns_map = new ZTICNS("12","zinfinitree.com/map");
var zticns_greg_2020 = new ZTICNS("16","zinfinitree.com/time_gregorian_2020s_tz_est");  // 20231024
var zticns_greg_mill3 = new ZTICNS("14","zinfinitree.com/time_gregorian_millenium3");
var zticns_time = new ZTICNS("15","zinfinitree.com/time");




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
ZTICNS_ARx.push(zticns_address_app_data);
ZTICNS_ARx.push(zticns_messaging);
// start 20231024
ZTICNS_ARx.push(zticns_map);
ZTICNS_ARx.push(zticns_greg_2020);
ZTICNS_ARx.push(zticns_greg_mill3);
ZTICNS_ARx.push(zticns_time);
// end 20231024





  


var wf_domain_zticx = 8;    // revisit 
var wf_domain_codex = process.env.ZT_WORKFLOW_DOMAIN_CODE; // revisit
var TargetNSx = process.env.ZT_WORKFLOW_DOMAIN_TARGET_NS;
var langx = 1;
var user_namex = "x";
var wf_domain_AR = [];

var wf_domain  = new (require('./zt_client_workflow'))(idx, ZTICNS_ARx, wf_domain_zticx, wf_domain_codex, TargetNSx, langx, user_namex);

var obj_zticx;
var obj_codex;

var wf_domain_idx = wf_domain_AR.push(wf_domain) -1;



app.post('/ds2/process_workflow', function(req,res){

app.use(bodyParser.json({limit: '50mb'}));                        
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// fixing "413 Request Entity Too Large" errors
//app.use(express.json({limit: "10mb", extended: true}))
//app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 500000}))


console.log("running process_workflow in ds2g_client_workflow_engine_start.js");
console.log("** 20221023 req.body.wf_ztic: "+req.body.wf_ztic);
console.log("            req.body.wf_code: "+req.body.wf_code);
var wf_ztic = req.body.wf_ztic;
var wf_code = req.body.wf_code;
var wf_domain_idx = req.body.wf_domain_idx;
var workflow_idx  = req.body.workflow_idx;

wf_domain.processWorkflowDomainSingleStep(wf_ztic, wf_code, wf_domain_idx, workflow_idx);
res.send("response from app.post process_workflow");

});   // end of app.post  for process_workflow







app.post('/ds2/workflow_message_container_update', function(req,res){

 var domain_idx = req.body.workflow_domain_idx
 var workflow_idx = req.body.workflow_idx
 var container_idx = req.body.message_container_idx
 var mversion_code = req.body.message_version_code
 var message_str = req.body.message_str
//console.log("domain_idx - workflow_idx - container_idx - mversion_code - message_str in zt_client_workflow_engine_start.js: "+domain_idx+" - "+workflow_idx+" - "+container_idx+" -"+mversion_code+" - "+message_str);



wf_domain_AR[domain_idx].updateMessageStr(workflow_idx, container_idx, mversion_code, message_str);




res.send("response from app.post workflow_message_container_update");

});   // end of app.post  for workflow_message_container_update







var recordFormatMsg_AR = [];
recordFormatMsg_AR = wf_domain_AR[wf_domain_idx].setWorkflowDomainQueryValues();
    var urlx = "http://localhost:3000/zt/process_record_format_message";

  console.log("executing DsWorkflowDomain.refreshAndProcessWorkflowDomain");
var request = require('request')

//var urlx = this.url;

var resp_msg;
var update_resp_msg;
var options = {
  method: 'post',
  body: recordFormatMsg_AR,
  json: true, // Use,If you are sending JSON data

  url: urlx,

}

request(options, function (err, res, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  //console.log(' Body :', body);  //(del) 20200103
  //console.log(' res  :', res);

  resp_msg = body;  //(del) 20220831
  
  console.log("resp_msg.maintainResponseObjectWA_AR.length: "+ resp_msg.maintainResponseObjectWA_AR.length);
 for (var i = 0; i < resp_msg.maintainResponseObjectWA_AR.length; i++){
   console.log("resp_msg.maintainResponseObjectWA_AR[i].objectCodeAssigned: "+resp_msg.maintainResponseObjectWA_AR[i].objectCodeAssigned);
 } // endfor




console.log("resp_msg.queryResponseSetMemberWA_AR.length: "+resp_msg.queryResponseSetMemberWA_AR.length);
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



wf_domain_AR[wf_domain_idx].setValuesFromInitialMessageForWorkflow(resp_msg, this.wf_domain_ztic, this.wf_domain_code);     // 20220901


   for(var h = 0; h < wf_domain_AR.length; h++){
     
      //wf_domain_AR[h].displayContents();  TEMP DEL 20221030
   }  // end of loop through wf_domain_AR










var updateWF_recordFormatMsg_AR = [];
updateWF_recordFormatMsg_AR = wf_domain_AR[wf_domain_idx].setWorkflowDomainUpdateValues();
var options = {
  method: 'post',
  body: updateWF_recordFormatMsg_AR,
  json: true, // Use,If you are sending JSON data

  url: urlx,

}

request(options, function (err, res, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  //console.log(' Body :', body);  //(del) 20200103
  //console.log(' res  :', res);

  update_resp_msg = body;  //(del) 20220831


 });  // end of request for update





});  // end of request for query

//console.log("this.wf_domain_code: "+this.wf_domain_code);






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







