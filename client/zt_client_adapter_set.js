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


class  ZtAdapterSet{

//class DsApp {     //20200601

    constructor(idx, ZTICNS_ARx, adapterSet_zticx, adapterSet_codex, TargetNSx, langx, user_namex) {

//  (sess_idx, clientZTICDomain.ZTICNS_AR, language, TargetNS);
//   constructor(idx, ZTICNS_ARx, langx, TargetNSx) {


      this.id              = idx;
      this.ZTICNS_AR       = ZTICNS_ARx;

      this.adapterSet_ztic        = app_zticx;
      this.adapterSet_code        = app_codex;
      this.TargetNS        = TargetNSx;    
      this.language        = langx;
      //this.user_name       = user_namex;
      //this.app_title       = "";
      this.adapter_AR      = [];  
      

      
  } // end of constructor


// start 20220727

processMessageForResponseAdapter(adapter_ns, adapter_code){


}  // end of processMessageForResponseAdapter()



setAdapterValues(){


}  // end of setAdapterValues()

// end 20220727


//{TargetNS: TargetNS, language: language, user_name: user_name, user_password: user_password, AppNS: AppNS, app_code: app_code, InitPageNS: InitPageNS, init_page_code: init_page_code }

// start 20220608

// copied from setValuesFromInitialMessage

setValuesFromInitialMessageForApp(msg, obj_zticx, obj_codex){      // 20200813

var app_wa = require('./zt_client_app_workarea');

  console.log("##^ 20211029 start of setValueFromInitialMessageForApp in zt_client_app");
  for (var j = 0; j < msg.queryResponseObjectWA_AR.length; j++) {
   console.log("##^ 20211029 msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length: " +msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length);              
     for (var t = 0; t < msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length; t++) {                              
 console.log("msg.queryResponseObjectWA_AR[j].objectElement_idx_AR[t]:"+msg.queryResponseObjectWA_AR[j].objectElement_idx_AR[t]);                        
     }                           
  } // end of loop through queryResponseObjectWA_AR



console.log("msg.queryResponseSetMemberWA_AR.length: "+msg.queryResponseSetMemberWA_AR.length);
 for (var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++) {
   for (var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++) {

     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];
     for (var j = 0; j < objx.objectElement_idx_AR.length; j++) {
 /////       console.log("  ");
 /////       console.log("##^ 20211029 objx.objectKindZTIC: "+objx.objectKindZTIC);
 /////       console.log("##^ 20211029 objx.objectKindCode: "+objx.objectKindCode);
 /////       console.log("##^ 20211029 objx.objectZTIC: "+objx.objectZTIC);
 /////       console.log("##^ 20211029 objx.objectCode: "+objx.objectCode);

 //////       console.log("##^ 20211029 objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
 /////       console.log("##^ 20211029 objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
 /////       console.log("##^ j: "+j);
 /////       console.log("##^ 20211029 objx.objectElement_idx_AR[j]: "+ objx.objectElement_idx_AR[j]);
 /////       console.log("  ");
     } // endfor                                
   } // endfor
 }  // endfor

// end 20211029



// 20200602 begin copy from getOEscreenElem_AR() in zt_client_maintain_object_utility.js

console.log("20200613 running setValuesFromInitialMessageForApp()  obj_zticx - obj_codex: "+obj_zticx+ " - " + obj_codex);

var OEscreenElem_AR = [];
var DEvalue_AR      = [];

//var T2_OEscreenElem_AR = [];   //20200528
//var T2_DEvalue_AR      = [];   //20200528

console.log("20200602 this.ZTICNS_AR.length: "+this.ZTICNS_AR.length);
var base_ztic;
var app_def_ztic;

for(var i = 0; i < this.ZTICNS_AR.length; i++){
  //console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor





for(var i = 0; i < this.ZTICNS_AR.length; i++){
 // console.log("this.ZTICNS_AR[i]: "+this.ZTICNS_AR[i]);
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "zinfinitree.com/app"){
       app_def_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor


console.log("20200129 this.msg.queryResponseSetMemberWA_AR.length: "+msg.queryResponseSetMemberWA_AR.length);




//console.log(" start of loop at object values 20200407");
for(var h = 0; h < msg.queryResponseSetMemberWA_AR.length; h++){
if(msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){
   console.log("msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length: "+msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length);
   for(var k = 0; k < msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
  // var i = msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c  (del) 20200630
  console.log("Object: "+ msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+msg.queryResponseObjectWA_AR[i].objectCode);
     var objx = msg.queryResponseObjectWA_AR[msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("20200929 ^^^.. objx.id - objx.parentId - objx.levelsDown: "+objx.objectKindZTIC+"/"+objx.objectKindCode+"/"+objx.objectZTIC+"/"+objx.objectCode+"  = "+objx.id + " - " + objx.parentId + " - " + objx.levelsDown);




if(objx.objectKindZTIC == app_def_ztic && objx.objectKindCode == 1){  // object is an app

// //console.log("Object Element values");
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);

     // check if object element is for app title
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3){  
          this.app_title = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
       
          
      }  // endif  object element for app title
// //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

    //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
 //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
       }

// //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
/////      var AddMessageLinkToSession_wa_rec = new AddMessageLinkToSessionWorkAreaRec(objx, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]], objx.levelsDown);
/////      AddMessageLinkToSessionWorkAreaRec_AR.push(AddMessageLinkToSession_wa_rec);
// //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
      }
     } // endif object is an app



if(objx.objectKindZTIC == app_def_ztic && objx.objectKindCode == 2){  // object is an app page

    var new_app_page = new app_wa.AppPage(objx.objectZTIC, objx.objectCode);
    new_app_page.id        = objx.id;
    new_app_page.parent_id = objx.parentId;

    var app_page_idx = this.appPage_AR.push(new_app_page) -1;



// //console.log("Object Element values");
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);

     // check if object element is for app title
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 4){  
        this.appPage_AR[app_page_idx].desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
       
          
      }  // endif  object element for app title
// //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

    //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
 //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
       }

// //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
/////      var AddMessageLinkToSession_wa_rec = new AddMessageLinkToSessionWorkAreaRec(objx, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]], objx.levelsDown);
/////      AddMessageLinkToSessionWorkAreaRec_AR.push(AddMessageLinkToSession_wa_rec);
// //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
      }
     } // endif object is an app page



if(objx.objectKindZTIC == app_def_ztic && objx.objectKindCode == 3){  // object is an menu

    var new_menu = new app_wa.Menu(objx.objectZTIC, objx.objectCode);
    new_menu.id        = objx.id;
    new_menu.parent_id = objx.parentId;
    var page_idx;
    
    for(var j = 0; j < this.appPage_AR.length; j++){
      if(this.appPage_AR[j].id == new_menu.parent_id){
         page_idx = j;
      }  // endif

    } // endfor

    var menu_idx = this.appPage_AR[page_idx].menu_AR.push(new_menu) -1;

// add root menu option 20220622
       var root_menu_option = new app_wa.MenuOption(0, 0);
       root_menu_option.linkValue = 0;
       root_menu_option.levelsDown = 0;
       root_menu_option.menu_idx = menu_idx;
       root_menu_option.parent_idx = 0;
    
       var menu_option_idx = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR.push(root_menu_option) -1;

// end add root menu option 20220622

// //console.log("Object Element values");
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);

     // check if object element is for menu description
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 6){  
          this.appPage_AR[page_idx].menu_AR[menu_idx].menu_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;

     } // endif object element is menu desc
     // check if object element is for menu label
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 7){

          this.appPage_AR[page_idx].menu_AR[menu_idx].menu_label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
      } // endif object element is menu label
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
       
          
    
// //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

    //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
 //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
       }

