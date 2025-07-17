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
var HashMap = require('hashmap');

var clientZTICDomain =   new DsClientZTICDomain();  //20200430
var clientTime = this.time = new (require('./zt_client_time'));

var Client = require('node-rest-client').Client;
var fs = require('fs'); 

require("dotenv").config();   // 20230220


var object_HM = new HashMap();

var session_AR = [];      // 20200531 test
var app_AR     = [];      // 20220604
var adapterSet_AR = [];   // 20220727



/* Routes */
var app = express();
const path = require('path');    // 20250407

const cors = require('cors');   // 20250405
app.use(cors());   // 20250405

app.set('port', process.env.ZT_CLIENT_PORT || 3000);   // 20230227

app.use(bodyParser.json());  // (del) 20160330
app.use(bodyParser.urlencoded({extended:false}));  // (del) 20160330

app.use('/', express.static(path.join(__dirname)));  // 20250407
app.use(express.static(__dirname + '/images'));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


 
var maintain_object_submit_html = "";
 








app.get('/zt/main',function(req,res){

  var dirnamex = __dirname + "/client/zt_main.html";          // 20230217
  res.sendFile(dirnamex);                                         // 20230217
});


app.get('/zt/file_import',function(req,res){
  var dirnamex = __dirname + "/zt_file_import.html";

  res.sendFile(dirnamex);
});



app.get('/zt/query',function(req,res){
  var dirnamex = __dirname + "/zt_query.html";                      // 20230217

 res.sendFile(dirnamex);                                            // 20230217
});



app.get('/zt/maintain_object',function(req,res){
  var dirnamex = __dirname + "/zt_maintain_object.html";   // 20230217
  res.sendFile(dirnamex);         // 20230217

});


app.get('/zt/app_logon',function(req,res){
  var dirnamex = __dirname + "/zt_app_logon.html";    // 20230217

  res.sendFile(dirnamex);         // 20230217

});

//app.get('/zinfinitree',function(req,res){    //(del) 20250328
app.get('/',function(req,res){ 

    

  var zt_website_params = JSON.parse(process.env.ZINFINITREE_WEBSITE_PARAMETERS);

  //console.log("20250307 zt_website_params.TargetNS: "+zt_website_params.TargetNS);


  var TargetNS = zt_website_params.TargetNS; 
  
  var language = zt_website_params.language;

  var user_name = zt_website_params.user_name;

  var user_password = zt_website_params.user_password;

  var AppNS = zt_website_params.AppNS;

  var app_code = zt_website_params.app_code;

  var PageNS = zt_website_params.PageNS;

  var page_code = zt_website_params.page_code;
  


console.log("20250307 TargetNS: "+TargetNS, " Language: "+language, " user_name: "+user_name, " user_password: "+user_password, " AppNS: "+AppNS, " app_code: "+app_code, " PageNS: "+PageNS, " page_code: "+page_code );  



         clientZTICDomain.pushNamespace(TargetNS);
         clientZTICDomain.pushNamespace(AppNS);                        // 20220606
         clientZTICDomain.pushNamespace(PageNS);                       // 20220606
         // 20210324
         clientZTICDomain.pushNamespace("131131/21");
         clientZTICDomain.pushNamespace("zinfinitree.com/address");
         clientZTICDomain.pushNamespace("zinfinitree.com/document");  // 20200831
         clientZTICDomain.pushNamespace("zinfinitree.com/spreadsheet");  // 20200831
         clientZTICDomain.pushNamespace("zinfinitree.com/multimedia_object");  // 20210712
         clientZTICDomain.pushNamespace("131131/22");           // 20210924
         clientZTICDomain.pushNamespace("zinfinitree.com/storage");           // 20210924
         clientZTICDomain.pushNamespace("zinfinitree.com/dev_agile");
         clientZTICDomain.pushNamespace("zinfinitree.com/app");               // 20220601
         clientZTICDomain.pushNamespace("zinfinitree.com/workflow");           // 20220917
         clientZTICDomain.pushNamespace("zinfinitree.com/messaging");           // 20220917
         clientZTICDomain.pushNamespace("zinfinitree.com/map");                 // 20220928

         clientZTICDomain.pushNamespace("zinfinitree.com/server_config");
         clientZTICDomain.pushNamespace("zinfinitree.com/address_app_data");

         clientZTICDomain.pushNamespace("zinfinitree.com/time_gregorian_2020s_tz_est");   // 20230707
         clientZTICDomain.pushNamespace("zinfinitree.com/time_gregorian_millenium3");     // 20230707
         clientZTICDomain.pushNamespace("zinfinitree.com/time");                          // 20230707

         clientZTICDomain.pushNamespace("zinfinitree.com/legal_entity");                  // 20231107
         clientZTICDomain.pushNamespace("zinfinitree.com/legal_entity_example");          // 20231107

         var sessID = "123";
         
         var sess1 = new DsClientSession(clientZTICDomain, sessID);
           //  sess1.maint_mode = maint_modex;    // 20200826
         //get system parameters

         sess1.serverIP = process.env.ZT_SERVER_IP;    // 20230221

         for(var i = 0; i < sess1.DsSysParams_AR.length; i++){
           // console.log("sys params: "+ sess1.DsSysParams_AR[i].parameterName +" "+ sess1.DsSysParams_AR[i].seqNum+" "+sess1.DsSysParams_AR[i].value);
           if (sess1.DsSysParams_AR[i].parameterName.trim() == "serverIP"){
            // sess1.serverIP     = sess1.DsSysParams_AR[i].value.toString().trim();  (del) 20230221
            // console.log("sess1.serverIP: "+sess1.serverIP);                        (del) 20230221
           }
         }


  var zticDomfound = false;
  var zticDomIdx;
  var base_ztic = clientZTICDomain.getCodeForNamespace("131131/21");
  var server_config_ztic = clientZTICDomain.getCodeForNamespace("zinfinitree.com/server_config");

  var app_ztic  =  clientZTICDomain.getCodeForNamespace(AppNS);          // 20220606
  var page_ztic =  clientZTICDomain.getCodeForNamespace(PageNS);         // 20220606
  var app_def_ztic  =  clientZTICDomain.getCodeForNamespace("zinfinitree.com/app");  // 20220606


var rm_AR = [];  //raw message array
var next_index = 1; 
var next_index_str = next_index.toString().trim();

var lines = [];

for(var i = 0; i < clientZTICDomain.ZTICNS_AR.length; i++){
   lines.push("ZTIC "+clientZTICDomain.ZTICNS_AR[i].code.toString().trim().padEnd(5)+clientZTICDomain.ZTICNS_AR[i].namespace.toString().trim());
}  //endfor loop through ZTICNS

lines.push("RZTI "+clientZTICDomain.getCodeForNamespace(TargetNS));         //         receiver ztic
lines.push("MPPG 5179248000.000      id123               1234      1    usr1                "+server_config_ztic.padEnd(5)+"2    ");  //msg proc parameters gen'l
var line = "EXTK "+base_ztic.padEnd(5)+"2    "+base_ztic.padEnd(5)+language;
lines.push(line);



line = "QSET "+base_ztic.padEnd(5)+"2".padEnd(5)+"1    +    "+"ObjTmplQset";
lines.push(line);                                             //query set member
lines.push("QSLS 10   0    1    ");                                      //query selection set
lines.push("QOSS 1lev 1usg 1    ");  // 20240222  add usage type code  msg element 3124 

 // use obj template of app def  20220606
var app_def_templ_code = "1";
 
line = "QOBJ "+base_ztic.padEnd(5)+"2".padEnd(5)+app_def_ztic.padEnd(5)+app_def_templ_code.toString().trim().padEnd(5); 

lines.push(line);


if(app_code.toString().trim() != ""){
   line = "QSET "+app_def_ztic.padEnd(5)+app_def_templ_code.padEnd(5)+"1    +    "+"ObjectQset";

   lines.push(line);
   lines.push("QSLS 20   0    1    ");                               //query selection set
   lines.push("QOSS 1lev 1usg 1    ");  // 20240222  add usage type code  msg element 3124
   line = "QOBJ "+"12345"+"12345"+app_ztic.padEnd(5)+app_code.toString().trim().padEnd(5);
   lines.push(line);
} // endif obj_codex.toString().trim() != ""


var cmb_str = './zt_client_message_builder';          
var maint_modex = "display";   // 20220607
var cmb = new (require(cmb_str))(lines, TargetNS, maint_modex);   // 20210719 
rm_AR = cmb.convertRecordFormatMsgToRaw();


var dsmsg1     = new DsMessage(clientZTICDomain, rm_AR);

var request = require('request')

var urlx = "http://"+sess1.serverIP+":5001/zt/process_message";

var options = {
  method: 'post',
  body: dsmsg1.DsRawMessageArray,
  json: true, // Use,If you are sending JSON data
  url: urlx,

}

    var sm1_str = './zt_client_message';           
    var sm1 = new (require(sm1_str));               

   var app_sess_idx = "sess1abc";
   //var sess = new (require('./zt_client_session'))(sess_idx, clientZTICDomain.ZTICNS_AR, language, TargetNS);
    var app_sess = new (require('./zt_client_app'))(app_sess_idx, clientZTICDomain.ZTICNS_AR, app_ztic, app_code, TargetNS, language, user_name, AppNS );
    var app_sess_idx = app_AR.push(app_sess) -1;
 


   
    var respStr2 = ""; 


request(options, function (err, resp, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  //console.log(' Body :', body)

    sm1.setZtRawMessageAR(rm_AR);
    sm1.addResponseToZtRawMessageAR(body);

var respStr = "";  //20220607
   console.log("ZtRawMessageAR before client response parse in zt_client.js: ");
for(var i = 0; i < sm1.ZtRawMessageAR.length; i++){

  //console.log("Row: "+i+": "+ sm1.ZtRawMessageAR[i].index+"-"+sm1.ZtRawMessageAR[i].parent_index+"-"+sm1.ZtRawMessageAR[i].priority+"-"+sm1.ZtRawMessageAR[i].me_ztic+"-"+sm1.ZtRawMessageAR[i].me_code+"-"+sm1.ZtRawMessageAR[i].data);

   } // end of for
    
     var sm_parse = new (require('./zt_client_message_parse'))(sm1); 
         sm_parse.process();
    //console.log("= 20210109 listing parsed response OE values");
   // console.log("20200702 obj_codex: "+obj_codex);
  //  //session_AR[sess_idx].setValuesFromInitialMessage(sm1, OK_ztic, obj_kind_codex, obj_ztic, obj_codex);        //20200603  //(del) 20200813

  //  session_AR[sess_idx].setValuesFromInitialMessage(sm1, obj_ztic, obj_codex);                                   //20200813
      app_AR[app_sess_idx].setValuesFromInitialMessageForApp(sm1, app_ztic, app_code);


  //  // start 20210109
  //  //for(var j = 0; j < session_AR[sess_idx].workbook_AR.length; j++){
  //  //  console.log("=+ 20210109 session_AR[sess_idx].workbook_AR[j].displayRow_AR.length: "+session_AR[sess_idx].workbook_AR[j].displayRow_AR.length);

  //  //} // endfor

  //  // end 20210109
  //  respStr2 = session_AR[sess_idx].getHtmlForTemplate(OT_ztic, obj_templ_codex, maint_modex, maint_format);       //20200604
      respStr2 = app_AR[app_sess_idx].getHtmlForApp();
   
    //respStr2 = maint_obj_util.getHtml();                      // (del) 20200604

//console.log(" ");
//console.log("Parsed Response values");
//console.log(" ");

var loop_cntr = 0;
for(var h = 0; h < sm1.queryResponseSetMemberWA_AR.length; h++){


  // console.log("Query ID:  "+ sm1.queryResponseSetMemberWA_AR[h].setMemberID);
   for(var k = 0; k < sm1.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
 //      console.log("object_idx: "+ sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k]);

var i = sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c

  //console.log("Object: "+ sm1.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+sm1.queryResponseObjectWA_AR[i].objectKindCode+"-"+sm1.queryResponseObjectWA_AR[i].objectZTIC+"-"+sm1.queryResponseObjectWA_AR[i].objectCode);


     // var objx = sm1.queryResponseObjectWA_AR[i];                                   //(del) 20200126
     var objx = sm1.queryResponseObjectWA_AR[sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
     loop_cntr++;
var OEscreenElem_AR = []; 
respStr = respStr + "<table>";         // 20200127
const html_id_prfx = "val";
var   html_id_cntr = 1;
//console.log("Object Element values");
    //queryResponseObjectElementWA_AR = [];     
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
    // console.log("20200127 base_ztic: "+base_ztic);
   //  if(!(sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   //to suppress technical profile description
     if(!(sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12 ||  
          sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 31 ||
          sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 214 )){   // 20200127 temporary to suppress technical profile description
    
        var OEscreenElem = new OEscreenElemRec();    //20200125
        OEscreenElem.OE_ztic = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;
        OEscreenElem.OE_code = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;
        OEscreenElem.html_id = html_id_prfx + html_id_cntr.toString().trim();
        html_id_cntr++;
        OEscreenElem.html_label = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        respStr = respStr + "<tr><td>"+ OEscreenElem.html_label+"</td><td> <input type=\"TEXT\" id='"+ OEscreenElem.html_id+ "' size=\"40\"></td></tr>";  

      }  // endif sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode != 12



  //console.log("   OE ZTIC/Code: Value:  "+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
//+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
//+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);


      }  // endfor loop through objx.objectElement_idx_AR  

     
//console.log("Type values");
          
    //queryResponseTypeWA_AR          = [];           

    for(var j = 0; j < objx.type_idx_AR.length; j++){
      //var objx = sm1.queryResponseObjectWA_AR[i];
  //console.log("   Type Def/Value ZTIC/Code:  "+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);


      }

//console.log("Links");

    for(var j = 0; j < objx.link_idx_AR.length; j++){
      //var objx = sm1.queryResponseObjectWA_AR[i];
  //console.log("   Link Type/Value:  "+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

      }

      //if(k > 10){break;}  // 20200125 temporary restriction (TO BE REMOVED)
    } // end loop through sm1.queryResponseSetMemberWA_AR[h].object_idx_AR using index k
      //if(h > 1){break;} //  // 20200125 temporary restriction (TO BE REMOVED)
}  // end of loop through queryResponseSetMemberWA_AR using  index h





respStr = respStr + "</table>";

respStr = respStr + "<br /> <br /><br /><input type=\"button\" id=\"submit\" value=\"Submit\"><br /><br /> <br /><br />";

respStr = respStr + "</html>";

res.send(respStr2);     
maintain_object_submit_html = respStr2;   //20200416

});  // end of request  
  // end 20240819b


});

