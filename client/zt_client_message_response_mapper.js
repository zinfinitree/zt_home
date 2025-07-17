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


class ZtMessageResponseMapper {

// copied from ds2b_server_message_parse.js and adjusted for client  20190905

    constructor(msgx) {
    //this.txt1   = "validation1 text";
    //this.svr1 = svr1x;
    this.msg = msgx;
  }



     process() {


//console.log("running client message response mapper: "+this.msg);

var loop_cntr = 0;
for(var h = 0; h < sm1.queryResponseSetMemberWA_AR.length; h++){


//   console.log("Query ID:  "+ sm1.queryResponseSetMemberWA_AR[h].setMemberID);
//   console.log("20200125c sm1.queryResponseSetMemberWA_AR[h].object_idx_AR.length: "+sm1.queryResponseSetMemberWA_AR[h].object_idx_AR.length);
   for(var k = 0; k < sm1.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
 //      console.log("object_idx: "+ sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k]);

var i = sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c

//  console.log("Object: "+ sm1.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+sm1.queryResponseObjectWA_AR[i].objectKindCode+"-"+sm1.queryResponseObjectWA_AR[i].objectZTIC+"-"+sm1.queryResponseObjectWA_AR[i].objectCode);


     // var objx = sm1.queryResponseObjectWA_AR[i];                                   //(del) 20200126
     var objx = sm1.queryResponseObjectWA_AR[sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
     loop_cntr++;
var OEscreenElem_AR = []; 
respStr = respStr + "<table>";         // 20200127
const html_id_prfx = "val";
var   html_id_cntr = 1;
//console.log("Object Element values");
    //queryResponseObjectElementWA_AR = [];     
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
    // console.log("20200127 base_ztic: "+base_ztic);
   //  if(!(sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   //to suppress technical profile description
     if(!(sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   // 20200127 temporary to suppress technical profile description
        var OEscreenElem = new OEscreenElemRec();    //20200125
        OEscreenElem.OE_ztic = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;
        OEscreenElem.OE_code = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;
        OEscreenElem.html_id = html_id_prfx + html_id_cntr.toString().trim();
        html_id_cntr++;
        OEscreenElem.html_label = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        respStr = respStr + "<tr><td>"+ OEscreenElem.html_label+"</td><td> <input type=\"TEXT\" id='"+ OEscreenElem.html_id+ "' size=\"40\"></td></tr>";  

      }  // endif sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode != 12


// (del) 20200125 respStr = respStr + "<tr><td>"+ sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue+"</td><td> <input type=\"TEXT\" id=\"file_name\" size=\"40\"></td></tr>";  //20191008

 // console.log("   OE ZTIC/Code: Value:  "+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
//+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
//+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);


      }  // endfor loop through objx.objectElement_idx_AR  

     
//console.log("Type values");
          
    //queryResponseTypeWA_AR          = [];           

    for(var j = 0; j < objx.type_idx_AR.length; j++){
      //var objx = sm1.queryResponseObjectWA_AR[i];
  //console.log("   Type Def/Value ZTIC/Code:  "+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);


      }

//console.log("Links");

    for(var j = 0; j < objx.link_idx_AR.length; j++){
      //var objx = sm1.queryResponseObjectWA_AR[i];
//  console.log("   Link Type/Value:  "+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

      }


    } // end loop through sm1.queryResponseSetMemberWA_AR[h].object_idx_AR using index k

}  // end of loop through queryResponseSetMemberWA_AR using  index h



}  // end of process()


} // end of class ZtMessageResponseMapper


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
  
}

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
   var HashMap = require('hashmap');
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
////    // te_2_7 = "";        //7  --Std Table Element DS Instance Code
////    //te_2_8 = "";        //8  --Std Table Element Code
////    //te_2_9 = "";        //9  --Ext.Key Extended Key Definition ZTIC
////    //te_2_10 = "";       //10 --Ext.Key Extended Key Definition Code
////    //te_2_11 = "";       //11 --Ext.Key Extended Key Value ZTIC
////    //te_2_12 = "";       //12 --Ext.Key Extended Key Value Code
////    //te_2_25 = "";       //25 --All Status
////    //te_2_26 = "";       //26 --All Timestamp--Effective
////    //te_2_27   = "";     //27 --All Sequence number
////    //te_2_31     = "";   //31 --Std Table Element Value  
    this.extKeyDefZTIC = "";  
    this.extKeyDefCode = "";
    this.extKeyValueZTIC = "";
    this.extKeyValueCode = "";
    this.status = "";
    this.timestampEff  = "";
    this.seqNum          = "";  
    
    this.objectElementZTIC = "";
    this.objectElementCode = "";
    this.objectElementValue = "";
    this.tableElementZTIC = "";
    this.tableElementCode = "";} 


