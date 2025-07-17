class ZtQuery {




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

console.log("running query function execute in ds2b00001");

   this.select();
   this.displaySelection();
   this.buildResponse();





   for (var i = 0; i < this.msg.queryResponseSetMemberWA_AR.length; i++) {
    console.log("server query this.msg.queryResponseSetMemberWA_AR[i].setMemberID: "+this.msg.queryResponseSetMemberWA_AR[i].setMemberID);

 // console.log("this.msg.querySelectionSetMemberWA_AR.length 20190915: "+this.msg.querySelectionSetMemberWA_AR.length);
   for (var j = 0; j < this.msg.querySelectionSetMemberWA_AR.length; j++) {

      var qsswa = this.msg.querySelectionSetMemberWA_AR[j];
      console.log("QSSWA rec values: "+ qsswa.rawMsg_idx+"-"+qsswa.querySetWA_rawMsg_idx+"-"+qsswa.selectionGroupNumber);


   } // endfor querySelectionSetWA_AR

}  //end loop through this.msg.queryResponseSetMemberWA_AR





console.log("listing this.msg.ZtMessageResponse_Array and end of query process");
for (i = 0; i < this.msg.ZtMessageResponse_Array.length; i++){
   console.log(this.msg.ZtMessageResponse_Array[i].index+"-"+
               this.msg.ZtMessageResponse_Array[i].parent_index+"-"+
               this.msg.ZtMessageResponse_Array[i].priority+"-"+
               this.msg.ZtMessageResponse_Array[i].me_ztic+"-"+
               this.msg.ZtMessageResponse_Array[i].me_code+"-"+
               this.msg.ZtMessageResponse_Array[i].data);
 // this.index        = index;
 // this.parent_index = parent_index;
 // this.priority     = priority;
 // this.me_ztic      = me_ztic;
 // this.me_code      = me_code;
 // this.data         = data;
}// endfor

}  // end of process