// //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
/////      var AddMessageLinkToSession_wa_rec = new AddMessageLinkToSessionWorkAreaRec(objx, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]], objx.levelsDown);
/////      AddMessageLinkToSessionWorkAreaRec_AR.push(AddMessageLinkToSession_wa_rec);
// //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
       var new_menu_option = new app_wa.MenuOption(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
       new_menu_option.linkValue = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkValue;
       new_menu_option.levelsDown = 1;
       new_menu_option.menu_idx = menu_idx;
       new_menu_option.parent_idx = 0;
       
       var menu_option_idx = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR.push(new_menu_option) -1;
       this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[0].childMenuOption_idx_AR.push(menu_option_idx);  // 20220622
       //new_menu_option.id        = objx.id;
       //new_menu.parent_id = objx.parentId;
 
      }
     } // endif object is a menu


if(objx.objectKindZTIC == app_def_ztic && objx.objectKindCode == 4){  // object is a menu option

console.log("&&& 20220613 object is a menu option");
var page_idx;
var menu_idx;
var menu_option_idx;

console.log("&&& 20220613 objx.objectZTIC - objx.objetCode: "+objx.objectZTIC+" - "+objx.objectCode);
 for(var w = 0; w < this.appPage_AR.length; w++){   
    //html_str = html_str + "<h2>"+this.appPage_AR[i].desc+"</h2>";
    //html_str = html_str + "<h3>"+this.appPage_AR[i].id+","+this.appPage_AR[i].parent_id+"</h3>";
    for(var x = 0; x < this.appPage_AR[w].menu_AR.length; x++){  
      // html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_desc+"</h4>"; 
      // html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_label+"</h4>";
       for(var y = 0; y < this.appPage_AR[w].menu_AR[x].menu_option_AR.length; y++){ 
         console.log("   this.appPage_AR[w].menu_AR[x].menu_option_AR[y].menu_option_ztic: "+this.appPage_AR[w].menu_AR[x].menu_option_AR[y].menu_option_ztic);
         console.log("   this.appPage_AR[w].menu_AR[x].menu_option_AR[y].menu_option_code; "+this.appPage_AR[w].menu_AR[x].menu_option_AR[y].menu_option_code);

         if(this.appPage_AR[w].menu_AR[x].menu_option_AR[y].menu_option_ztic == objx.objectZTIC && this.appPage_AR[w].menu_AR[x].menu_option_AR[y].menu_option_code == objx.objectCode){
            this.appPage_AR[w].menu_AR[x].menu_option_AR[y].id = objx.id;
            this.appPage_AR[w].menu_AR[x].menu_option_AR[y].parent_id = objx.parentId;
            if(this.appPage_AR[w].menu_AR[x].menu_option_AR[y].id == objx.id){
                page_idx = w;
                menu_idx = x;
                menu_option_idx = y;
                console.log("20220612 found menu option for objx.objectCode: "+objx.objectCode);
     
            } // endif

        //  html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].menu_option_ztic+"</h4>";
        //  html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].menu_option_code+"</h4>";
         } //endif
       } // endfor  loop through menu_option_AR
    }  // endfor  loop through menu_AR

    //var menu_option_idx = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR.push

 }  // endfor loop through appPage_AR






// //console.log("Object Element values");
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);

     // check if object element is for menu option description
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 8){  
          this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].menu_option_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
     }  // endif  object element is for menu option description

     // check if object element is for menu option label
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 9){  
          this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].menu_option_label = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
     }  // endif  object element is for menu option label
        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
       
          
 
// //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

    //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
 //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
       }

// //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
/////      var AddMessageLinkToSession_wa_rec = new AddMessageLinkToSessionWorkAreaRec(objx, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]], objx.levelsDown);
/////      AddMessageLinkToSessionWorkAreaRec_AR.push(AddMessageLinkToSession_wa_rec);
// //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode)

// start 20220611
      if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 6){   // link type for menu option to menu option
        var new_menu_option = new app_wa.MenuOption(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
        new_menu_option.linkValue = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkValue;
        new_menu_option.parent_idx = menu_option_idx;
        new_menu_option.menu_idx = menu_idx;
        new_menu_option.levelsDown = objx.levelsDown - 1;
        var menu_sub_option_idx = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR.push(new_menu_option) -1;
        this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].childMenuOption_idx_AR.push(menu_sub_option_idx);
       } // endif link type code is 6
// end 20220611

// start 20220613
      if(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode == 5){   // link type for menu option to app action
        var new_app_action = new app_wa.AppAction(msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
        new_app_action.linkValue = msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkValue;
        new_app_action.parent_idx = menu_option_idx;
        new_app_action.menu_idx = menu_idx;
        var menu_app_action_idx = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR.push(new_app_action) -1;
        //this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR.push(menu_app_action_idx);
       } // endif link type code is 5
// end 20220613

       //new_menu_option.id        = objx.id;
       //new_menu.parent_id = objx.parentId;
 
       }  // endfor
  //    console.log("completed object is a menu option");
     } // endif object is an menu option


if(objx.objectKindZTIC == app_def_ztic && objx.objectKindCode == 6){  // object is an application action

// start 20220613
console.log("&&& 20220613 object is a application action");
var page_idx;
var menu_idx;
var menu_option_idx;
var app_action_idx;

console.log("&&& app action 20220613 objx.objectZTIC - objx.objetCode: "+objx.objectZTIC+" - "+objx.objectCode);
 for(var w = 0; w < this.appPage_AR.length; w++){   
    //html_str = html_str + "<h2>"+this.appPage_AR[i].desc+"</h2>";
    //html_str = html_str + "<h3>"+this.appPage_AR[i].id+","+this.appPage_AR[i].parent_id+"</h3>";
    for(var x = 0; x < this.appPage_AR[w].menu_AR.length; x++){  
      // html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_desc+"</h4>"; 
      // html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_label+"</h4>";
       for(var y = 0; y < this.appPage_AR[w].menu_AR[x].menu_option_AR.length; y++){ 
        console.log("this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR.length: "+this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR.length);   
         for(var z = 0; z < this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR.length; z++){ 
     console.log("   this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR[z].appAction_ztic: "+this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR[z].appAction_ztic);
     console.log("   this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR[z].appAction_code: "+this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR[z].appAction_code);

 if(this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR[z].appAction_ztic == objx.objectZTIC && this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR[z].appAction_code == objx.objectCode){
            this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR[z].id = objx.id;
            this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR[z].parent_id = objx.parentId;
            if(this.appPage_AR[w].menu_AR[x].menu_option_AR[y].appAction_AR[z].id == objx.id){
                page_idx = w;
                menu_idx = x;
                menu_option_idx = y;
                app_action_idx = z;
                console.log("&&& 20220612 found app action for objx.objectCode: "+objx.objectCode);
     
            } // endif

         } //endif
        } // endfor loop through appAction_AR
       } // endfor  loop through menu_option_AR
    }  // endfor  loop through menu_AR

    //var menu_option_idx = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR.push

 }  // endfor loop through appPage_AR

// end 20220613

// //console.log("Object Element values");
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
  //    console.log("20200702 before addMessageOEval...objx.objectKindZTIC, Code: "+objx.objectKindZTIC+" - "+objx.objectKindCode);

     // check if object element is for app action desc
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 11){  
       this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_desc = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
      }  // endif  object element for app action desc

     // check if object element is for app action template namespace
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 13){  
       this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_object_templ_ns = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
      }  // endif  object element for app action template namespace

     // check if object element is for app action template code
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 14){  
       this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_object_templ_code = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
      }  // endif  object element for app action template code


     // check if object element is for app action appAction_maint_mode
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 15){  
       this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_maint_mode = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
      }  // endif  object element for app action appAction_maint_mode


     // check if object element is for app action appAction_format
     if(msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == app_def_ztic && msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 16){  
       this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_format = msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
      }  // endif  object element for app action appAction_format






        
         // console.log("20200604 msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_ztic);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC);
         // console.log("   this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code: "+this.template_AR[this.top_templ_idx].OE_def_idx_AR[m].OE_code);
         // console.log("   msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode: "+msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode);
       
          

