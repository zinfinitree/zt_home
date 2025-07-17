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



class ZtWorkflowDomain {     //20200601

    constructor(idx, ZTICNS_ARx, wf_domain_zticx, wf_domain_codex, TargetNSx, langx, user_namex) {


      this.id              = idx;
      this.ZTICNS_AR       = ZTICNS_ARx;

      this.wf_domain_ztic        = wf_domain_zticx;
      this.wf_domain_code        = wf_domain_codex;
      this.TargetNS        = TargetNSx;    
      this.language        = langx;
      this.user_name       = user_namex;
    //  this.app_title       = "";
    //  this.appPage_AR      = [];

      this.workflowDef_AR     = []; 
      this.workflow_AR        = [];
      this.wf_domain_desc  = "";
      this.nextMessageContainerCode = 1;
      this.nextMessageCode          = 1;
   
      
      

      
  } // end of constructor


processWorkflowDomain(){


     for (var i = 0; i < this.workflow_AR.length; i++) {

        this.processWorkflow(i);

     }  // endfor

}  // end of processWorkflowDomain



processWorkflowDomainSingleStep(wf_zticx, wf_codex, wf_domain_idx, workflow_idx){


     for (var i = 0; i < this.workflow_AR.length; i++) {
        if((wf_codex.toString().trim() == "" && workflow_idx.toString().trim == "") || (this.workflow_AR[i].wf_ztic == wf_zticx && this.workflow_AR[i].wf_code == wf_codex) || (i == workflow_idx)){

           this.processWorkflowSingleStep(i);
        } // endif
     }  // endfor

}  // end of processWorkflowDomainSingleStep


 



processWorkflow(workflow_idx){

var done = false;
var loop_cntr = 0
var currStepSeries_idx = this.workflow_AR[workflow_idx].currentStepSeries_idx;
var currStepSeriesStep_idx = this.workflow_AR[workflow_idx].currentStepSeriesStep_idx;


while(!done){

  this.processCurrentStepSeriesStep(workflow_idx, currStepSeries_idx, currStepSeriesStep_idx);
  this.workflow_AR[workflow_idx].currentStepSeriesStep_idx++;
  currStepSeriesStep_idx = this.workflow_AR[workflow_idx].currentStepSeriesStep_idx;
if(this.workflow_AR[workflow_idx].currentStepSeriesStep_idx >= this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].wfStepSeries_AR[currStepSeries_idx].wfStep_idx_AR.length){
     done = true;

  }  // endif

  loop_cntr++;
  if(loop_cntr > 30){
    done = true;
  } // endif


} // end while

}  // end of processWorkflow



// start 20221017
processWorkflowSingleStep(workflow_idx){

var done = false;
var loop_cntr = 0
var currStepSeries_idx = this.workflow_AR[workflow_idx].currentStepSeries_idx;
var currStepSeriesStep_idx = this.workflow_AR[workflow_idx].currentStepSeriesStep_idx;



  this.processCurrentStepSeriesStep(workflow_idx, currStepSeries_idx, currStepSeriesStep_idx);
  this.workflow_AR[workflow_idx].currentStepSeriesStep_idx++;
  currStepSeriesStep_idx = this.workflow_AR[workflow_idx].currentStepSeriesStep_idx;





var request = require('request');
var upd_rec_AR = [];
var update_resp_msg;
var urlx = "http://localhost:3000/zt/process_record_format_message";  // TEMP REVISIT
upd_rec_AR = this.setWorkflowDomainUpdateValuesSingle(workflow_idx);      // this is to get the records to update the current step back on the server
    // need to call to client to do update using record format message

var options = {
  method: 'post',
  //body: updateWF_recordFormatMsg_AR,
  body: upd_rec_AR,
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



}  // end of processWorkflowSingleStep




processCurrentStepSeriesStep(workflow_idx, wfStepSeries_idx, wfStepSeriesStep_idx){


console.log(" ");
console.log("running processCurrentStepSeriesStep in ds2b_clinet_workflow");
console.log("20220908 workflow_idx - wfStepSeries_idx - wfStepSeriesStep_idx: "+workflow_idx+" - "+wfStepSeries_idx+" - "+wfStepSeriesStep_idx);

console.log("DisplayContents at start of processCurrentStepSeriesStep() in zt_client_workflow.js");
this.displayContents();

var step_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].wfStepSeries_AR[wfStepSeries_idx].wfStep_idx_AR[wfStepSeriesStep_idx];

if(step_idx < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].wfStep_AR.length){
  console.log("step_idx: "+step_idx);
  var step =     this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].wfStep_AR[step_idx];
  
  var msender

  console.log("running step ztic - code:"+step.step_ztic+" - "+step.step_code+" - "+step.wfStep_desc);

  console.log("20221014 step.msender_idx_AR.length: "+step.msender_idx_AR.length);
  for(var i = 0; i < step.msender_idx_AR.length; i++){
     
    console.log("this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[step.msender_idx_AR[i]].msender_desc: "+this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[step.msender_idx_AR[i]].msender_desc);

// start  get sender source file resource
     for(var j = 0; j < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[step.msender_idx_AR[i]].resource_idx_AR.length; j++){
        console.log("sender source file: "+ this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[j].resource_path);


             

     }  // endfor loop through sender resource_idx_AR



//  start get program and program resouces
      for(var j = 0; j < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[step.msender_idx_AR[i]].program_idx_AR.length; j++){
        console.log("sender program: "+ this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].program_AR[j].program_desc);

         var prgrm_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[step.msender_idx_AR[i]].program_idx_AR[j];
         for(var k = 0; k < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].program_AR[prgrm_idx].resource_idx_AR.length; k++){
            var resource_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].program_AR[prgrm_idx].resource_idx_AR[k];  
            console.log("sender program resource path: "+this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[resource_idx].resource_path); 
            var prgrm_name = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[resource_idx].resource_path;
            // start 20220930 execute program linked to from message sender to create messages
            //    this.executeMessageSenderProgramToCreateMessageFromFile(prgrm_name);
            // end 20220930         


         }  // endfor loop through  resource_idx_AR
             

      }  // endfor loop through program_idx_AR



      for(var j = 0; j < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[step.msender_idx_AR[i]].mreceiver_idx_AR.length; j++){
        console.log("receiver: "+ this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].mreceiver_AR[j].mreceiver_desc);

         var rec_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[step.msender_idx_AR[i]].mreceiver_idx_AR[j];

         for(var k = 0; k < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].mreceiver_AR[rec_idx].resource_idx_AR.length; k++){
            var resource_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].mreceiver_AR[rec_idx].resource_idx_AR[k];  
            console.log("resource path-: "+this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[resource_idx].resource_path);          


         }  // endfor loop through  resource_idx_AR

// start 20220929
         for(var k = 0; k < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].mreceiver_AR[rec_idx].program_idx_AR.length; k++){
            var program_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].mreceiver_AR[rec_idx].program_idx_AR[k];  
            console.log("program desc to deliver msg: "+this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].program_AR[program_idx].program_desc);          


         }  // endfor loop through  program_idx_AR
// end 20220929             

      }  // endfor loop through mreceiver_idx_AR





  }  // endfor loop through step.msender_idx_AR


console.log(" ");
console.log("20221015 step.msender_idx_AR.length before processMessagesForWorkflowStep(): "+step.msender_idx_AR.length);
if(step.msender_idx_AR.length > 0){  //20221015
   this.processMessagesForWorkflowStep(workflow_idx, step);
} // endif                           //20221015



}  // endif   (step_idx < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].wfStep_AR.length)


console.log("DisplayContents at end of processCurrentStepSeriesStep() in zt_client_workflow.js");
this.displayContents();


}  // end of processWorkflowStepSeries()





