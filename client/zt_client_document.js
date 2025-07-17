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




class ZtDocument {


    constructor(sessx) {
      this.sess = sessx;
      this.doc_desc = "";
      this.desc = "";

   this.doc_ztic    = "";
   this.doc_code    = "";
   this.id          = "";
   this.parentId   = "";
   this.title       = "";
  // this.desc        = "";
   this.docElem_AR  = [];
     

  
 
    
  } // end of constructor



 setValuesFromInitialMessage() {
   var txx = 0;





}  // end of setValuesFromInitialMessage()



getHtmlForTemplate_DocumentDisplay(sessx, doc_idxx, maint_modex) {

  var fs = require('fs');    // 20240424

var base_ztic;
for(var i = 0; i < this.sess.ZTICNS_AR.length; i++){
     if(this.sess.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.sess.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


var document_ztic = "";
for(var i = 0; i < this.sess.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.sess.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/document"){
       document_ztic = this.sess.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


var spreadsheet_ztic = "";
for(var i = 0; i < this.sess.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.sess.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/spreadsheet"){
       spreadsheet_ztic = this.sess.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

var message_ztic = "";
for(var i = 0; i < this.sess.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.sess.ZTICNS_AR[i].namespace.toString().trim() == "131131/22"){
       message_ztic = this.sess.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

// start assign doc elem index of child to link

for(var s = 0; s < this.sess.document_AR[doc_idxx].docElem_AR.length; s++){
   for(var t = 0; t < this.sess.document_AR[doc_idxx].docElem_AR[s].childDocElem_idx_AR.length; t++){
        for(var u = 0; u < this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR.length; u++){


     if(this.sess.document_AR[doc_idxx].docElem_AR[this.sess.document_AR[doc_idxx].docElem_AR[s].childDocElem_idx_AR[t]].docElem_ztic == this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR[u].linkToZTIC && this.sess.document_AR[doc_idxx].docElem_AR[this.sess.document_AR[doc_idxx].docElem_AR[s].childDocElem_idx_AR[t]].docElem_code == this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR[u].linkToCode){

       this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR[u].docElemIdx = this.sess.document_AR[doc_idxx].docElem_AR[s].childDocElem_idx_AR[t];

      } // endif
     } // endforloop through linkToDocElem_AR 
   }  // endfor loop through childDocElem_idx_AR
}  // endfor loop through docElem_AR


//console.log("^^* 20210731 start list of docElemIdx - linkValue");
for(var s = 0; s < this.sess.document_AR[doc_idxx].docElem_AR.length; s++){
  
  for(var u = 0; u < this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR.length; u++){

    //console.log("^^* 20210731  this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR[u].docElemIdx - linkValue: "+this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR[u].docElemIdx+" - "+this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR[u].linkValue);

  }  // endfor loop through linkToDocElem_AR   
  
}  // endfor loop through docElem_AR


for(var s = 0; s < this.sess.document_AR[doc_idxx].docElem_AR.length; s++){

    this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR.sort((a, b) => {
    return b.linkValue - a.linkValue;
});
 
}  // endfor loop through docElem_AR


//console.log("Sorted by linkValue");
for(var s = 0; s < this.sess.document_AR[doc_idxx].docElem_AR.length; s++){
    
  this.sess.document_AR[doc_idxx].docElem_AR[s].childDocElem_idx_AR = [];   // clear out childDocElem_idx_AR   ///DELETE TO TEST
  
  for(var u = 0; u < this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR.length; u++){

    //console.log("^^* 20210731  this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR[u].docElemIdx - linkValue: "+this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR[u].docElemIdx+" - "+this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR[u].linkValue);

    // reload childDocElem_idx_AR with sorted indexes
     this.sess.document_AR[doc_idxx].docElem_AR[s].childDocElem_idx_AR.push(this.sess.document_AR[doc_idxx].docElem_AR[s].linkToDocElem_AR[u].docElemIdx); //DELETE TO TEST

  }  // endfor loop through linkToDocElem_AR   
  
}  // endfor loop through docElem_AR



//  end assign doc elem index to link



 var html_str =  "<!DOCTYPE html><html><head>";                                   
 html_str = html_str + "<title>ZT Document Display</title>";
 html_str = html_str + "<script src='//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js\'>  </script>";
 html_str = html_str + "<script>  $(document).ready(function(){";


 html_str = html_str +   "</script>";
 html_str = html_str + "</head>";

 html_str = html_str + "<body>";
 html_str = html_str + "<h1> "+this.sess.document_AR[doc_idxx].title+"</h1>";     20220214
 html_str = html_str + "<h3> "+this.sess.document_AR[doc_idxx].desc+"</h3>";     20220214

html_str = html_str + "<br>";
html_str = html_str + "<br>";
//html_str = html_str + "<br>";
//html_str = html_str + "<br>";
//html_str = html_str + "<br>";
//html_str = html_str + "<br><br><br><br><br><br><br>";
 //  for(var r = 0; r < this.sess.document_AR.length; r++){


  // } // endfor

 html_str = html_str + "</body>";
 html_str = html_str + "</html>";

//1.  find out how many levels down are used in the document and create an array with an element for each level each element will contain the current index being worked on.
//2.  create a while loop and do until done, keep looping at template array
//3.  start with 0 levels down and list the object elements of the top object
//4.  go down a level and list the object elements of the first object that is a child of the top object
//5.  go down a level and list the object elements of the first object that is a child of the parent object
//6.  go up a level and list the next parent then list children of that parent
//7.  keep going up a level and incrementing whenever all the children of the previous parent are completely listed 


var docLevel_AR = [];
var max_levels_down = 0;
var max_levels_down_plus1 = 0;


for(var s = 0; s < this.sess.document_AR[doc_idxx].docElem_AR.length; s++){
  //console.log("DocElem_idx - parent_idx - text: "+ s+" - "+ this.sess.document_AR[doc_idxx].docElem_AR[s].parent_idx+" - "+this.sess.document_AR[doc_idxx].docElem_AR[s].text.substring(0,30));
  var childIdxStr = "";
  //console.log("childDocElem_idx_AR.length: "+this.sess.document_AR[doc_idxx].docElem_AR[s].childDocElem_idx_AR.length);
  for(var t = 0; t < this.sess.document_AR[doc_idxx].docElem_AR[s].childDocElem_idx_AR.length; t++){
    childIdxStr = childIdxStr + this.sess.document_AR[doc_idxx].docElem_AR[s].childDocElem_idx_AR[t] + "-";
  }
  //console.log("  childIdxStr: "+childIdxStr);
  if(this.sess.document_AR[doc_idxx].docElem_AR[s].levelsDown > max_levels_down){
    max_levels_down = this.sess.document_AR[doc_idxx].docElem_AR[s].levelsDown;
  }
} // endfor

max_levels_down_plus1 = max_levels_down + 1;



//console.log(" ^^^ max_levels_down_plus1: "+max_levels_down_plus1);
  for(var i = 0; i < max_levels_down_plus1; i++){
    var docLevelRec = new DocLevelRec();
    docLevel_AR.push(docLevelRec);
  } // endfor


var done = false;
var loop_cntr = 0;
var indentStr = "          ";
var docElemIdx = 0; 
var currentLevel = 0;                                
var doc_elem_parent_idx;
var doc_elem_grandparent_idx;
var grandparentChildDocElemIdx_AR_length;
var grandparentChildDocElem_idx_AR_idx;
var grandparentChildDocElem_idx_AR_idx_var
var open_tag = "";
var close_tag = "";
var heading_tag_level = 0;
var heading_level = 0;
var elem_title = "";
var elem_dsns = "";
var list_opened = false;      // 20210703
var list_item_opened = false; // 20210703

//console.log(" docLevel_AR.length: "+docLevel_AR.length);
while (!done){

  var childFound = false;
  var siblingFound = false;

   for(var i = 0; i < docLevel_AR.length; i++){
       //console.log("+++  Level i: "+i);
       //console.log("+++  loop_cntr: "+ loop_cntr);
       //console.log("+++  currentLevel: "+currentLevel);
       if(i == currentLevel){

          elem_dsns = "";
          for(var n = 0; n < this.sess.ZTICNS_AR.length; n++){
            if(this.sess.ZTICNS_AR[n].code.toString().trim() == this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].docElem_ztic){
              elem_dsns = this.sess.ZTICNS_AR[n].namespace.toString().trim();
            } // endif
          } //endfor

          elem_title = elem_dsns+" - "+this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].docElem_code;


          childFound = false;
          siblingFound = false;
          open_tag = "<p title=\""+elem_title+"\">";
          close_tag = "</p>";


          if(this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].typeZTIC == document_ztic && this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].typeCode == 1 ){   // heading
             if(currentLevel > heading_level){ heading_tag_level++}
             if(currentLevel < heading_level){ heading_tag_level--}
             heading_level = currentLevel;
             if(heading_tag_level == 1){  open_tag = "<h1 title=\""+elem_title+"\">";  close_tag = "</h1>"; }
             if(heading_tag_level == 2){  open_tag = "<h2 title=\""+elem_title+"\">";  close_tag = "</h2>"; }
             if(heading_tag_level == 3){  open_tag = "<h3 title=\""+elem_title+"\">";  close_tag = "</h3>"; }
             if(heading_tag_level == 4){  open_tag = "<h4 title=\""+elem_title+"\">";  close_tag = "</h4>"; }
            
             heading_level = currentLevel;
          } // endif 


          html_str = html_str + open_tag;

          if(docLevel_AR[i].docElem_idx != 0){


               doc_elem_parent_idx = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].parent_idx;
               if(this.sess.document_AR[doc_idxx].docElem_AR[doc_elem_parent_idx].typeZTIC == document_ztic && this.sess.document_AR[doc_idxx].docElem_AR[doc_elem_parent_idx].typeCode == 3){
                    html_str = html_str + "<li>";
                    list_item_opened = true;
                }
            


            html_str = html_str + this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].text;

            

              if(list_item_opened){html_str = html_str + "</li>"; list_item_opened = false;}
             
                 if(this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].typeZTIC == document_ztic && this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].typeCode == 3 ){   // ordered list
                      html_str = html_str + "<ol type='1'>";
                      list_opened = true;
                  } // endif


//  start display linked spreadsheet
         //console.log("**^ 20210701 this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedSpreadsheet_AR.length: "+this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedSpreadsheet_AR.length);
            for(var q = 0; q < this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedSpreadsheet_AR.length; q++){
               //var new_sprd_sht_workbook = new (require('./zt_client_spreadsheet'))(this.sess);   (del) 20210728
               var wb_templ_ztic = spreadsheet_ztic;

               var wb_idx = null;
               for(var r = 0; r < this.sess.workbook_AR.length; r++){
                   var linked_wb_ztic = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedSpreadsheet_AR[q].ssht_ztic;
                   var linked_wb_code = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedSpreadsheet_AR[q].ssht_code;
                   if(this.sess.workbook_AR[r].wb_ztic == linked_wb_ztic && this.sess.workbook_AR[r].wb_code == linked_wb_code){
                     wb_idx = r;
                    
                   }  // endif
               }  // endfor loop through linkedSpreadsheet_AR



               //var wb_templ_ztic = "5";   // TEMP TEST REVISIT
               var wb_templ_code = "1";  
             //  console.log("**^ 20210701 new_sprd_sht_workbook.wb_ztic - new_sprd_sht_workbook.wb_code: "+new_sprd_sht_workbook.wb_ztic+" - "+new_sprd_sht_workbook.wb_code);
               var sheet_idx = 0;    // TEMP -- REVISIT
               var body_only = true;
          // html_str = html_str + new_sprd_sht_workbook.getHtmlForTemplate_Spreadsheet(this.sess, wb_templ_ztic, wb_templ_code, maint_modex, sheet_idx, body_only) (del) 20210728
               if(!(wb_idx == null)){
                html_str = html_str + this.sess.workbook_AR[wb_idx].getHtmlForTemplate_Spreadsheet(this.sess, wb_templ_ztic, wb_templ_code, maint_modex, sheet_idx, body_only)
                  } else {
                 console.log("ERROR in zt_client_document -- spreadsheet workbook not found");
               }  // endif

              // new_sprd_sht_workbook.wb_id       = objx.id;
              // new_sprd_sht_workbook.wb_parent_id = objx.parentId;
            }  // endfor
//  end display linked spreadsheet

//  start display of linked multi-media object (graphic)
   // console.log("%%% 20210714 this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMultiMediaObject_AR.length: "+this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMultiMediaObject_AR.length);
            for(var q = 0; q < this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMultiMediaObject_AR.length; q++){
//    console.log("%%% 20210714 this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMultiMediaObject_AR[q].resource_idx_AR.length: "+this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMultiMediaObject_AR[q].resource_idx_AR.length);  

               var mmo_idxx = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMultiMediaObject_AR[q].mmo_idx;
               // for( var r = 0; r < this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMultiMediaObject_AR[q].resource_idx_AR.length; r++){
               var mmo_desc =       this.sess.multiMediaObject_AR[mmo_idxx].desc.toString().trim();
               var mmo_html_width = this.sess.multiMediaObject_AR[mmo_idxx].html_width.toString().trim(); 
               var mmo_html_height = this.sess.multiMediaObject_AR[mmo_idxx].html_height.toString().trim();
               for(var r = 0; r < this.sess.multiMediaObject_AR[mmo_idxx].resource_idx_AR.length; r++){
                   
                   var resource_idx = this.sess.multiMediaObject_AR[mmo_idxx].resource_idx_AR[r]; 
                   var path_name = this.sess.resource_AR[resource_idx].path_name;  
                                
                   //html_str = html_str + "<p>path_name:"    + path_name +  "</p>";
                   var path_name_lang_dep =  this.sess.resource_AR[resource_idx].path_name_lang_dep.toString().trim();
                   let position = path_name_lang_dep.search("/html/");
                   if(position < 0){    // 20240425
                     html_str = html_str + "<br><img src='"+path_name_lang_dep +"' alt='"+mmo_desc+"' width='"+mmo_html_width+"' height='"+mmo_html_height+"'>";
                     // start 20240425
                    } else {

                      const file_path = __dirname + "/images"+path_name_lang_dep;  
                      html_str  = html_str + fs.readFileSync(file_path);

                    }// endif position < 0
                    // end 20240425
                } //endfor
            }  // endfor

//  end display of linked multi-media object (graphic)

//  start display of message definition

        // console.log("**^ 20210701 this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMessageDefinition_AR.length: "+this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMessageDefinition_AR.length);
            for(var q = 0; q < this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMessageDefinition_AR.length; q++){
           
               var msg_def_templ_ztic = message_ztic;

               var msg_def_idx = null;
              // console.log("20210809 this.sess.messageDefinition_AR.length: "+this.sess.messageDefinition_AR.length);
               for(var r = 0; r < this.sess.messageDefinition_AR.length; r++){
                //   console.log("q: "+q);
                //   console.log("docLevel_AR[i].docElem_idx]: "+docLevel_AR[i].docElem_idx);
                   var linked_msg_def_ztic = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMessageDefinition_AR[q].msg_def_ztic;
                   var linked_msg_def_code = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].linkedMessageDefinition_AR[q].msg_def_code;
           //  console.log("this.sess.messageDefinition_AR[r].msg_def_ztic - linked_msg_def_ztic - this.sess.messageDefinition_AR[r].msg_def_code - linked_msg_def_code: " +this.sess.messageDefinition_AR[r].ztic+" - "+ linked_msg_def_ztic+" - "+this.sess.messageDefinition_AR[r].code+" - "+linked_msg_def_code);
                   if(this.sess.messageDefinition_AR[r].ztic == linked_msg_def_ztic && this.sess.messageDefinition_AR[r].code == linked_msg_def_code){
                     msg_def_idx = r;
                    
                   }  // endif
               }  // endfor loop through messageDefinition_AR


               var msg_def_templ_code = "1";  
               
               var body_only = true;
      
               if(!(msg_def_idx == null)){
                html_str = html_str + this.sess.messageDefinition_AR[msg_def_idx].getHtmlForTemplate_MessageDefinitionDisplay(this.sess, msg_def_idx, maint_modex, msg_def_templ_ztic, msg_def_templ_code, body_only)
                  } else {
                 console.log("ERROR in zt_client_document -- message definition not found");
               }  // endif
   
            }  // endfor

//  end display of message definition



          } // endif
         // console.log("this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].text: "+this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].text);
          html_str = html_str + close_tag;
          //console.log("html_str: "+html_str);
          var parent_level = i - 1;                                                       // 20210124
          if(i != 0){                            
               docLevel_AR[parent_level].childDocElem_idx_AR_idx++;
          } // endif
          
