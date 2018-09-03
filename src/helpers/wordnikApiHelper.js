
import { client, api_baseUrl, api_appId, api_appKey } from '../config'


function getData(path, callback) {

    client.headers['app_id'] = api_appId;
    client.headers['app_key'] = api_appKey;

    client.get(path, (err, res, body) => {
        if (err) return callback(err);
        if (res.statusCode === 200) {
            return callback(null, body);
        }
        return callback(`Response StatusCode: ${res.statusCode}`, null);
    })
}

export default class {

    getDefinition(word, callback) {
        let path = `${api_baseUrl}/entries/en/${word}`;
        getData(path, callback);
    }

    getSynonym(word, callback) {
        let path = `${api_baseUrl}/entries/en/${word}/synonyms`;
        getData(path, callback);
    }

    getAntonym(word, callback) {
        let path = `${api_baseUrl}/entries/en/${word}/antonyms`;
        getData(path, callback);
    }

    getExamples(word, callback) {
        let path = `${api_baseUrl}/entries/en/${word}/sentences`;
        getData(path, callback);
    }

    getWordOfTheDay(word) {

    }
}