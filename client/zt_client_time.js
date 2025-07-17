//  Copyright 2025 Zinfinitem LLC

//# Licensed under the Apache License, Version 2.0 (the "License");
//# you may not use this file except in compliance with the License.
//# You may obtain a copy of the License at
//#
//# http://www.apache.org/licenses/LICENSE-2.0
//#
//# Unless required by applicable law or agreed to in writing, software
//# distributed under the License is distributed on an "AS IS" BASIS,
//# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//# See the License for the specific language governing permissions and
//# limitations under the License.



class ZtTime {


    constructor() {

      //this.svr1    = svr1x;
     
    
   
  } // end of constructor

 now() {
   var timeNow = 0;




var JulianDate = require('julian-date');
 
//var j = new Julian();

/////var j = require('julian');
 
//// // Get the julian date
////j.julian(); // 2457088.5
 
//// // Get the javascript date
////j.getDate(); // Fri Mar 06 2015 19:00:00 GMT-0500 (EST)
 
 
//// // Get the julian days
////j.julianDays(); // 5543.5
var julian = require('julian');

  var now = new Date();           // Let's say it's Thu, 21 Nov 2013 10:47:02 GMT
  var jd = julian(now);
  var mjd = jd - 2400000.5;  // 20230921  modified julian date
 
  //console.log("julian date now: "+jd );  // -> '2456617.949335'
 // console.log(julian.toDate(jd));




//timeNow = jd * 86400;  (del) 20230922
timeNow = mjd * 86400;   // 20230922
  return timeNow;

}  // end of now()






} // end of class ZtTime




function ZtDate(yearx, monthx, dayx ) {
   this.year   = yearx;
   this.month  = monthx;
   this.day    = dayx;
  
 } // end of function ZtDate


module.exports = ZtTime;
