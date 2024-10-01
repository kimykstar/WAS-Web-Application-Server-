import { server } from "../../server/server.ts";
import request from "supertest";

describe("API request Test", () => {
  it("/create API signup test", () => {
    const response = request(server)
      .get("/create?userId=javajigi&password=password&name=%EB%B0%95%EC%9E%AC%EC%84%B1&email=javajigi%40slipp.net")
      .expect(200);
  });
});
