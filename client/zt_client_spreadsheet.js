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



class ZtSpreadsheetWorkbook {


    constructor(sessionx) {
      this.sess = sessionx;
      this.wb_ztic = "";  // 20201124 workbook ztic
      this.wb_code = "";  // 20201124 workbook code
      this.wb_id   =  "";
      this.wb_parent_id = "";
      this.templ_desc = "";
      this.desc = "";
      this.label = "";
      this.link_AR = [];      // 20220521
      this.dim5_AR = [];
      this.dim4_AR = [];
      this.sheet_book_AR  = [];
      this.sheet_AR = [];
      this.column_AR = [];
      this.row_AR    = [];
      this.cell_AR   = [];
      this.displaySheet_AR  = [];
      this.displayColumn_AR = [];
      this.displayRow_AR    = [];
      this.displayCell_AR   = [];
      this.stat_val_obj_idx_AR = [];
  } // end of constructor



 setValuesFromInitialMessage() {
   var txx = 0;

}  // end of setValuesFromInitialMessage()


listSpreadsheetValues(sheet_idxx)  {
   //console.log(" ");
   //console.log("List of Spreadsheet Values");
   //console.log(" 20210104 this.displayRow_AR.length:    "+this.displayRow_AR.length);
   //console.log(" 20210104 this.displayColumn_AR.length: "+this.displayColumn_AR.length);
   for(var i = 0; i < this.displayRow_AR.length; i++){
         for(var j = 0; j < this.displayColumn_AR.length; j++){
            for(var k = 0; k < this.displayRow_AR[i].cell_idx_AR.length; k++){
                if(this.displayCell_AR[this.displayRow_AR[i].cell_idx_AR[k]].column_idx == j && this.displayCell_AR[this.displayRow_AR[i].cell_idx_AR[k]].row_idx == i){
                  // console.log(this.displayCell_AR[this.displayRow_AR[i].cell_idx_AR[k]].value);

                }  // endif
      
             } // endfor loop through row cell_idx_AR

         }  //endfor loop through displayColumn_AR

   } // endfor  loop through displayRow_AR

}  // end of listSpreadsheetValues



 
 generateDisplayValues(sheet_idxx)  {

  var HashMap = require('hashmap');
  var sheet_HM  = new HashMap(); 
  var column_HM = new HashMap();
  var row_HM    = new HashMap();
  var typeValueOEvalue_HM = new HashMap();


  var sheet_type_def_ztic;    
  var sheet_type_def_code;   
  var col_type_def_ztic;       
  var col_type_def_code;     
  var row_type_def_ztic;     
  var row_type_def_code;     


//console.log("**+ running generateDisplayValues in zt_client_spreadsheet");
var wb_wa = require('./zt_client_spreadsheet_workarea');

var spreadsheet_ztic = "";
for(var i = 0; i < this.sess.ZTICNS_AR.length; i++){
  //console.log("this.sess.ZTICNS_AR[i]: "+this.sess.ZTICNS_AR[i]);
     if(this.sess.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/spreadsheet"){
       spreadsheet_ztic = this.sess.ZTICNS_AR[i].code.toString().trim();
     } // endif
}



/// //   loop through sheets 
//console.log("20230901c this.sheet_AR.length: "+this.sheet_AR.length); 
for(var i = 0; i < this.sheet_AR.length; i++){
  //console.log("20230901d this.sheet_AR[i].sheetTypeZTIC - spreadsheet_ztic - this.sheet_AR[i].sheetTypeCode: "+this.sheet_AR[i].sheetTypeZTIC + " - "+ spreadsheet_ztic +" - "+ this.sheet_AR[i].sheetTypeCode)
  if(this.sheet_AR[i].sheetTypeZTIC == spreadsheet_ztic  && this.sheet_AR[i].sheetTypeCode == "10" ){   //  sheet type is for Statistical Values Dimension

    // 


    var sheet_dim_ztic = this.sheet_AR[i].sv_dimension_ztic;   
    var sheet_dim_code = this.sheet_AR[i].sv_dimension_code;    

    for(var n = 0; n < this.stat_val_obj_idx_AR.length; n++){

      for(var o = 0; o < this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR.length; o++){
        if(this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].sv_dimension_ztic == sheet_dim_ztic && this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].sv_dimension_code == sheet_dim_code){
          var type_def_idx = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].type_def_idx_for_summarization;
          sheet_type_def_ztic = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].typeDefinitionAndValue_AR[type_def_idx].type_def_ztic;
          sheet_type_def_code = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].typeDefinitionAndValue_AR[type_def_idx].type_def_code;
        }  // endif
      


      } // endfor loop through dimension_AR

      //console.log("20230901b this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR.length: "+this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR.length);
      for(var o = 0; o < this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR.length; o++){
        var stat_val = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR[o];


        for(var p = 0; p < stat_val.sv_typeDefAndValue_AR.length; p++){
          //console.log("20230831d stat_val.sv_typeDefAndValue_AR[p].type_def_ztic - sheet_type_def_ztic - stat_val.sv_typeDefAndValue_AR[p].type_def_code - sheet_type_def_code: "+stat_val.sv_typeDefAndValue_AR[p].type_def_ztic +" - "+ sheet_type_def_ztic +" - "+ stat_val.sv_typeDefAndValue_AR[p].type_def_code + " - " +sheet_type_def_code);
          if(stat_val.sv_typeDefAndValue_AR[p].type_def_ztic == sheet_type_def_ztic && stat_val.sv_typeDefAndValue_AR[p].type_def_code == sheet_type_def_code){
              // .. check if type val has been used before for a sheet, if not then add a new display sheet for the type val
                var sheet_key = stat_val.sv_typeDefAndValue_AR[p].type_def_ztic+"_"+stat_val.sv_typeDefAndValue_AR[p].type_def_code+"_"+stat_val.sv_typeDefAndValue_AR[p].type_val_ztic+"_"+stat_val.sv_typeDefAndValue_AR[p].type_val_code;
                if (!sheet_HM.has(sheet_key)){
                      var new_sheet = new wb_wa.DisplaySheet();
                      new_sheet.sheetTypeCode = "10";
                      new_sheet.label = stat_val.sv_typeDefAndValue_AR[p].type_val_label; 
                      new_sheet.sheetSortLevel  =  this.sheet_AR[i].sheetSortLevel; 
                      new_sheet.sortStr       = stat_val.sv_typeDefAndValue_AR[p].sortStr; 
                      new_sheet.sv_type_def_ztic = stat_val.sv_typeDefAndValue_AR[p].type_def_ztic;
                      new_sheet.sv_type_def_code = stat_val.sv_typeDefAndValue_AR[p].type_def_code;
                      new_sheet.sv_type_val_kind_ztic = stat_val.sv_typeDefAndValue_AR[p].type_val_kind_ztic;
                      new_sheet.sv_type_val_kind_code = stat_val.sv_typeDefAndValue_AR[p].type_val_kind_code;
                      new_sheet.sv_type_val_ztic = stat_val.sv_typeDefAndValue_AR[p].type_val_ztic;
                      new_sheet.sv_type_val_code = stat_val.sv_typeDefAndValue_AR[p].type_val_code;
                      this.displaySheet_AR.push(new_sheet);
                      sheet_HM.set(sheet_key,'x');
                } // endif

          }  // endif


        } // endfor loop through sv_typeDefAndValue_AR

      } // endfor loop through stat_value_AR  


    } // endfor loop through stat_val_obj_idx_AR


  } // endif  sheet type val code is 10



}  // endfor loop through sheets



//0.  loop through columns


