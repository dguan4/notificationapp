const express = require('express')
const twilio = require('twilio')
require('dotenv').load()

console.log("test")

const accountSID = process.env.TWILIO_API_SID
const accountSecret = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_API_NUMBER
const myNumber = process.env.TWILIO_MY_NUMBER

const twilioClient = new twilio(accountSID, accountSecret)

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})

// Add POST - /api/sendmsg
router.post('/sendmsg', (req, res) => {
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
})

// Export the server middleware
module.exports = {
    path: '/api',
    handler: router
}