const JSONStream = require('JSONStream');
const fs = require('fs');
const es = require('event-stream')
const path = require('path');
const sanitize = require('sanitize-filename');

const fileName = process.argv[2] || './top_papers.txt';
let stream = JSONStream.parse();
const counter = new Map();

stream.pipe(
  es.mapSync(data => {
    (new Set(data.e.map(x => x.toLowerCase()))).forEach(key => {
      let papers = counter.get(key);
      if (!papers) {
        papers = [];
        counter.set(key, papers);
      }
      papers.push({
        id: data.id,
        y: data.y,
        c: data.c,
        t: data.t
      });
    })
  })
);

stream.on('end', () => {
  let allKeys = [];
  counter.forEach((papers, entity) => {
    if (papers.length < 30) return;
    const fileName = sanitize(entity);
    let out = path.join('out', 'files', fileName + '.json');
    const keyFilePair = {
      n: entity,
    };
    if (entity !== fileName) {
      keyFilePair.f = fileName;
    }
    allKeys.push(keyFilePair);
    fs.writeFileSync(out, JSON.stringify(papers.slice(0, 1000)));
  });
  let out = path.join('out', 'allKeys.json');
  fs.writeFileSync(out, JSON.stringify(allKeys));
});

fs.createReadStream(fileName).pipe(stream);
