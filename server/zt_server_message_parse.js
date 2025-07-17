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




class ZtMessageParse {


    constructor(svr1x,msgx) {
    //this.txt1   = "validation1 text";
    this.svr1 = svr1x;
    this.msg = msgx;
  }



     process() {


//console.log("running message parse: "+this.svr1+", "+this.msg);
//console.log("Time now: "+this.svr1.time.now());

// 20200210
//var msgProcParamsGeneral = 
this.msg.MessageProcessingParametersGeneralWA = new MessageProcessingParametersGeneralWorkAreaRec();
// end 20200210



for (var i = 0; i < this.msg.ZtRawMessageAR.length; i++) {
  //console.log(i, this.msg.ZtRawMessageAR[i].parent_index,this.msg.ZtRawMessageAR[i].priority,this.msg.ZtRawMessageAR[i].me_disc,this.msg.ZtRawMessageAR[i].me_code,this.msg.ZtRawMessageAR[i].data);
  
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2101) {    //load namespaces
                                   var ZTICupdrec = new ZTICUpdateWorkAreaRec();
                                   ZTICupdrec.namespace = this.msg.ZtRawMessageAR[i].data;
                                   ZTICupdrec.namespace_idx = this.msg.ZtRawMessageAR[i].index;
                                   ZTICupdrec.dsi_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                   ZTICupdrec.dsiSet_idx    = this.msg.ZtRawMessageAR[ZTICupdrec.dsi_idx.trim()].parent_index;
                                   ZTICupdrec.header_idx    = this.msg.ZtRawMessageAR[ZTICupdrec.dsiSet_idx.trim()].parent_index;
//                                   ZTICupdrec.root_idx      = this.msg.ZtRawMessageAR[ZTICupdrec.header_idx.trim()].parent_index;
                                   this.msg.msgZTIC_Array.push(ZTICupdrec);
                                    
                                   }


       if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2301) {    //load default update mode

// start 20200210
//function MessageProcessingParametersGeneralWorkAreaRec(){  
//    this.defaultEffectiveTimestamp = "";     //2301
//    this.messageIdClient           = "";     //2302
//    this.indexOfLastRequestSegment = "";     //2303
//    this.defaultUpdateMode         = "";     //2304
//    this.user                      = "";     //2305
//   // this.softwarePatchLevelZTIC    = "";     //2306
//   // this.softwarePatchLevelCode    = "";     //2307
//    this.serverSoftwareRuntimeProfileZTIC = ""   // 2306
//    this.serverSoftwareRuntimeProfileCode = ""   // 2307
  
//}
// end 20200210
                              //var msgProcParamsGeneral = new MessageProcessingParametersGeneralWorkAreaRec();  (del) 20200210
                              //msgProcParamsGeneral.defaultUpdateMode = this.msg.ZtRawMessageAR[i].data;        (del) 20200210
                              this.msg.MessageProcessingParametersGeneralWA.defaultEffectiveTimestamp = this.msg.ZtRawMessageAR[i].data;
                                  // this.msg.MessageProcessingParametersGeneralWA = msgProcParamsGeneral;            (del) 20200210
                                    
                                   } // end 2301

    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2302) {    //load message id--client

                                this.msg.MessageProcessingParametersGeneralWA.messageIdClient = this.msg.ZtRawMessageAR[i].data;
                                    
                                   } // end 2302


    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2303) {    //load index of last request segment

                                this.msg.MessageProcessingParametersGeneralWA.indexOfLastRequestSegment = this.msg.ZtRawMessageAR[i].data;
                                    
                                   } // end 2303

    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2304) {    //load default update mode

                                this.msg.MessageProcessingParametersGeneralWA.defaultUpdateMode = this.msg.ZtRawMessageAR[i].data;
                                    
                                   } // end 2304

    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2305) {    //load user

                                this.msg.MessageProcessingParametersGeneralWA.user = this.msg.ZtRawMessageAR[i].data;
                                    
                                   } // end 2305

    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2306) {    //load server software runtime profile ztic

                                //this.msg.MessageProcessingParametersGeneralWA.softwarePatchLevelZTIC = this.msg.ZtRawMessageAR[i].data; (del) 20200214
                                  this.msg.MessageProcessingParametersGeneralWA.serverSoftwareRuntimeProfileZTIC = this.msg.ZtRawMessageAR[i].data;  
                                   } // end 2306

    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2307) {    //load default update mode

                               // this.msg.MessageProcessingParametersGeneralWA.softwarePatchLevelCode = this.msg.ZtRawMessageAR[i].data;
                                  this.msg.MessageProcessingParametersGeneralWA.serverSoftwareRuntimeProfileCode = this.msg.ZtRawMessageAR[i].data;  
                                   } // end 2307


