import jsonServer from "json-server";

import db, { mockAdminUser } from "./db";


const server = jsonServer.create();
const router = jsonServer.router(db());
const middlewares = jsonServer.defaults();
server.use(jsonServer.bodyParser);

// CORS headers for mobile/local network access
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const TOKEN = "123456789";

server.use(middlewares);
server.post("/signin", (req, res) => {
  const { body } = req;
  if (body.username === "admin" && body.password === "admin") {
    return res.status(200).json({
      token: TOKEN,
      user: mockAdminUser,
    });
  }
  return res.status(401).json({
    message: "Username or password is incorrect",
  });
});
server.put("/user", (req, res) => {
  const { headers } = req;
  if (headers.authorization !== `Bearer ${TOKEN}`) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  return res.status(204).json({});
});
server.use(router);

server.listen(3000, "0.0.0.0", () => {
  console.log("JSON Server is running on 0.0.0.0:3000");
});