setWorkflowDomainQueryValues(){

  require("dotenv").config();   // 20230311

console.log("20220831 running setWorkflowDomainQueryValues in zt_client_workflow");

var rec_AR = [];



const rec1 = "ZTIC 1    "+process.env.ZT_WORKFLOW_DOMAIN_NS;
rec_AR.push(rec1);
rec_AR.push("ZTIC 2    131131/21");
rec_AR.push("ZTIC 3    zinfinitree.com/address");
rec_AR.push("ZTIC 4    zinfinitree.com/document");
rec_AR.push("ZTIC 5    zinfinitree.com/spreadsheet");
rec_AR.push("ZTIC 6    zinfinitree.com/multimedia_object");
rec_AR.push("ZTIC 7    131131/22");
rec_AR.push("ZTIC 8    zinfinitree.com/workflow");
rec_AR.push("ZTIC 9    zinfinitree.com/server_config");
rec_AR.push("ZTIC 10   zinfinitree.com/address_app_data");
rec_AR.push("ZTIC 11   zinfinitree.com/messaging");
// start 20231024
rec_AR.push("ZTIC 12   zinfinitree.com/map");
rec_AR.push("ZTIC 13   zinfinitree.com/time_gregorian_2020s_tz_est");
rec_AR.push("ZTIC 14   zinfinitree.com/time_gregorian_millenium3");
rec_AR.push("ZTIC 15   zinfinitree.com/time");
// end 20231024
rec_AR.push("RZTI 1");
rec_AR.push("MPPG 212452105734.48962  id123               1234      1    usr1                9    2");
rec_AR.push("EXTK 2    2    2    1");
rec_AR.push("QSET 2    2    1    +    ObjTmplQset");
rec_AR.push("QSLS 10   0    1");
rec_AR.push("QOSS 1lev 1usg 1");
rec_AR.push("QOBJ 2    2    8    10");
rec_AR.push("QSET 8    10   1    +    ObjectQset");
rec_AR.push("QSLS 20   0    1");
rec_AR.push("QOSS 1lev 1usg 1");
const rec22 = "QOBJ 8    10   1    "+process.env.ZT_WORKFLOW_DOMAIN_CODE;
rec_AR.push(rec22);




return rec_AR;                                          // 20220831
}  // end of setWorkflowDomainQueryValues()


setWorkflowDomainUpdateValues(){

console.log("20220831 running setWorkflowDomainUpdateValues in zt_client_workflow");

var rec_AR = [];


 var clientTime = new (require('./zt_client_time'));
 var time_now = clientTime.now();
 console.log("time_now: "+time_now);


 
const rec1 = "ZTIC 1    "+process.env.ZT_WORKFLOW_DOMAIN_NS;
rec_AR.push(rec1);
rec_AR.push("ZTIC 2    131131/21");
rec_AR.push("ZTIC 3    zinfinitree.com/address");
rec_AR.push("ZTIC 4    zinfinitree.com/document");
rec_AR.push("ZTIC 5    zinfinitree.com/spreadsheet");
rec_AR.push("ZTIC 6    zinfinitree.com/multimedia_object");
rec_AR.push("ZTIC 7    131131/22");
rec_AR.push("ZTIC 8    zinfinitree.com/workflow");
rec_AR.push("ZTIC 9    zinfinitree.com/server_config");
rec_AR.push("ZTIC 10   zinfinitree.com/address_app_data");
rec_AR.push("ZTIC 11   zinfinitree.com/messaging");
// start 20231024
rec_AR.push("ZTIC 12   zinfinitree.com/map");
rec_AR.push("ZTIC 13   zinfinitree.com/time_gregorian_2020s_tz_est");
rec_AR.push("ZTIC 14   zinfinitree.com/time_gregorian_millenium3");
rec_AR.push("ZTIC 15   zinfinitree.com/time");
// end 20231024
rec_AR.push("RZTI 1");    
var time_now20 = time_now.toString().trim().padEnd(20);
var rec_idx = rec_AR.push("MPPG "+time_now20+"id123               1234      1    usr1                9        1    ") -1;
//console.log("rec_AR[rec_idx]: "+rec_AR[rec_idx]);
//                  212529372805.29602
            // MPPG 212529460797.5616         id123               1234      1    usr1                9        1 
//rec_AR.push("MPPG 212529372734.48962  id123               1234      1    usr1                9    2");  // temp test 20220907   
 
rec_AR.push("EXTK 2    2    2    1    ");
rec_AR.push("MSET MaintainSetId#1                         "+time_now20);


for (var i = 0; i < this.workflow_AR.length; i++) {
   rec_AR.push("ELEM 8    3    1    "+this.workflow_AR[i].wf_code.padEnd(5)+"8    11   8    3    -    "+this.workflow_AR[i].currentStepSeriesStep_idx);

}  // endfor loop through workflow_AR






return rec_AR;                                          // 20220831
}  // end of setWorkflowDomainUpdateValues()

setWorkflowDomainUpdateValuesSingle(workflow_idx){

console.log("20220831 running setWorkflowDomainUpdateValuesSingle in zt_client_workflow");

var rec_AR = [];

 var clientTime = new (require('./zt_client_time'));
 var time_now = clientTime.now();
 console.log("time_now: "+time_now);

 
const rec1 = "ZTIC 1    "+process.env.ZT_WORKFLOW_DOMAIN_NS;
rec_AR.push(rec1);
rec_AR.push("ZTIC 2    131131/21");
rec_AR.push("ZTIC 3    zinfinitree.com/address");
rec_AR.push("ZTIC 4    zinfinitree.com/document");
rec_AR.push("ZTIC 5    zinfinitree.com/spreadsheet");
rec_AR.push("ZTIC 6    zinfinitree.com/multimedia_object");
rec_AR.push("ZTIC 7    131131/22");
rec_AR.push("ZTIC 8    zinfinitree.com/workflow");
rec_AR.push("ZTIC 9    zinfinitree.com/server_config");
rec_AR.push("ZTIC 10   zinfinitree.com/address_app_data");
rec_AR.push("ZTIC 11   zinfinitree.com/messaging");
rec_AR.push("ZTIC 12   zinfinitree.com/map");
rec_AR.push("ZTIC 13   zinfinitree.com/time_gregorian_2020s_tz_est");
rec_AR.push("ZTIC 14   zinfinitree.com/time_gregorian_millenium3");
rec_AR.push("ZTIC 15   zinfinitree.com/time");

rec_AR.push("RZTI 1");    
var time_now20 = time_now.toString().trim().padEnd(20);
var rec_idx = rec_AR.push("MPPG "+time_now20+"id123               1234      1    usr1                9        1    ") -1;
 
rec_AR.push("EXTK 2    2    2    1    ");
rec_AR.push("MSET MaintainSetId#1                         "+time_now20);


   rec_AR.push("ELEM 8    3    1    "+this.workflow_AR[workflow_idx].wf_code.padEnd(5)+"8    11   8    3    -    "+this.workflow_AR[workflow_idx].currentStepSeriesStep_idx);




return rec_AR;                                          // 20220831
}  // end of setWorkflowDomainUpdateValuesSingle()



setValuesFromInitialMessageForWorkflow(msg, obj_zticx, obj_codex){      // 20200813

var wf_wa = require('./zt_client_workflow_workarea');

  console.log("##^ 20220815 start of setValueFromInitialMessageForWorkflow in zt_client_workflow");
  for (var j = 0; j < msg.queryResponseObjectWA_AR.length; j++) {
   console.log("##^ 20220816 msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length: " +msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length);              
     for (var t = 0; t < msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length; t++) {                              
 console.log("msg.queryResponseObjectWA_AR[j].objectElement_idx_AR[t]:"+msg.queryResponseObjectWA_AR[j].objectElement_idx_AR[t]);                        
     }    // endfor                       
  } // end of loop through queryResponseObjectWA_AR



console.log("msg.queryResponseSetMemberWA_AR.length in setValuesFromInitialMessageForWorkflow: "+msg.queryResponseSetMemberWA_AR.length);
 for (var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++) {
   for (var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++) {

     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];
     for (var j = 0; j < objx.objectElement_idx_AR.length; j++) {
 /////       console.log("  ");
 /////       console.log("##^ 20211029 objx.objectKindZTIC: "+objx.objectKindZTIC);
 /////       console.log("##^ 20211029 objx.objectKindCode: "+objx.objectKindCode);
 /////       console.log("##^ 20211029 objx.objectZTIC: "+objx.objectZTIC);
 /////       console.log("##^ 20211029 objx.objectCode: "+objx.objectCode);

 //////       console.log("##^ 20211029 objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
 /////       console.log("##^ 20211029 objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
 /////       console.log("##^ j: "+j);
 /////       console.log("##^ 20211029 objx.objectElement_idx_AR[j]: "+ objx.objectElement_idx_AR[j]);
 /////       console.log("  ");
     } // endfor                                
   } // endfor
 }  // endfor





console.log("20200613 running setValuesFromInitialMessageForWorkflow()  obj_zticx - obj_codex: "+obj_zticx+ " - " + obj_codex);

var OEscreenElem_AR = [];
var DEvalue_AR      = [];



console.log("20220816 this.ZTICNS_AR.length: "+this.ZTICNS_AR.length);
var base_ztic;
var wf_ztic; 
var messaging_ztic;
var map_ztic;


