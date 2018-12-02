// Server Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

// Watson Dependencies
const watson = require('./watson');

// Constants
const port = 3000;

// App
const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// Requests
app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.get('/', function (req, res) {
    // const message = req.query.message;
    // watson.sendMessage();

    var options = {
        method: 'GET',
        url: 'https://microsites.nbg.gr/api.gateway/sandbox/obpaccount/headers/v1.2.1/obp/my/accounts',
        headers: {
            sandbox_id: 'Nob',
            'Client-id': 'EC54AA07-F5F1-4B8D-9DA4-05A764CE4424',
            provider: 'NBG',
            provider_id: 'NBG.gr',
            provider_username: 'User1',
            application_id: null,
            request_id: '07769525-3e0f-4f00-934e-6fcec18be845',
            'content-type': 'application/json',
            accept: 'application/json'
        }
    };

    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);

    //     console.log(JSON.stringify(body, null, 2));
    // });

    var options1 = {
        method: 'POST',
        url: 'https://microsites.nbg.gr/api.gateway/sandbox/obppayment/headers/v1.2.1/obp/banks/DB173089-A8FE-43F1-8947-F1B2A8699829/accounts/e7c12ee0-cc36-40a9-8589-cc1f7e616d08/owner/transaction-request-types/sepa/transaction-requests',
        headers: options.headers,
        body: {
            extensions: {
                beneficiaryName: '<ADD STRING VALUE>',
                challengeExpiration: 0,
                challengeText: '<ADD STRING VALUE>',
                challengeType: 'NONE'
            },
            to: {
                iban: 'GR4501101030000010348012377'
            },
            value: {
                currency: 'EUR',
                amount: 2000
            },
            charge_policy: 'SHARED',
            description: 'Test'
        },
        json: true
    };

    request(options1, function (error, response, body) {
        if (error) throw new Error(error);

        var options2 = {
            method: 'POST',
            url: 'https://microsites.nbg.gr/api.gateway/sandbox/obppayment/headers/v1.2.1/obp/banks/DB173089-A8FE-43F1-8947-F1B2A8699829/accounts/e7c12ee0-cc36-40a9-8589-cc1f7e616d08/owner/transaction-request-types/sepa/transaction-requests/' + body.id + '/challenge',
            headers: options.headers,
            body: {
                id: body.challenge.id,
                answer: 1234
            },
            json: true
        };

        request(options2, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    });

    res.send('OK');
});



app.listen(port, () => console.log(`Listening on port ${port}`))