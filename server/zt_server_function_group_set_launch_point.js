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
// copied from zt_server_function_group.js

class ZtFunctionGroupSetLaunchPoint {     

  //var HashMap = require('hashmap');
    constructor(svr1x, msgx, function_group_set_launch_point_idxx, timestampx, parameter_ARx) {
    
      var HashMap = require('hashmap');
      this.svr1 = svr1x;
      this.msg  = msgx;
      this.function_group_set_launch_point_idx = function_group_set_launch_point_idxx;
      //this.validation_ztic = validation_zticx;
      //this.validation_code = validation_codex;
      this.timestamp = timestampx;
      this.parameter_AR = parameter_ARx;
      this.validation_function_AR = [];
      this.function_group_idx_AR = [];
      //this.system_message_AR = [];
      //this.system_message_AR2 = [];   // to replace system_message_AR using zt_server_system_message.js when ready
      //this.validation_status = "1";  // 1=Validation not yet started, 2=Validation Complete OK, 3=Validation Complete with warnings, 4=Validation Complete with errors   
      //this.stat_value_HM = new HashMap();


      
  } // end of constructor


  ////  validation.getValues(svr1x, timestampx);   
////  validation.performValidation();

 execute(){

//  console.log("20250206a ZtFunctionGroupSetLaunchPoint.execute() in zt_server_function_group_set_launch_point.js");
//    0. get the values for the function group set launch point
//    1. find the set used as a type value for the function groups set launch point
//    2. find the function groups that are memebers of the set used as a type value for the function groups set launch point
//    3. loop through each set member and execute the function group
//
//const base_ztic   = this.svr1.getCodeForNS(this.msg.TabNamePrfx, "131131/21");
//const validation_ztic = this.svr1.getCodeForNS(this.msg.TabNamePrfx, "zinfinitree.com/validation");
//
 this.getValues();

 this.function_group_idx_AR.forEach((function_group_idx) => {
  //console.log("20250211f function_group_idx: "+function_group_idx);
  var function_group_obj = this.svr1.ZtObject_AR[function_group_idx];
  //console.log("20250211d function_group_obj.objZTIC: "+function_group_obj.objZTIC);
  //console.log("20250211e function_group_obj.objCode: "+function_group_obj.objCode);


  // start 20250211
 /// const function_group_KeyStr = this.msg.TabNamePrfx.trim()+"_"+base_ztic+"_52_" + validation_ztic +"_3"; // Function Group for Validation of Key for Queried Object
 /// console.log("20250110c function_group_KeyStr: "+function_group_KeyStr);
 /// if(this.svr1.ZtObject_idx_HM.has(function_group_KeyStr)){   // 20240223
 ///    function_group_idx = this.svr1.ZtObject_idx_HM.get(function_group_KeyStr);
     var  new_function_group = new (require('./zt_server_function_group'))( this.svr1, this.msg, function_group_idx, this.timestamp, this.parameter_AR);  
  
     //console.log("20250110b running validateObjectKeyStrForQueriedObject in ds2b00002_server_query this.msg.validation_AR.length: "+this.msg.validation_AR.length);
     new_function_group.executeFunctions();
     ////this.msg.validation_AR.forEach((validation) => {
     ////  //validation.getValues();          // (del) 20250201   
     ////  //validation.performValidation();  //(del) 20250131
     ////  validation.executeFunctions();  // 20250131
     ////}); // end of loop through this.msg.validation_AR   // 20240223

///}  // endif svr1x.ZtObject_idx_HM.has(function_group_KeyStr)

  // end 20250211



}); // end of loop through function_group_idx_AR





 }  // end of execute()


getValues(){

var statusExclusion_AR  = [];  // revisit perhaps get it from msg
var get_values_maxLevelsDown_99 = 99;  // revisit perhaps get it from msg
//console.log("20240206c this.TabNamePrfx: "+this.msg.TabNamePrfx);
const base_ztic   = this.svr1.getCodeForNS(this.msg.TabNamePrfx, "131131/21");
//const validation_ztic = this.svr1.getCodeForNS(this.msg.TabNamePrfx, "zinfinitree.com/validation");
//var validation_wa = require('./zt_server_validation_workarea');
//console.log("20250206b this.function_group_set_launch_point_idx: "+this.function_group_set_launch_point_idx);
var func_grp_set_launch_pnt_db_obj = this.svr1.ZtObject_AR[this.function_group_set_launch_point_idx];
//var functionGroupSetLaunchPoint_KeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+base_ztic+"_67_"+func_grp_set_launch_pnt_db_obj.objZTIC+"_"+func_grp_set_launch_pnt_db_obj.objCode;
//var function_group_idx = this.svr1.ZtObject_idx_HM.get(functionGroupSetLaunchPoint_KeyStr);  
//console.log("20240207i function_group_idx: "+function_group_idx);
var templDefForFunctionGroupSetLaunchPoint_KeyStr =     this.msg.TabNamePrfx.toString().trim() + "_"+ base_ztic+"_2_"+base_ztic+"_67";
var template_def_idx_for_func_grp_set_launch_pnt = this.svr1.ZtObject_idx_HM.get(templDefForFunctionGroupSetLaunchPoint_KeyStr);
//console.log("20250206c template_def_idx_for_func_grp_set_launch_pnt: "+template_def_idx_for_func_grp_set_launch_pnt);
var resp_item_for_func_grp_set_launch_pnt_AR = func_grp_set_launch_pnt_db_obj.getAllValuesForTemplateDef(template_def_idx_for_func_grp_set_launch_pnt, this.msg, this.svr1.time.now(), statusExclusion_AR, get_values_maxLevelsDown_99 );           
//console.log("20250111a resp_item_for_func_grp_set_launch_pnt_AR.length: "+resp_item_for_func_grp_set_launch_pnt_AR.length);
resp_item_for_func_grp_set_launch_pnt_AR.forEach((resp_item_for_func_grp_set_launch_pnt) => {
  //console.log("20250206d resp_item_for_func_grp_set_launch_pnt.kindZTIC: "+resp_item_for_func_grp_set_launch_pnt.kindZTIC);
  //console.log("20250206e resp_item_for_func_grp_set_launch_pnt.kindCode: "+resp_item_for_func_grp_set_launch_pnt.kindCode);
  //console.log("20250206i resp_item_for_func_grp_set_launch_pnt.objZTIC: "+resp_item_for_func_grp_set_launch_pnt.objZTIC);
  //console.log("20250206j resp_item_for_func_grp_set_launch_pnt.objCode: "+resp_item_for_func_grp_set_launch_pnt.objCode);
  //console.log("20250206k resp_item_for_func_grp_set_launch_pnt.typeValueIdx_AR.length: "+resp_item_for_func_grp_set_launch_pnt.typeValueIdx_AR.length);
    if(resp_item_for_func_grp_set_launch_pnt.kindZTIC == base_ztic && resp_item_for_func_grp_set_launch_pnt.kindCode == "67"){   // response item is a function group set launch point
       // console.log("20240207h resp_item_for_func_grp_set_launch_pnt.linkIdx_AR.length: "+resp_item_for_func_grp_set_launch_pnt.linkIdx_AR.length);
                  // start 20250206
          // console.log("20250206h resp_item_for_func_grp_set_launch_pnt.typeValueIdx_AR.length: "+resp_item_for_func_grp_set_launch_pnt.typeValueIdx_AR.length);
          resp_item_for_func_grp_set_launch_pnt.typeValueIdx_AR.forEach((resp_item_for_func_grp_set_launch_pnt_typeValue_idx) => {
            //resp_item_for_func_grp_set_launch_pnt.typeValueIdx_AR
            if(this.svr1.ZtObjectTypeValue_AR[resp_item_for_func_grp_set_launch_pnt_typeValue_idx].typeDef_ztic == base_ztic && this.svr1.ZtObjectTypeValue_AR[resp_item_for_func_grp_set_launch_pnt_typeValue_idx].typeDef_code == "50"){
             //console.log("20250207c typeValue_ztic: "+this.svr1.ZtObjectTypeValue_AR[resp_item_for_func_grp_set_launch_pnt_typeValue_idx].typeValue_ztic);
             //console.log("20250207d typeValue_code: "+this.svr1.ZtObjectTypeValue_AR[resp_item_for_func_grp_set_launch_pnt_typeValue_idx].typeValue_code);
             const typeValue_ztic = this.svr1.ZtObjectTypeValue_AR[resp_item_for_func_grp_set_launch_pnt_typeValue_idx].typeValue_ztic;
             const typeValue_code = this.svr1.ZtObjectTypeValue_AR[resp_item_for_func_grp_set_launch_pnt_typeValue_idx].typeValue_code;

             const functionGroupSetKeyStr = this.msg.TabNamePrfx+"_"+base_ztic + "_13_"+ typeValue_ztic +"_"+ typeValue_code;
             //console.log("20250207i functionGroupSetKeyStr: "+functionGroupSetKeyStr);
               if(this.svr1.ZtObject_idx_HM.has(functionGroupSetKeyStr)){
                  //console.log("20250207j functionGroupSetKeyStr found in ZtObject_idx_HM");
                  const functionGroupSet_idx = this.svr1.ZtObject_idx_HM.get(functionGroupSetKeyStr);

                  var new_function_grp_set = new (require('./zt_server_set'))(this.svr1, functionGroupSet_idx, this.msg);
                  //var set_member_idx_AR = new_function_grp_set.getMember_AR();
                  this.function_group_idx_AR = new_function_grp_set.getMember_AR();
                 /// //set_member_idx_AR.forEach((set_member_idx) => {
                 ///   this.function_group_idx_AR.forEach((function_group_idx) => {
                 ///     console.log("20250207h function_group_idx: "+function_group_idx);
                 ///     var function_group_obj = this.svr1.ZtObject_AR[function_group_idx];
                 ///     console.log("20250211d function_group_obj.objZTIC: "+function_group_obj.objZTIC);
                 ///     console.log("20250211e function_group_obj.objCode: "+function_group_obj.objCode);

                ///  }); // end of loop through function_group_idx_AR

               } // endif !this.svr1.ZtObject_idx_HM.has(functionGroupSetKeyStr)
            } // endif typeValue_ztic == base_ztic && typeValue_code == "50"
             //this.objectKey = objectKey;
             //this.typeDef_ztic = typeDef_ztic;
             //this.typeDef_code = typeDef_code;
             //this.typeValue_ztic = typeValue_ztic;
             //this.typeValue_code = typeValue_code;
             //this.status         = status;
             //this.timestamp      = timestamp;
             //this.seqNum         = seqNum;
             //this.templateZTIC   = templateZTIC;
             //this.templateCode   = templateCode;
 
            });  // end of loop through resp_item_for_func_grp_set_launch_pnt_typeValueIdx_AR 
 
            // end 20250206
        resp_item_for_func_grp_set_launch_pnt.linkIdx_AR.forEach((resp_item_for_func_grp_set_launch_pnt_link) => {
            if(this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkType_ztic == base_ztic && this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkType_code == "31"){  // link to system message def
              //var new_sys_msg_def = new validation_wa.SystemMessageDefinition(this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkToCode_ztic, this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkToCode); 
              var new_sys_msg_def2 = new (require('./zt_server_system_message'))( this.svr1, this.msg, this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkToCode_ztic, this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkToCode, this.timestamp); 
                //start 20250123
                if(this.parameter_AR != undefined){
                  this.parameter_AR.forEach((parameter) => {
                  // console.log("20250123h parameter.namespace-code-value: "+parameter.namespace+"-"+parameter.code+"-"+parameter.value);
                    new_sys_msg_def2.setParameterValue(parameter.namespace, parameter.code, parameter.value);
                  });
                } // endif this.parameter_AR != undefined
                
                // end 20250123
              this.system_message_AR.push(new_sys_msg_def); 
              this.system_message_AR2.push(new_sys_msg_def2);             
            } // endif link type is for link from validation/function group to system message def 
           //console.log("20240207d this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkType_ztic: "+this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkType_ztic);
           //console.log("20240207d this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkType_code: "+this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkType_code);
           if(this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkType_ztic == base_ztic && this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkType_code == "32"){  // link to validation function
             var new_validation_function = new (require('./zt_server_function'))(this.svr1, this.msg, this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkToCode_ztic, this.svr1.ZtObjectLink_AR[resp_item_for_func_grp_set_launch_pnt_link].linkToCode, this.timestamp);   
             // start 20250110 add this.parameter_AR to new_validation_function parameter_AR
             // temp (del) 20250110  
             if(this.parameter_AR != undefined){
               this.parameter_AR.forEach((parameter) => {
                //console.log("20250110a parameter.namespace-code-value: "+parameter.namespace+"-"+parameter.code+"-"+parameter.value);
                 new_validation_function.setParameterValue(parameter.namespace, parameter.code, parameter.value);
               });
             } // endif this.parameter_AR != undefined
             //this.parameter_AR.forEach((parameter) => {
             //   new_validation_function.setParameterValue(parameter.namespace, parameter.code, parameter.value);
             //});
             // end temp (del) 20250110
             // end 20250110
             this.validation_function_AR.push(new_validation_function);              
           } // endif link type is for link from validation to function 



       });  // end of loop through resp_item_for_func_grp_set_launch_pnt_linkIdx_AR
     } // endif resp_item_for_func_grp_set_launch_pnt.kindZTIC == base_ztic && resp_item_for_func_grp_set_launch_pnt.kindCode == "67"

    // start 20240205
    if(resp_item_for_func_grp_set_launch_pnt.kindZTIC == base_ztic && resp_item_for_func_grp_set_launch_pnt.kindCode == "36"){   // response item is a function
      this.validation_function_AR.forEach((validation_function) => {
        if(validation_function.ztic == resp_item_for_func_grp_set_launch_pnt.objZTIC && validation_function.code == resp_item_for_func_grp_set_launch_pnt.objCode){
      resp_item_for_func_grp_set_launch_pnt.linkIdx_AR.forEach((resp_item_for_function_link) => {
         if(this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkType_ztic == base_ztic && this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkType_code == "8"){  // link function parameter
          const empty_string = "";
          //console.log("20250122d this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkToCode_ztic: "+this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkToCode_ztic);
          const param_ns = this.svr1.getNSforCode(this.msg.TabNamePrfx, this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkToCode_ztic);
          //const param_ns = this.svr1.getNSforCode(this.msg.TabNamePrfx, param_ztic);
          //console.log("20250122e param_ns: "+param_ns);
           validation_function.setParameterValue(param_ns, this.svr1.ZtObjectLink_AR[resp_item_for_function_link].linkToCode, empty_string);            
         } // endif link type is for link from function to parameter 
        // DsFunctionParameter
     });  // end of loop through resp_item_for_func_grp_set_launch_pnt_linkIdx_AR




    } // endif validation_function.ztic == resp_item_for_func_grp_set_launch_pnt.objZTIC && validation_function.code == resp_item_for_func_grp_set_launch_pnt.objCode
    });  // end of loop through this.validation_function_AR
    } // endif resp_item_for_func_grp_set_launch_pnt.kindZTIC == base_ztic && resp_item_for_func_grp_set_launch_pnt.kindCode == "36"
// end 20240205


     if(resp_item_for_func_grp_set_launch_pnt.kindZTIC == base_ztic && resp_item_for_func_grp_set_launch_pnt.kindCode == "24"){  // response item system message definition

          this.system_message_AR.forEach((system_message) => {
             if(system_message.smd_ztic == resp_item_for_func_grp_set_launch_pnt.objZTIC && system_message.smd_code == resp_item_for_func_grp_set_launch_pnt.objCode){                       
                resp_item_for_func_grp_set_launch_pnt.objElemIdx_AR.forEach((objElement) => {
                  //console.log("20250123c this.svr1.ZtObjectElement_AR[objElement].OE_ztic-OE_code-value: "+this.svr1.ZtObjectElement_AR[objElement].OE_ztic+" - "+this.svr1.ZtObjectElement_AR[objElement].OE_code+" - "+this.svr1.ZtObjectElement_AR[objElement].value);
                  if(this.svr1.ZtObjectElement_AR[objElement].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[objElement].OE_code == "200"){ // system message short message
                    system_message.smd_short_msg = this.svr1.ZtObjectElement_AR[objElement].value;
                  } // endif it's the system message short message
                  if(this.svr1.ZtObjectElement_AR[objElement].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[objElement].OE_code == "201"){ // system message long message
                     system_message.smd_long_msg = this.svr1.ZtObjectElement_AR[objElement].value;
                  } // endif it's the system message long message

                }); // end of loop through resp_item_for_func_grp_set_launch_pnt.objElemIdx_AR
              } // endif system_message.smd_ztic == resp_item_for_func_grp_set_launch_pnt.objZTIC && system_message.smd_code == resp_item_for_func_grp_set_launch_pnt.objCode
              //console.log("20250123e system_message.smd_short_msg:"+system_message.smd_short_msg);
              //console.log("20250123e system_message.smd_long_msg:"+system_message.smd_long_msg);
          });  // end of loop through this.system_message_AR

          // start 20250121  replace system_message_AR (above) with system_message_AR2 when ready
          this.system_message_AR2.forEach((system_message) => {
            if(system_message.smd_ztic == resp_item_for_func_grp_set_launch_pnt.objZTIC && system_message.smd_code == resp_item_for_func_grp_set_launch_pnt.objCode){                       
               //console.log("20230123b resp_item_for_func_grp_set_launch_pnt.objElemIdx_AR: "+resp_item_for_func_grp_set_launch_pnt.objElemIdx_AR);
               resp_item_for_func_grp_set_launch_pnt.objElemIdx_AR.forEach((objElement) => {
               // console.log("20250123a this.svr1.ZtObjectElement_AR[objElement].value: "+this.svr1.ZtObjectElement_AR[objElement].value);               
                 if(this.svr1.ZtObjectElement_AR[objElement].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[objElement].OE_code == "200"){ // system message short message
                   system_message.shortSystemMessage = this.svr1.ZtObjectElement_AR[objElement].value;
                 } // endif it's the system message short message
                 if(this.svr1.ZtObjectElement_AR[objElement].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[objElement].OE_code == "201"){ // system message long message
                    system_message.longSystemMessage = this.svr1.ZtObjectElement_AR[objElement].value;
                 } // endif it's the system message long message

               }); // end of loop through resp_item_for_func_grp_set_launch_pnt.objElemIdx_AR
             } // endif system_message.smd_ztic == resp_item_for_func_grp_set_launch_pnt.objZTIC && system_message.smd_code == resp_item_for_func_grp_set_launch_pnt.objCode
         });  // end of loop through this.system_message_AR2

          // end 20250121


    } // endif resp_item_for_func_grp_set_launch_pnt.kindZTIC == base_ztic && resp_item_for_func_grp_set_launch_pnt.kindCode == "24"

 }); // end of loop through resp_item_for_func_grp_set_launch_pnt_AR




}  // end of getValues()






performValidation(){



var response_log_message = new ResponseLogMessage();

////  this.system_message_AR.forEach((system_message) => {
////  
////}); // end of loop through this.system_message_AR
//console.log("20240207c this.validation_function_AR.length: "+this.validation_function_AR.length);
this.validation_function_AR.forEach((validation_function) => {
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
  validation_function.setParameterValue("zinfinitree.com/validation", "1", system_message_AR_str);
  validation_function.setParameterValue("zinfinitree.com/validation", "100", system_message_text_AR2_str);
  validation_function.execute();
  const serverLogSystemMessage_str = validation_function.getParameterValue("zinfinitree.com/validation", "2");
  //console.log("20250112a serverLogSystemMessage_str: "+serverLogSystemMessage_str);
  if(serverLogSystemMessage_str != ""){
    var serverLogSystemMessage = JSON.parse(serverLogSystemMessage_str);
    this.msg.serverLogSystemMessageWA_AR.push(serverLogSystemMessage);
  } // endif serverLogSystemMessage_str != ""
  //var serverLogSystemMessage = JSON.parse(serverLogSystemMessage_str);  // (del) TEST 20240210
  //this.msg.serverLogSystemMessageWA_AR.push(serverLogSystemMessage);    // (del) TEST 20240210

}); // end of loop through this.validation_function_AR






return response_log_message;

}  // end of performValidation()



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



function ResponseLogMessage() {

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



module.exports = ZtFunctionGroupSetLaunchPoint;