console.log("^^ 20220919 this.ZTICNS_AR.length: "+this.ZTICNS_AR.length);
for(var i = 0; i < this.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor





for(var i = 0; i < this.ZTICNS_AR.length; i++){
 // console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/workflow"){
       wf_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


for(var i = 0; i < this.ZTICNS_AR.length; i++){
 // console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/messaging"){
       messaging_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


for(var i = 0; i < this.ZTICNS_AR.length; i++){
 // console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/map"){
       map_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


console.log("20220816 this.msg.queryResponseSetMemberWA_AR.length: "+msg.queryResponseSetMemberWA_AR.length);



//-- get object values from message





//console.log(" start of loop at object values 20200407");
for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   console.log("msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length: "+msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length);
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
  // var i = msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c  (del) 20200630
  console.log("Object: "+ msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+msg.queryResponseObjectWA_AR[i].objectCode);
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("20200929 ^^^.. objx.id - objx.parentId - objx.levelsDown: "+objx.objectKindZTIC+"/"+objx.objectKindCode+"/"+objx.objectZTIC+"/"+objx.objectCode+"  = "+objx.id + " - " + objx.parentId + " - " + objx.levelsDown);


console.log("20220903 objx.objectKindZTIC - objx.objectKindCode - wf_ztic: "+objx.objectKindZTIC+" - "+objx.objectKindCode+" - "+wf_ztic);

if(objx.objectKindZTIC == wf_ztic && objx.objectKindCode == 10){  // object is a workflow domain

// //console.log("Object Element values");
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);

     // check if object element is workflow domain description
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == wf_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 17){  
          this.wf_domain_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
       
          
      }  // endif  object element for workflow domain description
// //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

    //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
 //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
       } // endfor loop through types

// //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
/////      var AddMessageLinkToSession_wa_rec = new AddMessageLinkToSessionWorkAreaRec(objx, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]], objx.levelsDown);
/////      AddMessageLinkToSessionWorkAreaRec_AR.push(AddMessageLinkToSession_wa_rec);
// //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
      }  // endfor loop through links
 } // endif object is a workflow domain



if(objx.objectKindZTIC == wf_ztic && objx.objectKindCode == 1){  // object is workflow definition

    var new_wf_def = new wf_wa.WorkflowDefinition(objx.objectZTIC, objx.objectCode);
    new_wf_def.id        = objx.id;
    new_wf_def.parent_id = objx.parentId;

    var wf_def_idx = this.workflowDef_AR.push(new_wf_def) -1;
    this.workflowDef_AR[wf_def_idx].wfDef_idx = wf_def_idx;




// //console.log("Object Element values");
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);

     // check if object element is for workflow definition description
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == wf_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 1){  

       this.workflowDef_AR[wf_def_idx].desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
       // this.appPage_AR[app_page_idx].desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
       
          
      }  // endif  object element for workflow definition description
// //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

    //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
 //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
       }  // endfor loop through types values

// //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
// //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode); 

      
if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 1){  // link type is workflow def to workflow step series
         var new_wf_step_series = new wf_wa.WfStepSeries(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
      
         var wf_step_series_idx = this.workflowDef_AR[wf_def_idx].wfStepSeries_AR.push(new_wf_step_series) -1;
         this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_series_idx].wfDef_idx = wf_def_idx;

       }  // endif link type is workflow definition to workflow step series

if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 8){ // link type is workflow definition to local values container definition
         var new_wf_local_values_container_def = new wf_wa.WfLocalValuesContainerDefinition(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
      
         var wf_local_values_container_def_idx = this.workflowDef_AR[wf_def_idx].wfLocalValuesContainerDef_AR.push(new_wf_local_values_container_def) -1;
         this.workflowDef_AR[wf_def_idx].wfLocalValuesContainerDef_AR[wf_local_values_container_def_idx].wfDef_idx = wf_def_idx;
                                                                     

       }  // endif link type is workflow definition to local values container definition

if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 12){ // link type is workflow definition to workflow
       //  var new_workflow = new wf_wa.WfLocalValuesContainerDefinition(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
var new_workflow = new wf_wa.Workflow(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

         new_workflow.wfDef_idx = wf_def_idx;
         new_workflow.currentStepSeries_idx = 0;
         new_workflow.currentStepSeriesStep_idx = 0;
         //console.log("20220907 new_workflow.wf_code: "+new_workflow.wf_code);
      
         var workflow_idx = this.workflow_AR.push(new_workflow) -1;
         this.workflowDef_AR[wf_def_idx].workflow_idx_AR.push(workflow_idx);
         //this.workflow_AR[workflow_idx].wfDef_idx = wf_def_idx;

       }  // endif link type is workflow definition to workflow


      }  // endfor loop through links
 } // endif object is a workflow definition



if(objx.objectKindZTIC == wf_ztic && objx.objectKindCode == 3){  // object is a workflow (code 3)

   
  
    var workflow_idx;
    
   

    for(var j = 0; j < this.workflow_AR.length; j++){
       if(this.workflow_AR[j].wf_ztic == objx.objectZTIC && this.workflow_AR[j].wf_code == objx.objectCode){
         workflow_idx = j;
       }  // endif
    }  // endfor

  
    this.workflow_AR[workflow_idx].id        = objx.id;
    this.workflow_AR[workflow_idx].parent_id = objx.parentId;

  

// //console.log("Object Element values");
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);

     // check if object element is for workflow description (OE code 3)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == wf_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3){  
         // this.appPage_AR[page_idx].menu_AR[menu_idx].menu_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
         this.workflow_AR[workflow_idx].desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 
     } // endif object element is workflow desc
     // check if object element is for Workflow Current Step Series Namespace (OE code 9)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == wf_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 9){

          //this.appPage_AR[page_idx].menu_AR[menu_idx].menu_label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
         this.workflow_AR[workflow_idx].currentStepSeriesNamespace = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
      } // endif object element is current step series namespace

     // check if object element is for Workflow Current Step Series Code (OE code 10)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == wf_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 10){
   
         this.workflow_AR[workflow_idx].currentStepSeriesCode = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
      } // endif object element is current step series code

     // check if object element is for currentStepSeriesStep_idx (OE code 11)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == wf_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 11){
   
         this.workflow_AR[workflow_idx].currentStepSeriesStep_idx = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
         if(this.workflow_AR[workflow_idx].currentStepSeriesStep_idx.toString().trim() == ""){
            this.workflow_AR[workflow_idx].currentStepSeriesStep_idx = 0;
         } // endif
      } // endif object element is current step series step idx



         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
       
      
// //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  


 
// //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

    //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302

       this.workflow_AR[workflow_idx].wfDef_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC;
       this.workflow_AR[workflow_idx].wfDef_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode
    
 //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
       }  // endfor loop through type values



// //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){



// //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 9){ // link type is workflow to local values container
         var new_local_vals_container = new wf_wa.WfLocalValuesContainer(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_local_vals_container.workflow_idx = workflow_idx;
         var local_vals_container_idx = this.workflow_AR[workflow_idx].localValuesContainer_AR.push(new_local_vals_container) -1;

       }  // endif link type is workflow to local values container

       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 13){ // link type is workflow to set member iteration status
         var new_set_member_iteration_status = new wf_wa.WfSetMemberIterationStatus(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_set_member_iteration_status.workflow_idx = workflow_idx;
         var set_member_iteration_status_idx = this.workflow_AR[workflow_idx].wfSetMemberIterationStatus_AR.push(new_set_member_iteration_status) -1;

       }  // endif link type is workflow to set member iteration status

       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 15){ // link type is workflow to log entry
         var new_log_entry = new wf_wa.WfLogEntry(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_log_entry.workflow_idx = workflow_idx;
         var log_entry_idx = this.workflow_AR[workflow_idx].logEntry_AR.push(new_log_entry) -1;

       }  // endif link type is workflow to log entry
 
      }  // endfor loop throug links
 } // endif object is a workflow