// end 20240818


//app.get('/zt/zt_server_spec_doc',function(req,res){  (del) 20240821
app.get('/zt_server_spec_doc',function(req,res){   // this was needed to make it work from http://localhost:3000/zinfinitree, this will make it not work from generic app launcher, don't know where /zt/ is introduced

  var dirnamex = __dirname + "/zt_server_spec_doc_v1_20240812.pdf";   // 20230217

  res.sendFile(dirnamex);                                             // 202302187

});

                                                                           //20200415


app.get('/zt/maintain_object_submit_a',function(req,res){

  var dirnamex = __dirname + "/zt_maintain_object_submit_a.html";    // 20230217

  res.sendFile(dirnamex);         // 20230217

});

app.get('/zt/maintain_object_submit',function(req,res){
  //var sess_id = sessionStorage.getItem("sent");
  //console.log("20200417 sess_id in maintain_object_submit: "+ sess_id);

  res.send(maintain_object_submit_html);
});




app.post('/zt/client/process_file',function(req,res){
//console.log('executing process_file on client side');
  var file_namex=req.body.file_name;
  var file_directoryx=req.body.file_directory;
  var file_formatx=req.body.file_format;
  var op_numx=req.body.op_num;
  // console.log("20200126 op_numx: "+op_numx);
  var   TabNamePrfx="";
  var TargetNS=req.body.TargetNS;
  //console.log("TargetNS: "+TargetNS);
  var file_num=req.body.file_num;

        // var clientZTICDomain =   new DsClientZTICDomain();   //  moved to top 20200430
         clientZTICDomain.pushNamespace(TargetNS);
         var sessID = "123";
         
         var sess1 = new DsClientSession(sessID, clientZTICDomain);

         //get system parameters
         sess1.serverIP = process.env.ZT_SERVER_IP;    // 20230221
         //console.log("20230320 sess1.serverIP from .env file: "+sess1.serverIP);              // 20230220
         //sess1.readSystemParametersFromFile();                                              // (del) 20230220
         for(var i = 0; i < sess1.DsSysParams_AR.length; i++){
            //console.log("sys params: "+ sess1.DsSysParams_AR[i].parameterName +" "+ sess1.DsSysParams_AR[i].seqNum+" "+sess1.DsSysParams_AR[i].value);
            
           if (sess1.DsSysParams_AR[i].parameterName.trim() == "serverIP"){
            // sess1.serverIP     = sess1.DsSysParams_AR[i].value.toString().trim(); // (del)  20230220
            // console.log("sess1.serverIP: "+sess1.serverIP);                       // (del)  20230220
           }
         }
         
  
    

 
 if (op_numx == "Import" || op_numx == "ImportSelectedFileList")
 {
    if(file_num == 1 ){file_namex = "zt_init01_local_namespaceB.txt";}
    if(file_num == 2 ){file_namex = "zt_init02_table_elementsC.txt";}
    if(file_num == 3 ){file_namex = "zt_init03_object_kinds_rec_format.txt";}
    if(file_num == 4 ){file_namex = "zt_init04_object_templates_rec_format.txt";}
    if(file_num == 5 ){file_namex = "zt_init05_tech_profiles_rec_format.txt";}
    if(file_num == 6 ){file_namex = "zt_init06_object_elements_rec_format.txt";}
    if(file_num == 7 ){file_namex = "zt_init07_object_sets_rec_format.txt";}
    if(file_num == 8 ){file_namex = "zt_init08_type_def_rec_format.txt";}
    if(file_num == 9 ){file_namex = "zt_init09_type_valuesC DO NOT USE.txt";}
    if(file_num == 10 ){file_namex = "zt_init10_link_type_rec_format.txt";}
    if(file_num == 11 ){file_namex = "zt_init11_obj_templ_link_to_tech_profileC DO NOT USE.txt";}
    if(file_num == 12 ){file_namex = "zt_init12_link_target_types_rec_format.txt";}
    if(file_num == 13 ){file_namex = "zt_init13_system_message_rec_format.txt";}
    if(file_num == 14 ){file_namex = "zt_init14_system_message_parameter_rec_format.txt";}
    if(file_num == 30 ){file_namex = "zt_file_list_init_base_objects_rec_format.txt";}
    if(file_num == 31 ){file_namex = "zt_file_list_software_rec_format.txt";}
    if(file_num == 32 ){file_namex = "zt_file_list_apps_rec_format.txt";}
    //console.log("file name--> "+file_namex + "file num:  "+ file_num);
 
 } //endif (op_numx == "Import")
 
 if (op_numx == "ImportSelectedFileList" || op_numx == "ImportManualFileList"){
  //1. read file names into array
  const dirnamex = __dirname + "/file_import"+file_directoryx+"/"+file_namex;  // 20240229";
  //var dirnamex = __dirname + "/" + file_namex;                               // (del) 20240229

  //var   fileContents = fs.readFileSync(file_namex);    // (del) 20230217
  var   fileContents = fs.readFileSync(dirnamex);        // 20230217
  var lines = fileContents.toString().split('\n');
  var file_name_AR = [];
  for (var i = 0; i < lines.length; i++) {
   file_name_AR.push(lines[i].toString().trim());
  }  // endfor


  var urlx = "http://"+sess1.serverIP+":5001/zt/process_message";
  for (var i = 0; i < file_name_AR.length; i++) {

 


    if(file_name_AR[i].toString().trim() != ""){
     //console.log("processing file: "+file_name_AR[i]);
     var dsmsgFile1 = new DsMessageFile(TargetNS, file_name_AR[i]);
     if(file_formatx == 1)
       { dsmsgFile1.readRawMsgFromFile(file_directoryx);}
      else
       { dsmsgFile1.readRecordFormatMsgFromFile(TargetNS, file_directoryx);}
   
     var dsmsg1     = new DsMessage(clientZTICDomain, dsmsgFile1.DsRawMessageArray);
     
    //console.log("20200126 call to DsClientCallToServer for op_numx == ImportSelectedFileList ");
     var svr_call = new DsClientCallToServer(urlx, dsmsg1.DsRawMessageArray);
     svr_call.processMessage();
    } //endif (file_name_AR[i].toString().trim() != ""){
  }  // endfor


 }  /// endif op_numx == "ImportSelectedFileList" || op_numx == "ImportManualFileList")
 
  //console.log("20200126 op_numx before compare to Import: "+op_numx);
 if (op_numx == "ManualFile" || op_numx == "Import")
 { 
  
  var zticDomfound = false;
  var zticDomIdx;
  //console.log("File name = "+file_namex);
  var dsmsgFile1 = new DsMessageFile(TargetNS, file_namex);
     if(file_formatx == 1)
        { dsmsgFile1.readRawMsgFromFile(file_directoryx);}
       else
        { dsmsgFile1.readRecordFormatMsgFromFile(TargetNS, file_directoryx);}
   
  
  var dsmsg1     = new DsMessage(clientZTICDomain, dsmsgFile1.DsRawMessageArray);
  
  
  var urlx = "http://"+sess1.serverIP+":5001/zt/process_message";
  //console.log("20200126 call to DsClientCallToServer for op_numx == Import");
  var svr_call = new DsClientCallToServer(urlx, dsmsg1.DsRawMessageArray);
    svr_call.processMessage();

}  // endif op_numx == "ManualFile" || op_numx == "Import"



});  //end of app.post




app.post('/zt/client/process_query',function(req,res){

//console.log('executing process_query on client side');
  var TargetNS=req.body.TargetNS;
  var language=req.body.language;
  var query_op_numx=req.body.query_op_num;
  var obj_templ_ztic_nsx=req.body.obj_templ_ztic.toString().trim();
  var obj_templ_codex=req.body.obj_templ_code;
  var obj_kind_ztic_nsx=req.body.obj_kind_ztic.toString().trim();
  var obj_kind_codex=req.body.obj_kind_code;
  var obj_ztic_nsx=req.body.obj_ztic.toString().trim();
  var obj_codex=req.body.obj_code;
  var srch_valx=req.body.srch_val;
  var object_usage_typex=req.body.object_usage_type;
  var resp_map_modex=req.body.resp_map_mode;
  var file_directoryx=req.body.file_directory;
  var file_namex=req.body.file_name;
 


  //console.log("TargetNS: "+TargetNS, " Language: "+language+ " Query Op num: "+query_op_numx+ " Obj Templ ZTIC: "+obj_templ_ztic_nsx+ " Obj Templ Code: "+obj_templ_codex+ " Obj Kind ZTIC: "+obj_kind_ztic_nsx + " Obj Kind Code: "+obj_kind_codex+ "Obj ZTIC: "+obj_ztic_nsx+ " Obj Code: "+obj_codex+ " Srch Val: "+srch_valx+ " Resp Map Mode: "+resp_map_modex+" File Dir: "+file_directoryx+" File Name: "+file_namex + " Object Usage Type: "+object_usage_typex);

   

         clientZTICDomain.pushNamespace(TargetNS);
         var sessID = "123";
         
         var sess1 = new DsClientSession(clientZTICDomain, sessID);

         sess1.serverIP = process.env.ZT_SERVER_IP;    // 20230221
         for(var i = 0; i < sess1.DsSysParams_AR.length; i++){
           // console.log("sys params: "+ sess1.DsSysParams_AR[i].parameterName +" "+ sess1.DsSysParams_AR[i].seqNum+" "+sess1.DsSysParams_AR[i].value);
           if (sess1.DsSysParams_AR[i].parameterName.trim() == "serverIP"){
           }
         }


  var zticDomfound = false;
  var zticDomIdx;


  var OT_ztic = clientZTICDomain.getCodeForNamespace(obj_templ_ztic_nsx);
  var OK_ztic = clientZTICDomain.getCodeForNamespace(obj_kind_ztic_nsx);
  var obj_ztic = clientZTICDomain.getCodeForNamespace(obj_ztic_nsx);
  var base_ztic = clientZTICDomain.getCodeForNamespace("131131/21");
  var server_config_ztic = clientZTICDomain.getCodeForNamespace("zinfinitree.com/server_config");



 var lines = [];
 var usage_code = "1";

 for(var i = 0; i < clientZTICDomain.ZTICNS_AR.length; i++){
   lines.push("ZTIC "+clientZTICDomain.ZTICNS_AR[i].code.toString().trim().padEnd(5)+clientZTICDomain.ZTICNS_AR[i].namespace.toString().trim());
 }  //endfor loop through ZTICNS

 lines.push("RZTI "+clientZTICDomain.getCodeForNamespace(TargetNS));         //         receiver ztic
 lines.push("MPPG 5179248000.000      id123               1234      1    usr1                "+server_config_ztic.padEnd(5)+"2    ");  //msg proc parameters gen'l
 var line = "EXTK "+base_ztic.padEnd(5)+"2    "+base_ztic.padEnd(5)+language;
 lines.push(line);
 line = "QSET "+base_ztic.padEnd(5)+"2".padEnd(5)+"1    +    "+"ObjTmplQset";
 lines.push(line);                                             //query set member
 lines.push("QSLS 10   0    1    ");                           //query selection set
 //console.log("20240118c usage_code: "+usage_code);
 lines.push("QOSS 1lev 1usg "+usage_code.padEnd(5));                     //query object set
 line = "QOBJ "+base_ztic.padEnd(5)+"2".padEnd(5)+OT_ztic.padEnd(5)+obj_templ_codex.toString().trim().padEnd(5); 


lines.push(line);

 if(obj_codex.toString().trim() != ""){
   line = "QSET "+OT_ztic.padEnd(5)+obj_templ_codex.padEnd(5)+"1    +    "+"ObjectQset";
   lines.push(line);
   lines.push("QSLS 20   0    1    ");                               //query selection set
   if(object_usage_typex == "select_by_set"){usage_code = "2";}
   lines.push("QOSS 1lev 1usg "+usage_code.padEnd(5));
   line = "QOBJ "+"12345"+"12345"+obj_ztic.padEnd(5)+obj_codex.toString().trim().padEnd(5);
   lines.push(line);
} // endif obj_codex.toString().trim() != ""
 


var rm_AR = [];  //raw message array




var cmb_str = './zt_client_message_builder';            
var cmb = new (require(cmb_str))(lines, TargetNS);
rm_AR = cmb.convertRecordFormatMsgToRaw();


var dsmsg1     = new DsMessage(clientZTICDomain, rm_AR);


var request = require('request')

var urlx = "http://"+sess1.serverIP+":5001/zt/process_message";

var options = {
  method: 'post',
  body: dsmsg1.DsRawMessageArray,
  json: true, // Use,If you are sending JSON data
  url: urlx,

}
    var sm1_str = './zt_client_message';           
    var sm1 = new (require(sm1_str));                
    var respStr = "<html><table>";


request(options, function (err, resp, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  //console.log(' Body :', body)
  var body_AR = [];
  body_AR = body;

    sm1.setZtRawMessageAR(rm_AR);
    sm1.addResponseToZtRawMessageAR(body);


    //console.log("ZtRawMessageAR before client response parse: ");
for(var i = 0; i < sm1.ZtRawMessageAR.length; i++){

  //console.log("Row: "+i+": "+ sm1.ZtRawMessageAR[i].index+"-"+sm1.ZtRawMessageAR[i].parent_index+"-"+sm1.ZtRawMessageAR[i].priority+"-"+sm1.ZtRawMessageAR[i].me_ztic+"-"+sm1.ZtRawMessageAR[i].me_code+"-"+sm1.ZtRawMessageAR[i].data);
  //this.index        = index;
  //this.parent_index = parent_index;
  //this.priority     = priority;
  //this.me_ztic      = me_ztic;
  //this.me_code      = me_code;
  //this.data         = data;

   } // end of for
    
     var sm_parse = new (require('./zt_client_message_parse'))(sm1); 
         sm_parse.process();
    // console.log("listing parsed response OE values");





//console.log(" ");
//console.log("Parsed Response values:");
//console.log(" ");

//console.log("20200125a sm1.queryResponseSetMemberWA_AR.length: "+sm1.queryResponseSetMemberWA_AR.length);
for(var h = 0; h < sm1.queryResponseSetMemberWA_AR.length; h++){


   //console.log("Query ID:  "+ sm1.queryResponseSetMemberWA_AR[h].setMemberID);
   for(var k = 0; k < sm1.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
 //      console.log("object_idx: "+ sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k]);

var i = sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k];

  //console.log("Object: "+ sm1.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+sm1.queryResponseObjectWA_AR[i].objectKindCode+"-"+sm1.queryResponseObjectWA_AR[i].objectZTIC+"-"+sm1.queryResponseObjectWA_AR[i].objectCode);


      var objx = sm1.queryResponseObjectWA_AR[i];
//console.log("Object Element values");
    //queryResponseObjectElementWA_AR = [];     
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
      respStr = respStr + "<tr><td>"+ sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue+"</td></tr>";  
 // console.log("   OE ZTIC/Code: Value:  "+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
//+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
//+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  

     
//console.log("Type values");
                     

    for(var j = 0; j < objx.type_idx_AR.length; j++){
      //var objx = sm1.queryResponseObjectWA_AR[i];
 // console.log("   Type Def/Value ZTIC/Code:  "+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);

      }

//console.log("Links");

    for(var j = 0; j < objx.link_idx_AR.length; j++){
      //var objx = sm1.queryResponseObjectWA_AR[i];
  //console.log("   Link Type/Value:  "+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);
      }

         




    } // end loop through sm1.queryResponseSetMemberWA_AR[h].object_idx_AR using index k

}  // end of loop through queryResponseSetMemberWA_AR using  index h







respStr = respStr + "</table>";

respStr = respStr + "<table>";

respStr = respStr + "<tr><td>   </td></tr>";
respStr = respStr + "<tr><td>List of System Messages</td></tr>";
for(var i = 0; i < sm1.serverLogSystemMessageWA_AR.length; i++){
   respStr = respStr + "<tr><td>"+ sm1.serverLogSystemMessageWA_AR[i].shortSystemMessage+"</td></tr>"+"<tr><td>"+ sm1.serverLogSystemMessageWA_AR[i].longSystemMessage+"</td></tr>";

}  // endfor loop through serverLogSystemMessageWA_AR

respStr = respStr + "</table>";


respStr = respStr + "</html>";

res.send(respStr);                 
 
 
  if(resp_map_modex == "map_with_templ" || resp_map_modex == "map_without_templ"){

    sm1.mapResponseToRequest(resp_map_modex);
    //console.log("20200519 listing sm1.mappedResponseRecordFormat_AR");
    for(var i = 0; i < sm1.mappedResponseRecordFormat_AR.length; i++){
    // console.log("i: "+i+" "+sm1.mappedResponseRecordFormat_AR[i]);
    }   // endfor

    var dir_and_filename = file_directoryx + file_namex;
    var file = fs.createWriteStream(dir_and_filename);
    file.on('error', function(err) { /* error handling */ });
    for (var i = 0; i < sm1.mappedResponseRecordFormat_AR.length; i++) {
      file.write(sm1.mappedResponseRecordFormat_AR[i]+'\n');
    }  // endfor

    file.end();
  } // endif resp_map_modex == "map_with_templ"  


});  // end of request    



});  //end of app.post for query