// 20200216
//function ExtendedKeyWorkAreaRec(){
//    this.extendedKeySetMember_idx     = "";
//    this.rawMsg_idx      = "";
//    this.extendedKeyDefinitionCodeZTIC   = "";   //2311
//    this.extendedKeyDefinitionCode       = "";   //2312
//    this.extendedKeyValueZTIC            = "";   //2313
//    this.extendedKeyValueCode            = "";   //2314

    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2314) {    //load extended key value code
                                 var extendedKeyWA = new ExtendedKeyWorkAreaRec();
                                 extendedKeyWA.extendedKeyValueCode = this.msg.ZtRawMessageAR[i].data;
                                 extendedKeyWA.rawMsg_idx = this.msg.ZtRawMessageAR[i].index;
                                 extendedKeyWA.extendedKeySetMember_idx  = this.msg.ZtRawMessageAR[i].parent_index;
                                 this.msg.extendedKeyWA_AR.push(extendedKeyWA);  
                                   } // end 2314



  //console.log("me_code.trim at 3000: "+this.msg.ZtRawMessageAR[i].me_code.trim());
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3000) { var maintainSetMemberWA = new MaintainSetMemberWorkAreaRec();
                                                       maintainSetMemberWA.setMemberID = this.msg.ZtRawMessageAR[i].data;
                                                       maintainSetMemberWA.rawMsg_idx  = this.msg.ZtRawMessageAR[i].parent_index;
                                                       //console.log("me_code.trim at 3000: "+this.msg.ZtRawMessageAR[i].me_code.trim());
                                                       this.msg.maintainSetUpdateWA_Array.push(maintainSetMemberWA);
                                                   }



  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3008) { var maintainSetMemberWA = new MaintainSetMemberWorkAreaRec();
                                                   maintainSetMemberWA.updateMode = this.msg.ZtRawMessageAR[i].data;



                                                   }
  
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3044) {   // load object elements
                                   //var updrec = new UpdateRec();  
                                    var OEupdrec = new ObjectElementUpdateWorkAreaRec();
//                                    updrec.te_2_31 = MessageArray[i].data;
                                    OEupdrec.objectElementValue  = this.msg.ZtRawMessageAR[i].data;
                                    OEupdrec.OE_value_idx       = this.msg.ZtRawMessageAR[i].index;
                                    OEupdrec.OE_idx             = this.msg.ZtRawMessageAR[i].parent_index;
                                    OEupdrec.OE_set_idx         = this.msg.ZtRawMessageAR[OEupdrec.OE_idx.trim()].parent_index;
                                    OEupdrec.object_idx         = this.msg.ZtRawMessageAR[OEupdrec.OE_set_idx.trim()].parent_index;
                                    OEupdrec.objectSet_idx      = this.msg.ZtRawMessageAR[OEupdrec
.object_idx.trim()].parent_index;
                                    OEupdrec.maintainSetMember_idx = this.msg.ZtRawMessageAR[OEupdrec.objectSet_idx.trim()].parent_index;
                                    OEupdrec.maintainSet_idx       = this.msg.ZtRawMessageAR[OEupdrec.maintainSetMember_idx.trim()].parent_index;
                                    OEupdrec.request_idx           = this.msg.ZtRawMessageAR[OEupdrec.maintainSet_idx.trim()].parent_index;
                                    OEupdrec.root_idx              = this.msg.ZtRawMessageAR[OEupdrec.request_idx.trim()].parent_index;
//                                    UpdateArray.push(updrec);
                                    this.msg.OEupdateWA_Array.push(OEupdrec);

                                    } //end 3044
                                    
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3055) {   // load type values
                                    var typeValue_updrec = new TypeValueUpdateWorkAreaRec();
                                    typeValue_updrec.typeValueCode  = this.msg.ZtRawMessageAR[i].data;
                                    typeValue_updrec.typeValueCode_idx       = this.msg.ZtRawMessageAR[i].index;
                                    typeValue_updrec.typeValue_idx             = this.msg.ZtRawMessageAR[i].parent_index;
                                    typeValue_updrec.typeValueSet_idx         = this.msg.ZtRawMessageAR[typeValue_updrec.typeValue_idx.trim()].parent_index;
                                    typeValue_updrec.object_idx         = this.msg.ZtRawMessageAR[typeValue_updrec.typeValueSet_idx.trim()].parent_index;
                                    typeValue_updrec.objectSet_idx      = this.msg.ZtRawMessageAR[typeValue_updrec.object_idx.trim()].parent_index;
                                    typeValue_updrec.maintainSetMember_idx = this.msg.ZtRawMessageAR[typeValue_updrec.objectSet_idx.trim()].parent_index;
                                    typeValue_updrec.maintainSet_idx       = this.msg.ZtRawMessageAR[typeValue_updrec.maintainSetMember_idx.trim()].parent_index;
                                    //console.log("typeValue_updrec.maintainSet_idx.trim() 20190917: "+typeValue_updrec.maintainSet_idx.trim());
                                    typeValue_updrec.request_idx           = this.msg.ZtRawMessageAR[typeValue_updrec.maintainSet_idx.trim()].parent_index;
                                    typeValue_updrec.root_idx              = this.msg.ZtRawMessageAR[typeValue_updrec.request_idx.trim()].parent_index;

                                    this.msg.TypeValueUpdateWA_Array.push(typeValue_updrec);
                                    }   
                                    
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3067) {   // load links
                                    var link_updrec = new LinkUpdateWorkAreaRec();
                                    link_updrec.linkToCode  = this.msg.ZtRawMessageAR[i].data;
                                    link_updrec.linkToCode_idx       = this.msg.ZtRawMessageAR[i].index;
                                    link_updrec.link_idx             = this.msg.ZtRawMessageAR[i].parent_index;
                                    link_updrec.linkSet_idx         = this.msg.ZtRawMessageAR[link_updrec.link_idx.trim()].parent_index;
                                    link_updrec.object_idx         = this.msg.ZtRawMessageAR[link_updrec.linkSet_idx.trim()].parent_index;
                                    link_updrec.objectSet_idx      = this.msg.ZtRawMessageAR[link_updrec.object_idx.trim()].parent_index;
                                    link_updrec.maintainSetMember_idx = this.msg.ZtRawMessageAR[link_updrec.objectSet_idx.trim()].parent_index;
                                    link_updrec.maintainSet_idx       = this.msg.ZtRawMessageAR[link_updrec.maintainSetMember_idx.trim()].parent_index;
                                    link_updrec.request_idx           = this.msg.ZtRawMessageAR[link_updrec.maintainSet_idx.trim()].parent_index;
                                    link_updrec.root_idx              = this.msg.ZtRawMessageAR[link_updrec.request_idx.trim()].parent_index;

                                    this.msg.LinkUpdateWA_Array.push(link_updrec);
                                    }                                     
                                                                     
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3002) {   // load object templates
                        var OT_updrec = new ObjectTemplateUpdateWorkAreaRec();
                        OT_updrec.objectTemplateCode  = this.msg.ZtRawMessageAR[i].data;
                        OT_updrec.objectTemplateCode_idx       = this.msg.ZtRawMessageAR[i].index;
       OT_updrec.maintainSetMember_idx = this.msg.ZtRawMessageAR[i].parent_index;
                                    OT_updrec.maintainSet_idx       = this.msg.ZtRawMessageAR[OT_updrec.maintainSetMember_idx.trim()].parent_index;
                                    OT_updrec.request_idx           = this.msg.ZtRawMessageAR[OT_updrec.maintainSet_idx.trim()].parent_index;
                                    OT_updrec.root_idx              = this.msg.ZtRawMessageAR[OT_updrec.request_idx.trim()].parent_index;

                                    this.msg.ObjectTemplateWA_Array.push(OT_updrec);
                                    }

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3100){    //query set member ID --added 20190927
                                   var query_set_mbr_wa_rec = new QuerySetMemberWorkAreaRec();
                                   query_set_mbr_wa_rec.setMemberID = this.msg.ZtRawMessageAR[i].data;
                                   query_set_mbr_wa_rec.rawMsg_idx = i;
                                   query_set_mbr_wa_rec.querySetMember_idx = this.msg.ZtRawMessageAR[i].parent_index;
                                   this.msg.querySetMemberWA_AR.push(query_set_mbr_wa_rec);

//function QuerySetMemberWorkAreaRec()  {
//   this.rawMsg_idx             = "";
//   this.querySetMember_idx     = "";
//   this.setMemberID            = "";     //3100
//   this.objectTemplateZTIC     = "";     //3101
//   this.objectTemplateCode     = "";     //3102
//   this.selectionMode          = "";     //3103
//   this.statusExclusion_AR     = [];     //31091   // 20210721
//   this.selectionSetMember_idx_AR    = [];     //3110



}//  end 3100



if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3112) {   // Query--Selection group number
    var QuerySelectionSetMemberWArec = new QuerySelectionSetMemberWorkAreaRec();
    QuerySelectionSetMemberWArec.selectionGroupNumber = this.msg.ZtRawMessageAR[i].data;
    //console.log("QuerySelectionSetMemberWArec.selectionGroupNumber: "+ QuerySelectionSetMemberWArec.selectionGroupNumber);    
    QuerySelectionSetMemberWArec.rawMsg_idx = this.msg.ZtRawMessageAR[i].index;
    QuerySelectionSetMemberWArec.selectionSetMember_rawMsg_idx     = this.msg.ZtRawMessageAR[QuerySelectionSetMemberWArec.rawMsg_idx].parent_index;
    QuerySelectionSetMemberWArec.selectionSet_rawMsg_idx           = this.msg.ZtRawMessageAR[QuerySelectionSetMemberWArec.selectionSetMember_rawMsg_idx].parent_index;
    QuerySelectionSetMemberWArec.querySetMember_rawMsg_idx         = this.msg.ZtRawMessageAR[QuerySelectionSetMemberWArec.selectionSet_rawMsg_idx].parent_index;
    var qSelSetMbr_idx = this.msg.querySelectionSetMemberWA_AR.push(QuerySelectionSetMemberWArec) -1;
    //console.log("20191001-3112 this.msg.querySetMemberWA_AR.length: "+this.msg.querySetMemberWA_AR.length);
    for (var j = 0; j < this.msg.querySetMemberWA_AR.length; j++){
      // console.log(" idxs:  "+this.msg.querySetMemberWA_AR[j].querySetMember_idx +"-"+ QuerySelectionSetMemberWArec.querySetMember_rawMsg_idx);
       if(this.msg.querySetMemberWA_AR[j].querySetMember_idx == QuerySelectionSetMemberWArec.querySetMember_rawMsg_idx){
          this.msg.querySetMemberWA_AR[j].selectionSetMember_idx_AR.push(qSelSetMbr_idx);
       } //endif
    } // endfor

//function QuerySelectionSetMemberWorkAreaRec() {
//   this.rawMsg_idx                       = "";    
//   this.selectionSetMember_rawMsg_idx    = "";
//   this.selectionSet_rawMsg_idx          = "";
//   this.querySetMember_rawMsg_idx        = "";
//   this.selectionGroupNumber             = "";     //3112
//   this.numberOfSelectionGroupParent     = "";     //3113
//   this.setOperator                      = "";     //3114
//   this.objectSelectionSetMember_idx_AR        = [];     //3120

  } // end of 3112