//console.log("### 20210726 this.column_AR.length: "+this.column_AR.length);
for(var i = 0; i < this.column_AR.length; i++){
 // console.log("  ");
 // console.log("**+ 20210329 this.column_AR[i].colSortLevel: "+this.column_AR[i].colSortLevel);
  if(this.column_AR[i].colTypeZTIC == spreadsheet_ztic  && this.column_AR[i].colTypeCode == "1" ){   //  column type is Standard  20210429
     var new_col = new wb_wa.DisplayColumn();
     new_col.colTypeCode = "1";
     new_col.colSortLevel  =  this.column_AR[i].colSortLevel; 
     new_col.label = this.column_AR[i].label;              // 20210505
     new_col.desc  = this.column_AR[i].desc;               // 20210724
     new_col.column_ztic = this.column_AR[i].column_ztic;  // 20210505
     new_col.column_code = this.column_AR[i].column_code;  // 20210505
     new_col.sortStr     = this.column_AR[i].sortStr;      // 20220523
     //console.log("**+ 20240901c new_col.desc - new_col.label: "+new_col.desc+" - "+new_col.label);
     this.displayColumn_AR.push(new_col);
  }  // endif column is standard   end 20210429
  if(this.column_AR[i].colTypeZTIC == spreadsheet_ztic  && this.column_AR[i].colTypeCode == "2" ){   //  column type is Object Element
//     console.log("**+ 20210316c this.column_AR[i].colTypeZTIC - this.column_AR[i].colTypeCode: "+this.column_AR[i].colTypeZTIC+" - "+this.column_AR[i].colTypeCode);
     var new_col = new wb_wa.DisplayColumn();
     new_col.OE_ztic = this.column_AR[i].OE_ztic;
     new_col.OE_code = this.column_AR[i].OE_code;
     new_col.label = this.column_AR[i].label; 
     new_col.desc  = this.column_AR[i].desc;   // 20210724
     new_col.sortStr = this.column_AR[i].sortStr; // 20220523
     new_col.colTypeCode = "2";
     new_col.colSortLevel  =  this.column_AR[i].colSortLevel;  
    // console.log("**+ 20210316a new_col.desc - new_col.label: "+new_col.desc+" - "+new_col.label);
     this.displayColumn_AR.push(new_col);
  } // endif

if(this.column_AR[i].colTypeZTIC == spreadsheet_ztic  && this.column_AR[i].colTypeCode == "7" ){   //  column type is for DSI Namespace
  //     console.log("**+ 20210316c this.column_AR[i].colTypeZTIC - this.column_AR[i].colTypeCode: "+this.column_AR[i].colTypeZTIC+" - "+this.column_AR[i].colTypeCode);
       var new_col = new wb_wa.DisplayColumn();
       new_col.colTypeCode = "7";
       new_col.label = this.column_AR[i].label; 
       new_col.colSortLevel  =  this.column_AR[i].colSortLevel; 
       new_col.sortStr       =  this.column_AR[i].sortStr;   // 20220523 
      // console.log("**+ 20210316a new_col.desc - new_col.label: "+new_col.desc+" - "+new_col.label);
       this.displayColumn_AR.push(new_col);
    } // endif



  if(this.column_AR[i].colTypeZTIC == spreadsheet_ztic  && this.column_AR[i].colTypeCode == "9" ){   //  column type is for Object Code
//     console.log("**+ 20210316c this.column_AR[i].colTypeZTIC - this.column_AR[i].colTypeCode: "+this.column_AR[i].colTypeZTIC+" - "+this.column_AR[i].colTypeCode);
     var new_col = new wb_wa.DisplayColumn();
     new_col.colTypeCode = "9";
     new_col.label = this.column_AR[i].label; 
     new_col.colSortLevel  =  this.column_AR[i].colSortLevel; 
     new_col.sortStr       =  this.column_AR[i].sortStr;   // 20220523 
    // console.log("**+ 20210316a new_col.desc - new_col.label: "+new_col.desc+" - "+new_col.label);
     this.displayColumn_AR.push(new_col);
  } // endif

// start 20231002
  if(this.column_AR[i].colTypeZTIC == spreadsheet_ztic  && this.column_AR[i].colTypeCode == "11" ){   //  column type is for Object Element of a type value
    //     console.log("**+ 20210316c this.column_AR[i].colTypeZTIC - this.column_AR[i].colTypeCode: "+this.column_AR[i].colTypeZTIC+" - "+this.column_AR[i].colTypeCode);
         var new_col = new wb_wa.DisplayColumn();
         new_col.OE_ztic = this.column_AR[i].OE_ztic;
         new_col.OE_code = this.column_AR[i].OE_code;
         new_col.label = this.column_AR[i].label; 
         new_col.desc  = this.column_AR[i].desc;   // 20210724
         new_col.sortStr = this.column_AR[i].sortStr; // 20220523
         new_col.colGenSetZTIC = this.column_AR[i].colGenSetZTIC;  // 20231004
         new_col.colGenSetCode = this.column_AR[i].colGenSetCode;  // 20231004
         new_col.colTypeDefZTIC = this.column_AR[i].colTypeDefZTIC;  // 20231002
         new_col.colTypeDefCode = this.column_AR[i].colTypeDefCode;  // 20231002
         new_col.colTypeCode = "11";
         new_col.colSortLevel  =  this.column_AR[i].colSortLevel;  
        // console.log("**+ 20210316a new_col.desc - new_col.label: "+new_col.desc+" - "+new_col.label);
         this.displayColumn_AR.push(new_col);
      } // endif
    



   if(this.column_AR[i].colTypeZTIC == spreadsheet_ztic  && this.column_AR[i].colTypeCode == "14" ){   //  column type is for Date based on type value code and namespace
      //  example namespace format  ZTIC 5    zinfinitree.com/time_gregorian_2020s_tz_est
      var new_col = new wb_wa.DisplayColumn();
      new_col.label = this.column_AR[i].label; 
      new_col.desc  = this.column_AR[i].desc;   // 20210724
      new_col.sortStr = this.column_AR[i].sortStr; // 20220523
      new_col.colTypeDefZTIC = this.column_AR[i].colTypeDefZTIC;  // 20231002
      new_col.colTypeDefCode = this.column_AR[i].colTypeDefCode;  // 20231002
      new_col.colTypeCode = "14";
      new_col.colSortLevel  =  this.column_AR[i].colSortLevel;  
   // console.log("**+ 20210316a new_col.desc - new_col.label: "+new_col.desc+" - "+new_col.label);
      this.displayColumn_AR.push(new_col);

   } // endif column type code is 14 for Date base on type value code and namespace



  //console.log("%20230828a this.column_AR[i].colTypeZTIC - spreadsheet_ztic - this.column_AR[i].colTypeCode: "+ this.column_AR[i].colTypeZTIC + " - " + spreadsheet_ztic + " - " + this.column_AR[i].colTypeCode);
  if(this.column_AR[i].colTypeZTIC == spreadsheet_ztic  && this.column_AR[i].colTypeCode == "10" ){   //  column type is for Statistical Values Dimension


    var col_dim_ztic = this.column_AR[i].sv_dimension_ztic;   
    var col_dim_code = this.column_AR[i].sv_dimension_code;    

    //console.log("%20230828b this.stat_val_obj_idx_AR.length: "+ this.stat_val_obj_idx_AR.length);
    for(var n = 0; n < this.stat_val_obj_idx_AR.length; n++){

      for(var o = 0; o < this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR.length; o++){
       // console.log("20230829b this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].sv_dimension_ztic - col_dim_ztic - this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].sv_dimension_code - col_dim_code: "+this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].sv_dimension_ztic +" - "+ col_dim_ztic +" - "+ this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].sv_dimension_code+" - "+ col_dim_code);
        if(this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].sv_dimension_ztic == col_dim_ztic && this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].sv_dimension_code == col_dim_code){
          var type_def_idx = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].type_def_idx_for_summarization;
        //  console.log("20230829d type_def_idx: "+type_def_idx);
          col_type_def_ztic = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].typeDefinitionAndValue_AR[type_def_idx].type_def_ztic;
          col_type_def_code = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].typeDefinitionAndValue_AR[type_def_idx].type_def_code;
        //  console.log("20230829e col_type_def_ztic - col_type_def_code: "+col_type_def_ztic + " - "+ col_type_def_code);
        }  // endif      


      } // endfor loop through dimension_AR

      //console.log("%20230828c this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR.length: "+this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR.length);
      for(var o = 0; o < this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR.length; o++){
        var stat_val = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR[o];
        // 20230910a
        //console.log("%20230828d stat_val.sv_typeDefAndValue_AR.length: "+stat_val.sv_typeDefAndValue_AR.length);
        for(var p = 0; p < stat_val.sv_typeDefAndValue_AR.length; p++){
        //  console.log("%20230828e stat_val.sv_typeDefAndValue_AR[p].type_def_ztic - col_type_def_ztic - stat_val.sv_typeDefAndValue_AR[p].type_def_code - col_type_def_code: "+stat_val.sv_typeDefAndValue_AR[p].type_def_ztic +" - "+ col_type_def_ztic +" - "+ stat_val.sv_typeDefAndValue_AR[p].type_def_code + " - "+ col_type_def_code);
          if(stat_val.sv_typeDefAndValue_AR[p].type_def_ztic == col_type_def_ztic && stat_val.sv_typeDefAndValue_AR[p].type_def_code == col_type_def_code){
              // .. check if type val has been used before for a column, if not then add a new display column for the type val
                var col_key = stat_val.sv_typeDefAndValue_AR[p].type_def_ztic+"_"+stat_val.sv_typeDefAndValue_AR[p].type_def_code+"_"+stat_val.sv_typeDefAndValue_AR[p].type_val_ztic+"_"+stat_val.sv_typeDefAndValue_AR[p].type_val_code;
             //   console.log("20230830a col_key - has(col_key): "+col_key+" - "+column_HM.has(col_key));
                if (!column_HM.has(col_key)){
                      var new_col = new wb_wa.DisplayColumn();
                      new_col.colTypeCode = "10";
                      //new_col.label = stat_val.sv_typeDefAndValue_AR[p].type_val_label;  (del) 20230905
                      new_col.label         = stat_val.sv_typeDefAndValue_AR[p].type_val_code;  // 20230905  
                      new_col.colSortLevel  =  this.column_AR[i].colSortLevel; 
                      new_col.sortStr       = stat_val.sv_typeDefAndValue_AR[p].sortStr; 
                      new_col.sv_type_def_ztic = stat_val.sv_typeDefAndValue_AR[p].type_def_ztic;
                      new_col.sv_type_def_code = stat_val.sv_typeDefAndValue_AR[p].type_def_code;
                     // console.log("20230830c new_col.sv_type_def_ztic - new_col.sv_type_def_code: "+ new_col.sv_type_def_ztic + " - "+ new_col.sv_type_def_code);
                      new_col.sv_type_val_kind_ztic = stat_val.sv_typeDefAndValue_AR[p].type_val_kind_ztic;
                      new_col.sv_type_val_kind_code = stat_val.sv_typeDefAndValue_AR[p].type_val_kind_code;
                      new_col.sv_type_val_ztic = stat_val.sv_typeDefAndValue_AR[p].type_val_ztic;
                      new_col.sv_type_val_code = stat_val.sv_typeDefAndValue_AR[p].type_val_code;
                      this.displayColumn_AR.push(new_col);
                      column_HM.set(col_key,'x');
                } // endif
                
          }  // endif


        } // endfor loop through sv_typeDefAndValue_AR

      } // endfor loop through stat_value_AR  
      //console.log("20230830b this.displayColumn_AR.length: "+this.displayColumn_AR.length);

    } // endfor loop through stat_val_obj_idx_AR


  } // endif  column type val code is 10



} // endfor loop through column_AR



for(var i = 0; i < this.displayColumn_AR.length; i++){
  // console.log("**+ 20210329 this.displayColumn_AR[i].colSortLevel: "+this.displayColumn_AR[i].colSortLevel);
  //    console.log("**+ 20220523 this.displayColumn_AR[i].sortStr: "+this.displayColumn_AR[i].sortStr);
} // endfor



var ss_ztic;
var base_ztic;
var sheet = new MaintainSheet();

