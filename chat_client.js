const TwilioChat = require('twilio-chat');

async function createChatClient(token) {
  let clientOptions = { logLevel: 'silent' };

  try {
    const chatClient = await TwilioChat.Client.create(token, clientOptions);

    return new Promise((resolve) => {
      chatClient.on('connectionError', (error) => {
        resolve(false);
      });

      setTimeout(() => {
        resolve(true);
      }, 1000); // 5 seconds timeout
    });
  } catch (error) {
    return false;
  }
}

module.exports = { createChatClient };