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



class ZtMultiMediaObjectGeneric {


    constructor() {
      //this.sess = sessionx;
      this.mmo_ztic = "";  // 20201124 workbook ztic
      this.mmo_code = "";  // 20201124 workbook code
      this.mmo_id   =  "";
      this.mmo_parent_id = "";
      this.templ_desc = "";
      this.desc = "";
      this.long_desc = "";
      this.label = "";
      this.resource_AR  = [];
  } // end of constructor



 setValuesFromInitialMessage() {
   var txx = 0;

}  // end of setValuesFromInitialMessage()





} // end of class DsMultiMediaObject




function TypeValueRec(){
   this.typeDef_ztic = "";
   this.typeDef_code = "";
   this.typeVal_ztic = "";
   this.typeVal_code = "";
   this.ztic_html_id     = "";
   this.ztic_html_input_val = "";
   this.ztic_ns_html_input_val = "";
   this.code_html_id     = "";
   this.code_html_input_val = "";
}

function LinkRec(){
   this.linkType_ztic = "";
   this.linkType_code = ""; 
   this.linkToKind_ztic = "";
   this.linkToKind_code = "";
   this.linkToObj_ztic  = "";
   this.linkToObj_code  = "";
   this.linkToObj_code_temp = "";   // 20200625
   this.linkStatus      = "";       // 20200712
   this.linkValue       = "";

}


module.exports = ZtMultiMediaObjectGeneric;
