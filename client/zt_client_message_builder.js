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


class ZtMessageBuilder {


    constructor(linesx, targetNSx, maint_modex) {

      this.lines = linesx;
      this.targetNS = targetNSx;
      this.ZtRawMessageArray = [];
      this.parent_index_obj_set = 0;   // 20200715
      this.maint_mode = maint_modex;   // 20210719
   
  } // end of constructor




//readRecordFormatMsgFromFile() {
convertRecordFormatMsgToRaw() {

   var HashMap = require('hashmap');
   var objectValue_AR = [];
   var objectValue_HM = new HashMap();
   //var objElement_idx_AR = [];
   var objElement_AR  = [];
   //var typeValue_idx_AR  = [];
   var typeValue_AR   = [];
   var link_AR        = [];

   var queryObject_AR  = [];
   var queryElement_AR = [];
  // var statusExclusion_AR = [];   // 20210720

   var TabNamePrfx = 'TEST1';
   var objectKindZTIC = "";
   var objectKindCode = "";
   var objectZTIC     = "";
   var objectCode     = "";
   var OE_ztic        = "";
   var OE_code        = "";
   var new_code       = "";        //20200225 (boolean)
   var new_link_target_code = "";  // 20200625 (boolean)
   var OE_value       = "";
   var typeDef_ztic   = "";
   var typeDef_code   = "";
   var typeValue_ztic = ""; 
   var typeValue_code = "";
   var linkType_ztic  = "";
   var linkType_code  = "";
   var linkToKind_ztic = "";
   var linkToKind_code = "";
   var linkToCode_ztic = "";
   var linkToCode      = "";
   var linkValue       = "";
   var template_ztic   = "";
   var template_code   = "";
   var timestamp       = "";
   var status          = "";



// 20200714 begin insert to add target namespace
var targetNSfound = false;
var target_ztic   = "";
var largest_ztic  = 0;
var line_ztic     = 0;
for (var i = 0; i < this.lines.length; i++) {
   if(this.lines[i].substring(0,5).toString().trim() === 'ZTIC'){
      
     line_ztic = this.lines[i].substring(5,10)
     if(line_ztic > largest_ztic){
       largest_ztic = line_ztic;
     } // endif
     if(this.lines[i].substring(10,90).toString().trim() == this.targetNS){
        targetNSfound = true;
        target_ztic   = line_ztic;
     } // endif
   }  // endif
}  // endfor loop through lines

//console.log("20200715 target_ztic - targetNSfound - this.targetNS: "+target_ztic+" - "+targetNSfound+" - "+this.targetNS);
var line_str = ""
if(targetNSfound){
  for (var i = 0; i < this.lines.length; i++) {
   if(this.lines[i].substring(0,5).toString().trim() === 'RZTI'){
      line_str = "RZTI "+ target_ztic.toString().trim().padEnd(5);
      this.lines[i] = line_str;
   } // endif
  } // endfor

 }
 else{
  largest_ztic++;
  target_ztic = largest_ztic;
  var line_ZTIC = "ZTIC "+target_ztic.toString().trim().padEnd(5)+this.targetNS;
  this.lines.push(line_ZTIC);
  for (var i = 0; i < this.lines.length; i++) {
  if(this.lines[i].substring(0,5).toString().trim() === 'RZTI'){
      line_str = "RZTI "+ target_ztic.toString().trim().padEnd(5);
      this.lines[i] = line_str;
   } // endif
  } // endfor
}
// 20200714 end of insert to add target namespace

  this.addHeader_ForRecordFormatMsg(this.ZtRawMessageArray);
  for (var i = 0; i < this.lines.length; i++) {
    //console.log("lines: "+this.lines[i].substring(0,85).toString().trim());
    if(this.lines[i].substring(0,5).toString().trim() === 'ZTIC'){
      this.addZTIC_ForRecordFormatMsg(this.ZtRawMessageArray, this.lines[i], 8);
    } //endif ZTIC

    if(this.lines[i].substring(0,5).toString().trim() === 'RZTI'){  //receiver ztic
      this.addRZTI_ForRecordFormatMsg(this.ZtRawMessageArray, this.lines[i]);
    } //endif RZTI

  
    
    if(this.lines[i].substring(0,5).toString().trim() === 'MPPG'){
      this.addMPPG_ForRecordFormatMsg(this.ZtRawMessageArray, this.lines[i]);
    } //endif MPPG

    if(this.lines[i].substring(0,5).toString().trim() === 'EXTK'){
      this.addEXTK_ForRecordFormatMsg(this.ZtRawMessageArray, this.lines[i]);
    }


    if(this.lines[i].substring(0,5).toString().trim() === 'MSET'){
      var mset_id = this.lines[i].substring(5,45).toString().trim();
      timestamp     = this.lines[i].substring(45,65).toString().trim();
      this.addMSET_MaintainSetMember_ForRecordFormatMsg(this.ZtRawMessageArray, mset_id, timestamp);
    }  //endif MSET       

    if(this.lines[i].substring(0,5).toString().trim() === 'TMPL'){


    } //endif TMPL

    if(this.lines[i].substring(0,5).toString().trim() === 'ELEM'){

         objectKindZTIC = this.lines[i].substring(5,10).toString().trim();
         objectKindCode = this.lines[i].substring(10,15).toString().trim();
         objectZTIC     = this.lines[i].substring(15,20).toString().trim();
         objectCode     = this.lines[i].substring(20,25).toString().trim();
         OE_ztic        = this.lines[i].substring(25,30).toString().trim();
         OE_code        = this.lines[i].substring(30,35).toString().trim();
         template_ztic  = this.lines[i].substring(35,40).toString().trim();
         template_code  = this.lines[i].substring(40,45).toString().trim();
         new_code       = this.lines[i].substring(45,50).toString().trim();
         OE_value       = this.lines[i].substring(50,2050).toString().trim();   // 20200709
 //        OE_value       = this.lines[i].substring(50,450).toString().trim();  (del) 20200709


      var obj_key = TabNamePrfx.trim()+"_"+objectKindZTIC+"_"+ objectKindCode+"_"+ objectZTIC+"_"+objectCode.toString().trim();
      //console.log("20191016  obj_key, OE_ztic, OE_code, OE_value: "+ obj_key, OE_ztic, OE_code, OE_value);
      var oeValRec = new DsObjectElementValueForRecordFormat(obj_key, OE_ztic, OE_code, OE_value);
      //console.log("20191016 OE value1: "+ oeValRec.value);
      var oe_val_idx = objElement_AR.push(oeValRec) - 1;

          if (objectValue_HM.has(obj_key)){
             var objvals_existing_idx = objectValue_HM.get(obj_key);
                //console.log("objvals_existing_idx for OE 20190911: "+objvals_existing_idx);
                var objvals_existing     = objectValue_AR[objvals_existing_idx];
                objvals_existing.objElement_idx_AR.push(oe_val_idx);
               }
          else
               {    var objvals = new ObjectValueUpdateWorkAreaRec(TabNamePrfx.trim(), objectKindZTIC.toString().trim(), objectKindCode.toString().trim(), objectZTIC.toString().trim(), objectCode.toString().trim(),template_ztic.toString().trim(), template_code.toString().trim(), new_code)
                     objvals.objElement_idx_AR.push(oe_val_idx);
                     var objvals_idx = objectValue_AR.push(objvals) -1;
                     objectValue_HM.set(obj_key, objvals_idx);
               }//endif  objectValue_HM.has(obj_key)

 
    } //endif ELEM

    if(this.lines[i].substring(0,5).toString().trim() === 'TYPE'){

         objectKindZTIC = this.lines[i].substring(5,10).toString().trim();
         objectKindCode = this.lines[i].substring(10,15).toString().trim();
         objectZTIC     = this.lines[i].substring(15,20).toString().trim();
         objectCode     = this.lines[i].substring(20,25).toString().trim();
         typeDef_ztic   = this.lines[i].substring(25,30).toString().trim();
         typeDef_code   = this.lines[i].substring(30,35).toString().trim();
         typeValue_ztic = this.lines[i].substring(35,40).toString().trim(); 
         typeValue_code = this.lines[i].substring(40,45).toString().trim();
         template_ztic  = this.lines[i].substring(45,50).toString().trim();
         template_code  = this.lines[i].substring(50,55).toString().trim();
         new_code       = this.lines[i].substring(55,60).toString().trim();
 
      var obj_key = TabNamePrfx.trim()+"_"+objectKindZTIC+"_"+ objectKindCode+"_"+ objectZTIC+"_"+objectCode.toString().trim();

      var typeValRec = new DsObjectTypeValueForRecordFormat(obj_key, typeDef_ztic, typeDef_code, typeValue_ztic, typeValue_code);
      var type_val_idx = typeValue_AR.push(typeValRec) - 1;

          if (objectValue_HM.has(obj_key)){
             var objvals_existing_idx = objectValue_HM.get(obj_key);
                //console.log("objvals_existing_idx for OE 20190911: "+objvals_existing_idx);
                var objvals_existing     = objectValue_AR[objvals_existing_idx];
                objvals_existing.typeValue_idx_AR.push(type_val_idx);
               }
          else
               {    var objvals = new ObjectValueUpdateWorkAreaRec(TabNamePrfx.trim(), objectKindZTIC.toString().trim(), objectKindCode.toString().trim(), objectZTIC.toString().trim(), objectCode.toString().trim(), template_ztic.toString().trim(), template_code.toString().trim(), new_code);
                     objvals.typeValue_idx_AR.push(type_val_idx);
                     var objvals_idx = objectValue_AR.push(objvals) -1;
                     objectValue_HM.set(obj_key, objvals_idx);
               }//endif  objectValue_HM.has(obj_key)




    } //endif TYPE

    if(this.lines[i].substring(0,5).toString().trim() === 'LINK'){

         objectKindZTIC = this.lines[i].substring(5,10).toString().trim();
         objectKindCode = this.lines[i].substring(10,15).toString().trim();
         objectZTIC     = this.lines[i].substring(15,20).toString().trim();
         objectCode     = this.lines[i].substring(20,25).toString().trim();
         linkType_ztic  = this.lines[i].substring(25,30).toString().trim();
         linkType_code  = this.lines[i].substring(30,35).toString().trim();
         linkToKind_ztic = this.lines[i].substring(35,40).toString().trim();
         linkToKind_code = this.lines[i].substring(40,45).toString().trim();
         linkToCode_ztic = this.lines[i].substring(45,50).toString().trim();
         linkToCode      = this.lines[i].substring(50,55).toString().trim();
         template_ztic  = this.lines[i].substring(55,60).toString().trim();
         template_code  = this.lines[i].substring(60,65).toString().trim();
         new_code       = this.lines[i].substring(65,70).toString().trim();   //boolean
         new_link_target_code = this.lines[i].substring(70,75).toString().trim();   //boolean 20200626
         status          = this.lines[i].substring(75,80).toString().trim();        // 20210402
         timestamp       = this.lines[i].substring(80,100).toString().trim();       // 20210402
         linkValue       = this.lines[i].substring(100,105).toString().trim();      // 20210402

        // console.log("20200628 new_link_target_code in ...message_builder: "+new_link_target_code);
         


      var obj_key = TabNamePrfx.trim()+"_"+objectKindZTIC+"_"+ objectKindCode+"_"+ objectZTIC+"_"+objectCode.toString().trim();
      //var link_value = 1; (del) 20210402
      var linkValRec = new DsObjectLinkForRecordFormat(obj_key, linkType_ztic, linkType_code, linkToKind_ztic, linkToKind_code, linkToCode_ztic, linkToCode, linkValue, new_link_target_code, status, timestamp);
      //console.log("20200628 linkValRec.newLinkTargetCode in ..message_builder: "+ linkValRec.newLinkTargetCode);
      var link_val_idx = link_AR.push(linkValRec) - 1;
//console.log("20200115 obj_key for LINK: "+ obj_key);
          if (objectValue_HM.has(obj_key)){
             var objvals_existing_idx = objectValue_HM.get(obj_key);
                //console.log("objvals_existing_idx for OE 20190911: "+objvals_existing_idx);
                var objvals_existing     = objectValue_AR[objvals_existing_idx];
                objvals_existing.link_idx_AR.push(link_val_idx);
               }
          else
               {    var objvals = new ObjectValueUpdateWorkAreaRec(TabNamePrfx.trim(), objectKindZTIC.toString().trim(), objectKindCode.toString().trim(), objectZTIC.toString().trim(), objectCode.toString().trim(), template_ztic.toString().trim(), template_code.toString().trim(), new_code);
                     objvals.link_idx_AR.push(link_val_idx);
                     var objvals_idx = objectValue_AR.push(objvals) -1;
                     objectValue_HM.set(obj_key, objvals_idx);
               }//endif  objectValue_HM.has(obj_key)




    } //endif LINK


// query set member
    var QSLS_parent;
    if(this.lines[i].substring(0,5).toString().trim() === 'QSET'){
      this.addQSET_QuerySetMember_ForRecordFormatMsg(this.ZtRawMessageArray, this.lines[i]);
      QSLS_parent = this.ZtRawMessageArray.length -1;
    }  //endif QSET 

// query selection set member
    var QOSS_parent;
    if(this.lines[i].substring(0,5).toString().trim() === 'QSLS'){
      QOSS_parent = this.addQSLS_QuerySelectionSetMember_ForRecordFormatMsg(this.ZtRawMessageArray, this.lines[i], QSLS_parent);
      //QOSS_parent = this.ZtRawMessageArray.length;
    }  //endif QSLS 


    var QOBJ_parent;
    var QELM_parent;
// query object selection set member
    if(this.lines[i].substring(0,5).toString().trim() === 'QOSS'){
       QOBJ_parent = this.addQOSS_QueryObjectSelectionSetMember_ForRecordFormatMsg(this.ZtRawMessageArray, this.lines[i], QOSS_parent);
       QELM_parent = QOBJ_parent + 1;
 
    }  //endif QOSS 



// query object set member
    if(this.lines[i].substring(0,5).toString().trim() === 'QOBJ'){
         objectKindZTIC = this.lines[i].substring(5,10).toString().trim();
         objectKindCode = this.lines[i].substring(10,15).toString().trim();
         objectZTIC     = this.lines[i].substring(15,20).toString().trim();
         objectCode     = this.lines[i].substring(20,25).toString().trim();

     var qObj = new QueryObjectForRecordFormat(objectKindZTIC, objectKindCode, objectZTIC, objectCode);
     

     this.addQOBJ_QueryObjectSetMember_ForRecordFormatMsg(this.ZtRawMessageArray, qObj, QOBJ_parent);  //20200406

    }  //endif QOBJ 


   if(this.lines[i].substring(0,5).toString().trim() === 'QELM'){

     var objectElementZTIC = this.lines[i].substring(5,10).toString().trim();
     var objectElementCode = this.lines[i].substring(10,15).toString().trim();
     var selectionGroupNumber     = this.lines[i].substring(15,20).toString().trim();
     var setOperator     = this.lines[i].substring(20,25).toString().trim();
     var operator  = this.lines[i].substring(25,30).toString().trim();
     var qualifier  = this.lines[i].substring(30,35).toString().trim();
     var value = this.lines[i].substring(35,40).toString().trim();

    var qObjElem = new QueryObjectElementForRecordFormat(objectElementZTIC, objectElementCode, selectionGroupNumber, setOperator, operator, qualifier, value);
    //queryElement_AR.push(qObjElem);                //(del) 20200406
    this.addQELM_QueryElementSetMember_ForRecordFormatMsg(this.ZtRawMessageArray, qObjElem, QELM_parent);  //20200406

    }  //endif QELM


  } //endfor loop through lines



///loop through arrays for maintain

  //console.log("20191016 objectValue_AR.length: "+objectValue_AR.length);
  for (var i = 0; i < objectValue_AR.length; i++) {

      var set_parent_index = this.addObject_ForRecordFormatMsg(this.ZtRawMessageArray, objectValue_AR[i], this.parent_index_obj_set);
      
      var obj_elem_set_index = this.ZtRawMessageArray.length;

      //console.log("20191016 objectValue_AR[i].objElement_idx_AR.length: "+objectValue_AR[i].objElement_idx_AR.length);
      for (var j = 0; j < objectValue_AR[i].objElement_idx_AR.length; j++) {
        // console.log("20191016 OE value: "+objectValue_AR[i].objElement_idx_AR[j].value);
        //  console.log("20191016 objElement_AR[objectValue_AR[i].objElement_idx_AR[j]].value: "+objElement_AR[objectValue_AR[i].objElement_idx_AR[j]].value);
         var oe_ztic =  objElement_AR[objectValue_AR[i].objElement_idx_AR[j]].OE_ztic;
         var oe_code =  objElement_AR[objectValue_AR[i].objElement_idx_AR[j]].OE_code;
         var oe_value = objElement_AR[objectValue_AR[i].objElement_idx_AR[j]].value;
         this.addObjElem_ForRecordFormatMsg(this.ZtRawMessageArray, oe_ztic, oe_code, oe_value, set_parent_index, obj_elem_set_index, j);
      }

      var type_set_index = this.ZtRawMessageArray.length;
      for (var j = 0; j < objectValue_AR[i].typeValue_idx_AR.length; j++) {
         this.addType_ForRecordFormatMsg(this.ZtRawMessageArray, typeValue_AR[objectValue_AR[i].typeValue_idx_AR[j]], set_parent_index, type_set_index, j);
      }
      
     
     var link_set_index = this.ZtRawMessageArray.length;
     for (var j = 0; j < objectValue_AR[i].link_idx_AR.length; j++) {
         this.addLink_ForRecordFormatMsg(this.ZtRawMessageArray, link_AR[objectValue_AR[i].link_idx_AR[j]], set_parent_index, link_set_index, j);
      }

 
  }
// end loop through arrays for maintain

//loop through arrays for query


  //console.log("Listing Message built from Record Format file");
    for (var i = 0; i < this.ZtRawMessageArray.length; i++) {

       //console.log(this.ZtRawMessageArray[i].index+"-"+this.ZtRawMessageArray[i].parent_index+"-"+this.ZtRawMessageArray[i].priority+"-"+this.ZtRawMessageArray[i].me_ztic+"-"+this.ZtRawMessageArray[i].me_code+"-"+this.ZtRawMessageArray[i].data);
    } //endfor loop through ZtRawMessageArray



return this.ZtRawMessageArray;
} // end of convertRecordFormatMsgToRaw


addHeader_ForRecordFormatMsg(rm_AR) {
//var rm_AR = [];  //raw message array
var next_index = 1; 
var next_index_str = next_index.toString().trim();

var msgRow0 = new MessageRow("0","","","","","" ); rm_AR.push(msgRow0);
var msgRow1 = new MessageRow(next_index_str,"0","0001","2","1","" ); rm_AR.push(msgRow1); next_index++; next_index_str = next_index.toString().trim();
var msgRow2 = new MessageRow(next_index_str,"1","0001","2","2","" ); rm_AR.push(msgRow2); next_index++; next_index_str = next_index.toString().trim();
var msgRow3 = new MessageRow(next_index_str,"2","0001","2","20","" ); rm_AR.push(msgRow3); next_index++; next_index_str = next_index.toString().trim();
var msgRow4 = new MessageRow(next_index_str,"3","0001","2","200","" ); rm_AR.push(msgRow4); next_index++; next_index_str = next_index.toString().trim();
var msgRow5 = new MessageRow(next_index_str,"3","0001","2","201","" ); rm_AR.push(msgRow5); next_index++; next_index_str = next_index.toString().trim();
var msgRow6 = new MessageRow(next_index_str,"3","0001","2","202","" ); rm_AR.push(msgRow6); next_index++; next_index_str = next_index.toString().trim();
var msgRow7 = new MessageRow(next_index_str,"3","0001","2","203","" ); rm_AR.push(msgRow7); next_index++; next_index_str = next_index.toString().trim();
var msgRow8 = new MessageRow(next_index_str,"2","0001","2","21","" ); rm_AR.push(msgRow8); next_index++; next_index_str = next_index.toString().trim();
var msgRow9 = new MessageRow(next_index_str,"2","0001","2","23","" ); rm_AR.push(msgRow9); next_index++; next_index_str = next_index.toString().trim();
var msgRow10 = new MessageRow(next_index_str,"9","0001","2","230","" ); rm_AR.push(msgRow10); next_index++; next_index_str = next_index.toString().trim();
var msgRow11 = new MessageRow(next_index_str,"9","0001","2","231","" ); rm_AR.push(msgRow11); next_index++; next_index_str = next_index.toString().trim();
var msgRow12 = new MessageRow(next_index_str,"1","0001","2","3","" ); rm_AR.push(msgRow12); next_index++; next_index_str = next_index.toString().trim();
var msgRow13 = new MessageRow(next_index_str,"12","0001","2","30","" ); rm_AR.push(msgRow13); next_index++; next_index_str = next_index.toString().trim();
var msgRow14 = new MessageRow(next_index_str,"12","0001","2","31","" ); rm_AR.push(msgRow14); next_index++; next_index_str = next_index.toString().trim();
var msgRow15 = new MessageRow(next_index_str,"12","0001","2","32","" ); rm_AR.push(msgRow15); next_index++; next_index_str = next_index.toString().trim();
var msgRow16 = new MessageRow(next_index_str,"12","0001","2","33","" ); rm_AR.push(msgRow16); next_index++; next_index_str = next_index.toString().trim();

} //


addZTIC_ForRecordFormatMsg(rm_AR, line, parent_index) {
var ztic = line.substring(5,10).toString().trim();
var namespace = line.substring(10,90).toString().trim();
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var msgRow9 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","210","" ); rm_AR.push(msgRow9); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index - 1;
var msgRow10 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2100",ztic ); rm_AR.push(msgRow10); next_index++; next_index_str = next_index.toString().trim();
var msgRow11 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2101",namespace ); rm_AR.push(msgRow11); next_index++; next_index_str = next_index.toString().trim();


} // end of addZTIC_ForRecordFormatMsg



addRZTI_ForRecordFormatMsg(rm_AR, line) {
var receiver_ztic = line.substring(5,10).toString().trim();
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var parent_index = 2;
var msgRow9 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","22","" ); rm_AR.push(msgRow9); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index - 1;
var msgRow10 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","223",receiver_ztic ); rm_AR.push(msgRow10); 

} // end of addRZTI_ForRecordFormatMsg




addMPPG_ForRecordFormatMsg(rm_AR, line) {

  
var default_ts   = line.substring(5,25).toString().trim();
var msg_id_clnt  = line.substring(25,45).toString().trim();
var last_idx_req = line.substring(45,55).toString().trim();
var mode         = line.substring(55,60).toString().trim();
var user         = line.substring(60,80).toString().trim();
var patch_level_ztic = line.substring(80,85).toString().trim();
var patch_level_code = line.substring(85,90).toString().trim();


var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();

var parent_index = 10;   //(from header)

var msgRow11 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2301",default_ts ); rm_AR.push(msgRow11); next_index++; next_index_str = next_index.toString().trim();
var msgRow12 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2302",msg_id_clnt ); rm_AR.push(msgRow12); next_index++; next_index_str = next_index.toString().trim();
var msgRow13 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2303",last_idx_req ); rm_AR.push(msgRow13); next_index++; next_index_str = next_index.toString().trim();
var msgRow14 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2304",mode ); rm_AR.push(msgRow14); next_index++; next_index_str = next_index.toString().trim();
var msgRow15 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2305",user ); rm_AR.push(msgRow15); next_index++; next_index_str = next_index.toString().trim();
var msgRow16 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2306",patch_level_ztic ); rm_AR.push(msgRow16); next_index++; next_index_str = next_index.toString().trim();
var msgRow17 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2307",patch_level_code ); rm_AR.push(msgRow17); next_index++; next_index_str = next_index.toString().trim();

} // end of addMPPG_ForRecordFormatMsg


addEXTK_ForRecordFormatMsg(rm_AR, line) {
var extKeyDefZTIC = line.substring(5,10).toString().trim();
var extKeyDefCode = line.substring(10,15).toString().trim();
var extKeyValZTIC = line.substring(15,20).toString().trim();
var extKeyValCode = line.substring(20,25).toString().trim();


var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();

var parent_index = 11;


var msgRow22 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2310","" ); rm_AR.push(msgRow22); next_index++; next_index_str = next_index.toString().trim();
parent_index++;
var msgRow23 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2311",extKeyDefZTIC ); rm_AR.push(msgRow23); next_index++; next_index_str = next_index.toString().trim();
var msgRow24 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2312",extKeyDefCode ); rm_AR.push(msgRow24); next_index++; next_index_str = next_index.toString().trim();
var msgRow25 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2313",extKeyValZTIC ); rm_AR.push(msgRow25); next_index++; next_index_str = next_index.toString().trim();
var msgRow26 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2314",extKeyValCode ); rm_AR.push(msgRow26); next_index++; next_index_str = next_index.toString().trim();
} // end of addEXTK_ForRecordFormatMsg


addMSET_MaintainSetMember_ForRecordFormatMsg(rm_AR, mset_idx, timestampx) {

var maintain_set_id = mset_idx.toString().trim();
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();

var parent_index = 13;  //(from header)
var parent_index_str = parent_index.toString().trim();

var msgRow3 = new MessageRow(next_index_str,parent_index_str,"0001","2","300","" ); rm_AR.push(msgRow3); next_index++; next_index_str = next_index.toString().trim();

var maint_set_mbr_idx = next_index - 1;                             //20200117
var maint_set_mbr_idx_str = maint_set_mbr_idx.toString().trim();    //20200117
var msgRow4 = new MessageRow(next_index_str,maint_set_mbr_idx_str,"0001","2","3000",maintain_set_id); rm_AR.push(msgRow4); next_index++; next_index_str = next_index.toString().trim();
var msgRow5 = new MessageRow(next_index_str,maint_set_mbr_idx_str,"0001","2","3001","" ); rm_AR.push(msgRow5); next_index++; next_index_str = next_index.toString().trim();
var msgRow6 = new MessageRow(next_index_str,maint_set_mbr_idx_str,"0001","2","3002","" ); rm_AR.push(msgRow6); next_index++; next_index_str = next_index.toString().trim();
var msgRow7 = new MessageRow(next_index_str,maint_set_mbr_idx_str,"0001","2","3003",timestampx.toString().trim() ); rm_AR.push(msgRow7); next_index++; next_index_str = next_index.toString().trim();
var msgRow8 = new MessageRow(next_index_str,maint_set_mbr_idx_str,"0001","2","3008","" ); rm_AR.push(msgRow8); next_index++; next_index_str = next_index.toString().trim();
var msgRow9 = new MessageRow(next_index_str,maint_set_mbr_idx_str,"0001","2","3030","" ); rm_AR.push(msgRow9);
this.parent_index_obj_set = next_index;  next_index++; next_index_str = next_index.toString().trim();   // 20200715

} //


addObject_ForRecordFormatMsg(rm_AR, objectValuex, parent_index_imp) {

var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var parent_index = parent_index_imp;
var parent_index_str = parent_index.toString().trim();



var msgRow4 = new MessageRow(next_index_str,parent_index_str,"0001","2","3031",""); 
var set_parent = next_index_str;
rm_AR.push(msgRow4); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index -1; var parent_index_str = parent_index.toString().trim();
var msgRow5 = new MessageRow(next_index_str,parent_index_str,"0001","2","3032",objectValuex.kindZTIC); rm_AR.push(msgRow5); next_index++; next_index_str = next_index.toString().trim();
var msgRow6 = new MessageRow(next_index_str,parent_index_str,"0001","2","3033",objectValuex.kindCode); rm_AR.push(msgRow6); next_index++; next_index_str = next_index.toString().trim();
var msgRow7 = new MessageRow(next_index_str,parent_index_str,"0001","2","3034",objectValuex.objZTIC); rm_AR.push(msgRow7); next_index++; next_index_str = next_index.toString().trim();
var msgRow8 = new MessageRow(next_index_str,parent_index_str,"0001","2","3035",objectValuex.objCode); rm_AR.push(msgRow8); next_index++; next_index_str = next_index.toString().trim();
var msgRow8b = new MessageRow(next_index_str,parent_index_str,"0001","2","3036",objectValuex.newCode); rm_AR.push(msgRow8b); next_index++; next_index_str = next_index.toString().trim();
var msgRow9 = new MessageRow(next_index_str,parent_index_str,"0001","2","3037","" ); rm_AR.push(msgRow9); next_index++; next_index_str = next_index.toString().trim();
var msgRow10 = new MessageRow(next_index_str,parent_index_str,"0001","2","3038","" ); rm_AR.push(msgRow10); next_index++; next_index_str = next_index.toString().trim();
var msgRow11 = new MessageRow(next_index_str,parent_index_str,"0001","2","30390",objectValuex.template_ztic ); rm_AR.push(msgRow11); next_index++; next_index_str = next_index.toString().trim();
var msgRow12 = new MessageRow(next_index_str,parent_index_str,"0001","2","30391",objectValuex.template_code ); rm_AR.push(msgRow12); next_index++; next_index_str = next_index.toString().trim();


return set_parent;
} // end of addObject_ForRecordFormatMsg


addObjElem_ForRecordFormatMsg(rm_AR, OE_ztic, OE_code, value, set_parent, obj_elem_set_index, indx) {

var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
//var parent_index = parent_index_imp;
var parent_index_str = "";
if(indx == 0){
  var msgRow3 = new MessageRow(next_index_str,set_parent.toString().trim(),"0001","2","3040","" ); rm_AR.push(msgRow3); next_index++; next_index_str =   next_index.toString().trim();
//parent_index++; parent_index_str = parent_index.toString().trim();
   }
var parent_index = obj_elem_set_index; parent_index_str = parent_index.toString().trim();
var msgRow4 = new MessageRow(next_index_str,parent_index_str,"0001","2","3041",""); rm_AR.push(msgRow4); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index -1; parent_index_str = parent_index.toString().trim();
var msgRow5 = new MessageRow(next_index_str,parent_index_str,"0001","2","3042",OE_ztic); rm_AR.push(msgRow5); next_index++; next_index_str = next_index.toString().trim();
var msgRow6 = new MessageRow(next_index_str,parent_index_str,"0001","2","3043",OE_code); rm_AR.push(msgRow6); next_index++; next_index_str = next_index.toString().trim();
var msgRow7 = new MessageRow(next_index_str,parent_index_str,"0001","2","3044",value); rm_AR.push(msgRow7); next_index++; next_index_str = next_index.toString().trim();
//var msgRow8 = new MessageRow(next_index_str,parent_index_str,"0001","2","3045",""); rm_AR.push(msgRow8); next_index++; next_index_str = next_index.toString().trim();


} // end of addObjElem_ForRecordFormatMsg


addType_ForRecordFormatMsg(rm_AR, typeValRecx, set_parent, type_set_index, indx) {
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
//var parent_index = parent_index_imp;
var parent_index_str = "";

if(indx == 0){
  var msgRow3 = new MessageRow(next_index_str,set_parent.toString().trim(),"0001","2","3050","" ); rm_AR.push(msgRow3); next_index++; next_index_str =   next_index.toString().trim();
//parent_index++; parent_index_str = parent_index.toString().trim();
   }
var parent_index = type_set_index; parent_index_str = parent_index.toString().trim();
var msgRow4 = new MessageRow(next_index_str,parent_index_str,"0001","2","3051",""); rm_AR.push(msgRow4); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index -1; parent_index_str = parent_index.toString().trim();
var msgRow5 = new MessageRow(next_index_str,parent_index_str,"0001","2","3052",typeValRecx.typeDef_ztic); rm_AR.push(msgRow5); next_index++; next_index_str = next_index.toString().trim();
var msgRow6 = new MessageRow(next_index_str,parent_index_str,"0001","2","3053",typeValRecx.typeDef_code); rm_AR.push(msgRow6); next_index++; next_index_str = next_index.toString().trim();
var msgRow7 = new MessageRow(next_index_str,parent_index_str,"0001","2","3054",typeValRecx.typeValue_ztic); rm_AR.push(msgRow7); next_index++; next_index_str = next_index.toString().trim();
var msgRow8 = new MessageRow(next_index_str,parent_index_str,"0001","2","3055",typeValRecx.typeValue_code); rm_AR.push(msgRow8); next_index++; next_index_str = next_index.toString().trim();


} // end of addType_ForRecordFormatMsg()


addLink_ForRecordFormatMsg(rm_AR, linkValRecx, set_parent, link_set_index, indx) {

var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
//var parent_index = parent_index_imp;
var parent_index_str = "";

  var msgRow3 = new MessageRow(next_index_str,set_parent.toString().trim(),"0001","2","3060","" ); rm_AR.push(msgRow3); next_index++; next_index_str =   next_index.toString().trim();

parent_index = next_index - 1; parent_index_str = parent_index.toString().trim();  // 20200115 
var msgRow4 = new MessageRow(next_index_str,parent_index_str,"0001","2","3061",""); rm_AR.push(msgRow4); next_index++; next_index_str = next_index.toString().trim();
var parent_index = next_index -1; parent_index_str = parent_index.toString().trim();
var msgRow5 = new MessageRow(next_index_str,parent_index_str,"0001","2","3062",linkValRecx.linkType_ztic); rm_AR.push(msgRow5); next_index++; next_index_str = next_index.toString().trim();
var msgRow6 = new MessageRow(next_index_str,parent_index_str,"0001","2","3063",linkValRecx.linkType_code); rm_AR.push(msgRow6); next_index++; next_index_str = next_index.toString().trim();
var msgRow7 = new MessageRow(next_index_str,parent_index_str,"0001","2","3064",linkValRecx.linkToKind_ztic); rm_AR.push(msgRow7); next_index++; next_index_str = next_index.toString().trim();
var msgRow8 = new MessageRow(next_index_str,parent_index_str,"0001","2","3065",linkValRecx.linkToKind_code); rm_AR.push(msgRow8); next_index++; next_index_str = next_index.toString().trim();
var msgRow9 = new MessageRow(next_index_str,parent_index_str,"0001","2","3066",linkValRecx.linkToCode_ztic); rm_AR.push(msgRow9); next_index++; next_index_str = next_index.toString().trim();
var msgRow10 = new MessageRow(next_index_str,parent_index_str,"0001","2","3067",linkValRecx.linkToCode); rm_AR.push(msgRow10); next_index++; next_index_str = next_index.toString().trim();
//console.log("202006228 linkValRecx.newLinkTargetCode in ..message_builder: "+linkValRecx.newLinkTargetCode);
var msgRow11 = new MessageRow(next_index_str,parent_index_str,"0001","2","3068",linkValRecx.newLinkTargetCode); rm_AR.push(msgRow11); next_index++; next_index_str = next_index.toString().trim();
var msgRow12 = new MessageRow(next_index_str,parent_index_str,"0001","2","30691",linkValRecx.status); rm_AR.push(msgRow12); next_index++; next_index_str = next_index.toString().trim();
var msgRow13 = new MessageRow(next_index_str,parent_index_str,"0001","2","30692",linkValRecx.timestamp); rm_AR.push(msgRow13); next_index++; next_index_str = next_index.toString().trim();
var msgRow14 = new MessageRow(next_index_str,parent_index_str,"0001","2","30693",linkValRecx.linkValue); rm_AR.push(msgRow14); next_index++; next_index_str = next_index.toString().trim();


} // end of addLink_ForRecordFormatMsg()


addTemplate_ForRecordFormatMsg(rm_AR, templateValRecx, parent_index_imp) {

} // end of addTemplate_ForRecordFormatMsg()




addQSET_QuerySetMember_ForRecordFormatMsg(rm_AR,line)  {

var query_set_member_id = line.substring(25,50).toString().trim();
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
//var parent_index = 11;
var parent_index = 14;
var parent_index_str = parent_index.toString().trim();
var msgRow;
var statusExclusion_AR = [];  // 20210720
  msgRow = new MessageRow(next_index_str,parent_index_str,"0001","2","310","" ); rm_AR.push(msgRow); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index - 1; parent_index_str = parent_index.toString().trim();
 msgRow = new MessageRow(next_index_str,parent_index_str,"0001","2","3100",query_set_member_id); rm_AR.push(msgRow); next_index++; next_index_str = next_index.toString().trim();
var OTztic = line.substring(5,10).toString().trim();
 msgRow = new MessageRow(next_index_str,parent_index_str,"0001","2","3101",OTztic ); rm_AR.push(msgRow); next_index++; next_index_str = next_index.toString().trim();
var OTcode = line.substring(10,15).toString().trim();
 msgRow = new MessageRow(next_index_str,parent_index_str,"0001","2","3102",OTcode ); rm_AR.push(msgRow); next_index++; next_index_str = next_index.toString().trim();
var selMode = line.substring(15,20).toString().trim();
 msgRow = new MessageRow(next_index_str,parent_index_str,"0001","2","3103",selMode ); rm_AR.push(msgRow); next_index++; next_index_str = next_index.toString().trim();
var respSummOnly = line.substring(20,25).toString().trim();

//  NOTE:  20240528 message code 3104 will be used as the parent for timestamps, not for respSummOnly
 msgRow = new MessageRow(next_index_str,parent_index_str,"0001","2","3104",respSummOnly ); rm_AR.push(msgRow); next_index++; next_index_str = next_index.toString().trim();
// start 20210720  add status exlusions to request message
if(this.maint_mode == "display"){
   statusExclusion_AR.push("2");    // status--inactive
   statusExclusion_AR.push("3");    // status--flagged for deletion
   //msgRow = new MessageRow(next_index_str,parent_index_str,"0001","2","31091","" ); rm_AR.push(msgRow);  //(del) 20240528
   msgRow = new MessageRow(next_index_str,parent_index_str,"0001","2","31032","" ); rm_AR.push(msgRow);    // 20240528
   var statusExclusion_parent = next_index_str;
   next_index++; next_index_str = next_index.toString().trim();
   for (var m = 0; m < statusExclusion_AR.length; m++) {
     //msgRow = new MessageRow(next_index_str,statusExclusion_parent,"0001","2","31092",statusExclusion_AR[m] ); rm_AR.push(msgRow); next_index++; next_index_str = next_index.toString().trim(); //(del) 20240528
     msgRow = new MessageRow(next_index_str,statusExclusion_parent,"0001","2","31033",statusExclusion_AR[m] ); rm_AR.push(msgRow); next_index++; next_index_str = next_index.toString().trim();  // 20240528   
   } // endfor
}  // endif
// end 20210720
 msgRow = new MessageRow(next_index_str,parent_index_str,"0001","2","3110","" ); rm_AR.push(msgRow); next_index++; next_index_str = next_index.toString().trim();


}  // end of addQSET_QuerySetMember_ForRecordFormatMsg(rm_AR,line)


addQSLS_QuerySelectionSetMember_ForRecordFormatMsg(rm_AR, line, parent_index)  {
var QOSS_parent;
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var parent_index_str = parent_index.toString().trim();
var selGroupNum = line.substring(25,50).toString().trim();
var msgRow35 = new MessageRow(next_index_str,parent_index_str,"0001","2","3111","" ); rm_AR.push(msgRow35); next_index++; next_index_str = next_index.toString().trim();
parent_index++; parent_index_str = parent_index.toString().trim();
var msgRow36 = new MessageRow(next_index_str,parent_index_str,"0001","2","3112",selGroupNum ); rm_AR.push(msgRow36); next_index++; next_index_str = next_index.toString().trim();
var msgRow37 = new MessageRow(next_index_str,parent_index_str,"0001","2","3113","" ); rm_AR.push(msgRow37); next_index++; next_index_str = next_index.toString().trim();
var msgRow38 = new MessageRow(next_index_str,parent_index_str,"0001","2","3114","" ); rm_AR.push(msgRow38); next_index++; next_index_str = next_index.toString().trim();
var msgRow39 = new MessageRow(next_index_str,parent_index_str,"0001","2","3120","" ); QOSS_parent = next_index; rm_AR.push(msgRow39); next_index++; next_index_str = next_index.toString().trim();
return QOSS_parent;
} //end of addQSLS_QuerySelectionSetMember_ForRecordFormatMsg(rm_AR, line, parent_index)


addQOSS_QueryObjectSelectionSetMember_ForRecordFormatMsg(rm_AR, line, parent_index)  {
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var parent_index_str = parent_index.toString().trim();
var level = line.substring(5,10).toString().trim();
var usage_ztic = line.substring(10,15).toString().trim();
var usage_code = line.substring(15,20).toString().trim();
var return_QOBJ_parent;
var msgRow40 = new MessageRow(next_index_str,parent_index_str,"0001","2","3121","" ); rm_AR.push(msgRow40); next_index++; next_index_str = next_index.toString().trim();
parent_index++; parent_index_str = parent_index.toString().trim();
var msgRow41 = new MessageRow(next_index_str,parent_index_str,"0001","2","3122",level ); rm_AR.push(msgRow41); next_index++; next_index_str = next_index.toString().trim();
var msgRow42 = new MessageRow(next_index_str,parent_index_str,"0001","2","3123",usage_ztic ); rm_AR.push(msgRow42); next_index++; next_index_str = next_index.toString().trim();
// 20240116 add 3124 for usage code, use 3123 for usage ztic, line code will be stored in line.substring(15,20).toString().trim();
var msgRow42b = new MessageRow(next_index_str,parent_index_str,"0001","2","3124",usage_code ); rm_AR.push(msgRow42b); next_index++; next_index_str = next_index.toString().trim();
var msgRow43 = new MessageRow(next_index_str,parent_index_str,"0001","2","3130","" ); rm_AR.push(msgRow43); next_index++; next_index_str = next_index.toString().trim();
 return_QOBJ_parent = next_index - 1;
var msgRow44 = new MessageRow(next_index_str,parent_index_str,"0001","2","3140","" ); rm_AR.push(msgRow44); next_index++; next_index_str = next_index.toString().trim();
var msgRow45 = new MessageRow(next_index_str,parent_index_str,"0001","2","3150","" ); rm_AR.push(msgRow45); next_index++; next_index_str = next_index.toString().trim();
var msgRow46 = new MessageRow(next_index_str,parent_index_str,"0001","2","3160","" ); rm_AR.push(msgRow46); next_index++; next_index_str = next_index.toString().trim();
var msgRow47 = new MessageRow(next_index_str,parent_index_str,"0001","2","3170","" ); rm_AR.push(msgRow47); next_index++; next_index_str = next_index.toString().trim();
return return_QOBJ_parent;
}  // end of addQOSS_QueryObjectSelectionSetMember_ForRecordFormatMsg(rm_AR, line, parent_index)


addQOBJ_QueryObjectSetMember_ForRecordFormatMsg(rm_AR, qObj, parent_index)  {
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var parent_index_str = parent_index.toString().trim();

var msgRow44 = new MessageRow(next_index_str,parent_index_str,"0001","2","3131","" ); rm_AR.push(msgRow44); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index -1; parent_index_str = parent_index.toString().trim();
var msgRow47 = new MessageRow(next_index_str,parent_index_str,"0001","2","3134",qObj.objectZTIC ); rm_AR.push(msgRow47); next_index++; next_index_str = next_index.toString().trim();
var msgRow48 = new MessageRow(next_index_str,parent_index_str,"0001","2","3135",qObj.objectCode ); rm_AR.push(msgRow48); next_index++; next_index_str = next_index.toString().trim();

}  // end of addQOBJ_QueryObjectSetMember_ForRecordFormatMsg(rm_AR, line, parent_index)  




addQELM_QueryElementSetMember_ForRecordFormatMsg(rm_AR, qObjElem, parent_index)  {


}  // end of addQELM_QueryElementSetMember_ForRecordFormatMsg(rm_AR, line, parent_index)  {



} // end of class ZtMessageBuilder

