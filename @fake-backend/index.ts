import jsonServer from "json-server";
import db from "./db";
const server = jsonServer.create();
const router = jsonServer.router(db());
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
