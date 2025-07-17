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



var express = require('express');
var request = require('request');
var moment = require('moment');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");
var bodyParser = require('body-parser');   
//var jsonParser = bodyParser.json()
var HashMap = require('hashmap');

const cors = require('cors');




var Client = require('node-rest-client').Client;
var fs = require('fs'); 

var object_HM = new HashMap();




function ZtMessage(zticDomx, ztrawMsgArrayx) {
    this.zticDom   = zticDomx;
   // this.TabNamePrfx = "";      // (del) 20250624
    this.TargetNS = "";
    this.lastRawMsgIndex = 0;
    this.parentIndexWA1   = 0;
    this.parentIndexWA2   = 0;
    this.DsLineArray = [];
    this.ZtRawMessageAR = ztrawMsgArrayx;
    this.ZtMessageArray = [];
    this.ZtMessageResponse_Array = [];
    this.ZTIC_Array     = [];
    this.maintainSetUpdateWA_Array       = [];           
    this.maintainResponseSetWA_AR        = [];           
    this.maintainResponseObjectWA_AR     = [];           
    this.queryStatisticalValuesObjectWA_AR = [];         
    this.queryAdditionalWA_AR            = [];           
    this.queryResponseSetMemberWA_AR     = [];           
    this.queryResponseObjectWA_AR        = [];           
    this.queryResponseObjectElementWA_AR = [];           
    this.queryResponseTypeWA_AR          = [];           
    this.queryResponseLinkWA_AR          = [];           
    this.queryResponseStatisticalValuesObjectWA_AR = []; 
    //this.queryResponseTemplateForTypeValueBasedTemplateRuleWA_AR = [];   
    this.responseMessageStatusWA_AR      = [];           
    this.serverLogSystemMessageWA_AR     = [];           
    this.serverLogSystemMessageWA_Parameter_AR = [];     
    this.mappedResponseRecordFormat_AR   = [];           
    this.mappedResponseRawFormat_AR      = [];           
    this.mappedResponseDbFormat_AR       = [];           
  }




ZtMessage.prototype.setZtRawMessageAR = function(ztrawMsgArrayx) {

    this.ZtRawMessageAR = ztrawMsgArrayx;

}


ZtMessage.prototype.addResponseToZtRawMessageAR = function(responseMsgARx) {
 
        console.log("this.ZtRawMessageAR.length: "+this.ZtRawMessageAR.length);
        console.log("responseMsgARx.length: "+responseMsgARx.length);
	for (var i = 0; i < responseMsgARx.length; i++) {
           this.ZtRawMessageAR.push(responseMsgARx[i]);
           
        }

}



ZtMessage.prototype.setzticDom = function(zticDomx) {
    this.zticDom = zticDomx;
}



ZtMessage.prototype.listZtRawMessageAR = function() {
console.log("list of ZtRawMessageAR:  ");
for (var i = 0; i < this.ZtRawMessageAR.length; i++) {   console.log(i, this.ZtRawMessageAR[i].parent_index,this.ZtRawMessageAR[i].priority,this.ZtRawMessageAR[i].me_disc,this.ZtRawMessageAR[i].me_code,this.ZtRawMessageAR[i].data);
  }

}





 


