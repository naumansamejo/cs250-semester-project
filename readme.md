# Overview
This project creates Lexicon, then uses it to create forward_index, and then uses forward_index to create inverted_index.
The dataset here used is from kaggle (All the News:  https://www.kaggle.com/snapcrack/all-the-news)


# How to use it
Pull from this github repo, make sure you have nodejs installed.


### To build Lexicon:
`node lexicon.js`

### Forward Index:
`node forward_index.js`

### Inverted Index:
`node inverted_index.js`

Wait for some time, until success message appears. Then the respective file will be generated inside "data" folder, in JSON format.


# Dependencies
These are npm dependencies for this project:
* csv-parser (used for reading from dataset)
* natural (used for stemming words)