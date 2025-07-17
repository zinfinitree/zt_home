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


class ZtObjectElementValue {

//function ZtObjectElementValue(objectKey, TE_ztic, TE_code, ek_defZTIC, ek_defCode, ek_valueZTIC, ek_valueCode, status, timestamp, seqNum, value) {
//   this.objectjKey = objectKey;
//   this.TE_ztic    = TE_ztic;
//   this.TE_code    = TE_code;
//   this.OE_ztic    = "";
//   this.OE_code    = "";
//   this.ek_defZTIC = ek_defZTIC;
//   this.ek_defCode = ek_defCode;
//   this.ek_valueZTIC    = ek_valueZTIC;
//   this.ek_valueCode    = ek_valueCode;
//   this.status          = status;
//   this.timestamp       = timestamp;
//   this.seqNum          = seqNum;
//   this.value           = value;



//    constructor(svr1x, OE_idxx) {
//      this.svr1 = svr1x;
//      this.OE_idx = OE_idxx;

    constructor(objectKey, OE_ztic, OE_code, ek_defZTIC, ek_defCode, ek_valueZTIC, ek_valueCode, status, timestamp, seqNum, value, templateZTIC, templateCode) {
   this.objectjKey = objectKey;
   //this.TE_ztic    = TE_ztic;
   //this.TE_code    = TE_code;
   this.OE_ztic      = OE_ztic;
   this.OE_code      = OE_code;
   this.ek_defZTIC = ek_defZTIC;
   this.ek_defCode = ek_defCode;
   this.ek_valueZTIC    = ek_valueZTIC;
   this.ek_valueCode    = ek_valueCode;
   this.status          = status;
   this.timestamp       = timestamp;
   this.seqNum          = seqNum;
   this.value           = value;
   this.templateZTIC    = templateZTIC;
   this.templateCode    = templateCode;
  
   
  } // end of constructor

 getValue(timestamp) {

//console.log("running ZtObjectElement.getValue: "+this.objElemZTIC+"-"+this.objElemCode);
     
  return this.value;
}  // end of getValue







} // end of class ZtObjectElementValue

module.exports = ZtObjectElementValue;
