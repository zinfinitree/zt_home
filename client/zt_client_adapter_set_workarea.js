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




exports.AppPage = function(app_zticx, app_codex) {


      this.app_ztic        = app_zticx;
      this.app_code        = app_codex;
      this.id              = "";
      this.parent_id       = "";
      this.title           = "";
      this.desc            = "";
 
      this.menu_AR      = []; 
      this.workbook_AR  = []; 
      

      
  } // end of function AppPage





exports.Menu = function(zticx, codex) {
   this.menu_ztic = zticx;
   this.menu_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.menu_desc = "";
   this.menu_label  = "";
   this.menu_type_ztic = "";
   this.menu_type_code = "";
   this.menu_option_AR  = [];
   //this.menuOptionLevel_AR = [];
   //this.menuOption_max_levels_down = 0;
}   // end of function Menu





exports.MenuOption = function(zticx, codex) {
   this.menu_option_ztic = zticx;
   this.menu_option_code = codex;
   this.id              = "";
   this.parent_id       = "";
   this.linkValue       = "";
   this.menu_idx        = "";
   this.parent_idx      = "";
   this.levelsDown      = "";
   this.childMenuOption_idx_AR = [];
   this.menu_option_desc  = "";
   this.menu_option_label = "";
   //this.menu_option_AR   = [];
   this.appAction_AR    = [];

 } // end of function MenuOption

// copied from zt_client_app_workarea.js 20220727


exports.AppAction = function(zticx, codex) {
   this.appAction_ztic = zticx;
   this.appAction_code = codex;
   this.id              = "";
   this.parent_id       = "";
   //this.menu_title = "";
   this.appAction_desc  = "";
   this.appAction_type_ztic = "";
   this.appAction_type_code = "";
   this.appAction_object_templ_ns = "";
   this.appAction_object_templ_code = "";
   this.appAction_maint_mode        = "";
   this.appAction_format            = "";

 
}   // end of function AppAction






exports.MenuType = function(zticx, codex) {
   this.menu_type_ztic = zticx;
   this.menu_type_code = codex;
   this.menu_type_desc  = "";
 

 } // end of function MenuType



exports.AppActionType = function(zticx, codex) {
   this.app_action_type_ztic = zticx;
   this.app_action_type_code = codex;
   this.app_action_type_desc  = "";
 

 } // end of function AppActionType


exports.MenuOptionLevelRec = function() {

   this.menuOption_idx = 0;
   this.childMenuOption_idx_AR_idx  = 0;
   this.doneForLevel = false;

}  // end of function MenuOptionLevelRec()


