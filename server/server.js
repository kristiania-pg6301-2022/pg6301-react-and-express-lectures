import express from "express";
import path from "path";


const app = express();

app.use(express.static(path.resolve("..", "client", "dist")));
app.use((req, res) => {
    res.sendFile(path.resolve("..", "client", "dist", "index.html"));
})


const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Started on http://localhost:" + server.address().port);
})