select() {
  console.log("running select method");


   console.log("20200126e this.msg.querySetMemberWA_AR.length:  "+this.msg.querySetMemberWA_AR.length);
   for (var i = 0; i < this.msg.querySetMemberWA_AR.length; i++) {

      var QRespSetMbrWArec = new QueryResponseSetMemberWorkAreaRec();
      QRespSetMbrWArec.setMemberID = this.msg.querySetMemberWA_AR[i].setMemberID;
      var qRespSetMember_idx = this.msg.queryResponseSetMemberWA_AR.push(QRespSetMbrWArec) -1;

      console.log("20191104 this.msg.querySetMemberWA_AR[i].setMemberID/OT_ztic/OT_code:  "+this.msg.querySetMemberWA_AR[i].setMemberID+"/"+this.msg.querySetMemberWA_AR[i].objectTemplateZTIC+"/"+this.msg.querySetMemberWA_AR[i].objectTemplateCode);
      console.log("this.msg.querySetMemberWA_AR[i].selectionSet_idx_AR.length:  "+this.msg.querySetMemberWA_AR[i].selectionSetMember_idx_AR.length);

      var templateKeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim() + "_2_" + this.msg.querySetMemberWA_AR[i].objectTemplateZTIC.toString().trim() +"_" + this.msg.querySetMemberWA_AR[i].objectTemplateCode.toString().trim();

      for (var j = 0; j < this.msg.querySetMemberWA_AR[i].selectionSetMember_idx_AR.length; j++) {
         console.log(".selectionGroupNumber:  "+this.msg.querySelectionSetMemberWA_AR[this.msg.querySetMemberWA_AR[i].selectionSetMember_idx_AR[j]].selectionGroupNumber);
   
        var qSelSetMbr = this.msg.querySelectionSetMemberWA_AR[this.msg.querySetMemberWA_AR[i].selectionSetMember_idx_AR[j]];
        console.log("qSelSetMbr.objectSelectionSetMember_idx_AR.length:"+qSelSetMbr.objectSelectionSetMember_idx_AR.length); 
        for (var k = 0; k < qSelSetMbr.objectSelectionSetMember_idx_AR.length; k++) {
           console.log("usage : "+ this.msg.queryObjectSelectionSetMemberWA_AR[qSelSetMbr.objectSelectionSetMember_idx_AR[k]].usage);
           var qObjSelSetMbr =     this.msg.queryObjectSelectionSetMemberWA_AR[qSelSetMbr.objectSelectionSetMember_idx_AR[k]];
           //console.log("qObjSelSetMbr.objectSetMember_idx_AR.length: "+qObjSelSetMbr.objectSetMember_idx_AR.length);
           //console.log("20191110 this.svr1.ZtObject_AR.length: "+this.svr1.ZtObject_AR.length);
           for (var m = 0; m < this.svr1.ZtObject_AR.length; m++) {
                var objx = this.svr1.ZtObject_AR[m];
                //console.log("20191209 qObjSelSetMbr.objectSetMember_idx_AR.length: "+qObjSelSetMbr.objectSetMember_idx_AR.length);
                for (var l = 0; l < qObjSelSetMbr.objectSetMember_idx_AR.length; l++) {
                //  console.log("20191111 this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindZTIC: "+this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindZTIC+"-"+ objx.kindZTIC);
                 // console.log("20191110 objectCode: "+this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectCode);
                   if (this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindZTIC  == objx.kindZTIC){
                     if (this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindCode  == objx.kindCode){
                 // console.log("20191209 this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectZTIC: "+this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectZTIC+"-"+ objx.objZTIC);

                      if (this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectZTIC      == objx.objZTIC || this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectZTIC.toString().trim() == "*"){

                      if (this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectCode      == objx.objCode || this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectCode.toString().trim() == "*"){
                           //console.log("ZTIC: "+this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindZTIC);
                           console.log("20191026 objx.kindZTIC__objx.kindCode: "+objx.kindZTIC+"__"+objx.kindCode);


                           var qRespObj = new QueryResponseObjectWorkAreaRec();
                           qRespObj.object_idx = m;   // specific object queried
                           this.msg.queryResponseSetMemberWA_AR[qRespSetMember_idx].object_idx_AR.push(m);  //to be deprecated 20200124
                           // start-get all values for object 20191106
                            console.log("20191114 templateKeyStr: "+templateKeyStr);
                            var template_def_idx = this.svr1.ZtObject_idx_HM.get(templateKeyStr);
                            var resp_item_AR = [];
                            console.log("20191106 template_idx in zt_server_query: "+template_def_idx);
                            resp_item_AR = objx.getAllValuesForTemplateDef( template_def_idx, this.msg, this.svr1.time.now() );
                            console.log("resp_item_AR list");
                            for (var n = 0; n < resp_item_AR.length; n++) {

                               this.msg.queryResponseSetMemberWA_AR[qRespSetMember_idx].objectResponseItem_AR.push(resp_item_AR[n]);  //20200124
 console.log(resp_item_AR[n].id+"-"+resp_item_AR[n].parent_id+"-"+resp_item_AR[n].kindZTIC+"-"+resp_item_AR[n].kindCode+"-"+resp_item_AR[n].objZTIC+"-"+resp_item_AR[n].objCode);
                                   console.log("     Object Elements:"); 
                                   for (var p = 0; p < resp_item_AR[n].objElemIdx_AR.length; p++) {
                                         console.log("     "+this.svr1.ZtObjectElement_AR[resp_item_AR[n].objElemIdx_AR[p]].value);
 

                                    } // endfor loop through res_item_AR.objElemIdx_AR
                            } // endfor loop through resp_item_AR


                             


                        } // endif objectCode     == objx.objCode
                        } //  endif objectZTIC     == objx.objZTIC
                       }// endif  objectKindCode  == objx.kindCode
                    } //  endif   objectKindZTIC  == objx.kindZTIC
 //         console.log("Objeck Kind ZTIC-Code:  "+   this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindZTIC+"-"+this.msg.queryObjectSetMemberWA_AR[qObjSelSetMbr.objectSetMember_idx_AR[l]].objectKindCode);
                } // endfor
           } // end of loop through this.svr1.ZtObject_AR.length;
           //console.log("objectSelectionSetMember_idx_AR[k].usage: "+ qSelSetMbr.objectSelectionSetMember_idx_AR[k].usage);
        } // endfor
 
      }// endfor




   } // end loop through querySetMemberWA_AR

}  // end of select


