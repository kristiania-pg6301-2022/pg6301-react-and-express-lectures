# PG6301 Web Development and API design

Welcome to this course in Web Development and API Design. In this course, we will
look at creating single-page applications with React backed by APIs implemented
with React. The application will store data in MongoDB and be deployed on Heroku


## Understanding the course

In this course, we expect you to become proficient at building web applications
with JavaScript, React and Express. During the lectures, you will see live coding
of how such applications may be constructed and many topics will be explained
along the way.

The course will not have slides, but all the lectures will be recorded and made
available on Canvas. Each lecture will consist of 10-15 commits which will be
availble on Github for student's reference.

There are many topics that we believe are more suitable for self-study than
classroom explanations and you will not always be shown how all topics are used
in a more general situation. *You will be expected to master some such topics
to get a top grade at the exam*. In order to be prepared for the exam, you have
o follow the lectures, but you also have to be able to solve new problems and
find relevant information along the way. To be able to do this, it's extremely
valuable for you to follow the exercises along the lectures.

## Lectures

## Lecture 1: A tour of React, Express and Heroku

We explore the most important parts to the whole application up and running on
a server. This lecture will be way to fast to understand and will serve merely
as a teaser to topics that will be important through the course. After the
lecture, you will only be expected to know the basics of how to create a React
application with Parcel and React Router

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/01)
* [Reference implementation](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/01)
* [Exercise answer](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/exercise/answer/01)

### Lecture 2: React and Jest

We will review the React topics from the last lecture: Creating a React app,
creating functional components and using props, state and effects. We will
also explore React Router more in depth

