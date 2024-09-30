import { server } from "./src/server/server.ts";

server.listen(3000, () => {
  console.log("HTTP server running on port 3000");
});