for(var i = 0; i < this.sess.ZTICNS_AR.length; i++){
 // console.log("this.ZTICNS_AR[i]: "+this.sess.ZTICNS_AR[i]);
     if(this.sess.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/spreadsheet"){
       ss_ztic = this.sess.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


for(var i = 0; i < this.sess.ZTICNS_AR.length; i++){
 // console.log("this.sess.ZTICNS_AR[i]: "+this.sess.ZTICNS_AR[i]);
     if(this.sess.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
      base_ztic = this.sess.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


//0.  create a display column for each member of column_AR that is linked to a object element
for(var i = 0; i < this.column_AR.length; i++){ 
    for(var j = 0; j < this.column_AR[i].link_AR.length; j++){
  if(this.column_AR[i].link_AR[j].linkToKind_ztic == base_ztic && this.column_AR[i].link_AR[j].linkToKind_ztic == "3"){   // link to a object element  REVIST to base on link type
    this.column_AR[i].OE_ztic = this.column_AR[i].link_AR[j].linkToObj_ztic;
    this.column_AR[i].OE_code = this.column_AR[i].link_AR[j].linkToObj_code;
   } // endif
 }  //endfor
}  // endfor



      //1.  create a row that will hold column headings 

//console.log("% 20210102 this.row_AR.length: "+this.row_AR.length);

var col_idx;
var row_idx;
var set_idx;

//console.log("20240901a this.row_AR.length: "+this.row_AR.length);
for(var i = 0; i < this.row_AR.length; i++){
  if(this.row_AR[i].rowTypeZTIC == spreadsheet_ztic  && this.row_AR[i].rowTypeCode == "1" ){   // row type is Standard  20210429
     var new_row = new wb_wa.DisplayRow();
     new_row.row_ztic = this.row_AR[i].row_ztic;
     new_row.row_code = this.row_AR[i].row_code;
     new_row.rowTypeCode = "1";
     new_row.label =    this.row_AR[i].label;   //"test row label";
     new_row.desc  =    this.row_AR[i].desc; 
     //console.log("20240901b new_row.row_ztic - new_row.row_code - new_row.label: "+new_row.row_ztic + " - "+new_row.row_code+" - "+new_row.label);
     row_idx = this.displayRow_AR.push(new_row) -1;
  }  // endif row type is Standard   end 20210429


// REVISIT-- looks like set_idx is not used and this section up to end insert 20210328 could be removed

//1.  if row type is row generation via set
  if(this.row_AR[i].rowTypeZTIC == spreadsheet_ztic  && this.row_AR[i].rowTypeCode == "3" ){   // row type is generated rows based on set
//2.  find the set that matches the row
     //console.log("20210102 this.sess.objectSet_AR.length: "+this.sess.objectSet_AR.length);
     for(var j = 0; j < this.sess.objectSet_AR.length; j++){
       // console.log("% 20210102 finding set in zt_client_spreadsheet.generateDisplayValues");
       // console.log("% 20210102 this.sess.objectSet_AR[j].objSetMember_AR.length: "+ this.sess.objectSet_AR[j].objSetMember_AR.length);
       // console.log("% 20210102 this.sess.objectSet_AR[j].objSetZTIC: "+this.sess.objectSet_AR[j].objSetZTIC);
       // console.log("% 20210102 this.row_AR[i].rowGenSetZTIC:         "+this.row_AR[i].rowGenSetZTIC);
       // console.log("% 20210102 this.sess.objectSet_AR[j].objSetCode: "+this.sess.objectSet_AR[j].objSetCode);
       // console.log("% 20210102 this.row_AR[i].rowGenSetCode:         "+this.row_AR[i].rowGenSetCode);

        if(this.sess.objectSet_AR[j].objSetZTIC == this.row_AR[i].rowGenSetZTIC  && this.sess.objectSet_AR[j].objSetCode == this.row_AR[i].rowGenSetCode ){
           set_idx = j;
           break;
        } // endif
     } // endfor

   }  // endif  row type is generated rows based on set


//console.log("20231004 starting store type value object element values into hashmap this.sess.objectSet_AR.length: "+ this.sess.objectSet_AR.length);
  for(var k = 0; k < this.sess.objectSet_AR.length; k++){ 
     //console.log("20231004 this.displayColumn_AR.length: "+this.displayColumn_AR.length);
     for(var r = 0; r < this.displayColumn_AR.length; r++){
     //   console.log("this.sess.objectSet_AR[k].objSetZTIC - this.displayColumn_AR[r].colGenSetZTIC - this.sess.objectSet_AR[k].objSetCode - this.displayColumn_AR[r].colGenSetCode: "+this.sess.objectSet_AR[k].objSetZTIC + " - " + this.displayColumn_AR[r].colGenSetZTIC + " - " + this.sess.objectSet_AR[k].objSetCode +" - " + this.displayColumn_AR[r].colGenSetCode);
        if(this.sess.objectSet_AR[k].objSetZTIC  == this.displayColumn_AR[r].colGenSetZTIC && this.sess.objectSet_AR[k].objSetCode  == this.displayColumn_AR[r].colGenSetCode){
             for(var s = 0; s < this.sess.objectSet_AR[k].objSetMember_AR.length; s++){
                 for(var t = 0; t < this.sess.objectSet_AR[k].objSetMember_AR[s].OE_val_AR.length; t++){ 
                     if(this.displayColumn_AR[r].OE_ztic == this.sess.objectSet_AR[k].objSetMember_AR[s].OE_val_AR[t].OE_ztic && this.displayColumn_AR[r].OE_code == this.sess.objectSet_AR[k].objSetMember_AR[s].OE_val_AR[t].OE_code){              
                       var typeValKeyStr = this.displayColumn_AR[r].colTypeDefZTIC.toString().trim()+"_"+this.displayColumn_AR[r].colTypeDefCode.toString().trim()+"_"+this.sess.objectSet_AR[k].objSetMember_AR[s].objectZTIC.toString().trim()+"_"+this.sess.objectSet_AR[k].objSetMember_AR[s].objectCode.toString().trim()+"_"+this.displayColumn_AR[r].OE_ztic.toString().trim()+"_"+this.displayColumn_AR[r].OE_code.toString().trim();
                       typeValueOEvalue_HM.set(typeValKeyStr,this.sess.objectSet_AR[k].objSetMember_AR[s].OE_val_AR[t].OE_value);
                     //  console.log("20231004 typeValKeyStr - OE_value: "+typeValKeyStr + " - "+this.sess.objectSet_AR[k].objSetMember_AR[s].OE_val_AR[t].OE_value);
                     } // endif
                 }  // endfor loop through OE_val_AR
             }  // endfor loop through objSetMember_AR
         }  // endif  
        
    }  // endfor loop through displayColumn_AR
  }  //  endfor loop through objectSet_AR  




this.sortDisplayColumn_AR();   // 20240303 
  //2.  if row is linked to a set, get the members of the set
 
        for(var k = 0; k < this.sess.objectSet_AR.length; k++){       
        // console.log("% 20210102 this.row_AR[i].rowGenSetZTIC:      "+this.row_AR[i].rowGenSetZTIC);
        // console.log("% 20200102 this.sess.objectSet_AR[k].objSetZTIC: "+this.sess.objectSet_AR[k].objSetZTIC);
        // console.log("% 20200102 this.row_AR[i].rowGenSetCode:      "+this.row_AR[i].rowGenSetCode);
        // console.log("% 20200102 this.sess.objectSet_AR[k].objSetCode: "+this.sess.objectSet_AR[k].objSetCode);
         if(this.row_AR[i].rowGenSetZTIC == this.sess.objectSet_AR[k].objSetZTIC && this.row_AR[i].rowGenSetCode ==  this.sess.objectSet_AR[k].objSetCode )  {  // 20210108 
               for(var l = 0; l < this.sess.objectSet_AR[k].objSetMember_AR.length; l++){
                  var new_row = new wb_wa.DisplayRow();
   //3.  create a display row for each member of the set
                  row_idx = this.displayRow_AR.push(new_row) -1;
                  col_idx = this.getDisplayColumnIdxForColumnType("7");    // check if column is for displaying DSI namespace (column type 7)
                ////  //console.log("### 20210727 col_idx for col type 9: "+col_idx);
                ////  //console.log("**+ 20210327 this.displayColumn_AR[col_idx].colTypeCode: "+this.displayColumn_AR[col_idx].colTypeCode);
                  if(!(col_idx == null)){
              
                        //console.log("20241030a colTypeCode is 7");
                        var new_cell = new wb_wa.DisplayCell();
                        new_cell.row_idx = row_idx;
                        new_cell.column_idx = col_idx;
                        new_cell.value  = " "; 
                ////        //new_cell.value  = this.sess.objectSet_AR[k].objSetMember_AR[l].objectCode;
                        for(var m = 0; m < this.sess.ZTICNS_AR.length; m++){
                ////          //console.log("this.ZTICNS_AR[m]: "+this.sess.ZTICNS_AR[i]);
                             if(this.sess.ZTICNS_AR[m].code.toString().trim() == this.sess.objectSet_AR[k].objSetMember_AR[l].objectZTIC.toString().trim()){
                              new_cell.value = this.sess.ZTICNS_AR[m].namespace.toString().trim();
                             } // endif
                        } //endfor
                ////    //    console.log("**+ 20210327 this.sess.objectSet_AR[k].objSetMember_AR[l].objectZTIC: "+this.sess.objectSet_AR[k].objSetMember_AR[l].objectZTIC);
                ////    //    console.log("**+ 20210327 this.sess.objectSet_AR[k].objSetMember_AR[l].objectCode: "+this.sess.objectSet_AR[k].objSetMember_AR[l].objectCode);
                ////    //   console.log("**+ 20210327 new_cell.column_idx - new_cell.row_idx: "+new_cell.column_idx+" - "+new_cell.row_idx);
                        var cell_idx = this.displayCell_AR.push(new_cell) -1;
                        this.displayRow_AR[row_idx].cell_idx_AR.push(cell_idx);
                        this.displayColumn_AR[col_idx].cell_idx_AR.push(cell_idx);
                  }  // endif  (!col_idx == null){


//  start 20210326  if colTypeCode=="9" put object code as cell value
                  col_idx = this.getDisplayColumnIdxForColumnType("9");    // check if column is for displaying object code (column type 9)
                  //console.log("### 20210727 col_idx for col type 9: "+col_idx);
                  //console.log("**+ 20210327 this.displayColumn_AR[col_idx].colTypeCode: "+this.displayColumn_AR[col_idx].colTypeCode);
                  if(!(col_idx == null)){
                        var new_cell = new wb_wa.DisplayCell();
                        new_cell.row_idx = row_idx;
                        new_cell.column_idx = col_idx;
                        new_cell.value  = this.sess.objectSet_AR[k].objSetMember_AR[l].objectCode;
                    //    console.log("**+ 20210327 this.sess.objectSet_AR[k].objSetMember_AR[l].objectZTIC: "+this.sess.objectSet_AR[k].objSetMember_AR[l].objectZTIC);
                    //    console.log("**+ 20210327 this.sess.objectSet_AR[k].objSetMember_AR[l].objectCode: "+this.sess.objectSet_AR[k].objSetMember_AR[l].objectCode);
                    //   console.log("**+ 20210327 new_cell.column_idx - new_cell.row_idx: "+new_cell.column_idx+" - "+new_cell.row_idx);
                        //new_cell.value = "1234";
                        var cell_idx = this.displayCell_AR.push(new_cell) -1;
                        this.displayRow_AR[row_idx].cell_idx_AR.push(cell_idx);
                        this.displayColumn_AR[col_idx].cell_idx_AR.push(cell_idx);
                  }  // endif  (!col_idx == null){

                  col_idx = this.getDisplayColumnIdxForColumnType("14");    // check if column is for displaying date string based on type code and namespace (column type 14)
                  //console.log("### 20231023 col_idx for col type 14: "+col_idx);
                  //console.log("**+ 20231023 this.displayColumn_AR[col_idx].colTypeCode: "+this.displayColumn_AR[col_idx].colTypeCode);
                  if(!(col_idx == null)){
                     var new_cell = new wb_wa.DisplayCell();
                     new_cell.row_idx = row_idx;
                     new_cell.column_idx = col_idx;
                     //console.log("20231023a this.displayColumn_AR[col_idx].colTypeDefZTIC - this.displayColumn_AR[col_idx].colTypeDefCode: "+this.displayColumn_AR[col_idx].colTypeDefZTIC+" - "+this.displayColumn_AR[col_idx].colTypeDefCode);
                     new_cell.value  = this.getDateStringBasedOnTypeValue(this.sess.objectSet_AR[k].objSetMember_AR[l], this.displayColumn_AR[col_idx].colTypeDefZTIC, this.displayColumn_AR[col_idx].colTypeDefCode);
                     //    console.log("**+ 20231023 this.sess.objectSet_AR[k].objSetMember_AR[l].objectZTIC: "+this.sess.objectSet_AR[k].objSetMember_AR[l].objectZTIC);
                     //    console.log("**+ 20231023 this.sess.objectSet_AR[k].objSetMember_AR[l].objectCode: "+this.sess.objectSet_AR[k].objSetMember_AR[l].objectCode);
                     //    console.log("**+ 20231023 new_cell.column_idx - new_cell.row_idx: "+new_cell.column_idx+" - "+new_cell.row_idx);
                     //new_cell.value = "1234";
                     var cell_idx = this.displayCell_AR.push(new_cell) -1;
                     this.displayRow_AR[row_idx].cell_idx_AR.push(cell_idx);
                     this.displayColumn_AR[col_idx].cell_idx_AR.push(cell_idx);
                 }  // endif  (!col_idx == null){

      
                    for(var m = 0; m < this.sess.objectSet_AR[k].objSetMember_AR[l].OE_val_AR.length; m++){
                    col_idx = this.getDisplayColumnIdx(this.sess.objectSet_AR[k].objSetMember_AR[l].OE_val_AR[m].OE_ztic, this.sess.objectSet_AR[k].objSetMember_AR[l].OE_val_AR[m].OE_code);
                   //   console.log("**+ 20210328 col_idx: "+col_idx);
                      if(!(col_idx == null)){
                   //     console.log("**+ 20210328 this.displayColumn_AR[col_idx].colTypeCode: "+this.displayColumn_AR[col_idx].colTypeCode);
                   //     console.log("**+ 20210329 this.displayColumn_AR[col_idx].colSortLevel: "+this.displayColumn_AR[col_idx].colSortLevel);
                       }
                       if(!(col_idx == null) && (this.displayColumn_AR[col_idx].colTypeCode == "2")){  // (del) 20210328
       //4.  create cells that refer the rows and columns, use values from set
                          var new_cell = new wb_wa.DisplayCell();
                          new_cell.row_idx = row_idx;
                          new_cell.column_idx = col_idx;
                          new_cell.value  = this.sess.objectSet_AR[k].objSetMember_AR[l].OE_val_AR[m].OE_value;
                          var cell_idx = this.displayCell_AR.push(new_cell) -1;
                          this.displayRow_AR[row_idx].cell_idx_AR.push(cell_idx);
                          this.displayColumn_AR[col_idx].cell_idx_AR.push(cell_idx);
                   //       console.log("**+ 20210327 desc new_cell.column_idx - new_cell.row_idx: "+new_cell.column_idx+" - "+new_cell.row_idx);
                       }  // endif  (!col_idx == null){
                    }  // endfor loop through set member OE_val_AR


                    // start   add cells that are object elements of a type value of the row
                      for(var m = 0; m < this.sess.objectSet_AR[k].objSetMember_AR[l].typeVal_AR.length; m++){
                  
                        for(var r = 0; r < this.displayColumn_AR.length; r++){
                          if(this.displayColumn_AR[r].colTypeCode == "11"){     // 20231023
                           if(this.sess.objectSet_AR[k].objSetMember_AR[l].typeVal_AR[m].typeDef_ztic == this.displayColumn_AR[r].colTypeDefZTIC  &&  this.sess.objectSet_AR[k].objSetMember_AR[l].typeVal_AR[m].typeDef_code == this.displayColumn_AR[r].colTypeDefCode){  
                             var new_cell = new wb_wa.DisplayCell();
                             new_cell.row_idx = row_idx;
                             new_cell.column_idx = r;
                             var typeValOEKeyStr = this.sess.objectSet_AR[k].objSetMember_AR[l].typeVal_AR[m].typeDef_ztic.toString().trim() + "_" + this.sess.objectSet_AR[k].objSetMember_AR[l].typeVal_AR[m].typeDef_code.toString().trim() + "_" +this.sess.objectSet_AR[k].objSetMember_AR[l].typeVal_AR[m].typeVal_ztic.toString().trim() + "_" + this.sess.objectSet_AR[k].objSetMember_AR[l].typeVal_AR[m].typeVal_code.toString().trim() +"_"+this.displayColumn_AR[r].OE_ztic.toString().trim()+"_"+this.displayColumn_AR[r].OE_code.toString().trim();
                             new_cell.value = typeValueOEvalue_HM.get(typeValOEKeyStr);
                    //        // look up object element values of the relevant type value using a hash map built previously that has all these values derived from the set members of a type value
                            var cell_idx = this.displayCell_AR.push(new_cell) -1;
                            this.displayRow_AR[row_idx].cell_idx_AR.push(cell_idx);
                            this.displayColumn_AR[r].cell_idx_AR.push(cell_idx);
                           } // endif  type def is same as column type def
                          }  // endif colTypeCode = "11" (object element value from a type value)   20231023
                        } // end loop through this.displayColumn_AR
                      
                      } // endfor loop through typeVal_AR   
                    // end 20231001


               } // endfor loop through set members
           }  // endif                    
        }  // endfor loop through object sets



if(this.row_AR[i].rowTypeZTIC == spreadsheet_ztic  && this.row_AR[i].rowTypeCode == "10" ){   //  row type is for Statistical Values Dimension

  // 


  var row_dim_ztic = this.row_AR[i].sv_dimension_ztic;   
  var row_dim_code = this.row_AR[i].sv_dimension_code;    

  for(var n = 0; n < this.stat_val_obj_idx_AR.length; n++){
    //
    //this.sess.statisticalValuesObject_AR

    for(var o = 0; o < this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR.length; o++){
      if(this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].sv_dimension_ztic == row_dim_ztic && this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].sv_dimension_code == row_dim_code){
        var type_def_idx = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].type_def_idx_for_summarization;
        row_type_def_ztic = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].typeDefinitionAndValue_AR[type_def_idx].type_def_ztic;
        row_type_def_code = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].dimension_AR[o].typeDefinitionAndValue_AR[type_def_idx].type_def_code;
      }  // endif
    


    } // endfor loop through dimension_AR

    for(var o = 0; o < this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR.length; o++){
      var stat_val = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR[o];


      for(var p = 0; p < stat_val.sv_typeDefAndValue_AR.length; p++){
        if(stat_val.sv_typeDefAndValue_AR[p].type_def_ztic == row_type_def_ztic && stat_val.sv_typeDefAndValue_AR[p].type_def_code == row_type_def_code){
            // .. check if type val has been used before for a row, if not then add a new display row for the type val
              var row_key = stat_val.sv_typeDefAndValue_AR[p].type_def_ztic+"_"+stat_val.sv_typeDefAndValue_AR[p].type_def_code+"_"+stat_val.sv_typeDefAndValue_AR[p].type_val_ztic+"_"+stat_val.sv_typeDefAndValue_AR[p].type_val_code;
              if (!row_HM.has(row_key)){
                    var new_row = new wb_wa.DisplayRow();
                    new_row.colTypeCode = "10";
                    new_row.label = stat_val.sv_typeDefAndValue_AR[p].type_val_label; 
                    new_row.colSortLevel  =  this.row_AR[i].rowSortLevel; 
                    new_row.sortStr       = stat_val.sv_typeDefAndValue_AR[p].sortStr; 
                    new_row.sv_type_def_ztic = stat_val.sv_typeDefAndValue_AR[p].type_def_ztic;
                    new_row.sv_type_def_code = stat_val.sv_typeDefAndValue_AR[p].type_def_code;
                    new_row.sv_type_val_kind_ztic = stat_val.sv_typeDefAndValue_AR[p].type_val_kind_ztic;
                    new_row.sv_type_val_kind_code = stat_val.sv_typeDefAndValue_AR[p].type_val_kind_code;
                    new_row.sv_type_val_ztic = stat_val.sv_typeDefAndValue_AR[p].type_val_ztic;
                    new_row.sv_type_val_code = stat_val.sv_typeDefAndValue_AR[p].type_val_code;
                    this.displayRow_AR.push(new_row);
                    row_HM.set(row_key,'x');
              } // endif

        }  // endif


      } // endfor loop through sv_typeDefAndValue_AR

    } // endfor loop through stat_value_AR  


  } // endfor loop through stat_val_obj_idx_AR


} // endif  row type val code is 10


