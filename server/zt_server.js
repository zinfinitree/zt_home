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

const cors = require('cors');


require("dotenv").config();   // 20230220



var Client = require('node-rest-client').Client;
var fs = require('fs'); 

var svr1 = new ZtServer();
function ZtServer(){
 this.ZtSysParams_AR = [];
 this.ZTICDomain_AR =  [];
 this.initializeMode = '-';
 this.msgURL = "";
 //this.ZtObject_AR   =  [];
 this.ZtObject_HM     = new HashMap();
 this.ZtObject_idx_HM = new HashMap();
 this.ZtObject_AR     =  [];
 this.ZtObjectElement_AR = [];
 this.ZtObjectTypeValue_AR = [];
 this.ZtObjectLink_AR = [];
 //this.ZtObjectTemplate_AR = [];  
 this.time = new (require('./zt_server_time'));

} // end of function ZtServer
var object_HM = new HashMap();
 //    console.log("svr1.ZtObjectLink_AR.length at new ZtServer: "+svr1.ZtObjectLink_AR.length);



///* Routes */
var app = express();
app.set('port', process.env.PORT || 5001);


app.use(bodyParser.json({limit: '50mb'}));                         
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));   

app.use(cors());  // added 20170405

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});



//DB
//const db_url = process.env.DB_URL;
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/dfs2DB', { useNewUrlParser: true });
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });  // 20230221
//mongoose.connect('mongodb://mongo:27017/dfs2DB', { useNewUrlParser: true });
//mongoose.connect('mongodb://mongo_test:27017/collectionName'
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Connection Error', err);
});

db.on('open', function () {
  console.log('Connected to Database');
     //console.log("svr1.ZtObjectLink_AR.length at new at Connected to Database: "+svr1.ZtObjectLink_AR.length);
  svr1.readSystemParametersFromFile();
  for(var i = 0; i < svr1.ZtSysParams_AR.length; i++){
    console.log("sys params: "+ svr1.ZtSysParams_AR[i].parameterName +" "+ svr1.ZtSysParams_AR[i].seqNum+" "+svr1.ZtSysParams_AR[i].value);
    if (svr1.ZtSysParams_AR[i].parameterName.trim() == "targetNS"){
          
          //var zticDom = new ZTICDomain();   
          //var zticDom = new (require('./zt_server_ztic_domain'))( svr1.ZtSysParams_AR[i].value.substring(0,5) );  //  (del) 20250502
          var zticDom = new (require('./zt_server_ztic_domain'))( svr1.ZtSysParams_AR[i].value.substring(0,5) );      // 2050502
          zticDom.addZTIC("1", svr1.ZtSysParams_AR[i].value.substring(5).trim());

          zticDom.initializeZTICDomain_asynch(ZtObjectDbRec,svr1);                                     
          svr1.ZTICDomain_AR.push(zticDom);
          
    }
    if (svr1.ZtSysParams_AR[i].parameterName.trim() == "initializeMode"){
          var initMode     = svr1.ZtSysParams_AR[i].value.substring(0,1);
          if (initMode == '+')
             {svr1.initializeMode = true;}
             else
             {svr1.initializeMode = false;}

    }
    if (svr1.ZtSysParams_AR[i].parameterName.trim() == "msgURL"){
          svr1.msgURL     = svr1.ZtSysParams_AR[i].value.toString().trim();
          console.log("svr1.msgURL: "+svr1.msgURL);
    }
    
  
   
  }
  
  
});

/* Mongoose init for Mongodb */
var ZtObjectDbRecSchema = new mongoose.Schema({
  te_2_32: String,  //db zt instance id
  te_2_1:  String,  //object kind ZTIC
  te_2_2:  String,  //objject kind code
  te_2_3:  String,
  te_2_4:  String,
  te_2_5:  String,
  te_2_6:  String,
  te_2_7:  String,
  te_2_8:  String,
  te_2_9:  String,
  te_2_10: String,
  te_2_11: String,
  te_2_12: String,
  te_2_13: String,
  te_2_14: String,
  te_2_15: String,
  te_2_16: String,
  te_2_17: String,
  te_2_18: String,
  te_2_19: String,
  te_2_20: String,
  te_2_21: String,
  te_2_22: String,
  te_2_23: String,
  te_2_24: String,
  te_2_25: String,
  te_2_26: String,
  te_2_27: String,
  te_2_28: String,
  te_2_29: String,
  te_2_30: String,
  te_2_31: String,
});
var ZtObjectDbRec = mongoose.model('msg', ZtObjectDbRecSchema);

//END DB

//--------------------MSGS
app.get('/ZtObjectDbRec', function(req, res, next) {
  ZtObjectDbRec.find().exec(function (err, msg) {
    if (err) throw(err);
    msg.sort(function(a, b){
      return b.te_2_1 - a.te_2_1;
    });
    res.send(msg);
  });
});


var query = ZtObjectDbRec.find().where({ te_2_32 : 'TPFA' }); 
query.exec(function(err, result) {
   if (!err) {

     for (var i = 0; i < result.length; i++){
       //console.log(result[i].te_2_31);
     }
     //console.log("end of TPFA");
   } else {
     // error handling
   };
 });


//32 --All db ZT Instance ID
//1  --All Object Kind ZT Instance Code 
//2  --All Object Kind Code
//3  --All Code ZT Instance Code
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
//31 --Std Table Element Value


app.post('/ZtObjectDbRec/insert', function(req, res){
  var m = new ZtObjectDbRec({
    te_2_32  : req.body.te_2_32,
    te_2_1 : req.body.te_2_1,
    te_2_2 : req.body.te_2_2,
    te_2_3 : req.body.te_2_3,
    te_2_4 : req.body.te_2_4,
    te_2_5 : req.body.te_2_5,
    te_2_6 : req.body.te_2_6,
    te_2_7 : req.body.te_2_7,
    te_2_8 : req.body.te_2_8,
    te_2_9 : req.body.te_2_9,
    te_2_10 : req.body.te_2_10,
    te_2_11 : req.body.te_2_11,
    te_2_12 : req.body.te_2_12,
    te_2_13 : req.body.te_2_13,
    te_2_14 : req.body.te_2_14,
    te_2_15 : req.body.te_2_15,
    te_2_16 : req.body.te_2_16,
    te_2_17 : req.body.te_2_17,
    te_2_18 : req.body.te_2_18,
    te_2_19 : req.body.te_2_19,
    te_2_20 : req.body.te_2_20,
    te_2_21 : req.body.te_2_21,
    te_2_22 : req.body.te_2_22,
    te_2_23 : req.body.te_2_23,
    te_2_24 : req.body.te_2_24,
    te_2_25 : req.body.te_2_25,
    te_2_26 : req.body.te_2_26,
    te_2_27 : req.body.te_2_27,
    te_2_28 : req.body.te_2_28,
    te_2_29 : req.body.te_2_29,
    te_2_30 : req.body.te_2_30,
    te_2_31 : req.body.te_2_31
  });
  m.save();
  res.send(m);
});


