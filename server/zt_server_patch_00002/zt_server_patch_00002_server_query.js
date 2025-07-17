class ZtQuery {

// 20200403  modified to work as a standard function

////   // constructor(svr1x,msgx,ZtObjectElement_ARx,ZtObjectTypeValue_ARx,ZtObjectLink_ARx) {  (del) 20200403
////    constructor(svr1x,msgx) {                                                              //     20200403
////    this.svr1 = svr1x;
////    this.msg = msgx;
////    //this.ZtObjectElement_AR = ZtObjectElement_ARx;          //(del) 20200403
////    this.ZtObjectElement_AR = svr1x.ZtObjectElement_AR;       //      20200403
////    //this.ZtObjectTypeValue_AR     = ZtObjectTypeValue_ARx;  //(del) 20200403
////    this.ZtObjectTypeValue_AR = svr1x.ZtObjectTypeValue_AR;   //      20200403
////    //this.ZtObjectLink_AR    = ZtObjectLink_ARx;             //(del) 20200403
////    this.ZtObjectLink_AR  = svr1x.ZtObjectLink_AR;            //      20200403    
////  }


constructor(svr1x, msgx, parameter_AR) {
  this.svr1  =  svr1x;
  this.msg   =  msgx;
  this.parameter_AR = parameter_AR;
  this.ZtObjectElement_AR = svr1x.ZtObjectElement_AR;       
  this.ZtObjectTypeValue_AR = svr1x.ZtObjectTypeValue_AR;  
  this.ZtObjectLink_AR  = svr1x.ZtObjectLink_AR; 
            
} // end of constructor


//     process() {                 //(del) 20200403
  execute(){                       //      20200403

//console.log("running query function execute in ds2b00002");

   this.select();
   this.displaySelection();
   this.buildResponse();

   require('dotenv').config();  // 20240227



   for (var i = 0; i < this.msg.queryResponseSetMemberWA_AR.length; i++) {
   // console.log("20200405 server query this.msg.queryResponseSetMemberWA_AR[i].setMemberID: "+this.msg.queryResponseSetMemberWA_AR[i].setMemberID);

 // console.log("this.msg.querySelectionSetMemberWA_AR.length 20190915: "+this.msg.querySelectionSetMemberWA_AR.length);
   for (var j = 0; j < this.msg.querySelectionSetMemberWA_AR.length; j++) {

      var qsswa = this.msg.querySelectionSetMemberWA_AR[j];
    //  console.log("QSSWA rec values: "+ qsswa.rawMsg_idx+"-"+qsswa.querySetWA_rawMsg_idx+"-"+qsswa.selectionGroupNumber);


   } // endfor querySelectionSetWA_AR

}  //end loop through this.msg.queryResponseSetMemberWA_AR







console.log("listing this.msg.ZtMessageResponse_Array and end of query process in ds2b00002_server_query.js TEMP DEL REVISIT to ACTIVATE");
for (i = 0; i < this.msg.ZtMessageResponse_Array.length; i++){

}// endfor

}  // end of process




select() {
 // console.log("running select method in ds2b00002_server_query");


  var get_all_values_call_count = 0;  // 20241220


var target_tab_name_prfx;
for (var i = 0; i < this.svr1.ZtSysParams_AR.length; i++) {
   if(this.svr1.ZtSysParams_AR[i].parameterName.toString().trim() == "targetNS" && this.svr1.ZtSysParams_AR[i].value.toString().substring(5).trim() == this.msg.TargetNS.toString().trim()){
      target_tab_name_prfx = this.svr1.ZtSysParams_AR[i].value.substring(0,5).toString().trim();
   }  // endif
} // endfor

//console.log("20200921 **^ target_tab_name_prfx: "+target_tab_name_prfx);
// end 20200921



  var base_ztic = this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim();  // 20200813

   //console.log("20241220a this.msg.querySetMemberWA_AR.length:  "+this.msg.querySetMemberWA_AR.length);
   for (var i = 0; i < this.msg.querySetMemberWA_AR.length; i++) {



      var QRespSetMbrWArec = new QueryResponseSetMemberWorkAreaRec();
      QRespSetMbrWArec.setMemberID = this.msg.querySetMemberWA_AR[i].setMemberID;

// start 20210721
    //  for (var j = 0; j < this.msg.querySetMemberWA_AR[i].statusExclusion_AR.length; j++){
    //    console.log("Excluded Status: "+this.msg.querySetMemberWA_AR[i].statusExclusion_AR[j]);
    //  }
// end 20210721


      var qRespSetMember_idx = this.msg.queryResponseSetMemberWA_AR.push(QRespSetMbrWArec) -1;

  //    console.log("20200405f this.msg.querySetMemberWA_AR[i].setMemberID/OT_ztic/OT_code:  "+this.msg.querySetMemberWA_AR[i].setMemberID+"/"+this.msg.querySetMemberWA_AR[i].objectTemplateZTIC+"/"+this.msg.querySetMemberWA_AR[i].objectTemplateCode);
     // console.log("this.msg.querySetMemberWA_AR[i].selectionSet_idx_AR.length:  "+this.msg.querySetMemberWA_AR[i].selectionSetMember_idx_AR.length);

      var templateKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim() + "_2_" + this.msg.querySetMemberWA_AR[i].objectTemplateZTIC.toString().trim() +"_" + this.msg.querySetMemberWA_AR[i].objectTemplateCode.toString().trim();
// start 20200813 find object kind ztic and kind code using template ztic and template code in message elements 3101 and 3012
   ////   console.log("20201109 templateKeyStr: "+templateKeyStr);
      var template_def_idx = this.svr1.ZtObject_idx_HM.get(templateKeyStr);                                // 20200813 - moved to here from below
      var template_def_obj = this.svr1.ZtObject_AR[template_def_idx];                                      // 20200813
      var obj_kind_idx = template_def_obj.getTypeValueIdxForTypeDef(base_ztic, "3", this.svr1.time.now()); // 20200813  obj kind for template
      var obj_kind_obj = this.svr1.ZtObject_AR[obj_kind_idx];                                              // 20200813
      var obj_kind_objZTIC = obj_kind_obj.objZTIC;                                                         // 20200813
      var obj_kind_objCode = obj_kind_obj.objCode;                                                         // 20200813
// end 20200813

      for (var j = 0; j < this.msg.querySetMemberWA_AR[i].selectionSetMember_idx_AR.length; j++) {
       //  console.log(".selectionGroupNumber:  "+this.msg.querySelectionSetMemberWA_AR[this.msg.querySetMemberWA_AR[i].selectionSetMember_idx_AR[j]].selectionGroupNumber);
   
        var qSelSetMbr = this.msg.querySelectionSetMemberWA_AR[this.msg.querySetMemberWA_AR[i].selectionSetMember_idx_AR[j]];
     ////   console.log("20200405g qSelSetMbr.objectSelectionSetMember_idx_AR.length:"+qSelSetMbr.objectSelectionSetMember_idx_AR.length); 
         // start 20240119  get selection set for query object selection set member
          const selectedObject_idx_AR = this.getArrayOfSelectedObjectsForQueryObjectSelectionSetMemberArray(qSelSetMbr.objectSelectionSetMember_idx_AR, obj_kind_objZTIC, obj_kind_objCode);
         // console.log("20250106a selectedObject_idx_AR.length: "+selectedObject_idx_AR.length);
         // end 20240119  get selection set for query object selection set member array
         //console.log("20241220d qSelSetMbr.objectSelectionSetMember_idx_AR.length: "+qSelSetMbr.objectSelectionSetMember_idx_AR.length);
        for (var k = 0; k < qSelSetMbr.objectSelectionSetMember_idx_AR.length; k++) {
         //  console.log("20240118bb usage_type_code: "+ this.msg.queryObjectSelectionSetMemberWA_AR[qSelSetMbr.objectSelectionSetMember_idx_AR[k]].usage_type_code);
           var qObjSelSetMbr =     this.msg.queryObjectSelectionSetMemberWA_AR[qSelSetMbr.objectSelectionSetMember_idx_AR[k]];
     ////      console.log("20200405h qObjSelSetMbr.objectSetMember_idx_AR.length: "+qObjSelSetMbr.objectSetMember_idx_AR.length);
           //console.log("20191110 this.svr1.ZtObject_AR.length: "+this.svr1.ZtObject_AR.length);
           //for (var m = 0; m < this.svr1.ZtObject_AR.length; m++) { // (del) 20230120
             for (var m = 0; m < selectedObject_idx_AR.length; m++) {  // 20240120
                //var objx = this.svr1.ZtObject_AR[m];  (del) 20240121
                  var objx = this.svr1.ZtObject_AR[selectedObject_idx_AR[m]];  // 20240121
                //console.log("20191209 qObjSelSetMbr.objectSetMember_idx_AR.length: "+qObjSelSetMbr.objectSetMember_idx_AR.length);
          //      for (var l = 0; l < qObjSelSetMbr.objectSetMember_idx_AR.length; l++) {  (del) 20240121
                //  console.log("20191111 this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindZTIC: "+this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindZTIC+"-"+ objx.kindZTIC);
                 // console.log("20191110 objectCode: "+this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectCode);
                 // if (obj_kind_objZTIC  == objx.kindZTIC){   //20200813   (del) 20200921
           //      if (obj_kind_objZTIC  == objx.kindZTIC && objx.dbzti_id == target_tab_name_prfx){          (del) 20240121
           //        if (obj_kind_objCode  == objx.kindCode){  //20200813                                    (del) 20240121

      //             if (this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindZTIC  == objx.kindZTIC){ (del) 20200813
      //              if (this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindCode  == objx.kindCode){(del) 20200813

                 // console.log("20191209 this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectZTIC: "+this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectZTIC+"-"+ objx.objZTIC);

                 //     if (this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectZTIC      == objx.objZTIC || this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectZTIC.toString().trim() == "*"){  (del) 20240121

                 //     if (this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectCode      == objx.objCode || this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectCode.toString().trim() == "*"){  (del) 20240121
                           //console.log("ZTIC: "+this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindZTIC);
                       //    console.log("20191026 objx.kindZTIC__objx.kindCode: "+objx.kindZTIC+"__"+objx.kindCode);


                           var qRespObj = new QueryResponseObjectWorkAreaRec();
                          // qRespObj.object_idx = m;   // specific object queried (del) 20240120
                           qRespObj.object_idx = selectedObject_idx_AR[m];  // 20240120
                          // this.msg.queryResponseSetMemberWA_AR[qRespSetMember_idx].object_idx_AR.push(m);  //to be deprecated 20200124 (del) 20240120
                           this.msg.queryResponseSetMemberWA_AR[qRespSetMember_idx].object_idx_AR.push(selectedObject_idx_AR[m]);  // 20240120
                           // start-get all values for object 20191106
                           // console.log("20231122a templateKeyStr: "+templateKeyStr);
                        //(del) 20200813 moved above    var template_def_idx = this.svr1.ZtObject_idx_HM.get(templateKeyStr);
                            var resp_item_AR = [];
                         //   console.log("20231122b template_idx in ds2b00002_server_query: "+template_def_idx);
                         //   console.log("objx.objZTIC - objx.objCode: "+objx.objZTIC +" - "+ objx.objCode);
                         get_all_values_call_count++;  // 20241220
                            resp_item_AR = objx.getAllValuesForTemplateDef( template_def_idx, this.msg, this.svr1.time.now(), this.msg.querySetMemberWA_AR[i].statusExclusion_AR );
                         //   console.log("20231122c resp_item_AR list -- resp_item_AR.length: "+resp_item_AR.length);
                            for (var n = 0; n < resp_item_AR.length; n++) {
                               //console.log("20200706a resp_item_AR[n].levelsDown: "+resp_item_AR[n].levelsDown);
                               var set_def_idx = this.msg.queryResponseSetMemberWA_AR[qRespSetMember_idx].objectResponseItem_AR.push(resp_item_AR[n]) -1;  //20200124
                               // 20201106 start if selected object is a object set definition, add index to array so that set members can be returned if needed
                                  if(resp_item_AR[n].kindZTIC == base_ztic && resp_item_AR[n].kindCode == "13"){   // object is an object set definition
                                    this.msg.queryResponseSetMemberWA_AR[qRespSetMember_idx].objectResponseItemsThatAreSetDefs_idx_AR.push(set_def_idx);  // store index
                                  } // endif object is a set definition
                               // 20201106 end if object is a set, add to array so that set members can be returned


                            } // endfor loop through resp_item_AR


             //   } // endfor  (del) 20240121
           } // end of loop through this.svr1.ZtObject_AR.length; changed to selectedObject_idx_AR 20240121
           //console.log("objectSelectionSetMember_idx_AR[k].usage: "+ qSelSetMbr.objectSelectionSetMember_idx_AR[k].usage);
        } // endfor
 
      }// endfor




   } // end loop through querySetMemberWA_AR

//console.log("20241220e get_all_values_call_count: "+get_all_values_call_count);

}  // end of select


displaySelection() {

  //console.log("running display selection");
     for (var i = 0; i < this.msg.queryResponseSetMemberWA_AR.length; i++) {

         for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR[i].object_idx_AR.length; j++) {
               var obj_idx = this.msg.queryResponseSetMemberWA_AR[i].object_idx_AR[j];
   ////         console.log("Object: "+this.svr1.ZtObject_AR[obj_idx].kindZTIC+"-"+this.svr1.ZtObject_AR[obj_idx].kindCode+"-"+this.svr1.ZtObject_AR[obj_idx].objZTIC+"-"+this.svr1.ZtObject_AR[obj_idx].objCode);
      //this.dbzti_id = dbzti_id.trim();
      //this.kindZTIC = kindZTIC.trim();
      //this.kindCode = kindCode.trim();
      //this.objZTIC  = objZTIC.trim();
      //this.objCode  = objCode.trim();

         }  //endfor object_idx_AR
     
     } //endfor queryResponseSetMemberWA_AR

} // end of displaySelection()



  buildResponse()  {

//console.log("running buildResponse");

var get_all_values_call_count2 = 0;  // 20241220
var get_all_values_call_count3 = 0;  // 20241220
var get_all_values_call_count4 = 0;  // 20241220   
var get_all_values_call_count5 = 0;  // 20241220





 
//this.msg.queryResponseSetMemberWA_AR[qRespSetMember_idx].objectResponseItem_AR    
 var queryResponseSet_idx;
 var queryResponseTopObject = false;    // 20231128
     for (var i = 0; i < this.msg.queryResponseSetMemberWA_AR.length; i++) {
        if(i == 0){queryResponseSet_idx = this.queryResponseInit();}
        var responseType2_found = false;
        var respTyp = "1";
        this.queryResponseSetMemberAdd(queryResponseSet_idx, this.msg.queryResponseSetMemberWA_AR[i].setMemberID, respTyp, "", "");
        
   // console.log("20200126d this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR.length: "+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR.length);
         for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR.length; j++) {  
        //   console.log("20200527 this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].responseType: "+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].responseType);
           if(this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].responseType.toString().trim() == "1"){      // 20200527
        //    console.log("20231201a this.msg.queryResponseSetMemberWA_AR[i].setMemberID: "+this.msg.queryResponseSetMemberWA_AR[i].setMemberID);
            if(j == 0 && this.msg.queryResponseSetMemberWA_AR[i].setMemberID == "ObjectQset"){queryResponseTopObject = true;}  // 20231130

             this.queryResponseObjectAdd(this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j], queryResponseTopObject); //20200124
             queryResponseTopObject = false;
             }
             else{   responseType2_found = true;      // 20200527
           } // endif 20200527 
  //   console.log("Object: "+this.svr1.ZtObject_AR[obj_idx].kindZTIC+"-"+this.svr1.ZtObject_AR[obj_idx].kindCode+ "-"+this.svr1.ZtObject_AR[obj_idx].objZTIC+"-"+this.svr1.ZtObject_AR[obj_idx].objCode);
         }  //endfor object_idx_AR changed to ..objectResponseItem_AR
         

   // begin 20200529 add link type for linkable objects
         var linkableObjectLinkType_ztic = "";
         var linkableObjectLinkType_code = "";
         for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR.length; j++) { 
           if(this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].responseType.toString().trim() == "2"){      // 20200527
            if(this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].linkableObjectLinkType_ztic != ""){
             linkableObjectLinkType_ztic = this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].linkableObjectLinkType_ztic;
             linkableObjectLinkType_code = this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].linkableObjectLinkType_code;

             var msg_linkableObjectLinkType_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, linkableObjectLinkType_ztic);  //  20200805
             var respTyp = "2";                                                                                               //  20200805
        this.queryResponseSetMemberAdd(queryResponseSet_idx, this.msg.queryResponseSetMemberWA_AR[i].setMemberID+":2:"+msg_linkableObjectLinkType_ztic+"_"+ linkableObjectLinkType_code, respTyp, msg_linkableObjectLinkType_ztic, linkableObjectLinkType_code);                          //20200805


             //this.queryResponseObjectAdd(this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j]); 
            } // endif
  
             this.queryResponseObjectAdd(this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j]); //20200124
        
         }  // 20200805 endif responseType == 2
  //   console.log("Object: "+this.svr1.ZtObject_AR[obj_idx].kindZTIC+"-"+this.svr1.ZtObject_AR[obj_idx].kindCode+ "-"+this.svr1.ZtObject_AR[obj_idx].objZTIC+"-"+this.svr1.ZtObject_AR[obj_idx].objCode);
         }  //endfor object_idx_AR changed to ..objectResponseItem_AR