function ExtendedKeyWorkAreaRec(){
    this.extendedKeySetMember_idx        = "";
    this.rawMsg_idx                      = "";
    this.extendedKeyDefinitionCodeZTIC   = "";   //2311
    this.extendedKeyDefinitionCode       = "";   //2312
    this.extendedKeyValueZTIC            = "";   //2313
    this.extendedKeyValueCode            = "";   //2314
}// end of ExtendedKeyWorkAreaRec()




function ObjectValueUpdateWorkAreaRec(tn_prfx, kindZTIC, kindCode, objZTIC, objCode, template_ztic, template_code, newCodex)  {
    this.tn_prfx  = tn_prfx;
    this.kindZTIC = kindZTIC.toString().trim();      //3032
    this.kindCode = kindCode.toString().trim();      //3033
    this.objZTIC  = objZTIC.toString().trim();       //3034
    this.objCode  = objCode.toString().trim();       //3035
    this.newCode  = newCodex.toString().trim();      //3036 (boolean)
    this.template_ztic = template_ztic.toString().trim();
    this.template_code = template_code.toString().trim();
    this.keyString   = tn_prfx+"_"+kindZTIC.trim()+"_"+kindCode.trim()+"_"+objZTIC.trim()+"_"+objCode.trim();
    this.parentIdx = 0;   // reveiw
    this.linkLevel = 0;   // review
    this.isPopulated = false;  // review
    this.objElement_idx_AR = [];
    this.typeValue_idx_AR  = [];
    this.link_idx_AR       = [];

}


