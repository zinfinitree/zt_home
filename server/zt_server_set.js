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


class ZtSet {  //copied from zt_server_set.js 20210624

   
    constructor(svr1x, setObjIdx, msgx) {
    this.svr1 = svr1x;
    this.objIdx  = setObjIdx;
    this.msg     = msgx;
    this.setObj =  svr1x.ZtObject_AR[setObjIdx];
    this.member_AR = [];

 
 
  }



  isMember(obj_idx, timestamp) {

   //console.log("running ZtSet.isMember: "+obj_idx+" - "+timestamp);
   var returnx = false;
   this.getMember_AR(timestamp);

   //console.log("this.member_AR.length: "+this.member_AR.length);
   for (var i = 0; i <  this.member_AR.length; i++) {
    ////  console.log("this.member_AR[i] - obj_idx: "+this.member_AR[i]+" - "+obj_idx);
      if (this.member_AR[i] == obj_idx){returnx = true;} 
    
   } // endfor
    
  //console.log("zt_server_set.isMember: "+returnx);
  return returnx;


}  // end of getIsMember




 getMember_AR_deprecated_20210205(timeStamp) {
// getMember_AR(timeStamp) {



//console.log("running ZtSet.getMember_AR: "+this.svr1);

  

// get members for each link type and push to this.member_AR, process all OR conditions first, the AND conditions and then NOT conditions



  var base_ztic = this.svr1.getCodeForNS(this.setObj.dbzti_id, "131131/21");
  //console.log("20200320 this.setObj.linkIdx_AR.length: "+this.setObj.linkIdx_AR.length);
  for (var i = 0; i <  this.setObj.linkIdx_AR.length; i++) { 
   // console.log("20200320 this.setObj.linkIdx_AR[i]: "+this.setObj.linkIdx_AR[i]);
    var link_obj = this.svr1.ZtObjectLink_AR[this.setObj.linkIdx_AR[i]];
   // console.log("link_obj.linkTypeZTIC - link_obj.linkTypeCode: "+ link_obj.linkType_ztic+  " - " + link_obj.linkType_code);

// start 20201016
    if(link_obj.linkType_ztic == base_ztic && link_obj.linkType_code == "12"){  // link to object kind to include all objects of that kind   
      var linkToObjStr = this.setObj.dbzti_id+"_"+link_obj.linkToKind_ztic+"_"+link_obj.linkToKind_code+"_"+link_obj.linkToCode_ztic+"_"+link_obj.linkToCode;
      var obj_kind_idx = this.svr1.ZtObject_idx_HM.get(linkToObjStr);
      for (var j = 0; j <  this.svr1.ZtObject_AR.length; j++) {
          if(this.svr1.ZtObject_AR[j].dbzti_id == this.svr1.ZtObject_AR[obj_kind_idx].dbzti_id && this.svr1.ZtObject_AR[j].kindZTIC == this.svr1.ZtObject_AR[obj_kind_idx].objZTIC && this.svr1.ZtObject_AR[j].kindCode == this.svr1.ZtObject_AR[obj_kind_idx].objCode){

             this.member_AR.push(j);

           }  // endif

      } // endfor
      //var set_member_idx = this.svr1.ZtObject_idx_HM.get(linkToObjStr);
 //     this.member_AR.push(set_member_idx);
    } // endif for links to individual objects

// end 20201016

    if(link_obj.linkType_ztic == base_ztic && link_obj.linkType_code == "13"){  // link to individual objects.   
      var linkToObjStr = this.setObj.dbzti_id+"_"+link_obj.linkToKind_ztic+"_"+link_obj.linkToKind_code+"_"+link_obj.linkToCode_ztic+"_"+link_obj.linkToCode;
      var set_member_idx = this.svr1.ZtObject_idx_HM.get(linkToObjStr);
      this.member_AR.push(set_member_idx);
    } // endif for links to individual objects



  } // endfor


 
  return this.member_AR;

}  // end of getMember_AR_deprecated_20210205








getLocalMembersForSet(setObjx, timestampx) {

  require("dotenv").config();   // 20250208


var returnMember_idx_AR = [];

//console.log(" ");
//console.log("%%%f running getLocalMembersForSet ");

  

  var base_ztic = this.svr1.getCodeForNS(setObjx.dbzti_id, "131131/21");
  //console.log("+++ 20210217 setObjx.linkIdx_AR.length: "+setObjx.linkIdx_AR.length);
  for (var i = 0; i <  setObjx.linkIdx_AR.length; i++) { 
   // console.log("20200320 setObjx.linkIdx_AR[i]: "+setObjx.linkIdx_AR[i]);
    var link_obj = this.svr1.ZtObjectLink_AR[setObjx.linkIdx_AR[i]];
   // console.log("link_obj.linkTypeZTIC - link_obj.linkTypeCode: "+ link_obj.linkType_ztic+  " - " + link_obj.linkType_code);


    if(link_obj.linkType_ztic == base_ztic && link_obj.linkType_code == "12"){  // link to object kind to include all objects of that kind   
      var linkToObjStr = setObjx.dbzti_id+"_"+link_obj.linkToKind_ztic+"_"+link_obj.linkToKind_code+"_"+link_obj.linkToCode_ztic+"_"+link_obj.linkToCode;
      var obj_kind_idx = this.svr1.ZtObject_idx_HM.get(linkToObjStr);
      for (var j = 0; j <  this.svr1.ZtObject_AR.length; j++) {
          if(this.svr1.ZtObject_AR[j].dbzti_id == this.svr1.ZtObject_AR[obj_kind_idx].dbzti_id && this.svr1.ZtObject_AR[j].kindZTIC == this.svr1.ZtObject_AR[obj_kind_idx].objZTIC && this.svr1.ZtObject_AR[j].kindCode == this.svr1.ZtObject_AR[obj_kind_idx].objCode){

             returnMember_idx_AR.push(j);

           }  // endif

      } // endfor
    
    } // endif for links to individual objects


    if(link_obj.linkType_ztic == base_ztic && link_obj.linkType_code == "13"){  // link to individual objects.   
      var linkToObjStr = setObjx.dbzti_id+"_"+link_obj.linkToKind_ztic+"_"+link_obj.linkToKind_code+"_"+link_obj.linkToCode_ztic+"_"+link_obj.linkToCode;
      var set_member_idx = this.svr1.ZtObject_idx_HM.get(linkToObjStr);
      returnMember_idx_AR.push(set_member_idx);
    } // endif for links to individual objects


    
    if(link_obj.linkType_ztic == base_ztic && link_obj.linkType_code == "14"){  // //link to Type Value Based Object Set, to include all objects with corresponding type values as members  
      //console.log("20250208c link type 14"); 
      var typeValueBasedObjectSetObjStr = setObjx.dbzti_id+"_"+link_obj.linkToKind_ztic+"_"+link_obj.linkToKind_code+"_"+link_obj.linkToCode_ztic+"_"+link_obj.linkToCode;
      var type_value_based_object_set_idx = this.svr1.ZtObject_idx_HM.get(typeValueBasedObjectSetObjStr);
      var type_value_based_object_set = this.svr1.ZtObject_AR[type_value_based_object_set_idx]; 

         const path_name = process.env.ZT_SERVER_HOME_DIR + "/ds2b00002/ds2b00002_server_type_value_based_object_set";
        //var TVBOS_obj = new (require('./ds2b00002_server_type_value_based_object_set'))(this.svr1, type_value_based_object_set_idx, this.msg);  //  (del) 20250208   
        var TVBOS_obj = new (require(path_name))(this.svr1, type_value_based_object_set_idx, this.msg);  //  20250208
        var TVBOS_member_idx_AR = TVBOS_obj.getTVBOSoutputSet();
        //console.log("20250208d TVBOS_member_idx_AR.length: "+TVBOS_member_idx_AR.length);
      returnMember_idx_AR = returnMember_idx_AR.concat(TVBOS_member_idx_AR);
      //returnMember_idx_AR = TVBOS_member_idx_AR;
  //   class DsTypeValueBasedObjectSet {
  //     constructor(svr1x, TVBOS_Idxx, msgx) 


    } // endif //link to Type Value Based Object Set, to include all objects with corresponding type values as members




    if(link_obj.linkType_ztic == base_ztic && link_obj.linkType_code == "30"){  // link to generic objects to include object referred to by generic object as member   
      var linkToObjStr = setObjx.dbzti_id+"_"+link_obj.linkToKind_ztic+"_"+link_obj.linkToKind_code+"_"+link_obj.linkToCode_ztic+"_"+link_obj.linkToCode;
      var generic_obj_set_member_idx = this.svr1.ZtObject_idx_HM.get(linkToObjStr);
      var generic_object = this.svr1.ZtObject_AR[generic_obj_set_member_idx];
      let obj_kind_ztic_locl = "";
      let obj_kind_ztic_str_locl = "";
      let obj_kind_code_locl = "";
      let obj_ztic_str_locl = "";
      let obj_ztic_locl = "";
      let obj_code_locl = "";
      var set_member_idx;
      for (var j = 0; j <  generic_object.objElemIdx_AR.length; j++) {
        //console.log("this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_ztic - OE_code: "+this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_ztic+" - "+this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_code);
        //console.log("this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].value: "+this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].value);
        if(this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_code == '220'){
           obj_kind_ztic_str_locl = this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].value; 
           obj_kind_ztic_locl = this.svr1.getCodeForNS(this.setObj.dbzti_id, obj_kind_ztic_str_locl)               
        }  // endif 

        if(this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_code == '221'){
          obj_kind_code_locl = this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].value;                
        }  // endif

        if(this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_code == '222'){
          obj_ztic_str_locl = this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].value;  
          obj_ztic_locl = this.svr1.getCodeForNS(this.setObj.dbzti_id, obj_ztic_str_locl)                
        }  // endif

        if(this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].OE_code == '223'){
           obj_code_locl = this.svr1.ZtObjectElement_AR[generic_object.objElemIdx_AR[j]].value;                
        }  // endif
      
      }  // endfor loop through generic_object.objElemIdx_AR

      const setMemberKeyStr = setObjx.dbzti_id+"_"+obj_kind_ztic_locl+"_"+obj_kind_code_locl+"_"+obj_ztic_locl+"_"+obj_code_locl;

      //console.log("20231205a setMemberKeyStr: "+setMemberKeyStr);

      if(this.svr1.ZtObject_idx_HM.has(setMemberKeyStr)){

          set_member_idx = this.svr1.ZtObject_idx_HM.get(setMemberKeyStr);
          returnMember_idx_AR.push(set_member_idx);
      }


     /// returnMember_idx_AR.push(generic_obj_set_member_idx);
    } // endif for links to generic objects


    if(link_obj.linkType_ztic == base_ztic && link_obj.linkType_code == "23"){  //link to Namespace where all objects that have an Object Kind with the DSNS linked to are included as member   
      var namespaceObjStr = setObjx.dbzti_id+"_"+link_obj.linkToKind_ztic+"_"+link_obj.linkToKind_code+"_"+link_obj.linkToCode_ztic+"_"+link_obj.linkToCode;
      var namespace_idx = this.svr1.ZtObject_idx_HM.get(namespaceObjStr);
      var namespaceObj = this.svr1.ZtObject_AR[namespace_idx];
      //var namespaceLinkedTo = namespaceObj.getOEvalue(OE_zticx, OE_codex, EK_zticx, EK_codex, timestampx){
      var namespaceLinkedTo = namespaceObj.getOEvalue(base_ztic, "215", "", "", timestampx);  // get value of object element for namespace
      var linked_ztic = this.svr1.getCodeForNS(setObjx.dbzti_id, namespaceLinkedTo);
      for (var j = 0; j <  this.svr1.ZtObject_AR.length; j++) {
        //console.log("### 20210804 this.svr1.ZtObject_AR[j].kindZTIC - this.svr1.ZtObject_AR[j].kindCode: "+this.svr1.ZtObject_AR[j].kindZTIC+" - "+this.svr1.ZtObject_AR[j].kindCode);
        if(this.svr1.ZtObject_AR[j].dbzti_id == this.svr1.ZtObject_AR[namespace_idx].dbzti_id && this.svr1.ZtObject_AR[j].kindZTIC == linked_ztic ){
        //  if(!(this.svr1.ZtObject_AR[j].kindZTIC == base_ztic && this.svr1.ZtObject_AR[j].kindCode == 13)){  // exclude members that are sets 20210804
            returnMember_idx_AR.push(j);
        //  } // endif member is not a set  20210804
         }  // endif

      } // endfor
  
    } // endif link to Namespace where all objects that have an Object Kind with the DSNS linked to are included as member

   //// console.log("%%%e 20210217 link_obj.linkType_ztic - base_ztic - link_obj.linkType_code: "+ link_obj.linkType_ztic+" - "+base_ztic+" - "+link_obj.linkType_code);
    if(link_obj.linkType_ztic == base_ztic && link_obj.linkType_code == "24"){  //link to Namespace where all objects that have an Object DSNS linked to are included as members  temp (del) 20210216
      var namespaceObjStr = setObjx.dbzti_id+"_"+link_obj.linkToKind_ztic+"_"+link_obj.linkToKind_code+"_"+link_obj.linkToCode_ztic+"_"+link_obj.linkToCode;
      var namespace_idx = this.svr1.ZtObject_idx_HM.get(namespaceObjStr);
     // console.log("+++ namespaceObjStr: "+namespaceObjStr);
     // console.log("+++ namespace_idx: "+namespace_idx);
      var namespaceObj = this.svr1.ZtObject_AR[namespace_idx];
      //var namespaceLinkedTo = namespaceObj.getOEvalue(OE_zticx, OE_codex, EK_zticx, EK_codex, timestampx){
      //console.log("+++ 20210216 base_ztic: "+base_ztic);
      var namespaceLinkedTo = namespaceObj.getOEvalue(base_ztic, "215", "", "", timestampx);  // get value of object element for namespace
      var linked_ztic = this.svr1.getCodeForNS(setObjx.dbzti_id, namespaceLinkedTo);
      for (var j = 0; j <  this.svr1.ZtObject_AR.length; j++) {
        if(this.svr1.ZtObject_AR[j].dbzti_id == this.svr1.ZtObject_AR[namespace_idx].dbzti_id && this.svr1.ZtObject_AR[j].objZTIC == linked_ztic ){
           returnMember_idx_AR.push(j);
         }  // endif

      } // endfor

    } // endif link to Namespace where all objects that have an Object DSNS linked to are included as members temp (del) 20210216


  } // endfor
 
  return returnMember_idx_AR;


} // end of   getLocalMembersForSet(setObjx, timeStampx) {