         // console.log("currentLevel: "+currentLevel+" docLevel_AR[i].childDocElem_idx_AR_idx: "+docLevel_AR[i].childDocElem_idx_AR_idx);
          var childDocElemIdx_AR_length = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].childDocElem_idx_AR.length;
        
         // console.log("+++ 20210311 childDocElemIdx_AR_length - docLevel_AR[i].childDocElem_idx_AR_idx: "+childDocElemIdx_AR_length+" - "+docLevel_AR[i].childDocElem_idx_AR_idx);
          // *** if doc elem has unprocessed children
          if(docLevel_AR[i].childDocElem_idx_AR_idx < childDocElemIdx_AR_length){
 
              childFound = true;
              var next_level_down = i + 1;
              var childDocElem_idx_AR_idx_var = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].childDocElem_idx_AR[docLevel_AR[i].childDocElem_idx_AR_idx];
              // console.log("+++ 20210117 childDocElem_idx_AR_idx_var :"+ childDocElem_idx_AR_idx_var);
              //console.log("+++ 20210117 this.sess.document_AR[doc_idxx].docElem_AR[childDocElem_idx_AR_idx_var].text: "+this.sess.document_AR[doc_idxx].docElem_AR[childDocElem_idx_AR_idx_var].text );
              //docLevel_AR[next_level_down].docElem_idx = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].childDocElem_idx_AR[childDocElem_idx_AR_idx_var];
              docLevel_AR[next_level_down].docElem_idx = childDocElem_idx_AR_idx_var;  // 20210117
              currentLevel++;
             // docLevel_AR[i].childDocElem_idx_AR_idx++;
          
              continue;
              //console.log("html_str: "+ html_str);
          } // endif




               var one_level_up = i - 1;
               doc_elem_parent_idx = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].parent_idx;
               var siblingDocElemIdx_AR_length = this.sess.document_AR[doc_idxx].docElem_AR[doc_elem_parent_idx].childDocElem_idx_AR.length;
           
      //    var siblingDocElem_idx_AR_idx_var = this.sess.document_AR[doc_idxx].docElem_AR[doc_elem_parent_idx].childDocElem_idx_AR[docLevel_AR[i].childDocElem_idx_AR_idx]; //(del) 20210123
  var siblingDocElem_idx_AR_idx_var = this.sess.document_AR[doc_idxx].docElem_AR[doc_elem_parent_idx].childDocElem_idx_AR[docLevel_AR[one_level_up].childDocElem_idx_AR_idx]; // 20210123


          // *** if doc elem has unprocessed sibling
 
          if(i != 0 &&  docLevel_AR[one_level_up].childDocElem_idx_AR_idx < siblingDocElemIdx_AR_length ){  // (del) 20210123
          //if(i != 0 &&  docLevel_AR[i].childDocElem_idx_AR_idx < siblingDocElemIdx_AR_length ){               // 20210123

           // console.log("+++ 20210118 doc_elem_parent_idx:           "+doc_elem_parent_idx);
           // console.log("+++ 20210118 siblingDocElemIdx_AR_length:   "+siblingDocElemIdx_AR_length);
           // console.log("+++ 20210118 siblingDocElem_idx_AR_idx_var: "+siblingDocElem_idx_AR_idx_var);
         //   console.log("+++ 20210118 this.sess.document_AR[doc_idxx].docElem_AR[siblingDocElem_idx_AR_idx_var].text: "+this.sess.document_AR[doc_idxx].docElem_AR[siblingDocElem_idx_AR_idx_var].text);
             siblingFound = true;
             docLevel_AR[i].docElem_idx = siblingDocElem_idx_AR_idx_var;

             continue;

          }  // endif