function DsObjectElementValueForRecordFormat(objectKey, OE_ztic, OE_code, value) {
   this.objectKey = objectKey;
  // this.TE_ztic    = TE_ztic;
  // this.TE_code    = TE_code;
   this.OE_ztic      = OE_ztic;
   this.OE_code      = OE_code;
  // this.ek_defZTIC = ek_defZTIC;
  // this.ek_defCode = ek_defCode;
  // this.ek_valueZTIC    = ek_valueZTIC;
  // this.ek_valueCode    = ek_valueCode;
  // this.status          = status;
  // this.timestamp       = timestamp;
  // this.seqNum          = seqNum;
   this.value           = value;
 
} // end of function DsObjectElementValue


function DsObjectTypeValueForRecordFormat(objectKey, typeDef_ztic, typeDef_code, typeValue_ztic, typeValue_code) {
   this.objectKey = objectKey;
   this.typeDef_ztic = typeDef_ztic;
   this.typeDef_code = typeDef_code;
   this.typeValue_ztic = typeValue_ztic;
   this.typeValue_code = typeValue_code;
  // this.status         = status;
   //this.timestamp      = timestamp;
   //this.seqNum         = seqNum;

}  // end of function DsObjectTypeValue



function DsObjectLinkForRecordFormat(objectKey, linkType_ztic, linkType_code, linkToKind_ztic, linkToKind_code, linkToCode_ztic, linkToCode, linkValue, new_link_target_code, status, timestamp) {
   this.objectKey = objectKey;
   this.linkType_ztic = linkType_ztic;
   this.linkType_code = linkType_code;
   this.linkToKind_ztic    = linkToKind_ztic;
   this.linkToKind_code    = linkToKind_code;
   this.linkToCode_ztic    = linkToCode_ztic;
   this.linkToCode         = linkToCode;
   this.linkValue          = linkValue;
   this.newLinkTargetCode  = new_link_target_code;  //boolean
   this.status             = status;
   this.timestamp          = timestamp;
//   this.seqNum             = seqNum;


}  // end of function DsObjectLinks



