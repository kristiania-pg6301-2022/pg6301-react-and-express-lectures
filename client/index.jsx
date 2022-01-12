import * as React from "react";
import * as ReactDOM from "react-dom";

import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

function FrontPage() {
    return <div>
        <h1>Kristiania Movie Database</h1>
        <ul>
            <li><Link to={"/movies"}>List Movies</Link></li>
            <li><Link to={"/movies/new"}>Add Movie</Link></li>
        </ul>
    </div>;
}

function ListMovies({moviesApi}) {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState();
    useEffect(async () => {
        setLoading(true);
        setMovies(await moviesApi.list());
        setLoading(false);
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    return <div>
        <h1>List movies</h1>
        {movies.map(m =>
            <div key={m.title}><h2>{m.title} ({m.year})</h2>
                <div>{m.plot}</div>
            </div>)}
    </div>;
}

function NewMovie({moviesApi}) {
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        const movie = {title, year, plot};
        await moviesApi.add(movie);
        navigate("/");
    }
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    return <form onSubmit={handleSubmit}>
        <h1>Add movie</h1>
        <div><label>Title: <input value={title} onChange={e => setTitle(e.target.value)} /></label></div>
        <div><label>Year: <input value={year} onChange={e => setYear(e.target.value)} /></label></div>
        <div><label>Plot: <textarea value={plot} onChange={e => setPlot(e.target.value)} /></label></div>
        <button>Submit</button>
    </form>;
}

function Application() {
    const moviesApi = {
        list: async () => {
            const res = await fetch("/api/movies")
            return await res.json();
        },
        add: async (movie) => {
            await fetch("/api/movies", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(movie)
            })
        }
    }

    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/movies"} element={<ListMovies moviesApi={moviesApi}/>}/>
            <Route path={"/movies/new"} element={<NewMovie moviesApi={moviesApi}/>}/>
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<Application/>, document.getElementById("app"));