// end 20230813

}  // endfor loop through row_AR



 


var sheet_type_def_idx;
var col_type_def_idx;
var row_type_def_idx;
var disp_cell_idx;  // 20230831

for(var n = 0; n < this.stat_val_obj_idx_AR.length; n++){

    for(var o = 0; o < this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR.length; o++){
      var stat_val = this.sess.statisticalValuesObject_AR[this.stat_val_obj_idx_AR[n]].stat_value_AR[o];

      var new_disp_cell = new wb_wa.DisplayCell();
      disp_cell_idx = this.displayCell_AR.push(new_disp_cell) -1;
      this.displayCell_AR[disp_cell_idx].value = stat_val.statistical_value;   

      if(o == 0){
         for(var p = 0; p < stat_val.sv_typeDefAndValue_AR.length; p++){

           for(var q = 0; q < this.sheet_AR.length; q++){
              if(this.sheet_AR[q].sv_type_def_ztic == stat_val.sv_typeDefAndValue_AR[p].type_def_ztic  && this.sheet_AR[q].sv_type_def_code == stat_val.sv_typeDefAndValue_AR[p].type_def_code){
                 sheet_type_def_idx = p;
              }  // endif 
           }  // endfor loop through sheet_AR


           for(var q = 0; q < this.column_AR.length; q++){
           // console.log("20230829c this.column_AR[q].sv_type_def_ztic - stat_val.sv_typeDefAndValue_AR[p].type_def_ztic  - this.column_AR[q].sv_type_def_code - stat_val.sv_typeDefAndValue_AR[p].type_def_code: "+this.column_AR[q].sv_type_def_ztic +" - "+ stat_val.sv_typeDefAndValue_AR[p].type_def_ztic +" - "+ this.column_AR[q].sv_type_def_code + " - " + stat_val.sv_typeDefAndValue_AR[p].type_def_code)
            if(this.column_AR[q].sv_type_def_ztic == stat_val.sv_typeDefAndValue_AR[p].type_def_ztic  && this.column_AR[q].sv_type_def_code == stat_val.sv_typeDefAndValue_AR[p].type_def_code){
               col_type_def_idx = p;
            }  // endif 
           }  // endfor loop through column_AR

    
         for(var q = 0; q < this.row_AR.length; q++){
          if(this.row_AR[q].sv_type_def_ztic == stat_val.sv_typeDefAndValue_AR[p].type_def_ztic  && this.row_AR[q].sv_type_def_code == stat_val.sv_typeDefAndValue_AR[p].type_def_code){
             row_type_def_idx = p;
          }  // endif 
         }  // endfor loop through row_AR

          }  // endfor loop at sv_typeDefAndValue_AR
      }  // endif o == 0


      for(var q = 0; q <  this.displaySheet_AR.length; q++){

        if(this.displaySheet_AR[q].sv_type_def_ztic == stat_val.sv_typeDefAndValue_AR[sheet_type_def_idx].type_def_ztic && this.displaySheet_AR[q].sv_type_def_code == stat_val.sv_typeDefAndValue_AR[sheet_type_def_idx].type_def_code
          && this.displaySheet_AR[q].sv_type_val_ztic == stat_val.sv_typeDefAndValue_AR[sheet_type_def_idx].type_val_ztic && this.displaySheet_AR[q].sv_type_val_code == stat_val.sv_typeDefAndValue_AR[sheet_type_def_idx].type_val_code){
            this.displayCell_AR[disp_cell_idx].sheet_idx = q;
            this.displaySheet_AR[q].cell_idx_AR.push(disp_cell_idx);
            break;
        } // endif found sheet for cell     
      }  // endfor loop through displaySheet_AR  

      for(var q = 0; q <  this.displayColumn_AR.length; q++){
       // console.log("20230829a col_type_def_idx: "+col_type_def_idx);
        if(this.displayColumn_AR[q].sv_type_def_ztic == stat_val.sv_typeDefAndValue_AR[col_type_def_idx].type_def_ztic && this.displayColumn_AR[q].sv_type_def_code == stat_val.sv_typeDefAndValue_AR[col_type_def_idx].type_def_code
          && this.displayColumn_AR[q].sv_type_val_ztic == stat_val.sv_typeDefAndValue_AR[col_type_def_idx].type_val_ztic && this.displayColumn_AR[q].sv_type_val_code == stat_val.sv_typeDefAndValue_AR[col_type_def_idx].type_val_code){
         //   console.log("20230831 disp_cell_idx: "+disp_cell_idx);
            this.displayCell_AR[disp_cell_idx].column_idx = q;
            this.displayColumn_AR[q].cell_idx_AR.push(disp_cell_idx);
            break;
        } // endif found sheet for cell     
      }  // endfor loop through displayColumn_AR 

      for(var q = 0; q <  this.displayRow_AR.length; q++){
        
       // console.log("20230902h this.displayRow_AR[q].sv_type_def_ztic - stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_def_ztic - this.displayRow_AR[q].sv_type_def_code - stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_def_code: "+this.displayRow_AR[q].sv_type_def_ztic +" - "+ stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_def_ztic +" - "+ this.displayRow_AR[q].sv_type_def_code +" - "+ stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_def_code);
       // console.log("20230902i this.displayRow_AR[q].sv_type_val_ztic - stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_val_ztic - this.displayRow_AR[q].sv_type_val_code - stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_val_code: "+this.displayRow_AR[q].sv_type_val_ztic +" - "+ stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_val_ztic +" - "+ this.displayRow_AR[q].sv_type_val_code +" - "+ stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_val_code);
       // console.log("20230902j row_type_def_idx: "+row_type_def_idx);
        if(this.displayRow_AR[q].sv_type_def_ztic == stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_def_ztic && this.displayRow_AR[q].sv_type_def_code == stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_def_code
          && this.displayRow_AR[q].sv_type_val_ztic == stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_val_ztic && this.displayRow_AR[q].sv_type_val_code == stat_val.sv_typeDefAndValue_AR[row_type_def_idx].type_val_code){
            this.displayCell_AR[disp_cell_idx].row_idx = q;
            this.displayRow_AR[q].cell_idx_AR.push(disp_cell_idx);
            break;
        } // endif found sheet for cell     
      }  // endfor loop through displayRow_AR 


    } // endfor loop at stat_value_AR

}  // endfor loop at stat_val_obj_idx_AR

