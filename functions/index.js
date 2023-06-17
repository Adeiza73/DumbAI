const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});
const admin = require('firebase-admin/app');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dumbai-c3561-default-rtdb.europe-west1.firebasedatabase.app/",
});

const { sessionsClient, SessionsClient } = require('dialogflow');


exports.dialogflowGateway = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const { queryInput, sessionId } = request.body;


        const sessionClient = new SessionsClient({ credentials: serviceAccount });
        const session = sessionClient.sessionPath('dumbai-c3561-default-rtdb', sessionId);


        const responses = await sessionClient.detectIntent({ session, queryInput});

        const result = responses[0].queryResult;

        result.fulfillmentText

        response.send(result);
    })
})