app.post('/zt/client/maintain_object',function(req,res){

//console.log('executing maintain_object on client side');
  var TargetNS=req.body.TargetNS.trim();
  var language=req.body.language;
  var status_selx=req.body.status_sel;
  var obj_templ_ztic_nsx=req.body.obj_templ_ztic.toString().trim();
  var obj_templ_codex=req.body.obj_templ_code.toString().trim();
  var obj_ztic_nsx=req.body.obj_ztic.toString().trim();
  var obj_codex=req.body.obj_code.toString().trim();
  var maint_modex=req.body.maint_mode.toString().trim(); 
  var maint_format=req.body.maint_format.toString().trim();
  var test_AR = []; test_AR.length = 0;
      test_AR = JSON.parse(req.body.test_AR);


//console.log("20240128a TargetNS: "+TargetNS, " Language: "+language, " Status Sel: "+status_selx, " Obj Templ ZTIC: "+obj_templ_ztic_nsx, " Obj Templ Code: "+obj_templ_codex, " Obj ZTIC: "+obj_ztic_nsx, " Obj Code: "+obj_codex, "Maint Mode: "+maint_modex, "Maint Format: "+maint_format );  


 // console.log("test_AR entries: ");      // 20200125 - temporary test
  for(var i = 0; i < test_AR.length; i++){
    // console.log(test_AR[i].html_id+" - "+test_AR[i].value);
  }  //


         //var clientZTICDomain =   new DsClientZTICDomain();   // moved to top 20200430
         clientZTICDomain.pushNamespace(TargetNS);
         // 20210324
         clientZTICDomain.pushNamespace("131131/21");
         clientZTICDomain.pushNamespace("zinfinitree.com/address");
         clientZTICDomain.pushNamespace("zinfinitree.com/document");  // 20200831
         clientZTICDomain.pushNamespace("zinfinitree.com/spreadsheet");  // 20200831
         clientZTICDomain.pushNamespace("zinfinitree.com/multimedia_object");  // 20210712
         clientZTICDomain.pushNamespace("131131/22");           // 20210924
         clientZTICDomain.pushNamespace("zinfinitree.com/storage");           // 20210924
         clientZTICDomain.pushNamespace("zinfinitree.com/dev_agile");     // 20230405
         clientZTICDomain.pushNamespace("zinfinitree.com/app");           // 20220601
         clientZTICDomain.pushNamespace("zinfinitree.com/workflow");           // 20220917
         clientZTICDomain.pushNamespace("zinfinitree.com/messaging");           // 20220917
         clientZTICDomain.pushNamespace("zinfinitree.com/map");           // 20220928
         clientZTICDomain.pushNamespace("zinfinitree.com/server_config");
         clientZTICDomain.pushNamespace("zinfinitree.com/address_app_data");
         clientZTICDomain.pushNamespace("zinfinitree.com/time_gregorian_2020s_tz_est");   // 20230707
         clientZTICDomain.pushNamespace("zinfinitree.com/time_gregorian_millenium3");     // 20230707
         clientZTICDomain.pushNamespace("zinfinitree.com/time");                          // 20230707
         clientZTICDomain.pushNamespace("zinfinitree.com/legal_entity");                  // 20231107
         clientZTICDomain.pushNamespace("zinfinitree.com/legal_entity_example");          // 20231107
         // 20210324
         var sessID = "123";
         
         var sess1 = new DsClientSession(clientZTICDomain, sessID);
             sess1.maint_mode = maint_modex;    // 20200826

         sess1.serverIP = process.env.ZT_SERVER_IP;    // 20230221

         for(var i = 0; i < sess1.DsSysParams_AR.length; i++){
          //  console.log("sys params: "+ sess1.DsSysParams_AR[i].parameterName +" "+ sess1.DsSysParams_AR[i].seqNum+" "+sess1.DsSysParams_AR[i].value);
           if (sess1.DsSysParams_AR[i].parameterName.trim() == "serverIP"){
           }
         }


  var zticDomfound = false;
  var zticDomIdx;
  var OT_ztic = clientZTICDomain.getCodeForNamespace(obj_templ_ztic_nsx);
  var obj_ztic = clientZTICDomain.getCodeForNamespace(obj_ztic_nsx);
  var base_ztic = clientZTICDomain.getCodeForNamespace("131131/21");
  var server_config_ztic = clientZTICDomain.getCodeForNamespace("zinfinitree.com/server_config");

//console.log("OT_ztic: "+OT_ztic);

var rm_AR = [];  //raw message array
var next_index = 1; 
var next_index_str = next_index.toString().trim();

var lines = [];

for(var i = 0; i < clientZTICDomain.ZTICNS_AR.length; i++){
   lines.push("ZTIC "+clientZTICDomain.ZTICNS_AR[i].code.toString().trim().padEnd(5)+clientZTICDomain.ZTICNS_AR[i].namespace.toString().trim());
}  //endfor loop through ZTICNS

lines.push("RZTI "+clientZTICDomain.getCodeForNamespace(TargetNS));         //         receiver ztic
lines.push("MPPG 5179248000.000      id123               1234      1    usr1                "+server_config_ztic.padEnd(5)+"2    ");  //msg proc parameters gen'l
var line = "EXTK "+base_ztic.padEnd(5)+"2    "+base_ztic.padEnd(5)+language;
lines.push(line);
line = "QSET "+base_ztic.padEnd(5)+"2".padEnd(5)+"1    +    "+"ObjTmplQset";
lines.push(line);                                             //query set member
lines.push("QSLS 10   0    1    ");                                      //query selection set
lines.push("QOSS 1lev 1usg 1");
line = "QOBJ "+base_ztic.padEnd(5)+"2".padEnd(5)+OT_ztic.padEnd(5)+obj_templ_codex.toString().trim().padEnd(5); 
 

lines.push(line);

if(obj_codex.toString().trim() != ""){
   line = "QSET "+OT_ztic.padEnd(5)+obj_templ_codex.padEnd(5)+"1    +    "+"ObjectQset";
   lines.push(line);
   lines.push("QSLS 20   0    1    ");                               //query selection set
   lines.push("QOSS 1lev 1usg 1");
   line = "QOBJ "+"12345"+"12345"+obj_ztic.padEnd(5)+obj_codex.toString().trim().padEnd(5);
   lines.push(line);
} // endif obj_codex.toString().trim() != ""


var cmb_str = './zt_client_message_builder';           
var cmb = new (require(cmb_str))(lines, TargetNS, maint_modex);   // 20210719 
rm_AR = cmb.convertRecordFormatMsgToRaw();


var dsmsg1     = new DsMessage(clientZTICDomain, rm_AR);

var request = require('request')

var urlx = "http://"+sess1.serverIP+":5001/zt/process_message";

var options = {
  method: 'post',
  body: dsmsg1.DsRawMessageArray,
  json: true, // Use,If you are sending JSON data
  url: urlx,

}

    var sm1_str = './zt_client_message';            
    var sm1 = new (require(sm1_str));                

   var sess_idx = "sess1abc";
   var sess = new (require('./zt_client_session'))(sess_idx, clientZTICDomain.ZTICNS_AR, language, TargetNS);
       sess.maint_mode = maint_modex;   // 20200826
   var sess_idx = session_AR.push(sess) -1;
   for(var i = 0; i < session_AR.length; i++){
     //console.log("20200601 session_AR[i].id: "+session_AR[i].id);
     for(var j = 0; j < session_AR[i].template_AR.length; j++){
     // console.log("   session_AR[i].template_AR[j].id: " + session_AR[i].template_AR[j].id);
     } // endfor   
    } // endfor
   
    var maint_obj_util_str = './zt_client_maintain_object_utility'; 


    var respStr = "<html>";
   
    var respStr2 = ""; 


request(options, function (err, resp, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  //console.log(' Body :', body)

    sm1.setZtRawMessageAR(rm_AR);
    sm1.addResponseToZtRawMessageAR(body);


   //console.log("ZtRawMessageAR before client response parse: ");
for(var i = 0; i < sm1.ZtRawMessageAR.length; i++){

  //console.log("Row: "+i+": "+ sm1.ZtRawMessageAR[i].index+"-"+sm1.ZtRawMessageAR[i].parent_index+"-"+sm1.ZtRawMessageAR[i].priority+"-"+sm1.ZtRawMessageAR[i].me_ztic+"-"+sm1.ZtRawMessageAR[i].me_code+"-"+sm1.ZtRawMessageAR[i].data);

   } // end of for
    
     var sm_parse = new (require('./zt_client_message_parse'))(sm1); 
         sm_parse.process();
    //console.log("= 20210109 listing parsed response OE values");
    //console.log("20200702 obj_codex: "+obj_codex);
    //session_AR[sess_idx].setValuesFromInitialMessage(sm1, OK_ztic, obj_kind_codex, obj_ztic, obj_codex);        //20200603  //(del) 20200813
    session_AR[sess_idx].setValuesFromInitialMessage(sm1, obj_ztic, obj_codex);                                   //20200813
    // start 20210109
    //for(var j = 0; j < session_AR[sess_idx].workbook_AR.length; j++){
    //  console.log("=+ 20210109 session_AR[sess_idx].workbook_AR[j].displayRow_AR.length: "+session_AR[sess_idx].workbook_AR[j].displayRow_AR.length);

    //} // endfor

    // end 20210109
    respStr2 = session_AR[sess_idx].getHtmlForTemplate(OT_ztic, obj_templ_codex, maint_modex, maint_format);       //20200604
   
    //respStr2 = maint_obj_util.getHtml();                      // (del) 20200604

//console.log(" ");
//console.log("Parsed Response values");
//console.log(" ");

var loop_cntr = 0;
for(var h = 0; h < sm1.queryResponseSetMemberWA_AR.length; h++){


   //console.log("Query ID:  "+ sm1.queryResponseSetMemberWA_AR[h].setMemberID);
   for(var k = 0; k < sm1.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
 //      console.log("object_idx: "+ sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k]);

var i = sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c

 // console.log("Object: "+ sm1.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+sm1.queryResponseObjectWA_AR[i].objectKindCode+"-"+sm1.queryResponseObjectWA_AR[i].objectZTIC+"-"+sm1.queryResponseObjectWA_AR[i].objectCode);


     // var objx = sm1.queryResponseObjectWA_AR[i];                                   //(del) 20200126
     var objx = sm1.queryResponseObjectWA_AR[sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
     loop_cntr++;
var OEscreenElem_AR = []; 
respStr = respStr + "<table>";         // 20200127
const html_id_prfx = "val";
var   html_id_cntr = 1;
//console.log("Object Element values");
    //queryResponseObjectElementWA_AR = [];     
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
     //console.log("20200127 base_ztic: "+base_ztic);
   //  if(!(sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   //to suppress technical profile description
     if(!(sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12 ||  
          sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 31 ||
          sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 214 )){   // 20200127 temporary to suppress technical profile description
    
        var OEscreenElem = new OEscreenElemRec();    //20200125
        OEscreenElem.OE_ztic = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;
        OEscreenElem.OE_code = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;
        OEscreenElem.html_id = html_id_prfx + html_id_cntr.toString().trim();
        html_id_cntr++;
        OEscreenElem.html_label = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        respStr = respStr + "<tr><td>"+ OEscreenElem.html_label+"</td><td> <input type=\"TEXT\" id='"+ OEscreenElem.html_id+ "' size=\"40\"></td></tr>";  

      }  // endif sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode != 12



  //console.log("   OE ZTIC/Code: Value:  "+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
//+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
//+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);


      }  // endfor loop through objx.objectElement_idx_AR  

     
//console.log("Type values");
          
    //queryResponseTypeWA_AR          = [];           

    for(var j = 0; j < objx.type_idx_AR.length; j++){
      //var objx = sm1.queryResponseObjectWA_AR[i];
  //console.log("   Type Def/Value ZTIC/Code:  "+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);


      }

//console.log("Links");

    for(var j = 0; j < objx.link_idx_AR.length; j++){
      //var objx = sm1.queryResponseObjectWA_AR[i];
  //console.log("   Link Type/Value:  "+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

      }

      //if(k > 10){break;}  // 20200125 temporary restriction (TO BE REMOVED)
    } // end loop through sm1.queryResponseSetMemberWA_AR[h].object_idx_AR using index k
      //if(h > 1){break;} //  // 20200125 temporary restriction (TO BE REMOVED)
}  // end of loop through queryResponseSetMemberWA_AR using  index h

//console.log(" ");
//console.log(" ");
//console.log("20230801 List Statistical Values Objects");


for(var j = 0; j < sm1.queryResponseStatisticalValuesObjectWA_AR.length; j++){
  //console.log("sv_obj_ztic: "+ sm1.queryResponseStatisticalValuesObjectWA_AR[j].sv_obj_ztic);
  //console.log("sv_obj_code: "+ sm1.queryResponseStatisticalValuesObjectWA_AR[j].sv_obj_code);
  //console.log(" ");
  //console.log("list of dimensions:");
  for (q = 0; q < sm1.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR.length; q++){
    // console.log("sv_dimension_ztic: "+sm1.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[q].sv_dimension_ztic);
    // console.log("sv_dimension_code: "+sm1.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[q].sv_dimension_code);
    // console.log("sv_dimension_label: "+sm1.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[q].sv_dimension_label);
    // console.log("type_def_idx_for_summarization: "+sm1.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[q].type_def_idx_for_summarization);
    // console.log("type_def_path_ztic: "+ sm1.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[q].type_def_path_ztic);
    // console.log("type_def_path_code: "+ sm1.queryResponseStatisticalValuesObjectWA_AR[j].dimension_AR[q].type_def_path_code);
  }

  //console.log(" ");
  //console.log("list of statistical values");
  for (q = 0; q < sm1.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR.length; q++){
   // console.log("statistical_value: "+sm1.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[q].statistical_value);
    for (r = 0; r < sm1.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[q].sv_typeDefAndValue_AR.length; r++){
       //    console.log("   type_def_ztic: "+sm1.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[q].sv_typeDefAndValue_AR[r].type_def_ztic);
       //    console.log("   type_def_code: "+sm1.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[q].sv_typeDefAndValue_AR[r].type_def_code);
       //    console.log("   type_val_ztic: "+sm1.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[q].sv_typeDefAndValue_AR[r].type_val_ztic);
       //    console.log("   type_val_code: "+sm1.queryResponseStatisticalValuesObjectWA_AR[j].stat_value_AR[q].sv_typeDefAndValue_AR[r].type_val_code);
    } // endfor loop through sv_typeDefAndValue
  }  // endfor loop through stat_value_AR

}  // endfor loop through statistical values objects  



respStr = respStr + "</table>";

respStr = respStr + "<br /> <br /><br /><input type=\"button\" id=\"submit\" value=\"Submit\"><br /><br /> <br /><br />";

respStr = respStr + "</html>";

// start 20250117
console.log("20250117 sm1.getResponseMessageCurrentStatus(): "+sm1.getResponseMessageCurrentStatus());
if(sm1.getResponseMessageCurrentStatus() == "4"){
  //respStr2 = "<html><table><tr><td>Error Maintaining Object</td></tr></table></html>";

  respStr2 = sm1.getHtmlForServerLogSystemMessageWA_AR();

}  // endif


res.send(respStr2);     
maintain_object_submit_html = respStr2;   //20200416

});  // end of request    




});  //end of app.post for maintain_object





  
app.post('/zt/client/maintain_object_submit',function(req,res){              

//console.log('executing maintain_object_submit on client side');
  var OK_ztic = req.body.OK_ztic.toString().trim();
  var OK_code = req.body.OK_code.toString().trim();
  var obj_ztic = req.body.obj_ztic.toString().trim();
  var obj_code = req.body.obj_code.toString().trim();
  var obj_template_desc=req.body.obj_template_desc.toString().trim();
  var language=req.body.language.toString().trim();
  var templ_idx=req.body.templ_idx;
  var TargetNS=req.body.TargetNS;

  var OEscrnElem_AR = []; OEscrnElem_AR.length = 0;
      OEscrnElem_AR = JSON.parse(req.body.OEscrnElem_AR);
  
  var sess1_resp         = JSON.parse(req.body.session);   //  20200612

  //console.log("20200621 list sess1_rsp in maintain_object_submit in zt_client.js");
  //console.log("20200621 sess1_resp.template_AR.length: "+sess1_resp.template_AR.length);

 //console.log("20230330 Selection List Values");
 //console.log("sess1_resp.selectionList_AR.length: "+sess1_resp.selectionList_AR.length);
 for(var p = 0; p < sess1_resp.selectionList_AR.length; p++){

   // console.log("selected value: "+sess1_resp.selectionList_AR[p].composite_html_input_val);
   // console.log("typeDef_ztic: "+sess1_resp.selectionList_AR[p].typeDef_ztic);
   // console.log("typeDef_code: "+sess1_resp.selectionList_AR[p].typeDef_code);
    
 }
 


//console.log("  ");
//console.log("---List sess1_resp in maintain_object_submit");
for(var i = 0; i < sess1_resp.template_AR.length; i++){
  //console.log(" ");
  //console.log("==Template==:");
  //console.log("parent_idx:  "+   sess1_resp.template_AR[i].parent_idx);
  //console.log("templLevel:  "+   sess1_resp.template_AR[i].templLevel);
  //console.log("templZTIC:   "+   sess1_resp.template_AR[i].templZTIC);   
  //console.log("templCode:   "+   sess1_resp.template_AR[i].templCode);
  //console.log("templDesc:   "+   sess1_resp.template_AR[i].templDesc);
  //console.log("objKindZTIC: "+   sess1_resp.template_AR[i].objKindZTIC);
  //console.log("objKindCode: "+   sess1_resp.template_AR[i].objKindCode);
  //console.log("linkableObjectLinkType_ztic: "+ sess1_resp.template_AR[i].linkableObjectLinkType_ztic);
  //console.log("linkableObjectLinkType_code: "+ sess1_resp.template_AR[i].linkableObjectLinkType_code);

  for(var j = 0; j < sess1_resp.template_AR[i].object_AR.length; j++){
  //console.log(" ");
  //console.log("==Object==:");

    //console.log("objZTIC:                        " + sess1_resp.template_AR[i].object_AR[j].objZTIC);
    //console.log("objCodeTemp:                    " + sess1_resp.template_AR[i].object_AR[j].objCodeTemp);
    //console.log("objCodeAssigned:                " + sess1_resp.template_AR[i].object_AR[j].objCodeAssigned); 
    //console.log("newCode:                        " + sess1_resp.template_AR[i].object_AR[j].newCode);
    //console.log("newLinkToExistingObject:        " + sess1_resp.template_AR[i].object_AR[j].newLinkToExistingObject);
    //console.log("objZTIC_ns_html_id:             " + sess1_resp.template_AR[i].object_AR[j].objZTIC_ns_html_id);
    //console.log("objZTIC_ns_html_input_val:      " + sess1_resp.template_AR[i].object_AR[j].objZTIC_ns_html_input_val);
    //console.log("objCodeAssigned_html_id:        " + sess1_resp.template_AR[i].object_AR[j].objCodeAssigned_html_id);
    //console.log("objCodeAssigned_html_input_val: " + sess1_resp.template_AR[i].object_AR[j].objCodeAssigned_html_input_val);
    //console.log("linkStatus_html_input_val:      " + sess1_resp.template_AR[i].object_AR[j].linkStatus_html_input_val);
    //console.log("linkValue_html_input_val:       " + sess1_resp.template_AR[i].object_AR[j].linkValue_html_input_val);
    //console.log(" ");
    //console.log("==OE vals from sess1_resp.template_AR:");
    for(var k = 0; k < sess1_resp.template_AR[i].object_AR[j].OE_val_AR.length; k++){
     // console.log("OE_ztic:  " + sess1_resp.template_AR[i].object_AR[j].OE_val_AR[k].OE_ztic.toString().trim());
     // console.log("OE_code:  " + sess1_resp.template_AR[i].object_AR[j].OE_val_AR[k].OE_code.toString().trim());
     // console.log("OE_value: " + sess1_resp.template_AR[i].object_AR[j].OE_val_AR[k].OE_value.toString().trim());   
     // console.log("html_id:  " + sess1_resp.template_AR[i].object_AR[j].OE_val_AR[k].html_id.toString().trim());  
     // console.log("html_input_val: " + sess1_resp.template_AR[i].object_AR[j].OE_val_AR[k].html_input_val.toString().trim());
    }  //endfor  
     // console.log(" ");
     // console.log("==type vals:");
    for(var k = 0; k < sess1_resp.template_AR[i].object_AR[j].typeVal_AR.length; k++){
     // console.log("typeDef_ztic:  " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].typeDef_ztic.toString().trim());
     // console.log("typeDef_code:  " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].typeDef_code.toString().trim());
     // console.log("typeVal_ztic: " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].typeVal_ztic.toString().trim()); 
     // console.log("typeVal_code: " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].typeVal_code.toString().trim()); 
      

      for(var p = 0; p < sess1_resp.selectionList_AR.length; p++){
        if(sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].typeDef_ztic.toString().trim() == sess1_resp.selectionList_AR[p].typeDef_ztic.toString().trim() && sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].typeDef_code.toString().trim() == sess1_resp.selectionList_AR[p].typeDef_code.toString().trim()){
          if(sess1_resp.selectionList_AR[p].composite_html_input_val == null){
            sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].typeVal_ztic = "";
            sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].typeVal_code = "";
              }
            else
              {
              var pipe_idx = sess1_resp.selectionList_AR[p].composite_html_input_val.indexOf('|');
              var pipe_idx_plus1 = pipe_idx + 1;

       
              var composite_html_input_val_ztic = sess1_resp.selectionList_AR[p].composite_html_input_val.substring(0,pipe_idx);
              var composite_html_input_val_code = sess1_resp.selectionList_AR[p].composite_html_input_val.substr(pipe_idx_plus1);
             // console.log("20230402 composite_html_input_val_ztic - composite_html_input_val_code: "+composite_html_input_val_ztic+ " - "+composite_html_input_val_code);
              sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].ztic_html_input_val = composite_html_input_val_ztic.toString().trim();
              var type_val_ns = clientZTICDomain.getNamespaceForCode(composite_html_input_val_ztic.toString().trim());
              sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].ztic_ns_html_input_val = type_val_ns;
              sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].code_html_input_val = composite_html_input_val_code.toString().trim();
          }  // endif
          //console.log("selected value: "+sess1_resp.selectionList_AR[p].composite_html_input_val);
          //console.log("typeDef_ztic: "+sess1_resp.selectionList_AR[p].typeDef_ztic);
          //console.log("typeDef_code: "+sess1_resp.selectionList_AR[p].typeDef_code);
        } // endif
     }
      // end 20230402


     // console.log("ztic_html_id:  " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].ztic_html_id.toString().trim());  
     // console.log("ztic_html_input_val: " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].ztic_html_input_val.toString().trim());
      //console.log("ztic_ns_html_input_val: " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].ztic_ns_html_input_val.toString().trim()); (del) 20230330
     // console.log("code_html_id:  " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].code_html_id.toString().trim());  
      //console.log("code_html_input_val: " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].code_html_input_val.toString().trim());    (del) 20230330

    }  //endfor 
    // console.log(" ");
    // console.log("==links:");
     for(var k = 0; k < sess1_resp.template_AR[i].object_AR[j].link_AR.length; k++){
      // console.log("linkType_ztic:    " + sess1_resp.template_AR[i].object_AR[j].link_AR[k].linkType_ztic.toString().trim());
      // console.log("linkType_code:    " + sess1_resp.template_AR[i].object_AR[j].link_AR[k].linkType_code.toString().trim());
      // console.log("linkToKind_ztic:  " + sess1_resp.template_AR[i].object_AR[j].link_AR[k].linkToKind_ztic.toString().trim());
      // console.log("linkToKind_code:  " + sess1_resp.template_AR[i].object_AR[j].link_AR[k].linkToKind_code.toString().trim());
      // console.log("linkToObj_ztic:  " + sess1_resp.template_AR[i].object_AR[j].link_AR[k].linkToObj_ztic.toString().trim());
      // console.log("linkToObj_code:  " + sess1_resp.template_AR[i].object_AR[j].link_AR[k].linkToObj_code.toString().trim());
      // console.log("linkToObj_code_temp:  " + sess1_resp.template_AR[i].object_AR[j].link_AR[k].linkToObj_code_temp.toString().trim());
      // console.log("linkStatus:  " + sess1_resp.template_AR[i].object_AR[j].link_AR[k].linkStatus.toString().trim());
      // console.log("linkValue:  " + sess1_resp.template_AR[i].object_AR[j].link_AR[k].linkValue.toString().trim());

     } // endfor
  } // endfor
} // endfor


