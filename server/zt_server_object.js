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


class ZtObject {


    constructor(svr1x, dbzti_id, kindZTIC, kindCode, objZTIC, objCodex) {
      var HashMap = require('hashmap');
      this.svr1    = svr1x;
      this.dbzti_id = dbzti_id.toString().trim();
      this.kindZTIC = kindZTIC.toString().trim();
      this.kindCode = kindCode.toString().trim();
      this.objZTIC  = objZTIC.toString().trim();
      this.objCode  = objCodex.toString().trim();
      this.keyString   = dbzti_id.toString().trim()+"_"+kindZTIC.toString().trim()+"_"+kindCode.toString().trim()+"_"+objZTIC.toString().trim()+"_"+objCodex.toString().trim();
      this.parentIdx = 0;
      this.linkLevel = 0;
      this.isPopulated = false;
      this.objElemIdx_AR = [];
      this.typeValueIdx_AR = [];
      this.linkIdx_AR     = [];
      this.ZtObjectTemplate_AR  = [];
      this.template_AR = [];   //20191118  temp
      this.techProfileIdx_AR_HM = new HashMap();   // 20220802
    
   
  } // end of constructor


 getTemplate_idx(template_def_idx, timestampx){

    var returnTempl_idx = 0;
    var most_recent_ts = 0;

       for (var i = 0; i < this.ZtObjectTemplate_AR.length; i++){
         if(this.ZtObjectTemplate_AR[i].timestamp <= timestampx){
          if(this.svr1.ZtObject_AR[template_def_idx].objZTIC == this.ZtObjectTemplate_AR[i].templ_ztic && this.svr1.ZtObject_AR[template_def_idx].objCode == this.ZtObjectTemplate_AR[i].templ_code){
               if(this.ZtObjectTemplate_AR[i].timestamp >= most_recent_ts){
                     most_recent_ts = this.ZtObjectTemplate_AR[i].timestamp
                     returnTempl_idx = i;
               } //endif  this.template_AR[i].timestamp >= most_recent_ts
    
          } //endif  ztic and code match
         } //endif this.template_AR[i].timestamp <= timestampx
       } // endfor loop through ZtObjectTemplate_AR

    return returnTempl_idx;

} //end getTemplate_idx

 



getOEvalueIdxForTemplateDef(template_def_idx, extendedKeyWA_AR, timestampx, techProfileIdx_ARx) {  // 20241230  looking at ways to get template def less often
 //getOEvalueIdxForTemplateDef(template_def_idx, extendedKeyWA_AR, timestampx) {   // (del) 20241230
 //getOEvalueIdxForTemplateDef(template_def_idx, extendedKeyWA_AR, timestampx, techProfileIdx_ARx) { //    20220802 looking at ways to get template def less often
 var HashMap = require('hashmap');
//console.log("20231123a  running ZtObject.getOEvalueIdxForTemplateDef: "+this.keyString);
//console.log("20231123b  template_def_idx-timestampx: "+ template_def_idx+"-"+timestampx);
       var OEvalueReturnIdx_AR = [];
       var techProfileIdx_AR = [];
       var techProfileProcessed_AR = [];
       var mostRecentOEvalue_idx_HM = new HashMap();
       var mostRecentOEvalue_idx_AR = [];
       //var linkIdxToTechProfile_AR = [];
       var done = false;
       var cntr = 0
       //find links from template to tech profiles


//console.log( "20241230 techProfileIdx_ARx: "+techProfileIdx_ARx);
if(techProfileIdx_ARx == undefined || techProfileIdx_ARx.length == 0){
//if(techProfileIdx_ARx.length > 0){
    // find all the tech profiles used by the template
 techProfileIdx_AR = this.getTechnicalProfileIdx_AR_ForTemplateDef(template_def_idx, timestampx);
  
   }
  else
  techProfileIdx_AR = techProfileIdx_ARx;  // use the tech profiles passed in 
  {
  
} //endif
 //  techProfileIdx_AR = techProfileIdx_ARx;                                // 20220802 looking at ways to get template def less often

//find all the object elements linked to from the tech profiles used by the template
var OE_idx_AR = [];
//console.log("20231122j in zt_server_object techProfileIdx_AR.length: "+techProfileIdx_AR.length);
for (var i = 0; i < techProfileIdx_AR.length; i++){
//console.log("20200117 in zt_server_object this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length: "+this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length);
//   console.log("20200302 techProfileIdx_AR[i]:  "+techProfileIdx_AR[i]+" - "+timestampx);
   for (var j = 0; j < this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length; j++){
        //console.log("20231122k kind_ztic:   "+this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic);
        //console.log("20231122  kind_code:   "+this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code);
        //console.log("20231122  131131/21: "+this.svr1.getCodeForNS(this.dbzti_id, "131131/21"));
        //console.log("20231122 this.svr1.ZtObjectLink_AR[ this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].timestamp: "+this.svr1.ZtObjectLink_AR[ this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].timestamp);
        //console.log("20231122 timestampx: "+timestampx);
        if(this.svr1.ZtObjectLink_AR[ this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].timestamp <= timestampx && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic == this.svr1.getCodeForNS(this.dbzti_id, "131131/21") && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code.toString().trim() == "3") {
         var objectElementKeyStr = this.dbzti_id + "_" +
this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToCode_ztic.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToCode.toString().trim();
     var OE_idx = this.svr1.ZtObject_idx_HM.get(objectElementKeyStr); 
     //console.log("20231122n objectElementKeyStr - OE_idx: "+objectElementKeyStr+" - "+OE_idx);
     OE_idx_AR.push(OE_idx);
    }  // endif
   }  // endfor loop through links      
} // endfor loop through techProfileIdx_AR





// prepare return of all indexes of Object Element values of the Object Elements that are specified by the template
var OE_included_in_template = false;
//console.log("%20201111 this.objElemIdx_AR.length: "+this.objElemIdx_AR.length);
for (var i = 0; i < this.objElemIdx_AR.length; i++){        
   for (var j = 0; j < OE_idx_AR.length; j++){
     //console.log("20231123c this.svr1.ZtObject_AR[OE_idx_AR[j]].objZTIC: "+this.svr1.ZtObject_AR[OE_idx_AR[j]].objZTIC);
     //console.log("20231123d this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_ztic: "+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_ztic);
     //console.log("20231123e this.svr1.ZtObject_AR[OE_idx_AR[j]].objCode: "+this.svr1.ZtObject_AR[OE_idx_AR[j]].objCode);
     //console.log("20231123f this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_code: "+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_code);
     // start 20200513 to get OE idx with most recent value
      if( this.svr1.ZtObject_AR[OE_idx_AR[j]].objZTIC == this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_ztic &&   this.svr1.ZtObject_AR[OE_idx_AR[j]].objCode == this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_code){
          var OE_value_idx = this.getOEvalueIdxSingle(this.svr1.ZtObject_AR[OE_idx_AR[j]].objZTIC, this.svr1.ZtObject_AR[OE_idx_AR[j]].objCode, extendedKeyWA_AR, timestampx);
          if(!mostRecentOEvalue_idx_HM.has(OE_value_idx)){    // 20200709
             if(OE_value_idx != null){OEvalueReturnIdx_AR.push(OE_value_idx); mostRecentOEvalue_idx_HM.set(OE_value_idx, "x")}   
          }  // endif 20200709
       } // endif
     // end 20200513 

   } //endfor loop through OE_idx_AR
} //endfor loop through this.objElemIdx_AR






/// 20200509 NOTE: NEED TO ADD STEP TO GET ONLY MOST RECENT OE VALUE BEFORE return OEvalueReturnIdx_AR
//  console.log("%20201111 OEvalueReturnIdx_AR.length: "+OEvalueReturnIdx_AR.length);
  return OEvalueReturnIdx_AR;
}  // end of getOEvalueIdxForTemplateDef



