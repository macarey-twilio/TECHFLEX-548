const { createToken } = require('./token_server');
const { createChatClient } = require('./chat_client');
const twilioChat = require('twilio-chat');
const ProgressBar = require('progress');

(async () => {
  // Expiration times in seconds (from 1 minute to 10 minutes, in 10-second increments)
  const expirationTimes = [60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200];
  const tokens = expirationTimes.map(ttl => ({ ttl, token: createToken(ttl) }));

  console.log('Tokens created. Waiting for 5 minutes and 30 seconds...');

  // Create a progress bar
  const waitTime = 5 * 60 + 30; // 5 minutes and 30 seconds in seconds
  const bar = new ProgressBar('Waiting [:bar] :percent :etas', {
    total: waitTime,
    width: 40,
  });

  // Update the progress bar every second
  await new Promise(resolve => {
    const interval = setInterval(() => {
      bar.tick();
      if (bar.complete) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });

  console.log('Starting token validation...');
  for (const { ttl, token } of tokens) {
    const result = await createChatClient(token);
    const secondsAgo = (330 - ttl); // Calculate how many seconds ago the token expired
    console.log(`Token that expired ${secondsAgo} seconds ago was ${result ? 'accepted' : 'rejected'}`);
  }

  // Exit the process after completing the tests
  process.exit();
})();