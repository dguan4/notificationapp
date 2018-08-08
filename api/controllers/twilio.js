const twilio = require('twilio')
require('dotenv').load()

const accountSID = process.env.TWILIO_API_SID
const accountSecret = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_API_NUMBER
const myNumber = process.env.TWILIO_MY_NUMBER

const twilioClient = new twilio(accountSID, accountSecret)

// Add POST - /api/sendmsg
const sendMessage = (req, res) => {
    console.log(req.body.msg)
    twilioClient.messages.create({
        body: req.body.msg,
        to: myNumber,  // Text this number
        from: twilioNumber // From a valid Twilio number
    })
    .then((message) =>  {
        console.log(message.sid)
        res.json({message: 'Done'})
    })
    .catch(err => console.error(err));
}

export default {
    sendMessage
}