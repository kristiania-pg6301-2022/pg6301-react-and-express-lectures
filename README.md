# OpenID Connect

(Log in with Google/Facebook/Github/whatever)


* [ ] Create client and server structure
  * `mkdir client server`
  * `npm init -y && npm install --save-dev concurrently`
  * `npm set-script dev "concurrently npm:dev:client npm:dev:server"`
  * `npm set-script dev:client "cd client && npm run dev"`
  * `npm set-script dev:server "cd server && npm run dev"`
  * `cd server && npm init -y && npm install --save-dev nodemon && npm install --save express cookie-parser`
  *  `npm set-script dev "nodemon server.js"`
  * `cd ..`
  * `cd client && npm init -y && npm install --save-dev parcel && npm install --save react react-dom react-router-dom @parcel/transformer-react-refresh-wrap`
  * `npm set-script dev "parcel watch index.html"`
* [ ] Complete server.js, index.html and index.jsx with routing
  * `npm run dev`
  * Create `<FrontPage />`, `<Profile />`, `<Login />` and `<LoginCallback />` components
* [ ] Deploy to heroku
  * `npm set-script build "npm run build:client && npm run build:server"`
  * `npm set-script build:client "cd client && npm run build"`
  * `npm set-script build:server "cd server && npm run build"`
  * `npm set-script start "cd server && npm start"`
  * `cd client && npm set-script build "npm install --include=dev && npm build:parcel" && npm set-script build:parcel "parcel build index.html"`
  * `cd ..`
  * `cd server && npm set-script build "npm install" && npm set-script start "node server.js"`
  * `cd ..`
  * `npm run build`
  * (Fix problems and commit)
  * `heroku login`
  * `heroku create -a pg6301-7-reference`
  * `heroku git:remote -a pg6301-7-remote`
  * `git push heroku`
* [ ] Create Google App registration
* [ ] Create authorization url and redirect to it
* [ ] Handle callback url and set access token cookie
* [ ] Send access token to server and retrieve user profile
