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
    lexicon = {},
    wordID = 0,
    stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];


console.log("Lexicon creation started. Please wait.");


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
            
            if( !stopwords.includes(word) && !lexicon.hasOwnProperty(word) ){
                lexicon[word] = wordID++;
            }
        }
    }
   
    // Writing the file
    fs.writeFile("data/lexicon.json", JSON.stringify(lexicon), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Lexicon has been created!");
    });

});