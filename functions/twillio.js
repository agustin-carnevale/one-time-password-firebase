const twilio = require('twilio')
const {accountSid, authToken} = require('./twilio-keys')

module.exports = new twilio.Twilio(accountSid, authToken)