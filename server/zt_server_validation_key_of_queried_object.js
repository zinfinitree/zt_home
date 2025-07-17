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


class ZtServerValidationKeyOfQueriedObjectClass {
//class DsServerValidationLinksClass {



constructor(svr1x, msgx, parameter_AR) {
  this.svr1  =  svr1x;
  this.msg   =  msgx;
  this.parameter_AR = parameter_AR;
//  this.timestamp  = timestampx;

 

} // end of constructor


  


  execute(){


//console.log("parameters: ");
var boilerplate_text = "";
var msg_log_entries_str = "";
var slog_sys_msg = new ServerLogSystemMessage();
//slog_sys_msg.ID = "1";  serverLogSystemMessageSetMember_idx




var sys_msg_text_AR = [];  // 20250123
//NOTE: change below to do validation of Key of Queried Object
console.log("20250121c listing parameters in zt_server_validation_key_of_queried_objects.js this.parameter_AR.length: "+this.parameter_AR.length);
this.parameter_AR.forEach((parameter) => {
    if(parameter.namespace == "zinfinitree.com/validation" && parameter.code == "1"){
        console.log("20250121a parameter code 1: "+parameter.value);
        console.log(parameter.value);
    }  // endif

    if(parameter.namespace == "zinfinitree.com/validation" && parameter.code == "100"){
        console.log("20250123s parameter code 100: "+parameter.value);
        console.log(parameter.value);
        sys_msg_text_AR = JSON.parse(parameter.value);
    }  // endif
 });  // end of loop through this.parameter_AR

  var set_error_status = false;

       sys_msg_text_AR.forEach((sys_msg_text) => {
        //slog_sys_msg.ztic = this.svr1.getCodeForNS(this.msg.TabNamePrfx, "zinfinitree.com/validation");
        slog_sys_msg.ztic = sys_msg_text.sm_ztic;
        slog_sys_msg.code = sys_msg_text.sm_code;
        slog_sys_msg.shortSystemMessage = sys_msg_text.short_text;
        slog_sys_msg.longSystemMessage  = sys_msg_text.long_text;
      

        const error = new Error(); 
        const stackLines = error.stack.split('\n');
        console.log("20250128b stackLines: "+stackLines);

        
        msg_log_entries_str = JSON.stringify(slog_sys_msg);
       });  // end loop through sys_msg_text_AR

        var return_param = new DsFunctionParameter("zinfinitree.com/validation", "2", msg_log_entries_str);
        this.parameter_AR.push(return_param);
        set_error_status = true;
   

    //  } // endif !this.svr1.ZtObject_idx_HM.has(linkToStr)
   // } // endif linkUpdateWA.newCode == "false"
   
    
 // });  // end loop through LinkUpdateWA_Array

    if(set_error_status){

        var status_rec = new QueryResponseMessageStatusWorkAreaRec();
        status_rec.messageStatusZTIC = this.svr1.getCodeForNS(this.msg.TabNamePrfx, "131131/21");       
        //status_rec.messageStatusCode = "3";  // passed
        status_rec.messageStatusCode = "4";  // failed validation
        console.log("20250111c status_rec.messageStatusCode: "+status_rec.messageStatusCode);
        this.msg.responseMessageStatusWA_AR.push(status_rec);
        //  push to log array
        //  set status to failed

    }





///// //2.  create instance of of the object specified in the file
///// //3.  call the execute method of the the object passing the array of export parameters from the constructor
///// //4.  receive the array of return paramters from the function called
///// //5.  return paramters to caller of server funtion

//return return_param_AR;

} // end of execute()



}  // end of class ZtServerValidationKeyOfQueriedObjectClass



class DsFunctionParameter {



constructor(namespacex, codex, valuex) {
      this.namespace  =  namespacex.toString().trim();
      this.code  =  codex.toString().trim();
      this.value =  valuex;
     // this.sm_text = "";
     // this.text_return = new TextReturn();
} // end of constructor


}  // end of class DsFunctionParameter

// begin insert 20240211
function QueryResponseMessageStatusWorkAreaRec() {

    
    this.messageStatusZTIC = "";
    this.messageStatusCode = "";
    this.messageStatusTimestamp = "";
    this.messageStatusText = "";
    
    } // end of QueryResponseMessageStatusWorkAreaRec   
    // end insert 20240211


function ServerLogSystemMessage() {


      this.ID = "";
      //this.systemMessageDefZTIC = "";
      //this.systemMessageDefCode = "";
      this.ztic = "";
      this.code = "";
      this.messageCategory = "";
      this.timestamp  = "";
      this.relatedSection = "";
      this.relatedSectionID = "";
      this.serialNumberOfRelatedMessageElement = "";
      this.shortSystemMessage = "";
      this.longSystemMessage  = "";
      this.parameter_AR       = [];
    
    }  // end ServerLogSystemMessage




module.exports = ZtServerValidationKeyOfQueriedObjectClass;


