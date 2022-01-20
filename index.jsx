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

const MOVIES = [
    {
        title: "Don't look up",
        plot: "Impending disaster, but will politicians act?",
        year: 2021
    },
    {
        title: "PG6301",
        plot: "Johannes Codes, everyone is confused",
        year: 2022
    },
]

function MovieCard({movie}) {
    const {title, plot, year} = movie;
    return <div>
        <h2>{title} ({year})</h2>
        <p>{plot}</p>
    </div>;
}

function ListMovies() {
    return <div>
        <h1>Movies</h1>
        {MOVIES.map(movie => <MovieCard key={movie.title} movie={movie}/>)}
    </div>;
}

function MovieApplication() {
    return <Routes>
        <Route path={"/"} element={<ListMovies/>}/>
        <Route path={"/new"} element={<h1>Create new movie</h1>}/>
        <Route path={"*"} element={<h1>Movie not found</h1>}/>
    </Routes>
}

function Application() {


    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/movies/*"} element={<MovieApplication />}/>
            <Route path={"*"} element={<h1>Not found</h1>}/>
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);