ZtMessage.prototype.findZTIC = function(ztmsg) {



    var nextCode = 1;
      for (var j = 0; j < this.zticDom.ZTICNS_AR.length; j++){
        if(parseInt(this.zticDom.ZTICNS_AR[j].code) == nextCode || parseInt(this.zticDom.ZTICNS_AR[j].code) > nextCode) {nextCode = this.zticDom.ZTICNS_AR[j].code; nextCode++;  }
      } // endfor loop through this.zticDom.ZTICNS_AR  
    //} //endfor loop through result
     var found = false;
     console.log("-ZTIC_Array length: " + ztmsg.ZTIC_Array.length);
     console.log("-zticDomNS_AR length: " + this.zticDom.ZTICNS_AR.length);
     //console.log("result length: "     + result.length);
     for (var i= 0; i < ztmsg.ZTIC_Array.length; i++) {
          
          found = false;
          //for (var j = 0; j < result.length; j++){
          for (var j = 0; j < this.zticDom.ZTICNS_AR.length; j++){
           // console.log("result[j].te_2_4: " + result[j].te_2_4);
           // if (parseInt(result[j].te_2_4) > nextCode) {nextCode = parseInt(result[j].te_2_4) + 1;}
           // console.log("ztmsg namespace " +ztmsg.ZTIC_Array[i].namespace+" result: " + result[j].te_2_31+" found? "+ztmsg.ZTIC_Array[i].found_in_db);
       //     if (result[j].te_2_31 == ztmsg.ZTIC_Array[i].namespace ) { ztmsg.ZTIC_Array[i].targetZTIC = result[j].te_2_4; ztmsg.ZTIC_Array[i].found_in_db = true; found = true; console.log("found in db: "+ result[j].te_2_31); break;} 
           console.log("zticDom.ZTICNS_AR / ztmsg.ZTIC_Array[i] in findZTIC: "+this.zticDom.ZTICNS_AR[j].namespace +" / "+ ztmsg.ZTIC_Array[i].namespace);
           if (this.zticDom.ZTICNS_AR[j].namespace == ztmsg.ZTIC_Array[i].namespace ) { ztmsg.ZTIC_Array[i].targetZTIC = this.zticDom.ZTICNS_AR[j].code; ztmsg.ZTIC_Array[i].found_in_db = true; found = true; console.log("found in zticDom: "+ this.zticDom.ZTICNS_AR[j].namespace); break;}
           }  //endfor result
           if (found == false)
           {  
            console.log("nextCode in findZTIC found == false: "+nextCode);                
            ztmsg.ZTIC_Array[i].targetZTIC = nextCode;
            ztmsg.ZTIC_Array[i].found_in_db = false;
            var zticns = new ZTICNS(nextCode, ztmsg.ZTIC_Array[i].namespace);
            this.zticDom.ZTICNS_AR.push(zticns);
            nextCode++;
            }
            //console.log(result[j].te_2_31);
            
            // update db with new namespace  
            //if (ztmsg.ZTIC_Array[i].found_in_db == 

      } //endfor ZTIC_Array  


//console.log("ZTIC_Array.length: "+ztmsg.ZTIC_Array.length);
for ( var i = 0; i < ztmsg.ZTIC_Array.length; i++){
//console.log("targetZTIC: "+ ztmsg.ZTIC_Array[i].targetZTIC);
}






}  // end of ZtMessage.prototype.findZTIC



ZtMessage.prototype.findZTIC2 = function(ztmsg) {


    var nextCode = 1;
//    for (var j = 0; j < result.length; j++){
      for (var j = 0; j < this.zticDom.ZTICNS_AR.length; j++){
//      if(parseInt(result[j].te_2_4) == nextCode || parseInt(result[j].te_2_4) > nextCode) {nextCode = result[j].te_2_4; nextCode++;   }
        if(parseInt(this.zticDom.ZTICNS_AR[j].code) == nextCode || parseInt(this.zticDom.ZTICNS_AR[j].code) > nextCode) {nextCode = this.zticDom.ZTICNS_AR[j].code; nextCode++;  }
      } // endfor loop through this.zticDom.ZTICNS_AR  
    //} //endfor loop through result
     var found = false;
     console.log("-ZTIC_Array length: " + ztmsg.ZTIC_Array.length);
     console.log("-zticDomNS_AR length: " + this.zticDom.ZTICNS_AR.length);
     //console.log("result length: "     + result.length);
     for (var i= 0; i < ztmsg.ZTIC_Array.length; i++) {
          
          found = false;
          //for (var j = 0; j < result.length; j++){
          for (var j = 0; j < this.zticDom.ZTICNS_AR.length; j++){
           // console.log("result[j].te_2_4: " + result[j].te_2_4);
           // console.log("ztmsg namespace " +ztmsg.ZTIC_Array[i].namespace+" result: " + result[j].te_2_31+" found? "+ztmsg.ZTIC_Array[i].found_in_db);
           console.log("zticDom.ZTICNS_AR / ztmsg.ZTIC_Array[i] in findZTIC: "+this.zticDom.ZTICNS_AR[j].namespace +" / "+ ztmsg.ZTIC_Array[i].namespace);
           if (this.zticDom.ZTICNS_AR[j].namespace == ztmsg.ZTIC_Array[i].namespace ) { ztmsg.ZTIC_Array[i].targetZTIC = this.zticDom.ZTICNS_AR[j].code; ztmsg.ZTIC_Array[i].found_in_db = true; found = true; console.log("found in zticDom: "+ this.zticDom.ZTICNS_AR[j].namespace); break;}
           }  //endfor result
           if (found == false)
           {  
            console.log("nextCode in findZTIC found == false: "+nextCode);                
            ztmsg.ZTIC_Array[i].targetZTIC = nextCode;
            ztmsg.ZTIC_Array[i].found_in_db = false;
            var zticns = new ZTICNS(nextCode, ztmsg.ZTIC_Array[i].namespace);
            this.zticDom.ZTICNS_AR.push(zticns);
            nextCode++;
            }
            //console.log(result[j].te_2_31);
            
            // update db with new namespace  
            //if (ztmsg.ZTIC_Array[i].found_in_db == 

      } //endfor ZTIC_Array  


//console.log("ZTIC_Array.length: "+ztmsg.ZTIC_Array.length);
for ( var i = 0; i < ztmsg.ZTIC_Array.length; i++){
//console.log("targetZTIC: "+ ztmsg.ZTIC_Array[i].targetZTIC);
}






//ztmsg.findTableElements_asynch(ztmsg);
ztmsg.findTableElements2(ztmsg);

//ztmsg.msgUpdate();



}  // end of ZtMessage.prototype.findZTIC2
 