 ///written 20200513 // also check getOEvalue()
 getOEvalueIdxSingle(OE_zticx, OE_codex, extendedKeyWA_AR, timestampx) {    
   var returnValueIdx = null;
   var mostRecentTS = null;
   for (var i = 0; i < this.objElemIdx_AR.length; i++){
       if(this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i] ].timestamp <= timestampx){

         if(this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i] ].OE_ztic.toString().trim() == OE_zticx.toString().trim() && 
            this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i] ].OE_code.toString().trim() == OE_codex.toString().trim()){
            if(this.extendedKeyCheckPassed(this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]],  extendedKeyWA_AR )) { 
              if(mostRecentTS == null || mostRecentTS < this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i] ].timestamp){
               mostRecentTS = this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i] ].timestamp;
               returnValueIdx = this.objElemIdx_AR[i];
              }  // endif mostRecentTS == null...
            } // endif this.extendedKeyCheckPassed
         }  // endif OE_ztic == OE_zticx ...
       }  // endif timestamp <= timestampx
   } // endfor
   return returnValueIdx;
 } // end of getOEvalueIdxSingle



 extendedKeyCheckPassed(objElem,  extendedKeyWA_AR ) {
 // console.log(" ");
 // console.log("20200509 running extendedKeyCheckPassed in zt_server_object");
  var checkPassed = false;
      // 20200509 check if objElem uses an extended key from the message. if yes, checkPassed = true
  

  for (var i = 0; i < extendedKeyWA_AR.length; i++){  
//console.log("20200509 extendedKeyWA_AR values:");
//console.log(".extendedKeyDefinitionCodeZTIC - objElem.ek_defZTIC: "+extendedKeyWA_AR[i].extendedKeyDefinitionCodeZTIC + " - "+ objElem.ek_defZTIC);
//console.log(".extendedKeyDefinitionCode     - objElem.ek_defCode: "+extendedKeyWA_AR[i].extendedKeyDefinitionCodeCode + " - "+objElem.ek_defCode);
//console.log(".extendedKeyValueZTIC - objElem.ek_valueZTIC: "       +extendedKeyWA_AR[i].extendedKeyValueZTIC + " - "+ objElem.ek_valueZTIC);
//console.log(".extendedKeyValueCode - objElem.ek_valueCode: "       +extendedKeyWA_AR[i].extendedKeyValueCode + " - "+ objElem.ek_valueCode);

    if((extendedKeyWA_AR[i].extendedKeyDefinitionCodeZTIC == objElem.ek_defZTIC &&
       extendedKeyWA_AR[i].extendedKeyDefinitionCode     == objElem.ek_defCode &&
       extendedKeyWA_AR[i].extendedKeyValueZTIC          == objElem.ek_valueZTIC &&
       extendedKeyWA_AR[i].extendedKeyValueCode          == objElem.ek_valueCode ) || (objElem.ek_valueCode.toString().trim() == "")){
         checkPassed = true;
      } // endif
  }  // endfor loop through extendedKeyWA_AR



  return checkPassed;
 }


 getTypeValueIdxForTemplateDef(template_def_idx, timestampx) {
 // REVISIT TO RESTRICT BASED ON TEMPLATE AND TIMESTAMP

 var HashMap = require('hashmap');

////console.log(" ");
////console.log("* * 20210226 this.keyString:   "+this.keyString);
////console.log("* * 20210226 template_def_idx: "+template_def_idx);

 // 1. find all type definitions from all related tech profiles and put in array
// find all the tech profiles used by the template


// start 20200901
var techProfileIdx_AR = [];
var techProfileProcessed_AR = [];
var mostRecentTypeValue_idx_HM = new HashMap();
var mostRecentTypeValue_idx_AR = [];
var typeValueReturnIdx_AR = [];


var timex = new (require('./zt_server_time.js'))
var time_get_tech_profile_ar = 0;
//var time_get_links = 0;
//var time_get_type_vals = 0;
var time_before = 0;
var time_after = 0;





time_before = timex.now();

 techProfileIdx_AR = this.getTechnicalProfileIdx_AR_ForTemplateDef(template_def_idx, timestampx); 
 time_after = timex.now();
time_get_tech_profile_ar = time_get_tech_profile_ar + time_after - time_before;
//console.log("20250101c time_get_tech_profile_ar: "+time_get_tech_profile_ar);





//find all the type definitions linked to from the tech profiles used by the template
var typeDef_idx_AR = [];
//console.log("* * 20210226   in zt_server_object techProfileIdx_AR.length: "+techProfileIdx_AR.length);
for (var i = 0; i < techProfileIdx_AR.length; i++){
//console.log("20200902 &&&  in zt_server_object this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length: "+this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length);
//   console.log("20200902 &&&  techProfileIdx_AR[i]:  "+techProfileIdx_AR[i]+" - "+timestampx);
//   console.log("20200902 &&& this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length: "+this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length);
   for (var j = 0; j < this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length; j++){
//        console.log("* * 20210226 &&&  kind_ztic:   "+this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic);
//        console.log("* * 20210226 &&&  kind_code:   "+this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code);
//        console.log("* * 20210226 &&&  obj ztic:    "+this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToCode_ztic);
//        console.log("* * 20210226 &&&  obj code:    "+this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToCode);
//        console.log("* * 20210226 &&&  131131/21: "+this.svr1.getCodeForNS(this.dbzti_id, "131131/21"));
        if(this.svr1.ZtObjectLink_AR[ this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].timestamp <= timestampx && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic == this.svr1.getCodeForNS(this.dbzti_id, "131131/21") && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code.toString().trim() == "9") {    
         var typeDefinitionKeyStr = this.dbzti_id + "_" +
this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToCode_ztic.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToCode.toString().trim();
     var typeDef_idx = this.svr1.ZtObject_idx_HM.get(typeDefinitionKeyStr); 
//     console.log("* * 20210226 typeDefinitionKeyStr - typeDef_idx: "+typeDefinitionKeyStr+" - "+typeDef_idx);
     typeDef_idx_AR.push(typeDef_idx);
    }  // endif
   }  // endfor loop through links      
} // endfor loop through techProfileIdx_AR  


///// // prepare return of all indexes of type values of the type definitions that are specified by the template
 // 2. loop at type def array and loop at type values for object as inner loop
 // 3. if type def for type value is same as type def in outer loop, put type def and timestamp of type value into hashmap.  
 //       if hashmap already has it, only update if the timestamp is more recent but less than timestamp parameter of this function
 // 4. loop at type values for object and add to return arry if the timestamp is equal to hashmap timestamp

//var typeDef_included_in_template = false;
//console.log("20200902 &&&  this.typeValueIdx_AR.length: "+this.typeValueIdx_AR.length);
//console.log("20200902 &&&  typeDef_idx_AR.length:    "+typeDef_idx_AR.length);
for (var i = 0; i < this.typeValueIdx_AR.length; i++){        
   for (var j = 0; j < typeDef_idx_AR.length; j++){
//     console.log("20200902 &&&   this.svr1.ZtObject_AR[typeDef_idx_AR[j]].objZTIC: "+this.svr1.ZtObject_AR[typeDef_idx_AR[j]].objZTIC);
//     console.log("20200902 &&&   this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeDef_ztic: "+this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeDef_ztic);
//     console.log("20200902 &&&   this.svr1.ZtObject_AR[typeDef_idx_AR[j]].typeDef_code: "+this.svr1.ZtObject_AR[typeDef_idx_AR[j]].objCode);
//     console.log("20200902 &&&   this.svr1.ZtObjectElement_AR[this.typeValueIdx_AR[i]].typeDef_code: "+this.svr1.ZtObjectElement_AR[this.typeValueIdx_AR[i]].typeDef_code);
     // start 20200902 to get typeDef idx with most recent value
      if( this.svr1.ZtObject_AR[typeDef_idx_AR[j]].objZTIC == this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i]].typeDef_ztic &&   this.svr1.ZtObject_AR[typeDef_idx_AR[j]].objCode == this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i]].typeDef_code){
          var type_value_idx = this.getTypeValueIdxSingle(this.svr1.ZtObject_AR[typeDef_idx_AR[j]].objZTIC, this.svr1.ZtObject_AR[typeDef_idx_AR[j]].objCode, timestampx);
          if(!mostRecentTypeValue_idx_HM.has(type_value_idx)){    // 20200709
             if(type_value_idx != null){typeValueReturnIdx_AR.push(type_value_idx); mostRecentTypeValue_idx_HM.set(type_value_idx, "x")}   
          }  // endif 20200709
       } // endif
   } //endfor loop through typeDef_idx_AR
} //endfor loop through this.typeValueIdx_AR


// end 20200901
  return typeValueReturnIdx_AR;   // 20200903

//console.log("running ZtObject.getTypeValues: "+this.keyString);

// begin (del) 20210226
///}  // 20200903   (del) 20211012

/// else {  // 20200903  (del) 20210226   (del) 20211012

///       var typeValuesReturnIdx_AR = [];    //(del) 20200902  (del) 20211012



///  typeValuesReturnIdx_AR = this.typeValueIdx_AR;  //(del) 20200902 (del) 20211012
 // console.log(" ");
 // console.log("* ** 20210226 this.keyString:                "+this.keyString);
 // console.log("* ** 20210226 typeValuesReturnIdx_AR.length: "+typeValuesReturnIdx_AR.length);
  for (var p = 0; p < typeValuesReturnIdx_AR.length; p++){
//    console.log("* * 20210226 typeValuesReturnIdx_AR[p]: "+typeValuesReturnIdx_AR[p]);

  }
 



}  // end of getTypeValueIdxForTemplateDef



 getTypeValueIdxSingle(typeDef_zticx, typeDef_codex, timestampx) {    
   var returnValueIdx = null;
   var mostRecentTS = null;
   for (var i = 0; i < this.typeValueIdx_AR.length; i++){
       if(this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i] ].timestamp <= timestampx){

         if(this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i] ].typeDef_ztic.toString().trim() == typeDef_zticx.toString().trim() && 
            this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i] ].typeDef_code.toString().trim() == typeDef_codex.toString().trim()){
       
              if(mostRecentTS == null || mostRecentTS < this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i] ].timestamp){
               mostRecentTS = this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i] ].timestamp;
               returnValueIdx = this.typeValueIdx_AR[i];
              }  // endif mostRecentTS == null...
   
         }  // endif OE_ztic == OE_zticx ...
       }  // endif timestamp <= timestampx
   } // endfor
   return returnValueIdx;
 } // end of getTypeValueIdxSingle





 getLinkIdxForTemplateDef(template_def_idx, timestampx, statusExclusion_ARx) {


var HashMap = require('hashmap');
var techProfileIdx_AR = [];
var techProfileProcessed_AR = [];
var mostRecentLink_idx_HM = new HashMap();
var mostRecentLink_idx_AR = [];
//var typeValueReturnIdx_AR = [];





// REVISIT TO RESTRICT BASED ON TEMPLATE AND TIMESTAMP
//console.log("running ZtObject.getLinkIdxForTemplateDef: "+this.keyString);

 techProfileIdx_AR = this.getTechnicalProfileIdx_AR_ForTemplateDef(template_def_idx, timestampx);
       var linkReturnIdx_AR = [];


 
//find all the link types linked to from the tech profiles used by the template
var linkType_idx_AR = [];
//console.log("* * 20210419 techProfileIdx_AR.length: "+techProfileIdx_AR.length);
for (var i = 0; i < techProfileIdx_AR.length; i++){
   for (var j = 0; j < this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length; j++){
             if(this.svr1.ZtObjectLink_AR[ this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].timestamp <= timestampx && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic == this.svr1.getCodeForNS(this.dbzti_id, "131131/21") && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code.toString().trim() == "10") {  // links from tech profile to link  types

         var linkTypeKeyStr = this.dbzti_id + "_" +
  this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic.toString().trim() + "_" +   this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToCode_ztic.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToCode.toString().trim();
     var linkType_idx = this.svr1.ZtObject_idx_HM.get(linkTypeKeyStr); 

//     console.log("* * 20210419 linkTypeKeyStr - linkType_idx: "+linkTypeKeyStr+" - "+linkType_idx);
     linkType_idx_AR.push(linkType_idx);

       } // endif
   } // endfor
} // endfor

/// ///// // prepare return of all indexes of links of the link types that are specified by the template
/// // 2. loop at link type array and loop at links for object as inner loop
/// // 3. if link type for links is same as link type in outer loop, put link type and timestamp of link into hashmap.  
/// //       if hashmap already has it, only update if the timestamp is more recent but less than timestamp parameter of this function
/// // 4. loop at links for object and add to return arry if the timestamp is equal to hashmap timestamp

/// //var typeDef_included_in_template = false;
//console.log("20210419 &&&  this.linkIdx_AR.length: "+this.linkIdx_AR.length);
//console.log("20210419 &&&  linkType_idx_AR.length:    "+linkType_idx_AR.length);

//var mostRecentLink_idx_HM = new HashMap();
//var mostRecentLink_idx_AR = [];
var link_idx;
for (var i = 0; i < this.linkIdx_AR.length; i++){
  if(!(this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].timestamp > timestampx)){  // exclude links with future timestamps 
  // if(!(this.statusExcluded(statusExclusion_ARx, this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].status))){       // 20210802 exclude links with excluded status   HAS PROBLEM, previous link that was not excluded was picked up    
   for (var j = 0; j < linkType_idx_AR.length; j++){

      if( this.svr1.ZtObject_AR[linkType_idx_AR[j]].objZTIC == this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_ztic &&   this.svr1.ZtObject_AR[linkType_idx_AR[j]].objCode == this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_code){
        var linkTargetKeyStr = this.dbzti_id + "_" +this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_ztic.toString().trim()+"_"+
                                                  +this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_code.toString().trim()+"_"+
                                                  +this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToKind_ztic.toString().trim()+"_"+
                                                  +this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToKind_code.toString().trim()+"_"+
                                                  +this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToCode_ztic.toString().trim()+"_"+
                                                  +this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToCode.toString().trim();

          if(mostRecentLink_idx_HM.has(linkTargetKeyStr)){
            link_idx = mostRecentLink_idx_HM.get(linkTargetKeyStr);
            if(this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].timestamp > this.svr1.ZtObjectLink_AR[link_idx].timestamp){mostRecentLink_idx_HM.set(linkTargetKeyStr, this.linkIdx_AR[i]);}
          }
           else
          {
            mostRecentLink_idx_HM.set(linkTargetKeyStr, this.linkIdx_AR[i]);
          }  // endif
         //var link_idx = this.getLinkIdxSingle(this.svr1.ZtObject_AR[linkType_idx_AR[j]].objZTIC, this.svr1.ZtObject_AR[linkType_idx_AR[j]].objCode, timestampx);
       
         //if(!mostRecentLink_idx_HM.has(link_idx)){   
         //   if(link_idx != null){linkReturnIdx_AR.push(link_idx); mostRecentLink_idx_HM.set(link_idx, "x")}   
         //}  // 
       } // endif
   } //endfor loop through linkType_idx_AR
  //} // 20210802  exclude links with excluded status
 } // endif if(!(this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].timestamp > timestampx))
} //endfor loop through this.linkIdx_AR

   mostRecentLink_idx_HM.forEach(function(value, key) {
   linkReturnIdx_AR.push(value);
    
   });