if(objx.objectKindZTIC == wf_ztic && objx.objectKindCode == 4){  // object is a workflow step series

  var found_step_series = false;
  var step_series_idx = 0;
  var wf_def_idx = 0;

///// // check if step series has already been added to workflow definition
  for(var w = 0; w < this.workflowDef_AR.length; w++){
       for(var x = 0; x < this.workflowDef_AR[w].wfStepSeries_AR.length; x++){
          if(this.workflowDef_AR[w].wfStepSeries_AR[x].wfDef_idx == w && this.workflowDef_AR[w].wfStepSeries_AR[x].wfStepSeries_ztic == objx.objectZTIC && this.workflowDef_AR[w].wfStepSeries_AR[x].wfStepSeries_code == objx.objectCode){
            found_step_series = true;
            wf_def_idx = w;
            step_series_idx = x;

         } // endif
       }  // endfor loop through wfStepSeries_AR
  }  // endfor loop through workflowDef_AR

  
  if(found_step_series){
     this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_series_idx].id        = objx.id;
     this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_series_idx].parent_id = objx.parentId;
  } // endif

 
 //console.log("&&& 20220821 this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_series_idx] object is a workflow step series");





console.log("&&& 20220822 objx.objectZTIC - objx.objetCode: "+objx.objectZTIC+" - "+objx.objectCode);



if(found_step_series){
 // //console.log("Object Element values");
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);

     // check if object element is for workflow step series description (OE code 4)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == wf_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 4){  
         // this.appPage_AR[page_idx].menu_AR[menu_idx].menu_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_series_idx].wfStepSeries_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 
     } // endif object element is workflow step series desc

           
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
       
          
 
 // //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  




// //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

    //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
 //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
       }  // endfor loop through type values


 // //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
 //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode)

// ELEM 2    10   3    2    2    10   2    10        Link Type: Workflow Step Series to Workflow Step

       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 2){ // link type is workflow step series to workflow step
         var new_workflow_step = new wf_wa.WfStep(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_workflow_step.wfDef_idx = wf_def_idx;

         var workflow_step_idx = this.workflowDef_AR[wf_def_idx].wfStep_AR.push(new_workflow_step) -1;
         this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[step_series_idx].wfStep_idx_AR.push(workflow_step_idx);

       }  // endif link type is workfow step series to workflow step


 
       }  // endfor  loop through link types

 } // endif (found_step_series){
  
 } // endif object is workflow step series






if(objx.objectKindZTIC == wf_ztic && objx.objectKindCode == 5){  // object is a workflow step (code 5)

  var found_wf_step = false;
  var wf_step_idx = 0;
  var wf_def_idx = 0;

 // check if workflow step has already been added to workflow definition
  for(var w = 0; w < this.workflowDef_AR.length; w++){
       for(var x = 0; x < this.workflowDef_AR[w].wfStep_AR.length; x++){
         console.log("20220904 this.workflowDef_AR[w].wfStep_AR[x].wfDef_idx - w - this.workflowDef_AR[w].wfStep_AR[x].wfStep_ztic - this.workflowDef_AR[w].wfStep_AR[x].wfStep_code: "+ this.workflowDef_AR[w].wfStep_AR[x].wfDef_idx + " - "+w+" - "+ this.workflowDef_AR[w].wfStep_AR[x].wfStep_code);
          if(this.workflowDef_AR[w].wfStep_AR[x].wfDef_idx == w && this.workflowDef_AR[w].wfStep_AR[x].step_ztic == objx.objectZTIC && this.workflowDef_AR[w].wfStep_AR[x].step_code == objx.objectCode){
            found_wf_step = true;
            wf_def_idx = w;
            wf_step_idx = x;

         } // endif
       }  // endfor loop through wfStep_AR
  }  // endfor loop through workflowDef_AR

  
  if(found_wf_step){
      this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].id        = objx.id;
      this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].parent_id = objx.parentId;
  } // endif





 //console.log("&&& 20220823 object is a workflow  step");

 ///console.log("&&& worflow step 20220613 objx.objectZTIC - objx.objetCode: "+objx.objectZTIC+" - "+objx.objectCode);


 // //console.log("Object Element values");
 console.log("20220904 found_wf_step: "+found_wf_step);
 if(found_wf_step){
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

     // check if object element is for workflow step description (OE code 5)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == wf_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 5){  
    
        this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].wfStep_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 

     } // endif object element is workflow step desc



        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
    
          


 // //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

 // //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

        this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_idx].step_type_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC;
        this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_idx].step_type_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode;

   //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
  //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
      }  // endfor to loop through type values

 // bookmark 20220823
 // //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){


       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 3){ // link type is workflow step to workflow step series
         var new_workflow_step = new wf_wa.WfStep(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_workflow_step_series.wfDef_idx = wf_def_idx;

         var workflow_step_series_idx = this.workflowDef_AR[wf_def_idx].wfStepSeries_AR.push(new_workflow_step_series) -1;
         //this.workflowDef_AR[wf_def_idx].wfStep_AR[workflow_step_idx].linked_wf_step_series_idx = workflow_step_series_idx;   (del) 20221015
         this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].linked_wf_step_series_idx = workflow_step_series_idx;   //      20221015
       }  // endif link type is workfow step to workflow step series


       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 5){ // link type is workflow step to a function
         var new_function = new wf_wa.Function(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_function.wfDef_idx = wf_def_idx;

         var function_idx = this.workflowDef_AR[wf_def_idx].function_AR.push(new_function) -1;
         //this.workflowDef_AR[wf_def_idx].wfStep_AR[workflow_step_idx].function_idx_AR.push(function_idx);    (del) 20221015
         this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].function_idx_AR.push(function_idx);    // 20221015
       }  // endif link type is workfow step to function



       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 6){ // link type is workflow step to a map
         var new_map = new wf_wa.Map(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_map.wfDef_idx = wf_def_idx;

         var map_idx = this.workflowDef_AR[wf_def_idx].map_AR.push(new_map) -1;
         //this.workflowDef_AR[wf_def_idx].wfStep_AR[workflow_step_idx].map_idx_AR.push(map_idx);   (del) 20221015
         this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].map_idx_AR.push(map_idx);     // 20221015
       }  // endif link type is workfow step to map


       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 16){ // link type is workflow step to a message sender
         var new_msender = new wf_wa.MessageSender(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_msender.wfDef_idx = wf_def_idx;

         var msender_idx = this.workflowDef_AR[wf_def_idx].msender_AR.push(new_msender) -1;
         //this.workflowDef_AR[wf_def_idx].wfStep_AR[workflow_step_idx].msender_idx_AR.push(msender_idx);  (del) 20221015
         this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].msender_idx_AR.push(msender_idx);  // 20221015
       }  // endif link type is workfow step to message sender

       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == wf_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 17){ // link type is workflow step to a message receiver
         var new_mreceiver = new wf_wa.MessageReceiver(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_mreceiver.wfDef_idx = wf_def_idx;

         var mreceiver_idx = this.workflowDef_AR[wf_def_idx].msender_AR.push(new_mreceiver) -1;
         //this.workflowDef_AR[wf_def_idx].wfStep_AR[workflow_step_idx].msender_idx_AR.push(mreceiver_idx);    (del) 20221015
         this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].msender_idx_AR.push(mreceiver_idx);    // 20221015
       }  // endif link type is workfow step to message receiver


 // //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
       }  // endfor loop through link_idx_AR

      }  // endif  if(found_wf_step)

     } // endif object is a workflow step