We add tests for the React code and run the test on Github Actions

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/02)
* [Reference implementation](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/02)
* [Exercise answer](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/exercise/answer/02)
* [Fireship: React in 100 seconds](https://youtu.be/Tn6-PIqc4UM)
* [Fireship: every React hook](https://youtu.be/TNhaISOUy6Q)

### Lecture 3: Code quality

Jest, Github Actions, Prettier, Eslint and Typescript

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/03)
* [Reference implementation](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/03)
* [Exercise answer](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/exercise/answer/03)

### Lecture 4: Implementing server code on Express

Express and supertest

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/04)
* [Reference implementation](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/04)
* [Exercise text](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/blob/exercise/04/start/README.md)
* [Exercise answer](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/exercise/answer/04)
* [Fireship.io intro til Express](https://youtu.be/-MTSQjw5DrM)

### Lecture 5: Publishing your application on Heroku

### Lecture 6: Storing data MongoDB

### Lecture 7: Who's your user? OpenID Connect

### Lecture 8: Robust interaction between the client and the server

### Lecture 9: Web Sockets

### Lecture 10: APIs and OpenID Connect/Ouath

### Lecture 11:

### Lecture 12: Getting ready for the exam

### Possible bonus topics

* Using Github API


## Problem domains

### Lecture problem domain: Movie comments

### Exercise problem domain: Quiz game

### Exam problem domain: To be decided ;-)



## Reference material

When creating a project, make sure you add `node_modules`, `.parcel-cache` and `dist` to `.gitignore`

### Creating a React Application

From root of project:

1. `mkdir client`
2. `cd client`
3. `npm init -y`
4. `npm install --save-dev parcel`
5. `npm install --save react react-dom react-router-dom`
6. Add the following `"script"` in `package.json`:
   * `"dev": "parcel index.html"`
7. Create a minimal HTML file as `index.html`. This is the essence:
   * `<html><body><div id="app"></div></body><script src="index.jsx" type="module"></script></html>`
8. Create a minimal `index.jsx`. In addition to importing React and ReactDOM, this is the essence:
   * `ReactDOM.render(<h1>Hello World</h1>, document.getElementById("app"));`
9. Run the application with `npm run dev`

### Creating an Express backend

From root of project:

1. `mkdir server`
2. `cd server`
3. `npm init -y`
4. `npm install --save express`
5. `npm install --save-dev nodemon`
6. Add the following `"script"` in `package.json`:
    * `"dev": "nodemon server.js"`
7. Set `"type": "module"` in `package.json`
8. Create a minimal JavaScript file as `server.js`. This is the essence:
    * `import express from "express";`
    * `const app = express();`
    * `app.listen(process.env.PORT || 3000);`

### Creating a root project with both server and client 

From root of project:

1. `npm init -y`
2. `npm install --save-dev concurrently`
4. Add the following "scripts" in `package.json`:
    * `"dev": "concurrently npm:dev:server npm:dev:client"`
    * `"dev:server": "cd server && npm run dev"`
    * `"dev:client": "cd client && npm run dev"`
5. Start everything with `npm run start`


### Creating a project deployable at Heroku

1. In root `package.json`, define correct version of Node and NPM:
   1. `"engines": { "node": "16.13.1", "npm": "8.3.0" }`
2. In root `package.json`, create `build` script for Heroku:
   * `"build": "npm run build:client && npm run build:server`,
   * `"build:client": "cd client && npm install --include=dev && npm run build"`
   * `"build:server": "cd client && npm install`
3. In client `package.json`, create `build` script:
   * `"build": "parcel build index.html"`
4. In root `package.json`, create `start` script for Heroku:
   * `"start": "cd server && npm start"`
5. In server `package.json`, create `start` script:
    * `"start": "node server.js"`


### Crucial tasks

When you can get this to work, you will need to master the following:

* Serve the frontend code from Express. In `server.js`:
   * `app.use(express.static(path.resolve(__dir, "..", "..", "dist")));`
* Use React Router in front-end
* Make React call API calls on the backend (using `fetch`)
* Make Express respond to API calls

#### React Router

```jsx
export function MoviesApplication() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/movies/*"} element={<Movies />}/>
        </Routes>
    </BrowserRouter>;
}

function Movies() {
   return <Routes>
      <Route path={""} element={<ListMovies movies={movies}/>}/>
      <Route path={"new"} element={<NewMovie onAddMovie={handleAddMovie}/>}/>
   </Routes>
}

function FrontPage() {
   return <div>
      <h1>Front Page</h1>
      <ul>
         <li><Link to={"/movies"}>List existing movies</Link></li>
         <li><Link to={"/movies/new"}>Add new movie</Link></li>
      </ul>
   </div>;
}
```

#### Express middleware for dealing with routing

```javascript
app.use((req, res, next) => {
  if (req.method === "GET") {
    // TODO: We probably should return 404 instead of index.html for api-calls as well
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    next();
  }
});
```

### Fetching data from server

#### The useLoading hook

```javascript
export function useLoading(loadingFunction, deps = []) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    async function load() {
        setLoading(true);
        setData(undefined);
        setError(undefined);
        try {
            setData(await loadingFunction());
        } catch (e) {
          // TODO: Deal with errors
        } finally {
            setLoading(false);
        }
    }
    useEffect(load, deps);
    return { loading, data };
}
```

### Testing

#### Installing

When using test, we need to add some babel mumbo jumbo to get Jest to understand modern JavaScript syntax as well as JSX tags

1. `npm install -D jest babel-jest`

You need the following fragment or similar in `package.json`:

```
  "babel": {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "current"
          }
        }
      ],
      "@babel/preset-react"
    ]
  }
```

With this in place, it should be possible to run tests like those below.

#### Snapshot testing - check that a view is rendered correctly

```javascript
  it("loads book", async () => {
    // Fake data instead of calling the real backend
    const getBook = () => ({
      title: "My Book",
      author: "Firstname Lastname",
      year: 1999,
    });
    // Construct an artification dom element to display the app (with jsdom)
    const container = document.createElement("div");
    // The act method from react-dom/test-utils ensures that promises are resolved
    //  - that is, we wait until the `getBook` function returns a value
    await act(async () => {
      await ReactDOM.render(
        <!-- construct an object with the necessary wrapping - in our case, routing -->
        <MemoryRouter initialEntries={["/books/12/edit"]}>
          <Route path={"/books/:id/edit"}>
            <!-- use shorthand properties to construct an api object with
              getBook property with the getBook function
              -->
            <EditBookPage bookApi={{ getBook }} />
          </Route>
        </MemoryRouter>,
        container
      );
    });
    // Snapshot tests fail if the page is changed in any way - intentionally or non-intentionally
    expect(container.innerHTML).toMatchSnapshot();
    // querySelector can be used to find dom elements in order to make assertions
    expect(container.querySelector("h1").textContent).toEqual("Edit book: My Book")
  });
```

#### Simulate events

```javascript
  it("updates book on submit", async () => {
    const getBook = () => ({
      title: "My Book",
      author: "Firstname Lastname",
      year: 1999,
    });
    // We create a mock function. Instead of having functionality,
    // this fake implementation of updateBook() lets us record and
    // make assertions about the calls to the function
    const updateBook = jest.fn();
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter initialEntries={["/books/12/edit"]}>
          <Route path={"/books/:id/edit"}>
            <EditBookPage bookApi={{ getBook, updateBook }} />
          </Route>
        </MemoryRouter>,
        container
      );
    });

    // The simulate function lets us create artificatial events, such as
    // a change event (which will trigger the `onChange` handler of our 
    // component
    Simulate.change(container.querySelector("input"), {
      // The object we pass must work with e.target.value in the event handler
      target: {
        value: "New Value",
      },
    });
    Simulate.submit(container.querySelector("form"));
    // We check that the call to `updateBook` is as expected
    // The value "12" is from MemoryRouter intialEntries
    expect(updateBook).toHaveBeenCalledWith("12", {
      title: "New Value",
      author: "Firstname Lastname",
      year: 1999,
    });
  });
```

#### Using supertest to check server side behavior

```javascript
const request = require("supertest");
const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/booksApi"));

describe("...", () => {

  it("can update existing books", async () => {
    const book = (await request(app).get("/2")).body;
    const updated = {
      ...book,
      author: "Egner",
    };
    await request(app).put("/2").send(updated).expect(200);
    await request(app)
      .get("/2")
      .then((response) => {
        expect(response.body).toMatchObject({
          id: 2,
          author: "Egner",
        });
      });
  });

});
```

## WebSockets

### Client side:

```javascript
    // Connect to ws on the same host as we got the frontend
    const ws = new WebSocket("ws://" + window.location.host);
    // log out the message and destructor the contents when we receive it
    ws.onmessage = (msg) => {
      console.log(msg);
      const { username, message, id } = JSON.parse(msg.data);
    };
    // send a new message
    ws.send(JSON.stringify({username: "Myself", message: "Hello"}));
```

### Server side

```javascript

// Create a websocket server
const wsServer = new ws.Server({ noServer: true });

// Keep a list of all incomings connections
const sockets = [];
let messageIndex = 0;
wsServer.on("connection", (socket) => {
  // Add this connection to the list of connections
  sockets.push(socket);
  // Set up the handling of messages from this sockets
  socket.on("message", (msg) => {
    // Destructor the incoming message
    const { username, message } = JSON.parse(msg);
    // Add fields from server side
    const id = messageIndex++;
    // broadcast a new message to all recipients
    for (const recipient of sockets) {
      recipient.send(JSON.stringify({ id, username, message }));
    }
  });
});

// Start express app
const server = app.listen(3000, () => {
  // Handle incoming clients
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      // This will pass control to `wsServer.on("connection")`
      wsServer.emit("connection", socket, req);
    });
  });
});
```

## OpenID Connect - Log on with Google

### Client side (implicit flow)

"Implicit flow" means that the login provider (Google) will not require a client secret to complete the authentication. This is often not recommended, and for example Active Directory instead uses another mechanism called PKCE, which protects against some security risks.

1. Set up the application in [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Create a new OAuth client ID and select Web Application. Make sure `http://localhost:3000` is added as an Authorized JavaScript origin and `http://localhost:3000/callback` is an authorized redirect URI
2. To start authentication, redirect the browser (see code below)
3. To complete the authentication, pick up the `access_token` when Google redirects the browser back (see code below)
4. Save the `access_token` (e.g. in `localStorage`) and add as a header to all requests to backend

#### Redirect the client to authenticate

```javascript
export function Login() {
  async function handleStartLogin() {
    // Get the location of endpoints from Google
    const { authorization_endpoint } = await fetchJson(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    // Tell Google how to authentication
    const query = new URLSearchParams({
      response_type: "token",
      scope: "openid profile email",
      client_id:
        "<get this from Google Cloud Console>",
      // Tell user to come back to http://localhost:3000/callback when logged in
      redirect_uri: window.location.origin + "/callback",
    });
    // Redirect the browser to log in
    window.location.href = authorization_endpoint + "?" + query;
  }

  return <button onClick={handleStartLogin}>Log in</button>;
}
```

In the case of Active Directory, you also need parameters `response_type: "code"`, `response_mode: "fragment"`, `code_challenge_method` and `code_challenge` (the latest two are needed for PKCE).

#### Handle the authentication callback

```javascript

// Router should take user here on /callback
export function CompleteLoginPage({onComplete}) {
  // Given an URL like http://localhost:3000/callback#access_token=sdlgnsoln&foo=bar,
  //  window.location.hash will give the part starting with "#"
  //  ...substring(1) will remove the "#"
  //  and Object.fromEntries(new URLSearchParams(...)) will parse it into an object
  // In this case, hash = { access_token: "sdlgnsoln", foo: "bar" }
  const hash = Object.fromEntries(
    new URLSearchParams(window.location.hash.substr(1))
  );
  // Get the values returned from the login provider. For Active Directory,
  // this will be more complex
  const { access_token, error } = hash;
  useEffect(() => {
    // Send the access token back to the outside application. This should
    //  be saved to localStorage and then redirect the user
    onComplete({access_token});
  }, [access_token]);
  
  if (error) {
    // deal with the user failing to log in or to give consent with Google
  }
  
  return <div>Completing loging...</div>;
}
```

For Active Directory, the hash will instead include a `code`, which you will then need to send to the `token_endpoint` along with the `client_id` and `redirect_uri` as well as `grant_type: "authorization_code"` and the `code_verifier` value from PKCE. This call will return the `access_token`.

#### Handle access_token on the backend

```javascript

app.use(async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (authorization) {
    const { userinfo_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    req.userinfo = await fetchJSON(userinfo_endpoint, {
      headers: { authorization },
    });
  }
  next();
});

app.get("/profile", (req, res) => {
  if (!req.userinfo) {
    return res.send(200);
  }
});
```


### From last year

The first lectures of this course (as of 2021) are documented on
[Andrea's](https://github.com/arcuri82/web_development_and_api_design) Github
page for the course. Here, you will find slides and exercises.

For lecture 7-12, the current Github repository contains the code that was
presented during the lectures. Each lecture contains slides (from Andrea),
a commit log for the live coding demonstrated during the lecture, a
reference implementation of the live code objective and the Github issues
resolved during the lecture.


## Lectures from 2021

### Lecture 1: A simple SPA

### Lecture 2: Express

### Lecture 3: Jest

### Lecture 4: React props, state and context, React Router

### Lecture 5: Interacting with the server

### Lecture 7: Creating a REST-ful API with Express

The lecture covers the "book application" and introduced React Hooks and Parcel

* [Slides](https://github.com/arcuri82/web_development_and_api_design/blob/master/docs/slides/lesson_07.pdf)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/07)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/07)

### Lecture 8: REST-ful APIs, part 2

The lecture continued the "book application" and repeated testing with modern React

* [Slides](https://github.com/arcuri82/web_development_and_api_design/blob/master/docs/slides/lesson_08.pdf)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/08)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/08)
* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/1?closed=1)

### Lecture 9: Sessions, cookies and login

The lecture starts a new minimal React + Express application and implements https, cookies and sessions

* [Slides](https://github.com/arcuri82/web_development_and_api_design/blob/master/docs/slides/lesson_09.pdf)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/09)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/09)
* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/2?closed=1)

### Lecture 10: Passport, OpenID Connect and login with Google

The lecture uses Passport to login with password and with Google and also shows how to implement OpenID
Connect "manually" in the front-end. We also covered Cross Origin Resource Sharing (CORS) to access
an API on another host/port than the client.

* [Slides](https://github.com/arcuri82/web_development_and_api_design/blob/master/docs/slides/lesson_10.pdf)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/10)
   * [Commit log from live exercise rehearsal](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/exercise/10.2)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/10)
* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/3?closed=1)

### Lecture 11: Effective testing

In this lecture, we cover testing that React components render correctly, that
button clicks and inputs have the desired effect and that Express responds
correctly to API calls.

The lecture continues with the code from [lecture 8](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/lectures/08)

* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/4)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/11)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/11)
* [Commit log from live exercise rehearsal](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/exercise/11)

### Lecture 12: Web Sockets

In this lecture, we cover more real-time communication between server and clients using WebSockets. We will also revisit testing of the client in the context of this application.

This lecture starts with a new React + Express application

* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/5)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/12)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/12)

### Bonus lecture: Active Directory

* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/13)
* [Reference implementation from lecture 10](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/10)

