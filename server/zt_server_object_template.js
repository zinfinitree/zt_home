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


class ZtObjectTemplate {


    constructor(templ_def_ztic, templ_def_code, status, timestamp, seqNum) {

    //this.svr1      = svr1x;
    //this.objIdx    = objIdxx;
    //this.objectKey = objectKey;
    this.templ_ztic = templ_def_ztic;
    this.templ_code = templ_def_code;
    this.status     = status;
    this.timestamp  = timestamp;
    this.seqNum     = seqNum;
    this.techProfile_idx_AR = [];    //added 20190828
    
   
  } // end of constructor

 getObjectElementIdx_AR(timestamp) {

console.log("running ZtObjectTemplate.getObjectElements: "+this.objectKey);
       var OEreturn_AR = [];
       //if (this.ZtObject_HM.has(obj_key)){ returnx = true; }
       //else
       //{returnx = false;}
  return OEreturn_AR;
}  // end of getObjectElementIdx_AR


 getLinkTypeIdx_AR(timestamp) {

console.log("running ZtObjectTemplate.getLinkTypeIdx_AR: "+this.keyString);
       var linkTypeIdxReturn_AR = [];
 //" ...
  return LinkTypeIdxReturn_AR;
}  // end of getLinkTypeIdx_AR


 getTypeDefinitionIdx_AR(timestamp) {

console.log("running ZtObject.getTypeDefinitions: "+this.keyString);
       var typeDefinitionReturn_AR = [];

// " ...
 
  return typeDefinitionReturn_AR;
}  // end of getTypeDefinitionIdx_AR



} // end of class ZtObjectTemplate





module.exports = ZtObjectTemplate;