if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3123) {   // Query--Object Selection set member--usage
    var QueryObjectSelSetMemberWArec = new QueryObjectSelectionSetMemberWorkAreaRec();
    QueryObjectSelSetMemberWArec.usage_type_ztic = this.msg.ZtRawMessageAR[i].data;    //3123
   // console.log("20191002 - QueryObjectSelSetMemberWArec.usage: "+QueryObjectSelSetMemberWArec.usage);
    QueryObjectSelSetMemberWArec.rawMsg_idx = this.msg.ZtRawMessageAR[i].index;
    QueryObjectSelSetMemberWArec.objectSelSetMember_rawMsg_idx = this.msg.ZtRawMessageAR[QueryObjectSelSetMemberWArec.rawMsg_idx].parent_index;
    QueryObjectSelSetMemberWArec.objectSelSet_rawMsg_idx       = this.msg.ZtRawMessageAR[QueryObjectSelSetMemberWArec.objectSelSetMember_rawMsg_idx].parent_index;
    QueryObjectSelSetMemberWArec.selectionSetMember_rawMsg_idx = this.msg.ZtRawMessageAR[QueryObjectSelSetMemberWArec.objectSelSet_rawMsg_idx].parent_index;
    QueryObjectSelSetMemberWArec.selectionSet_rawMsg_idx       = this.msg.ZtRawMessageAR[QueryObjectSelSetMemberWArec.selectionSetMember_rawMsg_idx].parent_index;
    QueryObjectSelSetMemberWArec.querySetMember_rawMsg_idx     = this.msg.ZtRawMessageAR[QueryObjectSelSetMemberWArec.selectionSet_rawMsg_idx].parent_index;

    var qObjSelSetMbr_idx = this.msg.queryObjectSelectionSetMemberWA_AR.push(QueryObjectSelSetMemberWArec) -1;
    
    //console.log("20191002 parse this.msg.querySelectionSetMemberWA_AR.length: "+this.msg.querySelectionSetMemberWA_AR.length);
    for (var j = 0; j < this.msg.querySelectionSetMemberWA_AR.length; j++){
       //console.log("20191004b idxs: "+this.msg.querySelectionSetMemberWA_AR[j].selectionSetMember_rawMsg_idx+"-"+QueryObjectSelSetMemberWArec.selectionSetMember_rawMsg_idx);
       if(this.msg.querySelectionSetMemberWA_AR[j].selectionSetMember_rawMsg_idx == QueryObjectSelSetMemberWArec.selectionSetMember_rawMsg_idx) {        
          this.msg.querySelectionSetMemberWA_AR[j].objectSelectionSetMember_idx_AR.push(qSelSetMbr_idx);
       } //endif
    } // endfor this.msg.querySelectionSetMemberWA_AR

//function QueryObjectSelectionSetMemberWorkAreaRec() {
//   this.rawMsg_idx                       = "";
//   this.objectSelSetMember_rawMsg_idx    = "";
//   this.selectionSetMember_rawMsg_idx    = "";
//   this.selectionSet_rawMsg_idx          = "";
//   this.querySetMember_rawMsg_idx        = "";
//   this.level                        = "";     //3122
//   this.usage                        = "";     //3123
//   this.objectSetMember_idx_AR       = [];     //3130
//   this.objectElementSet_idx_AR      = [];     //3140
//   this.typeSet_idx_AR               = [];     //3150
//   this.linkSet_idx_AR               = [];     //3160
//   this.additionSelectionSet_idx_AR  = [];     //3170

  } // end of 3123


  




if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3134) {   // Query--Object ZTIC 
    var QueryObjectWArec = new QueryObjectWorkAreaRec();
    QueryObjectWArec.objectZTIC = this.msg.ZtRawMessageAR[i].data;    //3134
    QueryObjectWArec.rawMsg_idx = this.msg.ZtRawMessageAR[i].index;
    QueryObjectWArec.object_rawMsg_idx  = this.msg.ZtRawMessageAR[i].parent_index;
//    console.log("20191110 QueryObjectWArec.object_rawMsg_idx: "+QueryObjectWArec.object_rawMsg_idx);
    QueryObjectWArec.objectSetMember_rawMsg_idx = this.msg.ZtRawMessageAR[QueryObjectWArec.object_rawMsg_idx].parent_index;
//    console.log("20191110 QueryObjectWArec.objectSetMember_rawMsg_idx: "+QueryObjectWArec.objectSetMember_rawMsg_idx);
    QueryObjectWArec.objectSelSetMember_rawMsg_idx = this.msg.ZtRawMessageAR[QueryObjectWArec.objectSetMember_rawMsg_idx].parent_index;
    QueryObjectWArec.selectionSetMember_rawMsg_idx = this.msg.ZtRawMessageAR[QueryObjectWArec.objectSelSetMember_rawMsg_idx].parent_index;
    QueryObjectWArec.querySetMember_rawMsg_idx     = this.msg.ZtRawMessageAR[QueryObjectWArec.selectionSetMember_rawMsg_idx].parent_index;
    var qobj_idx = this.msg.queryObjectSetMemberWA_AR.push(QueryObjectWArec) -1;
    for (var j = 0; j < this.msg.queryObjectSelectionSetMemberWA_AR.length; j++) {
/////      //console.log("20191004 - idxs: "+this.msg.queryObjectSelectionSetMemberWA_AR[j].objectSelSetMember_rawMsg_idx+"-"+QueryObjectWArec.objectSelSetMember_rawMsg_idx);
      if(this.msg.queryObjectSelectionSetMemberWA_AR[j].objectSelSetMember_rawMsg_idx == QueryObjectWArec.objectSelSetMember_rawMsg_idx) {
        this.msg.queryObjectSelectionSetMemberWA_AR[j].objectSetMember_idx_AR.push(qobj_idx);
      } //endif

    } //endfor this.msg.querySelectionSetMemberWA_AR

///// //function QueryObjectWorkAreaRec() {
///// //   this.msg.rawMsg_idx                   = "";
///// //   this.msg.objectSet_rawMsg_idx         = "";     //3130
///// //   this.msg.objectSelSetMember_rawMsg_idx      = "";
///// //   this.msg.objectKindZTIC               = "";     //3132
///// //   this.msg.objectKindCode               = "";     //3133
///// //   this.msg.objectZTIC                   = "";     //3134
///// //   this.msg.objectCode                   = "";     //3135


}//  end 3134


                               
                                    
} // end of loop at MessageArray


//console.log("loading remaining values");   //these are i.e. siblings of values captured during the first pass
for (var i = 0; i < this.msg.ZtRawMessageAR.length; i++) {  // load remaining values
  //console.log(this.msg.ZtRawMessageAR[i].me_code);
  //if(parseInt(this.msg.ZtRawMessageAR[i].me_code)==900){console.log("found 900");}
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2100){
                                   var ZTIC_rec_2100 = new ZTICUpdateWorkAreaRec();
                                   ZTIC_rec_2100.msgZTIC = this.msg.ZtRawMessageAR[i].data;
                                   ZTIC_rec_2100.dsi_idx = this.msg.ZtRawMessageAR[i].parent_index;
                                   if(this.msg.dsiSetIdx == 0){
                                      this.msg.dsiSetIdx = this.msg.ZtRawMessageAR[ZTIC_rec_2100.dsi_idx].parent_index;   //20200420
                                   } // endif
                                   for (var j = 0; j < this.msg.msgZTIC_Array.length; j++){
                                      if(this.msg.msgZTIC_Array[j].dsi_idx == ZTIC_rec_2100.dsi_idx){
                                        this.msg.msgZTIC_Array[j].msgZTIC_idx = this.msg.ZtRawMessageAR[i].index;
                                        this.msg.msgZTIC_Array[j].msgZTIC     = ZTIC_rec_2100.msgZTIC;
                                      }
  
                                   }
  }  // end 2100

