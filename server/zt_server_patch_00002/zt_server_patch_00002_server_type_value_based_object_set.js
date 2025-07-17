


class ZtTypeValueBasedObjectSet {

   // copied from DsSet 20231214
    constructor(svr1x, TVBOS_Idxx, msgx) {

    this.TVBOS_Idx  = TVBOS_Idxx;             // TVBOS = Type Value Based Object Set
    this.TVBOS_Obj =  svr1x.ZtObject_AR[TVBOS_Idxx];
    this.svr1 = svr1x;
    this.msg  = msgx;
    this.inputSet_ztic = "";
    this.inputSet_code = "";
    this.typeValSet_ztic = "";
    this.typeValSet_code = "";
    this.typeDefPath_ztic = "";
    this.typeDefPath_code = "";
    this.input_set_obj_idx = 0;
    this.type_val_set_obj_idx = 0;
    this.type_def_path_obj_idx = 0;
    this.setMemberCandidate_idx_AR = [];
    this.allowedTypeValue_idx_AR = [];
    this.outputSetMember_idx_AR = [];

    this.type_def_idx_for_summarization = 0;
    this.type_def_idx_for_grouping = 0;
    this.type_def_idx_for_grouping2 = 0;
    this.type_def_path_ztic = "";
    this.type_def_path_code = "";
    
    this.typeDefinitionAndValue_AR = [];

 
  }  // end of constructor

getTVBOSoutputSet(){
  const base_ztic = this.svr1.getCodeForNS(this.TVBOS_Obj.dbzti_id, "131131/21");

  console.log("20250208a getTVBOSoutputSet() in zt_server_type_value_based_object_set  this.TVBOS_Obj: "+this.TVBOS_Obj);



  this.input_set_obj_idx = this.TVBOS_Obj.getTypeValueIdxForTypeDef(base_ztic, "40", this.svr1.time.now());
  this.type_val_set_obj_idx = this.TVBOS_Obj.getTypeValueIdxForTypeDef(base_ztic, "41", this.svr1.time.now()); 
  this.type_def_path_obj_idx =  this.TVBOS_Obj.getTypeValueIdxForTypeDef(base_ztic, "42", this.svr1.time.now()); 
  
  this.getValues();  
  this.buildOutputSetMemberIdxAR();
  //console.log("20250209d this.outputSetMember_idx_AR.length: "+this.outputSetMember_idx_AR.length);
  return this.outputSetMember_idx_AR;
  
}  // end of getTVBOSoutputSet()  




getValues(){

  
  require("dotenv").config();   // 20250208

  const base_ztic = this.svr1.getCodeForNS(this.TVBOS_Obj.dbzti_id, "131131/21");
  var statusExclusion_AR  = [];  // revisit perhaps get it from msg
  const get_values_maxLevelsDown_99 = 99;  // REVISIT ??

  var sv_wa = require('./ds2b00002_server_statistical_values_object_workarea');

  const path_name = process.env.ZT_SERVER_HOME_DIR + "/zt_server_set";

  //const  set_member_candidate_set_obj = new (require('./ds2b00002_server_set'))( this.svr1, this.input_set_obj_idx, this.msg ); (del) 20250208
  const  set_member_candidate_set_obj = new (require(path_name))( this.svr1, this.input_set_obj_idx, this.msg );  // 20250208

  this.setMemberCandidate_idx_AR = set_member_candidate_set_obj.getMember_AR(this.svr1.time.now());

  console.log("20250209a this.setMemberCandidate_idx_AR.length: "+this.setMemberCandidate_idx_AR.length);

 // const  type_val_set_obj = new (require('./ds2b00002_server_set'))( this.svr1, this.type_val_set_obj_idx, this.msg ); (del) 20250208
  const  type_val_set_obj = new (require(path_name))( this.svr1, this.type_val_set_obj_idx, this.msg );  // 20250208
  this.allowedTypeValue_idx_AR = type_val_set_obj.getMember_AR(this.svr1.time.now());

  console.log("20250209b this.allowedTypeValue_idx_AR.length: "+this.allowedTypeValue_idx_AR.length);
  
  var templDefForTypeDefPathKeyStr =     this.msg.TabNamePrfx.toString().trim() + "_"+ base_ztic+"_2_"+base_ztic+"_56";
  var template_def_idx_for_type_def_path = this.svr1.ZtObject_idx_HM.get(templDefForTypeDefPathKeyStr);
  var resp_item_for_type_def_path_AR = this.svr1.ZtObject_AR[this.type_def_path_obj_idx].getAllValuesForTemplateDef(template_def_idx_for_type_def_path, this.msg, this.svr1.time.now(), statusExclusion_AR, get_values_maxLevelsDown_99 ); 
          
  console.log("*** 20230718c resp_item_for_type_def_path_AR.length: "+resp_item_for_type_def_path_AR.length);

  for (var m = 0; m < resp_item_for_type_def_path_AR.length; m++) {
    var type_def_path_obj = resp_item_for_type_def_path_AR[m];
    for (var p = 0; p < type_def_path_obj.linkIdx_AR.length; p++) {
      if(this.svr1.ZtObjectLink_AR[type_def_path_obj.linkIdx_AR[p]].linkType_ztic == base_ztic && this.svr1.ZtObjectLink_AR[type_def_path_obj.linkIdx_AR[p]].linkType_code == "27"){  // link to type def
        var new_type_def = new sv_wa.TypeDefinitionAndValue(this.svr1.ZtObjectLink_AR[type_def_path_obj.linkIdx_AR[p]].linkToCode_ztic, this.svr1.ZtObjectLink_AR[type_def_path_obj.linkIdx_AR[p]].linkToCode);  // mod 20230719
        new_type_def.sortStr = this.svr1.ZtObjectLink_AR[type_def_path_obj.linkIdx_AR[p]].linkValue;
        this.typeDefinitionAndValue_AR.push(new_type_def);
              
      } // endif link type is for link to type def from type def path
    } // endfor loop through type_def_path_obj.linkIdx_AR

  } // endfor loop through resp_item_for_type_def_path_AR 

  return;

}  // end of getValues()


buildOutputSetMemberIdxAR(){

this.setMemberCandidate_idx_AR.forEach((setMemberCandidate_idx) => {
  if (this.setMemberCandidateIsSelected(setMemberCandidate_idx)) {
    this.outputSetMember_idx_AR.push(setMemberCandidate_idx);
  }  // endif setMemberCandidateIsSelected
});

console.log("20250209c this.outputSetMember_idx_AR.length: "+this.outputSetMember_idx_AR.length);

return;
}  // end of buildOutputSetMemberIdxAR()


setMemberCandidateIsSelected(setMemberCandidate_idx){
  var setMemberCandidateIsSelected = false;
  console.log("20250209g setMemberCandidate_idx: "+setMemberCandidate_idx);
  const multiLevelTypeValueObjIdx = this.getSourceObjectMultiLevelTypeValIdxForTypeDefPath(setMemberCandidate_idx);
  this.allowedTypeValue_idx_AR.forEach((allowedTypeValue_idx) => {
    console.log("20250209e multiLevelTypeValueObjIdx - allowedTypeValue_idx: "+multiLevelTypeValueObjIdx+" - "+allowedTypeValue_idx);
    if (multiLevelTypeValueObjIdx == allowedTypeValue_idx) {
      setMemberCandidateIsSelected = true;
    }  // endif setMemberCandidateIsAllowed
  });

  return setMemberCandidateIsSelected;
} // end of setMemberCandidateIsSelected()



getSourceObjectMultiLevelTypeValIdxForTypeDefPath(start_object_idxx){



   //var type_val_obj_idx;  (del) 20250210
   var type_val_obj_idx = null;
   var type_val_obj;
   var current_obj_idx;

    current_obj_idx = start_object_idxx;
    console.log("20250210a this.typeDefinitionAndValue_AR.length: "+this.typeDefinitionAndValue_AR.length);
    for (var k = 0; k < this.typeDefinitionAndValue_AR.length; k++) {

           var current_object = this.svr1.ZtObject_AR[current_obj_idx];
       console.log("20240107a current_obj_idx: "+current_obj_idx);
       console.log("20240107b this.typeDefinitionAndValue_AR[k].type_def_ztic: "+ this.typeDefinitionAndValue_AR[k].type_def_ztic);
       console.log("20240107c this.typeDefinitionAndValue_AR[k].type_def_code: "+ this.typeDefinitionAndValue_AR[k].type_def_code);
       console.log("current_object.kindZTIC; "+current_object.kindZTIC);
       console.log("current_object.kindCode; "+current_object.kindCode);
       console.log("current_object.objZTIC; "+current_object.objZTIC);
       console.log("current_object.objCode; "+current_object.objCode);
        const current_object_ns = this.svr1.getNSforCode(this.msg.TabNamePrfx, current_object.objZTIC);
          console.log("20250210c current_object_ns: "+current_object_ns);
 
        type_val_obj_idx = current_object.getTypeValueIdxForTypeDef(this.typeDefinitionAndValue_AR[k].type_def_ztic, this.typeDefinitionAndValue_AR[k].type_def_code, this.svr1.time.now()); 
        console.log("20230723 type_val_obj_idx: "+type_val_obj_idx);
////       //console.log("20230723 this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic - this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code: "+this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic+" - "+this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code);
         if (type_val_obj_idx != null) {
        type_val_obj     = this.svr1.ZtObject_AR[type_val_obj_idx];


       this.typeDefinitionAndValue_AR[k].type_val_kind_ztic = type_val_obj.kindZTIC;
       this.typeDefinitionAndValue_AR[k].type_val_kind_code = type_val_obj.kindCode;
       this.typeDefinitionAndValue_AR[k].type_val_ztic = type_val_obj.objZTIC;
       this.typeDefinitionAndValue_AR[k].type_val_code = type_val_obj.objCode;
 ////      console.log("20230723 type_val_obj.objZTIC - type_val_obj.objCode: "+ type_val_obj.objZTIC+" - "+type_val_obj.objCode);
      current_obj_idx = type_val_obj_idx;

         }  // endif type_val_obj_idx != null  
    }  // endfor loop through typeDefinitionAndValue_AR
 ////    console.log("20230721c type_val_obj.objZTIC: "+type_val_obj.objZTIC);
 ////    console.log("20230721c type_val_obj.objCode: "+type_val_obj.objCode);

 ////  } // endfor loop through dimension_AR
 return type_val_obj_idx;

}  // end of getSourceObjectMultiLevelTypeValIdxForTypeDefPath()






                











} // end of class ZtTypeValueBasedObjectSet





module.exports = ZtTypeValueBasedObjectSet;