ZtMessage.prototype.findTableElements_asynch = function(ztmsg) {
//te_2_2 : "3", te_2_6 : "3", te_2_14: "1"} 2_2=object kind code, 2_6=rec type for type table, 2_14=type def code
//object kind 3 is for object elements
var query = Msg.find().where({ te_2_2 : "3", te_2_6 : "3", te_2_14: "1"});
query.exec(function(err, result) {
   if (!err) {
     //console.log("start of namespaces");
     ztmsg.findTableElementsCallback(null, result, ztmsg);

    } else {
               // error handling
    }; //end if (!err)
 

 });  


} // end of findTableElements_asynch


                                    

    
   
ZtMessage.prototype.process_asynch = function(ztmsg, AR_idx) {
       ztmsg.readRawMsgFromFile();
       ztmsg.transformFromRawMsg();
       ztmsg.showOEupdateWA();
       ztmsg.findZTIC(ztmsg);
       //ztmsg.findTargetZTIC_asynch(ztmsg);
    
}  // end of ZtMessage.prototype.process_asynch





ZtMessage.prototype.mapResponseToRequest = function(resp_map_modex) {

console.log("20200519 running client message mapResponseToRequest()");
console.log("20210223 % resp_map_modex: "+resp_map_modex);
for(var i = 0; i < this.ZTIC_Array.length; i++){

   this.mappedResponseRecordFormat_AR.push(this.getMapTargetRec_ZTIC(this.ZTIC_Array[i].msgZTIC, this.ZTIC_Array[i].namespace));

}  //endfor

 var software_prof_zticx;
 var software_prof_codex = "2";
 var proc_modex = "99";
 var last_idx = "123";
 var msg_id_clientx = "abc123";
 var default_timestampx = "212440895685.000"; // (del)  20231004 
 var default_timestampx = "5179248000.000";   //      20231004
 var base_ztic;

console.log("20201004 % this.TargetNS.toString().trim(): "+this.TargetNS.toString().trim());
for(var i = 0; i < this.ZTIC_Array.length; i++){
   //if(this.ZTIC_Array[i].namespace.toString().trim() == "abc.com/test1"){  // (del) 20201004
   if(this.ZTIC_Array[i].msgZTIC.toString().trim() ==  "1"){     // 20201004                                                   
     this.mappedResponseRecordFormat_AR.push(this.getMapTargetRec_RZTI(this.ZTIC_Array[i].msgZTIC));
   } // endif
   if(this.ZTIC_Array[i].namespace.toString().trim() == "zinfinitree.com/server_config"){
      software_prof_zticx = this.ZTIC_Array[i].msgZTIC;
   }  // endif
   if(this.ZTIC_Array[i].namespace.toString().trim() == "131131/21"){
      base_ztic = this.ZTIC_Array[i].msgZTIC;
   }  // endif

 } // endfor


 var userx = "user1";
 this.mappedResponseRecordFormat_AR.push(this.getMapTargetRec_MPPG(default_timestampx, msg_id_clientx, last_idx, proc_modex, userx, software_prof_zticx, software_prof_codex));

 this.mappedResponseRecordFormat_AR.push(this.getMapTargetRec_EXTK(base_ztic, "2", base_ztic, "1"));


console.log("20200519 this.queryResponseSetMemberWA_AR.length: "+this.queryResponseSetMemberWA_AR.length);
for(var h = 0; h < this.queryResponseSetMemberWA_AR.length; h++){
   var maint_set_id = this.queryResponseSetMemberWA_AR[h].setMemberID;
     console.log("20240116b % maint_set_id.substring(0,11): "+maint_set_id.substring(0,11));
     if(resp_map_modex == "map_with_templ" || !(maint_set_id.substring(0,11) == "ObjTmplQset") ){ 
 //  if(resp_map_modex == "map_with_templ" || !(  maint_set_id.includes(":2:")  || maint_set_id.includes(":3:") || maint_set_id.includes(":4:") || maint_set_id.includes(":5:")  || maint_set_id.includes(":6:")  )){ //  bookmark 20210223
   this.mappedResponseRecordFormat_AR.push(this.getMapTargetRec_MSET(maint_set_id, default_timestampx));
//if(this.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){  (del) 20200519



 var   html_id_cntr = 1;
   console.log("20240116e this.queryResponseSetMemberWA_AR[h].object_idx_AR.length: "+ this.queryResponseSetMemberWA_AR[h].object_idx_AR.length);
   for(var k = 0; k < this.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
   var i = this.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c
// //  console.log("Object: "+ this.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.queryResponseObjectWA_AR[i].objectCode);
        var objx = this.queryResponseObjectWA_AR[this.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126

        var ok_zticx = this.queryResponseObjectWA_AR[i].objectKindZTIC;
        var ok_codex = this.queryResponseObjectWA_AR[i].objectKindCode;
        var obj_zticx = this.queryResponseObjectWA_AR[i].objectZTIC;
        var obj_codex = this.queryResponseObjectWA_AR[i].objectCode;
//const html_id_prfx = "val";

// //console.log("Object Element values");
//    //queryResponseObjectElementWA_AR = [];  
    console.log("20200519 objx.objectElement_idx_AR.length: "+objx.objectElement_idx_AR.length);   
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
        // begin test 20200519
        var oe_zticx = this.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;
        var oe_codex = this.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;
        var oe_value = this.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        this.mappedResponseRecordFormat_AR.push(this.getMapTargetRec_ELEM(ok_zticx, ok_codex, obj_zticx, obj_codex, oe_zticx, oe_codex, "", "", oe_value));
       
        // end test 20200519

//     //console.log("20200127 base_ztic: "+base_ztic);
//   //  if(!(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   //to suppress technical profile description
     if(!(this.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   // 20200127 temporary to suppress technical profile description

       // for(var m = 0; m < OEscreenElem_AR.length; m++){
           //if(OEscreenElem_AR[m].OE_ztic == objx.objectZTIC && OEscreenElem_AR[m].OE_code == objx.objectCode){
           //if(OEscreenElem_AR[m].OE_ztic == this.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC && OEscreenElem_AR[m].OE_code == this.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode){

         //  } // endif OEscreenElem_AR[m].OE_ztic == objx.objectZTIC && OEscreenElem_AR[m].OE_code == objx.objectCode)
       // } // endfor loop through OEscreenElem_AR
      }  // endif this.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode != 12
// //  console.log("   OE ZTIC/Code: Value:  "+this.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// //console.log("Type values");
     for(var j = 0; j < objx.type_idx_AR.length; j++){
// //  console.log("   Type Def/Value ZTIC/Code:  "+this.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
// //+this.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
// //+this.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
// //+this.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
     var td_zticx = this.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC;
     var td_codex = this.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode;
     var tv_zticx = this.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC;
     var tv_codex = this.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode;
var line = this.getMapTargetRec_TYPE(ok_zticx, ok_codex, obj_zticx, obj_codex, td_zticx, td_codex, tv_zticx, tv_codex, "", "");
  this.mappedResponseRecordFormat_AR.push(line);
       }

// //console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
// //  console.log("   Link Type/Value:  "+this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
   var lt_zticx = this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC;
   var lt_codex = this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode;
   var ltk_zticx = this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC;
   var ltk_codex = this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode;
   var lto_zticx = this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC;
   var lto_codex = this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode;
   var lk_statusx = this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].status;
   var timestampx = this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].timestampEff;
   var lk_valuex  = this.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkValue;
//       this.linkStatus                    = "";   //41691  // 20210224
//       this.timestampEff                  = "";   //41692  // 20210224
//       this.linkValue                     = "";   //41693  // 20210224


var line = this.getMapTargetRec_LINK(ok_zticx, ok_codex, obj_zticx, obj_codex, lt_zticx, lt_codex, ltk_zticx, ltk_codex, lto_zticx, lto_codex, "", "", lk_statusx, timestampx, lk_valuex);
 this.mappedResponseRecordFormat_AR.push(line);
      }  //endfor
    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k
// }  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQset"){  (del) 20200519


 }  // endif if(resp_map_modex == "map_with_templ"....

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjectQset)


  


} //  end of mapResponseToRequest()
    
