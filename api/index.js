import express from 'express'
import twilio from 'twilio'

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
    twilioClient.messages.create({
        body: 'Hello from Node',
        to: myNumber,  // Text this number
        from: twilioNumber // From a valid Twilio number
    })
    .then((message) =>  {
        console.log(message.sid)
    });
})

// Export the server middleware
export default {
    path: '/api',
    handler: router
}