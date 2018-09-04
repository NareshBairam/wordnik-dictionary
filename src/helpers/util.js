
function getRandomNumber(n) {
    return ((parseInt((Math.random()*1000).toPrecision(1)))%n);
}

export default {
    getRandomNumber
}