// start 20210802
  var linkReturnIdx_AR_final = [];
//console.log(" ");
//console.log(" ");
//console.log("^^* 20210802 statusExclusion_ARx.length: "+statusExclusion_ARx.length);
for (var i = 0; i < linkReturnIdx_AR.length; i++){
  // console.log("^^* this.svr1.ZtObjectLink_AR[linkReturnIdx_AR[i]].status: "+this.svr1.ZtObjectLink_AR[linkReturnIdx_AR[i]].status);
  if(!(this.statusExcluded(statusExclusion_ARx, this.svr1.ZtObjectLink_AR[linkReturnIdx_AR[i]].status))){
  //if(this.svr1.ZtObjectLink_AR[linkReturnIdx_AR[i]].status == 1 || this.svr1.ZtObjectLink_AR[linkReturnIdx_AR[i]].status.toString().trim() == "" ){
     linkReturnIdx_AR_final.push(linkReturnIdx_AR[i]); 

  } // endif

 } // endfor

// end 20210802
//
//  return linkReturnIdx_AR;   // 20200903
//  console.log("^^* 20210802 linkReturnIdx_AR_final.length: "+linkReturnIdx_AR_final.length);
  //console.log("x:"+x.toString().trimg());
  return linkReturnIdx_AR_final;  // 20210802



    
//linkIdxReturn_AR = this.linkIdx_AR;  (del) 20210419

//  return linkIdxReturn_AR;        (del) 20210419
}  // end of getLinkIdxForTemplateDef  (del) 20210419


 getTypeValueIdxForTypeDef(typeDef_zticx, typeDef_codex, timestampx){  // 20191211

//1. find the relevant type value using the type value with the most recent timestamp that is not after the parameter timestamp and matches type def 
//2. find object kind from type definition..the object kind is used to fill the key of the type value
//3. fill the key of the type value and find the index of the type value
//4. return the object index of the type value object

   //var returnIdx = 99999;  (del) 20250211
    var returnIdx = null;  // 20250211
   var newest_timestamp = 0;
   //var type_value_idx = 99999;  (del) 20250211
    var type_value_idx = null;  // 20250211
   var found = false;
   //console.log("20200121 this.svr1.ZtObjecttypeValueIdx_AR.length: "+this.svr1.ZtObjecttypeValueIdx_AR.length);
   //console.log("20200122 in zt_server_object this.keyString: "+this.keyString);
   //console.log("20200122 this.typeValueIdx_AR.length: "+this.typeValueIdx_AR.length);
   //console.log("20200122 typeDef_zticx-typeDef_codex: "+typeDef_zticx+"-"+typeDef_codex);
   //console.log("20200221b timestampx: "+timestampx);
 
   for (var i = 0; i < this.typeValueIdx_AR.length; i++){
   // console.log("20200221b this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].timestamp: "+this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].timestamp);
   // console.log("20200221b this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeDef_ztic: "+  this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeDef_ztic);
   // console.log("20200221b this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeDef_code: " + this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeDef_code);
   // console.log("20200221b typeDef_zticx - typeDef_codex: "+typeDef_zticx+" - "+typeDef_codex);
     if(this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i]].typeDef_ztic == typeDef_zticx && this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i]].typeDef_code == typeDef_codex && this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i]].timestamp <= timestampx ){
            if(newest_timestamp < this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i]].timestamp){
                newest_timestamp = this.svr1.ZtObjectTypeValue_AR[this.typeValueIdx_AR[i]].timestamp;
                found = true;
                type_value_idx = this.typeValueIdx_AR[i];
            } // endif newest_timestamp < typeValueIdx_AR timestamp 

     } // endif

   }  // endfor loop through typeValueIdx_AR
 //console.log("20200120 found type_value_idx: "+found+"-"+type_value_idx);
 //console.log("this.keyString: "+this.keyString);
 //console.log("this_object_idx: "+this.getObjectIndex());
 //if(type_value_idx != 99999){  (del) 20250211
   if(type_value_idx != null){  // 20250211

//2. find object kind from type definition..the object kind is used to fill the key of the type value
  var base_dsi_str = "131131/21";
  var base_ztic_str = this.svr1.getCodeForNS(this.dbzti_id, base_dsi_str);
  var typeDefKeyStr = this.dbzti_id+"_"+base_ztic_str+"_9_"+typeDef_zticx+"_"+typeDef_codex;
  var type_def_obj_idx =  this.svr1.ZtObject_idx_HM.get(typeDefKeyStr);
//  console.log("20200121 zt_server_object.js type_def_obj_idx: "+type_def_obj_idx);
  var type_def_obj     =  this.svr1.ZtObject_AR[type_def_obj_idx];

  newest_timestamp = 0;
  //var obj_kind_for_type_def_idx = 99999;  (del) 20250211
  var obj_kind_for_type_def_idx = null;  // 20250211
  found = false;
   //console.log("20200121 type_def_obj.typeValueIdx_AR.length: "+type_def_obj.typeValueIdx_AR.length);
   for (var i = 0; i < type_def_obj.typeValueIdx_AR.length; i++){
   //console.log("20200121 this.svr1.ZtObjecttypeValueIdx_AR[type_def_obj.typeValueIdx_AR[i]].typeDef_ztic: "+this.svr1.ZtObjecttypeValueIdx_AR[type_def_obj.typeValueIdx_AR[i]].typeDef_ztic);
   //console.log("20200221 this.svr1.ZtObjecttypeValueIdx_AR[type_def_obj.typeValueIdx_AR[i]].typeDef_code: "+this.svr1.ZtObjecttypeValueIdx_AR[type_def_obj.typeValueIdx_AR[i]].typeDef_code);
   //console.log("20200221 this.svr1.ZtObjecttypeValueIdx_AR[type_def_obj.typeValueIdx_AR[i]].timestamp: "+this.svr1.ZtObjecttypeValueIdx_AR[type_def_obj.typeValueIdx_AR[i]].timestamp);
   //console.log("timestampx: "+timestampx);
     if(this.svr1.ZtObjectTypeValue_AR[type_def_obj.typeValueIdx_AR[i]].typeDef_ztic == base_ztic_str && this.svr1.ZtObjectTypeValue_AR[type_def_obj.typeValueIdx_AR[i]].typeDef_code == "4" && this.svr1.ZtObjectTypeValue_AR[type_def_obj.typeValueIdx_AR[i]].timestamp <= timestampx ){
            if(newest_timestamp < this.svr1.ZtObjectTypeValue_AR[type_def_obj.typeValueIdx_AR[i]].timestamp){
                newest_timestamp = this.svr1.ZtObjectTypeValue_AR[type_def_obj.typeValueIdx_AR[i]].timestamp;
                found = true;
                obj_kind_for_type_def_idx = type_def_obj.typeValueIdx_AR[i];
            } // endif newest_timestamp < typeValueIdx_AR timestamp 

     } // endif

   }  // endfor loop through typeValueIdx_AR

//console.log("20200121 found obj_kind_for_type_def_idx: "+found+"-"+obj_kind_for_type_def_idx);

//3. fill the key of the type value and find the index of the type value


  //console.log("20200120 obj_kind_for_type_def_idx: "+obj_kind_for_type_def_idx);
  //console.log("type_value_idx: "+type_value_idx);
  var typeValueKeyStr = this.dbzti_id+"_"+this.svr1.ZtObjectTypeValue_AR[obj_kind_for_type_def_idx].typeValue_ztic+"_"+
                                         this.svr1.ZtObjectTypeValue_AR[obj_kind_for_type_def_idx].typeValue_code+"_"+
                                         this.svr1.ZtObjectTypeValue_AR[type_value_idx].typeValue_ztic+"_"+
                                         this.svr1.ZtObjectTypeValue_AR[type_value_idx].typeValue_code;
  //console.log("20200221e typeValueKeyStr: "+typeValueKeyStr);
  var getIdx = this.svr1.ZtObject_idx_HM.get(typeValueKeyStr);
  if(getIdx == undefined){
      found = false;
      //returnIdx = 99999}  (del) 20250211
      returnIdx = null;}    // 20250211
    else
      {
      returnIdx = getIdx;
      }

} // endif if(type_value_idx != 99999){
   




  return returnIdx;

 }// end of getTypeValueIdxForTypeDef


 getObjectIndex(){
   var this_object_idx = this.svr1.ZtObject_idx_HM.get(this.keyString);
   return this_object_idx;

  }  // end of getObjectIndex()


 getLinkedObjectIdx(){
   this.linkedObj_AR = [];

  return this.linkedObj_AR;

} // end of getLinkedObjectIdx


 getLinkedObjectIdxForLinkType(link_type_ztic, link_type_code, timestampx){


  var returnLinkedObjIdx_AR = [];
//  console.log("20200305 this.linkIdx_AR.length: "+this.linkIdx_AR.length);
  for (var i = 0; i < this.linkIdx_AR.length; i++){
    // console.log("20200305 this.linkIdx_AR[i]: "+this.linkIdx_AR[i]);
    // console.log("20200305 this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkTypeZTIC: "+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_ztic);
    // console.log("20200305 link_type_ztic: "+link_type_ztic);
    // console.log("20200305 this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkTypeCode: "+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_code);
    // console.log("20200305 link_type_code: "+link_type_code);
    // console.log("20200305 this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].timestamp: "+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].timestamp +" - "+timestampx);

     if(this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_ztic  == link_type_ztic &&   this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_code  == link_type_code && this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].timestamp <= timestampx){

       var linkedObjKeyStr = this.dbzti_id+ "_"+ this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToKind_ztic +"_"+ this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToKind_code +"_"+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToCode_ztic +"_"+ this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToCode;
        //var obj = this.svr1.getObjectForKeyString(linkedObjKeyStr);
        var obj_idx = this.svr1.ZtObject_idx_HM.get(linkedObjKeyStr);
        returnLinkedObjIdx_AR.push(obj_idx);

    } // endif

  }  // endfor

  return returnLinkedObjIdx_AR;

} // end of getLinkedObjectIdxForLinkType


