
import wordRoute from './routes/wordsRoute'
import  gameRoute  from './routes/gameRoute'

var gameData = {
    isPlaying: false,
    isAnswering: false,
    word: '',
    noOfHints: 0
}

process.stdin.setEncoding('ascii');
process.stdin.on('data', (input) => {
    if (gameData.isPlaying) {
        gameRoute(input.trim(), gameData);
    } else {
        wordRoute(input.trim(), gameData)
    }
})