// end 20200527
     
     } //endfor queryResponseSetMemberWA_AR







var base_ztic = this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim();  
var get_values_maxLevelsDown = 0;   // 20230407

var techProfileIdx_ARx = [];   // 20241230

///// var queryResponseSet_idx;
for (var i = 0; i < this.msg.queryResponseSetMemberWA_AR.length; i++) {
/////        if(i == 0){queryResponseSet_idx = this.queryResponseInit();}
/////        var responseType2_found = false;
      var respTyp = "5";
/////        this.queryResponseSetMemberAdd(queryResponseSet_idx, this.msg.queryResponseSetMemberWA_AR[i].setMemberID, respTyp, "", "");
        
/////   // console.log("20200126d this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR.length: "+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR.length);
      for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR.length; j++) { 
         //check if object is a set
         if (this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindZTIC.toString().trim() == base_ztic && this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindCode.toString().trim() == "13") {

            var setKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindZTIC.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindCode.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objZTIC.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objCode.toString().trim();
         //   console.log("%%% 20230406 setKeyStr: "+setKeyStr);
            var set_object_idx = this.svr1.ZtObject_idx_HM.get(setKeyStr);
            const serverSetStr = process.env.ZT_SERVER_HOME_DIR + "/zt_server_set";  // 20240227
            //var msgSetObj = new (require('./ds2b00002_server_set'))( this.svr1, set_object_idx, this.msg ); //(del) 20240227
            var msgSetObj = new (require(serverSetStr))( this.svr1, set_object_idx, this.msg );  // 20240227
            this.queryResponseSetMemberAdd_forSet(queryResponseSet_idx, this.msg.queryResponseSetMemberWA_AR[i].setMemberID+":5:"+msgSetObj.setObj.objZTIC+"_"+msgSetObj.setObj.objCode, respTyp, msgSetObj.setObj.objZTIC, msgSetObj.setObj.objCode);  // moved above for loop 20201109 

            var setMember_AR = msgSetObj.getMember_AR(this.svr1.time.now());
          //  console.log("%%%m 20220213 setMember_AR.length: "+setMember_AR.length);
            for (var k = 0; k < setMember_AR.length; k++) {
  

          // find  template_def_idx_for_set_member
          //    get object kind of set member
     ////        console.log("%20201109 setMember_AR[k]: "+setMember_AR[k]);
             //var setMemberObjKindKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+base_ztic+"_1_"+msgSetObj.setObj.kindZTIC+"_"+msgSetObj.setObj.kindCode; (del) 20201111
 var setMemberObjKindKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+base_ztic+"_1_"+this.svr1.ZtObject_AR[setMember_AR[k]].kindZTIC+"_"+this.svr1.ZtObject_AR[setMember_AR[k]].kindCode;  // 20201111
     ////        console.log("%20201111 setMemberObjKindKeyStr: "+setMemberObjKindKeyStr);
             var set_member_object_kind_idx = this.svr1.ZtObject_idx_HM.get(setMemberObjKindKeyStr);
     ////        console.log("%20201111 set_member_object_kind_idx: "+ set_member_object_kind_idx);
             var setMemberObjKindObj = this.svr1.ZtObject_AR[set_member_object_kind_idx];   
             var type_val_idx_for_template_of_set_member = setMemberObjKindObj.getTypeValueIdxSingle(base_ztic, "22", this.svr1.time.now()); //default minimal templ 

            // var templDefForSetMbrKeyStr =     this.msg.dbZtI_id.toString().trim() + "_"+
            //                          this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeDef_ztic+"_"+  
            //                          this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeDef_code+"_"+  
            //                          this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeValue_ztic+"_"+  
            //                          this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeValue_code;    (del) 20210314

            var templDefForSetMbrKeyStr =     this.msg.dbZtI_id.toString().trim() + "_"+
                                        base_ztic+"_2_"+
                                        this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeValue_ztic+"_"+  
                                        this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeValue_code;     // 20210314

      ////       console.log("%20210314 templDefForSetMbrKeyStr: "+templDefForSetMbrKeyStr);
             var template_def_idx_for_set_member = this.svr1.ZtObject_idx_HM.get(templDefForSetMbrKeyStr);
 
      ////       console.log("%20201111 template_def_idx_for_set_member: "+template_def_idx_for_set_member);
      //   var resp_item_for_set_member_AR = this.svr1.ZtObject_AR[setMember_AR[k]].getAllValuesForTemplateDef(template_def_idx_for_set_member, this.msg, this.svr1.time.now()); //(del) 20211215
     //var resp_item_for_set_member_AR = this.svr1.ZtObject_AR[setMember_AR[k]].getAllValuesForTemplateDef(template_def_idx_for_set_member, this.msg, this.svr1.time.now(), this.msg.querySetMemberWA_AR[i].statusExclusion_AR);  // 20211215 (del) 20230407
             get_all_values_call_count2++;  // 20241220
             var resp_item_for_set_member_AR = this.svr1.ZtObject_AR[setMember_AR[k]].getAllValuesForTemplateDef(template_def_idx_for_set_member, this.msg, this.svr1.time.now(), this.msg.querySetMemberWA_AR[i].statusExclusion_AR, get_values_maxLevelsDown );      
                               
             for (var l = 0; l < resp_item_for_set_member_AR.length; l++) {
     ////           console.log("%20201109 resp_item_for_set_member_AR[l].objElemIdx_AR.length:"+ resp_item_for_set_member_AR[l].objElemIdx_AR.length);
                this.queryResponseObjectAdd(resp_item_for_set_member_AR[l]); 
             } // endfor  loop through resp_item_for_set_member_AR
            }  // endfor loop through setMember_AR

         } // endif object is a set



// start insert for statistical values object add to response message 20230530
         //check if object is a statistical values object
         if (this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindZTIC.toString().trim() == base_ztic && this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindCode.toString().trim() == "58") {
             // 20230530  add the logic in here to create a statistical values object, get its values and add the values to the response message
             // un-comment below when ready
             var stat_values_obj_KeyStr = this.msg.dbZtI_id.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindZTIC.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindCode.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objZTIC.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objCode.toString().trim();
            // console.log("%%% 20230530 stat_val_obj_KeyStr: "+stat_values_obj_KeyStr);
             var stat_values_object_idx = this.svr1.ZtObject_idx_HM.get(stat_values_obj_KeyStr);
             var stat_values_object_ztic = this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objZTIC.toString().trim();
             var stat_values_object_code = this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objCode.toString().trim();
                                                          
             var statisticalValuesObj = new (require('./ds2b00002_server_statistical_values_object'))( this.svr1, this.msg, stat_values_object_ztic, stat_values_object_code);
             statisticalValuesObj.addStatisticalValuesToResponseMessage();  //TEMP DEL 20230715 
             ////??this.queryResponseSetMemberAdd_forStatisticalValuesObject(queryResponseSet_idx, this.msg.queryResponseSetMemberWA_AR[i].setMemberID+":5:"+msgSetObj.setObj.objZTIC+"_"+msgSetObj.setObj.objCode, respTyp, msgSetObj.setObj.objZTIC, msgSetObj.setObj.objCode);  // moved above for loop 20201109 
 
             ////??var statisticalValues_AR = statisticalValuesObj.getStatisticalValues_AR(this.svr1.time.now());
             ////??console.log("%%%m 20230530 statisticalValues_AR.length: "+statisticalValues_AR.length);
           

         }  // endif object is a statistical values object
// end insert for statistical values object add 20230530


         // begin insert 20210103 (code was initially copied directly above)  return response type 6, object set members for sets that are referred to as type values for an object

         //check if object has a type value that is a set

         // 1. find type definitions for type values of the object 

         //  loop through type values for objectResponseItem

         var template_def_idx_for_set_member_previous = null;  // 20241231
        
         //console.log("20241221c this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR.length: "+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR.length);
            for (var p = 0; p < this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR.length; p++) {
                var typeDefKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+base_ztic+"_9_"+this.svr1.ZtObjectTypeValue_AR[this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR[p]].typeDef_ztic+"_"+this.svr1.ZtObjectTypeValue_AR[this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR[p]].typeDef_code;
               // console.log(" ");
       ////         console.log("+ 20210104 typeDefKeyStr: "+typeDefKeyStr);
          //     console.log("20241223a this.msg.queryResponseSetMemberWA_AR[i].setMemberID: "+this.msg.queryResponseSetMemberWA_AR[i].setMemberID); 
                var typeDef_idx = this.svr1.ZtObject_idx_HM.get(typeDefKeyStr);
                var typeDefObj  = this.svr1.ZtObject_AR[typeDef_idx];
                var objKind_idx = typeDefObj.getTypeValueIdxForTypeDef(base_ztic, "4", this.svr1.time.now());   // find object kind for a type definition
                var objKindObj  = this.svr1.ZtObject_AR[objKind_idx];
         // 2. find if the object kind related to the type definition is a set

                  // objectQset
                  // ObjTmplQset 
                if(objKindObj.objZTIC == base_ztic && objKindObj.objCode == "13"){ //(del) 20241223            // if object kind for type def is a set
                //if(objKindObj.objZTIC == base_ztic && objKindObj.objCode == "13"  && !(this.msg.queryResponseSetMemberWA_AR[i].setMemberID == "ObjTmplQset")){  // 20241223  if object kind for type def is a set and the query is not for a template
                //  console.log("20241222a response object: "+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindZTIC+"-"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindCode+"-"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objZTIC+"-"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objCode);
            var setKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+base_ztic+"_13_"+this.svr1.ZtObjectTypeValue_AR[this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR[p]].typeValue_ztic.toString().trim()+"_"+this.svr1.ZtObjectTypeValue_AR[this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR[p]].typeValue_code.toString().trim();
       ////     console.log(" ");
          //  console.log("20241221b setKeyStr: "+setKeyStr);
            var set_object_idx = this.svr1.ZtObject_idx_HM.get(setKeyStr);
       ////     console.log("%%%b 20210217 set_object_idx: "+set_object_idx);
            const serverSetStr = process.env.ZT_SERVER_HOME_DIR + "/zt_server_set";  // 20240227
            //var msgSetObj = new (require('./ds2b00002_server_set'))( this.svr1, set_object_idx, this.msg ); // (del) 20240227
            var msgSetObj = new (require(serverSetStr))( this.svr1, set_object_idx, this.msg );  // 20240227
           // console.log("%%%m 20230406 set id: "+this.msg.queryResponseSetMemberWA_AR[i].setMemberID+":6:"+msgSetObj.setObj.objZTIC+"_"+msgSetObj.setObj.objCode);
            this.queryResponseSetMemberAdd_forSet(queryResponseSet_idx, this.msg.queryResponseSetMemberWA_AR[i].setMemberID+":6:"+msgSetObj.setObj.objZTIC+"_"+msgSetObj.setObj.objCode, respTyp, msgSetObj.setObj.objZTIC, msgSetObj.setObj.objCode);  

            var setMember_AR = msgSetObj.getMember_AR(this.svr1.time.now());  // test del 20241221
           // console.log("20241221a setMember_AR.length: "+setMember_AR.length);
            for (var k = 0; k < setMember_AR.length; k++) {


          // find  template_def_idx_for_set_member
          //    get object kind of set member
          ////   console.log("+ 20210104 setMember_AR[k]: "+setMember_AR[k]);
             //var setMemberObjKindKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+base_ztic+"_1_"+msgSetObj.setObj.kindZTIC+"_"+msgSetObj.setObj.kindCode; (del) 20201111
 var setMemberObjKindKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+base_ztic+"_1_"+this.svr1.ZtObject_AR[setMember_AR[k]].kindZTIC+"_"+this.svr1.ZtObject_AR[setMember_AR[k]].kindCode;  // 20201111
          ////   console.log("+ 20210104 setMemberObjKindKeyStr: "+setMemberObjKindKeyStr);
             var set_member_object_kind_idx = this.svr1.ZtObject_idx_HM.get(setMemberObjKindKeyStr);
          ////   console.log("+ 20210104 set_member_object_kind_idx: "+ set_member_object_kind_idx);
             var setMemberObjKindObj = this.svr1.ZtObject_AR[set_member_object_kind_idx];   
             var type_val_idx_for_template_of_set_member = setMemberObjKindObj.getTypeValueIdxSingle(base_ztic, "22", this.svr1.time.now()); //default minimal templ 

             //var templDefForSetMbrKeyStr =     this.msg.dbZtI_id.toString().trim() + "_"+
             //                         this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeDef_ztic+"_"+
             //                         this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeDef_code+"_"+ 
             //                         this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeValue_ztic+"_"+  
             //                         this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeValue_code;    (del) 20210218

             var templDefForSetMbrKeyStr =     this.msg.dbZtI_id.toString().trim() + "_"+
                                      base_ztic+"_2_"+
                                      this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeValue_ztic+"_"+  
                                      this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_set_member].typeValue_code;     // 20210218

         // 3. get the members of the set and put into response as a type 6 response
           ////  console.log("%%%i 20210217 templDefForSetMbrKeyStr: "+templDefForSetMbrKeyStr);
             var template_def_idx_for_set_member = this.svr1.ZtObject_idx_HM.get(templDefForSetMbrKeyStr);
             //console.log("%%%i 20210217 template_def_idx_for_set_member: "+template_def_idx_for_set_member);
             //console.log("+ 20210104 template_def_idx_for_set_member: "+template_def_idx_for_set_member);
      // var resp_item_for_set_member_AR = this.svr1.ZtObject_AR[setMember_AR[k]].getAllValuesForTemplateDef(template_def_idx_for_set_member, this.msg, this.svr1.time.now()); //(del) 20211215
      // const get_values_maxLevelsDown = 0;   // 20230407
       //var resp_item_for_set_member_AR = this.svr1.ZtObject_AR[setMember_AR[k]].getAllValuesForTemplateDef(template_def_idx_for_set_member, this.msg, this.svr1.time.now(), this.msg.querySetMemberWA_AR[i].statusExclusion_AR);  // 20211215 (del) 20230407
         get_all_values_call_count3++;  // 20241220

         if (template_def_idx_for_set_member != template_def_idx_for_set_member_previous) {  // 20241231
          techProfileIdx_ARx = this.svr1.ZtObject_AR[setMember_AR[k]].getTechnicalProfileIdx_AR_ForTemplateDef(template_def_idx_for_set_member, this.svr1.time.now());  // 20241230
          template_def_idx_for_set_member_previous = template_def_idx_for_set_member;  // 20241231
         }

         //techProfileIdx_ARx = this.svr1.ZtObject_AR[setMember_AR[k]].getTechnicalProfileIdx_AR_ForTemplateDef(template_def_idx_for_set_member, this.svr1.time.now());  // 20241230

       //var resp_item_for_set_member_AR = this.svr1.ZtObject_AR[setMember_AR[k]].getAllValuesForTemplateDef(template_def_idx_for_set_member, this.msg, this.svr1.time.now(), this.msg.querySetMemberWA_AR[i].statusExclusion_AR, get_values_maxLevelsDown);  // (del) 20241230
       var resp_item_for_set_member_AR = this.svr1.ZtObject_AR[setMember_AR[k]].getAllValuesForTemplateDef2(template_def_idx_for_set_member, this.msg, this.svr1.time.now(), this.msg.querySetMemberWA_AR[i].statusExclusion_AR, get_values_maxLevelsDown, techProfileIdx_ARx); // 20241230
      //console.log("%%%o 20220213 resp_item_for_set_member_AR.length: "+resp_item_for_set_member_AR.length);
      for (var l = 0; l < resp_item_for_set_member_AR.length; l++) {
            ////  console.log("%%%p 20220213 resp_item_for_set_member_AR[l].objElemIdx_AR.length:"+ resp_item_for_set_member_AR[l].objElemIdx_AR.length);
            //  if(resp_item_for_set_member_AR[l].levelsDown == 0){            // 20230406  (del) 20230407 replace by get_values_maxLevelsDown parameter
                this.queryResponseObjectAdd(resp_item_for_set_member_AR[l]); 
            //  } // endif 20230406  don't go down any levels when getting values for set members  (del) 20230407
             } // endfor  loop through resp_item_for_set_member_AR
            }  // endfor loop through setMember_AR


            } // endif object kind for type def is a set

          }  // endfor loop through type values for response item 

   
         // end insert 20210103



         // start insert 20231110  to get template for type based template rule