//console.log("20230828 this.displayCell_AR.length: "+ this.displayCell_AR.length);



//start list cell contents  (del) 20210108

//console.log("%%% 20230902a List of Spreadsheet Display Row Contents");
//console.log("%%% 20230902b this.displaySheet_AR.length:  "+this.displaySheet_AR.length);
//console.log("%%% 20230902c this.displayRow_AR.length:    "+this.displayRow_AR.length);
//console.log("%%% 20230902d this.displayColumn_AR.length: "+this.displayColumn_AR.length);
//console.log("%%% 20230902e this.displayCell_AR.length:   "+this.displayCell_AR.length);
///console.log("%%% 20210106 this.displayCell_AR[10].value: "+this.displayCell_AR[10].value);
for(var i = 0; i < this.displayRow_AR.length; i++){
  // console.log("%%% 20230902f this.displayRow_AR[i].cell_idx_AR.length: "+this.displayRow_AR[i].cell_idx_AR.length);
   for(var j = 0; j < this.displayRow_AR[i].cell_idx_AR.length; j++){
      // console.log("   this.displayRow_AR[i].cell_idx_AR[j]: "+this.displayRow_AR[i].cell_idx_AR[j]);
     //  console.log("   Cell Contents: "+this.displayCell_AR[this.displayRow_AR[i].cell_idx_AR[j]].value);
   } // endfor

}  // endfor loop through displayRow_AR



}  // end of  generateDisplayValues()  



addStatisticalValuesToSpreadsheetWorkbook(msgx){


}  // end of 


getDisplayColumnIdx(OE_zticx, OE_codex){
  var return_idx = null;
  for(var i = 0; i < this.displayColumn_AR.length; i++){ 
    if(this.displayColumn_AR[i].OE_ztic == OE_zticx && this.displayColumn_AR[i].OE_code == OE_codex){
      return_idx = i;
    } // endif
  } // endfor
  return return_idx;
}


getDisplayColumnIdxForColumnType(colTypex){
  var return_idx = null;
  for(var i = 0; i < this.displayColumn_AR.length; i++){ 
    if(this.displayColumn_AR[i].colTypeCode == colTypex){
      return_idx = i;
    } // endif
  } // endfor
  return return_idx;
}  // end of getDisplayColumnIdxForColumnType







sortDisplayColumn_AR(){

   this.displayColumn_AR.sort((a, b) => {
    return a.sortStr - b.sortStr;
});

}



sortDisplayRow_AR(){                        //   20210727 
 // A. set the sort string for the displayRows in displayRow_AR 
      // 1. take first displayRow and loop through the cells for that row
      // 2. find the column for each cell
      // 3. find the sortLevel for the column
      // 4. if the sortLevel is 2 (primary sort, only for now), then append the value of the cell to the sortString for the row
      // 5. go do step 1 for next row 
//console.log("   this.displayRow_AR.length in sortDisplayRow_AR: "+this.displayRow_AR.length);
for(var i = 0; i < this.displayRow_AR.length; i++){
  // console.log("**+ 20210330 sessx.workbook_AR[workbook_idxx].displayRow_AR[i].cell_idx_AR.length: "+this.displayRow_AR[i].cell_idx_AR.length);
   for(var j = 0; j < this.displayRow_AR[i].cell_idx_AR.length; j++){
     var disp_col_idx = this.displayCell_AR[this.displayRow_AR[i].cell_idx_AR[j]].column_idx;
     var disp_col     = this.displayColumn_AR[disp_col_idx];
    // console.log("**+ 20210330 disp_col_idx: "+disp_col_idx);
    // console.log("&&& 20210726 disp_col.colSortLevel: "+disp_col.colSortLevel);

   // console.log("&&& 20210727 cell values: "+ this.displayCell_AR[this.displayRow_AR[i].cell_idx_AR[j]].value);


     if(disp_col.colSortLevel == "2"){   /// TEMP 20210728  change back to 2  
       this.displayRow_AR[i].sortStr = this.displayCell_AR[this.displayRow_AR[i].cell_idx_AR[j]].value.toString().trim(); //                                TEMP 20210728
     }  // endif
   }  // endfor loop through this.displayRow_AR
}  // endfor loop through  this.displayRow_AR[i].cell_idx_AR


//console.log(" ");
//console.log("### 20210727 list sortStr for displayRow_AR");
//console.log("  this.displayRow_AR.length: "+this.displayRow_AR.length);
for(var i = 0; i < this.displayRow_AR.length; i++){

//  console.log("### 20210727 this.displayRow_AR[i].sortStr: "+this.displayRow_AR[i].sortStr);
} // endfor

 // B. sort the rows in displayRow_AR using custom sort function to sort based on row sortString

// start (del) 20210728
this.displayRow_AR.sort((a, b) => {
    return a.sortStr - b.sortStr;
});


}  // end of sortDisplayRow_AR


getDateStringBasedOnTypeValue(objSetMemberx, colTypeDefZTICx, colTypeDefCodex){

  var date_ns;
  var year_1st_3;
  var year;
  var month;
  var day;


  var returnDateStr;
  for(var i = 0; i < objSetMemberx.typeVal_AR.length; i++){

    //  zinfinitree.com/time_gregorian_2020s_tz_est

    if(objSetMemberx.typeVal_AR[i].typeDef_ztic == colTypeDefZTICx && objSetMemberx.typeVal_AR[i].typeDef_code == colTypeDefCodex ){

      for(var j = 0; j < this.sess.ZTICNS_AR.length; j++){
        //console.log("this.sess.ZTICNS_AR[j]: "+this.sess.ZTICNS_AR[j]);
           if(this.sess.ZTICNS_AR[j].code.toString().trim() == objSetMemberx.typeVal_AR[i].typeVal_ztic){
             date_ns = this.sess.ZTICNS_AR[j].namespace.toString().trim();
             //year_1st_3 = date_ns.substr(22, 3);   (del) 20250606
             year_1st_3 = date_ns.substr(31, 3);  // 20250606
           } // endif
      } //endfor

     // console.log("20231024b date_ns - year_1st_3: "+date_ns+ " - "+year_1st_3);

      year = year_1st_3 + objSetMemberx.typeVal_AR[i].typeVal_code.toString().substring(0,1);
      month = objSetMemberx.typeVal_AR[i].typeVal_code.toString().substring(1,3);
      day = objSetMemberx.typeVal_AR[i].typeVal_code.toString().substring(3,5);
      returnDateStr = month+"/"+day+"/"+year;
    }  // endif


  } // endfor  

  return returnDateStr;

}  // end of this.getDateStringBasedOnTypeValue()



