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

//added 20170405
const cors = require('cors');
//const express = require('express');
//const app = express();

//app.use(cors());
// end added 20170405


//for(var i = 1; i < 1000000; i++){map.set(i, "val"+parseInt(i));}
 
//map.forEach(function(value, key) {
//    console.log(key + " : " + value);
//});

//var val2 = map.get("2_2_2_2");
//console.log("val2: " + val2);
//console.log("has key: "+map.has("3_3_3_3"));

var Client = require('node-rest-client').Client;
var fs = require('fs'); 
const { deprecate } = require('util');

///////var svr1 = new DsServer();
var object_HM = new HashMap();


//function ServerMessage() {
//  this.out_string = "";
//}


//ServerMessage.prototype.setOutString = function (stringx) {
//   this.out_string = stringx;
//}




//exports.setOutString = function (stringx)  {
//  this.out_string = stringx;
//  return;
//};


//function ZtMessage(serverZTICDomx, ztrawMsgArrayx) {                    // (del) 20200715
function ZtMessage(ztrawMsgArrayx) {                                      // 20200715
 //  this.serverZTICDom   = serverZTICDomx;                               // 20200715     
     this.serverZTICDom   = null;
 //   var ztic_dom_str = './zt_server_ztic_domain.js';                  //20191010
 //   this.ztic_dom = new (require(ztic_dom_str));                        //20191010

 //   this.tn_prefix = serverZTICDomx.dbzti_id;
    this.dbZtI_id = "";
    this.TargetNS = "";
    this.lastRawMsgIndex = 0;
    this.parentIndexWA1   = 0;
    this.parentIndexWA2   = 0;
    this.responseTopIndex = 0;
    this.queryResponseTopObject_elemSetIdx = 0;            // 20231128
    this.queryResponseTopObjectKeyStr = "";                // 20231128
    this.statisticalObjectsParentIndex = 0;   // 20230725
    this.dsiSetIdx        = 0;
    this.messageStatusParentIndex = 0;        // 20249216
    this.serverLogSystemMessageParentIndex = 0;
//    this.filename = filenamex;
    this.DsLineArray = [];
    this.ZtRawMessageAR = ztrawMsgArrayx;
   // this.ZtRawMessageAR = [];
    this.ZtMessageArray = [];
    this.ZtMessageResponse_Array = [];
    this.msgZTIC_Array     = [];
    this.MessageProcessingParametersGeneralWA = "";
    this.extendedKeyWA_AR                = [];
  //  this.MessageProcessingSoftwarePatchLevelWA = "";    (del) 20200211
    this.OEupdateWA_Array = [];         
    this.ObjectTemplateWA_Array = [];   
    this.TypeValueUpdateWA_Array = []; 
    this.LinkUpdateWA_Array = [];      
    this.objectTemplateWA_Array = [];   
    this.UpdateArray = [];
    this.assignedCode_HM     = new HashMap();
    this.assignedCodeForTempCode_HM = new HashMap();     //added 20200627
    this.maintainSetUpdateWA_Array             = [];     //added 20190706
    this.querySetMemberWA_AR                   = [];     //added 20190723
    this.querySelectionSetMemberWA_AR          = [];     //added 20190723
    this.queryObjectSelectionSetMemberWA_AR    = [];     //added 20190723
    this.queryObjectSetMemberWA_AR       = [];           //added 20190723
    this.queryObjectElementWA_AR         = [];           //added 20190723
    this.queryTypeWA_AR                  = [];           //added 20190723
    this.queryLinkWA_AR                  = [];           //added 20190723
    this.queryAdditionalWA_AR            = [];           //added 20190723
    this.queryStatisticalValuesObject_AR = [];           //added 20230525
    this.queryResponseSetMemberWA_AR     = [];           //added 20190723
    this.queryResponseObjectWA_AR        = [];           //added 20190723
    this.queryResponseObjectElementWA_AR = [];           //added 20190723
    this.queryResponseTypeWA_AR          = [];           //added 20190723
    this.queryResponseLinkWA_AR          = [];           //added 20190723
    this.queryResponseStatisticalValuesObject_AR = [];   //added 20230525
    this.queryResponseTVBTR_ObjectAndTemplate_AR = [];   //added 20231127 uses QueryResponseTypeValueBasedTemplateRuleObjectAndTemplateRec in ds2b00002_server_query.js
    this.responseMessageStatusWA_AR = [];           //added 20240211
    this.serverLogSystemMessageWA_AR     = [];           //added 20191220
    this.codeRangeUpdate_AR              = [];           //added 20200324
    this.validation_AR                   = [];           //added 20240128
    this.functionGroupSetLaunchPoint_AR  = [];           //added 20250205

    

  }



//commented out 20191106
////ZtMessage.prototype.setZtRawMessageAR = function(ztrawMsgArrayx) {

////    this.ZtRawMessageAR = ztrawMsgArrayx;

////}



////ZtMessage.prototype.setserverZTICDom = function(serverZTICDomx) {
////    this.serverZTICDom = serverZTICDomx;
////}
//end commented out 20191106


ZtMessage.prototype.listZtRawMessageAR = function() {
console.log("list of ZtRawMessageAR in zt_server_message.js: ACTIVATE IF NEEDED  ");
for (var i = 0; i < this.ZtRawMessageAR.length; i++) {  
  //  console.log(i, this.ZtRawMessageAR[i].parent_index,this.ZtRawMessageAR[i].priority,this.ZtRawMessageAR[i].me_disc,this.ZtRawMessageAR[i].me_code,this.ZtRawMessageAR[i].data);
  }

}




ZtMessage.prototype.setdbZtI_id = function(svr1) {
var targetZTICode;
for(i=0; i<this.ZtRawMessageAR.length; i++)
{
//console.log("priority for index: " + i+" is "+this.ZtRawMessageAR[i].priority);
   if(this.ZtRawMessageAR[i].me_ztic == 2 && this.ZtRawMessageAR[i].me_code == 223){ targetZTICode = this.ZtRawMessageAR[i].data;  }
}


//var TargetNS = "";
var parentIdxForZTIC = "";
for(i=0; i<this.ZtRawMessageAR.length; i++)
{
   if(this.ZtRawMessageAR[i].me_ztic == 2 && this.ZtRawMessageAR[i].me_code == 2100 && this.ZtRawMessageAR[i].data == targetZTICode){ parentIdxForZTIC = this.ZtRawMessageAR[i].parent_index;}
}


//console.log("list ZtRawMessageAR in setdbZtI_id");
for(i=0; i<this.ZtRawMessageAR.length; i++)
{
   //console.log("20250309a me_ztic/me_cztic_ARode: " + this.ZtRawMessageAR[i].me_ztic +"-" + this.ZtRawMessageAR[i].me_code +"-"+ this.ZtRawMessageAR[i].parent_index+"-"+this.ZtRawMessageAR[i].data);
   if(this.ZtRawMessageAR[i].me_ztic == 2 && this.ZtRawMessageAR[i].me_code == 2101 && this.ZtRawMessageAR[i].parent_index == parentIdxForZTIC){ this.TargetNS = this.ZtRawMessageAR[i].data; console.log("found TargetNS: "+this.TargetNS);}
}

//console.log("TargetNS:: "+ this.TargetNS);
//var   dbZtI_id="";
//TargetNS = "abc.com/test1";   // temp hard-code 20181004

 // find table name prefix 
//console.log("svr1.ZTICDomain_AR.length: "+svr1.ZTICDomain_AR.length); 
  for (var i = 0; i < svr1.ZTICDomain_AR.length; i++) {
      //for (var j = 0; j < svr1.ZTICDomain_AR[i].ZTICNS_AR.length; j++) {
       // console.log("svr1.ZTICDomain inside app.post: " + svr1.ZTICDomain_AR[i].dbzti_id + " "+svr1.ZTICDomain_AR[i].ZTICNS_AR[0].namespace);
        //console.log("code and ns: "+svr1.ZTICDomain_AR[i].ZTICNS_AR[0].code +" "+ svr1.ZTICDomain_AR[i].ZTICNS_AR[0].namespace+" "+svr1.ZTICDomain_AR[i].dbzti_id);
          if(svr1.ZTICDomain_AR[i].ZTICNS_AR[0].code == 1 && svr1.ZTICDomain_AR[i].ZTICNS_AR[0].namespace == this.TargetNS )
           {this.dbZtI_id =   svr1.ZTICDomain_AR[i].dbzti_id;
            this.serverZTICDom = svr1.ZTICDomain_AR[i];             // 20200715
            //console.log("found dbzti_id: "+ this.dbZtI_id+"  NS: "+this.TargetNS);  
         }
      
      //}  //end loop through zticDomSet.ZTICDom_AR
  } // end loop through zticDomSet
   
// end of find table name prefix
}  // end of ZtMessage.prototype.setdbZtI_id = function()


 


ZtMessage.prototype.findZTIC = function(dsmsg) {



//function ZtMessage(serverZTICDomx, finenamex) {
//    this.serverZTICDom   = serverZTICDom;
//    this.tn_prefix = serverZTICDomx.dbzti_id;

    var nextCode = 1;
//    for (var j = 0; j < result.length; j++){
      for (var j = 0; j < this.serverZTICDom.ZTICNS_AR.length; j++){
//      if(parseInt(result[j].te_2_4) == nextCode || parseInt(result[j].te_2_4) > nextCode) {nextCode = result[j].te_2_4; nextCode++;   }
        if(parseInt(this.serverZTICDom.ZTICNS_AR[j].code) == nextCode || parseInt(this.serverZTICDom.ZTICNS_AR[j].code) > nextCode) {nextCode = this.serverZTICDom.ZTICNS_AR[j].code; nextCode++;  }
      } // endfor loop through this.serverZTICDom.ZTICNS_AR  
    //} //endfor loop through result
     var found = false;
    // console.log("-msgZTIC_Array length: " + dsmsg.msgZTIC_Array.length);
    // console.log("-zticDomNS_AR length: " + this.serverZTICDom.ZTICNS_AR.length);
     //console.log("result length: "     + result.length);
     //for (var i= 0; i < dsmsg.msgZTIC_Array.length; i++) {
     for (var i= 0; i < dsmsg.msgZTIC_Array.length; i++) {
//          if (result.length == 0) {dsmsg.msgZTIC_Array[i].targetZTIC = nextCode; dsmsg.msgZTIC_Array[i].found_in_db = false;}
          
          found = false;
          //for (var j = 0; j < result.length; j++){
          for (var j = 0; j < this.serverZTICDom.ZTICNS_AR.length; j++){
           // console.log("result[j].te_2_4: " + result[j].te_2_4);
           // if (parseInt(result[j].te_2_4) > nextCode) {nextCode = parseInt(result[j].te_2_4) + 1;}
           // console.log("dsmsg namespace " +dsmsg.msgZTIC_Array[i].namespace+" result: " + result[j].te_2_31+" found? "+dsmsg.msgZTIC_Array[i].found_in_db);
       //     if (result[j].te_2_31 == dsmsg.msgZTIC_Array[i].namespace ) { dsmsg.msgZTIC_Array[i].targetZTIC = result[j].te_2_4; dsmsg.msgZTIC_Array[i].found_in_db = true; found = true; console.log("found in db: "+ result[j].te_2_31); break;} 
          // console.log("serverZTICDom.ZTICNS_AR / dsmsg.msgZTIC_Array[i] in findZTIC: "+this.serverZTICDom.ZTICNS_AR[j].namespace +" / "+ dsmsg.msgZTIC_Array[i].namespace);
           if (this.serverZTICDom.ZTICNS_AR[j].namespace == dsmsg.msgZTIC_Array[i].namespace ) { dsmsg.msgZTIC_Array[i].targetZTIC = this.serverZTICDom.ZTICNS_AR[j].code; dsmsg.msgZTIC_Array[i].found_in_db = true; found = true; break;}
           }  //endfor result
           if (found == false)
           {  
           // console.log("nextCode in findZTIC found == false: "+nextCode);                
            dsmsg.msgZTIC_Array[i].targetZTIC = nextCode;
            dsmsg.msgZTIC_Array[i].found_in_db = false;
            var zticns = new ZTICNS(nextCode, dsmsg.msgZTIC_Array[i].namespace);
            this.serverZTICDom.ZTICNS_AR.push(zticns);
            nextCode++;
            }
            //console.log(result[j].te_2_31);
            
            // update db with new namespace  
            //if (dsmsg.msgZTIC_Array[i].found_in_db == 

      } //endfor msgZTIC_Array  


//console.log("msgZTIC_Array.length: "+dsmsg.msgZTIC_Array.length);
for ( var i = 0; i < dsmsg.msgZTIC_Array.length; i++){
//console.log("targetZTIC: "+ dsmsg.msgZTIC_Array[i].targetZTIC);
}


// 20200405 convert ZTIC for MessageProcessingParametersGeneralWorkAreaRec
//function MessageProcessingParametersGeneralWorkAreaRec(){
//    this.defaultEffectiveTimestamp = "";     //2301
//    this.messageIdClient           = "";     //2302
//    this.indexOfLastRequestSegment = "";     //2303
//    this.defaultUpdateMode         = "";     //2304
//    this.user                      = "";     //2305
//    this.softwarePatchLevelZTIC    = "";     //2306
//    this.softwarePatchLevelCode    = "";     //2307



   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
   // console.log("20200405 this.MessageProcessingParametersGeneralWA.softwarePatchLevelZTIC-this.msgZTIC_Array[j].msgZTIC:  "+ this.MessageProcessingParametersGeneralWA.softwarePatchLevelZTIC + " - "+ this.msgZTIC_Array[j].msgZTIC)
       if (this.MessageProcessingParametersGeneralWA.serverSoftwareRuntimeProfileZTIC == this.msgZTIC_Array[j].msgZTIC) { this.MessageProcessingParametersGeneralWA.serverSoftwareRuntimeProfileZTIC = this.msgZTIC_Array[j].targetZTIC; break; }

   }  // endfor msgZTIC_Array
// end 20200405


// 20200218 convert ZTIC to targetZTICs for extended key
//function ExtendedKeyWorkAreaRec(){
//    this.extendedKeySetMember_idx        = "";
//    this.rawMsg_idx                      = "";
//    this.extendedKeyDefinitionCodeZTIC   = "";   //2311
//    this.extendedKeyDefinitionCode       = "";   //2312
//    this.extendedKeyValueZTIC            = "";   //2313
//    this.extendedKeyValueCode            = "";   //2314

for (var i = 0; i < this.extendedKeyWA_AR.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.extendedKeyWA_AR[i].extendedKeyDefinitionCodeZTIC == this.msgZTIC_Array[j].msgZTIC) { this.extendedKeyWA_AR[i].extendedKeyDefinitionCodeZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
  
   }  // endfor msgZTIC_Array
} //endfor

for (var i = 0; i < this.extendedKeyWA_AR.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.extendedKeyWA_AR[i].extendedKeyValueZTIC == this.msgZTIC_Array[j].msgZTIC) { this.extendedKeyWA_AR[i].extendedKeyValueZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
  
   }  // endfor msgZTIC_Array
} //endfor

// end convert ztic for extended key

//convert ZTICs to targetZTICs 
for (var i = 0; i < this.OEupdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.OEupdateWA_Array[i].objectKindZTIC == this.msgZTIC_Array[j].msgZTIC) { this.OEupdateWA_Array[i].objectKindZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
  
   }  // endfor msgZTIC_Array
}  // endfor OEupdateWA_Array

for (var i = 0; i < this.OEupdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.OEupdateWA_Array[i].objectZTIC == this.msgZTIC_Array[j].msgZTIC) { this.OEupdateWA_Array[i].objectZTIC = this.msgZTIC_Array[j].targetZTIC; break;}
   }  // endfor msgZTIC_Array
}  // endfor OEupdateWA_Array

//20191113 (added)
for (var i = 0; i < this.OEupdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.OEupdateWA_Array[i].templateZTIC == this.msgZTIC_Array[j].msgZTIC) { this.OEupdateWA_Array[i].templateZTIC = this.msgZTIC_Array[j].targetZTIC; break;}
   }  // endfor msgZTIC_Array
}  // endfor OEupdateWA_Array


