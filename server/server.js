import express from "express";

const app = express();

app.get("/api/movies", (req, res) => {
    res.json([
        {title: "Hello"}
    ])
})


const server = app.listen(3000, () => {
    console.log("listening on http://localhost:" + server.address().port);
});
