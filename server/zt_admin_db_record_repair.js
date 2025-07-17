





var Client = require('node-rest-client').Client;


//32 --All Table name prefix
//1  --All Object Kind DS Instance Code 
//2  --All Object Kind Code
//3  --All Code DS Instance Code
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


//var svrx =  new (require('./ds2b_server')());

var TabNamePrfx = "TST1";

var client = new Client();
//var base_ztic = svrx.getCodeForNS(TabNamePrfx, "131131/21");   // 20200918
//var abc_com_test1_ztic =     svrx.getCodeForNS(TabNamePrfx, "abc.com/test1"); 
//var ds_com_address_ztic =     svrx.getCodeForNS(TabNamePrfx, "zinfinitree.com/address");
                                   


     // var send_time = svrx.time.now();

      var args = {
 data: { te_2_32: "DOC1",         // db zt instance id
         te_2_1: "9",  // object kind ztic  address ztic
         te_2_2: "2",                  // object kind code
         te_2_3: "1",   // object ztic tst1 ztic
         te_2_4: "303",                 // object code
         //te_2_5: "2",
         te_2_6: "4",
         te_2_7: "9",  // object element ztic
         te_2_8: "5",                // object element code for next code in code range
         te_2_17: "9",
         te_2_18: "3",
         te_2_19: "10",
         te_2_20: "1",
         te_2_21: "1",
         te_2_22: "1022",
         te_2_23: "",
         te_2_24: "",
         te_2_25: "2",
         te_2_30: "",
         te_2_26: "212506044002.5537",  // timestamp
         te_2_31: "xxx" },
        headers: { "Content-Type": "application/json" }
};
/////client.post("http://localhost:5001/ZtObjectDbRec/insert", args, function (data, response) {
///// // client.post("http://localhost:5001/ZtObjectDbRec/update_oe_value", args, function (data, response) {
/////   // parsed response body as js object 
/////   //console.log(data);    //(del) 20210521
  
/////});  //end post



//app.post('/ZtObjectDbRec/:id/remove', function(req, res, next) {


client.post("http://localhost:5001/ZtObjectDbRec/61b6d7b3c2d4476415d7edee/remove", function (data, response) {
///// // client.post("http://localhost:5001/ZtObjectDbRec/update_oe_value", args, function (data, response) {
/////   // parsed response body as js object 
/////   //console.log(data);    //(del) 20210521
  
});  //end post



