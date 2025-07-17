function Validation2() {
    this.txt2   = "validation2 text";

  }



Validation2.prototype.process = function() {

console.log("running validation2: "+this.txt2);


}  // end of Validation2






module.exports = Validation2;
