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

// copied from ds2b_server_message_parse.js and adjusted for client  20190905

    constructor(msgx) {
    //this.txt1   = "validation1 text";
    //this.svr1 = svr1x;
    this.msg = msgx;
  }



     process() {

// start 20211026
  for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++) {
  // console.log("##^ 20211026 this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length:" +this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length);              
     for (var h = 0; h < this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length; h++) {                              
   //   console.log("this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR[h]:"+this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR[h]);                        
     }                           
  } // end of loop through queryResponseObjectWA_AR
                                      
// end 20211026

//console.log("running client message parse: "+this.msg);

for (var i = 0; i < this.msg.ZtRawMessageAR.length; i++) {
  //console.log(i, this.msg.ZtRawMessageAR[i].parent_index,this.msg.ZtRawMessageAR[i].priority,this.msg.ZtRawMessageAR[i].me_disc,this.msg.ZtRawMessageAR[i].me_code,this.msg.ZtRawMessageAR[i].data);
  
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2101) {    //load namespaces
                                   var ZTICupdrec = new ZTICUpdateWorkAreaRec();
                                   ZTICupdrec.namespace = this.msg.ZtRawMessageAR[i].data;
                                  // console.log("**^ 20210323 me_code == 2101 ZTICupdrec.namespace: "+ZTICupdrec.namespace);
                                   ZTICupdrec.namespace_idx = this.msg.ZtRawMessageAR[i].index;;
                                   ZTICupdrec.dsi_idx       = this.msg.ZtRawMessageAR[i].parent_index;
                                   ZTICupdrec.dsiSet_idx    = this.msg.ZtRawMessageAR[ZTICupdrec.dsi_idx].parent_index;             // 20210323  
                                   ZTICupdrec.header_idx    = this.msg.ZtRawMessageAR[ZTICupdrec.dsiSet_idx].parent_index;          // 20210323
//                                   ZTICupdrec.root_idx      = this.msg.ZtRawMessageAR[ZTICupdrec.header_idx.trim()].parent_index;
                                   this.msg.ZTIC_Array.push(ZTICupdrec);
                                    
                                   }
//bookmark 20190707
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3000) { var maintainSetMemberWA = new MaintainSetMemberWorkAreaRec();
                                                       maintainSetMemberWA.setMemberID = this.msg.ZtRawMessageAR[i].data;
                                                       maintainSetMemberWA.rawMsg_idx  = this.msg.ZtRawMessageAR[i].parent_index;
                                                       this.msg.maintainSetUpdateWA_Array.push(maintainSetMemberWA);



                                                   }

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 3008) { var maintainSetMemberWA = new MaintainSetMemberWorkAreaRec();
                                                   maintainSetMemberWA.updateMode = this.msg.ZtRawMessageAR[i].data;


                                                   }
 




if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4036) { var MaintRespObjWArec_4036 = new MaintainResponseObjectWorkAreaRec();

                                            MaintRespObjWArec_4036.objectCodeAssigned       =  this.msg.ZtRawMessageAR[i].data;
                                            MaintRespObjWArec_4036.rawMsg_idx               = this.msg.ZtRawMessageAR[i].index;
 
                                            this.msg.maintainResponseObjectWA_AR.push(MaintRespObjWArec_4036);

                                                   }



 
 
//query response set member id
if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4100) { var QRespSetMemberWArec_4100 = new QueryResponseSetMemberWorkAreaRec();
     //  console.log("20240116c this.msg.ZtRawMessageAR[i].data: "+this.msg.ZtRawMessageAR[i].data);
                                            QRespSetMemberWArec_4100.setMemberID       =  this.msg.ZtRawMessageAR[i].data;
                                            QRespSetMemberWArec_4100.rawMsg_idx         = this.msg.ZtRawMessageAR[i].index;
                                            QRespSetMemberWArec_4100.queryResponseSetMember_idx = this.msg.ZtRawMessageAR[QRespSetMemberWArec_4100.rawMsg_idx].parent_index;
                                            QRespSetMemberWArec_4100.queryResponseSet_idx       = this.msg.ZtRawMessageAR[QRespSetMemberWArec_4100.queryResponseSetMember_idx].parent_index;
                                            QRespSetMemberWArec_4100.response_idx           = this.msg.ZtRawMessageAR[QRespSetMemberWArec_4100.queryResponseSet_idx].parent_index;
                                            QRespSetMemberWArec_4100.root_idx              = this.msg.ZtRawMessageAR[QRespSetMemberWArec_4100.response_idx].parent_index;

                                            this.msg.queryResponseSetMemberWA_AR.push(QRespSetMemberWArec_4100);

                                                   }


 if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4131) { var QRespObjectWArec = new QueryResponseObjectWorkAreaRec();


                                            QRespObjectWArec.object_idx         = this.msg.ZtRawMessageAR[i].index;
                                            QRespObjectWArec.objectSet_idx      = this.msg.ZtRawMessageAR[QRespObjectWArec.object_idx].parent_index;
                                            QRespObjectWArec.queryResponseSetMember_idx = this.msg.ZtRawMessageAR[QRespObjectWArec.objectSet_idx].parent_index;
                                            QRespObjectWArec.queryResponseSet_idx       = this.msg.ZtRawMessageAR[QRespObjectWArec.queryResponseSetMember_idx].parent_index;
                                            QRespObjectWArec.response_idx           = this.msg.ZtRawMessageAR[QRespObjectWArec.queryResponseSet_idx].parent_index;
                                            QRespObjectWArec.root_idx              = this.msg.ZtRawMessageAR[QRespObjectWArec.response_idx].parent_index;

                                            var obj_idx = this.msg.queryResponseObjectWA_AR.push(QRespObjectWArec) - 1;
                                            for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR.length; j++) {
                                              if(this.msg.queryResponseSetMemberWA_AR[j].queryResponseSetMember_idx == QRespObjectWArec.queryResponseSetMember_idx)
                                              {
                                                 this.msg.queryResponseSetMemberWA_AR[j].object_idx_AR.push(obj_idx);
                                              } //endif

                                            } // end loop through this.msg.queryResponseSetMemberWA_AR

                                            

  } // endif.




  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4144) {   // load object elements
                                   //var updrec = new UpdateRec(); 
 
                                    var QRespOErec = new QueryResponseObjectElementWorkAreaRec();
                                    QRespOErec.objectElementValue  = this.msg.ZtRawMessageAR[i].data;
                                    //console.log("20231202g QRespOErec.objectElementValue: "+QRespOErec.objectElementValue);
                                    // QRespOErec.rawMsg_idx         = i;
                                    QRespOErec.objectElementValue_idx        = this.msg.ZtRawMessageAR[i].index;;
                                    QRespOErec.objectElement_idx             = this.msg.ZtRawMessageAR[i].parent_index;
                                   
                                    QRespOErec.objectElementSet_idx          = this.msg.ZtRawMessageAR[QRespOErec.objectElement_idx].parent_index;
                                    QRespOErec.object_idx         = this.msg.ZtRawMessageAR[QRespOErec.objectElementSet_idx].parent_index;
                                    QRespOErec.objectSet_idx      = this.msg.ZtRawMessageAR[QRespOErec.object_idx].parent_index;
                                    QRespOErec.queryResponseSetMember_idx = this.msg.ZtRawMessageAR[QRespOErec.objectSet_idx].parent_index;
                                    QRespOErec.queryResponseSet_idx       = this.msg.ZtRawMessageAR[QRespOErec.queryResponseSetMember_idx].parent_index;
                                    //console.log("4144 this.msg.ZtRawMessageAR.length: "+ this.msg.ZtRawMessageAR.length);
                                    QRespOErec.response_idx           = this.msg.ZtRawMessageAR[QRespOErec.queryResponseSet_idx].parent_index;
                                    //QRespOErec.root_idx              = this.msg.ZtRawMessageAR[QRespOErec.response_idx].parent_index;


                                    var OE_idx = this.msg.queryResponseObjectElementWA_AR.push(QRespOErec) -1;
                                    
                                    for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++) {
                                         if(QRespOErec.object_idx == this.msg.queryResponseObjectWA_AR[j].object_idx){
                                               //   console.log("##^ 20211025 OE_idx: "+OE_idx);
                                               //   console.log("##^ 20211025 this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length: "+this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length);
                                                  this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.push(OE_idx);
                                                   }
                                          } // end of loop through queryResponseObjectWA_AR
                                      
                                    } //end 4144




