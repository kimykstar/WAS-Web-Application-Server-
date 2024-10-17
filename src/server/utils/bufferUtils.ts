export const splitBuffer = (buffer: Buffer, seperator: string): Buffer[] => {
  const resultBuffer: Buffer[] = [];
  let endIdx = -1;
  let startIdx = 0;
  while ((endIdx = buffer.indexOf(seperator, startIdx)) !== -1) {
    resultBuffer.push(buffer.slice(startIdx, endIdx));
    startIdx = endIdx + seperator.length;
  }

  resultBuffer.push(buffer.slice(startIdx));
  return resultBuffer;
};
