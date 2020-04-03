const admin = require('firebase-admin')

module.exports = async (req,res)=>{

    //verify the user provided a phone and a code
    if (!req.body.phone || !req.body.code ){
        return res.status(422).send({error: "Phone number and code required"})
    }

    //format the phone to remove dashes and parens
    const phone = String(req.body.phone).replace(/[^\d]/g,"")
    const code = parseInt(req.body.code)

    try {
        //verify the user/phone exists
        await admin.auth().getUser(phone)

        const ref = await admin.database().ref(`users/${phone}`)
        ref.on('value', async (snapshot) => {
            ref.off() //stop listening

            const user = snapshot.val()
            if(user.code !== code || !user.codeValid){
                return res.status(422).send({error: "Code not valid!!"})
            }
            ref.update({codeValid: false})

            const token = await admin.auth().createCustomToken(phone)
            return res.send({token})
        })
    } catch (error) {
        return res.status(422).send({error})
    }
}