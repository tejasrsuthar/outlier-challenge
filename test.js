const tape = require("tape");
const jsonist = require("jsonist");

const PORT = (process.env.PORT =
  process.env.PORT || require("get-port-sync")());
const server = require("./server");

const urlBase = `http://localhost:${PORT}`;

tape("should respond hello", (t) => {
  jsonist.get(urlBase, (err, body) => {
    if (err) t.error(err);

    t.equal(body.msg, "hello");
    t.end();
  });
});

tape("should respond b64", (t) => {
  jsonist.get(`${urlBase}/b64/hello`, (err, body) => {
    if (err) t.error(err);

    t.equal(body.b64, "aGVsbG8=");
    t.end();
  });
});

tape("cleanup", function (t) {
  server.close();
  t.end();
});
