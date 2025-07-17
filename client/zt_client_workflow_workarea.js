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



exports.WorkflowDefinition = function(wf_def_zticx, wf_def_codex) {
    this.wf_def_ztic = wf_def_zticx;
    this.wf_def_code = wf_def_codex;
    this.id              = "";
    this.parent_id       = "";
    this.wfDef_idx       = 0;
    this.wfLocalValuesContainerDef_AR = [];
    this.workflow_idx_AR    = [];
    this.desc           = "";
    this.wfStepSeries_AR = [];
    this.wfStep_AR      = [];
    this.function_AR    = [];
    this.map_AR         = [];
    this.msender_AR     = [];
    this.mreceiver_AR   = [];
    this.resource_AR    = [];
    this.program_AR     = [];

  }  // end of function WorkflowDefinition


exports.Workflow = function(wf_zticx, wf_codex) {

      this.wf_ztic        = wf_zticx;
      this.wf_code        = wf_codex;
      this.id              = "";
      this.parent_id       = "";
     
      this.desc            = "";

      this.wfDef_ztic      = "";
      this.wfDef_code      = "";
      this.wfDef_idx       = 0;
 
      //this.menu_AR      = []; 
      //this.workbook_AR  = []; 

    
      this.wfSetMemberIterationStatus_AR = [];
      this.localValuesContainer_AR = [];
      this.logEntry_AR     = [];
      this.messageContainer_AR = [];
      this.message_AR          = [];
 
      this.currentStepSeriesNamespace = "";
      this.currentStepSeriesCode      = "";
      this.currentStepSeries_idx      = 0;     
      this.currentStepSeriesStep_idx = 0;
  

      
  } // end of function Workflow




exports.WfStepSeries = function(zticx, codex) {
   this.wfStepSeries_ztic = zticx;
   this.wfStepSeries_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfStepSeries_desc            = "";
   this.wfDef_idx       = 0;
   this.wfStep_idx_AR   = [];
   this.setMember_idx_AR      = [];
   this.set_idx                 = 0;
   this.parentSeriesStep_idx = 0;
  // this.wfDef_idx =            0;


}  // end of function WfStepSeries 



exports.WfStep = function(zticx, codex) {
   this.step_ztic = zticx;
   this.step_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfStep_desc = "";
   this.wfDef_idx =  0;

   this.step_label  = "";
   this.step_type_ztic = "";
   this.step_type_code = "";

   this.linked_wf_step_series_idx;
   this.function_idx_AR  = [];
   this.map_idx_AR       = [];
   this.msender_idx_AR   = [];
   this.mreceiver_idx_AR = [];
   
 
}   // end of function WfStep


exports.Function = function(zticx, codex) {
   this.function_ztic = zticx;
   this.function_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.desc  = "";
  // this.wfDef_idx       = 0;
  // this.parent_idx      = "";
  // this.levelsDown      = "";


 } // end of function Function

exports.Map = function(zticx, codex) {
   this.map_ztic = zticx;
   this.map_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.map_desc  = "";
   this.map_program_idx_AR   = [];
  // this.wfDef_idx       = 0;
  // this.parent_idx      = "";
  // this.levelsDown      = "";


 } // end of function Map


exports.MessageSender = function(zticx, codex) {
   this.msender_ztic = zticx;
   this.msender_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.msender_desc  = "";
  // this.wfDef_idx       = 0;
   this.mreceiver_idx_AR  = [];
   this.resource_idx_AR   = [];
   this.map_idx_AR        = [];
   this.program_idx_AR    = [];
  // this.parent_idx      = "";
  // this.levelsDown      = "";


 } // end of function MessageSender


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


exports.Resource = function(zticx, codex) {
   this.resource_ztic = zticx;
   this.resource_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.resource_desc  = "";
   this.resource_path  = "";
  // this.wfDef_idx       = 0;
  // this.msender_idx_AR  = [];
  // this.parent_idx      = "";
  // this.levelsDown      = "";


 } // end of function Resource



exports.Program = function(zticx, codex) {
   this.program_ztic = zticx;
   this.program_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.program_desc  = "";
   this.program_name  = "";
   this.resource_idx_AR = [];
  // this.wfDef_idx       = 0;
  // this.msender_idx_AR  = [];
  // this.parent_idx      = "";
  // this.levelsDown      = "";


 } // end of function Resource


// copied from zt_client_app_workarea.js 20220805

exports.Condition = function(zticx, codex) {
   this.appAction_ztic = zticx;
   this.appAction_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   //this.menu_title = "";
   this.appAction_desc  = "";
   this.appAction_type_ztic = "";
   this.appAction_type_code = "";
   this.appAction_object_templ_ns = "";
   this.appAction_object_templ_code = "";
   this.appAction_maint_mode        = "";
   this.appAction_format            = "";

 
}   // end of function AppAction

exports.WfLocalValuesContainerDefinition = function(zticx, codex) {
   this.loc_vals_container_def_ztic = zticx;
   this.loc_vals_container_def_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.parameter_AR =   [];
  
}  // end of WfLocalValuesContainerDefinition


exports.WfLocalValuesContainer = function(zticx, codex) {
   this.loc_vals_container_ztic = zticx;
   this.loc_vals_container_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.parameterValue_AR       = [];
   this.workflow_idx            = 0;

}  // end of WfLocalValuesContainer


exports.WfSetMemberIterationStatus = function(zticx, codex) {
   this.loc_vals_container_ztic = zticx;
   this.loc_vals_container_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.workflow_idx          = 0;
   this.currentSetMemberZTIC  = "";
   this.currentSetMemberCode  = "";   

}  // end of WfSetMemberIterationStatus

exports.WfLogEntry = function(zticx, codex) {
   this.log_entry_ztic = zticx;
   this.log_entry_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.workflow_idx          = 0;
     
}  // end of WfLogEntry


exports.MessageContainer = function(zticx, codex) {
   this.msg_container_ztic = zticx;
   this.msg_container_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.msg_container_desc  = "";
   this.workflow_idx  = 0;
   this.wfStepSeries_idx = 0;
   this.wfStep_idx        = 0;
   this.msender_idx  = 0;
   this.msgFromSender_idx   = 0;
   this.msgFromSenderAfterMap_idx = 0;
   this.msgAfterReceiverMap_idx   = 0;
   this.msgWithResponse_idx       = 0;
   this.assignNewCode             = false;

//ELEM 2    10   3    11   2    10   2    10        Link Type: Message Container to Message from Sender
//ELEM 2    10   3    12   2    10   2    10        Link Type: Message Container to Message after Mapping on Sender Side
//ELEM 2    10   3    13   2    10   2    10        Link Type: Message Container to Message after Mapping on Receiver Side
//ELEM 2    10   3    14   2    10   2    10        Link Type: Message Container to Message including Response from Target


 } // end of function MessageContainer


exports.Message = function(zticx, codex) {
   this.message_ztic = zticx;
   this.message_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.wfDef_idx       = 0;
   this.workflow_idx  = 0;
   this.message_desc  = "";
   this.assignNewCode     = false;
   this.messageStr        = "";

 } // end of function Message


exports.ParameterRec = function(){   
     param_ns     = "";             
     param_ztic   = "";
     param_code   = "";
     param_value   = "";

}  // end of function ParameterRec





