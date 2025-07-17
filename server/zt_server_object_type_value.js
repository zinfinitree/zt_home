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


class ZtObjectTypeValue {


 //   constructor(svr1x, TV_idxx) {
 //     this.svr1 = svr1x;
 //     this.TV_idx = TV_idxx;

  constructor(objectKey, typeDef_ztic, typeDef_code, typeValue_ztic, typeValue_code, status, timestamp, seqNum, templateZTIC, templateCode) {
    this.objectKey = objectKey;
    this.typeDef_ztic = typeDef_ztic;
    this.typeDef_code = typeDef_code;
    this.typeValue_ztic = typeValue_ztic;
    this.typeValue_code = typeValue_code;
    this.status         = status;
    this.timestamp      = timestamp;
    this.seqNum         = seqNum;
    this.templateZTIC   = templateZTIC;
    this.templateCode   = templateCode;
      
  } // end of constructor




 getTypeObjectIdx(timestampx) {


   var returnTypeObject_idx;



  return returnTypeObject_idx;   
 
}  // end of getTypeObjectIdx()




} // end of class ZtObjectTypeValue

module.exports = ZtObjectTypeValue;
