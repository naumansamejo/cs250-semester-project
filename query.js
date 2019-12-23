const fs        = require("graceful-fs");
const lexicon = require('./data/lexicon.json');
const {keys_per_file} = require('./config.json');
const {performance} = require('perf_hooks');
const natural       = require("natural");
const stemmer       = natural.PorterStemmer;
const tokenizer     = new natural.WordTokenizer();
const stopwords     = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];
const config  = require('./config.json');


// Returns the documents corresponding to the given word
function wordDocs(word){
    let wordIndex = lexicon[word],
        wordFile = Math.floor(  wordIndex / keys_per_file ) * keys_per_file;
    
    return isNaN(wordIndex) ? [] : require(`./data/inverted_index/${wordFile}.json`)[wordIndex];
}

// Returns one word query results
let getQuery = function(query){

    let results = {};
    let result_limit = config.result_limit;
    

    // Function, that will process the query, and return the array of matching document ids
    function searchResults(){
        let resultDocs = [];
        
        queryWords = tokenizer.tokenize(query);
        queryWords.forEach((word)=>{
            
            word = stemmer.stem(word.toLowerCase());
            word = stopwords.includes(word) ? "" : word;
            
            if(word){
                let newDocs = wordDocs(word);

                if(newDocs.length && resultDocs.length){
                    resultDocs = resultDocs.filter(x => newDocs.includes(x));
                }else{
                    resultDocs = newDocs;
                }
            }
        });


        return resultDocs;
    }
    // Search logic ends here




    // Array of documents containing that one single word
    let t1 = performance.now();
    let docArray = searchResults();
    let t2 = performance.now();




    results.count = docArray.length;
    docArray = docArray.slice(0, result_limit);
    

    // Fetching the content
    docArray = docArray.map(function(item){
        let doc = JSON.parse(fs.readFileSync(`./data/docs_meta/${item}.json`, 'utf8'));
        return doc;
    });



    results.time = (t2-t1)/1000;
    results.time = results.time.toFixed(8);
    results.results = docArray;
    
    return results;
}

module.exports = getQuery;