if(sess1_resp.TVBTR_template_AR.length > 0){
//console.log("  ");
//console.log("20231120 templ_idx: "+templ_idx);
//console.log("---List sess1_resp for TVBTR, Type Value Based Template Rules in maintain_object_submit");
for(var i = 0; i < sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length; i++){
  for(var j = 0; j < sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
    // console.log("   ");
    // console.log("TVBTR==Object==:");

    for(var k = 0; k < sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){

     // console.log("oe_val_rec.OE_ztic  = " + sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic);
     // console.log("oe_val_rec.OE_code  = " + sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code);
     // console.log("oe_val_rec.OE_value  = " + sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_value);   
     // console.log( "oe_val_rec.html_input_val  = " + sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val); 

    } // endfor loop through OE_val_AR

  } // endfor loop through object_AR
}  // endfor loop through childTempl_idx_AR 
} // endif sess1_resp.TVBTR_template_AR.length > 0




        // var clientZTICDomain =   new DsClientZTICDomain();   // moved to top 20200430
 //        clientZTICDomain.pushNamespace(TargetNS);
         var sessID = "123";
         
         var sess1 = new DsClientSession(clientZTICDomain, sessID);

         //get system parameters
         //sess1.readSystemParametersFromFile();  (del)  20230221
         sess1.serverIP = process.env.ZT_SERVER_IP;    // 20230221         

         for(var i = 0; i < sess1.DsSysParams_AR.length; i++){
            //console.log("sys params: "+ sess1.DsSysParams_AR[i].parameterName +" "+ sess1.DsSysParams_AR[i].seqNum+" "+sess1.DsSysParams_AR[i].value);
           if (sess1.DsSysParams_AR[i].parameterName.trim() == "serverIP"){
            // sess1.serverIP     = sess1.DsSysParams_AR[i].value.toString().trim();  (del) 20230221
            // console.log("sess1.serverIP: "+sess1.serverIP);                        (del) 20230221
           }
         }