//  end--modified for client

 
                                 
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4155) {   // load type values
                                    var typeValue_qresp_rec = new QueryResponseTypeWorkAreaRec();
                                    typeValue_qresp_rec.typeValueCode  = this.msg.ZtRawMessageAR[i].data;
                                    typeValue_qresp_rec.typeValueCode_idx         = this.msg.ZtRawMessageAR[i].index;
                                    typeValue_qresp_rec.typeValue_idx             = this.msg.ZtRawMessageAR[i].parent_index;
                                    //console.log("this.msg.ZtRawMessageAR.length: "+this.msg.ZtRawMessageAR.length);
                                    //console.log("typeValue_qresp_rec.typeValue_idx: "+typeValue_qresp_rec.typeValue_idx);
                                    typeValue_qresp_rec.typeValueSet_idx          = this.msg.ZtRawMessageAR[typeValue_qresp_rec.typeValue_idx].parent_index;
                                    typeValue_qresp_rec.object_idx         = this.msg.ZtRawMessageAR[typeValue_qresp_rec.typeValueSet_idx].parent_index;
                                    typeValue_qresp_rec.objectSet_idx      = this.msg.ZtRawMessageAR[typeValue_qresp_rec.object_idx].parent_index;
                                    typeValue_qresp_rec.queryResponseSetMember_idx = this.msg.ZtRawMessageAR[typeValue_qresp_rec.objectSet_idx].parent_index;
                                    typeValue_qresp_rec.queryResponseSet_idx       = this.msg.ZtRawMessageAR[typeValue_qresp_rec.queryResponseSetMember_idx].parent_index;
                                    typeValue_qresp_rec.response_idx           = this.msg.ZtRawMessageAR[typeValue_qresp_rec.queryResponseSet_idx].parent_index;
                                    typeValue_qresp_rec.root_idx              = this.msg.ZtRawMessageAR[typeValue_qresp_rec.response_idx].parent_index;


                                    var type_idx = this.msg.queryResponseTypeWA_AR.push(typeValue_qresp_rec) -1;

                                    for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++) {
                                         if(typeValue_qresp_rec.object_idx == this.msg.queryResponseObjectWA_AR[j].object_idx){
                                                  this.msg.queryResponseObjectWA_AR[j].type_idx_AR.push(type_idx);
                                                   }
                                          } // end of loop through queryResponseObjectWA_AR

                                    }   


                                    


    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4167) {   // load links
             var QRespLinkRec = new QueryResponseLinkWorkAreaRec();
             QRespLinkRec.linkToCode   = this.msg.ZtRawMessageAR[i].data;
             //console.log("QRespLinkRec.linkToCode: "+QRespLinkRec.linkToCode);
             //console.log("4167 this.msg.ZtRawMessageAR[i].index: "+this.msg.ZtRawMessageAR[i].index);
             QRespLinkRec.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
            // console.log("QRespLinkRec.rawMsg_idx: "+QRespLinkRec.rawMsg_idx);
             //console.log("this.msg.ZtRawMessageAR.length: "+this.msg.ZtRawMessageAR.length);
             //console.log("QRespLinkRec.rawMsg_idx].parent_index: "+this.msg.ZtRawMessageAR[QRespLinkRec.rawMsg_idx].parent_index);
             //console.log("this.msg.ZtRawMessageAR[QRespLinkRec.rawMsg_idx] "+this.msg.ZtRawMessageAR[QRespLinkRec.rawMsg_idx]);
             QRespLinkRec.link_idx     = this.msg.ZtRawMessageAR[QRespLinkRec.rawMsg_idx].parent_index;
             QRespLinkRec.linkSet_idx         = this.msg.ZtRawMessageAR[QRespLinkRec.link_idx].parent_index;
             QRespLinkRec.object_idx         =  this.msg.ZtRawMessageAR[QRespLinkRec.linkSet_idx].parent_index;
             QRespLinkRec.objectSet_idx      =  this.msg.ZtRawMessageAR[QRespLinkRec.object_idx].parent_index;
             QRespLinkRec.queryResponseSetMember_idx = this.msg.ZtRawMessageAR[QRespLinkRec.objectSet_idx].parent_index;
             QRespLinkRec.queryResponseSet_idx       = this.msg.ZtRawMessageAR[QRespLinkRec.queryResponseSetMember_idx].parent_index;
             QRespLinkRec.response_idx           =     this.msg.ZtRawMessageAR[QRespLinkRec.queryResponseSet_idx].parent_index;
             //console.log("20211217 QRespLinkRec.response_idx: "+QRespLinkRec.response_idx);
             //console.log("20211217 this.msg.ZtRawMessageAR[i].index: "+this.msg.ZtRawMessageAR[i].index);
             //console.log("20211217 this.msg.ZtRawMessageAR[i].data: "+this.msg.ZtRawMessageAR[i].data);
             //console.log("20211217 this.msg.ZtRawMessageAR[1179].parent_index: "+ this.msg.ZtRawMessageAR[1179].parent_index);
             //console.log("20211217 this.msg.ZtRawMessageAR.length: "+ this.msg.ZtRawMessageAR.length);
             //console.log("20211217 this.msg.ZtRawMessageAR[QRespLinkRec.response_idx].parent_index: "+this.msg.ZtRawMessageAR[QRespLinkRec.response_idx].parent_index);  
             QRespLinkRec.root_idx              =      this.msg.ZtRawMessageAR[QRespLinkRec.response_idx].parent_index;  

             var link_idx = this.msg.queryResponseLinkWA_AR.push(QRespLinkRec) -1;


             //console.log("QRespLinkRec.link_idx: "+QRespLinkRec.link_idx);
             //console.log("QRespLinkRec.linkSet_idx: "+QRespLinkRec.linkSet_idx);
             //console.log("QRespLinkRec.object_idx 20190921: "+QRespLinkRec.object_idx);
            
             for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++) {
                   //console.log("this.msg.queryResponseObjectWA_AR[j].object_idx: "+this.msg.queryResponseObjectWA_AR[j].object_idx);
                   if(QRespLinkRec.object_idx == this.msg.queryResponseObjectWA_AR[j].object_idx){
                      //  console.log("link_idx before push 20190922: "+ link_idx);
                        this.msg.queryResponseObjectWA_AR[j].link_idx_AR.push(link_idx);
                    }
             } // end of loop through queryResponseObjectWA_AR

       

    }  // end 4167

// start 20230728
    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41810) {   // statistical values object
      var QRespStatisticalValuesObjectRec = new QueryResponseStatisticalValuesObjectRec();
      QRespStatisticalValuesObjectRec.sv_obj_ztic = this.msg.ZtRawMessageAR[i].data;
      QRespStatisticalValuesObjectRec.rawMsg_idx  = this.msg.ZtRawMessageAR[i].index;
      QRespStatisticalValuesObjectRec.statisticalValuesObject_idx  = this.msg.ZtRawMessageAR[QRespStatisticalValuesObjectRec.rawMsg_idx].parent_index;
      this.msg.queryResponseStatisticalValuesObjectWA_AR.push(QRespStatisticalValuesObjectRec); 

    }  // end 41810


    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41831) {   // dimension
      var QRespDimensionRec = new QueryResponseDimensionRec();
      QRespDimensionRec.sv_dimension_ztic = this.msg.ZtRawMessageAR[i].data;
      QRespDimensionRec.rawMsg_idx  = this.msg.ZtRawMessageAR[i].index;
      QRespDimensionRec.dimensionSetMember_idx  = this.msg.ZtRawMessageAR[QRespDimensionRec.rawMsg_idx].parent_index; 
      //console.log("20230803c QRespDimensionRec.dimensionSetMember_idx: "+QRespDimensionRec.dimensionSetMember_idx);
      QRespDimensionRec.dimensionSet_idx        = this.msg.ZtRawMessageAR[QRespDimensionRec.dimensionSetMember_idx].parent_index;
      //console.log("20230803b QRespDimensionRec.dimensionSet_idx: "+QRespDimensionRec.dimensionSet_idx);
      QRespDimensionRec.statisticalValuesObject_idx = this.msg.ZtRawMessageAR[QRespDimensionRec.dimensionSet_idx].parent_index;

      //console.log("20230801a QRespDimensionRec.rawMsg_idx: "+QRespDimensionRec.rawMsg_idx);
      //console.log("20230801b QRespDimensionRec.dimensionSetMember_idx: "+QRespDimensionRec.dimensionSetMember_idx);
      //console.log("20230801c QRespDimensionRec.dimensionSet_idx: "+QRespDimensionRec.dimensionSet_idx);
      //console.log("20230801d QRespDimensionRec.statisticalValuesObject_idx: "+QRespDimensionRec.statisticalValuesObject_idx);

      for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++) {
         //console.log("20230801e this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx: "+this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx);
         if(QRespDimensionRec.statisticalValuesObject_idx == this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx){
            this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.push(QRespDimensionRec);
         } // endif
      } // 
                  
    }  // end 41831
    
    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41844) {   // type def set member ztic
      var QRespTypeDefAndValueRec = new QueryResponseStatisticalValueTypeDefAndValueRec();
      QRespTypeDefAndValueRec.type_def_ztic = this.msg.ZtRawMessageAR[i].data;
      QRespTypeDefAndValueRec.rawMsg_idx  = this.msg.ZtRawMessageAR[i].index;
      QRespTypeDefAndValueRec.typeDefinitionSetMember_idx  = this.msg.ZtRawMessageAR[QRespTypeDefAndValueRec.rawMsg_idx].parent_index; 
      QRespTypeDefAndValueRec.typeDefinitionSet_idx        = this.msg.ZtRawMessageAR[QRespTypeDefAndValueRec.typeDefinitionSetMember_idx].parent_index;
      QRespTypeDefAndValueRec.typeDefinitionPath_idx       = this.msg.ZtRawMessageAR[QRespTypeDefAndValueRec.typeDefinitionSet_idx].parent_index;
      QRespTypeDefAndValueRec.dimensionSetMember_idx       = this.msg.ZtRawMessageAR[QRespTypeDefAndValueRec.typeDefinitionPath_idx].parent_index;


      for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++) {
         for (var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.length; k++) {
            if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].dimensionSetMember_idx == QRespTypeDefAndValueRec.dimensionSetMember_idx){
               this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].typeDefinitionAndValue_AR.push(QRespTypeDefAndValueRec);
            }  // endif
         } // endfor    loop through dimension_AR

      } // endfor loop through ..StatisticalValuesObjectWA_AR

    }  // end 41844


    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41852) {   // statistical value
      var QRespStatValueRec = new QueryResponseStatisticalValueRec();
      QRespStatValueRec.statistical_value = this.msg.ZtRawMessageAR[i].data;
      QRespStatValueRec.rawMsg_idx  = this.msg.ZtRawMessageAR[i].index;
      QRespStatValueRec.statisticalValueSetMember_idx  = this.msg.ZtRawMessageAR[QRespStatValueRec.rawMsg_idx].parent_index;   //41850
      QRespStatValueRec.statisticalValueSet_idx        = this.msg.ZtRawMessageAR[QRespStatValueRec.statisticalValueSetMember_idx].parent_index;
      QRespStatValueRec.statisticalValuesObject_idx    = this.msg.ZtRawMessageAR[QRespStatValueRec.statisticalValueSet_idx].parent_index;

      for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++) {
      //   console.log("20230801e this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx: "+this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx);
         if(QRespStatValueRec.statisticalValuesObject_idx == this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx){
            this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR.push(QRespStatValueRec);
         } // endif
      } //   endfor loop through ...StatisticalValuesObjectWA_AR 



    }  // end 41852
    


    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41861) {   // type def and ztic for statistical value
      var QRespTypeDefAndValueRec = new QueryResponseStatisticalValueTypeDefAndValueRec();
      QRespTypeDefAndValueRec.type_def_ztic = this.msg.ZtRawMessageAR[i].data;
      QRespTypeDefAndValueRec.rawMsg_idx  = this.msg.ZtRawMessageAR[i].index;
      QRespTypeDefAndValueRec.typeDefinitionSetMember_idx = this.msg.ZtRawMessageAR[QRespTypeDefAndValueRec.rawMsg_idx].parent_index; 
      QRespTypeDefAndValueRec.typeDefinitionSet_idx = this.msg.ZtRawMessageAR[QRespTypeDefAndValueRec.typeDefinitionSetMember_idx].parent_index; 
      QRespTypeDefAndValueRec.statisticalValueSetMember_idx  = this.msg.ZtRawMessageAR[QRespTypeDefAndValueRec.typeDefinitionSet_idx].parent_index; 
      QRespTypeDefAndValueRec.statisticalValueSet_idx  = this.msg.ZtRawMessageAR[QRespTypeDefAndValueRec.statisticalValueSetMember_idx].parent_index;



      for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++) {
         for (var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR.length; k++) {
           // console.log("20230805a QRespTypeDefAndValueRec.statisticalValueSetMember_idx: "+QRespTypeDefAndValueRec.statisticalValueSetMember_idx);
           // console.log("20230805b this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].statisticalValueSetMember_idx: "+this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].statisticalValueSetMember_idx);
            if(QRespTypeDefAndValueRec.statisticalValueSetMember_idx == this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].statisticalValueSetMember_idx){
               this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].sv_typeDefAndValue_AR.push(QRespTypeDefAndValueRec);
            } // endif
         }  // endfor loop through stat_value_AR  
      } //   endfor loop through ...StatisticalValuesObjectWA_AR

    }  // end 41861