//  start 20210703
          if(!(siblingFound)){
              if(list_opened){html_str = html_str + "</ol>"; list_opened = false;}
          }

//  end 20210703
          // *** if not child or sibling
         if(!(childFound || siblingFound)){
          
             var gp_level;  // grandparent level
             gp_level = i - 2;
             var    parent_level = i - 1;
             var docElemFound = false;
             var loop_cntr2 = 0;
             while(!docElemFound){
               if(gp_level < 0){done = true; break;}
               doc_elem_parent_idx = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[currentLevel].docElem_idx].parent_idx;
               doc_elem_grandparent_idx = this.sess.document_AR[doc_idxx].docElem_AR[doc_elem_parent_idx].parent_idx;
               grandparentChildDocElemIdx_AR_length = this.sess.document_AR[doc_idxx].docElem_AR[doc_elem_grandparent_idx].childDocElem_idx_AR.length;
               grandparentChildDocElem_idx_AR_idx  =  docLevel_AR[gp_level].childDocElem_idx_AR_idx; 
               grandparentChildDocElem_idx_AR_idx_var  = this.sess.document_AR[doc_idxx].docElem_AR[doc_elem_grandparent_idx].childDocElem_idx_AR[docLevel_AR[gp_level].childDocElem_idx_AR_idx];  


              // console.log("+++ 20210119 doc_elem_grandparent_idx:           "+doc_elem_grandparent_idx);
              // console.log("+++ 20210119 grandparentChildDocElemIdx_AR_length: "+grandparentChildDocElemIdx_AR_length);
              // console.log("+++ 20210119 grandparentChildDocElem_idx_AR_idx:     "+grandparentChildDocElem_idx_AR_idx);

              // console.log("+++ 20210119 grandparentChildDocElem_idx_AR_idx_var: "+grandparentChildDocElem_idx_AR_idx_var);
/////          //console.log("+++ 20210119 this.sess.document_AR[doc_idxx].docElem_AR[parentSiblingDocElem_idx_AR_idx_var].text: "+this.sess.document_AR[doc_idxx].docElem_AR[parentSiblingDocElem_idx_AR_idx_var].text);

               docLevel_AR[parent_level].childDocElem_idx_AR_idx = 0;    // 20210312 


/////               // look for sibling of parent
               if(currentLevel != 0 &&  docLevel_AR[gp_level].childDocElem_idx_AR_idx < grandparentChildDocElemIdx_AR_length ){
                  docElemFound = true;
                  //docLevel_AR[currentLevel].docElem_idx = grandparentChildDocElem_idx_AR_idx_var;  
                  docLevel_AR[parent_level].docElem_idx = grandparentChildDocElem_idx_AR_idx_var;   
             
                  docLevel_AR[parent_level].childDocElem_idx_AR_idx = 0;     // 20210125   (del) 20210312
                //  docLevel_AR[currentLevel].childDocElem_idx_AR_idx = 0;                        // 20210123  (del) 20210125
/////           //  console.log("+++ 20210119 i - docLevel_AR[i].docElem_idx: "+i+" - "+docLevel_AR[i].docElem_idx);
                //  console.log("+++ 20210119 docLevel_AR[gp_level].childDocElem_idx_AR_idx: "+docLevel_AR[gp_level].childDocElem_idx_AR_idx);
                //  console.log("+++ 20210119 currentLevel: "+currentLevel);
     
               } // endif        
              loop_cntr2++
              if(loop_cntr2 > 6000){docElemFound = true;}
              gp_level--;
              parent_level--;
              currentLevel--;
            } // endwhile
            continue;

          }  // endif   !(childFound || siblingFound)){




/////         }  // endif
         

        } // endif i == currentLevel
       

  } // endfor

  if(loop_cntr > 6000){done = true;}
  loop_cntr++;

}  // endwhile


 //console.log("html_str: "+html_str);
// trigger error
//console.log("trigger error: "+docLevel_AR[999].docElem_idx);
 
return html_str;

} // end of getHtmlForTemplate_DocumentDisplay()





} // end of class ZtDocument



function Recx( ) {
   this.xx  = "";
   this.xx = "";
   this.xx   = [];
   this.xx  = [];

 } // end of function Recx


function DocLevelRec() {

   this.docElem_idx = 0;
   this.childDocElem_idx_AR_idx  = 0;
   this.doneForLevel = false;

}  // end of function DocLevelRec()





module.exports = ZtDocument;
