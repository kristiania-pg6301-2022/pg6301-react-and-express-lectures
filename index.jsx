import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function FrontPage() {
    return <div>
        <h1>Movie database</h1>
        <ul>
            <li><Link to={"/movies"}>Show movies</Link></li>
            <li><Link to={"/movies/new"}>Create new movie</Link></li>
        </ul>
    </div>;
}

function MovieApplication() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route path={"/movies"} element={<h1>Movies</h1>} />
            <Route path={"/movies/new"} element={<h1>Create new movie</h1>} />
            <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(
    <MovieApplication/>,
    document.getElementById("app")
);