getLocalMemberHashMapForSet(setObjx, timestampx){
   var HashMap = require('hashmap');
   var return_HM = new HashMap();
   var local_member_AR = [];
   local_member_AR = this.getLocalMembersForSet(setObjx, timestampx);
   for (var i = 0; i <  local_member_AR.length; i++) {
  
     if(!return_HM.has(local_member_AR[i])){return_HM.set(local_member_AR[i],local_member_AR[i]); }
         
   }  // endfor

return return_HM;
}  // end of getLocalMemberHashMapForSet



getMember_AR(timeStampx) {   // renamed 20210205
//getMemberComplete_AR(timeStampx) {

//console.log("20250208b running getMember_AR for this.setObj.dbzti_id - objZTIC - objCode: "+this.setObj.dbzti_id+" - "+this.setObj.objZTIC+" - "+this.setObj.objCode);
  // 1. build this.linkedSet_AR based on links from this set to other sets 
  // 2. get the local members of each set (members that are not derived from other sets)   
  // 3. start with the set the most levels down and work up allowing the members to propagate up, find the members of the sets higher up using getIntersectionOfSetMembers_AR and getUnionOfSetMembers_AR
  // 4. return a result when you have the members of this set


// 1.


 
  var done = false;
  var loop_cntr = 0;
  var linkedSet_AR = [];                   // 20210131

  var top_set = new LinkedSetRec(this.setObj, 0);
      top_set.levelsDown = 0;
  linkedSet_AR.push(top_set);

  var currentLevel = 0;
  var childFound = false;

  var base_ztic = this.svr1.getCodeForNS(this.setObj.dbzti_id, "131131/21");
  
  while(!done){
    //console.log("%%%c 20230406 linkedSet_AR.length in ds2b00002_server_set.js: "+linkedSet_AR.length);
    for (var i = 0; i <  linkedSet_AR.length; i++) {
       if( linkedSet_AR[i].levelsDown == currentLevel){

          for (var j = 0; j <  linkedSet_AR[i].setObj.linkIdx_AR.length; j++){ 
            var link_obj = this.svr1.ZtObjectLink_AR[linkedSet_AR[i].setObj.linkIdx_AR[j]];  
            //console.log("getMemberComplete_AR--link_obj.linkTypeZTIC - link_obj.linkTypeCode: "+ link_obj.linkType_ztic+  " - " + link_obj.linkType_code);
            if(link_obj.linkType_ztic == base_ztic && link_obj.linkType_code.toString().trim() == "18" ){   // set with OR condition  (UNION of Sets)
               var linkToObjStr = this.setObj.dbzti_id+"_"+link_obj.linkToKind_ztic+"_"+link_obj.linkToKind_code+"_"+link_obj.linkToCode_ztic+"_"+link_obj.linkToCode;
               var new_set_obj_idx = this.svr1.ZtObject_idx_HM.get(linkToObjStr);
               var new_set_obj = svr1x.ZtObject_AR[new_set_obj_idx];
               var new_set = new LinkedSetRec(new_set_obj, i);
               new_set.levelsDown = currentLevel + 1;
               new_set.parentSetCombineType = "1";  // OR condition (UNION of Sets)
               var child_idx = this.linkedSet_AR.push(new_set) -1;
               linkedSet_AR[i].childSet_idx_AR.push(child_idx);
            }
            if(link_obj.linkType_ztic == base_ztic && link_obj.linkType_code.toString().trim() == "19" ){   // set with AND condition (INTERSECTION of Sets)
               var linkToObjStr = this.setObj.dbzti_id+"_"+link_obj.linkToKind_ztic+"_"+link_obj.linkToKind_code+"_"+link_obj.linkToCode_ztic+"_"+link_obj.linkToCode;
               var new_set_obj_idx = this.svr1.ZtObject_idx_HM.get(linkToObjStr);
               var new_set_obj = this.svr1.ZtObject_AR[new_set_obj_idx];
               var new_set = new LinkedSetRec(new_set_obj, i);
               new_set.levelsDown = currentLevel + 1;
               new_set.parentSetCombineType = "2";  // AND condition (INTERSECTION of Sets)
               var child_idx = linkedSet_AR.push(new_set) -1;
               linkedSet_AR[i].childSet_idx_AR.push(child_idx);

            }
            childFound = true;

          } // endfor
       } // endif this.linkedSet_AR[i].levelsDown == currentLevel

    } // endfor

    loop_cntr++;
    if(loop_cntr > 99 || childFound == false){done = true;}
  } // endwhile



// get local members for all the sets and max levels

//console.log("%%%g 20230406  linkedSet_AR.length: "+linkedSet_AR.length);
var max_levels_down = 0;

   for (var i = 0; i <  linkedSet_AR.length; i++) {

     if(linkedSet_AR[i].levelsDown > max_levels_down){max_levels_down = linkedSet_AR[i].levelsDown;}

     linkedSet_AR[i].localMember_idx_HM  =  this.getLocalMemberHashMapForSet(linkedSet_AR[i].setObj, timeStampx);

     linkedSet_AR[i].localMember_idx_HM.forEach(function(value, key) {
     //  console.log("%%%d 20210217 "+key + " : " + value);
     });

   }  // endfor




// find members for each linked set
done = false;
currentLevel = max_levels_down;
loop_cntr = 0;
while(!done){

   for (var i = 0; i <  linkedSet_AR.length; i++) {

     if(linkedSet_AR[i].levelsDown == currentLevel && !linkedSet_AR[i].processed){

        this.getMemberHashMapForLinkedSet(linkedSet_AR, linkedSet_AR[i], timeStampx);

     } // endif
   }  // endfor loop through linkedSet_AR

  currentLevel--;

    loop_cntr++;
    if(loop_cntr > 99 || currentLevel < 0){done = true;}

}  // endwhile


// load array  from hashmap
   var return_AR = [];
   linkedSet_AR[0].member_idx_HM.forEach(function(value, key) {
     return_AR.push(value);
    
   });





this.member_AR = return_AR;   // 20210206
return return_AR;


} // end of getMemberComplete_AR ---- renamed to getMember_AR  20210105