clientZTICDomain.pushNamespace(TargetNS);
clientZTICDomain.pushNamespace("131131/21");
clientZTICDomain.pushNamespace("zinfinitree.com/address");
clientZTICDomain.pushNamespace("zinfinitree.com/document");  // 20200831
clientZTICDomain.pushNamespace("zinfinitree.com/spreadsheet");  // 20200831
clientZTICDomain.pushNamespace("zinfinitree.com/multimedia_object");  // 20210712
clientZTICDomain.pushNamespace("131131/22");  // 20210924
clientZTICDomain.pushNamespace("zinfinitree.com/storage");  // 20210924
clientZTICDomain.pushNamespace("zinfinitree.com/dev_agile");
clientZTICDomain.pushNamespace("zinfinitree.com/app");  // 20220601
clientZTICDomain.pushNamespace("zinfinitree.com/workflow");           // 20220917
clientZTICDomain.pushNamespace("zinfinitree.com/messaging");           // 20220917
clientZTICDomain.pushNamespace("zinfinitree.com/map");           // 20220928

clientZTICDomain.pushNamespace("zinfinitree.com/server_config");
clientZTICDomain.pushNamespace("zinfinitree.com/address_app_data");

clientZTICDomain.pushNamespace("zinfinitree.com/time_gregorian_2020s_tz_est");   // 20230707
clientZTICDomain.pushNamespace("zinfinitree.com/time_gregorian_millenium3");     // 20230707
clientZTICDomain.pushNamespace("zinfinitree.com/time");                          // 20230707

clientZTICDomain.pushNamespace("zinfinitree.com/legal_entity");                  // 20231107
clientZTICDomain.pushNamespace("zinfinitree.com/legal_entity_example");          // 20231107

  var address_def_ztic = clientZTICDomain.getCodeForNamespace("zinfinitree.com/address");
  var address_app_ztic = clientZTICDomain.getCodeForNamespace("zinfinitree.com/address_app_data");
  var server_config_ztic = clientZTICDomain.getCodeForNamespace("zinfinitree.com/server_config");
  var base_ztic = clientZTICDomain.getCodeForNamespace("131131/21");
  var target_ztic = clientZTICDomain.getCodeForNamespace(TargetNS);
//console.log("20200522 base_ztic in zt_client in maintain_object_submit: "+base_ztic);

var rm_AR = [];  //raw message array
var next_index = 1; 
var next_index_str = next_index.toString().trim();

var lines = [];

for(var i = 0; i < clientZTICDomain.ZTICNS_AR.length; i++){
   lines.push("ZTIC "+clientZTICDomain.ZTICNS_AR[i].code.toString().trim().padEnd(5)+clientZTICDomain.ZTICNS_AR[i].namespace.toString().trim());
}  //endfor loop through ZTICNS

lines.push("RZTI "+clientZTICDomain.getCodeForNamespace(TargetNS));         //         receiver ztic

lines.push("MPPG 5179248000.000      id123               1234      1    usr1                "+server_config_ztic.padEnd(5)+"    2    ");


var line = "EXTK "+base_ztic.padEnd(5)+"2    "+base_ztic.padEnd(5)+language.padEnd(5);    //extended key for language variable 20200506
lines.push(line);

var time_now = clientTime.now();        // 20200504
line = "MSET MaintainSetId#1                         " + time_now.toString();   //20200504

lines.push(line);                                             //query set member

var new_code_bool;
var new_link_target_code_bool;
var obj_ztic_var;





 for(var j = 0; j < sess1_resp.template_AR[templ_idx].object_AR.length; j++){                           // 20200616


   if(sess1_resp.template_AR[templ_idx].object_AR[j].newCode){   // 20200628
    //if (obj_code == ""){                                // (del) 20200628
     new_code_bool = "+";
     obj_ztic_var = target_ztic;}  // new object created in target ztic
    else{
     new_code_bool = "-";
     obj_ztic_var = obj_ztic;}     // maintain existing object
  



    for(var k = 0; k < sess1_resp.template_AR[templ_idx].object_AR[j].OE_val_AR.length; k++){           // 20200616
line = "ELEM " +OK_ztic.padEnd(5)+OK_code.padEnd(5)+obj_ztic_var.padEnd(5)+obj_code.padEnd(5)+sess1_resp.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_ztic.toString().trim().padEnd(5) + sess1_resp.template_AR[templ_idx].object_AR[j].OE_val_AR[k].OE_code.toString().trim().padEnd(5)+"3    1    "+new_code_bool.padEnd(5) + sess1_resp.template_AR[templ_idx].object_AR[j].OE_val_AR[k].html_input_val.toString().trim();  //20200616

lines.push(line);


    }  //endfor loop through sess1_resp.template_AR[templ_idx].object_AR[j].OE_val_AR




    for(var k = 0; k < sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR.length; k++){
     
     if(!sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].dateStr_html_input_val == ""){
      const datestr = sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].dateStr_html_input_val;
      //console.log("20231029 datestr: "+datestr);
      sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_ns_html_input_val = "zinfinitree.com/time_gregorian_"+ datestr.substr(0,3) +"0s_tz_est";
      sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].code_html_input_val = datestr.substr(3,1)+datestr.substr(5,2)+datestr.substr(8,2);
      //console.log("20231029a sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_ns_html_input_val: "+sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_ns_html_input_val);
      //console.log("20231029b sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].code_html_input_val: "+sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].code_html_input_val);
     }  // endif
     
      var type_val_ztic;
     if(sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_ns_html_input_val == undefined){  // 20230402
       type_val_ztic = "";                                                                                  // 20230402
     }
     else   
     {
       type_val_ztic = clientZTICDomain.getCodeForNamespace(sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_ns_html_input_val);   // 20200831
     }  // endif
sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeVal_ztic = sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].ztic_html_input_val;
sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeVal_code = sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].code_html_input_val;

if(sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeVal_code == undefined){sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeVal_code = "";} // 20230403
line = "TYPE " +OK_ztic.padEnd(5)+OK_code.padEnd(5)+obj_ztic_var.padEnd(5)+obj_code.padEnd(5)+ sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeDef_ztic.toString().trim().padEnd(5) + sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeDef_code.toString().trim().padEnd(5) + type_val_ztic.toString().trim().padEnd(5)+ sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeVal_code.toString().trim().padEnd(5);




if(!(sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeDef_ztic.toString().trim() == "" || sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeDef_code.toString().trim()      == "" || type_val_ztic.toString().trim()      == "" || sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR[k].typeVal_code.toString().trim()      == "")){  // 20200821


lines.push(line);

}  // endif     
     // console.log("ztic_html_id:  " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].ztic_html_id.toString().trim());  
     // console.log("code_html_id:  " + sess1_resp.template_AR[i].object_AR[j].typeVal_AR[k].code_html_id.toString().trim());  


    }  // endfor loop through sess1_resp.template_AR[templ_idx].object_AR[j].typeVal_AR


   
 } // endfor loop through  sess1_resp.template_AR[templ_idx].object_AR  20200616



 // start  update values from TVBTR Type Value Based Template Rules
 if(sess1_resp.TVBTR_template_AR.length > 0){
 for(var i = 0; i < sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR.length; i++){
  for(var j = 0; j < sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR.length; j++){
    //console.log("   ");
    //console.log("TVBTR==Object==:");

    for(var k = 0; k < sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR.length; k++){
    
      //console.log("oe_val_rec.OE_ztic  = " + sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic);
      //console.log("oe_val_rec.OE_code  = " + sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code);
      //console.log("oe_val_rec.OE_value  = " + sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_value);   
      //console.log( "oe_val_rec.html_input_val  = " + sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val); 
      let OE_ztic_locl = sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_ztic;
      let OE_code_locl = sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].OE_code;
      let html_input_val_locl  = sess1_resp.TVBTR_template_AR[sess1_resp.TVBTR_template_AR[templ_idx].childTempl_idx_AR[i]].object_AR[j].OE_val_AR[k].html_input_val;
    
      if( html_input_val_locl == undefined ){html_input_val_locl = "";} 
    
      //console.log("20231125b OE_ztic_locl from sess1_resp.TVBTR_template_AR: "+ OE_ztic_locl);
      line = "ELEM " +OK_ztic.padEnd(5)+OK_code.padEnd(5)+obj_ztic_var.padEnd(5)+obj_code.padEnd(5)+OE_ztic_locl.toString().trim().padEnd(5) + OE_code_locl.toString().trim().padEnd(5)+"3    1    "+new_code_bool.padEnd(5) + html_input_val_locl.toString().trim();  //20200616

      lines.push(line);
    } // endfor loop through OE_val_AR

  } // endfor loop through object_AR
}  // endfor loop through childTempl_idx_AR 
 } // endif sess1_resp.TVBTR_template_AR.length > 0 




//console.log("20200626 obj_code: "+obj_code);
var obj_code_child = obj_code;                                 // 20200625
    if(obj_code.toString().trim() == ""){obj_code_child = 1;}  // 20200625
 
for(var l = 0; l < sess1_resp.template_AR[templ_idx].childTempl_idx_AR.length; l++){

 for(var j = 0; j < sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR.length; j++){ 
  //console.log("20200626 sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].newCode: "+sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].newCode); 
   if(sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].newCode){ 
     obj_code_child++;   // 20200625
   //  console.log("20200626 obj_code_child.toString().trim(): "+obj_code_child.toString().trim());
     sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].objCodeTemp = obj_code_child.toString().trim();  // 20200625 
   } // endif
 } // endfor loop through  sess1_resp.template_AR[templ_idx].object_AR  20200616
} // endfor loop through sess1_resp.template_AR[templ_idx].childTempl_idx_AR 




 //console.log("20200629 add links to child objects");
 //console.log("20200629 sess1_resp.template_AR[templ_idx].object_AR.length: "+sess1_resp.template_AR[templ_idx].object_AR.length);
 //console.log("20200629 sess1_resp.template_AR[templ_idx].childTempl_idx_AR.length: "+sess1_resp.template_AR[templ_idx].childTempl_idx_AR.length);
 var usedNewObject_HM = new HashMap(); // 20210215
 for(var j = 0; j < sess1_resp.template_AR[templ_idx].object_AR.length; j++){                           // 20200616
  for(var l = 0; l < sess1_resp.template_AR[templ_idx].childTempl_idx_AR.length; l++){                  // 20200626
//console.log("20200629 sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR.length: " +sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR.length);
    for(var k = 0; k < sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR.length; k++){  // 20200626
 
//console.log("20200628 sess1_resp.template_AR[templ_idx].object_AR[j].newCode in zt_client: "+sess1_resp.template_AR[templ_idx].object_AR[j].newCode);

if(sess1_resp.template_AR[templ_idx].object_AR[j].newCode){   // 20200616
 //if (obj_code == ""){                                // (del) 20200616
   new_code_bool = "+";
   obj_ztic_var = target_ztic;}  // new object created in target ztic
 else{
   new_code_bool = "-";
   obj_ztic_var = obj_ztic;}   // maintain existing object
   

     for(var m = 0; m < sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].OE_val_AR.length; m++){
      var oe_val = sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].OE_val_AR[m].html_input_val.toString().trim();
      if(oe_val != ""){ sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].isUsed = true; }
     } // endfor

       if(sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].newCode && sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].isUsed){
       var usedNewObjKeyStr = sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindZTIC.toString().trim()+"_"+
                              sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindCode.toString().trim()+"_"+
                              obj_ztic_var.toString().trim()+"_"+
                              sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].objCodeTemp.toString().trim(); // 20210215
       usedNewObject_HM.set(usedNewObjKeyStr,"x");  // 20210215
      // console.log("%%% 20200215 usedNewObjKeyStr: "+usedNewObjKeyStr);
       }


var old_link = false;        // 20210417
if(sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].newCode){  // 20200626
   new_link_target_code_bool  = "+";}
  else{
   new_link_target_code_bool  = "-";
   old_link = true;}   // 20210417

var link_to_obj_ztic = "";
var link_to_obj_code = "";
var suppress_link = false;   // 20210215

var linkStatus = ""; // 20210407
var linkValue  = ""; // 20210407
if(sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].newLinkToExistingObject){
   //console.log("%20210102 sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].objZTIC_ns_html_input_val: "+sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].objZTIC_ns_html_input_val);
   //console.log("%20210102 sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].objCodeAssigned_html_input_val: "+sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].objCodeAssigned_html_input_val);
    if(!(sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].objZTIC_ns_html_input_val == undefined)){  // 20201230
      link_to_obj_ztic = clientZTICDomain.getCodeForNamespace(sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].objZTIC_ns_html_input_val);
      link_to_obj_code = sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].objCodeAssigned_html_input_val;}
    }  // endif
  else{
     link_to_obj_ztic =  obj_ztic_var;  // 20201208
     link_to_obj_code =  sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].objCodeTemp;
     linkTokeyStr = sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindZTIC.toString().trim()+"_"+
                  sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindCode.toString().trim()+"_"+
                  link_to_obj_ztic+"_"+
                  link_to_obj_code;  // 20210215
   //  console.log("%%% 20210215 linkTokeyStr: "+linkTokeyStr);
     if(!usedNewObject_HM.has(linkTokeyStr)){suppress_link = true;}
   
   }
//console.log("@20201207 link_to_obj_ztic - link_to_obj_code: "+link_to_obj_ztic+" - "+link_to_obj_code);  

 
var timestampEff = "5179248000.000";          // 20210402

 //console.log("linkStatus_html_input_val:      " + sess1_resp.template_AR[i].object_AR[j].linkStatus_html_input_val);
 if(!(sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].linkStatus_html_input_val == undefined)){
   linkStatus = sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].linkStatus_html_input_val;
 } // endif
 if(!(sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].linkValue_html_input_val == undefined)){
   linkValue = sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].linkValue_html_input_val;
 } // endif


