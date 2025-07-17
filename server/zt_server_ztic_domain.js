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


class ZtZTICDomain {


    constructor(dbzti_idx) {
 
      //this.ztic_AR = [];   //to be deprecated

      this.dbzti_id = dbzti_idx.toString().trim();
      this.ZTICNS_AR = [];
  
   
  } // end of constructor

 addZTIC(codex, namespacex) {

//console.log("running ZtZTICDomain.addZTIC: "+codex+"-"+namespacex);
      
     var zticEntry = new DsZTICEntry(codex, namespacex);
     var entry_ok = true;
     for (var i = 0; i < this.ZTICNS_AR.length; i++) {
        if(this.ZTICNS_AR[i].code == codex.toString().trim() ){entry_ok = false;};

     } // end of loop through ZTICNS_AR

     for (var i = 0; i < this.ZTICNS_AR.length; i++) {
        if(this.ZTICNS_AR[i].namespace == namespacex.toString().trim()){entry_ok = false;};

     } // endfor --loop through ZTICNS_AR


     if (entry_ok) 
        {this.ZTICNS_AR.push(zticEntry);}
       else
        {
         // console.log("no new ztic added:  "+codex+" - "+namespacex);
        };
     
 
}  // end of addZTIC



 convertCode(codex, zticDomainx) {
       var this_ns = "";
       var return_code = "";
       for (var i = 0; i < this.ZTICNS_AR.length; i++) {
         if(this.ZTICNS_AR[i].code == codex.toString().trim()){this_ns = this.ZTICNS_AR[i].namespace;};

     } // endfor--loop through ZTICNS_AR    

      for (var i = 0; i < zticDomainx.ZTICNS_AR.length; i++) {
        if(zticDomainx.ZTICNS_AR[i].namespace == this_ns){return_code = zticDomainx.ZTICNS_AR[i].code;};
  
     } //endfor zticDomainx.ZTICNS_AR
     if(return_code == "")
        {console.log("convert ztic failed: "+ codex);}
       else
        {return return_code;};

 
}  // end of convertCode


  getCodeForNS(namespacex) {

var returnCode = "";

for (var i = 0; i < this.ZTICNS_AR.length; i++) {

  if(this.ZTICNS_AR[i].namespace.toString().trim() == namespacex.toString().trim() ){
       returnCode =  this.ZTICNS_AR[i].code.toString().trim();
  }  //endif

} //endfor loop through this.ZTICNS_AR


if(returnCode == ""){
   console.log("no code found for namespace: "+namespacex + " at ZtZTICDomain.getCodeForNS");
  }
  else
  { return returnCode;}

} // end of getCodeForNS


 // initializeZTICDomain_asynch(zticDom);
  initializeZTICDomain_asynch(Msg, svr1){
var zticDom = this;
//var query = Msg.find().where({ te_2_2 : "14", te_2_8 : "34", te_2_32 : zticDom.dbzti_id});  //(del) 20160912
var query = Msg.find().where({ te_2_32 : zticDom.dbzti_id.toString().trim()});                                  //(insert) 20160912
query.exec(function(err, result) {
   if (!err) {
     //console.log("start of namespaces");
     //zticDom.initializeZTICDomainCallback(null, result, zticDom);
     zticDom.initializeZTICDomainCallback(null, result, svr1);
    } else {
               // error handling
    }; //end if (!err)
 

 });  

///////////////////////////////////////} // end of query



}  // end of initializeZTICDomain_asynch(zticDom);