for (var i = 0; i < this.OEupdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.OEupdateWA_Array[i].objectElementZTIC == this.msgZTIC_Array[j].msgZTIC) { this.OEupdateWA_Array[i].objectElementZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor OEupdateWA_Array

for (var i = 0; i < this.OEupdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.OEupdateWA_Array[i].tableElementZTIC == this.msgZTIC_Array[j].msgZTIC) { this.OEupdateWA_Array[i].tableElementZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor OEupdateWA_Array



//convert ZTICs to targetZTICs for type value

for (var i = 0; i < this.TypeValueUpdateWA_Array.length; i++) {
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.TypeValueUpdateWA_Array[i].objectKindZTIC == this.msgZTIC_Array[j].msgZTIC) { this.TypeValueUpdateWA_Array[i].objectKindZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor TypeValueUpdateWA_Array

for (var i = 0; i < this.TypeValueUpdateWA_Array.length; i++) {
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.TypeValueUpdateWA_Array[i].objectZTIC == this.msgZTIC_Array[j].msgZTIC) { this.TypeValueUpdateWA_Array[i].objectZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor TypeValueUpdateWA_Array


for (var i = 0; i < this.TypeValueUpdateWA_Array.length; i++) {
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.TypeValueUpdateWA_Array[i].templateZTIC == this.msgZTIC_Array[j].msgZTIC) { this.TypeValueUpdateWA_Array[i].templateZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor TypeValueUpdateWA_Array


for (var i = 0; i < this.TypeValueUpdateWA_Array.length; i++) {
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.TypeValueUpdateWA_Array[i].typeDefinitionZTIC == this.msgZTIC_Array[j].msgZTIC) { this.TypeValueUpdateWA_Array[i].typeDefinitionZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor TypeValueUpdateWA_Array

for (var i = 0; i < this.TypeValueUpdateWA_Array.length; i++) {
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.TypeValueUpdateWA_Array[i].typeValueZTIC == this.msgZTIC_Array[j].msgZTIC) { this.TypeValueUpdateWA_Array[i].typeValueZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor TypeValueUpdateWA_Array




//convert ZTICs to targetZTICs for links
for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.LinkUpdateWA_Array[i].objectKindZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].objectKindZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor LinkUpdateWA_Array

for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.LinkUpdateWA_Array[i].objectZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].objectZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor LinkUpdateWA_Array

for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.LinkUpdateWA_Array[i].templateZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].templateZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor LinkUpdateWA_Array

for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.LinkUpdateWA_Array[i].linkTypeZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].linkTypeZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor LinkUpdateWA_Array

for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.LinkUpdateWA_Array[i].linkToKindZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].linkToKindZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor LinkUpdateWA_Array

for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.LinkUpdateWA_Array[i].linkToCodeZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].linkToCodeZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // endfor LinkUpdateWA_Array

// end of convert ZTICs to targetZTICs for links


///////dsmsg.findTableElements_asynch(dsmsg);   (del) 20181025

//dsmsg.msgUpdate();

// start of convert ZTIC for query
//console.log("20191105 start convert for query in zt_server_message.js findZTIC()");
for (var i = 0; i < this.querySetMemberWA_AR.length; i++){
   //console.log("20191029 this.querySetMemberWA_AR[i].objectTemplateZTIC: "+this.querySetMemberWA_AR[i].objectTemplateZTIC);
   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.querySetMemberWA_AR[i].objectTemplateZTIC == this.msgZTIC_Array[j].msgZTIC) { this.querySetMemberWA_AR[i].objectTemplateZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array
}  // querySetMemberWA_AR



for (var i = 0; i < this.queryObjectSetMemberWA_AR.length; i++){

   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.queryObjectSetMemberWA_AR[i].objectKindZTIC == this.msgZTIC_Array[j].msgZTIC)  { this.queryObjectSetMemberWA_AR[i].objectKindZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array

} // endfor queryObjectSetMemberWA_AR


for (var i = 0; i < this.queryObjectSetMemberWA_AR.length; i++){

   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
       if (this.queryObjectSetMemberWA_AR[i].objectZTIC == this.msgZTIC_Array[j].msgZTIC)  { this.queryObjectSetMemberWA_AR[i].objectZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
   }  // endfor msgZTIC_Array

} // endfor queryObjectSetMemberWA_AR



}  // end of ZtMessage.prototype.findZTIC


//20191106- commented out ZtMessage.prototype.findZTIC2
/////ZtMessage.prototype.findZTIC2 = function(dsmsg) {

///// //function ZTICDomain() {
///// //   this.dbzti_id = "";
///// //   this.ZTICNS_AR = [];
///// //} // end of function ZTICDomain

///// //function ZtMessage(zticDomx, finenamex) {
///// //    this.zticDom   = zticDom;
///// //    this.tn_prefix = zticDomx.dbzti_id;

/////    var nextCode = 1;
///// //    for (var j = 0; j < result.length; j++){
/////      for (var j = 0; j < this.zticDom.ZTICNS_AR.length; j++){
///// //      if(parseInt(result[j].te_2_4) == nextCode || parseInt(result[j].te_2_4) > nextCode) {nextCode = result[j].te_2_4; nextCode++;   }
/////        if(parseInt(this.zticDom.ZTICNS_AR[j].code) == nextCode || parseInt(this.zticDom.ZTICNS_AR[j].code) > nextCode) {nextCode = this.zticDom.ZTICNS_AR[j].code; nextCode++;  }
/////      } // endfor loop through this.zticDom.ZTICNS_AR  
/////    //} //endfor loop through result
/////     var found = false;
/////     console.log("-msgZTIC_Array length: " + dsmsg.msgZTIC_Array.length);
/////     console.log("-zticDomNS_AR length: " + this.zticDom.ZTICNS_AR.length);
/////     //console.log("result length: "     + result.length);
/////     //for (var i= 0; i < dsmsg.msgZTIC_Array.length; i++) {
/////     for (var i= 0; i < dsmsg.msgZTIC_Array.length; i++) {
///// //          if (result.length == 0) {dsmsg.msgZTIC_Array[i].targetZTIC = nextCode; dsmsg.msgZTIC_Array[i].found_in_db = false;}
/////          
/////          found = false;
/////          //for (var j = 0; j < result.length; j++){
/////          for (var j = 0; j < this.zticDom.ZTICNS_AR.length; j++){
/////           // console.log("result[j].te_2_4: " + result[j].te_2_4);
/////           // if (parseInt(result[j].te_2_4) > nextCode) {nextCode = parseInt(result[j].te_2_4) + 1;}
/////           // console.log("dsmsg namespace " +dsmsg.msgZTIC_Array[i].namespace+" result: " + result[j].te_2_31+" found? "+dsmsg.msgZTIC_Array[i].found_in_db);
/////       //     if (result[j].te_2_31 == dsmsg.msgZTIC_Array[i].namespace ) { dsmsg.msgZTIC_Array[i].targetZTIC = result[j].te_2_4; dsmsg.msgZTIC_Array[i].found_in_db = true; found = true; console.log("found in db: "+ result[j].te_2_31); break;} 
/////           console.log("zticDom.ZTICNS_AR / dsmsg.msgZTIC_Array[i] in findZTIC: "+this.zticDom.ZTICNS_AR[j].namespace +" / "+ dsmsg.msgZTIC_Array[i].namespace);
/////           if (this.zticDom.ZTICNS_AR[j].namespace.toString().trim() == dsmsg.msgZTIC_Array[i].namespace.toString().trim() ) { dsmsg.msgZTIC_Array[i].targetZTIC = this.zticDom.ZTICNS_AR[j].code.toString().trim(); dsmsg.msgZTIC_Array[i].found_in_db = true; found = true; console.log("found in zticDom: "+ this.zticDom.ZTICNS_AR[j].namespace); break;}
/////           }  //endfor result
/////           if (found == false)
/////           {  
/////           console.log("nextCode in findZTIC found == false: "+nextCode);                
/////            dsmsg.msgZTIC_Array[i].targetZTIC = nextCode;
/////            dsmsg.msgZTIC_Array[i].found_in_db = false;
/////            var zticns = new ZTICNS(nextCode, dsmsg.msgZTIC_Array[i].namespace);
/////            this.zticDom.ZTICNS_AR.push(zticns);
/////            nextCode++;
/////            }
/////            //console.log(result[j].te_2_31);
            
/////            // update db with new namespace  
/////            //if (dsmsg.msgZTIC_Array[i].found_in_db == 

/////      } //endfor msgZTIC_Array  


///// //console.log("msgZTIC_Array.length: "+dsmsg.msgZTIC_Array.length);
/////for ( var i = 0; i < dsmsg.msgZTIC_Array.length; i++){
///// //console.log("targetZTIC: "+ dsmsg.msgZTIC_Array[i].targetZTIC);
/////}

///// //convert ZTICs to targetZTICs 
///// for (var i = 0; i < this.OEupdateWA_Array.length; i++){
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
//////       if (this.OEupdateWA_Array[i].objectKindZTIC == this.msgZTIC_Array[j].msgZTIC) { this.OEupdateWA_Array[i].objectKindZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
  
/////   }  // endfor msgZTIC_Array
/////}  // endfor OEupdateWA_Array

//////for (var i = 0; i < this.OEupdateWA_Array.length; i++){
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.OEupdateWA_Array[i].objectZTIC == this.msgZTIC_Array[j].msgZTIC) { this.OEupdateWA_Array[i].objectZTIC = this.msgZTIC_Array[j].targetZTIC; break;}
/////   }  // endfor msgZTIC_Array
/////}  // endfor OEupdateWA_Array


