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


exports.MaintainSheet = function(zticx, codex) {
   this.sheet_ztic = zticx;
   this.sheet_code = codex;
   this.sheetId    = "";
   this.sheetParentId = "";
   this.dim5_idx  = "";
   this.dim4_idx = "";
   this.dim3_idx  = "";
   this.desc  = "";
   this.label = "";
   this.sheetTypeZTIC     = "";    // 20230901
   this.sheetTypeCode     = "";    // 20230901
   this.sortStr = "";
   this.sv_dimension_ztic = "";    // 20230809
   this.sv_dimension_code = "";    // 20230809
   this.sv_type_def_ztic  = "";    // 20230809
   this.sv_type_def_code  = "";    // 20230809
   this.cell_idx_AR  = [];
   this.hidden_col_idx_AR  = [];
   this.hidden_row_idx_AR  = [];
}   // end of function MaintainSheet





exports.MaintainColumn = function(zticx, codex) {
   this.column_ztic = zticx;
   this.column_code = codex;
   this.colId       = "";
   this.colParentId = "";
   this.dim5_idx  = "";
   this.dim4_idx = "";
   this.dim3_idx  = "";
   this.desc  = "";
   this.label = "";
   this.OE_ztic = "";
   this.OE_code = "";
   this.colTypeZTIC = "";
   this.colTypeCode = "";
   this.colGenSetZTIC = "";
   this.colGenSetCode = "";
   this.colTypeDefZTIC = "";   //20231001  type def to find values to put in a column from object elements of a type value
   this.colTypeDefCode = "";   //20231001
   this.linkValueFromWorkbook = "";  // 20220523
   this.sortStr       = "";
   this.sv_dimension_ztic = "";    // 20230809
   this.sv_dimension_code = "";    // 20230809
   this.sv_type_def_ztic  = "";    // 20230809
   this.sv_type_def_code  = "";    // 20230809
   this.cell_idx_AR  = [];
   this.hidden_col_idx_AR  = [];
   this.hidden_row_idx_AR  = [];  
   this.typeVal_AR         = [];
   this.link_AR            = [];

 } // end of function MaintainColumn



exports.MaintainRow = function(zticx, codex) {
   this.row_ztic  = zticx;
   this.row_code  = codex;
   this.dim5_idx  = "";
   this.dim4_idx = "";
   this.dim3_idx  = "";
   this.desc  = "";
   this.label = "";
   this.OE_ztic = "";
   this.OE_code = "";
   this.rowTypeZTIC = "";
   this.rowTypeCode = "";
   this.rowGenSetZTIC = "";
   this.rowGenSetCode = "";
   this.sortStr       = "";
   this.sv_dimension_ztic = "";    // 20230809
   this.sv_dimension_code = "";    // 20230809
   this.sv_type_def_ztic  = "";    // 20230809
   this.sv_type_def_code  = "";    // 20230809
   this.cell_idx_AR  = [];
   this.hidden_col_idx_AR  = [];
   this.hidden_row_idx_AR  = [];
   this.typeVal_AR         = [];
   this.link_AR            = [];
 
 } // end of function MaintainRow




exports.MaintainCell = function(zticx, codex ) {
   this.cell_ztic = zticx;
   this.cell_code = codex;
   this.cell_type_ztic = "";
   this.cell_type_code = "";
   this.cell_col_ztic = "";
   this.cell_col_code = "";
   this.cell_row_disc = "";
   this.cell_row_code = "";
   this.cell_sheet_ztic = "";
   this.cell_sheet_code = "";
   this.cell_sheet_book_ztic = "";
   this.cell_sheet_book_code = "";
   this.dim5_idx  = "";
   this.dim4_idx = "";
   this.dim3_idx  = "";
   this.sheet_book_idx = "";
   this.sheet_idx = "";
   this.column_idx = "";
   this.row_idx    = "";
   this.value = "";
   this.label = "";
   this.desc  = "";
 
 } // end of function MaintainCell


exports.Dimension5 = function( ) {
   this.desc  = "";
   this.label = "";
   this.dim5_idx_AR   = [];
   this.hidden_dim4_idx_AR  = [];

 } // end of function Dimension5


exports.Dimension4 = function( ) {
   this.dim5_idx  = "";
   this.desc  = "";
   this.label = "";
   this.dim3_idx_AR        = [];
   this.hidden_dim3_idx_AR  = [];
 
 } // end of function Dimension4