// end 20230728

// start 20250115
if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4201) {   // load response message status



   var respMsgStatusRec = new ResponseMessageStatusWorkAreaRec();
   respMsgStatusRec.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
   respMsgStatusRec.ztic         = this.msg.ZtRawMessageAR[i].data;
   respMsgStatusRec.responseMessageStatusSetMember_idx = this.msg.ZtRawMessageAR[respMsgStatusRec.rawMsg_idx].parent_index;
   respMsgStatusRec.responseMessageStatusSet_idx       = this.msg.ZtRawMessageAR[respMsgStatusRec.responseMessageStatusSetMember_idx].parent_index;
   respMsgStatusRec.response_idx = this.msg.ZtRawMessageAR[respMsgStatusRec.responseMessageStatusSet_idx].parent_index;
   this.msg.responseMessageStatusWA_AR.push(respMsgStatusRec);

}  // end 4201

// end 20250115

    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4301) {   // load server log system messages


      var svrLogSysMsgRec = new ServerLogSystemMessageWorkAreaRec();
      svrLogSysMsgRec.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
      svrLogSysMsgRec.ztic         = this.msg.ZtRawMessageAR[i].data;
      //svrLogSysMsgRec.ztic           = "1234"; // TEST REMOVE 20240212
      svrLogSysMsgRec.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgRec.rawMsg_idx].parent_index;
      svrLogSysMsgRec.serverLogSystemMessageSet_idx       = this.msg.ZtRawMessageAR[svrLogSysMsgRec.serverLogSystemMessageSetMember_idx].parent_index;
      this.msg.serverLogSystemMessageWA_AR.push(svrLogSysMsgRec);

    }  // end 4301


    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4332) {   // load server log system message parameters

       var svrLogSysMsgParamRec = new ServerLogSystemMessageWorkAreaParameterRec();
       svrLogSysMsgParamRec.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
       svrLogSysMsgParamRec.ztic         = this.msg.ZtRawMessageAR[i].data;
       svrLogSysMsgParamRec.parameterSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgParamRec.rawMsg_idx].parent_index;
       svrLogSysMsgParamRec.parameterSet_idx       = this.msg.ZtRawMessageAR[svrLogSysMsgParamRec.parameterSetMember_idx].parent_index;
       svrLogSysMsgParamRec.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgParamRec.parameterSet_idx].parent_index;
    svrLogSysMsgParamRec.serverLogSystemMessageSet_idx = this.msg.ZtRawMessageAR[svrLogSysMsgParamRec.serverLogSystemMessageSetMember_idx].parent_index;
     var param_idx = this.msg.serverLogSystemMessageWA_Parameter_AR.push(svrLogSysMsgParamRec) -1;
       for (var j = 0; j < this.msg.serverLogSystemMessageWA_AR.length; j++) {
         if(svrLogSysMsgParamRec.serverLogSystemMessageSetMember_idx == this.msg.serverLogSystemMessageWA_AR[j].serverLogSystemMessageSetMember_idx){
           this.msg.serverLogSystemMessageWA_AR[j].parameter_idx_AR.push(param_idx);
         } // endif
       
       } // endfor loop through this.msg.serverLogSystemMessageWA_AR
    }  // end 4332


// end of modification for client


     

// end (del) 20200108
                              
                                    
} // end of loop at MessageArray


