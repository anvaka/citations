import Progress from './Progress';
import dataClient from './lib/dataClient';

const queryState = require('query-state');

const qs = queryState({
  query: ''
}, {
  useSearch: true
});

const appStateFromQuery = qs.get();
const appState = {
  progress: new Progress(),
  query: appStateFromQuery.query,
  hasQuery: false,
  papers: {
    max: 0,
    min: 0,
    papers: []
  }
};

if (appState.query) {
  performSearch(appState.query);
}

export default appState;

qs.onChange(updateAppState);

function updateAppState(newState) {
  appState.query = newState.query;
}

export function performSearch(queryString) {
  appState.hasQuery = true;
  appState.progress.reset();

  qs.set('query', queryString);

  dataClient.getPapers(queryString, appState.progress)
    .then(papers => {
      let since = qs.get('since');
      if (!since) since = 1800;
      appState.papers.min = papers.min;
      appState.papers.max = papers.max;
      appState.papers.papers = papers.papers.filter(p => {
        return p.y > since
      });
    })
    .catch(error => {
      appState.progress.error = error;
    });
}