// //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// //console.log("Type values");

   //  console.log("* * 20210302b objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
   //  console.log("* * 20210302b objx.type_idx_AR.length: "+objx.type_idx_AR.length);
     for(var j = 0; j < objx.type_idx_AR.length; j++){

    //  console.log("* * 20210302 objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);              // 20210302
     
 //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
 //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
      this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_type_ztic = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC;
      this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menu_option_idx].appAction_AR[app_action_idx].appAction_type_code = msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode
      }

// //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
/////      var AddMessageLinkToSession_wa_rec = new AddMessageLinkToSessionWorkAreaRec(objx, msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]], objx.levelsDown);
/////      AddMessageLinkToSessionWorkAreaRec_AR.push(AddMessageLinkToSession_wa_rec);
// //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
      }
     } // endif object is an application action






    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k
 }  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjectQset)





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
} // endif 20200826
 








}  /// end of setValuesFromInitialMessageForApp(msg)




// end 20220608












getHtmlForApp(){


// NOTE for now assume app has only one page

var app_wa = require('./zt_client_app_workarea');

var html_str = "";
html_str = html_str + "<html>";
// start 20220614

html_str = html_str + "<head>";
html_str = html_str + "\n";   // 20220716
// start 20220712 for pop-up for values
html_str = html_str + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
html_str = html_str + "<style>";
html_str = html_str + "body {font-family: Arial, Helvetica, sans-serif;}";
html_str = html_str + "* {box-sizing: border-box;}";

/* Button used to open the contact form - fixed at the bottom of the page */
html_str = html_str + ".open-button {";
html_str = html_str + " background-color: #555;";
html_str = html_str + " color: white;";
html_str = html_str + " padding: 16px 20px;";
html_str = html_str + " border: none;";
html_str = html_str + " cursor: pointer;";
html_str = html_str + "  opacity: 0.8;";
html_str = html_str + " position: fixed;";
html_str = html_str + "  bottom: 23px;";
html_str = html_str + "  right: 28px;";
html_str = html_str + "  width: 280px;";
html_str = html_str + "}";

/* The popup form - hidden by default */
html_str = html_str + ".form-popup {";
html_str = html_str + "  display: none;";
html_str = html_str + "  position: fixed;";
html_str = html_str + "  bottom: 0;";
html_str = html_str + "  right: 15px;";
html_str = html_str + "  border: 3px solid #f1f1f1;";
html_str = html_str + "  z-index: 9;";
html_str = html_str + "}";

/* Add styles to the form container */
html_str = html_str + ".form-container {";
html_str = html_str + "  max-width: 300px;";
html_str = html_str + "  padding: 10px;";
html_str = html_str + "  background-color: white;";
html_str = html_str + "}";

/* Full-width input fields */
html_str = html_str + ".form-container input[type=text], .form-container input[type=password] {";
html_str = html_str + "  width: 100%;";
html_str = html_str + " padding: 15px;";
html_str = html_str + "  margin: 5px 0 22px 0;";
html_str = html_str + "  border: none;";
html_str = html_str + "  background: #f1f1f1;";
html_str = html_str + "}";

/* When the inputs get focus, do something */
html_str = html_str + ".form-container input[type=text]:focus, .form-container input[type=password]:focus {";
html_str = html_str + "  background-color: #ddd;";
html_str = html_str + "  outline: none;";
html_str = html_str + "}";

/* Set a style for the submit/login button */
html_str = html_str + ".form-container .btn {";
html_str = html_str + "  background-color: #04AA6D;";
html_str = html_str + "  color: white;";
html_str = html_str + "  padding: 16px 20px;";
html_str = html_str + "  border: none;";
html_str = html_str + "  cursor: pointer;";
html_str = html_str + "  width: 100%;";
html_str = html_str + "  margin-bottom:10px;";
html_str = html_str + "  opacity: 0.8;";
html_str = html_str + "}";

/* Add a red background color to the cancel button */
html_str = html_str + ".form-container .cancel {";
html_str = html_str + "  background-color: red;";
html_str = html_str + "}";

/* Add some hover effects to buttons */
html_str = html_str + ".form-container .btn:hover, .open-button:hover {";
html_str = html_str + "  opacity: 1;";
html_str = html_str + "}";
html_str = html_str + "</style>";

// end 20220712 for pop-up for values




html_str = html_str + "\n";


html_str = html_str +     "<script src=\"//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js\">  </script>";
html_str = html_str +     "<script>";
html_str = html_str +       "$(document).ready(function(){";
html_str = html_str +         "var file_name, obj_template;"
html_str = html_str +         "var status_sel, dsi, file_num;";
html_str = html_str +         "var test_AR = [];";
html_str = html_str +         "var maint_mode;";
html_str = html_str +         "var maint_format;";
html_str = html_str +         "var TargetNS;";                                 // 20220703
html_str = html_str +         "var language;";                                 // 20220703
html_str = html_str +         "var obj_templ_ztic;";                           // 20220703
html_str = html_str +         "var obj_templ_code;";                           // 20220703
html_str = html_str +         "var obj_ztic;";                                 // 20220703
html_str = html_str +         "var obj_code;";                                 // 20220703
html_str = html_str +         "var app_action_type_ztic;";                     // 20220718
html_str = html_str +         "var app_action_type_code;";                     // 20220718

// start 20220716

//html_str = html_str +         "$.maintainObject2 = function() {";
//html_str = html_str +         "function maintainObject2() { ";  
//html_str = html_str +         "    alert(\'lol\');";  
//html_str = html_str +         "  }";  
// end 20220716

html_str = html_str +         "function test_val(html_idx, valuex) {";
html_str = html_str +               "this.html_id  = html_idx;";
html_str = html_str +               "this.value    = valuex;  }";

//  start 20220715 for update and display
html_str = html_str +         "$(\"#submit\").click(function(){";    
html_str = html_str +   "alert(\"44332211\");";


html_str = html_str +         "});";  // end of submit

//  end 20220715 for update and display
html_str = html_str + "\n";



html_str = html_str +           "$(\"button\").click(function(){"             // 20220703
//html_str = html_str +           "TargetNS=$('.ddlTargetNS').val();";
html_str = html_str   +         "TargetNS=\"abc.com/test1\";";
html_str = html_str   +         "language=\"1\";";
html_str = html_str +           "\n";





html_str = html_str +             "var value_AR = JSON.parse($(this).attr('value'));";  // 20220706
html_str = html_str +             "obj_templ_ztic = value_AR[0];";                    // 20220706
//html_str = html_str +           "obj_templ_ztic = $(this).attr('value');";   (del) 20220706
html_str = html_str +             "obj_templ_code = value_AR[1];";
//html_str = html_str +           "obj_templ_code = \"1\";";
html_str = html_str +           "maint_mode = value_AR[2];";
html_str = html_str +           "maint_format = value_AR[3];";
html_str = html_str +           "app_action_type_code = value_AR[5];";         // 20220718
html_str = html_str +           "obj_ztic = \"abc.com/test1\";";
html_str = html_str +           "obj_code = \"\";";
html_str = html_str +           "\n";
// start 20220717 menu option action to open new app
html_str = html_str +         "var user_name=\"xx\";";
html_str = html_str +         "var user_password=\"yy\";";
html_str = html_str +         "var  AppNS=\"abc.com/test1\";";
html_str = html_str +         "var  app_code=value_AR[1];";
html_str = html_str +         "var  InitPageNS=\"\";";
html_str = html_str +         "var  init_page_code=\"\";";
html_str = html_str +           "\n";

html_str = html_str +             "if(app_action_type_code == 3){";   // to invoke another app
html_str = html_str +   "var jqxhr2 = $.post(\"http://localhost:3000/ds2/client/app_page_display\",{TargetNS: TargetNS, language: language, user_name: user_name, user_password: user_password, AppNS: AppNS, app_code: app_code, InitPageNS: InitPageNS, init_page_code: init_page_code }, function(data){";
html_str = html_str +           "\n"; 
html_str = html_str +           "var id = \"12345\";";
html_str = html_str +           "sessionStorage.setItem(\"sent\", id);"; 
html_str = html_str +           " var newWindow = window.open(\"http://localhost:3000/ds2/ds2_maintain_object_submit\", \"_blank\");";                 
html_str = html_str +           "\n";
html_str = html_str +           "})";  // end of post
html_str = html_str +           "\n";
html_str = html_str +             "}";   // endif app_action_type_code == 3
// end 20220717
html_str = html_str +           "\n";

//html_str = html_str +           "maint_mode = document.querySelector('input[name = \"maint_mode\"]:checked').value;";
//html_str = html_str +           "maint_format = document.querySelector('input[name = \"maint_format\"]:checked').value;";
//html_str = html_str +           "maint_mode = value_AR[2];";
//html_str = html_str +           "maint_mode = \"create\";";                   // 20220703
//html_str = html_str +           "maint_format = value_AR[3];";
//html_str = html_str +           "app_action_type_code = value_AR[5];";         // 20220718 
html_str = html_str +           "if(maint_mode == \"update\"){";
html_str = html_str +             "obj_ztic = document.getElementById('ns_1').value;";
html_str = html_str +             "obj_code = document.getElementById('code_1').value;";
//html_str = html_str +             "document.getElementById(\"ns_1\").setAttribute('value',\"\");";  // 20220716b
html_str = html_str +             "document.getElementById(\"code_1\").setAttribute('value',\"\");";  // 20220716b
html_str = html_str +            "}";  // endf maint_mode == update
html_str = html_str +           "\n";
//html_str = html_str +           "maint_format = \"generic\";";                // 20220703

//html_str = html_str +           "var tv1 = new test_val(\"VAL1\",obj_templ_ztic);";
//html_str = html_str +           "var tv2 = new test_val(\"VAL2\",obj_code);";



//html_str = html_str +           "test_AR.length = 0;";
//html_str = html_str +           "test_AR.push(tv1); test_AR.push(tv2);";
html_str = html_str +           "var test_ARs = JSON.stringify(test_AR);";          
html_str = html_str +           "\n";
html_str = html_str +           "if((maint_mode == \"create\" || obj_code.toString().trim() != \"\") && app_action_type_code != 3){";    // 20220715

html_str = html_str +           "var jqxhr = $.post(\"http://localhost:3000/zt/client/maintain_object\",{TargetNS: TargetNS, language: language, status_sel: status_sel, obj_templ_ztic: obj_templ_ztic, obj_templ_code: obj_templ_code, obj_ztic: obj_ztic, obj_code: obj_code, test_AR: test_ARs, maint_mode: maint_mode, maint_format: maint_format }, function(data){"; 
html_str = html_str +         "var id = \"12345\";";
html_str = html_str +        "sessionStorage.setItem(\"sent\", id);";  
html_str = html_str +   "var newWindow = window.open(\"http://localhost:3000/zt/maintain_object_submit\", \"_blank\");";                 
html_str = html_str +           "\n";
 
html_str = html_str + "})";  // end of post 
html_str = html_str + "\n";
html_str = html_str +   "}";        // endif start of else 20220716a
html_str = html_str +   "else ";
html_str = html_str +   "{";                 // 20220716a
html_str = html_str +     " openForm();";    // 20220716a
html_str = html_str +           "}";    //endif maint_mode == create or obj_code is blank

html_str = html_str +         "});";
html_str = html_str +       "});";
html_str = html_str +     "</script>";
html_str = html_str + "\n";
// end copy from ds2_maintain_object.html   20220702

html_str = html_str + "<meta charset=\"utf-8\">"
html_str = html_str + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">";
html_str = html_str + "<meta name=\"keywords\" content=\"htmlcss bootstrap, multi level menu, submenu, treeview nav menu examples\" />";
html_str = html_str + "<meta name=\"description\" content=\"Bootstrap 5 navbar multilevel treeview examples for any type of project, Bootstrap 5\" />";  

// //<title>Demo - Bootstrap 5 multilevel dropdown submenu sample</title>

html_str = html_str + "<script type=\"text/javascript\">";
html_str = html_str + "function maintainObject(value){";
html_str = html_str + "$(document).maintainObject2();";
html_str = html_str +   "var ns = document.getElementById('ns_1').value;";
html_str = html_str +   "var code = document.getElementById('code_1').value;";
html_str = html_str +   "var all_combined = ns + code + value.toString() + \"8888\";";
html_str = html_str + "\n";
//html_str = html_str +   "lol();";
//html_str = html_str +       "alert(value);";
html_str = html_str +   "alert(all_combined+\"9999\");";


html_str = html_str   +         "var TargetNS=\"abc.com/test1\";";
html_str = html_str   +         "var language=\"1\";";
html_str = html_str +           "var obj_templ_ztic = \"zinfinitree.com/address\";";
html_str = html_str +           "var obj_templ_code = \"1\";";
html_str = html_str +           "var maint_mode = \"update\";";
html_str = html_str +           "var maint_format = \"generic\";";
html_str = html_str +           "var obj_ztic = document.getElementById('ns_1').value;";
html_str = html_str +           "var obj_code = document.getElementById('code_1').value;";
html_str = html_str +           "var status_sel = \"\";";
html_str = html_str +           "var test_ARs = \"\";";



html_str = html_str + "\n";

html_str = html_str +  "}";   // end of function  
html_str = html_str + "</script>";
html_str = html_str + "\n";


// start 20220710  for pop-up for values
html_str = html_str + "<script>";
html_str = html_str + "function openForm() {";
html_str = html_str +   "document.getElementById(\"myForm\").style.display = \"block\";";
html_str = html_str + "}";

html_str = html_str + "function closeForm() {";
html_str = html_str +   "document.getElementById(\"myForm\").style.display = \"none\";";
html_str = html_str +  "}";
html_str = html_str + "</script>";
html_str = html_str + "\n";
// end 20220710  pop-up for values 


html_str = html_str + "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css\" rel=\"stylesheet\" crossorigin=\"anonymous\">";
html_str = html_str + "<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js\"crossorigin=\"anonymous\"></script>";

html_str = html_str + "<style type=\"text/css\">";

//  /* ============ desktop view ============ */
html_str = html_str + "@media all and (min-width: 992px) {";

html_str = html_str +	".dropdown-menu li{";
html_str = html_str +   "position: relative;";
html_str = html_str +	"}";
html_str = html_str +	".dropdown-menu .submenu{"; 
html_str = html_str +   "		display: none;";
html_str = html_str +   "		position: absolute;";
html_str = html_str +	"	left:100%; top:-7px;";
html_str = html_str +	"}";
html_str = html_str +	".dropdown-menu .submenu-left{"; 
html_str = html_str +	"	right:100%; left:auto;";
html_str = html_str +	"}";

html_str = html_str +	".dropdown-menu > li:hover{ background-color: #f1f1f1 }";
html_str = html_str +	".dropdown-menu > li:hover > .submenu{";
html_str = html_str +	"	display: block;";
html_str = html_str +	"}";
html_str = html_str +	"}";	
// /* ============ desktop view .end// ============ */
html_str = html_str + "\n";
// /* ============ small devices ============ */
html_str = html_str +  "@media (max-width: 991px) {";

html_str = html_str + ".dropdown-menu .dropdown-menu{";
html_str = html_str + "		margin-left:0.7rem; margin-right:0.7rem; margin-bottom: .5rem;";
html_str = html_str + "}";

html_str = html_str + "}";	
// /* ============ small devices .end// ============ */

html_str = html_str + "</style>";
html_str = html_str + "\n";
html_str = html_str + "<script type=\"text/javascript\">";
//  //	window.addEventListener("resize", function() {
//  //		"use strict"; window.location.reload(); 
//  //	});


html_str = html_str +	"document.addEventListener(\"DOMContentLoaded\", function(){";
html_str = html_str + "\n";        

    	/////// Prevent closing from click inside dropdown
html_str = html_str +	"document.querySelectorAll(\'.dropdown-menu\').forEach(function(element){";
html_str = html_str + 	"element.addEventListener(\'click\', function (e) {";
html_str = html_str +		  "e.stopPropagation();";
html_str = html_str +		"});";
html_str = html_str +		"})";

html_str = html_str + "\n";

	//	// make it as accordion for smaller screens
html_str = html_str +	"if (window.innerWidth < 992) {";
html_str = html_str + "\n";
	//		// close all inner dropdowns when parent is closed
html_str = html_str +	"document.querySelectorAll(\'.navbar .dropdown\').forEach(function(everydropdown){";
html_str = html_str +	"everydropdown.addEventListener(\'hidden.bs.dropdown\', function () {";
				// after dropdown is hidden, then find all submenus
html_str = html_str +				  "this.querySelectorAll(\'.submenu\').forEach(function(everysubmenu){";
					  	// hide every submenu as well
html_str = html_str +			  	"everysubmenu.style.display = \'none\';";
html_str = html_str +			  "});";
html_str = html_str +			"})";
html_str = html_str +		"});";
html_str = html_str + "\n";			
html_str = html_str +		"document.querySelectorAll(\'.dropdown-menu a\').forEach(function(element){";
html_str = html_str +		"element.addEventListener(\'click\', function (e) {";
		
html_str = html_str +		  	"let nextEl = this.nextElementSibling;";
html_str = html_str +		  	"if(nextEl && nextEl.classList.contains(\'submenu\')) {";	
				  		// prevent opening link if link needs to open dropdown
html_str = html_str +		  		"e.preventDefault();";
html_str = html_str +		  		"console.log(nextEl);";
html_str = html_str +		  		"if(nextEl.style.display == \'block\'){";
html_str = html_str +				"nextEl.style.display = \'none\';";
html_str = html_str +					  	"} else {";
html_str = html_str +			  			"nextEl.style.display = \'block\';";
html_str = html_str +					 	"}";

html_str = html_str +					  	"}";   
html_str = html_str +					"});";
html_str = html_str +				"})";
html_str = html_str +			"}";
		// end if innerWidth
html_str = html_str + "\n";
html_str = html_str +	"});"; 
	// DOMContentLoaded  end
html_str = html_str +	"</script>";

html_str = html_str +	"</head>";
html_str = html_str +	"<body>";
html_str = html_str + "\n";
// start 20220714
//html_str = html_str + "<button class=\"open-button\" onclick=\"openForm()\">Open Form</button>";
html_str = html_str + "<div class=\"form-popup\" id=\"myForm\">";
//html_str = html_str +   "<form action=\"/action_page.php\" class=\"form-container\">";
//html_str = html_str +   "<form onsubmit=\"jsFunction(345);\" class=\"form-container\">";  (del) 20220716
//html_str = html_str +   "<form onsubmit=\"$(document).ready();\" class=\"form-container\">";


html_str = html_str +   "<form class=\"form-container\">";  // 20220716
html_str = html_str +   "<h1>Object Id</h1>";

html_str = html_str +     "<label for=\"ns\"><b>Object Namespace</b></label>";
html_str = html_str +     "<input  type=\"text\" placeholder=\"Enter Namespace\" name=\"ns\" id=\"ns_1\" required>";

html_str = html_str +     "<label for=\"code\"><b>Object Code</b></label>";
html_str = html_str +     "<input type=\"text\" placeholder=\"Enter Code\" name=\"code\" id=\"code_1\" required>";


//html_str = html_str +     "<button type=\"submit\" class=\"btn\">Submit</button>";  // (del) 20220715
//html_str = html_str +     "<button id=\"change_button\" type=\"button\" class=\"btn\">Submit</button>";    //TEST 20220715
//html_str = html_str +       "<button type=\"button\" class=\"btn\" onclick=\"maintainObject(345);\">Submit</button>";
                          var value_AR = [];
                          value_AR.push("zinfinitree.com/address");
                          value_AR.push("1");
                          value_AR.push("update");
                          value_AR.push("generic");
      
                          var value_ARs = JSON.stringify(value_AR);
html_str = html_str +       "<button type=\'button\' class=\"btn\" value='" +  value_ARs + "'>Submit</button>";


html_str = html_str +     "<button type=\"button\" class=\"btn cancel\" onclick=\"closeForm()\">Close</button>";
html_str = html_str +   "</form>";
html_str = html_str +  "</div>";
//  end 20220714

html_str = html_str +	"<header class=\"section-header py-4\">";
html_str = html_str +	"<div class=\"container\">";
html_str = html_str +		"<h2>ZinfiniTree</h2>"; 
html_str = html_str +	"</div>";
html_str = html_str +	"</header>";



html_str = html_str +	"<div class=\"container\">";

//<!-- ============= COMPONENT ============== -->

html_str = html_str + this.openMenuSectionHtml(0,"ZT:");   // 20220620  TEMP DEL 20220621





var done = false;
var loop_cntr = 0;
var indentStr = "          ";
var menuOptionIdx = 0; 
var currentLevel = 0;                                
var menu_option_parent_idx;
var menu_option_grandparent_idx;
var grandparentChildMenuOptionIdx_AR_length;
var grandparentChildMenuOption_idx_AR_idx;
var grandparentChildMenuOption_idx_AR_idx_var
var open_tag = "";
var close_tag = "";
var heading_tag_level = 0;
var heading_level = 0;
var menu_option_title = "";
var menu_option_dsns = "";
var list_opened = false;      // 20210703
var list_item_opened = false; // 20210703


// NOTE for now assume app has only one page and page has one menu



 html_str = html_str +		"<ul class=\"navbar-nav\">";

 var childFound = false;
 var siblingFound = false;

 for(var i = 0; i < this.appPage_AR.length; i++){   
  //  html_str = html_str + "<h2>"+this.appPage_AR[i].desc+"</h2>";
  //  html_str = html_str + "<h3>"+this.appPage_AR[i].id+","+this.appPage_AR[i].parent_id+"</h3>";
    for(var j = 0; j < this.appPage_AR[i].menu_AR.length; j++){

      var menuOption_max_levels_down = 0;
      var menuOptionLevel_AR = [];

      for(var k = 0; k < this.appPage_AR[i].menu_AR[j].menu_option_AR.length; k++){ 
         if(this.appPage_AR[i].menu_AR[j].menu_option_AR[k].levelsDown > menuOption_max_levels_down){
           menuOption_max_levels_down = this.appPage_AR[i].menu_AR[j].menu_option_AR[k].levelsDown;
         } // endif
      } // endfor
        

      var max_levels_down_plus1 = menuOption_max_levels_down + 1;
      for(var k = 0; k < max_levels_down_plus1; k++){
         var menuOptionLevelRec = new app_wa.MenuOptionLevelRec();
         menuOptionLevel_AR.push(menuOptionLevelRec);
      }  // endfor


    
      console.log("menuOptionLevel_AR.length: "+menuOptionLevel_AR.length);

      while(!done){

      childFound = false;
      siblingFound = false;

    

     console.log("^^^??11 loop_cntr: "+loop_cntr);
     for(var m = 0; m < menuOptionLevel_AR.length; m++){
      console.log("^^^??11 20220626 menuOptionLevel_AR.lengh - m: "+  menuOptionLevel_AR.length + " - "+m);
      console.log("^^^??11 menuOptionLevel_AR[m].menuOption_idx: " +menuOptionLevel_AR[m].menuOption_idx);
      console.log("^^^??11 currentLevel: "+currentLevel);
      if(m == currentLevel){
 

    //   for(var k = 0; k < this.appPage_AR[i].menu_AR[j].menu_option_AR.length; k++){    (del) 20220626 
        var k = menuOptionLevel_AR[m].menuOption_idx;                                          // 20220626
        
        console.log("^^^ 20220623 menuOptionLevel_AR.lengh - m: "+  menuOptionLevel_AR.length + " - "+m);
        console.log("^^^?? menuOptionLevel_AR[m].menuOption_idx: " +menuOptionLevel_AR[m].menuOption_idx);
        console.log("^^^?? this.appPage_AR[i].menu_AR[j].menu_option_AR[k].menu_option_label: "+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].menu_option_label);
       // if(this.appPage_AR[i].menu_AR[j].menu_option_AR[k].levelsDown == currentLevel && menuOptionLevel_AR[m].menuOption_idx == k){
       //if(menuOptionLevel_AR[m].menuOption_idx == k){
       //if(this.appPage_AR[i].menu_AR[j].menu_option_AR[k].levelsDown == currentLevel){  // (del) 20220626
       //if( 1 == 1){
        console.log("^^^ this.appPage_AR[i].menu_AR[j].menu_option_AR[k].levelsDown: "+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].levelsDown);
        //if(this.appPage_AR[i].menu_AR[j].menu_option_AR[k].levelsDown == currentLevel){
        //if(this.appPage_AR[i].menu_AR[j].menu_option_AR[k].levelsDown == 1){  
         // html_str = html_str + "<li class=\"nav-item active\"> <a class=\"nav-link\" href=\"#\">"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].menu_option_label+ "</a> </li>";
    // console.log("^^^ 20220623 menu_option_label: "+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].menu_option_label);
           if(m != 0){  // by-pass root menu option 20220622
             html_str = html_str + this.getMenuOptionHtml(i,j,k);  
           } // endif
  
  //        } // endif   (del) 20220626  

          for(var l = 0; l < this.appPage_AR[i].menu_AR[j].menu_option_AR[k].appAction_AR.length; l++){
 
             
          } // endfor  loop through appAction_AR

   




// start copy from doc logic 20220620
              var parent_level = m - 1;

              if(m != 0){                          

                   menuOptionLevel_AR[parent_level].childMenuOption_idx_AR_idx++;
              } // endif
          
              console.log("^^^ 20220622 menuOptionLevel_AR[m].menuOption_idx: "+menuOptionLevel_AR[m].menuOption_idx);
              console.log("^^^ m: "+m);
              var childMenuOptionIdx_AR_length = this.appPage_AR[i].menu_AR[j].menu_option_AR[menuOptionLevel_AR[m].menuOption_idx].childMenuOption_idx_AR.length;  //(del) 20220626
              //var childMenuOptionIdx_AR_length = this.appPage_AR[i].menu_AR[j].menu_option_AR[menuOptionLevel_AR[m].menuOption_idx].childMenuOption_idx_AR.length;  // 20220626
          console.log("^^^ 20220626 menuOptionLevel_AR[m].childMenuOption_idx_AR_idx - childMenuOptionIdx_AR_length: "+menuOptionLevel_AR[m].childMenuOption_idx_AR_idx+" - "+childMenuOptionIdx_AR_length+" - ");
////          // *** if menu option has unprocessed children

                if(menuOptionLevel_AR[m].childMenuOption_idx_AR_idx < childMenuOptionIdx_AR_length){  
              
                 // this.openMenuSectionHtml(m);  // 20220620 open a new menu section  TEMP DEL 20220621  

                  childFound = true;
                  var next_level_down = m + 1;
                //  if(next_level_down > menuOptionLevel_AR.length){
                //    continue;
                //  }

          //        var childMenuOption_idx_AR_idx_var = this.appPage_AR[i].menu_AR[j].menu_option_AR[menuOptionLevel_AR[m].childMenuOption_idx_AR_idx];
                 console.log("+++ 20220623 menuOptionLevel_AR[m].childMenuOption_idx_AR_idx: "+menuOptionLevel_AR[m].childMenuOption_idx_AR_idx);
                  var childMenuOption_idx_AR_idx_var = this.appPage_AR[i].menu_AR[j].menu_option_AR[menuOptionLevel_AR[m].menuOption_idx].childMenuOption_idx_AR[menuOptionLevel_AR[m].childMenuOption_idx_AR_idx];  // 20220623

                   console.log("+++ 20220623 childMenuOption_idx_AR_idx_var:"+ childMenuOption_idx_AR_idx_var);
                 //       this.getMenuOptionHtml(i,j,k)
 
                  //console.log("^^^ 20220622 childMenuOption_idx_AR_idx_var: "+childMenuOption_idx_AR_idx_var);
                  //menuOptionLevel_AR[m].menuOption_idx = childMenuOption_idx_AR_idx_var;              // (del) 20220626
                  console.log("next_level_down: "+next_level_down);
                  menuOptionLevel_AR[next_level_down].menuOption_idx = childMenuOption_idx_AR_idx_var;  // 20220626
                  currentLevel++;
                  //this.openMenuSectionHtml(currentLevel);  // 20220624  (del) 20220625
                  continue;
////              //console.log("html_str: "+ html_str);

             } // endif


                   var one_level_up = m - 1;
                   menu_option_parent_idx = this.appPage_AR[i].menu_AR[j].menu_option_AR[menuOptionLevel_AR[m].menuOption_idx].parent_idx;
                   console.log("20220621 menu_option_parent_idx: "+menu_option_parent_idx);
                   console.log("20220621 menuOptionLevel_AR[m].menuOption_idx: "+menuOptionLevel_AR[m].menuOption_idx);
                   var siblingMenuOptionIdx_AR_length = this.appPage_AR[i].menu_AR[j].menu_option_AR[menu_option_parent_idx].childMenuOption_idx_AR.length;  // ARRAY VALUE UNDEFINED
                   console.log("one_level_up: "+one_level_up);  // 20220626
                 
                   if( m != 0){   // 20220626
 var siblingMenuOption_idx_AR_idx_var = this.appPage_AR[i].menu_AR[j].menu_option_AR[menu_option_parent_idx].childMenuOption_idx_AR[menuOptionLevel_AR[one_level_up].childMenuOption_idx_AR_idx];
                   }  // 20220626

////          // *** if doc elem has unprocessed sibling
              if(m != 0 &&  ( menuOptionLevel_AR[one_level_up].childMenuOption_idx_AR_idx < siblingMenuOptionIdx_AR_length )) {

////            console.log("+++ 20210118 doc_elem_parent_idx:           "+doc_elem_parent_idx);
////            console.log("+++ 20210118 siblingDocElemIdx_AR_length:   "+siblingDocElemIdx_AR_length);
////            console.log("+++ 20210118 siblingDocElem_idx_AR_idx_var: "+siblingDocElem_idx_AR_idx_var);
                 siblingFound = true;
                 menuOptionLevel_AR[m].menuOption_idx = siblingMenuOption_idx_AR_idx_var;


                 continue; 

              }  // endif


              if(!(siblingFound)){
////              if(list_opened){html_str = html_str + "</ol>"; list_opened = false;}
                html_str = html_str + this.closeMenuSectionHtml(currentLevel);

              }  // endif   


//*// equals TEMP DEL to debug
////          // *** if not child or sibling
             if(!(childFound || siblingFound)){
          
                // this.closeMenuSectionHtml(m);  // 20220628

                 var gp_level;  // grandparent level

                 gp_level = m - 2;

                 var    parent_level = m - 1;

                 var menuOptionFound = false;

                 var loop_cntr2 = 0;

                 while(!menuOptionFound){

                   if(gp_level < 0){done = true; break;}
                   menu_option_parent_idx = this.appPage_AR[i].menu_AR[j].menu_option_AR[menuOptionLevel_AR[currentLevel].menuOption_idx].parent_idx;

                   menu_option_grandparent_idx = this.appPage_AR[i].menu_AR[j].menu_option_AR[menu_option_parent_idx].parent_idx;

                   grandparentChildMenuOptionIdx_AR_length = this.appPage_AR[i].menu_AR[j].menu_option_AR[menu_option_grandparent_idx].childMenuOption_idx_AR.length;

                   grandparentChildMenuOption_idx_AR_idx = menuOptionLevel_AR[gp_level].childMenuOption_idx_AR_idx; 
                   console.log("+++0 20220627 gp_level: "+gp_level);
                   console.log("+++0 20220627 menu_option_grandparent_idx: "+menu_option_grandparent_idx);
                   console.log("+++0 20220627 menuOptionLevel_AR[gp_level].childMenuOption_idx_AR_idx: "+menuOptionLevel_AR[gp_level].childMenuOption_idx_AR_idx);
                   console.log("+++0 20220627 this.appPage_AR[i].menu_AR[j].menuOption_AR[menu_option_grandparent_idx].childMenuOption_idx_AR.length: "+this.appPage_AR[i].menu_AR[j].menu_option_AR[menu_option_grandparent_idx].childMenuOption_idx_AR.length);


 grandparentChildMenuOption_idx_AR_idx_var = this.appPage_AR[i].menu_AR[j].menu_option_AR[menu_option_grandparent_idx].childMenuOption_idx_AR[menuOptionLevel_AR[gp_level].childMenuOption_idx_AR_idx];

//// ///// //var parentSiblingDocElem_idx_AR_idx_var = this.sess.document_AR[doc_idxx].docElem_AR[docLevel_AR[i].docElem_idx].childDocElem_idx_AR[docLevel_AR[i].childDocElem_idx_AR_idx]
//// /////var parentSiblingDocElem_idx_AR_idx_var = this.sess.document_AR[doc_idxx].docElem_AR[parentSiblingDocElem_idx_AR_idx];
                   console.log("+++ 20220623 menu_option_grandparent_idx:           "+menu_option_grandparent_idx);
                   console.log("+++ 20220623 grandparentChildMenuOptionIdx_AR_length: "+grandparentChildMenuOptionIdx_AR_length);
                   console.log("+++ 20220623 grandparentChildMenuOption_idx_AR_idx:     "+grandparentChildMenuOption_idx_AR_idx);
                   console.log("+++ 20220623 grandparentChildMenuOption_idx_AR_idx_var: "+grandparentChildMenuOption_idx_AR_idx_var);

                   menuOptionLevel_AR[parent_level].childMenuOption_idx_AR_idx = 0;

////               // look for sibling of parent
                   if(currentLevel != 0 &&  menuOptionLevel_AR[gp_level].childMenuOption_idx_AR_idx < grandparentChildMenuOptionIdx_AR_length ){
                      menuOptionFound = true;
                      menuOptionLevel_AR[parent_level].menuOption_idx = grandparentChildMenuOption_idx_AR_idx_var;   
                      menuOptionLevel_AR[parent_level].childMenuOption_idx_AR_idx = 0;
     
 
                  } // endif        
                  loop_cntr2++;
    
                  if(loop_cntr2 > 50){menuOptionFound = true;}
                  gp_level--;

                  parent_level--;

                  currentLevel--;   

                } // endwhile

                continue;

              }  // endif   !(childFound || siblingFound)){   
// end copy from doc logic 20220620



       } // endif m == currentLevel

      }  // end for loop through menuOptionLevel_AR

    // done = true;

     if(loop_cntr > 30){done = true;}

     loop_cntr++;

     } // end while ! done



    }  // endfor loop through menu_AR


 }  // endfor  loop through appPage_AR