// start 20230114
app.post('/ZtObjectDbRec/insertmany', function(req, res){
  //var m = new ZtObjectDbRec();
  
  var dbRec_AR = JSON.parse(req.body.dbRec_ARstr);
  var retStr = ZtObjectDbRec.insertMany(dbRec_AR);
  var retStr2 = "retstr"
  res.send(retStr2);
});  // end of insertmany
// end 20230114



app.get('/ZtObjectDbRec/:id', function(req, res, next) {
  var query = ZtObjectDbRec.find().where({ _id : req.params.id });
  query.exec(function (err, msg) {
    res.send(msg)
 });
});

// start 20230324
app.post('/ZtObjectDbRec/deletemany', function(req, res){
  //var m = new ZtObjectDbRec();
  
  var dbRec_AR = JSON.parse(req.body.dbRec_ARstr);
  var retStr = ZtObjectDbRec.deleteMany(dbRec_AR);
  var retStr2 = "retstr"
  res.send(retStr2);
});  // end of deletemany
// end 202303224

app.post('/ZtObjectDbRec/:id/remove', function(req, res, next) {
  ZtObjectDbRec.remove({
    _id: req.params.id
  }, function(err, msg) {
    if (err)
      res.send(err);
    res.sendStatus(200);
  });
});

//20200327 
app.post('/ZtObjectDbRec/update_oe_value', function(req, res){
  //console.log("20240313a req.body.te_2_32, 1-8: "+req.body.te_2_32+" - "+req.body.te_2_1+" - "+req.body.te_2_2+" - "+req.body.te_2_3+" - "+req.body.te_2_4+" - "+req.body.te_2_7+" - "+req.body.te_2_8 + " - "+ req.body.te_2_26 + " - "+ req.body.te_2_31);


     ZtObjectDbRec.update(
       //<query>,
       { 
         //_id:    "5e7e765eeeed542f31762ac8"
         te_2_32: req.body.te_2_32,
         te_2_1 : req.body.te_2_1,
         te_2_2 : req.body.te_2_2,
         te_2_3 : req.body.te_2_3,
         te_2_4 : req.body.te_2_4,
         te_2_7 : req.body.te_2_7,
         te_2_8 : req.body.te_2_8,
        },
       //<update>
       {
        $set: {
               //te_2_26 : req.body.te_2_26,
               te_2_31 : req.body.te_2_31},
         },
         {multi : true},
        function(err, msg) {
    if (err)
      res.send(err);
    res.sendStatus(200);
   //     {
   //     // upsert: <boolean>,
   //     multi: true,
   //     }
      });  // end of update



 }); // end of post




//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());



app.get('/zt/admin_console',function(req,res){
  
  var dirnamex = __dirname + "/zt_admin_console.html";

  res.sendFile(dirnamex);
});




app.post('/zt/process_message', function(req,res){


app.use(bodyParser.json({limit: '50mb'}));                         
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));   


    // console.log("20200126 svr1.ZtObjectLink_AR.length at start of app.post--ds2/process_message: "+svr1.ZtObjectLink_AR.length);
  
//app.post(svr1.msgURL, function(req,res){    //(del) -didn't work, went back to hard-coded url
//if (svr1.msgURL == '/zt/process_message'){console.log("they are equal==");}else{console.log("they are not equal==")}
var ZtRawMessageAR;

 if ( req.body.length > 0 ){ZtRawMessageAR = req.body;
                         console.log("ZtRawMessageAR from req.body ds2b00002_server_query.js");}
       else
     {ZtRawMessageAR = JSON.parse(req.query.body);}


//console.log("initializeMode:  "+svr1.initializeMode);
//svr1.IMDBdisplay();  //(del)  



    var sm1_str = './zt_server_message';            
    //var sm1 = new (require(sm1_str))(svr1.ZTICDomain_AR[0],ZtRawMessageAR);  // (del) 20200715
    var sm1 = new (require(sm1_str))(ZtRawMessageAR);    // 20200715
    //sm1.setZtRawMessageAR(ZtRawMessageAR);          (del) 
    //sm1.setserverZTICDom(svr1.ZTICDomain_AR[0]);    (del) 
    sm1.listZtRawMessageAR();  // temp (del) 20210521
    sm1.setdbZtI_id(svr1);
    var sm1_base_ztic   = svr1.getCodeForNS(sm1.dbZtI_id, "131131/21");
    //console.log("dbzti_id after setdbZtI_id: "+sm1.dbzti_id);



   
var zticDomfound = false;
var zticDomIdx;
for (var i = 0; i < svr1.ZTICDomain_AR.length; i++) {
    if(sm1.dbZtI_id == svr1.ZTICDomain_AR[i].dbzti_id){zticDomfound = true; zticDomIdx = i;
       //console.log("svr1.ZTICDomain_AR[i].ZTICNS_AR ");
       //console.log("svr1.ZTICDomain_AR[i].ZTICNS_AR.length: "+svr1.ZTICDomain_AR[i].ZTICNS_AR.length);
       for (var j = 0; j < svr1.ZTICDomain_AR[i].ZTICNS_AR.length; j++){
       //  console.log("code-:-namespace: "+ svr1.ZTICDomain_AR[i].ZTICNS_AR[j].code+"-:-"+svr1.ZTICDomain_AR[i].ZTICNS_AR[j].namespace);
       } //endfor

    } //endif
} // end loop through zticDomSet
 

if (sm1.dbZtI_id == "") {console.log("Server not accepting selected target namespace"); } 

