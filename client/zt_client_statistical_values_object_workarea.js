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


// copied from zt_client_workflow_workarea.js
exports.StatisticalValuesDimension = function(sv_dimension_zticx, sv_dimension_codex) {
    this.sv_dimension_ztic = sv_dimension_zticx;
    this.sv_dimension_code = sv_dimension_codex;
    this.sv_dimension_label = "";
    this.type_def_idx_for_summarization = 0;
    this.type_def_idx_for_grouping = 0;
    this.type_def_idx_for_grouping2 = 0;
    this.type_def_path_ztic = "";
    this.type_def_path_code = "";
    
    this.typeDefinitionAndValue_AR = [];

  }  // end of function StatisticalValuesDimension


  exports.TypeDefinitionAndValue = function(type_def_zticx, type_def_codex) {
   this.type_def_ztic = type_def_zticx;
   this.type_def_code = type_def_codex;
   this.sortStr = "";
   this.type_def_label = "";
   this.obj_idx = 0;
   this.type_val_kind_ztic = "";
   this.type_val_kind_code = "";
   this.type_val_ztic = "";
   this.type_val_code = "";
   this.type_val_label = "";
   //this.type_val_sortStr = "";


 }  // end of function TypeDefinition


exports.StatisticalValue = function(idx) {

      this.sv_id              = idx;
      this.statistical_value  = "";
      this.sv_typeDefAndValue_AR       = [];
     
      
  } // end of function StatisticalValue





exports.StatisticalValueTypeValue = function() {
   this.sort_key = "";
   this.type_def_ztic = "";
   this.type_def_code = "";
   this.type_val_ztic = "";
   this.type_val_code = "";
   this.type_val_for_summarization_label = "";
   this.group_code = "";
   this.group_code2 = "";

}  // end of function StatisticalValueTypeValue



exports.StatisticalValueGroup = function(group_codex) {
   this.group_code = group_codex;
   this.group_label = "";
   this.dimension_ztic = "";
   this.dimension_code = "";
   this.index_in_type_def_path = 0;
   this.type_val_ztic = "";
   this.type_val_code = "";
   
 
}   // end of function StatisticalValueGroup






exports.MessageReceiver = function(zticx, codex) {
   this.mreceiver_ztic = zticx;
   this.mreceiver_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.mreceiver_desc  = "";
  // this.wfDef_idx       = 0;
   this.msender_idx_AR  = [];
   this.resource_idx_AR = [];   // resource to deliver a message to
   this.program_idx_AR  = [];   // program to deliver a message
   this.map_idx_AR      = [];   // map to execute before delivering a message
  // this.parent_idx      = "";
  // this.levelsDown      = "";


 } // end of function MessageReceiver

  








