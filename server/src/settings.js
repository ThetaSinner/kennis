import path from 'path';

export const settings = {
  baseDir: process.env.CONTENT_DIR || path.join(__dirname, '../content'),

  allowedExtensions: ['.md']
}