function ZtMessageSet(ztmsgset) {
   this.msg_AR = ztmsgset;

}  // end of function ZtMessageSet   
    
ZtMessageSet.prototype.process = function(ztmsg_AR) {
     //*** add ztmsg_AR[AR_idx].process_asynch
   for (var i = 0; i < ztmsg_AR.length; i++) {
//       ztmsg_AR[i].readRawMsgFromFile();
       ztmsg_AR[i].transformFromRawMsg();
       ztmsg_AR[i].showOEupdateWA();
       ztmsg_AR[i].findZTIC(ztmsg_AR[i]);
//       ztmsg_AR[i].findTargetZTIC_asynch(ztmsg_AR[i]);
ZtMessage.prototype.getMapTargetRec_ZTIC = function() {ZtMessage.prototype.getMapTargetRec_ZTIC = function() {
}  // end of ZtMessage.prototype.getMapTargetRec_ZTIC
}  // end of ZtMessage.prototype.getMapTargetRec_ZTIC
   } // end loop through ztmsg_AR

}  // end of ZtMessageSet.prototype.process


ZtMessage.prototype.getMapTargetRec_ZTIC = function(zticx, namespacex) {
var returnRec = "ZTIC "+zticx.toString().trim().padEnd(5)+namespacex.toString().trim();
return returnRec;
}  // end of ZtMessage.prototype.getMapTargetRec_ZTIC

