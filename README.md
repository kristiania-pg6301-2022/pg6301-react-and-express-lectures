# Web sockets

The purpose of web sockets is to enable responsive communication between the client
and the server; especially for messages sent by the server. Websockets are established
over HTTP, just like normal requests, but they keep the socket open for either
party (client or server) to send arbitrary messages. In many cases, these messages
are sent as JSON objects.

In our example, we will create a web application that lets users chat with each
other.

When using React, we have a bit of a challenge: React has a *state based*
philosophy. We have a current state of the application that is then translated
into the React tree (which is then translated into the DOM tree). Websockets on
the other hand are event based. The server sends a message and expects something
to happen on the client.

To bridge this gap, we will divide the client application into two parts:

1. Create a chat log state and display it on the web page
2. Let websocket events update this state

## Plan

* [ ] Create React and Express application
* [ ] Deploy to Heroku
* [ ] Register username
* [ ] View for chat log and new chat message
* [ ] Chat messages updates chat log locally
* [ ] Connect client to websocket on server
* [ ] Send messages to the server
* [ ] Receive messages from server -> update chat log
