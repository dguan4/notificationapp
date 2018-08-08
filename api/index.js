import express from 'express'
import {calendar, twilio} from './controllers/'

// Create express router
const router = express.Router()

var app = express()
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})

router.post('/sendmsg', twilio.sendMessage)
router.get('/getcalendar', calendar.getAuthorization)
router.get('/gettoken', calendar.getAccessToken)
router.post('/sendAuth', calendar.sendAuthorization)

export default {
    path: '/api',
    handler: router
}