exports.Dimension3 = function( ) {
   this.dim5_idx  = "";
   this.dim4_idx = "";
   this.desc  = "";
   this.label = "";
   this.sheet_idx_AR = [];
   this.hidden_sheet_idx_AR  = [];

 } // end of function Dimension3

 exports.DisplaySheet = function( ) {
   this.sheet_ztic = "";
   this.sheet_code = "";
   this.numLabel   =  "";
   this.label      =  "";
   this.desc       =  "";
   this.sheetTypeCode = "";
   this.OE_ztic    =  "";
   this.OE_code    =  "";
   this.sheetSortLevel  = "";
   this.sortStr       = "";
   this.sv_type_def_ztic = "";
   this.sv_type_def_code = "";
   this.sv_type_def_label = "";
   this.sv_type_val_kind_ztic = "";
   this.sv_type_val_kind_code = "";
   this.sv_type_val_ztic = "";
   this.sv_type_val_code = "";
   //this.sv_type_val_label = "";
   this.cell_idx_AR = [];
 
 } // end of function DisplaySheet


exports.DisplayColumn = function( ) {
   this.column_ztic = "";
   this.column_code = "";
   this.numLabel   =  "";
   this.label      =  "";
   this.desc       =  "";
   this.colTypeCode = "";
   this.OE_ztic    =  "";
   this.OE_code    =  "";
   this.colSortLevel  = "";
   this.sortStr       = "";
   this.sv_type_def_ztic = "";
   this.sv_type_def_code = "";
   this.sv_type_def_label = "";
   this.sv_type_val_kind_ztic = "";
   this.sv_type_val_kind_code = "";
   this.sv_type_val_ztic = "";
   this.sv_type_val_code = "";
   //this.sv_type_val_label = "";
   this.colGenSetZTIC =  "";   //20231004
   this.colGenSetCode =  "";   //20231004
   this.colTypeDefZTIC = "";   //20231001  type def to find values to put in a column from object elements of a type value
   this.colTypeDefCode = "";   //20231001
   this.cell_idx_AR = [];
 
 } // end of function DisplayColumn


exports.DisplayRow = function( ) {
   this.row_ztic  = "";
   this.row_code  = "";
   this.numLabel = "";
   this.label    = "";
   this.desc     = "";
   this.rowTypeCode = "";
   this.OE_ztic  = "";
   this.OE_code  = "";
   this.rowSortLevel = "";
   this.sortStr  = "";
   this.sv_type_def_ztic = "";
   this.sv_type_def_code = "";
   this.sv_type_def_label = "";
   this.sv_type_val_kind_ztic = "";
   this.sv_type_val_kind_code = "";
   this.sv_type_val_ztic = "";
   this.sv_type_val_code = "";
   this.cell_idx_AR = [];
  
 } // end of function DisplayRow

exports.DisplayCell = function( ) {
   this.cell_ztic = "";
   this.cell_code = "";
   this.dim5_idx  = "";
   this.dim4_idx = "";
   this.dim3_idx  = "";
   this.sheet_idx = "";
   this.column_idx = "";
   this.row_idx    = "";
   this.value = "";
   this.label = "";
   this.desc  = "";

   this.cell_type_ztic = "";
   this.cell_type_code = "";
   this.cell_col_ztic = "";
   this.cell_col_code = "";
   this.cell_row_disc = "";
   this.cell_row_code = "";
   this.cell_sheet_ztic = "";
   this.cell_sheet_code = "";
   this.cell_sheet_book_ztic = "";
   this.cell_sheet_book_code = "";
 
 } // end of function DisplayCell
 
 
 exports.WorkbookLink = function(){



      this.linkTypeZTIC                  = "";   
      this.linkTypeCode                  = "";   
      this.linkToKindZTIC                = "";   
      this.linkToKindCode                = "";   

      this.linkToZTIC                    = "";   
      this.linkToCode                    = "";   
      this.status                        = "";   
      this.timestampEff                  = "";   
      this.linkValue                     = "";   
    //  this.docElemIdx                    = "";


}  // end of WorkbookLink()



exports.StatisticalValuesObject = function( ) {    // 20230809
   this.sv_obj_ztic = "";
   this.sv_obj_code = "";

     // var HashMap = require('hashmap');
      this.sv_obj_idx = "";
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
     // this.stat_value_HM = new HashMap();
      this.group_AR = [];
 
 
 } // end of function StatisticalValuesObject





