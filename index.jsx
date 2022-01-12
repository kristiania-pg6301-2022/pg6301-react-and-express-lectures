import * as React from "react";
import * as ReactDOM from "react-dom";

import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

const movies = [
    {
        title: "The Matrix",
        plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        year: 1999
    },
    {
        title: "The Color Purple",
        plot: "A black Southern woman (Whoopi Goldberg) struggles to find her identity after suffering years of abuse from her father and others over 40 years.",
        year: 1985
    }
]


function FrontPage() {
    return <div>
        <h1>Kristiania Movie Database</h1>
        <ul>
            <li><Link to={"/movies"}>List Movies</Link></li>
            <li><Link to={"/movies/new"}>Add Movie</Link></li>
        </ul>
    </div>;
}

function ListMovies() {
    return <div>
        <h1>List movies</h1>
        {movies.map(m =>
            <div key={m.title}><h2>{m.title} ({m.year})</h2>
                <div>{m.plot}</div>
            </div>)}
    </div>;
}

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/movies"} element={<ListMovies/>}/>
            <Route path={"/movies/new"} element={<h1>Add movie</h1>}/>
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<Application/>, document.getElementById("app"));
