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


// copied from ds2b...server...
class ZtStatisticalValuesObject {      // 20230524

  //var HashMap = require('hashmap');
  
    constructor(sv_object_zticx, sv_object_codex) {
      var HashMap = require('hashmap');
      //this.svr1 = svr1x;
      //this.msg  = msgx;
      this.sv_obj_ztic = sv_object_zticx;
      this.sv_obj_code = sv_object_codex;
      this.sv_obj_idx = "";
      this.svId = "";
      this.svParentId; 
      this.statistic_type_ztic = "";
      this.statistic_type_code = "";  // sum, count, mean, median, mode, standard deviation
      this.source_obj_set_ztic = "";
      this.source_obj_set_code = "";
      this.uom_ztic      = "";
      this.uom_code      = "";
      this.source_obj_elem_ztic = "";
      this.source_obj_elem_code = "";
      this.source_obj_idx_AR  = [];
      this.dimension_AR = [];
      this.stat_value_AR = [];
      this.stat_value_HM = new HashMap();
      this.group_AR = [];


}  // end of class





module.exports = ZtStatisticalValuesObject;