//       this.queryResponseTVBTR_ObjectAndTemplate_AR = [];   //added 20231127 uses QueryResponseTypeValueBasedTemplateRuleObjectAndTemplateRec()
         

        //         //check if object is a type value based template rule
       if (this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindZTIC.toString().trim() == base_ztic && this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindCode.toString().trim() == "5") {
        // console.log("20240111gg this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objZTIC: "+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objZTIC); 
        // console.log("20240111hh this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objCode: "+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objCode); 
         for (var p = 0; p < this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR.length; p++) {
            //  check if type def is for template for type value based template rule
            if(this.svr1.ZtObjectTypeValue_AR[this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR[p]].typeDef_ztic == base_ztic && this.svr1.ZtObjectTypeValue_AR[this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR[p]].typeDef_code == "38"){

               let templZTIC_locl = this.svr1.ZtObjectTypeValue_AR[this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR[p]].typeValue_ztic;
               let templCode_locl =  this.svr1.ZtObjectTypeValue_AR[this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].typeValueIdx_AR[p]].typeValue_code;
               let templForTypeBasedTemplateRuleKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+base_ztic+"_2_"+templZTIC_locl+"_"+templCode_locl;
               let template_def_idx_for_type_val_based_template_rule = this.svr1.ZtObject_idx_HM.get(templForTypeBasedTemplateRuleKeyStr);
             //  console.log("20240111ii template_def_idx_for_type_val_based_template_rule: "+template_def_idx_for_type_val_based_template_rule); 
               var templateObjForTypeValBasedTemplateRule = this.svr1.ZtObject_AR[template_def_idx_for_type_val_based_template_rule];
               var templDefForTemplateKeyStr =     this.msg.dbZtI_id.toString().trim() + "_"+base_ztic+"_2_"+base_ztic+"_2";
               var template_def_idx_for_template = this.svr1.ZtObject_idx_HM.get(templDefForTemplateKeyStr);
               var respTyp = "7";
               this.queryResponseSetMemberAdd_forSet(queryResponseSet_idx, this.msg.queryResponseSetMemberWA_AR[i].setMemberID+":7:"+templZTIC_locl+"_"+templCode_locl, respTyp, templZTIC_locl, templCode_locl);
               get_values_maxLevelsDown = 999;
               get_all_values_call_count4++;  // 20241220
               var resp_item_for_template_AR = templateObjForTypeValBasedTemplateRule.getAllValuesForTemplateDef(template_def_idx_for_template, this.msg, this.svr1.time.now(), this.msg.querySetMemberWA_AR[i].statusExclusion_AR, get_values_maxLevelsDown); 

               get_values_maxLevelsDown = 0;

// start 20231129
              //console.log("20240111jj this.msg.queryResponseTopObjectKeyStr: "+this.msg.queryResponseTopObjectKeyStr);
              if(!this.msg.queryResponseTopObjectKeyStr == ""){    // 20231130
                 var queryResp_TVBTR_obj_and_templ_rec = new QueryResponseTypeValueBasedTemplateRuleObjectAndTemplateRec(); 
               //  console.log("20231201b this.msg.queryResponseTopObjectKeyStr: "+this.msg.queryResponseTopObjectKeyStr);               
                 queryResp_TVBTR_obj_and_templ_rec.object_idx =  this.svr1.ZtObject_idx_HM.get(this.msg.queryResponseTopObjectKeyStr);
                 queryResp_TVBTR_obj_and_templ_rec.TVBTR_template_object_idx = template_def_idx_for_type_val_based_template_rule;
                 queryResp_TVBTR_obj_and_templ_rec.parent_msg_idx = this.msg.queryResponseTopObject_elemSetIdx;
                 this.msg.queryResponseTVBTR_ObjectAndTemplate_AR.push(queryResp_TVBTR_obj_and_templ_rec);
                // this.msg.queryResponseTopObjectKeyStr = "";  // 20231201  TEST (del) 20240111
              }  // endif setMemberID == ObjectQset
// end 20231129

             //  console.log("%%%o 20231110 resp_item_for_template_AR.length: "+resp_item_for_template_AR.length);
               for (var l = 0; l < resp_item_for_template_AR.length; l++) {
                 //  console.log("%%%p 20231110 resp_item_for_template_AR[l].objElemIdx_AR.length:"+ resp_item_for_template_AR[l].objElemIdx_AR.length);
                         this.queryResponseObjectAdd(resp_item_for_template_AR[l]);  // TEST (del)
                        // this.TVBTR_queryResponseObjectAdd(resp_item_for_template_AR[l]);  // TEST 20240111
                     //  } // endif 
                      } // endfor  loop through resp_item_for_set_member_AR
            }  //  endif type def is for type val based template rule

         }  // endfor   

       }  // endif object is a type based template rule

         // end insert 20231110


         }  //endfor object_idx_AR changed to ..objectResponseItem_AR


    
} //endfor queryResponseSetMemberWA_AR


