const admin = require('firebase-admin')
const twilio = require('./twillio')

module.exports = async (req,res) => {

    //verify the user provided a phone
    if (!req.body.phone){
        return res.status(422).send({error: "You must provide a phone number"})
    }

    //format the phone to remove dashes and parens
    const phone = String(req.body.phone).replace(/[^\d]/g,"")

    try {
        await admin.auth().getUser(phone)
        const code = Math.floor(Math.random() * 8999 +1000)
        await twilio.messages.create({
            body: `Your code is ${code}`,
            to: `whatsapp:${phone}`,
            from: `whatsapp:+14155238886`
        })
        await admin.database().ref(`users/${phone}`).update({code, codeValid: true})
        return res.send({success: true})

    } catch (error) {
        return res.status(422).send({error})
    }
}