function DsObjectTemplateForRecordFormat(objectKey, templ_ztic, templ_code) {

    this.objectKey = objectKey;
    this.templ_ztic = templ_ztic;
    this.templ_code = templ_code;
    //this.status     = status;
    //this.timestamp  = timestamp;
    //this.seqNum     = seqNum;


} // end of DsObjectTemplate
  


function QuerySetMemberForRecordFormat()  {
   this.rawMsg_idx             = "";
   this.querySetMember_idx     = "";
   this.setMemberID            = "";     //3100
   this.objectTemplateZTIC     = "";     //3101
   this.objectTemplateCode     = "";     //3102
   this.selectionMode          = "";     //3103
   this.selectionSetMember_idx_AR    = [];     //3110
} 


function QuerySelectionSetMemberForRecordFormat() {
   this.rawMsg_idx                       = "";
   this.selectionSetMember_rawMsg_idx    = "";
   this.selectionSet_rawMsg_idx          = "";
   this.querySetMember_rawMsg_idx        = "";
   this.selectionGroupNumber             = "";     //3112
   this.numberOfSelectionGroupParent     = "";     //3113
   this.setOperator                      = "";     //3114
   this.objectSelectionSetMember_idx_AR        = [];     //3120
}  

function QueryObjectSelectionSetMemberForRecordFormat() {
   this.rawMsg_idx                       = "";
   this.objectSelSetMember_rawMsg_idx    = "";
   this.objectSelSet_rawMsg_idx          = "";
   this.selectionSetMember_rawMsg_idx    = "";
   this.selectionSet_rawMsg_idx          = "";
   this.querySetMember_rawMsg_idx        = "";
   this.level                        = "";     //3122
   this.usage                        = "";     //3123
   this.objectSetMember_idx_AR       = [];     //3130
   this.objectElementSet_idx_AR      = [];     //3140
   this.typeSet_idx_AR               = [];     //3150
   this.linkSet_idx_AR               = [];     //3160
   this.additionSelectionSet_idx_AR  = [];     //3170
} 

