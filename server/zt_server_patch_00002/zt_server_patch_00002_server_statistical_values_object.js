// copied from ds2b_client_workflow.js 

// class DsWorkflowDomain {     //20200601
class ZtStatisticalValuesObject {      // 20230524

  //var HashMap = require('hashmap');
  
    constructor(svr1x, msgx, sv_object_zticx, sv_object_codex) {
      var HashMap = require('hashmap');
      this.svr1 = svr1x;
      this.msg  = msgx;
      this.sv_obj_ztic = sv_object_zticx;
      this.sv_obj_code = sv_object_codex;
      this.sv_obj_idx = "";
      this.statistic_type_ztic = "";
      this.statistic_type_code = "";  // sum, count, mean, median, mode, standard deviation
      this.source_obj_set_ztic = "";
      this.source_obj_set_code = "";
      this.single_object_idx = "";  // 20231017
      this.uom_ztic      = "";
      this.uom_code      = "";
      this.source_obj_elem_ztic = "";
      this.source_obj_elem_code = "";
      this.source_obj_idx_AR  = [];
      this.dimension_AR = [];
      this.stat_value_AR = [];
      this.stat_value_HM = new HashMap();
      this.group_AR = [];

      //ELEM 2    9    2    32   2    9    2    9         Type Definition: Statistic Type for a Statistical Values Object (sum, count, mode, mean, std deviation)
      //ELEM 2    9    2    33   2    9    2    9         Type Definition: Object Set for a Statistical Values Object
      //ELEM 2    9    2    34   2    9    2    9         Type Definition: Type Definition Path for a Statistical Values Dimension
      //ELEM 2    9    2    35   2    9    2    9         Type Definition: Unit of Measure for a Statistical Values Object
      //ELEM 2    9    2    36   2    9    2    9         Type Definition: Unit of Measure Dimension for a Unit of Measure
      //ELEM 2    9    2    37   2    9    2    9         Type Definition: Object Element for a Statistical Values Object for source of data

      //ELEM 2    10   2    26   2    10   2    10        Link Type: Statistical Values Object to Statistical Values Dimension
      //ELEM 2    10   2    27   2    10   2    10        Link Type: Type Definition Path to Type Definition 

      // 4180 StatisticalValuesObjectSet
      //  4181--StatisticalValuesObject  (set member)									
      //      41810--StatisticalValuesObjectZTIC								
      //      41811--StatisticalValuesObjectCode
      //      41812--StatisticTypeZTIC								
      //      41813--StatisticTypeCode (1=sum, 2=count, 3=mean, 4=median, 5=mode, 6=standard deviation)	
      //      41814--SourceSetZTIC
      //      41815--SourceSetCode
      //      41816--UomZTIC						
      //      41817--UomCode
      //      41820--SourceObjectElementZTIC
      //      41821--SourceObjectElementCode
      //      41822--StatisticalValuesObjectLabel														
      //      4183--DimensionSet								
      //          41830--DimensionSetMember							
      //              41831--DimensionZTIC						
      //              41832--DimensionCode	
      //              41833--DimensionLabel					
      //              41834--IndexOfTypeDefinitionPathForDataSummarization i.e. account for financial posting
      //              41835--IndexOfTypeDefinitionPathForGrouping	i.e. account category for financial posting, income, expense	
      //              41836--IndexOfTypeDefinitionPathForGrouping2								
      //              4184--TypeDefinitionPath
      //                  41840--PathZTIC
      //                  41841--PathCode
      //                  41842--TypeDefinitionSet
      //                      41843--TypeDefinitionSetMember
      //                          41844--TypeDefinitionZTIC
      //                          41845--TypeDefinitionCode
      //                          41846--IndexInPath						
                                        
      //      4185--StatisticalValueSet								
      //          41850--StatisticalValueSetMember							
      //              41851--StatisticalValueMemberID						
      //              41852--StatisticalValue						
      //              4186--StatisticalValueTypeValueSet						
      //                  41860--StatisticalValueTypeValueSetMember				
      //                      //41861--SortKey
      //                      //41862--TypeDefinitionZTIC
      //                      //41863--TypeDefinitionCode		
      //                      //41864--TypeValueZTIC			
      //                      //41865--TypeValueCode
      //                      
      //                        41861--TypeDefinitionZTIC
      //                        41862--TypeDefinitionCode		
      //                        41863--TypeValueZTIC			
      //                        41864--TypeValueCode
      //                        41865--SortKey
      //                  	  41866--TypeValueForSummarizationLabel
      //                      41867--GroupCode
      //                      41868--GroupCode2
      //
      //      4187--GroupSet
      //           41870--GroupSetMember
      //               41871--GroupCode
      //               41872--GroupLabel
      //               41873--DimensionZTIC
      //               41874--DimensionCode
      //               41875--IndexInTypeDefinitionPath
      //               41876--TypeValueZTIC   
      //               41877--TypeValueCode
      
  } // end of constructor


getValues(){


// 1. find object index of statistical values object using ztic and code from constructor
// 2. find StatisticTypeZTIC,	StatisticTypeCode (1=sum, 2=count, 3=mean, 4=median, 5=mode, 6=standard deviation),	
//    SourceSetZTIC, SourceSetCode, UomZTIC, UomCode, SourceObjectElementZTIC, SourceObjectElementCode, StatisticalValuesObjectLabel
// 3. load the array of dimension
// 4. load the array of the type def path for each dimension
// 5. load the array of source objects by getting members of the set
// 6. accumulate statistical values into buckets based on relevant type values of source objects
// 7. generate the relevant grouping codes and store in array of groups
// 8. list results to check for accuracy


// 1.  find object index of statistical values object

// start copied for example 20230606
  ////       //check if object is a set
  ////       if (this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindZTIC.toString().trim() == base_ztic && this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindCode.toString().trim() == "13") {
  ////        var setKeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindZTIC.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindCode.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objZTIC.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objCode.toString().trim();
  ////        console.log("%%% 20230406 setKeyStr: "+setKeyStr);
  ////        var set_object_idx = this.svr1.ZtObject_idx_HM.get(setKeyStr);
  ////        var msgSetObj = new (require('./ds2b00002_server_set'))( this.svr1, set_object_idx ); 
  ////        this.queryResponseSetMemberAdd_forSet(queryResponseSet_idx, this.msg.queryResponseSetMemberWA_AR[i].setMemberID+":5:"+msgSetObj.setObj.objZTIC+"_"+msgSetObj.setObj.objCode, respTyp, msgSetObj.setObj.objZTIC, msgSetObj.setObj.objCode);  // moved above for loop 20201109 
  ////        var setMember_AR = msgSetObj.getMember_AR(this.svr1.time.now());
  ////        console.log("%%%m 20220213 setMember_AR.length: "+setMember_AR.length);
// end copied for example 20230606
var base_ztic = this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim();
const get_values_maxLevelsDown_99 = 99;  // REVISIT ?? 
var sv_wa = require('./ds2b00002_server_statistical_values_object_workarea');

var statValObjKeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+base_ztic+"_58_"+this.sv_obj_ztic+"_"+this.sv_obj_code;
this.sv_obj_idx = this.svr1.ZtObject_idx_HM.get(statValObjKeyStr);

var templDefForStatValsObjKeyStr =     this.msg.TabNamePrfx.toString().trim() + "_"+
base_ztic+"_2_"+base_ztic+"_58";
var template_def_idx_for_stat_vals_obj = this.svr1.ZtObject_idx_HM.get(templDefForStatValsObjKeyStr);
var statusExclusion_AR  = [];  // revisit perhaps get it from msg

var resp_item_for_stat_vals_obj_AR = this.svr1.ZtObject_AR[this.sv_obj_idx].getAllValuesForTemplateDef(template_def_idx_for_stat_vals_obj, this.msg, this.svr1.time.now(), statusExclusion_AR, get_values_maxLevelsDown_99 ); 


console.log("*** 20230716aa resp_item_for_stat_vals_obj_AR.length: "+resp_item_for_stat_vals_obj_AR.length);
for (var l = 0; l < resp_item_for_stat_vals_obj_AR.length; l++) {

  var objx = resp_item_for_stat_vals_obj_AR[l];

    for (var i = 0; i < objx.objElemIdx_AR.length; i++) {
      //var oe_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_ztic);
      //this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_ztic
      //this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_code
      //this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value

    }  // endfor loop through objElemIdx_AR

    for (var i = 0; i < objx.typeValueIdx_AR.length; i++) {
      if(this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_ztic == base_ztic && this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_code == "32"){  //if statistic type
        this.statistic_type_ztic = this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_ztic;
        this.statistic_type_code = this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_code;
      } // endif type def is for statistic type

      if(this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_ztic == base_ztic && this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_code == "33"){  //if object set
        this.source_obj_set_ztic = this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_ztic;
        this.source_obj_set_code = this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_code;
      } // endif type def is for object set

      if(this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_ztic == base_ztic && this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_code == "35"){  //if uom
        this.uom_ztic = this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_ztic;
        this.uom_code = this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_code;
      } // endif type def is unit of measure

      if(this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_ztic == base_ztic && this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_code == "37"){  //if source object element
        this.source_obj_elem_ztic = this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_ztic;
        this.source_obj_elem_code = this.svr1.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_code;
      } // endif type def is for source object element

      //this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_ztic
      //this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeDef_code
      //this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_ztic
      //this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_code
      //var type_value_msg_ztic =  this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectTypeValue_AR[objx.typeValueIdx_AR[i]].typeValue_ztic);

    }  // endfor loop through typeValueIdx_AR
    

    for (var i = 0; i < objx.linkIdx_AR.length; i++) {
      if(this.svr1.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic == base_ztic && this.svr1.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_code == "26"){  // link to dimension
        var new_dimension = new sv_wa.StatisticalValuesDimension(this.svr1.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToCode_ztic, this.svr1.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToCode);
        var dimensionKeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+base_ztic+"_59_"+new_dimension.sv_dimension_ztic+"_"+new_dimension.sv_dimension_code;
        console.log("20230711 dimensionKeyStr: "+dimensionKeyStr);
        var sv_dimension_idx = this.svr1.ZtObject_idx_HM.get(dimensionKeyStr);
        //console.log("20230711 sv_dimension_idx: "+sv_dimension_idx);

        var templDefForDimensionKeyStr =     this.msg.TabNamePrfx.toString().trim() + "_"+  base_ztic+"_2_"+base_ztic+"_59";
        var template_def_idx_for_dimension = this.svr1.ZtObject_idx_HM.get(templDefForDimensionKeyStr);
        var resp_item_for_dimension_AR = this.svr1.ZtObject_AR[sv_dimension_idx].getAllValuesForTemplateDef(template_def_idx_for_dimension, this.msg, this.svr1.time.now(), statusExclusion_AR, get_values_maxLevelsDown_99 ); 
        
       for (var l = 0; l < resp_item_for_dimension_AR.length; l++) {
          var dim_obj = resp_item_for_dimension_AR[l];
          for (var k = 0; k < dim_obj.objElemIdx_AR.length; k++) {
            if(this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].OE_code == "216"){ // dimension label
              new_dimension.type_def_idx_for_summarization = this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].value;
            } // endif it's the dimension label

            if(this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].OE_code == "217"){ // index of type def path for summarization
                new_dimension.type_def_idx_for_summarization = this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].value;
            } // endif it's the index of the type def path for summarization

/////            if(this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].OE_code == "218"){ // index of type def path for grouping
/////               new_dimension.type_def_idx_for_grouping = this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].value;
/////            } // endif it's the index of the type def path for grouping

/////            if(this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].OE_ztic == base_ztic && this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].OE_code == "217"){ // index of type def path for grouping2
/////               new_dimension.type_def_idx_for_grouping2 = this.svr1.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].value;
/////            } // endif it's the index of the type def path for grouping2


            //StatisticalValuesDimension
            //this.sv_dimension_ztic = sv_dimension_zticx;
            //this.sv_dimension_code = sv_dimension_codex;
            //this.sv_dimension_label = "";
            //this.type_def_idx_for_summarization = 0;
            //this.type_def_idx_for_grouping = 0;
            //this.type_def_idx_for_grouping2 = 0;
            //this.type_def_path_ztic = "";
            //this.type_def_path_code = "";
            
            //this.typeDefinition_AR = [];
            //ELEM%2    3    2    216  2    3    2    3         Dimension Label
            //ELEM%2    3    2    217  2    3    2    3         Index for Type Definition for Summarization in Type Definition Path used by Dimension
            //ELEM%2    3    2    218  2    3    2    3         Index for Type Definition for Grouping in Type Defiition Path used for Dimension
            //ELEM%2    3    2    219  2    3    2    3         Index for Type Definition for Groupin2 in Type Definition Path used for Dimension
            //var oe_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_ztic);
            //this.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].OE_ztic
            //this.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].OE_code
            //this.ZtObjectElement_AR[dim_obj.objElemIdx_AR[k]].value
      
          }  // endfor loop through objElemIdx_AR

          for (var n = 0; n < dim_obj.typeValueIdx_AR.length; n++) {
                if(this.svr1.ZtObjectTypeValue_AR[dim_obj.typeValueIdx_AR[n]].typeDef_ztic == base_ztic && this.svr1.ZtObjectTypeValue_AR[dim_obj.typeValueIdx_AR[n]].typeDef_code == "34"){  // type def path for a dimension
              new_dimension.type_def_path_ztic = this.svr1.ZtObjectTypeValue_AR[dim_obj.typeValueIdx_AR[n]].typeValue_ztic;
              new_dimension.type_def_path_code = this.svr1.ZtObjectTypeValue_AR[dim_obj.typeValueIdx_AR[n]].typeValue_code;
            } // endif type def path for a dimension
          } // endfor loop through typeValueIdx_AR

          var typeDefPathKeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+base_ztic+"_56_"+new_dimension.type_def_path_ztic+"_"+new_dimension.type_def_path_code;
/////          console.log("*** 20230716a typeDefPathKeyStr: "+typeDefPathKeyStr);
          var type_def_path_idx = this.svr1.ZtObject_idx_HM.get(typeDefPathKeyStr);
/////          console.log("*** 20230716b type_def_path_idx: "+type_def_path_idx);
  
          var templDefForTypeDefPathKeyStr =     this.msg.TabNamePrfx.toString().trim() + "_"+ base_ztic+"_2_"+base_ztic+"_56";
          var template_def_idx_for_type_def_path = this.svr1.ZtObject_idx_HM.get(templDefForTypeDefPathKeyStr);
          var resp_item_for_type_def_path_AR = this.svr1.ZtObject_AR[type_def_path_idx].getAllValuesForTemplateDef(template_def_idx_for_type_def_path, this.msg, this.svr1.time.now(), statusExclusion_AR, get_values_maxLevelsDown_99 ); 
          
          console.log("*** 20230718c resp_item_for_type_def_path_AR.length: "+resp_item_for_type_def_path_AR.length);

          for (var m = 0; m < resp_item_for_type_def_path_AR.length; m++) {
            var type_def_path_obj = resp_item_for_type_def_path_AR[m];

            for (var p = 0; p < type_def_path_obj.linkIdx_AR.length; p++) {
              if(this.svr1.ZtObjectLink_AR[type_def_path_obj.linkIdx_AR[p]].linkType_ztic == base_ztic && this.svr1.ZtObjectLink_AR[type_def_path_obj.linkIdx_AR[p]].linkType_code == "27"){  // link to type def
                var new_type_def = new sv_wa.TypeDefinitionAndValue(this.svr1.ZtObjectLink_AR[type_def_path_obj.linkIdx_AR[p]].linkToCode_ztic, this.svr1.ZtObjectLink_AR[type_def_path_obj.linkIdx_AR[p]].linkToCode);  // mod 20230719
                new_type_def.sortStr = this.svr1.ZtObjectLink_AR[type_def_path_obj.linkIdx_AR[p]].linkValue;
                new_dimension.typeDefinitionAndValue_AR.push(new_type_def);
              
              } // endif link type is for link to type def from type def path
            } // endfor loop through type_def_path_obj.linkIdx_AR

          } // endfor loop through resp_item_for_type_def_path_AR 


        }   // endfor loop through resp_item_for_dimension_AR  


