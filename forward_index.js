// Modules
const fs        = require("fs");
const csv       = require("csv-parser");
const natural   = require("natural");

const stemmer   = natural.PorterStemmer;
const tokenizer = new natural.WordTokenizer();

const config    = require('./config.json');

        
// Variables
let lines = [], 
    words = [],
    lexicon = require('./data/lexicon.json'),
    fi = {};

console.log("Forward index creation started. Please wait.");


// Reading the file and parsing data from CSV
fs.createReadStream(config.dataset).pipe(csv())
.on("data", (data) => lines.push(data))
.on("end", () => {


    // Tokenizing all the words from dataset
    for(c=0; c<lines.length; c++){
        
        // Current row from CSV
        line = lines[c];
        docID = line.id;

        fi[docID] = [];
        currentDoc = fi[docID];
        
        

        // Tokenizing the words from data
        words = words.concat( tokenizer.tokenize(line.title) );
        words = words.concat( tokenizer.tokenize(line.content) );

        // Stemming and adding words to lexicon
        while(true){
            word = words.pop();
            if(word == undefined) break;

            word = stemmer.stem(word.toLowerCase());
            
            
            
            
            /*
            If the word is stopword, then the wordID will be null, 
            hence, removing the need for rechecking again and again through the array for stopword
            thus, improving performance.
            */
            
            if(wordID = lexicon[word]){
                currentDoc.push(wordID);
            }


        }
    }



    // Writing the file
    fs.writeFile("data/forward_index.json", JSON.stringify(fi), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Forward index has been created!");
    });

});

