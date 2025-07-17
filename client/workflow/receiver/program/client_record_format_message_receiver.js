class ClientRecordFormatMessageReceiver {

 
    constructor(urlx, rec_format_msgx, ZTICNS_ARx, TargetNSx, wf_domain_idx, workflow_idx, msg_container_idx) {
      this.url = urlx;
      this.rec_format_msg = rec_format_msgx;
      this.ZTICNS_AR      = ZTICNS_ARx;
      this.TargetNS       = TargetNSx;
      this.wf_domain_idx  = wf_domain_idx;
      this.workflow_idx   = workflow_idx;
      this.msg_container_idx = msg_container_idx;
      this.resp_msg = "";
    
  } // end of constructor




passMessage(){


//console.log("** 20221016c running passMessage() in client_record_format_message_receiver.js");
var clientTime = new (require('./zt_client_time'));
var time_now;
var timeout_ts;


  var lines = this.rec_format_msg.toString().split('\n');
  var rec_AR = [];
  for (var i = 0; i < lines.length; i++) {
    rec_AR.push(lines[i].toString().trim());
  } // endfor

//console.log("** 20221023 rec_AR.length: "+rec_AR.length);
//console.log("** 20221023 this.wf_domain_idx in client_record_format_message_receiver.js: "+this.wf_domain_idx);
//console.log("** 20221023 this.workflow_idx in client_record_format_message_receiver.js: "+this.workflow_idx);
//constructor(urlx, recordFormatMsg_ARx, ZTICNS_ARx, TargetNSx, wf_domain_idx, workflow_idx, msg_container_idx)
//console.log("--?  20221025 this.wf_domain_idx - this.workflow_idx - this.msg_container_idx in client_record_format_message_receiver.js: "+this.wf_domain_idx+" - "+this.workflow_idx+" - "+this.msg_container_idx);
//var client_call  = new (require('./ds2b_client_workflow_call_to_client_v2'))(this.url, rec_AR, this.ZTICNS_AR, this.TargetNS, this.wf_domain_idx, this.workflow_idx, this.msg_container_idx);
var client_call  = new (require('./ds2b_client_workflow_call_to_client_v2'));
                                         

//var callback_name = "processRecordFormatMessage_callback";
client_call.processRecordFormatMessage(this.url, rec_AR, this.ZTICNS_AR, this.TargetNS, this.wf_domain_idx, this.workflow_idx, this.msg_container_idx);

time_now = clientTime.now();

//timeout_ts = time_now + 10;





//console.log("** 20221016d exiting passMessage() in client_record_format_message_receiver.js this.resp_msg: "+this.resp_msg);

}  // end of passMessage




} // end of class ClientRecordFormatMessageReceiver




module.exports = ClientRecordFormatMessageReceiver;
