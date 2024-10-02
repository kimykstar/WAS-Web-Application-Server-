import { isValidExtension, isExistStaticFile, getStaticFileContent } from "../../server/staticFileManager.ts";
import fs from 'fs';

describe('Static file manager test', () => {
  it.each([
    ['dog.jpg', true],
    ['index.css', true],
    ['index.html', true],
    ['favicon.ico', true],
    ['hello.ddd', false],
    ['hello', false],
    ['hello.test.js', false]
  ])('isValidExtension func test', (fileName, expectFlag) => {
    const flag = isValidExtension(fileName);
    expect(flag).toBe(expectFlag);
  })

  it.each([
    ['dog.jpg', true],
    ['index.css', true],
    ['index.html', true],
    ['favicon.ico', true],
    ['cat.png', false],
  ])('isExistStaticFile func test', (fileName, expectFlag) => {
    const flag = isExistStaticFile(fileName);
    expect(flag).toBe(expectFlag);
  })

  it.each([
    ['dog.jpg', './src/static/images/dog.jpg'],
    ['index.css', './src/static/css/index.css'],
    ['index.html', './src/static/views/index.html'],
    ['favicon.ico', './src/static/images/favicon.ico'],
  ])('getStaticFile func test', (fileName, filePath) => {
    const fileContent = fs.readFileSync(filePath);
    expect(getStaticFileContent(fileName))
      .toEqual(fileContent);
  })

})