getOEvalue(OE_zticx, OE_codex, EK_zticx, EK_codex, timestampx){


   var return_val = null;
   var latest_ts  = -999999999999;
   //console.log("20240209a in zt_server_object.js.getOEvalue OE_zticx - OE_codex - EK_zticx - EK_codex - timestampx: "+OE_zticx+ " - "+OE_codex+" - "+EK_zticx+" - "+EK_codex+" - "+timestampx);
   for (var i = 0; i < this.objElemIdx_AR.length; i++){
     var obj_elem_obj = this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]];
     //console.log("20240209b obj_elem_obj.OE_ztic - .OE_code - .ek_valueZTIC - ek_valueCode - timestamp: "+ obj_elem_obj.OE_ztic+" - "+obj_elem_obj.OE_code+" - "+obj_elem_obj.ek_valueZTIC+" - "+obj_elem_obj.ek_valueCode+" - "+obj_elem_obj.timestamp+" - "+obj_elem_obj.value);
       if(obj_elem_obj.OE_ztic == OE_zticx && obj_elem_obj.OE_code == OE_codex && obj_elem_obj.ek_valueZTIC == EK_zticx && obj_elem_obj.ek_valueCode == EK_codex && obj_elem_obj.timestamp <= timestampx){
         if(obj_elem_obj.timestamp > latest_ts){
            return_val = obj_elem_obj.value;
            latest_ts  = obj_elem_obj.timestamp;
         }  // endif      
       }  // endif
   }
  //console.log("20200322 return_val: "+return_val);  

  return return_val;
}  // end of getOEvalue()


listAllValues(){

  var html_list_str = "";   // 20240426
  var html_list_return = new HtmlObjectListRec();  // 20240426


//32 --All DB ZT Instance ID
//1  --All Object Kind DS Instance Code 
//2  --All Object Kind Code
//3  --All Code DS Instance Code
//4  --All Code 
//5  --All Record Type DS Instance Code 
//6  --All Record Type Code 1=Standard, 2=Extended Key, 3=Type Table, 4=Link  5=Object Template
//7  --Std Object Element DS Instance Code
//8  --Std Object Element Code
//9  --Ext.Key Extended Key Definition ZTIC
//10 --Ext.Key Extended Key Definition Code
//11 --Ext.Key Extended Key Value ZTIC
//12 --Ext.Key Extended Key Value Code
//13 --Type Type Definition ZTIC
//14 --Type Type Definition  Code
//15 --Type Type Value ZTIC
//16 --Type Type Value Code
//17 --Link Link Type ZTIC
//18 --Link Link Type Code
//19 --Link Link To Kind ZTIC
//20 --Link Link To Kind Code
//21 --Link Link To Code ZTIC
//22 --Link Link To Code
//23 --Template Object Template ZTIC
//24 --Template Object Template Code
//25 --All Status
//26 --All Timestamp--Effective
//27 --All Sequence number
//28 --All Message ID
//29 --All Message Segment Index
//30 --Link Link Value
//31 --Std Table Element Value


   console.log("   ");
   console.log("   ");
   console.log("list All Values for keyString: "  +this.keyString);
   console.log("   ");
     console.log("TabNamePrfx   Kind ZTIC    Kind Code    Object ZTIC    Object Code"); 
     console.log("  TE 32         TE 1          TE 2          TE 3           TE 4");
     console.log("  -------------------------------------------------------------");
     console.log("  "+this.dbzti_id+"          "+this.kindZTIC+"             "+this.kindCode+"             "+this.objZTIC+"              "+this.objCode);

   console.log("   ");
   console.log("   ");
 
   console.log("    Object Element Values, record count: "+this.objElemIdx_AR.length);

 console.log("   ");
 

     console.log("      OE ZTIC   OE Code   EK Def ZTIC   EK Def Code    EK ZTIC     EK Code      Eff Timestamp         OE Value");
     console.log("        TE 7      TE 8        TE 9        TE 10         TE 11       TE 12          TE 26                TE 31");
     console.log("      --------------------------------------------------------------------------------------------------------");
   for (var i = 0; i < this.objElemIdx_AR.length; i++){
   //this.ek_defZTIC 
   //this.ek_defCode 
   //this.ek_valueZTIC
   //this.ek_valueCode
  
    console.log("        "+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_ztic.toString().padEnd(5)+"     "+ this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_code.padEnd(5) +"       "+ this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_defZTIC.padEnd(5)+"       "+ this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_defCode.padEnd(5)+"         "+ this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_valueZTIC.padEnd(5)+ "       "+ this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_valueCode.padEnd(5)+"          "+ this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].timestamp+"     "+ this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].value);  // 20211011

   //  console.log("       i: "+i+" - "+"ts:"+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].timestamp+" - "
   //                                  +"ZTIC-Code: "+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_ztic+"-"
   //                                  + this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_code+"  "
   //                         +"EK: "+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_defZTIC+"-"
   //                                 +this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_defCode+"-"
   //                                 +this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_valueZTIC+"-"
   //                                 +this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_valueCode+" : "      
   ///                          +this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].value);
   html_list_return.ObjElem = html_list_return.ObjElem + "<tr>";
   html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.kindZTIC+"</td>";
   html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.kindCode+"</td>";
   html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.objZTIC+"</td>";
   html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.objCode+"</td>";
   //html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+"x"+"</td>";    // te 5
   //html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+"x"+"</td>";    // te 6
   html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_ztic+"</td>";  // te 7
   html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].OE_code+"</td>";  // te 8
   //html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_defZTIC+"</td>";    // te 9
   //html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_defCode+"</td>";    // te 10
   //html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_valueZTIC+"</td>";    // te 11
   //html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].ek_valueCode+"</td>";    // te 12
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 13
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 14
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 15
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 16
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 17
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 18
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 19
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 20
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 21
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 22
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 23
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 24
  
   //html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].status+"</td>";       // te 25
   //html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].timestamp+"</td>";    // te 26
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 27
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 28
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 29
   //html_list_str = html_list_str + "<td>"+"x"+"</td>";    // te 30
   html_list_return.ObjElem = html_list_return.ObjElem + "<td>"+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].value+"</td>";    // te 31


   html_list_return.ObjElem = html_list_return.ObjElem + "</tr>";
                              
   } // endfor loop through this.objElemIdx_AR 

   console.log("20240501a html_list_return.ObjElem: "+html_list_return.ObjElem);



   console.log("  ");
   console.log("    Object Type Value count: "+this.typeValueIdx_AR.length);
   for (var i = 0; i < this.typeValueIdx_AR.length; i++){
     console.log("       i: "+i+" - "+this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeDef_ztic+"-"+
                                      this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeDef_code+"-"+ 
                                      this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeValue_ztic+"-"+  
                                      this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeValue_code+"-"+ 
                                      this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].timestamp+"---type val idx: "+
                                      this.typeValueIdx_AR[i] );

                                      html_list_return.typeVal = html_list_return.typeVal + "<tr>";
                                      html_list_return.typeVal = html_list_return.typeVal + "<td>"+this.kindZTIC+"</td>";
                                      html_list_return.typeVal = html_list_return.typeVal + "<td>"+this.kindCode+"</td>";
                                      html_list_return.typeVal = html_list_return.typeVal + "<td>"+this.objZTIC+"</td>";
                                      html_list_return.typeVal = html_list_return.typeVal + "<td>"+this.objCode+"</td>";
                                      html_list_return.typeVal = html_list_return.typeVal + "<td>"+this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeDef_ztic+"</td>";
                                      html_list_return.typeVal = html_list_return.typeVal + "<td>"+this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeDef_code+"</td>";
                                      html_list_return.typeVal = html_list_return.typeVal + "<td>"+this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeValue_ztic+"</td>"; 
                                      html_list_return.typeVal = html_list_return.typeVal + "<td>"+this.svr1.ZtObjecttypeValueIdx_AR[this.typeValueIdx_AR[i]].typeValue_code+"</td>"; 


                                      html_list_return.typeVal = html_list_return.typeVal + "</tr>";

   }// endfor loop through typeValueIdx_AR




   console.log("  ");
   console.log("    Object Link count: "+this.linkIdx_AR.length);
   for (var i = 0; i < this.linkIdx_AR.length; i++){
     console.log("   this.linkIdx_AR[i]: "+this.linkIdx_AR[i]);
     console.log("       i: "+i+" - "+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_ztic+"-"+
                                      this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_code+"-"+ 
                                      this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToKind_ztic+"-"+  
                                      this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToKind_code+"-"+ 
                                      this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToCode_ztic+"-"+
                                      this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToCode+"-"+
                                      this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].status+"-"+
                                      this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkValue+"-"+
                                      this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].timestamp+"-" );

                                      html_list_return.link = html_list_return.link + "<tr>";
                                      html_list_return.link = html_list_return.link + "<td>"+this.kindZTIC+"</td>";
                                      html_list_return.link = html_list_return.link + "<td>"+this.kindCode+"</td>";
                                      html_list_return.link = html_list_return.link + "<td>"+this.objZTIC+"</td>";
                                      html_list_return.link = html_list_return.link + "<td>"+this.objCode+"</td>";

                                      html_list_return.link = html_list_return.link + "<td>"+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_ztic+"</td>";
                                      html_list_return.link = html_list_return.link + "<td>"+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkType_code+"</td>";
                                      html_list_return.link = html_list_return.link + "<td>"+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToKind_ztic+"</td>";
                                      html_list_return.link = html_list_return.link + "<td>"+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToKind_code+"</td>";
                                      html_list_return.link = html_list_return.link + "<td>"+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToCode_ztic+"</td>";
                                      html_list_return.link = html_list_return.link + "<td>"+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkToCode+"</td>";
                                      //html_list_return.link = html_list_return.link + "<td>"+this.svr1.ZtObjectLink_AR[this.linkIdx_AR[i]].linkValue+"</td>";
                                      html_list_return.link = html_list_return.link + "</tr>";                                    

   }// endfor loop through linkIdx_AR   

   return  html_list_return;  // 20240426

} // end of listAllValues



isStringInOEvalues(stringx){

var stringFound = false;

   for (var i = 0; i < this.objElemIdx_AR.length; i++){
        //console.log("       "+this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].value);

     if(this.svr1.ZtObjectElement_AR[this.objElemIdx_AR[i]].value.toString().indexOf(stringx) > -1) {
        stringFound = true;
     }


   } // endfor loop through this.objElemIdx_AR

return stringFound;

}  // end of isStringInOEvalues(stringx){

