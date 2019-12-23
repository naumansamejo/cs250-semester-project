const fs        = require("graceful-fs");
const lexicon = require('./data/lexicon.json');
const {keys_per_file} = require('./config.json');
const {performance} = require('perf_hooks');
  



// Returns one word query results
let getQuery = function(query){

    query = query.toLowerCase();
    let wordIndex = lexicon[query],
        wordFile = Math.floor(  wordIndex / keys_per_file ) * keys_per_file,
        docArray = require(`./data/inverted_index/${wordFile}.json`)[wordIndex],
        results = {};
    

    let t1 = performance.now();
    docArray = docArray.map(function(item){
        let doc = JSON.parse(fs.readFileSync(`./data/docs/${item}.json`, 'utf8'));
        doc.content = doc.content.substring(0, 140) + "...";
        return doc;
    });
    let t2 = performance.now();



    results.time = (t2-t1)/1000;
    results.time = results.time.toFixed(4);
    results.results = docArray;
    
    return results;
}

module.exports = getQuery;