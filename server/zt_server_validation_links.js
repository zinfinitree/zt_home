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


class ZtServerValidationLinksClass {



constructor(svr1x, msgx, parameter_AR) {
  this.svr1  =  svr1x;
  this.msg   =  msgx;
  this.parameter_AR = parameter_AR;
//  this.timestamp  = timestampx;

 

} // end of constructor


  


  execute(){

//console.log("20240207a running code for zt_server_validation_links.js   execute()");

var boilerplate_text = "";
var msg_log_entries_str = "";
var slog_sys_msg = new ServerLogSystemMessage();



  var set_error_status = false;
  this.msg.LinkUpdateWA_Array.forEach((linkUpdateWA) => {
    const linkToStr = this.msg.TabNamePrfx+"_"+linkUpdateWA.linkToKindZTIC + "_"+linkUpdateWA.linkToKindCode +"_"+ linkUpdateWA.linkToCodeZTIC +"_"+ linkUpdateWA.linkToCode;
    //console.log("20240221a linkToStr: "+linkToStr);
    console.log("20250113c linkUpdateWA.newCode: "+linkUpdateWA.newCode);
    //if(linkUpdateWA.newCode == "false"){
      if(!this.svr1.ZtObject_idx_HM.has(linkToStr)){
        slog_sys_msg.ztic = this.svr1.getCodeForNS(this.msg.TabNamePrfx, "zinfinitree.com/validation"); 
        //slog_sys_msg.ztic = "444";  // TEST REMOVE
        slog_sys_msg.code = "222";
        slog_sys_msg.shortSystemMessage = "failed link validation short message hard-coded";
        slog_sys_msg.longSystemMessage  = "failed link validation long message hard-coded";
        msg_log_entries_str = JSON.stringify(slog_sys_msg);

        var return_param = new ZtFunctionParameter("zinfinitree.com/validation", "2", msg_log_entries_str);
        this.parameter_AR.push(return_param);
        set_error_status = true;
   

      } // endif !this.svr1.ZtObject_idx_HM.has(linkToStr)
    //} // endif linkUpdateWA.newCode == "false"
   
    
  });  // end loop through LinkUpdateWA_Array

    console.log("20250113b set_error_status: "+set_error_status);

    if(set_error_status){

        var status_rec = new QueryResponseMessageStatusWorkAreaRec();
        status_rec.messageStatusZTIC = this.svr1.getCodeForNS(this.msg.TabNamePrfx, "131131/21");       
        //status_rec.messageStatusCode = "3";  // passed
        status_rec.messageStatusCode = "4";  // failed validation
        this.msg.responseMessageStatusWA_AR.push(status_rec);
        //  push to log array
        //  set status to failed

    }








} // end of execute()






}  // end of class DsCodeIncrementClass



class ZtFunctionParameter {



constructor(namespacex, codex, valuex) {
      this.namespace  =  namespacex.toString().trim();
      this.code  =  codex.toString().trim();
      this.value =  valuex;
     // this.sm_text = "";
     // this.text_return = new TextReturn();
} // end of constructor


}  // end of class ZtFunctionParameter

// begin insert 20240211
function QueryResponseMessageStatusWorkAreaRec() {
    //4201-MessageStatusZTIC
    //4202-MessageStatusCode
    //4203-MessageStatusTimestamp
    //4204-MessageStatusText
    
    this.messageStatusZTIC = "";
    this.messageStatusCode = "";
    this.messageStatusTimestamp = "";
    this.messageStatusText = "";
    
    } // end of QueryResponseMessageStatusWorkAreaRec   
    // end insert 20240211


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




module.exports = ZtServerValidationLinksClass;


