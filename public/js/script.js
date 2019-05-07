'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.system_input = system_input;
var extractor = require('./app/extractor');
var myScenarios = require('./app/scenarios');
var tarausConfigs = require('./app/tarausConfigs');
//const testingTools = require('./app/testingTools');
var allRequestsArr = [];
var scenarios = {};
var FinalJSON = {};

var executeInput = function executeInput(jsondata) {
  var things = jsondata.things;
  for (var i = 0; i < things.length; i++) {
    allRequestsArr = extractor.extractServices(things[i], allRequestsArr);
  }
  var allExecutions = myScenarios.getExecutions();
  FinalJSON["execution"] = allExecutions;
  for (var j in allExecutions) {
    var x = {};
    x["requests"] = allRequestsArr;
    scenarios[allExecutions[j].scenario] = x;
  }
  FinalJSON["scenarios"] = scenarios;
  FinalJSON["reporting"] = tarausConfigs.getReporting();
  fileSaver(FinalJSON, "allRequests");
};

function fileSaver(myJSON, filename) {
  var filesaver1 = require('fs');
  filesaver1.writeFile(filename + ".json", JSON.stringify(myJSON, null, 2), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}
function system_input(filename, type) {
  console.log("\nLet Read JSON file:", filename);
  console.log("^________________^\n");
  var fs = require('fs');
  var rawdata = fs.readFileSync(filename + '.json');
  var jsondata = JSON.parse(rawdata);
  if (type == 0) {} else {}
  return jsondata;
}
var runTaraus = function runTaraus() {
  var exec = require('child_process').exec;
  var child;
  child = exec("bzt allRequests.json", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};
(function main() {
  console.log("\nWelcome to StressThing *__*");
  var inputThingsJson = system_input("FallDetection", 0);
  executeInput(inputThingsJson);
  myScenarios.getUserExecution();
  //testingTools.runTaraus();
})();