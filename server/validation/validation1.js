function Validation1() {
    this.txt1   = "validation1 text";
    this.validationResponse_AR = [];

  }



Validation1.prototype.process = function() {


class Validation1 {


//function Validation1(txt1x) {
    constructor(svr1x,msgx) {
    //this.txt1   = "validation1 text";
    this.svr1 = svr1x;
    this.msg = msgx;
  }



//Validation1.prototype.process = function() {
     process() {

console.log("running validation1: "+this.svr1+", "+this.msg);

var sys_msg_pgm_str = "../zt_server_system_message"; 
var parameter_AR = [];
var sm_ztic = "sm_ztic";
var sm_code = "sm_code";

var sys_msg = new (require(sys_msg_pgm_str))(sm_ztic,sm_code);

var svr1_str = "svr1_string";
var lang_str = "language";
var parameter_AR = [];
var ret_txt = new TextReturn();
ret_txt = sys_msg.getText(svr1_str, lang_str, parameter_AR);
console.log("ret_txt.short_text in Validation1: "+ret_txt.short_text);
console.log("ret_txt.long_text in Validation1: "+ret_txt.long_text);

}  // end of process


} // end of class Validation1


class TextReturn {

constructor() {
this.short_text = "";
this.long_text  = "";

} // end of constructor

setShortText(short_txt)   {

  this.short_text = short_txt;

}


setLongText(long_txt)   {

  this.long_text = long_txt;

}


} //end of class TextReturn


/////console.log("running validation1: "+this.txt1);

/////var msgRow;
/////var resp_next_index = 0;

/////         parent_index = next_index;                                                        
/////         next_index++;                                                                          
/////         msgRow =  new MessageRow(next_index,parent_index , "5000","2","430",""); 
/////         this.DsMessageResponse_Array.push(msgRow);
 
/////         parent_index = next_index;                                                        
/////         next_index++;                                                                          
/////         msgRow =  new MessageRow(next_index,parent_index , "5000","2","4301","ID1"); 
/////         this.DsMessageResponse_Array.push(msgRow); 

/////return this.validationResponse_AR;


/////}  // end of Validation1.process



/////function MessageRow(index, parent_index, priority, me_ztic, me_code, data) {
/////  this.index        = index;
/////  this.parent_index = parent_index;
/////  this.priority     = priority;
/////  this.me_ztic      = me_ztic;
/////  this.me_code      = me_code;
/////  this.data         = data;
 
/////}




module.exports = Validation1;
