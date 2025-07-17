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


class ZtSystemMessage {



constructor(svr1x, msgx, sm_def_zticx, sm_def_codex, timestampx) {
      this.svr1  =  svr1x;
      this.msg   =  msgx;
      this.ztic  =  sm_def_zticx.toString().trim();
      this.code  =  sm_def_codex.toString().trim();
      this.timestamp  = timestampx;
      this.parameter_AR = [];
      // this.sm_text = "";
      //this.text_return = new TextReturn();


  this.id = "";
  //this.SystemMessageDefZTIC = "";
  //this.SystemMessageDefCode = "";
  this.messageCategory = "";

  this.relatedSection = "";
  this.relatedSectionID = "";
  this.serialNumberOfRelatedMessageElement = "";
  this.shortSystemMessage = "";
  this.longSystemMessage  = "";
  this.stackTrace = "";
  this.base_dsi_str = "131131/21";
  this.base_ztic_str = svr1x.getCodeForNS(msgx.dbZtI_id, this.base_dsi_str);
  this.templKeyStr   =  msgx.dbZtI_id+"_"+this.base_ztic_str+"_2_"+this.base_ztic_str+"_24";  //base template for system message
  this.templ_def_index = svr1x.ZtObject_idx_HM.get(this.templKeyStr);
  this.sysMsgObjstr = msgx.dbZtI_id+"_"+this.base_ztic_str+"_24_"+this.ztic+"_"+this.code;
  this.sys_msg_idx  = svr1x.ZtObject_idx_HM.get(this.sysMsgObjstr);
  this.sysMsgObj    = this.svr1.ZtObject_AR[this.sys_msg_idx];

 

} // end of constructor


  setParameterValue(param_ns, param_code, value)  {

// 1.  validate parameter namespace and parameter code against allowed parameters for the system message definition
// 2.  add parameter value to system message

   var sm_param = new ZtSystemMessageParameter(param_ns, param_code, value);
   this.parameter_AR.push(sm_param);
  }  // end of setParameterValue
  