ZtMessage.prototype.getMapTargetRec_RZTI = function(receiver_zticx) {
var returnRec = "RZTI "+receiver_zticx.toString().trim();
return returnRec;
}  // end of ZtMessage.prototype.getMapTargetRec_RZTI

ZtMessage.prototype.getMapTargetRec_MPPG = function(default_timestampx, msg_id_clientx, last_idx, proc_modex, userx, software_prof_zticx, software_prof_codex) {
var returnRec = "MPPG "+default_timestampx.toString().trim().padEnd(20)+msg_id_clientx.toString().trim().padEnd(20)
                       +last_idx.toString().trim().padEnd(10)+proc_modex.toString().trim().padEnd(5)+userx.toString().trim().padEnd(10)
                       +software_prof_zticx.toString().trim().padEnd(5)+software_prof_codex.toString().trim().padEnd(5);
return returnRec;
}  // end of ZtMessage.prototype.getMapTargetRec_MPPG

ZtMessage.prototype.getMapTargetRec_EXTK = function(ek_def_zticx, ek_def_codex, ek_zticx, ek_codex) {
var returnRec = "EXTK "+ek_def_zticx.toString().trim().padEnd(5)+ek_def_codex.toString().trim().padEnd(5)
                       +ek_zticx.toString().trim().padEnd(5)+ek_codex.toString().trim().padEnd(5);
return returnRec;
}  // end of ZtMessage.prototype.getMapTargetRec_EXTK

ZtMessage.prototype.getMapTargetRec_MSET = function(maint_set_descx, timestampx) {
var returnRec = "MSET "+maint_set_descx.toString().trim().padEnd(40)+timestampx.toString().trim();
return returnRec;
}  // end of ZtMessage.prototype.getMapTargetRec_MSET

ZtMessage.prototype.getMapTargetRec_ELEM = function(kind_zticx, kind_codex, obj_zticx, obj_codex, oe_zticx, oe_codex, templ_zticx, templ_codex, oe_value) {
var returnRec = "ELEM "+kind_zticx.toString().trim().padEnd(5)+kind_codex.toString().trim().padEnd(5)
                       +obj_zticx.toString().trim().padEnd(5)+obj_codex.toString().trim().padEnd(5)
                       +oe_zticx.toString().trim().padEnd(5)+oe_codex.toString().trim().padEnd(5)
                       +templ_zticx.toString().trim().padEnd(5)+templ_codex.toString().trim().padEnd(10)+oe_value.toString().trim();
return returnRec;
}  // end of ZtMessage.prototype.getMapTargetRec_ELEM