        this.dimension_AR.push(new_dimension);

      }  // endif link to dimension 
      //var link_type_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic);
      //this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic
      //this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_code
      //this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToKind_ztic
      //this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToKind_code
      //this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToCode_ztic
      //this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkToCode
      //this.ZtObjectLink_AR[objx.linkIdx_AR[i]].status
      //this.ZtObjectLink_AR[objx.linkIdx_AR[i]].timestamp
      //this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkValue

    }  // endfor loop through linkIdx_AR
    
}  // endfor loop through resp_item_for_stat_vals_obj_AR

if(this.single_object_idx == ""){   // 20231017
  this.addSourceValuesToStatisticalValuesBuckets();
}              
else
{
  //this.addTypeValuesForSingleObject();
  this.getSourceObjectTypeValsForTypeDefPaths(this.single_object_idx);
}   // endif this.source_obj_single_code == ""   // 20231017
  

this.displayContents();

}  // end of getValues()


getValueFromSourceObject(obj_idx){

  var returnVal;
  var get_values_maxLevelsDown = 0;
  var base_ztic = this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim();
  var statusExclusion_AR = [];

  // find  template_def_idx_for_set_member
  //    get object kind of set member
  var sourceObjKindKeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+base_ztic+"_1_"+this.svr1.ZtObject_AR[obj_idx].kindZTIC+"_"+this.svr1.ZtObject_AR[obj_idx].kindCode;  
             ////        console.log("%20201111 sourceObjKindKeyStr: "+sourceObjKindKeyStr);
  var source_object_kind_idx = this.svr1.ZtObject_idx_HM.get(sourceObjKindKeyStr);
             ////        console.log("%20201111 set_member_object_kind_idx: "+ source_object_kind_idx);
  var sourceObjKindObj = this.svr1.ZtObject_AR[source_object_kind_idx];   
  var type_val_idx_for_template_of_source_object = sourceObjKindObj.getTypeValueIdxSingle(base_ztic, "22", this.svr1.time.now()); //default minimal templ 
        
  var templDefForSourceObjectKeyStr =     this.msg.TabNamePrfx.toString().trim() + "_"+
                                                base_ztic+"_2_"+
                                                this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_source_object].typeValue_ztic+"_"+  
                                                this.svr1.ZtObjectTypeValue_AR[type_val_idx_for_template_of_source_object].typeValue_code;    
        
              ////  console.log("%20210314 templDefForSetMbrKeyStr: "+templDefForSourceObjectKeyStr);
  var template_def_idx_for_source_obj = this.svr1.ZtObject_idx_HM.get(templDefForSourceObjectKeyStr);

  var resp_item_for_source_obj_AR = this.svr1.ZtObject_AR[obj_idx].getAllValuesForTemplateDef(template_def_idx_for_source_obj, this.msg, this.svr1.time.now(), statusExclusion_AR, get_values_maxLevelsDown ); 
  
  for (var l = 0; l < resp_item_for_source_obj_AR.length; l++) {

    var objx = resp_item_for_source_obj_AR[l];

    for (var i = 0; i < objx.objElemIdx_AR.length; i++) {
/////      //var oe_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_ztic);
      if(this.svr1.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_ztic == this.source_obj_elem_ztic && this.svr1.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_code == this.source_obj_elem_code){
         returnVal = this.svr1.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value
      }  // endif 
/////      //this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_ztic
/////      //this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].OE_code
/////      //this.ZtObjectElement_AR[objx.objElemIdx_AR[i]].value

    }  // endfor loop through objElemIdx_AR
  }  // endfor loop through resp_item_for_sourec_obj_AR

  