/// end 20201018 add set members to response

// start 20231129  add object element data from TVBTR - Type Value Based Template Rules

//this.object_idx                    = "";   //
//this.TVBTR_template_object_idx     = "";
//this.parent_msg_idx                = "";
var TVBTR_resp_item_AR = [];
var topObjectx = false;
//console.log("20240111a this.msg.queryResponseTVBTR_ObjectAndTemplate_AR.length: "+this.msg.queryResponseTVBTR_ObjectAndTemplate_AR.length);
for (var i = 0; i < this.msg.queryResponseTVBTR_ObjectAndTemplate_AR.length; i++) {
  //console.log("20240111b this.msg.queryResponseTVBTR_ObjectAndTemplate_AR[i].object_idx: "+this.msg.queryResponseTVBTR_ObjectAndTemplate_AR[i].object_idx);
  var topObj = this.svr1.ZtObject_AR[this.msg.queryResponseTVBTR_ObjectAndTemplate_AR[i].object_idx];
  //console.log("20240111f this.msg.queryResponseTVBTR_ObjectAndTemplate_AR[i].TVBTR_template_object_idx: "+this.msg.queryResponseTVBTR_ObjectAndTemplate_AR[i].TVBTR_template_object_idx); 
  get_all_values_call_count5++;  // 20241220
  TVBTR_resp_item_AR = topObj.getAllValuesForTemplateDef( this.msg.queryResponseTVBTR_ObjectAndTemplate_AR[i].TVBTR_template_object_idx, this.msg, this.svr1.time.now(), this.msg.querySetMemberWA_AR[i].statusExclusion_AR );

  //console.log("20231130b TVBTR_resp_item_AR.length: "+TVBTR_resp_item_AR.length);
   for (var j = 0; j < TVBTR_resp_item_AR.length; j++) {
     this.TVBTR_queryResponseObjectAdd(TVBTR_resp_item_AR[j], topObjectx);
   } // endfor loop through 
}  // endfor  loop through this.msg.queryResponseTVBTR_ObjectAndTemplate_AR   

