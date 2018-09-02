
import WordRoute from './routes/wordsRoute'

process.stdin.setEncoding('ascii');
process.stdin.on('data', (input) => {
    WordRoute(input)
})