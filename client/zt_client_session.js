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



class ZtSession {     //20200601

    constructor(idx, ZTICNS_ARx, langx, TargetNSx) {

      this.id              = idx;
      this.ZTICNS_AR       = ZTICNS_ARx;
      this.language        = langx;
      this.top_templ_idx   = 0;
      this.top_templ_def_idx = 0;   // 20200930
      this.sel_templ_idx   = 0;
      this.template_AR     = [];
      this.templateDef_AR  = [];    // 20200930
      this.tempCode        = "1";
      this.html_id_cntr    = 0;
      this.TargetNS        = TargetNSx;
      this.maint_mode      = "";
      this.maint_format    = "";    // 20261020
      this.foreign_ro_attr = " readonly style='background-color:#eeeeee'";   // 20261024 fields of objects in another namespace
      this.UI_attribute_AR = [];   // 20261026 user interface attributes (e.g. linked objects of a link type listed as a table)
      this.objectSet_AR    = [];    // 20201112
      this.workbook_AR     = [];    // 20201123
      this.document_AR     = [];    // 20210113
      this.multiMediaObject_AR  = [];    // 20210713 
      this.resource_AR     = [];       // 20210713
      this.messageDefinition_AR = [];  // 20210806
      this.selectionList_AR     = [];  // 20230324
      this.typeDefAllowedValueSet_AR = [];  // 20230328
      this.statisticalValuesObject_AR = [];   // 20230810
      this.TVBTR_AR = [];                     // 20231115  TVBTR = type value based template rule
      this.TVBTR_top_templ_idx   = 0;         // 20231111
      this.TVBTR_top_templ_def_idx = 0;       // 20231111
      this.TVBTR_template_AR = [];            // 20231111  
      this.TVBTR_templateDef_AR = [];         // 20231113
      this.TVBTR_initialTypeVal_AR = [];      // 20231115  
     

      
  } // end of constructor




setValuesFromInitialMessage(msg, obj_zticx, obj_codex){      // 20200813

this.mergeMessageZTICs(msg);   // 20261021 namespaces added by the server in the response (e.g. ZTIC of a linked grandchild)

// start clone statistical values from message into session 
this.statisticalValuesObject_AR = JSON.parse(JSON.stringify(msg.queryResponseStatisticalValuesObjectWA_AR));


  //console.log("##^ 20211029 start of setValueFromInitialMessage in zt_client_session");
  for (var j = 0; j < msg.queryResponseObjectWA_AR.length; j++) {
  // console.log("##^ 20211029 msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length: " +msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length);              
     for (var t = 0; t < msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length; t++) {                              
 //console.log("msg.queryResponseObjectWA_AR[j].objectElement_idx_AR[t]:"+msg.queryResponseObjectWA_AR[j].objectElement_idx_AR[t]);                        
     }                           
  } // end of loop through queryResponseObjectWA_AR


 for (var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++) {
   for (var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++) {

     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];
     for (var j = 0; j < objx.objectElement_idx_AR.length; j++) {
       // console.log("  ");
       // console.log("##^ 20211029 objx.objectKindZTIC: "+objx.objectKindZTIC);
       // console.log("##^ 20211029 objx.objectKindCode: "+objx.objectKindCode);
       // console.log("##^ 20211029 objx.objectZTIC: "+objx.objectZTIC);
       // console.log("##^ 20211029 objx.objectCode: "+objx.objectCode);

       // console.log("##^ 20211029 objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
       // console.log("##^ 20211029 objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
       // console.log("##^ 20211029 objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
       // console.log("##^ j: "+j);
       // console.log("##^ 20211029 objx.objectElement_idx_AR[j]: "+ objx.objectElement_idx_AR[j]);
       // console.log("  ");
     } // endfor                                
   } // endfor
 }  // endfor





//console.log("20200613 running setValuesFromInitialMessage()  obj_zticx - obj_codex: "+obj_zticx+ " - " + obj_codex);

var OEscreenElem_AR = [];
var DEvalue_AR      = [];


this.T5_setValuesFromInitialMessageForSetMembers(msg, DEvalue_AR);       // 20230327 moved from bottom as test


var base_ztic;


for(var i = 0; i < this.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor




//start of loop at template values
for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQset"){ //temp (del) 20200407

 //  - start of get template description
   var templ_ztic = msg.queryResponseSetMemberWA_AR[h].objectTemplateZTIC;   
   var templ_code = msg.queryResponseSetMemberWA_AR[h].objectTemplateCode;
  // console.log("20240128c templ_ztic - templ_code: "+templ_ztic+" - "+templ_code);
   var top_templ = new TemplateRec(null, "0", templ_ztic, templ_code);     //20200603
   var top_templ_def = new TemplateDefRec(templ_ztic, templ_code);     // 20200930

   this.top_templ_idx = this.template_AR.push(top_templ) -1;                 //20200603
   this.top_templ_def_idx = this.templateDef_AR.push(top_templ_def) -1;     // 20200930

 //  - end of get template description

   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
   var i = msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c
 // console.log("Object: "+ this.msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectCode);
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126


     if(objx.objectKindZTIC == base_ztic && objx.objectKindCode == "2"){
       this.template_AR[this.top_templ_idx].templZTIC = objx.objectZTIC;
       this.template_AR[this.top_templ_idx].templCode = objx.objectCode;

       this.templateDef_AR[this.top_templ_def_idx].templZTIC = objx.objectZTIC;    // 20200930
       this.templateDef_AR[this.top_templ_def_idx].templCode = objx.objectCode;    // 20200930

    //   console.log("20200814 objx.type_idx_AR.length: "+objx.type_idx_AR.length);
       for(var q = 0; q < objx.type_idx_AR.length; q++){                 // 20200813  get object kind from type value of template instead of function param
    //     console.log("20200814 msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_ztic - msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_code: "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC+ " - " + msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode);
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == base_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "3"){

               this.template_AR[this.top_templ_idx].objKindZTIC = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               this.template_AR[this.top_templ_idx].objKindCode = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;

               this.templateDef_AR[this.top_templ_def_idx].objKindZTIC = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;  // 20200930
               this.templateDef_AR[this.top_templ_def_idx].objKindCode = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;  // 20200930
    
          } // endif
       } // endfor loop through objx.typeVal_AR   // end 20200813
     } // endif

// end insert 20200604



const html_id_prfx = "val";

//console.log("Object Element values");    
//    console.log("20200713 objx.objectElement_idx_AR.length: "+objx.objectElement_idx_AR.length); 
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic &&
msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2){      //template desc
         this.template_AR[this.top_templ_idx].templDesc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;   //       20200603
         this.templateDef_AR[this.top_templ_def_idx].templDesc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;   // 20200930
     }   // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12

   //to suppress technical profile description
   if(!(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic &&
        msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2)){
   
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3){     
          var OE_def_rec = new ObjectElementDefinitionRec(); //20200603
    
          OE_def_rec.OE_ztic = objx.objectZTIC; 
          OE_def_rec.OE_code = objx.objectCode;
          //OE_def_rec.html_id = html_id_prfx + this.html_id_cntr.toString().trim();   (del) 20200609
          //this.html_id_cntr++;                                                     //(del) 20200821
          OE_def_rec.html_label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
          //OE_def_rec.html_input_val = "";   //(del) 20200609
          this.template_AR[this.top_templ_idx].OE_def_AR.push(OE_def_rec);
          this.templateDef_AR[this.top_templ_def_idx].OE_def_AR.push(OE_def_rec);    // 20200930
  

      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3
     //console.log("20200607a msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 214){     // 20200516  include data elem max length
        var DEvalue = new DEvalueRec();    //20200125
        DEvalue.DE_ztic = objx.objectZTIC;                                                                           //20200224
        DEvalue.DE_code = objx.objectCode;                       //20200224
        //DEvalue.OE_max_length = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;  (del) 20200604
        DEvalue.OE_html_size = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        DEvalue_AR.push(DEvalue);
      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 31

    }  // endif to suppress template desc
//  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
//+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
//+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// console.log("20200810a Type values");
     for(var j = 0; j < objx.type_idx_AR.length; j++){
//  console.log("   20200515 Type DefZTIC/DefCode: ValueZTIC/ValueCode:  "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
//+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
//+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"/"
//+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);


        if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC == base_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode == "14"){
          var type_def_allowed_value_set_rec = new TypeDefAllowedValueSetRec();
          type_def_allowed_value_set_rec.typeDef_ztic = objx.objectZTIC;
          type_def_allowed_value_set_rec.typeDef_code = objx.objectCode;
          type_def_allowed_value_set_rec.objectSet_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC;
          type_def_allowed_value_set_rec.objectSet_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode;
          this.typeDefAllowedValueSet_AR.push(type_def_allowed_value_set_rec);
        }  // endif

 
          for(var p = 0; p < this.template_AR[this.top_templ_idx].OE_def_AR.length; p++){
            if(this.template_AR[this.top_templ_idx].OE_def_AR[p].OE_ztic == objx.objectZTIC && this.template_AR[this.top_templ_idx].OE_def_AR[p].OE_code == objx.objectCode){
              if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC == base_ztic &&  msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode == 9){
                 this.template_AR[this.top_templ_idx].OE_def_AR[p].DE_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC.toString().trim(); //to be deprecated 20200930 
                 this.template_AR[this.top_templ_idx].OE_def_AR[p].DE_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode.toString().trim(); 

                 this.templateDef_AR[this.top_templ_def_idx].OE_def_AR[p].DE_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC.toString().trim(); // 20200930
                 this.templateDef_AR[this.top_templ_def_idx].OE_def_AR[p].DE_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode.toString().trim(); // 20200930
              }  // endif
            }  // endif 
          }  // endfor loop through this.template_AR[this.top_templ_idx].OE_def_idx_AR

  
//      console.log("20200713: objx.objectElement_idx_AR[j]: "+objx.objectElement_idx_AR[j]);
//      console.log("20200713: msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
//        console.log("  ");
//        console.log("##^ 20211025 objx.objectKindZTIC: "+objx.objectKindZTIC);
//        console.log("##^ 20211025 objx.objectKindCode: "+objx.objectKindCode);
//        console.log("##^ 20211025 objx.objectZTIC: "+objx.objectZTIC);
//        console.log("##^ 20211025 objx.objectCode: "+objx.objectCode);

//        console.log("##^ 20211025 objx.objectElement_idx_AR[j]: "+objx.objectElement_idx_AR[j]);
//        console.log("##^ 20210125 j: "+j);
//        console.log("##^ 20211025 objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
//        console.log("##^ 20211025 objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
//        console.log("  ");
//        console.log("##^ 20211029c objx.objectElement_idx_AR.length: "+objx.objectElement_idx_AR.length);
        for(var t = 0; t < objx.objectElement_idx_AR.length; t++){    // 20211029

//          console.log("##^ 20211029d msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]].objectElementCode);
           if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]].objectElementZTIC == base_ztic &&
          msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]].objectElementCode == 9){ // get type def with description 20211029
             // start 20211030
             var type_def_already_added = false;
             for(var u = 0; u < this.templateDef_AR[this.top_templ_def_idx].typeDef_AR.length; u++){
               if(this.templateDef_AR[this.top_templ_def_idx].typeDef_AR[u].typeDef_ztic == objx.objectZTIC &&  this.templateDef_AR[this.top_templ_def_idx].typeDef_AR[u].typeDef_code == objx.objectCode){
                   type_def_already_added = true;
               }  // endif                            
             }  // endfor loop through typeDef_AR


            if(!type_def_already_added){    // 20211030
             var typeDef_rec = new TypeDefinitionRec();
                 typeDef_rec.typeDef_ztic = objx.objectZTIC;
                 typeDef_rec.typeDef_code = objx.objectCode;
                 typeDef_rec.typeDef_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]].objectElementValue;  // 20211029
                 
                 for(var u = 0; u < objx.type_idx_AR.length; u++){

                  //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeValueCode);
                  if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeDefinitionZTIC == base_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeDefinitionCode == "4"){  // if type value is object kind for a type definition
                    typeDef_rec.objectKind_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeValueZTIC;
                    typeDef_rec.objectKind_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeValueCode;

                  } // endif
                 } // endfor loop through objx type values for a type def
    

 //                console.log("##^ 20211029e msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]].objectElementValue);
                 this.template_AR[this.top_templ_idx].typeDef_AR.push(typeDef_rec);          // to be deprecated 20200930

                 this.templateDef_AR[this.top_templ_def_idx].typeDef_AR.push(typeDef_rec);   // 20200930
             }  // endif if(!type_def_already_added)  // 20211030
           } // endif to get type definition.
          
        

     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]].objectElementZTIC == base_ztic &&
      msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]].objectElementCode == 10){   // get link types with description 20211029
             var linktype_rec = new LinkTypeRec();
                 linktype_rec.linkType_ztic = objx.objectZTIC;
                 linktype_rec.linkType_code = objx.objectCode;
                 linktype_rec.linkType_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]].objectElementValue;  // 20211029
                 this.template_AR[this.top_templ_idx].linkType_AR.push(linktype_rec);          // to be deprecated 20200930

                 this.templateDef_AR[this.top_templ_def_idx].linkType_AR.push(linktype_rec);   // 20200930

           } // endif to get link types.

         } // endfor 20211029

      }  // endfor loop through object elements  20200605 end



      if(objx.objectKindZTIC == base_ztic && objx.objectKindCode == "9"){   // type definition
        for(var j = 0; j < objx.link_idx_AR.length; j++){
          if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == base_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "29"){  // link from type def to type value based template rule
              
              var TVBTR_rec = new TypeValueBasedTemplateRuleRec();
              TVBTR_rec.TVBTR_ztic = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC;
              TVBTR_rec.TVBTR_code = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode;
              TVBTR_rec.typeDef_ztic = objx.objectZTIC;
              TVBTR_rec.typeDef_code = objx.objectCode;
              this.TVBTR_AR.push(TVBTR_rec);
          }  // endif it's link to type value based template rule
            
        }  // endfor loop through objx.link_idx_AR    
      } // endif object is a type definition


      if(objx.objectKindZTIC == base_ztic && objx.objectKindCode == "5"){   // type value based template rule
        var TVBTR_idx;
        var TVBTR_found = false;
        for(var j = 0; j < this.TVBTR_AR.length; j++){
           if(this.TVBTR_AR[j].TVBTR_ztic == objx.objectZTIC  && this.TVBTR_AR[j].TVBTR_code == objx.objectCode){
              TVBTR_found = true;
              TVBTR_idx = j;
           }  // endif
        } // endfor loop through TVBTR_AR
        // console.log("20231209 TVBTR_found: "+TVBTR_found);
        if(TVBTR_found){
          //   console.log("20200814 objx.type_idx_AR.length: "+objx.type_idx_AR.length);
          for(var q = 0; q < objx.type_idx_AR.length; q++){       
        //     console.log("20200814 msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_ztic - msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_code: "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC+ " - " + msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode);
              if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == base_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "38"){    
                this.TVBTR_AR[TVBTR_idx].template_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
                this.TVBTR_AR[TVBTR_idx].template_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
               } // endif
               if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == base_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "39"){    
                this.TVBTR_AR[TVBTR_idx].objectSet_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
                this.TVBTR_AR[TVBTR_idx].objectSet_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
               } // endif
           } // endfor loop through objx.typeVal_AR   // end 20200813
           
        }  // endif TVBTR_found

      }  // endif object is a type value based template rule

      // end 20231206
//console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
//  console.log("   Link Type/Value for template 20200811:  "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

      }  // endfor loop through objx.link_idx_AR
    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k
}  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQset"){ // temp (del) 20200407

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjTmplQset)
// end of loop at template values





const html_id_prfx = "val";

var top_object = new ObjectRec();
    top_object.objCodeTemp = obj_codex;   
    if(obj_codex.toString().trim() == ""){      
      top_object.objCodeTemp = this.tempCode;   
      top_object.newCode = true;               
      this.tempCode++;                          
    } // endif                                  
// start 20200821
      this.html_id_cntr++;    
      top_object.objZTIC_ns_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
 //     console.log("20200821 ++#0 this.html_id_cntr: "+this.html_id_cntr);

      top_object.objZTIC_ns_html_input_val = "";
      this.html_id_cntr++;  
      top_object.objCodeAssigned_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();

      top_object.objCodeAssigned_html_input_val = "";

      this.html_id_cntr++;  
      top_object.linkStatus_html_id  = html_id_prfx + this.html_id_cntr.toString().trim(); 
      top_object.linkStatus_html_input_val = "";
      this.html_id_cntr++;
      top_object.linkValue_html_id  = html_id_prfx + this.html_id_cntr.toString().trim(); 
      top_object.linkValue_html_input_val = "";

    top_object.objZTIC = obj_zticx;


//-- get object values from message

this.T2_setValuesFromInitialMessage(msg, DEvalue_AR);  // 20200630 moved from bottom, sets template values for child templates  
//this.T5_setValuesFromInitialMessageForSetMembers(msg, DEvalue_AR);                                                              - 20230327 moved to top
this.setValuesFromInitialMessageForSpreadsheets(msg, DEvalue_AR);    //
this.setValuesFromInitialMessageForMultiMediaObjects(msg, DEvalue_AR);   
this.setValuesFromInitialMessageForDocumentDisplay(msg, DEvalue_AR);
this.setValuesFromInitialMessageForMessageDefinitionDisplay(msg, DEvalue_AR);
this.T7_setValuesFromInitialMessageForTypeValueBasedTemplateRules(msg, DEvalue_AR);    // 20240106 temp (del)


for(var i = 0; i < this.workbook_AR.length; i++){ 

   this.workbook_AR[i].generateDisplayValues(0);  // REVISIT - for now use only sheet index 0
}  // endfor loop through this.workbook_AR


// start list set members
//  console.log("%20201114 list of set members, this.objectSet_AR.length: "+this.objectSet_AR.length);


    for(var i = 0; i < this.objectSet_AR.length; i++){  
          for(var j = 0; j < this.objectSet_AR[i].objSetMember_AR.length; j++){
         //   console.log("%20201114 this.objectSet_AR[i].objSetMember_AR[j].objectKindZTIC: "+ this.objectSet_AR[i].objSetMember_AR[j].objectKindZTIC);
         //   console.log("%20201114 this.objectSet_AR[i].objSetMember_AR[j].objectKindCode: "+ this.objectSet_AR[i].objSetMember_AR[j].objectKindCode);
         //   console.log("%20201114 this.objectSet_AR[i].objSetMember_AR[j].objectZTIC: "+ this.objectSet_AR[i].objSetMember_AR[j].objectZTIC);
         //   console.log("%20201114 this.objectSet_AR[i].objSetMember_AR[j].objectCode: "+ this.objectSet_AR[i].objSetMember_AR[j].objectCode);
            for(var k = 0; k < this.objectSet_AR[i].objSetMember_AR[j].OE_val_AR.length; k++){
         //     console.log("OE ZTIC: "+this.objectSet_AR[i].objSetMember_AR[j].OE_val_AR[k].OE_ztic);
         //     console.log("OE Code: "+this.objectSet_AR[i].objSetMember_AR[j].OE_val_AR[k].OE_code);
         //     console.log("OE Value: "+this.objectSet_AR[i].objSetMember_AR[j].OE_val_AR[k].OE_value);
            }  // endfor
          }  // endfor

    }  //endfor loop through sets




var AddMessageOEvalueToSessionWorkAreaRec_AR = [];     // 20200824
var AddMessageTypeValueToSessionWorkAreaRec_AR = [];   // 20200826
var AddMessageLinkToSessionWorkAreaRec_AR = [];   // 20210416

for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){

   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
// //  console.log("Object: "+ this.msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectCode);
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("20200929 ^^^.. objx.id - objx.parentId - objx.levelsDown: "+objx.objectKindZTIC+"/"+objx.objectKindCode+"/"+objx.objectZTIC+"/"+objx.objectCode+"  = "+objx.id + " - " + objx.parentId + " - " + objx.levelsDown);


// //console.log("Object Element values");
//    //queryResponseObjectElementWA_AR = [];     
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);
  //    console.log("20231202h msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC - objectElementCode - objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC+" - "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+" - "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      var AddMessageOEvalueToSession_wa_rec = new AddMessageOEvalueToSessionWorkAreaRec(objx, msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]]);   // 20200824
      AddMessageOEvalueToSessionWorkAreaRec_AR.push(AddMessageOEvalueToSession_wa_rec);                                                                         // 20200824

     if(!(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   // 20200127 temporary to suppress technical profile description
         


      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode != 12
// //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

     // this.addMessageTypeValueToSession(objx, msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]]);                                                  (del) 20200827
     //var AddMessageTypeValueToSession_wa_rec = new AddMessageTypeValueToSessionWorkAreaRec(objx, msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]]);  //20200827 (del) 20210303
     var AddMessageTypeValueToSession_wa_rec = new AddMessageTypeValueToSessionWorkAreaRec(objx, msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]], objx.levelsDown);  //20210303
   //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     AddMessageTypeValueToSessionWorkAreaRec_AR.push(AddMessageTypeValueToSession_wa_rec);                                                          //   20200827     

 //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
       }


// //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
      var AddMessageLinkToSession_wa_rec = new AddMessageLinkToSessionWorkAreaRec(objx, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]], objx.levelsDown);
      AddMessageLinkToSessionWorkAreaRec_AR.push(AddMessageLinkToSession_wa_rec);
// //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

      }
    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k
 }  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjectQset)


// end of loop at object values 


//console.log("20200702 obj_codex: "+obj_codex);
//console.log("20200826 ++ this.maint_mode: "+this.maint_mode);
if(this.maint_mode == "create"){     // 20200826
  obj_codex = "";                    // 20200826
 // if(obj_codex.toString().trim() == ""){
    for(var i = 0; i < this.template_AR[this.top_templ_idx].OE_def_AR.length; i++){
       var oe_val_rec = new ObjectElementValueRec();
       oe_val_rec.OE_ztic = this.template_AR[this.top_templ_idx].OE_def_AR[i].OE_ztic;
       oe_val_rec.OE_code = this.template_AR[this.top_templ_idx].OE_def_AR[i].OE_code;
       this.html_id_cntr++;  // 20200907
       oe_val_rec.html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
       //this.html_id_cntr++;  // (del) 20200907

  //     console.log("20200821 ++#1 this.html_id_cntr: "+this.html_id_cntr);
       oe_val_rec.OE_value = "";
       top_object.OE_val_AR.push(oe_val_rec);
    } // endfor
 // }  // endif.
} // endif 





if(obj_codex.toString().trim() == ""){
  for(var i = 0; i < this.template_AR[this.top_templ_idx].typeDef_AR.length; i++){
     var type_val_rec = new TypeValueRec();
     type_val_rec.typeDef_ztic = this.template_AR[this.top_templ_idx].typeDef_AR[i].typeDef_ztic;
     type_val_rec.typeDef_code = this.template_AR[this.top_templ_idx].typeDef_AR[i].typeDef_code;
     this.html_id_cntr++;  // 20200907
     type_val_rec.ztic_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
     //this.html_id_cntr++;  // (del) 20200907

     this.html_id_cntr++;  //  20200907
     type_val_rec.code_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
     //this.html_id_cntr++;  // (del) 20200907
   //  console.log("20200821 ++#2 this.html_id_cntr: "+this.html_id_cntr);

     this.html_id_cntr++;  // 20230324
     type_val_rec.composite_html_id = html_id_prfx + this.html_id_cntr.toString().trim();  // 20230324

     this.html_id_cntr++;  // 20231029
     type_val_rec.dateStr_html_id = html_id_prfx + this.html_id_cntr.toString().trim();  // 20231029

     type_val_rec.typeVal_ztic = "";
     type_val_rec.typeVal_code = "";
     type_val_rec.ztic_html_input_val = "";
     type_val_rec.ztic_ns_html_input_val = "";
     type_val_rec.code_html_input_val = "";
     type_val_rec.dateStr_html_input_val = "";   // 20231029
     top_object.typeVal_AR.push(type_val_rec);
  } // endfor
}  // endif. add blank type value for each type def in template





var top_obj_idx = this.template_AR[this.top_templ_idx].object_AR.push(top_object) -1;  // 20200610
// console.log("20231209g top_obj_idx: "+top_obj_idx);


//console.log("20200615 running ZtSession.setValuesFromInitialMessage()");
for(var j = 0; j < DEvalue_AR.length; j++){ 
   //console.log("DEvalue_AR.DE_ztic: "+ DEvalue_AR[j].DE_ztic);
   //console.log("DEvalue_AR.DE_code: "+ DEvalue_AR[j].DE_code);
   //console.log("DEvalue_AR.OE_html_size: "+DEvalue_AR[j].OE_html_size);

}  // endfor

 for(var k = 0; k < this.template_AR.length; k++){   // 20200705
   //for(var i = 0; i < this.template_AR[this.top_templ_idx].OE_def_AR.length; i++){  // (del) 20200705
   for(var i = 0; i < this.template_AR[k].OE_def_AR.length; i++){    // 20200705
    // console.log("%%^ 20211120d DEvalue_AR.length: "+DEvalue_AR.length);
      for(var j = 0; j < DEvalue_AR.length; j++){  
        if(this.template_AR[k].OE_def_AR[i].DE_ztic ==  DEvalue_AR[j].DE_ztic &&
           this.template_AR[k].OE_def_AR[i].DE_code ==  DEvalue_AR[j].DE_code){
             this.template_AR[k].OE_def_AR[i].html_size = DEvalue_AR[j].OE_html_size;

        } // endif
      }
   }  // endfor
 } // endfor 20200705

   for(var i = 0; i < this.template_AR[this.top_templ_idx].OE_def_AR.length; i++){
     // console.log("   this.template_AR[this.top_templ_idx].OE_def_AR[i].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_AR[i].OE_ztic);
     // console.log("   this.template_AR[this.top_templ_idx].OE_def_AR[i].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_AR[i].OE_code);
     // console.log("   this.template_AR[this.top_templ_idx].OE_def_AR[i].OE_desc: "+this.template_AR[this.top_templ_idx].OE_def_AR[i].OE_desc);
     // console.log("   this.template_AR[this.top_templ_idx].OE_def_AR[i].DE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_AR[i].DE_ztic);
     // console.log("   this.template_AR[this.top_templ_idx].OE_def_AR[i].DE_code: "+this.template_AR[this.top_templ_idx].OE_def_AR[i].DE_code);
     // //console.log("   this.template_AR[this.top_templ_idx].OE_def_AR.html_id: "+this.OE_def_AR[this.template_AR[this.top_templ_idx].OE_def_idx_AR[i]].html_id);
     // console.log("   this.template_AR[this.top_templ_idx].OE_def_AR.html_label: "+this.template_AR[this.top_templ_idx].OE_def_AR[i].html_label);
     // //console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR.html_input_val: "+this.OE_def_AR[this.template_AR[this.top_templ_idx].OE_def_idx_AR[i]].html_input_val);
     // console.log("   this.template_AR[this.top_templ_idx].OE_def_AR.html_size: "+this.template_AR[this.top_templ_idx].OE_def_AR[i].html_size);    
   }  // endfor

  



// start to allow maintenance of blank object elements



//console.log("20200826 ++2 this.maint_mode: "+this.maint_mode);
if(this.maint_mode == "update" || this.maint_mode == "display"){    // 20210112
var found_oe_in_msg = false;
var obj_ztic = "";
var obj_code = "";

//console.log("20200908 +++ this.template_AR.length: "+ this.template_AR.length);
for(var i = 0; i < this.template_AR.length; i++){
 // console.log("20200824 ** look for oe in message for template index: "+i+" this.template_AR[i].templDesc: "+this.template_AR[i].templDesc);
 // console.log("  this.template_AR[i].objKindZTIC - objKindCode: "+ this.template_AR[i].objKindZTIC +" - "+this.template_AR[i].objKindCode);
  for(var j = 0; j < this.template_AR[i].OE_def_AR.length; j++){
     found_oe_in_msg = false;
     for(var k = 0; k < AddMessageOEvalueToSessionWorkAreaRec_AR.length; k++){
       if(obj_ztic == ""){obj_ztic = AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_obj.objectZTIC.toString().trim();}
       if(obj_code == ""){obj_code = AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_obj.objectCode.toString().trim();}
       // console.log("20231124a obj_ztic - obj_code: "+obj_ztic + " - " + obj_code);
       if(this.template_AR[i].objKindZTIC == AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_obj.objectKindZTIC && this.template_AR[i].objKindCode == AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_obj.objectKindCode){
         if(this.template_AR[i].OE_def_AR[j].OE_ztic == AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_oe.objectElementZTIC && this.template_AR[i].OE_def_AR[j].OE_code == AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_oe.objectElementCode){
            found_oe_in_msg = true;
           // console.log("20200824 found for obj_ztic - obj_code - OE_ztic - OE_code: "+obj_ztic+" - "+obj_code+" - "+this.template_AR[i].OE_def_AR[j].OE_ztic+" - " + this.template_AR[i].OE_def_AR[j].OE_code);
            this.addMessageOEvalueToSession(i, AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_obj, AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_oe);    // 20200908
          } // endif
       }  // endif
     } // endfor
    if(!found_oe_in_msg){

      var oe_val_blank_rec = new QueryResponseObjectElementWorkAreaRec();
      oe_val_blank_rec.objectElementZTIC = this.template_AR[i].OE_def_AR[j].OE_ztic;
      oe_val_blank_rec.objectElementCode = this.template_AR[i].OE_def_AR[j].OE_code;
      oe_val_blank_rec.objectElementValue = "";
      var obj_blank_rec = new QueryResponseObjectWorkAreaRec();
      obj_blank_rec.objectKindZTIC                = this.template_AR[i].objKindZTIC;   //4132 
      obj_blank_rec.objectKindCode                = this.template_AR[i].objKindCode;   //4133
      obj_blank_rec.objectZTIC                    = obj_ztic;   
      obj_blank_rec.objectCode                    = obj_code;
     // console.log("20200824 ** OE not found in msg - objKindZTIC - objKindCode - obj_ztic - obj_code - OE_ztic - OE_code: "+obj_blank_rec.objectKindZTIC+" - "+obj_blank_rec.objectKindCode+" - "+obj_ztic+" - "+obj_code+" - "+oe_val_blank_rec.objectElementZTIC+" - "+oe_val_blank_rec.objectElementCode);
      obj_ztic = "";
      obj_code = "";  
      //console.log("20200824 this.template_AR[i].objKindZTIC - this.template_AR[i].objKindCode: "+this.template_AR[i].objKindZTIC+" - "+this.template_AR[i].objKindCode); 
      this.addMessageOEvalueToSession(i, obj_blank_rec, oe_val_blank_rec);   // 20200908
    } // endif

  } // endfor
} // endfor




// start 20231203  TVBTR
found_oe_in_msg = false;
obj_ztic = "";
obj_code = "";
const templ_idx = 0;



//console.log("20200908 +++ this.template_AR.length: "+ this.template_AR.length);
if(this.TVBTR_template_AR.length > 0){
for(var i = 0; i < this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length; i++){
 // console.log("20200824 ** look for oe in message for template index: "+i+" this.template_AR[i].templDesc: "+this.template_AR[i].templDesc);
 // console.log("  this.template_AR[i].objKindZTIC - objKindCode: "+ this.template_AR[i].objKindZTIC +" - "+this.template_AR[i].objKindCode);
  for(var j = 0; j < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR.length; j++){
     found_oe_in_msg = false;
     for(var k = 0; k < AddMessageOEvalueToSessionWorkAreaRec_AR.length; k++){
       if(obj_ztic == ""){obj_ztic = AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_obj.objectZTIC.toString().trim();}
       if(obj_code == ""){obj_code = AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_obj.objectCode.toString().trim();}
       // console.log("20231124a obj_ztic - obj_code: "+obj_ztic + " - " + obj_code);
       if(this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].objKindZTIC == AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_obj.objectKindZTIC && this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].objKindCode == AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_obj.objectKindCode){
         if(this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[j].OE_ztic == AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_oe.objectElementZTIC && this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[j].OE_code == AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_oe.objectElementCode){
            found_oe_in_msg = true;
           // console.log("20231203jj found for obj_ztic - obj_code - OE_ztic - OE_code: "+obj_ztic+" - "+obj_code+" - "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[j].OE_ztic+" - " + this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[j].OE_code);
            this.TVBTR_addMessageOEvalueToSession(i, AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_obj, AddMessageOEvalueToSessionWorkAreaRec_AR[k].msg_oe);    // 20231202
         } // endif
       }  // endif
     } // endfor
    if(!found_oe_in_msg){

      var oe_val_blank_rec = new QueryResponseObjectElementWorkAreaRec();
      oe_val_blank_rec.objectElementZTIC = this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[j].OE_ztic;
      oe_val_blank_rec.objectElementCode = this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[j].OE_code;
      oe_val_blank_rec.objectElementValue = "";
      var obj_blank_rec = new QueryResponseObjectWorkAreaRec();
      obj_blank_rec.objectKindZTIC                = this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i].objKindZTIC;   //4132 
      obj_blank_rec.objectKindCode                = this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i].objKindCode;   //4133
      obj_blank_rec.objectZTIC                    = obj_ztic;   
      obj_blank_rec.objectCode                    = obj_code;
     // console.log("20200824 ** OE not found in msg - objKindZTIC - objKindCode - obj_ztic - obj_code - OE_ztic - OE_code: "+obj_blank_rec.objectKindZTIC+" - "+obj_blank_rec.objectKindCode+" - "+obj_ztic+" - "+obj_code+" - "+oe_val_blank_rec.objectElementZTIC+" - "+oe_val_blank_rec.objectElementCode);
      obj_ztic = "";
      obj_code = "";  
      //console.log("20200824 this.template_AR[i].objKindZTIC - this.template_AR[i].objKindCode: "+this.template_AR[i].objKindZTIC+" - "+this.template_AR[i].objKindCode); 
       this.TVBTR_addMessageOEvalueToSession(i, obj_blank_rec, oe_val_blank_rec);   // 20200908
    } // endif

  } // endfor
} // endfor

}  // endif if(this.TVBTR_template_AR.length > 0){

// end  TVBTR





var found_type_value_in_msg = false;
 obj_ztic = "";
 obj_code = "";

//console.log(" ");
//console.log("* * 20210302 ** start look for type values in message");
//console.log("* * 20210302 ** this.template_AR.length: "+this.template_AR.length);
for(var i = 0; i < this.template_AR.length; i++){
   // console.log("* * 20210302 this.template_AR[i].typeDef_AR.length: "+this.template_AR[i].typeDef_AR.length);
    for(var j = 0; j < this.template_AR[i].typeDef_AR.length; j++){
      found_type_value_in_msg = false;
      for(var k = 0; k < AddMessageTypeValueToSessionWorkAreaRec_AR.length; k++){
       // console.log("* * 20210302 AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_obj.objectZTIC: "+AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_obj.objectZTIC);
       // console.log("* * 20210302 AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_obj.objectCode: "+AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_obj.objectCode);
        if(obj_ztic == ""){obj_ztic = AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_obj.objectZTIC.toString().trim();}
        if(obj_code == ""){obj_code = AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_obj.objectCode.toString().trim();}


       if(this.template_AR[i].objKindZTIC == AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_obj.objectKindZTIC && this.template_AR[i].objKindCode == AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_obj.objectKindCode){
         if(this.template_AR[i].typeDef_AR[j].typeDef_ztic == AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_type_value.typeDefinitionZTIC && this.template_AR[i].typeDef_AR[j].typeDef_code == AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_type_value.typeDefinitionCode){
            if(this.template_AR[i].templLevelsDown == AddMessageTypeValueToSessionWorkAreaRec_AR[k].levelsDown){           // 20210303
               found_type_value_in_msg = true;
              //  console.log("* * 20210302c found for obj_ztic - obj_code - typeDef_ztic - typeDef_code: "+obj_ztic+" - "+obj_code+" - "+this.template_AR[i].typeDef_AR[j].typeDef_ztic+" - " + this.template_AR[i].typeDef_AR[j].typeDef_code);
               this.addMessageTypeValueToSession(AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_obj, AddMessageTypeValueToSessionWorkAreaRec_AR[k].msg_type_value);
            } // endif if(this.template_AR[i].templLevelsDown == AddMessageTypeValueToSessionWorkAreaRec_AR[k].levelsDown)
         } // endif
       }  // endif
      }  // endfor


      if(!found_type_value_in_msg){
        var type_val_blank_rec = new QueryResponseTypeWorkAreaRec();
        type_val_blank_rec.typeDefinitionZTIC = this.template_AR[i].typeDef_AR[j].typeDef_ztic;
        type_val_blank_rec.typeDefinitionCode = this.template_AR[i].typeDef_AR[j].typeDef_code;
        type_val_blank_rec.typeValueZTIC = "";
        type_val_blank_rec.typeValueCode = "";

        var obj_blank_rec = new QueryResponseObjectWorkAreaRec();
        obj_blank_rec.objectKindZTIC                = this.template_AR[i].objKindZTIC;   //4132 
        obj_blank_rec.objectKindCode                = this.template_AR[i].objKindCode;   //4133
        obj_blank_rec.objectZTIC                    = obj_ztic;   
        obj_blank_rec.objectCode                    = obj_code;
      //  console.log("* * 20210302d Type val not found in msg - objKindZTIC - objKindCode - obj_ztic - obj_code - typeDefinitionZTIC - typeDefinitionCode: "+obj_blank_rec.objectKindZTIC+" - "+obj_blank_rec.objectKindCode+" - "+obj_ztic+" - "+obj_code+" - "+type_val_blank_rec.typeDefinitionZTIC+" - " + type_val_blank_rec.typeDefinitionCode);
      obj_ztic = "";
      obj_code = "";  
     // console.log("20200824 this.template_AR[i].objKindZTIC - this.template_AR[i].objKindCode: "+this.template_AR[i].objKindZTIC+" - "+this.template_AR[i].objKindCode); 
      this.addMessageTypeValueToSession(obj_blank_rec, type_val_blank_rec);
    } // endif
   }  // endfor
} // endfor



// start add link to session 


var found_link_in_msg = false;
 obj_ztic = "";
 obj_code = "";

//console.log(" ");
//console.log("* * 20210416 ** start look for link in message");
//console.log("* * 20210416 ** this.template_AR.length: "+this.template_AR.length);


for(var i = 0; i < this.template_AR.length; i++){
//   // console.log("* * 20210302 this.template_AR[i].typeDef_AR.length: "+this.template_AR[i].typeDef_AR.length);
    for(var j = 0; j < this.template_AR[i].linkType_AR.length; j++){
       found_link_in_msg = false;
       for(var k = 0; k < AddMessageLinkToSessionWorkAreaRec_AR.length; k++){
       // console.log("* * 20210416 AddMessageLinkToSessionWorkAreaRec_AR[k].msg_obj.objectZTIC: "+AddMessageLinkToSessionWorkAreaRec_AR[k].msg_obj.objectZTIC);
       // console.log("* * 20210416 AddMessageLinkToSessionWorkAreaRec_AR[k].msg_obj.objectCode: "+AddMessageLinkToSessionWorkAreaRec_AR[k].msg_obj.objectCode);
        if(obj_ztic == ""){obj_ztic = AddMessageLinkToSessionWorkAreaRec_AR[k].msg_obj.objectZTIC.toString().trim();}
        if(obj_code == ""){obj_code = AddMessageLinkToSessionWorkAreaRec_AR[k].msg_obj.objectCode.toString().trim();}


       if(this.template_AR[i].objKindZTIC == AddMessageLinkToSessionWorkAreaRec_AR[k].msg_obj.objectKindZTIC && this.template_AR[i].objKindCode == AddMessageLinkToSessionWorkAreaRec_AR[k].msg_obj.objectKindCode){
         if(this.template_AR[i].linkType_AR[j].linkType_ztic == AddMessageLinkToSessionWorkAreaRec_AR[k].msg_link.linkTypeZTIC && this.template_AR[i].linkType_AR[j].linkType_code == AddMessageLinkToSessionWorkAreaRec_AR[k].msg_link.linkTypeCode){
            if(this.template_AR[i].templLevelsDown == AddMessageLinkToSessionWorkAreaRec_AR[k].levelsDown){           // 20210303
               found_link_in_msg = true;
               //  console.log("* * 20210302c found for obj_ztic - obj_code - linkType_ztic - linkType_code: "+obj_ztic+" - "+obj_code+" - "+this.template_AR[i].linkType_AR[j].linkType_ztic+" - " + this.template_AR[i].linkType_AR[j].linkType_code);
               this.addMessageLinkToSession(AddMessageLinkToSessionWorkAreaRec_AR[k].msg_obj, AddMessageLinkToSessionWorkAreaRec_AR[k].msg_link);
            } // endif if(this.template_AR[i].templLevelsDown == AddMessageLinkToSessionWorkAreaRec_AR[k].levelsDown)
         } // endif
       }  // endif
      }  // endfor


   }  // endfor
} // endfor




// end of add link to session 20210416





} //endif(this.maint_mode == "update)

//console.log("20231210a top_obj_idx: "+top_obj_idx);
//console.log("20231210b this.template_AR[this.top_templ_idx].object_AR[top_obj_idx].objZTIC - objCodeAssigned - objCodeTemp: "+this.template_AR[this.top_templ_idx].object_AR[top_obj_idx].objZTIC+" - "+this.template_AR[this.top_templ_idx].object_AR[top_obj_idx].objCodeAssigned+" - "+this.template_AR[this.top_templ_idx].object_AR[top_obj_idx].objCodeTemp);

}  /// end of setValuesFromInitialMessage(msg)









T2_setValuesFromInitialMessage(msg, DEvalue_AR){   // set values for Type 2 selection-the templates related to top level template

//console.log("20200605 running T2_setValuesFromInitialMessage()");
//console.log("20200605 this.msg.zticDom: "+this.msg.zticDom);
var OEscreenElem_AR = [];

//console.log("20200523 this.ZTICNS_AR.length: "+this.ZTICNS_AR.length);
var base_ztic;
for(var i = 0; i < this.ZTICNS_AR.length; i++){
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

//console.log("20200129 this.msg.queryResponseSetMemberWA_AR.length: "+this.msg.queryResponseSetMemberWA_AR.length);



var T2_templ_AR = [];

for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,14) == "ObjTmplQset:2:"){     //20200605  type 2 respone type
 
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
        //for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

            if(objx.objectKindZTIC == base_ztic && objx.objectKindCode == 2){
               var templ_tech_prof = new TemplateTechProfileIdRec();
               templ_tech_prof.templateZTIC = objx.objectZTIC;
               templ_tech_prof.templateCode = objx.objectCode;
               templ_tech_prof.templateId       = objx.id;
               templ_tech_prof.templateParentId = objx.parentId;
               T2_templ_AR.push(templ_tech_prof);
            } // endif
         //} // endfor 
    }  // endfor
 } // endif  setMemberID.substring(0,14) == "ObjTmplQset:2:
} // endfor loop through msg.queryResponeSetMemberWA_AR

for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,14) == "ObjTmplQset:2:"){     //20200605  type 2 respone type
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
     if(objx.objectKindZTIC == base_ztic && objx.objectKindCode == 12){   // tech profile 
        for(var l = 0; l < T2_templ_AR.length; l++){
            if(objx.parentId == T2_templ_AR[l].templateId){
                 T2_templ_AR[l].techProfileId_AR.push(objx.id);
            } // endif
        } // endfor  loop through T2_templ_AR
     }
   } // endfor loop through object_idx_AR
 } // endif
} // endfor loop through msg.queryResponeSetMemberWA_AR




//console.log("list T2_templ_AR");
for(var l = 0; l < T2_templ_AR.length; l++){
  //console.log("20200801  ");
  //console.log("  T2_templ_AR[l].templateZTIC: "+ T2_templ_AR[l].templateZTIC);
  //console.log("  T2_templ_AR[l].templateCode: "+ T2_templ_AR[l].templateCode);
  //console.log("  T2_templ_AR[l].templateId: "+ T2_templ_AR[l].templateId);
  //console.log("  T2_templ_AR[l].templateParentId: "+ T2_templ_AR[l].templateParentId);
    for(var m = 0; m < T2_templ_AR[l].techProfileId_AR.length; m++){
  //      console.log("techProfileId: "+T2_templ_AR[l].techProfileId_AR[m]);
   }
} // endfor





// start loop of template values for Type 2 response type  
for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,14) == "ObjTmplQset:2:"){     //20200605  type 2 respone type
//  start of get template description
  var T2_templ_ztic = msg.queryResponseSetMemberWA_AR[h].objectTemplateZTIC;   
  var T2_templ_code = msg.queryResponseSetMemberWA_AR[h].objectTemplateCode;
  //console.log("20200605 msg.queryResponseSetMemberWA_AR[h].linkableObjectLinkType_ztic: "+msg.queryResponseSetMemberWA_AR[h].linkableObjectLinkType_ztic);
  //console.log("20200605 msg.queryResponseSetMemberWA_AR[h].linkableObjectLinkType_code: "+msg.queryResponseSetMemberWA_AR[h].linkableObjectLinkType_code);

  
  var tech_profile_id;  // 20200801

   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
  // var i = msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k];  // (del) 20200629  
 // console.log("Object: "+ this.msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectCode);
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
   ///  console.log("20200801 in zt_client_session -- objx.id - objx.parentId: "+objx.id+" - "+objx.parentId);

     



const html_id_prfx = "val";
var templ_idx;
var templ_rec;
//console.log("Object Element values");
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
     //console.log("20200127 base_ztic: "+base_ztic);
     //  begin of get template descrip
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic &&
msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2){      //template desc

         // begin  add template for response type 2
             var new_templ_idx = objx.levelsDown / 2;        // 20201104 REVISIT, divide by 2 because tech profile adds a level between templates
             //var new_parent_templ_idx = new_templ_idx - 1;   // 20201104   (del) 20261022 - only right with one template per level
             // 20261022 parent template = template of the technical profile the template object hangs under; level 1 templates hang under the top template's technical profile, which is not in T2_templ_AR
             var new_parent_templ_idx = this.getTemplateIdxForTechProfile(T2_templ_AR, objx.parentId);
             if(new_parent_templ_idx == null){ new_parent_templ_idx = this.top_templ_idx; }
            // templ_rec = new TemplateRec(this.top_templ_idx, "1", objx.objectZTIC, objx.objectCode );    //20200617   (del) 20201102

            templ_rec = new TemplateRec(new_parent_templ_idx, new_templ_idx, objx.objectZTIC, objx.objectCode );
            // templ_rec = new TemplateRec(this.top_templ_idx, objx.levelsDown, objx.objectZTIC, objx.objectCode );             // 20200911  

             templ_rec.templDesc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
      // console.log("*^20201102 objx.levelsDown/desc/new_parent_templ_idx/new_templ_idx: "+objx.levelsDown + " / "+templ_rec.templDesc+" / "+new_parent_templ_idx+" /"+new_templ_idx);

             templ_rec.linkableObjectLinkType_ztic = msg.queryResponseSetMemberWA_AR[h].linkableObjectLinkType_ztic;   // 20200617
             templ_rec.linkableObjectLinkType_code = msg.queryResponseSetMemberWA_AR[h].linkableObjectLinkType_code;   // 20200617
             //console.log("20200624a objx.type_idx_AR.length: "+objx.type_idx_AR.length);

            // get obj kind ztic and obj kind code from type value of template 
             for(var p = 0; p < objx.type_idx_AR.length; p++){
              // console.log("20200624b objx.type_idx_AR[p]: "+ objx.type_idx_AR[p]);
                         
              // console.log("20200624c msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionZTIC: "+ msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionZTIC);
              // console.log("20200624d msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionCode: "+ msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionCode);
              // console.log("20200624e msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueZTIC: "+ msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueZTIC);
              // console.log("20200624f msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueCode: "+ msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueCode);
               if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionZTIC == base_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionCode == "3"){
                 templ_rec.objKindZTIC =   msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueZTIC;   // 20200624
                 templ_rec.objKindCode =   msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueCode;   // 20200624
                // console.log("20240128b templ_rec.objKindZTIC, templ_rec.objKindCode: "+templ_rec.objKindZTIC + " - " + templ_rec.objKindCode);
               }  // endif
             }  // endfor loop through  objx.type_idx_AR;

             templ_idx = this.template_AR.push(templ_rec) -1;
             this.template_AR[this.top_templ_idx].childTempl_idx_AR.push(templ_idx);
             //console.log("20200629 this.template_AR[this.top_templ_idx].childTempl_idx_AR in zt_client_session: "+this.template_AR[this.top_templ_idx].childTempl_idx_AR);
       
     }   // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12
     //  end of get template description

   if(!(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic &&
        msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2)){

     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3){     // 20200514  also exclude data elem

        // console.log("20200802 in zt_client_session -- objx.id - objx.parentId: "+objx.id+" - "+objx.parentId);
         tech_profile_id = objx.parentId;                             // 20200802
         var oe_templ_idx = this.getTemplateIdxForTechProfile(T2_templ_AR, tech_profile_id);
       // console.log("20200802 oe_templ_idx - tech_profile_id: "+oe_templ_idx+" - "+tech_profile_id);

          var OE_def_rec = new ObjectElementDefinitionRec(); //20200603
          OE_def_rec.OE_ztic = objx.objectZTIC; 
          OE_def_rec.OE_code = objx.objectCode;
     //console.log("20200821 ++#3 this.html_id_cntr: "+this.html_id_cntr);
          OE_def_rec.html_label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
          //OE_def_rec.html_input_val = "";                   // (del) 20200822 html_input_val is not included in OE_def_rec
          //var OE_idx = this.OE_def_AR.push(OE_def_rec) -1;    (del) 20200617      
          //this.template_AR[templ_idx].OE_def_idx_AR.push(OE_idx); (del) 20200617
          this.template_AR[oe_templ_idx].OE_def_AR.push(OE_def_rec);   //    29299617
      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3

     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 214){     // 20200516  include data elem max length
        var DEvalue = new DEvalueRec();    //20200125
        DEvalue.DE_ztic = objx.objectZTIC;                                                                           //20200224
        DEvalue.DE_code = objx.objectCode;                       //20200224
        //DEvalue.OE_max_length = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; // (del) 20200607
        DEvalue.OE_html_size = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;   // 20200607
        DEvalue_AR.push(DEvalue);
      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 31


    }  // endif to suppress template desc
//  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
//+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
//+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

     // start 20261021 type definitions and link types of the related templates (needed for child pages) - same as for the top template in setValuesFromInitialMessage
     if(objx.objectKindZTIC == base_ztic && (objx.objectKindCode == "9" || objx.objectKindCode == "10")){
       var td_templ_idx = this.getTemplateIdxForTechProfile(T2_templ_AR, objx.parentId);
       if(td_templ_idx != null && td_templ_idx != undefined && this.template_AR[td_templ_idx]){
         for(var t = 0; t < objx.objectElement_idx_AR.length; t++){
           var td_oe = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[t]];
           if(objx.objectKindCode == "9" && td_oe.objectElementZTIC == base_ztic && td_oe.objectElementCode == 9){   // type def with description
             var type_def_already_added = false;
             for(var u = 0; u < this.template_AR[td_templ_idx].typeDef_AR.length; u++){
               if(this.template_AR[td_templ_idx].typeDef_AR[u].typeDef_ztic == objx.objectZTIC && this.template_AR[td_templ_idx].typeDef_AR[u].typeDef_code == objx.objectCode){ type_def_already_added = true; }
             } // endfor
             if(!type_def_already_added){
               var typeDef_rec = new TypeDefinitionRec();
               typeDef_rec.typeDef_ztic = objx.objectZTIC;
               typeDef_rec.typeDef_code = objx.objectCode;
               typeDef_rec.typeDef_desc = td_oe.objectElementValue;
               for(var u = 0; u < objx.type_idx_AR.length; u++){
                 if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeDefinitionZTIC == base_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeDefinitionCode == "4"){  // object kind for the type definition
                   typeDef_rec.objectKind_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeValueZTIC;
                   typeDef_rec.objectKind_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeValueCode;
                 } // endif
                 if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeDefinitionZTIC == base_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeDefinitionCode == "14"){  // object set of allowed values - dropdown
                   var allowed_set_already_added = false;
                   for(var n = 0; n < this.typeDefAllowedValueSet_AR.length; n++){
                     if(this.typeDefAllowedValueSet_AR[n].typeDef_ztic == objx.objectZTIC && this.typeDefAllowedValueSet_AR[n].typeDef_code == objx.objectCode){ allowed_set_already_added = true; }
                   } // endfor
                   if(!allowed_set_already_added){
                     var type_def_allowed_value_set_rec = new TypeDefAllowedValueSetRec();
                     type_def_allowed_value_set_rec.typeDef_ztic = objx.objectZTIC;
                     type_def_allowed_value_set_rec.typeDef_code = objx.objectCode;
                     type_def_allowed_value_set_rec.objectSet_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeValueZTIC;
                     type_def_allowed_value_set_rec.objectSet_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[u]].typeValueCode;
                     this.typeDefAllowedValueSet_AR.push(type_def_allowed_value_set_rec);
                   } // endif
                 } // endif
               } // endfor
               this.template_AR[td_templ_idx].typeDef_AR.push(typeDef_rec);
             } // endif !type_def_already_added
           } // endif type def
           if(objx.objectKindCode == "10" && td_oe.objectElementZTIC == base_ztic && td_oe.objectElementCode == 10){   // link type with description
             var link_type_already_added = false;
             for(var u = 0; u < this.template_AR[td_templ_idx].linkType_AR.length; u++){
               if(this.template_AR[td_templ_idx].linkType_AR[u].linkType_ztic == objx.objectZTIC && this.template_AR[td_templ_idx].linkType_AR[u].linkType_code == objx.objectCode){ link_type_already_added = true; }
             } // endfor
             if(!link_type_already_added){
               var linktype_rec = new LinkTypeRec();
               linktype_rec.linkType_ztic = objx.objectZTIC;
               linktype_rec.linkType_code = objx.objectCode;
               linktype_rec.linkType_desc = td_oe.objectElementValue;
               this.template_AR[td_templ_idx].linkType_AR.push(linktype_rec);
             } // endif !link_type_already_added
           } // endif link type
         } // endfor loop through objx.objectElement_idx_AR
       } // endif td_templ_idx found
     } // endif type definition or link type object
     // end 20261021

 //console.log("Type values");

     for(var j = 0; j < objx.type_idx_AR.length; j++){
 // console.log("   20200528 Type DefZTIC/DefCode: ValueZTIC/ValueCode:  "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
//+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
//+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"/"
//+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
          for(var p = 0; p < this.template_AR[templ_idx].OE_def_AR.length; p++){
            if(this.template_AR[templ_idx].OE_def_AR[p].OE_ztic == objx.objectZTIC && this.template_AR[templ_idx].OE_def_AR[p].OE_code == objx.objectCode){
              if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC == base_ztic &&  msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode == 9){
                 this.template_AR[templ_idx].OE_def_AR[p].DE_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC.toString().trim();  
                 this.template_AR[templ_idx].OE_def_AR[p].DE_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode.toString().trim();  
              }  // endif
            }  // endif 
          }  // endfor loop through this.template_AR[this.top_templ_idx].OE_def_idx_AR

      }  // endfor for type values

//console.log("Links");

    for(var j = 0; j < objx.link_idx_AR.length; j++){
//  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

      }  // endfor
    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k

 
}  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQsetType2"){ // temp (del) 20200407

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjTmplQsetType2)

// end loop of template values for Type 2 response type     




this.OE_def_AR = this.getOE_html_size(this.OE_def_AR, DEvalue_AR);      
 

///console.log("   this.OE_def_AR.length: "+this.OE_def_AR.length);
///for(var i = 0; i < this.OE_def_AR.length; i++){

///    console.log(  "OE_ztic       "+ this.OE_def_AR[i].OE_ztic);
///    console.log(  "OE_code       "+ this.OE_def_AR[i].OE_code);
///    console.log(  "DE_ztic       "+ this.OE_def_AR[i].DE_ztic); 
///    console.log(  "DE_code       "+ this.OE_def_AR[i].DE_code);
///   // console.log(  "OE_max_length "+ OEscreenElem_AR[i].OE_max_length);    // (del) 20200607
///    console.log(  "html_size " + this.OE_def_AR[i].html_size);    //  20200607
///} 

//console.log("20200516b list DEvalue_AR in zt_client_session");
for(var i = 0; i < DEvalue_AR.length; i++){
  // console.log(   "DE_ztic       "+DEvalue_AR[i].DE_ztic);
  // console.log(   "DE_code       "+DEvalue_AR[i].DE_code);
 //  console.log(   "OE_max_length "+DEvalue_AR[i].OE_max_length);  //(del) 20200607
 //  console.log(   "OE_html_size "+DEvalue_AR[i].OE_html_size);    //      20200607
}





///  start load object element values saved previously
templ_idx = this.top_templ_idx;   // REVISIT to use this.sel_templ_idx
//console.log("20200630 this.template_AR[templ_idx].childTempl_idx_AR.length: "+this.template_AR[templ_idx].childTempl_idx_AR.length);
for(var i = 0; i < this.template_AR[templ_idx].childTempl_idx_AR.length; i++){  // 20200629
//     console.log("20200630 this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length: "+this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length);
     for(var k = 0; k < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; k++){
        for(var l = 0; l < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[k].OE_val_AR.length; l++){
               T2_oe_val_rec = new ObjectElementValueRec();
               T2_oe_val_rec.OE_value = this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[k].OE_val_AR[l].OE_value;
//               console.log("20200630 T2_oe_val_rec.OE_value: "+T2_oe_val_rec.OE_value);
     }  // endfor
   }  // endfor
}  // endfor


//  end load object element values saved previously



// begin  add blank object for each child template
var T2_oe_val_rec;
var T2_html_id_prfx = "val";
if(this.maint_mode != "display"){
for(var i = 0; i < this.template_AR[this.top_templ_idx].childTempl_idx_AR.length; i++){
  //console.log("*^20201101 this.template_AR[this.template_AR[this.top_templ_idx].childTempl_idx_AR[i]].templLevelsDown: " + this.template_AR[this.template_AR[this.top_templ_idx].childTempl_idx_AR[i]].templLevelsDown);
   if(this.template_AR[this.template_AR[this.top_templ_idx].childTempl_idx_AR[i]].templLevelsDown == 1){   // for create and update go only 1 level down 20201104
   var obj = new ObjectRec();
       obj.objCodeTemp = this.tempCode;   
       this.tempCode++;                   
       obj.newCode = true;                
// start 20200821
       this.html_id_cntr++;    
       obj.objZTIC_ns_html_id  = T2_html_id_prfx + this.html_id_cntr.toString().trim();
       obj.objZTIC_ns_html_input_val = "";

       this.html_id_cntr++;  
       obj.objCodeAssigned_html_id  = T2_html_id_prfx + this.html_id_cntr.toString().trim();
       obj.objCodeAssigned_html_input_val = "";


       this.html_id_cntr++;
       obj.linkStatus_html_id  = T2_html_id_prfx + this.html_id_cntr.toString().trim();
       obj.linkStatus_html_input_val = "";
       this.html_id_cntr++;
       obj.linkValue_html_id  = T2_html_id_prfx + this.html_id_cntr.toString().trim();
       obj.linkValue_html_input_val = "";



   var obj_idx = this.template_AR[this.template_AR[this.top_templ_idx].childTempl_idx_AR[i]].object_AR.push(obj) -1;
   for(var j = 0; j < this.template_AR[this.template_AR[this.top_templ_idx].childTempl_idx_AR[i]].OE_def_AR.length; j++){  
     T2_oe_val_rec = new ObjectElementValueRec();
     T2_oe_val_rec.OE_ztic = this.template_AR[this.template_AR[this.top_templ_idx].childTempl_idx_AR[i]].OE_def_AR[j].OE_ztic;
     T2_oe_val_rec.OE_code =    this.template_AR[this.template_AR[this.top_templ_idx].childTempl_idx_AR[i]].OE_def_AR[j].OE_code;
     this.html_id_cntr++;  // 20200907
     T2_oe_val_rec.html_id  = T2_html_id_prfx + this.html_id_cntr.toString().trim();
     //this.html_id_cntr++;  (del) 20200907
     //console.log("20200821 ++#5 this.html_id_cntr: "+this.html_id_cntr);
     T2_oe_val_rec.OE_value = "";
     this.template_AR[this.template_AR[this.top_templ_idx].childTempl_idx_AR[i]].object_AR[obj_idx].OE_val_AR.push(T2_oe_val_rec); 
   }  // endfor

  } // endif if(this.template_AR[this.template_AR[this.top_templ_idx].ctimeshildTempl_idx_AR[i]].templLevelsDown == 1)  // 20201104

}  // endfor

}  // endif (this.maint_mode != "display"){



// begin  add a blank object to allow a link to an existing object for each child template  
for(var i = 0; i < this.template_AR[this.top_templ_idx].childTempl_idx_AR.length; i++){
   var obj = new ObjectRec();


   this.html_id_cntr++;  // 20200907   
   obj.objZTIC_ns_html_id  = T2_html_id_prfx + this.html_id_cntr.toString().trim();
   //this.html_id_cntr++;  // (del) 20200907

   this.html_id_cntr++;    // 20200907
   obj.objCodeAssigned_html_id = T2_html_id_prfx + this.html_id_cntr.toString().trim();
   //console.log("20200821 ++#6 this.html_id_cntr: "+this.html_id_cntr);


   this.html_id_cntr++; 
   obj.linkStatus_html_id  = T2_html_id_prfx + this.html_id_cntr.toString().trim();
   this.html_id_cntr++; 
   obj.linkValue_html_id  = T2_html_id_prfx + this.html_id_cntr.toString().trim();


   obj.newCode = false;  
   obj.newLinkToExistingObject = true;             
   var obj_idx = this.template_AR[this.template_AR[this.top_templ_idx].childTempl_idx_AR[i]].object_AR.push(obj) -1;
}  // endfor



}  // end of T2_setValuesFromInitialMessage(msg)




T5_setValuesFromInitialMessageForSetMembers(msg, DEvalue_AR){    // set values for Type 5 selection-Set Member data for Sets referred to in standard selection

var base_ztic;
for(var i = 0; i < this.ZTICNS_AR.length; i++){
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

//console.log("20200129 this.msg.queryResponseSetMemberWA_AR.length: "+this.msg.queryResponseSetMemberWA_AR.length);


var T2_templ_AR = [];




for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
 var obj_set_idx;
 var obj_set;
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,13) == "ObjectQset:5:" || msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,13) == "ObjectQset:6:" || msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,14) == "ObjTmplQset:5:" || msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,14) == "ObjTmplQset:6:"){ 
      
  

     obj_set            = new ObjectSetRec();
     obj_set.objSetZTIC     = msg.queryResponseSetMemberWA_AR[h].extendedResponseObjectZTIC;
     obj_set.objSetCode     = msg.queryResponseSetMemberWA_AR[h].extendedResponseObjectCode;
     
     obj_set_idx = this.objectSet_AR.push(obj_set) -1;
     //console.log("20230328 this.objectSet_AR[obj_set_idx].objSetZTIC, objSetCode: "+this.objectSet_AR[obj_set_idx].objSetZTIC+" - "+this.objectSet_AR[obj_set_idx].objSetCode );

  

   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
 // console.log("Object: "+ this.msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectCode);
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
     var set_member_obj = new ObjectSetMemberObjectRec();
     set_member_obj.objectKindZTIC  =  objx.objectKindZTIC;
     set_member_obj.objectKindCode  =  objx.objectKindCode;
     set_member_obj.objectZTIC      =  objx.objectZTIC;
     set_member_obj.objectCode        = objx.objectCode; // 20210327




//console.log("Object Element values");
    //queryResponseObjectElementWA_AR = [];     
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
            var set_mbr_oe_val = new ObjectElementValueRec();
            set_mbr_oe_val.OE_ztic = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;
            set_mbr_oe_val.OE_code = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;
            set_mbr_oe_val.OE_value = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
            set_member_obj.OE_val_AR.push(set_mbr_oe_val);
      

      }  // endfor loop through objx.objectElement_idx_AR  

 //console.log("20200515a Type values");

     for(var j = 0; j < objx.type_idx_AR.length; j++){

       var set_mbr_type_val = new TypeValueRec();
       set_mbr_type_val.typeDef_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC;
       set_mbr_type_val.typeDef_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode;
       set_mbr_type_val.typeVal_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC;
       set_mbr_type_val.typeVal_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode;
       set_member_obj.typeVal_AR.push(set_mbr_type_val);
      
/////  console.log("   20200528 Type DefZTIC/DefCode: ValueZTIC/ValueCode:  "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
/////+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
/////+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"/"
/////+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);


      }  // endfor for type values

//console.log("Links");

    for(var j = 0; j < objx.link_idx_AR.length; j++){
//  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

       var set_mbr_link = new LinkRec();
       set_mbr_link.linkType_ztic   = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC;
       set_mbr_link.linkType_code   = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode;
       set_mbr_link.linkToKind_ztic = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC;
       set_mbr_link.linkToKind_code = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode;
       set_mbr_link.linkToObj_ztic  = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC;
       set_mbr_link.linkToObj_code  = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode;
       set_mbr_link.linkStatus      = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkStatus;      // 20210303
       set_mbr_link.linkValue       = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkValue;       // 20210303
       set_member_obj.link_AR.push(set_mbr_link);


      }  // endfor
  //   } // endif if(templateHasTechProfile()){    // 20200801

        this.objectSet_AR[obj_set_idx].objSetMember_AR.push(set_member_obj); // 20201114

    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k

  //}  // endif if(T2_templ_ztic == T2_templ_AR[l].templateZTIC && T2_templ_code == T2_templ_AR[l].templateCode  20200801
 
}  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQsetType2"){ // temp (del) 20200407

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjTmplQsetType2)



//console.log("this.objectSet_AR.length at end of T5_setValuesFrom.. in zt_client_session: "+this.objectSet_AR.length);

}  // end of T5_setValuesFromInitialMessageForSetMembers(msg, DEvalue_AR){











                        

T7_setValuesFromInitialMessageForTypeValueBasedTemplateRules(msg, DEvalue_AR){    // set values for Type 7 selection--Templates used for type value based template rules

//console.log("20240109b running T7_setValuesFromInitialMessageForTypeValueBasedTemplateRules()");
//console.log("20200605 this.msg.zticDom: "+this.msg.zticDom);
var OEscreenElem_AR = [];
//var DEvalue_AR      = [];

var base_ztic;
for(var i = 0; i < this.ZTICNS_AR.length; i++){
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor





var T7_templ_AR = [];
var TVBTR_top_templ_idx_found = false;

for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,14) == "ObjTmplQset:7:"){     //20200605  type 7 respone type -- template for type based template rule

     var T7_templ_ztic = msg.queryResponseSetMemberWA_AR[h].objectTemplateZTIC;   
     var T7_templ_code = msg.queryResponseSetMemberWA_AR[h].objectTemplateCode;
     // console.log("20200604b templ_ztic - templ_code: "+templ_ztic+" - "+templ_code);
     var T7_top_templ = new TemplateRec(null, "0", T7_templ_ztic, T7_templ_code);     //20200603
     var T7_top_templ_def = new TemplateDefRec(T7_templ_ztic, T7_templ_code);     // 20200930

     //top_templ.objKindZTIC     = OK_zticx;                             // 20200615    (del) 20200813
     //top_templ.objKindCode     = OK_codex;                             // 20200615    (del) 20200813
     if(this.TVBTR_template_AR.length == 0){
       this.TVBTR_top_templ_idx = this.TVBTR_template_AR.push(T7_top_templ) -1;                 //20200603
       //this.TVBTR_top_templ_idx = 0;    // 20240110 TEST
       this.TVBTR_top_templ_def_idx = this.TVBTR_templateDef_AR.push(T7_top_templ_def) -1;     // 20200930
     } // endif this.TVBTR_template_AR.length == 0
     TVBTR_top_templ_idx_found = true;    // 20231122




   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
            if(objx.objectKindZTIC == base_ztic && objx.objectKindCode == 2){
               var templ_tech_prof = new TemplateTechProfileIdRec();
               templ_tech_prof.templateZTIC = objx.objectZTIC;
               templ_tech_prof.templateCode = objx.objectCode;
               templ_tech_prof.templateId       = msg.queryResponseSetMemberWA_AR[h].setMemberID.trim() +"_"+ objx.id;  // 20240109
               templ_tech_prof.templateParentId = objx.parentId;
               T7_templ_AR.push(templ_tech_prof);
            } // endif
         //} // endfor 
    }  // endfor
 } // endif  setMemberID.substring(0,14) == "ObjTmplQset:7:
} // endfor loop through msg.queryResponeSetMemberWA_AR

for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,14) == "ObjTmplQset:7:"){     //20200605  type 7 respone type
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
     if(objx.objectKindZTIC == base_ztic && objx.objectKindCode == 12){   // tech profile 
        for(var l = 0; l < T7_templ_AR.length; l++){
            const tech_prof_templ_id = msg.queryResponseSetMemberWA_AR[h].setMemberID.trim() +"_"+ objx.parentId;  // 20240109
            const tech_prof_id = msg.queryResponseSetMemberWA_AR[h].setMemberID.trim() +"_"+ objx.id;  // 20240109
            //if(objx.parentId == T7_templ_AR[l].templateId){
            if(tech_prof_templ_id == T7_templ_AR[l].templateId){  // 20240109
                 //T7_templ_AR[l].techProfileId_AR.push(objx.id);
                 T7_templ_AR[l].techProfileId_AR.push(tech_prof_id);  // 20240109
            } // endif
        } // endfor  loop through T7_templ_AR
     }
   } // endfor loop through object_idx_AR
 } // endif
} // endfor loop through msg.queryResponeSetMemberWA_AR


if(TVBTR_top_templ_idx_found){   

//console.log("list T7_templ_AR");
for(var l = 0; l < T7_templ_AR.length; l++){

  //console.log("  T7_templ_AR[l].templateZTIC: "+ T7_templ_AR[l].templateZTIC);
  //console.log("  T7_templ_AR[l].templateCode: "+ T7_templ_AR[l].templateCode);
  //console.log("  T7_templ_AR[l].templateId: "+ T7_templ_AR[l].templateId);
  //console.log("  T7_templ_AR[l].templateParentId: "+ T7_templ_AR[l].templateParentId);
    for(var m = 0; m < T7_templ_AR[l].techProfileId_AR.length; m++){
  //      console.log("techProfileId: "+T7_templ_AR[l].techProfileId_AR[m]);
   }
} // endfor


// start loop of template values for Type 7 response type  
//console.log("20240109c msg.queryResponseSetMemberWA_AR.length: "+msg.queryResponseSetMemberWA_AR.length);
for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
  //console.log("20240110d msg.queryResponseSetMemberWA_AR[h].setMemberID: "+msg.queryResponseSetMemberWA_AR[h].setMemberID);
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,14) == "ObjTmplQset:7:"){     //  type 7 respone type
  //console.log("20240110e msg.queryResponseSetMemberWA_AR[h].setMemberID: "+msg.queryResponseSetMemberWA_AR[h].setMemberID);
  var T7_templ_ztic = msg.queryResponseSetMemberWA_AR[h].objectTemplateZTIC;   
  var T7_templ_code = msg.queryResponseSetMemberWA_AR[h].objectTemplateCode;
  
  var tech_profile_id;  // 20200801
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){ 
 
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
   ///  console.log("20200801 in zt_client_session -- objx.id - objx.parentId: "+objx.id+" - "+objx.parentId);



const html_id_prfx = "val";
var TVBTR_templ_idx;
var TVBTR_templ_rec;
//console.log("Object Element values");
    //console.log("20240110f objx.objectElement_idx_AR.length: "+objx.objectElement_idx_AR.length);
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
     // 20200421 begin of get template descrip
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic &&
msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2){      //template desc

         // begin 20200607 add template for response type 2
             //console.log("20231114i objx.levelsDown: "+objx.levelsDown);
             var new_templ_idx = objx.levelsDown / 2;        // 20201104 REVISIT, divide by 2 because tech profile adds a level between templates
             var new_parent_templ_idx = new_templ_idx - 1;   // 20201104
             //console.log("20240110g objx.objectDSCIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
             TVBTR_templ_rec = new TemplateRec(this.TVBTR_top_templ_idx, "1", objx.objectZTIC, objx.objectCode );    

            TVBTR_templ_rec.templDesc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
      // console.log("*^20201102 objx.levelsDown/desc/new_parent_templ_idx/new_templ_idx: "+objx.levelsDown + " / "+templ_rec.templDesc+" / "+new_parent_templ_idx+" /"+new_templ_idx);

            TVBTR_templ_rec.linkableObjectLinkType_ztic = msg.queryResponseSetMemberWA_AR[h].linkableObjectLinkType_ztic;   // 20200617
            TVBTR_templ_rec.linkableObjectLinkType_code = msg.queryResponseSetMemberWA_AR[h].linkableObjectLinkType_code;   // 20200617
             //console.log("20200624a objx.type_idx_AR.length: "+objx.type_idx_AR.length);

            // get obj kind ztic and obj kind code from type value of template  
             for(var p = 0; p < objx.type_idx_AR.length; p++){
              // console.log("20200624b objx.type_idx_AR[p]: "+ objx.type_idx_AR[p]);
                         
              // console.log("20200624c msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionZTIC: "+ msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionZTIC);
              // console.log("20200624d msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionCode: "+ msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionCode);
              // console.log("20200624e msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueZTIC: "+ msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueZTIC);
              // console.log("20200624f msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueCode: "+ msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueCode);
               if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionZTIC == base_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeDefinitionCode == "3"){
                 TVBTR_templ_rec.objKindZTIC =   msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueZTIC;   // 20200624
                 TVBTR_templ_rec.objKindCode =   msg.queryResponseTypeWA_AR[objx.type_idx_AR[p]].typeValueCode;   // 20200624
                // console.log("20200624g templ_rec.objKindZTIC, templ_rec.objKindCode: "+templ_rec.objKindZTIC + " - " + templ_rec.objKindCode);
               }  // endif
             }  // endfor loop through  objx.type_idx_AR;


             TVBTR_templ_idx = this.TVBTR_template_AR.push(TVBTR_templ_rec) -1;
             this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR.push(TVBTR_templ_idx);
             //console.log("20240110h this.TVBTR_template_AR.length:"+this.TVBTR_template_AR.length);
             //console.log("20240110i this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR.length:"+this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR.length); 
             //console.log("20240110j this.TVBTR_top_templ_idx: "+this.TVBTR_top_templ_idx);
             //console.log("20200629 this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR in zt_client_session: "+this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR);
         // end 20200607
     
     }   // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12
     //  end of get template description

   if(!(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic &&
        msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2)){

     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3){     // 20200514  also exclude data elem

         tech_profile_id = msg.queryResponseSetMemberWA_AR[h].setMemberID.trim() +"_"+ objx.parentId;  // 20240109
         var oe_templ_idx = this.T7_getTemplateIdxForTechProfile(T7_templ_AR, tech_profile_id);

          var OE_def_rec = new ObjectElementDefinitionRec(); //20200603
          OE_def_rec.OE_ztic = objx.objectZTIC; 
          OE_def_rec.OE_code = objx.objectCode;
          OE_def_rec.html_label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
          //console.log("20231115e OE_def_rec.html_label: "+OE_def_rec.html_label); //
          this.TVBTR_template_AR[oe_templ_idx].OE_def_AR.push(OE_def_rec);   //    29299617
      // 20200608 end insert
        //} // endif 20240107 if(!oe_templ_idx == null){   // 20240107
       // } // endif if(templateHasTechProfile(){    // 20200801
      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3

     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 214){     // 20200516  include data elem max length
        var DEvalue = new DEvalueRec();    //20200125
        DEvalue.DE_ztic = objx.objectZTIC;                                                                           //20200224
        DEvalue.DE_code = objx.objectCode;                       //20200224
        //DEvalue.OE_max_length = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; // (del) 20200607
        DEvalue.OE_html_size = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;   // 20200607
        DEvalue_AR.push(DEvalue);
      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 31


    }  // endif to suppress template desc
//  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
//+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
//+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

 //console.log("20200515a Type values");

     for(var j = 0; j < objx.type_idx_AR.length; j++){
 // console.log("   20200528 Type DefZTIC/DefCode: ValueZTIC/ValueCode:  "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
//+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
//+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"/"
//+msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
          // 20200608 begin  insert
          for(var p = 0; p < this.TVBTR_template_AR[TVBTR_templ_idx].OE_def_AR.length; p++){
            if(this.TVBTR_template_AR[TVBTR_templ_idx].OE_def_AR[p].OE_ztic == objx.objectZTIC && this.TVBTR_template_AR[TVBTR_templ_idx].OE_def_AR[p].OE_code == objx.objectCode){
              if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC == base_ztic &&  msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode == 9){
                 this.TVBTR_template_AR[TVBTR_templ_idx].OE_def_AR[p].DE_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC.toString().trim();  
                 this.TVBTR_template_AR[TVBTR_templ_idx].OE_def_AR[p].DE_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode.toString().trim();  
              }  // endif
            }  // endif 
          }  // endfor loop through this.TVBTR_template_AR[this.TVBTR_top_templ_idx].OE_def_idx_AR
        // 20200608 end insert

      }  // endfor for type values
  // } // endif if(templateHasTechProfile(){    // 20200801

//console.log("Links");

  // if(this.templateHasTechProfile(T2_templ_AR, templ_rec.templZTIC, templ_rec.templCode, tech_profile_id)){    // 20200801
  //var link_templ_idx = this.getTemplateIdxForTechProfile(T2_templ_AR, tech_profile_id);
    for(var j = 0; j < objx.link_idx_AR.length; j++){
//  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

      }  // endfor
  //   } // endif if(templateHasTechProfile()){    // 20200801
    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k

  //}  // endif if(T2_templ_ztic == T2_templ_AR[l].templateZTIC && T2_templ_code == T2_templ_AR[l].templateCode  20200801
 
}  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQsetType2"){ // temp (del) 20200407

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjTmplQsetType2)

// end loop of template values for Type 2 response type     20200528




this.OE_def_AR = this.getOE_html_size(this.OE_def_AR, DEvalue_AR);      // 20200607
 

///console.log("20200607b list this.OE_def_AR");times
///console.log("   this.OE_def_AR.length: "+this.OE_def_AR.length);
///for(var i = 0; i < this.OE_def_AR.length; i++){

///    console.log(  "OE_ztic       "+ this.OE_def_AR[i].OE_ztic);
///    console.log(  "OE_code       "+ this.OE_def_AR[i].OE_code);
///    console.log(  "DE_ztic       "+ this.OE_def_AR[i].DE_ztic); 
///    console.log(  "DE_code       "+ this.OE_def_AR[i].DE_code);
///   // console.log(  "OE_max_length "+ OEscreenElem_AR[i].OE_max_length);    // (del) 20200607
///    console.log(  "html_size " + this.OE_def_AR[i].html_size);    //  20200607
///} 






/// // 20200629 start load object element values saved previously
//console.log("20231122e TVBTR_top_templ_idx_found): "+TVBTR_top_templ_idx_found);
TVBTR_templ_idx = this.TVBTR_top_templ_idx;   // REVISIT to use this.sel_templ_idx
//console.log("20231202a this.TVBTR_template_AR[TVBTR_templ_idx].childTempl_idx_AR.length: "+this.TVBTR_template_AR[TVBTR_templ_idx].childTempl_idx_AR.length);
for(var i = 0; i < this.TVBTR_template_AR[TVBTR_templ_idx].childTempl_idx_AR.length; i++){  // 20200629


 //    console.log("20231202b this.TVBTR_template_AR[this.TVBTR_template_AR[TVBTR_templ_idx].childTempl_idx_AR[i]].object_AR.length: "+this.TVBTR_template_AR[this.TVBTR_template_AR[TVBTR_templ_idx].childTempl_idx_AR[i]].object_AR.length);
     for(var k = 0; k < this.TVBTR_template_AR[this.TVBTR_template_AR[TVBTR_templ_idx].childTempl_idx_AR[i]].object_AR.length; k++){
        for(var l = 0; l < this.TVBTR_template_AR[this.TVBTR_template_AR[TVBTR_templ_idx].childTempl_idx_AR[i]].object_AR[k].OE_val_AR.length; l++){
      
               T7_oe_val_rec = new ObjectElementValueRec();
               T7_oe_val_rec.OE_value = this.TVBTR_template_AR[this.TVBTR_template_AR[TVBTR_templ_idx].childTempl_idx_AR[i]].object_AR[k].OE_val_AR[l].OE_value;
           //    console.log("20231202d T7_oe_val_rec.OE_value: "+T7_oe_val_rec.OE_value);
     }  // endfor
   }  // endfor
}  // endfor


// 20200629 end load object element values saved previously



// begin 20200617  add blank object for each child template
var T7_oe_val_rec;
var T7_html_id_prfx = "val";
if(this.maint_mode != "display"){
 // console.log("20231114g this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR.length: "+this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR.length);
for(var i = 0; i < this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR.length; i++){
 // console.log("20231114h this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVTBR_top_templ_idx].childTempl_idx_AR[i]].templLevelsDown: " + this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR[i]].templLevelsDown);
   if(this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR[i]].templLevelsDown == 1){   // for create and update go only 1 level down 20201104
   var obj = new ObjectRec();
       obj.objCodeTemp = this.tempCode;   // 20200619
       this.tempCode++;                   // 20200619
       obj.newCode = true;                // 20200626
// start 20200821
       this.html_id_cntr++;    // 20200907
       obj.objZTIC_ns_html_id  = T7_html_id_prfx + this.html_id_cntr.toString().trim();
       //this.html_id_cntr++;  // (del) 20200907
       obj.objZTIC_ns_html_input_val = "";

       this.html_id_cntr++;   // 20200907
       obj.objCodeAssigned_html_id  = T7_html_id_prfx + this.html_id_cntr.toString().trim();
       //this.html_id_cntr++;  // (del) 20200907
       // console.log("20200821 ++#4 this.html_id_cntr: "+this.html_id_cntr);
       obj.objCodeAssigned_html_input_val = "";

// start 20210404
       this.html_id_cntr++;
       obj.linkStatus_html_id  = T7_html_id_prfx + this.html_id_cntr.toString().trim();
       obj.linkStatus_html_input_val = "";
       this.html_id_cntr++;
       obj.linkValue_html_id  = T7_html_id_prfx + this.html_id_cntr.toString().trim();
       obj.linkValue_html_input_val = "";
// end 20210404

// end 20200821

   var obj_idx = this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR[i]].object_AR.push(obj) -1;
   //console.log("20231114f this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR[i]].OE_def_AR.length: "+this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR[i]].OE_def_AR.length);
   for(var j = 0; j < this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR[i]].OE_def_AR.length; j++){  
     T7_oe_val_rec = new ObjectElementValueRec();
     T7_oe_val_rec.OE_ztic = this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR[i]].OE_def_AR[j].OE_ztic;
     T7_oe_val_rec.OE_code =    this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR[i]].OE_def_AR[j].OE_code;
     this.html_id_cntr++;  // 20200907
     T7_oe_val_rec.html_id  = T7_html_id_prfx + this.html_id_cntr.toString().trim();
     //this.html_id_cntr++;  (del) 20200907
     //console.log("20200821 ++#5 this.html_id_cntr: "+this.html_id_cntr);
     T7_oe_val_rec.OE_value = "";
     //console.log("20231114e ready to push OE_val_AR: ")
     this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR[i]].object_AR[obj_idx].OE_val_AR.push(T7_oe_val_rec); 
   }  // endfor

  } // endif if(this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].ctimeshildTempl_idx_AR[i]].templLevelsDown == 1)  // 20201104

}  // endfor

}  // endif (this.maint_mode != "display"){

// end 20200617

// begin 20200820 add a blank object to allow a link to an existing object for each child template  
for(var i = 0; i < this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR.length; i++){
   var obj = new ObjectRec();

   this.html_id_cntr++;  // 20200907   
   obj.objZTIC_ns_html_id  = T7_html_id_prfx + this.html_id_cntr.toString().trim();
   //this.html_id_cntr++;  // (del) 20200907

   this.html_id_cntr++;    // 20200907
   obj.objCodeAssigned_html_id = T7_html_id_prfx + this.html_id_cntr.toString().trim();
   //this.html_id_cntr++;  // (del) 20200907
   //console.log("20200821 ++#6 this.html_id_cntr: "+this.html_id_cntr);

// start 20210404
   this.html_id_cntr++; 
   obj.linkStatus_html_id  = T7_html_id_prfx + this.html_id_cntr.toString().trim();
   this.html_id_cntr++; 
   obj.linkValue_html_id  = T7_html_id_prfx + this.html_id_cntr.toString().trim();
// end 20210404

   obj.newCode = false;  
   obj.newLinkToExistingObject = true;             
   var obj_idx = this.TVBTR_template_AR[this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR[i]].object_AR.push(obj) -1;
}  // endfor


//console.log("20231113 this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR.length: "+this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR.length);
for(var i = 0; i < this.TVBTR_template_AR[this.TVBTR_top_templ_idx].childTempl_idx_AR.length; i++){
   // list templates...

}  // endfor loop through childTempl_idx_AR.length

}  // endif if(TVBTR_top_templ_idx_found){  
  
  }  // end of T7_setValuesFromInitialMessageForTypeValueBasedTemplateRules(msg, DEvalue_AR)

// 20231111 end set T7_setValuesFromInitialMessageForTypeValueBasedTemplateRules()





setValuesFromInitialMessageForSpreadsheets(msg, DEvalue_AR){



//console.log("20240225a running setValuesFromInitialMessageForSpreadsheets() in zt_client_session.js");
//console.log("20200605 this.msg.zticDom: "+this.msg.zticDom);

//console.log("20200523 this.ZTICNS_AR.length: "+this.ZTICNS_AR.length);
var base_ztic;
for(var i = 0; i < this.ZTICNS_AR.length; i++){
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

//console.log("20201125 msg.queryResponseSetMemberWA_AR.length: "+msg.queryResponseSetMemberWA_AR.length);


//NOTE REVISIT - CONVERT TO SETTING SPREADSHEET WORKBOOK DATA

//var T2_templ_AR = [];            

var spreadsheet_ztic = "";
for(var i = 0; i < this.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/spreadsheet"){
       spreadsheet_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor



var wb_wa = require('./zt_client_spreadsheet_workarea');  // 20220521, moved from below

//console.log("20221102 msg.queryResponseSetMemberWA_AR.length in setValuesFromInitialMessageForSpreaadsheets(): "+msg.queryResponseSetMemberWA_AR.length);
for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
  //console.log("20221102 msg.queryResponseSetMemberWA_AR[h].setMemberID: "+msg.queryResponseSetMemberWA_AR[h].setMemberID);
 //if(msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,14) == "ObjTmplQset:2:"){     //20200605  type 2 respone type  (del) 20201125
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
        //for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

            if(objx.objectKindZTIC == spreadsheet_ztic && objx.objectKindCode == 1){
              var new_sprd_sht_workbook = new (require('./zt_client_spreadsheet'))(this);
              new_sprd_sht_workbook.wb_ztic = objx.objectZTIC;
              new_sprd_sht_workbook.wb_code = objx.objectCode;
             // console.log("&&& 20210723 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC + " - "+objx.objectCode);
              new_sprd_sht_workbook.wb_id       = objx.id;
              new_sprd_sht_workbook.wb_parent_id = objx.parentId;
              // start 20210725
              for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
                 var OE_ztic = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;
                 var OE_code = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;
                 //console.log("&&& 20210725 OE_ztic - OE_code: "+OE_ztic+" - "+OE_code)
                 if(OE_ztic == spreadsheet_ztic && OE_code == "2"){
                 //  console.log("new_sprd_sht_workbook.label: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
                   new_sprd_sht_workbook.label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
                 } // endif
              }  // endfor loop through objx.objectElement_idx_AR
              // end 20210725
              
              // start 20220521 store links from spreadsheet workbook to i.e. columns to find the link value to determine display order
              for(var j = 0; j < objx.link_idx_AR.length; j++){
                if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == spreadsheet_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "2"){  //spreadsheet workbook to column REVISIT ADD ROWS LATER
                  var new_workbook_link = new wb_wa.WorkbookLink();
                  
              new_workbook_link.linkTypeZTIC    = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC;   
              new_workbook_link.linkTypeCode    = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode;   
              new_workbook_link.linkToKindZTIC  = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC;   
           new_workbook_link.linkToKindCode  = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode;                   
                  
                  new_workbook_link.linkToZTIC = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC;
                  new_workbook_link.linkToCode = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode;
                  new_workbook_link.status     = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].status;
                  new_workbook_link.timestampEff = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].timestampEff;
                  new_workbook_link.linkValue    = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkValue;
                  new_sprd_sht_workbook.link_AR.push(new_workbook_link);
                }  // endif spreadsheet workbook to column link

                // start 20230810 add index of statistical values object to spreadsheet workbook
                if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == spreadsheet_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "9"){  // link to stat val obj
                  for(var v = 0; v < this.statisticalValuesObject_AR.length; v++){
                    if(this.statisticalValuesObject_AR[v].sv_obj_ztic == msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC  && this.statisticalValuesObject_AR[v].sv_obj_code == msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode){
                      new_sprd_sht_workbook.stat_val_obj_idx_AR.push(v);
                    }  // endif                  
                  } // endfor loop through statisticalValueObject_AR
                }  // endif spreadsheet workbook to statistical values object link  
                // end 20230810

              }  // endfor loop through link_idx_AR
              
              // end 20220521

              this.workbook_AR.push(new_sprd_sht_workbook);
              //console.log("**^ 20201204 added new spreadsheet new_sprd_sht_workbook.wb_code: "+ new_sprd_sht_workbook.wb_code);
              // T2_templ_AR.push(templ_tech_prof);
            } // endif
         //} // endfor 
    }  // endfor
 } // endif  setMemberID.substring(0,14) == "ObjTmplQset:2:
} // endfor loop through msg.queryResponeSetMemberWA_AR



// start get columns, rows and spreadsheets
for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
  if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
     if(objx.objectKindZTIC == spreadsheet_ztic && objx.objectKindCode == 2){   // spreadsheet 
       //console.log("20230901g objx.objectZTIC - objx.objectCode: "+objx.objectZTIC + " - "+ objx.objectCode);
       var new_sheet = new wb_wa.MaintainSheet(objx.objectZTIC, objx.objectCode );
       new_sheet.sheetId = objx.id;
       new_sheet.sheetParentId = objx.parentId;
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
         var OE_ztic = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;
         var OE_code = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;
         //console.log("&&& 20210725 OE_ztic - OE_code: "+OE_ztic+" - "+OE_code);
         if(OE_ztic == spreadsheet_ztic && OE_code == "4"){
         //  console.log("new_col.desc: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
           new_sheet.desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
         } // endif
         if(OE_ztic == spreadsheet_ztic && OE_code == "5"){
          // console.log("new_col.label: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
           new_sheet.label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
         } // endif
     }  // endfor loop through objx.objectElement_idx_AR
// end 20210725


// start 20230811
     // console.log("20230901f objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var q = 0; q < objx.type_idx_AR.length; q++){ 

      // console.log("20230901e msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_ztic - msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_code: "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC+ " - " + msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode);
      
      // start 20230901
      if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "2"){    // sheet type for a sheet
        new_sheet.sheetTypeZTIC = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
        new_sheet.sheetTypeCode = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
      } // endif
      // end 20230901

       
         if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "15"){    // statistical values dimension for a sheet
            new_sheet.sv_dimension_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
            new_sheet.sv_dimension_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;

            // start 20230831
            for(var r = 0; r < msg.queryResponseStatisticalValuesObjectWA_AR.length; r++){
              for(var s = 0; s < msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR.length; s++){
                  if(msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].sv_dimension_ztic == new_sheet.sv_dimension_ztic && msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].sv_dimension_code == new_sheet.sv_dimension_code){
                    let locl_type_def_idx_in_dimension  = msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].type_def_idx_for_summarization;                   
                    new_sheet.sv_type_def_ztic = msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].typeDefinitionAndValue_AR[locl_type_def_idx_in_dimension].type_def_ztic;
                    new_sheet.sv_type_def_code = msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].typeDefinitionAndValue_AR[locl_type_def_idx_in_dimension].type_def_code;
                  }  // endif
                     //  queryResponseStatisticalValuesObjectWA_AR  dimension_AR   typeDefinitionAndValue_AR  type_def_idx_for_summarization
         
              }  // endfor loop through dimension_AR
                     
            } // endfor loop through .. StatisticalValuesObjectWA_AR
          // end 20230831
         } // endif
    } // endfor loop through type_idx_AR
// end 20230811

        for(var r = 0; r < this.workbook_AR.length; r++){
          // console.log("+ 20210105 new_sheet.sheetParentId - this.workbook_AR[r].wb_id: "+new_sheet.sheetParentId+" - "+this.workbook_AR[r].wb_id);
           if(new_sheet.sheetParentId == this.workbook_AR[r].wb_id){
             this.workbook_AR[r].sheet_AR.push(new_sheet);           
           }  // endif
        } // endfor
// end un-commented 20230811
     
     }  // endif it's a spreadsheet


     if(objx.objectKindZTIC == spreadsheet_ztic && objx.objectKindCode == 3){   // column
       var new_col = new wb_wa.MaintainColumn(objx.objectZTIC, objx.objectCode);
       new_col.colId       = objx.id;
       new_col.colParentId = objx.parentId;
       //console.log(" ");
       //console.log("&&& 20210721 getting column data");



// start 20210724
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
         var OE_ztic = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;
         var OE_code = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;
         //console.log("&&& 20210724 OE_ztic - OE_code: "+OE_ztic+" - "+OE_code);
         if(OE_ztic == spreadsheet_ztic && OE_code == "6"){
          // console.log("new_col.desc: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
           new_col.desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
         } // endif
         if(OE_ztic == spreadsheet_ztic && OE_code == "7"){
           //console.log("new_col.label: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
           new_col.label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
         } // endif
     }  // endfor loop through objx.objectElement_idx_AR
// end 20210724


       for(var q = 0; q < objx.type_idx_AR.length; q++){           
         //console.log("20201204 msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_ztic - msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_code: "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC+ " - " + msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode);
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "3"){    // type def for col type
               new_col.colTypeZTIC = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_col.colTypeCode = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
          } // endif

          // start 20210103
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "6"){    // type def for object element for column
               new_col.OE_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_col.OE_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
          } // endif

          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "7"){    // type def for set for column generation for column
               new_col.colGenSetZTIC = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_col.colGenSetCode = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
          } // endif

          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "10"){    // type def for sort level of column
               new_col.colSortLevel = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
               //console.log("**+ 20210329 new_col.colSortLevel in zt_client_session: "+new_col.colSortLevel);
          } // endif

          // end 20210103  add type definition to find type values for a row type def to put into a column
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "18"){    // type def for sort level of column
            new_col.colTypeDefZTIC = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
            new_col.colTypeDefCode = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
       } // endif
          // start 20231001

          // end 20231001

          // start 20230811
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "16"){    // type def for statistical values dimension for column
            new_col.sv_dimension_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
            new_col.sv_dimension_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;

            // start 20230831
            for(var r = 0; r < msg.queryResponseStatisticalValuesObjectWA_AR.length; r++){
                 for(var s = 0; s < msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR.length; s++){
                    if(msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].sv_dimension_ztic == new_col.sv_dimension_ztic && msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].sv_dimension_code == new_col.sv_dimension_code){
                       let locl_type_def_idx_in_dimension  = msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].type_def_idx_for_summarization;                   
                       new_col.sv_type_def_ztic = msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].typeDefinitionAndValue_AR[locl_type_def_idx_in_dimension].type_def_ztic;
                       new_col.sv_type_def_code = msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].typeDefinitionAndValue_AR[locl_type_def_idx_in_dimension].type_def_code;
                    }  // endif
            //  queryResponseStatisticalValuesObjectWA_AR  dimension_AR   typeDefinitionAndValue_AR  type_def_idx_for_summarization

            }  // endfor loop through dimension_AR
            
           } // endfor loop through .. StatisticalValuesObjectWA_AR
           // end 20230831

          } // endif
          // end 20230811

       } // endfor loop through objx.type_idx_AR



// end (del) 20210103
     //console.log("+ 20210105 this.workbook_AR.length: " +this.workbook_AR.length);
        for(var r = 0; r < this.workbook_AR.length; r++){
           //console.log("+ 20210105 new_col.colParentId - this.workbook_AR[r].wb_id: "+new_col.colParentId+" - "+this.workbook_AR[r].wb_id);
           if(new_col.colParentId == this.workbook_AR[r].wb_id){
             // start 20220523
               for(var s = 0; s < this.workbook_AR[r].link_AR.length; s++){
                 //capture linkValue for link from workbook to a column
                 if(this.workbook_AR[r].link_AR[s].linkTypeZTIC == spreadsheet_ztic && this.workbook_AR[r].link_AR[s].linkTypeCode == "2" && this.workbook_AR[r].link_AR[s].linkToZTIC == new_col.column_ztic && 
                 this.workbook_AR[r].link_AR[s].linkToCode == new_col.column_code){
                  new_col.linkValueFromWorkbook = this.workbook_AR[r].link_AR[s].linkValue;
                  new_col.sortStr = 99999 - new_col.linkValueFromWorkbook;
                 // console.log("+++ 20220523 new_col.sortStr: "+new_col.sortStr);
                 }
               }   // loop through this.workbook_AR[r].link_AR
             // end 20220523                                                
             this.workbook_AR[r].column_AR.push(new_col);           
           }  // endif
        } // endfor 

      //console.log("20201204 adding new column objx.objectCode: "+objx.objectCode);
     }  // endif it's a column

     if(objx.objectKindZTIC == spreadsheet_ztic && objx.objectKindCode == 4){   // row
      var new_row = new wb_wa.MaintainRow(objx.objectZTIC, objx.objectCode);
        new_row.rowId       = objx.id;
        new_row.rowParentId = objx.parentId;
      



// start 20240902
for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  var OE_ztic = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;
  var OE_code = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;
  //console.log("&&& 20210724 OE_ztic - OE_code: "+OE_ztic+" - "+OE_code);
  if(OE_ztic == spreadsheet_ztic && OE_code == "8"){
   // console.log("new_row.desc: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
    new_row.desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
  } // endif
  if(OE_ztic == spreadsheet_ztic && OE_code == "9"){
    //console.log("new_row.label: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
    new_row.label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
  } // endif
}  // endfor loop through objx.objectElement_idx_AR
// end 20240902


  //console.log("= 20210108 objx.type_idx_AR.length: "+objx.type_idx_AR.length);
       for(var q = 0; q < objx.type_idx_AR.length; q++){                
         //console.log("= 20210108 msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_ztic - msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_code: "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC+ " - " + msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode);
         //console.log("= 20210108 spreadsheet_ztic: "+spreadsheet_ztic);
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "4"){    // type def for row type
               new_row.rowTypeZTIC = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_row.rowTypeCode = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
          } // endif
// start 20210103
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "8"){    // type def for object element for row
               new_row.OE_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_row.OE_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
          } // endif
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "9"){    // type def for set for row generation for row
               new_row.rowGenSetZTIC = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_row.rowGenSetCode = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
               // console.log("= 20210108 adding rowGenSetZTIC,Code: "+new_row.rowGenSetZTIC+","+new_row.rowGenSetCode);
          } // endif

// end 20210103

// start 20230811
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "17"){    // statistical values dimension for row
             new_row.sv_dimension_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
             new_row.sv_dimension_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;

             // start 20230831
             for(var r = 0; r < msg.queryResponseStatisticalValuesObjectWA_AR.length; r++){
              for(var s = 0; s < msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR.length; s++){
                 if(msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].sv_dimension_ztic == new_row.sv_dimension_ztic && msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].sv_dimension_code == new_row.sv_dimension_code){
                    let locl_type_def_idx_in_dimension  = msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].type_def_idx_for_summarization;                   
                    new_row.sv_type_def_ztic = msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].typeDefinitionAndValue_AR[locl_type_def_idx_in_dimension].type_def_ztic;
                    new_row.sv_type_def_code = msg.queryResponseStatisticalValuesObjectWA_AR[r].dimension_AR[s].typeDefinitionAndValue_AR[locl_type_def_idx_in_dimension].type_def_code;
                 }  // endif
         //  queryResponseStatisticalValuesObjectWA_AR  dimension_AR   typeDefinitionAndValue_AR  type_def_idx_for_summarization

         }  // endfor loop through dimension_AR
         
        } // endfor loop through .. StatisticalValuesObjectWA_AR

             // end 20230831


          } // endif

// end 20230811

       } // endfor loop through objx.type_idx_AR  



// end (del) 20210103
// 20201201 end copied in for example
        for(var r = 0; r < this.workbook_AR.length; r++){
           if(new_row.rowParentId == this.workbook_AR[r].wb_id){
             this.workbook_AR[r].row_AR.push(new_row);           
           }  // endif
        } // endfor 

     }  // endif it's a row


     if(objx.objectKindZTIC == spreadsheet_ztic && objx.objectKindCode == 5){   // cell
//      var new_cell = new wb_wa.MaintainCell(objx.objectZTIC, objx.objectCode);


     }   // endif it's a cell





   } // endfor loop through object_idx_AR
 } // endif  msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset")
} // endfor loop through msg.queryResponeSetMemberWA_AR




for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
 //if(msg.queryResponseSetMemberWA_AR[h].setMemberID.substring(0,14) == "ObjTmplQset:2:"){     //20200605  type 2 respone type  (del) 20201125
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126


     if(objx.objectKindZTIC == spreadsheet_ztic && objx.objectKindCode == 5){   // cell
        var new_cell = new wb_wa.MaintainCell(objx.objectZTIC, objx.objectCode);


 

    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == spreadsheet_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12){   // 20210504 get cell value

            new_cell.value = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;  // 20210504

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 12 (cell value

       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == spreadsheet_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 11){   // 20210504 get cell label

            new_cell.label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;  // 20210504

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 11 (cell label

       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == spreadsheet_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 10){   // 20210504 get cell description

            new_cell.desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;  // 20210504

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 10 (cell description


////   // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
////   // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
////   // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
////   // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
///    // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);

      }  // endfor loop through objx.objectElement_idx_AR 

// end insert to get cell object element values 20210503


//ELEM 2    9    3    5    2    9    2    9         Type Definition: Cell Type for Cell
//ELEM 2    9    3    11   2    9    2    9         Type Definition: Column for a Cell        20210502
//ELEM 2    9    3    12   2    9    2    9         Type Definition: Row for a Cell           20210502
//ELEM 2    9    3    13   2    9    2    9         Type Definition: Spreadsheet for a Cell   20210502
//ELEM 2    9    3    14   2    9    2    9         Type Definition: Spreadsheet Book for a Cell  20210502

      // 20210503 find type values of cell-- copied for example
       for(var q = 0; q < objx.type_idx_AR.length; q++){           
      ////   console.log("20201204 msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_ztic - msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_code: "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC+ " - " + msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode);


          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "5"){    // type def for cell type for a cell
               new_cell.cell_type_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_cell.cell_type_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
          } // endif

          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "11"){    // type def for column for a cell
               new_cell.cell_col_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_cell.cell_col_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
          } // endif

          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "12"){    // type def for row for a cell
               new_cell.cell_row_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_cell.cell_row_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
          } // endif

          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "13"){    // type def for spreadsheet for a cell
               new_cell.cell_sheet_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_cell.cell_sheet_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
          } // endif

          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == spreadsheet_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "14"){    // type def for spreadsheet book for a cell
               new_cell.cell_sheet_book_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_cell.cell_sheet_book_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
          } // endif


        }  // endfor

      var cell_idx;
      var workbook_idx;
     if(this.workbook_AR.length > 0){   // 20210506
        for(var r = 0; r < this.workbook_AR.length; r++){
           if(new_row.rowParentId == this.workbook_AR[r].wb_id){
              workbook_idx = r;
              new_cell.cell_type_ztic = spreadsheet_ztic;
              new_cell.cell_type_code = "1";
              cell_idx = this.workbook_AR[r].cell_AR.push(new_cell) -1;           
           }  // endif
        } // endfor


        for(var r = 0; r < this.workbook_AR[workbook_idx].column_AR.length; r++){
           if(this.workbook_AR[workbook_idx].column_AR[r].column_ztic == this.workbook_AR[workbook_idx].cell_AR[cell_idx].cell_col_ztic && this.workbook_AR[workbook_idx].column_AR[r].column_code == this.workbook_AR[workbook_idx].cell_AR[cell_idx].cell_col_code ){
              this.workbook_AR[workbook_idx].column_AR[r].cell_idx_AR.push(cell_idx); 
              this.workbook_AR[workbook_idx].cell_AR[cell_idx].column_idx = r;  
                   
           }  // endif
        } // endfor


        for(var r = 0; r < this.workbook_AR[workbook_idx].row_AR.length; r++){
           if(this.workbook_AR[workbook_idx].row_AR[r].row_ztic == this.workbook_AR[workbook_idx].cell_AR[cell_idx].cell_row_ztic && this.workbook_AR[workbook_idx].row_AR[r].row_code == this.workbook_AR[workbook_idx].cell_AR[cell_idx].cell_row_code ){
              this.workbook_AR[workbook_idx].row_AR[r].cell_idx_AR.push(cell_idx);
              this.workbook_AR[workbook_idx].cell_AR[cell_idx].row_idx = r;
           }  // endif
        } // endfor

        for(var r = 0; r < this.workbook_AR[workbook_idx].sheet_AR.length; r++){
           if(this.workbook_AR[workbook_idx].row_AR[r].sheet_ztic == this.workbook_AR[workbook_idx].cell_AR[cell_idx].cell_sheet_ztic && this.workbook_AR[workbook_idx].sheet_AR[r].sheet_code == this.workbook_AR[workbook_idx].cell_AR[cell_idx].cell_sheet_code ){
              this.workbook_AR[workbook_idx].sheet_AR[r].cell_idx_AR.push(cell_idx);   
              this.workbook_AR[workbook_idx].cell_AR[cell_idx].sheet_idx = r;
                   
           }  // endif
        } // endfor
      }  // endif this.workbook_AR.length > 0  20210506

     }   // endif it's a cell


    }  // endfor   msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length
 } // endif  setMemberID.substring(0,14) == "ObjTmplQset:2:
} // endfor loop through msg.queryResponeSetMemberWA_AR




for(var r = 0; r < this.workbook_AR.length; r++){
   this.workbook_AR[r].addStatisticalValuesToSpreadsheetWorkbook(msg);

} // endfor

                      




} // end of setValuesFromInitialMessageForSpreadsheets();







setValuesFromInitialMessageForMultiMediaObjects(msg, DEvalue_AR){

var base_ztic;
for(var i = 0; i < this.ZTICNS_AR.length; i++){
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

//console.log("20210731 msg.queryResponseSetMemberWA_AR.length: "+msg.queryResponseSetMemberWA_AR.length);


var mmo_ztic = "";
for(var i = 0; i < this.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/multimedia_object"){
       mmo_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){

// get multi-media object
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
         if(objx.objectKindZTIC == mmo_ztic && objx.objectKindCode == 1){
             var new_multimedia_object = new (require('./zt_client_multimedia_object'))(this);
              new_multimedia_object.mmo_ztic = objx.objectZTIC;
              new_multimedia_object.mmo_code = objx.objectCode;
              new_multimedia_object.mmo_id       = objx.id;
              new_multimedia_object.mmo_parent_id = objx.parentId;
              //this.multiMediaObject_AR.push(new_multimedia_object);  // moved below 20210716
              //console.log("**^ 20210713 added new multimedia_object new_mmo.mmo_code: "+ new_multimedia_object.mmo_code);
   // start 20210716
              for(var j = 0; j < objx.objectElement_idx_AR.length; j++){


//ELEM 2    3    3    1    2    3    2    3         Multi-Media Object Description         (Object Element)
//ELEM 2    3    3    2    2    3    2    3         Multi-Media Object Long Description    (Object Element)
//ELEM 2    3    3    3    2    3    2    3         Multi-Media Object Title               (Object Element)
//ELEM 2    3    3    4    2    3    2    3         Multi-Media Object html width          (Object Element)
//ELEM 2    3    3    5    2    3    2    3         Multi-Media Object html height         (Object Element)


       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == mmo_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 1){   

            new_multimedia_object.desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 1 (

       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == mmo_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2){  

            new_multimedia_object.long_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;  

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 2 (

       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == mmo_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3){  

            new_multimedia_object.title = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;  

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 3 (
       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == mmo_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 4){   // 

            new_multimedia_object.html_width = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 4
       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == mmo_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 5){   // 

            new_multimedia_object.html_height = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 5


// console.log("%%% 20210714 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
/// //console.log("%%% 20210714   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
// console.log("%%% 20210714   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC)
/// //console.log("%%% 20210714   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
// console.log("%%% 20210714   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);


        }  // endfor loop through objx.objectElement_idx_AR

        this.multiMediaObject_AR.push(new_multimedia_object); 
   // end 20210716
           } // endif   if(objx.objectKindZTIC == mmo_ztic && objx.objectKindCode == 1
    }  // endfor   loop through msg.queryResponseSetMemberWA_AR[h].object_idx_AR
 } // endif  setMemberID == "ObjectQset
} // endfor loop through msg.queryResponeSetMemberWA_AR


// get resource data
var mmo_wa = require('./zt_client_multimedia_object_workarea');
for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
//console.log("%%% 20210714 getting resource data:");
 if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
         if(objx.objectKindZTIC == base_ztic && objx.objectKindCode == 39){            // resource object
             var new_resource =  new mmo_wa.Resource(objx.objectZTIC, objx.objectCode );
              new_resource.ztic = objx.objectZTIC;
              new_resource.code = objx.objectCode;
              new_resource.id       = objx.id;
              new_resource.parent_id = objx.parentId;
              //console.log("**^ 20210713 added new resource new_resource.code: "+ new_resource.code);
              for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

/// ELEM 2    3    2    210  2    3    2    3         Resource Path/Name
/// ELEM 2    3    2    211  2    3    2    3         Resource Path/Name--Patch Level Dependent
/// ELEM 2    3    2    212  2    3    2    3         Resource Path/Name--Language Dependent
/// ELEM 2    3    2    213  2    3    2    3         Resource Path/Name--Patch Level and Language Dependent


       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 210){   

            new_resource.path_name = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 210 (

       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 211){  

            new_resource.path_name_patch_dep = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;  

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 211 (

       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 212){  

            new_resource.path_name_lang_dep = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;  

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 212 (
       if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 213){   // 

            new_resource.path_name_patch_and_lang_dep = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; 

        }  // endif msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode = 213 


// console.log("%%% 20210714 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
/// //console.log("%%% 20210714   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
// console.log("%%% 20210714   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC)
/// //console.log("%%% 20210714   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
// console.log("%%% 20210714   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);


        }  // endfor loop through objx.objectElement_idx_AR
    //  console.log("%%% 20210714 new_resource.path_name_lang_dep: "+new_resource.path_name_lang_dep);
      this.resource_AR.push(new_resource);  
    //  console.log("**^ 20210713 added new resource new_resource.code: "+ new_resource.code);

      } // endif  resource object (code 39)
    }  // endfor
 } // endif  setMemberID == "ObjectQset

} // endfor loop through msg.queryResponeSetMemberWA_AR


// assign resource to mmo
     
      //     = [];


 for(var i = 0; i < this.multiMediaObject_AR.length; i++){

      for(var j = 0; j < this.resource_AR.length; j++){
       //  console.log("%%% 20210714 this.resource_AR[j].parent_id - this.multiMediaObject_AR[i].mmo_id: "+this.resource_AR[j].parent_id+" - "+this.multiMediaObject_AR[i].mmo_id);
         if(this.resource_AR[j].parent_id == this.multiMediaObject_AR[i].mmo_id){
       //    console.log("%%% 20210714 added resource idx to mmo: "+ j);
           this.multiMediaObject_AR[i].resource_idx_AR.push(j);
         }

      }  // endfor - loop through this.resource_AR

  } //  endfor - loop through this.multiMediaObject_AR

// end assign resource to mmo

} // end of setValuesFromInitialMessageForMultiMediaObjects();





setValuesFromInitialMessageForDocumentDisplay(msg, DEvalue_AR){




//console.log("**^ 20210112 running setValuesFromInitialMessageForDocumentDisplay() in zt_client_session");


var base_ztic;
for(var i = 0; i < this.ZTICNS_AR.length; i++){
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

//console.log("20210113 msg.queryResponseSetMemberWA_AR.length: "+msg.queryResponseSetMemberWA_AR.length);

var doc_wa = require('./zt_client_document_workarea');

var document_ztic = "";
var spreadsheet_ztic = "";
//for(var i = 0; i < this.ZTICNS_AR.length; i++){   (del) 20210323
for(var i = 0; i < msg.ZTIC_Array.length; i++){     //    20210323
 // console.log("**^ 20210323 msg.ZTICNS_Array[i] - msg.ZTICNS_Array[i].code - msg.ZTICNS_Array[i].namespace: "+msg.ZTIC_Array[i]+" -"+msg.ZTIC_Array[i].msgZTIC+" - "+msg.ZTIC_Array[i].namespace);
     if(msg.ZTIC_Array[i].namespace.toString().trim() == "zinfinitree.com/document"){     //  20210323
       document_ztic = msg.ZTIC_Array[i].msgZTIC.toString().trim();                 //  20210323
     } // endif
     if(msg.ZTIC_Array[i].namespace.toString().trim() == "zinfinitree.com/spreadsheet"){  //  20210323
       spreadsheet_ztic = msg.ZTIC_Array[i].msgZTIC.toString().trim();              //  20210323
     } // endif
} //endfor



for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){

 if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126

            if(objx.objectKindZTIC == document_ztic && objx.objectKindCode == 1){
              var new_doc = new (require('./zt_client_document'))(this);
              new_doc.ztic = objx.objectZTIC;
              new_doc.code = objx.objectCode;
              new_doc.id       = objx.id;
              new_doc.parent_id = objx.parentId;
// start 20220215
              for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
                  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);
       
                 if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == "1"){
                   new_doc.desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
                 } // endif
                 if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == "3"){
                   new_doc.title = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
                 } // endif
     
               } // endfor loop through objx.objectElement_idx_AR
// end 20220215
             
              var new_doc_elem_top = new doc_wa.DocumentElement(objx.objectZTIC, objx.objectCode);
              new_doc_elem_top.id       = objx.id;
              new_doc_elem_top.parentId = objx.parentId;
              new_doc_elem_top.levelsDown = "0";
              new_doc_elem_top.parent_idx     =  0;
              new_doc_elem_top.text = "top element";
// start 20210731  add links from doc elem to other doc elems
       for(var j = 0; j < objx.link_idx_AR.length; j++){
         if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == document_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "1"){  //doc to  doc elem
           var new_link_to_doc_elem = new doc_wa.LinkToDocElem();
           new_link_to_doc_elem.linkToZTIC = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC;
           new_link_to_doc_elem.linkToCode = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode;
           new_link_to_doc_elem.status     = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].status;
           new_link_to_doc_elem.timestampEff = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].timestampEff;
           new_link_to_doc_elem.linkValue    = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkValue;
           new_doc_elem_top.linkToDocElem_AR.push(new_link_to_doc_elem);
         }  // endif doc elem to doc elem link

       }  // endfor loop through link_idx_AR
// end 20210731

              new_doc.docElem_AR.push(new_doc_elem_top); 

              this.document_AR.push(new_doc);

              //console.log("20210113 added new document new_doc.code: "+ new_doc.code);
            } // endif
         //} // endfor 
    }  // endfor
 } // endif  setMemberID.substring(0,14) == "ObjTmplQset:2:
} // endfor loop through msg.queryResponeSetMemberWA_AR




for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){

  if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126




     if(objx.objectKindZTIC == document_ztic && objx.objectKindCode == 2){   // document element
       var new_doc_elem = new doc_wa.DocumentElement(objx.objectZTIC, objx.objectCode);
       new_doc_elem.id       = objx.id;
       new_doc_elem.parentId = objx.parentId;
       new_doc_elem.levelsDown  = objx.levelsDown;
       //console.log("+++ 20210729 objx.objectCode - new_doc_elem.linkValue: "+objx.objectCode+" - "+new_doc_elem.linkValue);


       for(var q = 0; q < objx.type_idx_AR.length; q++){           
         //console.log("20210113 msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_ztic - msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_code: "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC+ " - " + msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode);
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == document_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "2"){    // type def for doc elem type
               new_doc_elem.typeZTIC = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_doc_elem.typeCode = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
              // new_doc_elem.id       = objx.Id;
              // new_doc_elem.parentId = objx.parentId;

          } // endif

      
       } // endfor loop through objx.type_idx_AR



       for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
         //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);
        
          if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == "5"){
             new_doc_elem.text = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
          } // endif
          //var AddMessageOEvalueToSession_wa_rec = new AddMessageOEvalueToSessionWorkAreaRec(objx, msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]]);   // 20200824
          //AddMessageOEvalueToSessionWorkAreaRec_AR.push(AddMessageOEvalueToSession_wa_rec);                                                                         // 20200824
     
       } // endfor loop through objx.objectElement_idx_AR

// start 20210731  add links from doc elem to other doc elems
     
       for(var j = 0; j < objx.link_idx_AR.length; j++){
         if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == document_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "2"){  //doc elem to  doc elem
           var new_link_to_doc_elem = new doc_wa.LinkToDocElem();
           new_link_to_doc_elem.linkToZTIC = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC;
           new_link_to_doc_elem.linkToCode = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode;
           new_link_to_doc_elem.status     = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].status;
           new_link_to_doc_elem.timestampEff = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].timestampEff;
           new_link_to_doc_elem.linkValue    = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkValue;
           new_doc_elem.linkToDocElem_AR.push(new_link_to_doc_elem);
         }  // endif doc elem to doc elem link

       }  // endfor loop through link_idx_AR

// end 20210731


// 20210318  start add links to spreadsheets from a doc elem
       for(var j = 0; j < objx.link_idx_AR.length; j++){
       // console.log("**^ 20210323 msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC - msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode: "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+" - "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode);
      //  console.log("**^ 20210323a document_ztic: "+document_ztic);
        if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == document_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "3"){
        //   console.log("**^ 20210323b msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC - msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode: "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+" - "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
           var new_linked_spreadsheet = new doc_wa.LinkedSpreadsheet(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
           new_doc_elem.linkedSpreadsheet_AR.push(new_linked_spreadsheet);
      //      console.log("**^  20210323 spreadsheet   Link Type/Value:  "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
      //    +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
      //    +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
      //    +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
      //    +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
      //    +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         }  // endif
        } // endfor loop through objx.link_idx_AR

   
// 20210318 end add links to spreadsheets from doc elem


// 20210713  start add links to multi-media object from a doc elem
       for(var j = 0; j < objx.link_idx_AR.length; j++){
       //console.log("**^ 20210713 msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC - msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode: "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+" - "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode);
////        console.log("**^ 20210713 document_ztic: "+document_ztic);
        if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == document_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "4"){
////           console.log("**^ 20210713 msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC - msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode: "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+" - "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
            var new_linked_mmo = new doc_wa.LinkedMultiMediaObject(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

            for(var m = 0; m < this.multiMediaObject_AR.length; m++){
               if(this.multiMediaObject_AR[m].mmo_ztic == new_linked_mmo.mmo_ztic && this.multiMediaObject_AR[m].mmo_code == new_linked_mmo.mmo_code ){
                   new_linked_mmo.mmo_idx = m;
                } // endif

            }  // endfor

            new_doc_elem.linkedMultiMediaObject_AR.push(new_linked_mmo);
////            console.log("**^  20210713 multi-media object   Link Type/Value:  "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
////          +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
////          +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
////          +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
////          +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
////          +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         }  // endif
        } // endfor loop through objx.link_idx_AR

   
//  end add links to multi-media object from doc elem


// start add links to message definition from doc elem

       for(var j = 0; j < objx.link_idx_AR.length; j++){
       //console.log("**^ 20210713 msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC - msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode: "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+" - "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode);
////        console.log("**^ 20210713 document_ztic: "+document_ztic);
        if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == document_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "5"){
       //    console.log("**^ 20210809 msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC - msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode: "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+" - "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
           var new_linked_msg_def = new doc_wa.LinkedMessageDefinition(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

            for(var m = 0; m < this.messageDefinition_AR.length; m++){
               if(this.messageDefinition_AR[m].msg_def_ztic == new_linked_msg_def.msg_def_ztic && this.messageDefinition_AR[m].msg_def_code == new_linked_msg_def.msg_def_code){
                   new_linked_msg_def.msg_def_idx = m;
                } // endif

            }  // endfor
     
      //      console.log("**^ 20210809 new_linked_msg_def.msg_def_ztic - new_linked_msg_def.msg_def_code: "+new_linked_msg_def.msg_def_ztic+" - "+new_linked_msg_def.msg_def_code);
            new_doc_elem.linkedMessageDefinition_AR.push(new_linked_msg_def);
////            console.log("**^  20210713 multi-media object   Link Type/Value:  "+msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
////          +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
////          +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
////          +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
////          +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
////          +msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
         }  // endif
        } // endfor loop through objx.link_idx_AR



// end 20210806 add links to message definition from doc elem

     //console.log("+ 20210105 this.document_AR.length: " +this.document_AR.length);

/// start moved below 20210731 then moved back again
        var doc_elem_idx;
        for(var r = 0; r < this.document_AR.length; r++){
           //console.log("+ 20210105 new_doc_elem.parentId - this.document_AR[r].id: "+new_doc_elem.parentId+" - "+this.document_AR[r].id);
           //if(new_doc_elem.parentId == this.document_AR[r].id){
           //if(new_doc_elem.linkStatus != 2){    // inactive status   20210717
             doc_elem_idx = this.document_AR[r].docElem_AR.push(new_doc_elem) -1;
         //var child_doc_elem_details = new doc_wa.ChildDocElemDetails(doc_elem_idx, new_doc_elem.linkValue);           // 20210729 coding in progress
             for(var s = 0; s < this.document_AR[r].docElem_AR.length; s++){
                if(new_doc_elem.parentId == this.document_AR[r].docElem_AR[s].id){
                  this.document_AR[r].docElem_AR[doc_elem_idx].parent_idx = s;     // 20210115
             // console.log("*** 20210114 new_doc_elem.parentId - this.document_AR[r].docElem_AR[s].id "+new_doc_elem.parentId+" - "+this.document_AR[r].docElem_AR[s].id);
                    this.document_AR[r].docElem_AR[s].childDocElem_idx_AR.push(doc_elem_idx);
                  //  this.document_AR[r].docElem_AR[s].childDocElemDetails_AR.push(child_doc_elem_details);            // 20210729 coding in progress
                } // endif
              } // endfor
                     //console.log("*** 20210114 doc_elem_idx: "+doc_elem_idx);   
            //} // endif new_doc_elem.linkStatus != 2  20210717  
         } // endfor

/// end moved below 20210731
   

      //console.log("20201204 adding new doc elem objx.objectCode: "+objx.objectCode);
     }  // endif it's a  doc elem


   } // endfor loop through object_idx_AR
 } // endif  msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset")
} // endfor loop through msg.queryResponeSetMemberWA_AR






} // end of setValuesFromInitialMessageForDocumentDisplay();








//***** start of this.setValuesFromInitialMessageForMessageDefinitionDisplay(msg, DEvalue_AR);   ***


setValuesFromInitialMessageForMessageDefinitionDisplay(msg, DEvalue_AR){






//console.log("**^ 20210805 running setValuesFromInitialMessageForMessageDefinitionDisplay() in zt_client_session");


var base_ztic;
for(var i = 0; i < this.ZTICNS_AR.length; i++){
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

//console.log("20210805 msg.queryResponseSetMemberWA_AR.length: "+msg.queryResponseSetMemberWA_AR.length);

var doc_wa = require('./zt_client_message_definition_workarea');

var document_ztic = "";
var spreadsheet_ztic = "";
var message_ztic     = "";
var storage_ztic     = "";
//for(var i = 0; i < this.ZTICNS_AR.length; i++){   (del) 20210323
for(var i = 0; i < msg.ZTIC_Array.length; i++){     //    20210323
 // console.log("**^ 20210323 msg.ZTICNS_Array[i] - msg.ZTICNS_Array[i].code - msg.ZTICNS_Array[i].namespace: "+msg.ZTIC_Array[i]+" -"+msg.ZTIC_Array[i].msgZTIC+" - "+msg.ZTIC_Array[i].namespace);
     //if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/document"){     // (del) 20210323
     //  document_ztic = this.ZTICNS_AR[i].code.toString().trim();                 // (del) 20210323
     if(msg.ZTIC_Array[i].namespace.toString().trim() == "zinfinitree.com/document"){     //  20210323
       document_ztic = msg.ZTIC_Array[i].msgZTIC.toString().trim();                 //  20210323
     } // endif
     if(msg.ZTIC_Array[i].namespace.toString().trim() == "zinfinitree.com/spreadsheet"){  //  20210323
       spreadsheet_ztic = msg.ZTIC_Array[i].msgZTIC.toString().trim();              //  20210323
     } // endif
     if(msg.ZTIC_Array[i].namespace.toString().trim() == "131131/22"){  //  20210805
       message_ztic = msg.ZTIC_Array[i].msgZTIC.toString().trim();              //  20210805
     } // endif
     if(msg.ZTIC_Array[i].namespace.toString().trim() == "zinfinitree.com/storage"){  //  20210805
       storage_ztic = msg.ZTIC_Array[i].msgZTIC.toString().trim();              //  20210805
     } // endif

} //endfor



for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){

 if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126

            //if(objx.objectKindZTIC == document_ztic && objx.objectKindCode == 1){
            if(objx.objectKindZTIC == message_ztic && objx.objectKindCode == 1){  // 20210805
              var new_doc = new (require('./zt_client_message_definition'))(this);
              new_doc.ztic = objx.objectZTIC;
              new_doc.code = objx.objectCode;
              new_doc.id       = objx.id;
              new_doc.parent_id = objx.parentId;
              
              var new_doc_elem_top = new doc_wa.DocumentElement(objx.objectZTIC, objx.objectCode);
              new_doc_elem_top.id       = objx.id;
              new_doc_elem_top.parentId = objx.parentId;
              new_doc_elem_top.levelsDown = "0";
              new_doc_elem_top.parent_idx     =  0;
              new_doc_elem_top.text = "top element";
// start 20210731  add links from doc elem to other doc elems
       for(var j = 0; j < objx.link_idx_AR.length; j++){
       //  if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == document_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "1"){  //doc to  doc elem
       if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == message_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "1"){  //msg to  msg elem
           var new_link_to_doc_elem = new doc_wa.LinkToDocElem();
           new_link_to_doc_elem.linkToZTIC = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC;
           new_link_to_doc_elem.linkToCode = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode;
           new_link_to_doc_elem.status     = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].status;
           new_link_to_doc_elem.timestampEff = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].timestampEff;
           new_link_to_doc_elem.linkValue    = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkValue;
           new_doc_elem_top.linkToDocElem_AR.push(new_link_to_doc_elem);
         }  // endif doc elem to doc elem link

       }  // endfor loop through link_idx_AR
// end 20210731

              new_doc.docElem_AR.push(new_doc_elem_top); 

             // this.document_AR.push(new_doc);  //(del) 20210806         -- DEACTIVATE WHEN READY
              this.messageDefinition_AR.push(new_doc);   // 20210806  -- ACTIVATE WHEN READY to use messageDefinition_AR instead of document_AR 

              //console.log("20210113 added new document new_doc.code: "+ new_doc.code);
            } // endif
         //} // endfor 
    }  // endfor
 } // endif  setMemberID.substring(0,14) == "ObjTmplQset:2:
} // endfor loop through msg.queryResponeSetMemberWA_AR


var root_levels_down = 0;  // 20240502

for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){

  if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126


     if(objx.objectKindZTIC == message_ztic && objx.objectKindCode == 2){   // message element   20210805
       var new_doc_elem = new doc_wa.DocumentElement(objx.objectZTIC, objx.objectCode);
       new_doc_elem.id       = objx.id;
       new_doc_elem.parentId = objx.parentId;
       new_doc_elem.levelsDown  = objx.levelsDown;
       //console.log("+++ 20210729 objx.objectCode - new_doc_elem.linkValue: "+objx.objectCode+" - "+new_doc_elem.linkValue);


       for(var q = 0; q < objx.type_idx_AR.length; q++){           
         //console.log("20210113 msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_ztic - msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDef_code: "+msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC+ " - " + msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode);
          if(msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionZTIC == document_ztic && msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeDefinitionCode.toString().trim() == "2"){    // type def for doc elem type
               new_doc_elem.typeZTIC = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueZTIC;
               new_doc_elem.typeCode = msg.queryResponseTypeWA_AR[objx.type_idx_AR[q]].typeValueCode;
              // new_doc_elem.id       = objx.Id;
              // new_doc_elem.parentId = objx.parentId;

          } // endif

      
       } // endfor loop through objx.type_idx_AR



       for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
         //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);

        
          if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == "4"){   // message element label
             var indent = "";
             var x = 0;
             // start 20240502
             if(objx.objectCode== 1){root_levels_down = objx.levelsDown;}
             
             // end 20240502
             while(x < (objx.levelsDown - root_levels_down)){
               if(x != 0){indent = indent + "---|";}
               x++;
              if(x > 15){break;}
            } // endwhile
            if(indent.length > 0){
              indent = indent.substring(0, indent.length - 1);
            } // endif
             new_doc_elem.text = indent+objx.objectCode+": "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
          } // endif

          if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == "5"){   // message element description
           
             new_doc_elem.desc = objx.objectCode+": "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
          } // endif         


     
       } // endfor loop through objx.objectElement_idx_AR


     
       for(var j = 0; j < objx.link_idx_AR.length; j++){
       //if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == document_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "2"){  //doc elem to  doc elem
        if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC == message_ztic && msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == "2"){  //msg elem to msg elem
           var new_link_to_doc_elem = new doc_wa.LinkToDocElem();
           new_link_to_doc_elem.linkToZTIC = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC;
           new_link_to_doc_elem.linkToCode = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode;
           new_link_to_doc_elem.status     = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].status;
           new_link_to_doc_elem.timestampEff = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].timestampEff;
           new_link_to_doc_elem.linkValue    = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkValue;
           new_doc_elem.linkToDocElem_AR.push(new_link_to_doc_elem);
         }  // endif doc elem to doc elem link

       }  // endfor loop through link_idx_AR




     //console.log("+ 20210105 this.document_AR.length: " +this.document_AR.length);


        var doc_elem_idx;
        for(var r = 0; r < this.messageDefinition_AR.length; r++){
           //console.log("+ 20210105 new_doc_elem.parentId - this.messageDefinition_AR[r].id: "+new_doc_elem.parentId+" - "+this.messageDefinition_AR[r].id);
             doc_elem_idx = this.messageDefinition_AR[r].docElem_AR.push(new_doc_elem) -1;
         //var child_doc_elem_details = new doc_wa.ChildDocElemDetails(doc_elem_idx, new_doc_elem.linkValue);           // 20210729 coding in progress
             for(var s = 0; s < this.messageDefinition_AR[r].docElem_AR.length; s++){
                if(new_doc_elem.parentId == this.messageDefinition_AR[r].docElem_AR[s].id){
                  this.messageDefinition_AR[r].docElem_AR[doc_elem_idx].parent_idx = s;     // 20210115
             // console.log("*** 20210114 new_doc_elem.parentId - this.document_AR[r].docElem_AR[s].id "+new_doc_elem.parentId+" - "+this.document_AR[r].docElem_AR[s].id);
                    this.messageDefinition_AR[r].docElem_AR[s].childDocElem_idx_AR.push(doc_elem_idx);
                  //  this.document_AR[r].docElem_AR[s].childDocElemDetails_AR.push(child_doc_elem_details);            // 20210729 coding in progress
                } // endif
              } // endfor
                     //console.log("*** 20210114 doc_elem_idx: "+doc_elem_idx);   
            //} // endif new_doc_elem.linkStatus != 2  20210717  
         } // endfor


  

      //console.log("20201204 adding new doc elem objx.objectCode: "+objx.objectCode);
     }  // endif it's a  doc elem


   } // endfor loop through object_idx_AR
 } // endif  msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset")
} // endfor loop through msg.queryResponeSetMemberWA_AR







} // end of setValuesFromInitialMessageForMessageDefinitionDisplay();






addMessageOEvalueToSession(templ_idxx, msg_objx, msg_oe_valuex){      // 20200908

const html_id_prfx = "val";

var sel_templ_idx = templ_idxx;





var object_found = false;
var found_in_other_template = false;   // 20200910
var found_in_sel_template   = false;
var object_idx; 
//var template_idx;

//console.log("20200923 *-* this.template_AR.length: "+this.template_AR.length);
for(var j = 0; j < this.template_AR.length; j++){   // 20200910
 //  for(var i = 0; i < this.template_AR[sel_templ_idx].object_AR.length; i++){  // (del) 20200910
 for(var i = 0; i < this.template_AR[j].object_AR.length; i++){      // 20200910 
 // if(this.template_AR[sel_templ_idx].object_AR[i].objZTIC == msg_objx.objectZTIC   && this.template_AR[sel_templ_idx].object_AR[i].objCodeAssigned == msg_objx.objectCode){ (del) 20200907
//  if(this.template_AR[sel_templ_idx].object_AR[i].objZTIC == msg_objx.objectZTIC   && this.template_AR[sel_templ_idx].object_AR[i].objCodeTemp == msg_objx.objectCode){ // 20200907 (del) 20200910
  if(this.template_AR[j].object_AR[i].objZTIC == msg_objx.objectZTIC   && this.template_AR[j].object_AR[i].objCodeTemp == msg_objx.objectCode){
//  if(this.template_AR[sel_templ_idx].object_AR[i].objZTIC == msg_objx.objectZTIC && this.template_AR[sel_templ_idx].object_AR[i].objCodeTemp == msg_objx.objectCode  && this.template_AR[sel_templ_idx].templLevelsDown == msg_objx.levelsDown){    // 20200909 (del) 20200909
     object_found = true;
     //object_idx = i; (del) 20200923
     //template_idx = j;   // 20200923  
     if(!sel_templ_idx == j){found_in_other_template = true;}  // 20200910
     if(sel_templ_idx == j && this.template_AR[sel_templ_idx].templLevelsDown == msg_objx.levelsDown){found_in_sel_template = true; object_idx = i;}  // 20200923

  }  // endif

  } // endfor

}  // endfor  20200910



//console.log("20200923 *-*1 object_idx - object_found: "+object_idx+" - "+object_found);
//if(!object_found)  // (del) 20200923
if(!object_found && this.template_AR[sel_templ_idx].templLevelsDown == msg_objx.levelsDown){  // 20200923                           
 //if((this.maint_mode == "update" && msg_objx.levelsDown == 1 ) || this.maint_mode != "update"){  // 20200911  del 20201030   (del) 20261021
 if((this.maint_mode == "update" && msg_objx.levelsDown >= 1 ) || this.maint_mode != "update"){  // 20261021 levels below 1 too - grandchildren are maintained from child pages (Maintain on link rows); parent page and its Submit only use level 1
 //if((this.maint_mode == "create" && msg_objx.levelsDown == 1 ) || (this.maint_mode == "update" && msg_objx.levelsDown == 1 ) || this.maint_mode == "display"){    // 20201030
  var new_obj = new ObjectRec();
  new_obj.objZTIC           = msg_objx.objectZTIC;    // object ztic
  new_obj.objCodeTemp       = msg_objx.objectCode;    // object code
  new_obj.objCodeAssigned   = msg_objx.objectCode; 
  new_obj.newCode           = false;
// start 20200821
  this.html_id_cntr++;    // 20200907
  new_obj.objZTIC_ns_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
  //this.html_id_cntr++;  // (del) 20200907
  new_obj.objZTIC_ns_html_input_val = msg_objx.objectZTIC;

  this.html_id_cntr++;    // 20200907
  new_obj.objCodeAssigned_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
  //this.html_id_cntr++;  // (del) 20200907
  //console.log("20200822 ++#7 html_id_cntr: "+this.html_id_cntr);
  new_obj.objCodeAssigned_html_input_val = msg_objx.objectCode;
// end 20200821

// start 20210415
 this.html_id_cntr++;
 new_obj.linkStatus_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
// new_obj.linkStatus_html_input_val = msg_objx.status.toString().trim(); // xxx ??? check REVISIT
 this.html_id_cntr++;
 new_obj.linkValue_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
// new_obj.linkValue_html_input_val = msg_objx.linkValue.toString().trim(); // xxx ??? check REVISIT
// end 20210415

  object_idx = this.template_AR[sel_templ_idx].object_AR.push(new_obj) -1;
  //template_idx = sel_templ_idx;  // 20200923
 } // endif  ((this.maint_mode == "update" && msg_objx.levelsDown == 1 ) || this.maint_mode != "update"){  // 20200911
} // endif
 
//console.log("20200923 *-* this.template_AR[sel_templ_idx].templLevelsDown - msg_objx.levelsDown: "+this.template_AR[sel_templ_idx].templLevelsDown+" - "+ msg_objx.levelsDown);
if(object_idx != null && this.template_AR[sel_templ_idx].templLevelsDown == msg_objx.levelsDown){  // 20200923  
//console.log("20200923 *-* found_in_sel_template: "+found_in_sel_template);

//console.log("20200908 +++ this.template_AR[sel_templ_idx].OE_def_AR.length: "+this.template_AR[sel_templ_idx].OE_def_AR.length);
//console.log("20200923 *-*2 object_idx: "+object_idx);
for(var i = 0; i < this.template_AR[sel_templ_idx].OE_def_AR.length; i++){
  if(this.template_AR[sel_templ_idx].OE_def_AR[i].OE_ztic == msg_oe_valuex.objectElementZTIC && this.template_AR[sel_templ_idx].OE_def_AR[i].OE_code == msg_oe_valuex.objectElementCode){

   var oe_val_rec = new ObjectElementValueRec();
   oe_val_rec.OE_ztic = msg_oe_valuex.objectElementZTIC;
   oe_val_rec.OE_code = msg_oe_valuex.objectElementCode;
   // start 20210815  remove single quote from object element value to prevent html error
    msg_oe_valuex.objectElementValue = msg_oe_valuex.objectElementValue.replace(/'/g,'');;
   // end 20210815
   oe_val_rec.OE_value = msg_oe_valuex.objectElementValue;
   this.html_id_cntr++;  // 202000907
   oe_val_rec.html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
   //this.html_id_cntr++;  // (del) 20200907
   oe_val_rec.html_input_val = msg_oe_valuex.objectElementValue;
   //console.log("20231202f oe_val_rec.html_input_val: "+ oe_val_rec.html_input_val);
   //console.log("20200825 // oe_val_rec.OE_ztic - oe_val_rec.OE_code: "+oe_val_rec.OE_ztic+" - "+oe_val_rec.OE_code);
   if(msg_objx.levelsDown == this.template_AR[sel_templ_idx].templLevelsDown || oe_val_rec.OE_value.toString().trim() == ""){    // 20200911 
     this.template_AR[sel_templ_idx].object_AR[object_idx].OE_val_AR.push(oe_val_rec);  //(del) 20200923 and replaced 20200923
     //this.template_AR[template_idx].object_AR[object_idx].OE_val_AR.push(oe_val_rec);    // 20200923 and (del) 20200923
   }  // endif 20200908  
  } // endif

}  // endfor

} // endif(object_idx != null){  // 20200911




}  // end of addMessageOEvalueToSession()   // 20200701






TVBTR_addMessageOEvalueToSession(templ_idxx, msg_objx, msg_oe_valuex){      // 20200908

  const html_id_prfx = "val";
  
  // 1. find right template using msg_objx kind ztic and kind code with matching kind ztic and kind code in template 
  // 2. check to see if object has already been added to the template, if not add the object to the template
  // 3. add the oe values to the selected object (either existing or newly added) where the oe ztic and oe code match the oe ztic and oe code of the OE definition for the selected template
   
  //var sel_templ_idx;  (del) 20200908
  var sel_templ_idx = templ_idxx;
  const templ_idx = 0;
  
  
    
  var object_found = false;
  var object_idx; 
 
  //var template_idx;
  



 if(this.TVBTR_template_AR.length > 0){
  //console.log("20231114a this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length: "+this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length);
  for(var i = 0; i < this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length; i++){
    for(var k = 0; k < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; k++){
      if(this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length == 0){
        var new_obj = new ObjectRec();
        new_obj.objZTIC           = msg_objx.objectZTIC;    // object ztic
        new_obj.objCodeTemp       = msg_objx.objectCode;    // object code
        new_obj.objCodeAssigned   = msg_objx.objectCode; 
        new_obj.newCode           = false;
        object_idx = this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.push(new_obj) -1;
      } // endif object_AR.length == 0
    } // endfor loop through object_AR
  }  // endfor  loop through childTempl_idx_AR

  } // endif TVBTR_template_AR.length > 0


if(this.TVBTR_template_AR.length > 0){
  //console.log("20231114a this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length: "+this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length);
  for(var i = 0; i < this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length; i++){
  //  console.log("20231114b this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length: "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length);
   //   console.log("20231203c this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR.length: "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR.length);
      for(var k = 0; k < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR.length; k++){
    //    console.log("20231203dd this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[k].OE_ztic: "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[k].OE_ztic);
    //    console.log("20231203ee msg_oe_valuex.objectElementZTIC: "+msg_oe_valuex.objectElementZTIC);
    //    console.log("20231203ff this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[k].OE_code: "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[k].OE_code);
    //    console.log("20231203gg msg_oe_valuex.objectElementCode: "+msg_oe_valuex.objectElementCode);
    //    console.log("20231203hh msg_oe_valuex.objectElementValue: "+msg_oe_valuex.objectElementValue);
        if(this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[k].OE_ztic == msg_oe_valuex.objectElementZTIC && this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[k].OE_code == msg_oe_valuex.objectElementCode){
     //      console.log("20231203ii msg_oe_valuex.objectElementValue: "+msg_oe_valuex.objectElementValue);  
           var oe_val_rec = new ObjectElementValueRec();
           oe_val_rec.OE_ztic = msg_oe_valuex.objectElementZTIC;
           oe_val_rec.OE_code = msg_oe_valuex.objectElementCode;
           // start 20210815  remove single quote from object element value to prevent html error
             msg_oe_valuex.objectElementValue = msg_oe_valuex.objectElementValue.replace(/'/g,'');;  //(del) 20240508
           msg_oe_valuex.objectElementValue = msg_oe_valuex.objectElementValue.replace(/\?/g,'');;
           // end 20240508
           oe_val_rec.OE_value = msg_oe_valuex.objectElementValue;
           this.html_id_cntr++;  // 202000907
           oe_val_rec.html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
          //this.html_id_cntr++;  // (del) 20200907
          oe_val_rec.html_input_val = msg_oe_valuex.objectElementValue;
          //console.log("20231202f oe_val_rec.html_input_val: "+ oe_val_rec.html_input_val);
          //console.log("20200825 // oe_val_rec.OE_ztic - oe_val_rec.OE_code: "+oe_val_rec.OE_ztic+" - "+oe_val_rec.OE_code);
          //console.log("20231204a this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[0].OE_val_AR.length: "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[0].OE_val_AR.length);
          let oe_found_locl = false;
          for(var w = 0; w < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[0].OE_val_AR.length; w++){
             if(this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[0].OE_val_AR[w].OE_ztic == oe_val_rec.OE_ztic && this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[0].OE_val_AR[w].OE_code == oe_val_rec.OE_code){
                oe_found_locl = true;
                this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[0].OE_val_AR[w].html_input_val = oe_val_rec.OE_value;
                this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[0].OE_val_AR[w].OE_value = oe_val_rec.OE_value;
             }  // endif
          } // endfor loop through OE_val_AR  
          if(!oe_found_locl){
            this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[0].OE_val_AR.push(oe_val_rec); 
          }  
           
        }  // endif
  
      } //endfor
  //   } // endfor
   } // endfor
  }  // endif this.TVBTR_template_AR.length > 0
  
  
  }  // end of TVBTR_addMessageOEvalueToSession()   // 20200701












  addMessageTypeValueToSession(msg_objx, msg_type_valuex){

const html_id_prfx = "T2_type_val";

var sel_templ_idx;
//console.log("20200702 this.template_AR.length: "+ this.template_AR.length);
for(var i = 0; i < this.template_AR.length; i++){
  //console.log("20200702 this.template_AR[i].objectKindZTIC - msg_objx.objectKindZTIC: "+ this.template_AR[i].objectKindZTIC + " - "+ msg_objx.objectKindZTIC);
  //console.log("20200702 this.template_AR[i].objectKindCode - msg_objx.objectKindCode: "+ this.template_AR[i].objectKindCode + " - "+ msg_objx.objectKindCode);
  if(this.template_AR[i].objKindZTIC == msg_objx.objectKindZTIC && this.template_AR[i].objKindCode == msg_objx.objectKindCode){
    sel_templ_idx = i;
  }  // endif

// start 20200709
  if(msg_objx.levelsDown == 0){
    sel_templ_idx = this.top_templ_idx;
    break;
  } // endif
// end 20200709

} // endfor




var object_found = false;
var object_idx; 

for(var i = 0; i < this.template_AR[sel_templ_idx].object_AR.length; i++){

  if(this.template_AR[sel_templ_idx].object_AR[i].objZTIC == msg_objx.objectZTIC   && this.template_AR[sel_templ_idx].object_AR[i].objCodeAssigned == msg_objx.objectCode){
     object_found = true;
     object_idx = i;
  }  // endif

} // endfor


if(!object_found){
 //console.log("20200911 %%% msg_objx.levelsDown - this.maint_mode: "+ msg_objx.levelsDown + " - "+this.maint_mode);
 //console.log("20200911 %%% condition met");
  var new_obj = new ObjectRec();
  new_obj.objZTIC           = msg_objx.objectZTIC;    // object ztic
  new_obj.objCodeTemp       = msg_objx.objectCode;    // object code
  new_obj.objCodeAssigned   = msg_objx.objectCode; 
  new_obj.newCode           = false;

// start 20200821
  this.html_id_cntr++;  // 20200907
  new_obj.objZTIC_ns_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
  //this.html_id_cntr++;  (del) 20200907
  new_obj.objZTIC_ns_html_input_val = msg_objx.objectZTIC;

  this.html_id_cntr++;  // 20200907
  new_obj.objCodeAssigned_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
  //this.html_id_cntr++;  // (del) 20200907
  new_obj.objCodeAssigned_html_input_val = msg_objx.objectCode;


  this.html_id_cntr++;  
  new_obj.linkStatus_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
  this.html_id_cntr++;  
  new_obj.linkValue_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();


  object_idx = this.template_AR[sel_templ_idx].object_AR.push(new_obj) -1;
 
}  // endif
 

for(var i = 0; i < this.template_AR[sel_templ_idx].typeDef_AR.length; i++){
   if(this.template_AR[sel_templ_idx].typeDef_AR[i].typeDef_ztic == msg_type_valuex.typeDefinitionZTIC && this.template_AR[sel_templ_idx].typeDef_AR[i].typeDef_code == msg_type_valuex.typeDefinitionCode){


   var type_val_rec = new TypeValueRec();
   type_val_rec.typeDef_ztic = msg_type_valuex.typeDefinitionZTIC;
   type_val_rec.typeDef_code = msg_type_valuex.typeDefinitionCode;
   type_val_rec.typeVal_ztic = msg_type_valuex.typeValueZTIC;
   type_val_rec.typeVal_code = msg_type_valuex.typeValueCode;
   this.html_id_cntr++;  // 20200907
   type_val_rec.ztic_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
  
   type_val_rec.ztic_html_input_val = msg_type_valuex.typeValueZTIC;
   //console.log("20200831 -- msg_type_valuex.typeValueZTIC: "+msg_type_valuex.typeValueZTIC);
   type_val_rec.ztic_ns_html_input_val = this.getNamespaceForZTIC(msg_type_valuex.typeValueZTIC);  // 20200831
   
   if(type_val_rec.ztic_ns_html_input_val == null){type_val_rec.ztic_ns_html_input_val = "";}  // 20200907

    //console.log("  20200831 type_val_rec.ztic_ns_html_input_val: "+type_val_rec.ztic_ns_html_input_val);
    this.html_id_cntr++;   // 20200907
    type_val_rec.code_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
  

    this.html_id_cntr++;  
    type_val_rec.composite_html_id = html_id_prfx + this.html_id_cntr.toString().trim();  // 20230324

    this.html_id_cntr++;  
    type_val_rec.dateStr_html_id = html_id_prfx + this.html_id_cntr.toString().trim();  // 20231029  

    type_val_rec.code_html_input_val = msg_type_valuex.typeValueCode;
    this.template_AR[sel_templ_idx].object_AR[object_idx].typeVal_AR.push(type_val_rec);
  
   } // endif
}  // endfor



} // end of       this.addMessageTypeValueToSession();





  addMessageLinkToSession(msg_objx, msg_linkx){



var sel_templ_idx;
// ////console.log("20200702 this.template_AR.length: "+ this.template_AR.length);
for(var i = 0; i < this.template_AR.length; i++){
// ////  console.log("20200702 this.template_AR[i].objectKindZTIC - msg_objx.objectKindZTIC: "+ this.template_AR[i].objectKindZTIC + " - "+ msg_objx.objectKindZTIC);
// ////  console.log("20200702 this.template_AR[i].objectKindCode - msg_objx.objectKindCode: "+ this.template_AR[i].objectKindCode + " - "+ msg_objx.objectKindCode);
  if(this.template_AR[i].linkableObjectLinkType_ztic == msg_linkx.linkTypeZTIC && this.template_AR[i].linkableObjectLinkType_code == msg_linkx.linkTypeCode){
    sel_templ_idx = i;
  }  // endif



} // endfor




var object_found = false;
var object_idx; 

for(var i = 0; i < this.template_AR[sel_templ_idx].object_AR.length; i++){
  if(this.template_AR[sel_templ_idx].objKindZTIC  == msg_linkx.linkToKindZTIC && this.template_AR[sel_templ_idx].objKindCode == msg_linkx.linkToKindCode){
    if(this.template_AR[sel_templ_idx].object_AR[i].objZTIC == msg_linkx.linkToZTIC   && this.template_AR[sel_templ_idx].object_AR[i].objCodeAssigned == msg_linkx.linkToCode){
      object_found = true;
      object_idx = i;
    }  // endif
   } // endif
} // endfor


if(object_found){

  this.template_AR[sel_templ_idx].object_AR[object_idx].linkStatus_html_input_val = msg_linkx.status;
  this.template_AR[sel_templ_idx].object_AR[object_idx].linkValue_html_input_val  = msg_linkx.linkValue;
  this.template_AR[sel_templ_idx].object_AR[object_idx].linkFromObj_key = msg_objx.objectKindZTIC.toString().trim()+"_"+msg_objx.objectKindCode.toString().trim()+"_"+msg_objx.objectZTIC.toString().trim()+"_"+msg_objx.objectCode.toString().trim();   // 20261021 source of link, used by child page

}  // endif



  

}  // end addMessageLinkToSession





// start 20261021 - the server adds ZTICs to its response for namespaces not in the request (e.g. a linked grandchild in another namespace)
// add them to this.ZTICNS_AR (the client ZTIC domain) so getNamespaceForZTIC resolves them; codes already in the domain are not changed
mergeMessageZTICs(msg){
  if(!msg.ZTIC_Array){ return; }
  for(var i = 0; i < msg.ZTIC_Array.length; i++){
    var ns_msg   = (msg.ZTIC_Array[i].namespace == undefined) ? "" : msg.ZTIC_Array[i].namespace.toString().trim();
    var ztic_msg = (msg.ZTIC_Array[i].msgZTIC == undefined) ? "" : msg.ZTIC_Array[i].msgZTIC.toString().trim();
    if(ns_msg == "" || ztic_msg == ""){ continue; }
    var ns_found = false;
    var code_used = false;
    for(var j = 0; j < this.ZTICNS_AR.length; j++){
      if(this.ZTICNS_AR[j].namespace.toString().trim() == ns_msg){ ns_found = true; }
      if(this.ZTICNS_AR[j].code.toString().trim() == ztic_msg){ code_used = true; }
    } // endfor
    if(!ns_found && !code_used){
      this.ZTICNS_AR.push({code: ztic_msg, namespace: ns_msg});
    }
    else if(!ns_found && code_used){
      console.log("ERROR in mergeMessageZTICs - ZTIC "+ztic_msg+" for "+ns_msg+" already used for another namespace in the client ZTIC domain");
    } // endif
  } // endfor
}  // end of mergeMessageZTICs()


// start 20261021 - child page type values and links
// templates one level below a child template (template_AR is flat, parent_idx = template index of parent level)
getChildLinkTemplIdx_AR(child_templ_idxx){
  var ret_AR = [];
  for(var i = 0; i < this.template_AR.length; i++){
    if(this.template_AR[i].parent_idx == child_templ_idxx && this.template_AR[i].templLevelsDown == this.template_AR[child_templ_idxx].templLevelsDown + 1){
      ret_AR.push(i);
    } // endif
  } // endfor
  return ret_AR;
}  // end of getChildLinkTemplIdx_AR()


// key used in linkFromObj_key for links from the selected child object
getChildObjKey(child_templ_idxx, child_obj_idxx){
  var child_obj = this.template_AR[child_templ_idxx].object_AR[child_obj_idxx];
  return this.template_AR[child_templ_idxx].objKindZTIC.toString().trim()+"_"+this.template_AR[child_templ_idxx].objKindCode.toString().trim()+"_"+child_obj.objZTIC.toString().trim()+"_"+child_obj.objCodeAssigned.toString().trim();
}  // end of getChildObjKey()


// child objects are only loaded with OE values - add a type value rec per type definition and a create-link row per link template
prepareChildPage(child_templ_idxx, child_obj_idxx){
  const html_id_prfx = "val";
  var child_obj = this.template_AR[child_templ_idxx].object_AR[child_obj_idxx];

  for(var i = 0; i < this.template_AR[child_templ_idxx].typeDef_AR.length; i++){
    var typeDefx = this.template_AR[child_templ_idxx].typeDef_AR[i];
    var found_type_val = false;
    for(var j = 0; j < child_obj.typeVal_AR.length; j++){
      if(child_obj.typeVal_AR[j].typeDef_ztic == typeDefx.typeDef_ztic && child_obj.typeVal_AR[j].typeDef_code == typeDefx.typeDef_code){
        found_type_val = true;
      } // endif
    } // endfor
    if(!found_type_val){
      var type_val_rec = new TypeValueRec();
      type_val_rec.typeDef_ztic = typeDefx.typeDef_ztic;
      type_val_rec.typeDef_code = typeDefx.typeDef_code;
      this.html_id_cntr++;
      type_val_rec.ztic_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
      this.html_id_cntr++;
      type_val_rec.code_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
      this.html_id_cntr++;
      type_val_rec.composite_html_id = html_id_prfx + this.html_id_cntr.toString().trim();
      this.html_id_cntr++;
      type_val_rec.dateStr_html_id = html_id_prfx + this.html_id_cntr.toString().trim();
      child_obj.typeVal_AR.push(type_val_rec);
    } // endif !found_type_val
  } // endfor loop through typeDef_AR

  var new_link_key = "new_"+child_templ_idxx+"_"+child_obj_idxx;
  var link_templ_idx_AR = this.getChildLinkTemplIdx_AR(child_templ_idxx);
  for(var i = 0; i < link_templ_idx_AR.length; i++){
    var found_new_link_obj = false;
    for(var j = 0; j < this.template_AR[link_templ_idx_AR[i]].object_AR.length; j++){
      if(this.template_AR[link_templ_idx_AR[i]].object_AR[j].linkFromObj_key == new_link_key){
        found_new_link_obj = true;
      } // endif
    } // endfor
    if(!found_new_link_obj){
      var obj = new ObjectRec();
      this.html_id_cntr++;
      obj.objZTIC_ns_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
      this.html_id_cntr++;
      obj.objCodeAssigned_html_id = html_id_prfx + this.html_id_cntr.toString().trim();
      this.html_id_cntr++;
      obj.linkStatus_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
      this.html_id_cntr++;
      obj.linkValue_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
      obj.newCode = false;
      obj.newLinkToExistingObject = true;
      obj.linkFromObj_key = new_link_key;
      this.template_AR[link_templ_idx_AR[i]].object_AR.push(obj);
    } // endif !found_new_link_obj

    // 20261021 blank new object to create and link from the selected object
    if(this.getChildPageNewObj(child_templ_idxx, child_obj_idxx, link_templ_idx_AR[i]) == null){
      this.createNewLinkedObject(child_templ_idxx, child_obj_idxx, link_templ_idx_AR[i]);   // 20261023 moved to createNewLinkedObject
    } // endif no new object yet
  } // endfor loop through link_templ_idx_AR
}  // end of prepareChildPage()


// start 20261023 - new linked objects (several per link template - Add New Linked Object)
// blank new object of link template link_templ_idxx, linked from object src_obj_idxx of template src_templ_idxx when submitted
createNewLinkedObject(src_templ_idxx, src_obj_idxx, link_templ_idxx){
  const html_id_prfx = "val";
  var new_obj = new ObjectRec();
  new_obj.newCode = true;
  new_obj.linkFromObj_key = "newobj_"+src_templ_idxx+"_"+src_obj_idxx;
  this.html_id_cntr++;   // ns/code ids are not shown but every object needs them - page scripts assign <html_id> values for all objects
  new_obj.objZTIC_ns_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
  this.html_id_cntr++;
  new_obj.objCodeAssigned_html_id = html_id_prfx + this.html_id_cntr.toString().trim();
  this.html_id_cntr++;
  new_obj.linkStatus_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
  this.html_id_cntr++;
  new_obj.linkValue_html_id  = html_id_prfx + this.html_id_cntr.toString().trim();
  for(var j = 0; j < this.template_AR[link_templ_idxx].OE_def_AR.length; j++){
    var new_oe_val_rec = new ObjectElementValueRec();
    new_oe_val_rec.OE_ztic = this.template_AR[link_templ_idxx].OE_def_AR[j].OE_ztic;
    new_oe_val_rec.OE_code = this.template_AR[link_templ_idxx].OE_def_AR[j].OE_code;
    this.html_id_cntr++;
    new_oe_val_rec.html_id = html_id_prfx + this.html_id_cntr.toString().trim();
    new_obj.OE_val_AR.push(new_oe_val_rec);
  } // endfor
  this.template_AR[link_templ_idxx].object_AR.push(new_obj);
  return new_obj;
}  // end of createNewLinkedObject()


// all new objects of a link template linked from a source object
getChildPageNewObj_AR(src_templ_idxx, src_obj_idxx, link_templ_idxx){
  var new_obj_key = "newobj_"+src_templ_idxx+"_"+src_obj_idxx;
  return this.template_AR[link_templ_idxx].object_AR.filter(function(o){ return o.linkFromObj_key == new_obj_key; });
}  // end of getChildPageNewObj_AR()


// identity of an existing deeper source object (used when its own page is not applied), undefined otherwise
getSourceObjIdent(src_templ_idxx, src_obj_idxx){
  var src_templ = this.template_AR[src_templ_idxx];
  var src_obj = src_templ ? src_templ.object_AR[src_obj_idxx] : null;
  if(src_templ && src_obj && src_templ.templLevelsDown > 1 && !src_obj.newCode){
    return {kind_ztic: src_templ.objKindZTIC, kind_code: src_templ.objKindCode, ns: this.getNamespaceForZTIC(src_obj.objZTIC), code: src_obj.objCodeAssigned};
  } // endif
  return undefined;
}  // end of getSourceObjIdent()


// Apply / Submit description of a new object block
getNewObjMeta(src_templ_idxx, src_obj_idxx, link_templ_idxx, new_obj){
  var ltx = this.template_AR[link_templ_idxx];
  var new_obj_idx = ltx.object_AR.indexOf(new_obj);
  var m = {linkType_ztic: ltx.linkableObjectLinkType_ztic, linkType_code: ltx.linkableObjectLinkType_code, kind_ztic: ltx.objKindZTIC, kind_code: ltx.objKindCode,
           templ_ztic: ltx.templZTIC, templ_code: ltx.templCode, status_id: new_obj.linkStatus_html_id, value_id: new_obj.linkValue_html_id, oe: [],
           key: link_templ_idxx+"_"+new_obj_idx, templ_idx: link_templ_idxx, obj_idx: new_obj_idx, source_key: src_templ_idxx+"_"+src_obj_idxx, ids: [new_obj.linkStatus_html_id, new_obj.linkValue_html_id]};
  var src_ident = this.getSourceObjIdent(src_templ_idxx, src_obj_idxx);
  if(src_ident){ m.source_obj_ident = src_ident; }
  for(var k = 0; k < new_obj.OE_val_AR.length; k++){
    m.oe.push({OE_ztic: new_obj.OE_val_AR[k].OE_ztic, OE_code: new_obj.OE_val_AR[k].OE_code, id: new_obj.OE_val_AR[k].html_id});
    m.ids.push(new_obj.OE_val_AR[k].html_id);
  } // endfor
  return m;
}  // end of getNewObjMeta()


// table rows of a new object block: Maintain, link status/value, OE fields (blank)
getNewLinkedObjectBlockHtml(link_templ_idxx, new_obj){
  var ltx = this.template_AR[link_templ_idxx];
  var new_obj_idx = ltx.object_AR.indexOf(new_obj);
  if(this.isTableLinkTemplate(link_templ_idxx)){ return this.getLinkedObjectTableRowHtml(link_templ_idxx, new_obj, false); }   // 20261026 table row
  var html = "<tr><td><input type='button' class='maintain_child' id='maintain_new_" + link_templ_idxx + "_" + new_obj_idx + "' data-sess_id='" + this.id + "' data-templ_idx='" + link_templ_idxx + "' data-obj_idx='" + new_obj_idx + "' value='Maintain'></td></tr>";
  //html = html + "<tr><td>New Linked Object Status-Value </td><td><input type=\"TEXT\" id='"+ new_obj.linkStatus_html_id+ "' size='5' value=''></td><td><input type=\"TEXT\" id='" + new_obj.linkValue_html_id+ "' size='10' value=''></td></tr>";   //(del) 20261105
  html = html + "<tr><td colspan='6' style='white-space:nowrap'>New Linked Object:&nbsp; <input type=\"TEXT\" id='"+ new_obj.linkStatus_html_id+ "' size='5' placeholder='Status' value=''> <input type=\"TEXT\" id='" + new_obj.linkValue_html_id+ "' size='10' placeholder='Value' value=''></td></tr>";   // 20261105 Status / Value right after the label
  for(var k = 0; k < new_obj.OE_val_AR.length; k++){
    var new_labelx = "";
    var new_sizex  = 30;
    for(var l = 0; l < ltx.OE_def_AR.length; l++){
      if(ltx.OE_def_AR[l].OE_ztic == new_obj.OE_val_AR[k].OE_ztic && ltx.OE_def_AR[l].OE_code == new_obj.OE_val_AR[k].OE_code){
        new_labelx = ltx.OE_def_AR[l].html_label;
        if(ltx.OE_def_AR[l].html_size != undefined && ltx.OE_def_AR[l].html_size !== ""){ new_sizex = ltx.OE_def_AR[l].html_size; }
      } // endif
    } // endfor
    if(new_sizex < 80){
      html = html + "<tr><td>"+ new_labelx +"</td><td> <input type=\"TEXT\" id='"+ new_obj.OE_val_AR[k].html_id +"' size='"+ new_sizex +"' value=''></td></tr>";
    }
    else{
      html = html + "<tr><td>"+ new_labelx +"</td></tr>";
      //html = html + "<tr><td><textarea name=\"comments\" id='"+ new_obj.OE_val_AR[k].html_id +"' cols='80' rows='20'></textarea></td></tr>";   //(del) 20261105
      html = html + "<tr><td colspan='6'><textarea name=\"comments\" id='"+ new_obj.OE_val_AR[k].html_id +"' cols='80' rows='20'></textarea></td></tr>";   // 20261105 text area spans the row so it does not widen the label column
    } // endif new_sizex < 80
  } // endfor
  return html;
}  // end of getNewLinkedObjectBlockHtml()


// start 20261026 - linked objects listed as a table (UI attribute)
// namespace -> ZTIC of the session
getZTICForNamespace(nsx){
  for(var i = 0; i < this.ZTICNS_AR.length; i++){
    if(this.ZTICNS_AR[i].namespace.toString().trim() == nsx.toString().trim()){ return this.ZTICNS_AR[i].code.toString().trim(); }
  } // endfor
  return null;
}  // end of getZTICForNamespace()


// 20261104 font-family from the UI attributes (parameter zinfinitree.com/user_interface 4), "" if none
// characters that could end the CSS rule or the style element are removed
getUIFontFamily(){
  if(!this.UI_attribute_AR){ return ""; }
  for(var a = 0; a < this.UI_attribute_AR.length; a++){
    var pv_AR = this.UI_attribute_AR[a].UI_parameterValue_AR || [];
    for(var p = 0; p < pv_AR.length; p++){
      var pv = pv_AR[p];
      if(pv.UI_parameter_ns != undefined && pv.UI_parameter_ns.toString().trim() == "zinfinitree.com/user_interface" &&
         pv.UI_parameter_code != undefined && pv.UI_parameter_code.toString().trim() == "4" &&
         pv.UI_parameterValue != undefined && pv.UI_parameterValue.toString().trim() != ""){
        return pv.UI_parameterValue.toString().replace(/[<>{};\\]/g, "").trim();
      } // endif
    } // endfor
  } // endfor
  return "";
}  // end of getUIFontFamily()


// true if a UI attribute names the link type of this link template with the horizontal (table) layout
// 20261104 UI attributes from the app's UI profile: parameter values with parameter zinfinitree.com/user_interface 1 = namespace of the link type, 2 = code of the link type, 3 = layout code (1 vertical, 2 horizontal)
isTableLinkTemplate(link_templ_idxx){
  var ltx = this.template_AR[link_templ_idxx];
  if(!ltx || !this.UI_attribute_AR){ return false; }
  for(var a = 0; a < this.UI_attribute_AR.length; a++){
    var ns = null, code = null, layout = null;
    (this.UI_attribute_AR[a].UI_parameterValue_AR || []).forEach(function(pv){
      if(pv.UI_parameter_ns == undefined || pv.UI_parameter_ns.toString().trim() != "zinfinitree.com/user_interface"){ return; }
      var pcode = (pv.UI_parameter_code == undefined) ? "" : pv.UI_parameter_code.toString().trim();
      if(pcode == "1"){ ns = pv.UI_parameterValue; }
      if(pcode == "2"){ code = pv.UI_parameterValue; }
      if(pcode == "3"){ layout = pv.UI_parameterValue; }
    });
    if(ns == null || code == null || layout == null || layout.toString().trim() != "2"){ continue; }
    var ztic = this.getZTICForNamespace(ns);
    if(ztic != null && ztic == ltx.linkableObjectLinkType_ztic.toString().trim() && code.toString().trim() == ltx.linkableObjectLinkType_code.toString().trim()){ return true; }
  } // endfor
  return false;
}  // end of isTableLinkTemplate()


// heading row: Maintain, Code, link status/value, then the object element descriptions
getLinkedObjectTableHeadingHtml(link_templ_idxx){
  var ltx = this.template_AR[link_templ_idxx];
  var html = "<tr><th></th><th>Code</th><th>Link Status</th><th>Link Value</th>";
  for(var l = 0; l < ltx.OE_def_AR.length; l++){
    html = html + "<th>" + this.escapeHtml(ltx.OE_def_AR[l].html_label) + "</th>";
  } // endfor
  return html + "</tr>";
}  // end of getLinkedObjectTableHeadingHtml()


// one row for a linked object (existing or new) - same field ids as the block layout, so Apply / held values work unchanged
getLinkedObjectTableRowHtml(link_templ_idxx, objx, page_readonlyx){
  var ltx = this.template_AR[link_templ_idxx];
  var obj_idx = ltx.object_AR.indexOf(objx);
  var ro = (page_readonlyx || this.isForeignObject(objx)) ? this.foreign_ro_attr : "";
  var link_ro = page_readonlyx ? this.foreign_ro_attr : "";   // link belongs to the object of the page
  var btn_id = (objx.newCode ? "maintain_new_" : "maintain_link_") + link_templ_idxx + "_" + obj_idx;
  var code_txt = objx.newCode ? "<span style='color:#888888'>(new)</span>" :   // 20261105 grey (new) as after ===== Code:
      this.escapeHtml(objx.objCodeAssigned) + (this.isForeignObject(objx) ? " (" + this.escapeHtml(this.getNamespaceForZTIC(objx.objZTIC)) + ", display only)" : "");
  var html = "<tr><td><input type='button' class='maintain_child' id='" + btn_id + "' data-sess_id='" + this.id + "' data-templ_idx='" + link_templ_idxx + "' data-obj_idx='" + obj_idx + "' value='Maintain'></td>";
  html = html + "<td>" + code_txt + "</td>";
  html = html + "<td><input type=\"TEXT\"" + link_ro + " id='" + objx.linkStatus_html_id + "' size='5' value='" + this.escapeHtml(objx.newCode ? "" : objx.linkStatus_html_input_val) + "'></td>";
  html = html + "<td><input type=\"TEXT\"" + link_ro + " id='" + objx.linkValue_html_id + "' size='10' value='" + this.escapeHtml(objx.newCode ? "" : objx.linkValue_html_input_val) + "'></td>";
  for(var l = 0; l < ltx.OE_def_AR.length; l++){
    var oe_valx = null;
    for(var k = 0; k < objx.OE_val_AR.length; k++){
      if(objx.OE_val_AR[k].OE_ztic == ltx.OE_def_AR[l].OE_ztic && objx.OE_val_AR[k].OE_code == ltx.OE_def_AR[l].OE_code){ oe_valx = objx.OE_val_AR[k]; }
    } // endfor
    var sizex = (ltx.OE_def_AR[l].html_size != undefined && ltx.OE_def_AR[l].html_size !== "") ? Math.min(parseInt(ltx.OE_def_AR[l].html_size, 10) || 20, 30) : 20;
    if(oe_valx == null){ html = html + "<td></td>"; continue; }
    html = html + "<td><input type=\"TEXT\"" + ro + " id='" + oe_valx.html_id + "' size='" + sizex + "' value='" + this.escapeHtml(objx.newCode ? "" : oe_valx.html_input_val) + "'></td>";
  } // endfor
  return html + "</tr>";
}  // end of getLinkedObjectTableRowHtml()
// end 20261026


// 20261105 code shown after "===== Code:" - (new) in grey when the object has no assigned code yet
getCodeLabelHtml(objx){
  var code = (objx.objCodeAssigned == undefined || objx.objCodeAssigned == null) ? "" : objx.objCodeAssigned.toString().trim();
  if(code == ""){ return "<span style='color:#888888'>(new)</span>"; }   // 20261105 (new) as in the linked object table
  return this.escapeHtml(code);
}  // end of getCodeLabelHtml()


// 20261105 Create Link to Existing Object row - label and the namespace / code / status / value inputs in one cell spanning the row
getCreateLinkRowHtml(objx){
  var inp = function(self, idx, size, valx, hint){ return "<input type=\"TEXT\" id='" + idx + "' size='" + size + "' placeholder='" + hint + "' value='" + self.escapeHtml(valx) + "'>"; };
  return "<tr><td colspan='6' style='white-space:nowrap'>Create Link to Existing Object:&nbsp; "   // 20261105 field names shown as placeholders
         + inp(this, objx.objZTIC_ns_html_id, 30, objx.objZTIC_ns_html_input_val, "Namespace") + " "
         + inp(this, objx.objCodeAssigned_html_id, 5, objx.objCodeAssigned_html_input_val, "Code") + " "
         + inp(this, objx.linkStatus_html_id, 5, objx.linkStatus_html_input_val, "Status") + " "
         + inp(this, objx.linkValue_html_id, 10, objx.linkValue_html_input_val, "Value") + "</td></tr>";
}  // end of getCreateLinkRowHtml()


// Add New Linked Object button (after the Link Type heading) and the end marker the added blocks are inserted before
getAddNewLinkedObjectButtonHtml(src_templ_idxx, src_obj_idxx, link_templ_idxx){
  return " <input type='button' class='zt_add_new' value='Add New Linked Object' data-sess_id='" + this.id + "' data-src_templ_idx='" + src_templ_idxx + "' data-src_obj_idx='" + src_obj_idxx + "' data-link_templ_idx='" + link_templ_idxx + "'>";
}  // end of getAddNewLinkedObjectButtonHtml()


// called by /zt/client/add_new_linked_object - adds a blank new object, returns its rows and Apply/Submit description
addNewLinkedObjectForPage(src_templ_idxx, src_obj_idxx, link_templ_idxx){
  var new_obj = this.createNewLinkedObject(src_templ_idxx, src_obj_idxx, link_templ_idxx);
  return {html: this.getNewLinkedObjectBlockHtml(link_templ_idxx, new_obj), meta: this.getNewObjMeta(src_templ_idxx, src_obj_idxx, link_templ_idxx, new_obj)};
}  // end of addNewLinkedObjectForPage()
// end 20261023


// start 20261107 - specialized maintenance for workbooks (object kind zinfinitree.com/spreadsheet 1): Columns and Rows grid in the Links box
// true for the parent page of a workbook in generic object maintenance
isWorkbookGridPage(templ_idxx, is_child_pagex){
  if(is_child_pagex){ return false; }
  var ss_ztic = this.getZTICForNamespace("zinfinitree.com/spreadsheet");
  var templx = this.template_AR[templ_idxx];
  return (ss_ztic != null && templx && templx.objKindZTIC.toString().trim() == ss_ztic && templx.objKindCode.toString().trim() == "1" && this.maint_mode != "display");
}  // end of isWorkbookGridPage()


// level 1 templates of the workbook for columns (kind spreadsheet 3) and rows (kind spreadsheet 4), -1 if not found
getWorkbookGridTemplIdx(top_templ_idxx){
  var ss_ztic = this.getZTICForNamespace("zinfinitree.com/spreadsheet");
  var ret = {col: -1, row: -1, sheet: -1};   // 20261113 sheet
  var child_AR = this.template_AR[top_templ_idxx].childTempl_idx_AR;
  for(var i = 0; i < child_AR.length; i++){
    var tx = this.template_AR[child_AR[i]];
    if(tx.templLevelsDown != 1 || tx.objKindZTIC.toString().trim() != ss_ztic){ continue; }
    if(tx.objKindCode.toString().trim() == "3" && ret.col == -1){ ret.col = child_AR[i]; }
    if(tx.objKindCode.toString().trim() == "4" && ret.row == -1){ ret.row = child_AR[i]; }
    if(tx.objKindCode.toString().trim() == "2" && ret.sheet == -1){ ret.sheet = child_AR[i]; }   // 20261113 Sheets (Spreadsheet kind)
  } // endfor
  return ret;
}  // end of getWorkbookGridTemplIdx()


// a type value rec (with html ids) for each type definition of the template
ensureTypeValRecs(templ_idxx, objx){
  const html_id_prfx = "val";
  for(var i = 0; i < this.template_AR[templ_idxx].typeDef_AR.length; i++){
    var typeDefx = this.template_AR[templ_idxx].typeDef_AR[i];
    var found = objx.typeVal_AR.some(function(tv){ return tv.typeDef_ztic == typeDefx.typeDef_ztic && tv.typeDef_code == typeDefx.typeDef_code; });
    if(found){ continue; }
    var type_val_rec = new TypeValueRec();
    type_val_rec.typeDef_ztic = typeDefx.typeDef_ztic;
    type_val_rec.typeDef_code = typeDefx.typeDef_code;
    this.html_id_cntr++; type_val_rec.ztic_html_id      = html_id_prfx + this.html_id_cntr.toString().trim();
    this.html_id_cntr++; type_val_rec.code_html_id      = html_id_prfx + this.html_id_cntr.toString().trim();
    this.html_id_cntr++; type_val_rec.composite_html_id = html_id_prfx + this.html_id_cntr.toString().trim();
    this.html_id_cntr++; type_val_rec.dateStr_html_id   = html_id_prfx + this.html_id_cntr.toString().trim();
    objx.typeVal_AR.push(type_val_rec);
  } // endfor
}  // end of ensureTypeValRecs()


// columns / rows shown in the grid: existing linked objects, the blank new object in create mode, and objects added with Add Column / Add Row
getWorkbookGridObjects(item_templ_idxx, top_templ_idxx){
  var self = this;
  var added_key = "newobj_" + top_templ_idxx + "_0";
  return this.template_AR[item_templ_idxx].object_AR.filter(function(o){
    if(o.newLinkToExistingObject){ return false; }
    if(o.linkFromObj_key == added_key){ return true; }
    if(o.newCode){ return self.maint_mode == "create" && (o.linkFromObj_key == undefined || o.linkFromObj_key == ""); }
    return o.objCodeAssigned != undefined && o.objCodeAssigned.toString().trim() != "";
  });
}  // end of getWorkbookGridObjects()


// object element shown for a column / row: the description (label containing "Description"), else the first one
getWorkbookDescOE(item_templ_idxx, objx){
  var defs = this.template_AR[item_templ_idxx].OE_def_AR;
  var def = null;
  for(var i = 0; i < defs.length && def == null; i++){ if(defs[i].html_label != undefined && defs[i].html_label.indexOf("Description") != -1){ def = defs[i]; } }
  if(def == null && defs.length > 0){ def = defs[0]; }
  if(def == null){ return null; }
  for(var k = 0; k < objx.OE_val_AR.length; k++){
    if(objx.OE_val_AR[k].OE_ztic == def.OE_ztic && objx.OE_val_AR[k].OE_code == def.OE_code){ return objx.OE_val_AR[k]; }
  } // endfor
  return null;
}  // end of getWorkbookDescOE()


// 20261113 label element of a column / row (label containing "Label"), null if none
getWorkbookLabelOE(item_templ_idxx, objx){
  var defs = this.template_AR[item_templ_idxx].OE_def_AR;
  var def = null;
  for(var i = 0; i < defs.length && def == null; i++){ if(defs[i].html_label != undefined && defs[i].html_label.indexOf("Label") != -1){ def = defs[i]; } }
  if(def == null){ return null; }
  for(var k = 0; k < objx.OE_val_AR.length; k++){
    if(objx.OE_val_AR[k].OE_ztic == def.OE_ztic && objx.OE_val_AR[k].OE_code == def.OE_code){ return objx.OE_val_AR[k]; }
  } // endfor
  return null;
}  // end of getWorkbookLabelOE()


// Apply/Submit description of a grid object: type values (and for added objects the new object link and OE values)
getWorkbookItemMeta(item_templ_idxx, objx, top_templ_idxx){
  var obj_idx = this.template_AR[item_templ_idxx].object_AR.indexOf(objx);
  var m;
  if(objx.linkFromObj_key == "newobj_" + top_templ_idxx + "_0"){
    m = this.getNewObjMeta(top_templ_idxx, 0, item_templ_idxx, objx);   // added with Add Column / Add Row - created and linked from the workbook on Submit
    delete m.ids;
  }
  else{
    m = {key: item_templ_idxx + "_" + obj_idx, templ_idx: item_templ_idxx, obj_idx: obj_idx};   // existing or blank new level 1 object - OE values are read by the parent Submit
  } // endif
  m.tv = [];
  for(var i = 0; i < this.template_AR[item_templ_idxx].typeDef_AR.length; i++){
    var td = this.template_AR[item_templ_idxx].typeDef_AR[i];
    var tvx = objx.typeVal_AR.find(function(tv){ return tv.typeDef_ztic == td.typeDef_ztic && tv.typeDef_code == td.typeDef_code; });
    if(tvx && this.getAllowedValueSetWithMembers(td.typeDef_ztic, td.typeDef_code)){ m.tv.push({typeDef_ztic: td.typeDef_ztic, typeDef_code: td.typeDef_code, input: "sel", sel_id: tvx.composite_html_id}); }   // 20261108 dropdown
    else if(tvx){ m.tv.push({typeDef_ztic: td.typeDef_ztic, typeDef_code: td.typeDef_code, input: "text", ns_id: tvx.ztic_html_id, code_id: tvx.code_html_id}); }
  } // endfor
  return m;
}  // end of getWorkbookItemMeta()


// 20261108 object set of allowed values for a type definition when its members are loaded, null otherwise
getAllowedValueSetWithMembers(typeDef_zticx, typeDef_codex){
  for(var n = 0; n < this.typeDefAllowedValueSet_AR.length; n++){
    var avs = this.typeDefAllowedValueSet_AR[n];
    if(avs.typeDef_ztic == typeDef_zticx && avs.typeDef_code == typeDef_codex && this.allowedValueSetHasMembers(avs.objectSet_ztic, avs.objectSet_code)){
      for(var i = 0; i < this.objectSet_AR.length; i++){
        if(this.objectSet_AR[i].objSetZTIC == avs.objectSet_ztic && this.objectSet_AR[i].objSetCode == avs.objectSet_code){ return this.objectSet_AR[i]; }
      } // endfor
    } // endif
  } // endfor
  return null;
}  // end of getAllowedValueSetWithMembers()


// 20261108 dropdown with the members of an object set - option value "ZTIC | code" (as the existing selection lists), current value selected
getTypeValueSelectHtml(objSetx, select_idx, cur_nsx, cur_codex){
  var self = this;
  var html = "<select id='" + select_idx + "'><option value='     |     '>-</option>";
  var seen = {};
  var group_ns_AR = [];   // 20261111 options grouped by namespace (optgroup), namespaces in order of first appearance
  var group_HM = {};
  objSetx.objSetMember_AR.forEach(function(mx){
    var key = mx.objectZTIC + "|" + mx.objectCode;
    if(seen[key]){ return; } seen[key] = true;
    var ns = self.getNamespaceForZTIC(mx.objectZTIC);
    //var txt = mx.objectCode + ": " + mx.OE_val_AR.map(function(v){ return v.OE_value; }).join(" - ");   //(del) 20261111
    var txt = ((ns == null) ? "" : ns + " - ") + mx.objectCode + ": " + mx.OE_val_AR.map(function(v){ return v.OE_value; }).join(" - ");   // 20261111 namespace first, as in the generic page dropdowns - same codes in several namespaces
    var sel = (ns == cur_nsx && mx.objectCode.toString().trim() == (cur_codex == undefined ? "" : cur_codex.toString().trim())) ? " selected" : "";
    //html = html + "<option value='" + self.escapeHtml(mx.objectZTIC + " | " + mx.objectCode) + "'" + sel + ">" + self.escapeHtml(txt) + "</option>";   //(del) 20261111 grouped below
    var group_key = (ns == null) ? "" : ns;   // 20261111 namespace kept in the option text too - a closed dropdown shows only the selected option
    if(group_HM[group_key] == undefined){ group_HM[group_key] = ""; group_ns_AR.push(group_key); }
    group_HM[group_key] = group_HM[group_key] + "<option value='" + self.escapeHtml(mx.objectZTIC + " | " + mx.objectCode) + "'" + sel + ">" + self.escapeHtml(txt) + "</option>";
  });
  group_ns_AR.forEach(function(nsx){   // 20261111
    html = html + "<optgroup label='" + self.escapeHtml(nsx == "" ? "(namespace unknown)" : nsx) + "'>" + group_HM[nsx] + "</optgroup>";
  });
  return html + "</select>";
}  // end of getTypeValueSelectHtml()


// 20261110 type value input(s) of an object for one type definition: dropdown when the allowed values are loaded, else namespace + code
getWorkbookTypeValueInputHtml(objx, tdx){
  var tvx = objx.typeVal_AR.find(function(tv){ return tv.typeDef_ztic == tdx.typeDef_ztic && tv.typeDef_code == tdx.typeDef_code; });
  if(!tvx){ return ""; }
  var avs = this.getAllowedValueSetWithMembers(tdx.typeDef_ztic, tdx.typeDef_code);
  if(avs){ return this.getTypeValueSelectHtml(avs, tvx.composite_html_id, tvx.ztic_ns_html_input_val, tvx.code_html_input_val); }
  return "<input type='TEXT' id='" + tvx.ztic_html_id + "' size='14' placeholder='Namespace' value='" + this.escapeHtml(tvx.ztic_ns_html_input_val) + "'> <input type='TEXT' id='" + tvx.code_html_id + "' size='4' placeholder='Code' value='" + this.escapeHtml(tvx.code_html_input_val) + "'>";
}  // end of getWorkbookTypeValueInputHtml()


// 20261110 Row Type Values column (grey, Open / Close) and the row type definition columns after it (hidden until Open)
getWorkbookRowTypeCells(row_templ_idxx, kindx, objx){
  var self = this;
  var tds = this.template_AR[row_templ_idxx].typeDef_AR;
  var grey = "background-color:#d9d9d9;";
  if(kindx == "head"){
    //return "<th style='" + grey + "white-space:nowrap;text-align:left'>Row Type Values&nbsp; <input type='button' class='zt_wb_rtv_btn' value='Open'></th>"   //(del) 20261113
    return "<th style='" + grey + "text-align:left'>Row<br>Type<br>Values<br><input type='button' class='zt_wb_rtv_btn' value='Open'></th>"   // 20261113 one word per line, button below
         + tds.map(function(td){ return "<th class='zt_wb_rtv' style='display:none'>" + self.escapeHtml(td.typeDef_desc) + "</th>"; }).join("");
  } // endif
  if(kindx == "row"){
    return "<td style='" + grey + "'></td>"
         + tds.map(function(td){ return "<td class='zt_wb_rtv' style='display:none;white-space:nowrap'>" + self.getWorkbookTypeValueInputHtml(objx, td) + "</td>"; }).join("");
  } // endif
  return "<td style='" + grey + "'></td>" + tds.map(function(){ return "<td class='zt_wb_rtv' style='display:none'></td>"; }).join("");   // column rows of the grid
}  // end of getWorkbookRowTypeCells()


// grid cells of one column: code, description, one per column type definition
getWorkbookColumnCells(col_templ_idxx, objx){
  var self = this;
  var desc = this.getWorkbookDescOE(col_templ_idxx, objx);
  var label = this.getWorkbookLabelOE(col_templ_idxx, objx);   // 20261113 Column Label
  var cells = {label: "<td>" + (label ? "<input type='TEXT' id='" + label.html_id + "' size='20' placeholder='Column Label' value='" + this.escapeHtml(objx.newCode ? "" : label.html_input_val) + "'>" : "") + "</td>",   // 20261113
               code: "<th class='zt_wb_col'>" + this.getCodeLabelHtml(objx) + "</th>",   // 20261110 zt_wb_col - counted by Add Row
               desc: "<td>" + (desc ? "<input type='TEXT' id='" + desc.html_id + "' size='20' placeholder='Column Description' value='" + this.escapeHtml(objx.newCode ? "" : desc.html_input_val) + "'>" : "") + "</td>",
               tv: []};
  this.template_AR[col_templ_idxx].typeDef_AR.forEach(function(td){
    var tvx = objx.typeVal_AR.find(function(tv){ return tv.typeDef_ztic == td.typeDef_ztic && tv.typeDef_code == td.typeDef_code; });
    if(tvx){ cells.tv.push("<td style='white-space:nowrap'>" + self.getWorkbookTypeValueInputHtml(objx, td) + "</td>"); return; }   // 20261110 shared with row type values
    cells.tv.push(tvx ? "<td style='white-space:nowrap'><input type='TEXT' id='" + tvx.ztic_html_id + "' size='14' placeholder='Namespace' value='" + self.escapeHtml(tvx.ztic_ns_html_input_val) + "'> <input type='TEXT' id='" + tvx.code_html_id + "' size='4' placeholder='Code' value='" + self.escapeHtml(tvx.code_html_input_val) + "'></td>" : "<td></td>");
  });
  return cells;
}  // end of getWorkbookColumnCells()


// one grid row for a row object: code and description, then an empty cell per column
getWorkbookRowHtml(row_templ_idxx, objx, col_countx){
  var desc = this.getWorkbookDescOE(row_templ_idxx, objx);
  var rtv_cells = this.getWorkbookRowTypeCells(row_templ_idxx, "row", objx);   // 20261110 Row Type Values
  var row_label = this.getWorkbookLabelOE(row_templ_idxx, objx);   // 20261113
  //var html = "<tr class='zt_wb_row'><td style='white-space:nowrap'>" + this.getCodeLabelHtml(objx) + "&nbsp; " + (desc ? "<input type='TEXT' id='" + desc.html_id + "' size='22' placeholder='Row Description' value='" + this.escapeHtml(objx.newCode ? "" : desc.html_input_val) + "'>" : "") + "</td>";   //(del) 20261113
  //var html = "<tr class='zt_wb_row'><td style='white-space:nowrap'>" + this.getCodeLabelHtml(objx) + "</td><td>" + (desc ? "<input type='TEXT' id='" + desc.html_id + "' size='22' placeholder='Row Description' value='" + this.escapeHtml(objx.newCode ? "" : desc.html_input_val) + "'>" : "") + "</td>";   // 20261113 code and description in separate cells   //(del) 20261113
  var html = "<tr class='zt_wb_row'><td style='white-space:nowrap'>" + this.getCodeLabelHtml(objx) + "</td><td>" + (row_label ? "<input type='TEXT' id='" + row_label.html_id + "' size='16' placeholder='Row Label' value='" + this.escapeHtml(objx.newCode ? "" : row_label.html_input_val) + "'>" : "") + "</td><td>" + (desc ? "<input type='TEXT' id='" + desc.html_id + "' size='22' placeholder='Row Description' value='" + this.escapeHtml(objx.newCode ? "" : desc.html_input_val) + "'>" : "") + "</td>";   // 20261113 code and description in separate cells   // 20261113 Row Label between Row Code and Row Description
  html = html + rtv_cells;   // 20261110
  for(var c = 0; c < col_countx; c++){ html = html + "<td></td>"; }
  return html + "</tr>";
}  // end of getWorkbookRowHtml()


// 20261113 one sheet in a cell of the Sheets table: code, object element values, type values
getWorkbookSheetCellHtml(sheet_templ_idxx, objx){
  var self = this;
  var tx = this.template_AR[sheet_templ_idxx];
  var html = "<td class='zt_wb_sheet' style='vertical-align:top'><table>";
  html = html + "<tr><td><strong>Code:</strong></td><td>" + this.getCodeLabelHtml(objx) + "</td></tr>";
  tx.OE_def_AR.forEach(function(def){
    var oe = objx.OE_val_AR.find(function(v){ return v.OE_ztic == def.OE_ztic && v.OE_code == def.OE_code; });
    if(!oe){ return; }
    html = html + "<tr><td>" + self.escapeHtml(def.html_label) + "</td><td><input type='TEXT' id='" + oe.html_id + "' size='22' value='" + self.escapeHtml(objx.newCode ? "" : oe.html_input_val) + "'></td></tr>";
  });
  tx.typeDef_AR.forEach(function(td){
    html = html + "<tr><td>" + self.escapeHtml(td.typeDef_desc) + "</td><td style='white-space:nowrap'>" + self.getWorkbookTypeValueInputHtml(objx, td) + "</td></tr>";
  });
  return html + "</table></td>";
}  // end of getWorkbookSheetCellHtml()


// Columns and Rows box (inside the Links box) - returns {html, meta_AR}
getWorkbookGridHtml(top_templ_idxx){
  var self = this;
  var g = this.getWorkbookGridTemplIdx(top_templ_idxx);
  var meta_AR = [];
  if(g.col == -1 || g.row == -1){ return {html: "", meta_AR: meta_AR}; }
  var col_AR = this.getWorkbookGridObjects(g.col, top_templ_idxx);
  var row_AR = this.getWorkbookGridObjects(g.row, top_templ_idxx);
  col_AR.forEach(function(o){ self.ensureTypeValRecs(g.col, o); meta_AR.push(self.getWorkbookItemMeta(g.col, o, top_templ_idxx)); });
  row_AR.forEach(function(o){ self.ensureTypeValRecs(g.row, o); meta_AR.push(self.getWorkbookItemMeta(g.row, o, top_templ_idxx)); });
  var btn = function(label, item_t){ return " <input type='button' class='zt_wb_add' value='" + label + "' data-sess_id='" + self.id + "' data-top_templ_idx='" + top_templ_idxx + "' data-item_templ_idx='" + item_t + "'>"; };
  //var html = "<fieldset class='zt_linktype'><legend>Columns and Rows" + btn("Add Column", g.col) + btn("Add Row", g.row) + "</legend>";   //(del) 20261110
  var html = "<fieldset class='zt_section'><legend>Grid" + btn("Add Column", g.col) + btn("Add Row", g.row) + "</legend>";   // 20261110 own box after the Links box
  html = html + "<table id='zt_wb_grid' border='1' cellpadding='3' style='border-collapse:collapse;'>";
  var rtv_other = this.getWorkbookRowTypeCells(g.row, "other", null);   // 20261110 Row Type Values cells for the column rows
  //var code_row = "<tr id='zt_wb_code'><th style='text-align:left'>Column</th>" + this.getWorkbookRowTypeCells(g.row, "head", null);   // 20261110 Row Type Values heading   //(del) 20261113
  var code_row = "<tr id='zt_wb_code'><th colspan='3' style='text-align:left'>Column Code</th>" + this.getWorkbookRowTypeCells(g.row, "head", null);   // 20261110 Row Type Values heading   // 20261113 Column Code, label spans Row Code + Row Description columns
  //var desc_row = "<tr id='zt_wb_desc'><td><strong>Column Description</strong></td>" + rtv_other;   //(del) 20261113
  var desc_row = "<tr id='zt_wb_desc'><td colspan='3'><strong>Column Description</strong></td>" + rtv_other;   // 20261113 label spans both label columns
  //var tv_rows = this.template_AR[g.col].typeDef_AR.map(function(td){ return "<tr id='zt_wb_tv_" + td.typeDef_ztic + "_" + td.typeDef_code + "'><td>" + self.escapeHtml(td.typeDef_desc) + "</td>"; });   //(del) 20261109
  //var tv_rows = this.template_AR[g.col].typeDef_AR.map(function(td){ return "<tr id='zt_wb_tv_" + td.typeDef_ztic + "_" + td.typeDef_code + "' class='zt_wb_tv_row' style='display:none'><td>" + self.escapeHtml(td.typeDef_desc) + "</td>" + rtv_other; });   // 20261109 hidden until Open  // 20261110 rtv_other   //(del) 20261113
  var tv_rows = this.template_AR[g.col].typeDef_AR.map(function(td){ return "<tr id='zt_wb_tv_" + td.typeDef_ztic + "_" + td.typeDef_code + "' class='zt_wb_tv_row' style='display:none'><td colspan='3'>" + self.escapeHtml(td.typeDef_desc) + "</td>" + rtv_other; });   // 20261109 hidden until Open  // 20261110 rtv_other   // 20261113 label spans both label columns
  //var tv_toggle_row = "<tr id='zt_wb_tv_toggle' style='background-color:#d9d9d9'><td style='white-space:nowrap'><strong>Column Type Values</strong>&nbsp; <input type='button' class='zt_wb_tv_btn' value='Open'></td>" + rtv_other;   // 20261109 Open / Close the column type values  // 20261110 rtv_other   //(del) 20261113
  var tv_toggle_row = "<tr id='zt_wb_tv_toggle' style='background-color:#d9d9d9'><td colspan='3' style='white-space:nowrap'><strong>Column Type Values</strong>&nbsp; <input type='button' class='zt_wb_tv_btn' value='Open'></td>" + rtv_other;   // 20261109 Open / Close the column type values  // 20261110 rtv_other   // 20261113 label spans both label columns
  var label_row = "<tr id='zt_wb_label'><td colspan='3'><strong>Column Label</strong></td>" + rtv_other;   // 20261113 Column Label after Column Code
  col_AR.forEach(function(o){
    var cells = self.getWorkbookColumnCells(g.col, o);
    code_row = code_row + cells.code; desc_row = desc_row + cells.desc;
    label_row = label_row + cells.label;   // 20261113
    tv_toggle_row = tv_toggle_row + "<td></td>";   // 20261109
    cells.tv.forEach(function(c, h){ tv_rows[h] = tv_rows[h] + c; });
  });
  html = html + code_row + "</tr>" + label_row + "</tr>" + desc_row + "</tr>" + tv_toggle_row + "</tr>" + tv_rows.map(function(r){ return r + "</tr>"; }).join("");   // 20261109 tv_toggle_row
  //html = html + "<tr id='zt_wb_rows_head'><th style='text-align:left'>Rows</th>" + rtv_other + col_AR.map(function(){ return "<td></td>"; }).join("") + "</tr>";   //(del) 20261113
  html = html + "<tr id='zt_wb_rows_head'><th style='text-align:left'>Row Code</th><th style='text-align:left'>Row Label</th><th style='text-align:left'>Row Description</th>" + rtv_other + col_AR.map(function(){ return "<td></td>"; }).join("") + "</tr>";   // 20261113 Row Code and Row Description headings
  row_AR.forEach(function(o){ html = html + self.getWorkbookRowHtml(g.row, o, col_AR.length); });
  //html = html + "</table></fieldset>";   //(del) 20261113 Sheets table below
  html = html + "</table>";
  if(g.sheet != -1){   // 20261113 Sheets - one row, a sheet per cell, Add Sheet adds cells to the right
    var sheet_AR = this.getWorkbookGridObjects(g.sheet, top_templ_idxx);
    sheet_AR.forEach(function(o){ self.ensureTypeValRecs(g.sheet, o); meta_AR.push(self.getWorkbookItemMeta(g.sheet, o, top_templ_idxx)); });
    html = html + "<table id='zt_wb_sheets' border='1' cellpadding='3' style='border-collapse:collapse; margin-top:12px;'><tr id='zt_wb_sheets_row'>";
    html = html + "<th style='vertical-align:top; text-align:left; white-space:nowrap'>Sheets<br>" + btn("Add Sheet", g.sheet) + "</th>";
    sheet_AR.forEach(function(o){ html = html + self.getWorkbookSheetCellHtml(g.sheet, o); });
    html = html + "</tr></table>";
  } // endif g.sheet
  html = html + "</fieldset>";   // 20261113
  return {html: html, meta_AR: meta_AR};
}  // end of getWorkbookGridHtml()


// called by /zt/client/add_workbook_item - Add Column / Add Row
addWorkbookItem(top_templ_idxx, item_templ_idxx, col_countx){
  var g = this.getWorkbookGridTemplIdx(top_templ_idxx);
  var objx = this.createNewLinkedObject(top_templ_idxx, 0, item_templ_idxx);   // created and linked from the workbook on Submit
  this.ensureTypeValRecs(item_templ_idxx, objx);
  var meta = this.getWorkbookItemMeta(item_templ_idxx, objx, top_templ_idxx);
  if(item_templ_idxx == g.col){
    var cells = this.getWorkbookColumnCells(item_templ_idxx, objx);
    return {kind: "column", code: cells.code, label: cells.label, desc: cells.desc, tv: cells.tv, tv_row_ids: this.template_AR[item_templ_idxx].typeDef_AR.map(function(td){ return "zt_wb_tv_" + td.typeDef_ztic + "_" + td.typeDef_code; }), meta: meta};
  } // endif
  if(item_templ_idxx == g.sheet){ return {kind: "sheet", cell: this.getWorkbookSheetCellHtml(item_templ_idxx, objx), meta: meta}; }   // 20261113
  return {kind: "row", row: this.getWorkbookRowHtml(item_templ_idxx, objx, col_countx), meta: meta};
}  // end of addWorkbookItem()
// end 20261107


// 20261021 blank new object of a link template for the selected object of a child page, null if not prepared
getChildPageNewObj(child_templ_idxx, child_obj_idxx, link_templ_idxx){
  var new_obj_key = "newobj_"+child_templ_idxx+"_"+child_obj_idxx;
  for(var j = 0; j < this.template_AR[link_templ_idxx].object_AR.length; j++){
    if(this.template_AR[link_templ_idxx].object_AR[j].linkFromObj_key == new_obj_key){
      return this.template_AR[link_templ_idxx].object_AR[j];
    } // endif
  } // endfor
  return null;
}  // end of getChildPageNewObj()


// start 20261023 - parent objects of a child page object, top object first
// each entry: template desc -- namespace code -- OE values separated by --
getChildPageParentPath(child_templ_idxx, child_obj_idxx){
  var path_AR = [];
  var templ_idx = child_templ_idxx;
  var obj = this.template_AR[child_templ_idxx].object_AR[child_obj_idxx];
  var guard = 0;
  while(obj && guard < 50){   // guard - template tree depth
    guard++;
    var parent = this.getParentObjectForPath(templ_idx, obj);
    if(parent == null){ break; }
    path_AR.unshift(this.getObjectPathLabel(parent.templ_idx, parent.obj));
    if(parent.templ_idx == this.top_templ_idx){ break; }
    templ_idx = parent.templ_idx;
    obj = parent.obj;
  } // endwhile
  return path_AR;
}  // end of getChildPageParentPath()


// parent of an object: level 1 objects hang off the top object, deeper objects off the object their link came from (linkFromObj_key)
getParentObjectForPath(templ_idxx, objx){
  var templx = this.template_AR[templ_idxx];
  if(templx.templLevelsDown == 1 || templx.parent_idx == this.top_templ_idx){
    return {templ_idx: this.top_templ_idx, obj: this.template_AR[this.top_templ_idx].object_AR[0]};
  } // endif
  var parent_templ_idx = templx.parent_idx;
  if(parent_templ_idx == null || parent_templ_idx == undefined || !this.template_AR[parent_templ_idx]){ return null; }
  var key = objx.linkFromObj_key;
  if(key == undefined || key == "" || key.indexOf("new") == 0){   // create-link / new object rows of a child page: new_<t>_<o>, newobj_<t>_<o>
    var key_parts = (key == undefined) ? [] : key.split("_");
    if(key_parts.length == 3 && this.template_AR[key_parts[1]] && this.template_AR[key_parts[1]].object_AR[key_parts[2]]){
      return {templ_idx: parseInt(key_parts[1], 10), obj: this.template_AR[key_parts[1]].object_AR[key_parts[2]]};
    } // endif
    return null;
  } // endif
  var parent_templx = this.template_AR[parent_templ_idx];
  for(var j = 0; j < parent_templx.object_AR.length; j++){
    var px = parent_templx.object_AR[j];
    var px_key = parent_templx.objKindZTIC.toString().trim()+"_"+parent_templx.objKindCode.toString().trim()+"_"+px.objZTIC.toString().trim()+"_"+px.objCodeAssigned.toString().trim();
    if(px_key == key){ return {templ_idx: parent_templ_idx, obj: px}; }
  } // endfor
  return null;
}  // end of getParentObjectForPath()


// template desc -- namespace code -- OE values separated by --
getObjectPathLabel(templ_idxx, objx){
  var ns = this.getNamespaceForZTIC(objx.objZTIC);
  var code = (objx.objCodeAssigned != undefined && objx.objCodeAssigned.toString().trim() != "") ? objx.objCodeAssigned : objx.objCodeTemp;
  var label = this.template_AR[templ_idxx].templDesc.toString().trim() + " -- " + ((ns == null) ? "" : ns) + " " + code.toString().trim();
  if(objx.newCode || code.toString().trim() == ""){   // 20261023 new object - no namespace/code until Submit
    label = this.template_AR[templ_idxx].templDesc.toString().trim() + " -- (new, not yet submitted)";
  } // endif
  for(var k = 0; k < objx.OE_val_AR.length; k++){
    var val = (objx.OE_val_AR[k].html_input_val == undefined || objx.OE_val_AR[k].html_input_val == null) ? "" : objx.OE_val_AR[k].html_input_val.toString().trim();
    if(val != ""){ label = label + " -- " + val; }
  } // endfor
  return label;
}  // end of getObjectPathLabel()


escapeHtml(valx){
  return (valx == undefined || valx == null) ? "" : valx.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;");
}  // end of escapeHtml()
// end 20261023


// start 20261024 - existing objects in another namespace than the target namespace are display only
isForeignObject(objx){
  if(!objx || objx.newCode || objx.newLinkToExistingObject){ return false; }
  if(objx.objZTIC == undefined || objx.objZTIC.toString().trim() == ""){ return false; }
  var ns = this.getNamespaceForZTIC(objx.objZTIC);
  return (ns != null && ns.toString().trim() != this.TargetNS.toString().trim());
}  // end of isForeignObject()
// end 20261024


// true if members of the object set used for a type definition dropdown were loaded
allowedValueSetHasMembers(object_set_zticx, object_set_codex){
  for(var i = 0; i < this.objectSet_AR.length; i++){
    if(this.objectSet_AR[i].objSetZTIC == object_set_zticx && this.objectSet_AR[i].objSetCode == object_set_codex && this.objectSet_AR[i].objSetMember_AR.length > 0){
      return true;
    } // endif
  } // endfor
  return false;
}  // end of allowedValueSetHasMembers()


// link rows shown on a child page: existing links from the selected object plus its create-link rows
getChildPageLinkObj_AR(child_templ_idxx, child_obj_idxx, link_templ_idxx){
  var ret_AR = [];
  var child_key    = this.getChildObjKey(child_templ_idxx, child_obj_idxx);
  var new_link_key = "new_"+child_templ_idxx+"_"+child_obj_idxx;
  var child_obj = this.template_AR[child_templ_idxx].object_AR[child_obj_idxx];
  for(var j = 0; j < this.template_AR[link_templ_idxx].object_AR.length; j++){
    var objx = this.template_AR[link_templ_idxx].object_AR[j];
    if(objx.linkFromObj_key == new_link_key || (!child_obj.newCode && child_obj.objCodeAssigned.toString().trim() != "" && objx.linkFromObj_key == child_key)){
      ret_AR.push(objx);
    } // endif
  } // endfor
  return ret_AR;
}  // end of getChildPageLinkObj_AR()


// describes the type value and link inputs on a child page, used by Apply to Parent to hold them for the parent Submit
getChildPageApplyMeta(child_templ_idxx, child_obj_idxx){
  var meta = {key: child_templ_idxx+"_"+child_obj_idxx, templ_idx: child_templ_idxx, obj_idx: child_obj_idxx, tv: [], links: [], ids: [], gc_oe: [], new_objs: []};   // 20261021 gc_oe, new_objs
  var child_obj = this.template_AR[child_templ_idxx].object_AR[child_obj_idxx];
  if(this.template_AR[child_templ_idxx].templLevelsDown > 1 || (child_obj.newCode && child_obj.linkFromObj_key.toString().indexOf("newobj_") == 0)){   // grandchild or deeper - its OE fields are not on the parent page, hold them too  // 20261023 or a new linked object added on the parent page
    meta.hold_oe = true;
    if(child_obj.newCode && child_obj.linkFromObj_key.toString().indexOf("newobj_") == 0){   // 20261023 new linked object opened with Maintain - created on Submit, linked from its source
      var src_parts = child_obj.linkFromObj_key.toString().split("_");   // newobj_<templ_idx>_<obj_idx> of the source object
      var src_templ = this.template_AR[src_parts[1]];
      var src_obj = src_templ ? src_templ.object_AR[src_parts[2]] : null;
      meta.new_obj = {source_key: src_parts[1]+"_"+src_parts[2],
                      linkType_ztic: this.template_AR[child_templ_idxx].linkableObjectLinkType_ztic, linkType_code: this.template_AR[child_templ_idxx].linkableObjectLinkType_code,
                      kind_ztic: this.template_AR[child_templ_idxx].objKindZTIC, kind_code: this.template_AR[child_templ_idxx].objKindCode,
                      templ_ztic: this.template_AR[child_templ_idxx].templZTIC, templ_code: this.template_AR[child_templ_idxx].templCode};
      if(src_templ && src_obj && src_templ.templLevelsDown > 1 && !src_obj.newCode){   // existing deeper source - identity in case its page is not applied
        meta.new_obj.source_obj_ident = {kind_ztic: src_templ.objKindZTIC, kind_code: src_templ.objKindCode, ns: this.getNamespaceForZTIC(src_obj.objZTIC), code: src_obj.objCodeAssigned};
      } // endif
    }
    else{
    meta.obj_ident = {kind_ztic: this.template_AR[child_templ_idxx].objKindZTIC, kind_code: this.template_AR[child_templ_idxx].objKindCode,
                      ns: this.getNamespaceForZTIC(child_obj.objZTIC), code: child_obj.objCodeAssigned};
    } // endif new linked object
    meta.oe = [];
    for(var i = 0; i < child_obj.OE_val_AR.length; i++){
      meta.oe.push({OE_ztic: child_obj.OE_val_AR[i].OE_ztic, OE_code: child_obj.OE_val_AR[i].OE_code, id: child_obj.OE_val_AR[i].html_id});
      meta.ids.push(child_obj.OE_val_AR[i].html_id);
    } // endfor
  } // endif templLevelsDown > 1
  var time_ztic = "";
  for(var i = 0; i < this.ZTICNS_AR.length; i++){
    if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/time"){ time_ztic = this.ZTICNS_AR[i].code.toString().trim(); }
  } // endfor
  for(var i = 0; i < this.template_AR[child_templ_idxx].typeDef_AR.length; i++){
    var typeDefx = this.template_AR[child_templ_idxx].typeDef_AR[i];
    for(var j = 0; j < child_obj.typeVal_AR.length; j++){
      var tvx = child_obj.typeVal_AR[j];
      if(tvx.typeDef_ztic == typeDefx.typeDef_ztic && tvx.typeDef_code == typeDefx.typeDef_code){
        var tv_meta = {typeDef_ztic: tvx.typeDef_ztic, typeDef_code: tvx.typeDef_code};
        var found_allowed_val_set = false;
        for(var n = 0; n < this.typeDefAllowedValueSet_AR.length; n++){
          if(this.typeDefAllowedValueSet_AR[n].typeDef_ztic == tvx.typeDef_ztic && this.typeDefAllowedValueSet_AR[n].typeDef_code == tvx.typeDef_code &&
             this.allowedValueSetHasMembers(this.typeDefAllowedValueSet_AR[n].objectSet_ztic, this.typeDefAllowedValueSet_AR[n].objectSet_code)){ found_allowed_val_set = true; }   // same test as child page rendering
        } // endfor
        if(typeDefx.objectKind_ztic == time_ztic && typeDefx.objectKind_code == "2"){   // same test as type value rendering
          tv_meta.input = "date"; tv_meta.date_id = tvx.dateStr_html_id;
          meta.ids.push(tvx.dateStr_html_id);
        }
        else if(found_allowed_val_set){
          tv_meta.input = "sel"; tv_meta.sel_class = "ddl_TypeDef_"+tvx.typeDef_ztic.toString().trim()+"_"+tvx.typeDef_code.toString().trim();
        }
        else{
          tv_meta.input = "text"; tv_meta.ns_id = tvx.ztic_html_id; tv_meta.code_id = tvx.code_html_id;
          meta.ids.push(tvx.ztic_html_id); meta.ids.push(tvx.code_html_id);
        } // endif
        meta.tv.push(tv_meta);
      } // endif
    } // endfor
  } // endfor

  var link_templ_idx_AR = this.getChildLinkTemplIdx_AR(child_templ_idxx);
  for(var i = 0; i < link_templ_idx_AR.length; i++){
    var ltx = this.template_AR[link_templ_idx_AR[i]];
    var link_obj_AR = this.getChildPageLinkObj_AR(child_templ_idxx, child_obj_idxx, link_templ_idx_AR[i]);
    for(var j = 0; j < link_obj_AR.length; j++){
      var lox = link_obj_AR[j];
      var link_meta = {linkType_ztic: ltx.linkableObjectLinkType_ztic, linkType_code: ltx.linkableObjectLinkType_code, kind_ztic: ltx.objKindZTIC, kind_code: ltx.objKindCode,
                       templ_ztic: ltx.templZTIC, templ_code: ltx.templCode, is_new: lox.newLinkToExistingObject, status_id: lox.linkStatus_html_id, value_id: lox.linkValue_html_id};
      if(lox.newLinkToExistingObject){
        link_meta.ns_id = lox.objZTIC_ns_html_id; link_meta.code_id = lox.objCodeAssigned_html_id;
        meta.ids.push(lox.objZTIC_ns_html_id); meta.ids.push(lox.objCodeAssigned_html_id);
      }
      else{
        link_meta.ns = this.getNamespaceForZTIC(lox.objZTIC); link_meta.code = lox.objCodeAssigned;
        // 20261021 OE values of the linked grandchild shown on this page
        var gc_meta = {key: link_templ_idx_AR[i]+"_"+this.template_AR[link_templ_idx_AR[i]].object_AR.indexOf(lox), templ_idx: link_templ_idx_AR[i], obj_idx: this.template_AR[link_templ_idx_AR[i]].object_AR.indexOf(lox),
                       obj_ident: {kind_ztic: ltx.objKindZTIC, kind_code: ltx.objKindCode, ns: link_meta.ns, code: lox.objCodeAssigned}, oe: []};
        for(var k = 0; k < lox.OE_val_AR.length; k++){
          gc_meta.oe.push({OE_ztic: lox.OE_val_AR[k].OE_ztic, OE_code: lox.OE_val_AR[k].OE_code, id: lox.OE_val_AR[k].html_id});
          meta.ids.push(lox.OE_val_AR[k].html_id);   // also for foreign objects - not copied to the parent page by id
        } // endfor
        if(gc_meta.oe.length > 0 && !this.isForeignObject(lox)){ meta.gc_oe.push(gc_meta); }   // 20261024 foreign namespace - display only
      } // endif
      meta.ids.push(lox.linkStatus_html_id); meta.ids.push(lox.linkValue_html_id);
      meta.links.push(link_meta);
    } // endfor

    // 20261021 new object to create and link
    // 20261023 all new objects of the link template (Add New Linked Object)
    var new_obj_AR = this.getChildPageNewObj_AR(child_templ_idxx, child_obj_idxx, link_templ_idx_AR[i]);
    for(var q = 0; q < new_obj_AR.length; q++){
      var nm = this.getNewObjMeta(child_templ_idxx, child_obj_idxx, link_templ_idx_AR[i], new_obj_AR[q]);
      nm.ids.forEach(function(id){ meta.ids.push(id); });
      delete nm.ids;
      meta.new_objs.push(nm);
    } // endfor
    var new_obj = null;   // 20261023 replaced by getNewObjMeta above
    if(new_obj != null){
      var new_obj_meta = {linkType_ztic: ltx.linkableObjectLinkType_ztic, linkType_code: ltx.linkableObjectLinkType_code, kind_ztic: ltx.objKindZTIC, kind_code: ltx.objKindCode,
                          templ_ztic: ltx.templZTIC, templ_code: ltx.templCode, status_id: new_obj.linkStatus_html_id, value_id: new_obj.linkValue_html_id, oe: [],
                          key: link_templ_idx_AR[i]+"_"+this.template_AR[link_templ_idx_AR[i]].object_AR.indexOf(new_obj),   // 20261023 own held entry
                          templ_idx: link_templ_idx_AR[i], obj_idx: this.template_AR[link_templ_idx_AR[i]].object_AR.indexOf(new_obj), source_key: meta.key};
      meta.ids.push(new_obj.linkStatus_html_id); meta.ids.push(new_obj.linkValue_html_id);
      for(var k = 0; k < new_obj.OE_val_AR.length; k++){
        new_obj_meta.oe.push({OE_ztic: new_obj.OE_val_AR[k].OE_ztic, OE_code: new_obj.OE_val_AR[k].OE_code, id: new_obj.OE_val_AR[k].html_id});
        meta.ids.push(new_obj.OE_val_AR[k].html_id);
      } // endfor
      if(meta.obj_ident){ new_obj_meta.source_obj_ident = meta.obj_ident; }   // 20261023 existing deeper source
      meta.new_objs.push(new_obj_meta);
    } // endif new_obj != null
  } // endfor
  return meta;
}  // end of getChildPageApplyMeta()
// end 20261021


getHtmlForTemplate(templ_zticx, templ_codex, maint_modex, maint_formatx, child_obj_idx, child_templ_idx){    // 20200724  // 20261020 child_obj_idx, child_templ_idx - only set from maintain_object_child
//console.log("= 20210109 running getHtmlForTemplate templ_zticx-templ_codex-maint_modex-maint_formatx: "+  templ_zticx+"-"+ templ_codex+"-"+ maint_modex+"-"+maint_formatx );
var html_str = "";
var spreadsheet_ztic = "";
var document_ztic = "";
var message_ztic = "";
var storage_ztic = "";
for(var i = 0; i < this.ZTICNS_AR.length; i++){
 // console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/spreadsheet"){
       spreadsheet_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/document"){
       document_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/22"){
       message_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/storage"){
       storage_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif

} //endfor

if(templ_zticx == spreadsheet_ztic && templ_codex.toString().trim() == "1" && maint_formatx == "default"){ 
   
   // REVISIT to used already create spreadsheets in this.workbook_AR  // 20201127
   var sprd_sht = new (require('./zt_client_spreadsheet'))(this);
   var sheet_idx = 0;    // TEMP -- REVISIT
   //console.log("= 20210109 sprd_sht.displayRow_AR.length: "+sprd_sht.displayRow_AR.length);
   html_str = sprd_sht.getHtmlForTemplate_Spreadsheet(this, templ_zticx, templ_codex, maint_modex, sheet_idx, false);

    }

else if(((templ_zticx == document_ztic && templ_codex.toString().trim() == "1") || (templ_zticx == document_ztic && templ_codex.toString().trim() == "2")) && maint_modex == "display"){  
   var doc_obj = new (require('./zt_client_document'))(this);
   var doc_idx = 0;     // REVISIT hard-coded doc index and method naming
   html_str = doc_obj.getHtmlForTemplate_DocumentDisplay(this, doc_idx, maint_modex);

    }

else if(((templ_zticx == message_ztic && templ_codex.toString().trim() == "1") || (templ_zticx == message_ztic && templ_codex.toString().trim() == "2")) && maint_modex == "display"){  
   var msg_obj = new (require('./zt_client_message_definition'))(this);
   var msg_def_idx = 0;     // REVISIT hard-coded doc index and method naming
   html_str = msg_obj.getHtmlForTemplate_MessageDefinitionDisplay(this, msg_def_idx, maint_modex);

    }

// end 20210805
    else
    {
 
  html_str = this.getHtmlForTemplate_Generic(templ_zticx, templ_codex, maint_modex, child_obj_idx, child_templ_idx);   // 20261020 child_obj_idx, child_templ_idx

   } // endif   


 
  return html_str;
}  // end of getHtmlForTemplate(templ_zticx, templ_codex)





getHtmlForTemplate_Generic(templ_zticx, templ_codex, maint_modex, child_obj_idx, child_templ_idx){    //20200604  // 20261020 child_obj_idx, child_templ_idx

  // 20261020 - child page: show only the selected object, no Submit to server
  var is_child_page = (child_obj_idx !== undefined && child_obj_idx !== null && child_obj_idx.toString().trim() !== "");
  var child_obj_idx_num = is_child_page ? parseInt(child_obj_idx, 10) : -1;

  var time_ztic;

  for(var i = 0; i < this.ZTICNS_AR.length; i++){
    //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
       if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/time"){
         time_ztic = this.ZTICNS_AR[i].code.toString().trim();
       } // endif
  } //endfor


 var ns_datalist = "<datalist id=\"ns_list\">"+"  <option value=\"abc.com/test\">  <option value=\"zinfinitree.com/doc1\">  <option value=\"zinfinitree.com/address\">  <option value=\"zinfinitree.com/document\"> <option value=\"zinfinitree.com/spreadsheet\">  <option value=\"zinfinitree.com/xxx\"> </datalist>";

 var template_found = false;
 var templ_idx = 999999;
 if(is_child_page && child_templ_idx !== undefined && child_templ_idx !== null){   // 20261020 - child page uses exact template index, not first ZTIC/code match
   templ_idx = child_templ_idx;
   template_found = true;
 } // endif
 //console.log("this.template_AR.length: "+this.template_AR.length);
 for(var i = 0; i < this.template_AR.length && !template_found; i++){   // 20261020 && !template_found
    // console.log(" this.template_AR[i].templZTIC - this.template_AR[i].templCode: "+this.template_AR[i].templZTIC+" - "+this.template_AR[i].templCode);
     if(this.template_AR[i].templZTIC == templ_zticx.toString().trim() && this.template_AR[i].templCode == templ_codex.toString().trim()){
       templ_idx = i;
       template_found = true;
       break;
     }
 } // endfor
 if(!template_found){
   console.log("ERROR: template not found in getHtmlForTemplate() in zt_client_session.js ztic/code: "+templ_zticx+" / "+templ_codex );
 }

 if(is_child_page){   // 20261021 child page - add missing type value recs and create-link rows for the selected object
   this.prepareChildPage(templ_idx, child_obj_idx_num);
 } // endif is_child_page

 // 20261024 existing object in another namespace than the target namespace - display only (values visible, not editable, no Apply)
 var page_readonly = is_child_page && this.isForeignObject(this.template_AR[templ_idx].object_AR[child_obj_idx_num]);
 var page_ro_attr  = page_readonly ? this.foreign_ro_attr : "";


//console.log("20231212a this.template_AR[templ_idx].object_AR.length: "+this.template_AR[templ_idx].object_AR.length);
//console.log("20231212b this.template_AR[templ_idx].object_AR[0].objZTIC - objCodeAssigned - objCodeTemp: "+this.template_AR[templ_idx].object_AR[0].objZTIC+" - "+this.template_AR[templ_idx].object_AR[0].objCodeAssigned+" - "+this.template_AR[templ_idx].object_AR[0].objCodeTemp);
if(this.template_AR[templ_idx].object_AR.length > 1){
   this.setRelevantTVBTRstatus(this.template_AR[templ_idx].object_AR[1]);  // 20231211 REVISIT why hard-coded index 1?
} // endif length > 1

var html_str = "";
var OEscreenElem_AR = [];
var obj_template_desc = "";   
 

 html_str =  "<!DOCTYPE html><html><head>";                                   
 // 20261104 UI attribute - font-family for generic object maintenance (parameter zinfinitree.com/user_interface 4)
 var ui_font_family = this.getUIFontFamily();
 // 20261105 boxes around the Object Element Values, Type Values and link type sections
 html_str = html_str + "<style>fieldset.zt_section { border: 1px solid #c8c8c8; border-radius: 4px; padding: 6px 12px 10px 12px; margin: 10px 0; background-color: #e3eefa; }"   // 20261105 light blue inside the boxes (one step stronger than #eef5fc)
                     + " fieldset.zt_section > legend { font-size: 1.25em; font-weight: bold; padding: 0 6px; }"
                     + " fieldset.zt_linktype { border: none; border-top: 1px solid #e0e0e0; padding: 4px 0 6px 0; margin: 8px 0 0 0; }"   // 20261105 link types inside the Links box - separator line, no full box
                     + " fieldset.zt_linktype > legend { font-weight: bold; padding: 0 6px 0 0; }</style>";
 if(ui_font_family != ""){
   html_str = html_str + "<style>body, input, textarea, select, button, table, th, td { font-family: " + ui_font_family + "; }</style>";
 } // endif
 html_str = html_str + "<title>DS2 Maintain Object xx</title>";
 html_str = html_str + "<script src='//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js\'>  </script>";
 html_str = html_str + "<script>  $(document).ready(function(){";



   var OEscrnElem_AR = [];   // 20200612 temp during debug  DEPRECATED




//console.log("20200612 this.template_AR[templ_idx].object_AR.length: "+this.template_AR[templ_idx].object_AR.length);
for(var j = 0; j < this.template_AR[templ_idx].object_AR.length; j++){
   for(var k = 0; k < this.template_AR[templ_idx].object_AR[j].OE_val_AR.length; k++){
      html_str = html_str +  " var "+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "; ";
   } //endfor
} // endfor





for(var i = 0; i < this.template_AR.length; i++){    // 20200823
//for(var j = 0; j < this.template_AR[templ_idx].object_AR.length; j++){   (del) 20200823

for(var j = 0; j < this.template_AR[i].object_AR.length; j++){          // 20200823

  if(!this.template_AR[i].object_AR[j].objZTIC_ns_html_id.toString().trim() == ""){
        html_str = html_str +  " var "+ this.template_AR[i].object_AR[j].objZTIC_ns_html_id.toString().trim() + "; ";
  } // endif


  if(!this.template_AR[i].object_AR[j].objCodeAssigned_html_id.toString().trim() == ""){
       html_str = html_str +  " var "+ this.template_AR[i].object_AR[j].objCodeAssigned_html_id.toString().trim() + "; ";
  }  // endif

  if(!this.template_AR[i].object_AR[j].linkStatus_html_id.toString().trim() == ""){
       html_str = html_str +  " var "+ this.template_AR[i].object_AR[j].linkStatus_html_id.toString().trim() + "; ";
  }  // endif

  if(!this.template_AR[i].object_AR[j].linkValue_html_id.toString().trim() == ""){
       html_str = html_str +  " var "+ this.template_AR[i].object_AR[j].linkValue_html_id.toString().trim() + "; ";
  }  // endif



} // endfor

} // endfor 20200823


// REVISIT is this a dup from // begin insert 20200818  ??
// begin insert 20200821
for(var j = 0; j < this.template_AR[templ_idx].object_AR.length; j++){
  for(var k = 0; k < this.template_AR[templ_idx].object_AR[j].typeVal_AR.length; k++){   // (del) 20200823
   // console.log("20231211a templ_idx - j - k this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].code_html_id: "+templ_idx+" - "+j+" - "+k+" - "+this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].code_html_id);
    html_str = html_str +  " var "+ this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_html_id.toString().trim() + "; ";
    html_str = html_str +  " var "+ this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].code_html_id.toString().trim() + "; ";
    html_str = html_str +  " var "+ this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].composite_html_id.toString().trim() + "; ";  // 20230324
    html_str = html_str +  " var "+ this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].dateStr_html_id.toString().trim() + "; ";  // 20231029
  } // endfor
}  // endfor
// end insert 20200821

for(var i = 0; i < this.template_AR[templ_idx].childTempl_idx_AR.length; i++){
 for(var j = 0; j < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
   for(var k = 0; k < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
      html_str = html_str +  " var "+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "; ";
   } //endfor
  } // endfor
} // endfor



if(this.TVBTR_template_AR.length > 0){
//console.log("20231114a this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length: "+this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length);
for(var i = 0; i < this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length; i++){
 // console.log("20231114b this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length: "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length);
  for(var j = 0; j < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
 //   console.log("20231114c this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length: "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length);
    for(var k = 0; k < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
      let html_temp_locl = " var "+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "; ";
  //     console.log("20231114d html_temp_locl: "+html_temp_locl);
       html_str = html_str +  " var "+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "; ";
    } //endfor
   } // endfor
 } // endfor
}  // endif this.TVBTR_template_AR.length > 0




 //var objxx = this.template_AR[templ_idx].object_AR[0];   // 20200608 - use first object for template  REVISIT   (del) 20261021
 var objxx = this.template_AR[templ_idx].object_AR[is_child_page ? child_obj_idx_num : 0];   // 20261021 child page - use selected object, object_AR[0] can be the blank new-object slot
 html_str = html_str + " var OK_ztic = " + this.template_AR[templ_idx].objKindZTIC      + "; ";
 html_str = html_str + " var OK_code = " + this.template_AR[templ_idx].objKindCode      + "; ";
 //html_str = html_str + " var obj_ztic = " + this.template_AR[templ_idx].object_AR[0].objZTIC      + "; ";    //   use first object for template  REVISIT   (del) 20261021
 if(objxx.objZTIC.toString().trim() == ""){   // 20261021 blank new-object slot has no ZTIC - empty value made a script syntax error (var obj_ztic = ;)
  html_str = html_str + " var obj_ztic = '' ; ";
  }
  else {
  html_str = html_str + " var obj_ztic = " + objxx.objZTIC.toString().trim()      + "; ";   // 20261021
  } // endif
 html_str = html_str + " var obj_template_desc = '" + this.template_AR[templ_idx].templDesc.toString().trim()      + "'; ";     
 html_str = html_str + " var language = " + this.language.toString().trim()      + "; ";   // 20200506
 html_str = html_str + " var templ_idx = "+templ_idx +";";
 html_str = html_str + " var TargetNS = '"+  this.TargetNS.toString().trim() +"';";



 if(objxx.objCodeTemp.toString().trim() == ""){
  html_str = html_str + "var obj_code = '' ; ";   // 20200502
  }
  else {
 html_str = html_str + " var obj_code = " + objxx.objCodeTemp.toString().trim()      + "; ";   // 20200502
  }



 html_str = html_str + " $(\"#submit\").click(function(){";



for(var j = 0; j < this.template_AR[templ_idx].object_AR.length; j++){
   for(var k = 0; k < this.template_AR[templ_idx].object_AR[j].OE_val_AR.length; k++){
     var html_id_val_fld     = this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id.toString().trim();
     html_str = html_str +  html_id_val_fld + "=$('#" + html_id_val_fld  + "').val(); ";
   } //endfor

   for(var k = 0; k < this.template_AR[templ_idx].object_AR[j].typeVal_AR.length; k++){
     var ztic_html_id_val_fld     = this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_html_id.toString().trim();
     if(ztic_html_id_val_fld.toString().trim() != ""){ // 202020821
       html_str = html_str +  ztic_html_id_val_fld + "=$('#" + ztic_html_id_val_fld  + "').val(); ";
     } // endif
     var code_html_id_val_fld     = this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].code_html_id.toString().trim();
     if(code_html_id_val_fld.toString().trim() != ""){  // 20200821
       html_str = html_str +  code_html_id_val_fld + "=$('#" + code_html_id_val_fld  + "').val(); ";
     } // endif

     var dateStr_html_id_val_fld     = this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].dateStr_html_id.toString().trim();
     if(dateStr_html_id_val_fld.toString().trim() != ""){  // 20200821
       html_str = html_str +  dateStr_html_id_val_fld + "=$('#" + dateStr_html_id_val_fld  + "').val(); ";
     } // endif

   } //endfor



 
     var obj_ztic_ns_html_id_val_fld       = this.template_AR[templ_idx].object_AR[j].objZTIC_ns_html_id.toString().trim();
     if(obj_ztic_ns_html_id_val_fld.toString().trim() != ""){
       html_str = html_str +  obj_ztic_ns_html_id_val_fld + "=$('#" + obj_ztic_ns_html_id_val_fld  + "').val(); ";
     } // endif
     var obj_code_assigned_html_id_val_fld = this.template_AR[templ_idx].object_AR[j].objCodeAssigned_html_id.toString().trim();
     if(obj_code_assigned_html_id_val_fld.toString().trim() != ""){
       html_str = html_str +  obj_code_assigned_html_id_val_fld + "=$('#" + obj_code_assigned_html_id_val_fld  + "').val(); ";
     } // endif

     var linkStatus_html_id_val_fld       = this.template_AR[templ_idx].object_AR[j].linkStatus_html_id.toString().trim();
     if(linkStatus_html_id_val_fld.toString().trim() != ""){
       html_str = html_str +  linkStatus_html_id_val_fld + "=$('#" + linkStatus_html_id_val_fld  + "').val(); ";
     } // endif

     var linkValue_html_id_val_fld       = this.template_AR[templ_idx].object_AR[j].linkValue_html_id.toString().trim();
     if(linkValue_html_id_val_fld.toString().trim() != ""){
       html_str = html_str +  linkValue_html_id_val_fld + "=$('#" + linkValue_html_id_val_fld  + "').val(); ";
     } // endif


} // endfor loop at this.template_AR[templ_idx].object_AR

for(var i = 0; i < this.template_AR[templ_idx].childTempl_idx_AR.length; i++){
 for(var j = 0; j < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){

     var obj_ztic_ns_html_id_val_fld       = this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_id.toString().trim();
     if(obj_ztic_ns_html_id_val_fld.toString().trim() != ""){
       html_str = html_str +  obj_ztic_ns_html_id_val_fld + "=$('#" + obj_ztic_ns_html_id_val_fld  + "').val(); ";
     } // endif
     var obj_code_assigned_html_id_val_fld = this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_id.toString().trim();
     if(obj_code_assigned_html_id_val_fld.toString().trim() != ""){
       html_str = html_str +  obj_code_assigned_html_id_val_fld + "=$('#" + obj_code_assigned_html_id_val_fld  + "').val(); ";
     } // endif


     var linkStatus_html_id_val_fld       = this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id.toString().trim();
     if(linkStatus_html_id_val_fld.toString().trim() != ""){
       html_str = html_str +  linkStatus_html_id_val_fld + "=$('#" + linkStatus_html_id_val_fld  + "').val(); ";
     } // endif
     var linkValue_html_id_val_fld       = this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id.toString().trim();
     if(linkValue_html_id_val_fld.toString().trim() != ""){
       html_str = html_str +  linkValue_html_id_val_fld + "=$('#" + linkValue_html_id_val_fld  + "').val(); ";
     } // endif


   for(var k = 0; k < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
     var html_id_val_fld     = this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id.toString().trim();
     if(html_id_val_fld.toString().trim() != ""){  
       html_str = html_str +  html_id_val_fld + "=$('#" + html_id_val_fld  + "').val(); ";   // REVISIT to see if needed or replace by obj_ztic_ns_html_id_val_fld
     } // endif
   } //endfor
  } // endfor
} // endfor


if(this.TVBTR_template_AR.length > 0){
for(var i = 0; i < this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length; i++){
  for(var j = 0; j < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
 
      var obj_ztic_ns_html_id_val_fld       = this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_id.toString().trim();
    //  console.log("20231115a obj_ztic_ns_html_id_val_fld: "+obj_ztic_ns_html_id_val_fld);
      if(obj_ztic_ns_html_id_val_fld.toString().trim() != ""){
        html_str = html_str +  obj_ztic_ns_html_id_val_fld + "=$('#" + obj_ztic_ns_html_id_val_fld  + "').val(); ";
      } // endif
      var obj_code_assigned_html_id_val_fld = this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_id.toString().trim();
      if(obj_code_assigned_html_id_val_fld.toString().trim() != ""){
        html_str = html_str +  obj_code_assigned_html_id_val_fld + "=$('#" + obj_code_assigned_html_id_val_fld  + "').val(); ";
      } // endif
 
 
 
      var linkStatus_html_id_val_fld       = this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id.toString().trim();
      if(linkStatus_html_id_val_fld.toString().trim() != ""){
        html_str = html_str +  linkStatus_html_id_val_fld + "=$('#" + linkStatus_html_id_val_fld  + "').val(); ";
      } // endif
      var linkValue_html_id_val_fld       = this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id.toString().trim();
      if(linkValue_html_id_val_fld.toString().trim() != ""){
        html_str = html_str +  linkValue_html_id_val_fld + "=$('#" + linkValue_html_id_val_fld  + "').val(); ";
      } // endif
 
 
    for(var k = 0; k < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
      var html_id_val_fld     = this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id.toString().trim();
      if(html_id_val_fld.toString().trim() != ""){  
        html_str = html_str +  html_id_val_fld + "=$('#" + html_id_val_fld  + "').val(); ";   // REVISIT to see if needed or replace by obj_ztic_ns_html_id_val_fld
      } // endif
    } //endfor
   } // endfor
 } // endfor

} // endif if(this.TVBTR_template_AR.length > 0){






  html_str = html_str + " function ZtSession(){";
  html_str = html_str + "   this.id   = \" \" ;";
  html_str = html_str + "   this.zticNS_AR  = [];";
  html_str = html_str + "   this.language  = \" \"  ;";   
  html_str = html_str + "   this.top_templ_idx  = \" \"  ;";
  html_str = html_str + "   this.template_AR  = [];";
  html_str = html_str + "   this.selectionList_AR  = [];";    // 20230330
  html_str = html_str + "   this.TVBTR_template_AR  = [];";   // 20231117
  html_str = html_str + "}";  // end of ZtSession


  

  html_str = html_str + " function TemplateRec(){";
  html_str = html_str + "   this.parent_idx   = \" \" ;";
  html_str = html_str + "   this.templLevelsDown  = \" \"  ;";
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
  html_str = html_str + "   this.newLinkToExistingObject   = false;";
  html_str = html_str + "   this.OE_val_AR  = [];";
  html_str = html_str + "   this.typeVal_AR = [];";
  html_str = html_str + "   this.link_AR    = [];";
  html_str = html_str + "   this.objZTIC_ns_html_id         = \" \" ;";    // 20200820
  html_str = html_str + "   this.objZTIC_ns_html_input_val  = \" \" ;";
  html_str = html_str + "   this.objCodeAssigned_html_id    = \" \" ;";
  html_str = html_str + "   this.objCodeAssigned_html_input_val = \" \" ;";

  html_str = html_str + "   this.linkStatus_html_id         = \" \" ;";
  html_str = html_str + "   this.linkStatus_html_input_val         = \" \" ;";
  html_str = html_str + "   this.linkValue_html_id         = \" \" ;";
  html_str = html_str + "   this.linkValue_html_input_val         = \" \" ;";

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



  html_str = html_str + " function TypeValueRec(){";
  html_str = html_str + "   this.typeDef_ztic      = \" \" ;";
  html_str = html_str + "   this.typeDef_code  = \" \"  ;";
  html_str = html_str + "   this.typeVal_ztic  = \" \"  ;";
  html_str = html_str + "   this.typeVal_code  = \" \"  ;";   
  html_str = html_str + "   this.ztic_html_id  = \" \"  ;";
  html_str = html_str + "   this.ztic_html_input_val  = \" \"  ;";   
  html_str = html_str + "   this.ztic_ns_html_input_val  = \" \"  ;"; 
  html_str = html_str + "   this.code_html_id  = \" \"  ;";  
  html_str = html_str + "   this.code_html_input_val  = \" \"  ;"; 
  html_str = html_str + "   this.composite_html_id  = \" \"  ;";                  //20230324  
  html_str = html_str + "   this.composite_html_input_val  = \" \"  ;";           //20230324
  html_str = html_str + "   this.dateStr_html_id  = \" \"  ;";                    //20231029  
  html_str = html_str + "   this.dateStr_html_input_val  = \" \"  ;";             //20231029
  
  html_str = html_str + "}";  // end of TypeValueRec



html_str = html_str + " function SelectionListRec(){";
html_str = html_str + "   this.selectionListName      = \" \" ;";
html_str = html_str + "   this.typeDef_ztic  = \" \"  ;";
html_str = html_str + "   this.typeDef_code  = \" \"  ;";
html_str = html_str + "   this.typeVal_ztic  = \" \"  ;";
html_str = html_str + "   this.typeVal_code  = \" \"  ;";   
html_str = html_str + "   this.objectSet_ztic  = \" \"  ;";
html_str = html_str + "   this.objectSet_code  = \" \"  ;";   

html_str = html_str + "   this.composite_html_id  = \" \"  ;";                  //needed ?? 
html_str = html_str + "   this.composite_html_input_val  = \" \"  ;";           //needed ??

html_str = html_str + "}";  // end of SelectionListRec()




html_str = html_str + " function TypeDefAllowedValueSetRec(){";
html_str = html_str + "   this.selectionListName      = \" \" ;";
html_str = html_str + "   this.typeDef_ztic  = \" \"  ;";
html_str = html_str + "   this.typeDef_code  = \" \"  ;";  
html_str = html_str + "   this.objectSet_ztic  = \" \"  ;";
html_str = html_str + "   this.objectSet_code  = \" \"  ;"; 

html_str = html_str + "}";  // end of TypeDefAllowedValueSetRec()


 html_str = html_str + " var sess1 = new ZtSession();";
 html_str = html_str + " sess1.id = \""+ this.id +"\" ;";
  
 html_str = html_str + " sess1.language = '"     + this.language  + "';";
 html_str = html_str + " sess1.top_templ_idx = \""+ this.top_templ_idx +"\" ;";

html_str = html_str + " var templ_rec; ";
html_str = html_str + " var templ_idx; ";
html_str = html_str + " var obj_rec; ";
html_str = html_str + " var oe_val_rec; ";
html_str = html_str + " var child_templ_idx_var; ";
html_str = html_str + " var obj_idx_var; ";
html_str = html_str + " var oe_val_idx_var; ";
html_str = html_str + " var typeVal_idx_var; ";





  html_str = html_str + " templ_rec = new TemplateRec(); ";
  html_str = html_str + " templ_rec.parent_idx   = \""+ this.template_AR[templ_idx].parent_idx +"\" ;";
  html_str = html_str + " templ_rec.templLevelsDown  =  \""+ this.template_AR[templ_idx].templLevelsDown +"\" ;";
  html_str = html_str + " templ_rec.templZTIC  =   \""+ this.template_AR[templ_idx].templZTIC  +"\" ;";   
  html_str = html_str + " templ_rec.templCode  =   \""+ this.template_AR[templ_idx].templCode  +"\" ;";
  html_str = html_str + " templ_rec.templDesc  =   \""+ this.template_AR[templ_idx].templDesc  +"\" ;";
  html_str = html_str + " templ_rec.objKindZTIC = \""+ this.template_AR[templ_idx].objKindZTIC +"\" ;";
  html_str = html_str + " templ_rec.objKindCode = \""+ this.template_AR[templ_idx].objKindCode +"\" ;";
  html_str = html_str + " templ_rec.linkableObjectLinkType_ztic = \""+ this.template_AR[templ_idx].linkableObjectLinkType_ztic + "\" ;";
  html_str = html_str + " templ_rec.linkableObjectLinkType_code = \""+ this.template_AR[templ_idx].linkableObjectLinkType_code + "\" ;";
  html_str = html_str + " templ_idx = sess1.template_AR.push(templ_rec) -1;";
  for(var j = 0; j < this.template_AR[templ_idx].object_AR.length; j++){
    html_str = html_str + " obj_rec = new ObjectRec(); ";
    //console.log("20200613 this.template_AR[i].object_AR[k].objZTIC: "+this.template_AR[i].object_AR[j].objZTIC);
    html_str = html_str + " obj_rec.objZTIC      = \"" +this.template_AR[templ_idx].object_AR[j].objZTIC     + "\" ;";
    html_str = html_str + " obj_rec.objCodeTemp  = \"" +this.template_AR[templ_idx].object_AR[j].objCodeTemp + "\" ;";
    html_str = html_str + " obj_rec.objCodeAssigned  = \"" +this.template_AR[templ_idx].object_AR[j].objCodeAssigned + "\" ;"; 
    if(this.template_AR[templ_idx].object_AR[j].newCode){  
        html_str = html_str + " obj_rec.newCode   = true;";
        }
      else
        {
        html_str = html_str + " obj_rec.newCode   = false;";
     } // endif
    // start 20200821
    if(this.template_AR[templ_idx].object_AR[j].newLinkToExistingObject){  
        html_str = html_str + " obj_rec.newLinkToExistingObject   = true;";
        }
      else
        {
        html_str = html_str + " obj_rec.newLinkToExistingObject   = false;";
     } // endif

    html_str = html_str + "  obj_rec.objZTIC_ns_html_id      = \"" +this.template_AR[templ_idx].object_AR[j].objZTIC_ns_html_id     + "\" ;";   
    html_str = html_str + "  obj_rec.objZTIC_ns_html_input_val      = \"" +this.template_AR[templ_idx].object_AR[j].objZTIC_ns_html_input_val     + "\" ;"; 
    html_str = html_str + "  obj_rec.objCodeAssigned_html_id      = \"" +this.template_AR[templ_idx].object_AR[j].objCodeAssigned_html_id     + "\" ;"; 
    html_str = html_str + "  obj_rec.objCodeAssigned_html_input_val      = \"" +this.template_AR[templ_idx].object_AR[j].objCodeAssigned_html_input_val     + "\" ;"; 
    html_str = html_str + "  obj_rec.linkStatus_html_id      = \"" +this.template_AR[templ_idx].object_AR[j].linkStatus_html_id     + "\" ;"; 
    html_str = html_str + "  obj_rec.linkStatus_html_input_val      = \"" +this.template_AR[templ_idx].object_AR[j].linkStatus_html_input_val     + "\" ;"; 
    html_str = html_str + "  obj_rec.linkValue_html_id      = \"" +this.template_AR[templ_idx].object_AR[j].linkValue_html_id     + "\" ;"; 
    html_str = html_str + "  obj_rec.linkValue_html_input_val      = \"" +this.template_AR[templ_idx].object_AR[j].linkValue_html_input_val     + "\" ;"; 
    // end 20210405
    html_str = html_str + " obj_idx_var = sess1.template_AR[templ_idx].object_AR.push(obj_rec) -1;";

    for(var k = 0; k < this.template_AR[templ_idx].object_AR[j].OE_val_AR.length; k++){  // 20200617
     // console.log("20231124b OE_ztic - OE_code: "+this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_ztic + " - " + this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_code);
      html_str = html_str + " oe_val_rec = new ObjectElementValueRec(); ";
      html_str = html_str + "  oe_val_rec.OE_ztic  = '" + this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_ztic.toString().trim() + "'; ";
      html_str = html_str + "  oe_val_rec.OE_code  = '" + this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_code.toString().trim() + "'; ";
      html_str = html_str + "  oe_val_rec.OE_value  = '" + this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_value.toString().trim() + "'; ";   
      html_str = html_str + "  oe_val_rec.html_id  = '" + this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "'; ";  
      html_str = html_str + "  oe_val_rec.html_input_val  = '" + this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val.toString().trim() + "'; ";
      html_str = html_str + "  oe_val_idx_var = sess1.template_AR[templ_idx].object_AR[obj_idx_var].OE_val_AR.push(oe_val_rec) -1;";
    }  //endfor 




    for(var k = 0; k < this.template_AR[templ_idx].object_AR[j].typeVal_AR.length; k++){  // 20200617
      html_str = html_str + " type_val_rec = new TypeValueRec(); ";
      html_str = html_str + "  type_val_rec.typeDef_ztic  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeDef_ztic.toString().trim() + "'; ";
      html_str = html_str + "  type_val_rec.typeDef_code  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeDef_code.toString().trim() + "'; ";
      html_str = html_str + "  type_val_rec.typeVal_ztic  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeVal_ztic.toString().trim() + "'; ";
      html_str = html_str + "  type_val_rec.typeVal_code  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeVal_code.toString().trim() + "'; ";   
      html_str = html_str + "  type_val_rec.ztic_html_id  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_html_id.toString().trim() + "'; ";  
      html_str = html_str + "  type_val_rec.ztic_html_input_val  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_html_input_val.toString().trim() + "'; ";
      html_str = html_str + "  type_val_rec.ztic_ns_html_input_val  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_ns_html_input_val.toString().trim() + "'; ";
      html_str = html_str + "  type_val_rec.code_html_id  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].code_html_id.toString().trim() + "'; ";  
      html_str = html_str + "  type_val_rec.code_html_input_val  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].code_html_input_val.toString().trim() + "'; ";

      html_str = html_str + "  type_val_rec.dateStr_html_id  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].dateStr_html_id.toString().trim() + "'; ";                  // 20231029
      html_str = html_str + "  type_val_rec.dateStr_html_input_val  = '" + this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].dateStr_html_input_val.toString().trim() + "'; ";    // 20231029
      //console.log("20250606a: type_val_rec.dateStr_html_input_val: "+this.template_AR[templ_idx].object_AR[j].typeVal_AR[k].dateStr_html_input_val.toString().trim());
      html_str = html_str + "  typeVal_idx_var = sess1.template_AR[templ_idx].object_AR[obj_idx_var].typeVal_AR.push(type_val_rec) -1;";
    }  //endfor

   // end insert 20200818 
  } // endfor

  html_str = html_str + this.TVBTR_getHtmlForTypeValueBasedTemplateRules_build_TVBTR_Template_AR();


 for(var i = 0; i < this.template_AR[templ_idx].childTempl_idx_AR.length; i++){
    html_str = html_str + " templ_rec = new TemplateRec(); ";
    html_str = html_str + " templ_rec.parent_idx   = \""+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].parent_idx +"\" ;";
    html_str = html_str + " templ_rec.templLevelsDown  =  \""+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templLevelsDown +"\" ;";
    html_str = html_str + " templ_rec.templZTIC  =   \""+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templZTIC  +"\" ;";   
    html_str = html_str + " templ_rec.templCode  =   \""+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templCode  +"\" ;";
    html_str = html_str + " templ_rec.templDesc  =   \""+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templDesc  +"\" ;";
    html_str = html_str + " templ_rec.objKindZTIC =  \""+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].objKindZTIC +"\" ;";
    html_str = html_str + " templ_rec.objKindCode =  \""+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].objKindCode +"\" ;";
    html_str = html_str + " templ_rec.linkableObjectLinkType_ztic = \""+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_ztic + "\" ;";
    html_str = html_str + " templ_rec.linkableObjectLinkType_code = \""+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_code + "\" ;";
    html_str = html_str + " child_templ_idx_var = sess1.template_AR.push(templ_rec) -1;";
    html_str = html_str + " sess1.template_AR[templ_idx].childTempl_idx_AR.push(child_templ_idx_var);";

   for(var j = 0; j < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
     html_str = html_str + " obj_rec = new ObjectRec(); ";
     html_str = html_str + " obj_rec.objZTIC      = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC     + "\" ;";
     html_str = html_str + " obj_rec.objCodeTemp  = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeTemp + "\" ;";
     html_str = html_str + " obj_rec.objCodeAssigned  = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned + "\" ;"; 
     if(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].newCode){  
         html_str = html_str + " obj_rec.newCode   = true;";
         }
       else
         {
         html_str = html_str + " obj_rec.newCode   = false;";
      } // endif

    // start 20201206
    if(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].newLinkToExistingObject){  
        html_str = html_str + " obj_rec.newLinkToExistingObject   = true;";
        }
      else
        {
        html_str = html_str + " obj_rec.newLinkToExistingObject   = false;";
     } // endif

     html_str = html_str + "  obj_rec.objZTIC_ns_html_id      = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_id     + "\" ;";   
     html_str = html_str + "  obj_rec.objZTIC_ns_html_input_val      = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_input_val     + "\" ;"; 
     html_str = html_str + "  obj_rec.objCodeAssigned_html_id      = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_id     + "\" ;"; 
     html_str = html_str + "  obj_rec.objCodeAssigned_html_input_val      = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_input_val     + "\" ;"; 
     html_str = html_str + "  obj_rec.linkStatus_html_id      = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id     + "\" ;"; 
     html_str = html_str + "  obj_rec.linkStatus_html_input_val      = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_input_val     + "\" ;"; 

     html_str = html_str + "  obj_rec.linkValue_html_id      = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id     + "\" ;"; 
     html_str = html_str + "  obj_rec.linkValue_html_input_val      = \"" +this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_input_val     + "\" ;"; 
     // end 20210405
     html_str = html_str + " obj_idx_var = sess1.template_AR[child_templ_idx_var].object_AR.push(obj_rec) -1;";
   
     for(var k = 0; k < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
       html_str = html_str + " oe_val_rec = new ObjectElementValueRec(); ";
       html_str = html_str + "  oe_val_rec.OE_ztic  = '" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic.toString().trim() + "'; ";
       html_str = html_str + "  oe_val_rec.OE_code  = '" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code.toString().trim() + "'; ";
      html_str = html_str + "  oe_val_rec.OE_value  = '" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_value.toString().trim() + "'; ";   
       html_str = html_str + "  oe_val_rec.html_id  = '" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "'; "; 

       html_str = html_str + "  oe_val_rec.html_input_val  = '" +  this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val.toString().trim() + "'; ";  

       html_str = html_str + "  oe_val_idx_var = sess1.template_AR[child_templ_idx_var].object_AR[obj_idx_var].OE_val_AR.push(oe_val_rec) -1;";
    }  //endfor  
  } // endfor
} // endfor





html_str = html_str + " for(var i = 0; i < sess1.template_AR.length; i++){";
for(var i = 0; i < this.template_AR.length; i++){
  html_str = html_str + " for(var j = 0; j < sess1.template_AR[i].object_AR.length; j++){"; 
  for(var j = 0; j < this.template_AR[i].object_AR.length; j++){
    html_str = html_str + " if(sess1.template_AR[i].object_AR[j].objZTIC_ns_html_id=='"+this.template_AR[i].object_AR[j].objZTIC_ns_html_id + "'){";
    html_str = html_str + " sess1.template_AR[i].object_AR[j].objZTIC_ns_html_input_val="+this.template_AR[i].object_AR[j].objZTIC_ns_html_id+";} "; 
    html_str = html_str + " if(sess1.template_AR[i].object_AR[j].objCodeAssigned_html_id=='"+this.template_AR[i].object_AR[j].objCodeAssigned_html_id + "'){";
    html_str = html_str + " sess1.template_AR[i].object_AR[j].objCodeAssigned_html_input_val="+this.template_AR[i].object_AR[j].objCodeAssigned_html_id+";} "; 
    html_str = html_str + " if(sess1.template_AR[i].object_AR[j].linkStatus_html_id =='"+this.template_AR[i].object_AR[j].linkStatus_html_id  + "'){";
    html_str = html_str + " sess1.template_AR[i].object_AR[j].linkStatus_html_input_val="+this.template_AR[i].object_AR[j].linkStatus_html_id+";} ";
    
    html_str = html_str + " if(sess1.template_AR[i].object_AR[j].linkValue_html_id=='"+this.template_AR[i].object_AR[j].linkValue_html_id + "'){";
    html_str = html_str + " sess1.template_AR[i].object_AR[j].linkValue_html_input_val="+this.template_AR[i].object_AR[j].linkValue_html_id+";} ";

    html_str = html_str + " for(var k = 0; k < sess1.template_AR[i].object_AR[j].OE_val_AR.length; k++){"; 
    for(var k = 0; k < this.template_AR[i].object_AR[j].OE_val_AR.length; k++){
      // console.log("20200621 this.template_AR[i].object_AR[j].OE_val_AR[k].html_id: "+this.template_AR[i].object_AR[j].OE_val_AR[k].html_id);
       html_str = html_str + " if(sess1.template_AR[i].object_AR[j].OE_val_AR[k].html_id=='"+this.template_AR[i].object_AR[j].OE_val_AR[k].html_id + "'){";
       html_str = html_str + " sess1.template_AR[i].object_AR[j].OE_val_AR[k].html_input_val="+this.template_AR[i].object_AR[j].OE_val_AR[k].html_id+";} "; 
    }  //endfor 
    html_str = html_str + "} ";   // endfor 


    html_str = html_str + " for(var k = 0; k < sess1.template_AR[i].object_AR[j].typeVal_AR.length; k++){"; 
    for(var k = 0; k < this.template_AR[i].object_AR[j].typeVal_AR.length; k++){
   // console.log("20200621 this.template_AR[i].object_AR[j].typeVal_AR[k].ztic_html_id-code_html_id: "+this.template_AR[i].object_AR[j].typeVal_AR[k].ztic_html_id+"-"+this.template_AR[i].object_AR[j].typeVal_AR[k].code_html_id);
       html_str = html_str + " if(sess1.template_AR[i].object_AR[j].typeVal_AR[k].ztic_html_id=='"+this.template_AR[i].object_AR[j].typeVal_AR[k].ztic_html_id + "'){";
       html_str = html_str + " sess1.template_AR[i].object_AR[j].typeVal_AR[k].ztic_ns_html_input_val="+this.template_AR[i].object_AR[j].typeVal_AR[k].ztic_html_id+";} ";
       html_str = html_str + " if(sess1.template_AR[i].object_AR[j].typeVal_AR[k].code_html_id=='"+this.template_AR[i].object_AR[j].typeVal_AR[k].code_html_id + "'){";
       html_str = html_str + " sess1.template_AR[i].object_AR[j].typeVal_AR[k].code_html_input_val="+this.template_AR[i].object_AR[j].typeVal_AR[k].code_html_id+";} ";

       html_str = html_str + " if(sess1.template_AR[i].object_AR[j].typeVal_AR[k].dateStr_html_id=='"+this.template_AR[i].object_AR[j].typeVal_AR[k].dateStr_html_id + "'){";
       html_str = html_str + " sess1.template_AR[i].object_AR[j].typeVal_AR[k].dateStr_html_input_val="+this.template_AR[i].object_AR[j].typeVal_AR[k].dateStr_html_id+";} ";

    }  //endfor 
    html_str = html_str + "} ";   // endfor 

  } // endfor
  html_str = html_str + "} ";   // endfor 
} // endfor

html_str = html_str + "} ";   // endfor  




html_str = html_str + this.TVBTR_getHtmlForTypeValueBasedTemplateRules_html_input_val();





var sel_list_cntr = 0;
for(var h = 0; h < this.template_AR[templ_idx].typeDef_AR.length; h++){
  
     for(var g = 0; g < this.template_AR[templ_idx].object_AR.length; g++){
       for(var f = 0; f < this.template_AR[templ_idx].object_AR[g].typeVal_AR.length; f++){
         if(this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_ztic == this.template_AR[templ_idx].typeDef_AR[h].typeDef_ztic &&    this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_code == this.template_AR[templ_idx].typeDef_AR[h].typeDef_code){
           var found_allowed_val_set = false;
           var type_def_idx;
           for(var n = 0; n < this.typeDefAllowedValueSet_AR.length; n++){
                if(this.typeDefAllowedValueSet_AR[n].typeDef_ztic == this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_ztic && this.typeDefAllowedValueSet_AR[n].typeDef_code == this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_code){
                 found_allowed_val_set = true;
                 type_def_idx = n;
                }  // endif
           } // endfor

           if(!found_allowed_val_set){ 
               // do nothing

          }  // endif this.template_AR[templ_idx].object_AR[g].typeVal_AR[f] == ""  // 20230323
          else
          {
            
           //console.log("20230331a type def values");
           //console.log("typeDef_ztic: "+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_ztic);
           //console.log("typeDef_code: "+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_code);
           //console.log("objectSet_ztic: "+this.typeDefAllowedValueSet_AR[type_def_idx].objectSet_ztic);
           //console.log("objectSet_code: "+this.typeDefAllowedValueSet_AR[type_def_idx].objectSet_code);
           sel_list_cntr++;
           var selListRecVarName = "selListRec"+sel_list_cntr.toString().trim();
           var selListName = "ddl_TypeDef_"+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_ztic.toString().trim()+"_"+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_code.toString().trim();
           html_str = html_str + " var "+selListRecVarName+" = new  SelectionListRec();";
           html_str = html_str + " "+selListRecVarName + ".selectionListName = " +"\'" + selListName + "\'"+";";
           html_str = html_str + " "+selListRecVarName + ".typeDef_ztic = " +"\'" + this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_ztic.toString().trim() + "\'"+";";
           html_str = html_str + " "+selListRecVarName + ".typeDef_code = " +"\'" + this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_code.toString().trim() + "\'"+";";
           html_str = html_str + " "+selListRecVarName + ".composite_html_input_val =  $("  + "\'"+"."+ selListName + "\'"+").val();";
           html_str = html_str + " sess1.selectionList_AR.push(" + selListRecVarName + ");";


          }  // endelse // 20230323
         }  // endif
       } // endfor
     }  // endfor


  } // endfor



        
          
 html_str = html_str + " var OEscrnElem_AR = [];";  // 20200615
 html_str = html_str + " var OEscrnElem_ARs = JSON.stringify(OEscrnElem_AR); ";
 html_str = html_str + " var sess1_str = JSON.stringify(sess1); ";      //20200612
 html_str = html_str + " if(window.zt_parent_new_objs && window.zt_child_updates){ window.zt_hold_new_objs(window.zt_parent_new_objs, window); } ";
 html_str = html_str + " if(window.zt_hold_workbook){ window.zt_hold_workbook(); } ";   // 20261107 workbook grid   // 20261023 new linked objects added on the parent page


require("dotenv").config();   // 20230304
const clientIP = process.env.ZT_CLIENT_IP;
const clientPort = process.env.ZT_CLIENT_PORT;
var urlxx;  
if(clientIP.toString().trim() == "http://localhost"){  // 20250527
   urlxx = clientIP+":"+clientPort+"/zt/client/maintain_object_submit"; 
}
else
{
   urlxx = clientIP+"/zt/client/maintain_object_submit";      // 20250527
} // endif clientIP == "http://localhost"

html_str = html_str + "var jqxhr = $.post('"+urlxx+"', {OK_ztic: OK_ztic, OK_code: OK_code, obj_ztic: obj_ztic, obj_code: obj_code, OEscrnElem_AR: OEscrnElem_ARs, obj_template_desc: obj_template_desc, language: language, session: sess1_str, templ_idx: templ_idx, TargetNS: TargetNS, child_updates: JSON.stringify(window.zt_child_updates || {}) }, function(data){";   // 20240827  // 20261021 child_updates

 html_str = html_str + "console.log(data); ";
       //open new window popup
 //html_str = html_str + "var newWindow = window.open('', 'new window', width=200, height=100);";
 html_str = html_str + "var newWindow = window.open('', '_self');";
       //write the data to the document of the newWindow
 html_str = html_str +  "newWindow.document.write(data);";
  //alert( "success" );
 html_str = html_str + "}) ";  


 

 html_str = html_str +       "}); ";

 // start 20261020 - Maintain button for child objects
var url_childxx;
if(clientIP.toString().trim() == "http://localhost"){
   url_childxx = clientIP+":"+clientPort+"/zt/client/maintain_object_child";
}
else
{
   url_childxx = clientIP+"/zt/client/maintain_object_child";
} // endif clientIP == "http://localhost"

 //html_str = html_str + " $('.maintain_child').click(function(){";   //(del) 20261023
 html_str = html_str + " $(document).on('click', '.maintain_child', function(){";   // 20261023 delegated - also for blocks added by Add New Linked Object
 html_str = html_str + "var childWindow = window.open('', '_blank'); ";   // open before the post so the popup is not blocked
 html_str = html_str + "$.post('"+url_childxx+"', {sess_id: $(this).attr('data-sess_id'), templ_idx: $(this).attr('data-templ_idx'), obj_idx: $(this).attr('data-obj_idx')}, function(data){";
 html_str = html_str + "childWindow.document.write(data); childWindow.document.close(); ";
 // 20261023 values already typed on this page are carried to the page being opened by the opened page itself (after it fills held values) - see zt_fill_from_held
 html_str = html_str + "}); ";
 html_str = html_str + "}); ";

 // start 20261023 - Add New Linked Object and holding new linked objects (child page Apply, parent page Submit)
var url_addxx;
if(clientIP.toString().trim() == "http://localhost"){
   url_addxx = clientIP+":"+clientPort+"/zt/client/add_new_linked_object";
}
else
{
   url_addxx = clientIP+"/zt/client/add_new_linked_object";
} // endif clientIP == "http://localhost"
 if(!is_child_page){
   var parent_new_meta_AR = [];
   for(var i = 0; i < this.template_AR[templ_idx].childTempl_idx_AR.length; i++){
     var pn_AR = this.getChildPageNewObj_AR(templ_idx, 0, this.template_AR[templ_idx].childTempl_idx_AR[i]);
     for(var q = 0; q < pn_AR.length; q++){ parent_new_meta_AR.push(this.getNewObjMeta(templ_idx, 0, this.template_AR[templ_idx].childTempl_idx_AR[i], pn_AR[q])); }
   } // endfor
   html_str = html_str + " window.zt_parent_new_objs = " + JSON.stringify(parent_new_meta_AR) + "; ";
 } // endif !is_child_page
 // start 20261107 workbook grid - Add Column / Add Row, values held for Submit
var url_wbxx;
if(clientIP.toString().trim() == "http://localhost"){
   url_wbxx = clientIP+":"+clientPort+"/zt/client/add_workbook_item";
}
else
{
   url_wbxx = clientIP+"/zt/client/add_workbook_item";
} // endif clientIP == "http://localhost"
 html_str = html_str + " $(document).on('click', '.zt_wb_rtv_btn', function(){ var open = ($(this).val() == 'Open'); $('#zt_wb_grid .zt_wb_rtv').toggle(open); $(this).val(open ? 'Close' : 'Open'); }); ";   // 20261110 Open / Close the row type values
 html_str = html_str + " $(document).on('click', '.zt_wb_tv_btn', function(){ var open = ($(this).val() == 'Open'); $('.zt_wb_tv_row').toggle(open); $(this).val(open ? 'Close' : 'Open'); }); ";   // 20261109 Open / Close the column type values
 html_str = html_str + " $(document).on('click', '.zt_wb_add', function(){ var b = $(this); ";
 html_str = html_str + "$.post('"+url_wbxx+"', {sess_id: b.attr('data-sess_id'), top_templ_idx: b.attr('data-top_templ_idx'), item_templ_idx: b.attr('data-item_templ_idx'), col_count: $('#zt_wb_code th.zt_wb_col').length}, function(data){ ";
 html_str = html_str + "if(!data || !data.meta){ alert('Could not add: ' + (data && data.error ? data.error : '')); return; } ";
 html_str = html_str + "if(data.kind == 'column'){ $('#zt_wb_code').append(data.code); $('#zt_wb_label').append(data.label); $('#zt_wb_desc').append(data.desc); $('#zt_wb_tv_toggle').append('<td></td>'); data.tv_row_ids.forEach(function(rid, h){ $('#' + rid).append(data.tv[h]); }); $('#zt_wb_rows_head').append('<td></td>'); $('.zt_wb_row').append('<td></td>'); } ";
 html_str = html_str + "else if(data.kind == 'sheet'){ $('#zt_wb_sheets_row').append(data.cell); } ";   // 20261113 Add Sheet
 html_str = html_str + "else { $('#zt_wb_grid').append(data.row); if($('.zt_wb_rtv_btn').val() == 'Close'){ $('#zt_wb_grid .zt_wb_rtv').show(); } } ";   // 20261110 added row follows Open / Close
 html_str = html_str + "window.zt_wb_meta = window.zt_wb_meta || []; window.zt_wb_meta.push(data.meta); ";
 html_str = html_str + "}, 'json'); }); ";
 // grid values -> zt_child_updates of this page: type values of existing / blank new columns, and objects added with Add Column / Add Row
 html_str = html_str + " window.zt_hold_workbook = function(){ if(!window.zt_wb_meta || !window.zt_child_updates){ return; } ";
 html_str = html_str + "window.zt_wb_meta.forEach(function(m){ ";
 html_str = html_str + "var tv = m.tv.map(function(t){ if(t.input == 'sel'){ return {typeDef_ztic: t.typeDef_ztic, typeDef_code: t.typeDef_code, input: 'sel', composite: $('#' + t.sel_id).val()}; } return {typeDef_ztic: t.typeDef_ztic, typeDef_code: t.typeDef_code, input: 'text', ns: $('#' + t.ns_id).val(), code: $('#' + t.code_id).val()}; }); ";   // 20261108 sel
 html_str = html_str + "var has_tv = tv.some(function(t){ if(t.input == 'sel'){ return t.composite && t.composite.replace('|','').trim() != ''; } return t.ns && t.ns.trim() != '' && t.code && t.code.trim() != ''; }); ";
 html_str = html_str + "if(m.source_key){ window.zt_hold_new_objs([m], window); } ";   // added object - new object entry with OE values
 html_str = html_str + "var held = window.zt_child_updates[m.key] ? JSON.parse(window.zt_child_updates[m.key]) : null; ";
 html_str = html_str + "if(!held && !has_tv){ return; } ";
 html_str = html_str + "if(!held){ held = {templ_idx: m.templ_idx, obj_idx: m.obj_idx, tv: [], links: []}; ";
 html_str = html_str + "if(m.source_key){ held.new_obj = {source_key: m.source_key, source_obj_ident: m.source_obj_ident, linkType_ztic: m.linkType_ztic, linkType_code: m.linkType_code, kind_ztic: m.kind_ztic, kind_code: m.kind_code, templ_ztic: m.templ_ztic, templ_code: m.templ_code, status: '', value: ''}; held.oe = []; } } ";   // added object with type values only - still a new object
 html_str = html_str + "held.tv = tv; window.zt_child_updates[m.key] = JSON.stringify(held); }); }; ";
 // end 20261107
 html_str = html_str + " $(document).on('click', '.zt_add_new', function(){ var b = $(this); ";
 html_str = html_str + "$.post('"+url_addxx+"', {sess_id: b.attr('data-sess_id'), templ_idx: b.attr('data-src_templ_idx'), obj_idx: b.attr('data-src_obj_idx'), link_templ_idx: b.attr('data-link_templ_idx')}, function(data){ ";
 html_str = html_str + "if(!data || !data.html){ alert('New linked object could not be added: ' + (data && data.error ? data.error : '')); return; } ";
 html_str = html_str + "$(data.html).insertBefore('#zt_new_end_' + b.attr('data-src_templ_idx') + '_' + b.attr('data-src_obj_idx') + '_' + b.attr('data-link_templ_idx')); ";
 html_str = html_str + "if(typeof zt_child_meta !== 'undefined'){ data.meta.ids.forEach(function(id){ zt_child_meta.ids.push(id); }); delete data.meta.ids; zt_child_meta.new_objs.push(data.meta); } else { window.zt_parent_new_objs.push(data.meta); } ";
 html_str = html_str + "}, 'json'); }); ";
 // hold new object blocks of this page in the parent page's zt_child_updates (own entry per new object, merged - last Apply wins for OE values)
 html_str = html_str + " window.zt_hold_new_objs = function(meta_AR, top_win){ var cnt = 0; ";
 html_str = html_str + "meta_AR.forEach(function(m){ ";
 html_str = html_str + "var oe_vals = m.oe.map(function(o){ return {OE_ztic: o.OE_ztic, OE_code: o.OE_code, value: $('#' + o.id).val()}; }); ";
 html_str = html_str + "var has_val = oe_vals.some(function(o){ return o.value && o.value.trim() != ''; }); ";
 html_str = html_str + "var held = top_win.zt_child_updates[m.key] ? JSON.parse(top_win.zt_child_updates[m.key]) : null; ";
 html_str = html_str + "if(!held && !has_val){ return; } ";
 html_str = html_str + "if(!held){ held = {templ_idx: m.templ_idx, obj_idx: m.obj_idx, tv: [], links: []}; } ";
 html_str = html_str + "held.new_obj = {source_key: m.source_key, source_obj_ident: m.source_obj_ident, linkType_ztic: m.linkType_ztic, linkType_code: m.linkType_code, kind_ztic: m.kind_ztic, kind_code: m.kind_code, templ_ztic: m.templ_ztic, templ_code: m.templ_code, status: $('#' + m.status_id).val(), value: $('#' + m.value_id).val()}; ";
 html_str = html_str + "held.oe = oe_vals; if(has_val){ cnt++; } ";
 html_str = html_str + "top_win.zt_child_updates[m.key] = JSON.stringify(held); }); return cnt; }; ";
 // end 20261023

 // child page - copy values into fields with the same id on the parent page, parent Submit sends them to the server
 // start 20261021 - type values and links are not on the parent page, Apply to Parent holds them in window.zt_child_updates of the parent page for the parent Submit
 if(is_child_page){
   html_str = html_str + " var zt_child_meta = window.zt_child_meta = " + JSON.stringify(this.getChildPageApplyMeta(templ_idx, child_obj_idx_num)) + "; ";   // window. for console inspection
   if(page_readonly){ html_str = html_str + " $('select').prop('disabled', true); "; }   // 20261024 display-only page - dropdowns too
   html_str = html_str + " var zt_top_win = window.opener; while(zt_top_win && !zt_top_win.zt_child_updates && zt_top_win.opener){ zt_top_win = zt_top_win.opener; } ";   // 20261023 page with Submit, found while the chain of opener pages is open
   // 20261023 reopened page: values held on the parent page (applied, not yet submitted) first, then values on the page that opened it (same field ids, may be typed but not applied)
   html_str = html_str + " (function zt_fill_from_held(){ ";
   html_str = html_str + "  var held_all = (zt_top_win && !zt_top_win.closed && zt_top_win.zt_child_updates) ? zt_top_win.zt_child_updates : {}; ";
   html_str = html_str + "  var get = function(k){ try { return held_all[k] ? JSON.parse(held_all[k]) : null; } catch(e){ return null; } }; ";
   html_str = html_str + "  var setv = function(id, v){ if(id == undefined || v == undefined || v == null){ return; } var f = document.getElementById(id); if(f){ f.value = v; } }; ";
   html_str = html_str + "  var fill_oe = function(oe_meta, held_oe){ if(!oe_meta || !held_oe){ return; } oe_meta.forEach(function(m){ held_oe.forEach(function(h){ if(h.OE_ztic == m.OE_ztic && h.OE_code == m.OE_code){ setv(m.id, h.value); } }); }); }; ";
   html_str = html_str + "  var held = get(zt_child_meta.key); ";
   html_str = html_str + "  if(held){ ";
   html_str = html_str + "   fill_oe(zt_child_meta.oe, held.oe); ";
   html_str = html_str + "   (held.tv || []).forEach(function(h){ zt_child_meta.tv.forEach(function(m){ if(m.typeDef_ztic != h.typeDef_ztic || m.typeDef_code != h.typeDef_code){ return; } ";
   html_str = html_str + "     if(m.input == 'sel' && h.composite != undefined){ $('.' + m.sel_class).val(h.composite); } else if(m.input == 'date'){ setv(m.date_id, h.dateStr); } else { setv(m.ns_id, h.ns); setv(m.code_id, h.code); } }); }); ";
   html_str = html_str + "   (held.links || []).forEach(function(h){ zt_child_meta.links.forEach(function(m){ if(m.linkType_ztic != h.linkType_ztic || m.linkType_code != h.linkType_code || m.is_new != h.is_new){ return; } ";
   html_str = html_str + "     if(!m.is_new && (m.code != h.code || m.ns != h.ns)){ return; } if(m.is_new){ setv(m.ns_id, h.ns); setv(m.code_id, h.code); } setv(m.status_id, h.status); setv(m.value_id, h.value); }); }); ";
   html_str = html_str + "  } ";
   html_str = html_str + "  (zt_child_meta.gc_oe || []).forEach(function(g){ var hg = get(g.key); if(hg){ fill_oe(g.oe, hg.oe); } }); ";   // linked objects shown on this page
   html_str = html_str + "  (zt_child_meta.new_objs || []).forEach(function(m){ var hn = get(m.key); if(hn){ fill_oe(m.oe, hn.oe); if(hn.new_obj){ setv(m.status_id, hn.new_obj.status); setv(m.value_id, hn.new_obj.value); } } }); ";   // new linked object blocks
   html_str = html_str + "  if(window.opener && !window.opener.closed){ var flds = document.querySelectorAll('input[id], textarea[id], select[id]'); ";   // values on the page that opened this page
   html_str = html_str + "   for(var zi = 0; zi < flds.length; zi++){ if(flds[zi].type == 'button'){ continue; } var src = window.opener.document.getElementById(flds[zi].id); if(src && src.type != 'button'){ flds[zi].value = src.value; } } } ";
   html_str = html_str + " })(); ";
 }
 else{
   html_str = html_str + " window.zt_child_updates = window.zt_child_updates || {}; ";
 } // endif is_child_page
 // end 20261021
 html_str = html_str + " $('#apply_to_parent').click(function(){";
 //html_str = html_str + "if(!window.opener || window.opener.closed){ alert('Parent page is closed - changes cannot be applied'); return; } ";   //(del) 20261023
 html_str = html_str + "if(!zt_top_win || zt_top_win.closed || !zt_top_win.zt_child_updates){ alert('Parent page is closed - changes cannot be applied'); return; } ";   // 20261023 page with Submit
 html_str = html_str + "var opener_open = (window.opener && !window.opener.closed); ";   // 20261023 page in between may be closed
 html_str = html_str + "var applied_cnt = 0; var not_found_AR = []; ";
 html_str = html_str + "$('input[id], textarea[id], select[id]').each(function(){ ";
 html_str = html_str + "if(this.type == 'button'){ return; } ";
 html_str = html_str + "if(zt_child_meta.ids.indexOf(this.id) != -1){ return; } ";   // 20261021 held below, not copied by id
 html_str = html_str + "var parent_fld = opener_open ? window.opener.document.getElementById(this.id) : null; ";   // 20261023 opener_open
 html_str = html_str + "if(parent_fld){ parent_fld.value = $(this).val(); applied_cnt++; } else { not_found_AR.push(this.id); } ";
 html_str = html_str + "}); ";
 html_str = html_str + "var msg = applied_cnt + ' field(s) applied to parent page.'; ";
 // start 20261021 hold type values and links for the parent Submit
 html_str = html_str + "var upd = {templ_idx: zt_child_meta.templ_idx, obj_idx: zt_child_meta.obj_idx, tv: [], links: []}; ";
 html_str = html_str + "zt_child_meta.tv.forEach(function(m){ var r = {typeDef_ztic: m.typeDef_ztic, typeDef_code: m.typeDef_code, input: m.input}; ";
 html_str = html_str + "if(m.input == 'sel'){ r.composite = $('.' + m.sel_class).val(); } else if(m.input == 'date'){ r.dateStr = $('#' + m.date_id).val(); } else { r.ns = $('#' + m.ns_id).val(); r.code = $('#' + m.code_id).val(); } ";
 html_str = html_str + "upd.tv.push(r); }); ";
 html_str = html_str + "zt_child_meta.links.forEach(function(m){ var r = {linkType_ztic: m.linkType_ztic, linkType_code: m.linkType_code, kind_ztic: m.kind_ztic, kind_code: m.kind_code, templ_ztic: m.templ_ztic, templ_code: m.templ_code, is_new: m.is_new, ns: m.ns, code: m.code}; ";
 html_str = html_str + "if(m.is_new){ r.ns = $('#' + m.ns_id).val(); r.code = $('#' + m.code_id).val(); } ";
 html_str = html_str + "r.status = $('#' + m.status_id).val(); r.value = $('#' + m.value_id).val(); upd.links.push(r); }); ";
 // 20261023 new linked objects are held as their own entries (key templ_idx_obj_idx) - their own page (Maintain) holds into the same entry
 html_str = html_str + "var new_obj_cnt = window.zt_hold_new_objs(zt_child_meta.new_objs, zt_top_win); ";   // 20261023 shared with parent page Submit
 html_str = html_str + "if(zt_child_meta.hold_oe){ upd.obj_ident = zt_child_meta.obj_ident; upd.oe = zt_child_meta.oe.map(function(m){ return {OE_ztic: m.OE_ztic, OE_code: m.OE_code, value: $('#' + m.id).val()}; }); } ";   // 20261021 grandchild or deeper
 // 20261023 page of a new linked object: keep link status/value entered on the source page
 html_str = html_str + "if(zt_child_meta.new_obj){ var prev = zt_top_win.zt_child_updates[zt_child_meta.key] ? JSON.parse(zt_top_win.zt_child_updates[zt_child_meta.key]) : null; upd.new_obj = (prev && prev.new_obj) ? prev.new_obj : zt_child_meta.new_obj; delete upd.obj_ident; } ";
 html_str = html_str + "var top_win = zt_top_win; ";   // 20261021 page with Submit - grandchild pages are opened from child pages  // 20261023 found at page load
 html_str = html_str + "if(top_win && top_win.zt_child_updates){ top_win.zt_child_updates[zt_child_meta.key] = JSON.stringify(upd); } ";   // 20261021 top_win
 // 20261021 grandchild page: keep the same fields on the page that opened it (child page shows grandchild OE values) in step
 html_str = html_str + "if(zt_child_meta.hold_oe && opener_open){ zt_child_meta.oe.forEach(function(m){ var opener_fld = window.opener.document.getElementById(m.id); if(opener_fld){ opener_fld.value = $('#' + m.id).val(); } }); } ";   // 20261023 opener_open
 // 20261021 child page: OE values of linked grandchildren shown on this page - merged into the grandchild's held entry (last Apply wins)
 html_str = html_str + "var gc_oe_cnt = 0; ";
 html_str = html_str + "if(top_win && top_win.zt_child_updates){ zt_child_meta.gc_oe.forEach(function(g){ ";
 html_str = html_str + "var held = top_win.zt_child_updates[g.key] ? JSON.parse(top_win.zt_child_updates[g.key]) : {templ_idx: g.templ_idx, obj_idx: g.obj_idx, tv: [], links: []}; ";
 html_str = html_str + "held.obj_ident = g.obj_ident; held.oe = g.oe.map(function(m){ return {OE_ztic: m.OE_ztic, OE_code: m.OE_code, value: $('#' + m.id).val()}; }); gc_oe_cnt = gc_oe_cnt + held.oe.length; ";
 html_str = html_str + "top_win.zt_child_updates[g.key] = JSON.stringify(held); }); } ";
 html_str = html_str + "var held_cnt = upd.tv.length + upd.links.length + (upd.oe ? upd.oe.length : 0) + gc_oe_cnt + new_obj_cnt; ";   // 20261021  // 20261021 gc_oe_cnt, new_objs
 html_str = html_str + "var held_msg = (held_cnt > 0) ? (' ' + (upd.oe ? upd.oe.length + ' object element value(s), ' : '') + (gc_oe_cnt > 0 ? gc_oe_cnt + ' linked object element value(s), ' : '') + (new_obj_cnt > 0 ? new_obj_cnt + ' new linked object(s), ' : '') + upd.tv.length + ' type value(s) and ' + upd.links.length + ' link row(s) held for parent Submit.') : ''; ";   // 20261021 upd.oe  // 20261021 gc_oe_cnt
 // end 20261021
 html_str = html_str + "if(not_found_AR.length > 0){ msg = msg + ' Not on parent page, not applied: ' + not_found_AR.join(', '); } ";
 html_str = html_str + "msg = msg + held_msg; ";   // 20261021
 //html_str = html_str + "alert(msg); ";   //(del) 20261105 Apply confirmation popup turned off for now
 html_str = html_str + "console.log(msg); ";   // 20261105 summary still in the browser console
 html_str = html_str + "if(opener_open){ window.opener.focus(); } window.close(); ";   // 20261023 opener_open   // 20261021 close child page after applying - it was opened by the parent page script, so the browser allows close()
 html_str = html_str + "}); ";
 // end 20261020

 html_str = html_str +     "}); ";
 html_str = html_str +   "</script>";
 html_str = html_str + "</head>";

 html_str = html_str + "<body>";

 // start 20200920  -- add top bar to html
 
var top_obj_dsi  =  this.getNamespaceForZTIC(this.template_AR[this.top_templ_idx].object_AR[0].objZTIC);
var top_obj_code =  this.template_AR[this.top_templ_idx].object_AR[0].objCodeTemp; 

 html_str = html_str + "<table style='border:solid 1px;'>";
 //html_str = html_str + "<tr><td colspan='3' style='font-size:1.6em; font-weight:bold; padding:4px 2px 6px 2px;'>ZinfiniTree Generic Object Maintenance</td></tr>";   // 20261105 title in the top box   //(del) 20261110
 html_str = html_str + "<tr><td colspan='3' style='font-size:1.6em; font-weight:bold; padding:4px 2px 6px 2px;'>" + (this.isWorkbookGridPage(templ_idx, is_child_page) ? "ZinfiniTree Workbook Definition" : "ZinfiniTree Generic Object Maintenance") + "</td></tr>";   // 20261110 workbook maintenance has its own title

 html_str = html_str + "<tr>";
 html_str = html_str + "<td><strong>";
 html_str = html_str + "Target ZTI: "+"</strong>"+this.TargetNS;
 html_str = html_str + "</td>";

 html_str = html_str + "<td><strong>";
 html_str = html_str + "Top Obj ZTI: "+"</strong>"+top_obj_dsi;
 html_str = html_str + "</td>";

 html_str = html_str + "<td><strong>";
 //html_str = html_str + "Top Obj Code: "+"</strong>"+top_obj_code;   //(del) 20261105
 html_str = html_str + "Top Obj Code: "+"</strong>"+(this.template_AR[this.top_templ_idx].object_AR[0].newCode ? "<span style='color:#888888'>(new)</span>" : this.escapeHtml(top_obj_code));   // 20261105 (new) in grey in create mode - the temporary code is internal

 html_str = html_str + "</td>";


 html_str = html_str + "</tr>";

 html_str = html_str + "</table>";
 // end 20200920

 // start 20261023 child page - path of parent objects from the top object down
 if(is_child_page){
   var path_AR = this.getChildPageParentPath(templ_idx, child_obj_idx_num);
   if(path_AR.length > 0){
     html_str = html_str + "<table style='border:solid 1px; margin-top:6px;'>";
     html_str = html_str + "<tr><td><strong>Parent Objects:</strong></td></tr>";
     for(var p = 0; p < path_AR.length; p++){
       html_str = html_str + "<tr><td>" + "&nbsp;&nbsp;".repeat(p) + (p > 0 ? "&rsaquo; " : "") + this.escapeHtml(path_AR[p]) + "</td></tr>";
     } // endfor
     html_str = html_str + "</table>";
   } // endif path_AR.length > 0
 } // endif is_child_page
 // end 20261023


  //html_str = html_str +   "<h1>"+this.template_AR[templ_idx].templDesc.toString().trim() +"</h1>";   // 20200604   //(del) 20261105
  html_str = html_str +   "<h1 style='font-size:1.4em; margin:14px 0 6px 0;'>"+this.template_AR[templ_idx].templDesc.toString().trim() +"</h1>";   // 20261105 a little smaller than the title in the top box (1.6em)



 html_str = html_str +   "<br />";

 //html_str = html_str +   "<br />";                   // 20230321   //(del) 20261105 gap before the first box
 //html_str = html_str +   "<br />";                   // 20230321   //(del) 20261105
// html_str = html_str + "<H2>Object Element Values: </H2>";     // 20230321  (del) 20261018 - moved inside object_AR loop below

 html_str = html_str + "<fieldset class='zt_section'><legend>Object Element Values</legend>";   // 20261105 box
 html_str = html_str + "<table>"


var size = 20;
var label = "test label ";
var html_labelx;
var html_sizex;
var html_ns_sizex = 35;


//for(var i = 0; i < this.template_AR.length; i++){  // (del) 20200614
   //for(var j = 0; j < this.template_AR[i].object_AR.length; j++){  (del) 20200614
  //console.log("20200907 +++ zt_client_session this.template_AR[templ_idx].object_AR.length: "+this.template_AR[templ_idx].object_AR.length);
  for(var j = 0; j < this.template_AR[templ_idx].object_AR.length; j++){    // 20200614
    if(is_child_page && j != child_obj_idx_num){ continue; }   // 20261020 child page - selected object only
    //html_str = html_str + "<tr><td colspan='2'><H2>Object Element Values: </H2></td></tr>";   // 20261018 - moved from above loop   //(del) 20261105 legend of the box
   // console.log("   this.template_AR[templ_idx].object_AR[j].objZTIC:         " + this.template_AR[templ_idx].object_AR[j].objZTIC);
   // console.log("   this.template_AR[templ_idx].object_AR[j].objCodeTemp:     " + this.template_AR[templ_idx].object_AR[j].objCodeTemp);
   // console.log("   this.template_AR[templ_idx].object_AR[j].objCodeAssigned: " + this.template_AR[templ_idx].object_AR[j].objCodeAssigned);
   // console.log("   this.template_AR[templ_idx].object_AR[j].newCode:         " + this.template_AR[templ_idx].object_AR[j].newCode);
   // console.log("   this.template_AR[templ_idx].object_AR[j].newLinkToExistingObject: " + this.template_AR[templ_idx].object_AR[j].newLinkToExistingObject);
   // console.log(" ");
    for(var k = 0; k < this.template_AR[templ_idx].object_AR[j].OE_val_AR.length; k++){
   //  console.log("20200614 this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id: "+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id);
      // start 20200614
        html_labelx = "";
        for(var l = 0; l < this.template_AR[templ_idx].OE_def_AR.length; l++){   
          if(this.template_AR[templ_idx].OE_def_AR[l].OE_ztic == this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_ztic &&
             this.template_AR[templ_idx].OE_def_AR[l].OE_code == this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_code){
                html_labelx = this.template_AR[templ_idx].OE_def_AR[l].html_label;
                html_sizex  = this.template_AR[templ_idx].OE_def_AR[l].html_size;
              //  console.log("%%^ 20211120c html_labelx - html_sizex: "+html_labelx+" - "+html_sizex);
          } // endif

        } //  endfor 
      // end   20200614
  
    
//console.log("%%^ 20211120b html_sizex: "+html_sizex);
if(html_sizex < 80){
html_str = html_str + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXT\""+ page_ro_attr +" id='"+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>";}
   else{
 //html_str = html_str + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXTAREA\"  id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>"; 
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>"+html_labelx+"</td></tr>";

//html_str = html_str + "<tr><td><textarea name=\"comments\""+ page_ro_attr +" id='"+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id+ "' cols='80' rows='20'  value='"+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"'" +">"+this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"</textarea></td></tr>";   //(del) 20261105
html_str = html_str + "<tr><td colspan='2'><textarea name=\"comments\""+ page_ro_attr +" id='"+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id+ "' cols='80' rows='20'  value='"+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"'" +">"+this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"</textarea></td></tr>";   // 20261105 text area spans the row so it does not widen the label column

 //<textarea name="comments" id="myTextarea" cols="40" rows="6">Suppose we have this text!</textarea>  (example)

}  // endif 
 

   
     }  //endfor loop OE_val_AR
  } // endfor    loop object_AR


let attributeGroup = "ObjectElement"
html_str = html_str + this.TVBTR_getHtmlForTypeValueBasedTemplateRules(attributeGroup);


var type_value_for_date;  // 20231028

 html_str = html_str + "</table>";
 html_str = html_str + "</fieldset>";   // 20261105 end of Object Element Values box

 //html_str = html_str +   "<br />";                   // 20230321   //(del) 20261105
 //html_str = html_str +   "<br />";                   // 20230321   //(del) 20261105
 //html_str = html_str + "<H2>Type Values: </H2>";     // 20230321   //(del) 20261105
 html_str = html_str + "<fieldset class='zt_section'><legend>Type Values</legend>";   // 20261105 box

html_sizex = 5;
html_str = html_str + "<table>";
   //  console.log("20200817 this.template_AR[templ_idx].typeDef_AR.length: "+this.template_AR[templ_idx].typeDef_AR.length);
     for(var h = 0; h < this.template_AR[templ_idx].typeDef_AR.length; h++){
       // start 20231028
       type_value_for_date = false;
       if(this.template_AR[templ_idx].typeDef_AR[h].objectKind_ztic == time_ztic && this.template_AR[templ_idx].typeDef_AR[h].objectKind_code == "2"){
          type_value_for_date = true;
       }

        for(var g = 0; g < this.template_AR[templ_idx].object_AR.length; g++){
          if(is_child_page && g != child_obj_idx_num){ continue; }   // 20261020 child page - selected object only
          for(var f = 0; f < this.template_AR[templ_idx].object_AR[g].typeVal_AR.length; f++){
         //   html_str = html_str +   "<tr><td><h3>"+this.template_AR[templ_idx].typeDef_AR[h].typeDef_desc +"</h3></td>"; //  (del) 20211031 
            if(this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_ztic == this.template_AR[templ_idx].typeDef_AR[h].typeDef_ztic &&    this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_code == this.template_AR[templ_idx].typeDef_AR[h].typeDef_code){
          html_str = html_str +   "<tr><td>"+this.template_AR[templ_idx].typeDef_AR[h].typeDef_desc +"</td>";     //  20211031
  // console.log("=20200818 this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_html_id: "+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_html_id.trim());
  // console.log("-20200818 this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_id: "+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_id);



              var found_allowed_val_set = false;
              var type_def_idx;
             for(var n = 0; n < this.typeDefAllowedValueSet_AR.length; n++){
                   if(this.typeDefAllowedValueSet_AR[n].typeDef_ztic == this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_ztic && this.typeDefAllowedValueSet_AR[n].typeDef_code == this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_code){
                    found_allowed_val_set = true;
                    type_def_idx = n;
                   }  // endif
              } // endfor
              if(is_child_page && found_allowed_val_set && !this.allowedValueSetHasMembers(this.typeDefAllowedValueSet_AR[type_def_idx].objectSet_ztic, this.typeDefAllowedValueSet_AR[type_def_idx].objectSet_code)){
                found_allowed_val_set = false;   // 20261021 child page - set members not loaded, use NS + code input instead of an empty dropdown
              } // endif

              // start 20231028
              if(type_value_for_date){
           //const ns_substr =  this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_ns_html_input_val.substr(22,3);  // zinfinitree.com/time_gregorian_2020s_tz_est     (del) 20250606
           const ns_substr =  this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_ns_html_input_val.substr(31,3);  // zinfinitree.com/time_gregorian_2020s_tz_est      // 20250606
           const datestr = ns_substr+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_input_val.substr(0,1)+"-"+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_input_val.substr(1,2)+"-"+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_input_val.substr(3,5);
           console.log("20250606b datestr: "+datestr);
           const html_str_temp = "<td><input type=\"date\""+ page_ro_attr +"  id='"+ this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].dateStr_html_id+ "'  value='"+datestr+"'"  +"</td>";  // 20231107
          // console.log("html_str_temp: "+html_str_temp);
            html_str = html_str + html_str_temp;
               // end 20231028
              }  // endif type_value_for_date

              //if(!found_allowed_val_set){  (del) 20231028
              if(!type_value_for_date){
              if(!found_allowed_val_set){
    // end 20230328              
          
                html_str = html_str + "<td><input list=\"ns_list\" name=\"ztic_ns\""+ page_ro_attr +" id='"+ this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_html_id+ "' size='"+html_ns_sizex+"' value='"+ this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_ns_html_input_val+"'" +"</td>"; // (del) 20231027


                html_str = html_str + ns_datalist;

                html_str = html_str + "<td> <input type=\"TEXT\""+ page_ro_attr +" id='"+ this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_id+ "' size='"+html_sizex+"' value='"+ this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_input_val+"'" +"</td>" +"</tr>";
             }  // endif this.template_AR[templ_idx].object_AR[g].typeVal_AR[f] == ""  // 20230323
             else
             {
              // getSelectionListHtmlForSetValues(typeDef_zticx, typeDef_codex, object_set_zticx, object_set_codex, composite_html_idx){
                html_str = html_str + "<td>";
               //html_str = html_str + this.getSelectionListHtmlForSetValues(this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_ztic, this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_code, this.template_AR[templ_idx].typeDef_AR[h].allowedTypeValueSet_ztic, this.template_AR[templ_idx].typeDef_AR[h].allowedTypeValueSet_code, this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].composite_html_id);
               html_str = html_str + this.getSelectionListHtmlForSetValues(this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_ztic,
                 this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].typeDef_code,
                 this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_ns_html_input_val,
                 this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_input_val,
                  this.typeDefAllowedValueSet_AR[type_def_idx].objectSet_ztic,
                   this.typeDefAllowedValueSet_AR[type_def_idx].objectSet_code,
                    this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].composite_html_id);
               html_str = html_str + "</td>" +"</tr>";
             }  // endelse // 20230323
            }  // endif !found_allowed_val_set
          }  // endif !type_value_for_date
            //html_str = html_str +   "<br />";  (del) 20230321
          } // endfor
        }  // endfor
         // console.log("20200817 this.template_AR[templ_idx].typeDef_AR[h].typeDef_ztic-code-desc: "+this.template_AR[templ_idx].typeDef_AR[h].typeDef_ztic+" - "+
         //             this.template_AR[templ_idx].typeDef_AR[h].typeDef_code+" - "+this.template_AR[templ_idx].typeDef_AR[h].typeDef_desc);

     } // endfor

html_str = html_str + "</table>";
html_str = html_str + "</fieldset>";   // 20261105 end of Type Values box
// end 20200817
//console.log("20230328c html_str for type values: "+html_str);

//html_str = html_str +   "<br />";                   // 20230321   //(del) 20261105
//html_str = html_str +   "<br />";                   // 20230321   //(del) 20261105
//html_str = html_str + "<H2>Links: </H2>";     // 20230321   //(del) 20261105
//html_str = html_str + "<h3 class='zt_section_title'>Links</h3>";   // 20261105 one box per link type below   //(del) 20261105
html_str = html_str + "<fieldset class='zt_section'><legend>Links</legend>";   // 20261105 Links box, link types inside separated by a line


 html_str = html_str + "<table>";
//console.log("20200617 this.template_AR[templ_idx].childTempl_idx_AR.length: "+this.template_AR[templ_idx].childTempl_idx_AR.length);
var wb_grid_page = this.isWorkbookGridPage(templ_idx, is_child_page);   // 20261107 workbook - Columns and Rows grid instead of the Column / Row link types
var wb_grid_templ = wb_grid_page ? this.getWorkbookGridTemplIdx(templ_idx) : {col: -1, row: -1, sheet: -1};   // 20261113 sheet
for(var i = 0; i < this.template_AR[templ_idx].childTempl_idx_AR.length; i++){
 if(wb_grid_page && (this.template_AR[templ_idx].childTempl_idx_AR[i] == wb_grid_templ.col || this.template_AR[templ_idx].childTempl_idx_AR[i] == wb_grid_templ.row || this.template_AR[templ_idx].childTempl_idx_AR[i] == wb_grid_templ.sheet)){ continue; }   // 20261107 shown in the grid  // 20261113 sheets too
// console.log("20200911 %% this.maint_mode - this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templLevelsDown: "+this.maint_mode + " - "+this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templLevelsDown);
 if((this.maint_mode != "display" && this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templLevelsDown == 1 ) || this.maint_mode == "display"){  // 20201104
     //html_str = html_str + "<tr><td><h2>"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templDesc  +"</h2></td></tr>";   // (del) 20230321
     const templDescx = this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templDesc;
     html_str = html_str + "</table><fieldset class='zt_linktype'>";   // 20261105 box per link type (heading below is its legend)
     for(var j = 0; j < this.template_AR[templ_idx].linkType_AR.length; j++){    // 20200618
        if( this.template_AR[templ_idx].linkType_AR[j].linkType_ztic == this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_ztic &&
            this.template_AR[templ_idx].linkType_AR[j].linkType_code == this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_code ) {
               //html_str = html_str + "<tr><td><h3>"+ this.template_AR[templ_idx].linkType_AR[j].linkType_desc  +"</h3></td></tr>";  //(del) 20230321
               //html_str = html_str + "<tr><td><strong>"+ this.template_AR[templ_idx].linkType_AR[j].linkType_desc  +" / Template: "+templDescx+"</strong>" + ((this.maint_mode != "display" && !is_child_page) ? this.getAddNewLinkedObjectButtonHtml(templ_idx, 0, this.template_AR[templ_idx].childTempl_idx_AR[i]) : "") + "</td></tr>";  // 20230321  // 20261023 Add New Linked Object   //(del) 20261105
               html_str = html_str + "<legend>"+ this.template_AR[templ_idx].linkType_AR[j].linkType_desc  +" / Template: "+templDescx+ " " + ((this.maint_mode != "display" && !is_child_page) ? this.getAddNewLinkedObjectButtonHtml(templ_idx, 0, this.template_AR[templ_idx].childTempl_idx_AR[i]) : "") + "</legend>";   // 20261105 legend of the link type box  // 20230321  // 20261023 Add New Linked Object   // 20261105 spans the row so it does not widen the label column


              // html_str = html_str +   "<br />";   // 20200820
          

        }  // endif
                                                                
     }  // endfor  // end 20200618
     html_str = html_str + "<table>";   // 20261105 rows of this link type


 var create_link_html = "";   // 20261105 Create Link to Existing Object rows are shown at the end of the link type section
 for(var j = 0; j < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
    if(!this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].newLinkToExistingObject){   // 20261105 no Maintain for the create-link row
    html_str = html_str + "<tr><td><input type='button' class='maintain_child' id='maintain_" + i + "_" + j + "' data-sess_id='" + this.id + "' data-templ_idx='" + this.template_AR[templ_idx].childTempl_idx_AR[i] + "' data-obj_idx='" + j + "' value='Maintain'></td></tr>";   // 20261018 - child objects only  // 20261020 data-sess_id, data-templ_idx, data-obj_idx
    } // endif
    var html_ns_sizex = 30;
    var html_code_sizex = 5;
   if(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].newLinkToExistingObject){  // 20200821
    //(del) 20261105 html_str = html_str + ... - collected in create_link_html, shown at the end of the section
    //create_link_html = create_link_html + "<tr><td>Create Link to Existing Object NS-Code-Status-Value </td><td><input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_id+ "' size='"+html_ns_sizex+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_input_val+"'"+"</td><td><input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_id+ "' size='"+html_code_sizex+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_input_val+"'"+"</td><td><input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id+ "' size='"+"5"+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_input_val+"'"+ "</td><td><input type=\"TEXT\" id='" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id+ "' size='"+"10"+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_input_val+"'"+"</td></tr>";   //(del) 20261105
    create_link_html = create_link_html + this.getCreateLinkRowHtml(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j]);   // 20261105 label and inputs in one cell, inputs right after the label

    //html_str = html_str +   "<br />";   //(del) 20261105 row moved to the end of the section
   } // endif 20200821


   if(!(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].newLinkToExistingObject)){   // 20210415
   //html_str = html_str + "<tr><td>===== Code: "+this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned+"</td><td><input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id+ "' size='"+"5"+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_input_val+"'"+ "</td><td><input type=\"TEXT\" id='" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id+ "' size='"+"10"+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_input_val+"'"+"</td></tr>";    //(del) 20261105
   //html_str = html_str + "<tr><td>===== Code: "+this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned+"</td><td><input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id+ "' size='5' placeholder='Status' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_input_val+"'>"+ "</td><td><input type=\"TEXT\" id='" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id+ "' size='10' placeholder='Value' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_input_val+"'>"+"</td></tr>";   // 20261105 Status / Value shown inside the fields, inputs closed with >   //(del) 20261105
   //html_str = html_str + "<tr><td colspan='6' style='white-space:nowrap'>===== Code: "+this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned+"&nbsp; <input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id+ "' size='5' placeholder='Status' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_input_val+"'>"+ " <input type=\"TEXT\" id='" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id+ "' size='10' placeholder='Value' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_input_val+"'>"+"</td></tr>";   // 20261105 Status / Value shown inside the fields, inputs closed with >   // 20261105 Code, Status and Value in one cell   //(del) 20261105
   html_str = html_str + "<tr><td colspan='6' style='white-space:nowrap'>===== Code: "+this.getCodeLabelHtml(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j])+"&nbsp; <input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id+ "' size='5' placeholder='Status' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_input_val+"'>"+ " <input type=\"TEXT\" id='" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id+ "' size='10' placeholder='Value' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_input_val+"'>"+"</td></tr>";   // 20261105 Status / Value shown inside the fields, inputs closed with >   // 20261105 Code, Status and Value in one cell   // 20261105 <new> in grey when no code is assigned yet
   }  // endif

   for(var k = 0; k < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){


        html_labelx = "";
        for(var l = 0; l < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR.length; l++){
          if(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].OE_ztic == this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic &&
             this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].OE_code == this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code){
                html_labelx = this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].html_label;
                html_sizex  = this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].html_size;
          } // endif

        } //  endfor loop through OE_def_AR

//console.log("%%^ 20211120 html_sizex: "+html_sizex);
if(html_sizex < 80){
html_str = html_str + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXT\""+ (this.isForeignObject(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j]) ? this.foreign_ro_attr : "") +" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>";}
   else{
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>"+html_labelx+"</td></tr>";

//html_str = html_str + "<tr><td><textarea name=\"comments\""+ (this.isForeignObject(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j]) ? this.foreign_ro_attr : "") +" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' cols='80' rows='20'  value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +">"+this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"</textarea></td></tr>";   //(del) 20261105
html_str = html_str + "<tr><td colspan='6'><textarea name=\"comments\""+ (this.isForeignObject(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j]) ? this.foreign_ro_attr : "") +" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' cols='80' rows='20'  value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +">"+this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"</textarea></td></tr>";   // 20261105 text area spans the row so it does not widen the label column


}  // endif    


   } //endfor loop through OE_val_AR


  } // endfor loop through object_AR
  // 20261023 new linked objects added on the parent page (Add New Linked Object) - inserted before the end marker
  if(!is_child_page && this.maint_mode != "display"){
    var parent_new_obj_AR = this.getChildPageNewObj_AR(templ_idx, 0, this.template_AR[templ_idx].childTempl_idx_AR[i]);
    for(var q = 0; q < parent_new_obj_AR.length; q++){
      html_str = html_str + this.getNewLinkedObjectBlockHtml(this.template_AR[templ_idx].childTempl_idx_AR[i], parent_new_obj_AR[q]);
    } // endfor
    html_str = html_str + "<tr id='zt_new_end_" + templ_idx + "_0_" + this.template_AR[templ_idx].childTempl_idx_AR[i] + "' style='display:none'><td></td></tr>";
  } // endif
  html_str = html_str + create_link_html;   // 20261105 Create Link to Existing Object at the end of the link type section
  html_str = html_str + "</table></fieldset><table>";   // 20261105 end of link type box
 } // endif if((this.maint_mode != "display" && this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templLevelsDown == 1 ) || this.maint_mode == "display") 20201104
} // endfor loop through childTempl_idx_AR
var wb_grid = {html: "", meta_AR: []};   // 20261107
if(wb_grid_page){
  wb_grid = this.getWorkbookGridHtml(templ_idx);
  //html_str = html_str + "</table>" + wb_grid.html + "<table>";   // 20261107 Columns and Rows grid in the Links box   //(del) 20261110 shown after the Links box
  //html_str = html_str + "<script>window.zt_wb_meta = " + JSON.stringify(wb_grid.meta_AR).replace(/</g, "\\u003c") + ";</script>";   // 20261107 held at Submit by zt_hold_workbook   //(del) 20261110
} // endif wb_grid_page

// start 20261021 child page links - existing links from the selected object plus a create-link row per link template
if(is_child_page){
  var child_link_templ_idx_AR = this.getChildLinkTemplIdx_AR(templ_idx);
  for(var i = 0; i < child_link_templ_idx_AR.length; i++){
    var ltx = this.template_AR[child_link_templ_idx_AR[i]];
    html_str = html_str + "</table><fieldset class='zt_linktype'>";   // 20261105 box per link type (heading below is its legend)
    for(var j = 0; j < this.template_AR[templ_idx].linkType_AR.length; j++){
      if(this.template_AR[templ_idx].linkType_AR[j].linkType_ztic == ltx.linkableObjectLinkType_ztic && this.template_AR[templ_idx].linkType_AR[j].linkType_code == ltx.linkableObjectLinkType_code){
        //html_str = html_str + "<tr><td><strong>"+ this.template_AR[templ_idx].linkType_AR[j].linkType_desc +" / Template: "+ltx.templDesc+"</strong>" + ((this.maint_mode != "display" && !page_readonly) ? this.getAddNewLinkedObjectButtonHtml(templ_idx, child_obj_idx_num, child_link_templ_idx_AR[i]) : "") + "</td></tr>";   // 20261023 Add New Linked Object  // 20261024 !page_readonly   //(del) 20261105
        html_str = html_str + "<legend>"+ this.template_AR[templ_idx].linkType_AR[j].linkType_desc +" / Template: "+ltx.templDesc+ " " + ((this.maint_mode != "display" && !page_readonly) ? this.getAddNewLinkedObjectButtonHtml(templ_idx, child_obj_idx_num, child_link_templ_idx_AR[i]) : "") + "</legend>";   // 20261105 legend of the link type box   // 20261023 Add New Linked Object  // 20261024 !page_readonly   // 20261105 spans the row so it does not widen the label column
      } // endif
    } // endfor
    html_str = html_str + "<table>";   // 20261105 rows of this link type
    var link_obj_AR = this.getChildPageLinkObj_AR(templ_idx, child_obj_idx_num, child_link_templ_idx_AR[i]);
    var link_table = this.isTableLinkTemplate(child_link_templ_idx_AR[i]);   // 20261026 UI attribute - linked objects listed as a table below
    var child_create_link_html = "";   // 20261105 Create Link to Existing Object rows are shown at the end of the link type section
    for(var j = 0; j < link_obj_AR.length; j++){
      var lox = link_obj_AR[j];
      if(page_readonly && lox.newLinkToExistingObject){ continue; }   // 20261024 display-only page - no new links
      if(link_table && !lox.newLinkToExistingObject){ continue; }    // 20261026 table row below
      if(lox.newLinkToExistingObject){
        //(del) 20261105 html_str = html_str + ... - collected in child_create_link_html, shown at the end of the section
        //child_create_link_html = child_create_link_html + "<tr><td>Create Link to Existing Object NS-Code-Status-Value </td><td><input type=\"TEXT\" id='"+ lox.objZTIC_ns_html_id+ "' size='30' value='"+ lox.objZTIC_ns_html_input_val+"'></td><td><input type=\"TEXT\" id='"+ lox.objCodeAssigned_html_id+ "' size='5' value='"+ lox.objCodeAssigned_html_input_val+"'></td><td><input type=\"TEXT\" id='"+ lox.linkStatus_html_id+ "' size='5' value='"+ lox.linkStatus_html_input_val+"'></td><td><input type=\"TEXT\" id='" + lox.linkValue_html_id+ "' size='10' value='"+ lox.linkValue_html_input_val+"'></td></tr>";   //(del) 20261105
        child_create_link_html = child_create_link_html + this.getCreateLinkRowHtml(lox);   // 20261105 label and inputs in one cell, inputs right after the label
      }
      else{
        html_str = html_str + "<tr><td><input type='button' class='maintain_child' id='maintain_link_" + i + "_" + j + "' data-sess_id='" + this.id + "' data-templ_idx='" + child_link_templ_idx_AR[i] + "' data-obj_idx='" + this.template_AR[child_link_templ_idx_AR[i]].object_AR.indexOf(lox) + "' value='Maintain'></td></tr>";   // 20261021 maintain grandchild
        //html_str = html_str + "<tr><td>===== Code: "+lox.objCodeAssigned+ (this.isForeignObject(lox) ? " ("+ this.escapeHtml(this.getNamespaceForZTIC(lox.objZTIC)) +", display only)" : "") +"</td><td><input type=\"TEXT\""+ page_ro_attr +" id='"+ lox.linkStatus_html_id+ "' size='5' value='"+ lox.linkStatus_html_input_val+"'></td><td><input type=\"TEXT\""+ page_ro_attr +" id='" + lox.linkValue_html_id+ "' size='10' value='"+ lox.linkValue_html_input_val+"'></td></tr>";   // 20261024 foreign namespace note, page_ro_attr   //(del) 20261105
        //html_str = html_str + "<tr><td>===== Code: "+lox.objCodeAssigned+ (this.isForeignObject(lox) ? " ("+ this.escapeHtml(this.getNamespaceForZTIC(lox.objZTIC)) +", display only)" : "") +"</td><td><input type=\"TEXT\""+ page_ro_attr +" id='"+ lox.linkStatus_html_id+ "' size='5' placeholder='Status' value='"+ lox.linkStatus_html_input_val+"'></td><td><input type=\"TEXT\""+ page_ro_attr +" id='" + lox.linkValue_html_id+ "' size='10' placeholder='Value' value='"+ lox.linkValue_html_input_val+"'></td></tr>";   // 20261024 foreign namespace note, page_ro_attr   // 20261105 Status / Value shown inside the fields   //(del) 20261105
        //html_str = html_str + "<tr><td colspan='6' style='white-space:nowrap'>===== Code: "+lox.objCodeAssigned+ (this.isForeignObject(lox) ? " ("+ this.escapeHtml(this.getNamespaceForZTIC(lox.objZTIC)) +", display only)" : "") +"&nbsp; <input type=\"TEXT\""+ page_ro_attr +" id='"+ lox.linkStatus_html_id+ "' size='5' placeholder='Status' value='"+ lox.linkStatus_html_input_val+"'> <input type=\"TEXT\""+ page_ro_attr +" id='" + lox.linkValue_html_id+ "' size='10' placeholder='Value' value='"+ lox.linkValue_html_input_val+"'></td></tr>";   // 20261024 foreign namespace note, page_ro_attr   // 20261105 Status / Value shown inside the fields   // 20261105 Code, Status and Value in one cell   //(del) 20261105
        html_str = html_str + "<tr><td colspan='6' style='white-space:nowrap'>===== Code: "+this.getCodeLabelHtml(lox)+ (this.isForeignObject(lox) ? " ("+ this.escapeHtml(this.getNamespaceForZTIC(lox.objZTIC)) +", display only)" : "") +"&nbsp; <input type=\"TEXT\""+ page_ro_attr +" id='"+ lox.linkStatus_html_id+ "' size='5' placeholder='Status' value='"+ lox.linkStatus_html_input_val+"'> <input type=\"TEXT\""+ page_ro_attr +" id='" + lox.linkValue_html_id+ "' size='10' placeholder='Value' value='"+ lox.linkValue_html_input_val+"'></td></tr>";   // 20261024 foreign namespace note, page_ro_attr   // 20261105 Status / Value shown inside the fields   // 20261105 Code, Status and Value in one cell   // 20261105 <new> in grey when no code is assigned yet
        // 20261021 OE values of the linked grandchild - same ids as on its own page, held for the parent Submit by Apply to Parent
        for(var k = 0; k < lox.OE_val_AR.length; k++){
          var gc_labelx = "";
          var gc_sizex  = 30;
          for(var l = 0; l < ltx.OE_def_AR.length; l++){
            if(ltx.OE_def_AR[l].OE_ztic == lox.OE_val_AR[k].OE_ztic && ltx.OE_def_AR[l].OE_code == lox.OE_val_AR[k].OE_code){
              gc_labelx = ltx.OE_def_AR[l].html_label;
              if(ltx.OE_def_AR[l].html_size != undefined && ltx.OE_def_AR[l].html_size !== ""){ gc_sizex = ltx.OE_def_AR[l].html_size; }
            } // endif
          } // endfor
          if(gc_sizex < 80){
            html_str = html_str + "<tr><td>"+ gc_labelx +"</td><td> <input type=\"TEXT\""+ ((page_readonly || this.isForeignObject(lox)) ? this.foreign_ro_attr : "") +" id='"+ lox.OE_val_AR[k].html_id +"' size='"+ gc_sizex +"' value='"+ lox.OE_val_AR[k].html_input_val +"'></td></tr>";
          }
          else{
            html_str = html_str + "<tr><td>"+ gc_labelx +"</td></tr>";
            //html_str = html_str + "<tr><td><textarea name=\"comments\""+ ((page_readonly || this.isForeignObject(lox)) ? this.foreign_ro_attr : "") +" id='"+ lox.OE_val_AR[k].html_id +"' cols='80' rows='20'>"+ lox.OE_val_AR[k].html_input_val +"</textarea></td></tr>";   //(del) 20261105
            html_str = html_str + "<tr><td colspan='6'><textarea name=\"comments\""+ ((page_readonly || this.isForeignObject(lox)) ? this.foreign_ro_attr : "") +" id='"+ lox.OE_val_AR[k].html_id +"' cols='80' rows='20'>"+ lox.OE_val_AR[k].html_input_val +"</textarea></td></tr>";   // 20261105 text area spans the row so it does not widen the label column
          } // endif gc_sizex < 80
        } // endfor loop through lox.OE_val_AR
      } // endif lox.newLinkToExistingObject
    } // endfor loop through link_obj_AR

    // 20261021 new object to create and link from this object
    // 20261023 all new objects of the link template, Add New Linked Object inserts more before the end marker
    var new_obj_AR = this.getChildPageNewObj_AR(templ_idx, child_obj_idx_num, child_link_templ_idx_AR[i]);
    if(link_table){   // 20261026 one row per linked object, object element descriptions in the heading row
      html_str = html_str + "<tr><td colspan='5'><table style='border-collapse:collapse;' border='1' cellpadding='3'>";
      html_str = html_str + this.getLinkedObjectTableHeadingHtml(child_link_templ_idx_AR[i]);
      for(var j = 0; j < link_obj_AR.length; j++){
        if(link_obj_AR[j].newLinkToExistingObject){ continue; }
        html_str = html_str + this.getLinkedObjectTableRowHtml(child_link_templ_idx_AR[i], link_obj_AR[j], page_readonly);
      } // endfor
      for(var q = 0; q < new_obj_AR.length && !page_readonly; q++){
        html_str = html_str + this.getNewLinkedObjectBlockHtml(child_link_templ_idx_AR[i], new_obj_AR[q]);   // table row in table mode
      } // endfor
      html_str = html_str + "<tr id='zt_new_end_" + templ_idx + "_" + child_obj_idx_num + "_" + child_link_templ_idx_AR[i] + "' style='display:none'><td></td></tr>";   // Add New Linked Object inserts rows before this
      html_str = html_str + "</table></td></tr>";
    }
    else{
    for(var q = 0; q < new_obj_AR.length && !page_readonly; q++){   // 20261024 !page_readonly
      html_str = html_str + this.getNewLinkedObjectBlockHtml(child_link_templ_idx_AR[i], new_obj_AR[q]);
    } // endfor
    html_str = html_str + "<tr id='zt_new_end_" + templ_idx + "_" + child_obj_idx_num + "_" + child_link_templ_idx_AR[i] + "' style='display:none'><td></td></tr>";
    } // endif link_table
    html_str = html_str + child_create_link_html;   // 20261105 Create Link to Existing Object at the end of the link type section
    html_str = html_str + "</table></fieldset><table>";   // 20261105 end of link type box
  } // endfor loop through child_link_templ_idx_AR
} // endif is_child_page
// end 20261021

 html_str = html_str + "</table>";
 html_str = html_str + "</fieldset>";   // 20261105 end of Links box
 if(wb_grid_page && wb_grid.html != ""){   // 20261110 Grid box (workbook) after the Links box
   html_str = html_str + wb_grid.html;
   html_str = html_str + "<script>window.zt_wb_meta = " + JSON.stringify(wb_grid.meta_AR).replace(/</g, "\\u003c") + ";</script>";   // 20261107 held at Submit by zt_hold_workbook
 } // endif


  if(!is_child_page){   // 20261020
  html_str = html_str + "<br /> <br /><br /><input type='button' id='submit' value='Submit'><br /><br /> <br /><br />";
  }
  else
  {
  if(page_readonly){   // 20261024
  html_str = html_str + "<br /> <br /><br /><strong>Display only</strong> - this object is in namespace " + this.escapeHtml(this.getNamespaceForZTIC(this.template_AR[templ_idx].object_AR[child_obj_idx_num].objZTIC)) + ", not the target namespace " + this.escapeHtml(this.TargetNS) + ".<br /><br /> <br /><br />";
  }
  else
  //html_str = html_str + "<br /> <br /><br /><input type='button' id='apply_to_parent' value='Apply to Parent'> (changes are sent to the server when Submit is clicked on the parent page)<br /><br /> <br /><br />";   // 20261020   //(del) 20261105
  html_str = html_str + "<br /> <br /><br /><input type='button' id='apply_to_parent' value='Apply'><br /><br /> <br /><br />";   // 20261105 shorter label, id unchanged (Apply handler)
  } // endif !is_child_page

 html_str = html_str + "</body>";


html_str = html_str + "</html>";
   console.log("activate here to display html_str in zt_client_session.js")
 //console.log("20250112d html_str in zt_client_session: " + html_str);

//console.log("20200607 template desc list in zt_client_session getHtmlForTemplate()");
for(var i = 0; i < this.template_AR.length; i++){
// console.log(this.template_AR[i].templDesc);
} //endfor


return html_str;



}  // end of getHtmlForTemplate_Generic


getOE_html_size(OEscreenElem_ARx, DEvalue_ARx){   //20200604


   

  return OEscreenElem_ARx;
}


getZTICForNamespace(namespacex){

var return_ztic = null;

for(var i = 0; i < this.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == namespacex.toString().trim()){
       return_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

return return_ztic;

}  // end of getZTICForNamespace()


getNamespaceForZTIC(zticx){

var return_namespace = null;

for(var i = 0; i < this.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].code.toString().trim() == zticx.toString().trim()){
       return_namespace = this.ZTICNS_AR[i].namespace.toString().trim();
     } // endif
} //endfor

return return_namespace;

}  // end of getNamespaceForZTIC()




  addTemplate() {
   //var return1;
          
   //return return1;

}  // end of addTemplate()

  addObjectToTemplate(templ_idx, obj_idx){
    this.template_AR.object_idx_AR.push(obj_idx);
         
}  // end of addObjectToTemplate()


// begin 20200801
getTemplateIdxForTechProfile(T2_templ_ARx, techProfileId){
var templ_idx = null;
var templ_ztic = null;
var templ_code = null;
//console.log("20200802 techProfileId: "+techProfileId);
  for(var j = 0; j < T2_templ_ARx.length; j++){
    for(var i = 0; i < T2_templ_ARx[j].techProfileId_AR.length; i++){
//       console.log("  T2_templ_ARx[j].techProfileId_AR[i]: "+T2_templ_ARx[j].techProfileId_AR[i]);
       if(T2_templ_ARx[j].techProfileId_AR[i] == techProfileId){
          //templ_id = T2_templ_ARx[j].templateId;
          templ_ztic = T2_templ_ARx[j].templateZTIC;
          templ_code = T2_templ_ARx[j].templateCode;
       } // endif
    }  // endfor
   } // endfor

  for(var i = 0; i < this.template_AR.length; i++){
//     console.log("20200802 templ_ztic - templ_code: "+templ_ztic+" - "+templ_code);
//     console.log("20200802 i - this.template_AR[i].templZTIC - this.template_AR[i].templCode: "+i+" - "+this.template_AR[i].templZTIC+ " - "+this.template_AR[i].templCode);
     if(templ_ztic == this.template_AR[i].templZTIC   && templ_code == this.template_AR[i].templCode){
        templ_idx = i;
     }  // endif
  }
return templ_idx;
}  // end of getTemplateIdxForTechProfile()
// end 20200801

// start 20231113

T7_getTemplateIdxForTechProfile(T7_templ_ARx, techProfileId){
  var templ_idx = null;
  var templ_ztic = null;
  var templ_code = null;
  //console.log("20240107e techProfileId: "+techProfileId);
    for(var j = 0; j < T7_templ_ARx.length; j++){
     //if(j == 0){   // TEST 20240109
      for(var i = 0; i < T7_templ_ARx[j].techProfileId_AR.length; i++){
        // console.log("20240109g  T7_templ_ARx[j].techProfileId_AR[i]: "+T7_templ_ARx[j].techProfileId_AR[i]);
         if(T7_templ_ARx[j].techProfileId_AR[i] == techProfileId){
            //templ_id = T7_templ_ARx[j].templateId;
            templ_ztic = T7_templ_ARx[j].templateZTIC;
            templ_code = T7_templ_ARx[j].templateCode;
            
         } // endif
      }  // endfor
      //} // endif TEST 20240109
     } // endfor
  
    for(var i = 0; i < this.TVBTR_template_AR.length; i++){
       // console.log("20240107f templ_ztic - templ_code: "+templ_ztic+" - "+templ_code);
       // console.log("20240107g i - this.TVBTR_template_AR[i].templZTIC - this.TVBTR_template_AR[i].templCode: "+i+" - "+this.TVBTR_template_AR[i].templZTIC+ " - "+this.TVBTR_template_AR[i].templCode);
       if(templ_ztic == this.TVBTR_template_AR[i].templZTIC   && templ_code == this.TVBTR_template_AR[i].templCode){
          templ_idx = i;
       }  // endif
    }
  return templ_idx;
  }  // end of T7_getTemplateIdxForTechProfile

// end 20231113

getSelectionListHtmlForSetValues(typeDef_zticx, typeDef_codex, typeVal_ztic_ns_html_input_valx, typeVal_code_html_input_valx, object_set_zticx, object_set_codex, composite_html_idx){


  var HashMap = require('hashmap');   // 20230401
  var usedSet_HM = new HashMap();


var ret_html_str = "";
//ret_html_str = ret_html_str +  "<td> <input type=\"TEXT\" id=\'9999\'  value=\'test string\' </td></tr>";

var selListRec = new SelectionListRec();
var ddlSelListName = "ddl_TypeDef_"+typeDef_zticx.toString().trim()+"_"+typeDef_codex.toString().trim();
//console.log("20230405a ddlSelListName in getSelectionListHtmlForSetValues in zt_client_session: "+ddlSelListName);
selListRec.selectionListName = ddlSelListName;
selListRec.typeDef_ztic = typeDef_zticx;
selListRec.typeDef_code = typeDef_codex;
selListRec.objectSet_ztic = object_set_zticx;
selListRec.objectSet_code = object_set_codex;
selListRec.composite_html_id = composite_html_idx;
this.selectionList_AR.push(selListRec);
//console.log("20230330c this.selectionList_AR.length: "+this.selectionList_AR.length);
ret_html_str = ret_html_str + "<div><select class=\'" +ddlSelListName + "\'>";

//console.log("this.objectSet_AR.length: "+this.objectSet_AR.length);
for(var i = 0; i < this.objectSet_AR.length; i++){
   //console.log("20230405b this.objectSet_AR[i].objSetZTIC - this.objectSet_AR[i].objSetCode - object_set_zticx - object_set_codex: "+this.objectSet_AR[i].objSetZTIC+" - "+this.objectSet_AR[i].objSetCode+" - "+object_set_zticx+" - "+object_set_codex);
   if(this.objectSet_AR[i].objSetZTIC == object_set_zticx && this.objectSet_AR[i].objSetCode == object_set_codex){
      var usedSetKeyStr = object_set_zticx + "_" + object_set_codex;
      if(!usedSet_HM.has(usedSetKeyStr)){
        usedSet_HM.set(usedSetKeyStr,"x");
        // console.log("20230328b this.objectSet_AR[i].objSetMember_AR.length: "+ this.objectSet_AR[i].objSetMember_AR.length);
        for(var j = 0; j < this.objectSet_AR[i].objSetMember_AR.length; j++){
          if(j == 0){
            ret_html_str = ret_html_str + "<option value=\'"  + "     |     "+ "\'>     -     </option>";
          }
          var obj_ns = this.getNamespaceForZTIC(this.objectSet_AR[i].objSetMember_AR[j].objectZTIC);
          if(obj_ns == typeVal_ztic_ns_html_input_valx && this.objectSet_AR[i].objSetMember_AR[j].objectCode == typeVal_code_html_input_valx){
            ret_html_str = ret_html_str + "<option value=\'" + this.objectSet_AR[i].objSetMember_AR[j].objectZTIC + " | "+this.objectSet_AR[i].objSetMember_AR[j].objectCode+ "\' selected=true>"+obj_ns+" - "+this.objectSet_AR[i].objSetMember_AR[j].objectCode+":  ";
          }
          else
          {
            ret_html_str = ret_html_str + "<option value=\'" + this.objectSet_AR[i].objSetMember_AR[j].objectZTIC + " | "+this.objectSet_AR[i].objSetMember_AR[j].objectCode+ "\'>"+obj_ns+" - "+this.objectSet_AR[i].objSetMember_AR[j].objectCode+":  ";
          }  // endif
           for(var k = 0; k < this.objectSet_AR[i].objSetMember_AR[j].OE_val_AR.length; k++){
             if(k != 0){ret_html_str = ret_html_str + " - ";}
             ret_html_str = ret_html_str + this.objectSet_AR[i].objSetMember_AR[j].OE_val_AR[k].OE_value; 
           } // endfor
           ret_html_str = ret_html_str + "</option>";

        } // endfor
      } // endif   (!usedSet_HM.has(usedSetKeyStr))
   }  // endif
}  // endfor


ret_html_str = ret_html_str + "</select></div>";


//console.log("20230324  ret_htm_str in zt_client_session.js:  "+ret_html_str);

return ret_html_str;


}  // end of getSelectionListFromSetValues





TVBTR_getHtmlForTypeValueBasedTemplateRules(attributeGroupx){
var retStr = "";
if(this.TVBTR_template_AR.length > 0){

var html_labelx;
var html_sizex;
const templ_idx = 0;
if(attributeGroupx == "ObjectElement"){

//console.log("20240110a this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length: "+this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length);
for(var i = 0; i < this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length; i++){

if(this.TVBTRisRelevant(this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i])){                      // 20231206
  for(var j = 0; j < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
    for(var k = 0; k < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){


    html_labelx = "";
      for(var l = 0; l < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR.length; l++){
        if(this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].OE_ztic == this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic &&
            this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].OE_code == this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code){
            html_labelx = this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].html_label;
            html_sizex  = this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].OE_def_AR[l].html_size;
        } // endif

      } //  endfor loop through OE_def_AR
 
//console.log("%%^ 20211120 html_sizex: "+html_sizex);
if(html_sizex < 80){
retStr = retStr + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXT\" id='"+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>";}
else{
retStr = retStr + "<tr><td>   </td></tr>";
retStr = retStr + "<tr><td>   </td></tr>";
retStr = retStr + "<tr><td>"+html_labelx+"</td></tr>";

retStr = retStr + "<tr><td><textarea name=\"comments\" id='"+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' cols='80' rows='20'  value='"+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +">"+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"</textarea></td></tr>";

//<textarea name="comments" id="myTextarea" cols="40" rows="6">Suppose we have this text!</textarea>  (example)

}  // endif  20200516  


     } //endfor loop through OE_val_AR

    } // end for loop through object_AR

   } //  endif   if(this.TVBTRisRelevant(this.TVBTR_template_AR[templ_idx].childTempl_idx_AR)){                      // 20231206

  }  // endfor loop through this.template_AR[templ_idx].childTempl_idx_AR.length; i++){

 }  // endif attributeGroupx == "ObjectElement"

}  // endif if(this.TVBTR_template_AR.length > 0){

return retStr;
}  // end of TVBTR_getHtmlForTypeValueBasedTemplateRules()
// end 20231116




// start 20231117

TVBTR_getHtmlForTypeValueBasedTemplateRules_html_input_val(){

var retStr = "";
if(this.TVBTR_template_AR.length > 0){
retStr = retStr + "templ_idx = 0;";
const templ_idx = 0;

retStr = retStr + " for(var i = 0; i < sess1.TVBTR_template_AR.length; i++){";
//console.log("20231120d this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length: "+this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length);
for(var i = 0; i < this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length; i++){
  retStr = retStr + " for(var j = 0; j < sess1.TVBTR_template_AR[i].object_AR.length; j++){"; 
  //console.log("20231120c this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length: "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length);
  for(var j = 0; j < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
   // start insert 20200820
    retStr = retStr + " if(sess1.TVBTR_template_AR[i].object_AR[j].objZTIC_ns_html_id=='"+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_id + "'){";
    retStr = retStr + " sess1.TVBTR_template_AR[i].object_AR[j].objZTIC_ns_html_input_val="+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_id+";} "; 
    retStr = retStr + " if(sess1.TVBTR_template_AR[i].object_AR[j].objCodeAssigned_html_id=='"+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_id + "'){";
    retStr = retStr + " sess1.TVBTR_template_AR[i].object_AR[j].objCodeAssigned_html_input_val="+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_id+";} "; 
   retStr = retStr + " for(var k = 0; k < sess1.TVBTR_template_AR[i].object_AR[j].OE_val_AR.length; k++){"; 
   //console.log("20231120b this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i].object_AR[j].OE_val_AR.length: "+this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i].object_AR[j].OE_val_AR.length);
    for(var k = 0; k < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
     //  console.log("20231120a this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i].object_AR[j].OE_val_AR[k].html_id: "+this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i].object_AR[j].OE_val_AR[k].html_id);

      retStr = retStr + " if(sess1.TVBTR_template_AR[i].object_AR[j].OE_val_AR[k].html_id=='"+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id + "'){";
      retStr = retStr + " sess1.TVBTR_template_AR[i].object_AR[j].OE_val_AR[k].html_input_val="+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+";} "; 
    }  //endfor 
    retStr = retStr + "} ";   // endfor 



  } // endfor
  retStr = retStr + "} ";   // endfor 
} // endfor

retStr = retStr + "} ";   // endfor 

} // endif if(this.TVBTR_template_AR.length > 0)

return retStr;
}  // end of TVBTR_getHtmlForTypeValueBasedTemplateRules_html_input_val()





TVBTR_getHtmlForTypeValueBasedTemplateRules_build_TVBTR_Template_AR(){

//console.log("20240110b this.TVBTR_template_AR.length: "+this.TVBTR_template_AR.length);
  var retStr = "";
  if(this.TVBTR_template_AR.length > 0){
  const templ_idx = 0;

  retStr = retStr + " templ_rec = new TemplateRec(); ";
  retStr = retStr + " templ_rec.parent_idx   = \""+ this.TVBTR_template_AR[templ_idx].parent_idx +"\" ;";
  retStr = retStr + " templ_rec.templLevelsDown  =  \""+ this.TVBTR_template_AR[templ_idx].templLevelsDown +"\" ;";
  retStr = retStr + " templ_rec.templZTIC  =   \""+ this.TVBTR_template_AR[templ_idx].templZTIC  +"\" ;";   
  retStr = retStr + " templ_rec.templCode  =   \""+ this.TVBTR_template_AR[templ_idx].templCode  +"\" ;";
  retStr = retStr + " templ_rec.templDesc  =   \""+ this.TVBTR_template_AR[templ_idx].templDesc  +"\" ;";
  retStr = retStr + " templ_rec.objKindZTIC = \""+  this.TVBTR_template_AR[templ_idx].objKindZTIC +"\" ;";
  retStr = retStr + " templ_rec.objKindCode = \""+  this.TVBTR_template_AR[templ_idx].objKindCode +"\" ;";
  retStr = retStr + " templ_rec.linkableObjectLinkType_ztic = \""+ this.TVBTR_template_AR[templ_idx].linkableObjectLinkType_ztic + "\" ;";
  retStr = retStr + " templ_rec.linkableObjectLinkType_code = \""+ this.TVBTR_template_AR[templ_idx].linkableObjectLinkType_code + "\" ;";
  retStr = retStr + " templ_idx = sess1.TVBTR_template_AR.push(templ_rec) -1;";
  for(var j = 0; j < this.TVBTR_template_AR[templ_idx].object_AR.length; j++){
    retStr = retStr + " obj_rec = new ObjectRec(); ";
    //console.log("20200613 this.template_AR[i].object_AR[k].objZTIC: "+this.template_AR[i].object_AR[j].objZTIC);
    retStr = retStr + " obj_rec.objZTIC      = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].objZTIC     + "\" ;";
    retStr = retStr + " obj_rec.objCodeTemp  = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].objCodeTemp + "\" ;";
    retStr = retStr + " obj_rec.objCodeAssigned  = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].objCodeAssigned + "\" ;"; 
    if(this.TVBTR_template_AR[templ_idx].object_AR[j].newCode){  
      retStr = retStr + " obj_rec.newCode   = true;";
        }
      else
        {
          retStr = retStr + " obj_rec.newCode   = false;";
     } // endif
  
    if(this.TVBTR_template_AR[templ_idx].object_AR[j].newLinkToExistingObject){  
       retStr = retStr + " obj_rec.newLinkToExistingObject   = true;";
        }
      else
        {
       retStr = retStr + " obj_rec.newLinkToExistingObject   = false;";
     } // endif

  
    retStr = retStr + "  obj_rec.objZTIC_ns_html_id      = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].objZTIC_ns_html_id     + "\" ;";   
    retStr = retStr + "  obj_rec.objZTIC_ns_html_input_val      = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].objZTIC_ns_html_input_val     + "\" ;"; 
    retStr = retStr + "  obj_rec.objCodeAssigned_html_id      = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].objCodeAssigned_html_id     + "\" ;"; 
    retStr = retStr + "  obj_rec.objCodeAssigned_html_input_val      = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].objCodeAssigned_html_input_val     + "\" ;"; 
  
    retStr = retStr + "  obj_rec.linkStatus_html_id      = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].linkStatus_html_id     + "\" ;"; 
    retStr = retStr + "  obj_rec.linkStatus_html_input_val      = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].linkStatus_html_input_val     + "\" ;"; 
    retStr = retStr + "  obj_rec.linkValue_html_id      = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].linkValue_html_id     + "\" ;"; 
    retStr = retStr + "  obj_rec.linkValue_html_input_val      = \"" +this.TVBTR_template_AR[templ_idx].object_AR[j].linkValue_html_input_val     + "\" ;"; 
  
    retStr = retStr + " obj_idx_var = sess1.TVBTR_template_AR[templ_idx].object_AR.push(obj_rec) -1;";
    }  // endfor loop through object_AR


  //console.log("20240110c this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length: "+this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length);
  for(var i = 0; i < this.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length; i++){
  
    retStr = retStr + " templ_rec = new TemplateRec(); ";
    retStr = retStr + " templ_rec.parent_idx   = \""+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].parent_idx +"\" ;";
    retStr = retStr + " templ_rec.templLevelsDown  =  \""+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].templLevelsDown +"\" ;";
    retStr = retStr + " templ_rec.templZTIC  =   \""+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].templZTIC  +"\" ;";   
    retStr = retStr + " templ_rec.templCode  =   \""+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].templCode  +"\" ;";
    retStr = retStr + " templ_rec.templDesc  =   \""+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].templDesc  +"\" ;";
    retStr = retStr + " templ_rec.objKindZTIC =  \""+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].objKindZTIC +"\" ;";
    retStr = retStr + " templ_rec.objKindCode =  \""+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].objKindCode +"\" ;";
    retStr = retStr + " templ_rec.linkableObjectLinkType_ztic = \""+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_ztic + "\" ;";
    retStr = retStr + " templ_rec.linkableObjectLinkType_code = \""+ this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_code + "\" ;";
    retStr = retStr + " child_templ_idx_var = sess1.TVBTR_template_AR.push(templ_rec) -1;";
    retStr = retStr + " sess1.TVBTR_template_AR[templ_idx].childTempl_idx_AR.push(child_templ_idx_var);";
    
    for(var j = 0; j < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){ 

      retStr = retStr + " obj_rec = new ObjectRec(); ";
      retStr = retStr + " obj_rec.objZTIC      = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC     + "\" ;";
      retStr = retStr + " obj_rec.objCodeTemp  = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeTemp + "\" ;";
      retStr = retStr + " obj_rec.objCodeAssigned  = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned + "\" ;"; 
      if(this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].newCode){  
            retStr = retStr + " obj_rec.newCode   = true;";
               }
             else
               {
            retStr = retStr + " obj_rec.newCode   = false;";
            } // endif
      
  
          if(this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].newLinkToExistingObject){  
            retStr = retStr + " obj_rec.newLinkToExistingObject   = true;";
              }
            else
              {
                retStr = retStr + " obj_rec.newLinkToExistingObject   = false;";
           } // endif
      
        
           retStr = retStr + "  obj_rec.objZTIC_ns_html_id      = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_id     + "\" ;";   
           retStr = retStr + "  obj_rec.objZTIC_ns_html_input_val      = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_input_val     + "\" ;"; 
           retStr = retStr + "  obj_rec.objCodeAssigned_html_id      = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_id     + "\" ;"; 
           retStr = retStr + "  obj_rec.objCodeAssigned_html_input_val      = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_input_val     + "\" ;"; 
           retStr = retStr + "  obj_rec.linkStatus_html_id      = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id     + "\" ;"; 
           retStr = retStr + "  obj_rec.linkStatus_html_input_val      = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_input_val     + "\" ;"; 
      
           retStr = retStr + "  obj_rec.linkValue_html_id      = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id     + "\" ;"; 
           retStr = retStr + "  obj_rec.linkValue_html_input_val      = \"" +this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_input_val     + "\" ;"; 
      
           retStr = retStr + " obj_idx_var = sess1.TVBTR_template_AR[child_templ_idx_var].object_AR.push(obj_rec) -1;";



    
  
          for(var k = 0; k < this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
            retStr = retStr + " oe_val_rec = new ObjectElementValueRec(); ";
            retStr = retStr + "  oe_val_rec.OE_ztic  = '" + this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic.toString().trim() + "'; ";
            retStr = retStr + "  oe_val_rec.OE_code  = '" + this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code.toString().trim() + "'; ";
            retStr = retStr + "  oe_val_rec.OE_value  = '" + this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_value.toString().trim() + "'; ";   
            retStr = retStr + "  oe_val_rec.html_id  = '" + this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id.toString().trim() + "'; "; 
            retStr = retStr + "  oe_val_rec.html_input_val  = '" + this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val.toString().trim() + "'; ";  
            //console.log("20231117 this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_value: "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_value);
            //console.log("20231124c oe_val_rec.OE_ztic - oe_val_rec.OE_code: "+this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic + " - " + this.TVBTR_template_AR[this.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code);
            retStr = retStr + "    oe_val_idx_var = sess1.TVBTR_template_AR[child_templ_idx_var].object_AR[obj_idx_var].OE_val_AR.push(oe_val_rec) -1;";
         }  //endfor loop through OE_val_AR
        } // endfor loop through object_AR
      }  // endfor loop through childTempl_idx_AR
      
    } // endif if(this.TVBTR_template_AR.length > 0){      

return retStr;

}  // end of TVBTR_getHtmlForTypeValueBasedTemplateRules_build_TVBTR_Template_AR()



setRelevantTVBTRstatus(top_objectx){


  //console.log("20230328 this.objectSet_AR[obj_set_idx].objSetZTIC, objSetCode: "+this.objectSet_AR[obj_set_idx].objSetZTIC+" - "+this.objectSet_AR[obj_set_idx].objSetCode );
// this.objectSet_AR[obj_set_idx].objSetMember_AR.push(set_member_obj); 
// console.log("20231210e top_objectx.objZTIC - objCodeAssigned - objCodeTemp: "+top_objectx.objZTIC+" - "+top_objectx.objCodeAssigned+" - "+top_objectx.objCodeTemp);
// console.log("20231210g this.objectSet_AR.length: "+this.objectSet_AR.length);
for(var i = 0; i < this.objectSet_AR.length; i++){
 // console.log("20231210h this.TVBTR_AR.length: "+this.TVBTR_AR.length);
  for(var j = 0; j < this.TVBTR_AR.length; j++){
      if(this.objectSet_AR[i].objSetZTIC == this.TVBTR_AR[j].objectSet_ztic && this.objectSet_AR[i].objSetCode == this.TVBTR_AR[j].objectSet_code ){
        this.TVBTR_AR[j].objectSet_idx = i;
      } // endif
  }  // endfor loop through TVBTR_AR
}  // endfor loop through objectSet_AR
 // console.log("20231210f top_objectx.typeVal_AR.length: "+top_objectx.typeVal_AR.length);
  for(var i = 0; i < top_objectx.typeVal_AR.length; i++){
    for(var j = 0; j < this.TVBTR_AR.length; j++){
    //  console.log("20231209e top_objectx.typeVal_AR[i].typeDef_ztic - this.TVBTR_AR[j].typeDef_ztic and code: "+top_objectx.typeVal_AR[i].typeDef_ztic+" - "+this.TVBTR_AR[j].typeDef_ztic+" - "+top_objectx.typeVal_AR[i].typeDef_code+" - "+this.TVBTR_AR[j].typeDef_code);
      if(top_objectx.typeVal_AR[i].typeDef_ztic == this.TVBTR_AR[j].typeDef_ztic && top_objectx.typeVal_AR[i].typeDef_code == this.TVBTR_AR[j].typeDef_code){
        for(var k = 0; k < this.objectSet_AR[this.TVBTR_AR[j].objectSet_idx].objSetMember_AR.length; k++){

          // REVISIT  -  does it also need to check the objectKindZTIC and objectKindCode ???
      //    console.log("20231211d this.objectSet_AR[this.TVBTR_AR[j].objectSet_idx].objSetMember_AR[k].objectZTIC - top_objectx.typeVal_AR[i].typeVal_ztic  - objectCode - typeVal_code: " + this.objectSet_AR[this.TVBTR_AR[j].objectSet_idx].objSetMember_AR[k].objectZTIC + " - "+ this.TVBTR_AR[j].typeVal_ztic+" - "+this.objectSet_AR[this.TVBTR_AR[j].objectSet_idx].objSetMember_AR[k].objectCode+ " - "+ top_objectx.typeVal_AR[i].typeVal_code);
          if(this.objectSet_AR[this.TVBTR_AR[j].objectSet_idx].objSetMember_AR[k].objectZTIC == top_objectx.typeVal_AR[i].typeVal_ztic && this.objectSet_AR[this.TVBTR_AR[j].objectSet_idx].objSetMember_AR[k].objectCode == top_objectx.typeVal_AR[i].typeVal_code){
            this.TVBTR_AR[j].ruleTriggered = true;
          } // endif 

        }  // endfor loop through objSetMember_AR
      }  // endif  if(top_objectx.typeVal_AR[i].typeDef_ztic == this.TVBTR_AR[j].typeDef_ztic && top_objectx.typeVal_AR[i].typeDef_code == this.TVBTR_AR[j].typeDef_code)


    } // endfor loop through TVBTR_AR


  } // endfor loop through top_objectx.typeVal_AR


}  // end of setRelevantTVBTRstatus



TVBTRisRelevant(TVBTR_templ_idx){
var returnTVBTRisRelevant = false;

for(var i = 0; i < this.TVBTR_AR.length; i++){
  //console.log("20231209a this.TVBTR_AR[i].template_ztic - this.TVBTR_template_AR[TVBTR_templ_idx].templZTIC and code: "+this.TVBTR_AR[i].template_ztic+" - "+this.TVBTR_template_AR[TVBTR_templ_idx].templZTIC+" - "+this.TVBTR_AR[i].template_code+" - "+this.TVBTR_template_AR[TVBTR_templ_idx].templCode);
   if(this.TVBTR_AR[i].template_ztic == this.TVBTR_template_AR[TVBTR_templ_idx].templZTIC  & this.TVBTR_AR[i].template_code == this.TVBTR_template_AR[TVBTR_templ_idx].templCode){
   // console.log("20231211b this.TVBTR_AR[i].ruleTriggered: "+this.TVBTR_AR[i].ruleTriggered);
    returnTVBTRisRelevant = this.TVBTR_AR[i].ruleTriggered;

   }  // endif
  
  // returnTVBTRisRelevant = true;

}  // endfor     


return returnTVBTRisRelevant;

}  // end of TVBTRisRelevant()

// end 20231207

} // end of class ZtSession


function TemplateRec(parent_idxx, templLevelsDownx, templZTICx, templCodex) {
   this.parent_idx  = parent_idxx;
   this.templLevelsDown  = templLevelsDownx;
   this.templZTIC   = templZTICx;
   this.templCode   = templCodex;
   this.templDesc   = "";
   this.objKindZTIC     = "";
   this.objKindCode     = "";
   this.linkableObjectLinkType_ztic = "";
   this.linkableObjectLinkType_code = "";
   this.childTempl_idx_AR = []; 
   this.object_AR         = [];
   this.OE_def_AR         = [];    // to be deprecated 20200930
   this.typeDef_AR        = [];    // to be deprecated 20200930
   this.linkType_AR       = [];    // to be deprecated 20200930
   this.templateDefIdx    = 0;     // 20200930
  
 } // end of function TemplateRec 


// start 20200930
function TemplateDefRec(templZTICx, templCodex) {
   this.templZTIC   = templZTICx;
   this.templCode   = templCodex;
   this.templDesc   = "";
   this.objKindZTIC     = "";
   this.objKindCode     = "";
   this.linkableObjectLinkType_ztic = "";
   this.linkableObjectLinkType_code = "";
   this.OE_def_AR         = [];   
   this.typeDef_AR        = [];   
   this.linkType_AR       = [];    
 } // end of function TemplateDefRec
// end 20200930


function ObjectRec(){
   this.objZTIC           = "";    
   this.objCodeTemp       = "";    
   this.objCodeAssigned   = ""; 
   this.newCode           = false;
   this.isUsed            = false;     
   this.newLinkToExistingObject = false;
   this.parentObject_idx  = "";
   this.parentLink_idx    = "";        
   this.OE_val_AR  = [];
   this.typeVal_AR = [];
   this.link_AR    = [];
   this.objZTIC_ns_html_id     = "";
   this.objZTIC_ns_html_input_val = "";
   this.objCodeAssigned_html_id     = "";
   this.objCodeAssigned_html_input_val = "";
   this.template_idx = "";               //   idx of template holding this object
   this.linkStatus_html_id        = "";  //   status of link to this object
   this.linkStatus_html_input_val = "";  //   input val of status of link to this object
   this.linkValue_html_id         = "";  //   link value of link to this object
   this.linkValue_html_input_val  = "";  //   input val of link value of link to this object
   this.linkFromObj_key           = "";  //   20261021 kindZTIC_kindCode_objZTIC_objCode of the object linking to this object (child page links), "new_<templ_idx>_<obj_idx>" for a child page create-link row


}// end of ObjectRec

function ObjectElementDefinitionRec(){
   this.OE_ztic = "";
   this.OE_code = "";
   this.OE_desc = "";
   this.DE_ztic = "";
   this.DE_code = "";
//   this.html_id     = "";
   this.html_label  = "";
   //this.html_input_val = "";
   this.html_size   = "";
}
 

function TypeDefinitionRec(){
   this.typeDef_ztic = "";
   this.typeDef_code = "";
   this.typeDef_desc = "";
   this.objectKind_ztic = "";   
   this.objectKind_code = "";   
}

function LinkTypeRec() {
   this.linkType_ztic = "";
   this.linkType_code = "";
   this.linkType_desc = "";
 
}


function ObjectElementValueRec(){
   this.OE_ztic = "";
   this.OE_code = "";
   this.OE_value    = "";
   this.html_id     = "";
   this.html_input_val = "";
}
   

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
   this.composite_html_id   = "";         // 20230323
   this.composite_html_input_val = "";    // 20230323
   this.dateStr_html_id          = "";    // 20231029
   this.dateStr_html_input_val = "";      // 20231029

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
   this.isUsed          = false;    // 20210214

}


function DEvalueRec(){
    this.DE_ztic  = "";
    this.DE_code  = "";
    //OE_max_length = "";
    this.OE_html_size = "";
} // end of DEvalueRec()



function TemplateTechProfileIdRec(){
     this.templateId  = "";
     this.templateParentId = "";
     this.templateZTIC     = "";
     this.templateCode     = "";
     this.techProfileId_AR = [];

}  // end of TemplateTechProfileIdRec()




function ObjectSetRec(objSetZTICx, objSetCodex) {
   this.objSetZTIC   = objSetZTICx;
   this.objSetCode   = objSetCodex;
   this.objSetDesc   = "";
   this.objSetMember_AR         = [];   
    
 } // end of function ObjectSetRec

function ObjectSetMemberObjectRec(){
   this.objectKindZTIC                = "";   //4132
   this.objectKindCode                = "";   //4133
   this.objectZTIC                    = "";   //4134
   this.objectCode                    = "";   //4135
   //this.objectCodeAssigned          = "";   //4136
   this.id                            = "";   //4137
   this.parentId                      = "";   //4138    // 20200708
   this.levelsDown                    = "";   //4139    // 20200708
   this.OE_val_AR  = [];
   this.typeVal_AR = [];
   this.link_AR    = [];
 
}// end of ObjectSetMemberObjectRec




function QueryResponseObjectWorkAreaRec() {
   this.rawMsg_idx                    = "";
   this.queryResponseSetWA_rawMsg_idx = "";
   this.object_idx                    = "";   //4131
   this.objectSet_idx                 = "";   //4130
   this.queryResponseSetMember_idx    = "";   //410
   this.queryResponseSet_idx          = "";   //41
   this.response_idx                  = "";   //4
   this.root_idx                      = "";   //1

   this.objectKindZTIC                = "";   //4132
   this.objectKindCode                = "";   //4133
   this.objectZTIC                    = "";   //4134
   this.objectCode                    = "";   //4135
   //this.objectCodeAssigned          = "";   //4136
   this.id                            = "";   //4137
   this.parentId                      = "";   //4138    // 20200708
   this.levelsDown                    = "";   //4139    // 20200708
   //this.rootObject_BL	              = "";   //4137  boolean  (del) 20200708
   this.objectElement_idx_AR       =	[];   //4140
   this.type_idx_AR                = [];   //4150
   this.link_idx_AR                = [];   //4160	

}




function QueryResponseObjectElementWorkAreaRec() {
       this.objectElementValue_idx       = "";
       this.objectElement_idx           = "";
       this.objectElementSet_idx        = "";
       this.object_idx              = ""; 
       this.objectSet_idx           = "";
       this.queryResponseSetMember_idx = "";
       this.queryResponseSet_idx       = "";
       this.response_idx             = "";
       this.root_idx                = "";
       this.rawMsg_idx                    = "";
       this.objectWA_rawMsg_idx           = "";
       this.objectElementZTIC             = "";  //4142
       this.objectElementCode             = "";  //4143
       this.objectElementValue            = "";  //4144

}

function QueryResponseTypeWorkAreaRec() {
       this.typeValueCode_idx       = "";
       this.typeValue_idx           = "";
       this.typeValueSet_idx        = "";
       this.object_idx              = ""; 
       this.objectSet_idx           = "";
       this.queryResponseSetMember_idx = "";
       this.queryResponseSet_idx       = "";
       this.response_idx             = "";
       this.root_idx                = "";
       this.rawMsg_idx                    = "";
       this.objectWA_rawMsg_idx           = "";
       this.typeDefinitionZTIC            = "";    //4152
       this.typeDefinitionCode            = "";    //4153
       this.typeValueZTIC                 = "";    //4154
       this.typeValueCode                 = "";    //4155
}


function QueryResponseLinkWorkAreaRec() {
       this.linkToCode_idx       = "";
       this.link_idx           = "";
       this.linkSet_idx        = "";
       this.object_idx              = ""; 
       this.objectSet_idx           = "";
       this.queryResponseSetMember_idx = "";
       this.queryResponseSet_idx       = "";
       this.response_idx             = "";
       this.root_idx                = "";
       this.rawMsg_idx                    = "";
       this.objectWA_rawMsg_idx           = "";
       this.linkTypeZTIC                  = "";   //4162
       this.linkTypeCode                  = "";   //4163
       this.linkToKindZTIC                = "";   //4164
       this.linkToKindCode                = "";   //4165
       this.linkToZTIC                    = "";   //4166
       this.linkToCode                    = "";   //4167
       this.status                        = "";   //41691 20210224
       this.timestampEff                  = "";   //41692 20210224
       this.linkValue                     = "";   //41693 20210224

}


function OEscreenElemRec(){                //20200125
     this.OE_ztic   = "";           //object element ztic
     this.OE_code   = "";           //object element code
     this.DE_ztic   = "";           //20200516 data element ztic 
     this.DE_code   = "";           //20200516 data element code
     //OE_max_length = "";    //(del) 20200607
     this.html_size    = "";    // 20200607
     this.html_id   = "";
     this.html_label = "";
     this.html_input_val = "";

}  // end of OEscreenElemRec


function AddMessageOEvalueToSessionWorkAreaRec(msg_objx, msg_oex){
  this.msg_obj = msg_objx;
  this.msg_oe = msg_oex;
 
} 



function AddMessageTypeValueToSessionWorkAreaRec(msg_objx, msg_type_valuex, levelsDownx){
   this.msg_obj = msg_objx;
   this.msg_type_value = msg_type_valuex;
   this.levelsDown = levelsDownx;
}




function AddMessageLinkToSessionWorkAreaRec(msg_objx, msg_linkx, levelsDownx){
   this.msg_obj = msg_objx;
   this.msg_link = msg_linkx;
   this.levelsDown = levelsDownx;
}



function SelectionListRec(){
  this.selectionListName = "";
  this.typeDef_ztic = "";
  this.typeDef_code = "";
  this.typeVal_ztic = "";
  this.typeVal_code = "";
  this.objectSet_ztic = "";
  this.objectSet_code = "";
  
  this.composite_html_id   = "";         // 20230323
  this.composite_html_input_val = "";    // 20230323
}



function TypeDefAllowedValueSetRec(){
  this.typeDef_ztic = "";
  this.typeDef_code = "";
  this.objectSet_ztic = "";
  this.objectSet_code = "";
}




function TypeValueBasedTemplateRuleRec(){
  this.TVBTR_ztic = "";
  this.TVBTR_code = "";
  this.template_ztic = "";
  this.template_code = "";
  this.objectSet_ztic = "";
  this.objectSet_code = "";
  this.objectSet_idx = 9999999;
  this.typeDef_ztic = "";
  this.typeDef_code = "";
  this.typeVal_ztic = "";
  this.typeVal_code = "";
  this.ruleTriggered = false;
}




module.exports = ZtSession;
