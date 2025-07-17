// program to create storage domain, storage location and a link from the storage domain to the storage location by passing message in record format




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
rec_AR.push("ELEM 8    1    1    1    8    3    3    1    +    Storage Domain #100 Title");
rec_AR.push("ELEM 8    1    1    1    8    2    3    1    +    Storage Domain #100 Long Desc");
rec_AR.push("ELEM 8    1    1    1    8    1    3    1    +    Storage domain #100 desc");
rec_AR.push("LINK 8    1    1    1    8    1    8    2    1    2    8    2    +    +         212333444555.000");         
rec_AR.push("ELEM 8    2    1    2    8    5    3    1    +    ");
rec_AR.push("ELEM 8    2    1    2    8    4    3    1    +    Storage Location   #100  desc");




var client_call  = new (require('./zt_client_call_to_client'))(urlx, rec_AR);


client_call.processRecordFormatMessage();