//console.log("TargetZTICode: "+TargetZTICode);
// console.log("svr1.ZTICDomain_AR.length: "+svr1.ZTICDomain_AR.length); 
  var zticDomfound = false;
  var zticDomIdx;
  for (var i = 0; i < svr1.ZTICDomain_AR.length; i++) {
      if(sm1.dbZtI_id == svr1.ZTICDomain_AR[i].dbzti_id){zticDomfound = true; zticDomIdx = i;}
  } // end loop through zticDomSet
 
 
 //(removed 20170330 during REST test add back later)
 // var dsmsg1 = new ZtMessage(svr1.ZTICDomain_AR[zticDomIdx], ZtRawMessageAR); 
 
 
 // start 20240126
   // sm1.validateMessageSyntax(svr1);
 // end 20240126
 
  //var dsmsg1 = new ZtMessage(svr1.ZTICDomain_AR[zticDomIdx], file_namex);
  if(zticDomfound){
 //    dsmsg1.readRawMsgFromFile();
 ///////    dsmsg1.transformFromRawMsg();

//start change 
     //console.log("svr1.ZtObjectLink_AR.length in zt_server.js before parse: "+svr1.ZtObjectLink_AR.length);
     var sm_parse = new (require('./zt_server_message_parse'))(svr1,sm1); 
         sm_parse.process();
     for (var i = 0; i < sm1.extendedKeyWA_AR.length; i++){
       // console.log("20200218 after server parse");
       // console.log("sm1.extendedKeyWA_AR[i].extendedKeyDefinitionCodeZTIC: "+sm1.extendedKeyWA_AR[i].extendedKeyDefinitionCodeZTIC);
       // console.log("sm1.extendedKeyWA_AR[i].extendedKeyDefinitionCode: "+sm1.extendedKeyWA_AR[i].extendedKeyDefinitionCode);
       // console.log("sm1.extendedKeyWA_AR[i].extendedKeyValueZTIC: "+sm1.extendedKeyWA_AR[i].extendedKeyValueZTIC);
       // console.log("sm1.extendedKeyWA_AR[i].extendedKeyValueCode: "+sm1.extendedKeyWA_AR[i].extendedKeyValueCode);
     }  // endfor
 



 // console.log("20200210 sm1.MessageProcessingParametersGeneralWA.defaultEffectiveTimestamp: "+sm1.MessageProcessingParametersGeneralWA.defaultEffectiveTimestamp);
 //    console.log("20200210 sm1.MessageProcessingParametersGeneralWA.messageIdClient: "+sm1.MessageProcessingParametersGeneralWA.messageIdClient);
 //    console.log("20200210 sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode: "+sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode);
 //    console.log("20200210 sm1.MessageProcessingParametersGeneralWA.indexOfLastRequestSegment: "+sm1.MessageProcessingParametersGeneralWA.indexOfLastRequestSegment);
 //    console.log("20200210 sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode: "+sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode);
 //    console.log("20200210 sm1.MessageProcessingParametersGeneralWA.user: "+sm1.MessageProcessingParametersGeneralWA.user);
 //    console.log("20200210 sm1.MessageProcessingParametersGeneralWA.softwarePatchLevelZTIC: "+sm1.MessageProcessingParametersGeneralWA.softwarePatchLevelZTIC);
 //    console.log("20200210 sm1.MessageProcessingParametersGeneralWA.softwarePatchLevelCode: "+sm1.MessageProcessingParametersGeneralWA.softwarePatchLevelCode);

     //console.log("svr1.ZtObjectLink_AR.length in zt_server.js after parse: "+svr1.ZtObjectLink_AR.length);
//        sm1.transformFromRawMsg();  (del)


//end change 
 // dsmsg1.findTargetZTIC_asynch(dsmsg1);

      sm1.showOEupdateWA();
      sm1.findZTIC(sm1);

      // start 20240126
      //console.log("20240206a sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode: "+sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode);
        if(!(sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode == 99 || sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode == 98)){  // no validation while loading config for validation
          sm1.validateMessageContent(svr1, svr1.time.now());  // TEMP (del) 20240219
        } // endif
      // end 20240126

 // dsmsg1.msgUpdate();
      //console.log("calling sm1.updateMaintainSetWA ");
        //console.log("dbzti_id: "+sm1.dbzti_id);
      //console.log("svr1.ZtObjectLink_AR.length in zt_server.js before sm1.updateMaintainSetWA: "+svr1.ZtObjectLink_AR.length);30391
      sm1.updateMaintainSetWA(svr1);  
      //console.log("svr1.ZtObjectLink_AR.length in zt_server.js after sm1.updateMaintainSetWA: "+svr1.ZtObjectLink_AR.length);
      //console.log("OEupdateWA_Array: "+sm1.OEupdateWA_Array.length);
      sm1.listMaintainSetWA();          
        //sm1.msgUpdate2(svr1);      
      if(sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode != 99){
         sm1.addExtendedKeyToRequest(svr1);    //20200220
      }

      //var status_idx = sm1.queryResponseMessageStatusWA_AR.length -1; (del) 20250113
      var status_idx = sm1.responseMessageStatusWA_AR.length -1;   // 20250113
      var do_update = false;
      if(status_idx < 0) {do_update = true;}
      if(sm1.responseMessageStatusWA_AR.length > 0){
        if(!(sm1.responseMessageStatusWA_AR[status_idx].messageStatusCode == "4")){ 
          do_update = true;
        } //   
      } // endif status_idx < 0
      if(do_update){
          sm1.msgUpdate3(svr1);    
      } // endif  20240219  
//      sm1.query(svr1);         
     //console.log("svr1.ZtObjectLink_AR.length in zt_server.js: "+svr1.ZtObjectLink_AR.length);
     if(sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode == 99){ 
       var sm_query = new (require('./zt_server_query'))(svr1,sm1);                                                                          //      20200403
       sm_query.process();
      } // endif    sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode == 99)
      if(sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode != 99){
         var msgQueryFunctionKeyStr = sm1.dbZtI_id+"_"+sm1_base_ztic+"_36_"+sm1_base_ztic+"_3";
         //console.log("msgQueryFunctionKeyStr: "+msgQueryFunctionKeyStr);
         var msg_query_func_object_idx = svr1.ZtObject_idx_HM.get(msgQueryFunctionKeyStr);
         //console.log("msg_query_func_object_idx: "+msg_query_func_object_idx);
         var msg_query_function_obj = svr1.ZtObject_AR[msg_query_func_object_idx];
         var msgQueryFunc = new (require('./zt_server_function'))( svr1, sm1, msg_query_function_obj.objZTIC, msg_query_function_obj.objCode, svr1.time.now() );
                 //   msgQueryFunc.setParameterValue("131131/21", "5?", example_var); (parameter example)
         msgQueryFunc.execute();
      } // endif   sm1.MessageProcessingParametersGeneralWA.defaultUpdateMode != 99){

        //svr1.IMDBdisplay();       

     

     
  } // end if(zticDomfound)


 //send response
