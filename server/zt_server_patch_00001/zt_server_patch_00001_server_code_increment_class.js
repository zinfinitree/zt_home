
class ZtCodeIncrementClass {



constructor(svr1x, msgx, parameter_AR) {
  this.svr1  =  svr1x;
  this.msg   =  msgx;
  this.parameter_AR = parameter_AR;
//  this.timestamp  = timestampx;

 

} // end of constructor



  


  execute(){

console.log("running code increment execute for patch level 1");
console.log("parameters: ");
var return_param_AR = [];
var code_before_increment = 0;
var code_after_increment  = 0;
var code_after_increment_str = "";
for(var i = 0; i < this.parameter_AR.length; i++){
   console.log(this.parameter_AR[i].namespace+" - "+this.parameter_AR[i].code + " - " + this.parameter_AR[i].value);
   if(this.parameter_AR[i].namespace == "131131/21" && this.parameter_AR[i].code == "5"){
     code_before_increment = parseInt(this.parameter_AR[i].value);
     code_after_increment  = code_before_increment + 1;
     code_after_increment_str  = code_after_increment.toString().trim();
     var return_param = new DsFunctionParameter("131131/21", "6", code_after_increment_str);
     this.parameter_AR.push(return_param);
   }  // endif
} // endfor

     

} // end of execute()




}  // end of class ZtCodeIncrementClass



class DsFunctionParameter {



constructor(namespacex, codex, valuex) {
      this.namespace  =  namespacex.toString().trim();
      this.code  =  codex.toString().trim();
      this.value =  valuex;
     // this.sm_text = "";
     // this.text_return = new TextReturn();
} // end of constructor


}  // end of class DsFunctionParameter







module.exports = ZtCodeIncrementClass;