return returnVal;
}  // end of getValueFromSourceObject()



  addSourceValuesToStatisticalValuesBuckets(){
    //this.source_obj_set_ztic = "";
    //this.source_obj_set_code = "";
    //this.uom_ztic      = "";
    //this.uom_code      = "";
    //this.source_obj_elem_ztic = "";
    //this.source_obj_elem_code = "";
    //this.source_obj_idx_AR  = [];
    
    // NOTE: use sourece_obj_set_ztic and_code to load source_obj_idx_AR by finding set members
   // start copied for example 20230718
   ///var setKeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindZTIC.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindCode.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objZTIC.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objCode.toString().trim();
   ///console.log("%%% 20230406 setKeyStr: "+setKeyStr);
   ///var set_object_idx = this.svr1.ZtObject_idx_HM.get(setKeyStr);
   ///var msgSetObj = new (require('./ds2b00002_server_set'))( this.svr1, set_object_idx ); 
   ///this.queryResponseSetMemberAdd_forSet(queryResponseSet_idx, this.msg.queryResponseSetMemberWA_AR[i].setMemberID+":5:"+msgSetObj.setObj.objZTIC+"_"+msgSetObj.setObj.objCode, respTyp, msgSetObj.setObj.objZTIC, msgSetObj.setObj.objCode);  // moved above for loop 20201109 
   ///var setMember_AR = msgSetObj.getMember_AR(this.svr1.time.now());
   // end copied for example 20230718

   var base_ztic = this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim(); 
   var sv_wa = require('./ds2b00002_server_statistical_values_object_workarea');

    console.log("this.source_obj_set_ztic: "+this.source_obj_set_ztic);
    console.log("this.source_obj_set_code: "+this.source_obj_set_code);
    
    var setKeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+base_ztic+"_13_"+this.source_obj_set_ztic+"_"+this.source_obj_set_code;
    var set_object_idx = this.svr1.ZtObject_idx_HM.get(setKeyStr);
    var setObj = new (require('./ds2b00002_server_set'))( this.svr1, set_object_idx );
    this.source_obj_idx_AR = setObj.getMember_AR(this.svr1.time.now());

    console.log("*** 20230718f this.source_obj_idx_AR.length: "+this.source_obj_idx_AR.length);

    for (var i = 0; i < this.source_obj_idx_AR.length; i++) {
  

      //1. get the type values of the source object using the object index in this.source_obj_idx_AR[i]
      //2. get the object element value used for this statistical values object (matching this.source_obj_elem_ztic/code)
      //3. set currentTypeVal_ztic/code to 



      this.getSourceObjectTypeValsForTypeDefPaths(this.source_obj_idx_AR[i]);
      var source_value_for_object = this.getValueFromSourceObject(this.source_obj_idx_AR[i]);


      var allDimensionTypeValKeyStr = "";

      for (var j = 0; j < this.dimension_AR.length; j++) {
        
      

        for (var k = 0; k < this.dimension_AR[j].typeDefinitionAndValue_AR.length; k++) {

                  
          if(k == this.dimension_AR[j].type_def_idx_for_summarization){
            allDimensionTypeValKeyStr = allDimensionTypeValKeyStr + this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_val_kind_ztic.toString().trim()+"_"+this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_val_kind_code.toString().trim()+"_"+this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_val_ztic.toString().trim()+"_"+this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_val_code.toString().trim();
            
          }  // endif current idx is type_def_idx_for_summarization
      
        }  // endfor loop through typeDefinitionAndValue_AR


      } // endfor loop through dimension_AR



      var stat_value_idx;
      //see if allDimensionTypeValKeyStr is found in  this.stat_value_HM
      // if yes, get the index for this.stat_value_AR from this.stat_value_HM and add the current values to existing member of this.stat_value_AR
      // if no, push a new array member into this.stat_value_AR and add the current value to the new array member
      if(this.stat_value_HM.has(allDimensionTypeValKeyStr)){  
          stat_value_idx = this.stat_value_HM.get(allDimensionTypeValKeyStr);
          var num_str1 = this.stat_value_AR[stat_value_idx].statistical_value.toString();
          var num_str2 = source_value_for_object.toString();
          var num_sum = Number(num_str1) + Number(num_str2);
          //var num_sum = this.stat_value_AR[stat_value_idx].statistical_value.toString().parseInt() + source_value_for_object.toString().parseInt();
          //this.stat_value_AR[stat_value_idx].statistical_value = this.stat_value_AR[stat_value_idx].statistical_value + source_value_for_object;
          this.stat_value_AR[stat_value_idx].statistical_value = num_sum.toString().trim();
        }
        else
        {
         var sv_id = "1234";
         var new_stat_value = new sv_wa.StatisticalValue(sv_id);
            // add type definitions to new_stat_value REVISIT to complete
            for (var j = 0; j < this.dimension_AR.length; j++) {
              //for (var k = 0; k < this.dimension_AR[j].typeDefinitionAndValue_AR.length; k++) {                        
                //if(k == this.dimension_AR[j].type_def_idx_for_summarization){
                 // allDimensionTypeValKeyStr = allDimensionTypeValKeyStr + this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_val_kind_ztic.toString().trim()+"_"+this.dimension_AR[j].typeDefinition_AR[k].type_val_kind_code.toString().trim()+"_"+this.dimension_AR[j].typeDefinition_AR[k].type_val_ztic.toString().trim()+"_"+this.dimension_AR[j].typeDefinition_AR[k].type_val_code.toString().trim();
                //}  // endif current idx is type_def_idx_for_summarization
                var summ_type_def_idx = this.dimension_AR[j].type_def_idx_for_summarization;
                var type_def_ztic = this.dimension_AR[j].typeDefinitionAndValue_AR[summ_type_def_idx].type_def_ztic;
                var type_def_code = this.dimension_AR[j].typeDefinitionAndValue_AR[summ_type_def_idx].type_def_code;
                var new_type_def_and_val = new sv_wa.TypeDefinitionAndValue(type_def_ztic, type_def_code);
                new_type_def_and_val.type_val_kind_ztic = this.dimension_AR[j].typeDefinitionAndValue_AR[summ_type_def_idx].type_val_kind_ztic;
                new_type_def_and_val.type_val_kind_code = this.dimension_AR[j].typeDefinitionAndValue_AR[summ_type_def_idx].type_val_kind_code;
                new_type_def_and_val.type_val_ztic = this.dimension_AR[j].typeDefinitionAndValue_AR[summ_type_def_idx].type_val_ztic;
                new_type_def_and_val.type_val_code = this.dimension_AR[j].typeDefinitionAndValue_AR[summ_type_def_idx].type_val_code;
                new_type_def_and_val.type_val_label = this.dimension_AR[j].typeDefinitionAndValue_AR[summ_type_def_idx].type_val_label;
                new_type_def_and_val.type_val_sortStr = this.dimension_AR[j].typeDefinitionAndValue_AR[summ_type_def_idx].type_val_sortStr;
                new_stat_value.sv_typeDefAndValue_AR.push(new_type_def_and_val);
                new_stat_value.statistical_value = source_value_for_object;
              //}  // endfor loop through typeDefinitionAndValue_AR      
            } // endfor loop through dimension_AR
          // end add type definitions to new_stat_value
         stat_value_idx = this.stat_value_AR.push(new_stat_value) -1;
         this.stat_value_HM.set(allDimensionTypeValKeyStr, stat_value_idx); 
        }  // endif his.stat_value_HM.has(allDimensionTypeValKeyStr)



    }  // endfor loop through this.source_obj_idx_AR


}  // end of addSourceValuesToStatisticalValuesBuckets()

