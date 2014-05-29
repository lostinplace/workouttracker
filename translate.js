'use strict';

var fs = require('fs'),
  eDict = require('./exercise-dictionary.json'),
  _ = require('lodash');

if(!process.argv[2]) {
  throw 'must supply a filename as argument';
}

function getTypedSet(aSet){
  var exerciseString = aSet[1].toLowerCase(),
    translatedExercise = eDict[exerciseString] || aSet[1],
  result = {
    weight: aSet[0],
    reps: aSet[2]
  };
  if(typeof(translatedExercise)==='object'){
    result=_.merge(result,translatedExercise);
  } else {
    result.exercise = translatedExercise;
  }
  return result;
}


var dStoreText = fs.readFileSync('data.json').toString(),
  dStore = JSON.parse(dStoreText),
  measurementDate = new Date(process.argv[2]),
  textFormat = new RegExp(/(\d*)\s+([^\d]*)\s+(\d*)/),
  text = fs.readFileSync(process.argv[2]).toString(),
  setsTextLines = text.split(/\n/),
  setsLines = setsTextLines.filter(function(line){
      return line.replace(/ /g,'');
    }),
  sets=setsLines.map(function(line){
      return textFormat.exec(line).slice(1);
    }),
  typedSets = sets.map(getTypedSet);
  
  dStore[measurementDate.toString()] = typedSets;

fs.writeFileSync('data.json',JSON.stringify(dStore));