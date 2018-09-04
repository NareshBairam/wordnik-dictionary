import Api from '../helpers/wordnikApiHelper';
import util from '../helpers/util'

const api = new Api();

function getRandomWord(callback) {

    api.getListOfWords(function (err, data) {
        if (err || !data) {
            callback(err, null);
        } else {
            let word = data.results[util.getRandomNumber(data.results.length)].word;
            callback(null, word.trim());
        }
    });
}

function getRandomSynonym(word, callback) {

    api.getSynonym(word, function (err, data) {
        if (err || !data) {
            callback(err, null);
        } else {
            let synonyms = data.results[0].lexicalEntries[0].entries[0].senses[0]['synonyms'];
            callback(null, synonyms[util.getRandomNumber(synonyms.length)].text);
        }
    });
}

function getRandomAntonym(word, callback) {

    api.getAntonym(word, function (err, data) {
        if (err || !data) {
            callback(err, null);
        } else {
            let antonyms = data.results[0].lexicalEntries[0].entries[0].senses[0]['antonyms'];
            callback(null, antonyms[util.getRandomNumber(antonyms.length)].text);
            //console.log(antonyms[util.getRandomNumber(antonyms.length)].text)
        }
    });
}

function getRandomDefinition(word, callback) {

    api.getDefinition(word, function (err, data) {
        if (err) {
            console.log('Something went wrong while getting Definition from wordnik api ');
            return;
        }
        if (data.length == 0) {
            console.log(`No definition found for the word  : ${word} \n`)
        } else {
            let senses = data.results[0].lexicalEntries[0].entries[0].senses;
            //console.log(senses[util.getRandomNumber(senses.length)]['definitions'][0])
            callback(null, senses[util.getRandomNumber(senses.length)]['definitions'][0]);
        }
    });
}

function displayOption(word) {

    function getDefinition() {
        getRandomDefinition(word, function (err, data) {
            console.log(`Definition for the word  : `);
            console.log(data)
        });
    }

    switch (util.getRandomNumber(3)) {
        case 0:
            getDefinition();
            break;

        case 1:
            getRandomSynonym(word, function (err, data) {
                if (err || !data) {
                    getDefinition();
                }
                else {
                    console.log(`Synonym for the word  : `);
                    console.log(data)
                }
            });
            break;

        case 2:
            getRandomAntonym(word, function (err, data) {
                if (err || !data) {
                    getDefinition();
                }
                else {
                    console.log(`Antonym for the word  : `);
                    console.log(data)
                }
            });
            break;
    }
}

export default class {

    startGame(callback) {
        getRandomWord(function (err, word) {
            callback(null, word);
            displayOption(word);
        });
    }
}