// start 20231017
///addTypeValuesForSingleObject(){

///  this.getSourceObjectTypeValsForTypeDefPaths(this.single_object_idx);

///}  //  addTypeValuesForSingleObject()
// end 20231017


  addStatisticalValuesToResponseMessage(){
//  var stat_values_obj_KeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindZTIC.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].kindCode.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objZTIC.toString().trim()+"_"+this.msg.queryResponseSetMemberWA_AR[i].objectResponseItem_AR[j].objCode.toString().trim();
   this.getValues();
   this.addStatisticalValuesSegmentsToMessage();
  }  // end of addStatisticalValuesToResponseMessage()



  getSourceObjectTypeValsForTypeDefPaths(start_object_idxx){

    // start copied for example
    //var templateKeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+this.msg.serverZTICDom.getCodeForNS("131131/21").toString().trim() + "_2_" + this.msg.querySetMemberWA_AR[i].objectTemplateZTIC.toString().trim() +"_" + this.msg.querySetMemberWA_AR[i].objectTemplateCode.toString().trim();
    //      var template_def_idx = this.svr1.ZtObject_idx_HM.get(templateKeyStr);                                
    //      var template_def_obj = this.svr1.ZtObject_AR[template_def_idx];                                      
    //      var obj_kind_idx = template_def_obj.getTypeValueIdxForTypeDef(base_ztic, "3", this.svr1.time.now()); 
    //      var obj_kind_obj = this.svr1.ZtObject_AR[obj_kind_idx];                                              
    //      var obj_kind_objZTIC = obj_kind_obj.objZTIC;                                                         
    //      var obj_kind_objCode = obj_kind_obj.objCode; 
    // end copied for example

    var type_val_obj_idx;
    var type_val_obj;
    var current_obj_idx;
    console.log("*** 20230721a start_object_idxx: "+start_object_idxx);
    for (var j = 0; j < this.dimension_AR.length; j++) {
      console.log("*** 20230719 j: "+j);
      current_obj_idx = start_object_idxx;
      for (var k = 0; k < this.dimension_AR[j].typeDefinitionAndValue_AR.length; k++) {
        console.log("*** 20230719 k: "+k);
 
        //if(k == 0){
          //this.dimension_AR[j].typeDefinitionAndValue_AR[k].obj_idx = start_object_idxx;
          //var start_object = this.svr1.ZtObject_AR[start_object_idxx];
          var current_object = this.svr1.ZtObject_AR[current_obj_idx];
          console.log("20230723b current_obj_idx: "+current_obj_idx);
          //console.log("20230719  this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic: "+ this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic);
          //console.log("20230719  this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code: "+ this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code);
          //type_val_obj_idx = start_object.getTypeValueIdxForTypeDef(this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic, this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code, this.svr1.time.now()); 
          type_val_obj_idx = current_object.getTypeValueIdxForTypeDef(this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic, this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code, this.svr1.time.now()); 
          console.log("20230723 type_val_obj_idx: "+type_val_obj_idx);
          //console.log("20230723 this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic - this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code: "+this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic+" - "+this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code);
          type_val_obj     = this.svr1.ZtObject_AR[type_val_obj_idx];
        //}
        //else
        //{
        //  var prev_type_def_idx = k - 1;  // previous type def index
        //  var typeValKeyStr = this.msg.TabNamePrfx.toString().trim()+"_"+this.dimension_AR[j].typeDefinitionAndValue_AR[prev_type_def_idx].type_val_kind_ztic.toString().trim() + "_"+this.dimension_AR[j].typeDefinitionAndValue_AR[prev_type_def_idx].type_val_kind_code+"_" + this.dimension_AR[j].typeDefinitionAndValue_AR[prev_type_def_idx].type_val_ztic.toString().trim() +"_" + this.dimension_AR[j].typeDefinitionAndValue_AR[prev_type_def_idx].type_val_code.toString().trim();
          //console.log("20230721b typeValKeyStr: "+typeValKeyStr);
        //  type_val_obj_idx = this.svr1.ZtObject_idx_HM.get(typeValKeyStr);                                
        //  type_val_obj = this.svr1.ZtObject_AR[type_val_obj_idx];
        //}  // endif
        this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_val_kind_ztic = type_val_obj.kindZTIC;
        this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_val_kind_code = type_val_obj.kindCode;
        this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_val_ztic = type_val_obj.objZTIC;
        this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_val_code = type_val_obj.objCode;
        console.log("20230723 type_val_obj.objZTIC - type_val_obj.objCode: "+ type_val_obj.objZTIC+" - "+type_val_obj.objCode);
        current_obj_idx = type_val_obj_idx;
    
      }  // endfor loop through typeDefinitionAndValue_AR
      console.log("20230721c type_val_obj.objZTIC: "+type_val_obj.objZTIC);
      console.log("20230721c type_val_obj.objCode: "+type_val_obj.objCode);

    } // endfor loop through dimension_AR


  }  // end of getSourceObjectTypeValsForTypeDefPaths()