displaySelection() {

  console.log("running display selection");
     for (var i = 0; i < this.msg.queryResponseSetMemberWA_AR.length; i++) {

         for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR[i].object_idx_AR.length; j++) {
               var obj_idx = this.msg.queryResponseSetMemberWA_AR[i].object_idx_AR[j];
            console.log("Object: "+this.svr1.ZtObject_AR[obj_idx].kindZTIC+"-"+this.svr1.ZtObject_AR[obj_idx].kindCode+"-"+this.svr1.ZtObject_AR[obj_idx].objZTIC+"-"+this.svr1.ZtObject_AR[obj_idx].objCode);


         }  //endfor object_idx_AR
     
     } //endfor queryResponseSetMemberWA_AR

} // end of displaySelection()



  buildResponse()  {

console.log("running buildResponse");



 
//this.msg.queryResponseSetMemberWA_AR[qRespSetMember_idx].objectResponseItem_AR    

     for (var i = 0; i < this.msg.queryResponseSetMemberWA_AR.length; i++) {
         if(i == 0){this.queryResponseInit(this.msg.queryResponseSetMemberWA_AR[i].setMemberID);}
        // for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR[i].object_idx_AR.length; j++) {       (del) 20200124
  console.log("20200126d this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR.length: "+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR.length);
         for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR.length; j++) {  //added 20200124
            //var obj_idx = this.msg.queryResponseSetMemberWA_AR[i].object_idx_AR[j];                     (del) 20200124
            //var objx = this.svr1.ZtObject_AR[obj_idx];                                                  (del) 20200124
            //this.queryResponseObjectAdd(objx);                                                           (del) 20200124
            this.queryResponseObjectAdd(this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j]); //20200124 
  //   console.log("Object: "+this.svr1.ZtObject_AR[obj_idx].kindZTIC+"-"+this.svr1.ZtObject_AR[obj_idx].kindCode+ "-"+this.svr1.ZtObject_AR[obj_idx].objZTIC+"-"+this.svr1.ZtObject_AR[obj_idx].objCode);
         }  //endfor object_idx_AR changed to ..objectResponseItem_AR
     
     } //endfor queryResponseSetMemberWA_AR



// 20200107 start add system message to response
    for (var i = 0; i < this.msg.serverLogSystemMessageWA_AR.length; i++) {
      if(this.msg.queryResponseSetMemberWA_AR.length == 0 && i == 0){this.serverLogSystemMessageInit();}
       this.serverLogSystemMessageAdd(this.msg.serverLogSystemMessageWA_AR[i]);

    }  // end loop through serverLogSystemMessageWA_AR

// 20200107  end add system message to response


}  // end of buildResponse()


queryResponseInit(setMemberIDx) {

console.log("running queryResponseInit");

// pasted from zt_server_message.js for example
/// // add parent nodes to response message
var resp_next_index = this.msg.DsRawMessageAR.length;                                       
var resp_parent_index = 1; 
    
var msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4","");   
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
resp_parent_index = resp_next_index;                                                        
resp_next_index++; 
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","43","");      
this.msg.ZtMessageResponse_Array.push(msgRow_resp); 
this.msg.serverLogSystemMessageParentIndex =  resp_next_index;                                           
//resp_parent_index = resp_next_index;                                                        
resp_next_index++;                                                                         
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","41","");      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
resp_parent_index = resp_next_index;                                                        
resp_next_index++; 
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","410","");      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4100",setMemberIDx);      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
//resp_parent_index = resp_next_index;                                                        
resp_next_index++;
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4130","");      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             


this.msg.lastRawMsgIndex = resp_next_index;
this.msg.parentIndexWA1   = resp_next_index;




} // end of queryResponseInit()