console.log("List of response array in zt_server.js - sm1.ZtMessageResponse_Array.length: "+sm1.ZtMessageResponse_Array.length);
 for (var i = 0; i < sm1.ZtMessageResponse_Array.length; i++) {
    //console.log("index: "+sm1.ZtMessageResponse_Array[i].index+ "-"+sm1.ZtMessageResponse_Array[i].parent_index+ "-"+sm1.ZtMessageResponse_Array[i].priority+ "-"+sm1.ZtMessageResponse_Array[i].me_ztic+ "-"+sm1.ZtMessageResponse_Array[i].me_code+ "-"+sm1.ZtMessageResponse_Array[i].data);
    //console.log("parent_index: "+sm1.ZtMessageResponse_Array[i].parent_index);
    //console.log("priority: "+sm1.ZtMessageResponse_Array[i].priority);
    //console.log("me_ztic: "+sm1.ZtMessageResponse_Array[i].me_ztic);
    //console.log("me_code: "+sm1.ZtMessageResponse_Array[i].me_code);
    //console.log("data: "+sm1.ZtMessageResponse_Array[i].data);
    //console.log(" ");


 } // endfor loop through ZtMessageResponse_Array

res.send(sm1.ZtMessageResponse_Array);   
  
});   // end of app.post




  

app.post('/zt/devb/server/process_admin_console_request',function(req,res){

app.use(bodyParser.json({limit: '50mb'}));                         
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));   

  console.log("process_admin_console_request on server");

//call parameters:
//dbZtI_id: dbZtI_id,  op_num: op_num, source_db: source_db, obj_kind: obj_kind, ds_instance: ds_instance, obj_code_from: obj_code_from, obj_code_to: obj_code_to, max_recs: max_recs


//app.post('/zt/process_file', jsonParser, function(req,res){
  var dbZtI_id=req.body.dbZtI_id;
  var op_numx=req.body.op_num;
  var source_dbx=req.body.source_db;
  var obj_kindx=req.body.obj_kind;
  var ds_instancex=req.body.ds_instance;
  var obj_code_fromx=req.body.obj_code_from;
  var obj_code_tox=req.body.obj_code_to;
  var oe_valuex=req.body.oe_value;
  var max_recsx=req.body.max_recs;
  var obj_idx=req.body.obj_idx;
  var filenamex=req.body.filename;    // 20240426
  


console.log("20240429a dbZtI_id: "+ dbZtI_id+"  op_num: "+op_numx+" source_db: "+source_dbx+ " obj_kind: "+obj_kindx+ " ds_instance: "+ds_instancex+ " obj_code_from: "+obj_code_fromx+" obj_code_to: "+obj_code_tox+" oe_value: "+oe_valuex+" max_recs: "+max_recsx+" obj_idx: "+obj_idx+" filenamex: "+filenamex);

var max_recs = 0;
max_recs = max_recsx;
var zticDomfound = false;
var zticDomIdx;
for (var i = 0; i < svr1.ZTICDomain_AR.length; i++) {
    if(dbZtI_id == svr1.ZTICDomain_AR[i].dbzti_id){zticDomfound = true; zticDomIdx = i;}
} // end loop through zticDomSet
 