/////for (var i = 0; i < this.OEupdateWA_Array.length; i++){
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.OEupdateWA_Array[i].objectElementZTIC == this.msgZTIC_Array[j].msgZTIC) { this.OEupdateWA_Array[i].objectElementZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor OEupdateWA_Array

/////for (var i = 0; i < this.OEupdateWA_Array.length; i++){
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.OEupdateWA_Array[i].tableElementZTIC == this.msgZTIC_Array[j].msgZTIC) { this.OEupdateWA_Array[i].tableElementZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor OEupdateWA_Array



///// //convert ZTICs to targetZTICs for type values

/////for (var i = 0; i < this.TypeValueUpdateWA_Array.length; i++) {
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.TypeValueUpdateWA_Array[i].objectKindZTIC == this.msgZTIC_Array[j].msgZTIC) { this.TypeValueUpdateWA_Array[i].objectKindZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor TypeValueUpdateWA_Array

/////for (var i = 0; i < this.TypeValueUpdateWA_Array.length; i++) {
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.TypeValueUpdateWA_Array[i].objectZTIC == this.msgZTIC_Array[j].msgZTIC) { this.TypeValueUpdateWA_Array[i].objectZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor TypeValueUpdateWA_Array

/////for (var i = 0; i < this.TypeValueUpdateWA_Array.length; i++) {
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.TypeValueUpdateWA_Array[i].typeDefinitionZTIC == this.msgZTIC_Array[j].msgZTIC) { this.TypeValueUpdateWA_Array[i].typeDefinitionZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor TypeValueUpdateWA_Array

/////for (var i = 0; i < this.TypeValueUpdateWA_Array.length; i++) {
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.TypeValueUpdateWA_Array[i].typeValueZTIC == this.msgZTIC_Array[j].msgZTIC) { this.TypeValueUpdateWA_Array[i].typeValueZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor TypeValueUpdateWA_Array




///// //convert ZTICs to targetZTICs for links
/////for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.LinkUpdateWA_Array[i].objectKindZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].objectKindZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor LinkUpdateWA_Array

/////for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.LinkUpdateWA_Array[i].objectZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].objectZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor LinkUpdateWA_Array

/////for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.LinkUpdateWA_Array[i].linkTypeZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].linkTypeZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor LinkUpdateWA_Array

/////for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.LinkUpdateWA_Array[i].linkToKindZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].linkToKindZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor LinkUpdateWA_Array

/////for (var i = 0; i < this.LinkUpdateWA_Array.length; i++){
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.LinkUpdateWA_Array[i].linkToCodeZTIC == this.msgZTIC_Array[j].msgZTIC) { this.LinkUpdateWA_Array[i].linkToCodeZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // endfor LinkUpdateWA_Array

///// // end of convert ZTICs to targetZTICs for links



///// // start of convert ZTIC for query
///// console.log("20191105 start convert for query in zt_server_message.js");
/////for (var i = 0; i < this.querySetMemberWA_AR.length; i++){
/////   console.log("20191029 this.querySetMemberWA_AR[i].objectTemplateZTIC: "+this.querySetMemberWA_AR[i].objectTemplateZTIC);
/////   for (var j = 0; j < this.msgZTIC_Array.length; j++) {
/////       if (this.querySetMemberWA_AR[i].objectTemplateZTIC == this.msgZTIC_Array[j].msgZTIC) { this.querySetMemberWA_AR[i].objectTemplateZTIC = this.msgZTIC_Array[j].targetZTIC; break; }
/////   }  // endfor msgZTIC_Array
/////}  // querySetMemberWA_AR


///// // end of convert ZTIC for query


///// //dsmsg.findTableElements_asynch(dsmsg);
/////dsmsg.findTableElements2(dsmsg);

///// //dsmsg.msgUpdate();



/////}  // end of ZtMessage.prototype.findZTIC2
 

// (del) 20191110
/////ZtMessage.prototype.findTableElements2 = function(dsmsg) {
///// //var obj_key = serverZTICDom.dbzti_id.trim()+"_"+result[j].te_2_1.trim()+"_"+ result[j].te_2_2.trim()+"_"+ result[j].te_2_3.trim()+"_"+ result[j].te_2_4.trim();
////svr1.ZtObject_HM.forEach(function(value, key) {
////    //console.log(key + " : " + value);
////});

////} // end of ZtMessage.prototype.findTableElements2


// (del) 20191110
/////ZtMessage.prototype.findTableElementsCallback = function(err, result, dsmsg) {
/////     for  ( var i = 0; i < dsmsg.OEupdateWA_Array.length; i++){
/////       // loop through object elements to find table elements as type values
/////       for (var j = 0; j < result.length; j++){
/////         console.log("found object element : "+result[j].te_2_2+"  - TE ZTIC "+result[j].te_2_15+"  - TE Code "+result[j].te_2_16);
/////          if (result[j].te_2_2 == dsmsg.OEupdateWA_Array[i].objectElementCode)
/////          {
/////             dsmsg.OEupdateWA_Array[i].tableElementZTIC = result[j].te_2_15;
/////             dsmsg.OEupdateWA_Array[i].tableElementCode = result[j].te_2_16;
/////          }  // endif result[j].te_2_2 == dsmsg.OE.updateWA_array[i].objectElementCode
/////       } // endfor loop through result
/////     } // endfor loop through OEupdateWA_Array
     
/////   dsmsg.msgUpdate();  
/////} // end of prototype.findTableElementsCallback


//(del) 20191110
/////ZtMessage.prototype.findTableElements_asynch = function(dsmsg) {
///// //te_2_2 : "3", te_2_6 : "3", te_2_14: "1"} 2_2=object kind code, 2_6=rec type for type table, 2_14=type def code
///// //object kind 3 is for object elements
/////var query = Msg.find().where({ te_2_2 : "3", te_2_6 : "3", te_2_14: "1"});
/////query.exec(function(err, result) {
/////   if (!err) {
/////     //console.log("start of namespaces");
/////     dsmsg.findTableElementsCallback(null, result, dsmsg);
/////
/////    } else {
/////               // error handling
/////    }; //end if (!err)
///// 
/////
///// });  
/////
///////////////////////////////////////} // end of query
/////
/////} // end of findTableElements_asynch




ZtMessage.prototype.showOEupdateWA = function() {
//console.log("show ZTIC");
for (var i= 0; i < this.msgZTIC_Array.length; i++) {
   //console.log(this.msgZTIC_Array[i].root_idx,
    //    this.msgZTIC_Array[i].header_idx,
    //    this.msgZTIC_Array[i].dsiSet_idx,
    //    this.msgZTIC_Array[i].dsi_idx,
    //    this.msgZTIC_Array[i].msgZTIC_idx,
    //    this.msgZTIC_Array[i].namespace_idx,
    //    this.msgZTIC_Array[i].msgZTIC,
    //    this.msgZTIC_Array[i].namespace)
        }
     


//console.log("show OEupdateWA_Array");
for (var i = 0; i < this.OEupdateWA_Array.length; i++) {
     
     //console.log(this.OEupdateWA_Array[i].root_idx,
      //this.OEupdateWA_Array[i].request_idx,
      // this.OEupdateWA_Array[i].maintainSet_idx,
      //  this.OEupdateWA_Array[i].maintainSetMember_idx,
      //   this.OEupdateWA_Array[i].objectSet_idx,
      //    this.OEupdateWA_Array[i].object_idx,
      //     this.OEupdateWA_Array[i].OE_set_idx,
      //      this.OEupdateWA_Array[i].OE_idx,
      //       this.OEupdateWA_Array[i].OE_value_idx,
      //        this.OEupdateWA_Array[i].objectKindZTIC,
      //         this.OEupdateWA_Array[i].objectKindCode,
      //          this.OEupdateWA_Array[i].objectZTIC,
      //           this.OEupdateWA_Array[i].objectCode,
      //            this.OEupdateWA_Array[i].objectElementZTIC,
      //             this.OEupdateWA_Array[i].objectElementCode,
      //              this.OEupdateWA_Array[i].objectElementValue);
}

}// end of showOEupdateWA




ZtMessage.prototype.updateMaintainSetWA = function(svr1) {
//start 20190708
///    this.dbzti_id  = dbzti_id;
///    this.kindZTIC = kindZTIC.trim();
///    this.kindCode = kindCode.trim();
///    this.objZTIC  = objZTIC.trim();
///    this.objCode  = objCode.trim();
///    this.keyString   = dbzti_id+"_"+kindZTIC.trim()+"_"+kindCode.trim()+"_"+objZTIC.trim()+"_"+objCode.trim();
///    this.parentIdx = 0;   // reveiw
///    this.linkLevel = 0;   // review
///    this.isPopulated = false;  // review
///    this.objElement_idx_AR = [];
///    this.link_idx_AR       = [];
///    this.typeValue_idx_AR  = [];

//  var timestamp_test = new (require('./zt_server_time.js'));   // 20220803  put in to solve null timestamp at ZtObject.getTechnicalProfileIdx_AR_ForTemplateDef (zt_server_object.js:993:80)  REVISIT
//  var timestamp_testx = timestamp_test.now();  // 20220803  REVISIT
//  console.log("timestamp_testx: "+timestamp_testx);

  //console.log("running ZtMessage.updateMaintainSetWA in zt_server_message.js");
  //console.log("20200126 this.OEupdateWA_Array.length: "+this.OEupdateWA_Array.length);
  for (var j = 0; j < this.maintainSetUpdateWA_Array.length; j++) {   //20200126
   for (var i = 0; i < this.OEupdateWA_Array.length; i++) {
        // 20200213 start
        //console.log("20200225 this.OEupdateWA_Array[i].newCode: "+this.OEupdateWA_Array[i].newCode);
//getAssignedCode = function(svr1, dbZtI_idx, objectKindZTICx, objectKindCodex, objectZTICx, objectCodex, newCodex, timestampx)

    //  for (var j = 0; j < this.maintainSetUpdateWA_Array.length; j++) {  //(del) 20200126
          if(this.maintainSetUpdateWA_Array[j].rawMsg_idx == this.OEupdateWA_Array[i].maintainSetMember_idx)
          {
   //console.log("this.maintainSetUpdateWA_Array[j].effTimestamp: "+this.maintainSetUpdateWA_Array[j].effTimestamp);
       var assigned_code = this.getAssignedCode(svr1, this.dbZtI_id, this.OEupdateWA_Array[i].objectKindZTIC, this.OEupdateWA_Array[i].objectKindCode, this.OEupdateWA_Array[i].objectZTIC, this.OEupdateWA_Array[i].objectCodeTemp, this.OEupdateWA_Array[i].newCode.trim(), this.maintainSetUpdateWA_Array[j].effTimestamp );
//var assigned_code = this.getAssignedCode(svr1, this.dbZtI_id, this.OEupdateWA_Array[i].objectKindZTIC, this.OEupdateWA_Array[i].objectKindCode, this.OEupdateWA_Array[i].objectZTIC, this.OEupdateWA_Array[i].objectCodeTemp, this.OEupdateWA_Array[i].newCode.trim(), timestamp_testx ); // 20220803  REVISIT
        // 20200213 end
       this.OEupdateWA_Array[i].objectCode = assigned_code;  // 20200323


      var obj_key = this.dbZtI_id.trim()+"_"+this.OEupdateWA_Array[i].objectKindZTIC.toString().trim()+"_"+ this.OEupdateWA_Array[i].objectKindCode.toString().trim()+"_"+ this.OEupdateWA_Array[i].objectZTIC.toString().trim()+"_"+ this.OEupdateWA_Array[i].objectCode.toString().trim();
           //console.log("20200126 obj_key OE: "+obj_key);    
          if (this.maintainSetUpdateWA_Array[j].objectValue_HM.has(obj_key)){
                var objvals_existing_idx = this.maintainSetUpdateWA_Array[j].objectValue_HM.get(obj_key);
                //console.log("objvals_existing_idx for OE 20190911: "+objvals_existing_idx);
                var objvals_existing     = this.maintainSetUpdateWA_Array[j].objectValue_AR[objvals_existing_idx];
                objvals_existing.objElement_idx_AR.push(i);
               }
          else
               {

       var objvals = new ObjectValueUpdateWorkAreaRec(this.dbZtI_id.trim(), this.OEupdateWA_Array[i].objectKindZTIC.toString().trim(), this.OEupdateWA_Array[i].objectKindCode.toString().trim(), this.OEupdateWA_Array[i].objectZTIC.toString().trim(), this.OEupdateWA_Array[i].objectCode.toString().trim(), this.OEupdateWA_Array[i].objectCodeTemp.toString().trim(), this.OEupdateWA_Array[i].newCode)
                     objvals.objElement_idx_AR.push(i);
                     var objvals_idx = this.maintainSetUpdateWA_Array[j].objectValue_AR.push(objvals) -1;
                     this.maintainSetUpdateWA_Array[j].objectValue_HM.set(obj_key, objvals_idx);
               }//endif  this.maintainSetUpdateWA_Array[j].objectValue_HM.has(obj_key)
          }//endif maintainSetUpdateWA_Array[j].rawMsg_idx == this.OEupdateWA_Array[i].maintainSetMember_idx
       //}  //endfor loop at this.maintainSetUpdateWA_Array    // (del) 20200126
   }  // endfor loop at this.OEupdateWA_Array


   for (var i = 0; i < this.TypeValueUpdateWA_Array.length; i++) {
   //  for (var j = 0; j < this.maintainSetUpdateWA_Array.length; j++) {  // (del) 20200126
       if(this.maintainSetUpdateWA_Array[j].rawMsg_idx == this.TypeValueUpdateWA_Array[i].maintainSetMember_idx)
       {

        var assigned_code = this.getAssignedCode(svr1, this.dbZtI_id, this.TypeValueUpdateWA_Array[i].objectKindZTIC, this.TypeValueUpdateWA_Array[i].objectKindCode, this.TypeValueUpdateWA_Array[i].objectZTIC, this.TypeValueUpdateWA_Array[i].objectCodeTemp, this.TypeValueUpdateWA_Array[i].newCode.trim(), this.maintainSetUpdateWA_Array[j].effTimestamp );                   // 20200324
       this.TypeValueUpdateWA_Array[i].objectCode = assigned_code;  // 20200324


      var obj_key = this.dbZtI_id.trim()+"_"+this.TypeValueUpdateWA_Array[i].objectKindZTIC.toString().trim()+"_"+ this.TypeValueUpdateWA_Array[i].objectKindCode.toString().trim()+"_"+ this.TypeValueUpdateWA_Array[i].objectZTIC.toString().trim()+"_"+ this.TypeValueUpdateWA_Array[i].objectCode.toString().trim();
      //console.log("obj_key type vals 20190918: "+obj_key);
      if (this.maintainSetUpdateWA_Array[j].objectValue_HM.has(obj_key)){
            var objvals_existing_idx = this.maintainSetUpdateWA_Array[j].objectValue_HM.get(obj_key);  //20190911
            var objvals_existing     = this.maintainSetUpdateWA_Array[j].objectValue_AR[objvals_existing_idx];  //20190911
            //console.log("objvals_existing 20190917: "+objvals_existing);
            //var objvals_existing = this.maintainSetUpdateWA_Array[j].objectValue_HM.get(obj_key);  (del) 20190911
            objvals_existing.typeValue_idx_AR.push(i);      
       }
       else
       {     var objvals = new ObjectValueUpdateWorkAreaRec(this.dbZtI_id.trim(), this.TypeValueUpdateWA_Array[i].objectKindZTIC.toString().trim(), this.TypeValueUpdateWA_Array[i].objectKindCode.toString().trim(), this.TypeValueUpdateWA_Array[i].objectZTIC.toString().trim(), this.TypeValueUpdateWA_Array[i].objectCode.toString().trim(), this.TypeValueUpdateWA_Array[i].objectCodeTemp.toString().trim(), this.TypeValueUpdateWA_Array[i].newCode)
                     objvals.typeValue_idx_AR.push(i);
                     var objvals_idx = this.maintainSetUpdateWA_Array[j].objectValue_AR.push(objvals) -1;

                     this.maintainSetUpdateWA_Array[j].objectValue_HM.set(obj_key, objvals );
         }//endif  this.maintainSetUpdateWA_Array[j].objectValue_HM.has(obj_key)

       } // endif  maintainSetUpdateWA_Array[j].rawMsg_idx == this.TypeValueUpdateWA_Array[i].maintainSetMember_idx

    // }  //endfor loop at this.maintainSetUpdateWA_Array    (del) 20200126
// start 20211018 addServerGeneratedLinkToMaintainSetUpdateWA_Array

      //console.log("## 20220815 this.MessageProcessingParametersGeneralWA.defaultUpdateMode: "+this.MessageProcessingParametersGeneralWA.defaultUpdateMode);
     if(this.MessageProcessingParametersGeneralWA.defaultUpdateMode != 99){   // 20220815
      this.addServerGeneratedLinkToMaintainSetUpdateWA_Array(svr1, this.TypeValueUpdateWA_Array[i], this.maintainSetUpdateWA_Array[j].effTimestamp);  //(temp del) 20220206
     }  // 20220815  endif
// end 20211018 
   } // end loop at TypeValueUpdateWA_Array



   for (var i = 0; i < this.LinkUpdateWA_Array.length; i++) {
    // for (var j = 0; j < this.maintainSetUpdateWA_Array.length; j++) {  (del) 20200126
       if(this.maintainSetUpdateWA_Array[j].rawMsg_idx == this.LinkUpdateWA_Array[i].maintainSetMember_idx)
       {
      //console.log("dbZtI_id 20190912: "+this.dbZtI_id);
      //  console.log("20200728f in zt_server_message.js this.LinkUpdateWA_Array[i].objectCodeTemp: "+this.LinkUpdateWA_Array[i].objectCodeTemp);
        var assigned_code = this.getAssignedCode(svr1, this.dbZtI_id, this.LinkUpdateWA_Array[i].objectKindZTIC, this.LinkUpdateWA_Array[i].objectKindCode, this.LinkUpdateWA_Array[i].objectZTIC, this.LinkUpdateWA_Array[i].objectCodeTemp, this.LinkUpdateWA_Array[i].newCode.trim(), this.maintainSetUpdateWA_Array[j].effTimestamp );                   // 20200324

      // console.log("20200728e in zt_server_message this.LinkUpdateWA_Array[i].objectCodeTemp - assigned_code: "+this.LinkUpdateWA_Array[i].objectCodeTemp+" - "+assigned_code);
       if(!this.LinkUpdateWA_Array[i].serverGeneratedLink){  // 20211114
          this.LinkUpdateWA_Array[i].objectCode = assigned_code;  // 20200324
       } // endif 20211114

      var obj_key = this.dbZtI_id.trim()+"_"+this.LinkUpdateWA_Array[i].objectKindZTIC.toString().trim()+"_"+ this.LinkUpdateWA_Array[i].objectKindCode.toString().trim()+"_"+ this.LinkUpdateWA_Array[i].objectZTIC.toString().trim()+"_"+ this.LinkUpdateWA_Array[i].objectCode.toString().trim();
      // start 20211114
    //  if(this.LinkUpdateWA_Array[i].serverGeneratedLink){
    //      obj_key = this.dbZtI_id.trim()+"_"+this.LinkUpdateWA_Array[i].objectKindZTIC.toString().trim()+"_"+ this.LinkUpdateWA_Array[i].objectKindCode.toString().trim()+"_"+ this.LinkUpdateWA_Array[i].objectZTIC.toString().trim()+"_"+ this.LinkUpdateWA_Array[i].objectCode.toString().trim();
       // console.log("objectKindZTIC: "+ serverGenLinkUpdateWA.objectKindZTIC);
       // console.log("objectKindCode: "+ serverGenLinkUpdateWA.objectKindCode);
       // console.log("objectZTIC:     "+ serverGenLinkUpdateWA.objectZTIC);
       // console.log("objectCode:     "+ serverGenLinkUpdateWA.objectCode);

     // }
      // end 20211114
      //console.log("obj_key link 20190913: "+obj_key);
      //this.maintainSetUpdateWA_Array[j].objectValue_HM.forEach(function(value, key) {
      //   console.log(key + " : " + value);
      //});
      if (this.maintainSetUpdateWA_Array[j].objectValue_HM.has(obj_key)){  //(del) 20211114
     //   if (this.maintainSetUpdateWA_Array[j].objectValue_HM.has(obj_key) || this.LinkUpdateWA_Array[i].serverGeneratedLink ){   // 20211114 
                var objvals_existing_idx = this.maintainSetUpdateWA_Array[j].objectValue_HM.get(obj_key);  //20190911
               // console.log("objvals_existing_idx 20190912: "+objvals_existing_idx);
               // console.log("this.maintainSetUpdateWA_Array[j].objectValue_AR.length at existing: " + this.maintainSetUpdateWA_Array[j].objectValue_AR.length);
                var objvals_existing     = this.maintainSetUpdateWA_Array[j].objectValue_AR[objvals_existing_idx];  //20190911
               // console.log("objvals_existing: "+objvals_existing);
            //var objvals_existing = this.maintainSetUpdateWA_Array[j].objectValue_HM.get(obj_key);  (del) 20190911
            //objvals_existing.typeValue_idx_AR.push(i);  (del) 20190911
              objvals_existing.link_idx_AR.push(i);         // 20190911
       }
       else
       {     var objvals = new ObjectValueUpdateWorkAreaRec(this.dbZtI_id.trim(), this.LinkUpdateWA_Array[i].objectKindZTIC.toString().trim(), this.LinkUpdateWA_Array[i].objectKindCode.toString().trim(), this.LinkUpdateWA_Array[i].objectZTIC.toString().trim(), this.LinkUpdateWA_Array[i].objectCode.toString().trim(), this.LinkUpdateWA_Array[i].objectCodeTemp.toString().trim(), this.LinkUpdateWA_Array[i].newCode)
                   //  console.log("$$^ 20211114 at objvals.link_idx_AR.push");
                     objvals.link_idx_AR.push(i);
                   //  console.log("this.maintainSetUpdateWA_Array[j].objectValue_AR.length at new: "+this.maintainSetUpdateWA_Array[j].objectValue_AR.length);
                     //var maintainSetUpdateWA_temp = this.maintainSetUpdateWA_Array[j];
                     var objvals_idx = this.maintainSetUpdateWA_Array[j].objectValue_AR.push(objvals) -1;
                     //var objvals_idx = maintainSetUpdateWA_temp.objectValue_AR.push(objvals);
                   //  console.log("objvals_idx: "+objvals_idx);
                     //this.maintainSetUpdateWA_Array[j].objectValue_HM.set(obj_key, objvals );
                     this.maintainSetUpdateWA_Array[j].objectValue_HM.set(obj_key, objvals_idx);

         }//endif  this.maintainSetUpdateWA_Array[j].objectValue_HM.has(obj_key)

       } // endif  maintainSetUpdateWA_Array[j].rawMsg_idx == this.LinkUpdateWA_Array[i].maintainSetMember_idx

    // }  //endfor loop at this.maintainSetUpdateWA_Array  (del) 20200126

   }  // end loop at LinkUpdateWA_Array

}  //endfor loop at this.maintainSetUpdateWA_Array   // 20200126

//end 20190708

}  // end of ZtMessage.prototype.updateMaintainSetWA



ZtMessage.prototype.listMaintainSetWA = function() {


 


//console.log("---List of MaintainSet Work Area--- in ZtMessage.listMaintainSetWA in zt_server_message.js");
//   console.log("this.maintainSetUpdateWA_Array.length: "+this.maintainSetUpdateWA_Array.length);
   for (var i = 0; i < this.maintainSetUpdateWA_Array.length; i++) {

       var maintainSetWA = this.maintainSetUpdateWA_Array[i];
       //console.log("this.OEupdateWA_Array.length in ZtMessage 20190718: "+this.OEupdateWA_Array.length);
       //maintainSetWA.objectValue_HM.forEach(function(value,key) {
       //console.log("maintainSetWA.objectValue_AR.length: "+maintainSetWA.objectValue_AR.length);
       for (var j = 0; j < maintainSetWA.objectValue_AR.length; j++) {
         var objvalx  = maintainSetWA.objectValue_AR[j];
       //  var objvalx = value;
       // list object element values
       //  console.log("Object Element values, objElement_idx_AR.length:"+objvalx.objElement_idx_AR.length);
       //  console.log("20231125c this.OEupdateWA_Array.length: "+this.OEupdateWA_Array.length);
         for (var k = 0; k < objvalx.objElement_idx_AR.length; k++) {
             var OE_WA_valx = this.OEupdateWA_Array[objvalx.objElement_idx_AR[k]];
             //console.log(OE_WA_valx.objectKindZTIC+"-"+OE_WA_valx.objectKindCode+"-"+OE_WA_valx.objectZTIC+"-"+OE_WA_valx.objectCode+": "+OE_WA_valx.objectElementZTIC+" - "+OE_WA_valx.objectElementCode+" - "+OE_WA_valx.objectElementValue);
             //console.log(

         }  // endfor loop at objvalx.objElement_idx_AR
       // list type values
        // console.log("Type values");

         for (var k = 0; k < objvalx.typeValue_idx_AR.length; k++) {
             var typeVal_WA_valx = this.TypeValueUpdateWA_Array[objvalx.typeValue_idx_AR[k]];
            // console.log(typeVal_WA_valx.objectKindZTIC+"-"+typeVal_WA_valx.objectKindCode+"-"+typeVal_WA_valx.objectZTIC+"-"+typeVal_WA_valx.objectCode+": "+typeVal_WA_valx.typeDefinitionZTIC+"-"+typeVal_WA_valx.typeDefinitionCode+"-"+typeVal_WA_valx.typeValueZTIC+"-"+typeVal_WA_valx.typeValueCode);
             //console.log(

         }  // endfor loop at objvalx.typeValue_idx_AR

       // list link values
       //  console.log("Object Links");
         //console.log("objvalx.link_idx_AR.length: "+objvalx.link_idx_AR.length);
         for (var k = 0; k < objvalx.link_idx_AR.length; k++) {
             var link_WA_valx = this.LinkUpdateWA_Array[objvalx.link_idx_AR[k]];
           //  console.log(link_WA_valx.objectKindZTIC+"-"+link_WA_valx.objectKindCode+"-"+link_WA_valx.objectZTIC+"-"+link_WA_valx.objectCode+": "+link_WA_valx.linkTypeZTIC+"-"+link_WA_valx.linkTypeCode+"-"+link_WA_valx.linkToKindZTIC+"-"+link_WA_valx.linkToKindCode+"-"+link_WA_valx.linkToCodeZTIC+"-"+link_WA_valx.linkToCode);
             //console.log(

         }  // endfor loop at objvalx.link_idx_AR


       ///});  //end forEach
       }  // end for loop at objectVaue_AR
   } // end for loop at maintainSetUpdateWA_Array

} // end of listMaintainSetWA



//32 --All Table name prefix
//1  --All Object Kind DS Instance Code 
//2  --All Object Kind Code
//3  --All Code DS Instance Code
//4  --All Code 
//5  --All Record Type DS Instance Code 
//6  --All Record Type Code 1=Standard, 2=Extended Key, 3=Type Table, 4=Link  5=Object Template
//7  --Std Object Element DS Instance Code
//8  --Std Object Element Code
//9  --Ext.Key Extended Key Definition ZTIC
//10 --Ext.Key Extended Key Definition Code
//11 --Ext.Key Extended Key Value ZTIC
//12 --Ext.Key Extended Key Value Code
//13 --Type Type Definition ZTIC
//14 --Type Type Definition  Code
//15 --Type Type Value ZTIC
//16 --Type Type Value Code
//17 --Link Link Type ZTIC
//18 --Link Link Type Code
//19 --Link Link To Kind ZTIC
//20 --Link Link To Kind Code
//21 --Link Link To Code ZTIC
//22 --Link Link To Code
//23 --Template Object Template ZTIC
//24 --Template Object Template Code
//25 --All Status
//26 --All Timestamp--Effective
//27 --All Sequence number
//28 --All Message ID
//29 --All Message Segment Index
//30 --Link Link Value
//31 --Std Object Element Value
//---------------------------
//33 -- Description
//34 -- namespace



ZtMessage.prototype.validate = function(svr1) {

//start of test validation

/////    var valid1_str = "./validation/validation1"; 
/////    var valid2_str = "./validation/validation2"; 

/////    var valid_str_AR = [];

/////    valid_str_AR.push(valid1_str);
/////    valid_str_AR.push(valid2_str);
          
/////    //var valid1 = new (require(valid1_str));
/////    //var valid2 = new (require(valid2_str));

/////    var validation_AR = [];
///// //    validation_AR.push(valid1);
///// //    validation_AR.push(valid2);

/////for (var i = 0; i < valid_str_AR.length; i++) {

/////    var validx = new (require(valid_str_AR[i]));

/////    validation_AR.push(validx);


/////}


/////   for (var i = 0; i < validation_AR.length; i++) {

/////       validation_AR[i].process();

/////   } // 

///// // end of test validation

} // end of ZtMessage.prototype.validate



/////ZtMessage.prototype.query = function(svr1) {




/////} // end of ZtMessage.prototype.query


// 20200213 start
ZtMessage.prototype.getAssignedCode = function(svr1, dbZtI_idx, objectKindZTICx, objectKindCodex, objectZTICx, objectCodex, newCodex, timestampx){
    var assigned_code;
    var code_string;
    var dbzti_id     = dbZtI_idx.trim();
    var objKindZTIC = objectKindZTICx.toString().trim();
    var objKindCode = objectKindCodex.toString().trim();
    var objZTIC     = objectZTICx.toString().trim();
    var objCode     = objectCodex.toString().trim();
    var base_ztic   = svr1.getCodeForNS(dbzti_id, "131131/21");
    var assignedCodeKeyStr = dbzti_id+"_" + objKindZTIC+"_"+ objKindCode + "_"+ objZTIC+"_"+ objCode;
    var code_range_idx = 99999;  // 20200324
    var codeRangeUpdate;
    //console.log("20200227 newCodex-svr1.getNSforCode(dbzti_id, objZTIC)-this.TargetNS: "+newCodex+"-"+svr1.getNSforCode(dbzti_id, objZTIC)+"-"+this.TargetNS);
    //console.log("20200728c objCode in  zt_server_message.js: "+objCode);
    //console.log("timestampx: "+timestampx);
    if(newCodex == "+" && svr1.getNSforCode(dbzti_id, objZTIC) == this.TargetNS ){
         if (this.assignedCode_HM.has(assignedCodeKeyStr)){
           assigned_code = this.assignedCode_HM.get(assignedCodeKeyStr);
         } // 
        else {   // get the next code from code range
            var kindObjStr = dbzti_id+"_" + base_ztic+"_1_"+ objKindZTIC+"_"+ objKindCode;   //get object kind of object that needs new code
            var kind_obj_idx = svr1.ZtObject_idx_HM.get(kindObjStr);
           // console.log("20230922a kind_obj_idx--kindObjStr: "+kind_obj_idx+"--"+kindObjStr);
           // console.log("20230922b timestampx: "+timestampx);
            var kind_obj = svr1.ZtObject_AR[kind_obj_idx];
            code_range_idx = kind_obj.getTypeValueIdxForTypeDef(base_ztic, "5", timestampx);
           // console.log("20230922c code_range_idx: "+code_range_idx);
            var code_range_obj = svr1.ZtObject_AR[code_range_idx];
            var codeRangeBaseTemplStr = dbzti_id+"_" + base_ztic+"_2_"+ base_ztic+"_21";
            var code_range_base_templ_def_idx = svr1.ZtObject_idx_HM.get(codeRangeBaseTemplStr);
            //console.log("20200301 code_range_base_templ_def_idx: "+code_range_base_templ_def_idx);


           // var code_scheme_idx = code_range_obj.getTypeValueIdxForTypeDef(base_ztic, "14", timestampx);  (del) 20201104
            var code_scheme_idx = code_range_obj.getTypeValueIdxForTypeDef(base_ztic, "6", timestampx);  // 20201104 type def 131131/21-14 was a dup of type def 131131/21-6

            //console.log("20200724 code_scheme_idx: "+code_scheme_idx);
            var code_scheme_obj = svr1.ZtObject_AR[code_scheme_idx];
            var codeSchemeBaseTemplStr = dbzti_id+"_" + base_ztic+"_2_"+ base_ztic+"_22";
            var code_scheme_base_templ_def_idx = svr1.ZtObject_idx_HM.get(codeSchemeBaseTemplStr);
            //console.log("code_scheme_base_templ_def_idx: "+code_scheme_base_templ_def_idx);
            //var code_scheme_OE_idx_AR = code_scheme_obj.getOEvalueIdxForTemplateDef(code_scheme_base_templ_def_idx, timestampx);  // (del) 20220804
            var code_scheme_OE_idx_AR = code_scheme_obj.getOEvalueIdxForTemplateDef(code_scheme_base_templ_def_idx, this.extendedKeyWA_AR, timestampx);  // 20220804
            for(var i = 0; i < code_scheme_OE_idx_AR.length; i++){
               if(svr1.ZtObjectElement_AR[code_scheme_OE_idx_AR[i]].OE_ztic == base_ztic && svr1.ZtObjectElement_AR[code_scheme_OE_idx_AR[i]].OE_code == "205"){
                   code_string = svr1.ZtObjectElement_AR[code_scheme_OE_idx_AR[i]].value;
                  // console.log("20200303 code_string: "+code_string);
               } // endif
            } // endfor
      


            //var code_range_templDefKeyStr = dbzti_id+"_" + base_ztic+"_2_"+base_ztic+"_21";
            //var code_range_templ_idx      = svr1.ZtObject_idx_HM.get(code_range_templDefKeyStr);
            //console.log("20200511 code_range_base_templ_def_idx-timestampx: "+code_range_base_templ_def_idx+ " - "+timestampx);
            var code_range_OE_idx_AR = code_range_obj.getOEvalueIdxForTemplateDef(code_range_base_templ_def_idx, this.extendedKeyWA_AR, timestampx);
            //console.log("20200228 code_range_OE_idx_AR.length: "+ code_range_OE_idx_AR.length);
            for(var i = 0; i < code_range_OE_idx_AR.length; i++){
              //console.log("20200728b svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].OE_ztic: "+svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].OE_ztic);
              //console.log("    base_ztic                                                       "+base_ztic);
              //console.log("          svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].OE_code: "+svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].OE_code);
              
               if(svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].OE_ztic == base_ztic && svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].OE_code == "204"){
                   assigned_code = svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].value;
                  // console.log("20200303 assigned_code: "+assigned_code);
                   //console.log("20200303 svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].OE_ztic: "+svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].OE_ztic);
                   //console.log("20200303 svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].OE_code: "+svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].OE_code);
                  
                   //1. call function to increment code, passing assigned_code and patch level  (zt_server_function.js)
                   //var codeIncrementFunc = new (require('./zt_server_function'))( svr1, msg, function_def_ztic, function_def_code, timestampx ); 
                   var code_increment_function_idx = code_scheme_obj.getTypeValueIdxForTypeDef(base_ztic, "15", timestampx);
                   //console.log("20200304 code_increment_function_idx: "+code_increment_function_idx);
                   var code_increment_function_obj = svr1.ZtObject_AR[code_increment_function_idx];
                   var codeIncrementFunc = new (require('./zt_server_function'))( svr1, this, code_increment_function_obj.objZTIC, code_increment_function_obj.objCode, timestampx );
                   //var codeIncrementFunc = new (require('./zt_server_function'))( svr1, this, base_ztic, "1", timestampx );
                   //codeIncrementFunc.setParameterValue(param_ns, param_code, value);
                   codeIncrementFunc.setParameterValue("131131/21", "5", assigned_code);
                   codeIncrementFunc.setParameterValue("131131/21", "7", code_string);
                   //var response_param_AR = codeIncrementFunc.execute();
                   codeIncrementFunc.execute();
                   //2. this.svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].value = incremented_code;
                   for(var j = 0; j < codeIncrementFunc.parameter_AR.length; j++){
                      if(codeIncrementFunc.parameter_AR[j].namespace == "131131/21" && codeIncrementFunc.parameter_AR[j].code == "6"){
                         svr1.ZtObjectElement_AR[code_range_OE_idx_AR[i]].value = codeIncrementFunc.parameter_AR[j].value;
                        // console.log("20200323 codeIncrementFunc.parameter_AR[j].value:  "+codeIncrementFunc.parameter_AR[j].value);
                         codeRangeUpdate = new CodeRangeUpdateRec(code_range_idx, codeIncrementFunc.parameter_AR[j].value);
                         //var codeRangeUpdate = new CodeRangeUpdateRec("4","10");  // test 20200324
                         this.codeRangeUpdate_AR.push(codeRangeUpdate);
                      } // endif 
                   } //endfor
                   //3. update db with incremented code

                 }  // endif

             } // endfor loop through

             //assigned_code = getAssignedCode();
             // console.log("20200728 in zt_server_message.js objCode/assigned_code: "+objCode+" - "+assigned_code);
              this.assignedCode_HM.set(assignedCodeKeyStr, assigned_code);
              this.assignedCodeForTempCode_HM.set(objCode, assigned_code);     // 20200627
              }  // endif (this.assignedCode_HM.has(assignedCodeKeyStr))
          
          }
     else {   // use code from message
                  assigned_code = objCode;
         
    }  // endif   newCodex == "+" && this.svr1.getNSforCode(dbzti_id, objZTIC) == this.TargetNS


