import fs from 'fs';

const STATIC_FILE_PATH: string = './src/static';

const VALID_FILE_EXTENSION: Array<string> = [
  'css', 'js', 'html', 'jpg', 'png', 'ico'
]

Object.freeze(STATIC_FILE_PATH);

export const getStaticFileContent = (filePath: string): Buffer => {
  const fileAbsolutePath = `${STATIC_FILE_PATH}/${filePath}`
  return fs.readFileSync(fileAbsolutePath)
}

export const isExistStaticFile = (filePath: string): Boolean => {
  return (fs.existsSync(`${STATIC_FILE_PATH}/${filePath}`)) ? true : false;
}

export const isValidExtension = (filePath: string): Boolean => {
  const paths = filePath.split('/');
  const [name, extension] = paths[paths.length - 1].split('.');
  return VALID_FILE_EXTENSION.includes(extension)
}

