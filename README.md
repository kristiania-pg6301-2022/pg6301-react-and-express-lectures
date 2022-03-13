# Websockets - a simple chat server

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

## TODO

1. Create a [React + Express application](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures#quickly-creating-a-express--react-application)
2. [Deploy to Heroku](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures#deploy-to-heroku)
3. Create a view that displays a chat input and a chat log (we'll use css grid this time)
4. Use pure frontend react to talk with ourselves
5. Set up websockets on the server to distribute incoming messages to all clients
6. Update the client code to send messages to the web socket instead
8. Add reconnect code (frontend)