return assigned_code;

}  // end of getAssignedCode()


// 20200213 end


// 20200219
ZtMessage.prototype.addExtendedKeyToRequest = function(svr1) {
 // console.log("executing ZtMessage.addExtendedKeyToRequest() in zt_server_message.js");
  var base_ztic   = svr1.getCodeForNS(this.dbZtI_id.trim(), "131131/21");
   for (var i = 0; i < this.maintainSetUpdateWA_Array.length; i++) {
       var maintainSetWA = this.maintainSetUpdateWA_Array[i];
       for (var j = 0; j < maintainSetWA.objectValue_AR.length; j++) {
         var objvalx  = maintainSetWA.objectValue_AR[j];
       //  console.log("20191008-this.dbZtI_id:  "+this.dbZtI_id);
       // var ts_now = svr1.time.now();
       //  console.log("20200221b objvalx.objElement_idx_AR.length: "+objvalx.objElement_idx_AR.length);
         for (var k = 0; k < objvalx.objElement_idx_AR.length; k++) {
             var OE_WA_valx = this.OEupdateWA_Array[objvalx.objElement_idx_AR[k]];
                 
               //0. use OE keystring to get OE object
                  var OE_keyStr = this.dbZtI_id+"_"+base_ztic+"_3_"+OE_WA_valx.objectElementZTIC+"_"+OE_WA_valx.objectElementCode;
                //  console.log("20200221b OE_keyStr: "+k+": "+ OE_keyStr);
                  var OE_obj = svr1.getObjectForKeyString(OE_keyStr);
               //1. use type value of object element to find data element
                  var DE_idx = OE_obj.getTypeValueIdxForTypeDef(base_ztic, "9" , maintainSetWA.effTimestamp);  //type def 9=Data Element for Object Element
                //  console.log("20200221 DE_idx in addExt..: "+DE_idx);
                  var DE_obj;
                  if(DE_idx != 99999){
                    DE_obj = svr1.ZtObject_AR[DE_idx];
               //2. use type value of data element to find extended key definition and assign EK values
                    var EK_DefIdx = DE_obj.getTypeValueIdxForTypeDef(base_ztic, "11", maintainSetWA.effTimestamp);
                //    console.log("20200221d EK_DefIdx: "+ EK_DefIdx);
                    var EK_DefZTIC;
                    var EK_DefCode;
                    var EK_DefObj;
                    var found = false;
                   // if(EK_DefIdx == 99999){      // (del) 20250218
                   if(EK_DefIdx == null){ 
                       EK_DefZTIC = base_ztic;
                       EK_DefCode = "1";}
                      else
                       {EK_DefObj  = svr1.ZtObject_AR[EK_DefIdx];
                       EK_DefZTIC = EK_DefObj.objZTIC;
                       EK_DefCode = EK_DefObj.objCode;
                      }  // endif
                    
               //3. modify the extended key fields in the work-area if it is extended key relevant
                   if(!(EK_DefZTIC == base_ztic && EK_DefCode == "1")){
                  //   console.log("20200221c EK_DefZTIC-EK_DefCode: "+EK_DefZTIC+"-"+EK_DefCode);
                     for (var m = 0; m < this.extendedKeyWA_AR.length; m++){
                     //function ExtendedKeyWorkAreaRec(){
                     // this.extendedKeyDefinitionCodeZTIC   = "";   //2311
                     // this.extendedKeyDefinitionCode       = "";   //2312
                     // this.extendedKeyValueZTIC            = "";   //2313
                     // this.extendedKeyValueCode            = "";   //2314
                      if(this.extendedKeyWA_AR[m].extendedKeyDefinitionCodeZTIC == EK_DefZTIC && this.extendedKeyWA_AR[m].extendedKeyDefinitionCode == EK_DefCode){ 
                        OE_WA_valx.extKeyDefZTIC = EK_DefZTIC;
                        OE_WA_valx.extKeyDefCode = EK_DefCode;
                        OE_WA_valx.extKeyValueZTIC = this.extendedKeyWA_AR[m].extendedKeyValueZTIC;
                        OE_WA_valx.extKeyValueCode = this.extendedKeyWA_AR[m].extendedKeyValueCode;
                        found = true;
                        break;
                      } // endif
                   } //endfor
                   if(!found){
                      console.log("extended key not found in message for EK Def ztic/code: "+EK_DefZTIC+"/"+EK_DefCode);
                     // raise error
                   } // endif  !found
                   } // endif if(DE_idx != 99999)
                  } //  (!(EK_DefZTIC == base_ztic && EK_DefCode = "1")
            // console.log(OE_WA_valx.objectKindZTIC+"-"+OE_WA_valx.objectKindCode+"-"+OE_WA_valx.objectZTIC+"-"+OE_WA_valx.objectCode+": "+OE_WA_valx.objectElementValue);
            // var obj_key = this.dbZtI_id.trim()+"_"+OE_WA_valx.objectKindZTIC.toString().tr im() +"_"+ OE_WA_valx.objectKindCode.toString().trim()+"_"+ OE_WA_valx.objectZTIC.toString().trim()+"_"+ OE_WA_valx.objectCode.toString().trim();

            
         //   console.log("20191113 OE_WA_valx.objectCode.toString().trim(): "+this.dbZtI_id.trim()+"_"+ OE_WA_valx.objectKindZTIC.toString().trim()+"_"+ OE_WA_valx.objectKindCode.toString().trim()+"_"+ OE_WA_valx.objectZTIC.toString().trim()+"_"+ OE_WA_valx.objectCode.toString().trim());
       

            // load object element values into array 
  
 //           var OE_value = new ZtObjectElementValue(obj_key, OE_WA_valx.objectElementZTIC, OE_WA_valx.objectElementCode, OE_WA_valx.extKeyDefZTIC, OE_WA_valx.extKeyDefCode, OE_WA_valx.extKeyValueZTIC, OE_WA_valx.extKeyValueCode, OE_WA_valx.status, OE_WA_valx.timestampEff, OE_WA_valx.seqNum, OE_WA_valx.objectElementValue, OE_WA_valx.templateZTIC, OE_WA_valx.templateCode); 
       

 
         }  // endfor loop at objvalx.objElement_idx_AR

      }  // end for loop at objectVaue_AR

   } // end for loop at maintainSetUpdateWA_Array


} // end of addExtendedKeyToRequest()