// end 20220618
	



html_str = html_str + this.closeMenuSectionHtml(0);   // 20220620  TEMP DEL 20220621

//<!-- ============= COMPONENT END// ============== -->
html_str = html_str + "\n";
html_str = html_str +	"<section class=\"section-content py-5\">";

html_str = html_str + "<br>";
html_str = html_str + "<br>";

html_str = html_str +	"<h5>Welcome to ZinfiniTree, a community to develop, deploy, share and extend applications</h5>";
	
//html_str = html_str +	"<h6>Demo for Bootstrap multi level dropdown menu <br> Based on Bootstrap 5 CSS framework.</h6>";
//html_str = html_str +	 "<p>For this demo page you should connect to the internet to receive files from CDN  like Bootstrap5 CSS, Bootstrap5 JS</p>";
       
//html_str = html_str +	"<p class=\"text-muted\"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do ei</p>";

//html_str = html_str +	"<a href=\"https://bootstrap-menu.com/detail-multilevel.html\" class=\"btn btn-success\"> &laquo Back to tutorial or Download code</a>";

html_str = html_str +	"</section>";

//html_str = html_str +	"</div>";  //<!-- container //  -->

///</body>  move below 20220614



//html_str = html_str + this.listAppObjectsToHtml();



html_str = html_str + "</body>";   // 20220614 

