import Response from "../../server/Response";

describe('Response entity generate test', () => {
  it('Response entity generation success', () => {
    const response = new Response();
    response.setStatusCode(200);
    response.addHeader('Content-Type', 'text/plain');
    response.setBody('email=12&nickName=12&password=12');

    const expectResponse = Buffer.from('HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nemail=12&nickName=12&password=12');
    expect(response.getResponse())
      .toEqual(expectResponse);
  })
})