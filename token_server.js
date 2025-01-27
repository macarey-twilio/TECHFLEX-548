require('dotenv').config();
const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;
const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;
const identity = 'user00';

function createToken(ttl) {
  const chatGrant = new ChatGrant({
    serviceSid: serviceSid,
  });
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: identity, ttl: ttl }
  );
  token.addGrant(chatGrant);
  return token.toJwt();
}

module.exports = { createToken };