// 20200216
//function ExtendedKeyWorkAreaRec(){
//    this.extendedKeySetMember_idx     = "";
//    this.rawMsg_idx      = "";
//    this.extendedKeyDefinitionCodeZTIC   = "";   //2311
//    this.extendedKeyDefinitionCode       = "";   //2312
//    this.extendedKeyValueZTIC            = "";   //2313
//    this.extendedKeyValueCode            = "";   //2314

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2311){
                                   var extendedKey_rec_2311 = new ExtendedKeyWorkAreaRec();
                                   extendedKey_rec_2311.extendedKeyDefinitionCodeZTIC = this.msg.ZtRawMessageAR[i].data;
                                   extendedKey_rec_2311.extendedKeySetMember_idx      = this.msg.ZtRawMessageAR[i].parent_index;
                                   for (var j = 0; j < this.msg.extendedKeyWA_AR.length; j++){
                                      if(this.msg.extendedKeyWA_AR[j].extendedKeySetMember_idx == extendedKey_rec_2311.extendedKeySetMember_idx){
                                        this.msg.extendedKeyWA_AR[j].extendedKeyDefinitionCodeZTIC     = extendedKey_rec_2311.extendedKeyDefinitionCodeZTIC;
                                      }
  
                                   }
  }  // end 2311


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2312){
                                   var extendedKey_rec_2312 = new ExtendedKeyWorkAreaRec();
                                   extendedKey_rec_2312.extendedKeyDefinitionCode = this.msg.ZtRawMessageAR[i].data;
                                   extendedKey_rec_2312.extendedKeySetMember_idx      = this.msg.ZtRawMessageAR[i].parent_index;
                                   for (var j = 0; j < this.msg.extendedKeyWA_AR.length; j++){
                                      if(this.msg.extendedKeyWA_AR[j].extendedKeySetMember_idx == extendedKey_rec_2312.extendedKeySetMember_idx){
                                        this.msg.extendedKeyWA_AR[j].extendedKeyDefinitionCode     = extendedKey_rec_2312.extendedKeyDefinitionCode;
                                      }
  
                                   }
  }  // end 2312


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2313){
                                   var extendedKey_rec_2313 = new ExtendedKeyWorkAreaRec();
                                   extendedKey_rec_2313.extendedKeyValueZTIC = this.msg.ZtRawMessageAR[i].data;
                                   extendedKey_rec_2313.extendedKeySetMember_idx      = this.msg.ZtRawMessageAR[i].parent_index;
                                   for (var j = 0; j < this.msg.extendedKeyWA_AR.length; j++){
                                      if(this.msg.extendedKeyWA_AR[j].extendedKeySetMember_idx == extendedKey_rec_2313.extendedKeySetMember_idx){
                                        this.msg.extendedKeyWA_AR[j].extendedKeyValueZTIC     = extendedKey_rec_2313.extendedKeyValueZTIC;
                                      }
  
                                   }
  }  // end 2313




  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3003) { var maintainSetMemberWA_3003 = new MaintainSetMemberWorkAreaRec();
                                           maintainSetMemberWA_3003.effTimestamp = this.msg.ZtRawMessageAR[i].data;
                                           maintainSetMemberWA_3003.rawMsg_idx  = this.msg.ZtRawMessageAR[i].parent_index;
      //console.log("20200117 maintainSetMemberWA_3003.rawMsg_idx: "+maintainSetMemberWA_3003.rawMsg_idx);
                           for (var j = 0; j < this.msg.maintainSetUpdateWA_Array.length; j++){
      //console.log("20200117 this.msg.maintainSetUpdateWA_Array[j].rawMsg_idx: "+j+"-"+this.msg.maintainSetUpdateWA_Array[j].rawMsg_idx);
                                if(this.msg.maintainSetUpdateWA_Array[j].rawMsg_idx == maintainSetMemberWA_3003.rawMsg_idx){
  
                                   this.msg.maintainSetUpdateWA_Array[j].effTimestamp = maintainSetMemberWA_3003.effTimestamp;
                                } // endif
                                        
                                                
                           } // endfor                                                   
   }  // end 3003                                

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3042){
                                    var OErec_3042 = new ObjectElementUpdateWorkAreaRec();
                                    OErec_3042.objectElementZTIC = this.msg.ZtRawMessageAR[i].data;
                                    //console.log("20190923: OErec_3042.objectElementZTIC: "+OErec_3042.objectElementZTIC);
                                    //console.log("20190923: this.msg.OEupdateWA_Array.length: "+this.msg.OEupdateWA_Array.length);

                                    OErec_3042.OE_idx             = parseInt(this.msg.ZtRawMessageAR[i].parent_index);
                                    OErec_3042.OE_set_idx         = parseInt(this.msg.ZtRawMessageAR[OErec_3042.OE_idx].parent_index);
                                    //console.log("OErec_3042.OE_idx: "+OErec_3042.OE_idx);
                                    //console.log("OErec_3042.OE_set_idx: "+OErec_3042.OE_set_idx);
                                    OErec_3042.object_idx         = parseInt(this.msg.ZtRawMessageAR[OErec_3042.OE_set_idx].parent_index);
                                    //console.log("OErec_3042.object_idx: "+OErec_3042.object_idx);
                                    for (var j = 0; j < this.msg.OEupdateWA_Array.length; j++){
                                          //if(this.msg.OEupdateWA_Array[j].object_idx == OErec_3042.object_idx){  // (del) 20231125
                                          if(this.msg.OEupdateWA_Array[j].OE_idx == OErec_3042.OE_idx){  // 20231125
                                          //console.log("this.msg.OEupdateWA_Array[j].object_idx/: "+ this.msg.OEupdateWA_Array[j].object_idx+"/"+OErec_3042.object_idx);
                                          this.msg.OEupdateWA_Array[j].objectElementZTIC = OErec_3042.objectElementZTIC;
                                          //console.log("this.msg.OEupdateWA_Array[j].objectElementZTIC: "+this.msg.OEupdateWA_Array[j].objectElementZTIC);
                                          //   if (1==1) // (maintainSetMemberWA.updateMode.trim() == 99 )  //db initialize
                                               //  this.msg.OEupdateWA_Array[j].tableElementZTIC =     OErec_3042.objectElementZTIC; (del) 20191110
                                         this.msg.OEupdateWA_Array[j].objectElementZTIC =     OErec_3042.objectElementZTIC;         //20191110                 
                                          }  //endif
                                    //console.log("20190924--this.msg.OEupdateWA_Array[j].tableElementZTIC:  "+this.msg.OEupdateWA_Array[j].tableElementZTIC);
                                    
                                    }

                                    
   }                                 
                                    
   if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3043){
                                    var OErec_3043 = new ObjectElementUpdateWorkAreaRec();
                                    OErec_3043.objectElementCode = this.msg.ZtRawMessageAR[i].data;
                                    OErec_3043.OE_idx             = parseInt(this.msg.ZtRawMessageAR[i].parent_index);
                                    for (var j = 0; j < this.msg.OEupdateWA_Array.length; j++){
                                          if(this.msg.OEupdateWA_Array[j].OE_idx == OErec_3043.OE_idx){
                                          this.msg.OEupdateWA_Array[j].objectElementCode = OErec_3043.objectElementCode;
                                          //    if (1==1) //(maintainSetMemberWA.updateMode.trim() == 99 )  //db initialize
                                          //   this.msg.OEupdateWA_Array[j].tableElementCode   = OErec_3043.objectElementCode; (del) 20191110
                                          this.msg.OEupdateWA_Array[j].objectElementCode   = OErec_3043.objectElementCode;    //20191110
                                          }  //endif 
                                    }     
      
      
      
    }

  
  
   
  if(this.msg.ZtRawMessageAR[i].me_code.trim() == 3032){
                                    //object kind ztic 
                                    var OErec_3032 = new ObjectElementUpdateWorkAreaRec();
                                    var typeRec_3032 = new TypeValueUpdateWorkAreaRec();
                                    var linkRec_3032 = new LinkUpdateWorkAreaRec();
                                    OErec_3032.objectKindZTIC = this.msg.ZtRawMessageAR[i].data;
                                    linkRec_3032.objectKindZTIC = this.msg.ZtRawMessageAR[i].data;
                                    typeRec_3032.objectKindZTIC = this.msg.ZtRawMessageAR[i].data;
                                   // console.log("OErec_3032.objectKindZTIC: "+OErec_3032.objectKindZTIC);
                                    OErec_3032.object_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    linkRec_3032.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    typeRec_3032.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.OEupdateWA_Array.length; j++){
                                          if(this.msg.OEupdateWA_Array[j].object_idx == OErec_3032.object_idx){
                                          this.msg.OEupdateWA_Array[j].objectKindZTIC = OErec_3032.objectKindZTIC;
                                          }
                                    
                                    }
                                    
                                    
                                    for (var j = 0; j < this.msg.TypeValueUpdateWA_Array.length; j++) {
                                          if(this.msg.TypeValueUpdateWA_Array[j].object_idx == typeRec_3032.object_idx){
                                          this.msg.TypeValueUpdateWA_Array[j].objectKindZTIC = typeRec_3032.objectKindZTIC;
                                          }
                                    
                                    }
                                    
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                          if(this.msg.LinkUpdateWA_Array[j].object_idx == linkRec_3032.object_idx){
                                          this.msg.LinkUpdateWA_Array[j].objectKindZTIC = linkRec_3032.objectKindZTIC;
                                          }
                                    
                                    }
                                    
   }                   
    
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3033){   //object kind code 
                                    var OErec_3033 = new ObjectElementUpdateWorkAreaRec();
                                    var typeRec_3033 = new TypeValueUpdateWorkAreaRec();
                                    var linkRec_3033 = new LinkUpdateWorkAreaRec();
                                    OErec_3033.objectKindCode = this.msg.ZtRawMessageAR[i].data;
                                    typeRec_3033.objectKindCode = this.msg.ZtRawMessageAR[i].data;
                                    linkRec_3033.objectKindCode = this.msg.ZtRawMessageAR[i].data;
                                    OErec_3033.object_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    typeRec_3033.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    linkRec_3033.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.OEupdateWA_Array.length; j++){
                                          if(this.msg.OEupdateWA_Array[j].object_idx == OErec_3033.object_idx){
                                          this.msg.OEupdateWA_Array[j].objectKindCode = OErec_3033.objectKindCode;
                                          }
                                    
                                    }
                                    
                                   for (var j = 0; j < this.msg.TypeValueUpdateWA_Array.length; j++) {
                                          if(this.msg.TypeValueUpdateWA_Array[j].object_idx == typeRec_3033.object_idx){
                                          this.msg.TypeValueUpdateWA_Array[j].objectKindCode = typeRec_3033.objectKindCode;
                                          }
                                    
                                    }

                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                          if(this.msg.LinkUpdateWA_Array[j].object_idx == linkRec_3033.object_idx){
                                          this.msg.LinkUpdateWA_Array[j].objectKindCode = linkRec_3033.objectKindCode;
                                          }
                                    
                                    }
                                    
                                    
   }                     
  
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3034){  //object ZTIC
                                    var OErec_3034 = new ObjectElementUpdateWorkAreaRec();
                                    var typeRec_3034 = new TypeValueUpdateWorkAreaRec();
                                    var linkRec_3034 = new LinkUpdateWorkAreaRec();
                                    OErec_3034.objectZTIC = this.msg.ZtRawMessageAR[i].data;
                                    typeRec_3034.objectZTIC = this.msg.ZtRawMessageAR[i].data;
                                    linkRec_3034.objectZTIC = this.msg.ZtRawMessageAR[i].data;
                                    OErec_3034.object_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    typeRec_3034.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    linkRec_3034.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.OEupdateWA_Array.length; j++){
                                          if(this.msg.OEupdateWA_Array[j].object_idx == OErec_3034.object_idx){
                                          this.msg.OEupdateWA_Array[j].objectZTIC = OErec_3034.objectZTIC;
                                          }
                                    
                                    }
                                    
                                    for (var j = 0; j < this.msg.TypeValueUpdateWA_Array.length; j++) {
                                          if(this.msg.TypeValueUpdateWA_Array[j].object_idx == typeRec_3034.object_idx){
                                          this.msg.TypeValueUpdateWA_Array[j].objectZTIC = typeRec_3034.objectZTIC;
                                          }
                                    
                                    }
                                    
                                    
                                    
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                          if(this.msg.LinkUpdateWA_Array[j].object_idx == linkRec_3034.object_idx){
                                          this.msg.LinkUpdateWA_Array[j].objectZTIC = linkRec_3034.objectZTIC;
                                          }
                                    
                                    }
                                    
                                    
                                    
                                    
                                    
   }                  
                                    
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3035){  //object code temp
                                    var OErec_3035 = new ObjectElementUpdateWorkAreaRec();
                                    var typeRec_3035 = new TypeValueUpdateWorkAreaRec(); 
                                    var linkRec_3035 = new LinkUpdateWorkAreaRec();
                                    OErec_3035.objectCode = this.msg.ZtRawMessageAR[i].data;
                                    typeRec_3035.objectCode = this.msg.ZtRawMessageAR[i].data;
                                    linkRec_3035.objectCode = this.msg.ZtRawMessageAR[i].data;
                                    OErec_3035.object_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    typeRec_3035.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    linkRec_3035.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.OEupdateWA_Array.length; j++){
                                          if(this.msg.OEupdateWA_Array[j].object_idx == OErec_3035.object_idx){
                                          this.msg.OEupdateWA_Array[j].objectCode       = OErec_3035.objectCode;
                                          this.msg.OEupdateWA_Array[j].objectCodeTemp   = OErec_3035.objectCode;   // 20200323
                                          }
                                    
                                    }
                                    
                                    for (var j = 0; j < this.msg.TypeValueUpdateWA_Array.length; j++) {
                                          if(this.msg.TypeValueUpdateWA_Array[j].object_idx == typeRec_3035.object_idx){
                                          this.msg.TypeValueUpdateWA_Array[j].objectCode       = typeRec_3035.objectCode;
                                          this.msg.TypeValueUpdateWA_Array[j].objectCodeTemp   = typeRec_3035.objectCode;    // 20200323
                                          }
                                    
                                    }                                    
                                    
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                          if(this.msg.LinkUpdateWA_Array[j].object_idx == linkRec_3035.object_idx){
                                          this.msg.LinkUpdateWA_Array[j].objectCode       = linkRec_3035.objectCode;
                                          this.msg.LinkUpdateWA_Array[j].objectCodeTemp   = linkRec_3035.objectCode;
                                          }
                                    
                                    }
                                    
   }  

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3036){  //new code (boolean)
                                    var OErec_3036 = new ObjectElementUpdateWorkAreaRec();
                                    var typeRec_3036 = new TypeValueUpdateWorkAreaRec(); 
                                    var linkRec_3036 = new LinkUpdateWorkAreaRec();
                                    OErec_3036.newCode = this.msg.ZtRawMessageAR[i].data;
                                    typeRec_3036.newCode = this.msg.ZtRawMessageAR[i].data;
                                    linkRec_3036.newCode = this.msg.ZtRawMessageAR[i].data;
                                    OErec_3036.object_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    typeRec_3036.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    linkRec_3036.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.OEupdateWA_Array.length; j++){
                                          if(this.msg.OEupdateWA_Array[j].object_idx == OErec_3036.object_idx){
                                          this.msg.OEupdateWA_Array[j].newCode = OErec_3036.newCode;
                                          }
                                    
                                    }
                                    
                                    for (var j = 0; j < this.msg.TypeValueUpdateWA_Array.length; j++) {
                                          if(this.msg.TypeValueUpdateWA_Array[j].object_idx == typeRec_3036.object_idx){
                                          this.msg.TypeValueUpdateWA_Array[j].newCode = typeRec_3036.newCode;
                                          }
                                    
                                    }                                    
                                    
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                          if(this.msg.LinkUpdateWA_Array[j].object_idx == linkRec_3036.object_idx){
                                          this.msg.LinkUpdateWA_Array[j].newCode = linkRec_3036.newCode;
                                          }
                                    
                                    }
                                    
   } 
                
  

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 30390){  //object template ztic
                                    var OErec_30390 = new ObjectElementUpdateWorkAreaRec();
                                    var typeRec_30390 = new TypeValueUpdateWorkAreaRec(); 
                                    var linkRec_30390 = new LinkUpdateWorkAreaRec();
                                    OErec_30390.templateZTIC = this.msg.ZtRawMessageAR[i].data;
                                    typeRec_30390.templateZTIC = this.msg.ZtRawMessageAR[i].data;
                                    linkRec_30390.templateZTIC = this.msg.ZtRawMessageAR[i].data;
                                    OErec_30390.object_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    typeRec_30390.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    linkRec_30390.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.OEupdateWA_Array.length; j++){
                                          if(this.msg.OEupdateWA_Array[j].object_idx == OErec_30390.object_idx){
                                          this.msg.OEupdateWA_Array[j].templateZTIC = OErec_30390.templateZTIC;
                                          }
                                    
                                    }
                                    
                                    for (var j = 0; j < this.msg.TypeValueUpdateWA_Array.length; j++) {
                                          if(this.msg.TypeValueUpdateWA_Array[j].object_idx == typeRec_30390.object_idx){
                                          this.msg.TypeValueUpdateWA_Array[j].templateZTIC = typeRec_30390.templateZTIC;
                                          }
                                    
                                    }                                    
                                    
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                          if(this.msg.LinkUpdateWA_Array[j].object_idx == linkRec_30390.object_idx){
                                          this.msg.LinkUpdateWA_Array[j].templateZTIC = linkRec_30390.templateZTIC;
                                          }
                                    
                                    }
                                    
   }


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 30391){  //object template code
                                    var OErec_30391 = new ObjectElementUpdateWorkAreaRec();
                                    var typeRec_30391 = new TypeValueUpdateWorkAreaRec(); 
                                    var linkRec_30391 = new LinkUpdateWorkAreaRec();
                                    OErec_30391.templateCode = this.msg.ZtRawMessageAR[i].data;
                                    typeRec_30391.templateCode = this.msg.ZtRawMessageAR[i].data;
                                    linkRec_30391.templateCode = this.msg.ZtRawMessageAR[i].data;
                                    OErec_30391.object_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    typeRec_30391.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    linkRec_30391.object_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.OEupdateWA_Array.length; j++){
                                          if(this.msg.OEupdateWA_Array[j].object_idx == OErec_30391.object_idx){
                                          this.msg.OEupdateWA_Array[j].templateCode = OErec_30391.templateCode;
                                          }
                                    
                                    }
                                    
                                    for (var j = 0; j < this.msg.TypeValueUpdateWA_Array.length; j++) {
                                          if(this.msg.TypeValueUpdateWA_Array[j].object_idx == typeRec_30391.object_idx){
                                          this.msg.TypeValueUpdateWA_Array[j].templateCode = typeRec_30391.templateCode;
                                          }
                                    
                                    }                                    
                                    
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                          if(this.msg.LinkUpdateWA_Array[j].object_idx == linkRec_30391.object_idx){
                                          this.msg.LinkUpdateWA_Array[j].templateCode = linkRec_30391.templateCode;
                                          }
                                    
                                    }
                                    
   }


  
    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3052){  //type definition ztic
                                    var typeValue_rec_3052 = new TypeValueUpdateWorkAreaRec();
                                    typeValue_rec_3052.typeDefinitionZTIC = this.msg.ZtRawMessageAR[i].data;
                                    typeValue_rec_3052.typeValue_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.TypeValueUpdateWA_Array.length; j++){
                                       if(this.msg.TypeValueUpdateWA_Array[j].typeValue_idx == typeValue_rec_3052.typeValue_idx){
                                       this.msg.TypeValueUpdateWA_Array[j].typeDefinitionZTIC = typeValue_rec_3052.typeDefinitionZTIC;
                                       }
                                    
                                    }
                            
  }  // end 1560
  
                                
                                    
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3053){  //type definition code
                                    var typeValue_rec_3053 = new TypeValueUpdateWorkAreaRec();
                                    typeValue_rec_3053.typeDefinitionCode = this.msg.ZtRawMessageAR[i].data;
                                    typeValue_rec_3053.typeValue_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.TypeValueUpdateWA_Array.length; j++){
                                       if(this.msg.TypeValueUpdateWA_Array[j].typeValue_idx == typeValue_rec_3053.typeValue_idx){
                                       this.msg.TypeValueUpdateWA_Array[j].typeDefinitionCode = typeValue_rec_3053.typeDefinitionCode;
                                       }
                                    
                                    }
                            
  }  // end 1570
  
  

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3054){  //type value ztic
                                    var typeValue_rec_3054 = new TypeValueUpdateWorkAreaRec();
                                    typeValue_rec_3054.typeValueZTIC = this.msg.ZtRawMessageAR[i].data;
                                    typeValue_rec_3054.typeValue_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.TypeValueUpdateWA_Array.length; j++){
                                       if(this.msg.TypeValueUpdateWA_Array[j].typeValue_idx == typeValue_rec_3054.typeValue_idx){
                                    this.msg.TypeValueUpdateWA_Array[j].typeValueZTIC = typeValue_rec_3054.typeValueZTIC;
                                       }
                                    }
  } //end 1580   
  


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3062){  //link type ztic
                                    var link_rec_3062 = new LinkUpdateWorkAreaRec();
                                    link_rec_3062.linkTypeZTIC = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_3062.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                       if(this.msg.LinkUpdateWA_Array[j].link_idx == link_rec_3062.link_idx){
                                    this.msg.LinkUpdateWA_Array[j].linkTypeZTIC = link_rec_3062.linkTypeZTIC;
                                       }
                                    }
  } //end 1600

    
   

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3063){  //link type code
                                    var link_rec_3063 = new LinkUpdateWorkAreaRec();
                                    link_rec_3063.linkTypeCode = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_3063.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                       if(this.msg.LinkUpdateWA_Array[j].link_idx == link_rec_3063.link_idx){
                                    this.msg.LinkUpdateWA_Array[j].linkTypeCode = link_rec_3063.linkTypeCode;
                                       }
                                    }
  } //end 1610


  


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3064){  //link to kind ztic
                                    var link_rec_3064 = new LinkUpdateWorkAreaRec();
                                    link_rec_3064.linkToKindZTIC = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_3064.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                       if(this.msg.LinkUpdateWA_Array[j].link_idx == link_rec_3064.link_idx){
                                    this.msg.LinkUpdateWA_Array[j].linkToKindZTIC = link_rec_3064.linkToKindZTIC;
                                       }
                                    }
  } //end 1620
  
  
  
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3065){  //link to kind code
                                    var link_rec_3065 = new LinkUpdateWorkAreaRec();
                                    link_rec_3065.linkToKindCode = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_3065.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                       if(this.msg.LinkUpdateWA_Array[j].link_idx == link_rec_3065.link_idx){
                                    this.msg.LinkUpdateWA_Array[j].linkToKindCode = link_rec_3065.linkToKindCode;
                                       }
                                    }
  } //end 1630  
  

 
  
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3066){  //link to ztic
                                    var link_rec_3066 = new LinkUpdateWorkAreaRec();
                                    link_rec_3066.linkToCodeZTIC = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_3066.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                       if(this.msg.LinkUpdateWA_Array[j].link_idx == link_rec_3066.link_idx){
                                    this.msg.LinkUpdateWA_Array[j].linkToCodeZTIC = link_rec_3066.linkToCodeZTIC;
                                       }
                                    }
  } //end 1640  
  
  
   
 if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3067){  //link to code
                                    var link_rec_3067 = new LinkUpdateWorkAreaRec();
                                    link_rec_3067.linkToCode = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_3067.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                       if(this.msg.LinkUpdateWA_Array[j].link_idx == link_rec_3067.link_idx){
                                    this.msg.LinkUpdateWA_Array[j].linkToCode = link_rec_3067.linkToCode;
                                       }
                                    }
  } //end 3067


 if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3068){  //new link target code   20200627
                                    var link_rec_3068 = new LinkUpdateWorkAreaRec();
                                    link_rec_3068.newLinkTargetCode = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_3068.link_idx          = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                       if(this.msg.LinkUpdateWA_Array[j].link_idx == link_rec_3068.link_idx){
                                    this.msg.LinkUpdateWA_Array[j].newLinkTargetCode = link_rec_3068.newLinkTargetCode;
                                       }
                                    }
  } //end 3068

