'use strict';

var fs = require('fs');

if(!process.argv[2]) throw 'must supply a filename as argument'



function getTypedSet(aSet){
  var result = {
    weight: aSet[0],
    exercise:
  }
}

var textFormat = new RegExp(/(\d*)\s+([^\d]*)\s+(\d*)/)
  text = fs.readFileSync(process.argv[2]),
  setsTextLines = text.split(/\n/),
  setsLines = setsTextLines.filter(function(line){
      return line.replace(/ /g,'')
    }),
  sets=setsLines.map(function(line){
      return textFormat.exec(line).slice(1);
    });
  
