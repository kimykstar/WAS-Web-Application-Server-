import fs from 'fs';

const STATIC_FILE_PATH: string = './src/static';

const VALID_FILE_EXTENSION: Array<string> = [
  'css', 'js', 'html', 'jpg', 'png', 'ico'
]

// const STATIC_FILE_PATH: Record<string, string> = {
//   css: './src/static/css',
//   html: './src/static/views',
//   js: './src/static/javascript',
//   jpg: './src/static/images',
//   png: './src/static/images',
//   ico: './src/static/images',
// }

Object.freeze(STATIC_FILE_PATH);

// isExistStaticFile이 true인 경우 정적파일 받아오기(확장자에 따라)
export const getStaticFileContent = (filePath: string): Buffer => {
  const fileAbsolutePath = `${STATIC_FILE_PATH}/${filePath}`
  return fs.readFileSync(fileAbsolutePath)
}

export const isExistStaticFile = (filePath: string): Boolean => { // 정적파일이 있는가? 확장자에 따라서(확장자 유효성 검증해야함)
  return (fs.existsSync(`${STATIC_FILE_PATH}/${filePath}`)) ? true : false;
}

export const isValidExtension = (filePath: string): Boolean => {
  const paths = filePath.split('/');
  const [name, extension] = paths[paths.length - 1].split('.');
  return VALID_FILE_EXTENSION.includes(extension)
}

const getStaticFileNames = (filePath: string) => {
  return fs.readdirSync(filePath);
};
