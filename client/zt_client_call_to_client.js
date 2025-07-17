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


// program to create storage domain by passing message in record format






class ZtClientCallToClient {


    constructor(urlx, recordFormatMsg_ARx) {

    this.url  = urlx;
    this.recordFormatMsg_AR = recordFormatMsg_ARx;
     
  } // end of constructor






processRecordFormatMessage() { 
  console.log("executing ZtClientCallToClient.processRecordFormatMessage");
var request = require('request')


var urlx = this.url;

var resp_msg;
var options = {
  method: 'post',
  body: this.recordFormatMsg_AR,
  json: true, // Use,If you are sending JSON data

  url: urlx,

}
 //}  //added (moved from above) 20181004  (del) 20191011  
request(options, function (err, res, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  console.log(' Body :', body);  //(del) 20200103
  console.log(' res  :'. res);

  resp_msg = body;
  console.log("resp_msg.maintainResponseObjectWA_AR.length: "+ resp_msg.maintainResponseObjectWA_AR.length);
 for (var i = 0; i < resp_msg.maintainResponseObjectWA_AR.length; i++){
   console.log("resp_msg.maintainResponseObjectWA_AR[i].objectCodeAssigned: "+resp_msg.maintainResponseObjectWA_AR[i].objectCodeAssigned);
 } // endfor



for(var h = 0; h < resp_msg.queryResponseSetMemberWA_AR.length; h++){
  if(resp_msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){

     for(var k = 0; k < resp_msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
        console.log("Object: ");
    //  console.log("Object: "+ this.msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectCode);
        var objx = resp_msg.queryResponseObjectWA_AR[resp_msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
          console.log("objx.objectZTIC - objx.objectCode: "+objx.objectZTIC+" - "+objx.objectCode);
          console.log("objx.id - objx.parentId - objx.levelsDown: "+objx.objectKindZTIC+"/"+objx.objectKindCode+"/"+objx.objectZTIC+"/"+objx.objectCode+"  = "+objx.id + " - " + objx.parentId + " - " + objx.levelsDown);

           console.log("Object Element values");
     
        for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

/////      //this.addMessageOEvalueToSession(objx, msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]]);  // 20200702                               (del) 20200824
/////      var AddMessageOEvalueToSession_wa_rec = new AddMessageOEvalueToSessionWorkAreaRec(objx, msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]]);   // 20200824
            console.log(resp_msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC + " - "+
            resp_msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode + " - " +
            resp_msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);


        } // endfor loop through objx.objectElement_idx_AR

     }  // endfor loop through msg.queryResponseSetMemberWA_AR[h].object_idx_AR
  }  // endif setMemberID == "ObjectQset"

} // endfor loop through msg.queryResponseSetMemberWA_AR

// end 20211217




});  // end of request

       
} // end of processRecordFormatMessage()



} // end of class ZtClientCallToClient








       



module.exports = ZtClientCallToClient;




