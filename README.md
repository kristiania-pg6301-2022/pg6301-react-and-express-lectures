Communication between client and server
=======================================

Calling http-services from the browser and handing errors and delays with React

* [ ] Create frontend and backend
  * [ ] Create project
    * Root npm init && install concurrently prettier husky
    * Client npm init && install parcel react react-dom react router
    * Server npm init && install express
  * [ ] Frontend with Router
  * [ ] Serve frontend from Express with support for React Router
  * [ ] prettier and husky
* [ ] Create GET /login endpoint (dummy)
* [ ] Deploy to Heroku
  * [ ] `npm run build` must run `npm install` on client (with dev!) and server
  * [ ] `npm start` must start Express on the correct port
* [ ] Create POST /login form
  * [ ] Extracting function fetchJSON
  * [ ] Handle loading
  * [ ] Handle errors
* [ ] Load GET /login on front page
  * [ ] Introduce `useLoader`
  * [ ] Handle loading
  * [ ] Handle errors