// start 20231006
//getTechnicalProfileIdx_AR_ForTemplateDefAll(template_def_idx, timestampx) {  //(del) 20231009
  getTechnicalProfileIdx_AR_ForTemplateDef(template_def_idx, timestampx) {   // 20231012
  var technicalProfileIdx_AR = [];
  var referencedTemplateIdx_AR = this.getReferencedObjectIdx_AR(template_def_idx, timestampx);
  //console.log("20231009b: referencedTemplateIdx_AR.length: "+referencedTemplateIdx_AR.length);
  for (var i = 0; i < referencedTemplateIdx_AR.length; i++){
    technicalProfileIdx_AR = technicalProfileIdx_AR.concat(this.getTechnicalProfileIdx_AR_ForTemplateDef_single(referencedTemplateIdx_AR[i], timestampx));   
    

  } // endfor loop through referencedTemplateIdx_AR 
  //console.log("20231009a technicalProfileIdx_AR.length: "+technicalProfileIdx_AR.length);
  return technicalProfileIdx_AR;

}  // end of getTechnicalProfileIdx_AR_ForTemplateDefAll(template_def_idx, timestampx) { 


// start 20231010
//getReferencedObjectIdx_AR(template_def_idx, timestampx){


    
//}  // end of getReferencedObjectIdx_AR()
// end 20231010



getReferencedObjectIdx_AR(template_def_idx, timestampx){
//  getReferencedTemplateIdx_AR(template_def_idx, timestampx){





  var returnTemplateIdx_AR = [];
  var current_template_def_idx = template_def_idx;
  returnTemplateIdx_AR.push(current_template_def_idx);
  //console.log("20231009f current_template_def_idx: "+current_template_def_idx);
  var done = false;
  var loop_cntr = 0;
  var newest_timestamp = 0;
 

  var base_dsi_str = "131131/21";
  var base_ztic_str = this.svr1.getCodeForNS(this.dbzti_id, base_dsi_str);

  while(!done){
    var template_def_obj     =  this.svr1.ZtObject_AR[current_template_def_idx];
    var template_found = false;
    //console.log("20231009e template_def_obj.typeValueIdx_AR.length: "+template_def_obj.typeValueIdx_AR.length);
    for (var i = 0; i < template_def_obj.typeValueIdx_AR.length; i++){
       // check if type def code 30--reference template for a template
      // console.log("20231009c this.svr1.ZtObjecttypeValueIdx_AR[template_def_obj.typeValueIdx_AR[i]].typeDef_ztic - base_ztic_str: "+this.svr1.ZtObjecttypeValueIdx_AR[template_def_obj.typeValueIdx_AR[i]].typeDef_ztic + " - "+ base_ztic_str);
      // console.log("20231009d this.svr1.ZtObjecttypeValueIdx_AR[template_def_obj.typeValueIdx_AR[i]].typeDef_code: "+this.svr1.ZtObjecttypeValueIdx_AR[template_def_obj.typeValueIdx_AR[i]].typeDef_code);
       if(this.svr1.ZtObjectTypeValue_AR[template_def_obj.typeValueIdx_AR[i]].typeDef_ztic == base_ztic_str && this.svr1.ZtObjectTypeValue_AR[template_def_obj.typeValueIdx_AR[i]].typeDef_code == "30" && this.svr1.ZtObjectTypeValue_AR[template_def_obj.typeValueIdx_AR[i]].timestamp <= timestampx ){
         if(newest_timestamp < this.svr1.ZtObjecttypeValueIdx_AR[template_def_obj.typeValueIdx_AR[i]].timestamp){
            newest_timestamp = this.svr1.ZtObjecttypeValueIdx_AR[template_def_obj.typeValueIdx_AR[i]].timestamp;
            template_found = true;
        //    console.log("20231011a template_found: "+template_found);
            const refTemplKeyStr = this.dbzti_id+"_"+base_ztic_str+"_2_"+this.svr1.ZtObjecttypeValueIdx_AR[template_def_obj.typeValueIdx_AR[i]].typeValue_ztic+"_"+this.svr1.ZtObjecttypeValueIdx_AR[template_def_obj.typeValueIdx_AR[i]].typeValue_code;
            const  ref_templ_obj_idx =  this.svr1.ZtObject_idx_HM.get(refTemplKeyStr);
        //    console.log("20231011b refTemplKeyStr - ref_templ_obj_idx: "+refTemplKeyStr+" - "+ref_templ_obj_idx);
            current_template_def_idx = ref_templ_obj_idx;
            returnTemplateIdx_AR.push(current_template_def_idx);

         } // endif newest_timestamp < typeValueIdx_AR timestamp 
       } // endif
         
    }  // endfor loop through typeValueIdx_AR
    if(!template_found){done = true;}
    if(loop_cntr > 50){
      done = true;
    }
    loop_cntr++;
  }  // endwhile

  
 // console.log("20231011c returnTemplateIdx_AR vals:")
  //for (var i = 0; i < returnTemplateIdx_AR.length; i++){
  //   console.log("idx val: "+returnTemplateIdx_AR[i] )
  //}  

  return returnTemplateIdx_AR;
//}  // end of getReferencedTemplateIdx_AR()
}  // end of getReferencedObjectIdx_AR()
  
// end 20231006



getTechnicalProfileIdx_AR_ForTemplateDef_single(template_def_idx, timestampx) {   // 20231012

var techProfileIdx_AR = [];    //20191210
var techProfileProcessed_AR = [];  //20200118

// start 20220803
//console.log("20250122h template_def_idx: "+template_def_idx);
//console.log("20250122i timestampx: "+timestampx);
var techProfileIdx_AR_keystr = template_def_idx.toString().trim() +"_"+ timestampx.toString().trim();
var techProfileIdx_AR_found = false;

if(this.techProfileIdx_AR_HM.has(techProfileIdx_AR_keystr)){
     techProfileIdx_AR_found = true;
     techProfileIdx_AR = this.techProfileIdx_AR_HM.get(techProfileIdx_AR_keystr); 
}  // endif techProfile_AR_HM.has keystr


if(!techProfileIdx_AR_found){ 

// end 20220803



 // use all links from the template to object kind code "12" (technical profile)
//console.log("%20201110 template_def_idx: "+template_def_idx);
//console.log("20200117 in zt_server_object_a this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR.length: "+this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR.length);      
       for (var i = 0; i < this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR.length; i++){
         // console.log("this.svr1.ZtObjectLink_AR[ this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].timestamp: "+this.svr1.ZtObjectLink_AR[ this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].timestamp);
         // console.log("timestampx: "+ timestampx);
         // console.log("this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].linkToKind_ztic: "+this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].linkToKind_ztic);
        // console.log("this.svr1.getCodeForNS(this.dbzti_id, 131131/21): "+this.svr1.getCodeForNS(this.dbzti_id, "131131/21"));
  
          if(this.svr1.ZtObjectLink_AR[ this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].timestamp <= timestampx && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].linkToKind_ztic == this.svr1.getCodeForNS(this.dbzti_id, "131131/21") && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].linkToKind_code.toString().trim() == "12") { 
  //console.log("20191115 links from template to tech profiles: ");
  //console.log("ztic: "+this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i].linkToCode_ztic);
  //console.log("code: "+this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i].linkToCode);
 
 //find the key string of all the technical profiles linked to from the template
           var techProfileKeyStr = this.dbzti_id +"_"+ this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].linkToKind_ztic.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].linkToKind_code.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].linkToCode_ztic.toString().trim() + "_" + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[template_def_idx].linkIdx_AR[i] ].linkToCode.toString().trim();
 // find the object index of the tech profile using the key string
    var tech_profile_idx = this.svr1.ZtObject_idx_HM.get(techProfileKeyStr); 
    //console.log("20250101g techProfileKeyStr: "+techProfileKeyStr);
 // add the object index of the tech profile to an array
              techProfileIdx_AR.push(tech_profile_idx);
              techProfileProcessed_AR.push(false);
          } //endif
       } //endfor
 
 var done = false; 
 var cntr = 0;    
       while(!done){  //find all tech profiles linked to from other tech profiles
         cntr++;
         var links_found = false;
         var techProfileIdx_AR_length = techProfileIdx_AR.length;
         //console.log("techProfileIdx_AR_length: "+techProfileIdx_AR_length);
         for (var i = 0; i < techProfileIdx_AR_length; i++){
           if(!techProfileProcessed_AR[i]){
             //console.log("20250101i techProfileIdx_AR[i]: "+techProfileIdx_AR[i]);
             //console.log("i: "+i);
             //console.log("20250101h this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length: "+this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length);
             //console.log("20250101j this.svr1.ZtObject_AR[techProfileIdx_AR[i]].keyString: "+this.svr1.ZtObject_AR[techProfileIdx_AR[i]].keyString);

             //  
             //if(this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length > 0){links_found = true;}  // (del) 20250101
             for (var j = 0; j < this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR.length; j++){


          if(this.svr1.ZtObjectLink_AR[ this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].timestamp <= timestampx && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic == this.svr1.getCodeForNS(this.dbzti_id, "131131/21") && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code.toString().trim() == "12")
            { 
              links_found = true;  // 20250101
            var techProfileKeyStr = this.dbzti_id + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic.toString().trim() + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code.toString().trim() + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToCode_ztic.toString().trim() + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[techProfileIdx_AR[i]].linkIdx_AR[j] ].linkToCode.toString().trim();
    var tech_profile_idx = this.svr1.ZtObject_idx_HM.get(techProfileKeyStr);
              techProfileProcessed_AR[i] = true; 
              techProfileIdx_AR.push(tech_profile_idx);
              techProfileProcessed_AR.push(false);
            } //endif...
 
           } //endfor loop through links
          }//endif !techProfileProcessed_AR[i]
         } //endfor loop through techProfileIdx_AR
         //console.log("20250101f links_found: "+links_found);
         if(!links_found){done=true;}
         if(cntr > 5000){done = true;}  // 20201024
         //if(cntr > 10){done = true;}  //(del) 20201024
       } // endwhile

       //console.log("20250101d cntr in getTechnicalProfileIdx_AR_ForTemplateDef_single: "+cntr);
       //console.log("20250101e techProfileIdx_AR.length: "+techProfileIdx_AR.length);

       this.techProfileIdx_AR_HM.set(techProfileIdx_AR_keystr, techProfileIdx_AR); // 20220803

}  // endif if(!techProfileIdx_AR_found){   // 20220803

  return techProfileIdx_AR;          //20191210
} // end getTechnicalProfileIdx_AR_ForTemplateDef_single()