// end 20200219




ZtMessage.prototype.msgUpdate3 = function(svr1) {
// msgUpdate3 is based on MaintainSetMember--including response

// start 20230114
var dbRec_AR = [];

// end 20230114

var client = new Client();
//update ZTIC
  for (var i = 0; i < this.msgZTIC_Array.length; i++) {
     //console.log(UpdateArray[i].te_2_31);
     if (this.msgZTIC_Array[i].found_in_db == false) {
     var args = {
 data: { te_2_32: this.dbZtI_id.trim(),
         te_2_1: "3",
         te_2_2: "14", //object kind for DS Instances
         te_2_3: "1",  //ZTIC for all ZTICs is locale (1)
         te_2_4: this.msgZTIC_Array[i].targetZTIC,
         te_2_5: "2",
         te_2_6: "1",
         te_2_7: "2",
         te_2_8: "34", //table element for namespaces
         te_2_31: this.msgZTIC_Array[i].namespace },
        headers: { "Content-Type": "application/json" }
};
// start 20230114
    var dbrec = new DbRec();
    dbrec.te_2_32 = this.dbZtI_id.trim();
    dbrec.te_2_1  = "3";
    dbrec.te_2_2  = "14"; 
    dbrec.te_2_3  = "1";  //ZTIC for all ZTICs is locale (1)
    dbrec.te_2_4  =  this.msgZTIC_Array[i].targetZTIC;
    dbrec.te_2_5  = "2";
    dbrec.te_2_6  = "1";
    dbrec.te_2_7  = "2";
    dbrec.te_2_8  = "34"; 
    dbrec.te_2_31 = this.msgZTIC_Array[i].namespace;
    dbRec_AR.push(dbrec);
// end 20230114
client.post("http://localhost:5001/ZtObjectDbRec/insert", args, function (data, response) {
   // parsed response body as js object 
   //console.log(data);
  
});  //end post
 } //endif msgZTIC_Array[i].found_in_db == false
 } //endfor msgZTIC_Array

  this.updateCodeRange(svr1);


// add parent nodes to response message
// moved to zt_server_query.js 20190903

//var resp_next_index = this.ZtRawMessageAR.length + 1;  (del) 20210821 
var resp_next_index = this.ZtRawMessageAR.length;       // 20210821                                      

var resp_parent_index = 1;

// start reactivate 20210821 
if(this.maintainSetUpdateWA_Array.length > 0){                                                                 
  var msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5000","2","4","");   // ttt 
  this.ZtMessageResponse_Array.push(msgRow_resp);                                             
  resp_parent_index = resp_next_index; 
  this.responseTopIndex = resp_next_index;  // 20240115                                                       
  resp_next_index++;                                                                          
  msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5000","2","40","");      
  this.ZtMessageResponse_Array.push(msgRow_resp);                                             
  resp_parent_index = resp_next_index;   
  this.lastRawMsgIndex = resp_next_index;  // 20240115                                                     
  resp_next_index++;     
}  /// endif
// end reactivate 20210821                                                                     
                                                                          
//copied from listMaintainSetWA()
//console.log("---List of MaintainSet Work Area---");
   for (var i = 0; i < this.maintainSetUpdateWA_Array.length; i++) {
       var maintainSetWA = this.maintainSetUpdateWA_Array[i];

       //insert 20190722 response parent nodes for maintainSet
       msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5000","2","400","");     
       this.ZtMessageResponse_Array.push(msgRow_resp);                                             
       resp_parent_index = resp_next_index;                                                        
       resp_next_index++;                                                                          
       msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5000","2","4030","");    
       this.ZtMessageResponse_Array.push(msgRow_resp);                                            
       resp_parent_index   = resp_next_index; 
       var resp_index_4030 = resp_next_index;                                                      
       resp_next_index++;
       // end insert 20190722 response nodes for maintainSet

       //console.log("this.OEupdateWA_Array.length in ZtMessage 20190718: "+this.OEupdateWA_Array.length);
       //maintainSetWA.objectValue_HM.forEach(function(value,key) {
       for (var j = 0; j < maintainSetWA.objectValue_AR.length; j++) {
         var objvalx  = maintainSetWA.objectValue_AR[j];
         
         //begin insert response 20190722
         msgRow_resp =  new MessageRow(resp_next_index, resp_index_4030, "5000","2","4031","");      
         this.ZtMessageResponse_Array.push(msgRow_resp);                                            
         resp_parent_index = resp_next_index;                                                        
         var resp_index_4031 = resp_next_index;                                                      
         resp_next_index++;                                                                          
         msgRow_resp =  new MessageRow(resp_next_index, resp_index_4031, "5000","2","4032",objvalx.kindZTIC.toString().trim());   
         this.ZtMessageResponse_Array.push(msgRow_resp);                                             
         resp_parent_index = resp_next_index;                                                        
         resp_next_index++;                                                                          
         msgRow_resp =  new MessageRow(resp_next_index, resp_index_4031, "5000","2","4033",objvalx.kindCode.toString().trim());       
         this.ZtMessageResponse_Array.push(msgRow_resp);                                             
         resp_parent_index = resp_next_index;                                                        
         resp_next_index++;                                                                          
         msgRow_resp =  new MessageRow(resp_next_index, resp_index_4031, "5000","2","4034",objvalx.objZTIC.toString().trim());          
         this.ZtMessageResponse_Array.push(msgRow_resp);                                             
         resp_parent_index = resp_next_index;                                                        
         resp_next_index++;                                                                          
         msgRow_resp =  new MessageRow(resp_next_index, resp_index_4031, "5000","2","4035",objvalx.objCodeTemp.toString().trim());    //code temp 
         this.ZtMessageResponse_Array.push(msgRow_resp);                                             
         resp_parent_index = resp_next_index;                                                        
         resp_next_index++;                                                                          
         msgRow_resp =  new MessageRow(resp_next_index, resp_index_4031, "5000","2","4036",objvalx.objCode.toString().trim());    //code assigned  
         this.ZtMessageResponse_Array.push(msgRow_resp);                                            
         resp_parent_index = resp_next_index;                                                        
         resp_next_index++;                                                                          
         msgRow_resp =  new MessageRow(resp_next_index, resp_index_4031, "5000","2","4037","+");       
         this.ZtMessageResponse_Array.push(msgRow_resp);   
         this.lastRawMsgIndex = resp_next_index;  // 20240215                                         
         // end insert response 20190722

 
       // process object element values
        // console.log("20191008-Object Element values, objElement_idx_AR.length: "+objvalx.objElement_idx_AR.length);
        // console.log("20191008-this.OEupdateWA_Array.length: "+this.OEupdateWA_Array.length);
        // console.log("20191008-this.dbZtI_id:  "+this.dbZtI_id);
  var ts_now = svr1.time.now();
         for (var k = 0; k < objvalx.objElement_idx_AR.length; k++) {
             var OE_WA_valx = this.OEupdateWA_Array[objvalx.objElement_idx_AR[k]];
          //   console.log("# 20201205 OE vals: "+OE_WA_valx.objectKindZTIC+"-"+OE_WA_valx.objectKindCode+"-"+OE_WA_valx.objectZTIC+"-"+OE_WA_valx.objectCode+": "+OE_WA_valx.objectElementValue);
             var obj_key = this.dbZtI_id.trim()+"_"+OE_WA_valx.objectKindZTIC.toString().trim() +"_"+ OE_WA_valx.objectKindCode.toString().trim()+"_"+ OE_WA_valx.objectZTIC.toString().trim()+"_"+ OE_WA_valx.objectCode.toString().trim();

            //Add new object to hashmap if needed
            if (!svr1.ZtObject_HM.has(obj_key)){
            //    var dsobj = new ZtObject(this.dbZtI_id.trim(), OE_WA_valx.objectKindZTIC.toString().trim(), OE_WA_valx.objectKindCode.toString().trim(), OE_WA_valx.objectZTIC.toString().trim(), OE_WA_valx.objectCode.toString().trim());  (del) 20191113
          //  console.log("20191113 OE_WA_valx.objectCode.toString().trim(): "+this.dbZtI_id.trim()+"_"+ OE_WA_valx.objectKindZTIC.toString().trim()+"_"+ OE_WA_valx.objectKindCode.toString().trim()+"_"+ OE_WA_valx.objectZTIC.toString().trim()+"_"+ OE_WA_valx.objectCode.toString().trim());
            var dsobj = new (require('./zt_server_object'))(svr1, this.dbZtI_id.trim(), OE_WA_valx.objectKindZTIC.toString().trim(), OE_WA_valx.objectKindCode.toString().trim(), OE_WA_valx.objectZTIC.toString().trim(), OE_WA_valx.objectCode.toString().trim());  //mod 20191113

                svr1.ZtObject_HM.set(obj_key, dsobj);
                var dso_idx = svr1.ZtObject_AR.push(dsobj) -1;
                svr1.ZtObject_idx_HM.set(obj_key,dso_idx);
            } // endif !svr1.ZtObject_HM.has(obj_key)

// bookmark 20210227
            // load object element values into array 
// 20200513-begin  check to see if exact same object element value already exists. if yes, suppress insert
            var dup_value = false; 
            var svr1_obj;
            if (svr1.ZtObject_HM.has(obj_key)){
              svr1_obj = svr1.ZtObject_HM.get(obj_key);
              var getOEvalueReturn = svr1_obj.getOEvalue(OE_WA_valx.objectElementZTIC, OE_WA_valx.objectElementCode, OE_WA_valx.extKeyValueZTIC, OE_WA_valx.extKeyValueCode, maintainSetWA.effTimestamp); // 20201204
          //   console.log("& & 20210227 getOEvalueReturn - OE_WA_valx.objectElementValue in zt_server_message: "+getOEvalueReturn+" - "+OE_WA_valx.objectElementValue);
             // if(svr1_obj.getOEvalue(OE_WA_valx.objectElementZTIC, OE_WA_valx.objectElementCode, OE_WA_valx.extKeyValueZTIC, OE_WA_valx.extKeyValueCode, maintainSetWA.effTimestamp) == OE_WA_valx.objectElementValue){dup_value=true;  console.log("# 20201205 dup value found for OE code:"+OE_WA_valx.objectElementCode)}  //(del) 20201204
              if(!(getOEvalueReturn == null) && (getOEvalueReturn.toString().trim() == OE_WA_valx.objectElementValue.toString().trim())){dup_value=true;}
            } //endif svr1.ZtObject_HM.has(obj_key)
// 20200513-end

            //console.log("20190924 OE_WA_valx.objectElementZTIC: "+OE_WA_valx.objectElementZTIC);
          //  console.log("& & 20210227 dup_value: "+dup_value);
            if(!dup_value){ //20200513
              var OE_value = new ZtObjectElementValue(obj_key, OE_WA_valx.objectElementZTIC, OE_WA_valx.objectElementCode, OE_WA_valx.extKeyDefZTIC, OE_WA_valx.extKeyDefCode, OE_WA_valx.extKeyValueZTIC, OE_WA_valx.extKeyValueCode, OE_WA_valx.status, maintainSetWA.effTimestamp, OE_WA_valx.seqNum, OE_WA_valx.objectElementValue, OE_WA_valx.templateZTIC, OE_WA_valx.templateCode); 
              var oe_idx = svr1.ZtObjectElement_AR.push(OE_value) -1;
              svr1.ZtObject_HM.get(obj_key).objElemIdx_AR.push(oe_idx);
              //console.log("20191113 svr1.ZtObject_HM.get(obj_key).keyString: "+svr1.ZtObject_HM.get(obj_key).keyString);
              //svr1.ZtObject_HM.get(obj_key).setTemplate_AR(svr1, this.dbZtI_id, OE_WA_valx.templateZTIC, OE_WA_valx.templateCode, ts_now);   // 20191112  (del) 20191117
              svr1.ZtObject_HM.get(obj_key).setTemplate_AR(OE_WA_valx.templateZTIC, OE_WA_valx.templateCode,"01", ts_now,"0001");   // 20191117
//setTemplate_AR(templateZTICx, templateCodex, statusx, timestampx, seqNumx)

            // update mongo db
              var args = {
                data: { te_2_32: this.dbZtI_id.trim(),
                        te_2_1: OE_WA_valx.objectKindZTIC.toString().trim(),
                        te_2_2: OE_WA_valx.objectKindCode.toString().trim(),
                        te_2_3: OE_WA_valx.objectZTIC.toString().trim(),
                        te_2_4: OE_WA_valx.objectCode.toString().trim(),
              //        te_2_5: "2",
                        te_2_6: "1",
                       // te_2_7: OE_WA_valx.tableElementZTIC.toString().trim(),  (del) 20191110  
                       // te_2_8: OE_WA_valx.tableElementCode.toString().trim(),  (del) 20191110
                        te_2_7: OE_WA_valx.objectElementZTIC.toString().trim(),  // 20191110 mod from table to element  
                        te_2_8: OE_WA_valx.objectElementCode.toString().trim(),  // 20191110 mod from table to element
                        te_2_9: OE_WA_valx.extKeyDefZTIC.toString().trim(),      // 20200220
                        te_2_10: OE_WA_valx.extKeyDefCode.toString().trim(),     // 20200220
                        te_2_11: OE_WA_valx.extKeyValueZTIC.toString().trim(),   // 20200220
                        te_2_12: OE_WA_valx.extKeyValueCode.toString().trim(),   // 20200220
                        te_2_23: OE_WA_valx.templateZTIC.toString().trim(),      // 20191112 add
                        te_2_24: OE_WA_valx.templateCode.toString().trim(),      // 20191112 add
                        te_2_26: maintainSetWA.effTimestamp.toString().trim(),   // 20191119 add
                        te_2_31: OE_WA_valx.objectElementValue.toString().trim() },
                      headers: { "Content-Type": "application/json" }
               };
               // start 20230114
               var dbrec = new DbRec();
               dbrec.te_2_32 = this.dbZtI_id.trim();
               dbrec.te_2_1  = OE_WA_valx.objectKindZTIC.toString().trim();
               dbrec.te_2_2  = OE_WA_valx.objectKindCode.toString().trim();
               dbrec.te_2_3  = OE_WA_valx.objectZTIC.toString().trim();
               dbrec.te_2_4  = OE_WA_valx.objectCode.toString().trim();
               //        te_2_5: "2",
               dbrec.te_2_6  = "1";
                 // te_2_7: OE_WA_valx.tableElementZTIC.toString().trim(),  (del) 20191110  
                 // te_2_8: OE_WA_valx.tableElementCode.toString().trim(),  (del) 20191110
               dbrec.te_2_7 = OE_WA_valx.objectElementZTIC.toString().trim();  // 20191110 mod from table to element  
               dbrec.te_2_8 = OE_WA_valx.objectElementCode.toString().trim();  // 20191110 mod from table to element
               dbrec.te_2_9 = OE_WA_valx.extKeyDefZTIC.toString().trim();      // 20200220
               dbrec.te_2_10 = OE_WA_valx.extKeyDefCode.toString().trim();     // 20200220
               dbrec.te_2_11 = OE_WA_valx.extKeyValueZTIC.toString().trim();   // 20200220
               dbrec.te_2_12 = OE_WA_valx.extKeyValueCode.toString().trim();   // 20200220
               dbrec.te_2_23 = OE_WA_valx.templateZTIC.toString().trim();      // 20191112 add
               dbrec.te_2_24 = OE_WA_valx.templateCode.toString().trim();      // 20191112 add
               dbrec.te_2_26 = maintainSetWA.effTimestamp.toString().trim();    // 20191119 add
               dbrec.te_2_31 = OE_WA_valx.objectElementValue.toString().trim();
               dbRec_AR.push(dbrec);
              // end 20230114

              // start (del) 20230114
              //client.post("http://localhost:5001/ZtObjectDbRec/insert", args, function (data, response) {
              // // parsed response body as js object
              // //   console.log("inserted into DB at 1210");  //20190304
              // //   console.log(data);
              // // raw response 
              // //   console.log(response);
              //});  //end post
             // end (del) 20230114

           } // endif !dup_value    20200513
 
         }  // endfor loop at objvalx.objElement_idx_AR




       // process type values
       //console.log("Type values");

         for (var k = 0; k < objvalx.typeValue_idx_AR.length; k++) {
             var typeVal_WA_valx = this.TypeValueUpdateWA_Array[objvalx.typeValue_idx_AR[k]];
             var obj_key = this.dbZtI_id.trim()+"_"+typeVal_WA_valx.objectKindZTIC.toString().trim() +"_"+ typeVal_WA_valx.objectKindCode.toString().trim()+"_"+ typeVal_WA_valx.objectZTIC.toString().trim()+"_"+ typeVal_WA_valx.objectCode.toString().trim();

            //Add new object to hashmap if needed
            if (!svr1.ZtObject_HM.has(obj_key)){
           //     var dsobj = new ZtObject(this.dbZtI_id.trim(), typeVal_WA_valx.objectKindZTIC.toString().trim(), typeVal_WA_valx.objectKindCode.toString().trim(), typeVal_WA_valx.objectZTIC.toString().trim(), typeVal_WA_valx.objectCode.toString().trim());  (del) 20191113
              var dsobj = new (require('./zt_server_object'))(svr1, this.dbZtI_id.trim(), typeVal_WA_valx.objectKindZTIC.toString().trim(), typeVal_WA_valx.objectKindCode.toString().trim(), typeVal_WA_valx.objectZTIC.toString().trim(), typeVal_WA_valx.objectCode.toString().trim()); //mod 20191113
                svr1.ZtObject_HM.set(obj_key, dsobj);
                var dso_idx = svr1.ZtObject_AR.push(dsobj) -1;
                svr1.ZtObject_idx_HM.set(obj_key,dso_idx);
            } // endif !svr1.ZtObject_HM.has(obj_key)

//  20210228 start check to see if same type value already exists in DB
            var dup_type_value = false;
            var svr1_obj;
            if (svr1.ZtObject_HM.has(obj_key)){
              svr1_obj = svr1.ZtObject_HM.get(obj_key);
              var svrTypeValIdx = svr1_obj.getTypeValueIdxSingle(typeVal_WA_valx.typeDefinitionZTIC, typeVal_WA_valx.typeDefinitionCode, maintainSetWA.effTimestamp);
             // console.log("& & 20210301 svrTypeValIdx: "+svrTypeValIdx);
              var svrTypeVal;
              if(!(svrTypeValIdx == null)){

                svrTypeVal = svr1.ZtObjectTypeValue_AR[svrTypeValIdx];             
             
                      //    this.typeDef_ztic = typeDef_ztic;
                      //    this.typeDef_code = typeDef_code;
                      //    this.typeValue_ztic = typeValue_ztic;
                      //    this.typeValue_code = typeValue_code;
               if(svrTypeVal.typeValue_ztic == typeVal_WA_valx.typeValueZTIC && svrTypeVal.typeValue_code == typeVal_WA_valx.typeValueCode){dup_type_value=true;}
               } // endif  if(!(svrTypeValIdx == null))
            } //endif svr1.ZtObject_HM.has(obj_key)
// end 20210228 end check to see if same type value already exists in DB

            // load type values into array 
         if(!dup_type_value){      // 20210228
            var type_value = new ZtObjectTypeValue(obj_key, typeVal_WA_valx.typeDefinitionZTIC, typeVal_WA_valx.typeDefinitionCode, typeVal_WA_valx.typeValueZTIC, typeVal_WA_valx.typeValueCode, typeVal_WA_valx.status, maintainSetWA.effTimestamp, typeVal_WA_valx.seqNum,  typeVal_WA_valx.templateZTIC, typeVal_WA_valx.templateCode); 
            var type_val_idx = svr1.ZtObjectTypeValue_AR.push(type_value) -1;
            svr1.ZtObject_HM.get(obj_key).typeValueIdx_AR.push(type_val_idx);
         //   svr1.ZtObject_HM.get(obj_key).setTemplate_AR(svr1, this.dbZtI_id, typeVal_WA_valx.templateZTIC, typeVal_WA_valx.templateCode, ts_now);   // 20191112  (del) 20191117
svr1.ZtObject_HM.get(obj_key).setTemplate_AR(typeVal_WA_valx.templateZTIC, typeVal_WA_valx.templateCode,"01", ts_now, "0001");  // 20191117
//setTemplate_AR(templateZTICx, templateCodex, statusx, timestampx, seqNumx)

//             console.log(typeVal_WA_valx.objectKindZTIC+"-"+typeVal_WA_valx.objectKindCode+"-"+typeVal_WA_valx.objectZTIC+"-"+typeVal_WA_valx.objectCode+": "+typeVal_WA_valx.typeDefinitionZTIC+"-"+typeVal_WA_valx.typeDefinitionCode+"-"+typeVal_WA_valx.typeValueZTIC+"-"+typeVal_WA_valx.typeValueCode);
           


           // update mongo db
       
           var args = {
           data: { te_2_32: this.dbZtI_id.trim(),
                   te_2_1: typeVal_WA_valx.objectKindZTIC,
                   te_2_2: typeVal_WA_valx.objectKindCode,
                   te_2_3: typeVal_WA_valx.objectZTIC,
                   te_2_4: typeVal_WA_valx.objectCode,
          //        te_2_5: "2",
                   te_2_6: "3",
                   te_2_13: typeVal_WA_valx.typeDefinitionZTIC,    //13 --Type Type Definition ZTIC
                   te_2_14: typeVal_WA_valx.typeDefinitionCode,    //14 --Type Type Definition  Code
                   te_2_15: typeVal_WA_valx.typeValueZTIC,         //15 --Type Type Value ZTIC
                   te_2_16: typeVal_WA_valx.typeValueCode,        //16 --Type Type Value Code  20200117 (del) bracket
                   te_2_23: typeVal_WA_valx.templateZTIC.toString().trim(),      // 20191112 add
                   te_2_24: typeVal_WA_valx.templateCode.toString().trim(),      // 20191112 add
                   te_2_26: maintainSetWA.effTimestamp.toString().trim() },   // 20191119 add  20200117 added bracket
                   //25 --All Status
                   //26 --All Timestamp--Effective
                   //27 --All Sequence number
             
                  headers: { "Content-Type": "application/json" }
           };
           // start 20230114
           var dbrec = new DbRec();
           dbrec.te_2_32 = this.dbZtI_id.trim();
           dbrec.te_2_1  = typeVal_WA_valx.objectKindZTIC;
           dbrec.te_2_2  = typeVal_WA_valx.objectKindCode;
           dbrec.te_2_3  = typeVal_WA_valx.objectZTIC;
           dbrec.te_2_4  = typeVal_WA_valx.objectCode;
         //dbrec.te_2_5 = "2";
           dbrec.te_2_6  = "3"; 
           dbrec.te_2_13 = typeVal_WA_valx.typeDefinitionZTIC;
           dbrec.te_2_14 = typeVal_WA_valx.typeDefinitionCode;
           dbrec.te_2_15 = typeVal_WA_valx.typeValueZTIC;
           dbrec.te_2_16 = typeVal_WA_valx.typeValueCode;
           dbrec.te_2_23 = typeVal_WA_valx.templateZTIC.toString().trim();
           dbrec.te_2_24 = typeVal_WA_valx.templateCode.toString().trim();
           dbrec.te_2_26 = maintainSetWA.effTimestamp.toString().trim();
           dbRec_AR.push(dbrec);
          // end 20230114
    
          // start (del)  20230114
          //client.post("http://localhost:5001/ZtObjectDbRec/insert", args, function (data, response) {
          //     // parsed response body as js object 
          //     //console.log(data);
          //     // raw response 
          //     //      console.log(response);
          //     });  //end post
          //  end (del)  20230114     

          }  // endif if(!dup_type_value){   20210228

        }  // endfor loop at objvalx.typeValue_idx_AR




       // process link values
      // console.log("Object Links");
      // console.log("20200628 objvalx.link_idx_AR.length in zt_server_message update: "+objvalx.link_idx_AR.length);
         for (var k = 0; k < objvalx.link_idx_AR.length; k++) {
             var link_WA_valx = this.LinkUpdateWA_Array[objvalx.link_idx_AR[k]];
             var obj_key = this.dbZtI_id.trim()+"_"+link_WA_valx.objectKindZTIC.toString().trim() +"_"+ link_WA_valx.objectKindCode.toString().trim()+"_"+ link_WA_valx.objectZTIC.toString().trim()+"_"+ link_WA_valx.objectCode.toString().trim();

            // 20200628 start replace temp code with assigned code for link-to
              var assigned_code_for_link_to;                        //  start 20200627
              this.assignedCodeForTempCode_HM.forEach(function(value, key) {    // start 20200728
              //   console.log("assignedCodeforTempCode key/value: "+key + " : " + value);
              });  // end 20200728
              // console.log("20200628 link_WA_valx.newLinkTargetCode.toString().trim(): " + link_WA_valx.newLinkTargetCode.toString().trim());
              if(link_WA_valx.newLinkTargetCode.toString().trim() == "+"){                                                      
                    if(this.assignedCodeForTempCode_HM.has(link_WA_valx.linkToCode)){                               
                       assigned_code_for_link_to = this.assignedCodeForTempCode_HM.get(link_WA_valx.linkToCode);}  
                     else{
                       console.log("ERROR  in zt_server_message.js- no assigned code found for temp code: "+ link_WA_valx.linkToCode);
                     } // endif
                }
                else{
                   assigned_code_for_link_to = link_WA_valx.linkToCode;
              }  // endif  end  20200627
            link_WA_valx.linkToCode = assigned_code_for_link_to;
            //console.log("20200628 link_WA_valx.linkToCode: "+link_WA_valx.linkToCode);
            // 20200628 end replace temp code with assigned code to link-to

            //Add new object to hashmap if needed
            //console.log("20200628 obj_key: "+ obj_key);
            if (!svr1.ZtObject_HM.has(obj_key)){
          //      var dsobj = new ZtObject(this.dbZtI_id.trim(), link_WA_valx.objectKindZTIC.toString().trim(), link_WA_valx.objectKindCode.toString().trim(), link_WA_valx.objectZTIC.toString().trim(), link_WA_valx.objectCode.toString().trim());  (del) 20191113
                 var dsobj = new (require('./zt_server_object'))(svr1, this.dbZtI_id.trim(), link_WA_valx.objectKindZTIC.toString().trim(), link_WA_valx.objectKindCode.toString().trim(), link_WA_valx.objectZTIC.toString().trim(), link_WA_valx.objectCode.toString().trim());  // mod 20191113

                svr1.ZtObject_HM.set(obj_key, dsobj);
                var dso_idx = svr1.ZtObject_AR.push(dsobj) -1;
                svr1.ZtObject_idx_HM.set(obj_key,dso_idx);
            } // endif !svr1.ZtObject_HM.has(obj_key)

            // load links into array 
       //     var link_value = new ZtObjectLink(svr1, obj_key, link_WA_valx.linkTypeZTIC, link_WA_valx.linkTypeCode, link_WA_valx.linkToKindZTIC, link_WA_valx.linkToKindCode, link_WA_valx.linkToCodeZTIC, link_WA_valx.linkToCode, link_WA_valx.linkValue, link_WA_valx.status, maintainSetWA.effTimestamp, link_WA_valx.seqNum, link_WA_valx.templateZTIC, link_WA_valx.templateCode);   // (del) 20200710
              var link_value = new (require('./zt_server_object_link'))(svr1, obj_key, link_WA_valx.linkTypeZTIC, link_WA_valx.linkTypeCode, link_WA_valx.linkToKindZTIC, link_WA_valx.linkToKindCode, link_WA_valx.linkToCodeZTIC, link_WA_valx.linkToCode, link_WA_valx.linkValue, link_WA_valx.status, maintainSetWA.effTimestamp, link_WA_valx.seqNum, link_WA_valx.templateZTIC, link_WA_valx.templateCode);    // 20200710
//constructor(svr1, objectKey, linkType_ztic, linkType_code, linkToKind_ztic, linkToKind_code, linkToCode_ztic, linkToCode, linkValue, status, timestamp, seqNum, templateZTIC, templateCode)   // copied for example 20200710
 
            // 20200704  suppress link update if identical link already exists
               //function ZtObjectLink()
               // this.svr1      = svr1;  
               // this.objectKey = objectKey;
               // this.linkType_ztic = linkType_ztic;
               // this.linkType_code = linkType_code;
               // this.linkToKind_ztic    = linkToKind_ztic;
               // this.linkToKind_code    = linkToKind_code;
               // this.linkToCode_ztic    = linkToCode_ztic;
               // this.linkToCode         = linkToCode;
               // this.linkValue          = linkValue;
               // this.linkStatus         = linkStatus;
               // this.timestamp          = timestamp;
               // this.seqNum             = seqNum;
               // this.templateZTIC       = templateZTIC;
               // this.templateCode       = templateCode;

            var dup_link = false;
            var obj_link_idx_AR = svr1.ZtObject_HM.get(obj_key).linkIdx_AR;
           // console.log("20200704 obj_link_idx_AR.length: "+obj_link_idx_AR.length);
            for (var l = 0; l < obj_link_idx_AR.length; l++){
            //   console.log("20200704 link update:");
            //   console.log("  objectKey:       "+ svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].objectKey       + " - " +link_value.objectKey);
            //   console.log("  linkType_ztic:   "+ svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkType_ztic   + " - " +link_value.linkType_ztic);
            //   console.log("  linkType_code:   "+ svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkType_code   + " - " +link_value.linkType_code);
            //   console.log("  linkToKind_ztic: "+ svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkToKind_ztic + " - " +link_value.linkToKind_ztic);
            //   console.log("  linkToKind_code: "+ svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkToKind_code + " - " +link_value.linkToKind_code);
            //   console.log("  linkToCode_ztic: "+ svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkToCode_ztic + " - " +link_value.linkToCode_ztic);
            //   console.log("  linkToCode:      "+ svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkToCode      + " - " +link_value.linkToCode);
            //   console.log("  linkValue:       "+ svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkValue       + " - " +link_value.linkValue);
            //   console.log("  status:          "+ svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].status          + " - " +link_value.status);   // (mod) 20210403

               if(svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].objectKey   == link_value.objectKey &&
                  svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkType_ztic   == link_value.linkType_ztic &&
                  svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkType_code   == link_value.linkType_code &&
                  svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkToKind_ztic == link_value.linkToKind_ztic &&
                  svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkToKind_code == link_value.linkToKind_code &&
                  svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkToCode_ztic == link_value.linkToCode_ztic &&
                  svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkToCode      == link_value.linkToCode      &&
                  svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].linkValue       == link_value.linkValue       &&
                  svr1.ZtObjectLink_AR[obj_link_idx_AR[l]].status      == link_value.status){    // 20210303   (mod) 20210403
                  //svr1.ZtObjectLink_AR[l].timestamp ??
                     dup_link = true;   
               }  // endif  
            }  // endfor

            if(!dup_link){            
              // 20200704 end suppress link update if identical link already exists       
            
              var link_val_idx = svr1.ZtObjectLink_AR.push(link_value) -1;
              svr1.ZtObject_HM.get(obj_key).linkIdx_AR.push(link_val_idx);
           // svr1.ZtObject_HM.get(obj_key).setTemplate_AR(svr1, this.dbZtI_id, link_WA_valx.templateZTIC, link_WA_valx.templateCode, ts_now);   // 20191112 (del) 20191117
svr1.ZtObject_HM.get(obj_key).setTemplate_AR(link_WA_valx.templateZTIC, link_WA_valx.templateCode,"01", ts_now,"0001");  // 20191117
//setTemplate_AR(templateZTICx, templateCodex, statusx, timestampx, seqNumx)

 
            // update mongo db

              var args = {
      data: { te_2_32: this.dbZtI_id.trim(),
              te_2_1: link_WA_valx.objectKindZTIC,
              te_2_2: link_WA_valx.objectKindCode,
              te_2_3: link_WA_valx.objectZTIC,
              te_2_4: link_WA_valx.objectCode,
      //        te_2_5: "2",
              te_2_6: "4",
              te_2_17: link_WA_valx.linkTypeZTIC,    //17 --Link Link Type ZTIC
              te_2_18: link_WA_valx.linkTypeCode,    //18 --Link Link Type Code
              te_2_19: link_WA_valx.linkToKindZTIC,  //19 --Link Link To Kind ZTIC
              te_2_20: link_WA_valx.linkToKindCode,  //20 --Link Link To Kind Code
              te_2_21: link_WA_valx.linkToCodeZTIC,  //21 --Link Link To Code ZTIC
              te_2_22: link_WA_valx.linkToCode,      //22 --Link Link To Code   20200117 (del) bracket  (del) 20200627
              te_2_23: link_WA_valx.templateZTIC.toString().trim(),      // 20191112 add
              te_2_24: link_WA_valx.templateCode.toString().trim(),      // 20191112 add
              te_2_25: link_WA_valx.status,      //25 --linkStatus   // 20210303   (mod) 20210403
              te_2_26: maintainSetWA.effTimestamp.toString().trim(), 
              te_2_30: link_WA_valx.linkValue },     //30   20210303  20200117 added bracket
              //30 --Link Link Value
              //25 --All Status
              //26 --All Timestamp--Effective
              //27 --All Sequence number
             
              headers: { "Content-Type": "application/json" }
     };
           // start 20230114
           var dbrec = new DbRec();
           dbrec.te_2_32 = this.dbZtI_id.trim();
           dbrec.te_2_1  = link_WA_valx.objectKindZTIC;
           dbrec.te_2_2  = link_WA_valx.objectKindCode;
           dbrec.te_2_3  = link_WA_valx.objectZTIC;
           dbrec.te_2_4  = link_WA_valx.objectCode;
         //dbrec.te_2_5 = "2";
           dbrec.te_2_6  = "4"; 
           dbrec.te_2_17 = link_WA_valx.linkTypeZTIC;
           dbrec.te_2_18 = link_WA_valx.linkTypeCode;
           dbrec.te_2_19 = link_WA_valx.linkToKindZTIC;
           dbrec.te_2_20 = link_WA_valx.linkToKindCode;
           dbrec.te_2_21 = link_WA_valx.linkToCodeZTIC;
           dbrec.te_2_22 = link_WA_valx.linkToCode;
           dbrec.te_2_23 = link_WA_valx.templateZTIC.toString().trim();
           dbrec.te_2_24 = link_WA_valx.templateCode.toString().trim();
           dbrec.te_2_25 = link_WA_valx.status;
           dbrec.te_2_26 = maintainSetWA.effTimestamp.toString().trim();
           dbrec.te_2_30 = link_WA_valx.linkValue;
           dbRec_AR.push(dbrec);
          // end 20230114

     // start (del)  20230114
     //client.post("http://localhost:5001/ZtObjectDbRec/insert", args, function (data, response) {
     //   // parsed response body as js object 
     //   //console.log(data);
     //   // raw response 
     //   //      console.log(response);
     //});  //end post
     // // end (del) 20230114

    } //endif(!dup_link)   20200704  to supress update of duplicat link




         //    console.log(link_WA_valx.objectKindZTIC+"-"+link_WA_valx.objectKindCode+"-"+link_WA_valx.objectZTIC+"-"+link_WA_valx.objectCode+": "+link_WA_valx.linkTypeZTIC+"-"+link_WA_valx.linkTypeCode+"-"+link_WA_valx.linkToKindZTIC+"-"+link_WA_valx.linkToKindCode+"-"+link_WA_valx.linkToCodeZTIC+"-"+link_WA_valx.linkToCode);
             //console.log(

         }  // endfor loop at objvalx.link_idx_AR
       }  // end for loop at objectVaue_AR
   } // end for loop at maintainSetUpdateWA_Array

