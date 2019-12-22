const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const getQuery = require('./query');


app.use(bodyParser.json());


app.get("/query/:query", (req, res) => (
  
  res.json( getQuery(req.params.query) )

));

app.get("/", function(req, res){
    res.send("Something cool here.");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});