const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dumbai-c3561-default-rtdb.europe-west1.firebasedatabase.app/",
});

const { sessionsClient } = require('dialogflow');
