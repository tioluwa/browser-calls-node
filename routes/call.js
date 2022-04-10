const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

const config = require('../config');

// POST /calls/connect
router.post('/connect', twilio.webhook({validate: false}), function(req, res, next) {
  var phoneNumber = req.body.phoneNumber;
  var client = req.body.client;
  var callerId = config.twilioPhoneNumber;
  var twiml = new VoiceResponse();

  var dial = twiml.dial({callerId : callerId});
  if (phoneNumber) {
    dial.number({}, phoneNumber);
  } else {
    console.log("calling: " + client);
    dial.client({}, client);
  }

  res.send(twiml.toString());
});

module.exports = router;
