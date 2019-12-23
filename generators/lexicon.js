/*=================================================================================
    This code uses given dataset, in csv format, to generate the lexicon
    in the given format:
    Lexicon = {
        word1: wordID
        word2: wordID
        word3: wordID
        .
        .
        .
    }
=================================================================================*/
// Modules
const fs            = require("fs");
const csv           = require("csv-parser");
const natural       = require("natural");
const stemmer       = natural.PorterStemmer;
const tokenizer     = new natural.WordTokenizer();
const config        = require('../config.json');    
const {isStopWord}  = require('../word_tools.js');
let createLexicon = new Promise((resolve, reject) => {
    // Variables
    let lines = [], 
        words = [],
        lexicon = {},
        wordID = 0;
    // Reading the file and parsing data from CSV
    fs.createReadStream(config.dataset).pipe(csv())
    .on("data", (data) => lines.push(data))
    .on("end", () => {
        // Tokenizing all the words from dataset
        for(c=0; c<lines.length; c++){
            // Current row from CSV
            line = lines[c];
            // Tokenizing the words from data
            words = words.concat( tokenizer.tokenize(line.title) );
            words = words.concat( tokenizer.tokenize(line.content) );
            // Stemming and adding words to lexicon
            while(true){
                word = words.pop();
                if(word == undefined) break;
                word = stemmer.stem(word.toLowerCase());
                if( !isStopWord(word) && !lexicon.hasOwnProperty(word) ){
                    lexicon[word] = wordID++;
                }
            }
        }
        // Writing the file
        fs.writeFile("data/lexicon.json", JSON.stringify(lexicon), function(err) {
            if(!err) {
                resolve();
            }else{
                reject();
            }
        });
    });
});
module.exports = createLexicon;