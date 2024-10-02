import { isValidExtension, isExistStaticFile, getStaticFileContent } from "../../server/staticFileManager.ts";
import fs from 'fs';

describe('Static file manager test', () => {
  it.each([
    ['images/dog.jpg', true],
    ['css/index.css', true],
    ['user/index.html', true],
    ['images/favicon.ico', true],
    ['user/hello.ddd', false],
    ['user/hello', false],
    ['user/hello.test.js', false]
  ])('isValidExtension func test', (filePath, expectFlag) => {
    const flag = isValidExtension(filePath);
    expect(flag).toBe(expectFlag);
  })

  it.each([
    ['images/dog.jpg', true],
    ['css/index.css', true],
    ['user/index.html', true],
    ['images/favicon.ico', true],
    ['images/cat.png', false],
  ])('isExistStaticFile func test', (filePath, expectFlag) => {
    const flag = isExistStaticFile(filePath);
    expect(flag).toBe(expectFlag);
  })

  it.each([
    ['images/dog.jpg', './src/static/images/dog.jpg'],
    ['css/index.css', './src/static/css/index.css'],
    ['user/index.html', './src/static/user/index.html'],
    ['images/favicon.ico', './src/static/images/favicon.ico'],
  ])('getStaticFile func test', (fileName, filePath) => {
    const fileContent = fs.readFileSync(filePath);
    expect(getStaticFileContent(fileName))
      .toEqual(fileContent);
  })

})