//console.log("loading remaining values"); // these are i.e. siblings of values captured during the first pass
for (var i = 0; i < this.msg.ZtRawMessageAR.length; i++) {  // load remaining values
  //console.log(this.msg.ZtRawMessageAR[i].me_code);
  //if(parseInt(this.msg.ZtRawMessageAR[i].me_code)==900){console.log("found 900");}


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 2100){
                                   var ZTIC_rec_2100 = new ZTICUpdateWorkAreaRec();
                                   ZTIC_rec_2100.msgZTIC = this.msg.ZtRawMessageAR[i].data;
                                   ZTIC_rec_2100.dsi_idx = this.msg.ZtRawMessageAR[i].parent_index;
                                   for (var j = 0; j < this.msg.ZTIC_Array.length; j++){
                                      if(this.msg.ZTIC_Array[j].dsi_idx == ZTIC_rec_2100.dsi_idx){
                                        this.msg.ZTIC_Array[j].msgZTIC_idx = this.msg.ZtRawMessageAR[i].index;;
                                        this.msg.ZTIC_Array[j].msgZTIC     = ZTIC_rec_2100.msgZTIC;
                                      }
  
                                   }
  }  


                                
                                 
  
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4104) {   //20200605
          //  response type
          for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR.length; j++){
             if(this.msg.queryResponseSetMemberWA_AR[j].queryResponseSetMember_idx == this.msg.ZtRawMessageAR[i].parent_index){
                    this.msg.queryResponseSetMemberWA_AR[j].responseType  =  this.msg.ZtRawMessageAR[i].data;
              } // endif
          }  // endfor
  }  // end 4104

 
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4105) {   //20200605
          //  linkable object link type ztic
          for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR.length; j++){
             if(this.msg.queryResponseSetMemberWA_AR[j].queryResponseSetMember_idx == this.msg.ZtRawMessageAR[i].parent_index){
                    this.msg.queryResponseSetMemberWA_AR[j].linkableObjectLinkType_ztic  =  this.msg.ZtRawMessageAR[i].data;
              } // endif
          }  // endfor
  }  // end 4105


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4106) {   //20200605
          //  linkable object link type code
          for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR.length; j++){
             if(this.msg.queryResponseSetMemberWA_AR[j].queryResponseSetMember_idx == this.msg.ZtRawMessageAR[i].parent_index){
                    this.msg.queryResponseSetMemberWA_AR[j].linkableObjectLinkType_code  =  this.msg.ZtRawMessageAR[i].data;
              } // endif
          }  // endfor
  }  // end 4106
 

   if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41071) {   //20201112
          //  extended response object ZTIC
          for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR.length; j++){
             if(this.msg.queryResponseSetMemberWA_AR[j].queryResponseSetMember_idx == this.msg.ZtRawMessageAR[i].parent_index){
                    this.msg.queryResponseSetMemberWA_AR[j].extendedResponseObjectZTIC  =  this.msg.ZtRawMessageAR[i].data;
              } // endif
          }  // endfor
  }  // end 41071

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41072) {   //20201112
          //  extended response object code
          for (var j = 0; j < this.msg.queryResponseSetMemberWA_AR.length; j++){
             if(this.msg.queryResponseSetMemberWA_AR[j].queryResponseSetMember_idx == this.msg.ZtRawMessageAR[i].parent_index){
                    this.msg.queryResponseSetMemberWA_AR[j].extendedResponseObjectCode  =  this.msg.ZtRawMessageAR[i].data;
              } // endif
          }  // endfor
  }  // end 41072





  if(this.msg.ZtRawMessageAR[i].me_code.trim() == 4132){
                                    //object kind ztic 
                                   //console.log("reached 4132 20190920 plus data"+ this.msg.ZtRawMessageAR[i].data);
                                   for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++){
                                   //console.log("this.msg.queryResponseObjectWA_AR[j].object_idx: "+this.msg.queryResponseObjectWA_AR[j].object_idx);
                                   //console.log("this.msg.ZtRawMessageAR[i].parent_index: "+this.msg.ZtRawMessageAR[i].parent_index);
                                       if(this.msg.queryResponseObjectWA_AR[j].object_idx == this.msg.ZtRawMessageAR[i].parent_index){
                                                this.msg.queryResponseObjectWA_AR[j].objectKindZTIC = this.msg.ZtRawMessageAR[i].data;
                                        }
                                    }
   } // end 4132
                         
                                    

                  


  if(this.msg.ZtRawMessageAR[i].me_code.trim() == 4133){
                                    //object kind code 
                                   for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++){
                                       if(this.msg.queryResponseObjectWA_AR[j].object_idx == this.msg.ZtRawMessageAR[i].parent_index){
                                             this.msg.queryResponseObjectWA_AR[j].objectKindCode = this.msg.ZtRawMessageAR[i].data;
                                        }
                                    }
   } // end 4133                    
  


  if(this.msg.ZtRawMessageAR[i].me_code.trim() == 4134){
                                    //object ztic 
                                   for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++){
                                       if(this.msg.queryResponseObjectWA_AR[j].object_idx == this.msg.ZtRawMessageAR[i].parent_index){
                                             this.msg.queryResponseObjectWA_AR[j].objectZTIC = this.msg.ZtRawMessageAR[i].data;
                                        }
                                    }
   } // end 4134      


                  
 

   if(this.msg.ZtRawMessageAR[i].me_code.trim() == 4135){
                                    //object code
                                   for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++){
                                       if(this.msg.queryResponseObjectWA_AR[j].object_idx == this.msg.ZtRawMessageAR[i].parent_index){
                                             this.msg.queryResponseObjectWA_AR[j].objectCode = this.msg.ZtRawMessageAR[i].data;
                                        }
                                    }
   } // end 4135 




   if(this.msg.ZtRawMessageAR[i].me_code.trim() == 4137){
                                    //object code
                                   for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++){
                                       if(this.msg.queryResponseObjectWA_AR[j].object_idx == this.msg.ZtRawMessageAR[i].parent_index){
                                             this.msg.queryResponseObjectWA_AR[j].id = this.msg.ZtRawMessageAR[i].data;
                                        }
                                    }
   } // end 4137 


   if(this.msg.ZtRawMessageAR[i].me_code.trim() == 4138){
                                    //object code
                                   for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++){
                                       if(this.msg.queryResponseObjectWA_AR[j].object_idx == this.msg.ZtRawMessageAR[i].parent_index){
                                             this.msg.queryResponseObjectWA_AR[j].parentId = this.msg.ZtRawMessageAR[i].data;
                                        }
                                    }
   } // end 4138


   if(this.msg.ZtRawMessageAR[i].me_code.trim() == 4139){
                                    //object code
                                   for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++){
                                       if(this.msg.queryResponseObjectWA_AR[j].object_idx == this.msg.ZtRawMessageAR[i].parent_index){
                                             this.msg.queryResponseObjectWA_AR[j].levelsDown = this.msg.ZtRawMessageAR[i].data;
                                        }
                                    }
   } // end 4139


         
  

   if(this.msg.ZtRawMessageAR[i].me_code.trim() == 4142){   //object element ztic
                         var QrespOErec_4142 = new QueryResponseObjectElementWorkAreaRec();
                         QrespOErec_4142.objectElementZTIC = this.msg.ZtRawMessageAR[i].data;
                         //console.log("reached 4142: "+this.msg.ZtRawMessageAR[i].data+"-"+this.msg.ZtRawMessageAR[i].parent_index);
                         QrespOErec_4142.objectElement_idx = this.msg.ZtRawMessageAR[i].parent_index;
                         for (var j = 0; j < this.msg.queryResponseObjectElementWA_AR.length; j++){
                             // console.log("this.msg.queryResponseObjectElementWA_AR[j].objectElement_idx: "+this.msg.queryResponseObjectElementWA_AR[j].objectElement_idx);                       
                              if(this.msg.queryResponseObjectElementWA_AR[j].objectElement_idx == this.msg.ZtRawMessageAR[i].parent_index){
                         // console.log("20190924 this.msg.queryResponseObjectElementWA_AR[j].objectElement_idx == this.msg.ZtRawMessageAR[i].parent_index"+ this.msg.ZtRawMessageAR[i].parent_index);
                                      this.msg.queryResponseObjectElementWA_AR[j].objectElementZTIC = this.msg.ZtRawMessageAR[i].data;
                               }
                         }
   } // end 4142 


   if(this.msg.ZtRawMessageAR[i].me_code.trim() == 4143){   //object element code
                         var QrespOErec_4143 = new QueryResponseObjectElementWorkAreaRec();
                         QrespOErec_4143.objectElementCode = this.msg.ZtRawMessageAR[i].data;
                         //console.log("reached 4143: "+this.msg.ZtRawMessageAR[i].data+"-"+this.msg.ZtRawMessageAR[i].parent_index);
                         QrespOErec_4143.objectElement_idx = this.msg.ZtRawMessageAR[i].parent_index;
                         for (var j = 0; j < this.msg.queryResponseObjectElementWA_AR.length; j++){
                             // console.log("this.msg.queryResponseObjectElementWA_AR[j].objectElement_idx: "+this.msg.queryResponseObjectElementWA_AR[j].objectElement_idx);                       
                              if(this.msg.queryResponseObjectElementWA_AR[j].objectElement_idx == this.msg.ZtRawMessageAR[i].parent_index){
                         // console.log("20190924 this.msg.queryResponseObjectElementWA_AR[j].objectElement_idx == this.msg.ZtRawMessageAR[i].parent_index"+ this.msg.ZtRawMessageAR[i].parent_index);
                                      this.msg.queryResponseObjectElementWA_AR[j].objectElementCode = this.msg.ZtRawMessageAR[i].data;
                               }
                         }
   } // end 4142 



  
                                
//start of mod for client version
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4152){  //type definition code
                                    var typeValue_rec_4152 = new TypeValueUpdateWorkAreaRec();
                                    typeValue_rec_4152.typeDefinitionZTIC = this.msg.ZtRawMessageAR[i].data;
                                    typeValue_rec_4152.typeValue_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.queryResponseTypeWA_AR.length; j++){
                                       if(this.msg.queryResponseTypeWA_AR[j].typeValue_idx == typeValue_rec_4152.typeValue_idx){
                                       this.msg.queryResponseTypeWA_AR[j].typeDefinitionZTIC = typeValue_rec_4152.typeDefinitionZTIC;
                                       }
                                    
                                    }
                            
  }  // end 4153


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4153){  //type definition code
                                    var typeValue_rec_4153 = new TypeValueUpdateWorkAreaRec();
                                    typeValue_rec_4153.typeDefinitionCode = this.msg.ZtRawMessageAR[i].data;
                                    typeValue_rec_4153.typeValue_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.queryResponseTypeWA_AR.length; j++){
                                       if(this.msg.queryResponseTypeWA_AR[j].typeValue_idx == typeValue_rec_4153.typeValue_idx){
                                       this.msg.queryResponseTypeWA_AR[j].typeDefinitionCode = typeValue_rec_4153.typeDefinitionCode;
                                       }
                                    
                                    }
                            
  }  // end 4153
  
  


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4154){  //type value ztic
                                    var typeValue_rec_4154 = new QueryResponseTypeWorkAreaRec()
                                    typeValue_rec_4154.typeValueZTIC = this.msg.ZtRawMessageAR[i].data;
                                    typeValue_rec_4154.typeValue_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.queryResponseTypeWA_AR.length; j++){
                                       if(this.msg.queryResponseTypeWA_AR[j].typeValue_idx == typeValue_rec_4154.typeValue_idx){
                                    this.msg.queryResponseTypeWA_AR[j].typeValueZTIC = typeValue_rec_4154.typeValueZTIC;
                                       }
                                    }
  } //end 4154


  
 

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4162){  //link type ztic
                                    //console.log("found 4162 20190916");
                                    var link_rec_4162 = new QueryResponseLinkWorkAreaRec();
                                    link_rec_4162.linkTypeZTIC = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_4162.link_idx         = parseInt(this.msg.ZtRawMessageAR[i].parent_index);
                                    for (var j = 0; j < this.msg.queryResponseLinkWA_AR.length; j++){
                                       //console.log("this.msg.queryResponseLinkWA_AR[j].link_idx: "+this.msg.queryResponseLinkWA_AR[j].link_idx);
                                       if(this.msg.queryResponseLinkWA_AR[j].link_idx == link_rec_4162.link_idx){
                                       // console.log("4162 link_idx equal 20190916");
                                    this.msg.queryResponseLinkWA_AR[j].linkTypeZTIC = link_rec_4162.linkTypeZTIC;
                                       }
                                    }
  } //end 4162


    
   

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4163){  //link type code
                                    var link_rec_4163 = new QueryResponseLinkWorkAreaRec();
                                    link_rec_4163.linkTypeCode = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_4163.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.queryResponseLinkWA_AR.length; j++){
                                       if(this.msg.queryResponseLinkWA_AR[j].link_idx == link_rec_4163.link_idx){
                                    this.msg.queryResponseLinkWA_AR[j].linkTypeCode = link_rec_4163.linkTypeCode;
                                       }
                                    }
  } //end 4163






  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4164){  //link to kind ztic
                                    var link_rec_4164 = new QueryResponseLinkWorkAreaRec();
                                    link_rec_4164.linkToKindZTIC = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_4164.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.queryResponseLinkWA_AR.length; j++){
                                       if(this.msg.queryResponseLinkWA_AR[j].link_idx == link_rec_4164.link_idx){
                                    this.msg.queryResponseLinkWA_AR[j].linkToKindZTIC = link_rec_4164.linkToKindZTIC;
                                       }
                                    }
  } //end 4164




  
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4165){  //link to kind code
                                    var link_rec_4165 = new QueryResponseLinkWorkAreaRec();
                                    link_rec_4165.linkToKindCode = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_4165.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.queryResponseLinkWA_AR.length; j++){
                                       if(this.msg.queryResponseLinkWA_AR[j].link_idx == link_rec_4165.link_idx){
                                    this.msg.queryResponseLinkWA_AR[j].linkToKindCode = link_rec_4165.linkToKindCode;
                                       }
                                    }
  } //end 4165  
  

 
  
  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4166){  //link to ztic
                                    //console.log("found 4166 20190916");
                                    var link_rec_4166 = new QueryResponseLinkWorkAreaRec();
                                    link_rec_4166.linkToZTIC = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_4166.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.queryResponseLinkWA_AR.length; j++){
                                       if(this.msg.queryResponseLinkWA_AR[j].link_idx == link_rec_4166.link_idx){
                                    this.msg.queryResponseLinkWA_AR[j].linkToZTIC = link_rec_4166.linkToZTIC;
                                       }
                                    }
  } //end 4166 

