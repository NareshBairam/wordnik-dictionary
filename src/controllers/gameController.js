import Api from '../helpers/wordnikApiHelper';
import { getRandomNumber, jumbledWord } from '../helpers/util'
import { wrongAnswerOptions } from '../outputMessages'

const api = new Api();

function getRandomWord(callback) {

    api.getListOfWords(function (err, data) {
        if (err || !data) {
            callback(err, null);
        } else {
            let word = data.results[getRandomNumber(data.results.length)].word;
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
            callback(null, synonyms[getRandomNumber(synonyms.length)].text);
        }
    });
}

function getRandomAntonym(word, callback) {

    api.getAntonym(word, function (err, data) {
        if (err || !data) {
            callback(err, null);
        } else {
            let antonyms = data.results[0].lexicalEntries[0].entries[0].senses[0]['antonyms'];
            callback(null, antonyms[getRandomNumber(antonyms.length)].text);
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
            callback(null, senses[getRandomNumber(senses.length)]['definitions'][0]);
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

    switch (getRandomNumber(3)) {
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
            callback(null, word.replace("'", ""));
            displayOption(word);
        });
    }

    checkAnswer(answer, gameData) {

        if (answer.toUpperCase() === gameData.word.toUpperCase()) {
            console.log("You entered correct answer. Moving onto your next question");
            this.startGame(function (err, question) {
                if (err) return console.log('Error while fetching Question');
                gameData.word = question;
            });
        } else {
            console.log('Wrong answer');
            console.log(wrongAnswerOptions)
            gameData.isAnswering = false;
        }
    }

    showHint(gameData) {
        let hints = gameData.noOfHints;
        let word = gameData.word;

        switch (hints) {
            case 0:
                console.log(`Jumbled word : ${jumbledWord(gameData.word)}`);
                break;
            case 1:
                getRandomDefinition(word, function (err, data) {
                    if (err) {
                        console.log(`Jumbled word : ${jumbledWord(gameData.word)}`);
                    } else {
                        console.log(`Definition for the word  : ${data}`);
                    }
                });
                break;
            case 2:
                getRandomSynonym(word, function (err, data) {
                    if (err || !data) {
                        console.log(`Jumbled word : ${jumbledWord(gameData.word)}`);
                    }
                    else {
                        console.log(`Synonym for the word  : ${data}`);
                        console.log(data)
                    }
                });
                break;

            case 3:
                getRandomAntonym(word, function (err, data) {
                    if (err || !data) {
                        console.log(`Jumbled word : ${jumbledWord(gameData.word)}`);
                    }
                    else {
                        console.log(`Antonym for the word  : ${data}`);
                    }
                });
                break;
        }
        gameData.noOfHints = (hints + 1) % 4;
        gameData.isAnswering = true;
    }
}