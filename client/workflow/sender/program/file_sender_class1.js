class FileSender {


    constructor(message_file_pathx, workflowDefx, workflowx, sender_idx) {
      this.message_file_path = message_file_pathx;
      this.workflowDef       = workflowDefx;
      this.workflow          = workflowx;
      this.sender_idx        = sender_idx;
    
  } // end of constructor




getMessage(){

var fs = require('fs');

var msg = "abc123";

console.log("this.message_file in getMessage(): "+this.message_file_path);
   
  var message_path = "."+this.message_file_path;

  var   fileContents = fs.readFileSync(message_path);
  //var lines = fileContents.toString().split('\n');

return fileContents;

}




} // end of class FileSender




module.exports = FileSender;
