const JSONStream = require('JSONStream');
const fs = require('fs');
const es = require('event-stream')

let forEachLine = require('for-each-line');
let papersToShow = new Map();
let sortedFileName = process.argv[2] || './sorted.txt';
let allFileName = process.argv[3] || './all.txt';

let shown = new Set();
forEachLine(sortedFileName, (line) => {
  const [id, count] = line.split(',');
  if (papersToShow.size < 1000000) {
    papersToShow.set(id, count);
  }
}).then(filterAll);

function filterAll() {
  let stream = JSONStream.parse();

  stream.pipe(
    es.mapSync(data => {
      let v = papersToShow.get(data.id);
      if (v) {
        let record = {
          id: data.id,
          t: data.title,
          y: data.year,
          c: v,
          e: data.entities
        };
        console.log(JSON.stringify(record))
        shown.add(data.id);
      }
    })
  ).on('end', () => {
    let missing = [];
    papersToShow.forEach((_, id) => {
      if (!shown.has(id)) missing.push(id)
    });
    console.warn('missing papers');
    console.warn(JSON.stringify(missing));
  });

  process.stdin.pipe(stream);
}


