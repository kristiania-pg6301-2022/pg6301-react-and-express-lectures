import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function FrontPage() {
    return <div>
        <h1>Front Page</h1>
        <ul>
            <li><Link to={"/movies"}>List existing movies</Link></li>
            <li><Link to={"/movies/new"}>Add new movie</Link></li>
        </ul>
    </div>;
}

function MovieCard({movie: {year, title, plot}}) {
    return <div>
        <h2>{title} ({year})</h2>
        <div>{plot}</div>
    </div>;
}

function ListMovies({movies}) {
    return <div>
        <h1>Movies</h1>
        {movies.map(m => <MovieCard key={m.title} movie={m}/>)}
    </div>;
}

function NewMovie({onAddMovie}) {
    const [title, setTitle] = useState("");
    const [plot, setPlot] = useState("");
    const [year, setYear] = useState("");
    return <form>
        <h1>New movie</h1>
        <div>
            Title: <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
            Year: <input value={year} onChange={e => setYear(e.target.value)} />
        </div>
        <div>
            Plot:
        </div>
        <div>
            <textarea value={plot} onChange={e => setPlot(e.target.value)} />
        </div>
        <div>
            <button>Submit</button>
        </div>
    </form>;
}

function Movies() {
    const [movies, setMovies] = useState([{
        title: "Don't look up",
        plot: "An impending global disaster, but will the politicians act?",
        year: 2021
    }]);

    function handleAddMovie() {

    }

    return <Routes>
        <Route path={""} element={<ListMovies movies={movies}/>}/>
        <Route path={"new"} element={<NewMovie onAddMovie={handleAddMovie}/>}/>
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