getHtmlForTemplate_Spreadsheet(sessx, templ_zticx, templ_codex, maint_modex, sheet_idxx, body_onlyx){
 //console.log("= running getHtmlForTemplate_Spreadsheet");
var wb_wa = require('./zt_client_spreadsheet_workarea'); // 20210330
//console.log("= 20210109 maint_mode: "+maint_modex);
var ss_ztic;
var base_ztic;
var sheet = new MaintainSheet();

for(var i = 0; i < sessx.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+sessx.ZTICNS_AR[i]);
     if(sessx.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/spreadsheet"){
       ss_ztic = sessx.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


for(var i = 0; i < sessx.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+sessx.ZTICNS_AR[i]);
     if(sessx.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
      base_ztic = sessx.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor



var html_str = "";

 var template_found = false;
 var templ_idx = 999999;
 for(var i = 0; i < sessx.template_AR.length; i++){
    // console.log(" this.template_AR[i].templZTIC - this.template_AR[i].templCode: "+sessx.template_AR[i].templZTIC+" - "+sessx.template_AR[i].templCode);
    // console.log("templ_zticx - templ_codex: "+ templ_zticx+" - "+ templ_codex);
     if(sessx.template_AR[i].templZTIC == templ_zticx.toString().trim() && sessx.template_AR[i].templCode == templ_codex.toString().trim()){
       templ_idx = i;
       template_found = true;
       break;
     }
 } // endfor
 if(!template_found){
   console.log("ERROR: template not found in getHtmlForTemplate_Spreadsheet() in zt_client_spreadsheet.js ztic/code: "+templ_zticx+" / "+templ_codex );
 }


if(!(body_onlyx)){                      // 20210317

 html_str =  "<!DOCTYPE html><html><head>";                                   
 html_str = html_str + "<title>DS2 Spreadsheet</title>";
 html_str = html_str + "<script src='//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js\'>  </script>";
 html_str = html_str + "<script>  $(document).ready(function(){";
// html_str = html_str + "<H1>Spreadsheet: </H1>";


//console.log("20200612 this.template_AR[templ_idx].object_AR.length: "+sessx.template_AR[templ_idx].object_AR.length);
for(var j = 0; j < sessx.template_AR[templ_idx].object_AR.length; j++){
   for(var k = 0; k < sessx.template_AR[templ_idx].object_AR[j].OE_val_AR.length; k++){
      html_str = html_str +  " var "+ sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "; ";
   } //endfor
} // endfor


for(var i = 0; i < sessx.template_AR[templ_idx].childTempl_idx_AR.length; i++){
 for(var j = 0; j < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
   for(var k = 0; k < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
      html_str = html_str +  " var "+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "; ";
   } //endfor
  } // endfor
} // endfor


 var objxx = sessx.template_AR[templ_idx].object_AR[0];   // 20200608 - use first object for template  REVISIT
 html_str = html_str + " var OK_ztic = " + sessx.template_AR[templ_idx].objKindZTIC      + "; ";   
 html_str = html_str + " var OK_code = " + sessx.template_AR[templ_idx].objKindCode      + "; ";   
 html_str = html_str + " var obj_ztic = " + sessx.template_AR[templ_idx].object_AR[0].objZTIC      + "; ";    //   use first object for template  REVISIT
 html_str = html_str + " var obj_template_desc = '" + sessx.template_AR[templ_idx].templDesc.toString().trim()      + "'; ";     
 html_str = html_str + " var language = " + sessx.language.toString().trim()      + "; ";   // 20200506
 html_str = html_str + " var templ_idx = "+templ_idx +";";
 html_str = html_str + " var TargetNS = '"+  sessx.TargetNS.toString().trim() +"';";



 if(objxx.objCodeTemp.toString().trim() == ""){
  html_str = html_str + "var obj_code = '' ; ";   // 20200502
  }
  else {
 html_str = html_str + " var obj_code = " + objxx.objCodeTemp.toString().trim()      + "; ";   // 20200502
  }


 html_str = html_str + " $(\"#submit\").click(function(){";


for(var j = 0; j < sessx.template_AR[templ_idx].object_AR.length; j++){
   for(var k = 0; k < sessx.template_AR[templ_idx].object_AR[j].OE_val_AR.length; k++){
     var html_id_val_fld     = sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id.toString().trim();
     html_str = html_str +  html_id_val_fld + "=$('#" + html_id_val_fld  + "').val(); ";
   } //endfor
} // endfor

for(var i = 0; i < sessx.template_AR[templ_idx].childTempl_idx_AR.length; i++){
 for(var j = 0; j < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
   for(var k = 0; k < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
     var html_id_val_fld     = sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id.toString().trim();
     html_str = html_str +  html_id_val_fld + "=$('#" + html_id_val_fld  + "').val(); ";
   } //endfor
  } // endfor
} // endfor



  html_str = html_str + " function DsSession(){";
  html_str = html_str + "   this.id   = \" \" ;";
  html_str = html_str + "   this.zticNS_AR  = [];";
  html_str = html_str + "   this.language  = \" \"  ;";   
  html_str = html_str + "   this.top_templ_idx  = \" \"  ;";
  html_str = html_str + "   this.template_AR  = [];";
  html_str = html_str + "}";  // end of DsSession


  html_str = html_str + " function TemplateRec(){";
  html_str = html_str + "   this.parent_idx   = \" \" ;";
  html_str = html_str + "   this.templLevel  = \" \"  ;";
  html_str = html_str + "   this.templZTIC  = \" \"  ;";   
  html_str = html_str + "   this.templCode  = \" \"  ;";
  html_str = html_str + "   this.templDesc  = \" \"  ;";
  html_str = html_str + "   this.objKindZTIC  = \" \"  ;";
  html_str = html_str + "   this.objKindCode  = \" \"  ;";
  html_str = html_str + "   this.linkableObjectLinkType_ztic = \" \" ;";
  html_str = html_str + "   this.linkableObjectLinkType_code = \" \";";
  html_str = html_str + "   this.childTempl_idx_AR = [];";
  html_str = html_str + "   this.object_AR = [];";
  html_str = html_str + "   this.OE_def_AR = [];";
  html_str = html_str + "   this.typeDef_AR = [];";
  html_str = html_str + "   this.linkType_AR = [];";
  html_str = html_str + "}";  // end of TemplateRec


  html_str = html_str + " function ObjectRec(){";
  html_str = html_str + "   this.objZTIC      = \" \" ;";
  html_str = html_str + "   this.objCodeTemp  = \" \"  ;";
  html_str = html_str + "   this.objCodeAssigned  = \" \"  ;";   
  html_str = html_str + "   this.newCode   = false;";
  html_str = html_str + "   this.OE_val_AR  = [];";
  html_str = html_str + "   this.typeVal_AR = [];";
  html_str = html_str + "   this.link_AR    = [];";
  html_str = html_str + "}";  // end of ObjectRec

  html_str = html_str + " function ObjectElementDefinitionRec(){";
  html_str = html_str + "   this.OE_ztic      = \" \" ;";
  html_str = html_str + "   this.OE_code  = \" \"  ;";
  html_str = html_str + "   this.OE_desc  = \" \"  ;";   
  html_str = html_str + "   this.DE_ztic  = \" \"  ;";
  html_str = html_str + "   this.DE_code  = \" \"  ;";    
  html_str = html_str + "   this.html_label  = \" \"  ;";  
  html_str = html_str + "   this.html_input_val  = \" \"  ;";  
  html_str = html_str + "   this.html_size  = \" \"  ;";  
  html_str = html_str + "}";  // end of ObjectElementDefinitionRec

  html_str = html_str + " function ObjectElementValueRec(){";
  html_str = html_str + "   this.OE_ztic      = \" \" ;";
  html_str = html_str + "   this.OE_code  = \" \"  ;";
  html_str = html_str + "   this.OE_value  = \" \"  ;";   
  html_str = html_str + "   this.html_id  = \" \"  ;";  
  html_str = html_str + "   this.html_input_val  = \" \"  ;";  
  html_str = html_str + "}";  // end of ObjectElementValueRec


 html_str = html_str + " var sess1 = new DsSession();";
 html_str = html_str + " sess1.id = \""+ sessx.id +"\" ;";

 html_str = html_str + " sess1.language = '"     + sessx.language  + "';";
 html_str = html_str + " sess1.top_templ_idx = \""+ sessx.top_templ_idx +"\" ;";

html_str = html_str + " var templ_rec; ";
html_str = html_str + " var templ_idx; ";
html_str = html_str + " var obj_rec; ";
html_str = html_str + " var oe_val_rec; ";
html_str = html_str + " var child_templ_idx_var; ";
html_str = html_str + " var obj_idx_var; ";
html_str = html_str + " var oe_val_idx_var; ";


  html_str = html_str + " templ_rec = new TemplateRec(); ";
  html_str = html_str + " templ_rec.parent_idx   = \""+ sessx.template_AR[templ_idx].parent_idx +"\" ;";
  html_str = html_str + " templ_rec.templLevel  =  \""+ sessx.template_AR[templ_idx].templLevel +"\" ;";
  html_str = html_str + " templ_rec.templZTIC  =   \""+ sessx.template_AR[templ_idx].templZTIC  +"\" ;";   
  html_str = html_str + " templ_rec.templCode  =   \""+ sessx.template_AR[templ_idx].templCode  +"\" ;";
  html_str = html_str + " templ_rec.templDesc  =   \""+ sessx.template_AR[templ_idx].templDesc  +"\" ;";
  html_str = html_str + " templ_rec.objKindZTIC = \""+ sessx.template_AR[templ_idx].objKindZTIC +"\" ;";
  html_str = html_str + " templ_rec.objKindCode = \""+ sessx.template_AR[templ_idx].objKindCode +"\" ;";
  html_str = html_str + " templ_rec.linkableObjectLinkType_ztic = \""+ sessx.template_AR[templ_idx].linkableObjectLinkType_ztic + "\" ;";
  html_str = html_str + " templ_rec.linkableObjectLinkType_code = \""+ sessx.template_AR[templ_idx].linkableObjectLinkType_code + "\" ;";
  html_str = html_str + " templ_idx = sess1.template_AR.push(templ_rec) -1;";
  for(var j = 0; j < sessx.template_AR[templ_idx].object_AR.length; j++){
    html_str = html_str + " obj_rec = new ObjectRec(); ";
    //console.log("20200730 this.template_AR[i].object_AR[k].objZTIC: "+sessx.template_AR[i].object_AR[j].objZTIC);
    //console.log("20200730 this.template_AR[i].object_AR[k].objCodeTemp: "+sessx.template_AR[i].object_AR[j].objCodeTemp);
    html_str = html_str + " obj_rec.objZTIC      = \"" +sessx.template_AR[templ_idx].object_AR[j].objZTIC     + "\" ;";
    html_str = html_str + " obj_rec.objCodeTemp  = \"" +sessx.template_AR[templ_idx].object_AR[j].objCodeTemp + "\" ;";
    html_str = html_str + " obj_rec.objCodeAssigned  = \"" +sessx.template_AR[templ_idx].object_AR[j].objCodeAssigned + "\" ;"; 
    if(sessx.template_AR[templ_idx].object_AR[j].newCode){  
        html_str = html_str + " obj_rec.newCode   = true;";
        }
      else
        {
        html_str = html_str + " obj_rec.newCode   = false;";
     } // endif
    html_str = html_str + " obj_idx_var = sess1.template_AR[templ_idx].object_AR.push(obj_rec) -1;";
  
    for(var k = 0; k < sessx.template_AR[templ_idx].object_AR[j].OE_val_AR.length; k++){  // 20200617
      html_str = html_str + " oe_val_rec = new ObjectElementValueRec(); ";
      html_str = html_str + "  oe_val_rec.OE_ztic  = '" + sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_ztic.toString().trim() + "'; ";
      html_str = html_str + "  oe_val_rec.OE_code  = '" + sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_code.toString().trim() + "'; ";
      html_str = html_str + "  oe_val_rec.OE_value  = '" + sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_value.toString().trim() + "'; ";   
      html_str = html_str + "  oe_val_rec.html_id  = '" + sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "'; ";  
      html_str = html_str + "  oe_val_rec.html_input_val  = '" + sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val.toString().trim() + "'; ";
      html_str = html_str + "  oe_val_idx_var = sess1.template_AR[templ_idx].object_AR[obj_idx_var].OE_val_AR.push(oe_val_rec) -1;";
    }  //endfor  
  } // endfor



 for(var i = 0; i < sessx.template_AR[templ_idx].childTempl_idx_AR.length; i++){
    html_str = html_str + " templ_rec = new TemplateRec(); ";
    html_str = html_str + " templ_rec.parent_idx   = \""+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].parent_idx +"\" ;";
    html_str = html_str + " templ_rec.templLevel  =  \""+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].templLevel +"\" ;";
    html_str = html_str + " templ_rec.templZTIC  =   \""+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].templZTIC  +"\" ;";   
    html_str = html_str + " templ_rec.templCode  =   \""+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].templCode  +"\" ;";
    html_str = html_str + " templ_rec.templDesc  =   \""+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].templDesc  +"\" ;";
    html_str = html_str + " templ_rec.objKindZTIC =  \""+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].objKindZTIC +"\" ;";
    html_str = html_str + " templ_rec.objKindCode =  \""+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].objKindCode +"\" ;";
    html_str = html_str + " templ_rec.linkableObjectLinkType_ztic = \""+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_ztic + "\" ;";
    html_str = html_str + " templ_rec.linkableObjectLinkType_code = \""+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_code + "\" ;";
    html_str = html_str + " child_templ_idx_var = sess1.template_AR.push(templ_rec) -1;";
    html_str = html_str + " sess1.template_AR[templ_idx].childTempl_idx_AR.push(child_templ_idx_var);";
    //console.log("20200730 sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length: "+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length);
   for(var j = 0; j < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
     html_str = html_str + " obj_rec = new ObjectRec(); ";
     html_str = html_str + " obj_rec.objZTIC      = \"" +sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC     + "\" ;";
    // console.log("20200730 sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeTemp: "+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeTemp);
     html_str = html_str + " obj_rec.objCodeTemp  = \"" +sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeTemp + "\" ;";
     html_str = html_str + " obj_rec.objCodeAssigned  = \"" +sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned + "\" ;"; 
     if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].newCode){  
         html_str = html_str + " obj_rec.newCode   = true;";
         }
       else
         {
         html_str = html_str + " obj_rec.newCode   = false;";
      } // endif
       html_str = html_str + " obj_idx_var = sess1.template_AR[child_templ_idx_var].object_AR.push(obj_rec) -1;"; 
       for(var k = 0; k < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
       html_str = html_str + " oe_val_rec = new ObjectElementValueRec(); ";
       html_str = html_str + "  oe_val_rec.OE_ztic  = '" + sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic.toString().trim() + "'; ";
       html_str = html_str + "  oe_val_rec.OE_code  = '" + sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code.toString().trim() + "'; ";
      html_str = html_str + "  oe_val_rec.OE_value  = '" + sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_value.toString().trim() + "'; ";   
       html_str = html_str + "  oe_val_rec.html_id  = '" + sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "'; ";  
       html_str = html_str + "  oe_val_rec.html_input_val  = '" + sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val.toString().trim() + "'; ";
       html_str = html_str + "  oe_val_idx_var = sess1.template_AR[child_templ_idx_var].object_AR[obj_idx_var].OE_val_AR.push(oe_val_rec) -1;";
    }  //endfor  
  } // endfor
} // endfor


