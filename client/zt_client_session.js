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
             var new_parent_templ_idx = new_templ_idx - 1;   // 20201104
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
 if((this.maint_mode == "update" && msg_objx.levelsDown == 1 ) || this.maint_mode != "update"){  // 20200911  del 20201030
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

}  // endif



  

}  // end addMessageLinkToSession





getHtmlForTemplate(templ_zticx, templ_codex, maint_modex, maint_formatx){    // 20200724
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
 
  html_str = this.getHtmlForTemplate_Generic(templ_zticx, templ_codex, maint_modex);

   } // endif   


 
  return html_str;
}  // end of getHtmlForTemplate(templ_zticx, templ_codex)





getHtmlForTemplate_Generic(templ_zticx, templ_codex, maint_modex){    //20200604

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
 //console.log("this.template_AR.length: "+this.template_AR.length);
 for(var i = 0; i < this.template_AR.length; i++){
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


//console.log("20231212a this.template_AR[templ_idx].object_AR.length: "+this.template_AR[templ_idx].object_AR.length);
//console.log("20231212b this.template_AR[templ_idx].object_AR[0].objZTIC - objCodeAssigned - objCodeTemp: "+this.template_AR[templ_idx].object_AR[0].objZTIC+" - "+this.template_AR[templ_idx].object_AR[0].objCodeAssigned+" - "+this.template_AR[templ_idx].object_AR[0].objCodeTemp);
if(this.template_AR[templ_idx].object_AR.length > 1){
   this.setRelevantTVBTRstatus(this.template_AR[templ_idx].object_AR[1]);  // 20231211 REVISIT why hard-coded index 1?
} // endif length > 1

var html_str = "";
var OEscreenElem_AR = [];
var obj_template_desc = "";   
 

 html_str =  "<!DOCTYPE html><html><head>";                                   
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




 var objxx = this.template_AR[templ_idx].object_AR[0];   // 20200608 - use first object for template  REVISIT
 html_str = html_str + " var OK_ztic = " + this.template_AR[templ_idx].objKindZTIC      + "; ";   
 html_str = html_str + " var OK_code = " + this.template_AR[templ_idx].objKindCode      + "; ";   
 html_str = html_str + " var obj_ztic = " + this.template_AR[templ_idx].object_AR[0].objZTIC      + "; ";    //   use first object for template  REVISIT
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

html_str = html_str + "var jqxhr = $.post('"+urlxx+"', {OK_ztic: OK_ztic, OK_code: OK_code, obj_ztic: obj_ztic, obj_code: obj_code, OEscrnElem_AR: OEscrnElem_ARs, obj_template_desc: obj_template_desc, language: language, session: sess1_str, templ_idx: templ_idx, TargetNS: TargetNS }, function(data){";   // 20240827

 html_str = html_str + "console.log(data); ";
       //open new window popup
 //html_str = html_str + "var newWindow = window.open('', 'new window', width=200, height=100);";
 html_str = html_str + "var newWindow = window.open('', '_self');";
       //write the data to the document of the newWindow
 html_str = html_str +  "newWindow.document.write(data);";
  //alert( "success" );
 html_str = html_str + "}) ";  


 

 html_str = html_str +       "}); ";  
 html_str = html_str +     "}); ";   
 html_str = html_str +   "</script>";
 html_str = html_str + "</head>";

 html_str = html_str + "<body>";

 // start 20200920  -- add top bar to html
 
var top_obj_dsi  =  this.getNamespaceForZTIC(this.template_AR[this.top_templ_idx].object_AR[0].objZTIC);
var top_obj_code =  this.template_AR[this.top_templ_idx].object_AR[0].objCodeTemp; 

 html_str = html_str + "<table style='border:solid 1px;'>";

 html_str = html_str + "<tr>";
 html_str = html_str + "<td><strong>";
 html_str = html_str + "Target DSI: "+"</strong>"+this.TargetNS;
 html_str = html_str + "</td>";

 html_str = html_str + "<td><strong>";
 html_str = html_str + "Top Obj DSI: "+"</strong>"+top_obj_dsi;
 html_str = html_str + "</td>";

 html_str = html_str + "<td><strong>";
 html_str = html_str + "Top Obj Code: "+"</strong>"+top_obj_code;

 html_str = html_str + "</td>";


 html_str = html_str + "</tr>";

 html_str = html_str + "</table>";
 // end 20200920


  html_str = html_str +   "<h1>"+this.template_AR[templ_idx].templDesc.toString().trim() +"</h1>";   // 20200604



 html_str = html_str +   "<br />";

 html_str = html_str +   "<br />";                   // 20230321
 html_str = html_str +   "<br />";                   // 20230321
 html_str = html_str + "<H2>Object Element Values: </H2>";     // 20230321

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
html_str = html_str + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXT\" id='"+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>";}
   else{
 //html_str = html_str + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXTAREA\"  id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>"; 
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>"+html_labelx+"</td></tr>";

html_str = html_str + "<tr><td><textarea name=\"comments\" id='"+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_id+ "' cols='80' rows='20'  value='"+ this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"'" +">"+this.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val+"</textarea></td></tr>";

 //<textarea name="comments" id="myTextarea" cols="40" rows="6">Suppose we have this text!</textarea>  (example)

}  // endif 
 

   
     }  //endfor loop OE_val_AR
  } // endfor    loop object_AR


let attributeGroup = "ObjectElement"
html_str = html_str + this.TVBTR_getHtmlForTypeValueBasedTemplateRules(attributeGroup);


