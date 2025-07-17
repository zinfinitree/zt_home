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



var moment = require('moment');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");
var bodyParser = require('body-parser');



//DB

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dfs2DB');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Connection Error', err);
});

db.on('open', function () {
  console.log('Connected to Database');

  svr1.readSystemParametersFromFile();
  for(var i = 0; i < svr1.ZtSysParams_AR.length; i++){
    console.log("sys params: "+ svr1.ZtSysParams_AR[i].parameterName +" "+ svr1.ZtSysParams_AR[i].seqNum+" "+svr1.ZtSysParams_AR[i].value);
    if (svr1.ZtSysParams_AR[i].parameterName.trim() == "targetNS"){
          var zticDom = new ZTICDomain();
          zticDom.dbzti_id     = svr1.ZtSysParams_AR[i].value.substring(0,5);
          var zticns = new ZTICNS("1", svr1.ZtSysParams_AR[i].value.substring(5).trim());
          zticDom.ZTICNS_AR.push(zticns);
          zticDom.initializeZTICDomain_asynch(zticDom);
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
var msgSchema = new mongoose.Schema({
  te_2_32: String,  //DB ZT Instance ID
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
var Msg = mongoose.model('msg', msgSchema);

//END DB


//--------------------MSGS
app.get('/ZtObjectDbRec', function(req, res, next) {
  Msg.find().exec(function (err, msg) {
    if (err) throw(err);
    msg.sort(function(a, b){
      return b.te_2_1 - a.te_2_1;
    });
    res.send(msg);
  });
});


var query = Msg.find().where({ te_2_32 : 'TPFA' });
query.exec(function(err, result) {
   if (!err) {
     //console.log("start of TPFA");
     // handle result
    // var rows =  JSON.parse(resultno.toString());
     //console.log(result);
     //console.log(result[1].te_2_31);
     for (var i = 0; i < result.length; i++){
       //console.log(result[i].te_2_31);
     }
     //console.log("end of TPFA");
   } else {
     // error handling
   };
 });


app.post('/ZtObjectDbRec/insert', function(req, res){
  var m = new Msg({
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

app.get('/ZtObjectDbRec/:id', function(req, res, next) {
  var query = Msg.find().where({ _id : req.params.id });
  query.exec(function (err, msg) {
    res.send(msg)
 });
});



app.post('/ZtObjectDbRec/:id/remove', function(req, res, next) {
  Msg.remove({
    _id: req.params.id
  }, function(err, msg) {
    if (err)
      res.send(err);
    res.sendStatus(200);
  });
});






function DsDatabase(connx) {
    this.conn   = connx;
    newInsert_AR = [];

  }


DsDatabase.prototype.insert = function(dbInsert_ARx) {
var ret = new DbReturn;

this.newInsert_AR = dbInsert_ARx;
    
return ret;
}


DsDatabase.prototype.query = function(dbQueryStrx) {
var ret = new DbReturn;
    
return ret;
}




function DbReturn() {
    this.dbRecs = [];
    this.errString = "";
    } 









module.exports = DsDatabase;
