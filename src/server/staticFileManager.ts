import fs from 'fs';
const STATIC_FILE_PATH: Record<string, string> = {
  css: './src/static/css',
  html: './src/static/views',
  js: './src/static/javascript',
  jpg: './src/static/images',
  png: './src/static/images',
  ico: './src/static/images',
}

Object.freeze(STATIC_FILE_PATH);

// isExistStaticFile이 true인 경우 정적파일 받아오기(확장자에 따라)
export const getStaticFile = (fileName: string): Buffer => {
  const [name, extension] = fileName.split('.');
  const filePath = `${STATIC_FILE_PATH[extension]}/${fileName}`
  return fs.readFileSync(filePath)
}

export const isExistStaticFile = (fileName: string): Boolean => { // 정적파일이 있는가? 확장자에 따라서(확장자 유효성 검증해야함)
  const [name, extension] = fileName.split('.');
  const fileNames = getStaticFileNames(STATIC_FILE_PATH[extension]);
  return (fileNames.includes(fileName)) ? true : false;
}

export const isValidExtension = (fileName: string): Boolean => {
  const [name, extension] = fileName.split('.');
  return Object.keys(STATIC_FILE_PATH).includes(extension)
}

const getStaticFileNames = (filePath: string) => {
  return fs.readdirSync(filePath);
};
