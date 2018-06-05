const express = require('express');
const moment = require('moment');
const request = require('superagent');
const weatherApiKey = require('../secret/weatherApiKey');

const service = express();

service.use(express.json());

const weatherAPIKey = process.env.WEATHER_API_KEY || weatherApiKey;

service.get('/service/:location', (req, res, next) => {

  request.get('https://api.openweathermap.org/data/2.5/weather')
    .query({ q: req.params.location })
    .query({ units: 'metric' })
    .query({ appid: weatherAPIKey })
    .end((err, response) => {
      if (err) {
        console.error(err);
        return res.sendStatus(404);
      }

      res.json({result: `${response.body.weather[0].description} at ${response.body.main.temp} oC`});
    });
});

module.exports = service;