// end of copy from listMaintainSetWA

// start 20230114
// update mongo db
const dbRec_ARstr = JSON.stringify(dbRec_AR);
var args = {
               data: { dbRec_ARstr : dbRec_ARstr,

                       },   
                      
                       headers: { "Content-Type": "application/json" }
              };


client.post("http://localhost:5001/ZtObjectDbRec/insertmany", args, function (data, response) {
   // parsed response body as js object 
   //console.log(data);
   // raw response 
   //      console.log(response);
});  //end post
// end 20230114

} // end of msgUpdate3()
    
   
ZtMessage.prototype.process_asynch = function(dsmsg, AR_idx) {
       dsmsg.readRawMsgFromFile();
       dsmsg.transformFromRawMsg();
       dsmsg.showOEupdateWA();
       dsmsg.findZTIC(dsmsg);
       //dsmsg.findTargetZTIC_asynch(dsmsg);
    
}  // end of ZtMessage.prototype.process_asynch


ZtMessage.prototype.updateCodeRange = function(svr1) {

var client = new Client();
var base_ztic = svr1.getCodeForNS(this.dbZtI_id, "131131/21");   // 20200918
for (var i = 0; i < this.codeRangeUpdate_AR.length; i++) {   //20200324

 var codeRangeObj = svr1.ZtObject_AR[this.codeRangeUpdate_AR[i].codeRangeIdx];

//console.log("20200918 ** this.dbZtI_id in zt_server_message.codeRangeUpdate(): "+this.dbZtI_id);

//function CodeRangeUpdateRec(codeRangeIdxx, nextCodex) {
//    this.codeRangeIdx = codeRangeIdxx;
//    this.nextCode     = nextCodex;
      var send_time = svr1.time.now();
//      while(send_time == svr1.time.now()){ 
//        //wait
//      } // endwhile

      var args = {
 data: { te_2_32: this.dbZtI_id.trim(),
         te_2_1: codeRangeObj.kindZTIC,
         te_2_2: codeRangeObj.kindCode,  // shoudl be "21", //object kind for code range
         te_2_3: codeRangeObj.objZTIC,
         te_2_4: codeRangeObj.objCode,
         //te_2_5: "2",
         //te_2_6: "1",
         //te_2_7: "2",  (del) 20200918
         te_2_7: base_ztic,  // 20200918
         te_2_8: "204", // object element code for next code in code range
         te_2_26: send_time,
         te_2_31: this.codeRangeUpdate_AR[i].nextCode },
        headers: { "Content-Type": "application/json" }
};
//client.post("http://localhost:5001/ZtObjectDbRec/insert", args, function (data, response) {
 client.post("http://localhost:5001/ZtObjectDbRec/update_oe_value", args, function (data, response) {
   // parsed response body as js object 
  // console.log(data);    (del) 20210521
  
});  //end post


  // console.log("20200324 this.codeRangeUpdate_AR.codeRangeIdx - this.codeRangeUpdate_AR.nextCode: "+ this.codeRangeUpdate_AR[i].codeRangeIdx+" - "+this.codeRangeUpdate_AR[i].nextCode);

} // endfor loop through this.codeRangeUpdate_AR



}  //end of ZtMessage.prototype.updateCodeRange


