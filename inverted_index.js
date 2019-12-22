/*=================================================================================    
    This code uses already created forward_index.json (via forward_index.js)
    to generate the inverted index, of the form:

    InvertedIndex = {
        wordID: [Doc1, Doc2, Doc3, ...],
        wordID: [Doc1, Doc2, Doc3, ...],
        wordID: [Doc1, Doc2, Doc3, ...],
        .
        .
        .
    }
=================================================================================*/

// Modules
const fs        = require("graceful-fs");

// Variables
let forward_index = require('./data/forward_index.json'),     //Reading forward index JSON file.
    inverted_index = {};

const config = require("./config.json");


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
// fs.writeFile("data/inverted_index.json", JSON.stringify(inverted_index), function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("Inverted index has been created!");
// });

let keys = Object.keys(inverted_index);
let file_keys = config.keys_per_file;
let result = {};

for(let i=0; i<keys.length; i+=file_keys){
    let barrel = {};
    for(let j=0; i+j<keys.length && j<file_keys; j++){
        barrel[i+j] = inverted_index[ i+j ];
    }
    result[i] = barrel;
}

for (let key in result) {
    if (!result.hasOwnProperty(key)) {
        //The current property is not a direct property of p
        continue;
    }
    fs.writeFile(`data/inverted_index/${key}.json`, JSON.stringify(result[key], null, 4), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

console.log("Inverted index has been created!");