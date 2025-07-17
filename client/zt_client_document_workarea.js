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



exports.Document = function(zticx, codex) {
   this.doc_ztic    = zticx;
   this.doc_code    = codex;
   this.id          = "";
   this.parentId   = "";
   this.title       = "";
   this.desc        = "";
   this.docElem_AR  = [];
}   // end of function Document





exports.DocumentElement = function(zticx, codex) {
   this.docElem_ztic = zticx;
   this.docElem_code = codex;
   this.id           = "";
   this.parentId     = "";
   this.parent_idx   = 0;
   this.levelsDown   = "";
   this.typeZTIC     = "";
   this.typeCode     = "";
   //this.doc_idx      = doc_idxx;
   this.text         = "";
   //this.linkStatus   = "";      // 20210717 - status of link to this doc elem
   //this.linkValue    = "";      // 20210717 - value of link to this doc elem  -- added in again 20210729
   this.linkToDocElem_AR = [];    // 20210731
   this.childDocElem_idx_AR            = [];  // ?? maybe deprecated and replace by childDocElemDetails_AR or linkToDocElem_AR 20210729
   this.childDocElemDetails_AR         = [];  // ??? maybe use linkToDocElem_AR instead
   this.linkedSpreadsheet_AR           = [];   // 20210317
   this.linkedMultiMediaObject_AR      = [];   // 20210713 
   this.linkedMessageDefinition_AR     = [];   // 20210806 

 } // end of function DocumentElement



exports.LinkedSpreadsheet = function(zticx, codex) {
   this.ssht_ztic    = zticx;
   this.ssht_code    = codex;
   this.sheet_idx    = 0;
   this.id          = "";
   this.parentId   = "";
   this.title       = "";
   this.desc        = "";
   this.label       = "";
}   // end of function linkedSpreadsheet


exports.LinkedMultiMediaObject = function(zticx, codex) {
   this.mmo_ztic    = zticx;
   this.mmo_code    = codex;
   this.mmo_idx     = "";
   this.id          = "";
   this.parentId   = "";
   this.title       = "";
   this.desc        = "";
   this.long_desc   = "";
   this.html_width  = "";
   this.html_height = "";
   this.resource_idx_AR = [];
}   // end of function linkedMultiMediaObject


// start 20210806

exports.LinkedMessageDefinition = function(zticx, codex) {
   this.msg_def_ztic    = zticx;
   this.msg_def_code    = codex;
   this.msg_def_idx     = "";
   this.id          = "";
   this.parentId   = "";
   this.title       = "";
   this.desc        = "";
   this.long_desc   = "";
   this.html_width  = "";
   this.html_height = "";
   this.resource_idx_AR = [];
}   // end of function linkedMultiMediaObject



// end 20210806


exports.ChildDocElemDetails = function(child_idxx, sortStrx)  {
    this.idx = child_idxx;
    this.sortStr = sortStrx;

}  // end of ChildDocElemDetails


exports.LinkToDocElem = function(){


      this.linkToZTIC                    = "";   
      this.linkToCode                    = "";   
      this.status                        = "";   
      this.timestampEff                  = "";   
      this.linkValue                     = "";   
      this.docElemIdx                    = "";


}