// start 20220918
if(objx.objectKindCode == 3){ console.log("^^ 20220919 messaging_ztic: "+messaging_ztic);}
if(objx.objectKindZTIC == messaging_ztic && objx.objectKindCode == 3){  // object is a message sender (code 3 )

  var found_msender = false;
  var wf_step_idx = 0;
  var wf_def_idx = 0;
  var msender_idx = 0;

 // check if message sender has already been added for workflow step
  for(var w = 0; w < this.workflowDef_AR.length; w++){
       for(var x = 0; x < this.workflowDef_AR[w].msender_AR.length; x++){
       
         console.log("20220904 this.workflowDef_AR[w].wfStep_AR[x].wfDef_idx - w - this.workflowDef_AR[w].msender_AR[x].msender_ztic - this.workflowDef_AR[w].wfStep_AR[x].msender_code: "+ this.workflowDef_AR[w].msender_AR[x].wfDef_idx + " - "+w+" - "+ this.workflowDef_AR[w].msender_AR[x].msender_ztic+" - "+objx.objectZTIC+" = "+this.workflowDef_AR[w].msender_AR[x].msender_code+" - "+objx.objectCode);
          if(this.workflowDef_AR[w].msender_AR[x].wfDef_idx == w && this.workflowDef_AR[w].msender_AR[x].msender_ztic == objx.objectZTIC && this.workflowDef_AR[w].msender_AR[x].msender_code == objx.objectCode){
            found_msender = true;
            wf_def_idx = w;
            msender_idx = x;
         } // endif
 
       }  // endfor loop through msender_AR
  }  // endfor loop through workflowDef_AR

  
  if(found_msender){
      this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].id        = objx.id;
      this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].parent_id = objx.parentId;
  } // endif





 //console.log("&&& 20220823 object is a message sender");

 ///console.log("&&& worflow step 20220613 objx.objectZTIC - objx.objetCode: "+objx.objectZTIC+" - "+objx.objectCode);


 // //console.log("Object Element values");
 console.log("20220904 found_msender: "+found_msender);
 if(found_msender){
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

     // check if object element is for message sender description (OE code 3)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == messaging_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3){  
    
        this.workflowDef_AR[wf_def_idx].msender_AR[msender_idx].msender_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 
      console.log("^^20220919 msender_desc  msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);

     } // endif object element is message sender desc



        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
    
          


 // //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

 // //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){


   //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
  //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
 ///      this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_type_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC;
 ///      this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_type_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode
      }  // endfor to loop through type values

 
 // //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){



       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == messaging_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 3){ // link type is message sender to a message receiver
         var new_mreceiver = new wf_wa.MessageReceiver(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_mreceiver.wfDef_idx = wf_def_idx;

         var mreceiver_idx = this.workflowDef_AR[wf_def_idx].mreceiver_AR.push(new_mreceiver) -1;
         this.workflowDef_AR[wf_def_idx].msender_AR[msender_idx].mreceiver_idx_AR.push(mreceiver_idx);

       }  // endif link type is message sender to message receiver


       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == messaging_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 5){ // link type is message sender to a resource
         var new_resource1 = new wf_wa.Resource(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_resource1.wfDef_idx = wf_def_idx;

         var resource1_idx = this.workflowDef_AR[wf_def_idx].resource_AR.push(new_resource1) -1;
         this.workflowDef_AR[wf_def_idx].msender_AR[msender_idx].resource_idx_AR.push(resource1_idx);

       }  // endif link type is message sender to resource


       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == messaging_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 7){ // link type is message sender to a map
         var new_map = new wf_wa.Map(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_map.wfDef_idx = wf_def_idx;

         var map_idx = this.workflowDef_AR[wf_def_idx].map_AR.push(new_map) -1;
         this.workflowDef_AR[wf_def_idx].msender_AR[msender_idx].map_idx_AR.push(map_idx);

       }  // endif link type is message sender to a map


       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == messaging_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 15){ // link type is message sender to a program to create messages
         var new_program = new wf_wa.Program(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_program.wfDef_idx = wf_def_idx;

         var program_idx = this.workflowDef_AR[wf_def_idx].program_AR.push(new_program) -1;
         this.workflowDef_AR[wf_def_idx].msender_AR[msender_idx].program_idx_AR.push(program_idx);

       }  // endif link type is message sender to program to create messages

 // //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
       }  // endfor loop through link_idx_AR

      }  // endif  if(found_wf_step)

     } // endif object is a message sender



if(objx.objectKindZTIC == messaging_ztic && objx.objectKindCode == 4){  // object is a message receiver (code 4 )

  var found_mreceiver = false;
  var wf_step_idx = 0;
  var wf_def_idx = 0;
  var mreceiver_idx = 0;

 // check if message receiver has already been added for workflow step
  for(var w = 0; w < this.workflowDef_AR.length; w++){
       for(var x = 0; x < this.workflowDef_AR[w].mreceiver_AR.length; x++){
       
         console.log("20220904 this.workflowDef_AR[w].wfStep_AR[x].wfDef_idx - w - this.workflowDef_AR[w].mreceiver_AR[x].mreceiver_ztic - this.workflowDef_AR[w].wfStep_AR[x].mreceiver_code: "+ this.workflowDef_AR[w].mreceiver_AR[x].wfDef_idx + " - "+w+" - "+ this.workflowDef_AR[w].mreceiver_AR[x].mreceiver_ztic+" - "+objx.objectZTIC+" = "+this.workflowDef_AR[w].mreceiver_AR[x].mreceiver_code+" - "+objx.objectCode);
          if(this.workflowDef_AR[w].mreceiver_AR[x].wfDef_idx == w && this.workflowDef_AR[w].mreceiver_AR[x].mreceiver_ztic == objx.objectZTIC && this.workflowDef_AR[w].mreceiver_AR[x].mreceiver_code == objx.objectCode){
            found_mreceiver = true;
            wf_def_idx = w;
            mreceiver_idx = x;
         } // endif
 
       }  // endfor loop through mreceiver_AR
  }  // endfor loop through workflowDef_AR

  
  if(found_mreceiver){
      this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].id        = objx.id;
      this.workflowDef_AR[wf_def_idx].wfStep_AR[wf_step_idx].parent_id = objx.parentId;
  } // endif





 //console.log("&&& 20220823 object is a message receiver");

 ///console.log("&&& worflow step 20220613 objx.objectZTIC - objx.objetCode: "+objx.objectZTIC+" - "+objx.objectCode);


 // //console.log("Object Element values");
 console.log("20220904 found_mreceiver: "+found_mreceiver);
 if(found_mreceiver){
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

     // check if object element is for message receiver description (OE code 4)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == messaging_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 4){  
    
        this.workflowDef_AR[wf_def_idx].mreceiver_AR[mreceiver_idx].mreceiver_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 
      console.log("^^20220919 mreceiver_desc  msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);

     } // endif object element is message receiver desc



        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
    
          


 // //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

 // //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){


   //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
  //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
      }  // endfor to loop through type values

 
 // //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){



       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == messaging_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 6){ // link type is message receiver to a resource
         var new_resource = new wf_wa.Resource(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_resource.wfDef_idx = wf_def_idx;

         var resource_idx = this.workflowDef_AR[wf_def_idx].resource_AR.push(new_resource) -1;
         this.workflowDef_AR[wf_def_idx].mreceiver_AR[mreceiver_idx].resource_idx_AR.push(resource_idx);

       }  // endif link type is message receiver to message resource


       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == messaging_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 16){ // link type is message receiver to a program to deliver a message
         var new_program = new wf_wa.Program(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_program.wfDef_idx = wf_def_idx;

         var program_idx = this.workflowDef_AR[wf_def_idx].program_AR.push(new_program) -1;
         this.workflowDef_AR[wf_def_idx].mreceiver_AR[mreceiver_idx].program_idx_AR.push(program_idx);

       }  // endif link type is message receiver to a program to deliver a message


 // //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
       }  // endfor loop through link_idx_AR

      }  // endif  if(found_mreceiver)

     } // endif object is a message receiver



if(objx.objectKindZTIC == base_ztic && objx.objectKindCode == 39){  // object is a resource (code 39 )

  var resource_found = false;
  var wf_step_idx = 0;
  var wf_def_idx = 0;
  var resource_idx = 0;

 // check if resource has already been added for message receiver
  for(var w = 0; w < this.workflowDef_AR.length; w++){
       for(var x = 0; x < this.workflowDef_AR[w].resource_AR.length; x++){
       
        // console.log("20220904 this.workflowDef_AR[w].resource_AR[x].wfDef_idx - w - this.workflowDef_AR[w].mreceiver_AR[x].mreceiver_ztic - this.workflowDef_AR[w].resource_AR[x].resource_code: "+ this.workflowDef_AR[w].resource_AR[x].wfDef_idx + " - "+w+" - "+ this.workflowDef_AR[w].resource_AR[x].resource_ztic+" - "+objx.objectZTIC+" = "+this.workflowDef_AR[w].resource_AR[x].resource_code+" - "+objx.objectCode);
          if(this.workflowDef_AR[w].resource_AR[x].wfDef_idx == w && this.workflowDef_AR[w].resource_AR[x].resource_ztic == objx.objectZTIC && this.workflowDef_AR[w].resource_AR[x].resource_code == objx.objectCode){
            resource_found = true;
            wf_def_idx = w;
            resource_idx = x;
            
        } // endif
 
       }  // endfor loop through resource_AR
  }  // endfor loop through workflowDef_AR

  
  if(resource_found){
      this.workflowDef_AR[wf_def_idx].resource_AR[resource_idx].id        = objx.id;
      this.workflowDef_AR[wf_def_idx].resource_AR[resource_idx].parent_id = objx.parentId;
  } // endif





 //console.log("&&& 20220823 object is a resource");

 ///console.log("&&& worflow step 20220613 objx.objectZTIC - objx.objetCode: "+objx.objectZTIC+" - "+objx.objectCode);


 // //console.log("Object Element values");
 console.log("20220904 resource_found: "+resource_found);
 if(resource_found){
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

     // check if object element is for resource description (OE code 39)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 39){  
    
        this.workflowDef_AR[wf_def_idx].resource_AR[resource_idx].resource_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 
      console.log("^^20220919 resource_desc  msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);

     } // endif object element is resource desc

     // check if object element is for resource path/name (OE code 210)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 210){  
    
        this.workflowDef_AR[wf_def_idx].resource_AR[resource_idx].resource_path = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 
      console.log("^^20220919 resource_path  msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);

     } // endif object element is resource path/name


        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
    
          


 // //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
      }  // endfor loop through objx.objectElement_idx_AR  

 // //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

      //  this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_idx].step_type_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC;
      //  this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_idx].step_type_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode;

   //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
  //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
      }  // endfor to loop through type values

 
 // //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){




 // //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
       }  // endfor loop through link_idx_AR

      }  // endif  if(resource_found)

     } // endif object is a resource