//  start 20210403

 if (this.msg.ZtRawMessageAR[i].me_code.trim() == 30691){  //new link target code   20200627
                                    var link_rec_30691 = new LinkUpdateWorkAreaRec();
                                    link_rec_30691.status = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_30691.link_idx          = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                       if(this.msg.LinkUpdateWA_Array[j].link_idx == link_rec_30691.link_idx){
                                    this.msg.LinkUpdateWA_Array[j].status = link_rec_30691.status;
                                       }
                                    }
  } //end 30691

 if (this.msg.ZtRawMessageAR[i].me_code.trim() == 30692){  //new link target code   20200627
                                    var link_rec_30692 = new LinkUpdateWorkAreaRec();
                                    link_rec_30692.timestampEff = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_30692.link_idx          = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                       if(this.msg.LinkUpdateWA_Array[j].link_idx == link_rec_30692.link_idx){
                                    this.msg.LinkUpdateWA_Array[j].timestampEff = link_rec_30692.timestampEff;
                                       }
                                    }
  } //end 30692

 if (this.msg.ZtRawMessageAR[i].me_code.trim() == 30693){  //new link target code   20200627
                                    var link_rec_30693 = new LinkUpdateWorkAreaRec();
                                    link_rec_30693.linkValue = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_30693.link_idx          = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.LinkUpdateWA_Array.length; j++){
                                       if(this.msg.LinkUpdateWA_Array[j].link_idx == link_rec_30693.link_idx){
                                    this.msg.LinkUpdateWA_Array[j].linkValue = link_rec_30693.linkValue;
                                       }
                                    }
  } //end 30693


