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


class ZtObjectCode {



  constructor(svr1) {
     this.svr1      = svr1;
 //    this.msg       = msg;
 //    this.codeObject_AR = [];
      
  } // end of constructor




 getNextCode(msg, obj_kind_ztic, obj_kind_code, timestampx) {


//1. use kind_ztic and kind_code to get index of kind object
//2. use type value in kind object to get index of code range
//3. use code range to get next code
//4. call incrementCode, passing index of code range
 

 var nextCode = "";
 var found = false;
 const base_ztic = svr1.getCodeForNS(msg.TabNamePrfx.toString().trim(), "131131/21");

 var kindObjKeyStr = this.msg.TabNamePrfx+"_"+base_ztic+"_1"+"_"+obj_kind_ztic+"_"+obj_kind_code;
 var kind_obj_idx = svr1.ZtObject_HM.get(kindObjKeyStr);
 var kind_obj = svr1.ZtObject_AR[kind_obj_idx];

 var code_rng_idx = kind_obj.getTypeValueIdxForTypeDef(base_ztic, "5", timestampx);

 var code_rng_obj = svr1.ZtObject_AR[code_rng_idx];
 const code_rng_base_templ_key_str = this.msg.TabNamePrfx+"_"+base_ztic+"_2_"+base_ztic+"_21";

 var code_rng_base_templ_idx = svr1.ZtObject_HM.get(code_rng_base_templ_key_str);

 var code_rng_OE_AR = code_rng_obj.getOEvalueIdxForTemplateDef(code_rng_base_templ_idx, timestampx);



 for (var i = 0; i < code_rng_OE_AR.length; i++) {
    if(code_rng_OE_AR[i].OE_ztic == base_ztic && code_rng_OE_AR[i].OE_code == "204"){
      nextCode = code_rng_OE_AR[i].value.toString().trim();
      code_rng_OE_AR[i].value = this.getIncrementedCode(code_rng_idx, nextCode, timestampx);
      found = true;
    }

 }


   


if(!found){
      // log error
  var sys_msg_obj = new (require('./zt_server_system_message'))(this.svr1, this.msg, this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim(), "2", this.svr1.time.now());
  sys_msg_obj.setParameterValue("131131/21", "1", "ZtCodeObjectSet"); 
  sys_msg_obj.setParameterValue("131131/21", "2", "getNextCode");
  sys_msg_obj.setParameterValue("131131/21", "3", "zt_server_code_object.js");  
  sys_msg_obj.setParameterValue("131131/21", "4", "Code object not found");
  sys_msg_obj.setParameterValue("131131/21", "5", obj_kind_ztic);
  sys_msg_obj.setParameterValue("131131/21", "6", obj_kind_code);  
  sys_msg_obj.addLogEntryToMessage();

}  // endif !found
  return nextCode; 
 
}  // end of getNextCode


getIncrementedCode(code_rng_idx, assignedCode, timestampx) {

//1. find code scheme for code range using type value for code scheme type def
//2. find program related to code scheme
//3. execute program to increment code
//4. return incremented code

 const base_ztic = svr1.getCodeForNS(msg.TabNamePrfx.toString().trim(), "131131/21");

 var code_rng_obj = svr1.ZtObject_AR[code_rng_idx];

 var code_scheme_idx = code_rng_obj.getTypeValueIdxForTypeDef(base_ztic, "6", timestampx);

 var code_scheme_obj = svr1.ZtObject_AR[code_scheme_idx];
 const code_scheme_base_templ_key_str = this.msg.TabNamePrfx+"_"+base_ztic+"_2_"+base_ztic+"_22";

 var code_scheme_base_templ_idx = svr1.ZtObject_HM.get(code_scheme_base_templ_key_str);

 var code_scheme_OE_AR = code_scheme_obj.getOEvalueIdxForTemplateDef(code_scheme_base_templ_idx, timestampx);




} // end of getIncrementCode()

setCodeObject(objKindZTICx, objKindCodex, codeSchemeZTICx, codeSchemeCodex, minCodex, maxCodex, nextCodex){

  

}  // end of method setObjectCodeRange

  


} // end of class ZtObjectCode







module.exports = ZtObjectCode;
