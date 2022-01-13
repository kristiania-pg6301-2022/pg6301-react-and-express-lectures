import * as React from "react";
import {useState, useEffect} from "react";
import * as ReactDOM from "react-dom";
import {Routes, Route, Link, BrowserRouter, useNavigate} from "react-router-dom";


const MOVIES = [
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
];


function FrontPage() {
    return <div>
        <h1>Kristiania Movie Database</h1>
        <ul>
            <li><Link to="/movies">List movies</Link></li>
            <li><Link to="/movies/new">New Movie</Link></li>
        </ul>
    </div>;
}

function ListMovies({moviesApi}) {
    const [movies, setMovies] = useState();
    useEffect(async () => {
        console.log("hei");
        setMovies(undefined);
        setMovies(await moviesApi.listMovies());
    }, []);

    if (!movies) {
        return <div>Loading...</div>
    }

    return <div>
        <h1>All movies</h1>
        {movies.map(m =>
            <div key={m.title}>
                <h2>{m.title} ({m.year})</h2>
                <div>{m.plot}</div>
            </div>
        )}
    </div>;
}

function NewMovie({moviesApi}) {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        await moviesApi.onAddMovie({title, year, plot});
        navigate("/");
    }

    return <form onSubmit={handleSubmit}>
        <h1>New movie</h1>
        <div>
            <label>Title: <input value={title} onChange={e => setTitle(e.target.value)} /></label>
        </div>
        <div>
            <label>Year: <input value={year} onChange={e => setYear(e.target.value)} /></label>
        </div>
        <div>
            <label>Plot: <textarea value={plot} onChange={e => setPlot(e.target.value)} /></label>
        </div>
        <button>Submit</button>
    </form>;
}

function Application() {
    const moviesApi = {
        onAddMovie: async (m) =>  MOVIES.push(m),
        listMovies: async () => {
            const res = await fetch("/api/movies");
            return res.json();
        }
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/movies/new" element={<NewMovie moviesApi={moviesApi}/>}/>
            <Route path="/movies" element={<ListMovies moviesApi={moviesApi}/>}/>
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);
