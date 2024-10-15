export default class RequestBody {
  private bodyContent: Record<string, object> = {};

  parseMultipartBody(boundary: string, body: string) {
    const parts = body.split(boundary);
    return parts;
  }
}
