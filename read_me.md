Steps:
- Create tokens with varying TTLs (1 min through 10 minutes)
- wait 10 minutes
- try to instantiate the client with each token

results:
- The Twilio Chat client accepts tokens that are expired by up to 1 minute (since the token with a TTL of 600 seconds was still valid after waiting for 10 minutes).
- Tokens that are expired by more than 1 minute are not accepted (since tokens with TTL of 540 seconds or less were not accepted after waiting for 10 minutes).
- This suggests that there is a grace period of approximately 1 minute after the token's expiration time during which the token is still accepted by the Twilio Chat client.

