
function getRandomNumber(n) {
    return ((parseInt((Math.random() * 5000).toPrecision(1))) % n);
}

function jumbledWord(word) {
    let letters = word.split('');
    let length = letters.length;

    while (length) {
        let randomIndex = getRandomNumber(length);
        let temp = letters[randomIndex];
        letters[randomIndex] = letters[0];
        letters[0] = temp;
        length--;
    }
    return letters.join("");
}

export {
    getRandomNumber,
    jumbledWord
}