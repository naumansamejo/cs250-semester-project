const fs        = require("graceful-fs");
const lexicon = require('./data/lexicon.json');
const {keys_per_file} = require('./config.json');


// Returns one word query results
let getQuery = function(query){
    query = query.toLowerCase();
    wordIndex = lexicon[query];
    wordFile = Math.floor(  wordIndex / keys_per_file ) * keys_per_file;
    docArray = require(`./data/inverted_index/${wordFile}.json`)[wordIndex];
    
    docArray = docArray.map(function(item){
        let doc = JSON.parse(fs.readFileSync(`./data/docs/${item}.json`, 'utf8'));
        return doc;
    });
    
    return docArray;
}

module.exports = getQuery;