html_str = html_str + " for(var i = 0; i < sess1.template_AR.length; i++){";
for(var i = 0; i < sessx.template_AR.length; i++){
  html_str = html_str + " for(var j = 0; j < sess1.template_AR[i].object_AR.length; j++){"; 
  for(var j = 0; j < sessx.template_AR[i].object_AR.length; j++){
    html_str = html_str + " for(var k = 0; k < sess1.template_AR[i].object_AR[j].OE_val_AR.length; k++){"; 
    for(var k = 0; k < sessx.template_AR[i].object_AR[j].OE_val_AR.length; k++){
      // console.log("20200621 this.template_AR[i].object_AR[j].OE_val_AR[k].html_id: "+sessx.template_AR[i].object_AR[j].OE_val_AR[k].html_id);
       html_str = html_str + " if(sess1.template_AR[i].object_AR[j].OE_val_AR[k].html_id=='"+sessx.template_AR[i].object_AR[j].OE_val_AR[k].html_id + "'){";
       html_str = html_str + " sess1.template_AR[i].object_AR[j].OE_val_AR[k].html_input_val="+sessx.template_AR[i].object_AR[j].OE_val_AR[k].html_id+";} "; 
    }  //endfor 
    html_str = html_str + "} ";   // endfor 

  } // endfor
  html_str = html_str + "} ";   // endfor 
} // endfor

html_str = html_str + "} ";   // endfor


 html_str = html_str + " var OEscrnElem_AR = [];";  // 20200615
 html_str = html_str + " var OEscrnElem_ARs = JSON.stringify(OEscrnElem_AR); ";
 html_str = html_str + " var sess1_str = JSON.stringify(sess1); ";      //20200612


html_str = html_str + "var jqxhr = $.post('http://localhost:3000/zt/client/maintain_object_submit',{OK_ztic: OK_ztic, OK_code: OK_code, obj_ztic: obj_ztic, obj_code: obj_code, OEscrnElem_AR: OEscrnElem_ARs, obj_template_desc: obj_template_desc, language: language, session: sess1_str, templ_idx: templ_idx, TargetNS: TargetNS }, function(data){";     // 20200612


 html_str = html_str + "console.log(data); ";
       //open a new window popup
 html_str = html_str + "var newWindow = window.open('', '_self');";
       //write the data to the document of the newWindow
 html_str = html_str +  "newWindow.document.write(data);";
  //alert( "success" );
 html_str = html_str + "}) ";  


 html_str = html_str +       "}); ";  
 html_str = html_str +     "}); ";   
 html_str = html_str +   "</script>";

 html_str = html_str + "<style> table, th, td {  border: 1px solid black;   border-collapse: collapse; } </style>";  // 20200807

 html_str = html_str + "</head>";

 html_str = html_str + "<body>";

}  // endif if(!(body_onlyx)){


if(!(maint_modex == "display")){   // 20210315 

  this.templ_desc = "--"+sessx.template_AR[templ_idx].templDesc.toString().trim();  // 20200727
  //html_str = html_str +   "<h1>"+sessx.template_AR[templ_idx].templDesc.toString().trim() +"</h1>"; (del) 20200727
  html_str = html_str +   "<h1>"+this.templ_desc +"</h1>";                                                  // 20200727

  html_str = html_str +   "<br />";

}  // endif if(!(maint_modex == "display")){ 

 html_str = html_str + "<table>"


var size = 20;
var label = "test label ";
var html_labelx;
var html_sizex;
  for(var j = 0; j < sessx.template_AR[templ_idx].object_AR.length; j++){    
    for(var k = 0; k < sessx.template_AR[templ_idx].object_AR[j].OE_val_AR.length; k++){
    // console.log("20200614 this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id: "+ sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id);
  
        html_labelx = "";
        for(var l = 0; l < sessx.template_AR[templ_idx].OE_def_AR.length; l++){
          if(sessx.template_AR[templ_idx].OE_def_AR[l].OE_ztic == sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_ztic &&
             sessx.template_AR[templ_idx].OE_def_AR[l].OE_code == sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_code){
                html_labelx = sessx.template_AR[templ_idx].OE_def_AR[l].html_label;
                html_sizex  = sessx.template_AR[templ_idx].OE_def_AR[l].html_size;
          } // endif

        } //  endfor
      // end   
 
    
if(html_sizex < 80){
      if(!(maint_modex == "display")){  // 20210315
html_str = html_str + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXT\" id='"+ sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>";
      } // endif if(!(maint_modex == "display")){ // 20210315
    }
   else{
      if(!(maint_modex == "display")){  // 20210315
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>"+html_labelx+"</td></tr>";

html_str = html_str + "<tr><td><textarea name=\"comments\" id='"+ sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id+ "' cols='80' rows='20'  value='"+ sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"'" +">"+sessx.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"</textarea></td></tr>";
      } // endif if(!(maint_modex == "display")){  

}  // endif  


     }  //endfor 
  } // endfor



 html_str = html_str + "</table>";

 html_str = html_str + "<table>";
//console.log("20200617 this.template_AR[templ_idx].childTempl_idx_AR.length: "+sessx.template_AR[templ_idx].childTempl_idx_AR.length);
for(var i = 0; i < sessx.template_AR[templ_idx].childTempl_idx_AR.length; i++){
 // console.log("20200728 sessx.template_AR[templ_idx].templLevel: " + sessx.template_AR[templ_idx].templLevel);
     if(!(maint_modex == "display")){ // 20210315
       html_str = html_str + "<tr><td><h2>"+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].templDesc  +"</h2></td></tr>";   // 20200617
     } // endif if(!(maint_modex == "display")){
     for(var j = 0; j < sessx.template_AR[templ_idx].linkType_AR.length; j++){    // 20200618
        if( sessx.template_AR[templ_idx].linkType_AR[j].linkType_ztic == sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_ztic &&
            sessx.template_AR[templ_idx].linkType_AR[j].linkType_code == sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_code ) {
              if(!(maint_modex == "display")){  // 20210315
                 html_str = html_str + "<tr><td><h3>"+ sessx.template_AR[templ_idx].linkType_AR[j].linkType_desc  +"</h3></td></tr>";
              } // endif if(!(maint_modex == "display")){

        }  // endif
                                                                
     }  // endfor  // end 20200618

   

 for(var j = 0; j < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
    if(!(maint_modex == "display")){  // 20210315
      html_str = html_str + "<tr><td>===== Code: "+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned+"</td></tr>";
    } // endif if(!(maint_modex == "display")){ 20210315
   for(var k = 0; k < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){

        html_labelx = "";
        for(var l = 0; l < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR.length; l++){
          if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].OE_ztic == sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic &&
             sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].OE_code == sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code){
                html_labelx = sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].html_label;
                html_sizex  = sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].html_size;
          } // endif
    
       } //  endfor

if(html_sizex < 80){
      if(!(maint_modex == "display")){  // 20210315
html_str = html_str + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXT\" id='"+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>";
       } // endif if(!(maint_modex == "display")){
     }
   else{
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>   </td></tr>";
      if(!(maint_modex == "display")){  // 20210315
html_str = html_str + "<tr><td>"+html_labelx+"</td></tr>";

html_str = html_str + "<tr><td><textarea name=\"comments\" id='"+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' cols='80' rows='20'  value='"+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +">"+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"</textarea></td></tr>";
      } // endif if(!(maint_modex == "display")){ 20210315
}  // endif  20200516
 

   } //endfor
  } // endfor
} // endfor
 html_str = html_str + "</table>";



//  begin of spreadsheet format

for(var i = 0; i < sessx.template_AR[templ_idx].childTempl_idx_AR.length; i++){
 // console.log("20200728 sessx.template_AR[templ_idx].templLevel: " + sessx.template_AR[templ_idx].templLevel);
     if(!(maint_modex == "display")){ // 20210315
       html_str = html_str + "<tr><td><h2>"+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].templDesc  +"</h2></td></tr>";   // 20200617
     }  // endif if(!(maint_modex == "display")){ 20210315
     for(var j = 0; j < sessx.template_AR[templ_idx].linkType_AR.length; j++){    // 20200618
        if( sessx.template_AR[templ_idx].linkType_AR[j].linkType_ztic == sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_ztic &&
            sessx.template_AR[templ_idx].linkType_AR[j].linkType_code == sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_code ) {
              if(!(maint_modex == "display")){    // 20210315
               html_str = html_str + "<tr><td><h3>"+ sessx.template_AR[templ_idx].linkType_AR[j].linkType_desc  +"</h3></td></tr>";
              } // endif if(!(maint_modex == "display")){    // 20210314

        }  // endif
                                                                
     }  // endfor  // end 20200618



   
// get column data
//console.log("**+ 20210315b ss_ztic: "+ss_ztic); 
 for(var j = 0; j < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
 // console.log("**+ 20210315c ss_ztic: "+ss_ztic); 
  if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].objKindZTIC == ss_ztic    && sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].objKindCode == "3"){     // object kind for columns

  var col = new wb_wa.MaintainColumn();
  var col_idx = this.column_AR.push(col) -1;   

   for(var k = 0; k < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){

   
      //  html_labelx = "";
        for(var l = 0; l < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR.length; l++){
          if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].OE_ztic == sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic &&
             sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].OE_code == sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code){


   if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic == ss_ztic &&
     sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code  == "6"){
       this.column_AR[col_idx].desc = sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val;
      // console.log("**+ 20210315d this.column_AR[col_idx].desc: "+this.column_AR[col_idx].desc);
    } // endif column desc OE_code == 6

 //  console.log("20200807c sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic - ss_ztic: "+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic+" - "+ss_ztic);
 //  console.log("20200807d sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code: "+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code);
 //  console.log("20200807e sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val: "+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val);

  // console.log(" ");
  // console.log("**+ 20210315 ss_ztic - sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic: "+ ss_ztic + " - "+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic);

   if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic == ss_ztic &&
     sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code  == "7"){
       this.column_AR[col_idx].label = sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val;
      // console.log("**+ 20220723a this.column_AR[col_idx].label: "+this.column_AR[col_idx].label);
       //this.column_AR[col_idx].label = "test col label";
    } // endif column label OE_code == 7

            
          } // endif
    
       } //  endfor

 if(html_sizex < 80){
//html_str = html_str + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXT\" id='"+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>";}
      }
   else{
 //html_str = html_str + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXTAREA\"  id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>"; 
//html_str = html_str + "<tr><td>   </td></tr>";
//html_str = html_str + "<tr><td>   </td></tr>";
//html_str = html_str + "<tr><td>"+html_labelx+"</td></tr>";

//html_str = html_str + "<tr><td><textarea name=\"comments\" id='"+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' cols='80' rows='20'  value='"+ sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +">"+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"</textarea></td></tr>";

}  // endif  20200516

   } //endfor
  } // endfor
 } // endif  it's template for columns



// get row data
 for(var j = 0; j < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
  //console.log("20200807b 
  if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].objKindZTIC == ss_ztic    && sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].objKindCode == "4"){     // object kind for rows

    this.getRowData(sessx, templ_idx, ss_ztic, i, j);


  } // endfor


 } // endif  it's template for rows