// start 20210404


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41691){  //link to ztic
                                    //console.log("found 41691 20190916");
                                    var link_rec_41691 = new QueryResponseLinkWorkAreaRec();
                                    link_rec_41691.status = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_41691.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.queryResponseLinkWA_AR.length; j++){
                                       if(this.msg.queryResponseLinkWA_AR[j].link_idx == link_rec_41691.link_idx){
                                    this.msg.queryResponseLinkWA_AR[j].status = link_rec_41691.status;
                                       }
                                    }
  } //end 41691 


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41692){  //link to ztic
                                    //console.log("found 41692 20190916");
                                    var link_rec_41692 = new QueryResponseLinkWorkAreaRec();
                                    link_rec_41692.timestampEff = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_41692.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.queryResponseLinkWA_AR.length; j++){
                                       if(this.msg.queryResponseLinkWA_AR[j].link_idx == link_rec_41692.link_idx){
                                    this.msg.queryResponseLinkWA_AR[j].timestampEff = link_rec_41692.timestampEff;
                                       }
                                    }
  } //end 41692 


  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41693){  //link to ztic
                                    //console.log("found 41693 20190916");
                                    var link_rec_41693 = new QueryResponseLinkWorkAreaRec();
                                    link_rec_41693.linkValue = this.msg.ZtRawMessageAR[i].data;
                                    link_rec_41693.link_idx         = this.msg.ZtRawMessageAR[i].parent_index;
                                    for (var j = 0; j < this.msg.queryResponseLinkWA_AR.length; j++){
                                       if(this.msg.queryResponseLinkWA_AR[j].link_idx == link_rec_41693.link_idx){
                                    this.msg.queryResponseLinkWA_AR[j].linkValue = link_rec_41693.linkValue;
                                       }
                                    }
  } //end 41693 

// end 20210404 

// start 20230729

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41811){  //statistical values object code
   //console.log("found 41811 ");
   var sv_rec_41811 = new QueryResponseStatisticalValuesObjectRec();
   sv_rec_41811.sv_obj_code = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41811.statisticalValuesObject_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx == sv_rec_41811.statisticalValuesObject_idx){
         this.msg.queryResponseStatisticalValuesObjectWA_AR[j].sv_obj_code = sv_rec_41811.sv_obj_code;
      }
   }
} //end 41811

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41812){  //statistic type ztic
   //console.log("found 41812 ");
   var sv_rec_41812 = new QueryResponseStatisticalValuesObjectRec();
   sv_rec_41812.statistic_type_ztic = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41812.statisticalValuesObject_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx == sv_rec_41812.statisticalValuesObject_idx){
         this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statistic_type_ztic = sv_rec_41812.statistic_type_ztic;
      }
   }
} //end 41812

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41813){  //statistic type code
   //console.log("found 41813 ");
   var sv_rec_41813 = new QueryResponseStatisticalValuesObjectRec();
   sv_rec_41813.statistic_type_code = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41813.statisticalValuesObject_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx == sv_rec_41813.statisticalValuesObject_idx){
         this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statistic_type_code = sv_rec_41813.statistic_type_code;
      }
   }
} //end 41813


if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41814){  //source set ztic
   //console.log("found 41814 ");
   var sv_rec_41814 = new QueryResponseStatisticalValuesObjectRec();
   sv_rec_41814.source_obj_set_ztic = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41814.statisticalValuesObject_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx == sv_rec_41814.statisticalValuesObject_idx){
         this.msg.queryResponseStatisticalValuesObjectWA_AR[j].source_obj_set_ztic = sv_rec_41814.source_obj_set_ztic;
      }
   }
} //end 41814


if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41815){  //source set code
   //console.log("found 41815 ");
   var sv_rec_41815 = new QueryResponseStatisticalValuesObjectRec();
   sv_rec_41815.source_obj_set_code = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41815.statisticalValuesObject_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx == sv_rec_41815.statisticalValuesObject_idx){
         this.msg.queryResponseStatisticalValuesObjectWA_AR[j].source_obj_set_code = sv_rec_41815.source_obj_set_code;
      }
   }
} //end 41815

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41816){  //uom ztic
   //console.log("found 41816 ");
   var sv_rec_41816 = new QueryResponseStatisticalValuesObjectRec();
   sv_rec_41816.uom_ztic = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41816.statisticalValuesObject_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx == sv_rec_41816.statisticalValuesObject_idx){
         this.msg.queryResponseStatisticalValuesObjectWA_AR[j].uom_ztic = sv_rec_41816.uom_ztic;
      }
   }
} //end 41816

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41817){  //uom code
   //console.log("found 41817 ");
   var sv_rec_41817 = new QueryResponseStatisticalValuesObjectRec();
   sv_rec_41817.uom_code = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41817.statisticalValuesObject_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx == sv_rec_41817.statisticalValuesObject_idx){
         this.msg.queryResponseStatisticalValuesObjectWA_AR[j].uom_code = sv_rec_41817.uom_code;
      }
   }
} //end 41817

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41820){  //source obj elem ztic
   //console.log("found 41820 ");
   var sv_rec_41820 = new QueryResponseStatisticalValuesObjectRec();
   sv_rec_41820.source_obj_elem_ztic = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41820.statisticalValuesObject_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx == sv_rec_41820.statisticalValuesObject_idx){
         this.msg.queryResponseStatisticalValuesObjectWA_AR[j].source_obj_elem_ztic = sv_rec_41820.source_obj_elem_ztic;
      }
   }
} //end 41820

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41821){  //source obj elem code
   //console.log("found 41821 ");
   var sv_rec_41821 = new QueryResponseStatisticalValuesObjectRec();
   sv_rec_41821.source_obj_elem_code = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41821.statisticalValuesObject_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].statisticalValuesObject_idx == sv_rec_41821.statisticalValuesObject_idx){
         this.msg.queryResponseStatisticalValuesObjectWA_AR[j].source_obj_elem_code = sv_rec_41821.source_obj_elem_code;
      }
   }
} //end 41821

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41832){  //dimension code
   //console.log("found 41832  ");
   var sv_rec_41832 = new QueryResponseDimensionRec();
   sv_rec_41832.sv_dimension_code = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41832.dimensionSetMember_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
     for ( var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.length; k++){
      //console.log("20230803 this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].dimensionSetMember_idx: "+this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].dimensionSetMember_idx);
      //console.log("20230803 sv_rec_41832.dimensionSetMember_idx: "+sv_rec_41832.dimensionSetMember_idx);
      if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].dimensionSetMember_idx == sv_rec_41832.dimensionSetMember_idx){
         this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].sv_dimension_code = sv_rec_41832.sv_dimension_code;
      }  // endif
     }  // end for loop through dimension_AR 
   } // end for loop through queryResponseStatisticalValuesObjectWA_AR
} //end 41832

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41833){  //dimension label
   //console.log("found 41833 ");
   var sv_rec_41833 = new QueryResponseDimensionRec();
   sv_rec_41833.sv_dimension_label = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41833.dimensionSetMember_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      for ( var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.length; k++){
         //if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimensionSetMember_idx == sv_rec_41833.dimensionSetMember_idx){
         if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].dimensionSetMember_idx == sv_rec_41833.dimensionSetMember_idx){   
            this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].sv_dimension_label = sv_rec_41833.sv_dimension_label;
         }  // endif
      }  // endfor loop through dimension_AR   
   }  // endfor loop through queryResponseStatisticalValuesObjectWA_AR
} //end 41833

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41834){  //type def index for summarization
   //console.log("found 41834 ");
   var sv_rec_41834 = new QueryResponseDimensionRec();
   sv_rec_41834.type_def_idx_for_summarization = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41834.dimensionSetMember_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      for ( var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.length; k++){
         //if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimensionSetMember_idx == sv_rec_41834.dimensionSetMember_idx){
         if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].dimensionSetMember_idx == sv_rec_41834.dimensionSetMember_idx){    
            this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].type_def_idx_for_summarization = sv_rec_41834.type_def_idx_for_summarization;
         }  // endif
      } // endfor loop through dimension_AR   
   }  // endfor loop through queryResponseStatisticalValuesObjectWA_AR
} //end 41834


if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41835){  //type def index for grouping
   //console.log("found 41835 ");
   var sv_rec_41835 = new QueryResponseDimensionRec();
   sv_rec_41835.type_def_idx_for_grouping = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41835.dimensionSetMember_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      for ( var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.length; k++){
         //if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimensionSetMember_idx == sv_rec_41835.dimensionSetMember_idx){
         if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].dimensionSetMember_idx == sv_rec_41835.dimensionSetMember_idx){
            this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].type_def_idx_for_grouping = sv_rec_41835.type_def_idx_for_grouping;
         }  // endif
      } // endfor loop through dimension_AR   
   }  // endfor loop through queryResponseStatisticalValuesObjectWA_AR
} //end 41835

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41836){  //type def index for grouping2
   //console.log("found 41836 ");
   var sv_rec_41836 = new QueryResponseDimensionRec();
   sv_rec_41836.type_def_idx_for_grouping2 = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41836.dimensionSetMember_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      for ( var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.length; k++){
         if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].dimensionSetMember_idx == sv_rec_41836.dimensionSetMember_idx){
            this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].type_def_idx_for_grouping2 = sv_rec_41836.type_def_idx_for_grouping2;
         }  // endif
      }  // endfor loop through dimension_AR
   }  //  endfor loop through queryResponseStatisticalValuesObjectWA_AR
} //end 41836


