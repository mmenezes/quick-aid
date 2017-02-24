"use strict";  /* always for Node.JS, never global in the browser */

require('dotenv').config(); // will read configuration from the .env file

// Set the modules


var https = require('https');
var http = require('http');
var path = require('path');
var express  = require("express");
var fs = require('fs');

// Create an Express app
var app = express();

//var cfenv = require("cfenv");
//var appEnv = cfenv.getAppEnv();
//var str_config = '{"VCAP_APPLICATION":"Healthbot"}';
/*
var str_config = '{"cloudantNoSQLDB": [{
            "credentials": {
                "username": "793c5b54-0288-43e3-8840-d34e6bde283c-bluemix",
                "password": "e7fc1499d1d34bab182e3e51aa5700ad695318b4939e0a99924a081594be01b4",
                "host": "793c5b54-0288-43e3-8840-d34e6bde283c-bluemix.cloudant.com",
                "port": 443,
                "url": "https://793c5b54-0288-43e3-8840-d34e6bde283c-bluemix:e7fc1499d1d34bab182e3e51aa5700ad695318b4939e0a99924a081594be01b4@793c5b54-0288-43e3-8840-d34e6bde283c-bluemix.cloudant.com"
            },
            "syslog_drain_url": null,
            "label": "cloudantNoSQLDB",
            "provider": null,
            "plan": "Lite",
            "name": "cognitive-cloudantNoSQLDB",
            "tags": [
                "data_management",
                "ibm_created",
                "lite",
                "ibm_dedicated_public"
            ]
        }
    ],
    "iotf-service": [
        {
            "credentials": {
                "iotCredentialsIdentifier": "a2g6k39sl6r5",
                "mqtt_host": "u0wvve.messaging.internetofthings.ibmcloud.com",
                "mqtt_u_port": 1883,
                "mqtt_s_port": 8883,
                "http_host": "u0wvve.internetofthings.ibmcloud.com",
                "org": "u0wvve",
                "apiKey": "a-u0wvve-gwj4azqhok",
                "apiToken": "?93l_-524l2XMIZfcF"
            },
            "syslog_drain_url": null,
            "label": "iotf-service",
            "provider": null,
            "plan": "iotf-service-free",
            "name": "cognitive-iotf-service",
            "tags": [
                "internet_of_things",
                "Internet of Things",
                "ibm_created",
                "ibm_dedicated_public",
                "lite"
            ]
        }
    ],
    "speech_to_text": [
        {
            "credentials": {
                "url": "https://stream.watsonplatform.net/speech-to-text/api",
                "username": "3245b3e7-13f7-43cb-9e89-68c7aeb39fd6",
                "password": "7bDJWKga4fOR"
            },
            "syslog_drain_url": null,
            "label": "speech_to_text",
            "provider": null,
            "plan": "standard",
            "name": "cognitive-speech_to_text",
            "tags": [
                "watson",
                "ibm_created",
                "ibm_dedicated_public"
            ]
        }
    ],
    "text_to_speech": [
        {
            "credentials": {
                "url": "https://stream.watsonplatform.net/text-to-speech/api",
                "username": "b5a7c0f7-b76b-470c-a95e-706b2a2c9649",
                "password": "jpUblXoryopE"
            },
            "syslog_drain_url": null,
            "label": "text_to_speech",
            "provider": null,
            "plan": "standard",
            "name": "cognitive-text_to_speech",
            "tags": [
                "watson",
                "ibm_created",
                "ibm_dedicated_public"
            ]
        }
    ],
    "conversation": [
        {
            "credentials": {
                "url": "https://gateway.watsonplatform.net/conversation/api",
                "username": "f9f0cfaa-83dc-40c4-a9a6-2baff50879f8",
                "password": "YPlL5WuaJKRF"
            },
            "syslog_drain_url": null,
            "label": "conversation",
            "provider": null,
            "plan": "free",
            "name": "cognitive-conversation",
            "tags": [
                "watson",
                "ibm_created",
                "ibm_dedicated_public"
            ]
        }
    ],
    "weatherinsights": [
        {
            "credentials": {
                "username": "2d46ed36-1d2e-4755-b6c0-71a8a0c79bab",
                "password": "ttBmB6ZCdK",
                "host": "twcservice.mybluemix.net",
                "port": 443,
                "url": "https://2d46ed36-1d2e-4755-b6c0-71a8a0c79bab:ttBmB6ZCdK@twcservice.mybluemix.net"
            },
            "syslog_drain_url": null,
            "label": "weatherinsights",
            "provider": null,
            "plan": "Free-v2",
            "name": "cognitive-weatherinsights",
            "tags": [
                "big_data",
                "ibm_created",
                "ibm_dedicated_public"
            ]
        }
    ]
}';
*/


//var VCAP_APPLICATION = JSON.parse(str_config);
//console.log(VCAP_APPLICATION);

// Add a simple route for static content served from './public'
app.use( "/", express.static("public") );


// Use application-level middleware for common functionality

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use('/conversejs', require('./routes/conversation'));
app.use('/api/speech-to-text/', require('./routes/stt-token'));
app.use('/api/text-to-speech/', require('./routes/tts-token'));

// Create a server
var ssloptions = {
   key  : fs.readFileSync('./server.key'),
   cert : fs.readFileSync('./server.crt')
};
var port = process.env.PORT || 3030;


var httpsServer = https.createServer(ssloptions,app).listen(port, function () {
  console.log('Example app listening on port '+port)
});