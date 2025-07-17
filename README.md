ZinfiniTree is a Node js application that can be run in a Docker Container or directly on local machine.
ZinfiniTree requires MongoDB which can accessed in the cloud i.e. Atlas MongoDB Database or through a locally installed MongoDB instance. 

If running in a Docker Container: 
1.  Download/clone zt_home from GitHub
2.  Edit the DB_URL docker-compose.yml file in zt_home with your connection string where is says ...ADD YOUR MONGO DB URL HERE...
3.  Delete previous Containers and Images related to zt_home (if any)
4.  Open a terminal window, go to zt_home directory and enter command: "docker compose up"
5.  After zt_server and zt_client are running in Docker, open webpage http://localhost:3000/zt/file_import is a browser
6.  Continue to step 7

If running directly on local machine
1.  Download/clone zt_home from GitHub
2.  Make sure MongoDB is installed and running locally as a service
3.  Edit zt_home/server/.env DB_URL=mongodb://localhost/your database name, changing to actual value your database name
4.  Open a terminal window, navigate to zt_home/server directory and enter command: node zt_server
5.  Open a second terminal window, navigate to zt_home/client directory and enter command: node zt_client
6.  Open webpage http://localhost:3000/zt/file_import is a browser and continue to step 7



Additional steps for both options:
7.  On the webpage, select a target namespace, i.e. TST1, select operation: "import selected list of files", select File Format: Record Format
8.  Select file:  RecFormatFileList--zt_file_list_init_base_objects_rec_format.txt and click Submit
9.  Select file:  RecFormatFileList--zt_file_list_software_rec_format.txt and click Submit
10. Select file:  RecFormatFileList--zt_file_list_apps_rec_format and click Submit
11. Open a browser session and enter address: http://localhost:3000 to use the application and access documentation
12. To clear a database use http://localhost:5001/zt/admin_console
13. Select a target ZT Instance ie. TST1, select operation: Clear (Delete) ZT Instance, select Source DB: MongoDB
14. Select Object Kind: *. All Kinds, select Object Source ZT Instance, *. All Instances, Code From: 1, Code to 99999, ObjElem Value *, Max Recs 1000 and click Submit
15. Keep deleting records until instance is clean.  If deletion gets stuck, restart the server in the terminal window by entering Cntl C, then node zt_server