// start 20230620 implement getAllValuesForTemplateDef including reference templates
getAllValuesForTemplateDef(template_def_idxx, msgx, timestampx, statusExclusion_ARx, maxLevelsDownx){
 // getAllValuesForTemplateDefWithReferenceObjects(template_def_idxx, msgx, timestampx, statusExclusion_ARx, maxLevelsDownx){  

  var referenced_obj_idx_AR = [];
  var combined_resp_item_AR = [];

  //template_def_idx_AR.push(template_def_idxx);

  const base_dsi_str = "131131/21";
  const base_ztic_str = this.svr1.getCodeForNS(this.dbzti_id, base_dsi_str);


  //1. find all templates that that starting template refers to and put them in an array using type definition of the template that are of type:
  //            ELEM 2    9    2    29   2    9    2    9         Type Definition: Type Definition Usage Type for a Type Definition
  //2. call getAllValuesForTemplateDef for each template in the array accumulating the response from each call
  //3. return the accumulated responses from all of the calls
  //4. rename this method to getAllValuesForTemplateDef
  //5. rename method getAllValuesForTemplateDef to getAllValuesForTemplateDefSingle
  //6. change this method to call getAllValuesForTemplateDefSingle instead of getAllValuesForTemplateDef
  //7. rename this method to getAllValuesForTemplateDef
  //8. test results


  

  var obj_idx =  this.svr1.ZtObject_idx_HM.get(this.keyString);

  // for now, only get reference objects if this object is a template
  if(this.kindZTIC ==  base_ztic_str && this.kindCode == "2"){   // object kind is a template
    //console.log("20231010b object this.objZTIC - this.objCode is a template: "+this.objZTIC+" - "+this.objCode);
    referenced_obj_idx_AR = this.getReferencedObjectIdx_AR(obj_idx, timestampx);
    referenced_obj_idx_AR.reverse();
  }
  else
  {
    referenced_obj_idx_AR.push(obj_idx);

  }  // endif this object is a template  

  for (var i = 0; i < referenced_obj_idx_AR.length; i++){
    var templ_obj     =  this.svr1.ZtObject_AR[referenced_obj_idx_AR[i]];
    combined_resp_item_AR = combined_resp_item_AR.concat(templ_obj.getAllValuesForTemplateDef_single(template_def_idxx, msgx, timestampx, statusExclusion_ARx, maxLevelsDownx));   
  } // endfor loop through referenced_obj_idx_AR

  //start 20231015   20231023 user exit to stay inactive for now, date string to be drived from type value code and namespace instead
  // combined_resp_item_AR = combined_resp_item_AR.concat(this.getAllValuesForTemplateDefUserExitFunction(combined_resp_item_AR, msgx, timestampx));
  //end 20231015

  return combined_resp_item_AR;
//}   //  end of getAllValuesForTemplateDefWithReferenceObjects
}  // end of getAllValuesForTemplateDef()
// end 20230620



// start 20241229
//copied from getAllValuesForTemplateDef to improve performance by reducing the number of calls to getTechnicalProfileIdx_AR_ForTemplateDef


getAllValuesForTemplateDef2(template_def_idxx, msgx, timestampx, statusExclusion_ARx, maxLevelsDownx, techProfileIdx_ARx){
  // getAllValuesForTemplateDefWithReferenceObjects(template_def_idxx, msgx, timestampx, statusExclusion_ARx, maxLevelsDownx){  

  // note: 20241230 techProfileIdx_AR = this.getTechnicalProfileIdx_AR_ForTemplateDef(template_def_idx, timestampx);
 
   var referenced_obj_idx_AR = [];
   var combined_resp_item_AR = [];
 
   //template_def_idx_AR.push(template_def_idxx);
 
   const base_dsi_str = "131131/21";
   const base_ztic_str = this.svr1.getCodeForNS(this.dbzti_id, base_dsi_str);
 
 
   //1. find all templates that that starting template refers to and put them in an array using type definition of the template that are of type:
   //            ELEM 2    9    2    29   2    9    2    9         Type Definition: Type Definition Usage Type for a Type Definition
   //2. call getAllValuesForTemplateDef for each template in the array accumulating the response from each call
   //3. return the accumulated responses from all of the calls
   //4. rename this method to getAllValuesForTemplateDef
   //5. rename method getAllValuesForTemplateDef to getAllValuesForTemplateDefSingle
   //6. change this method to call getAllValuesForTemplateDefSingle instead of getAllValuesForTemplateDef
   //7. rename this method to getAllValuesForTemplateDef
   //8. test results
 
   
 
   var obj_idx =  this.svr1.ZtObject_idx_HM.get(this.keyString);
 
   // for now, only get reference objects if this object is a template
   if(this.kindZTIC ==  base_ztic_str && this.kindCode == "2"){   // object kind is a template
     //console.log("20231010b object this.objZTIC - this.objCode is a template: "+this.objZTIC+" - "+this.objCode);
     referenced_obj_idx_AR = this.getReferencedObjectIdx_AR(obj_idx, timestampx);
     referenced_obj_idx_AR.reverse();
   }
   else
   {
     referenced_obj_idx_AR.push(obj_idx);
 
   }  // endif this object is a template  
 
   for (var i = 0; i < referenced_obj_idx_AR.length; i++){
     var templ_obj     =  this.svr1.ZtObject_AR[referenced_obj_idx_AR[i]];
     combined_resp_item_AR = combined_resp_item_AR.concat(templ_obj.getAllValuesForTemplateDef_single(template_def_idxx, msgx, timestampx, statusExclusion_ARx, maxLevelsDownx, techProfileIdx_ARx));   
   } // endfor loop through referenced_obj_idx_AR
 
   //start 20231015   20231023 user exit to stay inactive for now, date string to be drived from type value code and namespace instead
   // combined_resp_item_AR = combined_resp_item_AR.concat(this.getAllValuesForTemplateDefUserExitFunction(combined_resp_item_AR, msgx, timestampx));
   //end 20231015
 
   return combined_resp_item_AR;
 //}   //  end of getAllValuesForTemplateDefWithReferenceObjects
 }  // end of getAllValuesForTemplateDef2()