if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41840){  //type def path ztic
   //console.log("found 41840 ");
   var sv_rec_41840 = new QueryResponseDimensionRec();
   sv_rec_41840.type_def_path_ztic = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41840.typeDefinitionPath_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   sv_rec_41840.dimensionSetMember_idx         = this.msg.ZtRawMessageAR[sv_rec_41840.typeDefinitionPath_idx].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      for ( var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.length; k++){
         if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].dimensionSetMember_idx == sv_rec_41840.dimensionSetMember_idx){
            this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].type_def_path_ztic = sv_rec_41840.type_def_path_ztic;
         } // endif
      } // endfor loop through dimension_AR   
   }  // endfor loop through .....StatisticalValuesObjectWA_AR
} //end 41840

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41841){  //type def path code
   //console.log("found 41841 ");
   var sv_rec_41841 = new QueryResponseDimensionRec();
   sv_rec_41841.type_def_path_code = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41841.typeDefinitionPath_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   sv_rec_41841.dimensionSetMember_idx         = this.msg.ZtRawMessageAR[sv_rec_41841.typeDefinitionPath_idx].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      for ( var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.length; k++){
         if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].dimensionSetMember_idx == sv_rec_41841.dimensionSetMember_idx){
            this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].type_def_path_code = sv_rec_41841.type_def_path_code;
         }
      }  // endfor loop through dimension_AR   
   }  // endfor loop through ..StatisticalValuesObjectWA_AR
} //end 41841

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41845){  //type def code for dimension
   //console.log("found 41845 ");
   var sv_rec_41845 = new QueryResponseStatisticalValueTypeDefAndValueRec();
   sv_rec_41845.type_def_code = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41845.typeDefinitionSetMember_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      for ( var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.length; k++){
         for ( var q = 0; q < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].typeDefinitionAndValue_AR.length; q++){
             if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].typeDefinitionAndValue_AR[q].typeDefinitionSetMember_idx == sv_rec_41845.typeDefinitionSetMember_idx){
                this.msg.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[k].typeDefinitionAndValue_AR[q].type_def_code = sv_rec_41845.type_def_code;
             }  // endif   
         }  // endfor loop through typeDefinitionAndValue_AR
      } // endfor loop through dimension_AR   
   }  // endfor loop through ..StatisticalValuesObjectWA_AR
} //end 41845

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41862){  //type def code for statistical value
   //console.log("found 41862 ");
   var sv_rec_41862 = new QueryResponseStatisticalValueTypeDefAndValueRec();
   sv_rec_41862.type_def_code = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41862.typeDefinitionSetMember_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      for (var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR.length; k++){

         for (var q = 0; q < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].sv_typeDefAndValue_AR.length; q++){
           if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].sv_typeDefAndValue_AR[q].typeDefinitionSetMember_idx == sv_rec_41862.typeDefinitionSetMember_idx){
             this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].sv_typeDefAndValue_AR[q].type_def_code = sv_rec_41862.type_def_code;
           }  // endif
         } // endfor loop through sv_typeDefAndValue_AR

      } // endfor loop through stat_value_AR
   }  // endfor loop through ..ObjectWA_AR
} //end 41862

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41863){  //type val ztic for statistical value
   //console.log("found 41863 ");
   var sv_rec_41863 = new QueryResponseStatisticalValueTypeDefAndValueRec();
   sv_rec_41863.type_val_ztic = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41863.typeDefinitionSetMember_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      for (var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR.length; k++){

         for (var q = 0; q < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].sv_typeDefAndValue_AR.length; q++){
           if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].sv_typeDefAndValue_AR[q].typeDefinitionSetMember_idx == sv_rec_41863.typeDefinitionSetMember_idx){
             this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].sv_typeDefAndValue_AR[q].type_val_ztic = sv_rec_41863.type_val_ztic;
           }  // endif
         } // endfor loop through sv_typeDefAndValue_AR

      } // endfor loop through stat_value_AR
   }  // endfor loop through ..ObjectWA_AR
} //end 41863

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 41864){  //type val code for statistical value
   //console.log("found 41864 ");
   var sv_rec_41864 = new QueryResponseStatisticalValueTypeDefAndValueRec();
   sv_rec_41864.type_val_code = this.msg.ZtRawMessageAR[i].data;
   sv_rec_41864.typeDefinitionSetMember_idx         = this.msg.ZtRawMessageAR[i].parent_index;
   for (var j = 0; j < this.msg.queryResponseStatisticalValuesObjectWA_AR.length; j++){
      for (var k = 0; k < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR.length; k++){

         for (var q = 0; q < this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].sv_typeDefAndValue_AR.length; q++){
           if(this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].sv_typeDefAndValue_AR[q].typeDefinitionSetMember_idx == sv_rec_41864.typeDefinitionSetMember_idx){
             this.msg.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[k].sv_typeDefAndValue_AR[q].type_val_code = sv_rec_41864.type_val_code;
           }  // endif
         } // endfor loop through sv_typeDefAndValue_AR

      } // endfor loop through stat_value_AR
   }  // endfor loop through ..ObjectWA_AR
} //end 41864


// end 20230729

// start 20250115
if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4202) {  // load response message status code
   var responseMessageStatusRec_4202 = new ResponseMessageStatusWorkAreaRec();
   responseMessageStatusRec_4202.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
   //console.log("20250116a this.msg.ZtRawMessageAR[i].index: "+this.msg.ZtRawMessageAR[i].index);
   responseMessageStatusRec_4202.code         = this.msg.ZtRawMessageAR[i].data;
   //console.log("20250116c this.msg.ZtRawMessageAR[i].data: "+this.msg.ZtRawMessageAR[i].data);
   //console.log("20250116cc responseMessageStatusRec_4202.rawMsg_idx: "+responseMessageStatusRec_4202.rawMsg_idx);
   //console.log("20250116ccc this.msg.ZtRawMessageAR[responseMessageStatusRec_4202.rawMsg_idx].parent_index: "+this.msg.ZtRawMessageAR[responseMessageStatusRec_4202.rawMsg_idx].parent_index);

   responseMessageStatusRec_4202.responseMessageStatusSetMember_idx = this.msg.ZtRawMessageAR[responseMessageStatusRec_4202.rawMsg_idx].parent_index;
   for (var j = 0; j < this.msg.responseMessageStatusWA_AR.length; j++){
      //console.log("20250116d this.msg.responseMessageStatusWA_AR[j].responseMessageStatusSetMember_idx: "+this.msg.responseMessageStatusWA_AR[j].responseMessageStatusSetMember_idx);
      //console.log("20250116e responseMessageStatusRec_4202.responseMessageStatusSetMember_idx: "+responseMessageStatusRec_4202.responseMessageStatusSetMember_idx);
      if(this.msg.responseMessageStatusWA_AR[j].responseMessageStatusSetMember_idx == responseMessageStatusRec_4202.responseMessageStatusSetMember_idx){
         this.msg.responseMessageStatusWA_AR[j].code = responseMessageStatusRec_4202.code;
      } // endif
   } //endfor loop through this.msg.responseMessageStatusWA_AR
    


} // end 4202

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4203) {  // load response message status timestamp
   var responseMessageStatusRec_4203 = new ResponseMessageStatusWorkAreaRec();
   responseMessageStatusRec_4203.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
   responseMessageStatusRec_4203.messageStatusTimestamp         = this.msg.ZtRawMessageAR[i].data;
   responseMessageStatusRec_4203.responseMessageStatusSetMember_idx = this.msg.ZtRawMessageAR[responseMessageStatusRec_4203.rawMsg_idx].parent_index;
   for (var j = 0; j < this.msg.responseMessageStatusWA_AR.length; j++){
      if(this.msg.responseMessageStatusWA_AR[j].responseMessageStatusSetMember_idx == responseMessageStatusRec_4203.responseMessageStatusSetMember_idx){
         this.msg.responseMessageStatusWA_AR[j].messageStatusTimestamp = responseMessageStatusRec_4203.messageStatusTimestamp;
      } // endif
   } //endfor loop through this.msg.responseMessageStatusWA_AR
} // end 4203

if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4204) {  // load response message status text
   var responseMessageStatusRec_4204 = new ResponseMessageStatusWorkAreaRec();
   responseMessageStatusRec_4204.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
   responseMessageStatusRec_4204.messageStatusText         = this.msg.ZtRawMessageAR[i].data;
   responseMessageStatusRec_4204.responseMessageStatusSetMember_idx = this.msg.ZtRawMessageAR[responseMessageStatusRec_4204.rawMsg_idx].parent_index;
   for (var j = 0; j < this.msg.responseMessageStatusWA_AR.length; j++){
      if(this.msg.responseMessageStatusWA_AR[j].responseMessageStatusSetMember_idx == responseMessageStatusRec_4204.responseMessageStatusSetMember_idx){
         this.msg.responseMessageStatusWA_AR[j].messageStatusText = responseMessageStatusRec_4204.messageStatusText;
      } // endif
   } //endfor loop through this.msg.responseMessageStatusWA_AR
} // end 4204

