import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {useState} from "react";

function FrontPage() {
    return <div>
        <h1>Front Page</h1>
        <ul>
            <li><Link to={"/movies"}>List existing movies</Link></li>
            <li><Link to={"/movies/new"}>Add new movie</Link></li>
        </ul>
    </div>;
}

function MovieCard(props) {
    return <div>
        <h2>{props.movie.title} ({props.movie.year})</h2>
        <div>{props.movie.plot}</div>
    </div>;
}

function ListMovies(props) {
    const movies = props.movies;
    return <div>
        <h1>Movies</h1>
        {movies.map(m => <MovieCard key={m.title} movie={m}/>)}
    </div>;
}

function Movies() {
    const [movies, setMovies] = useState([{
        title: "Don't look up",
        plot: "An impending global disaster, but will the politicians act?",
        year: 2021
    }]);

    return <Routes>
        <Route path={""} element={<ListMovies movies={movies}/>}/>
        <Route path={"new"} element={<h1>New movie</h1>}/>
    </Routes>
}

function MoviesApplication() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/movies/*"} element={<Movies />}/>
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<MoviesApplication/>, document.getElementById("app"));
