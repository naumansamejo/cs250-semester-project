// Modules
const fs        = require("graceful-fs");
const csv       = require("csv-parser");
const config    = require('../config.json');

let generateDocs = function(resolve){
    // Variables
    let lines = [];
    // Reading the file and parsing data from CSV
    fs.createReadStream(config.dataset).pipe(csv())
    .on("data", (data) => lines.push(data))
    .on("end", () => {
        // Tokenizing all the words from dataset
        for(c=0; c<lines.length; c++){
            // Current row from CSV
            row = lines[c];
            let doc = {
                id: row.id,
                title: row.title,
                content: row.content
            };
            // Writing the file
            fs.writeFile(`data/docs/${doc.id}.json`, JSON.stringify(doc), function(err) {
                if(err) {
                    return;
                }
            });
            

            doc.content = doc.content.substring(0, 140) + "...";
            fs.writeFile(`data/docs_meta/${doc.id}.json`, JSON.stringify(doc), function(err) {
                if(err) {
                    return;
                }
            });

        }
    });


    resolve();
}
module.exports = generateDocs;