queryResponseObjectAdd(objx) {
         //  NOTE: 20200124 objx now refers to a objectResponseItem instead of a regular object
         console.log("keystring2: " + objx.keyString);
         //console.log("this.msg.lastRawMsgIndex 20190918: "+this.msg.lastRawMsgIndex);
         var resp_next_index = this.msg.lastRawMsgIndex +1;
         //console.log("this.msg.parentIndexWA1 20190918: "+ this.msg.parentIndexWA1);
         var msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA1, "5001","2","4131","");      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         this.msg.parentIndexWA2 = resp_next_index;
         //resp_parent_index = resp_next_index;                                                        
        resp_next_index++;

    //this.kindZTIC 
    //this.kindCode 
    //this.objZTIC  
    //this.objCode  

         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4132",objx.kindZTIC);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;

         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4133",objx.kindCode);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;

         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4134",objx.objZTIC);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;

         msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4135",objx.objCode);      
         this.msg.ZtMessageResponse_Array.push(msgRow_resp);
         resp_next_index++;



         var elemSetIdx = 0;
         var elemIdx    = 0;
         for (var i = 0; i < objx.objElemIdx_AR.length; i++) {
            if(i == 0) {msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4140","");
                        this.msg.ZtMessageResponse_Array.push(msgRow_resp);
                        elemSetIdx = resp_next_index;
                        resp_next_index++;}

              msgRow_resp =  new MessageRow(resp_next_index, elemSetIdx, "5001","2","4141","");
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              elemIdx = resp_next_index;
              resp_next_index++;
             
              //console.log("20190924 in server query this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].objectElementZTIC: "+this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].TE_ztic);
              //console.log("20190924 in server query this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].tableElementZTIC: "+ this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].tableElementZTIC);
              //console.log("20190924 in server query this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value):  "+          this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value);
              //msgRow_resp =  new MessageRow(resp_next_index, elemSetIdx, "5001","2","4142",this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].objectElementZTIC); (del temp- 20190924)
   msgRow_resp =  new MessageRow(resp_next_index, elemIdx, "5001","2","4142",this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_ztic);  //20190924  temp - mod TE_ztic to OE_ztic 20191108
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
         for (var i = 0; i < objx.typeValueIdx_AR.length; i++) {
            if(i == 0) {msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4150","");
                        this.msg.ZtMessageResponse_Array.push(msgRow_resp);
                        var typeSetIdx = resp_next_index;
                        resp_next_index++;}

              msgRow_resp =  new MessageRow(resp_next_index, typeSetIdx, "5001","2","4151","");
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              var typeValIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, typeValIdx, "5001","2","4152",this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_ztic);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, typeValIdx, "5001","2","4153",this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_code);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, typeValIdx, "5001","2","4154",this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_ztic);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, typeValIdx, "5001","2","4155",this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_code);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

    


        //      console.log("objx.typeValueIdx_AR[i]      : "+objx.typeValueIdx_AR[i]);
         //     console.log("typeValue_AR.typeCode: "+ this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_code);
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
              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4162",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4163",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_code);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4164",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToKind_ztic);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4165",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToKind_code);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4166",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToCode_ztic);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              //elemIdx = resp_next_index;
              resp_next_index++;

              msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4167",this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToCode);
              this.msg.ZtMessageResponse_Array.push(msgRow_resp);
              this.msg.lastRawMsgIndex = resp_next_index;
              resp_next_index++;  //20191026
              
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



// 20200107 start log system message
serverLogSystemMessageInit(){

var resp_next_index = this.msg.DsRawMessageAR.length;                                       
var resp_parent_index = 1; 
    
var msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4","");   
this.msg.ZtMessageResponse_Array.push(msgRow_resp);                                             
resp_parent_index = resp_next_index;                                                        
resp_next_index++;                                                                          
msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","43","");      
this.msg.ZtMessageResponse_Array.push(msgRow_resp);  
this.msg.serverLogSystemMessageParentIndex =  resp_next_index;                                           
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
    msgRow_resp =  new MessageRow(resp_next_index, resp_parent_index, "5001","2","4301",serverLogSystemMessageWAx.ztic);
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
   this.queryProcessingStatus_idx_AR = [];     //4110
   this.object_idx_AR                = [];     //4130  //to be deprecated 20200124
   this.objectResponseItem_AR        = [];     //4130  20200124 to replace object_idx_AR

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
   this.objectElementSet_idx_AR       =	[];   //4140
   this.typeSet_idx_AR                = [];   //4150
   this.linkSet_idx_AR                = [];   //4160	

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