  initializeZTICDomainCallback(err, result, svr1) {
    var zticDom = this;
    //console.log("initializeZTICDomainCallback result length: "+ result.length);
var Client = require('node-rest-client').Client;
    var client = new Client(); 
    //console.log("DB load start--object HM length: "+ svr1.ZtObject_HM.count());
    //console.log("DB load result length: "+result.length);
    var ns_found_for_dbzti_id = false;
    for (var j = 0; j < result.length; j++){
 
    if (result[j].te_2_2 == "14" && result[j].te_2_8 == "34" && result[j].te_2_32 == zticDom.dbzti_id ){
      if (result[j].te_2_4 == 1 && result[j].te_2_32.trim() == zticDom.dbzti_id.trim()){
         ns_found_for_dbzti_id = true;
         if (result[j].te_2_31.trim() != zticDom.ZTICNS_AR[0].namespace.trim()){
           ns_found_for_dbzti_id = false;
           console.log("error: inconsistent namespace for dbzti_id: "+zticDom.dbzti_id+"  "+result[j].te_2_31.trim()+" in DB vs "+zticDom.ZTICNS_AR[0].namespace.trim()+" in sys params");
         }
      
      }

      zticDom.addZTIC(result[j].te_2_4, result[j].te_2_31);
       
     } // endif result[j].te_2_2 == "14" && result[j].te_2_8 == "34"&& result[j].te_2_32 == zticDom.dbzti_id

      
      var obj_key = zticDom.dbzti_id.trim()+"_"+result[j].te_2_1.trim()+"_"+ result[j].te_2_2.trim()+"_"+ result[j].te_2_3.trim()+"_"+ result[j].te_2_4.trim();
      if (!svr1.ZtObject_HM.has(obj_key)){

          //var dsobj = new ZtObject(zticDom.dbzti_id, result[j].te_2_1.trim(), result[j].te_2_2.trim(), result[j].te_2_3.trim(), result[j].te_2_4.trim()); (del) 20190827
          var dsobj = new (require('./zt_server_object'))(svr1, zticDom.dbzti_id, result[j].te_2_1.trim(), result[j].te_2_2.trim(), result[j].te_2_3.trim(), result[j].te_2_4.trim());
         
          //svr1.ZtObject_AR.push(dsobj);

          svr1.ZtObject_HM.set(obj_key, dsobj);
          var dso_idx = svr1.ZtObject_AR.push(dsobj) -1;
          svr1.ZtObject_idx_HM.set(obj_key,dso_idx);
      } // endif !svr1.ZtObject_HM.has(obj_key)
      
   //te_2_6 Record Type Codes 1=Standard, 2=Extended Key, 3=Type Table, 4=Link  5=Object Template   
      // load object element values into array 
      //console.log("20191008: "+result[j].te_2_6);
      if (result[j].te_2_6 == 1 || result[j].te_2_6 == 2) {
//(del) 20191108      var OE_value = new ZtObjectElementValue(obj_key, result[j].te_2_7, result[j].te_2_8, result[j].te_2_9, result[j].te_2_10, result[j].te_2_11, result[j].te_2_12, result[j].te_2_25, result[j].te_2_26, result[j].te_2_27, result[j].te_2_31);
var OE_value = new (require('./zt_server_object_element_value'))(obj_key, result[j].te_2_7, result[j].te_2_8, result[j].te_2_9, result[j].te_2_10, result[j].te_2_11, result[j].te_2_12, result[j].te_2_25, result[j].te_2_26, result[j].te_2_27, result[j].te_2_31, result[j].te_2_23, result[j].te_2_24);

        var oe_idx = svr1.ZtObjectElement_AR.push(OE_value) -1;
    //  function ZtObjectElementValue(obectjKey, ek_defZTIC, ek_defCode, ek_valueZTIC, ek_valueCode, status, timestamp, seqNum, value) {

    
    // start 20160920
       
       svr1.ZtObject_HM.get(obj_key).objElemIdx_AR.push(oe_idx);
      // console.log("objElemIdx_AR OE idx:-- " + svr1.ZtObject_HM.get(obj_key).objElemIdx_AR[0]);
    
      // end 20160920  
      }  // endif  (result[j].te_2_6 == 1 || result[j].te_2_6 == 2)
      

 
 
      
     // load type values 
     if (result[j].te_2_6 == 3) {
//(del) 20191108     var objType_value = new ZtObjectTypeValue(obj_key, result[j].te_2_13, result[j].te_2_14, result[j].te_2_15, result[j].te_2_16, result[j].te_2_25, result[j].te_2_26, result[j].te_2_27);

var objType_value = new (require('./zt_server_object_type_value'))(obj_key, result[j].te_2_13, result[j].te_2_14, result[j].te_2_15, result[j].te_2_16, result[j].te_2_25, result[j].te_2_26, result[j].te_2_27, result[j].te_2_23, result[j].te_2_24);

     var objType_idx = svr1.ZtObjectTypeValue_AR.push(objType_value) -1;
     svr1.ZtObject_HM.get(obj_key).typeValueIdx_AR.push(objType_idx);
   
   
     } // endif result[j].te_2_6 == 3
     
     
     // load links into array
     if (result[j].te_2_6 == 4) {
     


var objLink = new (require('./zt_server_object_link'))(svr1, obj_key, result[j].te_2_17, result[j].te_2_18, result[j].te_2_19, result[j].te_2_20, result[j].te_2_21, result[j].te_2_22, result[j].te_2_30, result[j].te_2_25, result[j].te_2_26, result[j].te_2_27, result[j].te_2_23, result[j].te_2_24);
   var objLink_idx = svr1.ZtObjectLink_AR.push(objLink) -1;
   svr1.ZtObject_HM.get(obj_key).linkIdx_AR.push(objLink_idx);

     
     } // endif result[j].te_2_6 == 4
     
      
     // load maintained templates
     //if (result[j].te_2_6 == 5) { (del) 20191117
     if (result[j].te_2_6 == 5 || result[j].te_2_6 == 1 || result[j].te_2_6 == 3 || result[j].te_2_6 == 4) {
 //function ZtObjectTemplate(objectKey, templ_ztic, templ_code, status, timestamp, seqNum) 


 
     
     } // endif result[j].te_2_6 == 5
   
   
   
    } //endfor loop through result
  
    //if (result.length == 0)
    if (ns_found_for_dbzti_id)
    {
    //if no existing namespace for dbzti_id, create a new namespace entry
         var args = {
 data: { te_2_32: zticDom.dbzti_id,
         te_2_1: "3",
         te_2_2: "14", //object kind for DS Instances
         te_2_3: "1",  //ZTIC for all ZTICs is locale (1)
         te_2_4: "1",  //code for all local ZTIC (1)
         te_2_5: "2",
         te_2_6: "1",
         te_2_7: "2",
         te_2_8: "34", //table element for namespaces
         te_2_31: zticDom.ZTICNS_AR[0].namespace },
         headers: { "Content-Type": "application/json" }
};
client.post("http://localhost:5001/ZtObjectDbRec/insert", args, function (data, response) {
   // parsed response body as js object 
   //console.log(data);
  
});  //end post
    
    
    }  // endif result.length == 0
  //console.log("DB load end--zticDom.ZTICNS_AR length: "+zticDom.ZTICNS_AR.length+" for dbzti_id: "+zticDom.dbzti_id); 
  for (var i = 0; i < zticDom.ZTICNS_AR.length; i++){
  //  console.log("zticDom.ZTICNS_AR[i].namespace: "+zticDom.ZTICNS_AR[i].code +" "+ zticDom.ZTICNS_AR[i].namespace);
 //svr1.ZTICDomain_AR[i].ZTICNS_AR[0].namespace
  } 
  //console.log("DB load end--object HM count: "+ svr1.ZtObject_HM.count());   //20160912 
  //console.log(" svr1.ZtObjectElement_AR.length: "+  svr1.ZtObjectElement_AR.length); 
  //for (var k = 0; k<svr1.ZtObjectElement_AR.length; k++){console.log(svr1.ZtObjectElement_AR[k].value);}

     console.log("svr1.ZtObjectLink_AR.length at end of initializeServerZTICcallback: "+svr1.ZtObjectLink_AR.length);

} // end of ZTICDomain.prototype.initializeServerZTICcallback




} // end of class ZtZTICDomain


class DsZTICEntry {


    constructor(code, namespace) {
      this.code  = code.toString().trim();
      this.namespace = namespace.toString().trim();
   
   
  } // end of constructor

}   // end of class DsZTICEntry





module.exports = ZtZTICDomain;