ZtMessage.prototype.getMsgZTICForServerZTIC = function(svr1, server_ztic) {     //20200420
//console.log("20200420a running getMsgZTICForServerZTIC");

var msg_ztic = "99999";

 for (var j = 0; j < this.msgZTIC_Array.length; j++) {
    if (this.msgZTIC_Array[j].targetZTIC == server_ztic) { msg_ztic = this.msgZTIC_Array[j].msgZTIC; break; }
 }  // endfor msgZTIC_Array


var nextCode = 0;
 for (var j = 0; j < this.msgZTIC_Array.length; j++) {
    if (this.msgZTIC_Array[j].msgZTIC >= nextCode) { nextCode = this.msgZTIC_Array[j].msgZTIC; nextCode++ ; }
 }  // endfor msgZTIC_Array


if(msg_ztic == "99999"){
    var ZTICupdrec = new ZTICUpdateWorkAreaRec();
    ZTICupdrec.msgZTIC = nextCode;
    ZTICupdrec.targetZTIC = server_ztic;
    ZTICupdrec.namespace = svr1.getNSforCode(this.dbZtI_id, server_ztic); 
    ZTICupdrec.response_only = true;
    this.msgZTIC_Array.push(ZTICupdrec);
    msg_ztic = nextCode;
}  // endif msg_ztic == "99999"

return msg_ztic;

}  // end of getMsgZTICForServerZTIC()


    
function ZtMessageSet(dsmsgset) {
   this.msg_AR = dsmsgset;

}  // end of function ZtMessageSet   
    
ZtMessageSet.prototype.process = function(dsmsg_AR) {
     //*** add dsmsg_AR[AR_idx].process_asynch
   for (var i = 0; i < dsmsg_AR.length; i++) {
//       dsmsg_AR[i].readRawMsgFromFile();
       dsmsg_AR[i].transformFromRawMsg();
       dsmsg_AR[i].showOEupdateWA();
       dsmsg_AR[i].findZTIC(dsmsg_AR[i]);
//       dsmsg_AR[i].findTargetZTIC_asynch(dsmsg_AR[i]);

   } // end loop through dsmsg_AR

}  // end of ZtMessageSet.prototype.process
    
// start 20211018
ZtMessage.prototype.addServerGeneratedLinkToMaintainSetUpdateWA_Array = function(svr1x, TypeValueUpdateWA_Arrayx, timestampx) { 


//  console.log("$$^ 20211101 running addServerGeneratedLinkToMaintainSetUpdateWA_Array in zt_server_message.js");
// pseudo code 
//1.  get type definition object
//2.  check if type definiton object has a type value for a link type of type 2 for server generated link
//3.  if step 2 is yes build a link
//4.  use link type object to find object kind ztic and code for from side of link
//    use type value passed in this function to be ztic and code of object on from side of link
//    use object being processed as to kind ztic and code and object ztic and code
//    add link and set the serverGeneratedLink variable to true



//function TypeValueUpdateWorkAreaRec(){
//    this.objectKindZTIC = "";
//    this.objectKindCode = "";
//    this.objectZTIC = "";
//    this.objectCode = "";
//    this.objectCodeTemp = "";
//    this.newCode    = "";
//    this.templateZTIC = "";
//    this.templateCode = "";
//    this.root_idx = 0;
//    this.request_idx = 0;
//    this.maintainSet_idx = 0;
//    this.maintainSetMember_idx = 0;
//    this.objectSet_idx = 0;
//    this.object_idx = 0;
//    this.typeSet_idx = 0;
//    this.type_idx     = 0;
//    this.typeDefZTIC_idx = 0;
//    this.typeDefCode_idx = 0;
//    this.typeValueZTIC_idx = 0; 
//    this.typeValueCode_idx = 0;
//    this.typeDefinitionZTIC = "";
//    this.typeDefinitionCode = "";
//    this.typeValueZTIC = "";
//    this.typeValueCode = "";
//    this.status = "";           //start add 20161003
//    this.timestampEff  = "";
//    this.seqNum          = "";  //end add 20161003





// step #1
  var base_dsi_str = "131131/21";
  var base_ztic_str = svr1x.getCodeForNS(this.dbZtI_id.trim(), base_dsi_str);

  var typeDefKeyStr = this.dbZtI_id.trim()+"_"+base_ztic_str+"_9_" + TypeValueUpdateWA_Arrayx.typeDefinitionZTIC +"_"+ TypeValueUpdateWA_Arrayx.typeDefinitionCode;
  //console.log("$$^ 20211101  typeDefKeyStr: "+typeDefKeyStr);
  var type_def_obj = svr1x.ZtObject_AR[svr1x.ZtObject_idx_HM.get(typeDefKeyStr)];

 //console.log("$$^ 20220814  typeDefKeyStr: "+typeDefKeyStr);    
  var type_val_to_get_link_type_idx = type_def_obj.getTypeValueIdxSingle(base_ztic_str, "24", timestampx);  // link type for bi-directional link
 // console.log("type_val_to_get_link_type_idx: "+type_val_to_get_link_type_idx);
  if(!(type_val_to_get_link_type_idx == null)){  // 20211115
      var type_val_to_get_link_type = svr1x.ZtObjectTypeValue_AR[type_val_to_get_link_type_idx];

      var linkTypeKeyStr = this.dbZtI_id.trim()+"_"+base_ztic_str+"_10_" + type_val_to_get_link_type.typeValue_ztic +"_"+ type_val_to_get_link_type.typeValue_code;

      var link_type_obj = svr1x.ZtObject_AR[svr1x.ZtObject_idx_HM.get(linkTypeKeyStr)];

      var obj_kind_for_type_def_idx = type_def_obj.getTypeValueIdxSingle(base_ztic_str, "4", timestampx);
      var obj_kind_for_type_def     = svr1x.ZtObjectTypeValue_AR[obj_kind_for_type_def_idx]; 

      var objKindKeyStr = this.dbZtI_id.trim()+"_"+base_ztic_str+"_1_" + obj_kind_for_type_def.typeValue_ztic +"_"+ obj_kind_for_type_def.typeValue_code;


      //console.log("obj_kind_for_type_def_obj_idx: "+obj_kind_for_type_def_obj_idx);
  
      var obj_kind_for_type_def_obj = svr1x.ZtObject_AR[svr1x.ZtObject_idx_HM.get(objKindKeyStr)];

      //console.log("$$^ obj_kind_for_type_def_obj.keyString: "+obj_kind_for_type_def_obj.keyString);

      //console.log("$$^ 20211101 link_type_obj: "+link_type_obj);
 //if(!(link_type_obj == null)){  // if link type for bi-directional connection is found as a type value for the type definition  (del) 20211115

      // build link
      var serverGenLinkUpdateWA = new LinkUpdateWorkAreaRec();
      serverGenLinkUpdateWA.objectKindZTIC = obj_kind_for_type_def_obj.objZTIC;
      serverGenLinkUpdateWA.objectKindCode = obj_kind_for_type_def_obj.objCode;
      serverGenLinkUpdateWA.objectZTIC = TypeValueUpdateWA_Arrayx.typeValueZTIC;
      serverGenLinkUpdateWA.objectCode = TypeValueUpdateWA_Arrayx.typeValueCode;
      //serverGenLinkUpdateWA.objectCodeTemp
      //serverGenLinkUpdateWA.newCode
      serverGenLinkUpdateWA.maintainSetMember_idx = TypeValueUpdateWA_Arrayx.maintainSetMember_idx;
      serverGenLinkUpdateWA.linkTypeZTIC   = link_type_obj.objZTIC;
      serverGenLinkUpdateWA.linkTypeCode   = link_type_obj.objCode;
      serverGenLinkUpdateWA.linkToKindZTIC = TypeValueUpdateWA_Arrayx.objectKindZTIC;
      serverGenLinkUpdateWA.linkToKindCode = TypeValueUpdateWA_Arrayx.objectKindCode;
      serverGenLinkUpdateWA.linkToCodeZTIC = TypeValueUpdateWA_Arrayx.objectZTIC;
      serverGenLinkUpdateWA.linkToCode     = TypeValueUpdateWA_Arrayx.objectCode;
      serverGenLinkUpdateWA.status         = "";
      serverGenLinkUpdateWA.timestampEff   = timestampx;
      serverGenLinkUpdateWA.serverGeneratedLink = true;
      this.LinkUpdateWA_Array.push(serverGenLinkUpdateWA);
      console.log("$$^ 20211101 server generated link added in zt_server_message ACTIVATE IF NEEDED: ");
      //console.log("objectKindZTIC: "+ serverGenLinkUpdateWA.objectKindZTIC);
      //console.log("objectKindCode: "+ serverGenLinkUpdateWA.objectKindCode);
      //console.log("objectZTIC:     "+ serverGenLinkUpdateWA.objectZTIC);
      //console.log("objectCode:     "+ serverGenLinkUpdateWA.objectCode);
      //console.log("mntSetMmbr_idx: "+ serverGenLinkUpdateWA.maintainSetMember_idx);
      //console.log("linkTypeZTIC:   "+ serverGenLinkUpdateWA.linkTypeZTIC);
      //console.log("linkTypeCode:   "+ serverGenLinkUpdateWA.linkTypeCode);
      //console.log("linkToKindZTIC: "+ serverGenLinkUpdateWA.linkToKindZTIC);
      //console.log("linkToKindCode: "+ serverGenLinkUpdateWA.linkToKindCode);
      //console.log("linkToCodeZTIC: "+ serverGenLinkUpdateWA.linkToCodeZTIC);
      //console.log("linkToCode:     "+ serverGenLinkUpdateWA.linkToCode);
      //console.log("timestampEff:   "+ serverGenLinkUpdateWA.timestampEff);
      //console.log("serverGenLink:  "+ serverGenLinkUpdateWA.serverGeneratedLink);
  }  // endif

//function LinkUpdateWorkAreaRec() {
//    this.objectKindZTIC = "";
//    this.objectKindCode = "";
//    this.objectZTIC = "";
//    this.objectCode = "";
//    this.objectCodeTemp = "";
//    this.newCode    = "";
//    this.templateZTIC = "";
//    this.templateCode = "";
//    this.root_idx = 0;
//    this.request_idx = 0;
//    this.maintainSet_idx = 0;
//    this.maintainSetMember_idx = 0;
//    this.objectSet_idx = 0;
//    this.object_idx = 0;
//    this.linkSet_idx = 0;
//    this.link_idx     = 0;
//    this.linkTypeZTIC_idx = 0;
//    this.linkTypeCode_idx = 0;
//    this.linkToKindZTIC_idx = 0;
//    this.linkToKindCode_idx = 0;
//    this.linkToZTIC_idx = 0;
//    this.linkToCode_idx = 0;
//    this.linkTypeZTIC = "";
//    this.linkTypeCode = "";
//    this.linkToKindZTIC = "";
//    this.linkToKindCode = "";
//    this.linkToCodeZTIC = "";
//    this.linkToCode     = "";
//    this.newLinkTargetCode = "";
//    this.linkStatus = "";           //start add 20161003 renamed from status 20210303
//    this.linkValue  = "";           // 20210303
//    this.timestampEff  = "";
//    this.seqNum          = "";  //end add 20161003
//    this.serverGeneratedLink = false;   // 20211018


  
}  // end of ZtMessage.prototype.addServerGeneratedLinkToMaintainSetUpdateWA_Array = function(svr1, server_ztic) {


ZtMessage.prototype.validateMessageContent = function(svr1x, timestampx) {

  var function_group_KeyStr;
 //// var validation_obj;  
  const base_ztic   = svr1x.getCodeForNS(this.dbZtI_id, "131131/21");
  const validation_ztic   = svr1x.getCodeForNS(this.dbZtI_id, "zinfinitree.com/validation");
 ////  //validate links  
 //// ELEM 2    52   3    2    2    52   2    52        Validation of Links
 // NOTE:  validation was renamed to function group
  function_group_KeyStr = this.dbZtI_id.trim()+"_"+base_ztic+"_52_" + validation_ztic +"_2"; // link validation
  if(svr1x.ZtObject_idx_HM.has(function_group_KeyStr)){   // 20240223
    function_group_idx = svr1x.ZtObject_idx_HM.get(function_group_KeyStr);
 //// validation_obj = svr1x.ZtObject_AR[validation_obj_idx];
     var  new_validation = new (require('./zt_server_function_group'))( svr1x, this, function_group_idx, timestampx );  
     this.validation_AR.push(new_validation);

     //console.log("20240207b running validateMessageContent in zt_server_message.js this.validation_AR.length: "+this.validation_AR.length);
     this.validation_AR.forEach((validation) => {
       //validation.getValues();     // (del) 20250201   
       //validation.performValidation();   // (del) 20250131
         validation.executeFunctions();  // 20250131
     }); // end of loop through this.validation_AR   // 20240223

}  // endif svr1x.ZtObject_idx_HM.has(function_group_KeyStr)

}  // end of ZtMessage.prototype.validateMessageContent = function(svr1x) {

 