html_str = html_str + "</html>";

return html_str;

} // end of getHtmlForApp()









openMenuSectionHtml(levelsDownx,brandx){
var retHtml_str = "";

 if(levelsDownx == 0){
    retHtml_str = retHtml_str +	"<nav class=\"navbar navbar-expand-lg navbar-dark bg-primary\">";
    retHtml_str = retHtml_str +	 "<div class=\"container-fluid\">";
    retHtml_str = retHtml_str +	  "<a class=\"navbar-brand\" href=\"#\">"+brandx+"</a>";
    retHtml_str = retHtml_str +	  "<button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#main_nav\"  aria-expanded=\"false\" aria-label=\"Toggle navigation\">";
    retHtml_str = retHtml_str +	      "<span class=\"navbar-toggler-icon\"></span>";
    retHtml_str = retHtml_str +	    "</button>";
    retHtml_str = retHtml_str +	  "<div class=\"collapse navbar-collapse\" id=\"main_nav\">";
 }  // endif





 if(levelsDownx == 1 || levelsDownx == 2){

   retHtml_str = retHtml_str +			"<li class=\"nav-item dropdown\">";
   retHtml_str = retHtml_str +			"<a class=\"nav-link dropdown-toggle\" href=\"#\" data-bs-toggle=\"dropdown\">  Treeview menu  </a>";
   retHtml_str = retHtml_str +			    "<ul class=\"dropdown-menu\">";

  } // endif

 if(levelsDownx == 30){  // TEMP VALUE 30 to DISABLE option

   retHtml_str = retHtml_str +  "<ul class=\"submenu dropdown-menu\">"
}  // endif

return retHtml_str;
}  // end of openMenuSectionHtml()


