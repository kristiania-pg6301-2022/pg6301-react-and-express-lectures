# Movie database sample

## Whirlwind tour of the course

* [x] Say hello to React
  * `npm init` - creates package.json which contains run scripts and dependencies
  * `npm install --save-dev parcel` add Parcel as a dependency
  * Parcel lets us transform .jsx-files to JavaScript files. It also supports
    modern JavaScript syntax and Typescript through transpilation
  * Add a `start` script: `parcel index.html`
  * Create index.html as our application starting point
  * Move content to `index.jsx` as a React application
* [x] Routing requests in the app
  * Wrap whole application in `<BrowserRouter>` (to have /paths/like/so instead of #like/so)
  * Wrap a set of routes in `<Routes>`
  * Wrap individual "destinations" in `<Route path="..." element={<SomeElement />} />`
  * Go to a route with `<Link to="...">`
* [x] List existing movies
  * `movies.map(m => <div>...</div>)`
  * Include `<div key=... />` to avoid error (and get correct behavior)
* [x] Add new movies using a form
  * useState
  * `<input value={state} onChange={e => setState(e.target.value)} />`
  * `<form onSubmit={handleSubmit} >`
* [x] Encapsulate movies state
  * `const movieApi = { list: () => ... }`
  * `<ListMovies movieApi={movieApi}`
  * Make the API async
* [x] Serve React app from Express
  * `const app = express()`
  * `express.listen(process.env.PORT || 3000)`
  * `app.use(express.static())`
* [x] Move Movie to Express (server-side)
  * `app.get("/api/movies", (req, res) => ...)`
  * `app.post("/api/movies", (req, res) => ...)`
  * `app.use(bodyParser.json())`
* [x] Deploy on Heroku for everyone to see!
  * `npm run build`
  * `npm start`
