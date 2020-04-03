const admin = require('firebase-admin')
const functions = require('firebase-functions');
const createUser = require('./create_user')
const serviceAccount = require('./service_account.json')
const requestOneTimePassword = require('./request-one-time-password')
const verifyOneTimePassword = require('./verify-one-time-password')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-password-app-60476.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser)
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword)
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword)