import express from "express";
import { AddressInfo } from "net";

const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `started on http://localhost:${(server.address() as AddressInfo).port}`
  );
});
