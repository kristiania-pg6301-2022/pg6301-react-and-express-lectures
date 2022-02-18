import express from "express";

const app = express();

app.get("/api/login", (req, res) => {
  res.json({
    username: "admin",
    fullName: "Noen Andre Persson",
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
});
