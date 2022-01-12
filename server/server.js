import express from "express";
import path from "path";


const app = express();

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

app.get("/api/movies", (req, res) => {
    res.json(movies);
});

app.post("/api/movies", (req, res) => {
    const { title, plot, year } = req.body;
    movies.push({title, plot, year});
    res.status(200).end();
})


app.use(express.static(path.resolve("..", "client", "dist")));
app.use((req, res) => {
    res.sendFile(path.resolve("..", "client", "dist", "index.html"));
})


const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Started on http://localhost:" + server.address().port);
})
