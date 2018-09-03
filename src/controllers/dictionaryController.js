
import Api from '../helpers/wordnikApiHelper'

function formatDefinition(data, key) {

    data.forEach(result => {
        result['lexicalEntries'].forEach(lexicalEntrie => {
            lexicalEntrie['entries'].forEach(entrie => {
                entrie['senses'].forEach(sense => {
                    sense[key].forEach(element => {
                        console.log(element)
                    });
                })
            })
        })
    })
    console.log('---------------------------------------------------------------------------------------------------------------------------------------\n');
}

function formatSynonymsOrAntonyms(data, key) {

    let words = []
    data.forEach(result => {
        result['lexicalEntries'].forEach(lexicalEntrie => {
            lexicalEntrie['entries'].forEach(entrie => {
                entrie['senses'].forEach(sense => {
                    sense[key].forEach(element => {
                        words.push(element.text)
                    });
                })
            })
        })
    })
    console.log(words.join(", "))
    console.log('---------------------------------------------------------------------------------------------------------------------------------------\n');
}

function formatExamples(data, key) {

    data[key].forEach(element => {
        console.log(element.text)
    });
    console.log('---------------------------------------------------------------------------------------------------------------------------------------\n');
}  

export default class {

    constructor() {
        this.api = new Api();
    }

    getDefinition(word) {
        this.api.getDefinition(word, function (err, data) {
            if (err) {
                console.log('Something went wrong while getting Definition from wordnik api ', err);
                return;
            }
            if (data.length == 0) {
                console.log(`No definition found for the word  : ${word} \n`)
            } else {
                console.log(`Definition for the word  : ${word}`);
                formatDefinition(data.results, "definitions")
            }
        });
    }

    getSynonym(word) {
        this.api.getSynonym(word, function (err, data) {
            if (err) {
                console.log('Something went wrong while getting synonym from wordnik api ', err);
                return;
            }
            if (data.length == 0) {
                console.log(`No synonym found for the word  : ${word} \n`)
            } else {
                console.log(`Synonym for the word  : ${word}`);
                formatSynonymsOrAntonyms(data.results,"synonyms");
            }
        });
    }

    getAntonym(word) {
        this.api.getAntonym(word, function (err, data) {
            if (err) {
                console.log('Something went wrong while getting antonym from wordnik api ', err);
                return;
            }
            if (data.length == 0) {
                console.log(`No antonym found for the word  : ${word} \n`)
            } else {
                console.log(`Antonym for the word  : ${word}`);
                formatSynonymsOrAntonyms(data.results, "antonyms");
            }
        });
    }

    getExamples(word) {
        this.api.getExamples(word, function (err, data) {
            if (err) {
                console.log('Something went wrong while getting example from wordnik api ', err);
                return;
            }
            if (data.length == 0) {
                console.log(`No example found for the word  : ${word} \n`)
            } else {
                console.log(`Example for the word  : ${word}`);
                formatExamples(data.results[0].lexicalEntries[0], "sentences");
            }
        });
    }

    getFullDictionary(word) {
        this.getDefinition(word);
        this.getSynonym(word);
        this.getAntonym(word);
        this.getExamples(word);
    }
    getWordOfTheDay(word) {

    }
}