import { server } from "../../server/server.ts";
import request from "supertest";

describe("API request Test", () => {
  it("/create API signup test", () => {
    const response = request(server)
      .post("/create")
      .send("email=12&nickName=12&password=12")
      .expect(302);
  });
});
