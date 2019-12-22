/*=================================================================================    
    This code uses given dataset, in csv format, and lexicon to generate 
    forward index in the given format:

    ForwardIndex = {
        docID: [wordID, wordID, wordID, ...]
        docID: [wordID, wordID, wordID, ...]
        docID: [wordID, wordID, wordID, ...]
        .
        .
        .
    }
=================================================================================*/


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
    fi = {},
    stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];

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
            
            if(!stopwords.includes(word)){
                wordID = lexicon[word];
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