// end 20231129



// start 20240216  
//for (var i = 0; i < this.msg.queryResponseMessageStatusWA_AR.length; i++) {   (del) 20250113
var msgStatusInit = false; 
for (var i = 0; i < this.msg.responseMessageStatusWA_AR.length; i++) {     // 20250113
   if(this.msg.responseMessageStatusWA_AR[i].messageStatusCode == "4"){
   //if(this.msg.queryResponseSetMemberWA_AR.length == 0 && i == 0){this.messageStatusInit();}  // (del) 20250113
   if (!msgStatusInit){this.messageStatusInit(); msgStatusInit = true;}  // 20250113

    this.messageStatusAdd(this.msg.responseMessageStatusWA_AR[i]);
   } // endif messageStatusCode == 4
 }  // end loop through responseMessageStatusWA_AR

// end 20240216


// 20200107 start add system message to response
    for (var i = 0; i < this.msg.serverLogSystemMessageWA_AR.length; i++) {
      if(this.msg.queryResponseSetMemberWA_AR.length == 0 && i == 0){this.serverLogSystemMessageInit();}
       this.serverLogSystemMessageAdd(this.msg.serverLogSystemMessageWA_AR[i]);

    }  // end loop through serverLogSystemMessageWA_AR

// 20200107  end add system message to response


// start 20210322 add new ztics to response
 //console.log("**^ 20210323 this.msg.msgZTIC_Array.length: "+this.msg.msgZTIC_Array.length);
 for (var i = 0; i < this.msg.msgZTIC_Array.length; i++) {
    //console.log("
    if(this.msg.msgZTIC_Array[i].response_only){
     
       this.queryResponseZTICAdd(this.msg.msgZTIC_Array[i].msgZTIC, this.msg.msgZTIC_Array[i].namespace);
     
    } // endif 

 }  //endfor



}  // end of buildResponse()


queryResponseInit() {

//console.log("running queryResponseInit in ds2b00002_server_query.js");

// pasted from zt_server_message.js for example
/// // add parent nodes to response message
var resp_next_index = this.msg.ZtRawMessageAR.length;                                       
var resp_parent_index = 1; 
var return_query_response_set_idx;
    
var msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4","");   
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
resp_parent_index = resp_next_index;  
this.msg.responseTopIndex = resp_parent_index;  // 20250116                                                   
resp_next_index++; 
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","43","");      
this.msg.ZtMessageResponse_Array.push(msgRow_resp); 
this.msg.serverLogSystemMessageParentIndex =  resp_next_index;                                           
//resp_parent_index = resp_next_index;                                                        
resp_next_index++;                                                                         
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","41","");      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);
return_query_response_set_idx = resp_next_index;  


this.msg.lastRawMsgIndex = resp_next_index;
this.msg.parentIndexWA1   = resp_next_index;




return return_query_response_set_idx;
} // end of queryResponseInit()






queryResponseSetMemberAdd(query_response_set_idx, setMemberIdx, responseTypex, linkableObjectLinkType_zticx, linkableObjectLinkType_codex){  //20200407
var resp_next_index = this.msg.lastRawMsgIndex + 1;
//var return_object_set_idx;
var resp_parent_index = query_response_set_idx;                                                        
var msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","410","");      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4100",setMemberIdx);      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
 //resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4104",responseTypex);   //20200530    
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
 //resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4105",linkableObjectLinkType_zticx);   //20200530    
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
 //resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4106",linkableObjectLinkType_codex);   //20200530   
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
 //resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4130","");  
//return_object_set_idx = resp_next_index;    
this.msg.ZtMessageResponse_Array.push(msgRow_resp);

// start 20230725  add statistical values
this.msg.parentIndexWA1  = resp_next_index;

resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4180","");  
//return_object_set_idx = resp_next_index;    
this.msg.ZtMessageResponse_Array.push(msgRow_resp);
this.msg.statisticalObjectsParentIndex = resp_next_index;
// end 20230725

this.msg.lastRawMsgIndex = resp_next_index;
//this.msg.parentIndexWA1  = resp_next_index;  (del) 20230725

//return return_object_set_idx;
} // end of queryResponseSetMemberAdd()   //20200407



//start 20201020

queryResponseSetMemberAdd_forSet(query_response_set_idx, setMemberIdx, responseTypex, set_zticx, set_codex){  //20200407
var resp_next_index = this.msg.lastRawMsgIndex + 1;
//var return_object_set_idx;
var resp_parent_index = query_response_set_idx;                                                        
var msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","410","");      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4100",setMemberIdx);      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
 //resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4104",responseTypex);   //20200530    
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
 //resp_parent_index = resp_next_index;                                                        