getMemberHashMapForLinkedSet(linkedSet_ARx, linkedSetx, timeStampx){

   this.combineSets("1", linkedSetx.member_idx_HM, linkedSetx.localMember_idx_HM);

   for (var i = 0; i <  linkedSetx.childSet_idx_AR.length; i++) {

 linkedSet_ARx[i].member_idx_HM =  this.combineSets(linkedSet_ARx[linkedSetx.childSet_idx_AR[i]].parentSetCombineType, linkedSetx.member_idx_HM, linkedSet_ARx[linkedSetx.childSet_idx_AR[i]].member_idx_HM);

   } // endfor


   ////  linkedSet_ARx[0].member_idx_HM.forEach(function(value, key) {
   ////    console.log("+++ 20210206 "+key + " : " + value);
   ////  });

} // end of getMemberHashMapForLinkedSet(linkedSetx, timeStampx);




combineSets(setCombineType, member_idx_HM1x, member_idx_HM2x) {    // setCombineType 1 = UNION, 2 = INTERSECTION

 var HashMap = require('hashmap');
 var member_idx_HM2 = new HashMap();
 var intersection_member_idx_HM = new HashMap();


 
 if(setCombineType == "1"){   // UNION OF SETS
  
   //for (var i = 0; i <  member_idx_AR2x.length; i++) {

   //  if(!member_idx_HMx.has(member_idx_AR2x[i]){
   //    member_idx_HMx.set(member_idx_AR2x[i], member_idx_AR2x[i]);
   //  } // endif

   // } // endfor

   member_idx_HM2x.forEach(function(value, key) {
     if(!member_idx_HM1x.has(key)){member_idx_HM1x.set(key,value); }
     //console.log(key + " : " + value);
   });


 } // endif    setCombineType == "1"){   // UNION OF SETS




 if(setCombineType == "2"){   // INTERSECTION OF SETS


   member_idx_HM1x.forEach(function(value, key) {
     if(member_idx_HM2x.has(key)){intersection_member_idx_HM.set(key,value); }
     //console.log(key + " : " + value);
   });


 } // endif  setCombineType == "2"){   // INTERSECTION OF SETS


 if(setCombineType == "1"){return member_idx_HM1x;}
 
 if(setCombineType == "2"){return intersection_member_idx_HM;}
 
} // end of combineSets





} // end of class ZtSet

function LinkedSetRec(setObjx, parentSet_idxx) {
   this.setObj   = setObjx;
   this.parentSet_idx = parentSet_idxx;
   this.levelsDown    = 0;
   this.setSource     = 0;        // 1 = local members, 2 = other sets
   this.parentSetCombineType     = "";   // 1 = OR (UNION), 2 = AND (INTERSECTION),  3 = NEGATE
   this.setDesc   = "";
   this.processed = false;
   //this.member_idx_AR           = []; 
   var HashMap = require('hashmap');
   this.childSet_idx_AR = [];
   this.localMember_idx_HM  = new HashMap;
   this.member_idx_HM = new HashMap();
    
 } // end of function LinkedSetRec



module.exports = ZtSet;
