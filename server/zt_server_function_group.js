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



// copied from ds2b00002_server_statistical_values_objrct.js 


class ZtFunctionGroup {     

  //var HashMap = require('hashmap');
    // new (require('./zt_server_validation'))( svr1, this, validation_obj_idx, timestampx );
    // NOTE: validation_object was renamed to function_group   20250109
    constructor(svr1x, msgx, function_group_idxx, timestampx, parameter_ARx) {
      var HashMap = require('hashmap');
      this.svr1 = svr1x;
      this.msg  = msgx;
      this.function_group_idx = function_group_idxx;
      //this.validation_ztic = validation_zticx;
      //this.validation_code = validation_codex;
      this.timestamp = timestampx;
      this.parameter_AR = parameter_ARx;
      this.function_AR = [];
     // this.system_message_AR = [];  // (del) 20250131
      this.system_message_AR2 = [];   // to replace system_message_AR using zt_server_system_message.js when ready
      this.validation_status = "1";  // 1=Validation not yet started, 2=Validation Complete OK, 3=Validation Complete with warnings, 4=Validation Complete with errors   
      //this.stat_value_HM = new HashMap();


      
  } // end of constructor


  ////  validation.getValues(svr1x, timestampx);   
////  validation.performValidation();

getValues(){

var statusExclusion_AR  = [];  // revisit perhaps get it from msg
var get_values_maxLevelsDown_99 = 99;  // revisit perhaps get it from msg
//console.log("20240206c this.dbZtI_id: "+this.msg.dbZtI_id);
const base_ztic   = this.svr1.getCodeForNS(this.msg.dbZtI_id, "131131/21");
const validation_ztic = this.svr1.getCodeForNS(this.msg.dbZtI_id, "zinfinitree.com/validation");
//var validation_wa = require('./zt_server_validation_workarea');
//console.log("20240223a this.function_group_idx: "+this.function_group_idx);
var function_group_db_obj = this.svr1.ZtObject_AR[this.function_group_idx];
var validationKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+base_ztic+"_52_"+function_group_db_obj.objZTIC+"_"+function_group_db_obj.objCode;
var function_group_idx = this.svr1.ZtObject_idx_HM.get(validationKeyStr);  
//console.log("20240207i function_group_idx: "+function_group_idx);
var templDefForFunctionGroupKeyStr =     this.msg.dbZtI_id.toString().trim() + "_"+ base_ztic+"_2_"+base_ztic+"_52";
var template_def_idx_for_function_group = this.svr1.ZtObject_idx_HM.get(templDefForFunctionGroupKeyStr);
//console.log("20240207j template_def_idx_for_function_group: "+template_def_idx_for_function_group);
var resp_item_for_function_group_AR = function_group_db_obj.getAllValuesForTemplateDef(template_def_idx_for_function_group, this.msg, this.svr1.time.now(), statusExclusion_AR, get_values_maxLevelsDown_99 );           
//console.log("20250111a resp_item_for_function_group_AR.length: "+resp_item_for_function_group_AR.length);
resp_item_for_function_group_AR.forEach((resp_item_for_function_group) => {
  //console.log("20240207f resp_item_for_function_group.kindZTIC: "+resp_item_for_function_group.kindZTIC);
  //console.log("20240207g resp_item_for_function_group.kindCode: "+resp_item_for_function_group.kindCode);
    if(resp_item_for_function_group.kindZTIC == base_ztic && resp_item_for_function_group.kindCode == "52"){   // response item is a function group
       // console.log("20240207h resp_item_for_function_group.linkIdx_AR.length: "+resp_item_for_function_group.linkIdx_AR.length);
        resp_item_for_function_group.linkIdx_AR.forEach((resp_item_for_function_group_link) => {
            if(this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkType_ztic == base_ztic && this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkType_code == "31"){  // link to system message def
              //var new_sys_msg_def = new validation_wa.SystemMessageDefinition(this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkToCode_ztic, this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkToCode); 
              var new_sys_msg_def2 = new (require('./zt_server_system_message'))( this.svr1, this.msg, this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkToCode_ztic, this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkToCode, this.timestamp); 
                //start 20250123
                if(this.parameter_AR != undefined){
                  this.parameter_AR.forEach((parameter) => {
                   //console.log("20250123h parameter.namespace-code-value: "+parameter.namespace+"-"+parameter.code+"-"+parameter.value);
                    new_sys_msg_def2.setParameterValue(parameter.namespace, parameter.code, parameter.value);
                  });
                } // endif this.parameter_AR != undefined
                
                // end 20250123
              //this.system_message_AR.push(new_sys_msg_def); 
              this.system_message_AR2.push(new_sys_msg_def2);             
            } // endif link type is for link from validation/function group to system message def 
           //console.log("20240207d this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkType_ztic: "+this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkType_ztic);
           //console.log("20240207d this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkType_code: "+this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkType_code);
           if(this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkType_ztic == base_ztic && this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkType_code == "32"){  // link to validation function
             var new_function = new (require('./zt_server_function'))(this.svr1, this.msg, this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkToCode_ztic, this.svr1.ZtObjectLink_AR[resp_item_for_function_group_link].linkToCode, this.timestamp);   
             // start 20250110 add this.parameter_AR to new_function parameter_AR
             // temp (del) 20250110  
             if(this.parameter_AR != undefined){
               this.parameter_AR.forEach((parameter) => {
               // console.log("20250110a parameter.namespace-code-value: "+parameter.namespace+"-"+parameter.code+"-"+parameter.value);
                 new_function.setParameterValue(parameter.namespace, parameter.code, parameter.value);
               });
             } // endif this.parameter_AR != undefined
             //this.parameter_AR.forEach((parameter) => {
             //   new_function.setParameterValue(parameter.namespace, parameter.code, parameter.value);
             //});
             // end temp (del) 20250110
             // end 20250110
             this.function_AR.push(new_function);              
           } // endif link type is for link from validation to function 

       });  // end of loop through resp_item_for_function_group_linkIdx_AR
     } // endif resp_item_for_function_group.kindZTIC == base_ztic && resp_item_for_function_group.kindCode == "52"

    // start 20240205
    if(resp_item_for_function_group.kindZTIC == base_ztic && resp_item_for_function_group.kindCode == "36"){   // response item is a function
      this.function_AR.forEach((zt_function) => {
        if(zt_function.ztic == resp_item_for_function_group.objZTIC && zt_function.code == resp_item_for_function_group.objCode){
      resp_item_for_function_group.linkIdx_AR.forEach((resp_item_for_function_link) => {
         if(this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkType_ztic == base_ztic && this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkType_code == "8"){  // link function parameter
          const empty_string = "";
          //console.log("20250122d this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkToCode_ztic: "+this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkToCode_ztic);
          const param_ns = this.svr1.getNSforCode(this.msg.dbZtI_id, this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkToCode_ztic);
          //const param_ns = this.svr1.getNSforCode(this.msg.dbZtI_id, param_ztic);
          //console.log("20250122e param_ns: "+param_ns);
           zt_function.setParameterValue(param_ns, this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkToCode, empty_string);            
         } // endif link type is for link from function to parameter 
        // DsFunctionParameter
     });  // end of loop through resp_item_for_function_group_linkIdx_AR
    } // endif function.ztic == resp_item_for_function_group.objZTIC && function.code == resp_item_for_function_group.objCode
    });  // end of loop through this.function_AR
    } // endif resp_item_for_function_group.kindZTIC == base_ztic && resp_item_for_function_group.kindCode == "36"
// end 20240205


     if(resp_item_for_function_group.kindZTIC == base_ztic && resp_item_for_function_group.kindCode == "24"){  // response item system message definition



          // start 20250121  replace system_message_AR (above) with system_message_AR2 when ready
          this.system_message_AR2.forEach((system_message) => {
            if(system_message.smd_ztic == resp_item_for_function_group.objZTIC && system_message.smd_code == resp_item_for_function_group.objCode){                       
               console.log("20230123b resp_item_for_function_group.objElemIdx_AR: "+resp_item_for_function_group.objElemIdx_AR);
               resp_item_for_function_group.objElemIdx_AR.forEach((objElement) => {
               // console.log("20250123a this.svr1.ZtObjectElement_AR[objElement].value: "+this.svr1.ZtObjectElement_AR[objElement].value);               
                 if(this.svr1.ZtObjectElement_AR[objElement].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[objElement].OE_code == "200"){ // system message short message
                   system_message.shortSystemMessage = this.svr1.ZtObjectElement_AR[objElement].value;
                 } // endif it's the system message short message
                 if(this.svr1.ZtObjectElement_AR[objElement].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[objElement].OE_code == "201"){ // system message long message
                    system_message.longSystemMessage = this.svr1.ZtObjectElement_AR[objElement].value;
                 } // endif it's the system message long message

               }); // end of loop through resp_item_for_function_group.objElemIdx_AR
             } // endif system_message.smd_ztic == resp_item_for_function_group.objZTIC && system_message.smd_code == resp_item_for_function_group.objCode
         });  // end of loop through this.system_message_AR2

          // end 20250121


    } // endif resp_item_for_function_group.kindZTIC == base_ztic && resp_item_for_function_group.kindCode == "24"

 }); // end of loop through resp_item_for_function_group_AR




}  // end of getValues()






//performValidation(){  //(del) 20250131
 executeFunctions(){    // 
 this.getValues(); // 20250201
  //var response_log_message = new ResponseLogMessage(); //(del) 20250131

////  this.system_message_AR.forEach((system_message) => {
////  
////}); // end of loop through this.system_message_AR
//console.log("20240207c this.function_AR.length: "+this.function_AR.length);
this.function_AR.forEach((zt_function) => {
  const system_message_AR_str = JSON.stringify(this.system_message_AR);
  //const system_message_AR_str2 = JSON.stringify(this.system_message_AR2);
  var system_message_text_AR2 = [];
  this.system_message_AR2.forEach((system_message2) => {
    //console.log("20250123k system_message2.parameter_AR.length: "+system_message2.parameter_AR.length);
    var sm_text =  system_message2.setText();
    // var sm_text =  system_message2.setText2();
     system_message_text_AR2.push(sm_text);
  });  // end of loop through this.system_message_AR2
  const system_message_text_AR2_str = JSON.stringify(system_message_text_AR2);
  //console.log("20250123r system_message_text_AR2_str: "+system_message_text_AR2_str);
  zt_function.setParameterValue("zinfinitree.com/validation", "1", system_message_AR_str);
  zt_function.setParameterValue("zinfinitree.com/validation", "100", system_message_text_AR2_str);
  zt_function.execute();
  const serverLogSystemMessage_str = zt_function.getParameterValue("zinfinitree.com/validation", "2");
  //console.log("20250112a serverLogSystemMessage_str: "+serverLogSystemMessage_str);
  if(serverLogSystemMessage_str != ""){
    var serverLogSystemMessage = JSON.parse(serverLogSystemMessage_str);
    this.msg.serverLogSystemMessageWA_AR.push(serverLogSystemMessage);
  } // endif serverLogSystemMessage_str != ""
  //var serverLogSystemMessage = JSON.parse(serverLogSystemMessage_str);  // (del) TEST 20240210
  //this.msg.serverLogSystemMessageWA_AR.push(serverLogSystemMessage);    // (del) TEST 20240210

}); // end of loop through this.function_AR






//return response_log_message;  (del) 20250131

}  // end of executeFunctions()      changed from end of performValidation()  20250131 



}  // end of class