resp_next_index++;
var set_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, set_zticx);                            //20210104
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","41071",set_msg_ztic);   //20200530    
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
 //resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","41072",set_codex);   //20200530   
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
 //resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4130","");  
//return_object_set_idx = resp_next_index;    
this.msg.ZtMessageResponse_Array.push(msgRow_resp);

this.msg.lastRawMsgIndex = resp_next_index;
this.msg.parentIndexWA1  = resp_next_index;

//return return_object_set_idx;
} // end of queryResponseSetMemberAdd()   //20200407
//end 20201020


queryResponseObjectAdd(objx, topObjectx) {
         //  NOTE: 20200124 objx now refers to a objectResponseItem instead of a regular object
       //  console.log("keystring2: " + objx.keyString);
         //console.log("this.msg.lastRawMsgIndex 20190918: "+this.msg.lastRawMsgIndex);
         var resp_next_index = this.msg.lastRawMsgIndex +1;
         //console.log("this.msg.parentIndexWA1 20190918: "+ this.msg.parentIndexWA1);
         var msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA1, "5001","2","4131","");      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         this.msg.parentIndexWA2 = resp_next_index;
         //resp_parent_index = resp_next_index;                                                        
        resp_next_index++;

  

         var kind_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, objx.kindZTIC);
         //console.log("running ds2b00002_server_query.js queryResponseObjectAdd()");
         //console.log("20200502 objx.kindZTIC - kind_msg_ztic: "+ objx.kindZTIC + " - " + kind_msg_ztic);
         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4132", kind_msg_ztic);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;

         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4133", objx.kindCode);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;


         var obj_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, objx.objZTIC);        
         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4134", obj_msg_ztic);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;

         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4135", objx.objCode);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;

         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4137", objx.id);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;

         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4138", objx.parent_id);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;

         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4139", objx.levelsDown);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;



         var elemSetIdx = 0;
         var elemIdx    = 0;
         for (var i = 0; i < objx.objElemIdx_AR.length; i++) {
            if(i == 0) {msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4140","");
                        this.msg.ZtMessageResponse_Array.push(msgRow_resp);
                        elemSetIdx = resp_next_index;
                        if(topObjectx){this.msg.queryResponseTopObject_elemSetIdx = elemSetIdx;
                                       this.msg.queryResponseTopObjectKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+objx.kindZTIC.toString().trim()+"_"+objx.kindCode.toString().trim()+"_"+objx.objZTIC.toString().trim()+"_"+objx.objCode.toString().trim();}  // 20231128
                        resp_next_index++;}

              msgRow_resp =  new MessageRow(resp_next_index, elemSetIdx, "5001","2","4141","");
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              elemIdx = resp_next_index;
              resp_next_index++;
             
              //console.log("20190924 in server query this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].objectElementZTIC: "+this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].TE_ztic);
              //console.log("20190924 in server query this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].tableElementZTIC: "+ this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].tableElementZTIC);
              //console.log("20190924 in server query this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value):  "+          this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value);
              //msgRow_resp =  new MessageRow(resp_next_index, elemSetIdx, "5001","2","4142",this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].objectElementZTIC); (del temp- 20190924)


              var oe_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_ztic);
              msgRow_resp =  new MessageRow(resp_next_index, elemIdx, "5001","2","4142", oe_msg_ztic);  //20190924  temp - mod TE_ztic to OE_ztic 20191108
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              resp_next_index++;

              //msgRow_resp =  new MessageRow(resp_next_index, elemSetIdx, "5001","2","4143",this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].objectElementCode);
      msgRow_resp =  new MessageRow(resp_next_index, elemIdx, "5001","2","4143",this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_code); //mod OE_code 20191108
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, elemIdx, "5001","2","4144",this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              resp_next_index++; // (del) 20190922 un-delete 20191026


              //console.log("objx.objElemIdx_AR[i]      : "+objx.objElemIdx_AR[i]);
              //console.log("OEvalRec.value: "+ this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value);
         }  // end of loop through objx.objElemIdx_AR

// new for type values 20190917
         //console.log("20200514 objx.typeValueIdx_AR.length: "+objx.typeValueIdx_AR.length);
         for (var i = 0; i < objx.typeValueIdx_AR.length; i++) {
            if(i == 0) {msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4150","");
                        this.msg.ZtMessageResponse_Array.push(msgRow_resp);
                        var typeSetIdx = resp_next_index;
                        resp_next_index++;}

              msgRow_resp =  new MessageRow(resp_next_index, typeSetIdx, "5001","2","4151","");
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              var typeValIdx = resp_next_index;
              resp_next_index++;

              var type_def_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_ztic);
              msgRow_resp =  new MessageRow(resp_next_index, typeValIdx, "5001","2","4152", type_def_msg_ztic);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, typeValIdx, "5001","2","4153",this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_code);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;


              var type_value_msg_ztic =  this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_ztic);
              msgRow_resp =  new MessageRow(resp_next_index, typeValIdx, "5001","2","4154", type_value_msg_ztic);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, typeValIdx, "5001","2","4155",this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_code);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

    


        //      console.log("objx.typeValueIdx_AR[i]      : "+objx.typeValueIdx_AR[i]);
         //     console.log("typeValueIdx_AR.typeCode: "+ this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_code);
         }  // end of loop through objx.typeValueIdx_AR_AR




       
     //console.log("objx.linkIdx_AR.length at queryResponseObjectAdd in zt_server_query.js 20190915: "+objx.linkIdx_AR.length);

         for (var i = 0; i < objx.linkIdx_AR.length; i++) {
            if(i == 0) {msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4160","");
                        this.msg.ZtMessageResponse_Array.push(msgRow_resp);
                        elemSetIdx = resp_next_index;
                        resp_next_index++;}

              msgRow_resp =  new MessageRow(resp_next_index, elemSetIdx, "5001","2","4161","");
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              var linkIdx = resp_next_index;
              resp_next_index++;

              //console.log("objx.linkIdx_AR.length/value: "+objx.linkIdx_AR.length+"-"+objx.linkIdx_AR[i]);
              //console.log("this.ZtObjectLink_AR.length: "+this.ZtObjectLink_AR.length);
              //console.log("this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic: "+this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic);

              var link_type_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic);
              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4162", link_type_msg_ztic);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4163",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_code);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;


              var link_to_kind_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToKind_ztic);
              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4164", link_to_kind_msg_ztic);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4165",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToKind_code);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              var link_to_code_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToCode_ztic);
              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4166", link_to_code_msg_ztic);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4167",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToCode);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              this.msg.lastRawMsgIndex = resp_next_index;
              resp_next_index++;  


// start 20210404
              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","41691",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].status);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              this.msg.lastRawMsgIndex = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","41692",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].timestamp);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              this.msg.lastRawMsgIndex = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","41693",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkValue);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              this.msg.lastRawMsgIndex = resp_next_index;
              resp_next_index++;

// end 20210404
              
              //console.log("objx.linkIdx_AR[i]      : "+objx.linkIdx_AR[i]);
              //console.log("ZtObjectLink_AR.linkType_ztic: " + this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic);
              //console.log("ZtObjectLink_AR.linkType_code: " + this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_code);
              //console.log("ZtObjectLink_AR.linkToKind_ztic: " + this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToKind_ztic);
              //console.log("ZtObjectLink_AR.linkToKind_code : "+ this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToKind_code);
              //console.log("ZtObjectLink_AR.linkToCode_ztic: " + this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToCode_ztic);
              //console.log("ZtObjectLink_AR.linkToCode: "      + this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToCode);





         }  // end of loop through objx.linkIdx_AR



    
    //this.typeValueIdx_AR  = [];
   
          //this.msg.lastRawMsgIndex = resp_next_index -1;  (del) 20191026
      this.msg.lastRawMsgIndex = resp_next_index -1;        //20200126

} // end of queryResponseObjectAdd(objx)


