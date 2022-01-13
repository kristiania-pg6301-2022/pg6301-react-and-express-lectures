import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();

const MOVIES = [
    {
        title: "The Matrix - from server",
        plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        year: 1999
    },
    {
        title: "The Color Purple - from server",
        plot: "A black Southern woman (Whoopi Goldberg) struggles to find her identity after suffering years of abuse from her father and others over 40 years.",
        year: 1985
    }
];

app.use(bodyParser.json());

app.get("/api/movies", (req, res) => {
    res.json(MOVIES);
});

app.post("/api/movies", (req, res) => {
    const {title, year, plot} = req.body;
    MOVIES.push({title, year, plot});
    res.sendStatus(200);
})

app.use(express.static(path.resolve("..", "client", "dist")));
app.use((req, res) => {
    res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});


const server = app.listen(3000, () => {
    console.log("listening on http://localhost:" + server.address().port);
});