closeMenuSectionHtml(levelsDownx){

//console.log("running closeMenuSectionHtml for level: "+levelsDownx);
var retHtml_str = "";
  if(levelsDownx == 0){
    retHtml_str = retHtml_str +	  "</div>";  // <!-- navbar-collapse.// -->
    retHtml_str = retHtml_str +	 "</div>";   // <!-- container-fluid.// -->
    retHtml_str = retHtml_str +	"</nav>";

  }  // endif

 if(levelsDownx == 1){

   //retHtml_str = retHtml_str + "</ul>";  (del) 20220630
   retHtml_str = retHtml_str + "</ul></li>"; 
 }

                     
 if(levelsDownx == 2){

   //retHtml_str = retHtml_str + "</ul>";  (del) 20220630
    retHtml_str = retHtml_str + "</ul></li>";
 }

 if(levelsDownx == 3){

 // retHtml_str = retHtml_str +  "</ul>";  (del) 20220630
 retHtml_str = retHtml_str +  "</ul></li>";
}

//console.log("retHtml_str in closeMenuSectionHtml: "+retHtml_str);
return retHtml_str;
}  // end of closeMenuSectionHtml()



getMenuOptionHtml(page_idx, menu_idx, menuOption_idx){
var retHtml_str = "";
var levelsDown = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].levelsDown;
var childCount = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].childMenuOption_idx_AR.length;
var menu_option_label = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].menu_option_label;
var app_action_type_ztic;
var app_action_type_code;
var app_action_desc;
var app_action_object_templ_ns;
var app_action_object_templ_code;
var app_action_maint_mode;
var app_action_format;
var value_AR = [];