parseParameterStringToArray(param_str){


}  // end of parseParameterStringToArray



displayContents(){
  console.log("displayContents of Statistical Values Object:");
  console.log(" ");
  console.log("this.sv_obj_ztic: "+this.sv_obj_ztic);
  console.log("this.sv_obj_code: "+this.sv_obj_code);
  //this.dimension_AR = [];
  //this.stat_value_AR = [];
  //this.stat_value_HM = new HashMap();
  //this.group_AR = [];
  for (var j = 0; j < this.dimension_AR.length; j++) {

    console.log("*** 20230718 this.dimension_AR[j].type_def_idx_for_summarization: "+ this.dimension_AR[j].type_def_idx_for_summarization);
    console.log("*** 20230718 this.dimension_AR[j].type_def_path_ztic: "+ this.dimension_AR[j].type_def_path_ztic);
    console.log("*** 20230718 this.dimension_AR[j].type_def_path_code: "+ this.dimension_AR[j].type_def_path_code);
        
    for (var k = 0; k < this.dimension_AR[j].typeDefinitionAndValue_AR.length; k++) {

       console.log("this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic " + this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_ztic );
       console.log("this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code " + this.dimension_AR[j].typeDefinitionAndValue_AR[k].type_def_code );
       console.log("this.dimension_AR[j].typeDefinitionAndValue_AR[k].sortStr " + this.dimension_AR[j].typeDefinitionAndValue_AR[k].sortStr );
    
     // for (var l = 0; l < this.stat_value_AR.length; l++) {

     // } // endfor loop through stat_value_AR  

    } // endfor loop through typeDefinitionAndValue_AR  

  } // endfor loop through dimension_AR


  console.log("20230721 List Statistical Values");
  for (var j = 0; j < this.stat_value_AR.length; j++) {

    console.log(this.stat_value_AR[j].statistical_value);
    console.log("this.stat_value_AR[j].sv_typeDefAndValue_AR.length: "+this.stat_value_AR[j].sv_typeDefAndValue_AR.length);
    for (var k = 0; k < this.stat_value_AR[j].sv_typeDefAndValue_AR.length; k++) {
       console.log("this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_ztic: "+ this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_ztic);
       console.log("this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_code: "+ this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_code);
    }  // endfor loop through sv_typeDefAndValue_AR    


  } // endfor loop through stat_value_AR  


}  // end of displayContents()