if(objx.objectKindZTIC == map_ztic && objx.objectKindCode == 1){  // object is a map (code 1 )

  var found_map = false;
  var wf_step_idx = 0;
  var wf_def_idx = 0;
  var map_idx = 0;

 // check if map has already been added for workflow step
  for(var w = 0; w < this.workflowDef_AR.length; w++){
       for(var x = 0; x < this.workflowDef_AR[w].map_AR.length; x++){
       
      //   console.log("20220904 this.workflowDef_AR[w].wfStep_AR[x].wfDef_idx - w - this.workflowDef_AR[w].map_AR[x].map_ztic - this.workflowDef_AR[w].wfStep_AR[x].mreceiver_code: "+ this.workflowDef_AR[w].mreceiver_AR[x].wfDef_idx + " - "+w+" - "+ this.workflowDef_AR[w].mreceiver_AR[x].mreceiver_ztic+" - "+objx.objectZTIC+" = "+this.workflowDef_AR[w].mreceiver_AR[x].mreceiver_code+" - "+objx.objectCode);
          if(this.workflowDef_AR[w].map_AR[x].wfDef_idx == w && this.workflowDef_AR[w].map_AR[x].map_ztic == objx.objectZTIC && this.workflowDef_AR[w].map_AR[x].map_code == objx.objectCode){
            found_map = true;
            wf_def_idx = w;
            map_idx = x;
         } // endif
 
       }  // endfor loop through map_AR
  }  // endfor loop through workflowDef_AR

  



 //console.log("&&& 20220823 object is a map");

 ///console.log("&&& worflow step 20220613 objx.objectZTIC - objx.objetCode: "+objx.objectZTIC+" - "+objx.objectCode);


 // //console.log("Object Element values");
 console.log("20220904 found_mreceiver: "+found_map);
 if(found_map){
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

     // check if object element is for map description (OE code 1)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == map_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 1){  
    
        this.workflowDef_AR[wf_def_idx].map_AR[map_idx].map_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 
      console.log("^^20220919 mreceiver_desc  msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);

     } // endif object element is map desc



        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
    
          


 // //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

 // //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){


   //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
  //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
  //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
 ///      this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_type_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC;
 ///      this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_type_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode
      }  // endfor to loop through type values

 
 // //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){



       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == map_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 6){ // link type is map to class/program
         var new_program = new wf_wa.Program(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_program.wfDef_idx = wf_def_idx;

         var program_idx = this.workflowDef_AR[wf_def_idx].program_AR.push(new_program) -1;
         this.workflowDef_AR[wf_def_idx].map_AR[map_idx].map_program_idx_AR.push(program_idx);

       }  // endif link type is map to program

 // //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
       }  // endfor loop through link_idx_AR

      }  // endif  if(found_map)

     } // endif object is a map


if(objx.objectKindZTIC == base_ztic && objx.objectKindCode == 37){  // object is a program (code 37 )

  var found_program = false;
  var wf_step_idx = 0;
  var wf_def_idx = 0;
  var program_idx = 0;

 // check if program has already been added for workflow step
  for(var w = 0; w < this.workflowDef_AR.length; w++){
       for(var x = 0; x < this.workflowDef_AR[w].program_AR.length; x++){
       
      //   console.log("20220904 this.workflowDef_AR[w].wfStep_AR[x].wfDef_idx - w - this.workflowDef_AR[w].map_AR[x].map_ztic - this.workflowDef_AR[w].wfStep_AR[x].mreceiver_code: "+ this.workflowDef_AR[w].mreceiver_AR[x].wfDef_idx + " - "+w+" - "+ this.workflowDef_AR[w].mreceiver_AR[x].mreceiver_ztic+" - "+objx.objectZTIC+" = "+this.workflowDef_AR[w].mreceiver_AR[x].mreceiver_code+" - "+objx.objectCode);
          if(this.workflowDef_AR[w].program_AR[x].wfDef_idx == w && this.workflowDef_AR[w].program_AR[x].program_ztic == objx.objectZTIC && this.workflowDef_AR[w].program_AR[x].program_code == objx.objectCode){
            found_program = true;
            wf_def_idx = w;
            program_idx = x;
         } // endif
 
       }  // endfor loop through program_AR
  }  // endfor loop through workflowDef_AR

   


 ///console.log("&&& worflow step 20220613 objx.objectZTIC - objx.objetCode: "+objx.objectZTIC+" - "+objx.objectCode);


 // //console.log("Object Element values");
 console.log("20220904 found_program: "+found_program);
 if(found_program){
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

     // check if object element is for program description (OE code 1)
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 37){  
    
        this.workflowDef_AR[wf_def_idx].program_AR[program_idx].program_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 
      console.log("^^20220919 program_desc  msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);

     } // endif object element is program desc



        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
    
          


 // //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
 // //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

 // //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

      //  this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_idx].step_type_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC;
      //  this.workflowDef_AR[wf_def_idx].wfStepSeries_AR[wf_step_idx].step_type_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode;

   //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
      }  // endfor to loop through type values

 
 // //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){



       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == base_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 9){ // link type is program to resource
         var new_resource = new wf_wa.Resource(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         new_resource.wfDef_idx = wf_def_idx;

         var resource_idx = this.workflowDef_AR[wf_def_idx].resource_AR.push(new_resource) -1;
         this.workflowDef_AR[wf_def_idx].program_AR[program_idx].resource_idx_AR.push(resource_idx);

       }  // endif link type is program to resource


 // //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
 // //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
       }  // endfor loop through link_idx_AR

      }  // endif  if(found_resource)

     } // endif object is a program






    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k   
 }  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjectQset)





}  /// end of setValuesFromInitialMessageForWorkflow(msg)  

processMessagesForWorkflowStep(workflow_idx, stepx){

console.log("executng processMessagesForWorkflowStep()");

var msg_container_idx = this.getMessageFromSender(workflow_idx, stepx);
var sent_msg_idx = this.workflow_AR[workflow_idx].messageContainer_AR[msg_container_idx].msgFromSender_idx;
var sent_msg_str = this.workflow_AR[workflow_idx].message_AR[sent_msg_idx].messageStr;
console.log("sent_msg_str in processMessagesForWorkflowStep: "+sent_msg_str);

this.sendMessageToReceivers(workflow_idx, stepx, msg_container_idx);




}  // end of processMessagesForWorkflowStep


getMessageFromSender(workflow_idx, stepx){

console.log("*** 20221012 starting getMessageFromSender()");

var wf_wa = require('./zt_client_workflow_workarea');

console.log(" ");
console.log("running getMessageFromSender");

var sender_program;
var sender_message_path;
var sender_idx;
var msg_container_idx = 0;
    
  console.log("stepx.msender_idx_AR.length: "+stepx.msender_idx_AR.length);
  console.log("** 20221031 stepx.wfStep_desc: "+ stepx.wfStep_desc);
  for(var i = 0; i < stepx.msender_idx_AR.length; i++){    // NOTE for now a step should have at most 1 sender
     
    console.log("this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[stepx.msender_idx_AR[i]].msender_desc: "+this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[stepx.msender_idx_AR[i]].msender_desc);
      sender_idx = stepx.msender_idx_AR[i];
// start  get sender source file resource
     for(var j = 0; j < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[stepx.msender_idx_AR[i]].resource_idx_AR.length; j++){
        var resource_idx_locl = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[stepx.msender_idx_AR[i]].resource_idx_AR[j]; // 20221031
        console.log("sender source file: "+ this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[j].resource_path);
       // sender_message_path = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[j].resource_path;  (del) 20221031  
       sender_message_path = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[resource_idx_locl].resource_path;  // 20221031
     }  // endfor loop through sender resource_idx_AR



//  start get program and program resouces
      for(var j = 0; j < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[stepx.msender_idx_AR[i]].program_idx_AR.length; j++){
        console.log("sender program: "+ this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].program_AR[j].program_desc);

         var prgrm_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[stepx.msender_idx_AR[i]].program_idx_AR[j];
         console.log("***20221012 prgrm_idx: "+prgrm_idx);
         for(var k = 0; k < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].program_AR[prgrm_idx].resource_idx_AR.length; k++){
            var resource_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].program_AR[prgrm_idx].resource_idx_AR[k];  
            console.log("sender program resource path: "+this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[resource_idx].resource_path); 
            sender_program = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[resource_idx].resource_path;
       

         }  // endfor loop through  resource_idx_AR
             

      }  // endfor loop through program_idx_AR




  }  // endfor loop through step.msender_idx_AR



