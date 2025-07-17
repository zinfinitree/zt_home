class MessageContainerSender {


 //   constructor(resource_param_strx, wfDefx, workflowx) {
 //     this.resource_param_str = resource_param_strx;
 //     this.wfDef     = wfDefx;
 //     this.workflow  = workflowx;
    
 // } // end of constructor


    constructor(param_strx, workflowDefx, workflowx, sender_idx) {
      this.resource_param_str      = param_strx;
      this.workflowDef    = workflowDefx;
      this.workflow       = workflowx;
      this.sender_idx     = sender_idx;
    
  } // end of constructor



getMessage(){

console.log(" ");
console.log("running getMessage() in message_container_sender_class.js: ");
//var clientTime = new (require('./ds2b_client_time'));
//var time_now;
//var timeout_ts;
var container_msg_sender_ns;
var container_msg_sender_code;
var container_msg_version;

var msgStr = "";
var msg_idx;

var param_AR = [];

param_AR = this.parseParameterStringToArray(this.resource_param_str);

console.log(" ");
console.log("20221031 this.resource_param_str in getMessage in message_container_sender_class: "+this.resource_param_str);
for(var i = 0; i < param_AR.length; i++){

  console.log("param_ns | param_code | param_value: "+param_AR[i].param_ns+" | "+param_AR[i].param_code+" | "+param_AR[i].param_value);
  if(param_AR[i].param_code == 1){
    container_msg_sender_ns = param_AR[i].param_value;
  }
  if(param_AR[i].param_code == 2){
    container_msg_sender_code = param_AR[i].param_value;
  }
  if(param_AR[i].param_code == 3){
    container_msg_version = param_AR[i].param_value;
  }
              
} // endfor




//time_now = clientTime.now();

//timeout_ts = time_now + 10;

console.log("container_msg_sender_code: "+container_msg_sender_code);
console.log("container_msg_version: "    +container_msg_version);

// TEMP FOR TEST REMOVE
container_msg_sender_code = "3001";
container_msg_version = "4";
// END TEMP FOR TEST

var done = false;
//while(!done){

     for(var i = 0; i < this.workflow.messageContainer_AR.length; i++){
        var msg_container_sender_idx = this.workflow.messageContainer_AR[i].msgFromSender_idx;
        //console.log("this.workflowDef.msender_AR[msg_container_sender_idx].msender_code: "+this.workflowDef.msender_AR[msg_container_sender_idx].msender_code);
        
        if(this.workflowDef.msender_AR[msg_container_sender_idx].msender_code == container_msg_sender_code){
          if(container_msg_version == 4){
            msg_idx = this.workflow.messageContainer_AR[i].msgWithResponse_idx;
            msgStr =  this.workflow.message_AR[msg_idx].messageStr;
           // if(msgStr.toString().trim() != ""){
           //   done = true;
           // } //endif msgStr != ""
          } // endif

        } // endif

     } // endfor
  

  // time_now = clientTime.now();
  // if(time_now > timeout_ts){
  //   msgStr = "TIMEOUT reached, default MsgStr in message_container_sender_class1.js getMessage()";
  //   done = true; break;


  // }  // endif


//}  // endwhile


///var fs = require('fs');

///var msg = "abc123";

///console.log("this.message_file in getMessage(): "+this.message_file);
   
///  var message_path = "."+this.message_file;

///  var   fileContents = fs.readFileSync(message_path);
///  //var lines = fileContents.toString().split('\n');

///return fileContents;



console.log("20221011 msgStr returned by message_container_sender_class1: "+msgStr);

return msgStr;

}

parseParameterStringToArray(param_str){

var wf_wa = require('./ds2b_client_workflow_workarea');

var open_idx; 
var close_idx; 

var done = false;

var param_AR = [];


while(!done){
  open_idx = param_str.indexOf('[');
  if(open_idx < 0){done = true; break;} 
  close_idx = param_str.indexOf(']');

  console.log("open_idx - close_idx: "+open_idx + " - "+close_idx);
  var len = close_idx - open_idx -2;
  var start = open_idx + 2;
  var delim = param_str.substr(open_idx+1,1);
  console.log("param_substr: "+param_str.substr(start,len));

  var param_single = param_str.substr(start,len);
  param_str = param_str.substr(close_idx + 1);
  console.log("delim: "+delim);
  var part1_idx = param_single.indexOf(delim);
  var part1_str = param_single.substr(0,part1_idx);

  param_single = param_single.substr(part1_idx+1);
  var part2_idx = param_single.indexOf(delim);
  var part2_str = param_single.substr(0,part2_idx);

  param_single = param_single.substr(part2_idx+1);
  var part3_str = param_single;



  var param_rec = new wf_wa.ParameterRec();

  param_rec.param_ns = part1_str;
  param_rec.param_code = part2_str;
  param_rec.param_value = part3_str;
  param_AR.push(param_rec);

} // endwhile



//for(var i = 0; i < param_AR.length; i++){

//  console.log("param_ns | param_code | param_value: "+param_AR[i].param_ns+" | "+param_AR[i].param_code+" | "+param_AR[i].param_value);
              
//} // endfor

return param_AR;

}  // end of parseParameterStringToArray





} // end of class MessageContainerSender




module.exports = MessageContainerSender;
