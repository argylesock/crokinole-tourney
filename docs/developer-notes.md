# Developer Notes

### How to add 'client' instances without a server

One option to consider for peer-to-peer communications to allow access from
other a 'client' browser to communicate with a 'server' browser is [WebRTC peer connections][11].
This would require a [STUN server][12]
  - twilio provides [STUN as a Free service][13]
  - and here's a list of [Public STUN servers][14]

[11]: https://webrtc.org/getting-started/peer-connections
[12]: https://www.twilio.com/en-us/stun-turn/pricing
[13]: https://www.twilio.com/en-us/stun-turn/pricing
[14]: https://gist.github.com/mondain/b0ec1cf5f60ae726202e


---
### Publishing Github Pages with Github Actions

Implemented _.github/workflows/deploy.yml_ based on info from [sitek94/vite-deploy-demo](https://github.com/sitek94/vite-deploy-demo).

---
### References

- [WebRTC Client Chat App Using React][20]
- [Setting up a STUN and TURN server using Twilio][21]

[20]: https://levelup.gitconnected.com/webrtc-client-chat-app-using-react-99bf8e803fd8
[21]: https://medium.com/@toshvelaga/setting-up-a-stun-and-turn-server-using-twilio-8900a6f37d82
