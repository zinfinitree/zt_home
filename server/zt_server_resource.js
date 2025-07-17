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


class DsResource {



constructor(svr1x, resource_idx, timestampx) {
  this.svr1  =  svr1x;
  this.timestamp  = timestampx;
  this.parameter_AR = [];
  this.base_dsi_str = "131131/21";
  this.resourceObj    = this.svr1.ZtObject_AR[resource_idx];
  this.resource_idx  = resource_idx;
  this.base_ztic_str = svr1x.getCodeForNS(this.resourceObj.dbzti_id, this.base_dsi_str);
  //this.templKeyStr   =  msgx.TabNamePrfx+"_"+this.base_ztic_str+"_2_"+this.base_ztic_str+"_39";  //base template for function
  this.templ_def_index = svr1x.ZtObject_idx_HM.get(this.templKeyStr);

 
 
 

} // end of constructor

  



  getUrl(){

  }  // end of getUrl()
  
  getUrlForPatchLevel(patchLevel_idx){
  var EK_ztic = this.svr1.ZtObject_AR[patchLevel_idx].objZTIC;
  var EK_code = this.svr1.ZtObject_AR[patchLevel_idx].objCode;
  var return_url = "";
  var done = false;
  var cntr = 0;
  while(!done){
    cntr++;
    //console.log("20240209c in zt_server_resource.js  EK_zticx - EK_codex - timestampx: "+EK_ztic+" - "+EK_code+" - "+this.timestamp)
    return_url = this.resourceObj.getOEvalue(this.base_ztic_str, "211", EK_ztic, EK_code, this.timestamp);
    //console.log("20200404 patch_idx-EK_ztic-EK_code-return_url in zt_server_resource: "+patchLevel_idx+" - "+EK_ztic+" - "+EK_code+" - "+return_url);
    if(return_url == "" && parseInt(EK_code) > 1){
       var new_patch_code = parseInt(EK_code);
       new_patch_code = new_patch_code - 1;
       var new_patch_code_str = this.svr1.pad(new_patch_code,5);
       EK_code = new_patch_code_str;
    } // endif
    if(return_url != ""){done = true;}
    if(cntr > 999){break;}
  } // endwhile

  return return_url;

  }  // end of getUrlForPatchLevel()



}  // end of class DsResource



module.exports = DsResource;


