const net = require("net");
const fs = require("fs");
const { parseURI } = require("./uriParser.js");
const { logger } = require("./logger.js");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    logger.http(request);
    const uri = parseURI(request);
    console.log(uri);
    if (request.includes("GET")) {
      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Content-Type: text/html\r\n");
      socket.write("\r\n");
      const index = fs.readFileSync("./index.html", "utf-8");
      socket.write(index);
      socket.end();
    }
  });
});

server.listen(3000, () => {
  console.log("HTTP server running on port 3000");
});
