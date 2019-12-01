// Modules
const fs        = require("fs");
const csv       = require("csv-parser");
const natural   = require("natural");

const stemmer   = natural.PorterStemmer;
const tokenizer = new natural.WordTokenizer();



// Variables
let forward_index = require('./data/forward_index.json'),     //Reading forward index JSON file.
    inverted_index = {};

console.log("Inverted index creation started. Please wait.");


let added = {};

for(currentDoc in forward_index){
    added = {};
    

    // Assigning each document to it's word's array
    forward_index[currentDoc].forEach(function(wordID){

        //Checking if the doc has been already added to the given word's array, to avoid duplication. 
        if(!added.hasOwnProperty(wordID)){
            
            if( !inverted_index.hasOwnProperty(wordID) ){
                inverted_index[wordID] = [];
            }
            
            inverted_index[wordID].push(currentDoc);
            added[wordID] = 1;
        
        }
        
    });
}



// Writing the file
fs.writeFile("data/inverted_index.json", JSON.stringify(inverted_index), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Inverted index has been created!");
});