line = "LINK " +OK_ztic.padEnd(5)+OK_code.padEnd(5)+obj_ztic_var.padEnd(5)+obj_code.padEnd(5)+ sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].linkableObjectLinkType_ztic.toString().trim().padEnd(5) + sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].linkableObjectLinkType_code.toString().trim().padEnd(5) + sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindZTIC.toString().trim().padEnd(5) + sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindCode.toString().trim().padEnd(5) +
link_to_obj_ztic.toString().trim().padEnd(5) +
link_to_obj_code.toString().trim().padEnd(5) +
sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].templZTIC.toString().trim().padEnd(5) +
sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].templCode.toString().trim().padEnd(5) +  
new_code_bool.padEnd(5) +
new_link_target_code_bool.padEnd(5)+linkStatus.padEnd(5)+timestampEff.padEnd(20)+linkValue.padEnd(5);  

if(!(sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].linkableObjectLinkType_ztic.toString().trim() == ""  || sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].linkableObjectLinkType_code.toString().trim()      == ""  ||
sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindZTIC.toString().trim()                      == ""  || 
sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindCode.toString().trim()                      == ""  || 
(obj_ztic_var.toString().trim() == "" && link_to_obj_ztic.trim() == "" ) || (sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[k].objCodeTemp == "" && link_to_obj_code.trim() == ""))) {   // 20200821
  if(!suppress_link || old_link){  //20210417
  //if(!suppress_link){            // (del) 20210417
   lines.push(line);
  } // endif           
}  // endif 20200821
   }  // endfor  for(var j = 0; j < sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR.length; j++){
  } // endfor for(var l = 0; l < sess1_resp.template_AR[templ_idx].childTempl_idx_AR.length; l++){
 } // endfor loop through  sess1_resp.template_AR[templ_idx].object_AR  20200616




 
//console.log("20200622 sess1_resp.template_AR[templ_idx].childTempl_idx_AR.length: "+sess1_resp.template_AR[templ_idx].childTempl_idx_AR.length);
for(var l = 0; l < sess1_resp.template_AR[templ_idx].childTempl_idx_AR.length; l++){

 for(var j = 0; j < sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR.length; j++){                           // 20200616

    var suppress_elem = false; // 20210215


    for(var k = 0; k < sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].OE_val_AR.length; k++){           // 20200616
 

if(sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].newCode){   // 20200616
   new_code_bool = "+";
   obj_ztic_var = target_ztic;}  // new object created in target ztic
 else{
   new_code_bool = "-";
   obj_ztic_var = obj_ztic;}     // maintain existing object
 
   var objKeyStr = sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindZTIC.toString().trim()+"_"+
                    sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindCode.toString().trim()+"_"+
                    obj_ztic_var+"_"+
                    sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].objCodeTemp.toString().trim();  // 20210215
    //console.log("%%% 20210215 objKeyStr: "+objKeyStr);
    if(!usedNewObject_HM.has(objKeyStr) && sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].newCode){suppress_elem = true;}   // 20210215
 
line = "ELEM "
+sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindZTIC.padEnd(5)
+sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].objKindCode.padEnd(5)+obj_ztic_var.padEnd(5)
+sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].objCodeTemp.toString().trim().padEnd(5)
+sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].OE_val_AR[k].OE_ztic.toString().trim().padEnd(5)
+sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].OE_val_AR[k].OE_code.toString().trim().padEnd(5)+"3    1    "+new_code_bool.padEnd(5) 
+sess1_resp.template_AR[sess1_resp.template_AR[templ_idx].childTempl_idx_AR[l]].object_AR[j].OE_val_AR[k].html_input_val.toString().trim();  //20200616
  if(!suppress_elem){
    lines.push(line);
  }  // endif 
    }  //endfor loop through sess1_resp.template_AR[templ_idx].object_AR[j].OE_val_AR
 } // endfor loop through  sess1_resp.template_AR[templ_idx].object_AR  20200616
} // endfor loop through sess1_resp.template_AR[templ_idx].childTempl_idx_AR  



var cmb_str = './zt_client_message_builder';           
var cmb = new (require(cmb_str))(lines, TargetNS);
rm_AR = cmb.convertRecordFormatMsgToRaw();




var request = require('request')

var urlx = "http://"+sess1.serverIP+":5001/zt/process_message";




var options = {
  method: 'post',
  body: rm_AR,
  json: true, // Use,If you are sending JSON data
  url: urlx,


}
  var sm1_str = './zt_client_message';            
  var sm1 = new (require(sm1_str));                      


  var maint_obj_util_str = './zt_client_maintain_object_utility'; 

  var maint_obj_util = new (require(maint_obj_util_str))(sm1);
      //maint_obj_util.obj_template_desc = "test obj";  // 20200505
      maint_obj_util.obj_template_desc = obj_template_desc;
      maint_obj_util.new_code_bool     = new_code_bool;
      //console.log("20200522 clientZTICDomain in zt_client.js: "+clientZTICDomain);
      maint_obj_util.zticDom = clientZTICDomain;     //20200522

request(options, function (err, resp, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
 
 // console.log(' Body :', body);
 // console.log("response: ");

    sm1.setZtRawMessageAR(rm_AR);
    sm1.addResponseToZtRawMessageAR(body);


for(var i = 0; i < sm1.ZtRawMessageAR.length; i++){


  //console.log("Row: " +i+": "+ sm1.ZtRawMessageAR[i].index+"-"+sm1.ZtRawMessageAR[i].parent_index+"-"+sm1.ZtRawMessageAR[i].priority+"-"+sm1.ZtRawMessageAR[i].me_ztic+"-"+sm1.ZtRawMessageAR[i].me_code+"-"+sm1.ZtRawMessageAR[i].data);

   } // end of for

     var sm_parse = new (require('./zt_client_message_parse'))(sm1); 
         sm_parse.process();
    // console.log("listing parsed response OE values in maintain_object_submit");

 var respStr2 = ""; 
    respStr2 = maint_obj_util.getSubmitResponseHtml();


 res.send(respStr2);

});  // end of request 

});  //end of app.post for maintain_object_submit





app.post('/zt/process_record_format_message', function(req,res){


app.use(bodyParser.json({limit: '50mb'}));                         
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));   


     //console.log("running process_record_format_message on client side");
  

var rm_AR = [];  //raw message array  // 20211205

var resp_AR = [];
 var TargetNS;
 var receiver_ZTIC;

var DsRecFormatMessageAR;


 if ( req.body.length > 0 ){DsRecFormatMessageAR = req.body;
                        // console.log("DsRecFormatMessageAR from req.body ds2b00002_server_query.js");
                        }
       else
     {DsRecFormatMessageAR = JSON.parse(req.query.body);}




for (var i = 0; i < DsRecFormatMessageAR.length; i++) {
  if(DsRecFormatMessageAR[i].substring(0,5) == "RZTI "){
    receiver_ZTIC = DsRecFormatMessageAR[i].substring(5,10).toString().trim();
  }
}


for (var i = 0; i < DsRecFormatMessageAR.length; i++) {

  //console.log("DsRecFormatMessageAR[i]: "+DsRecFormatMessageAR[i]);
  if(DsRecFormatMessageAR[i].substring(0,5) == "ZTIC "){
    if(DsRecFormatMessageAR[i].substring(5,10).toString().trim() == receiver_ZTIC){
       TargetNS = DsRecFormatMessageAR[i].substring(10,90).toString().trim();
    }
  }

}
 

       


         clientZTICDomain.pushNamespace(TargetNS);
         var sessID = "123";
         
         var sess1 = new DsClientSession(sessID, clientZTICDomain);

         //get system parameters

         sess1.serverIP = process.env.ZT_SERVER_IP;    // 20230221
         for(var i = 0; i < sess1.DsSysParams_AR.length; i++){
           // console.log("sys params: "+ sess1.DsSysParams_AR[i].parameterName +" "+ sess1.DsSysParams_AR[i].seqNum+" "+sess1.DsSysParams_AR[i].value);
           if (sess1.DsSysParams_AR[i].parameterName.trim() == "serverIP"){
           //  sess1.serverIP     = sess1.DsSysParams_AR[i].value.toString().trim();   (del) 20230221
           //  console.log("sess1.serverIP: "+sess1.serverIP);                         (del) 20230221
           }
         }


    var cmb_str = './zt_client_message_builder';            
    var cmb = new (require(cmb_str))(DsRecFormatMessageAR, TargetNS); 

    var DsRawMessageArray = cmb.convertRecordFormatMsgToRaw();

    var dsmsg1     = new DsMessage(clientZTICDomain, DsRawMessageArray);
  
  
   var urlx = "http://"+sess1.serverIP+":5001/zt/process_message";



var request = require('request')
//console.log("20211207 sess1.serverIP: "+sess1.serverIP);
var urlx = "http://"+sess1.serverIP+":5001/zt/process_message";

var options = {
  method: 'post',

  body: dsmsg1.DsRawMessageArray,
  json: true, // Use,If you are sending JSON data

  url: urlx,

}

    var sm1_str = './zt_client_message';            
    var sm1 = new (require(sm1_str));                


request(options, function (err, resp, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  //console.log(' Body :', body)
  var body_AR = [];
  body_AR = body;


    sm1.setZtRawMessageAR(DsRawMessageArray);  // 20211217
    sm1.addResponseToZtRawMessageAR(body);
  


    //console.log("ZtRawMessageAR before client response parse: ");
 for(var i = 0; i < sm1.ZtRawMessageAR.length; i++){
  //console.log("Row: "+i+": "+ sm1.ZtRawMessageAR[i].index+"-"+sm1.ZtRawMessageAR[i].parent_index+"-"+sm1.ZtRawMessageAR[i].priority+"-"+sm1.ZtRawMessageAR[i].me_ztic+"-"+sm1.ZtRawMessageAR[i].me_code+"-"+sm1.ZtRawMessageAR[i].data);


   } // end of for
    
     var sm_parse = new (require('./zt_client_message_parse'))(sm1); 
         sm_parse.process();
    // console.log("listing parsed response OE values");






res.send(sm1);          // 20211205


});  // end of request   // 20211205

});   // end of app.post for process_record_format_message