// end 20210403



 if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3001){  //object template ztic
                                    var OT_rec_3001 = new ObjectTemplateUpdateWorkAreaRec();
                                        OT_rec_3001.objectTemplateZTIC = this.msg.ZtRawMessageAR[i].data;
                                        OT_rec_3001.maintainSetMember_idx = this.msg.ZtRawMessageAR[i].parent_index;
                                      for (var j = 0; j < this.msg.ObjectTemplateWA_Array.length; j++){
                                       if(this.msg.ObjectTemplateWA_Array[j].maintainSetMember_idx == OT_rec_3001.maintainSetMember_idx){
                                    this.msg.ObjectTemplateWA_Array[j].objectTemplateZTIC = OT_rec_3001.objectTemplateZTIC;
                                       }
                                    }
  } //end 3001



if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3101){    //object template ztic for query --added 20191029
                                   var query_set_mbr_wa_rec_3101 = new QuerySetMemberWorkAreaRec();
                                   query_set_mbr_wa_rec_3101.objectTemplateZTIC  = this.msg.ZtRawMessageAR[i].data;
                                   query_set_mbr_wa_rec_3101.rawMsg_idx = i;
                                   query_set_mbr_wa_rec_3101.querySetMember_idx = this.msg.ZtRawMessageAR[i].parent_index;
                                  // this.msg.querySetMemberWA_AR.push(query_set_mbr_wa_rec);
                                      for (var j = 0; j < this.msg.querySetMemberWA_AR.length; j++){
                                       if(this.msg.querySetMemberWA_AR[j].querySetMember_idx == query_set_mbr_wa_rec_3101.querySetMember_idx){
                                    this.msg.querySetMemberWA_AR[j].objectTemplateZTIC = query_set_mbr_wa_rec_3101.objectTemplateZTIC;
                                       }
                                    }


//function QuerySetMemberWorkAreaRec()  {
//   this.rawMsg_idx             = "";
//   this.querySetMember_idx     = "";
//   this.setMemberID            = "";     //3100
//   this.objectTemplateZTIC     = "";     //3101
//   this.objectTemplateCode     = "";     //3102
//   this.selectionMode          = "";     //3103
//   this.selectionSetMember_idx_AR    = [];     //3110

}//  end 3101