console.log("sender_program - sender_message_file in getMessageFromSender(): "+ sender_program +" - "+ sender_message_path);


var sender_program_path = "./workflow/sender/program/"+sender_program;

var sender_class = new (require(sender_program_path))(sender_message_path, this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx], this.workflow_AR[workflow_idx], sender_idx); 
var sent_message_str = sender_class.getMessage();
console.log("sent_message_str in getMessageFromSender(): "+sent_message_str);
console.log("this.TargetNS: "+this.TargetNS);
var target_ztic;

for(var i = 0; i < this.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == this.TargetNS.toString().trim()){
       target_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


var new_msg_container = new wf_wa.MessageContainer(target_ztic, this.nextMessageContainerCode);
this.nextMessageContainerCode++;
new_msg_container.wfDef_idx = this.workflow_AR[workflow_idx].wfDef_idx;
new_msg_container.workflow_idx = workflow_idx;
new_msg_container.msender_idx = sender_idx;


var new_sent_message = new wf_wa.Message(target_ztic, this.nextMessageCode);
this.nextMessageCode++;
new_sent_message.messageStr = sent_message_str;
new_sent_message.wfDef_idx = this.workflow_AR[workflow_idx].wfDef_idx;
new_sent_message.workflow_idx = workflow_idx;
var message_idx       = this.workflow_AR[workflow_idx].message_AR.push(new_sent_message) -1;

new_msg_container.msgFromSender_idx = message_idx;

var msg_container_idx = this.workflow_AR[workflow_idx].messageContainer_AR.push(new_msg_container) -1;


 return msg_container_idx;


}  // end of getMessageFromSender()


updateMessageStr(workflow_idx, container_idx, mversion_code, message_str){

var wf_wa = require('./zt_client_workflow_workarea');

var target_ztic;

for(var i = 0; i < this.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == this.TargetNS.toString().trim()){
       target_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfo


if(mversion_code == 4){
 var new_message_with_resp = new wf_wa.Message(target_ztic, this.nextMessageCode);
 this.nextMessageCode++;
 new_message_with_resp.messageStr = message_str;
 console.log("workflow_idx: "+workflow_idx);
 new_message_with_resp.wfDef_idx = this.workflow_AR[workflow_idx].wfDef_idx;
 new_message_with_resp.workflow_idx = workflow_idx;
 var message_idx       = this.workflow_AR[workflow_idx].message_AR.push(new_message_with_resp) -1;

 this.workflow_AR[workflow_idx].messageContainer_AR[container_idx].msgWithResponse_idx = message_idx;
 //console.log("** 20221024 this.workflow_AR[workflow_idx].message_AR[message_idx].messageStr in zt_client_workflow in updateMessageStr in zt_client_workflow.js: "+ this.workflow_AR[workflow_idx].message_AR[message_idx].messageStr);   // TEMP DEL 20221024
} // endif

}  // end of updateMessageStr()



sendMessageToReceivers(workflow_idx, stepx, msg_container_idx){

var wf_wa = require('./zt_client_workflow_workarea');

console.log(" ");
console.log("running sendMessageToReceivers");var param_AR  = [];



//var sender_program;
var receiver_program;
var receiver_message;

var sender_idx;
var receiver_target_url = "";  

  for(var i = 0; i < stepx.msender_idx_AR.length; i++){    // NOTE for now a step should have at most 1 sender
     
   // console.log("this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[stepx.msender_idx_AR[i]].msender_desc: "+this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[stepx.msender_idx_AR[i]].msender_desc);
      sender_idx = stepx.msender_idx_AR[i];



      for(var j = 0; j < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[stepx.msender_idx_AR[i]].mreceiver_idx_AR.length; j++){
        console.log("receiver: "+ this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].mreceiver_AR[j].mreceiver_desc);

         var rec_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].msender_AR[stepx.msender_idx_AR[i]].mreceiver_idx_AR[j];

         for(var k = 0; k < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].mreceiver_AR[rec_idx].resource_idx_AR.length; k++){
            var resource_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].mreceiver_AR[rec_idx].resource_idx_AR[k];  
            console.log("resource path in sendMessageToReceivers: "+this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[resource_idx].resource_path);          
           receiver_target_url = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[resource_idx].resource_path;

         }  // endfor loop through  resource_idx_AR


         for(var k = 0; k < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].mreceiver_AR[rec_idx].program_idx_AR.length; k++){
            var prgrm_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].mreceiver_AR[rec_idx].program_idx_AR[k];  
            console.log("program desc to deliver msg in sendMessageToReceivers: "+this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].program_AR[prgrm_idx].program_desc); 

              for(var l = 0; l < this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].program_AR[prgrm_idx].resource_idx_AR.length; l++){
                 var resource_idx = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].program_AR[prgrm_idx].resource_idx_AR[l];  
                 console.log("receiver program resource path: "+this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[resource_idx].resource_path); 
                 receiver_program = this.workflowDef_AR[this.workflow_AR[workflow_idx].wfDef_idx].resource_AR[resource_idx].resource_path;
       

              }  // endfor loop through  resource_idx_AR

         


         }  // endfor loop through  program_idx_AR
             

      }  // endfor loop through mreceiver_idx_AR





  }  // endfor loop through step.msender_idx_AR



//console.log("receiver_program - receiver_message in sendMessageToReceivers(): "+ receiver_program +" - "+ receiver_message);


var receiver_program_path = "./workflow/receiver/program/"+receiver_program;


var receiver_message_idx = this.workflow_AR[workflow_idx].messageContainer_AR[msg_container_idx].msgAfterReceiverMap_idx;
if(receiver_message_idx == 0){
  receiver_message_idx = this.workflow_AR[workflow_idx].messageContainer_AR[msg_container_idx].msgFromSender_idx;
} // endif
receiver_message = this.workflow_AR[workflow_idx].message_AR[receiver_message_idx].messageStr;


console.log("receiver_target_url before passMessage(): "+receiver_target_url);
console.log("receiver_message before passMessage(): "+receiver_message);
////urlx, recordFormatMsg_ARx, ZTICNS_ARx, TargetNSx, wf_domain_idx, workflow_idx, msg_container_idx
//(urlx, rec_format_msgx, ZTICNS_ARx, TargetNSx, wf_domain_idx, workflow_idx, msg_container_idx)
//NOTE DOMAIN IDX is HARD-CODED 0 FOR NOW,  REVISIT
console.log("20221025 receiver_program_path in zt_client_workflow: "+receiver_program_path);
console.log("workflow_idx - msg_container_idx: "+workflow_idx+" - "+msg_container_idx);

var receiver_class = new (require(receiver_program_path))(receiver_target_url, receiver_message, this.ZTICNS_AR, this.TargetNS, 0, workflow_idx, msg_container_idx); 
var received_message_resp = receiver_class.passMessage();
//console.log("**20221016a receiver_message in sendMessageToReceivers(): "+received_message_resp);
//console.log("this.TargetNS: "+this.TargetNS);
var target_ztic;

for(var i = 0; i < this.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == this.TargetNS.toString().trim()){
       target_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

// end 20221006



} // end of sendMessageToReceivers(workflow_idx, stepx, msg_container_idx)