ZtMessage.prototype.getMapTargetRec_TYPE = function(kind_zticx, kind_codex, obj_zticx, obj_codex, type_def_zticx, type_def_codex, type_val_zticx, type_val_codex, templ_zticx, templ_codex) {
var returnRec = "TYPE "+kind_zticx.toString().trim().padEnd(5)+kind_codex.toString().trim().padEnd(5)
                       +obj_zticx.toString().trim().padEnd(5)+obj_codex.toString().trim().padEnd(5)
                       +type_def_zticx.toString().trim().padEnd(5)+type_def_codex.toString().trim().padEnd(5)
                       +type_val_zticx.toString().trim().padEnd(5)+type_val_codex.toString().trim().padEnd(5)
                       +templ_zticx.toString().trim().padEnd(5)+templ_codex.toString().trim().padEnd(5);
return returnRec;     
}  // end of ZtMessage.prototype.getMapTargetRec_TYPE

ZtMessage.prototype.getMapTargetRec_LINK = function(kind_zticx, kind_codex, obj_zticx, obj_codex, link_type_zticx, link_type_codex, link_to_kind_zticx, link_to_kind_codex, link_to_obj_zticx, link_to_obj_codex, templ_zticx, templ_codex, statusx, timestampx, link_valuex ) {
var returnRec = "LINK "+kind_zticx.toString().trim().padEnd(5)+kind_codex.toString().trim().padEnd(5)
                       +obj_zticx.toString().trim().padEnd(5)+obj_codex.toString().trim().padEnd(5)
                       +link_type_zticx.toString().trim().padEnd(5)+link_type_codex.toString().trim().padEnd(5)
                       +link_to_kind_zticx.toString().trim().padEnd(5)+link_to_kind_codex.toString().trim().padEnd(5)
                       +link_to_obj_zticx.toString().trim().padEnd(5)+link_to_obj_codex.toString().trim().padEnd(5)
                       +templ_zticx.toString().trim().padEnd(5)+templ_codex.toString().trim().padEnd(5)
                       +"          "
                       +statusx.toString().trim().padEnd(5)
                       +timestampx.toString().trim().padEnd(20)
                       +link_valuex.toString().trim().padEnd(5);


return returnRec;
}  // end of ZtMessage.prototype.getMapTargetRec_LINK




ZtMessage.prototype.getResponseMessageCurrentStatus = function() {
    var ret_status
    if(this.responseMessageStatusWA_AR.length > 0){
        const last_status_idx = this.responseMessageStatusWA_AR.length - 1;
        ret_status = this.responseMessageStatusWA_AR[last_status_idx].code;
    } // endif this.responseMessageStatusWA_AR.length > 0
    return ret_status;
    }  // end of ZtMessage.prototype.getResponseMessageCurrentStatus



 


ZtMessage.prototype.getHtmlForServerLogSystemMessageWA_AR = function() {
    var ret_html = "";
    //ret_html = "<html><table><tr><td>Error Maintaining Object from:  getHtmlForServerLogSystemMessageWA_AR</td></tr></table></html>";
    ret_html = ret_html + "<html><h3>System Messages</h3><table>";
    ret_html = ret_html + "<p>";


    this.serverLogSystemMessageWA_AR.forEach((serverLogSystemMessage) => {
        var sys_msg_ns = "";
        for(var i = 0; i < this.ZTIC_Array.length; i++){
            //if(this.ZTIC_Array[i].namespace.toString().trim() == "abc.com/test1"){  // (del) 20201004
            if(this.ZTIC_Array[i].msgZTIC.toString().trim() ==  serverLogSystemMessage.ztic){     // 20201004                                                   
                sys_msg_ns = this.ZTIC_Array[i].namespace;
            } // endif    
          } // endfor
        ret_html = ret_html + "<tr><td>System Message NS - Code:"+sys_msg_ns+" - "+serverLogSystemMessage.code+"</td><td>"+serverLogSystemMessage.timestamp+"</td></tr>";
        ret_html = ret_html + "<tr><td><b>"+serverLogSystemMessage.shortSystemMessage+"</b></td></tr>";
        ret_html = ret_html + "<tr><td>   </td></tr>";
        ret_html = ret_html + "<tr><td>"+serverLogSystemMessage.longSystemMessage+"</td></tr>";
        ret_html = ret_html + "<tr><td>   </td></tr>";
        ret_html = ret_html + "<tr><td>   </td></tr>";
       });  // end of this.serverLogSystemMessageWA_AR.forEach((serverLogSystemMessage)
    ret_html = ret_html + "</table></html>";
 


    return ret_html;
    }  // end of ZtMessage.prototype.getHtmlForServerLogSystemMessageWA_AR







