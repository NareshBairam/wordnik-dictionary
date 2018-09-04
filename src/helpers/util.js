
function getRandomNumber(n) {
    return ((parseInt((Math.random()*10000).toPrecision(1)))%n);
}

export default {
    getRandomNumber
}