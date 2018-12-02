const watson = require('watson-developer-cloud');

// Params
var params = {
    workspace_id: '6fffa9d0-2477-43ba-a6b2-bff847c1e275',
    intent: ''
};

// Assistant
const assistant = new watson.AssistantV1({
    iam_apikey: 'smrPU5jv7fPe_JUUY9I51gXDwuF-nmI4RvGErjv5W6dE',
    version: '2018-09-20',
    url: 'https://gateway-fra.watsonplatform.net/assistant/api'
});

function sendMessage(message) {
    console.log('OK');
    // assistant.message({
    //     workspace_id: params.workspace_id,
    //     input: {
    //         'text': message
    //     }
    // }, function (err, response) {
    //     if (err) {
    //         console.log('error:', err);
    //         res.send(err);
    //     } else {
    //         console.log(JSON.stringify(response, null, 2));
    //         res.send(JSON.stringify(response, null, 2));
    //     }
    // });
}

module.exports = {
    sendMessage: sendMessage
};