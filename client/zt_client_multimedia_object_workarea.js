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


exports.Resource = function(zticx, codex) {



   this.ztic = zticx;
   this.code = codex;
   this.id   = "";
   this.parent_id = "";
   this.desc  = "";
   this.long_desc = "";
   this.label = "";


/// ELEM 2    3    2    210  2    3    2    3         Resource Path/Name
/// ELEM 2    3    2    211  2    3    2    3         Resource Path/Name--Patch Level Dependent
/// ELEM 2    3    2    212  2    3    2    3         Resource Path/Name--Language Dependent
/// ELEM 2    3    2    213  2    3    2    3         Resource Path/Name--Patch Level and Language Dependent


   this.path_name = "";
   this.path_name_patch_dep = "";
   this.path_name_lang_dep  = "";
   this.path_name_patch_and_lang_dep = "";
  
}   // end of function Resource