// start 20231129
TVBTR_queryResponseObjectAdd(objx, topObjectx) {
////   //  NOTE: 20200124 objx now refers to a objectResponseItem instead of a regular object
   //  console.log("20231130d objx.keyString: " + objx.keyString);
////   //console.log("this.msg.lastRawMsgIndex 20190918: "+this.msg.lastRawMsgIndex);
   var resp_next_index = this.msg.lastRawMsgIndex +1;







////   var elemSetIdx = 0;
   var elemSetIdx = this.msg.queryResponseTopObject_elemSetIdx;
   var elemIdx    = 0;
   var msgRow_resp;
  // console.log("20240111d objx.objElemIdx_AR.length: "+objx.objElemIdx_AR.length);
   for (var i = 0; i < objx.objElemIdx_AR.length; i++) {

        msgRow_resp =  new MessageRow(resp_next_index, elemSetIdx, "5001","2","4141","");
        this.msg.ZtMessageResponse_Array.push(msgRow_resp);
        elemIdx = resp_next_index;
        resp_next_index++;
       
////        //console.log("20190924 in server query this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].objectElementZTIC: "+this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].TE_ztic);
////        //console.log("20190924 in server query this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].tableElementZTIC: "+ this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].tableElementZTIC);
   //     console.log("20240111e in server query this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value):  "+          this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value);
////        //msgRow_resp =  new MessageRow(resp_next_index, elemSetIdx, "5001","2","4142",this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].objectElementZTIC); (del temp- 20190924)


        var oe_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_ztic);
        msgRow_resp =  new MessageRow(resp_next_index, elemIdx, "5001","2","4142", oe_msg_ztic);  //20190924  temp - mod TE_ztic to OE_ztic 20191108
        this.msg.ZtMessageResponse_Array.push(msgRow_resp);
        resp_next_index++;

        //msgRow_resp =  new MessageRow(resp_next_index, elemSetIdx, "5001","2","4143",this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].objectElementCode);
msgRow_resp =  new MessageRow(resp_next_index, elemIdx, "5001","2","4143",this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_code); //mod OE_code 20191108
        this.msg.ZtMessageResponse_Array.push(msgRow_resp);
        resp_next_index++;

        msgRow_resp =  new MessageRow(resp_next_index, elemIdx, "5001","2","4144",this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value);
        this.msg.ZtMessageResponse_Array.push(msgRow_resp);
        resp_next_index++; // (del) 20190922 un-delete 20191026


        //console.log("objx.objElemIdx_AR[i]      : "+objx.objElemIdx_AR[i]);
        //console.log("OEvalRec.value: "+ this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value);
   }  // end of loop through objx.objElemIdx_AR








//this.typeValueIdx_AR  = [];

    //this.msg.lastRawMsgIndex = resp_next_index -1;  (del) 20191026
this.msg.lastRawMsgIndex = resp_next_index -1;        //20200126

} // end of TVBTR_queryResponseObjectAdd(objx)


// end 20231129



// 20210323  add ZTIC to message

queryResponseZTICAdd(zticx, namespacex){
    var resp_next_index = this.msg.lastRawMsgIndex +1;
    var msgRow_resp =  new MessageRow(resp_next_index, this.msg.dsiSetIdx, "5001","2","210","");
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    var resp_parent_index = resp_next_index;
    resp_next_index++;
 
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","2100", zticx);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;
 
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","2101", namespacex);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
 
    this.msg.lastRawMsgIndex = resp_next_index;
    resp_next_index++;

}

// end 20210323

// start 20240216
messageStatusInit(){

   var msgRow_resp;
   var resp_next_index;   
   var resp_parent_index;

   if(this.msg.responseTopIndex == 0) {
    //resp_next_index = this.msg.ZtRawMessageAR.length;  (del) 20240216
    resp_next_index = this.msg.ZtMessageResponse_Array.length + this.msg.ZtRawMessageAR.length;  //20240216 
    resp_parent_index = 1;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5000","2","4","");   // ttt 
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
    resp_parent_index = resp_next_index; 
    this.msg.responseTopIndex = resp_next_index;  // 20240115  
    this.msg.lastRawMsgIndex = resp_next_index;  
                                                      

   } // endif responseTopIndex == 0
   


   //  resp_next_index = this.msg.lastRawMsgIndex +1;  //(del) 20240216
   //console.log("20250116 this.msg.ZtRawMessageAR.length: "+this.msg.ZtRawMessageAR.length);
   //resp_next_index = this.msg.ZtRawMessageAR.length;    //20240216
   resp_next_index = this.msg.ZtMessageResponse_Array.length + this.msg.ZtRawMessageAR.length;  //20240216
   resp_parent_index = this.msg.responseTopIndex;  //20240215                                      
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","42","");      
   this.msg.ZtMessageResponse_Array.push(msgRow_resp);  
   this.msg.messageStatusParentIndex =  resp_next_index;  
   this.msg.lastRawMsgIndex = resp_next_index;
} // end of messageStatusInit   


messageStatusAdd(messageStatusWAx){

  // this.messageStatusZTIC = "";
  // this.messageStatusCode = "";
  // this.messageStatusTimestamp = "";
  // this.messageStatusText = "";
   var resp_next_index = this.msg.lastRawMsgIndex +1;
   var msgRow_resp =  new MessageRow(resp_next_index, this.msg.messageStatusParentIndex, "5001","2","420","");
   this.msg.ZtMessageResponse_Array.push(msgRow_resp);
   var resp_parent_index = resp_next_index;
   resp_next_index++;

   var msg_status_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, messageStatusWAx.messageStatusZTIC);
   msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4201", msg_status_ztic);
   this.msg.ZtMessageResponse_Array.push(msgRow_resp);
   //resp_parent_index = resp_next_index;
   resp_next_index++;
   msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4202",messageStatusWAx.messageStatusCode);
   this.msg.ZtMessageResponse_Array.push(msgRow_resp);
   //resp_parent_index = resp_next_index;
   resp_next_index++;
   msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4203",messageStatusWAx.messageStatusTimestamp);
   this.msg.ZtMessageResponse_Array.push(msgRow_resp);
   //resp_parent_index = resp_next_index;
   resp_next_index++;
   msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4204",messageStatusWAx.messageStatusText);
   this.msg.ZtMessageResponse_Array.push(msgRow_resp);

   this.msg.lastRawMsgIndex = resp_next_index;

} // end of messageStatusAdd

// end 20240216


// 20200107 start log system message
serverLogSystemMessageInit(){


var resp_next_index = this.msg.lastRawMsgIndex +1;   
//var resp_next_index = this.msg.ZtRawMessageAR.length;     (del) 20240215                                  
//var resp_parent_index = 1;  (del) 20240215
var resp_parent_index = this.msg.responseTopIndex;  //20240215 
    
//var msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4","");   
//this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
//resp_parent_index = resp_next_index;                                                        
//resp_next_index++;                                                                          
var msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","43","");      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);  
this.msg.serverLogSystemMessageParentIndex =  resp_next_index;  
this.msg.lastRawMsgIndex = resp_next_index;                                         
//resp_parent_index = resp_next_index;                                                        
//resp_next_index++; 


} // end of serverLogSystemMessageInit



serverLogSystemMessageAdd(serverLogSystemMessageWAx){
    var resp_next_index = this.msg.lastRawMsgIndex +1;
    var msgRow_resp =  new MessageRow(resp_next_index, this.msg.serverLogSystemMessageParentIndex, "5001","2","430","");
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    var resp_parent_index = resp_next_index;
    resp_next_index++;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4300",serverLogSystemMessageWAx.id);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;

    var server_log_sys_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, serverLogSystemMessageWAx.ztic);
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4301", server_log_sys_msg_ztic);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4302",serverLogSystemMessageWAx.code);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4303",serverLogSystemMessageWAx.messageCategrory);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4304",serverLogSystemMessageWAx.timestamp);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4311",serverLogSystemMessageWAx.relatedSection);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4312",serverLogSystemMessageWAx.relatedSectionID);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4313",serverLogSystemMessageWAx.serialNumberOfRelatedMessageElement);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4321",serverLogSystemMessageWAx.shortSystemMessage);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4322",serverLogSystemMessageWAx.longSystemMessage);
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    //resp_parent_index = resp_next_index;
    resp_next_index++;
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4330","");
    this.msg.ZtMessageResponse_Array.push(msgRow_resp);
    this.msg.lastRawMsgIndex = resp_next_index;
    var parameter_parent_index = resp_next_index;
    resp_next_index++;
    for (var i = 0; i < serverLogSystemMessageWAx.parameter_AR.length; i++) {
       msgRow_resp =  new MessageRow(resp_next_index, parameter_parent_index, "5001","2","4331","");
       this.msg.ZtMessageResponse_Array.push(msgRow_resp);
       resp_parent_index = resp_next_index;
       resp_next_index++;
       msgRow_resp =  new MessageRow(resp_next_index, parameter_parent_index, "5001","2","4332", this.msg.serverZTICDom.getCodeForNS(serverLogSystemMessageWAx.parameter_AR[i].namespace).toString().trim());
       this.msg.ZtMessageResponse_Array.push(msgRow_resp);
       //resp_parent_index = resp_next_index;
       resp_next_index++;
       msgRow_resp =  new MessageRow(resp_next_index, parameter_parent_index, "5001","2","4333",serverLogSystemMessageWAx.parameter_AR[i].code);
       this.msg.ZtMessageResponse_Array.push(msgRow_resp);
       //resp_parent_index = resp_next_index;
       resp_next_index++;
       msgRow_resp =  new MessageRow(resp_next_index, parameter_parent_index, "5001","2","4334",serverLogSystemMessageWAx.parameter_AR[i].value);
       this.msg.ZtMessageResponse_Array.push(msgRow_resp);
       resp_parent_index = resp_next_index;
       this.msg.lastRawMsgIndex = resp_next_index;
       resp_next_index++;
    }  // endfor loop through parameter_AR




} // end of serverLogSystemMessageAdd();
// 20200107 end log system message




