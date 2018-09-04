
import Game from '../controllers/gameController';
import Dictionary from '../controllers/dictionaryController';

export default (input, gameData)=>{

    const game = new Game();
    const dictionary = new Dictionary();

    if (gameData.isAnswering){
        game.checkAnswer(input, gameData);
    }else{

        switch(input){
            case '1':
                console.log('This is your next chance. Please enter your answer');
                gameData.isAnswering = true;
                break;
            case '2':
                console.log('Following is your hint');
                game.showHint(gameData);
                break;
            case '3':
                console.log(`Game is over. Following is the full dictionary of the word : ${gameData.word}`);

                dictionary.getFullDictionary(gameData.word);

                gameData.isPlaying = false;
                gameData.isAnswering = false;
                gameData.word = '';
                gameData.noOfHints = 0;
                break;
            default:
                console.log('Please enter the correct choice (1,2,3).');
                break;
        }
    }
}