function ServerLogSystemMessage() {

  //4300-ID 
  //4301-SystemMessageDefZTIC
  //4302-SystemMessageDefCode
  //4303-MessageCategory
  //4304-Timestamp
  //4311-RelatedSection
  //4312-RelatedSectionID
  //4313-SerialNumberOfRelatedMessageElement
  //4321-ShortSystemMessage
  //4322-LongSystemMessage
  //4330-ParameterSet
    this.ID = "";
    this.SystemMessageDefZTIC = "";
    this.SystemMessageDefCode = "";
    this.MessageCategory = "";
    this.Timestamp  = "";
    this.RelatedSection = "";
    this.RelatedSectionID = "";
    this.SerialNumberOfRelatedMessageElement = "";
    this.ShortSystemMessage = "";
    this.LongSystemMessage  = "";
    this.ParameterSet       = [];
  
  }  // end ServerLogSystemMessage



function deprecated_ResponseLogMessage() {

   //this.message      = message;

   // 43—ServerLogSystemMessageSet						
   // 430—ServerLogSystemMessageSetMember					
   //     4300-ID 				
   //     4301-SystemMessageDefZTIC				
   //     4302-SystemMessageDefCode				
   //     4303-MessageCategory				
   //     4304-Timestamp				
   //     4311-RelatedSection				
   //     4312-RelatedSectionID				
   //     4313-SerialNumberOfRelatedMessageElement				
   //     4321-ShortSystemMessage				
   //     4322-LongSystemMessage				
   //     4330-ParameterSet				
   //         4331—ParameterSetMember			
   //             4332—ParameterZTIC		
   //             4333—ParameterCode		
   //             4334—ParameterValue		
 
}

function LogMessageElement() {

}    // end of function LogMessageElement()



function LogMessageParameter() {

}    //



module.exports = ZtFunctionGroup;