// 20240120 start 
getArrayOfSelectedObjectsForQueryObjectSelectionSetMemberArray(objectSelectionSetMember_idx_ARx, obj_kind_objZTICx, obj_kind_objCodex){


var selectedObjectAR = [];
var base_ztic = this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim();

objectSelectionSetMember_idx_ARx.forEach((objectSelectionSetMember_idx) => {
                           
   var objectSelectionSetMember = this.msg.queryObjectSelectionSetMemberWA_AR[objectSelectionSetMember_idx];
   var objectSetMember_idx_AR = this.msg.queryObjectSelectionSetMemberWA_AR[objectSelectionSetMember_idx].objectSetMember_idx_AR;
   //console.log("20240120b objectSelectionSetMember.usage_type_code: "+objectSelectionSetMember.usage_type_code);
   objectSetMember_idx_AR.forEach((objectSetMember_idx) => {
      var objectSetMember = this.msg.queryObjectSetMemberWA_AR[objectSetMember_idx];
     if(objectSelectionSetMember.usage_type_code == "1") {  // individual object
        const objKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+obj_kind_objZTICx.toString().trim()+"_"+obj_kind_objCodex.toString().trim()+"_"+objectSetMember.objectZTIC.toString().trim()+"_"+objectSetMember.objectCode.toString().trim();   
        //console.log("20250106b objKeyStr: "+objKeyStr);
        if(this.svr1.ZtObject_idx_HM.has(objKeyStr)){
             const obj_idx = this.svr1.ZtObject_idx_HM.get(objKeyStr);
             selectedObjectAR.push(obj_idx);
        } else
         {
             console.log("20250106b objKeyStr: "+objKeyStr+" not found in ZtObject_idx_HM at ds2b00002_server_query.js getArrayOfSelectedObjectsForQueryObjectSelectionSetMemberArray()");   
             const obj_kind_ns = this.svr1.getNSforCode(this.msg.dbZtI_id, obj_kind_objZTICx);
             const obj_ns      = this.svr1.getNSforCode(this.msg.dbZtI_id, objectSetMember.objectZTIC);
             this.validateObjectKeyForQueriedObject(this.msg.TargetNS, obj_kind_ns, obj_kind_objCodex, obj_ns, objectSetMember.objectCode);
             // 20250107 start system message
             //  var sys_msg_obj = new (require('../zt_server_system_message'))(this.svr1, this.msg, this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim(), "1", this.svr1.time.now());
             //  sys_msg_obj.setParameterValue("131131/21", "1", "ZtQuery"); 
             //  sys_msg_obj.setParameterValue("131131/21", "2", "getArrayOfSelectedObjectsForQueryObjectSelectionSetMemberArray()");
             //  sys_msg_obj.setParameterValue("131131/21", "3", "ds2b00002_server_query.js");  
              // sys_msg_obj.setParameterValue("131131/21", "4", "objKeyStr not found in ZtObject_idx_HM");  
             //  sys_msg_obj.addLogEntryToMessage();  
             // 20250107 end of system message
        }  // end of if objKeyStr in ZtObject_idx_HM
        //   const obj_idx = this.svr1.ZtObject_idx_HM.get(objKeyStr);
        //console.log("20240121b obj_idx: "+obj_idx);
       
           
     } // endif usage_type_code == "1"
     if(objectSelectionSetMember.usage_type_code == "2") {   // object is a set
   

        const objSetKeyStr = this.msg.dbZtI_id.toString().trim()+"_"+base_ztic+"_13_"+objectSetMember.objectZTIC.toString().trim()+"_"+objectSetMember.objectCode.toString().trim();   
      
        const set_object_idx = this.svr1.ZtObject_idx_HM.get(objSetKeyStr);
        const serverSetStr = process.env.ZT_SERVER_HOME_DIR + "/zt_server_set";  // 20240227
        //var msgSetObj = new (require('./ds2b00002_server_set'))( this.svr1, set_object_idx, this.msg );  // (del 20240227
        var msgSetObj = new (require(serverSetStr))( this.svr1, set_object_idx, this.msg );  // 20240227
        selectedObjectAR = selectedObjectAR.concat(msgSetObj.getMember_AR(this.svr1.time.now()));

   } // endif usage_type_code == "2"  
  }); // end of loop through objectSetMember_idx_ARx
});  // end of loop through objectSelectionSetMember_idx_ARx

return selectedObjectAR;
}  // end of getArrayOfSelectedObjectsForQueryObjectSelectionSetMemberArray
// 20240120 end



validateObjectKeyForQueriedObject(TargetNSx, obj_kind_objZTICx, obj_kind_objCodex, objectZTICx, objectCodex){   


  //// var validation_obj;  
   const base_ztic   = this.svr1.getCodeForNS(this.msg.dbZtI_id, "131131/21");
   const validation_ztic   = this.svr1.getCodeForNS(this.msg.dbZtI_id, "zinfinitree.com/validation");
   const timestampx = this.svr1.time.now();
   var function_group_idx;
   var function_group_set_launch_point_idx;
   const parameter_AR = [];
   var parameter; 
   parameter = new DsFunctionParameter("zinfinitree.com/validation", "4", TargetNSx);
   parameter_AR.push(parameter);
   parameter = new DsFunctionParameter("zinfinitree.com/validation", "5", obj_kind_objZTICx);
   parameter_AR.push(parameter);
   parameter = new DsFunctionParameter("zinfinitree.com/validation", "6", obj_kind_objCodex);
   parameter_AR.push(parameter);
   parameter = new DsFunctionParameter("zinfinitree.com/validation", "7", objectZTICx);
   parameter_AR.push(parameter);
   parameter = new DsFunctionParameter("zinfinitree.com/validation", "8", objectCodex);
   parameter_AR.push(parameter);





 const function_group_set_launch_point_KeyStr = this.msg.dbZtI_id.trim()+"_"+base_ztic+"_67_" + validation_ztic +"_3"; // Function Group Set Launch Point for Validation of Key for Queried Object
 console.log("20250110c function_group_set_launch_point_KeyStr: "+function_group_set_launch_point_KeyStr);
 if(this.svr1.ZtObject_idx_HM.has(function_group_set_launch_point_KeyStr)){   // 20240223
    function_group_set_launch_point_idx = this.svr1.ZtObject_idx_HM.get(function_group_set_launch_point_KeyStr);
    var  new_func_grp_set_launch_point = new (require('../zt_server_function_group_set_launch_point'))( this.svr1, this.msg, function_group_set_launch_point_idx, timestampx, parameter_AR);  
   // this.msg.functionGroupSetLaunchPoint_AR.push(new_func_grp_set_launch_point);
    new_func_grp_set_launch_point.execute();  // 20250205


}  // endif svr1x.ZtObject_idx_HM.has(function_group_KeyStr)



 
 }  // end of validateObjectKeyForQueriedObject





} // end of class ZtQuery


function MessageRow(index, parent_index, priority, me_ztic, me_code, data) {
  this.index        = index;
  this.parent_index = parent_index;
  this.priority     = priority;
  this.me_ztic      = me_ztic;
  this.me_code      = me_code;
  this.data         = data;
 
}



//data declarations

function QueryResponseSetMemberWorkAreaRec() {
   this.rawMsg_idx                   = "";
   this.setMemberID                  = "";     //4100
   this.objectTemplateZTIC           = "";     //4101
   this.objectTemplateCode           = "";     //4102
   this.timestampEff                 = "";     //4103
   this.responseType                 = "";     //4104  20200528
   this.linkableObjectLinkType_ztic  = "";     //4105  20200528 (for response type 2)
   this.linkableObjectLinkType_code  = "";     //4106  20200528 (for response type 2)
   this.queryProcessingStatus_idx_AR = [];     //4110
   this.object_idx_AR                = [];     //4130  //to be deprecated 20200124
   this.objectResponseItem_AR        = [];     //4130  20200124 to replace object_idx_AR
   this.objectResponseItemsThatAreSetDefs_idx_AR = [];   // 20201106

}

function QueryResponseObjectWorkAreaRec() {
   this.rawMsg_idx                    = "";
   this.queryResponseSetWA_rawMsg_idx = "";
   this.object_idx                    = "";
   this.objectKindZTIC                = "";   //4132
   this.objectKindCode                = "";   //4133
   this.objectZTIC                    = "";   //4134
   this.objectCodeTemp                = "";   //4135 ??? is this needed for query resp?
   this.objectCodeAssigned            = "";   //4136
   this.rootObject_BL	              = "";   //4137  boolean
   this.levelsDown                    = "";   //4139  hierarchy levels down from top parent (which is zero)
   this.objectElementSet_idx_AR       =	[];   //4140
   this.typeSet_idx_AR                = [];   //4150
   this.linkSet_idx_AR                = [];   //4160	

}

function QueryResponseTypeValueBasedTemplateRuleObjectAndTemplateRec()  {
   this.object_idx                    = "";   //
   this.TVBTR_template_object_idx     = "";
   this.parent_msg_idx                = "";

}

/////} //end of class TextReturn

class DsFunctionParameter {



constructor(namespacex, codex, valuex) {
      this.namespace  =  namespacex.toString().trim();
      this.code  =  codex.toString().trim();
      this.value =  valuex;
     // this.sm_text = "";
     // this.text_return = new TextReturn();
} // end of constructor


}  // end of class DsFunctionParameter


module.exports = ZtQuery;
