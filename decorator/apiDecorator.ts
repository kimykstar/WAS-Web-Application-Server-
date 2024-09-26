import { InvalidRegexException } from "../exception/LogicException";
import { router, Method } from "../Router";

const URI_VALID_REGEX = /^(\/[^\/]+)+/;

export const getMapping = (uri: string) => {
  // 올바른 uri인지 검증
  if (!URI_VALID_REGEX.test(uri)) {
    throw new InvalidRegexException(uri);
  }

  const pathParams: string[] = [];

  const replacePathParams = (_: string, matchText: string) => {
    pathParams.push(matchText);
    return "([^\\/]+)";
  };

  const regexText = uri.replace(/:([^\/]+)/g, replacePathParams);

  const regExp = new RegExp(regexText);

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    router.addApi("GET", regExp, descriptor.value);
  };
};