function MaintainSetMemberWorkAreaRec(){
     this.setMemberID     = "";
     this.rawMsg_idx      = "";
     this.objectTemplZTIC = "";
     this.objectTemplCode = "";
     this.EffTimeStamp    = "";
     this.updateMode      = "";
     this.objectSet_idx   = "";
     this.objectValue_AR  = [];
     this.objectValue_HM  = new HashMap(); 
}
 

       

  
    
function QuerySetWorkAreaRec()  {
   this.rawMsg_idx             = "";
   this.setMemberID            = "";     //3100
   this.objectTemplateZTIC     = "";     //3101
   this.objectTemplateCode     = "";     //3102
   this.selectionMode          = "";     //3103
   this.selectionSet_idx_AR    = [];     //3110
} 


function QuerySelectionSetWorkAreaRec() {
   this.rawMsg_idx                       = "";
   this.querySetWA_rawMsg_idx            = "";
   this.selectionGroupNumber             = "";     //3112
   this.numberOfSelectionGroupParent     = "";     //3113
   this.setOperator                      = "";     //3114
   this.objectSelectionSet_idx_AR        = [];     //3120
}  

function QueryObjectSelectionSetWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.querySelSetWA_rawMsg_idx     = "";
   this.level                        = "";     //3122
   this.usage                        = "";     //3123
   this.objectSet_idx_AR             = [];     //3130
   this.objectElementSet_idx_AR      = [];     //3140
   this.typeSet_idx_AR               = [];     //3150
   this.linkSet_idx_AR               = [];     //3160
   this.additionSelectionSet_idx_AR  = [];     //3170
} 

function QueryObjectWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.objectSet_rawMsg_idx         = "";     //3130
   this.objectSelSet_rawMsg_idx      = "";
   this.objectKindZTIC               = "";     //3132
   this.objectKindCode               = "";     //3133
   this.objectZTIC                   = "";     //3134
   this.objectCode                   = "";     //3135
}

  
function QueryObjectElementWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.objectSelSet_rawMsg_idx      = "";
   this.objectElementZTIC            = "";    //3142
   this.objectElementCode            = "";    //3143
   this.selectionGroupNumber         = "";    //3144
   this.setOperator                  = "";    //3145
   this.operator                     = "";    //3146
   this.qualifier                    = "";    //3147
   this.value                        = "";    //3148
}


function QueryTypeWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.objectSelSet_rawMsg_idx      = "";
   this.typeDefinitionZTIC           = "";    //3152
   this.typeDefinitionCode           = "";    //3153
   this.typeValueZTIC                = "";    //3154
   this.typeValueCode                = "";    //3155
   this.selectionGroupNumber         = "";    //3156
   this.setOperator                  = "";    //3157
}


function QueryLinkWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.objectSelSet_rawMsg_idx      = "";
   this.linkTypeZTIC                 = "";   //3162
   this.linkTypeCode                 = "";   //3163
   this.linkToKindZTIC               = "";   //3164
   this.linkToKindCode               = "";   //3165
   this.linkToZTIC                   = "";   //3166
   this.linkToCode                   = "";   //3167
   this.selectionGroupNumber         = "";   //3168
   this.setOperator                  = "";   //3169
}

function QueryAdditionalWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.objectSelSet_rawMsg_idx      = "";
   this.usageType                    = "";   //3172
   this.objectZTIC                   = "";   //3173
   this.objectCode                   = "";   //3174
   this.selectionGroupNumber         = "";   //3175
   this.setOperator                  = "";   //3176
}


function QueryResponseSetWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.setMemberID                  = "";     //4100
   this.objectTemplateZTIC           = "";     //4101
   this.objectTemplateCode           = "";     //4102
   this.timestampEff                 = "";     //4103
   this.queryProcessingStatus_idx_AR = [];     //4110
   this.objectSet_AR                 = [];     //4130

}





