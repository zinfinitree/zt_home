// program to query storage domain in record format




var rec_AR = [];
//var urlx = "http://localhost:3000/ds2/process_record_format_message";

var urlx = "http://<ZT_CLIENT_IP>:3000/zt/process_record_format_message";



rec_AR.push("ZTIC 1    abc.com/test1");
rec_AR.push("ZTIC 2    131131/21");
rec_AR.push("ZTIC 3    zinfinitree.com/address");
rec_AR.push("ZTIC 4    zinfinitree.com/document");
rec_AR.push("ZTIC 5    zinfinitree.com/spreadsheet");
rec_AR.push("ZTIC 6    zinfinitree.com/multimedia_object");
rec_AR.push("ZTIC 7    zinfinitree.com/message");
rec_AR.push("ZTIC 8    zinfinitree.com/storage");
rec_AR.push("ZTIC 9    zinfinitree.com/server_config");
rec_AR.push("ZTIC 10   zinfinitree.com/address_app_data");
rec_AR.push("RZTI 1");
rec_AR.push("MPPG 212452105734.48962  id123               1234      1    usr1                9    2");
rec_AR.push("EXTK 2    2    2    1");
rec_AR.push("QSET 2    2    1    +    ObjTmplQset");
rec_AR.push("QSLS 10   0    1");
rec_AR.push("QOSS 1lev 1usg");
rec_AR.push("QOBJ 2    2    8    1");
rec_AR.push("QSET 8    1    1    +    ObjectQset");
rec_AR.push("QSLS 20   0    1");
rec_AR.push("QOSS 1lev 1usg");
rec_AR.push("QOBJ 12345123451    1012");




var client_call  = new (require('./zt_client_call_to_client_v2'))(urlx, rec_AR);


client_call.processRecordFormatMessage();