for(var i = 0; i < this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].appAction_AR.length; i++){
   app_action_type_ztic = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].appAction_AR[i].appAction_type_ztic;
   app_action_type_code = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].appAction_AR[i].appAction_type_code;
   app_action_desc      = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].appAction_AR[i].appAction_desc;
   app_action_object_templ_ns     = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].appAction_AR[i].appAction_object_templ_ns;
   app_action_object_templ_code   = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].appAction_AR[i].appAction_object_templ_code;
   app_action_maint_mode   = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].appAction_AR[i].appAction_maint_mode;
   app_action_format              = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].appAction_AR[i].appAction_object_format;
} // endfor

//console.log("running getMenuOptionHtml()");
//console.log("ztic: "+this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].menu_option_ztic);
//console.log("code: "+this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].menu_option_code);
//console.log("label: "+menu_option_label);
//console.log("levels down: "+levelsDown);
//console.log("childMenuOption_idx_AR.length: "+childCount);
retHtml_str = retHtml_str + "\n";

if(levelsDown == 1){
   if(childCount == 0){
  retHtml_str = retHtml_str + "<li class=\"nav-item active\"> <a class=\"nav-link\" href=\"#\">"+this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR[menuOption_idx].menu_option_label+ "</a> </li>";
  }  // endif childCount == 0
  if(childCount > 0){
    retHtml_str = retHtml_str +	"<li class=\"nav-item dropdown\">";
    retHtml_str = retHtml_str +	"<a class=\"nav-link dropdown-toggle\" href=\"#\" data-bs-toggle=\"dropdown\">"+ menu_option_label +  "</a>";
    retHtml_str = retHtml_str +  "<ul class=\"dropdown-menu\">";

//html_str = html_str +			"<li class=\"nav-item dropdown\">";
//html_str = html_str +			"<a class=\"nav-link dropdown-toggle\" href=\"#\" data-bs-toggle=\"dropdown\">  Treeview menu  </a>";
//html_str = html_str +			    "<ul class=\"dropdown-menu\">";


  }  // endif childCount > 0


}  // endif levelsDown == 1