function ZTICUpdateWorkAreaRec(){
    this.msgZTIC = "";
    this.targetZTIC = "";
    this.namespace = "";
    this.found_in_db = false;
    this.root_idx = 0;
    this.header_idx = 0;
    this.dsiSet_idx = 0;
    this.dsi_idx    = 0;
    this.msgZTIC_idx   = 0;
    this.namespace_idx = 0;
    this.response_only = false;
  
}


function MessageProcessingParametersGeneralWorkAreaRec(){
    this.defaultEffectiveTimestamp = "";     //2301
    this.messageIdClient           = "";     //2302
    this.indexOfLastRequestSegment = "";     //2303
    this.defaultUpdateMode         = "";     //2304
    this.user                      = "";     //2305
    this.softwarePatchLevelZTIC    = "";     //2306
    this.softwarePatchLevelCode    = "";     //2307
  
}


function ExtendedKeyWorkAreaRec(){
    this.extendedKeySetMember_idx        = "";
    this.rawMsg_idx                      = "";
    this.extendedKeyDefinitionCodeZTIC   = "";   //2311
    this.extendedKeyDefinitionCode       = "";   //2312
    this.extendedKeyValueZTIC            = "";   //2313
    this.extendedKeyValueCode            = "";   //2314
}// end of ExtendedKeyWorkAreaRec()


function ObjectTemplateUpdateWorkAreaRec() {
    this.objectKindZTIC = "";
    this.objectKindCode = "";
    this.objectZTIC = "";
    this.objectCode = "";
    this.root_idx = 0;
    this.request_idx = 0;
    this.maintainSet_idx = 0;
    this.maintainSetMember_idx = 0;
    this.objectTemplateZTIC_idx = 0;
    this.objectTemplateCode_idx = 0;
    this.objectTemplateZTIC = "";
    this.objectTemplateCode = "";
    this.status = "";           //start add 20161003
    this.timestampEff  = "";
    this.seqNum          = "";  //end add 20161003
    } 

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
 
function ObjectElementUpdateWorkAreaRec(){
    this.objectKindZTIC = "";
    this.objectKindCode = "";
    this.objectZTIC = "";
    this.objectCode = "";
    this.objectCodeTemp = "";
    this.newCode    = "";
    this.templateZTIC = "";
    this.templateCode = "";
    this.root_idx = 0;
    this.request_idx = 0;
    this.maintainSet_idx = 0;
    this.maintainSetMember_idx = 0;
    this.objectSet_idx = 0;
    this.object_idx = 0;
    this.OE_set_idx = 0;
    this.OE_idx     = 0;
    this.OE_ZTIC_idx = 0;
    this.OE_code_idx = 0;
    this.OE_value_idx = 0; 
////    // te_2_7 = "";        //7  --Std Object Element DS Instance Code
////    //te_2_8 = "";        //8  --Std Object Element Code
////    //te_2_9 = "";        //9  --Ext.Key Extended Key Definition ZTIC
////    //te_2_10 = "";       //10 --Ext.Key Extended Key Definition Code
////    //te_2_11 = "";       //11 --Ext.Key Extended Key Value ZTIC
////    //te_2_12 = "";       //12 --Ext.Key Extended Key Value Code
////    //te_2_25 = "";       //25 --All Status
////    //te_2_26 = "";       //26 --All Timestamp--Effective
////    //te_2_27   = "";     //27 --All Sequence number
////    //te_2_31     = "";   //31 --Std Object Element Value  
    this.extKeyDefZTIC = "";  // start add 20161003
    this.extKeyDefCode = "";
    this.extKeyValueZTIC = "";
    this.extKeyValueCode = "";
    this.status = "";
    this.timestampEff  = "";
    this.seqNum          = "";  //end add 20161003 
    
    this.objectElementZTIC = "";
    this.objectElementCode = "";
    this.objectElementValue = "";}
   // this.tableElementZTIC = "";   (del) 20191110
   // this.tableElementCode = "";}  (del) 20191110


function TypeValueUpdateWorkAreaRec(){
    this.objectKindZTIC = "";
    this.objectKindCode = "";
    this.objectZTIC = "";
    this.objectCode = "";
    this.objectCodeTemp = "";
    this.newCode    = "";
    this.templateZTIC = "";
    this.templateCode = "";
    this.root_idx = 0;
    this.request_idx = 0;
    this.maintainSet_idx = 0;
    this.maintainSetMember_idx = 0;
    this.objectSet_idx = 0;
    this.object_idx = 0;
    this.typeSet_idx = 0;
    this.type_idx     = 0;
    this.typeDefZTIC_idx = 0;
    this.typeDefCode_idx = 0;
    this.typeValueZTIC_idx = 0; 
    this.typeValueCode_idx = 0;
    this.typeDefinitionZTIC = "";
    this.typeDefinitionCode = "";
    this.typeValueZTIC = "";
    this.typeValueCode = "";
    this.status = "";           //start add 20161003
    this.timestampEff  = "";
    this.seqNum          = "";  //end add 20161003
    }
    
    
function LinkUpdateWorkAreaRec() {
    this.objectKindZTIC = "";
    this.objectKindCode = "";
    this.objectZTIC = "";
    this.objectCode = "";
    this.objectCodeTemp = "";
    this.newCode    = "";
    this.templateZTIC = "";
    this.templateCode = "";
    this.root_idx = 0;
    this.request_idx = 0;
    this.maintainSet_idx = 0;
    this.maintainSetMember_idx = 0;
    this.objectSet_idx = 0;
    this.object_idx = 0;
    this.linkSet_idx = 0;
    this.link_idx     = 0;
    this.linkTypeZTIC_idx = 0;
    this.linkTypeCode_idx = 0;
    this.linkToKindZTIC_idx = 0;
    this.linkToKindCode_idx = 0;
    this.linkToZTIC_idx = 0;
    this.linkToCode_idx = 0;
    this.linkTypeZTIC = "";
    this.linkTypeCode = "";
    this.linkToKindZTIC = "";
    this.linkToKindCode = "";
    this.linkToCodeZTIC = "";
    this.linkToCode     = "";
    this.newLinkTargetCode = "";
    this.linkStatus = "";           //start add 20161003 renamed from status 20210303
    this.linkValue  = "";           // 20210303
    this.timestampEff  = "";
    this.seqNum          = "";  //end add 20161003
    this.serverGeneratedLink = false;   // 20211018
    }    

  
    
function QuerySetWorkAreaRec()  {
   this.rawMsg_idx             = "";
   this.setMemberID            = "";     //3100
   this.objectTemplateZTIC     = "";     //3101
   this.objectTemplateCode     = "";     //3102
   this.selectionMode          = "";     //3103
   this.statusExclusion_AR     = [];     //31091 and 31092     20210721
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
   this.linkStatus                   = "";   //31691   // 20210303
   this.timestampEff                 = "";   //31692   // 20210303
   this.linkValue                    = "";   //31693   // 20210303
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

function QueryResponseObjectWorkAreaRec() {
   this.rawMsg_idx                    = "";
   this.queryResponseSetWA_rawMsg_idx = "";
   this.objectKindZTIC                = "";   //4132
   this.objectKindCode                = "";   //4133
   this.objectZTIC                    = "";   //4134
   this.objectCodeTemp                = "";   //4135 ??? is this needed for query resp?
   this.objectCodeAssigned            = "";   //4136
   this.rootObject_BL	              = "";   //4137  boolean
   this.objectElementSet_idx_AR       =	"";   //4140
   this.typeSet_idx_AR                = "";   //4150
   this.linkSet_idx_AR                = "";   //4160	

}

function QueryResponseObjectElementWorkAreaRec() {
       this.rawMsg_idx                    = "";
       this.objectWA_rawMsg_idx           = "";
       this.objectElementZTIC             = "";  //4142
       this.objectElementCode             = "";  //4143
       this.objectElementValue            = "";  //4144

}
function QueryResponseTypeWorkAreaRec() {
       this.rawMsg_idx                    = "";
       this.objectWA_rawMsg_idx           = "";
       this.typeDefinitionDSCI            = "";    //4152
       this.typeDefinitionCode            = "";    //4153
       this.typeValueZTIC                 = "";    //4154
       this.typeValueCode                 = "";    //4155
}

function QueryResponseLinkWorkAreaRec() {
       this.rawMsg_idx                    = "";
       this.objectWA_rawMsg_idx           = "";
       this.linkTypeZTIC                  = "";   //4162
       this.linkTypeCode                  = "";   //4163
       this.linkToKindZTIC                = "";   //4164
       this.linkToKindCode                = "";   //4165
       this.linkToZTIC                    = "";   //4166
       this.linkToCode                    = "";   //4167
       this.linkStatus                    = "";   //41691   // 20210303
       this.timestampEff                  = "";   //41692   // 20210303
       this.linkValue                     = "";   //41693   // 20210303

}
 

//insert 20190708
function ObjectValueUpdateWorkAreaRec(dbzti_id, kindZTIC, kindCode, objZTIC, objCode, objCodeTemp, newCode)  {
    this.dbzti_id  = dbzti_id;
    this.kindZTIC = kindZTIC.trim();
    this.kindCode = kindCode.trim();
    this.objZTIC  = objZTIC.trim();
    this.objCode  = objCode.trim();
    this.objCodeTemp = objCodeTemp.trim();    //20200330
    //this.tempCode = "";                //(d3l) 202003330
    this.newCode  = newCode;   //boolean
    this.keyString   = dbzti_id+"_"+kindZTIC.trim()+"_"+kindCode.trim()+"_"+objZTIC.trim()+"_"+objCode.trim();
    this.parentIdx = 0;   // reveiw
    this.linkLevel = 0;   // review
    this.isPopulated = false;  // review
    this.objElement_idx_AR = [];
    this.typeValue_idx_AR  = [];
    this.link_idx_AR       = [];

}
//end insert 20190708


//start insert 20190208
function ZtObjectElementValue(objectKey, OE_ztic, OE_code, ek_defZTIC, ek_defCode, ek_valueZTIC, ek_valueCode, status, timestamp, seqNum, value, templateZTIC, templateCode) {
   this.objectjKey = objectKey;
   //this.TE_ztic    = TE_ztic;
   //this.TE_code    = TE_code;
   this.OE_ztic      = OE_ztic;
   this.OE_code      = OE_code;
   this.ek_defZTIC = ek_defZTIC;
   this.ek_defCode = ek_defCode;
   this.ek_valueZTIC    = ek_valueZTIC;
   this.ek_valueCode    = ek_valueCode;
   this.status          = status;
   this.timestamp       = timestamp;
   this.seqNum          = seqNum;
   this.value           = value;
   this.templateZTIC    = templateZTIC;
   this.templateCode    = templateCode;
 
} // end of function ZtObjectElementValue


function ZtObjectTypeValue(objectKey, typeDef_ztic, typeDef_code, typeValue_ztic, typeValue_code, status, timestamp, seqNum, templateZTIC, templateCode) {
   this.objectKey = objectKey;
   this.typeDef_ztic = typeDef_ztic;
   this.typeDef_code = typeDef_code;
   this.typeValue_ztic = typeValue_ztic;
   this.typeValue_code = typeValue_code;
   this.status         = status;
   this.timestamp      = timestamp;
   this.seqNum         = seqNum;
   this.templateZTIC   = templateZTIC;
   this.templateCode   = templateCode;

}  // end of function ZtObjectTypeValue


function ZtObjectLink(svr1, objectKey, linkType_ztic, linkType_code, linkToKind_ztic, linkToKind_code, linkToCode_ztic, linkToCode, linkValue, linkStatus, timestampEff, seqNum, templateZTIC, templateCode) {
   this.svr1      = svr1;
   this.objectKey = objectKey;
   this.linkType_ztic = linkType_ztic;
   this.linkType_code = linkType_code;
   this.linkToKind_ztic    = linkToKind_ztic;
   this.linkToKind_code    = linkToKind_code;
   this.linkToCode_ztic    = linkToCode_ztic;
   this.linkToCode         = linkToCode;
   this.linkValue          = linkValue;
   this.linkStatus         = linkStatus;
   this.timestampEff       = timestampEff;
   this.seqNum             = seqNum;
   this.templateZTIC       = templateZTIC;
   this.templateCode       = templateCode;
   this.serverGeneratedLink = false;   // 20211018

}  // end of function ZtObjectLinks


function ZtObjectTemplate(objectKey, templ_ztic, templ_code, status, timestamp, seqNum) {

    this.objectKey = objectKey;
    this.templ_ztic = templ_ztic;
    this.templ_code = templ_code;
    this.status     = status;
    this.timestamp  = timestamp;
    this.seqNum     = seqNum;


} // end of ZtObjectTemplate




function ZtObject(dbzti_id, kindZTIC, kindCode, objZTIC, objCode) {
    this.dbzti_id  = dbzti_id.trim();
    this.kindZTIC = kindZTIC.trim();
    this.kindCode = kindCode.trim();
    this.objZTIC  = objZTIC.trim();
    this.objCode  = objCode.trim();
    this.keyString   = dbzti_id.trim()+"_"+kindZTIC.trim()+"_"+kindCode.trim()+"_"+objZTIC.trim()+"_"+objCode.trim();
    this.parentIdx = 0;
    this.linkLevel = 0;
    this.isPopulated = false;
    this.objElemIdx_AR = [];
    this.linkIdx_AR       = [];
    this.typeValueIdx_AR  = [];

    
} // end of function ZtObject


function ZtObjectId(dbzti_id, kindZTIC, kindCode, objectZTIC, objCode){
    this.dbzti_id = dbzti_id.trim();
    this.kindZTIC = kindZTIC.trim();
    this.kindCode = kindCode.trim();
    this.objZTIC  = objZTIC.trim();
    this.objCode  = objCode.trim();
    this.keyString   = dbzti_id.trim()+"_"+kindZTIC.trim()+"_"+kindCode.trim()+"_"+objZTIC.trim()+"_"+objCode.trim();;
}// end of function ZtObjectId


function MessageRow(index, parent_index, priority, me_ztic, me_code, data) {
  this.index        = index;
  this.parent_index = parent_index;
  this.priority     = priority;
  this.me_ztic      = me_ztic;
  this.me_code      = me_code;
  this.data         = data;
 
}

//end insert 20190208

// begin insert 20240211
function ResponseMessageStatusWorkAreaRec() {
//4201-MessageStatusZTIC
//4202-MessageStatusCode
//4203-MessageStatusTimestamp
//4204-MessageStatusText

this.messageStatusZTIC = "";
this.messageStatusCode = "";
this.messageStatusTimestamp = "";
this.messageStatusText = "";

} // end of ResponseMessageStatusWorkAreaRec   
// end insert 20240211


// begin insert 20191220
function ServerLogSystemMessage() {

//4300-ID 
//4301-SystemMessageDefZTIC
//4302-SystemMessageDefCode
//4303-MessageCategory
//4304-Timestamp
//4311-RelatedSection
//4312-RelatedSectionID
//4313-SerialNumberOfRelatedMessageElement
//4321-ShortSystemMessage
//4322-LongSystemMessage
//4330-ParameterSet
  this.ID = "";
  this.SystemMessageDefZTIC = "";
  this.SystemMessageDefCode = "";
  this.MessageCategory = "";
  this.Timestamp  = "";
  this.RelatedSection = "";
  this.RelatedSectionID = "";
  this.SerialNumberOfRelatedMessageElement = "";
  this.ShortSystemMessage = "";
  this.LongSystemMessage  = "";
  this.parameter_AR       = [];

}  // end ServerLogSystemMessage
// end insert 20191220

// begin insert 20200324

function CodeRangeUpdateRec(codeRangeIdxx, nextCodex) {
    this.codeRangeIdx = codeRangeIdxx;
    this.nextCode     = nextCodex;
}  // end insert 20200324


// end insert 20200324


//inserted 20190214
function ZTICNS(code, namespace) {
   this.code = code;
   this.namespace = namespace;
} // end of function ZTICNS  inserted 20190214
    
 
module.exports = ZtMessage;

// start 20230114
function DbRec() { 
   this.te_2_1   = "";
   this.te_2_2   = "";
   this.te_2_3   = "";
   this.te_2_4   = "";
   this.te_2_5   = "";
   this.te_2_6   = "";
   this.te_2_7   = ""; 
   this.te_2_8   = "";
   this.te_2_9   = "";
   this.te_2_10  = "";
   this.te_2_11  = "";
   this.te_2_12  = "";
   this.te_2_13  = "";
   this.te_2_14  = "";
   this.te_2_15  = "";
   this.te_2_16  = "";
   this.te_2_17  = "";
   this.te_2_18  = "";
   this.te_2_19  = "";
   this.te_2_20  = "";
   this.te_2_21  = "";
   this.te_2_22  = "";
   this.te_2_23  = "";
   this.te_2_24  = "";
   this.te_2_25  = "";
   this.te_2_26  = "";
   this.te_2_27  = "";
   this.te_2_28  = "";
   this.te_2_29  = "";
   this.te_2_30  = "";
   this.te_2_31  = "";
   this.te_2_32  = "";
}
// end 20230114