// end 20241229



 
getAllValuesForTemplateDef_single(template_def_idxx, msgx, timestampx, statusExclusion_ARx, maxLevelsDownx, techProfileIdx_ARx)  {          // gets called from new getAllValuesForTemplateDef 20231010   
var HashMap = require('hashmap');
var linkableTempl_HM  = new HashMap();    //20200527

var typeValueIdx_AR_HM  = new HashMap();     // 20250101

if(maxLevelsDownx == undefined){maxLevelsDownx = 99999;}

//console.log("20230407 maxLevelsDownx in zt_server_object.js: "+maxLevelsDownx);

//console.log("20200902--- running ZtObject.getAllValuesForTemplateDef in zt_server_object: "+template_def_idxx+" - "+timestampx);
//console.log("20200821 this.keyString for current object: "+this.keyString);


  var resp_item_AR = [];
 // var top_object = new ZtObject(this.svr1, this.dbzti_id,this.kindZTIC,this.kindCode,this.objZTIC,this.objCode); 

  var top_object =  this.svr1.ZtObject_AR[this.svr1.ZtObject_idx_HM.get(this.keyString)];
  var top_template = this.svr1.ZtObject_AR[template_def_idxx];
//  console.log("template_def_idxx: "+template_def_idxx);
  
  var id_num = 1;
  var parent_id_num = 0;
  //var top_resp_item = new  ZtObjectResponseItem(id_num, parent_id_num, this.svr1, this.dbzti_id, this.kindZTIC, this.kindCode, this.objZTIC, this.objCode,  top_template.objZTIC, top_template.objCode, "1", querySetMember_memberIDx);  //(del) 20200526
var top_resp_item = new  ZtObjectResponseItem(id_num, parent_id_num, this.svr1, this.dbzti_id, this.kindZTIC, this.kindCode, this.objZTIC, this.objCode,  top_template.objZTIC, top_template.objCode, "1");  //20200526 took out querySetMember_member_IDx, left in response type param
  var levels_down = 0; //20200706
  top_resp_item.levelsDown = levels_down;     // 20200706
  resp_item_AR.push(top_resp_item);
  parent_id_num = id_num;  // 20200707
  id_num++;                // 20200707

  var done = false;
  var links_found = false;
  var cntr = 0;
  var base_ztic   = this.svr1.getCodeForNS(this.dbzti_id, "131131/21");

  var get_all_values_loop_cntr = 0;


  var timex = new (require('./zt_server_time.js'))
  var time_get_oe_values = 0;
  var time_get_links = 0;
  var time_get_type_vals = 0;
  var time_before = 0;
  var time_after = 0;
  //console.log("20241219a time before while: "+timex.now());
  while(!done){
    links_found = false;
   // parent_id_num = id_num -1;  (del) 20200801  
    get_all_values_loop_cntr++;


    levels_down++;  // 20200707
    var resp_item_AR_length = resp_item_AR.length;
    var child_response_type;
    //console.log("%%% 20241228a resp_item_AR_length - get_all_values_loop_cntr: "+resp_item_AR_length+ " - "+get_all_values_loop_cntr);
   // console.log("%%% 20220801 time before loop at resp_item_AR: "+timex.now());
    for (var i = 0; i < resp_item_AR_length; i++){
      parent_id_num = resp_item_AR[i].id;   // 20200801
      if(!resp_item_AR[i].complete){
         resp_item_AR[i].complete = true;  // 20200707   
         child_response_type = resp_item_AR[i].responseType;
        // console.log("20230709 resp_item_AR[i].keyString: "+resp_item_AR[i].keyString);
         var obj_index   = this.svr1.ZtObject_idx_HM.get(resp_item_AR[i].keyString);
        // console.log("20230709 obj_index: "+obj_index);
        // console.log("20200821a resp_item_AR[i].keyString: "+resp_item_AR[i].keyString);
        // console.log("20200421c obj_index: "+obj_index);
         var templ_def_index = this.svr1.ZtObject_idx_HM.get(resp_item_AR[i].templKeyStr);
//         console.log("20200421d templ_def_index: "+templ_def_index);
         var templ_def       = this.svr1.ZtObject_AR[templ_def_index];

         //time_before = timex.now();
//         console.log("%%% 20220801 time before getOEvalueIdx: "+timex.now());
      //   console.log("20231122f obj_index: "+obj_index);
      //   console.log("20231122g templ_def_index: "+templ_def_index);
      //   console.log("20231122h timestampx: "+timestampx);
         resp_item_AR[i].objElemIdx_AR = this.svr1.ZtObject_AR[obj_index].getOEvalueIdxForTemplateDef(templ_def_index, msgx.extendedKeyWA_AR, timestampx, techProfileIdx_ARx);  
      //   console.log("20231122i resp_item_AR[i].objElemIdx_AR.length: "+resp_item_AR[i].objElemIdx_AR.length);
// 20220802 looking at ways to get template def less often   
//resp_item_AR[i].objElemIdx_AR = this.svr1.ZtObject_AR[obj_index].getOEvalueIdxForTemplateDef(templ_def_index, msgx.extendedKeyWA_AR, timestampx, techProfileIdx_AR); 20220802
         //time_after = timex.now();
         //time_get_oe_values = time_get_oe_values + time_after - time_before;
//         console.log("%%% 20220801 time after getOEvalueIdx:  "+timex.now());
//         console.log("20200421e resp_item_AR[i].objElemIdx_AR.length: "+resp_item_AR[i].objElemIdx_AR.length);


         //time_before = timex.now();
         //if(!typeValueIdx_AR_HM.has(templ_def_index)){  // 20250101
            resp_item_AR[i].typeValueIdx_AR  = this.svr1.ZtObject_AR[obj_index].getTypeValueIdxForTemplateDef(templ_def_index, timestampx);


//         console.log("20200514a obj_index - resp_item_AR[i].typeValueIdx_AR.length: "+obj_index +" - "+ resp_item_AR[i].typeValueIdx_AR.length); 
         //resp_item_AR[i].linkIdx_AR       = this.svr1.ZtObject_AR[obj_index].getLinkIdxForTemplateDef(templ_def_index, timestampx);   // (del) 20210802

         //time_before = timex.now();
         resp_item_AR[i].linkIdx_AR       = this.svr1.ZtObject_AR[obj_index].getLinkIdxForTemplateDef(templ_def_index, timestampx, statusExclusion_ARx);     // 20210802
         //time_after = timex.now();
         //time_get_links = time_get_links + time_after - time_before;


         //levels_down++;  //20200706
         //parent_id_num = id_num -1;  // (del) 20200801
//         console.log("20200126 object.get..resp_item_AR[i].linkIdx_AR.length: "+resp_item_AR[i].linkIdx_AR.length);

         for (var j = 0; j < resp_item_AR[i].linkIdx_AR.length; j++){    

//           console.log("20200514 resp_item_AR[i].keyString: "+resp_item_AR[i].keyString);
//           console.log("20200710a in zt_server_object resp_item_AR[i].linkIdx_AR[j]: "+resp_item_AR[i].linkIdx_AR[j]);
//           console.log("20200521 this.svr1.ZtObjectLink_AR.length: "+this.svr1.ZtObjectLink_AR.length);
//           console.log("20200710b this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].toString(): "+this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].toString());
       var target_tmpl_def_idx = this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].getTargetTemplateDefIdx(this.svr1.time.now());
//       console.log("20200514 target_tmpl_def_idx: "+target_tmpl_def_idx);
//       //console.log("20200223 this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].objectKey: "+this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].objectKey);
//console.log("20191115: "+id_num+"-"+ parent_id_num+"-"+ this.dbzti_id+"-"+ this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkToKind_ztic+"-"+ this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkToKind_code+"-"+ this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkToCode_ztic+"-"+ this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkToCode+"-"+ this.svr1.ZtObject_AR[target_tmpl_def_idx].objZTIC+"-"+ this.svr1.ZtObject_AR[target_tmpl_def_idx].objCode);

           var resp_item = new ZtObjectResponseItem(id_num, parent_id_num, this.svr1, this.dbzti_id, this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkToKind_ztic, this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkToKind_code, this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkToCode_ztic, this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkToCode,  this.svr1.ZtObject_AR[target_tmpl_def_idx].objZTIC, this.svr1.ZtObject_AR[target_tmpl_def_idx].objCode, child_response_type);  // took out querySetMember_memberIDx, left in respons type param 20200526
           resp_item.levelsDown = levels_down;  // 20200706
           if(levels_down <= maxLevelsDownx){     // 20230407
             resp_item_AR.push(resp_item);
           }  // endif levels_down <= maxLevelsDownx
           id_num++;   // 20200707
// begin 20200520 to include templates of objects that are linked to
//        console.log("20200523a in zt_server_object this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkType_ztic-base_ztic-code: "+this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkType_ztic+" - "+base_ztic+" - "+ this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkType_code);
          if(this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkType_ztic == base_ztic && this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkType_code == "5"){  //link tech profile to link type

             var link_type_ztic = this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkToCode_ztic;
             var link_type_code = this.svr1.ZtObjectLink_AR[resp_item_AR[i].linkIdx_AR[j]].linkToCode;


            var templ_idx_of_linkable_obj = this.getTemplateIdxOfLinkableObject(link_type_ztic, link_type_code, timestampx);
//            console.log(" ");
//            console.log("20200805 in zt_server_object.js templ_idx_of_linkable_obj: "+templ_idx_of_linkable_obj);
//            console.log("   link_type_ztic - link_type_code: "+link_type_ztic+" - "+link_type_code);
//            console.log(" ");

             var linkable_obj_templ_resp_item = new ZtObjectResponseItem(id_num, parent_id_num, this.svr1, this.dbzti_id, base_ztic, "2", this.svr1.ZtObject_AR[templ_idx_of_linkable_obj].objZTIC, this.svr1.ZtObject_AR[templ_idx_of_linkable_obj].objCode, base_ztic, "2", "2");  // took out querySetMember_memberIDx, left in query resp type param 20200526
                linkable_obj_templ_resp_item.linkableObjectLinkType_ztic = link_type_ztic;
                linkable_obj_templ_resp_item.linkableObjectLinkType_code = link_type_code;
                linkable_obj_templ_resp_item.levelsDown = levels_down;   // 20200707
               var linkableObjTemplKeyStr = this.dbzti_id+"_"+base_ztic+"_2_"+this.svr1.ZtObject_AR[templ_idx_of_linkable_obj].objZTIC+"_"+this.svr1.ZtObject_AR[templ_idx_of_linkable_obj].objCode;  //20200527
               
               if(!linkableTempl_HM.has(linkableObjTemplKeyStr)){      //     20200527  suppress multiple of the same template
                  if(levels_down <= maxLevelsDownx){     // 20230407
                     resp_item_AR.push(linkable_obj_templ_resp_item);
                  } // endif levels_down <= maxLevelsDownx  // 20230407    
                  id_num++;    // 20200707
                  linkableTempl_HM.set(linkableObjTemplKeyStr,"dummy_val");    //     20200527 
               }  // endif linkableTempl_HM.has(linkableObjTemplKeyStr))
          }  // endif link type is for linking tech profile to link type
// end 20200520 to include templates of objects that are linked to

        } // endfor loop through links

        //resp_item_AR[i].complete = true; (del) 20200707
        if(resp_item_AR[i].linkIdx_AR.length > 0){links_found = true;}
      } // endif complete
  
    }  //endfor loop through resp_item_AR


  //if(!links_found){done = true;}   // (del) 20230407
  if(!links_found || levels_down > maxLevelsDownx){done = true;}   // 20230407
  cntr++;
  if(cntr > 2000){done = true;}  // 20201204
  //if(cntr > 5000){done = true;}  // 20201024
  //if(cntr > 10){done = true;}  // (del) 20201024
  //if(cntr > 5){done = true;}  //20200125
 } //end while

//console.log("20241219b time after while:   "+timex.now());
//console.log("20241219c time_get_oe_values: " +time_get_oe_values);
//console.log("20241219d time_get_links:     " +time_get_links);
//console.log("20241219e time_get_type_vals: " +time_get_type_vals);
//console.log(" ");

//console.log("20241219f get_all_values_loop_cntr: "+get_all_values_loop_cntr);
//console.log(" ");
// console.log("20200126 resp_item_AR.length: "+ resp_item_AR.length);
 return resp_item_AR;

}  // end of getAllValuesForTemplateDef_single()




setTemplate_AR(templateZTICx, templateCodex, statusx, timestampx, seqNumx) {   // 20191112

if(templateZTICx == ""){templateZTICx = "0000";}
if(templateCodex == ""){templateCodex = "0000";}

if(templateZTICx != "" && templateCodex != "") {
var paramStr = templateZTICx.toString().trim()+"_"+templateCodex.toString().trim()+statusx.toString().trim()+"_"+timestampx.toString().trim()+"_"+seqNumx.toString().trim();


var templateFoundInAR = false;
          for (var i = 0; i < this.template_AR.length; i++){
       var template_ARstr = this.template_AR[i].templ_ztic.toString().trim()+"_"+this.template_AR[i].templ_code.toString().trim()+"_"+this.template_AR[i].status.toString().trim()+"_"+this.template_AR[i].timestamp.toString().trim()+"_"+this.template_AR[i].seqNumx;
             if(template_ARstr == paramStr){templateFoundInAR = true;}
          } // endfor loop through template_AR

if(!templateFoundInAR){
  var templNew = new (require('./zt_server_object_template.js'))(templateZTICx, templateCodex, statusx, timestampx, seqNumx);
   this.template_AR.push(templNew);
 }// endif



} // endif(templateZTICx != "" && templateCodex != "")


} // endof setTemplate_AR()


// 20200523 start
getTemplateIdxOfLinkableObject(link_type_zticx, link_type_codex, timestampx){
var returnTemplateIdx;

var base_dsi_str = "131131/21";
var base_ztic_str = this.svr1.getCodeForNS(this.dbzti_id, base_dsi_str);

//1.  find index of link target (link type)
    var linkTypeKeyStr = this.dbzti_id+"_"+base_ztic_str+"_10_"+link_type_zticx+"_"+link_type_codex;
    //var link_type_obj_idx =  this.svr1.ZtObject_idx_HM.get(linkTypeKeyStr);
    //var link_type_obj     = 

//2.  find index of link target type by finding type value of link type
    // var link_target_type_idx = link_type_obj.getTypeValueIdxForTemplateDef(template_def_idx, timestamp); 


//3.  find target template for link target type

   // returnTemplateIdx = this.svr1.ZtObjectLink_AR[???resp_item_AR[i??].linkIdx_AR[j??]???].getTargetTemplateDefIdx(this.svr1.time.now());



// 20200524-- begin insert from zt_server_object_link.js --- getTargetTemplateDefIdx(timestampx 
//1. Find object index of link type
//2. Use link type to find link target type
//3. Use link target type and linkToKind_ztic and linkToKind_code to find template definition
//4. Return index of of template definition

var template_object_idx = 99999999;
var test = 999999999;


var link_type_obj = this.svr1.ZtObject_AR[this.svr1.ZtObject_idx_HM.get(linkTypeKeyStr)];


///// //2. Use link type to find link target type
var linkTargetTypeIdx;

/////console.log("20200524 link_type_obj.typeValueIdx_AR.length: "+link_type_obj.typeValueIdx_AR.length); 
/////console.log("link_type_obj.keyString: "+link_type_obj.keyString);    
/////console.log("this.svr1.ZtObject_idx_HM.get(linkTypeKeyStr): "+this.svr1.ZtObject_idx_HM.get(linkTypeKeyStr));
for (var i = 0; i < link_type_obj.typeValueIdx_AR.length; i++){  
/////   console.log("20200120 link_type_obj.typeValueIdx_AR[i].timestamp-timestampx: "+this.svr1.ZtObjecttypeValueIdx_AR[link_type_obj.typeValueIdx_AR[i]].timestamp+"-"+timestampx); 
  if(this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].timestamp <= timestampx){ 
/////    console.log("20200120 link_type_obj.typeValueIdx_AR[i].typeDef_ztic-link_type_obj.typeValueIdx_AR[i].typeDef_code: "+this.svr1.ZtObjecttypeValueIdx_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_ztic+"-"+this.svr1.ZtObjecttypeValueIdx_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_code);
   if(this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_ztic == base_ztic_str && this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_code == "2"){
/////        //test = 777;
     linkTargetTypeIdx = link_type_obj.getTypeValueIdxForTypeDef(this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_ztic, this.svr1.ZtObjectTypeValue_AR[link_type_obj.typeValueIdx_AR[i]].typeDef_code, timestampx);
    } // endif
  } // endif
} // endfor loop through typeValueIdx_AR


