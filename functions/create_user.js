const admin = require('firebase-admin')

module.exports = async (req,res) => {

    //verify the user provided a phone
    if (!req.body.phone){
        return res.status(422).send({error: "Bad Input"})
    }

    //format the phone to remove dashes and parens
    const phone = String(req.body.phone).replace(/[^\d]/g,"")

    //create a new user account using phone number
    try {
        const user = await admin.auth().createUser({
            uid: phone
        })
         //respond to the user request, saying the account was made
        return res.send(user)
    } catch (error) {
        return res.status(422).send({error})
    }    
}