if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3102){    //object template code for query --added 20191029
                                   var query_set_mbr_wa_rec_3102 = new QuerySetMemberWorkAreaRec();
                                   query_set_mbr_wa_rec_3102.objectTemplateCode  = this.msg.ZtRawMessageAR[i].data;
                                   query_set_mbr_wa_rec_3102.rawMsg_idx = i;
                                   query_set_mbr_wa_rec_3102.querySetMember_idx = this.msg.ZtRawMessageAR[i].parent_index;
                                  // this.msg.querySetMemberWA_AR.push(query_set_mbr_wa_rec);
                                   for (var j = 0; j < this.msg.querySetMemberWA_AR.length; j++){
                                       if(this.msg.querySetMemberWA_AR[j].querySetMember_idx == query_set_mbr_wa_rec_3102.querySetMember_idx){
                                    this.msg.querySetMemberWA_AR[j].objectTemplateCode = query_set_mbr_wa_rec_3102.objectTemplateCode;
                                       }
                                    }




}//  end 3102




// start 20240528
if (this.msg.ZtRawMessageAR[i].me_code.trim() == 31033){    
   var query_set_mbr_wa_rec_31033 = new QuerySetMemberWorkAreaRec();
   var excludedStatus  = this.msg.ZtRawMessageAR[i].data;
   query_set_mbr_wa_rec_31033.rawMsg_idx = i;
   var statusExlusion_set_idx = this.msg.ZtRawMessageAR[i].parent_index;
   query_set_mbr_wa_rec_31033.querySetMember_idx = this.msg.ZtRawMessageAR[statusExlusion_set_idx].parent_index;
  // this.msg.querySetMemberWA_AR.push(query_set_mbr_wa_rec);
   for (var j = 0; j < this.msg.querySetMemberWA_AR.length; j++){
       if(this.msg.querySetMemberWA_AR[j].querySetMember_idx == query_set_mbr_wa_rec_31033.querySetMember_idx){
    this.msg.querySetMemberWA_AR[j].statusExclusion_AR.push(excludedStatus.toString().trim());
       }
    }


//function QuerySetMemberWorkAreaRec()  {
//   this.rawMsg_idx             = "";
//   this.querySetMember_idx     = "";
//   this.setMemberID            = "";     //3100
//   this.objectTemplateZTIC     = "";     //3101
//   this.objectTemplateCode     = "";     //3102
//   this.selectionMode          = "";     //3103
//   this.statusExclusion_AR     = [];     // 31032 and 31033
//   this.selectionSetMember_idx_AR    = [];     //3110

}//  end 31033

// end 20240528

// start 20240117
if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3124){    //object usage type code for query
   var QueryObjectSelSetMemberWArec_3124 = new QueryObjectSelectionSetMemberWorkAreaRec();
   QueryObjectSelSetMemberWArec_3124.usage_type_code = this.msg.ZtRawMessageAR[i].data;
   //console.log("20240117f - QueryObjectSelSetMemberWArec_3124.usage_type_code: "+QueryObjectSelSetMemberWArec_3124.usage_type_code);
   QueryObjectSelSetMemberWArec_3124.rawMsg_idx = this.msg.ZtRawMessageAR[i].index;
   QueryObjectSelSetMemberWArec_3124.objectSelSetMember_rawMsg_idx = this.msg.ZtRawMessageAR[QueryObjectSelSetMemberWArec_3124.rawMsg_idx].parent_index;

   //console.log("20240118d this.msg.queryObjectSelectionSetMemberWA_AR.length: "+this.msg.queryObjectSelectionSetMemberWA_AR.length);
   for (var j = 0; j < this.msg.queryObjectSelectionSetMemberWA_AR.length; j++){
     //console.log("20240117g - this.msg.queryObjectSelectionSetMemberWA_AR[j].objectSelSetMember_rawMsg_idx: "+this.msg.queryObjectSelectionSetMemberWA_AR[j].objectSelSetMember_rawMsg_idx); 
     //console.log("20240117h - QueryObjectSelSetMemberWArec_3124.objectSelSetMember_rawMsg_idx: "+QueryObjectSelSetMemberWArec_3124.objectSelSetMember_rawMsg_idx); 
      if(this.msg.queryObjectSelectionSetMemberWA_AR[j].objectSelSetMember_rawMsg_idx == QueryObjectSelSetMemberWArec_3124.objectSelSetMember_rawMsg_idx) {        
         this.msg.queryObjectSelectionSetMemberWA_AR[j].usage_type_code = QueryObjectSelSetMemberWArec_3124.usage_type_code;
        // console.log("20240118a - j - this.msg.queryObjectSelectionSetMemberWA_AR[j].usage_type_code: "+j+" - "+this.msg.queryObjectSelectionSetMemberWA_AR[j].usage_type_code); 
      } //endif
   } // endfor this.msg.queryObjectSelectionSetMemberWA_AR
} //  end 3124
// end 20240117





