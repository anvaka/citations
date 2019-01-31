import fetch from './fetch';
const fuzzysort = require('fuzzysort')

export default function createDataClient(endpoint) {
  const indexed = new Map();
  const prepared = [];
  const downloaded = new Map();
  let currentDownload;
  const getFileNames = fetch(endpoint + 'allKeys.json', {responseType: 'json'})
    .then(names => {
      names.forEach(pair => {
        prepared.push(fuzzysort.prepare(pair.n))
        let fileName = pair.f || pair.n;
        indexed.set(pair.n, fileName);
      });
      return indexed;
    })

  return {
    getSuggestion,
    getPapers
  }

  async function getSuggestion(query) {
    await getFileNames;

    let results = fuzzysort.go(query, prepared, {limit: 100})

    return Promise.resolve(results.map(x => ({
      html: fuzzysort.highlight(x, '<b>', '</b>'),
      text: x.target
    })));
  }

  async function getPapers(query, progress) {
    progress.message = 'Downloading entities...'
    await getFileNames;

    const papers = downloaded.get(fileName);
    if (papers) return Promise.resolve(papers);

    let fileName = indexed.get(query);
    if (!fileName) return Promise.reject('NO_FILE');

    progress.startDownload(query);
    const url = endpoint + 'files/' + encodeURIComponent(fileName) + '.json';

    if (currentDownload) {
      currentDownload.cancel();
    }
    currentDownload = fetch(url, {
      responseType: 'json', 
      progress(e) {
        progress.setDownloaded(e);
      }
    });

    return currentDownload.then(papers => {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;
      papers.forEach(p => {
        // number of citations
        p.c = Number.parseInt(p.c, 10);
        p.url = `https://api.semanticscholar.org/${p.id}`;
        if (p.c > max) max = p.c;
        if (p.c < min) min = p.c;
      });
      papers.sort((a, b) => b.c - a.c);

      const papersInfo = {
        papers,
        min, max
      }
      downloaded.set(fileName, papersInfo);
      currentDownload = null;
      progress.done();
      return papersInfo;
    })
  }
}