function ZtObjectElementValue(objectKey, TE_ztic, TE_code, ek_defZTIC, ek_defCode, ek_valueZTIC, ek_valueCode, status, timestamp, seqNum, value) {
   this.objectjKey = objectKey;
   this.TE_ztic    = TE_ztic;
   this.TE_code    = TE_code;
   this.OE_ztic    = "";
   this.OE_code    = "";
   this.ek_defZTIC = ek_defZTIC;
   this.ek_defCode = ek_defCode;
   this.ek_valueZTIC    = ek_valueZTIC;
   this.ek_valueCode    = ek_valueCode;
   this.status          = status;
   this.timestamp       = timestamp;
   this.seqNum          = seqNum;
   this.value           = value;
 
} // end of function ZtObjectElementValue


function ZtObjectTypeValue(objectKey, typeDef_ztic, typeDef_code, typeValue_ztic, typeValue_code, status, timestamp, seqNum) {
   this.objectKey = objectKey;
   this.typeDef_ztic = typeDef_ztic;
   this.typeDef_code = typeDef_code;
   this.typeValue_ztic = typeValue_ztic;
   this.typeValue_code = typeValue_code;
   this.status         = status;
   this.timestamp      = timestamp;
   this.seqNum         = seqNum;

}  // end of function ZtObjectTypeValue


function ZtObjectLink(objectKey, linkType_ztic, linkType_code, linkToKind_ztic, linkToKind_code, linkToCode_ztic, linkToCode, linkValue, status, timestamp, seqNum) {
   this.objectKey = objectKey;
   this.linkType_ztic = linkType_ztic;
   this.linkType_code = linkType_code;
   this.linkToKind_ztic    = linkToKind_ztic;
   this.linkToKind_code    = linkToKind_code;
   this.linkToCode_ztic    = linkToCode_ztic;
   this.linkToCode         = linkToCode;
   this.linkValue          = linkValue;
   this.status             = status;
   this.timestamp          = timestamp;
   this.seqNum             = seqNum;


}  // end of function ZtObjectLinks


function ZtObjectTemplate(objectKey, templ_ztic, templ_code, status, timestamp, seqNum) {

    this.objectKey = objectKey;
    this.templ_ztic = templ_ztic;
    this.templ_code = templ_code;
    this.status     = status;
    this.timestamp  = timestamp;
    this.seqNum     = seqNum;


} // end of ZtObjectTemplate




function DsObject(tn_prfx, kindZTIC, kindCode, objZTIC, objCode) {
    this.tn_prfx  = tn_prfx.trim();
    this.kindZTIC = kindZTIC.trim();
    this.kindCode = kindCode.trim();
    this.objZTIC  = objZTIC.trim();
    this.objCode  = objCode.trim();
    this.keyString   = tn_prfx.trim()+"_"+kindZTIC.trim()+"_"+kindCode.trim()+"_"+objZTIC.trim()+"_"+objCode.trim();
    this.parentIdx = 0;
    this.linkLevel = 0;
    this.isPopulated = false;
    this.objElement_AR = [];
    this.link_AR       = [];
    this.typeValue_AR  = [];

    
} // end of function DsObject


function DsObjectId(tn_prfx, kindZTIC, kindCode, objectZTIC, objCode){
    this.tn_prfx = tn_prfx.trim();
    this.kindZTIC = kindZTIC.trim();
    this.kindCode = kindCode.trim();
    this.objZTIC  = objZTIC.trim();
    this.objCode  = objCode.trim();
    this.keyString   = tn_prfx.trim()+"_"+kindZTIC.trim()+"_"+kindCode.trim()+"_"+objZTIC.trim()+"_"+objCode.trim();;
}// end of function DsObjectId


function MessageRow(index, parent_index, priority, me_ztic, me_code, data) {
  this.index        = index;
  this.parent_index = parent_index;
  this.priority     = priority;
  this.me_ztic      = me_ztic;
  this.me_code      = me_code;
  this.data         = data;
 
}

//end insert 20190208


//inserted 20190214
function ZTICNS(code, namespace) {
   this.code = code;
   this.namespace = namespace;
} // end of function ZTICNS  inserted 20190214


//start 20250116

//end 20250116
    
 
module.exports = ZtMessage;