// get spreadsheet data
 for(var j = 0; j < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
  //console.log("20200807b 
  if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].objKindZTIC == ss_ztic    && sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].objKindCode == "2"){     // object kind for sheet

  var row = new wb_wa.MaintainRow();
  var row_idx = this.row_AR.push(row) -1;   

   for(var k = 0; k < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){

   
      //  html_labelx = "";
        for(var l = 0; l < sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR.length; l++){
          if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].OE_ztic == sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic &&
             sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].OE_code == sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code){

   if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic == ss_ztic &&
     sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code  == "4"){
       this.desc = sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val;
      // console.log("**+ 20210315f this.desc: "+this.desc);
    } // endif sheet desc OE_code == 4


 //  console.log("20200807c sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic - ss_ztic: "+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic+" - "+ss_ztic);
 //  console.log("20200807d sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code: "+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code);
 //  console.log("20200807e sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val: "+sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val);
   if(sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic == ss_ztic &&
     sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code  == "5"){
       this.label = sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val;
    //   console.log("**+ 20210315g this.label: "+this.label);
    } // endif sheet label OE_code == 5

     } // endif
    
    //     } // endif 20200728 if templLevel == 1
       } //  endfor



   } //endfor
  } // endfor
 } // endif  it's template for sheet

// end 20210316 add sheet data



} // endfor  loop though child templates




if(!(maint_modex == "display")){

 html_str = html_str + "<br />";
 html_str = html_str + "<table>";
 //html_str = html_str + "<tr><td><h3>Spreadsheet Format</h3></td></tr>";  //(del) 20230927


 html_str = html_str + "<tr>";
      html_str = html_str + "<td>";
      html_str = html_str + "Row Label";
      html_str = html_str + "</td>";
 // console.log("20200807a this.column_AR.length: "+this.column_AR.length);
  for(var j = 0; j < this.row_AR.length; j++){
   if(j == 0){
       for(var i = 0; i < this.column_AR.length; i++){
         html_str = html_str + "<td>";
         html_str = html_str + this.column_AR[i].label;
         html_str = html_str + "</td>";
       }  // endfor
      html_str = html_str + "</tr>";
    }  // endif j == 0
    html_str = html_str + "<tr>";
    html_str = html_str + "<td>";
    html_str = html_str + this.row_AR[j].label;
    html_str = html_str + "</td>";
    html_str = html_str + "</tr>";

  } // endfor loop through rows

html_str = html_str + "</table>";

}  // endif  not maint_modex == "display"



//console.log("= 20210107 maint_modex: "+maint_modex);
if(maint_modex == "display"){


 //console.log("**^ 20210701  sessx.workbook_AR.length: "+sessx.workbook_AR.length); 


  var workbook_idx;
  for(var i = 0; i < sessx.workbook_AR.length; i++){
   // console.log("20210723 sessx.workbook_AR[i].wb_ztic - this.wb_ztic - sessx.workbook_AR[i].wb_code - this.wb_code: "+sessx.workbook_AR[i].wb_ztic+" - "+this.wb_ztic+" - "+sessx.workbook_AR[i].wb_code+" - "+this.wb_code);
    if(sessx.workbook_AR[i].wb_ztic == this.wb_ztic && sessx.workbook_AR[i].wb_code == this.wb_code){ 
         workbook_idx = i;
    } // endif
  }
 if((workbook_idx == null || workbook_idx == undefined) && sessx.workbook_AR.length > 1 ){console.log("ERROR not workbook_idx found in zt_client_spreadsheet.js");}


 if(sessx.workbook_AR.length == 1){workbook_idx = 0;}
// html_str = html_str + "<br />";   (del) 20220804
 html_str = html_str + "<table>";
if(!(body_onlyx)){  // 20210706
 //html_str = html_str + "<tr><td><h2>Spreadsheet Format--Display Mode</h2></td></tr>";  (del) 20230927
}  // endif 20210706




  html_str = html_str + "<td><h3>     " + sessx.workbook_AR[workbook_idx].label + "</h3></td>";
   




// add column headings for display mode
for(var i = 0; i < this.column_AR.length; i++){
 // console.log("**+ 20210316b ss_ztic - this.column_AR[i].colTypeZTIC - this.column_AR[i].colTypeCode: "+ss_ztic+" - "+this.column_AR[i].colTypeZTIC+" - "+this.column_AR[i].colTypeCode);
  //if(this.column_AR[i].colTypeZTIC == ss_ztic  && this.column_AR[i].colTypeCode == "2" ){   //  column type is Object Element
     for(var h = 0; h < sessx.workbook_AR[workbook_idx].displayColumn_AR.length; h++){
 //      if(sessx.workbook_AR[workbook_idx].displayColumn_AR[h].OE_ztic == this.column_AR[i].OE_ztic && sessx.workbook_AR[workbook_idx].displayColumn_AR[h].OE_code == this.column_AR[i].OE_code){    (del) 20220731
        if(sessx.workbook_AR[workbook_idx].displayColumn_AR[h].label == this.column_AR[i].label){   // 20220731 TEST 

          sessx.workbook_AR[workbook_idx].displayColumn_AR[h].desc    = this.column_AR[i].desc;
          sessx.workbook_AR[workbook_idx].displayColumn_AR[h].label   = this.column_AR[i].label;
          //console.log("**+ 20220723b this.column_AR[i].label: "+this.column_AR[i].label);
          sessx.workbook_AR[workbook_idx].displayColumn_AR[h].sortStr = this.column_AR[i].sortStr;  // 20220523
          //console.log(" ");
          //console.log("**+ 20210329 this.column_AR[i].colSortLevel: "+this.column_AR[i].colSortLevel);
        }  // endif
     } // endfor
  //} // endif
} // endfor
// end add column headings for dispaly mode


sessx.workbook_AR[workbook_idx].sortDisplayRow_AR();    // 20210804  TEST



//console.log("### 20210728 displayRow_AR after sort");
for(var i = 0; i < this.displayRow_AR.length; i++){ 
   for(var j = 0; j < this.displayRow_AR[i].cell_idx_AR.length; j++){

  // console.log("### 20210728 this.displayRow_AR[i].cell_idx_AR[j]].value: "+this.displayCell_AR[this.displayRow_AR[i].cell_idx_AR[j]].value);

   }
}



//console.log("20240302c column labels:")
sessx.workbook_AR[workbook_idx].displayColumn_AR.forEach(column => {

  //console.log(" column.label: "+column.label);
});



html_str = html_str + "<tr>";    // 20210725
//console.log("20230908a sessx.workbook_AR[workbook_idx].displayColumn_AR.length: "+sessx.workbook_AR[workbook_idx].displayColumn_AR.length);
for(var h = 0; h < sessx.workbook_AR[workbook_idx].displayColumn_AR.length; h++){    // 20210314
html_str = html_str + "<td><h4>" + sessx.workbook_AR[workbook_idx].displayColumn_AR[h].label + "</h4></td>";   // 20210725
//console.log("**+ 20230907a sessx.workbook_AR[workbook_idx].displayColumn_AR[h].label: "+sessx.workbook_AR[workbook_idx].displayColumn_AR[h].label);
} // endfor loop through .displayColumn_AR.length   
html_str = html_str + "</tr>";  

// for(var i = 0; i < this.displayRow_AR.length; i++){   (del) 20210109
  for(var i = 0; i < sessx.workbook_AR[workbook_idx].displayRow_AR.length; i++){      // 20210109
     html_str = html_str + "<tr>";
     for(var h = 0; h < sessx.workbook_AR[workbook_idx].displayColumn_AR.length; h++){  // 20230927
       for(var j = 0; j < sessx.workbook_AR[workbook_idx].displayRow_AR[i].cell_idx_AR.length; j++){
         if(sessx.workbook_AR[workbook_idx].displayCell_AR[sessx.workbook_AR[workbook_idx].displayRow_AR[i].cell_idx_AR[j]].column_idx == h){
          html_str = html_str + "<td>"+sessx.workbook_AR[workbook_idx].displayCell_AR[sessx.workbook_AR[workbook_idx].displayRow_AR[i].cell_idx_AR[j]].value+"</td>";
           //console.log("   this.displayRow_AR[i].cell_idx_AR[j]: "+this.displayRow_AR[i].cell_idx_AR[j]);
           //console.log("   Cell Contents: "+this.displayCell_AR[this.displayRow_AR[i].cell_idx_AR[j]].value);
         }  // endif
       } // endfor  loop through cells
 
     } /// endfor loop through displayColumn_AR  // 20230927 
   html_str = html_str + "</tr>";
   }  // endfor loop through row_AR


 html_str = html_str + "</table>";

} // endif maint_modex == "display"


//  end of spreadsheet format

if(!(body_onlyx)){    // 20210706


 html_str = html_str + "</body>";


html_str = html_str + "</html>";

} // endif if(!(body_onlyx)){

 //console.log("20200129 html_str in zt_client_spreadsheet: " + html_str);

//console.log("template desc list in zt_client_session getHtmlForTemplate()");
for(var i = 0; i < sessx.template_AR.length; i++){
// console.log(sessx.template_AR[i].templDesc);
} //endfor



return html_str;


}  // end of method



getRowData(sessx, templ_idx, ss_ztic, i, j) {
  var wb_wa = require('./zt_client_spreadsheet_workarea');
  var row = new wb_wa.MaintainRow();
  var row_idx = this.row_AR.push(row) -1;   
const template = sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]];
const object = sessx.template_AR[sessx.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j];
object.OE_val_AR.forEach((OE_val) => {
    template.OE_def_AR.forEach((OE_def) => {
        if (OE_def.OE_ztic === OE_val.OE_ztic && OE_def.OE_code === OE_val.OE_code) {
            if (OE_val.OE_ztic === ss_ztic && OE_val.OE_code === "8") {
                this.row_AR[row_idx].desc = OE_val.html_input_val;
            }

            if (OE_val.OE_ztic === ss_ztic && OE_val.OE_code === "9") {
                this.row_AR[row_idx].label = OE_val.html_input_val;
            }
        }
    });
});

}  // end of method addRowData



} // end of class DsSpreadsheet



function Dimension5( ) {
   this.desc  = "";
   this.label = "";
   this.dim5_idx_AR   = [];
   this.hidden_dim4_idx_AR  = [];

 } // end of function BookCase


function Dimension4( ) {
   this.dim5_idx  = "";
   this.desc  = "";
   this.label = "";
   this.dim3_idx_AR        = [];
   this.hidden_dim3_idx_AR  = [];

 
 } // end of function BookShelf



function Dimension3( ) {
   this.dim5_idx  = "";
   this.dim4_idx = "";
   this.desc  = "";
   this.label = "";
   this.sheet_idx_AR = [];
   this.hidden_sheet_idx_AR  = [];

 } // end of function Book







function MaintainSheet(zticx, codex ) {
   this.sheet_ztic = zticx;
   this.sheet_code = codex;
   this.dim5_idx  = "";
   this.dim4_idx = "";
   this.dim3_idx  = "";
   this.desc  = "";
   this.label = "";
   this.cell_idx_AR  = [];
   this.hidden_col_idx_AR  = [];
   this.hidden_row_idx_AR  = [];


 } // end of function MaintainSheet







function TypeValueRec(){
   this.typeDef_ztic = "";
   this.typeDef_code = "";
   this.typeVal_ztic = "";
   this.typeVal_code = "";
   this.ztic_html_id     = "";
   this.ztic_html_input_val = "";
   this.ztic_ns_html_input_val = "";
   this.code_html_id     = "";
   this.code_html_input_val = "";
}

function LinkRec(){
   this.linkType_ztic = "";
   this.linkType_code = ""; 
   this.linkToKind_ztic = "";
   this.linkToKind_code = "";
   this.linkToObj_ztic  = "";
   this.linkToObj_code  = "";
   this.linkToObj_code_temp = "";   // 20200625
   this.linkStatus      = "";       // 20200712
   this.linkValue       = "";

}


module.exports = ZtSpreadsheetWorkbook;
