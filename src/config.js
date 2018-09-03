
import request from 'request-json'

let api_baseUrl = 'https://od-api.oxforddictionaries.com/api/v1'
let api_appId = 'a879af59'
let api_appKey = 'd65d7a6e0da0a51e1c19baef9324ef5e'
const client = request.createClient(api_baseUrl);

export {
    client,
    api_baseUrl,
    api_appId,
    api_appKey
}