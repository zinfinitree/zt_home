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



class ZtFunction {



constructor(svr1x, msgx, function_def_zticx, function_def_codex, timestampx) {
  this.svr1  =  svr1x;
  this.msg   =  msgx;
  this.ztic  =  function_def_zticx.toString().trim();
  this.code  =  function_def_codex.toString().trim();
  this.timestamp  = timestampx;
  this.parameter_AR = [];
  this.base_dsi_str = "131131/21";
  this.base_ztic_str = svr1x.getCodeForNS(msgx.dbZtI_id, this.base_dsi_str);
  this.templKeyStr   =  msgx.dbZtI_id+"_"+this.base_ztic_str+"_2_"+this.base_ztic_str+"_30";  //base template for function
  this.templ_def_index = svr1x.ZtObject_idx_HM.get(this.templKeyStr);
  this.functionObjstr = msgx.dbZtI_id+"_"+this.base_ztic_str+"_36_"+this.ztic+"_"+this.code;
  this.function_idx  = svr1x.ZtObject_idx_HM.get(this.functionObjstr);
  this.functionObj    = this.svr1.ZtObject_AR[this.function_idx];
 

} // end of constructor


setParameterValue(param_ns, param_code, value)  {

// 1.  validate parameter namespace and parameter code against allowed parameters for the system message definition
// 2.  add parameter value to system message
var found = false;
this.parameter_AR.forEach((parameter) => {
  if(parameter.namespace == param_ns && parameter.code == param_code){
      parameter.value = value;
      found = true;
  }  // endif
}); // end of loop through this.parameter_AR

if(!found){
   var sm_param = new ZtFunctionParameter(param_ns, param_code, value);
   this.parameter_AR.push(sm_param);

}  // endif !found

}  // end of setParameterValue


  getParameterValue(param_ns, param_code)  {
     var return_paramter = "";
       this.parameter_AR.forEach((parameter) => {
          if(parameter.namespace == param_ns && parameter.code == param_code){
             return_paramter = parameter.value;
          }  // endif
    
      }); // end of loop through this.parameter_AR

  return return_paramter;
  }  // end of getParameterValue
  


  execute(){

 //0.  find the patch level to be used for the function by calling getPatchLevelIdx()
 //1.  find name of .js file using the resource linked to from the function and the patch level
     //console.log("running function execute");
     
     var class_idx = this.functionObj.getTypeValueIdxForTypeDef(this.base_ztic_str, "16", this.timestamp);
     //console.log("20200404 class_idx in zt_server_function: "+ class_idx);
     //var class_obj = this.svr1.ZtObject_AR[class_idx];                                          (del) 20200319
     var server_class_str = './zt_server_class';
     var class_exec_obj =  new (require(server_class_str))( this.svr1, class_idx, this.timestamp);     //20200319 

     var resource_name =       class_exec_obj.getMainResourceName(this.msg, this.timestamp);

     ////var resourceIdx_AR = class_obj.getLinkedObjectIdxForLinkType(this.base_ztic_str, "9", this.timestamp);
     ////var resource_idx;
     ////for(var i = 0; i < resourceIdx_AR.length; i++){
     ////     console.log("20200304 resourceIdx_AR: "+ resourceIdx_AR[i]);
     ////     resource_idx = resourceIdx_AR[i];
     ////     break;  // take first resource
     ////}  // endfor 


  // resource constructor -- constructor(svr1x, resource_idx, timestampx)
   ////  var class_resource_obj = new (require('./zt_server_resource'))( svr1, resource_idx, timestampx );
   ////  var patchLevel = "00001";
   ////  var class_resource_str = class_resource_obj.getUrlForPatchLevel(patchLevel);
     //console.log("20200320 resource_name: "+resource_name);
     var function_exec_obj = new (require(resource_name))( this.svr1, this.msg, this.parameter_AR);         
     function_exec_obj.execute();
     //var return_param_AR = function_exec_obj.execute();
     //var resource_obj = svr1.ZtObject_AR[resource_idx];
     //var resourceBaseTemplStr = dbzti_id+"_" + this.base_ztic_str+"_2_"+ this.base_ztic_str+"_39";
     //var resource_base_templ_def_idx = svr1.ZtObject_idx_HM.get(resourceBaseTemplStr);
     //var resource_OE_idx_AR = resource_obj.getOEvalueIdxForTemplateDef(resource_base_templ_def_idx, this.timestamp);

 //2.  create instance of of the object specified in the file
 //3.  call the execute method of the the object passing the array of export parameters from the constructor
 //4.  receive the array of return paramters from the function called
 //5.  return paramters to caller of server funtion

//return return_param_AR;

} // end of execute()



  getPatchLevelIdx(){
  //1.  get server software runtime profile ztic and code for message or server default

  //       var ssrt_profile_ztic =  this.msg.MessageProcessingParametersGeneralWA.serverSoftwareRuntimeProfileZTIC.toString().trim();
  //       var ssrt_profile_code =  this.msg.MessageProcessingParametersGeneralWA.serverSoftwareRuntimeProfileZTIC.toString().trim();
  //       var ssrt_profileKeyStr = this.msg.dbZtI_id+"_"+this.base_ztic_str+"_35_"+this.base_ztic+"_"+ssrt_profile_ztic+"_"+ssrt_profile_code;
  //       var ssrt_profile_obj   = this.svr1.getObjectForKeyString(ssrt_profileKeyStr);

  //2.  find all server software runtime components linked to from the profile
  //3.  find the set of functions associated with each runtime component
  //4.  check each component to see if the set includes the function
  //5.  raise error if there is not exactly 1 component with a set that contains the function
  //6.  find and return the patch level associated with the selected component

}  // end of getPatchLevel


}  // end of class ZtFunction



class ZtFunctionParameter {



constructor(namespacex, codex, valuex) {
      this.namespace  =  namespacex.toString().trim();
      this.code  =  codex.toString().trim();
      this.value =  valuex;
     // this.sm_text = "";
     // this.text_return = new TextReturn();
} // end of constructor


}  // end of class ZtFunctionParameter







module.exports = ZtFunction;


