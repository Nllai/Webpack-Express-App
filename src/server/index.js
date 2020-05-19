var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var aylien = require('aylien_textapi');
const bodyParser = require('body-parser');
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

const textapi = new aylien({
    application_id: `${process.env.API_ID}`,
    application_key: `${process.env.API_KEY}`
});

const app = express()
app.use(cors())
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(JSON.stringify(mockAPIResponse))
app.use(express.static('dist'))

console.log(__dirname)


app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/api', async (req, res) => {
    const { formText } = req.body;
    console.log(formText);

    try {
        console.log("Sending request");
        textapi.sentiment({'text': formText },
          function(error, response) {
          if (error === null) {
            console.log(response);
            res.send(response);
        }
      });

    } catch(error) {
      console.log(error);
    }})