if (dbZtI_id == "") {console.log("dbZtI_id is blank"); }  
/////  var file_num=req.body.file_num;
/////  var init_files = [];
  console.log("Operation number: "+op_numx+" dbZtI_id: "+dbZtI_id);
 



  var obj_kind_dsi_str = "131131/21";
  var obj_kind_code_str = obj_kindx.toString().trim();
  var obj_kind_ztic_str = svr1.getCodeForNS(dbZtI_id.toString().trim(), obj_kind_dsi_str);

  var ztic_str;
  if(ds_instancex.toString().trim() == "*"){
     ztic_str = "*";
     }
   else{
    ztic_str = svr1.getCodeForNS(dbZtI_id.toString().trim(), ds_instancex);
  } // endif ds_instancex.toString().trim() == "*")

   if(obj_kind_code_str == "20"){obj_kind_code_str = "1";
                                obj_kind_dsi_str = "zinfinitree.com/address";
                                obj_kind_ztic_str = svr1.getCodeForNS(dbZtI_id.toString().trim(), obj_kind_dsi_str);
                             //   console.log("obj_kind_ztic_str #2: "+obj_kind_ztic_str);
   }  // endif

  var obj_code_from_str = obj_code_fromx.toString().trim();
  var obj_code_to_str   = obj_code_tox.toString().trim(); 

  var oe_value_str = oe_valuex.toString().trim();

 
   if (op_numx == "ListDB" || op_numx == "Clear"  )
  { 

  if (source_dbx == 1){ //source_db is mongodb
  var client = new Client(); 



  console.log("obj_kind_ztic_str 1: "+obj_kind_ztic_str);
 

//ZtServer.prototype.getCodeForNS = function(dbzti_idx, namespacex) {

var delete_AR = [];  // 20230408


  
  var query;
  var obj_kind_ztic_regex = '^' + obj_kind_ztic_str + '$';
  var obj_kind_code_regex;
  if(obj_kind_code_str=="*"){
          //console.log("obj_kind_code_str: "+obj_kind_code_str);
          obj_kind_code_regex='.*';
           // "/.*/";
                            }
      else
               {
                 obj_kind_code_regex = '^' + obj_kind_code_str + '$';
   } // endif obj_kind_code_str=="*"


  var ztic_regex;
  if(ztic_str=="*"){
        ztic_regex='.*';
      }
     else{
        ztic_regex = '^' + ztic_str + '$';
  }

 
  var obj_code_regex;
  if(obj_code_from_str == "*"){
        obj_code_regex='.*';
  }
  if( obj_code_from_str != "*" && obj_code_to_str == ""){
        obj_code_regex = '^' + obj_code_from_str + '$';
  }
  if( obj_code_from_str != "*" && obj_code_to_str != ""){
   // need code here to handle range

  }

  var oe_value_regex;
//  var oe_value_str = oe_valuex.toString().trim();
  if( oe_value_str == "*" || oe_value_str == "" ){
     oe_value_regex='.*';
   }  
   else{

     oe_value_regex = oe_value_str;
   }  //endif ( oe_value_str == "*" || oe_value_str == "*")

 

 
  //query = ZtObjectDbRec.find().where({ $and: [ {te_2_32 : dbZtI_id.toString().trim()}, {te_2_1 : obj_kind_ztic_str}, {te_2_2 : obj_kind_code_str} ] });

//  20200115 temp delete, reactivated 20200125


// 20200115 end temp delete, reactivated 20200125



  query = ZtObjectDbRec.find().where({ te_2_32 : dbZtI_id.toString().trim() });  //temp (del) 20210822
//query = ZtObjectDbRec.find().where({ te_2_32 : dbZtI_id.toString().trim(), 
//                           te_2_4 : "475"});      // 20210822

//  //var query = ZtObjectDbRec.find().where({ te_2_1 : "3" });


query.exec(function(err, result) {
   if (!err) {
     var for_length = result.length;
     if(for_length > max_recs){for_length = max_recs;}
     console.log("Listing DB Contents for: "+dbZtI_id+"   "+for_length+" Entries");



     //for (var i = 0; i < result.length; i++){
     for (var i = 0; i < for_length; i++){
//     // for (var i = 0; i < 10000; i++){   // use this line when db has many entries
//     //  var urlxx = "http://localhost:5001/ZtObjectDbRec/"+ result[i].id +"/remove";
 ////    if(result[i].te_2_4 == obj_code_fromx){          // TEMP 20220525
       console.log(" ");
       console.log(result[i].id);
       console.log("te_2_32: "+result[i].te_2_32);
       console.log("te_2_1: "+result[i].te_2_1);
       console.log("te_2_2: "+result[i].te_2_2);
       console.log("te_2_3: "+result[i].te_2_3);
       console.log("te_2_4: "+result[i].te_2_4);
       console.log("te_2_6: "+result[i].te_2_6);
       console.log("te_2_7: "+result[i].te_2_7);
       console.log("te_2_8: "+result[i].te_2_8);
       console.log("te_2_9: "+result[i].te_2_9);
       console.log("te_2_10: "+result[i].te_2_10);
       console.log("te_2_11: "+result[i].te_2_11);
       console.log("te_2_12: "+result[i].te_2_12);
       if(result[i].te_2_6 == 3){   // type
       console.log("te_2_13: "+result[i].te_2_13);
       console.log("te_2_14: "+result[i].te_2_14);
       console.log("te_2_15: "+result[i].te_2_15);
       console.log("te_2_16: "+result[i].te_2_16);
       }
       if(result[i].te_2_6 == 4){   // link
       console.log("te_2_17: "+result[i].te_2_17);
       console.log("te_2_18: "+result[i].te_2_18);
       console.log("te_2_19: "+result[i].te_2_19);
       console.log("te_2_20: "+result[i].te_2_20);
       console.log("te_2_21: "+result[i].te_2_21);
       console.log("te_2_22: "+result[i].te_2_22);
       console.log("te_2_30: "+result[i].te_2_30);
       }
       if(result[i].te_2_6 == 5){   // object template
       console.log("object template");
       }
       console.log("te_2_23: "+result[i].te_2_23);
       console.log("te_2_24: "+result[i].te_2_24); 
       console.log("te_2_25: "+result[i].te_2_25);
       console.log("te_2_26: "+result[i].te_2_26);   
       console.log("te_2_31: "+result[i].te_2_31);
 ////     }  // endif if(result[i].te_2_4 == obj_code_fromx){  TEMP 20220525

       if(op_numx == "Clear"){


       console.log(" ");
       console.log("Deleting row for: "+result[i].id);
       delete_AR.push(result[i].id);   // 20230408

          // var urlxx = "http://localhost:5001/ZtObjectDbRec/"+ result[i].id +"/remove";  //(del) 20230408
          var urlxx = process.env.DB_URL+"/ZtObjectDbRec/"+ result[i].id +"/remove";       // 20230408
           
           console.log("     Deleting: ");
           console.log(result[i].id);

          //client.post(urlxx, function (data, response) {   // (del) 20230408
         //});                                               // (del) 20230408



    } // (op_numx == "Clear"){


//     //  client.post(urlxx, function (data, response) {
//   });

     }
     //var retStr = ZtObjectDbRec.deleteMany({'_id':{'$in':delete_AR}})   // 20230408
     //var retStr = ZtObjectDbRec.deleteMany({'id':{'$in':delete_AR}})   // 20230408
     //console.log("20230408 retStr: "+retStr);
     //var retStr2 = "retstr"
     //res.send(retStr2);
     //const ids = [id1, id2, id3...];]
     // start 20230408
     const query = { _id: { $in: delete_AR} };
     var retStr = ZtObjectDbRec.deleteMany(query, (err, obj) => {
         if (err) throw err;
     });
     console.log("20230408 retStr: "+retStr);
     // end 20230408
     

     } else {
     console.log("error on query for ListDB");
   };
 });
  } //endif (source_dbx == 1)

  var cntr = 0;
  var isStringInOEvalues;
  var svr1_ZtObject_AR_i_objCode_str = "";
  
  var html_list_oe = "<style>table, th, td {border: 1px solid black;border-collapse: collapse;}</style><table><tr><th>1-OKIC</th><th>2-OKC</th><th>3-OIC</th><th>4-OC</th><th>7-OEIC</th><th>8-OEC</th><th>31-OE-Value</th></tr>";
  var html_list_tval = "<style>table, th, td {border: 1px solid black;border-collapse: collapse;}</style><table><tr><th>1-OKIC</th><th>2-OKC</th><th>3-OIC</th><th>4-OC</th><th>13-TDIC</th><th>14-TDC</th><th>15-TVIC</th><th>16-TVC</th></tr>";
  var html_list_link = "<style>table, th, td {border: 1px solid black;border-collapse: collapse;}</style><table><tr><th>1-OKIC</th><th>2-OKC</th><th>3-OIC</th><th>4-OC</th><th>17-LTIC</th><th>18-LTC</th><th>19-LToKIC</th><th>20-LToKC</th><th>21-LToIC</th><th>22-LToC</th></tr>";
  var html_list_rec = new HtmlObjectListRec();  // 20240427
  html_list_rec.ObjElem = "";  // 20240427
  html_list_rec.typeVal = "";  // 20240427
  html_list_rec.link = "";     // 20240427
  const digits_only = string => [...string].every(c => '0123456789'.includes(c));
  if (source_dbx == 2){ //source_db is in-memory db
     //  objs.sort((a,b)=> (a.age - b.age || a.name.localeCompare(b.name)
     //  objs.sort((a,b)=> (a.name.localeCompare(b.name) || a.age - b.age));
     svr1.ZtObject_AR.sort((a,b)=> (a.kindCode - b.kindCode || a.objCode - b.objCode));
     for (var i = 0; i < svr1.ZtObject_AR.length; i++){              
       if(obj_code_to_str < obj_code_from_str){console.log("Code To must be larger than Code From: "+obj_code_to_str+" - "+obj_code_from_str); break;}
        if(svr1.ZtObject_AR[i].dbzti_id == dbZtI_id.toString().trim() ){

         if((svr1.ZtObject_AR[i].kindZTIC == obj_kind_ztic_str  && svr1.ZtObject_AR[i].kindCode == obj_kind_code_str )|| obj_kindx == "*"){

          if( svr1.ZtObject_AR[i].objZTIC == ztic_str || ztic_str == "*"){

            svr1_ZtObject_AR_i_objCode_str = svr1.ZtObject_AR[i].objCode;
            if(digits_only(svr1_ZtObject_AR_i_objCode_str)){svr1_ZtObject_AR_i_objCode_str = svr1.pad(svr1_ZtObject_AR_i_objCode_str,5);}
            if(digits_only(obj_code_from_str)){obj_code_from_str = svr1.pad(obj_code_from_str,5);}
            if(digits_only(obj_code_to_str)){obj_code_to_str = svr1.pad(obj_code_to_str,5);}
            if( (svr1_ZtObject_AR_i_objCode_str == obj_code_from_str || obj_code_from_str == "*" || obj_code_from_str == "") ||
                ( obj_code_to_str != "" &&   svr1_ZtObject_AR_i_objCode_str >= obj_code_from_str && svr1_ZtObject_AR_i_objCode_str <= obj_code_to_str) ){

               if(oe_value_str != "" && oe_value_str != "*"){isStringInOEvalues = svr1.ZtObject_AR[i].isStringInOEvalues(oe_value_str);}
               if(oe_value_str == "" || oe_value_str == "*" || isStringInOEvalues   ){
                    //console.log("obj_idx - i:"+obj_idx+" - "+i);
                    if (obj_idx.toString().trim() == "" || obj_idx == i){
                     cntr++;
                     if(cntr > max_recs){break;}
                     console.log(" ");
                     console.log(" ");
                     console.log("IMDb Object Index: "+i);
                     html_list_rec = svr1.ZtObject_AR[i].listAllValues();
                     html_list_oe = html_list_oe + html_list_rec.ObjElem;
                     html_list_tval = html_list_tval + html_list_rec.typeVal;
                     html_list_link = html_list_link + html_list_rec.link;

                     } // endif (obj_idx.toString().trim()=="" || parseInt(obj_idx.toString().trim()) == i)
                }  //endif oe_value_str found
          
            } //  endif   svr1.ZtObject_AR[i].objCode == obj_code_from_str || obj_code_from_str == "*")

           } //endif  svr1.ZtObject_AR[i].objZTIC == ztic_str || ztic_str == "*")
         } // endif  ZtObject_AR[i].kindZTIC == obj_kind_ztic_str  && ZtObject_AR[i].kindCode == obj_kind_code_str)

        }  //endif ZtObject_AR[i].dbzti_id == dbZtI_id.toString().trim() )

     }  // endfor loop through ZtObject_AR

   console.log("  ");
   console.log("Number of objects listed: "+cntr);

    html_list_oe = html_list_oe + "</table>";
    html_list_tval = html_list_tval + "</table>";
    html_list_link = html_list_link + "</table>";

   // start 20240426
   //console.log("20240429 filenamex: "+filenamex);
   //if(!(filenamex == undefined)){
   if(!(filenamex.toString().trim() == "")){
   //console.log("20240427 html_list_oe: "+html_list_oe);
   //var dir_and_filename = file_directoryx + file_namex;
   var file_directoryx = __dirname + "/html_object_list/";
   var dir_and_filename_oe = file_directoryx + filenamex+"_oe.html";
    console.log("20240427 dir_and_filename_oe: "+dir_and_filename_oe);
   var file_oe = fs.createWriteStream(dir_and_filename_oe);
   file_oe.on('error', function(err) { /* error handling */ });
   file_oe.write(html_list_oe);
   file_oe.end();

   dir_and_filename_tval = file_directoryx + filenamex+"_tval.html";
   var file_tval = fs.createWriteStream(dir_and_filename_tval);
   file_tval.on('error', function(err) { /* error handling */ });
   file_tval.write(html_list_tval);
   file_tval.end();

   dir_and_filename_link = file_directoryx + filenamex+"_link.html";
   var file_link = fs.createWriteStream(dir_and_filename_link);
   file_link.on('error', function(err) { /* error handling */ });
   file_link.write(html_list_link);
   file_link.end();



    } // endif filenamex !=="" 
  
   // end 20240426

  } // endif (source_dbx == 2){ //source_db is in memory db


 } // endif op_numx.equals("ListDB")
 

  
 
 
});  //end of app.post

  
                    