///// //3. Use link target type and linkToKind_ztic and linkToKind_code to find template definition
//console.log("20230710a linkTargetTypeIdx: "+linkTargetTypeIdx); 
var link_target_type_obj = this.svr1.ZtObject_AR[linkTargetTypeIdx];
var templ_cntr = 0;
//console.log("20230710b link_target_type_obj.linkIdx_AR.length in zt_server_object.js: "+link_target_type_obj.linkIdx_AR.length);
for (var i = 0; i < link_target_type_obj.linkIdx_AR.length; i++){
  // console.log("20230710c in zt_server_object.js this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_ztic: "+this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_ztic);
  // console.log("20230710d this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_code: "+this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_code);
   if(this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_ztic==base_ztic_str &&   
      this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkType_code=="6"){   // link from link target type to template
          var templKeyStr = this.dbzti_id+"_"+ this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkToKind_ztic +"_"+this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkToKind_code+"_"+ this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkToCode_ztic +"_"+ this.svr1.ZtObjectLink_AR[link_target_type_obj.linkIdx_AR[i]].linkToCode;
          //console.log("20200122 templKeyStr in zt_server_object_link: "+templKeyStr);
          template_object_idx =  this.svr1.ZtObject_idx_HM.get(templKeyStr);
          //console.log("20200123 template_object_idx: "+template_object_idx);
          var template_obj     =  this.svr1.ZtObject_AR[template_object_idx];
/////          // use type def of object kind for object template
          var obj_kind_for_templ_idx = template_obj.getTypeValueIdxForTypeDef(base_ztic_str, "3", timestampx);
///// //          console.log("20200122f obj_kind_for_templ_idx: "+obj_kind_for_templ_idx);
          var obj_kind_for_templ_obj  = this.svr1.ZtObject_AR[obj_kind_for_templ_idx];

/////          //console.log("20200122g obj_kind_for_templ_obj.objZTIC: "+obj_kind_for_templ_obj.objZTIC);
/////          //console.log("20200122h obj_kind_for_templ_obj.objCode: "+obj_kind_for_templ_obj.objCode);
/////          //console.log("20200122i this.objectKey:       "+this.objectKey);
/////          //console.log("20200122j this.linkType_ztic:   "+this.linkType_ztic);
/////          //console.log("20200122k this.linkType_code:   "+this.linkType_code);
/////          //console.log("20200122l this.linkToKind_ztic: "+this.linkToKind_ztic);
/////          //console.log("20200122m this.linkToKind_code: "+this.linkToKind_code);  
/////          //console.log("20200122n this.linkToCode_ztic: "+this.linkToCode_ztic);
/////          //console.log("20200122o this.linkToCode:      "+this.linkToCode);


           templ_cntr++;

   } //endif


} // endfor loop through link_target_type_obj links

//console.log("20200122 templ_cntr: "+templ_cntr);
if(templ_cntr != 1){console.log("Error: Must have exactly 1 template per object kind for link targets, template count: "+templ_cntr);
                    console.log("this.kindZTIC: "+this.kindZTIC+" this.kindCode: "+this.kindCode +  " this.objZTIC: "+ this.objZTIC+ " this.objCode: "+this.objCode);}
//console.log("20200122 after templ_cntr: "+templ_cntr);
if(test == 99999999){console.log("Error: No Target Template Def Index found in zt_server_object_link.getTargetTemplateDefIdx ");}


/////console.log("20200223c template_object_idx: "+template_object_idx);
/////console.log("test: "+test);
/////return template_object_idx;
///// //return test;



// 20200524 -- end of insert from zt_server_object_link.js
returnTemplateIdx = template_object_idx;

return returnTemplateIdx;

} //  // 20200523 end getTemplateIdxOfLinkableObject



statusExcluded(statusExclusion_ARx, statusx){   // 20210722

var status_excluded = false;

for (var i = 0; i < statusExclusion_ARx.length; i++){
    if(statusExclusion_ARx[i] == statusx){
      status_excluded = true;
    }  // endif

}  // endfor

return status_excluded;

} //end of statusExcluded() 20210722


// start 20231015
getAllValuesForTemplateDefUserExitFunction(combined_resp_item_AR, msgx, timestampx){


// start 20231016
//     // call function to return the date string for any type values that have a type def that refers to a date object kind
    var additional_resp_item_AR = [];
    var dateStr = "";
    var dateString_AR = [];  
    const time_dsi_str = "zinfinitree.com/time";
    const time_ztic_str = this.svr1.getCodeForNS(this.dbzti_id, time_dsi_str);
    const base_dsi_str = "131131/21";
    const base_ztic_str = this.svr1.getCodeForNS(this.dbzti_id, base_dsi_str);
    const get_date_string_function_keyStr = this.dbzti_id+"_"+base_ztic_str+"_36_"+time_ztic_str+"_1"; 
    const get_date_string_function_idx    = this.svr1.ZtObject_idx_HM.get(get_date_string_function_keyStr); 
    const get_date_string_function_obj    = this.svr1.ZtObject_AR[get_date_string_function_idx];
    var getDateStringFunc = new (require('./zt_server_function'))( this.svr1, msgx, get_date_string_function_obj.objZTIC, get_date_string_function_obj.objCode, timestampx );
    for(var i = 0; i < combined_resp_item_AR.length; i++){ 
       dateString_AR = this.getDateString_AR(combined_resp_item_AR[i], timestampx);
       for(var k = 0; k < dateString_AR.length; k++){  
          getDateStringFunc.setParameterValue("zinfinitree.com/time", "1", dateString_AR[k].dateObject_idx); 
          getDateStringFunc.execute();
          for(var j = 0; j < getDateStringFunc.parameter_AR.length; j++){
             if(getDateStringFunc.parameter_AR[j].namespace == "zinfinitree.com/time" && getDateStringFunc.parameter_AR[j].code == "2"){
                dateString_AR[k].dateString = getDateStringFunc.parameter_AR[j].value;
                //console.log("20231020 dateString_AR[k].dateString in zt_server_object.getAllValuesForTemplateDefUserExitFunction: "+ dateString_AR[k].dateString);
             } // endif parameter code == 2
        } //endfor  loop through .. parameter_AR
      } // endfor loop at dateString_AR 
    } // endfor loop through combined_resp_item_AR     

// end 20231016

return additional_resp_item_AR;
} // end of getAllValuesForTemplateDefUserExitFunction(combined_resp_item_AR)
// end of 20231015


// start 20231019
getDateString_AR(resp_itemx, timestampx){
  var returnDateString_AR = [];
  const base_dsi_str = "131131/21";
  const base_ztic_str = this.svr1.getCodeForNS(this.dbzti_id, base_dsi_str);
  const time_dsi_str = "zinfinitree.com/time";
  const time_ztic_str = this.svr1.getCodeForNS(this.dbzti_id, time_dsi_str);
     
  for(var j = 0; j < resp_itemx.typeValueIdx_AR.length; j++){
    var typeDefObjKeyStr = this.dbzti_id+"_"+base_ztic_str+"_9_"+resp_itemx.typeValueIdx_AR[j].typeDef_ztic+"_"+resp_itemx.typeValueIdx_AR[j].typeDef_code;
    var type_def_obj_idx = this.svr1.ZtObject_idx_HM.get(typeDefObjKeyStr);
    var type_def_obj     = this.svr1.ZtObject_AR[type_def_obj_idx];
    var obj_kind_for_type_def_idx = type_def_obj.getTypeValueIdxForTypeDef(base_ztic_str, "4", timestampx);
    var obj_kind_obj    = this.svr1.ZtObject_AR[obj_kind_for_type_def_idx];
    if(obj_kind_obj.objZTIC == time_ztic_str && obj_kind_obj.objCode == "2"){   // if object kind is gregorian date
       var dateStringRec = new DateStringRec();
       var dateKeyStr = this.dbzti_id+"_"+time_ztic_str+"_2_"+resp_itemx.typeValueIdx_AR[j].typeValue_ztic+"_"+resp_itemx.typeValueIdx_AR[j].typeValue_code;
       dateStringRec.dateObject_idx =   this.svr1.ZtObject_idx_HM.get(dateKeyStr);
       dateStringRec.typeDef_ztic = resp_itemx.typeValueIdx_AR[j].typeDef_ztic;
       dateStringRec.typeDef_code = resp_itemx.typeValueIdx_AR[j].typeDef_code;
       returnDateString_AR.push(dateStringRec);
    }  // endif


  }  // endfor typeValueIdx_AR

  return returnDateString_AR;
}  // end of getDateString_AR(resp_item, timestampx)
// end 20231019



} // end of class ZtObject


// start 20231020
function DateStringRec() {
  this.typeDef_ztic  = "";
  this.typeDef_code  = "";
  this.dateObject_idx = "";
  this.dateString     = "";

} // end of function DateStringRec
// end 20231020



//function ZtObjectResponseItem(id_in, parent_id_in, svr1x, dbzti_idx, kindZTICx, kindCodex, objZTICx, objCodex, templateZTICx, templateCodex, responseTypex, queryRespSetMember_memberIDx ) {  // (added and del 20200526)
function ZtObjectResponseItem(id_in, parent_id_in, svr1x, dbzti_idx, kindZTICx, kindCodex, objZTICx, objCodex, templateZTICx, templateCodex, responseTypex) {
   this.id         = id_in;
   this.parent_id  = parent_id_in;
   this.svr1           = svr1x;
   //this.msg          = msgx;
   this.kindZTIC       = kindZTICx.toString().trim();
   this.kindCode       = kindCodex.toString().trim();
   this.objZTIC        = objZTICx.toString().trim();
   this.objCode        = objCodex.toString().trim();
   this.templateZTIC   = templateZTICx;
   this.templateCode   = templateCodex;
   this.responseType   = responseTypex;  // 1=standard, 2=template of linkable object
   //this.queryRespSetMember_memberID = queryRespSetMember_memberIDx;  (added and deleted 20200526)
   this.linkableObjectLinkType_ztic = "";
   this.linkableObjectLinkType_code = "";
   this.levelsDown     = 0;     // 20200706 hierarchy levels down, top parent is zero
   this.objElemIdx_AR = [];
   this.linkIdx_AR       = [];
   this.typeValueIdx_AR  = [];
   this.baseStr       = "131131/21";
   this.keyString    = dbzti_idx.toString().trim()+"_"+kindZTICx.toString().trim()+"_"+kindCodex.toString().trim()+"_"+objZTICx.toString().trim()+"_"+objCodex.toString().trim();
   this.templKeyStr  = dbzti_idx.toString().trim()+"_"+this.svr1.getCodeForNS(dbzti_idx, this.baseStr)+"_2_"+templateZTICx.toString().trim()+"_"+templateCodex.toString().trim();
   this.complete   = false;
 } // end of function ZtObjectResponseItem

function ZtObjectResponseLink( ) {
  
 } // end of function ZtObjectResponseLink

 function HtmlObjectListRec() {
  this.ObjElem  = "";
  this.typeVal  = "";
  this.link  = "";

} // end of function HtmlObjectListRec


module.exports = ZtObject;
