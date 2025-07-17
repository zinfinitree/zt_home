
class ZtDateStringClass {



constructor(svr1x, msgx, parameter_AR) {
  this.svr1  =  svr1x;
  this.msg   =  msgx;
  this.parameter_AR = parameter_AR;
//  this.timestamp  = timestampx;

 

} // end of constructor

  


  execute(){

console.log("running date string execute for patch level 2");
console.log("parameters: ");
var return_param_AR = [];

const time_dsi_str = "zinfinitree.com/time";
const time_ztic_str = this.svr1.getCodeForNS(this.msg.TabNamePrfx.toString().trim(), time_dsi_str);
const base_dsi_str = "131131/21";
const base_ztic_str = this.svr1.getCodeForNS(this.msg.TabNamePrfx.toString().trim(), base_dsi_str);


//  1.  at end of zt_server_object.getAllValuesForTemplateDef call function getAllValuesForTemplateDefUserExitFunction() to call this program
//  2.  check if the object being queried has a type value where the object kind of the type value is a date
//  3.  use type def path to find the year of the date
//  4.  use type def path to find the month of the date
//  5.  use type def path to find day for the date
//  6.  get the timezone of the date
//  7.  put results from 3, 4, 5 and 6 into a string
//  8.  put the result string in a query respone as an object element value
//  9.  populate the object element usage type namespace with the date namespace
//  10. populate the object element usage type code with the value "1"
//  11. populate the object element ztic with the ztic of the type definition
//  12. populate the object element code with the code of the type definition

const date_obj_idx;
var return_date_str;
for(var i = 0; i < this.parameter_AR.length; i++){
//   console.log(this.parameter_AR[i].namespace+" - "+this.parameter_AR[i].code + " - " + this.parameter_AR[i].value);
   if(this.parameter_AR[i].namespace == "zinfinitree.com/time" && this.parameter_AR[i].code == "1"){
     date_obj_idx = parseInt(this.parameter_AR[i].value);
   }  // endif
} // endfor



//  end copied for example 20231021


// start 20231022
var stat_values_obj_KeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+base_ztic_str+"_58_"+time_ztic_str+"_1;
var stat_values_object_idx = this.svr1.ZtObject_idx_HM.get(stat_values_obj_KeyStr);
var stat_values_object_ztic = this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objZTIC.toString().trim();
var stat_values_object_code = this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objCode.toString().trim();                                                        
var statisticalValuesObj = new (require('./ds2b00002_server_statistical_values_object'))( this.svr1, this.msg, stat_values_object_ztic, stat_values_object_code);
statisticalValuesObj.single_object_idx = date_obj_idx;
statisticalValuesObj.getValues();
// end 20231022

for (var j = 0; j < statisticalValuesObj.dimension_AR.length; j++) {

    //console.log("*** 20230718 this.dimension_AR[j].type_def_idx_for_summarization: "+ this.dimension_AR[j].type_def_idx_for_summarization);
    //console.log("*** 20230718 this.dimension_AR[j].type_def_path_ztic: "+ this.dimension_AR[j].type_def_path_ztic);
    //console.log("*** 20230718 this.dimension_AR[j].type_def_path_code: "+ this.dimension_AR[j].type_def_path_code);
        
    for (var k = 0; k < statisticalValuesObj.dimension_AR[j].typeDefinitionAndValue_AR.length; k++) {
       return_date_str = statisticalValuesObj.dimension_AR[j].typeDefinitionAndValue_AR[k].type_val_code;
       //console.log("this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic " + this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic );
       //console.log("this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code " + this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code );
       //console.log("this.dimension_AR[j].typeDefinitionAndValue_AR[k].sortStr " + this.dimension_AR[j].typeDefinitionAndValue_AR[k].sortStr ); 

    } // endfor loop through typeDefinitionAndValue_AR  

  } // endfor loop through dimension_AR

var return_param = new DsFunctionParameter("zinfinitree.com/time", "2", return_date_str);
this.parameter_AR.push(return_param);


     


//return return_param_AR;

} // end of execute()






}  // end of class ZtDateStringClass



class DsFunctionParameter {



constructor(namespacex, codex, valuex) {
      this.namespace  =  namespacex.toString().trim();
      this.code  =  codex.toString().trim();
      this.value =  valuex;
     // this.sm_text = "";
     // this.text_return = new TextReturn();
} // end of constructor


}  // end of class DsFunctionParameter







module.exports = ZtDateStringClass;