// end 20250115

  

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4300) {   // load server log system messages  -- id


      var svrLogSysMsgRec_4300 = new ServerLogSystemMessageWorkAreaRec();
      svrLogSysMsgRec_4300.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
      svrLogSysMsgRec_4300.id           = this.msg.ZtRawMessageAR[i].data;
      svrLogSysMsgRec_4300.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgRec.rawMsg_idx].parent_index;
      svrLogSysMsgRec_4300.serverLogSystemMessageSet_idx  = this.msg.ZtRawMessageAR[svrLogSysMsgRec.serverLogSystemMessageSetMember_idx].parent_index;
      //this.msg.serverLogSystemMessageWA_AR.push(svrLogSysMsgRec);
      for (var j = 0; j < this.msg.serverLogSystemMessageWA_AR.length; j++){
        if(this.msg.serverLogSystemMessageWA_AR[j].serverLogSystemMessageSetMember_idx == svrLogSysMsgRec_4300.serverLogSystemMessageSetMember_idx){
           this.msg.serverLogSystemMessageWA_AR[j].id = svrLogSysMsgRec_4300.id;
        } // endif
      } //endfor loop through this.msg.serverLogSystemMessageWA_AR

  }  // end 4300

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4302) {   // load server log system messages -- code
      var svrLogSysMsgRec_4302 = new ServerLogSystemMessageWorkAreaRec();
      svrLogSysMsgRec_4302.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
      svrLogSysMsgRec_4302.code         = this.msg.ZtRawMessageAR[i].data;
      svrLogSysMsgRec_4302.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgRec_4302.rawMsg_idx].parent_index;
      for (var j = 0; j < this.msg.serverLogSystemMessageWA_AR.length; j++){
        if(this.msg.serverLogSystemMessageWA_AR[j].serverLogSystemMessageSetMember_idx == svrLogSysMsgRec_4302.serverLogSystemMessageSetMember_idx){
           this.msg.serverLogSystemMessageWA_AR[j].code = svrLogSysMsgRec_4302.code;
        } // endif
      } //endfor loop through this.msg.serverLogSystemMessageWA_AR
  }  // end 4302

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4303) {   // load server log system messages -- message category
      var svrLogSysMsgRec_4303 = new ServerLogSystemMessageWorkAreaRec();
      svrLogSysMsgRec_4303.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
      svrLogSysMsgRec_4303.messageCategory         = this.msg.ZtRawMessageAR[i].data;
      svrLogSysMsgRec_4303.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgRec_4303.rawMsg_idx].parent_index;
      for (var j = 0; j < this.msg.serverLogSystemMessageWA_AR.length; j++){
        if(this.msg.serverLogSystemMessageWA_AR[j].serverLogSystemMessageSetMember_idx == svrLogSysMsgRec_4303.serverLogSystemMessageSetMember_idx){
           this.msg.serverLogSystemMessageWA_AR[j].messageCategory = svrLogSysMsgRec_4303.messageCategory;
        } // endif
      } //endfor loop through this.msg.serverLogSystemMessageWA_AR
  }  // end 4303

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4304) {   // load server log system messages -- timestamp
      var svrLogSysMsgRec_4304 = new ServerLogSystemMessageWorkAreaRec();
      svrLogSysMsgRec_4304.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
      svrLogSysMsgRec_4304.timestamp         = this.msg.ZtRawMessageAR[i].data;
      svrLogSysMsgRec_4304.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgRec_4304.rawMsg_idx].parent_index;
      for (var j = 0; j < this.msg.serverLogSystemMessageWA_AR.length; j++){
        if(this.msg.serverLogSystemMessageWA_AR[j].serverLogSystemMessageSetMember_idx == svrLogSysMsgRec_4304.serverLogSystemMessageSetMember_idx){
           this.msg.serverLogSystemMessageWA_AR[j].timestamp = svrLogSysMsgRec_4304.timestamp;
        } // endif
      } //endfor loop through this.msg.serverLogSystemMessageWA_AR
  }  // end 4304

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4311) {   // load server log system messages -- relatedSection
      var svrLogSysMsgRec_4311 = new ServerLogSystemMessageWorkAreaRec();
      svrLogSysMsgRec_4311.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
      svrLogSysMsgRec_4311.relatedSection    = this.msg.ZtRawMessageAR[i].data;
      svrLogSysMsgRec_4311.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgRec_4311.rawMsg_idx].parent_index;
      for (var j = 0; j < this.msg.serverLogSystemMessageWA_AR.length; j++){
        if(this.msg.serverLogSystemMessageWA_AR[j].serverLogSystemMessageSetMember_idx == svrLogSysMsgRec_4311.serverLogSystemMessageSetMember_idx){
           this.msg.serverLogSystemMessageWA_AR[j].relatedSection = svrLogSysMsgRec_4311.relatedSection;
        } // endif
      } //endfor loop through this.msg.serverLogSystemMessageWA_AR
  }  // end 4311

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4312) {   // load server log system messages -- relatedSectionID
      var svrLogSysMsgRec_4312 = new ServerLogSystemMessageWorkAreaRec();
      svrLogSysMsgRec_4312.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
      svrLogSysMsgRec_4312.relatedSectionID    = this.msg.ZtRawMessageAR[i].data;
      svrLogSysMsgRec_4312.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgRec_4312.rawMsg_idx].parent_index;
      for (var j = 0; j < this.msg.serverLogSystemMessageWA_AR.length; j++){
        if(this.msg.serverLogSystemMessageWA_AR[j].serverLogSystemMessageSetMember_idx == svrLogSysMsgRec_4312.serverLogSystemMessageSetMember_idx){
           this.msg.serverLogSystemMessageWA_AR[j].relatedSectionID = svrLogSysMsgRec_4312.relatedSectionID;
        } // endif
      } //endfor loop through this.msg.serverLogSystemMessageWA_AR
  }  // end 4312

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4313) {   // load server log system messages -- serialNumberOfRelatedMessageElement
      var svrLogSysMsgRec_4313 = new ServerLogSystemMessageWorkAreaRec();
      svrLogSysMsgRec_4313.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
      svrLogSysMsgRec_4313.serialNumberOfRelatedMessageElement    = this.msg.ZtRawMessageAR[i].data;
      svrLogSysMsgRec_4313.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgRec_4313.rawMsg_idx].parent_index;
      for (var j = 0; j < this.msg.serverLogSystemMessageWA_AR.length; j++){
        if(this.msg.serverLogSystemMessageWA_AR[j].serverLogSystemMessageSetMember_idx == svrLogSysMsgRec_4313.serverLogSystemMessageSetMember_idx){
           this.msg.serverLogSystemMessageWA_AR[j].serialNumberOfRelatedMessageElement = svrLogSysMsgRec_4313.serialNumberOfRelatedMessageElement;
        } // endif
      } //endfor loop through this.msg.serverLogSystemMessageWA_AR
  }  // end 4313

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4321) {   // load server log system messages -- shortSystemMessage
      var svrLogSysMsgRec_4321 = new ServerLogSystemMessageWorkAreaRec();
      svrLogSysMsgRec_4321.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
      svrLogSysMsgRec_4321.shortSystemMessage    = this.msg.ZtRawMessageAR[i].data;
      svrLogSysMsgRec_4321.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgRec_4321.rawMsg_idx].parent_index;
      //console.log("20240212d svrLogSysMsgRec_4321.serverLogSystemMessageSetMember_idx: "+svrLogSysMsgRec_4321.serverLogSystemMessageSetMember_idx);
      for (var j = 0; j < this.msg.serverLogSystemMessageWA_AR.length; j++){
        if(this.msg.serverLogSystemMessageWA_AR[j].serverLogSystemMessageSetMember_idx == svrLogSysMsgRec_4321.serverLogSystemMessageSetMember_idx){
           this.msg.serverLogSystemMessageWA_AR[j].shortSystemMessage = svrLogSysMsgRec_4321.shortSystemMessage;
        } // endif
      } //endfor loop through this.msg.serverLogSystemMessageWA_AR
  }  // end 4321

  if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4322) {   // load server log system messages -- longSystemMessage
      var svrLogSysMsgRec_4322 = new ServerLogSystemMessageWorkAreaRec();
      svrLogSysMsgRec_4322.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
      svrLogSysMsgRec_4322.longSystemMessage    = this.msg.ZtRawMessageAR[i].data;
      svrLogSysMsgRec_4322.serverLogSystemMessageSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgRec_4322.rawMsg_idx].parent_index;
      for (var j = 0; j < this.msg.serverLogSystemMessageWA_AR.length; j++){
        if(this.msg.serverLogSystemMessageWA_AR[j].serverLogSystemMessageSetMember_idx == svrLogSysMsgRec_4322.serverLogSystemMessageSetMember_idx){
           this.msg.serverLogSystemMessageWA_AR[j].longSystemMessage = svrLogSysMsgRec_4322.longSystemMessage;
           //console.log("20250112b this.msg.serverLogSystemMessageWA_AR[j].longSystemMessage in client_message_parse.js: "+this.msg.serverLogSystemMessageWA_AR[j].longSystemMessage);
        } // endif
      } //endfor loop through this.msg.serverLogSystemMessageWA_AR
  }  // end 4322


    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4333) {   // load server log system message parameters -- code


       var svrLogSysMsgParamRec_4333 = new ServerLogSystemMessageWorkAreaParameterRec();
       svrLogSysMsgParamRec_4333.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
       svrLogSysMsgParamRec_4333.code         = this.msg.ZtRawMessageAR[i].data;
       svrLogSysMsgParamRec_4333.parameterSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgParamRec_4333.rawMsg_idx].parent_index;
       for (var j = 0; j < this.msg.serverLogSystemMessageWA_Parameter_AR.length; j++){
          if(this.msg.serverLogSystemMessageWA_Parameter_AR[j].parameterSetMember_idx == svrLogSysMsgParamRec_4333.parameterSetMember_idx){
            this.msg.serverLogSystemMessageWA_Parameter_AR[j].code = svrLogSysMsgParamRec_4333.code;
          }  // endif
       } // endfor loop through this.msg.serverLogSystemMessageWA_Parameter_AR

    }  // end 4333


    if (this.msg.ZtRawMessageAR[i].me_code.trim() == 4334) {   // load server log system message parameters -- value

       var svrLogSysMsgParamRec_4334 = new ServerLogSystemMessageWorkAreaParameterRec();
       svrLogSysMsgParamRec_4334.rawMsg_idx   = this.msg.ZtRawMessageAR[i].index;
       svrLogSysMsgParamRec_4334.value         = this.msg.ZtRawMessageAR[i].data;
       svrLogSysMsgParamRec_4334.parameterSetMember_idx = this.msg.ZtRawMessageAR[svrLogSysMsgParamRec_4334.rawMsg_idx].parent_index;
       for (var j = 0; j < this.msg.serverLogSystemMessageWA_Parameter_AR.length; j++){
          if(this.msg.serverLogSystemMessageWA_Parameter_AR[j].parameterSetMember_idx == svrLogSysMsgParamRec_4334.parameterSetMember_idx){
            this.msg.serverLogSystemMessageWA_Parameter_AR[j].value = svrLogSysMsgParamRec_4334.value;
          }  // endif
       } // endfor loop through this.msg.serverLogSystemMessageWA_Parameter_AR

    }  // end 4334


  
  
}// end loop through MessageArray to load remaining values


