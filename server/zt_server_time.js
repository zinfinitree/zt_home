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


//A modified version of the Julian date denoted MJD obtained by subtracting 2,400,000.5 days from the Julian date JD,
//The MJD therefore gives the number of days since midnight on November 17, 1858. This date corresponds to 2400000.5 days after day 0 of the Julian calendar. MJD is still in common usage in tabulations by the U. S. Naval Observatory. Care is needed in converting to other time units, however, as a result of the half day offset (unlike the Julian date, the modified Julian date is referenced to midnight instead of noon) and because of the insertion of semiannual leap seconds (which are inserted at midnight).
 
 
//// // Get the julian days
////j.julianDays(); // 5543.5
var julian = require('julian');

  var now = new Date();           // Let's say it's Thu, 21 Nov 2013 10:47:02 GMT
  var jd = julian(now);
  var mjd = jd - 2400000.5;  // 20230921  modified julian date

// for modified julian date, subtract 2400000.5 days
 
  //console.log("julian date now: "+jd );  // -> '2456617.949335'
 // console.log(julian.toDate(jd));

 // julian date 1/1/23   2459945.5
 // modified julian date 1/1/23  59945 (zero hours, zero minutes and zero seconds)
 // time stamp 59945 * 86400 = 5179248000.000  - corrected up to file ds2_init23... and ds2_import_app20...  and doc1_set_13031...

// for modified julian timestamp, subtract 207360043200 seconds

// example julian timestamp 212440895685.000 = 5080852485 modified julian timestamp or 58806.163020833 days or 161 years
//   17 November 1858



//timeNow = jd * 86400;  (del) 20230921
timeNow = mjd * 86400;

  return timeNow;

}  // end of now()






} // end of class ZtTime




function DsDate(yearx, monthx, dayx ) {
   this.year   = yearx;
   this.month  = monthx;
   this.day    = dayx;
  
 } // end of function ZtTime


module.exports = ZtTime;
