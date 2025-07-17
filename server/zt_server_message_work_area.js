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


exports.ZTICUpdateWorkAreaRec = function() {
//function ZTICUpdateWorkAreaRec(){
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


exports.ObjectTemplateUpdateWorkAreaRec = function() {
//function ObjectTemplateUpdateWorkAreaRec() {
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


exports.MaintainSetMemberWorkAreaRec = function() {
//function MaintainSetMemberWorkAreaRec(){
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
 

exports.ObjectElementUpdateWorkAreaRec = function() {
//function ObjectElementUpdateWorkAreaRec(){
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
    this.extKeyDefZTIC = "";  // start add 20161003
    this.extKeyDefCode = "";
    this.extKeyValueZTIC = "";
    this.extKeyValueCode = "";
    this.status = "";
    this.timestampEff  = "";
    this.seqNum          = "";  //end add 20161003 
    
    this.objectElementZTIC = "";
    this.objectElementCode = "";
    this.objectElementValue = "";
    this.tableElementZTIC = "";
    this.tableElementCode = "";} 


exports.TypeValueUpdateWorkAreaRec = function() {
//function TypeValueUpdateWorkAreaRec(){
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



exports.LinkUpdateWorkAreaRec = function() {
//function LinkUpdateWorkAreaRec() {
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
    this.newLinkTargetCode = "";  // 20200628
    this.status = "";           //start add 20161003
    this.timestampEff  = "";
    this.seqNum          = "";  //end add 20161003
    }    

  
 
exports.QuerySetMemberWorkAreaRec = function() {   
//function QuerySetWorkAreaRec()  {
   this.rawMsg_idx             = "";
   this.setMemberID            = "";     //3100
   this.objectTemplateZTIC     = "";     //3101
   this.objectTemplateCode     = "";     //3102
   this.selectionMode          = "";     //3103
   this.selectionSet_idx_AR    = [];     //3110
} 


exports.QuerySelectionSetWorkAreaRec = function() {   
//function QuerySelectionSetWorkAreaRec() {
   this.rawMsg_idx                       = "";
   this.querySetWA_rawMsg_idx            = "";
   this.selectionGroupNumber             = "";     //3112
   this.numberOfSelectionGroupParent     = "";     //3113
   this.setOperator                      = "";     //3114
   this.objectSelectionSet_idx_AR        = [];     //3120
}  


exports.QueryObjectSelectionSetWorkAreaRec = function() { 
//function QueryObjectSelectionSetWorkAreaRec() {
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


exports.QueryObjectWorkAreaRec = function() { 
//function QueryObjectWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.objectSet_rawMsg_idx         = "";     //3130
   this.objectSelSet_rawMsg_idx      = "";
   this.objectKindZTIC               = "";     //3132
   this.objectKindCode               = "";     //3133
   this.objectZTIC                   = "";     //3134
   this.objectCode                   = "";     //3135
}

  
exports.QueryObjectElementWorkAreaRec = function() {
//function QueryObjectElementWorkAreaRec() {
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



exports.QueryTypeWorkAreaRec = function() {
//function QueryTypeWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.objectSelSet_rawMsg_idx      = "";
   this.typeDefinitionZTIC           = "";    //3152
   this.typeDefinitionCode           = "";    //3153
   this.typeValueZTIC                = "";    //3154
   this.typeValueCode                = "";    //3155
   this.selectionGroupNumber         = "";    //3156
   this.setOperator                  = "";    //3157
}



exports.QueryLinkWorkAreaRec = function() {
//function QueryLinkWorkAreaRec() {
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


exports.QueryAdditionalWorkAreaRec = function() {
//function QueryAdditionalWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.objectSelSet_rawMsg_idx      = "";
   this.usageType                    = "";   //3172
   this.objectZTIC                   = "";   //3173
   this.objectCode                   = "";   //3174
   this.selectionGroupNumber         = "";   //3175
   this.setOperator                  = "";   //3176
}


exports.QueryResponseSetMemberWorkAreaRec = function() {
//function QueryResponseSetMemberWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.setMemberID                  = "";     //4100
   this.objectTemplateZTIC           = "";     //4101
   this.objectTemplateCode           = "";     //4102
   this.timestampEff                 = "";     //4103
   this.queryProcessingStatus_idx_AR = [];     //4110
   this.object_idx_AR                = [];     //4130  //to be deprecated 20200124 uses object values selected without template
   this.objectResponseItem_AR        = [];     //4130  added 20200124 to replace object_idx_AR uses values selected by template

}


exports.QueryResponseObjectWorkAreaRec = function() {
//function QueryResponseObjectWorkAreaRec() {
   this.rawMsg_idx                          = "";
   this.queryResponseSetMemberWA_rawMsg_idx = "";
   this.objectKindZTIC                      = "";   //4132
   this.objectKindCode                      = "";   //4133
   this.objectZTIC                          = "";   //4134
   this.objectCodeTemp                      = "";   //4135 ??? is this needed for query resp?
   this.objectCodeAssigned                  = "";   //4136
   this.rootObject_BL	                    = "";   //4137  boolean
   this.objectElementSet_idx_AR             = "";   //4140
   this.typeSet_idx_AR                      = "";   //4150
   this.linkSet_idx_AR                      = "";   //4160	

}


exports.QueryResponseObjectElementWorkAreaRec = function() {
//function QueryResponseObjectElementWorkAreaRec() {
       this.rawMsg_idx                    = "";
       this.objectWA_rawMsg_idx           = "";
       this.objectElementZTIC             = "";  //4142
       this.objectElementCode             = "";  //4143
       this.objectElementValue            = "";  //4144

}


exports.QueryResponseTypeWorkAreaRec = function() {
//function QueryResponseTypeWorkAreaRec() {
       this.rawMsg_idx                    = "";
       this.objectWA_rawMsg_idx           = "";
       this.typeDefinitionDSCI            = "";    //4152
       this.typeDefinitionCode            = "";    //4153
       this.typeValueZTIC                 = "";    //4154
       this.typeValueCode                 = "";    //4155
}


exports.QueryResponseLinkWorkAreaRec = function() {
//function QueryResponseLinkWorkAreaRec() {
       this.rawMsg_idx                    = "";
       this.objectWA_rawMsg_idx           = "";
       this.linkTypeZTIC                  = "";   //4162
       this.linkTypeCode                  = "";   //4163
       this.linkToKindZTIC                = "";   //4164
       this.linkToKindCode                = "";   //4165
       this.linkToZTIC                    = "";   //4166
       this.linkToCode                    = "";   //4167

}



 

//insert 20190708
exports.ObjectValueUpdateWorkAreaRec = function(dbzti_id, kindZTIC, kindCode, objZTIC, objCode) {
//function ObjectValueUpdateWorkAreaRec(dbzti_id, kindZTIC, kindCode, objZTIC, objCode)  {
    this.dbzti_id  = dbzti_id;
    this.kindZTIC = kindZTIC.trim();
    this.kindCode = kindCode.trim();
    this.objZTIC  = objZTIC.trim();
    this.objCode  = objCode.trim();
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
exports.ZtObjectElementValue = function(objectKey, TE_ztic, TE_code, ek_defZTIC, ek_defCode, ek_valueZTIC, ek_valueCode, status, timestamp, seqNum, value) {
//function ZtObjectElementValue(objectKey, TE_ztic, TE_code, ek_defZTIC, ek_defCode, ek_valueZTIC, ek_valueCode, status, timestamp, seqNum, value) {
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



exports.ZtObjectTypeValue = function(objectKey, typeDef_ztic, typeDef_code, typeValue_ztic, typeValue_code, status, timestamp, seqNum) {
//function ZtObjectTypeValue(objectKey, typeDef_ztic, typeDef_code, typeValue_ztic, typeValue_code, status, timestamp, seqNum) {
   this.objectKey = objectKey;
   this.typeDef_ztic = typeDef_ztic;
   this.typeDef_code = typeDef_code;
   this.typeValue_ztic = typeValue_ztic;
   this.typeValue_code = typeValue_code;
   this.status         = status;
   this.timestamp      = timestamp;
   this.seqNum         = seqNum;

}  // end of function ZtObjectTypeValue



exports.ZtObjectLink = function(objectKey, linkType_ztic, linkType_code, linkToKind_ztic, linkToKind_code, linkToCode_ztic, linkToCode, linkValue, status, timestamp, seqNum) {
//function ZtObjectLink(objectKey, linkType_ztic, linkType_code, linkToKind_ztic, linkToKind_code, linkToCode_ztic, linkToCode, linkValue, status, timestamp, seqNum) {
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



exports.ZtObjectTemplate = function(objectKey, templ_ztic, templ_code, status, timestamp, seqNum) {
//function ZtObjectTemplate(objectKey, templ_ztic, templ_code, status, timestamp, seqNum) {

    this.objectKey = objectKey;
    this.templ_ztic = templ_ztic;
    this.templ_code = templ_code;
    this.status     = status;
    this.timestamp  = timestamp;
    this.seqNum     = seqNum;


} // end of ZtObjectTemplate



exports.ZtObject = function(dbzti_id, kindZTIC, kindCode, objZTIC, objCode) {
//function ZtObject(dbzti_id, kindZTIC, kindCode, objZTIC, objCode) {
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
    this.typeValueIdx_AR  = [];
    this.linkIdx_AR       = [];
 

    
} // end of function ZtObject



exports.ZtObjectId = function(dbzti_id, kindZTIC, kindCode, objectZTIC, objCode) {
//function ZtObjectId(dbzti_id, kindZTIC, kindCode, objectZTIC, objCode){
    this.dbzti_id = dbzti_id.trim();
    this.kindZTIC = kindZTIC.trim();
    this.kindCode = kindCode.trim();
    this.objZTIC  = objZTIC.trim();
    this.objCode  = objCode.trim();
    this.keyString   = dbzti_id.trim()+"_"+kindZTIC.trim()+"_"+kindCode.trim()+"_"+objZTIC.trim()+"_"+objCode.trim();;
}// end of function ZtObjectId



exports.MessageRow = function(index, parent_index, priority, me_ztic, me_code, data) {
//function MessageRow(index, parent_index, priority, me_ztic, me_code, data) {
  this.index        = index;
  this.parent_index = parent_index;
  this.priority     = priority;
  this.me_ztic      = me_ztic;
  this.me_code      = me_code;
  this.data         = data;
 
}

//end insert 20190208


//inserted 20190214
exports.ZTICNS = function(code, namespace) {
//function ZTICNS(code, namespace) {
   this.code = code;
   this.namespace = namespace;
} // end of function ZTICNS  inserted 20190214
    
