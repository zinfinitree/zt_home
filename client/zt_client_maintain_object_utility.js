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


class ZtMaintainObjectUtility {



    constructor(msgx, obj_kind_zticx, obj_kind_codex, obj_zticx, obj_codex, languagex, ZTICNS_ARx, sessionx) {
      this.msg = msgx;
      this.obj_template_desc = "";
      this.obj_template_ztic = "";   
      this.obj_template_code = "";   

      this.t2_obj_template_desc = "";   
      this.t2_obj_template_ztic = "";  
      this.t2_obj_template_code = "";   


      this.obj_ztic          = obj_zticx;         
      this.obj_code          = obj_codex;        
      this.obj_kind_ztic     = obj_kind_zticx;   
      this.obj_kind_code     = obj_kind_codex;   
      this.new_code_boole    = "";   
      this.language          = languagex
      this.ZTICNS_AR         = ZTICNS_ARx;   
      this.linkableObjectLinkType_AR = [];
      this.session = sessionx;
 
  }



     getHtml() {



     for(var j = 0; j < this.session.template_AR.length; j++){
    //  console.log("   this.session.template_AR[j].id: " + this.session.template_AR[j].id);
     } // endfor   
 


var html_str = "";
var OEscreenElem_AR = [];
var obj_template_desc = ""; 

 
 
 html_str =  "<!DOCTYPE html><html><head>";                                   
 html_str = html_str + "<title>DS2 Maintain Object xx</title>";
 html_str = html_str + "<script src='//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js\'>  </script>";
 html_str = html_str + "<script>  $(document).ready(function(){";


 var OEscrnElem_AR = this.getOEscreenElem_AR();
 var T2_OEscrnElem_AR = this.T2_getOEscreenElem_AR();   //type 2 responseType for related templates
 //console.log("20200129 OEscrnElem_AR.length: "+OEscrnElem_AR.length);

 for(var i = 0; i < OEscrnElem_AR.length; i++){
    html_str = html_str +  "var "+ OEscrnElem_AR[i].html_id + "; ";
 } // endfor loop through OEscrnElem_AR
 //html_str = html_str + "} ";   (del) 20200130
 html_str = html_str + "var OEscrnElem_AR = []; ";

 //html_str = html_str + "var OT_ztic = " + this.obj_template_ztic.toString().trim()  + "; ";   // 20200430
 //html_str = html_str + "var OT_code = " + this.obj_template_code.toString().trim()  + "; ";   // 20200430
 html_str = html_str + "var OK_ztic = " + this.obj_kind_ztic.toString().trim()      + "; ";   // 20200430
 html_str = html_str + "var OK_code = " + this.obj_kind_code.toString().trim()      + "; ";   // 20200430
 html_str = html_str + "var obj_ztic = " + this.obj_ztic.toString().trim()      + "; ";   // 20200503
 html_str = html_str + "var obj_template_desc = '" + this.obj_template_desc.toString().trim()      + "'; ";   // 20200505
 html_str = html_str + "var language = " + this.language.toString().trim()      + "; ";   // 20200506

 if(this.obj_code.toString().trim() == ""){
  html_str = html_str + "var obj_code = '' ; ";   // 20200502
  }
  else {
 html_str = html_str + "var obj_code = " + this.obj_code.toString().trim()      + "; ";   // 20200502
  }


 html_str = html_str + " $(\"#submit\").click(function(){";

  for(var i = 0; i < OEscrnElem_AR.length; i++){
    var html_id_val_fld     = OEscrnElem_AR[i].html_id;
   html_str = html_str +  html_id_val_fld + "=$('#" + html_id_val_fld  + "').val(); ";
 } // endfor loop through OEscrnElem_AR

  html_str = html_str + "function OEscreenElemRec(){";
  html_str = html_str + "  OE_ztic   = \" \" ;";
  html_str = html_str + "  OE_code  = \" \"  ;";
  html_str = html_str + "  OE_max_length  = \" \"  ;";
  html_str = html_str + "  html_id  = \" \"  ;";
  html_str = html_str + "  html_label = \" \" ;";
  html_str = html_str + "  html_input_val = \" \";";
  html_str = html_str + "}";  // end of OEscreenElemRec
  
  html_str = html_str + "var OEscrnElem; ";
  for(var i = 0; i < OEscrnElem_AR.length; i++){
     html_str = html_str + "OEscrnElem = new  OEscreenElemRec(); ";
     html_str = html_str + "OEscrnElem.OE_ztic = '" + OEscrnElem_AR[i].OE_ztic.toString().trim() + "'; ";
     html_str = html_str + "OEscrnElem.OE_code = '" + OEscrnElem_AR[i].OE_code.toString().trim() + "'; ";
     html_str = html_str + "OEscrnElem.OE_max_length = '" + OEscrnElem_AR[i].OE_max_length.toString().trim() + "'; ";   //20200515
     html_str = html_str + "OEscrnElem.html_id = '" + OEscrnElem_AR[i].html_id.toString().trim() + "'; ";
     html_str = html_str + "OEscrnElem.html_label = '" + OEscrnElem_AR[i].html_label.toString().trim() + "'; ";
     html_str = html_str + "OEscrnElem.html_input_val = '" + OEscrnElem_AR[i].html_input_val.toString().trim() + "'; ";  //20200407
     //html_str = html_str + "OEscrnElem.html_input_val = " + OEscrnElem_AR[i].html_id.toString().trim() + "; ";    //20200414
     html_str = html_str + "OEscrnElem_AR.push(OEscrnElem); ";
  } // endfor loop through OEscrnElem_AR
 


   html_str = html_str + "for(var i = 0; i < OEscrnElem_AR.length; i++){";
   for(var i = 0; i < OEscrnElem_AR.length; i++){
     html_str = html_str + "if(OEscrnElem_AR[i].html_id=='"+OEscrnElem_AR[i].html_id + "'){";
     html_str = html_str + "OEscrnElem_AR[i].html_input_val="+OEscrnElem_AR[i].html_id+"; ";  //(del) 20200407
     //html_str = html_str + "OEscrnElem_AR[i].html_input_val="+OEscrnElem_AR[i].html_input_val+"; ";  //20200407
     html_str = html_str + "} ";
 } // endfor loop through OEscrnElem_AR
 html_str = html_str + "} ";



  require("dotenv").config();   
  const clientIP = process.env.ZT_CLIENT_IP;
  const clientPort = process.env.ZT_CLIENT_PORT;
  //const urlxx = "http://"+clientIP+":"+clientPort+"/zt/client/maintain_object_submit";  (del) 20250408
  //const urlxx = clientIP+":"+clientPort+"/zt/client/maintain_object_submit";  // (del) 20250408
  const urlxx = clientIP+"/zt/client/maintain_object_submit";                   // 20250408

 html_str = html_str + "var OEscrnElem_ARs = JSON.stringify(OEscrnElem_AR); ";
// html_str = html_str + "var jqxhr = $.post('http://localhost:3000/zt/client/maintain_object_submit',{OK_ztic: OK_ztic, OK_code: OK_code, obj_ztic: obj_ztic, obj_code: obj_code, OEscrnElem_AR: OEscrnElem_ARs, obj_template_desc: obj_template_desc, language: language }, function(data){";  // del 20240827
html_str = html_str + "var jqxhr = $.post('"+urlxx+"',{OK_ztic: OK_ztic, OK_code: OK_code, obj_ztic: obj_ztic, obj_code: obj_code, OEscrnElem_AR: OEscrnElem_ARs, obj_template_desc: obj_template_desc, language: language }, function(data){";
// html_str = html_str + "var jqxhr = $.post('http://localhost:3000/zt/client/maintain_object_submit',{OEscrnElem_AR: OEscrnElem_ARs }, function(data){";

 html_str = html_str + "console.log(data); ";
       //open a new window note:this is a popup so it may be blocked by your browser
 //html_str = html_str + "var newWindow = window.open('', 'new window', width=200, height=100);";
 html_str = html_str + "var newWindow = window.open('', '_self');";
       //write the data to the document of the newWindow
 html_str = html_str +  "newWindow.document.write(data);";
  //alert( "success" );
 html_str = html_str + "}) ";



 html_str = html_str +       "}); ";
 html_str = html_str +     "}); ";
 html_str = html_str +   "</script>";
 html_str = html_str + "</head>";

 html_str = html_str + "<body>";
 //html_str = html_str +   "<h1>"+this.obj_template_desc+ "DS2 Maintain Object yyy</h1>";  
  html_str = html_str +   "<h1>"+this.obj_template_desc +"</h1>";
 html_str = html_str +   "<br />";

 html_str = html_str + "<table>"
// console.log("%%^ 20211120 OEscrnElem_AR.length: "+OEscrnElem_AR.length);
 for(var i = 0; i < OEscrnElem_AR.length; i++){
//  console.log("%%^ 20211120 OEscrnElem_AR[i].OE_max_length: "+OEscrnElem_AR[i].OE_max_length);
  //(del) 20200515  html_str = html_str + "<tr><td>"+ OEscrnElem_AR[i].html_label+"</td><td> <input type=\"TEXT\" id='"+ OEscrnElem_AR[i].html_id+ "' size=\"40\" value='"+ OEscrnElem_AR[i].html_input_val+"'" +"></td></tr>"; 
if(OEscrnElem_AR[i].OE_max_length < 80){
html_str = html_str + "<tr><td>"+ OEscrnElem_AR[i].html_label+"</td><td> <input type=\"TEXT\" id='"+ OEscrnElem_AR[i].html_id+ "' size='"+OEscrnElem_AR[i].OE_max_length+"' value='"+ OEscrnElem_AR[i].html_input_val+"'" +"></td></tr>";}
   else{
//html_str = html_str + "<tr><td>"+ OEscrnElem_AR[i].html_label+"</td><td> <input type=\"TEXTAREA\"  id='"+ OEscrnElem_AR[i].html_id+ "' size='"+OEscrnElem_AR[i].OE_max_length+"' value='"+ OEscrnElem_AR[i].html_input_val+"'" +"></td></tr>"; 
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>   </td></tr>";
html_str = html_str + "<tr><td>"+OEscrnElem_AR[i].html_label+"</td></tr>";

html_str = html_str + "<tr><td><textarea name=\"comments\" id='"+ OEscrnElem_AR[i].html_id+ "' cols='60' rows='20'  value='"+ OEscrnElem_AR[i].html_input_val+"'" +">"+OEscrnElem_AR[i].html_input_val+"</textarea></td></tr>";

//<textarea name="comments" id="myTextarea" cols="40" rows="6">Suppose we have this text!</textarea>  (example)

}  // endif  
  
  

 } // endfor loop through OEscrnElem_AR


 html_str = html_str + "</table>"

 html_str = html_str + this.getLinkableObjectHtml(T2_OEscrnElem_AR, "linkType_AR");    // 20200528


  html_str = html_str + "<br /> <br /><br /><input type='button' id='submit' value='Submit'><br /><br /> <br /><br />";

 html_str = html_str + "</body>";


html_str = html_str + "</html>";

 
return html_str;
}  // end of getHtml()


getLinkableObjectHtml(T2_OEscrnElem_ARx, linkType_ARx){    // 20200528
var retHtml = "";
retHtml = retHtml + "<p>Linkable Objects</p>";




return retHtml;

}  //end of getLinkableObjectHtml(T2_OEscrnElem_AR, linkType_AR)

getSubmitResponseHtml(){
//console.log("running getSubmitResponseHtml method");

var html_str = "";

 html_str =  "<!DOCTYPE html><html><head>";                                   
 html_str = html_str + "<title>DS2 Maintain Submit Response</title>";


 html_str = html_str + "</head>";

 html_str = html_str + "<body>";
 //html_str = html_str +   "<h1>DS2 Maintain Object--Object Created</h1>";
 if(this.new_code_bool == "+"){
     html_str = html_str +   "<h1>"+this.obj_template_desc+" Created</h1>";
     }   //20200505
   else {
     html_str = html_str +   "<h1>"+this.obj_template_desc+" Updated</h1>";
 }
 html_str = html_str +   "<br />";
 html_str = html_str + "<table>"

 for(var i = 0; i < this.msg.maintainResponseObjectWA_AR.length; i++){
  
    html_str = html_str + "<tr><td>"+ this.msg.maintainResponseObjectWA_AR[i].objectCodeAssigned +"</td></tr>"; 

 } // endfor loop through this.msg.maintainResponseObjectWA_AR


 html_str = html_str + "</table>";

 
 html_str = html_str +   "<br />";
 html_str = html_str + "<table>"
 //console.log("20240212a this.msg.serverLogSystemMessageWA_AR.length: "+this.msg.serverLogSystemMessageWA_AR.length);
 this.msg.serverLogSystemMessageWA_AR.forEach(serverLogSystemMessageWA => {
  html_str = html_str + "<tr><td>"+ serverLogSystemMessageWA.ztic +"</td></tr>";
  html_str = html_str + "<tr><td>"+ serverLogSystemMessageWA.code +"</td></tr>";
  html_str = html_str + "<tr><td>"+ serverLogSystemMessageWA.shortSystemMessage +"</td></tr>";
  html_str = html_str + "<tr><td>"+ serverLogSystemMessageWA.longSystemMessage +"</td></tr>";
 });
 
 html_str = html_str + "</table>";



 html_str = html_str + "</body>";
 html_str = html_str + "</html>";
 return html_str;
}  // end of getSubmitResponseHtml()




getOEscreenElem_AR(){

//console.log("20200129 running getOEscreenElem_AR()");
//console.log("20200522 this.msg.zticDom: "+this.msg.zticDom);
var OEscreenElem_AR = [];
var DEvalue_AR      = [];



var base_ztic;
for(var i = 0; i < this.ZTICNS_AR.length; i++){
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor

//console.log("20200129 this.msg.queryResponseSetMemberWA_AR.length: "+this.msg.queryResponseSetMemberWA_AR.length);

//start of loop at template values
for(var h = 0; h < this.msg.queryResponseSetMemberWA_AR.length; h++){
 if(this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQset"){ //temp (del) 20200407

  var templ_ztic = this.msg.queryResponseSetMemberWA_AR[h].objectTemplateZTIC;   
  var templ_code = this.msg.queryResponseSetMemberWA_AR[h].objectTemplateCode;
  this.obj_template_ztic  =  templ_ztic;  // 20200430
  this.obj_template_code  =  templ_code;  // 20200430
  //obj_template_desc =


 var   html_id_cntr = 1;
   for(var k = 0; k < this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
   var i = this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c
 // console.log("Object: "+ this.msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectCode);
     var objx = this.msg.queryResponseObjectWA_AR[this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126


const html_id_prfx = "val";

//console.log("Object Element values");
     
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

     if(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic &&
this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2){      //template desc
         this.obj_template_desc = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
     }   // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12
     //} // endif objx.objectZTIC == templ_ztic && objx.objectCode == templ_code
     // 20200421 end of get template description

   //  if(!(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   //to suppress technical profile description
   if(!(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic &&
        this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2)){

     //if(!(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   // 20200127 temporary to suppress technical profile description
     if(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3){     // 20200514  also exclude data elem
        var OEscreenElem = new OEscreenElemRec();    //20200125
         //OEscreenElem.OE_ztic = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;  20200224 (del) take ztic and code from OE object
         //OEscreenElem.OE_code = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;  20200224 (del) not the OE that holds the OE desc
        OEscreenElem.OE_ztic = objx.objectZTIC;                                                                           //20200224
        OEscreenElem.OE_code = objx.objectCode;                       //20200224
        //OEscreenElem.OE_max_length = this.getOE_max_length(this.msg, OEscreenElem.OE_ztic,OEscreenElem.OE_code);       //20200515     
        OEscreenElem.html_id = html_id_prfx + html_id_cntr.toString().trim();
        html_id_cntr++;
        OEscreenElem.html_label = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        OEscreenElem.html_input_val = "";   //20200407
        OEscreenElem_AR.push(OEscreenElem);
      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3

     if(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 214){     // 20200516  include data elem max length
        var DEvalue = new DEvalueRec();    //20200125
        DEvalue.DE_ztic = objx.objectZTIC;                                                                           //20200224
        DEvalue.DE_code = objx.objectCode;                       //20200224
        DEvalue.OE_max_length = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        DEvalue_AR.push(DEvalue);
      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 31


    }  // endif to suppress template desc
//  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
//+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
//+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// console.log("20200515a Type values");
     for(var j = 0; j < objx.type_idx_AR.length; j++){
//  console.log("   20200515 Type DefZTIC/DefCode: ValueZTIC/ValueCode:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
//+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
//+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"/"
//+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
          //start 20200516 get data element ztic and code
          for(var p = 0; p < OEscreenElem_AR.length; p++){
            if(OEscreenElem_AR[p].OE_ztic == objx.objectZTIC && OEscreenElem_AR[p].OE_code == objx.objectCode){
              if(this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC == base_ztic &&  this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode == 9){
                OEscreenElem_AR[p].DE_ztic = this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC.toString().trim();  
                OEscreenElem_AR[p].DE_code = this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode.toString().trim();  
              }  // endif
            }  // endif 
          }  // endfor loop through OEscreenElem_AR
          // end 20200516
      }

//console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
//  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

      }
    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k
}  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQset"){ // temp (del) 20200407

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjTmplQset)
// end of loop at template values





// start of loop at object values 20200407
for(var h = 0; h < this.msg.queryResponseSetMemberWA_AR.length; h++){
if(this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjectQset"){



 var   html_id_cntr = 1;
   for(var k = 0; k < this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
   var i = this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c
// //  console.log("Object: "+ this.msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectCode);
     var objx = this.msg.queryResponseObjectWA_AR[this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126

//const html_id_prfx = "val";

// //console.log("Object Element values");
    
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){
     if(!(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   // 20200127 temporary to suppress technical profile description


        for(var m = 0; m < OEscreenElem_AR.length; m++){
           //if(OEscreenElem_AR[m].OE_ztic == objx.objectZTIC && OEscreenElem_AR[m].OE_code == objx.objectCode){
           if(OEscreenElem_AR[m].OE_ztic == this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC && OEscreenElem_AR[m].OE_code == this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode){

              OEscreenElem_AR[m].html_input_val = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
             // OEscreenElem_AR[m].html_input_val = "abc12345";
           } // endif OEscreenElem_AR[m].OE_ztic == objx.objectZTIC && OEscreenElem_AR[m].OE_code == objx.objectCode)
        } // endfor loop through OEscreenElem_AR
      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode != 12
// //  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
// //+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

// //console.log("Type values");
//     for(var j = 0; j < objx.type_idx_AR.length; j++){
// //  console.log("   Type Def/Value ZTIC/Code:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
// //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
// //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"-"
// //+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
//       }

// //console.log("Links");
//    for(var j = 0; j < objx.link_idx_AR.length; j++){
// //  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
// //+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

//      }
    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k
 }  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQset"){

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjectQset)


// end of loop at object values 20200407



OEscreenElem_AR = this.getOE_max_length(OEscreenElem_AR, DEvalue_AR); 


//console.log("20200516b list OEscreenElem_AR");
for(var i = 0; i < OEscreenElem_AR.length; i++){

  //  console.log(  "OE_ztic       "+ OEscreenElem_AR[i].OE_ztic);
  //  console.log(  "OE_code       "+ OEscreenElem_AR[i].OE_code);
  //  console.log(  "DE_ztic       "+ OEscreenElem_AR[i].DE_ztic); 
  //  console.log(  "DE_code       "+ OEscreenElem_AR[i].DE_code);
  //  console.log(  "OE_max_length "+ OEscreenElem_AR[i].OE_max_length);
} 

//console.log("20200516b list DEvalue_AR");
for(var i = 0; i < DEvalue_AR.length; i++){
  // console.log(   "DE_ztic       "+DEvalue_AR[i].DE_ztic);
  // console.log(   "DE_code       "+DEvalue_AR[i].DE_code);
  // console.log(   "OE_max_length "+DEvalue_AR[i].OE_max_length);
}

return OEscreenElem_AR;

}  // end of getOEscreenElem_AR()









// 20200528 begin for Type 2 Reponse Type
T2_getOEscreenElem_AR(){


var OEscreenElem_AR = [];
var DEvalue_AR      = [];

//console.log("20200523 this.ZTICNS_AR.length: "+this.ZTICNS_AR.length);
//var base_ztic = this.zticDom.getCodeForNamespace("131131/21");   //20200522
var base_ztic;
for(var i = 0; i < this.ZTICNS_AR.length; i++){
     if(this.ZTICNS_AR[i].namespace.toString().trim() == "131131/21"){
       base_ztic = this.ZTICNS_AR[i].code.toString().trim();
     } // endif
} //endfor





// start loop of template values for Type 2 query   20200528
for(var h = 0; h < this.msg.queryResponseSetMemberWA_AR.length; h++){
 if(this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQsetType2"){ 

// 20200421 - start of get template description
  var T2_templ_ztic = this.msg.queryResponseSetMemberWA_AR[h].objectTemplateZTIC;   
  var T2_templ_code = this.msg.queryResponseSetMemberWA_AR[h].objectTemplateCode;
  this.t2_obj_template_ztic  =  T2_templ_ztic;  // 20200430
  this.t2_obj_template_code  =  T2_templ_code;  // 20200430
  //obj_template_desc =

// 20200421 - end of get template description

 var   html_id_cntr = 1;
   for(var k = 0; k < this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR.length; k++){
   var i = this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k];   //(del) 20200126c
 // console.log("Object: "+ this.msg.queryResponseObjectWA_AR[i].objectKindZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectKindCode+"-"+this.msg.queryResponseObjectWA_AR[i].objectZTIC+"-"+this.msg.queryResponseObjectWA_AR[i].objectCode);
     var objx = this.msg.queryResponseObjectWA_AR[this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR[k]];   // 20200126

const html_id_prfx = "val";

//console.log("Object Element values");
    //queryResponseObjectElementWA_AR = [];     
    for(var j = 0; j < objx.objectElement_idx_AR.length; j++){

     if(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic &&
this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2){      //template desc
        // this.obj_template_desc = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue; (del) 20200528 get desc from main template
     }   // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12
     //} // endif objx.objectZTIC == templ_ztic && objx.objectCode == templ_code
     // 20200421 end of get template description

   //  if(!(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic && this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   //to suppress technical profile description
   if(!(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC == base_ztic &&
        this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 2)){

     //if(!(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 12)){   // 20200127 temporary to suppress technical profile description
     if(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3){     // 20200514  also exclude data elem
        var OEscreenElem = new OEscreenElemRec();    //20200125
         //OEscreenElem.OE_ztic = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC;  20200224 (del) take ztic and code from OE object
         //OEscreenElem.OE_code = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode;  20200224 (del) not the OE that holds the OE desc
        OEscreenElem.OE_ztic = objx.objectZTIC;                                                                           //20200224
        OEscreenElem.OE_code = objx.objectCode;                       //20200224
        //OEscreenElem.OE_max_length = this.getOE_max_length(this.msg, OEscreenElem.OE_ztic,OEscreenElem.OE_code);       //20200515     
        OEscreenElem.html_id = html_id_prfx + html_id_cntr.toString().trim();
        html_id_cntr++;
        OEscreenElem.html_label = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        OEscreenElem.html_input_val = "";   //20200407
        OEscreenElem_AR.push(OEscreenElem);
      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 3
// begin 20200516
     if(this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 214){     // 20200516  include data elem max length
        var DEvalue = new DEvalueRec();    //20200125
        DEvalue.DE_ztic = objx.objectZTIC;                                                                           //20200224
        DEvalue.DE_code = objx.objectCode;                       //20200224
        DEvalue.OE_max_length = this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue;
        DEvalue_AR.push(DEvalue);
      }  // endif this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode == 31
// end 20200516

    }  // endif to suppress template desc
//  console.log("   OE ZTIC/Code: Value:  "+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementZTIC +"/"
//+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementCode+": "
//+this.msg.queryResponseObjectElementWA_AR[objx.objectElement_idx_AR[j]].objectElementValue);
      }  // endfor loop through objx.objectElement_idx_AR  

 //console.log("20200515a Type values");
     for(var j = 0; j < objx.type_idx_AR.length; j++){
 // console.log("   20200528 Type DefZTIC/DefCode: ValueZTIC/ValueCode:  "+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC +"/"
//+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode+": "
//+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC+"/"
//+this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode);
          //start 20200516 get data element ztic and code
          for(var p = 0; p < OEscreenElem_AR.length; p++){
            if(OEscreenElem_AR[p].OE_ztic == objx.objectZTIC && OEscreenElem_AR[p].OE_code == objx.objectCode){
              if(this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionZTIC == base_ztic &&  this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeDefinitionCode == 9){
                OEscreenElem_AR[p].DE_ztic = this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueZTIC.toString().trim();  
                OEscreenElem_AR[p].DE_code = this.msg.queryResponseTypeWA_AR[objx.type_idx_AR[j]].typeValueCode.toString().trim();  
              }  // endif
            }  // endif 
          }  // endfor loop through OEscreenElem_AR
          // end 20200516
      }

//console.log("Links");
    for(var j = 0; j < objx.link_idx_AR.length; j++){
//  console.log("   Link Type/Value:  "+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkTypeCode+"/"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToKindCode+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToZTIC+"-"
//+this.msg.queryResponseLinkWA_AR[objx.link_idx_AR[j]].linkToCode);

      }
    } // end loop through this.msg.queryResponseSetMemberWA_AR[h].object_idx_AR using index k
}  // endif this.msg.queryResponseSetMemberWA_AR[h].setMemberID == "ObjTmplQsetType2"){ // temp (del) 20200407

}  // end of loop through queryResponseSetMemberWA_AR using  index h  (for ObjTmplQsetType2)

// end loop of template values for Type 2 query     20200528




OEscreenElem_AR = this.getOE_max_length(OEscreenElem_AR, DEvalue_AR); 

//console.log("20200516b list OEscreenElem_AR");
for(var i = 0; i < OEscreenElem_AR.length; i++){

   // console.log(  "OE_ztic       "+ OEscreenElem_AR[i].OE_ztic);
   // console.log(  "OE_code       "+ OEscreenElem_AR[i].OE_code);
   // console.log(  "DE_ztic       "+ OEscreenElem_AR[i].DE_ztic); 
   // console.log(  "DE_code       "+ OEscreenElem_AR[i].DE_code);
   // console.log(  "OE_max_length "+ OEscreenElem_AR[i].OE_max_length);
} 

//console.log("20200516b list DEvalue_AR");
for(var i = 0; i < DEvalue_AR.length; i++){
  // console.log(   "DE_ztic       "+DEvalue_AR[i].DE_ztic);
  // console.log(   "DE_code       "+DEvalue_AR[i].DE_code);
  // console.log(   "OE_max_length "+DEvalue_AR[i].OE_max_length);
}

return OEscreenElem_AR;

}  // end of T2_getOEscreenElem_AR()

// 20200528 end of Type 2 Response Type





getOE_max_length(OEscreenElem_ARx, DEvalue_ARx){   

// set default
  for(var i = 0; i < OEscreenElem_ARx.length; i++){
     OEscreenElem_ARx[i].OE_max_length = 10;
  } // endfor

//console.log("20200522 ..maint.obj..util OEscreenElem_ARx.length-DEvalue_ARx.length:  "+OEscreenElem_ARx.length+" - "+DEvalue_ARx.length);

  for(var i = 0; i < OEscreenElem_ARx.length; i++){

       for(var j = 0; j < DEvalue_ARx.length; j++){
         //console.log("20200522 OEscreenElem_ARx[i].DE_ztic - DEvalue_ARx[j].DE_ztic: "+OEscreenElem_ARx[i].DE_ztic+" - "+DEvalue_ARx[j].DE_ztic);
         if(OEscreenElem_ARx[i].DE_ztic == DEvalue_ARx[j].DE_ztic && OEscreenElem_ARx[i].DE_code == DEvalue_ARx[j].DE_code){   
            OEscreenElem_ARx[i].OE_max_length = DEvalue_ARx[j].OE_max_length;
         } //endif
       } // endfor
  } // endfor 

 
var OEscreenElem_AR = [];
    

  return OEscreenElem_ARx;
}




} // end of class ZtMaintainObjectUtility

function OEscreenElemRec(){                //20200125
     OE_ztic   = "";           //object element ztic
     OE_code   = "";           //object element code
     DE_ztic   = "";           //20200516 data element ztic 
     DE_code   = "";           //20200516 data element code
     OE_max_length = "";
     html_id   = "";
     html_label = "";
     html_input_val = "";

}  // end of OEscreenElemRec


function DEvalueRec(){
    DE_ztic  = "";
    DE_code  = "";
    OE_max_length = "";
} // end of DEvalueRec()





module.exports = ZtMaintainObjectUtility;
