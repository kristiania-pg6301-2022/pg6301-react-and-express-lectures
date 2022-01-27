import React from "react";

export function ListMovies() {
    return <div><h1>List movies</h1>
        <ul>
            <li>Movie 1</li>
            <li>Movie 2</li>
        </ul>
    </div>;
}

export function NewMovieForm() {
    return <form>
        <h1>Add new movie</h1>
        <div>
            Title: <input/>
        </div>
        <div>
            Year: <input/>
        </div>
        <div>
            Plot:
            <div><textarea/></div>
        </div>
    </form>;
}