parseParameterStringToArray(param_str){

var wf_wa = require('./zt_client_workflow_workarea');

var open_idx; 
var close_idx; 

var done = false;


while(!done){
  open_idx = param_str.indexOf('[');
  if(open_idx < 0){done = true; break;} 
  close_idx = param_str.indexOf(']');

  console.log("open_idx - close_idx: "+open_idx + " - "+close_idx);
  var len = close_idx - open_idx -2;
  var start = open_idx + 2;
  var delim = param_str.substr(open_idx+1,1);
  console.log("param_substr: "+param_str.substr(start,len));

  var param_single = param_str.substr(start,len);
  param_str = param_str.substr(close_idx + 1);
  console.log("delim: "+delim);
  var part1_idx = param_single.indexOf(delim);
  var part1_str = param_single.substr(0,part1_idx);

  param_single = param_single.substr(part1_idx+1);
  var part2_idx = param_single.indexOf(delim);
  var part2_str = param_single.substr(0,part2_idx);

  param_single = param_single.substr(part2_idx+1);
  var part3_str = param_single;



  var param_rec = new wf_wa.ParameterRec();

  param_rec.param_ns = part1_str;
  param_rec.param_code = part2_str;
  param_rec.param_value = part3_str;
  param_AR.push(param_rec);

} // endwhile



for(var i = 0; i < param_AR.length; i++){

  console.log("param_ns | param_code | param_value: "+param_AR[i].param_ns+" | "+param_AR[i].param_code+" | "+param_AR[i].param_value);
              
} // endfor

return param_AR;

}  // end of parseParameterStringToArray



displayContents(){


    console.log(" ");
    console.log(" ");
    console.log("List of Workflow Domain values for ZTIC - Code: "+this.wf_domain_ztic+" - "+this.wf_domain_code);
    console.log("wf_domain_desc: "+this.wf_domain_desc);
    console.log(" ");

   // for(var h = 0; h < wf_domain_AR.length; h++){
     // console.log("wf_domain_AR[h].wf_domain_desc: "+wf_domain_AR[h].wf_domain_desc);
      for(var i = 0; i < this.workflowDef_AR.length; i++){
       console.log("workflowDef_AR[i].desc: "+this.workflowDef_AR[i].desc);
       for(var k = 0; k < this.workflowDef_AR[i].wfStepSeries_AR.length; k++){
          console.log("workflowDef_AR[i].wfStepSeries_AR[k].desc: "+ this.workflowDef_AR[i].wfStepSeries_AR[k].wfStepSeries_code +" - "+ this.workflowDef_AR[i].wfStepSeries_AR[k].wfStepSeries_desc);
         for(var l = 0; l < this.workflowDef_AR[i].wfStepSeries_AR[k].wfStep_idx_AR.length; l++){
          
           console.log("workflowDef_AR[i].wfStep_AR[this.workflowDef_AR[i].wfStepSeries_AR[k].wfStep_idx_AR[l].wfStep_desc: "+this.workflowDef_AR[i].wfStep_AR[this.workflowDef_AR[i].wfStepSeries_AR[k].wfStep_idx_AR[l]].wfStep_desc);
             var wf_step_loc = this.workflowDef_AR[i].wfStep_AR[this.workflowDef_AR[i].wfStepSeries_AR[k].wfStep_idx_AR[l]];
             for(var m = 0; m < wf_step_loc.msender_idx_AR.length; m++){
 console.log("workflowDef_AR[i].msender_AR[wf_step_loc.msender_idx_AR[m]].msender_desc: "+this.workflowDef_AR[i].msender_AR[wf_step_loc.msender_idx_AR[m]].msender_desc);

                   for(var n = 0; n < this.workflowDef_AR[i].msender_AR[wf_step_loc.msender_idx_AR[m]].resource_idx_AR.length; n++){
                        var resource_idx = this.workflowDef_AR[i].msender_AR[wf_step_loc.msender_idx_AR[m]].resource_idx_AR[n];
                     
                      console.log("sender resource path - workflowDef_AR[i].resource_AR[resource_idx].resource_path: "+this.workflowDef_AR[i].resource_AR[resource_idx].resource_path);

                   } // endfor loop through resource_idx_AR for message sender               
 
                   for(var n = 0; n < this.workflowDef_AR[i].msender_AR[wf_step_loc.msender_idx_AR[m]].mreceiver_idx_AR.length; n++){
                        var rec_idx = this.workflowDef_AR[i].msender_AR[wf_step_loc.msender_idx_AR[m]].mreceiver_idx_AR[n];
                        
 console.log("receiver desc - workflowDef_AR[i].mreceiver_AR[rec_idx].mreceiver_desc: "+this.workflowDef_AR[i].mreceiver_AR[rec_idx].mreceiver_desc);

                      for(var p = 0; p < this.workflowDef_AR[i].mreceiver_AR[rec_idx].resource_idx_AR.length; p++){
                        var resource_idx = this.workflowDef_AR[i].mreceiver_AR[rec_idx].resource_idx_AR[p];
                        console.log("resource path: "+this.workflowDef_AR[i].resource_AR[resource_idx].resource_path);

                      } // endfor  loop through resource_idx_AR


                      for(var p = 0; p < this.workflowDef_AR[i].mreceiver_AR[rec_idx].program_idx_AR.length; p++){
                        var program_idx = this.workflowDef_AR[i].mreceiver_AR[rec_idx].program_idx_AR[p];
                        console.log("message receiver programe desc: "+this.workflowDef_AR[i].program_AR[program_idx].program_desc);

                      } // endfor  loop through program_idx_AR


                   }  // endfor  loop through mreceiver_idx_AR

// start loop through programs and program resources
                   for(var n = 0; n < this.workflowDef_AR[i].msender_AR[wf_step_loc.msender_idx_AR[m]].program_idx_AR.length; n++){
                        var prgrm_idx = this.workflowDef_AR[i].msender_AR[wf_step_loc.msender_idx_AR[m]].program_idx_AR[n];
                        
 console.log("program desc - workflowDef_AR[i].program_AR[rec_idx].program_desc: "+this.workflowDef_AR[i].program_AR[rec_idx].program_desc);

                      for(var p = 0; p < this.workflowDef_AR[i].program_AR[prgrm_idx].resource_idx_AR.length; p++){
                        var prgrm_resource_idx = this.workflowDef_AR[i].program_AR[prgrm_idx].resource_idx_AR[p];
                        console.log("program resource path: "+this.workflowDef_AR[i].resource_AR[prgrm_resource_idx].resource_path);

                      } // endfor  loop through resource_idx_AR


                   }  // endfor  loop through mreceiver_idx_AR


             }  // endfor  loop through msender_idx_AR

         }  // endfor  loop through wfStep_idx_AR 
    
       }  // endfor loop through wfStepSeries_AR


       for(var j = 0; j < this.workflowDef_AR[i].workflow_idx_AR.length; j++){
          console.log("workflow_AR[this.workflowDef_AR[i].workflow_idx_AR[j]].desc: "+this.workflow_AR[this.workflowDef_AR[i].workflow_idx_AR[j]].desc);
          console.log("20220907 wf_code: "+this.workflow_AR[this.workflowDef_AR[i].workflow_idx_AR[j]].wf_code);
             for(var k = 0; k < this.workflow_AR[this.workflowDef_AR[i].workflow_idx_AR[j]].messageContainer_AR.length; k++){
                var msgFromSender_idx = this.workflow_AR[this.workflowDef_AR[i].workflow_idx_AR[j]].messageContainer_AR[k].msgFromSender_idx;
                //console.log("     msgFromSender: "+this.workflow_AR[this.workflowDef_AR[i].workflow_idx_AR[j]].message_AR[msgFromSender_idx].messageStr);  TEMP DEL
                var msgWithResponse_idx = this.workflow_AR[this.workflowDef_AR[i].workflow_idx_AR[j]].messageContainer_AR[k].msgWithResponse_idx;
                //console.log("     msgWithResponse: "+this.workflow_AR[this.workflowDef_AR[i].workflow_idx_AR[j]].message_AR[msgWithResponse_idx].messageStr); TEMP DEL
             } // endfor loop through messageContainer_AR
             console.log("List all MessageStr values from message_AR for workflow in zt_client_workflow displayContents() TEMP DELETED");
             for(var k = 0; k < this.workflow_AR[this.workflowDef_AR[i].workflow_idx_AR[j]].message_AR.length; k++){
               //  console.log("messageStr: "+this.workflow_AR[this.workflowDef_AR[i].workflow_idx_AR[j]].message_AR[k].messageStr);  //TEMP DEL
             }

       } // endfor  loop through workflow_idx_AR

   
      }  // endfor loop through workflowDef_AR




}  // end of displayContents()





}  // end of class
module.exports = ZtWorkflowDomain;