function TypeValueUpdateWorkAreaRec(){
    this.objectKindZTIC = "";
    this.objectKindCode = "";
    this.objectZTIC = "";
    this.objectCode = "";
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
    this.status = "";           //start add 20161003
    this.timestampEff  = "";
    this.seqNum          = "";  //end add 20161003
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

function MaintainResponseSetMemberWorkAreaRec() {
   this.rawMsg_idx                      = "";
   this.id                              = ""; //4000 
   this.maintainSetProcessingStatusSet  = ""; //4010


}

function MaintainResponseObjectWorkAreaRec() {

   this.rawMsg_idx                     = "";
   this.maintainResponseSet_rawMsg_idx = "";
   this.objectKindZTICode              = "";   //4032
   this.objectKindCode                 = "";   //4033
   this.objectZTICode                  = "";   //4034
   this.objectCodeTemp                 = "";   //4035
   this.objectCodeAssigned             = "";   //4036
   this.id                             = "";   //4037
   this.parentID                       = "";   //4038
   this.templateZTIC                   = "";   //40390
   this.templateCode                   = "";   //40391
   this.elementSet                     = "";   //4040
}


function QueryResponseSetMemberWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.queryResponseSetMember_idx   = "";
   this.queryResponseSet_idx         = "";
   this.response_idx                 = "";
   this.root_idx                     = "";
   this.setMemberID                  = "";     //4100
   this.objectTemplateZTIC           = "";     //4101
   this.objectTemplateCode           = "";     //4102
   this.timestampEff                 = "";     //4103
   this.queryProcessingStatus_idx_AR = [];     //4110
   this.object_idx_AR                = [];     //4130

}


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
   //this.objectCodeAssigned            = "";   //4136
   this.rootObject_BL	              = "";   //4137  boolean
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
       this.linkStatus                    = "";   //41691  // 20210224
       this.timestampEff                  = "";   //41692  // 20210224
       this.linkValue                     = "";   //41693  // 20210224
}
 

function ServerLogSystemMessageWorkAreaRec(){
    this.rawMsg_idx = "";
    this.serverLogSystemMessageSetMember_idx = "";  //430
    this.serverLogSystemMessageSet_idx       = "";  //43
    this.response_idx     = "";                     //4
    this.id  = "";                                  //4300
    this.ztic  = "";                                //4301
    this.code  = "";                                //4302
    this.messageCategory = "";                      //4303
    this.timestamp = "";                            //4304
    this.relatedSection = "";                       //4311
    this.relatedSectionID = "";                     //4312
    this.serialNumberOfRelatedMessageElement = "";  //4313
    this.shortSystemMessage = "";                   //4321
    this.longSystemMessage  = "";                   //4322
    this.parameter_idx_AR = [];                     //4330




} // end of function ServerLogSystemMessageWorkAreaRec()



function ServerLogSystemMessageWorkAreaParameterRec(){
    this.rawMsg_idx = "";
    this.parameterSetMember_idx = "";   //4331
    this.parameterSet_idx       = "";   //4330
    this.serverLogSystemMessageSetMember_idx = "";  //430
    this.serverLogSystemMessageSet_idx       = "";  //43
    this.response_idx     = "";                     //4
    this.namespace  = "";
    this.ztic       = "";  //4332
    this.code       = "";  //4333
    this.value      = "";  //4334


} // end of function ServerLogSystemMessageWorkAreaParameterRec

// end 20200107



module.exports = ZtMessageResponseMapper;
