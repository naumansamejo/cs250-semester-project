const createLexicon = require('./generators/lexicon');
const createInvertedIndex = require('./generators/inverted_index');
const createForwardIndex = require('./generators/forward_index');
const generateDocs = require('./generators/docs_gen');


// console.log("generating docs");
// generateDocs.then(()=>{
//     console.log("generated");
// });


console.log("Indexing started, please wait...");
console.log("Lexicon --start");
createLexicon.then(()=>{
    console.log("Lexicon --complete");
    // console.log("Forward Index --start");
    // createForwardIndex.then(()=>{
    //     console.log("Forward Index --complete");
    //     console.log("Inverted Index --start");
    //     createInvertedIndex.then(()=>{
    //         console.log("Inverted Index --complete");
    //         console.log("Index created.");
    //     });
    // });
});