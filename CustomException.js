class CustomException extends Error {
  #statusCode;
  #message;

  constructor(statusCode, message) {
    super();
    this.#statusCode = statusCode;
    this.#message = message;
  }
}

class NotFoundUriException extends CustomException {
  constructor() {
    super(404, "해당하는 uri에 대한 리소스를 찾을 수 없습니다.");
  }
}

module.exports = { CustomException, NotFoundUriException };