function QueryObjectForRecordFormat(objectKindZTICx, objectKindCodex, objectZTICx, objectCodex) {
   this.rawMsg_idx                   = "";
   this.object_rawMsg_idx            = "";     //3131
   this.objectSetMember_rawMsg_idx   = "";     //3130
   this.objectSelSetMember_rawMsg_idx = "";    //3120
   this.selectionSetMember_rawMsg_idx = "";    //3110
   this.querySetMember_rawMsg_idx    = "";     //31
   this.objectKindZTIC               = objectKindZTICx;     //3132
   this.objectKindCode               = objectKindCodex;     //3133
   this.objectZTIC                   = objectZTICx;         //3134
   this.objectCode                   = objectCodex;         //3135
}

  
function QueryObjectElementForRecordFormat(objectElementZTICx, objectElementCodex, selectionGroupNumberx, setOperatorx, operatorx, qualifierx, valuex) {
   this.rawMsg_idx                   = "";
   this.objectSelSetMember_rawMsg_idx = "";
   this.selectionSetMember_rawMsg_idx = "";    //3110
   this.querySetMember_rawMsg_idx    = "";     //31
   this.objectElementZTIC            = objectElementZTICx;    //3142
   this.objectElementCode            = objectElementCodex;    //3143
   this.selectionGroupNumber         = selectionGroupNumberx;    //3144
   this.setOperator                  = setOperatorx;    //3145
   this.operator                     = operatorx;    //3146
   this.qualifier                    = qualifierx;    //3147
   this.value                        = valuex;    //3148
}


function QueryTypeForRecordFormat() {
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


function QueryLinkForRecordFormat() {
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

function QueryAdditionalForRecordFormat() {
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




function MessageRow(index, parent_index, priority, me_ztic, me_code, data) {
  this.index        = index;
  this.parent_index = parent_index;
  this.priority     = priority;
  this.me_ztic      = me_ztic;
  this.me_code      = me_code;
  this.data         = data;
 
}



function DsMessage(zticDomx, dsrawMsgArrayx) {
    this.zticDom   = zticDomx;
////    this.tn_prefix = zticDomx.tn_prfx;
//    this.filename = filenamex;
    this.DsLineArray = [];
    this.ZtRawMessageArray = dsrawMsgArrayx;
   // this.ZtRawMessageArray = [];
    this.DsMessageArray = [];
    this.ZTIC_Array     = [];
    this.OEupdateWA_Array = [];
    this.ObjectTemplateWA_Array = [];
    this.TypeValueUpdateWA_Array = [];
    this.LinkUpdateWA_Array = [];
//    this.bjectTemplateWA_Array = [];
    this.objectTemplateWA_Array = [];
    this.UpdateArray = [];
  }




module.exports = ZtMessageBuilder;
