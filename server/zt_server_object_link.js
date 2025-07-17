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


class ZtObjectLink {



  constructor(svr1, objectKey, linkType_ztic, linkType_code, linkToKind_ztic, linkToKind_code, linkToCode_ztic, linkToCode, linkValue, status, timestamp, seqNum, templateZTIC, templateCode) {
     this.svr1      = svr1;
     this.objectKey = objectKey;
     this.linkType_ztic = linkType_ztic.toString().trim();
     this.linkType_code = linkType_code.toString().trim();
     this.linkToKind_ztic    = linkToKind_ztic.toString().trim();
     this.linkToKind_code    = linkToKind_code.toString().trim();
     this.linkToCode_ztic    = linkToCode_ztic.toString().trim();
     this.linkToCode         = linkToCode.toString().trim();
     this.linkValue          = linkValue;
     this.status             = status;
     this.timestamp          = timestamp;
     this.seqNum             = seqNum;
     this.templateZTIC       = templateZTIC;
     this.templateCode       = templateCode;
      
  } // end of constructor




 getLinkTypeObjectIdx(timestampx) {


   var returnTypeObject_idx;

//function ZtObjectTypeValue(objectKey, typeDef_ztic, typeDef_code, typeValue_ztic, typeValue_code, status, timestamp, seqNum) {
//   this.objectKey = objectKey;
//   this.typeDef_ztic = typeDef_ztic;
//   this.typeDef_code = typeDef_code;
//   this.typeValue_ztic = typeValue_ztic;
//   this.typeValue_code = typeValue_code;
//   this.status         = status;
//   this.timestamp      = timestamp;
//   this.seqNum         = seqNum;


  return returnTypeObject_idx;   
 
}  // end of 


getTargetTemplateDefIdx(timestampx){
//1. Find object index of link type
//2. Use link type to find link target type
//3. Use link target type and linkToKind_ztic and linkToKind_code to find template definition
//4. Return index of of template definition


var template_object_idx = 99999999;
var test = 999999999;
var n = this.objectKey.search("_");
var dbzti_id = this.objectKey.substring(0,n);

var base_dsi_str = "131131/21";
var base_ztic_str = this.svr1.getCodeForNS(dbzti_id, base_dsi_str);

var linkTypeKeyStr = dbzti_id+"_"+base_ztic_str+"_10_"+this.linkType_ztic+"_"+this.linkType_code;

//console.log("linkTypeKeyStr: "+linkTypeKeyStr);


var link_type_obj = this.svr1.ZtObject_AR[this.svr1.ZtObject_idx_HM.get(linkTypeKeyStr)];


//2. Use link type to find link target type
var linkTargetTypeIdx;

//console.log("20200514 link_type_obj.typeValueIdx_AR.length: "+link_type_obj.typeValueIdx_AR.length); 
//console.log("link_type_obj.keyString: "+link_type_obj.keyString);    
//console.log("this.svr1.ZtObject_idx_HM.get(linkTypeKeyStr): "+this.svr1.ZtObject_idx_HM.get(linkTypeKeyStr));
for (var i = 0; i < link_type_obj.typeValueIdx_AR.length; i++){  
  // console.log("20200120 link_type_obj.typeValueIdx_AR[i].timestamp-timestampx: "+this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].timestamp+"-"+timestampx); 
  if(this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].timestamp <= timestampx){ 
  //  console.log("20200120 link_type_obj.typeValueIdx_AR[i].typeDef_ztic-link_type_obj.typeValueIdx_AR[i].typeDef_code: "+this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_ztic+"-"+this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_code);
    if(this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_ztic == base_ztic_str && this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_code == "2"){
        //test = 777;
     linkTargetTypeIdx = link_type_obj.getTypeValueIdxForTypeDef(this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_ztic, this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_code, timestampx);
    } // endif
  } // endif
} // endfor loop through typeValueIdx_AR


//3. Use link target type and linkToKind_ztic and linkToKind_code to find template definition
//console.log("20200122a linkTargetTypeIdx: "+linkTargetTypeIdx); 
var link_target_type_obj = this.svr1.ZtObject_AR[linkTargetTypeIdx];
var templ_cntr = 0;
//console.log("20200122b in zt_server_object_link: "+link_target_type_obj.linkIdx_AR.length);
for (var i = 0; i < link_target_type_obj.linkIdx_AR.length; i++){
   //console.log("20200122c in zt_server_object_link this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_ztic: "+this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_ztic);
   //console.log("20200122d this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_code: "+this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_code);
   if(this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_ztic==base_ztic_str &&   
      this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_code=="6"){   // link from link target type to template
          var templKeyStr = dbzti_id+"_"+ this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkToKind_ztic +"_"+this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkToKind_code+"_"+ this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkToCode_ztic +"_"+ this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkToCode;
//          console.log("20200122 templKeyStr in zt_server_object_link: "+templKeyStr);
          template_object_idx =  this.svr1.ZtObject_idx_HM.get(templKeyStr);
//          console.log("20200123 template_object_idx: "+template_object_idx);
          var template_obj     =  this.svr1.ZtObject_AR[template_object_idx];
          // use type def of object kind for object template
          var obj_kind_for_templ_idx = template_obj.getTypeValueIdxForTypeDef(base_ztic_str, "3", timestampx);
//          console.log("20200122f obj_kind_for_templ_idx: "+obj_kind_for_templ_idx);
          var obj_kind_for_templ_obj  = this.svr1.ZtObject_AR[obj_kind_for_templ_idx];

          //console.log("20200122g obj_kind_for_templ_obj.objZTIC: "+obj_kind_for_templ_obj.objZTIC);
          //console.log("20200122h obj_kind_for_templ_obj.objCode: "+obj_kind_for_templ_obj.objCode);
          //console.log("20200122i this.objectKey:       "+this.objectKey);
          //console.log("20200122j this.linkType_ztic:   "+this.linkType_ztic);
          //console.log("20200122k this.linkType_code:   "+this.linkType_code);
          //console.log("20200122l this.linkToKind_ztic: "+this.linkToKind_ztic);
          //console.log("20200122m this.linkToKind_code: "+this.linkToKind_code);  
          //console.log("20200122n this.linkToCode_ztic: "+this.linkToCode_ztic);
          //console.log("20200122o this.linkToCode:      "+this.linkToCode);
          //test = 888;
          if(this.linkToKind_ztic == obj_kind_for_templ_obj.objZTIC && this.linkToKind_code == obj_kind_for_templ_obj.objCode ){   // check object kind for template equals kind for link-to
       //    console.log("20200123b template_object_idx: "+template_object_idx);
           test = 999;
           test = template_object_idx;
           //returnIdx = template_object_idx;
//console.log("20200223a returnIdx: "+returnIdx);
           templ_cntr++;
          } //endif
   } //endif


} // endfor loop through link_target_type_obj links

//console.log("20200122 templ_cntr: "+templ_cntr);
if(templ_cntr != 1){console.log("Error: Must have exactly 1 template per object kind for link targets");}

if(test == 99999999){console.log("Error: No Target Template Def Index found in zt_server_object_link.getTargetTemplateDefIdx ");}


//console.log("20200223c template_object_idx: "+template_object_idx);
//console.log("test: "+test);
return template_object_idx;
//return test;

}  // end of method getTargetTemplateDefIdx



} // end of class ZtObjectLink

module.exports = ZtObjectLink;