// start 20211026
 // console.log("end of message parse in zt_client_message_parse.js");
  for(var h = 0; h < this.msg.queryResponseSetMemberWA_AR.length; h++){
  // console.log("20240108f this.msg.queryResponseSetMemberWA_AR[h].setMemberID: "+this.msg.queryResponseSetMemberWA_AR[h].setMemberID);
  }

  for (var j = 0; j < this.msg.queryResponseObjectWA_AR.length; j++) {
   //console.log("##^ 20211026 this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length: " +this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length);              
     for (var h = 0; h < this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR.length; h++) {                              
 //console.log("this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR[h]:"+this.msg.queryResponseObjectWA_AR[j].objectElement_idx_AR[h]);                        
     }                           
  } // end of loop through queryResponseObjectWA_AR
                                      
// end 20211026


// start 20250116

//console.log("20250116a this.msg.responseMessageStatusWA_AR.length: "+this.msg.responseMessageStatusWA_AR.length);
this.msg.responseMessageStatusWA_AR.forEach((responseMessageStatusWA) => {
   //console.log("20250110b responseMessageStatusWA.ztic - code: "+responseMessageStatusWA.ztic+" - "+responseMessageStatusWA.code);
  });

// end 20250116




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
   this.responseType                 = "";     //4104                            20200605
   this.linkableObjectLinkType_ztic  = "";     //4105  - for response type 2     20200605
   this.linkableObjectLinkType_code  = "";     //4106  - for response type 2     20200605
   this.extendedResponseObjectZTIC   = "";     //41071   for response type 3-->5  20201112
   this.extendedResponseObjectCode   = "";     //41072   for response type 3-->5  20201112
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
 
// start 20250115
function ResponseMessageStatusWorkAreaRec(){
   this.rawMsg_idx = "";
   this.responseMessageStatusSetMember_idx = "";  //420
   this.responseMessageStatusSet_idx       = "";  //42
   this.response_idx     = "";                     //4
   //this.id  = "";                                  //4200
   this.ztic  = "";                                //4201
   this.code  = "";                                //4202
   this.messageStatusTimestamp = "";               //4203
   this.messageStatusText = "";                    //4204
}  // end of function ResponseMessageStatusWorkAreaRec()



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


                                   



function QueryResponseStatisticalValuesObjectRec() {
   //      41810--StatisticalValuesObjectZTIC								
   //      41811--StatisticalValuesObjectCode
   //      41812--StatisticTypeZTIC								
   //      41813--StatisticTypeCode (1=sum, 2=count, 3=mean, 4=median, 5=mode, 6=standard deviation)	
   //      41814--SourceSetZTIC
   //      41815--SourceSetCode
   //      41816--UomZTIC						
   //      41817--UomCode
   //      41820--SourceObjectElementZTIC
   //      41821--SourceObjectElementCode
   //      41822--StatisticalValuesObjectLabel														
   //      4183--DimensionSet	
   this.rawMsg_idx = "";

   this.statisticalValuesObject_idx     = "";   //4181
   this.statisticalValuesObjectSet_idx  = "";   //4180
   this.queryResponseSetMember_idx    = "";   //410
   this.queryResponseSet_idx          = "";   //41
   this.response_idx                  = "";   //4
   this.root_idx                      = "";   //1


   this.sv_obj_ztic = "";
   this.sv_obj_code = "";
//   this.sv_obj_idx = "";
     this.statistic_type_ztic = "";
     this.statistic_type_code = "";  // sum, count, mean, median, mode, standard deviation
     this.source_obj_set_ztic = "";
     this.source_obj_set_code = "";
     this.uom_ztic      = "";
     this.uom_code      = "";
     this.source_obj_elem_ztic = "";
     this.source_obj_elem_code = "";
     this.source_obj_idx_AR  = [];
     this.dimension_AR = [];
     this.stat_value_AR = [];


}   // end of QueryResponseStatisticalValuesObjectRec()


function QueryResponseDimensionRec() {
      //   4181--StatisticalValuesObject
      //      4183--DimensionSet								
      //          41830--DimensionSetMember							
      //              41831--DimensionZTIC						
      //              41832--DimensionCode	
      //              41833--DimensionLabel					
      //              41834--IndexOfTypeDefinitionPathForDataSummarization i.e. account for financial posting
      //              41835--IndexOfTypeDefinitionPathForGrouping	i.e. account category for financial posting, income, expense	
      //              41836--IndexOfTypeDefinitionPathForGrouping2								
      //              4184--TypeDefinitionPath
      //                  41840--PathZTIC
      //                  41841--PathCode
      //                  41842--TypeDefinitionSet
      //                      41843--TypeDefinitionSetMember
      //                          41844--TypeDefinitionZTIC
      //                          41845--TypeDefinitionCode
      //                          41846--IndexInPath	

   this.rawMsg_idx = "";

   this.typeDefinitionPath_idx          = "";   //4184
   this.dimensionSetMember_idx          = "";   //41830
   this.dimensionSet_idx                = "";   //4183
   this.statisticalValuesObject_idx     = "";   //4181
   this.statisticalValuesObjectSet_idx  = "";   //4180
   this.queryResponseSetMember_idx    = "";   //410
   this.queryResponseSet_idx          = "";   //41
   this.response_idx                  = "";   //4
   this.root_idx                      = "";   //1


   this.sv_dimension_ztic = "";
   this.sv_dimension_code = "";
   this.sv_dimension_label = "";
   this.type_def_idx_for_summarization = 0;
   this.type_def_idx_for_grouping = 0;
   this.type_def_idx_for_grouping2 = 0;
   this.type_def_path_ztic = "";
   this.type_def_path_code = "";
   
   this.typeDefinitionAndValue_AR = [];


}   // end of QueryResponseDimensionRec()


function QueryResponseStatisticalValueRec() {
          //  4181--StatisticalValuesObject
         //      4185--StatisticalValueSet								
      //          41850--StatisticalValueSetMember							
      //              41851--StatisticalValueMemberID						
      //              41852--StatisticalValue						
      //              4186--StatisticalValueTypeValueSet						
      //                  41860--StatisticalValueTypeValueSetMember				
      //                      41861--SortKey
      //                      41862--TypeDefinitionZTIC
      //                      41863--TypeDefinitionCode		
      //                      41864--TypeValueZTIC			
      //                      41865--TypeValueCode			
      //                  	  41866--TypeValueForSummarizationLabel
      //                      41867--GroupCode
      //                      41868--GroupCode2

      this.statisticalValueSetMember_idx          = "";   //41850
      this.statisticalValueSet_idx                = "";   //4185
      this.statisticalValuesObject_idx     = "";   //4181
      this.statisticalValuesObjectSet_idx  = "";   //4180
      this.queryResponseSetMember_idx    = "";   //410
      this.queryResponseSet_idx          = "";   //41
      this.response_idx                  = "";   //4
      this.root_idx                      = "";   //1


      this.sv_id              = "";
      this.statistical_value  = "";
      this.sv_typeDefAndValue_AR       = [];


}  // end of function QueryResponseStatisticalValueRec() 


function QueryResponseStatisticalValueTypeDefAndValueRec() {

   this.statisticalValueSetMember_idx   = "";   //41850
   this.statisticalValueSet_idx         = "";   //4185
   this.typeDefinitionSetMember_idx     = "";   //41843
   this.typeDefinitionSet_idx           = "";   //41842
   this.typeDefinitionPath_idx          = "";   //4184
   this.dimensionSetMember_idx          = "";   //41830
   this.dimensionSet_idx                = "";   //4183
   this.statisticalValuesObject_idx     = "";   //4181
   this.statisticalValuesObjectSet_idx  = "";   //4180
   this.queryResponseSetMember_idx    = "";   //410
   this.queryResponseSet_idx          = "";   //41
   this.response_idx                  = "";   //4
   this.root_idx                      = "";   //1

       //      4185--StatisticalValueSet								
    //          41850--StatisticalValueSetMember							
    //              41851--StatisticalValueMemberID						
    //              41852--StatisticalValue						
    //              4186--StatisticalValueTypeValueSet						
    //                  41860--StatisticalValueTypeValueSetMember

      this.type_def_ztic = "";
      this.type_def_code = "";
      this.sortStr = "";
      this.type_def_label = "";
      this.obj_idx = 0;
      this.type_val_kind_ztic = "";
      this.type_val_kind_code = "";
      this.type_val_ztic = "";
      this.type_val_code = "";
      this.type_val_label = "";
      this.type_val_sortStr = "";


}  //   QueryResponseTypeDefAndValueRec() 






module.exports = ZtMessageParse;
