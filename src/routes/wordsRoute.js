
import Dictionary from '../controllers/dictionaryController';
import Game from '../controllers/gameController';
import { invalidCommand, help } from '../outputMessages'

export default (input, gameData) => {
    let args = input.split(" ");
    let keyword = args[0];
    let command = args[1];
    let word = args[2];

    if (keyword && keyword === './dict') {
        let dictionary = new Dictionary();
        let game = new Game();
        switch (command) {
            case 'def':
                dictionary.getDefinition(word);
                break;
            case 'syn':
                dictionary.getSynonym(word);
                break;
            case 'ant':
                dictionary.getAntonym(word);
                break;
            case 'ex':
                dictionary.getExamples(word);
                break;
            case 'play':
                game.startGame(function (err, question) {
                    if (err) return console.log('Error while fetching Question');

                    gameData.isPlaying = true;
                    gameData.isAnswering = true;
                    gameData.word = question;
                    gameData.noOfHints = 0;
                    console.log('-------------GAME STARTED-------------')
                    console.log('Please enter a correct word for definition, synonym or antonym');
                })
                break;
            case '--help':
                console.log(help);
                break;
            default:
                if (command) {
                    dictionary.getFullDictionary(command);
                } else {
                    dictionary.getWordOfTheDay();
                }
                break;
        }
    } else {
        console.log(invalidCommand)
    }
}