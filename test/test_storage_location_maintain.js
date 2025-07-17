// program to maintain storage location and creating a link from the storage location to a newly created storage location by passing message in record format




var rec_AR = [];
var urlx = "http://localhost:3000/zt/process_record_format_message";



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
rec_AR.push("MPPG 212452105734.48962  id123               1234      1    usr1                9        1    ");    
rec_AR.push("EXTK 2    2    2    1    ");
rec_AR.push("MSET MaintainSetId#1                         212505233012.7552");
rec_AR.push("MSET MaintainSetId#1                         212506655371.4592");
rec_AR.push("ELEM 8    2    1    2026 8    5    3    1    -");
rec_AR.push("ELEM 8    2    1    2026 8    4    3    1    -    Storage Location   #26  desc");
rec_AR.push("LINK 8    2    1    2026 8    2    8    2    1    2028 8    2    -    +         21233");
rec_AR.push("LINK 8    2    1    2026 8    2    8    2    1    2028 8    2    -    +         21233");
rec_AR.push("ELEM 8    2    1    2028 8    5    3    1    +");
rec_AR.push("ELEM 8    2    1    2028 8    4    3    1    +    Storage Location #29 Desc");




var client_call  = new (require('./zt_client_call_to_client_v2'))(urlx, rec_AR);


client_call.processRecordFormatMessage();










