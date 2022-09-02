const fs = require("fs");
const JSONStream = require('JSONStream');
const es = require('event-stream');
const { calculateBMIData, end } = require("./src/streamProcessor");

const fileInputStream = fs.createReadStream("./input.json");

//Processing pipeline for inputFile
fileInputStream
  .pipe(JSONStream.parse('*'))
  .pipe(es.through(calculateBMIData, end))
  .on('error', (err) => {
    console.log("error", err);
  })