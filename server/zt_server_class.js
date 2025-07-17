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



class ZtClass {



constructor(svr1x, class_idx, timestampx) {
  this.svr1  =  svr1x;
  this.timestamp  = timestampx;
  this.class_idx  = class_idx;
  this.parameter_AR = [];
  this.classObj    = this.svr1.ZtObject_AR[this.class_idx];
  this.base_dsi_str = "131131/21";
  this.base_ztic_str = svr1x.getCodeForNS(this.classObj.dbzti_id, this.base_dsi_str);
  //this.templKeyStr   =  msgx.dbZtI_id+"_"+this.base_ztic_str+"_2_"+this.base_ztic_str+"_37";  //base template for function
  this.templ_def_index = svr1x.ZtObject_idx_HM.get(this.templKeyStr);

  
 

} // end of constructor


getMainResourceName(msgx, timestampx){
//1.  call getRuntimePatchLevelIdxForMessage
  var patch_level_idx = this.getRuntimePatchLevelIdxForMessage(msgx, timestampx);
  //console.log("20200322 patch_level: "+patch_level_idx);
//2.  find resources linked to from the class and select the first one
  var resourceIdx_AR = this.classObj.getLinkedObjectIdxForLinkType(this.base_ztic_str, "9", this.timestamp);
  var resource_idx = 99999;
  //console.log("20240208a resourceIdx_AR.length: "+resourceIdx_AR.length);
  //console.log("20240208b this.class_idx: "+this.class_idx);
  for(var i = 0; i < resourceIdx_AR.length; i++){
     ////     console.log("20200304 resourceIdx_AR: "+ resourceIdx_AR[i]);
        resource_idx = resourceIdx_AR[i];
        break;  // take first resource
  }  // endfor 


//3.  call resource.getResouceName  
  // var resource_obj = this.svr1.ZtObject_AR[resource_idx];
  
   var resource_str = './zt_server_resource';
   console.log("20250111a resource_idx: "+resource_idx);
   var resource_obj = new (require(resource_str))(this.svr1, resource_idx, this.timestamp);

   var return_resource  = resource_obj.getUrlForPatchLevel(patch_level_idx);
   return return_resource;
}//  end of getMainResourceName()


getRuntimePatchLevelIdxForMessage(msgx, timestampx){

/////  //1.  get server software runtime profile ztic and code for message or server default

     var ssrt_profile_ztic =  msgx.MessageProcessingParametersGeneralWA.serverSoftwareRuntimeProfileZTIC.toString().trim();
     var ssrt_profile_code =  msgx.MessageProcessingParametersGeneralWA.serverSoftwareRuntimeProfileCode.toString().trim();
     var ssrt_profileKeyStr = msgx.dbZtI_id+"_"+this.base_ztic_str+"_42_"+ssrt_profile_ztic+"_"+ssrt_profile_code;
     //console.log("20200319 ssrt_profileKeyStr: "+ssrt_profileKeyStr);
     var ssrt_profile_obj   = this.svr1.getObjectForKeyString(ssrt_profileKeyStr);
     var ssrt_profile_idx   = this.svr1.ZtObject_idx_HM.get(ssrt_profileKeyStr);

/////  //2.  find all server software runtime components linked to from the profile

     var patchLevelReturnIdx;
     var runtimeProfileComponentIdx_AR = [];
     var runtimeProfileComponentProcessed_AR = [];
     var classSetIdx_AR                      = [];
     var done = false;
     var cntr = 0;
     var link_type_code = "10";
     //var base_ztic   = svr1.getCodeForNS(msgx.dbZtI_id, "131131/21");
     runtimeProfileComponentIdx_AR = ssrt_profile_obj.getLinkedObjectIdxForLinkType(this.base_ztic_str, link_type_code, timestampx);

     for (var i = 0; i < runtimeProfileComponentIdx_AR.length; i++){
        runtimeProfileComponentProcessed_AR.push(false);
     } // endfor

// start of copy from zt_server_object getTechnicalProfileIdx_AR_ForTemplateDef

 var done = false; 
 var cntr = 0;    
       while(!done){  //find all tech profiles linked to from other tech profiles
         cntr++;
         var links_found = false;
         var runtimeProfileComponentIdx_AR_length = runtimeProfileComponentIdx_AR.length;
        
         for (var i = 0; i < runtimeProfileComponentIdx_AR_length; i++){
           if(!runtimeProfileComponentProcessed_AR[i]){
             //console.log("20200312 runtimeProfileComponentIdx_AR[i]: "+runtimeProfileComponentIdx_AR[i]);
             //console.log("i: "+i);
             if(this.svr1.ZtObject_AR[runtimeProfileComponentIdx_AR[i]].linkIdx_AR.length > 0){links_found = true;}
             for (var j = 0; j < this.svr1.ZtObject_AR[runtimeProfileComponentIdx_AR[i]].linkIdx_AR.length; j++){


          if(this.svr1.ZtObjectLink_AR[ this.svr1.ZtObject_AR[runtimeProfileComponentIdx_AR[i]].linkIdx_AR[j] ].timestamp <= timestampx && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[runtimeProfileComponentIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic == this.svr1.getCodeForNS(this.dbzti_id, "131131/21") && this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[runtimeProfileComponentIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code.toString().trim() == "43")
            { 
            var runtimeProfileComponentKeyStr = this.dbzti_id + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[runtimeProfileComponentIdx_AR[i]].linkIdx_AR[j] ].linkToKind_ztic.toString().trim() + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[runtimeProfileComponentIdx_AR[i]].linkIdx_AR[j] ].linkToKind_code.toString().trim() + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[runtimeProfileComponentIdx_AR[i]].linkIdx_AR[j] ].linkToCode_ztic.toString().trim() + this.svr1.ZtObjectLink_AR[this.svr1.ZtObject_AR[runtimeProfileComponentIdx_AR[i]].linkIdx_AR[j] ].linkToCode.toString().trim();
    var runtime_profile_component_idx = this.svr1.ZtObject_idx_HM.get(runtimeProfileComponentKeyStr);
              runtimeProfileComponentProcessed_AR[i] = true; 
              runtimeProfileComponentIdx_AR.push(runtime_profile_component_idx);
              runtimeProfileComponentProcessed_AR.push(false);
            } //endif...
 
           } //endfor loop through links
          }//endif !runtimeProfileComponentProcessed_AR[i]
         } //endfor loop through runtimeProfileComponentIdx_AR
         if(!links_found){done=true;}
         if(cntr > 20){done = true;}
       } // endwhile

