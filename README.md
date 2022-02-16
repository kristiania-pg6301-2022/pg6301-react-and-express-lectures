Communication between client and server
=======================================

Calling http-services from the browser and handing errors and delays with React

* [x] Create frontend and backend
  * [x] Create project
    * Root npm init && install concurrently prettier husky
    * Client npm init && install parcel react react-dom react router
    * Server npm init && install express
  * [x] Frontend with Router
  * [x] Serve frontend from Express with support for React Router
  * [x] prettier and husky
* [x] Create GET /login endpoint (dummy)
* [x] Deploy to Heroku
  * [x] `npm run build` must run `npm install` on client (with dev!) and server
  * [x] `npm start` must start Express on the correct port
* [ ] Load GET /login on front page
  * [x] Fetch data from server
  * [x] Handle loading
  * [x] Extracting function fetchJSON
  * [ ] Handle errors
  * [ ] Introduce `useLoader`
* [ ] Create POST /login form
  * [ ] Handle loading
  * [ ] Handle errors
