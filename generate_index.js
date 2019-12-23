const createLexicon = require('./generators/lexicon');
const createInvertedIndex = require('./generators/inverted_index');
const createForwardIndex = require('./generators/forward_index');
// const generateDocs = require('./generators/docs_gen');

// console.log("generating docs");
// generateDocs.then(()=>{
//     console.log("generated");
// });

console.log("Indexing started, please wait...");
console.log("Lexicon --start");
createLexicon(()=>{

    console.log("Lexicon --complete");
    
    console.log("Forward Index --start");
    createForwardIndex(()=>{
        console.log("Forward Index --complete");
        console.log("Inverted Index --start");
        createInvertedIndex(()=>{
            console.log("Inverted Index --complete");
            console.log("Index created.");
        });
    });

});