ZtServer.prototype.pad = function(n, width, z){
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



ZtServer.prototype.processMessage = function(targetNS, rawMessage) {
  var   dbZtI_id="";
  //var TargetNS=req.body.TargetNS;
  console.log("targetNS: "+targetNS);
// find table name prefix 
console.log("svr1.ZTICDomain_AR.length: "+this.ZTICDomain_AR.length); 
  for (var i = 0; i < this.ZTICDomain_AR.length; i++) {
      //for (var j = 0; j < svr1.ZTICDomain_AR[i].ZTICNS_AR.length; j++) {
        console.log("server ZTICDomain inside processMessage(): " + this.ZTICDomain_AR[i].dbzti_id + " "+this.ZTICDomain_AR[i].ZTICNS_AR[0].namespace);
        //console.log("code and ns: "+svr1.ZTICDomain_AR[i].ZTICNS_AR[0].code +" "+ svr1.ZTICDomain_AR[i].ZTICNS_AR[0].namespace+" "+svr1.ZTICDomain_AR[i].dbzti_id);
          if(this.ZTICDomain_AR[i].ZTICNS_AR[0].code == 1 && this.ZTICDomain_AR[i].ZTICNS_AR[0].namespace == targetNS )
           {dbZtI_id = this.ZTICDomain_AR[i].dbzti_id;
            console.log("found dbzti_id: "+ dbZtI_id+"  NS: "+targetNS);  }
      
      //}  //end loop through zticDomSet.ZTICDom_AR
  } // end loop through zticDomSet
   
// end of find table name prefix

var zticDomfound = false;
var zticDomIdx;
for (var i = 0; i < this.ZTICDomain_AR.length; i++) {
    if(dbZtI_id == this.ZTICDomain_AR[i].dbzti_id){zticDomfound = true; zticDomIdx = i;}
} // end loop through zticDomSet
 

if (dbZtI_id == "") {console.log("Server not accepting selected target namespace"); }
  var zticDomfound = false;
  var zticDomIdx;
  for (var i = 0; i < this.ZTICDomain_AR.length; i++) {
      if(dbZtI_id == this.ZTICDomain_AR[i].dbzti_id){zticDomfound = true; zticDomIdx = i;}
  } // end loop through zticDomSet
  console.log("File name = "+file_namex+", template is "+obj_templatex);
 
   
 // var dsmsg1 = new ZtMessage(svr1.ZTICDomain_AR[zticDomIdx], dsmsgFile1.ZtRawMessageArray);  
 // console.log("dbzti_id: "+svr1.ZTICDomain_AR[zticDomIdx].dbzti_id);
  var dsmsg1 = new ZtMessage(this.ZTICDomain_AR[zticDomIdx], rawMessage); 

  if(zticDomfound){
     dsmsg1.transformFromRawMsg();
     //dsmsg1.showOEupdateWA();
     dsmsg1.findZTIC2(dsmsg1);
 //    dsmsg1.buildHtml();
  } // end if(zticDomfound)


} // end of ZtServer.prototype.processMessage 


ZtServer.prototype.getObjectForKeyString = function(key_stringx) {

  var obj_idx =  this.ZtObject_idx_HM.get(key_stringx);
  var returnObj    =  this.ZtObject_AR[obj_idx];
  return returnObj

} // end of getObjectForKeyString


ZtServer.prototype.IMDBdisplay = function() {
 console.log(" ");
 console.log("Listing IMDB");
 console.log("  ZTIC Domains"); 
 for (var i = 0; i < this.ZTICDomain_AR.length; i++) {
  //  function ZTICDomain() {
  //   this.dbzti_id = "";
  //   this.ZTICNS_AR = [];
     console.log("      dbZtI_id: "+this.ZTICDomain_AR[i].dbzti_id);
     //console.log("this.ZTICDomain_AR[i].ZTICNS_AR[j].length: "+this.ZTICDomain_AR[i].ZTICNS_AR.length);
     for (var j = 0; j < this.ZTICDomain_AR[i].ZTICNS_AR.length; j++) {
       console.log("         "+this.ZTICDomain_AR[i].ZTICNS_AR[j].code+" - "+this.ZTICDomain_AR[i].ZTICNS_AR[j].namespace);

     } //endfor
     console.log(" ");
 }  // endfor 

  




} // end of ZtServer.prototype.IMDBdisplay



function ZtSysParamsRow(param_name, seq_num, value){
    this.parameterName = param_name;
    this.seqNum        = seq_num;
    this.value         = value;

} // end of function ZtSysParamsRow

function MessageRow(index, parent_index, priority, me_ztic, me_code, data) {
  this.index        = index;
  this.parent_index = parent_index;
  this.priority     = priority;
  this.me_ztic      = me_ztic;
  this.me_code      = me_code;
  this.data         = data;
 
}

//32 --All DB ZT Instance ID
//1  --All Object Kind DS Instance Code 
//2  --All Object Kind Code
//3  --All Code DS Instance Code
//4  --All Code 
//5  --All Record Type DS Instance Code 
//6  --All Record Type Code 1=Standard, 2=Extended Key, 3=Type Table, 4=Link  5=Object Template
//7  --Std Table Element DS Instance Code
//8  --Std Table Element Code
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
//31 --Std Table Element Value
//---------------------------
//33 -- Description
//34 -- namespace


function UpdateRec() {
    this.te_2_32 = "";
    this.te_2_1  = "";
    this.te_2_2  = "";
    this.te_2_3  = "";
    this.te_2_4  = "";
    this.te_2_5  = "";
    this.te_2_6  = "";
    this.te_2_7  = ""; 
    this.te_2_8  = "";
    this.te_2_9  = "";
    this.te_2_10 = "";
    this.te_2_11 = "";
    this.te_2_12 = "";
    this.te_2_13 = "";
    this.te_2_14 = "";
    this.te_2_15 = "";
    this.te_2_16 = "";
    this.te_2_17 = "";
    this.te_2_18 = "";
    this.te_2_19 = "";
    this.te_2_20 = "";
    this.te_2_21 = "";
    this.te_2_22 = "";
    this.te_2_23 = "";
    this.te_2_24 = "";
    this.te_2_25 = "";
    this.te_2_26 = "";
    this.te_2_27 = "";
    this.te_2_28 = "";
    this.te_2_29 = "";
    this.te_2_30 = "";
    this.te_2_31 = "";

}



function ZtMessageFile(nsx, filenamex) {
    this.targetNS = nsx;
    this.filename = filenamex;
    this.ZtRawMessageArray = [];
} // end of function ZtMessageFile

//function ZtMessage(dbzti_id, filenamex) {
//function ZtMessage(zticDomx, filenamex) {
function ZtMessage(zticDomx, dsrawMsgArrayx) {
    this.zticDom   = zticDomx;
    this.dbzti_id = zticDomx.dbzti_id;
//    this.filename = filenamex;
    this.ZtLineArray = [];
    this.ZtRawMessageArray = dsrawMsgArrayx;
   // this.ZtRawMessageArray = [];
    this.ZtMessageArray = [];
    this.ZtMessageResponse_Array = [];
    this.ZTIC_Array     = [];
    this.OEupdateWA_Array = [];
    this.ObjectTemplateWA_Array = [];
    this.TypeValueUpdateWA_Array = [];
    this.LinkUpdateWA_Array = [];
//    this.bjectTemplateWA_Array = [];
    this.objectTemplateWA_Array = [];
    this.UpdateArray = [];
  }
  





function ZtObjectId(dbzti_id, kindZTIC, kindCode, objectZTIC, objCode){
    this.dbzti_id = dbzti_id.trim();
    this.kindZTIC = kindZTIC.trim();
    this.kindCode = kindCode.trim();
    this.objZTIC  = objZTIC.trim();
    this.objCode  = objCode.trim();
    this.keyString   = dbzti_id.trim()+"_"+kindZTIC.trim()+"_"+kindCode.trim()+"_"+objZTIC.trim()+"_"+objCode.trim();;
}// end of function ZtObjectId





function ZtTemplate(tmplObj) {
    this.obj = tmplObj;
    this.relatedObj_idx = 0;
}  // end function ZtTemplate



  
//function ZtClientSession(zticDomx, sessID, top_template_id){
function ZtClientSession(zticDomx, sessID){
    this.zticDom  = zticDomx;
    this.sessID = sessID;
    this.ZTIC_AR     = [];
    this.topTemplateId = "";
    //this.tmpl_AR      = [];
    //this.tmpl_AR.push(top_template);
    this.object_AR        = [];
    
 //   this.techProfile = [];

} //  end of function ZtClientSession

function ZtMessageSet(dsmsgset) {
   this.msg_AR = dsmsgset;

}  // end of function ZtMessageSet

ZtServer.prototype.getCodeForNS = function(dbzti_idx, namespacex) {
   var returnCode = "";
  for (var i = 0; i < this.ZTICDomain_AR.length; i++) {
    if(this.ZTICDomain_AR[i].dbzti_id.toString().trim() == dbzti_idx.toString().trim()){
       for (var j = 0; j < this.ZTICDomain_AR[i].ZTICNS_AR.length; j++) {
         if(this.ZTICDomain_AR[i].ZTICNS_AR[j].namespace.toString().trim() == namespacex.toString().trim()){
              //returnCode = this.ZTICDomain_AR[i].ZTICNS_AR[j].namespace.toString().trim();
             returnCode = this.ZTICDomain_AR[i].ZTICNS_AR[j].code.toString().trim();
         }  // endif  == namespacex

       } // endfor this.ZTICDomain_AR[i].ZTICNS_AR.length
    } // endif  == dbzti_idx

  }  // endfor loop through this.ZTICDomain_AR
  if(returnCode==""){console.log("getCodeForNS failed for namespace: "+namespacex);}
return returnCode;   

}  // end of ZtServer.prototype.getCodeForNS

ZtServer.prototype.getNSforCode = function(dbzti_idx, codex) {
   var returnNS = "";
  for (var i = 0; i < this.ZTICDomain_AR.length; i++) {
    if(this.ZTICDomain_AR[i].dbzti_id.toString().trim() == dbzti_idx.toString().trim()){
       for (var j = 0; j < this.ZTICDomain_AR[i].ZTICNS_AR.length; j++) {
         if(this.ZTICDomain_AR[i].ZTICNS_AR[j].code.toString().trim() == codex.toString().trim()){
              //returnCode = this.ZTICDomain_AR[i].ZTICNS_AR[j].namespace.toString().trim();
             returnNS = this.ZTICDomain_AR[i].ZTICNS_AR[j].namespace.toString().trim();
         }  // endif  == namespacex

       } // endfor this.ZTICDomain_AR[i].ZTICNS_AR.length
    } // endif  == dbzti_idx

  }  // endfor loop through this.ZTICDomain_AR
  if(returnNS==""){console.log("getNSforCode failed for code: "+codex);}
return returnNS;   

}  // end of ZtServer.prototype.getNSforCode


function ZTICDomain() {
   this.dbzti_id = "";
   this.ZTICNS_AR = [];

} // end of function ZTICDomain


function ZtClientZTICDomain() {
   //this.dbzti_id = "";
   this.ZTICNS_AR = [];

} // end of function ZtClientZTICDomain

ZtClientZTICDomain.prototype.getCodeForNamespace = function(namespacex) {
      var returnCode = null;
      for(var i = 0; i < this.ZTICNS_AR.length; i++){
      
          if(namespacex.trim() == this.ZTICNS_AR[i].namespace.trim()) {returnCode = this.ZTICNS_AR[i].code};
      
      }
     return returnCode;
}

ZtClientZTICDomain.prototype.getNamespaceForCode = function(codex) {
      var returnNamespace = null;
      for(var i = 0; i < this.ZTICNS_AR.length; i++){
      
          if(codex.trim() == this.ZTICNS_AR[i].code.trim()) {returnNamespace = this.ZTICNS_AR[i].namespace};
      
      }
     return returnNamespace;
}





function ZtClientZTICDomain(ZTICDomainx) {
   //this.dbzti_id = "";
   this.ZTICNS_AR = ZTICDomainx.ZTICNS_AR;

} // end of function ZtClientZTICDomain



function ZTICNS(code, namespace) {
   this.code = code;
   this.namespace = namespace;
} // end of function ZTICNS

  
  
////} // end of ZtClientSession.prototype.getTechProfiles 

ZtClientSession.prototype.getTemplateValues = function() { 
  console.log("getting template values");  

// build request

  
} // end of ZtClientSession.prototype.getTemplateValues 





  

ZtMessageFile.prototype.readRawMsgFromFile = function() {
  console.log("Reading raw message from file: "+ this.filename)
  var   fileContents = fs.readFileSync(this.filename);
  var lines = fileContents.toString().split('\n');
  msgRow = new MessageRow("dummy", "dummy","dummy","dummy","dummy","dummy");
     this.ZtRawMessageArray.push(msgRow);
//console.log("line.length: " + lines.length);
for (var i = 0; i < lines.length; i++) {
//   this.ZtLineArray.push(lines[i].toString());
   msgRow = new MessageRow(lines[i].substring(1,6),lines[i].substring(6,12),lines[i].substring(12,16),lines[i].substring(16,21),lines[i].substring(21,26),lines[i].substring(26) );
   this.ZtRawMessageArray.push(msgRow);
}

}  // end of readRawMsgFromFile()


          

  
   
   
   


ZtServer.prototype.readSystemParametersFromFile = function() {
  //console.log("Reading system parameters from sys_params.txt file: ");

  //sysParamsStr = JSON.stringify(this.ZtSysParams_AR);
  //console.log("20240228c sysParamsStr: "+sysParamsStr);
  this.ZtSysParams_AR = JSON.parse(process.env.ZT_SERVER_STARTUP_PARAMS);

}  // end of readSystemParametersFromFile()


          
ZtServer.prototype.IMDBlistContents = function() {

    console.log("Listing Contents of IMDB");


}




ZTICDomain.prototype.initializeZTICDomain_asynch = function(zticDom) {


//var query = ZtObjectDbRec.find().where({ te_2_2 : "14", te_2_8 : "34", te_2_32 : zticDom.dbzti_id});  //(del) 20160912
var query = ZtObjectDbRec.find().where({ te_2_32 : zticDom.dbzti_id.toString().trim()});                                  //(insert) 20160912
query.exec(function(err, result) {
   if (!err) {
     //console.log("start of namespaces");
     zticDom.initializeZTICDomainCallback(null, result, zticDom);

    } else {
               // error handling
    }; //end if (!err)
 

 });  




}  //end of prototype.initializeZTICDomain_asynch


    
          


  
   

    
ZtMessageSet.prototype.process = function(dsmsg_AR) {
     //*** add dsmsg_AR[AR_idx].process_asynch
   for (var i = 0; i < dsmsg_AR.length; i++) {
//       dsmsg_AR[i].readRawMsgFromFile();
       dsmsg_AR[i].transformFromRawMsg();
       dsmsg_AR[i].showOEupdateWA();
       dsmsg_AR[i].findZTIC(dsmsg_AR[i]);
//       dsmsg_AR[i].findTargetZTIC_asynch(dsmsg_AR[i]);
       dsmsg_AR[i].buildHtml();
   } // end loop through dsmsg_AR

}  // end of ZtMessageSet.prototype.process
    
    
// start 20240428
function HtmlObjectListRec() {
  this.ObjElem  = "";
  this.typeVal  = "";
  this.link  = "";

} // end of function HtmlObjectListRec    

// end 20240428