app.post('/zt/client/app_page_display',function(req,res){



//console.log('executing app_page_display on client side');
  var TargetNS=req.body.TargetNS.trim();
  var language=req.body.language;
  var user_name=req.body.user_name.toString().trim();
  var user_password=req.body.user_password.toString().trim();
  var AppNS=req.body.AppNS.toString().trim();
  var app_code=req.body.app_code.toString().trim();
  var PageNS=req.body.InitPageNS.toString().trim();
  var page_code=req.body.init_page_code.toString().trim();
  




//console.log("20240916a TargetNS: "+TargetNS, " Language: "+language, " user_name: "+user_name, " user_password: "+user_password, " AppNS: "+AppNS, " app_code: "+app_code, " PageNS: "+PageNS, " page_code: "+page_code );  


         clientZTICDomain.pushNamespace(TargetNS);
         clientZTICDomain.pushNamespace(AppNS);                        // 20220606
         clientZTICDomain.pushNamespace(PageNS);                       // 20220606
        
         clientZTICDomain.pushNamespace("131131/21");
         clientZTICDomain.pushNamespace("zinfinitree.com/address");
         clientZTICDomain.pushNamespace("zinfinitree.com/document");  
         clientZTICDomain.pushNamespace("zinfinitree.com/spreadsheet");  
         clientZTICDomain.pushNamespace("zinfinitree.com/multimedia_object");  
         clientZTICDomain.pushNamespace("131131/22");           
         clientZTICDomain.pushNamespace("zinfinitree.com/storage");          
         clientZTICDomain.pushNamespace("zinfinitree.com/dev_agile");
         clientZTICDomain.pushNamespace("zinfinitree.com/app");               
         clientZTICDomain.pushNamespace("zinfinitree.com/workflow");          
         clientZTICDomain.pushNamespace("zinfinitree.com/messaging");          
         clientZTICDomain.pushNamespace("zinfinitree.com/map");                 

         clientZTICDomain.pushNamespace("zinfinitree.com/server_config");
         clientZTICDomain.pushNamespace("zinfinitree.com/address_app_data");

         clientZTICDomain.pushNamespace("zinfinitree.com/time_gregorian_2020s_tz_est");  
         clientZTICDomain.pushNamespace("zinfinitree.com/time_gregorian_millenium3");     
         clientZTICDomain.pushNamespace("zinfinitree.com/time");                          

         clientZTICDomain.pushNamespace("zinfinitree.com/legal_entity");                  
         clientZTICDomain.pushNamespace("zinfinitree.com/legal_entity_example");          

         var sessID = "123";
         
         var sess1 = new DsClientSession(clientZTICDomain, sessID);


         sess1.serverIP = process.env.ZT_SERVER_IP;    

         for(var i = 0; i < sess1.DsSysParams_AR.length; i++){
           // console.log("sys params: "+ sess1.DsSysParams_AR[i].parameterName +" "+ sess1.DsSysParams_AR[i].seqNum+" "+sess1.DsSysParams_AR[i].value);
           if (sess1.DsSysParams_AR[i].parameterName.trim() == "serverIP"){
            // console.log("sess1.serverIP: "+sess1.serverIP);                        (del) 20230221
           }
         }


  var zticDomfound = false;
  var zticDomIdx;
  var base_ztic = clientZTICDomain.getCodeForNamespace("131131/21");
  var server_config_ztic = clientZTICDomain.getCodeForNamespace("zinfinitree.com/server_config");

  var app_ztic  =  clientZTICDomain.getCodeForNamespace(AppNS);          // 20220606
  var page_ztic =  clientZTICDomain.getCodeForNamespace(PageNS);         // 20220606
  var app_def_ztic  =  clientZTICDomain.getCodeForNamespace("zinfinitree.com/app");  // 20220606


var rm_AR = [];  //raw message array
var next_index = 1; 
var next_index_str = next_index.toString().trim();

var lines = [];

for(var i = 0; i < clientZTICDomain.ZTICNS_AR.length; i++){
   lines.push("ZTIC "+clientZTICDomain.ZTICNS_AR[i].code.toString().trim().padEnd(5)+clientZTICDomain.ZTICNS_AR[i].namespace.toString().trim());
}  //endfor loop through ZTICNS

lines.push("RZTI "+clientZTICDomain.getCodeForNamespace(TargetNS));         //         receiver ztic
lines.push("MPPG 5179248000.000      id123               1234      1    usr1                "+server_config_ztic.padEnd(5)+"2    ");  //msg proc parameters gen'l
var line = "EXTK "+base_ztic.padEnd(5)+"2    "+base_ztic.padEnd(5)+language;
lines.push(line);



line = "QSET "+base_ztic.padEnd(5)+"2".padEnd(5)+"1    +    "+"ObjTmplQset";
lines.push(line);                                             //query set member
lines.push("QSLS 10   0    1    ");                                      //query selection set
lines.push("QOSS 1lev 1usg 1    ");  // 20240222  add usage type code  msg element 3124 

 // use obj template of app def  20220606
var app_def_templ_code = "1";
line = "QOBJ "+base_ztic.padEnd(5)+"2".padEnd(5)+app_def_ztic.padEnd(5)+app_def_templ_code.toString().trim().padEnd(5); 

lines.push(line);


if(app_code.toString().trim() != ""){
   line = "QSET "+app_def_ztic.padEnd(5)+app_def_templ_code.padEnd(5)+"1    +    "+"ObjectQset";

   lines.push(line);
   lines.push("QSLS 20   0    1    ");                               //query selection set
   lines.push("QOSS 1lev 1usg 1    ");  // 20240222  add usage type code  msg element 3124
   line = "QOBJ "+"12345"+"12345"+app_ztic.padEnd(5)+app_code.toString().trim().padEnd(5);
   lines.push(line);
} // endif obj_codex.toString().trim() != ""


var cmb_str = './zt_client_message_builder';            
var maint_modex = "display";   // 20220607
var cmb = new (require(cmb_str))(lines, TargetNS, maint_modex);   // 20210719 
rm_AR = cmb.convertRecordFormatMsgToRaw();


var dsmsg1     = new DsMessage(clientZTICDomain, rm_AR);

var request = require('request')

var urlx = "http://"+sess1.serverIP+":5001/zt/process_message";

var options = {
  method: 'post',
  body: dsmsg1.DsRawMessageArray,
  json: true, // Use,If you are sending JSON data
  url: urlx,

}

    var sm1_str = './zt_client_message';            
    var sm1 = new (require(sm1_str));                

   var app_sess_idx = "sess1abc";
    var app_sess = new (require('./zt_client_app'))(app_sess_idx, clientZTICDomain.ZTICNS_AR, app_ztic, app_code, TargetNS, language, user_name, AppNS );

     var app_sess_idx = app_AR.push(app_sess) -1;

   


   
    var respStr2 = ""; 


request(options, function (err, resp, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  //console.log(' Body :', body)

    sm1.setZtRawMessageAR(rm_AR);
    sm1.addResponseToZtRawMessageAR(body);

var respStr = "";  //20220607
  // console.log("ZtRawMessageAR before client response parse: ");
for(var i = 0; i < sm1.ZtRawMessageAR.length; i++){

  //console.log("Row: "+i+": "+ sm1.ZtRawMessageAR[i].index+"-"+sm1.ZtRawMessageAR[i].parent_index+"-"+sm1.ZtRawMessageAR[i].priority+"-"+sm1.ZtRawMessageAR[i].me_ztic+"-"+sm1.ZtRawMessageAR[i].me_code+"-"+sm1.ZtRawMessageAR[i].data);

   } // end of for
    
     var sm_parse = new (require('./zt_client_message_parse'))(sm1); 
         sm_parse.process();
   // console.log("= 20210109 listing parsed response OE values");
   // console.log("20200702 obj_codex: "+obj_codex);
      app_AR[app_sess_idx].setValuesFromInitialMessageForApp(sm1, app_ztic, app_code);




      respStr2 = app_AR[app_sess_idx].getHtmlForApp();
   

//console.log(" ");
//console.log("Parsed Response values");
//console.log(" ");

var loop_cntr = 0;
for(var h = 0; h < sm1.queryResponseSetMemberWA_AR.length; h++){


   //console.log("Query ID:  "+ sm1.queryResponseSetMemberWA_AR[h].setMemberID);
   for(var k = 0; k < sm1.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
 //      console.log("object_idx: "+ sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k]);

var i = sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c

 // console.log("Object: "+ sm1.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+sm1.queryResponseObjectWA_AR[i].objectKindCode+"-"+sm1.queryResponseObjectWA_AR[i].objectZTIC+"-"+sm1.queryResponseObjectWA_AR[i].objectCode);


     // var objx = sm1.queryResponseObjectWA_AR[i];                                   //(del) 20200126
     var objx = sm1.queryResponseObjectWA_AR[sm1.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126
     loop_cntr++;
var OEscreenElem_AR = []; 
respStr = respStr + "<table>";         // 20200127
const html_id_prfx = "val";
var   html_id_cntr = 1;
//console.log("Object Element values");
    //queryResponseObjectElementWA_AR = [];     
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
    // console.log("20200127 base_ztic: "+base_ztic);
   //  if(!(sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   //to suppress technical profile description
     if(!(sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12 ||  
          sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 31 ||
          sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 214 )){   // 20200127 temporary to suppress technical profile description
    
        var OEscreenElem = new OEscreenElemRec();    //20200125
        OEscreenElem.OE_ztic = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;
        OEscreenElem.OE_code = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;
        OEscreenElem.html_id = html_id_prfx + html_id_cntr.toString().trim();
        html_id_cntr++;
        OEscreenElem.html_label = sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        respStr = respStr + "<tr><td>"+ OEscreenElem.html_label+"</td><td> <input type=\"TEXT\" id='"+ OEscreenElem.html_id+ "' size=\"40\"></td></tr>";  

      }  // endif sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode != 12



  //console.log("   OE ZTIC/Code: Value:  "+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
//+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
//+sm1.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);


      }  // endfor loop through objx.objectElement_idx_AR  

     
//console.log("Type values");
          
    //queryResponseTypeWA_AR          = [];           

    for(var j = 0; j < objx.type_idx_AR.length; j++){
      //var objx = sm1.queryResponseObjectWA_AR[i];
 // console.log("   Type Def/Value ZTIC/Code:  "+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
//+sm1.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);


      }

//console.log("Links");

    for(var j = 0; j < objx.link_idx_AR.length; j++){
      //var objx = sm1.queryResponseObjectWA_AR[i];
 // console.log("   Link Type/Value:  "+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+sm1.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

      }

      //if(k > 10){break;}  // 20200125 temporary restriction (TO BE REMOVED)
    } // end loop through sm1.queryResponseSetMemberWA_AR[h].object_idx_AR using index k
      //if(h > 1){break;} //  // 20200125 temporary restriction (TO BE REMOVED)
}  // end of loop through queryResponseSetMemberWA_AR using  index h






respStr = respStr + "</table>";

respStr = respStr + "<br /> <br /><br /><input type=\"button\" id=\"submit\" value=\"Submit\"><br /><br /> <br /><br />";

respStr = respStr + "</html>";

res.send(respStr2);     
maintain_object_submit_html = respStr2;   //20200416

});  // end of request    




});  //end of app.post for app_page_display








function DsClientZTICDomain() {
   //this.tn_prfx = "";
   this.ZTICNS_AR = [];

} // end of function DsClientZTICDomain


DsClientZTICDomain.prototype.pushNamespace = function(namespacex) {

        var lastCodeUsed = 0;
        var alreadyAdded = false;
        for(var i = 0; i < this.ZTICNS_AR.length; i++){
              if(this.ZTICNS_AR[i].code > lastCodeUsed){lastCodeUsed = this.ZTICNS_AR[i].code}; 
              if(this.ZTICNS_AR[i].namespace == namespacex) {alreadyAdded = true};
                
        }
        if(!alreadyAdded){
           lastCodeUsed++
           var ns =  new ZTICNS(lastCodeUsed, namespacex);
           this.ZTICNS_AR.push(ns);
        
        }
       return lastCodeUsed.toString().trim();

     }


DsClientZTICDomain.prototype.getCodeForNamespace = function(namespacex) {
      var returnCode = null;
      var found = false;
      for(var i = 0; i < this.ZTICNS_AR.length; i++){
      
          if(namespacex.trim() == this.ZTICNS_AR[i].namespace.trim()) {returnCode = this.ZTICNS_AR[i].code; found = true};
      
      }
      if(!found){

        returnCode = this.pushNamespace(namespacex);
      }

     return returnCode.toString().trim();
}

DsClientZTICDomain.prototype.getNamespaceForCode = function(codex) {
      var returnNamespace = null;
      for(var i = 0; i < this.ZTICNS_AR.length; i++){
      
          if(codex.toString().trim() == this.ZTICNS_AR[i].code.toString().trim()) {returnNamespace = this.ZTICNS_AR[i].namespace.toString().trim();};
      
      }
     return returnNamespace;
}


function ZTICNS(code, namespace) {
   this.code = code;
   this.namespace = namespace;
} // end of function ZTICNS






function DsClientSession(zticDomx, sessID){
    this.zticDom  = zticDomx;
    this.sessID = sessID;
    this.serverIP = "";
    this.DsSysParams_AR = [];
    this.topTemplateId = "";
    //this.tmpl_AR      = [];
    //this.tmpl_AR.push(top_template);
    this.object_AR        = [];
    
 //   this.techProfile = [];

} //  end of function DsClientSession

DsClientSession.prototype.getTemplateValues = function() { 
  //console.log("getting template values");
     
 


  
} // end of DsClientSession.prototype.getTemplateValues 


DsClientSession.prototype.readSystemParametersFromFile = function() {
 // console.log("Reading system parameters from sys_params_client.txt file: ")


  var dirnamex = __dirname + "/sys_params_client.txt";              // 20230217
  //var   fileContents = fs.readFileSync("sys_params_client.txt");  (del) 20230215
  var   fileContents = fs.readFileSync(dirnamex);
  var lines = fileContents.toString().split('\n');  //(del) 20230215
  
for (var i = 0; i < lines.length; i++) {
   //this.DsLineArray.push(lines[i].toString());
   sysParamsRow = new DsSysParamsRow(lines[i].substring(0,25),lines[i].substring(25,30),lines[i].substring(30) );
   this.DsSysParams_AR.push(sysParamsRow);
}

}  // end of DsClientSession.readSystemParametersFromFile()


function DsSysParamsRow(param_name, seq_num, value){
    this.parameterName = param_name;
    this.seqNum        = seq_num;
    this.value         = value;

} // end of function DsSysParamsRow

DsClientSession.prototype.getTechProfilesCallback = function(err, result, sess) { 
  //console.log("getting tech profiles call back, result.length: "+ result.length);
  
            for (var j = 0; j < result.length; j++){
               if (parseInt(result[j].te_2_6) == 1) {  }
              // if (parseInt(result[j].te_2_6) == 2) {
                   var DsOEValue_WArec = new DsObjectElementValue();
                   //console.log("result:"+result);
                   DsOEValue_WArec.te_2_7 = result[j].te_2_7;    //7  --Std Table Element DS Instance Code
                   DsOEValue_WArec.te_2_8 = result[j].te_2_8;    //8  --Std Table Element Code
                   DsOEValue_WArec.te_2_9 = result[j].te_2_9;    //9  --Ext.Key Extended Key Definition ZTIC
                   DsOEValue_WArec.te_2_10 = result[j].te_2_10;  //10 --Ext.Key Extended Key Definition Code
                   DsOEValue_WArec.te_2_11 = result[j].te_2_11;  //11 --Ext.Key Extended Key Value ZTIC
                   DsOEValue_WArec.te_2_12 = result[j].te_2_12;  //12 --Ext.Key Extended Key Value Code
                   DsOEValue_WArec.te_2_25 = result[j].te_2_25;  //25 --All Status
                   DsOEValue_WArec.te_2_26 = result[j].te_2_26;  //26 --All Timestamp--Effective
                   DsOEValue_WArec.te_2_27 = result[j].te_2_27;  //27 --All Sequence number
                   DsOEValue_WArec.te_2_31 = result[j].te_2_31;  //31 --Std Table Element Value
                   sess.tmpl_AR[0].obj.objElement.push(DsOEValue_WArec);          
               //  }  //endif te_2_6) == 2
               if (parseInt(result[j].te_2_6) == 3) {  }
               if (parseInt(result[j].te_2_6) == 4) {

                  var linkedObj = new DsObject(sess.tmpl_AR[0].obj.tn_prfx, result[j].te_2_19, result[j].te_2_20, result[j].te_2_21, result[j].te_2_22);
                  //console.log("adding linked obj: "+sess.tmpl_AR[0].obj.tn_prfx+ result[j].te_2_19+ result[j].te_2_20+ result[j].te_2_21+ result[j].te_2_22);
                  var tmpl = new DsTemplate(linkedObj);
                  sess.tmpl_AR.push(tmpl);
                 }  //endif te_2_6 == 4 --links
               if (parseInt(result[j].te_2_6) == 5) {  }
      
             // console.log("TechProfile result:"+result[j].te_2_31);
                       
           }  //endfor result
           
          // console.log("session template values: ");
          for (var i = 0; i < sess.tmpl_AR.length; i++){
              //    console.log("objElement length: "+ sess.tmpl_AR[i].obj.objElement.length);
                  for (var j = 0; j < sess.tmpl_AR[i].obj.objElement.length; j++){
              //       console.log("sess val: "+sess.tmpl_AR[i].obj.objElement[j].te_2_31+" - "+ sess.tmpl_AR[i].obj.objElement[j].te_2_7+" - "+sess.tmpl_AR[i].obj.objElement[j].te_2_8);
               }  // end loop through objElement
          } // end loop through sess.Template 
          
                    
          for (var i = 0; i < sess.tmpl_AR.length; i++){
             if(sess.tmpl_AR[i].obj.isPopulated == false) {
                  sess.tmpl_AR[i].obj.isPopulated = true;
                  sess.tmpl_AR[i].obj.getValues(sess);
             } //endif sess.template_Array[i].isPopulated == false
          
          }  // end loop through sess.template_Array 
  
} // end of DsClientSession.prototype.getTechProfilesCallback






function DsClientObjectId(kindZTIC, kindCode, objectZTIC, objectCode){
    this.kindZTIC = kindZTIC.trim();
    this.kindCode = kindCode.trim();
    this.objZTIC  = objectZTIC.trim();
    this.objCode  = objectCode.trim();
    this.keyString   = kindZTIC.trim()+"_"+kindCode.trim()+"_"+objectZTIC.trim()+"_"+objectCode.trim();;
}// end of function DsClientObjectId



