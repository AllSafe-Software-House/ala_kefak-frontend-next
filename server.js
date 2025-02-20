// const jsonServer = require("json-server");
// const auth = require("json-server-auth");

import jsonServer from "json-server"
import auth from "json-server-auth"


const server = jsonServer.create();
const router = jsonServer.router("db.json"); 
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(auth);
server.use(router);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