var type_value_for_date;  // 20231028

 html_str = html_str + "</table>";

 html_str = html_str +   "<br />";                   // 20230321
 html_str = html_str +   "<br />";                   // 20230321
 html_str = html_str + "<H2>Type Values: </H2>";     // 20230321

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

              // start 20231028
              if(type_value_for_date){
           //const ns_substr =  this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_ns_html_input_val.substr(22,3);  // zinfinitree.com/time_gregorian_2020s_tz_est     (del) 20250606
           const ns_substr =  this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_ns_html_input_val.substr(31,3);  // zinfinitree.com/time_gregorian_2020s_tz_est      // 20250606
           const datestr = ns_substr+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_input_val.substr(0,1)+"-"+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_input_val.substr(1,2)+"-"+this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_input_val.substr(3,5);
           console.log("20250606b datestr: "+datestr);
           const html_str_temp = "<td><input type=\"date\"  id='"+ this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].dateStr_html_id+ "'  value='"+datestr+"'"  +"</td>";  // 20231107
          // console.log("html_str_temp: "+html_str_temp);
            html_str = html_str + html_str_temp;
               // end 20231028
              }  // endif type_value_for_date

              //if(!found_allowed_val_set){  (del) 20231028
              if(!type_value_for_date){
              if(!found_allowed_val_set){
    // end 20230328              
          
                html_str = html_str + "<td><input list=\"ns_list\" name=\"ztic_ns\" id='"+ this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_html_id+ "' size='"+html_ns_sizex+"' value='"+ this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].ztic_ns_html_input_val+"'" +"</td>"; // (del) 20231027


                html_str = html_str + ns_datalist;

                html_str = html_str + "<td> <input type=\"TEXT\" id='"+ this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_id+ "' size='"+html_sizex+"' value='"+ this.template_AR[templ_idx].object_AR[g].typeVal_AR[f].code_html_input_val+"'" +"</td>" +"</tr>";
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
// end 20200817
//console.log("20230328c html_str for type values: "+html_str);

html_str = html_str +   "<br />";                   // 20230321
html_str = html_str +   "<br />";                   // 20230321
html_str = html_str + "<H2>Links: </H2>";     // 20230321


 html_str = html_str + "<table>";
//console.log("20200617 this.template_AR[templ_idx].childTempl_idx_AR.length: "+this.template_AR[templ_idx].childTempl_idx_AR.length);
for(var i = 0; i < this.template_AR[templ_idx].childTempl_idx_AR.length; i++){
// console.log("20200911 %% this.maint_mode - this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templLevelsDown: "+this.maint_mode + " - "+this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templLevelsDown);
 if((this.maint_mode != "display" && this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templLevelsDown == 1 ) || this.maint_mode == "display"){  // 20201104
     //html_str = html_str + "<tr><td><h2>"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templDesc  +"</h2></td></tr>";   // (del) 20230321
     const templDescx = this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templDesc;
     for(var j = 0; j < this.template_AR[templ_idx].linkType_AR.length; j++){    // 20200618
        if( this.template_AR[templ_idx].linkType_AR[j].linkType_ztic == this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_ztic &&
            this.template_AR[templ_idx].linkType_AR[j].linkType_code == this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].linkableObjectLinkType_code ) {
               //html_str = html_str + "<tr><td><h3>"+ this.template_AR[templ_idx].linkType_AR[j].linkType_desc  +"</h3></td></tr>";  //(del) 20230321
               html_str = html_str + "<tr><td><strong>"+ this.template_AR[templ_idx].linkType_AR[j].linkType_desc  +" / Template: "+templDescx+"</strong></td></tr>";  // 20230321


              // html_str = html_str +   "<br />";   // 20200820
          

        }  // endif
                                                                
     }  // endfor  // end 20200618


 for(var j = 0; j < this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
    var html_ns_sizex = 30;
    var html_code_sizex = 5;
   if(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].newLinkToExistingObject){  // 20200821
    html_str = html_str + "<tr><td>Create Link to Existing Object NS-Code-Status-Value </td><td><input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_id+ "' size='"+html_ns_sizex+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objZTIC_ns_html_input_val+"'"+"</td><td><input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_id+ "' size='"+html_code_sizex+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned_html_input_val+"'"+"</td><td><input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id+ "' size='"+"5"+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_input_val+"'"+ "</td><td><input type=\"TEXT\" id='" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id+ "' size='"+"10"+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_input_val+"'"+"</td></tr>";

    html_str = html_str +   "<br />";
   } // endif 20200821


   if(!(this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].newLinkToExistingObject)){   // 20210415
   html_str = html_str + "<tr><td>===== Code: "+this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].objCodeAssigned+"</td><td><input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_id+ "' size='"+"5"+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkStatus_html_input_val+"'"+ "</td><td><input type=\"TEXT\" id='" + this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_id+ "' size='"+"10"+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].linkValue_html_input_val+"'"+"</td></tr>"; 
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
html_str = html_str + "<tr><td>"+ html_labelx+"</td><td> <input type=\"TEXT\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' size='"+html_sizex+"' value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +"></td></tr>";}
   else{
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>"+html_labelx+"</td></tr>";

html_str = html_str + "<tr><td><textarea name=\"comments\" id='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_id+ "' cols='80' rows='20'  value='"+ this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"'" +">"+this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val+"</textarea></td></tr>";


}  // endif    


   } //endfor loop through OE_val_AR


  } // endfor loop through object_AR
 } // endif if((this.maint_mode != "display" && this.template_AR[this.template_AR[templ_idx].childTempl_idx_AR[i]].templLevelsDown == 1 ) || this.maint_mode == "display") 20201104
} // endfor loop through childTempl_idx_AR
 html_str = html_str + "</table>";


  html_str = html_str + "<br /> <br /><br /><input type='button' id='submit' value='Submit'><br /><br /> <br /><br />";

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