function DsMessageFile(nsx, filenamex) {
    this.targetNS = nsx;
    this.filename = filenamex;
    this.DsRawMessageArray = [];
} // end of function DsMessageFile


DsMessageFile.prototype.readRawMsgFromFile = function(file_directoryx) {
  //console.log("Reading raw message from file: "+ this.filename);
  const file_path = __dirname + "/file_import"+file_directoryx+"/"+this.filename;  // 20240229
  var   fileContents = fs.readFileSync(file_path);                // 20240229
 // var   fileContents = fs.readFileSync(this.filename);          // (del) 20240229
  var lines = fileContents.toString().split('\n');
  msgRow = new MessageRow("dummy", "dummy","dummy","dummy","dummy","dummy");
     this.DsRawMessageArray.push(msgRow);
for (var i = 0; i < lines.length; i++) {
   msgRow = new MessageRow(lines[i].substring(0,6),lines[i].substring(6,12),lines[i].substring(12,16),lines[i].substring(16,21),lines[i].substring(21,26),lines[i].substring(26) );
   this.DsRawMessageArray.push(msgRow);
}

}  // end of readRawMsgFromFile() 


DsMessageFile.prototype.readRecordFormatMsgFromFile = function(TargetNS, file_directoryx) {

   var HashMap = require('hashmap');
   var objectValue_AR = [];
   var objectValue_HM = new HashMap();

   var objElement_AR  = [];
   
   var typeValue_AR   = [];
   var link_AR        = [];
   var TabNamePrfx = 'TEST1';
   var objectKindZTIC = "";
   var objectKindCode = "";
   var objectZTIC     = "";
   var objectCode     = "";
   var OE_ztic        = "";
   var OE_code        = "";
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

  //console.log("Reading Record Format message from file: "+ this.filename);

   const dirnamex = __dirname + "/file_import"+file_directoryx+"/"+this.filename;  // 20240229
  //var dirnamex = __dirname + "/" + this.filename;                              // (del) 20240229

  //var   fileContents = fs.readFileSync(this.filename); // (del) 20230217
  var   fileContents = fs.readFileSync(dirnamex);  // 20230217

  var lines = fileContents.toString().split('\n');



    var cmb_str = './zt_client_message_builder';           
    var cmb = new (require(cmb_str))(lines, TargetNS); 

    this.DsRawMessageArray = cmb.convertRecordFormatMsgToRaw();


} // end of readRecordFormatMsgFromFile()





DsMessageFile.prototype.addHeader_ForRecordFormatMsg = function(rm_AR) {
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

} //

DsMessageFile.prototype.addZTIC_ForRecordFormatMsg = function(rm_AR, line, parent_index) {
var ztic = line.substring(5,10).toString().trim();
var namespace = line.substring(10,90).toString().trim();
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var msgRow9 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","210","" ); rm_AR.push(msgRow9); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index - 1;
var msgRow10 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2100",ztic ); rm_AR.push(msgRow10); next_index++; next_index_str = next_index.toString().trim();
var msgRow11 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","2101",namespace ); rm_AR.push(msgRow11); next_index++; next_index_str = next_index.toString().trim();


} // end of addZTIC_ForRecordFormatMsg



DsMessageFile.prototype.addRZTI_ForRecordFormatMsg = function(rm_AR, line) {
var receiver_ztic = line.substring(5,10).toString().trim();
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var parent_index = 2;
var msgRow9 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","22","" ); rm_AR.push(msgRow9); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index - 1;
var msgRow10 = new MessageRow(next_index_str,parent_index.toString().trim(),"0001","2","223",receiver_ztic ); rm_AR.push(msgRow10); 

} // end of addRZTI_ForRecordFormatMsg







DsMessageFile.prototype.addMaintainSet_ForRecordFormatMsg = function(rm_AR,line) {
var maintain_set_id = line.substring(5,25).toString().trim();
var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var parent_index = 1;
var parent_index_str = parent_index.toString().trim();
var msgRow1 = new MessageRow(next_index_str,parent_index_str,"0001","2","3","" ); rm_AR.push(msgRow1); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index -1; parent_index_str = parent_index.toString().trim();
var msgRow2 = new MessageRow(next_index_str,parent_index_str,"0001","2","30","" ); rm_AR.push(msgRow2); next_index++; next_index_str = 
next_index.toString().trim();
parent_index++; parent_index_str = parent_index.toString().trim();
var msgRow3 = new MessageRow(next_index_str,parent_index_str,"0001","2","300","" ); rm_AR.push(msgRow3); next_index++; next_index_str = next_index.toString().trim();
parent_index++; parent_index_str = parent_index.toString().trim();
var msgRow4 = new MessageRow(next_index_str,parent_index_str,"0001","2","3000",maintain_set_id); rm_AR.push(msgRow4); next_index++; next_index_str = next_index.toString().trim();
var msgRow5 = new MessageRow(next_index_str,parent_index_str,"0001","2","3001","" ); rm_AR.push(msgRow5); next_index++; next_index_str = next_index.toString().trim();
var msgRow6 = new MessageRow(next_index_str,parent_index_str,"0001","2","3002","" ); rm_AR.push(msgRow6); next_index++; next_index_str = next_index.toString().trim();
var msgRow7 = new MessageRow(next_index_str,parent_index_str,"0001","2","3003","" ); rm_AR.push(msgRow7); next_index++; next_index_str = next_index.toString().trim();
var msgRow8 = new MessageRow(next_index_str,parent_index_str,"0001","2","3008","" ); rm_AR.push(msgRow8); next_index++; next_index_str = next_index.toString().trim();
var msgRow9 = new MessageRow(next_index_str,parent_index_str,"0001","2","3030","" ); rm_AR.push(msgRow9); next_index++; next_index_str = next_index.toString().trim();

} //


DsMessageFile.prototype.addObject_ForRecordFormatMsg = function(rm_AR, objectValuex, parent_index_imp) {

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
var msgRow9 = new MessageRow(next_index_str,parent_index_str,"0001","2","3036","" ); rm_AR.push(msgRow9); next_index++; next_index_str = next_index.toString().trim();

return set_parent;
} // end of addObject_ForRecordFormatMsg


DsMessageFile.prototype.addObjElem_ForRecordFormatMsg = function(rm_AR, OE_ztic, OE_code, value, set_parent, obj_elem_set_index, indx) {



var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var parent_index_str = "";
if(indx == 0){
  var msgRow3 = new MessageRow(next_index_str,set_parent.toString().trim(),"0001","2","3040","" ); rm_AR.push(msgRow3); next_index++; next_index_str =   next_index.toString().trim();
   }
parent_index = obj_elem_set_index; parent_index_str = parent_index.toString().trim();
var msgRow4 = new MessageRow(next_index_str,parent_index_str,"0001","2","3041",""); rm_AR.push(msgRow4); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index -1; parent_index_str = parent_index.toString().trim();
var msgRow5 = new MessageRow(next_index_str,parent_index_str,"0001","2","3042",OE_ztic); rm_AR.push(msgRow5); next_index++; next_index_str = next_index.toString().trim();
var msgRow6 = new MessageRow(next_index_str,parent_index_str,"0001","2","3043",OE_code); rm_AR.push(msgRow6); next_index++; next_index_str = next_index.toString().trim();
var msgRow7 = new MessageRow(next_index_str,parent_index_str,"0001","2","3044",value); rm_AR.push(msgRow7); next_index++; next_index_str = next_index.toString().trim();


} // end of addObjElem_ForRecordFormatMsg


DsMessageFile.prototype.addType_ForRecordFormatMsg = function(rm_AR, typeValRecx, set_parent, type_set_index, indx) {

var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var parent_index_str = "";

if(indx == 0){
  var msgRow3 = new MessageRow(next_index_str,set_parent.toString().trim(),"0001","2","3050","" ); rm_AR.push(msgRow3); next_index++; next_index_str =   next_index.toString().trim();
   }
parent_index = type_set_index; parent_index_str = parent_index.toString().trim();
var msgRow4 = new MessageRow(next_index_str,parent_index_str,"0001","2","3051",""); rm_AR.push(msgRow4); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index -1; parent_index_str = parent_index.toString().trim();
var msgRow5 = new MessageRow(next_index_str,parent_index_str,"0001","2","3052",typeValRecx.typeDef_ztic); rm_AR.push(msgRow5); next_index++; next_index_str = next_index.toString().trim();
var msgRow6 = new MessageRow(next_index_str,parent_index_str,"0001","2","3053",typeValRecx.typeDef_code); rm_AR.push(msgRow6); next_index++; next_index_str = next_index.toString().trim();
var msgRow7 = new MessageRow(next_index_str,parent_index_str,"0001","2","3054",typeValRecx.typeValue_ztic); rm_AR.push(msgRow7); next_index++; next_index_str = next_index.toString().trim();
var msgRow8 = new MessageRow(next_index_str,parent_index_str,"0001","2","3055",typeValRecx.typeValue_code); rm_AR.push(msgRow8); next_index++; next_index_str = next_index.toString().trim();


} // end of addType_ForRecordFormatMsg()


DsMessageFile.prototype.addLink_ForRecordFormatMsg = function(rm_AR, linkValRecx, set_parent, link_set_index, indx) {

var next_index = rm_AR.length;
var next_index_str = next_index.toString().trim();
var parent_index_str = "";

if(indx == 0){
  var msgRow3 = new MessageRow(next_index_str,set_parent.toString().trim(),"0001","2","3060","" ); rm_AR.push(msgRow3); next_index++; next_index_str =   next_index.toString().trim();
   }

         
parent_index = link_set_index; parent_index_str = parent_index.toString().trim();
var msgRow4 = new MessageRow(next_index_str,parent_index_str,"0001","2","3061",""); rm_AR.push(msgRow4); next_index++; next_index_str = next_index.toString().trim();
parent_index = next_index -1; parent_index_str = parent_index.toString().trim();
var msgRow5 = new MessageRow(next_index_str,parent_index_str,"0001","2","3062",linkValRecx.linkType_ztic); rm_AR.push(msgRow5); next_index++; next_index_str = next_index.toString().trim();
var msgRow6 = new MessageRow(next_index_str,parent_index_str,"0001","2","3063",linkValRecx.linkType_code); rm_AR.push(msgRow6); next_index++; next_index_str = next_index.toString().trim();
var msgRow7 = new MessageRow(next_index_str,parent_index_str,"0001","2","3064",linkValRecx.linkToKind_ztic); rm_AR.push(msgRow7); next_index++; next_index_str = next_index.toString().trim();
var msgRow8 = new MessageRow(next_index_str,parent_index_str,"0001","2","3065",linkValRecx.linkToKind_code); rm_AR.push(msgRow8); next_index++; next_index_str = next_index.toString().trim();
var msgRow9 = new MessageRow(next_index_str,parent_index_str,"0001","2","3066",linkValRecx.linkToCode_ztic); rm_AR.push(msgRow9); next_index++; next_index_str = next_index.toString().trim();
var msgRow10 = new MessageRow(next_index_str,parent_index_str,"0001","2","3067",linkValRecx.linkToCode); rm_AR.push(msgRow10); next_index++; next_index_str = next_index.toString().trim();


} // end of addLink_ForRecordFormatMsg()


DsMessageFile.prototype.addTemplate_ForRecordFormatMsg = function(rm_AR, templateValRecx, parent_index_imp) {

} // end of addTemplate_ForRecordFormatMsg()




function ObjectValueUpdateWorkAreaRec(tn_prfx, kindZTIC, kindCode, objZTIC, objCode)  {
    this.tn_prfx  = tn_prfx;
    this.kindZTIC = kindZTIC.trim();
    this.kindCode = kindCode.trim();
    this.objZTIC  = objZTIC.trim();
    this.objCode  = objCode.trim();
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

   this.OE_ztic      = OE_ztic;
   this.OE_code      = OE_code;

   this.value           = value;
 
} // end of function DsObjectElementValueForRecordFormat


function DsObjectTypeValueForRecordFormat(objectKey, typeDef_ztic, typeDef_code, typeValue_ztic, typeValue_code) {
   this.objectKey = objectKey;
   this.typeDef_ztic = typeDef_ztic;
   this.typeDef_code = typeDef_code;
   this.typeValue_ztic = typeValue_ztic;
   this.typeValue_code = typeValue_code;


}  // end of function DsObjectTypeValue



function DsObjectLinkForRecordFormat(objectKey, linkType_ztic, linkType_code, linkToKind_ztic, linkToKind_code, linkToCode_ztic, linkToCode, linkValue) {
   this.objectKey = objectKey;
   this.linkType_ztic = linkType_ztic;
   this.linkType_code = linkType_code;
   this.linkToKind_ztic    = linkToKind_ztic;
   this.linkToKind_code    = linkToKind_code;
   this.linkToCode_ztic    = linkToCode_ztic;
   this.linkToCode         = linkToCode;
   this.linkValue          = linkValue;


}  // end of function DsObjectLinks



function DsObjectTemplateForRecordFormat(objectKey, templ_ztic, templ_code) {

    this.objectKey = objectKey;
    this.templ_ztic = templ_ztic;
    this.templ_code = templ_code;


} // end of DsObjectTemplate
  
function OEscreenElemRec(){                //20200125
     OE_ztic   = "";
     OE_code   = "";
     html_id   = "";
     html_label = "";
     html_input_val = "";
     max_length     = "";           //20200514

}  // end of OEscreenElemRec


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
    this.DsLineArray = [];
    this.DsRawMessageArray = [];
    this.DsRawMessageArray = dsrawMsgArrayx;
    this.DsMessageArray = [];
    this.ZTIC_Array     = [];
    this.OEupdateWA_Array = [];
    this.ObjectTemplateWA_Array = [];
    this.TypeValueUpdateWA_Array = [];
    this.LinkUpdateWA_Array = [];
    this.objectTemplateWA_Array = [];
    this.UpdateArray = [];
  }


function DsClientCallToServer(urlx, rawMsg_ARx){
    this.url  = urlx;
    this.rawMsg_AR = rawMsg_ARx;
    
} //  end of function DsClientCallToSever

DsClientCallToServer.prototype.processMessage = function() { 
  //console.log("executing DsClientCallToServer.processMessage");
var request = require('request')

var urlx = this.url;

var options = {
  method: 'post',
  body: this.rawMsg_AR,
  json: true, // Use,If you are sending JSON data
  url: urlx,

}
request(options, function (err, res, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  //console.log(' Body :', body)  (del) 20200103

});


       
} // end of DsClientCallToServer.prototype.processMessage