addStatisticalValuesSegmentsToMessage(parent_msg_idxx, start_msg_idxx ){



  // start copied for example
  //for (var i = 0; i < objx.linkIdx_AR.length; i++) {
  //  if(i == 0) {msgRow_resp =  new MessageRow(resp_next_index, this.msg.parentIndexWA2, "5001","2","4160","");
  //              this.msg.DsMessageResponse_Array.push(msgRow_resp);
  //              elemSetIdx = resp_next_index;
  //              resp_next_index++;}

  //    msgRow_resp =  new MessageRow(resp_next_index, elemSetIdx, "5001","2","4161","");
  //    this.msg.DsMessageResponse_Array.push(msgRow_resp);
  //    var linkIdx = resp_next_index;
  //    resp_next_index++;

  //    //console.log("objx.linkIdx_AR.length/value: "+objx.linkIdx_AR.length+"-"+objx.linkIdx_AR[i]);
  //    //console.log("this.ZtObjectLink_AR.length: "+this.ZtObjectLink_AR.length);
  //    //console.log("this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic: "+this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic);

  //    var link_type_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.ZtObjectLink_AR[objx.linkIdx_AR[i]].linkType_ztic);
  //    msgRow_resp =  new MessageRow(resp_next_index, linkIdx, "5001","2","4162", link_type_msg_ztic);
  //    this.msg.DsMessageResponse_Array.push(msgRow_resp);
  //    //elemIdx = resp_next_index;
  //    resp_next_index++;

  // end copied for example

  var statisticalValuesObjectMsgIdx;
  var dimensionIdx;
  var dimensionSetIdx;
  var typeDefPathIdx;
  var typeDefSetIdx;
  var typeDefSetMemberIdx;
  var statisticalValueSetIdx;
  var statisticalValueSetMemberIdx;
  var statisticalValueTypeValueSetIdx;
  var statisticalValueTypeValueSetMemberIdx;
  var resp_next_index = this.msg.lastRawMsgIndex +1;
  var msgRow_resp;

  msgRow_resp =  new MessageRow(resp_next_index, this.msg.statisticalObjectsParentIndex, "5001","2","4181","");
  this.msg.DsMessageResponse_Array.push(msgRow_resp);
  statisticalValuesObjectMsgIdx = resp_next_index;
  resp_next_index++;

  // NOTE convert to client ztic???

  var sv_obj_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.sv_obj_ztic);
  //msgRow_resp =  new MessageRow(resp_next_index, statisticalValuesObjectMsgIdx, "5001","2","41810",this.sv_obj_ztic);  (del) 20230816
  msgRow_resp =  new MessageRow(resp_next_index, statisticalValuesObjectMsgIdx, "5001","2","41810", sv_obj_msg_ztic);  // 20230816
  this.msg.DsMessageResponse_Array.push(msgRow_resp);
  resp_next_index++;

  msgRow_resp =  new MessageRow(resp_next_index, statisticalValuesObjectMsgIdx, "5001","2","41811",this.sv_obj_code);
  this.msg.DsMessageResponse_Array.push(msgRow_resp);
  resp_next_index++;

  var source_obj_elem_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.source_obj_elem_ztic);
  //msgRow_resp =  new MessageRow(resp_next_index, statisticalValuesObjectMsgIdx, "5001","2","41820",this.source_obj_elem_ztic); (del) 20230816
  msgRow_resp =  new MessageRow(resp_next_index, statisticalValuesObjectMsgIdx, "5001","2","41820",source_obj_elem_msg_ztic);
  this.msg.DsMessageResponse_Array.push(msgRow_resp);
  resp_next_index++;
  
  msgRow_resp =  new MessageRow(resp_next_index, statisticalValuesObjectMsgIdx, "5001","2","41821",this.source_obj_elem_code);
  this.msg.DsMessageResponse_Array.push(msgRow_resp);
  resp_next_index++;




  for (var i = 0; i < this.dimension_AR.length; i++) {

    if(i == 0){
      msgRow_resp =  new MessageRow(resp_next_index, statisticalValuesObjectMsgIdx, "5001","2","4183","DimensionSet")
      this.msg.DsMessageResponse_Array.push(msgRow_resp);
      dimensionSetIdx = resp_next_index;
      resp_next_index++;
    }  // endif i == 0
    //this.sv_dimension_ztic = sv_dimension_zticx;
    //this.sv_dimension_code = sv_dimension_codex;
    //this.sv_dimension_label = "";
    //this.type_def_idx_for_summarization = 0;
    //this.type_def_idx_for_grouping = 0;
    //this.type_def_idx_for_grouping2 = 0;
    //this.type_def_path_ztic = "";
    //this.type_def_path_code = "";
    
    //this.typeDefinitionAndValue_AR = [];

    msgRow_resp =  new MessageRow(resp_next_index, dimensionSetIdx, "5001","2","41830","DimensionSetMember");
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    dimensionIdx = resp_next_index;  // 20230803
    resp_next_index++;

    var sv_dimension_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.dimension_AR[i].sv_dimension_ztic);  // 20230816
    //msgRow_resp =  new MessageRow(resp_next_index, dimensionIdx, "5001","2","41831",this.dimension_AR[i].sv_dimension_ztic);  (del) 20230816
    msgRow_resp =  new MessageRow(resp_next_index, dimensionIdx, "5001","2","41831",sv_dimension_msg_ztic);  // 20230816
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    resp_next_index++;

    msgRow_resp =  new MessageRow(resp_next_index, dimensionIdx, "5001","2","41832",this.dimension_AR[i].sv_dimension_code);
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    resp_next_index++;

    msgRow_resp =  new MessageRow(resp_next_index, dimensionIdx, "5001","2","41833",this.dimension_AR[i].sv_dimension_label);
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    resp_next_index++;

    msgRow_resp =  new MessageRow(resp_next_index, dimensionIdx, "5001","2","41834",this.dimension_AR[i].type_def_idx_for_summarization);
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    resp_next_index++;

    msgRow_resp =  new MessageRow(resp_next_index, dimensionIdx, "5001","2","41835",this.dimension_AR[i].type_def_idx_for_grouping);
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    resp_next_index++;

    msgRow_resp =  new MessageRow(resp_next_index, dimensionIdx, "5001","2","41836",this.dimension_AR[i].type_def_idx_for_grouping2);
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    resp_next_index++;

    msgRow_resp =  new MessageRow(resp_next_index, dimensionIdx, "5001","2","4184","TypeDefinitionPath");
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    typeDefPathIdx = resp_next_index;
    resp_next_index++;

    var type_def_path_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.dimension_AR[i].type_def_path_ztic);  // 20230816
   // msgRow_resp =  new MessageRow(resp_next_index, typeDefPathIdx, "5001","2","41840",this.dimension_AR[i].type_def_path_ztic);  (del) 20230816
    msgRow_resp =  new MessageRow(resp_next_index, typeDefPathIdx, "5001","2","41840",type_def_path_msg_ztic);  // 20230816
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    resp_next_index++;

    msgRow_resp =  new MessageRow(resp_next_index, typeDefPathIdx, "5001","2","41841",this.dimension_AR[i].type_def_path_code);
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    resp_next_index++;

    msgRow_resp =  new MessageRow(resp_next_index, typeDefPathIdx, "5001","2","41842","TypeDefinitionSet");
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    typeDefSetIdx = resp_next_index;
    resp_next_index++;


      for (var j = 0; j < this.dimension_AR[i].typeDefinitionAndValue_AR.length; j++) {
        msgRow_resp =  new MessageRow(resp_next_index, typeDefSetIdx, "5001","2","41843","TypeDefinitionPath");
        this.msg.DsMessageResponse_Array.push(msgRow_resp);
        typeDefSetMemberIdx = resp_next_index;
        resp_next_index++;

        //exports.TypeDefinitionAndValue = function(type_def_zticx, type_def_codex) {
        //  this.type_def_ztic = type_def_zticx;
        //  this.type_def_code = type_def_codex;
        //  this.sortStr = "";
        //  this.type_def_label = "";
        //  this.obj_idx = 0;
        //  this.type_val_kind_ztic = "";
        //  this.type_val_kind_code = "";
        //  this.type_val_ztic = "";
        //  this.type_val_code = "";
        //  this.type_val_label = "";
        //  this.type_val_sortStr = "";


          var type_def_msg_ztic = this.msg.getMsgZTICForServerZTIC(this.svr1, this.dimension_AR[i].typeDefinitionAndValue_AR[j].type_def_ztic);  // 20230816
          //msgRow_resp =  new MessageRow(resp_next_index, typeDefSetMemberIdx, "5001","2","41844", this.dimension_AR[i].typeDefinitionAndValue_AR.type_def_ztic);  (del) 20230816
          msgRow_resp =  new MessageRow(resp_next_index, typeDefSetMemberIdx, "5001","2","41844", type_def_msg_ztic); // 20230816
          this.msg.DsMessageResponse_Array.push(msgRow_resp);
          resp_next_index++;

          msgRow_resp =  new MessageRow(resp_next_index, typeDefSetMemberIdx, "5001","2","41845", this.dimension_AR[i].typeDefinitionAndValue_AR[j].type_def_code);
          this.msg.DsMessageResponse_Array.push(msgRow_resp);
          resp_next_index++;

          //msgRow_resp =  new MessageRow(resp_next_index, typeDefSetMemberIdx, "5001","2","41846", this.dimension_AR[i].typeDefinitionAndValue_AR.obj_idx);
          //this.msg.DsMessageResponse_Array.push(msgRow_resp);
          //resp_next_index++;


      } // endfor loop through typeDefinitionAndValue_AR


  }  // endfor loop through dimension_AR  

 // this.msg.lastRawMsgIndex = resp_next_index - 1;
  //resp_next_index++;

  //constructor(svr1x, msgx, sv_object_zticx, sv_object_codex) {
  //  var HashMap = require('hashmap');
  //  this.svr1 = svr1x;
  //  this.msg  = msgx;
  //  this.sv_obj_ztic = sv_object_zticx;
  //  this.sv_obj_code = sv_object_codex;
  //  this.sv_obj_idx = "";
  //  this.statistic_type_ztic = "";
  //  this.statistic_type_code = "";  // sum, count, mean, median, mode, standard deviation
  //  this.source_obj_set_ztic = "";
  //  this.source_obj_set_code = "";
  //  this.uom_ztic      = "";
  //  this.uom_code      = "";
  //  this.source_obj_elem_ztic = "";
  //  this.source_obj_elem_code = "";
  //  this.source_obj_idx_AR  = [];
  //  this.dimension_AR = [];
  //  this.stat_value_AR = [];
  //  this.stat_value_HM = new HashMap();
  //  this.group_AR = [];

    //ELEM 2    9    2    32   2    9    2    9         Type Definition: Statistic Type for a Statistical Values Object (sum, count, mode, mean, std deviation)
    //ELEM 2    9    2    33   2    9    2    9         Type Definition: Object Set for a Statistical Values Object
    //ELEM 2    9    2    34   2    9    2    9         Type Definition: Type Definition Path for a Statistical Values Dimension
    //ELEM 2    9    2    35   2    9    2    9         Type Definition: Unit of Measure for a Statistical Values Object
    //ELEM 2    9    2    36   2    9    2    9         Type Definition: Unit of Measure Dimension for a Unit of Measure
    //ELEM 2    9    2    37   2    9    2    9         Type Definition: Object Element for a Statistical Values Object for source of data

    //ELEM 2    10   2    26   2    10   2    10        Link Type: Statistical Values Object to Statistical Values Dimension
    //ELEM 2    10   2    27   2    10   2    10        Link Type: Type Definition Path to Type Definition 

    // 4180 StatisticalValueSet
    //  4181--StatisticalValuesObject  (set member)									
    //      41810--StatisticalValuesObjectZTIC								
    //      41811--StatisticalValuesObjectCode
    //      41812--StatisticTypeZTIC								
    //      41813--StatisticTypeCode (1=sum, 2=count, 3=mean, 4=median, 5=mode, 6=standard deviation)	
    //      41814--SourceSetZTIC
    //      41815--SourceSetCode
    //      41816--UomZTIC						
    //      41817--UomCode
    //      41820--SourceObjectElementZTIC
    //      41821--SourceObjectElementCode
    //      41822--StatisticalValuesObjectLabel														
    //      4183--DimensionSet								
    //          41830--DimensionSetMember							
    //              41831--DimensionZTIC						
    //              41832--DimensionCode	
    //              41833--DimensionLabel					
    //              41834--IndexOfTypeDefinitionPathForDataSummarization i.e. account for financial posting
    //              41835--IndexOfTypeDefinitionPathForGrouping	i.e. account category for financial posting, income, expense	
    //              41836--IndexOfTypeDefinitionPathForGrouping2								
    //              4184--TypeDefinitionPath
    //                  41840--PathZTIC
    //                  41841--PathCode
    //                  41842--TypeDefinitionSet
    //                      41843--TypeDefinitionSetMember
    //                          41844--TypeDefinitionZTIC
    //                          41845--TypeDefinitionCode
    //                          41846--IndexInPath						
                                      
    //      4185--StatisticalValueSet								
    //          41850--StatisticalValueSetMember							
    //              41851--StatisticalValueMemberID						
    //              41852--StatisticalValue						
    //              4186--StatisticalValueTypeValueSet						
    //                  41860--StatisticalValueTypeValueSetMember				
  
    //                      41861--TypeDefinitionZTIC
    //                      41862--TypeDefinitionCode		
    //                      41863--TypeValueZTIC			
    //                      41864--TypeValueCode	
    //                      41865--SortKey		
    //                  	  41866--TypeValueForSummarizationLabel
    //                      41867--GroupCode
    //                      41868--GroupCode2
    //
    //      4187--GroupSet
    //           41870--GroupSetMember
    //               41871--GroupCode
    //               41872--GroupLabel
    //               41873--DimensionZTIC
    //               41874--DimensionCode
    //               41875--IndexInTypeDefinitionPath
    //               41876--TypeValueZTIC   
    //               41877--TypeValueCode
    





  for (var j = 0; j < this.stat_value_AR.length; j++) {
    if(j == 0){
      msgRow_resp =  new MessageRow(resp_next_index, statisticalValuesObjectMsgIdx, "5001","2","4185","StatisticalValueSet")
      this.msg.DsMessageResponse_Array.push(msgRow_resp);
      statisticalValueSetIdx = resp_next_index;
      resp_next_index++;
    }  // endif j == 0

    msgRow_resp =  new MessageRow(resp_next_index, statisticalValueSetIdx, "5001","2","41850","StatisticalValueSetMember")
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    statisticalValueSetMemberIdx = resp_next_index;
    resp_next_index++;

    //exports.StatisticalValue = function(idx) {

    //  this.sv_id              = idx;
    //  this.statistical_value  = "";
    //  this.sv_typeDefAndValue_AR       = [];

    msgRow_resp =  new MessageRow(resp_next_index, statisticalValueSetMemberIdx, "5001","2","41851",this.stat_value_AR[j].sv_id);
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    resp_next_index++;

    msgRow_resp =  new MessageRow(resp_next_index, statisticalValueSetMemberIdx, "5001","2","41852",this.stat_value_AR[j].statistical_value);
    this.msg.DsMessageResponse_Array.push(msgRow_resp);
    resp_next_index++;


  //  console.log(this.stat_value_AR[j].statistical_value);
  //  console.log("this.stat_value_AR[j].sv_typeDefAndValue_AR.length: "+this.stat_value_AR[j].sv_typeDefAndValue_AR.length);
       for (var k = 0; k < this.stat_value_AR[j].sv_typeDefAndValue_AR.length; k++) {
          if(k == 0){
            msgRow_resp =  new MessageRow(resp_next_index, statisticalValueSetMemberIdx, "5001","2","4186","StatisticalValueTypeValueSet");
            this.msg.DsMessageResponse_Array.push(msgRow_resp);
            statisticalValueTypeValueSetIdx = resp_next_index;
            resp_next_index++;
          }  // endif k == 0

          msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetIdx, "5001","2","41860","StatisticalValueTypeValueSetMember");
          this.msg.DsMessageResponse_Array.push(msgRow_resp);
          statisticalValueTypeValueSetMemberIdx = resp_next_index;
          resp_next_index++;

          //exports.StatisticalValueTypeValue = function() {

          //  this.type_def_ztic = "";
          //  this.type_def_code = "";
          //  this.type_val_ztic = "";
          //  this.type_val_code = "";
          //  this.sort_key = "";
          //  this.type_val_for_summarization_label = "";
          //  this.group_code = "";
          //  this.group_code2 = "";

          /////msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetMemberIdx, "5001","2","41865",this.stat_value_AR[j].sv_typeDefAndValue_AR[k].sort_key);
          /////this.msg.DsMessageResponse_Array.push(msgRow_resp);
          /////resp_next_index++;

          var type_def_msg_ztic2 = this.msg.getMsgZTICForServerZTIC(this.svr1, this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_def_ztic);  // 20230816
          //msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetMemberIdx, "5001","2","41861",this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_def_ztic);  (del) 20230816
          msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetMemberIdx, "5001","2","41861",type_def_msg_ztic2);  // 20230816
          this.msg.DsMessageResponse_Array.push(msgRow_resp);
          resp_next_index++;

          msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetMemberIdx, "5001","2","41862",this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_def_code);
          this.msg.DsMessageResponse_Array.push(msgRow_resp);
          resp_next_index++;

          var type_val_msg_ztic2 = this.msg.getMsgZTICForServerZTIC(this.svr1, this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_ztic);  // 20230816
          //msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetMemberIdx, "5001","2","41863",this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_ztic); (del) 20230816
          msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetMemberIdx, "5001","2","41863",type_val_msg_ztic2);  // 20230816
          this.msg.DsMessageResponse_Array.push(msgRow_resp);
          resp_next_index++;

          msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetMemberIdx, "5001","2","41864",this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_code);
          this.msg.DsMessageResponse_Array.push(msgRow_resp);
          resp_next_index++;

          /////msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetMemberIdx, "5001","2","41865",this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_for_summarization_label);
          /////this.msg.DsMessageResponse_Array.push(msgRow_resp);
          /////resp_next_index++;

          /////msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetMemberIdx, "5001","2","41867",this.stat_value_AR[j].sv_typeDefAndValue_AR[k].group_code);
          /////this.msg.DsMessageResponse_Array.push(msgRow_resp);
          /////resp_next_index++;

          /////msgRow_resp =  new MessageRow(resp_next_index, statisticalValueTypeValueSetMemberIdx, "5001","2","41868",this.stat_value_AR[j].sv_typeDefAndValue_AR[k].group_code2);
          ////this.msg.DsMessageResponse_Array.push(msgRow_resp);
          ////resp_next_index++;

  //     console.log("this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_ztic: "+ this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_ztic);
  //     console.log("this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_code: "+ this.stat_value_AR[j].sv_typeDefAndValue_AR[k].type_val_code);
      }  // endfor loop through sv_typeDefAndValue_AR    


  } // endfor loop through stat_value_AR 


  this.msg.lastRawMsgIndex = resp_next_index - 1;

}  // end of addStatisticalValuesSegmentsToMessage()


}  // end of class


// start 20230725
function MessageRow(index, parent_index, priority, me_ztic, me_code, data) {
  this.index        = index;
  this.parent_index = parent_index;
  this.priority     = priority;
  this.me_ztic      = me_ztic;
  this.me_code      = me_code;
  this.data         = data;
 
}
// end 20230725


//module.exports = DsWorkflowDomain;
module.exports = ZtStatisticalValuesObject;
