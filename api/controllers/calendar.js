const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';

var credentialsJSON = ''

function getAuthorization(req, res, next) {
  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return res.status(400).send(`Error loading client secret file: ${err}`);
    // Authorize a client with credentials, then call the Google Calendar API.
    credentialsJSON = JSON.parse(content)
    authorize(credentialsJSON, listEvents, res);
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, response) {
  const {client_secret, client_id, redirect_uris} = credentialsJSON.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    // if (err) return getAccessToken(oAuth2Client, callback);
    if (err) return response.status(400).send({error: "Please authorize first"})
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, response);
  });
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(req, res, next) {
  const {client_secret, client_id, redirect_uris} = credentialsJSON.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.status(200).send(`Authorize this app by visiting this url: ${authUrl}`)
  console.log('Authorize this app by visiting this url:', authUrl);
}

function sendAuthorization(req, res, next) {
  const authtoken = req.body
  if (!authtoken) return res.status(400).send("Error parsing authtoken")
  oAuth2Client.getToken(authtoken, (err, token) => {
    if (err) return callback(err);
    oAuth2Client.setCredentials(token);
    // Store the token to disk for later program executions
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) return res.status(400).send("Error writing token to disk")
      return res.status(200).send(`Successfully written to file! Please click the get calendar button now`)
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, response, next) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      const eventsToList = events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        return `${start} - ${event.summary}`
        console.log(`${start} - ${event.summary}`);
      });
      console.log("test", response)
      return response.status(200).send(`Upcoming 10 events: ${eventsToList}`)
    } else {
      console.log('No upcoming events found.');
      return response.status(200).send('No upcoming events found.')
    }
  });
}

export default {
  listEvents,
  getAccessToken,
  getAuthorization,
  sendAuthorization
}