if(levelsDown == 2){
  if(childCount == 0){

value_AR = [];
value_AR.push(app_action_object_templ_ns);
value_AR.push(app_action_object_templ_code);
value_AR.push(app_action_maint_mode);
value_AR.push(app_action_format);
value_AR.push(app_action_type_ztic);
value_AR.push(app_action_type_code);
var value_ARs = JSON.stringify(value_AR);

    if(app_action_type_code == 1)
       {
retHtml_str = retHtml_str + "<li><button type=\"button\" class=\"signout_btn\" id=\"btnSignOut\" value=\"222\" onclick=\"jsFunction(this.value);\">"+menu_option_label+"</button></li>";

       }
    else if(app_action_type_code == 2)
        {
      retHtml_str = retHtml_str +"<li><a class=\"dropdown-item\" href=\""+app_action_desc+"\" target=\"_blank\">"+menu_option_label+"</a></li>";
        }
     else
        {
  //retHtml_str = retHtml_str + "<li><a class=\"dropdown-item\" href=\"#\">"+ menu_option_label+ "</a></li>";
retHtml_str = retHtml_str + "<li><button value='" +  value_ARs + "'>"+menu_option_label+"</button></li>"; 
        } // endif app_action_type_code == 1
  } // endif childCount == 0


  if(childCount > 0){


  
  //retHtml_str = retHtml_str + "<li><a class=\"dropdown-item\" href=\"#\">"+ menu_option_label+ "</a></li>"; (del) 20220701
  retHtml_str = retHtml_str + "<li><a class=\"dropdown-item\" href=\"#\">"+ menu_option_label+ " &raquo; </a>";   // 20220701

  retHtml_str = retHtml_str +  "<ul class=\"submenu dropdown-menu\">"


   //     }

  } // endif childCount > 0


}  // endif levelsDown = 2





if(levelsDown == 3){

  if(childCount == 0){
value_AR = [];
value_AR.push(app_action_object_templ_ns);
value_AR.push(app_action_object_templ_code);
value_AR.push(app_action_maint_mode);
value_AR.push(app_action_format);
value_AR.push(app_action_type_ztic);
value_AR.push(app_action_type_code);
var value_ARs = JSON.stringify(value_AR);

    if(app_action_type_code == 1)
       {


retHtml_str = retHtml_str + "<li><button value='" +  value_ARs + "'>"+menu_option_label+"</button></li>";     // 20220706
 // } // endif app_action_maint_mode == update  20220710  (del) 20220716a
//retHtml_str = retHtml_str + "<li><button value=\"zinfinitree.com/address\">"+menu_option_label+"</button></li>";  (del) 20220706
       }
    else if(app_action_type_code == 2)

        {
      retHtml_str = retHtml_str +"<li><a class=\"dropdown-item\" href=\""+app_action_desc+"\" target=\"_blank\">"+menu_option_label+"</a></li>";
        }
     else 
        {
//  retHtml_str = retHtml_str + "<li><a class=\"dropdown-item\" href=\"#\">"+ menu_option_label+ "</a></li>";  (del) 20220718
retHtml_str = retHtml_str + "<li><button value='" +  value_ARs + "'>"+menu_option_label+"</button></li>"; 
        } // endif app_action_type_code == 1
  } // endif childCount == 0


  if(childCount > 0){


  //retHtml_str = retHtml_str + "<li><a class=\"dropdown-item\" href=\"#\">"+ menu_option_label+ "</a></li>"; (del) 20220701
  retHtml_str = retHtml_str + "<li><a class=\"dropdown-item\" href=\"#\">"+ menu_option_label+ " &raquo; </a>";  // 20220701
  retHtml_str = retHtml_str +  "<ul class=\"submenu dropdown-menu\">"


  } // endif childCount > 0



}  // endif levelsDown == 3


return retHtml_str;
}  // end of getMenuOptionHtml



listAppObjectsToHtml(){
var html_str = "";
html_str = html_str + "<p>";
html_str = html_str + "<title>"+this.app_title+"</title>";
html_str = html_str + "<h1> running: getHtmlForApp </h1>";
 for(var i = 0; i < this.appPage_AR.length; i++){   
    html_str = html_str + "<h2>"+this.appPage_AR[i].desc+"</h2>";
    html_str = html_str + "<h3>"+this.appPage_AR[i].id+","+this.appPage_AR[i].parent_id+"</h3>";
    for(var j = 0; j < this.appPage_AR[i].menu_AR.length; j++){  
       html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_desc+"</h4>"; 
       html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_label+"</h4>";
       for(var k = 0; k < this.appPage_AR[i].menu_AR[j].menu_option_AR.length; k++){ 
          html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].menu_option_ztic+"</h4>";
          html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].menu_option_code+"</h4>";
          html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].menu_option_desc+"</h4>";
          html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].menu_option_label+"</h4>";
          for(var l = 0; l < this.appPage_AR[i].menu_AR[j].menu_option_AR[k].appAction_AR.length; l++){
             html_str = html_str + "<h4>desc:"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].appAction_AR[l].appAction_desc+"</h4>";
             html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].appAction_AR[l].appAction_object_templ_ns+"</h4>";
             html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].appAction_AR[l].appAction_object_templ_code+"</h4>";
             html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].appAction_AR[l].appAction_maint_mode+"</h4>";
             html_str = html_str + "<h4>"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].appAction_AR[l].appAction_format+"</h4>";
             html_str = html_str + "<h4>type ztic:"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].appAction_AR[l].appAction_type_ztic+"</h4>";
             html_str = html_str + "<h4>type code:"+this.appPage_AR[i].menu_AR[j].menu_option_AR[k].appAction_AR[l].appAction_type_code+"</h4>";
          } // endfor 
       } // endfor
    }  // endfor

    //var menu_option_idx = this.appPage_AR[page_idx].menu_AR[menu_idx].menu_option_AR.push

 }  // endfor

html_str = html_str + "</p>";
return html_str;
}  // end listAppObjectsToHtml





}  // end of class
module.exports = ZtAdapterSet;