  setText()   {

//console.log("20250119a running ZtSystemMessage.setText ZTIC/Code in zt_server_system_message: "+this.ztic+"/"+this.code);


//0. use the system message def ztic and code to find the initial value for short text and long text
//1. loop through parameter_AR 
//2. for each loop iteration look for parameter in short text and long text
//3. if a parameter is found in the short or long text, replace parameter reference with the parameter value


var base_dsi_str = "131131/21";
var base_ztic_str = this.svr1.getCodeForNS(this.msg.dbZtI_id, base_dsi_str);

var sysMsgOE_idx_AR = [];
//console.log("20250122g this.templ_def_index, this.timestamp: "+this.templ_def_index+"-"+ this.timestamp);
//console.log("20200116 this.sys_msg_idx: "+this.sys_msg_idx);
  sysMsgOE_idx_AR = this.sysMsgObj.getOEvalueIdxForTemplateDef(this.templ_def_index, this.msg.extendedKeyWA_AR, this.timestamp);
// use sysMsgObjstr to find array index of system message object in svr1
// use index to find sysem message object

//console.log("20200118 sysMsgOE_idx_AR.length: "+ sysMsgOE_idx_AR.length);
// find values for system message short and  long text
for (var i = 0; i< sysMsgOE_idx_AR.length; i++){
  //console.log("20200118 this.svr1.ZtObjectElement_AR[sysMsgOE_idx_AR[i]].OE_ztic: "+this.svr1.ZtObjectElement_AR[sysMsgOE_idx_AR[i]].OE_ztic);
  //console.log("20200118 base_ztic_str: "+base_ztic_str);
  //console.log("20200118 this.svr1.ZtObjectElement_AR[sysMsgOE_idx_AR[i]].OE_code: "+this.svr1.ZtObjectElement_AR[sysMsgOE_idx_AR[i]].OE_code);


   if(this.svr1.ZtObjectElement_AR[sysMsgOE_idx_AR[i]].OE_ztic == base_ztic_str && this.svr1.ZtObjectElement_AR[sysMsgOE_idx_AR[i]].OE_code == 200){
      this.shortSystemMessage = this.svr1.ZtObjectElement_AR[sysMsgOE_idx_AR[i]].value;
   }  // endif code == 200

   if(this.svr1.ZtObjectElement_AR[sysMsgOE_idx_AR[i]].OE_ztic == base_ztic_str && this.svr1.ZtObjectElement_AR[sysMsgOE_idx_AR[i]].OE_code == 201){
      this.longSystemMessage = this.svr1.ZtObjectElement_AR[sysMsgOE_idx_AR[i]].value;
   }  // endif code == 201





} // end loop through sysMsgOE_AR

//console.log("20250123n this.parameter_AR.length in zt_server_system_message.js: "+this.parameter_AR.length);
var short_sm_param_start_pos = 0;
var short_sm_param_separator_pos = 0;
var short_sm_param_end_pos = 0;
var short_sm_param_namespace = "";
var short_sm_param_code = "";
var done_short = false;
var long_sm_param_start_pos = 0;
var long_sm_param_separator_pos = 0;
var long_sm_param_end_pos = 0;
var long_sm_param_namespace = "";
var long_sm_param_code = "";
var done_long  = false;
var cntr = 0;

//console.log("20250122a this.shortSystemMessage: "+this.shortSystemMessage);
//console.log("20250123q this.parameter_AR.length: "+this.parameter_AR.length);
while(!done_short && !done_long){
 cntr++;
 //console.log("20250123g this.parameter_AR.length: "+this.parameter_AR.length);
 for (var i = 0; i< this.parameter_AR.length; i++){


// replace short text with parameter values
   short_sm_param_start_pos = this.shortSystemMessage.indexOf('&(');
   if(short_sm_param_start_pos == -1){done_short = true;}
   if(short_sm_param_start_pos > 0){
     short_sm_param_separator_pos = this.shortSystemMessage.indexOf(',', short_sm_param_start_pos);            
     if(short_sm_param_separator_pos > 0){
        short_sm_param_end_pos = this.shortSystemMessage.indexOf(')', short_sm_param_separator_pos); 
        if(short_sm_param_end_pos > 0){
          var ns_start_pos = short_sm_param_start_pos + 2;
          var ns_end_pos   = short_sm_param_separator_pos;
          short_sm_param_namespace = this.shortSystemMessage.substring( ns_start_pos, ns_end_pos);
          var code_start_pos = short_sm_param_separator_pos + 1;
          var code_end_pos   = short_sm_param_end_pos;
          short_sm_param_code = this.shortSystemMessage.substring( code_start_pos, code_end_pos);
          console.log("20200119 this.parameter_AR[i].namespace-this.parameter_AR[i].code: "+this.parameter_AR[i].namespace+"-"+this.parameter_AR[i].code);
          console.log("short_sm_param_namespace-short_sm_param_code: "+ short_sm_param_namespace+"-"+short_sm_param_code);
          if(this.parameter_AR[i].namespace == short_sm_param_namespace.toString().trim() && this.parameter_AR[i].code == short_sm_param_code.toString().trim()){
             var sm_1st_part_pos = short_sm_param_start_pos - 1;
             var sm_last_part_pos = short_sm_param_end_pos + 1;
             this.shortSystemMessage = this.shortSystemMessage.substring(0,sm_1st_part_pos) + this.parameter_AR[i].value.toString().trim() + this.shortSystemMessage.substring(sm_last_part_pos);
          }  // endif namespace and code in parameter and in text are equal

        } // endif short_sm_param_end_pos > 0

     } // endif short_sm_param_separator_pos > 0

   } // endif short_sm_param_start_pos > 0
// end of replace short text with parameter value

// replace long text with parameter values
   long_sm_param_start_pos = this.longSystemMessage.indexOf('&(');
   if(long_sm_param_start_pos == -1){done_long = true;}
   if(long_sm_param_start_pos > 0){
     long_sm_param_separator_pos = this.longSystemMessage.indexOf(',', long_sm_param_start_pos);            
     if(long_sm_param_separator_pos > 0){
        long_sm_param_end_pos = this.longSystemMessage.indexOf(')', long_sm_param_separator_pos); 
        if(long_sm_param_end_pos > 0){
          var ns_start_pos = long_sm_param_start_pos + 2;
          var ns_end_pos   = long_sm_param_separator_pos;
          long_sm_param_namespace = this.longSystemMessage.substring( ns_start_pos, ns_end_pos);
          var code_start_pos = long_sm_param_separator_pos + 1;
          var code_end_pos   = long_sm_param_end_pos;
          long_sm_param_code = this.longSystemMessage.substring( code_start_pos, code_end_pos);
          if(this.parameter_AR[i].namespace == long_sm_param_namespace.toString().trim() && this.parameter_AR[i].code == long_sm_param_code.toString().trim()){
             var sm_1st_part_pos = long_sm_param_start_pos - 1;
             var sm_last_part_pos = long_sm_param_end_pos + 1;
             this.longSystemMessage = this.longSystemMessage.substring(0,sm_1st_part_pos) + this.parameter_AR[i].value.toString().trim() + this.longSystemMessage.substring(sm_last_part_pos);
          }  // endif namespace and code in parameter and in text are equal

        } // endif long_sm_param_end_pos > 0

     } // endif long_sm_param_separator_pos > 0

   } // endif long_sm_param_start_pos > 0
// end of replace long text with parameter value


 } // endfor looop through this.parameter_AR

 if(cntr > 25){break;}
} // endwhile


//console.log("20250122c this.ztic-this.code: "+this.ztic+"-"+this.code);
const sm_namespace = this.svr1.getNSforCode(this.msg.dbZtI_id, this.ztic);
var ret_text = new TextReturn(this.ztic, this.code, sm_namespace);
ret_text.setShortText(this.shortSystemMessage);
ret_text.setLongText(this.longSystemMessage);
//console.log("20250123f this.shortSystemMessage: "+this.shortSystemMessage);
//console.log("20250123f this.longSystemMessage: "+this.longSystemMessage);
return ret_text;

}  //end of setText() 


setText2()   {
const sm_namespace = this.svr1.getNSforCode(this.msg.dbZtI_id, this.ztic);
var ret_text = new TextReturn(this.ztic, this.code, sm_namespace);
//ret_text.setShortText(this.shortSystemMessage);
//ret_text.setLongText(this.longSystemMessage);
ret_text.short_text = "abcd";  //setShortText(this.shortSystemMessage);
ret_text.long_text = "efghijklmnop"; //setLongText(this.longSystemMessage);
return ret_text;

}  //end of setText2() 



addLogEntryToMessage(){

//1. find object index of system message object (done in constructor)
//2. use system message object to find all parameters linked to from the system message object
//3. compare sysMsgParam_AR with parameters linked to from the system message object and keep only parameters that are linked to
//4. take allowed parameters from sysMsgParam_AR to do a replacement in the error text with the parametersvalues
//5. fill the values a new ServerLogSystemMessage object and push into msg.ServerLogSystemMessageWA_AR array 
//6. based on error category and logging level, write system message to log file 

if(this.msg.MessageProcessingParametersGeneralWA.defaultUpdateMode != 99){  // mode 99 is for initialization, system messages are suppressed

// step #4
this.setText();

// step #5
this.msg.serverLogSystemMessageWA_AR.push(this);

// step #6 
//if(loggingRelevant){    //(always write for now)
  this.writeLogEntryToFile();  

//} // endif  


} // endif if(this.msg.MessageProcessingParametersGeneralWA.defaultUpdateMode != 99){


}  // end of addLogEntryToMessage()




writeLogEntryToFile(){


} // end of writeLogEntryToFile()






//begin of doc insert

//According to the notation, a group of objects sharing the same context will be enclosed in curly braces {}.  Objects will be enclosed with in square braces [ ] and the various parts of the object reference will be enclosed within parenthesis ( ).  DS Instances are declared together in their own set of square brackets [].  The parts of an object reference have numbers associated: 1 for object kind, 2 for object code, 3 for object element   4 for table element, 5 for the value contained in a object element or table element ,  6 for extended key such as language key and 7 for DS Instance codes and associated namespace values that are shared with all the items within the curly braces {}, 8 to designate a specific timestamp and 9 to represent an element value.  The numbers representing the components of an object designation appear immediately after an open parenthesis ‘(' followed by a colon ':'.  After the ':' and before the close parenthesis ‘
//)’ are the DS Instance code and the code of the portion separated by a comma.  A group of DS Instance declarations are opened with a square bracked [, followed by 7:.  The DS Instance codes and namespace pairs are enclosed in parenthesis and separated by a comma. Spacing is optional and has no meaning.  For a given object either object element (number 3) or table element (number 4) would be specified but not both.



// For example an object reference could appear as follows   { [(1:1,32)(2:5,1)(3:1,4)(6:2,en)(9:Hi There)]  [7:(1,131131/21)(2,zinfinitree.com/lang)(5,myns.com/denv1)] }.  This refers to Object Kind 32 and code 1 from the DS namespace myns.com/denv1,english language table element with value “Hi Ther

//end of doc insert
setParameterValue(param_ns, param_code, value)  {
   // console.log("20250123i setParameterValue in zt_server_system_message.js: "+param_ns+"-"+param_code+"-"+value);
  // 1.  validate parameter namespace and parameter code against allowed parameters for the system message definition
  // 2.  add parameter value to system message
  var found = false;
  this.parameter_AR.forEach((parameter) => {
    if(parameter.namespace == param_ns && parameter.code == param_code){
        parameter.value = value;
        found = true;
    }  // endif
  }); // end of loop through this.parameter_AR
  
  if(!found){
     var sm_param = new ZtSystemMessageParameter(param_ns, param_code, value);
     this.parameter_AR.push(sm_param);
  
  }  // endif !found
  console.log("20230123j this.parameter_AR.length: "+this.parameter_AR.length);
  }  // end of setParameterValue



}  // end of class ZtSystemMessage



class ZtSystemMessageParameter {



constructor(namespacex, codex, valuex) {
      this.namespace  =  namespacex.toString().trim();
      this.code  =  codex.toString().trim();
      this.value =  valuex;
     // this.sm_text = "";
     // this.text_return = new TextReturn();
} // end of constructor


}  // end of class ZtSystemMessageParameter



class TextReturn {

constructor(sm_zticx, sm_codex, sm_namespacex)  {
this.sm_ztic = sm_zticx;
this.sm_code = sm_codex;
this.sm_namespace = sm_namespacex;
this.short_text = "";
this.long_text  = "";

} // end of constructor

setShortText(short_txt)   {

  this.short_text = short_txt;

}


setLongText(long_txt)   {

  this.long_text = long_txt;

}


} //end of class TextReturn




module.exports = ZtSystemMessage;