  //return techProfileIdx_AR;          //20191210


// end of copy from zt_server_object getTechnicalProfileIdx_AR_ForTemplateDef


/////  //3.  find the set of classes/programs associated with each runtime profile component
/////  //4.  check each component to see if the set includes the program
   var set_cntr = 0;
   var patch_level_idx = 99999;
   var selected_profile_component_idx;
   //console.log("20200319 runtimeProfileComponentIdx_AR.length: "+runtimeProfileComponentIdx_AR.length);
   for (var i = 0; i < runtimeProfileComponentIdx_AR.length; i++){
      var typeDef_zticx = this.base_ztic_str;
      var typeDef_codex = "18";  // set of classes for a runtime profile component
      var class_set_idx = this.svr1.ZtObject_AR[runtimeProfileComponentIdx_AR[i]].getTypeValueIdxForTypeDef(typeDef_zticx, typeDef_codex, timestampx);
      var class_set_obj = new (require('./zt_server_set'))(this.svr1, class_set_idx); 
//      if(class_set_obj.isMember(this.getObjectIndex(), timestamp)){  //(del) 20200319 
 
      if(class_set_obj.isMember(this.class_idx, this.timestamp)){
        set_cntr++;  
        selected_profile_component_idx = runtimeProfileComponentIdx_AR[i];
        
      }  // endif
   } //
/////  //5.  raise error if there is not exactly 1 component with a set that contains the program

   if(set_cntr != 1){
      //raise error - class must be assigned to exactly 1 runtime profile component
      console.log("error in zt_server_class.js - class must be assigned to exactly 1 runtime profile component, set_cntr: "+set_cntr);
   }

/////  //6.  find and return the patch level associated with the selected component
       var type_def_code_patch_level_for_component = 17;
       patch_level_idx = this.svr1.ZtObject_AR[selected_profile_component_idx].getTypeValueIdxForTypeDef(this.base_ztic_str, type_def_code_patch_level_for_component, this.timestamp)

  return patch_level_idx;

}  // end of getRuntimePatchLevelIdxForMessage








}  // end of class ZtClass



class DsFunctionParameter {



constructor(namespacex, codex, valuex) {
      this.namespace  =  namespacex.toString().trim();
      this.code  =  codex.toString().trim();
      this.value =  valuex;
     // this.sm_text = "";
     // this.text_return = new TextReturn();
} // end of constructor


}  // end of class DsFunctionParameter







module.exports = ZtClass;


