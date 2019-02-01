## Collecting data

First of all, you'd need to [download the corpus](http://labs.semanticscholar.org/corpus/).

Then, create a sorted list of papers:

```
g++ main.cpp
zcat ./data/corpus-2018-05-03/*.gz | ./a.out > sorted.txt
```

This would create a file where each line is a paper id, and how many times
it was found cited by other papers:

```
503fc044b5c08c58d32debfc4393756d1cd4c191,37230
77ff0bb96b1d085fe284c0a5d87d1d109001afcd,28693
23dadf25f3efacbc9c66f69093d656ad5b003529,26282
b88e5263c224be3acee38e18ff6d8a47310c2606,25808
...
```

Now, let's extract from the corpus top 1,000,000 papers:

```
zcat ./data/corpus-2018-05-03/*.gz | node extract-top.js > top_papers.txt
```

Finally, let's collect all papers by their "entity". Entities is what AI2 extracts from each papers. 

```
node groupByEntity.js
```

After this, you'd have a `data` and `data/files` folders that includes top 1,000 papers within each entity.