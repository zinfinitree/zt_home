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



class ZtLinkType {


    constructor(svr1x, dbzti_id, linkTypeZTICx, linkTypeCodex) {

      this.svr1    = svr1x;
      this.dbzti_id = dbzti_id.toString().trim();
      this.linkTypeZTIC  = linkTypeZTICx.toString().trim();
      this.linkTypeCode  = linkTypeCodex.toString().trim();
      //this.keyString   = dbzti_id.toString().trim()+"_"+kindZTIC.toString().trim()+"_"+kindCode.toString().trim()+"_"+objZTIC.toString().trim()+"_"+objCode.toString().trim();
       this.targetTemplate_AR  = [];
    
   
  } // end of constructor



 getTargetTemplate(objectKindZTIC, objectKindCode) {

console.log("running ZtLinkType.getTargetTemplate: "+this.linkTypeZTIC+"-"+this.linkTypeCode);
       var returnTemplate;
       //if (this.ZtObject_HM.has(obj_key)){ returnx = true; }
       //else
       //{returnx = false;}
  return returnTemplate;
}  // end of getTargetTemplate




} // end of class ZtLinkType


 
 } // end of ZtLinkType class


module.exports = ZtLinkType;
