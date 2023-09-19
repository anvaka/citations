# citations [website](https://anvaka.github.io/citations/)

Find the most cited pages within given categories. Unlike [scholar.google.com](https://scholar.google.com/)
or [www.semanticscholar.org](https://www.semanticscholar.org) we always sort results in decreasing order
of citations.

[![demo](https://i.imgur.com/S7g5kuO.gif)](https://anvaka.github.io/citations/)

## Data

Data comes from https://www.semanticscholar.org/ - they do list their own sources and release the entire corpus
with over [39 million published research papers](http://labs.semanticscholar.org/corpus/) for non-commercial use.

Note: the link above is no longer working. Use https://api.semanticscholar.org/api-docs/datasets to get the latest
datasets

I downloaded the corpus, counted every citation, then grouped papers by the keyword, and made this website. To see the actual code and reproduce the results, see [process-data](https://github.com/anvaka/citations/tree/master/process-data) folder.

I hope you find it useful in your exploration of knowledge.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