/////}//  end 3134

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3135){    //object kind code
                                   var query_object_rec_3135 = new QueryObjectWorkAreaRec();
                                   query_object_rec_3135.objectCode  = this.msg.ZtRawMessageAR[i].data;
                                   query_object_rec_3135.object_rawMsg_idx = this.msg.ZtRawMessageAR[i].parent_index;
                                  // console.log("20191110 query_object_rec_3135.objectCode in parse: "+query_object_rec_3135.objectCode);
                                   for (var j = 0; j < this.msg.queryObjectSetMemberWA_AR.length; j++){
                                    // console.log("this.msg.queryObjectSetMemberWA_AR[j].object_rawMsg_idx: "+this.msg.queryObjectSetMemberWA_AR[j].object_rawMsg_idx);
                                    // console.log("query_object_rec_3135.object_rawMsg_idx: "+query_object_rec_3135.object_rawMsg_idx);
                                     if(this.msg.queryObjectSetMemberWA_AR[j].object_rawMsg_idx == query_object_rec_3135.object_rawMsg_idx){
                                         this.msg.queryObjectSetMemberWA_AR[j].objectCode  = query_object_rec_3135.objectCode;
                                       //  console.log("20191110 this.msg.queryObjectSetMemberWA_AR[j].objectCode: "+this.msg.queryObjectSetMemberWA_AR[j].objectCode );
                                           } //endif
                                   } //endfor

//function QueryObjectWorkAreaRec() {
//   this.msg.rawMsg_idx                   = "";
//   this.msg.objectSet_rawMsg_idx         = "";     //3130
//   this.msg.objectSelSetMember_rawMsg_idx      = "";
//   this.msg.objectKindZTIC               = "";     //3132
//   this.msg.objectKindCode               = "";     //3133
//   this.msg.objectZTIC                   = "";     //3134
//   this.msg.objectCode                   = "";     //3135


}//  end 3135
  
}// end loop through MessageArray to load remaining values

//console.log("20200126 after zt_server_message_parse");
//console.log("20200126 OEupdateWA_Array.length:   "+this.msg.OEupdateWA_Array.length);
//console.log("20200126 TypeValueUpdateWA_Array:   "+this.msg.TypeValueUpdateWA_Array.length);
//console.log("20200126 LinkUpdateWA_Array.length: "+this.msg.LinkUpdateWA_Array.length);

//20200124 temp
//console.log("20200124 list object elements at end of parse in zt_server_message_parse");
//   for (var i = 0; i < this.msg.OEupdateWA_Array.length; i++) {
//       console.log("element value: "+   this.msg.OEupdateWA_Array[i].objectElementValue);
//   } // endfor

}  // end of process


} // end of class ZtMessageParse


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




// start 20200210
function MessageProcessingParametersGeneralWorkAreaRec(){  
    this.defaultEffectiveTimestamp = "";     //2301
    this.messageIdClient           = "";     //2302
    this.indexOfLastRequestSegment = "";     //2303
    this.defaultUpdateMode         = "";     //2304
    this.user                      = "";     //2305
    //this.softwarePatchLevelZTIC    = "";     //2306
    //this.softwarePatchLevelCode    = "";     //2307
    this.serverSoftwareRuntimeProfileZTIC = ""; //2306
    this.serverSoftwareRuntimeProfileCode = ""; //2307
  
}
// end 20200210

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
   var HashMap = require('hashmap');
     this.setMemberID     = "";
     this.rawMsg_idx      = "";
     this.objectTemplZTIC = "";
     this.objectTemplCode = "";
     this.effTimestamp    = "";
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
    this.objectCodeTemp   = "";
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
    this.objectCodeTemp   = "";
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
    this.objectCodeTemp   = "";
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
    this.newLinkTargetCode = "";  //boolean 20200627
    this.status = "";             //start add 20161003
    this.timestampEff  = "";
    this.linkValue     = "";      // 20210403
    this.seqNum          = "";  //end add 20161003
    }    

  
    
function QuerySetMemberWorkAreaRec()  {
   this.rawMsg_idx             = "";
   this.querySetMember_idx     = "";
   this.setMemberID            = "";     //3100
   this.objectTemplateZTIC     = "";     //3101
   this.objectTemplateCode     = "";     //3102
   this.selectionMode          = "";     //3103
   this.statusExclusion_AR     = [];     //31092     20210721
   this.selectionSetMember_idx_AR    = [];     //3110
} 


function QuerySelectionSetMemberWorkAreaRec() {
   this.rawMsg_idx                       = "";
   this.selectionSetMember_rawMsg_idx    = "";
   this.selectionSet_rawMsg_idx          = "";
   this.querySetMember_rawMsg_idx        = "";
   this.selectionGroupNumber             = "";     //3112
   this.numberOfSelectionGroupParent     = "";     //3113
   this.setOperator                      = "";     //3114
   this.objectSelectionSetMember_idx_AR        = [];     //3120
}  

function QueryObjectSelectionSetMemberWorkAreaRec() {
   this.rawMsg_idx                       = "";
   this.objectSelSetMember_rawMsg_idx    = "";
   this.objectSelSet_rawMsg_idx          = "";
   this.selectionSetMember_rawMsg_idx    = "";
   this.selectionSet_rawMsg_idx          = "";
   this.querySetMember_rawMsg_idx        = "";
   this.level                        = "";     //3122
   this.usage_type_ztic              = "";     //3123
   this.usage_type_code              = "";     //3124
   this.objectSetMember_idx_AR       = [];     //3130
   this.objectElementSet_idx_AR      = [];     //3140
   this.typeSet_idx_AR               = [];     //3150
   this.linkSet_idx_AR               = [];     //3160
   this.additionSelectionSet_idx_AR  = [];     //3170
} 

function QueryObjectWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.object_rawMsg_idx            = "";     //3131
   this.objectSet_rawMsg_idx         = "";     //3130
   this.objectSelSetMember_rawMsg_idx = "";    //3120
   this.selectionSetMember_rawMsg_idx = "";    //3110
   this.querySetMember_rawMsg_idx    = "";     //31
   this.objectKindZTIC               = "";     //3132
   this.objectKindCode               = "";     //3133
   this.objectZTIC                   = "";     //3134
   this.objectCode                   = "";     //3135
}

  
function QueryObjectElementWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.objectSelSetMember_rawMsg_idx = "";
   this.selectionSetMember_rawMsg_idx = "";    //3110
   this.querySetMember_rawMsg_idx    = "";     //31
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
   this.objectSelSetMember_rawMsg_idx = "";
   this.selectionSetMember_rawMsg_idx = "";    //3110
   this.querySetMember_rawMsg_idx    = "";     //31
   this.typeDefinitionZTIC           = "";    //3152
   this.typeDefinitionCode           = "";    //3153
   this.typeValueZTIC                = "";    //3154
   this.typeValueCode                = "";    //3155
   this.selectionGroupNumber         = "";    //3156
   this.setOperator                  = "";    //3157
}


function QueryLinkWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.objectSelSetMember_rawMsg_idx      = "";
   this.selectionSetMember_rawMsg_idx = "";    //3110
   this.querySetMember_rawMsg_idx    = "";     //31
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
   this.objectSelSetMember_rawMsg_idx      = "";
   this.selectionSetMember_rawMsg_idx = "";    //3110
   this.querySetMember_rawMsg_idx    = "";     //31
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

}
 




module.exports = ZtMessageParse;
