import graphql from '@kocal/rollup-plugin-graphql';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import html from '@open-wc/rollup-plugin-html';

import fs from 'fs';
import path from 'path';

const indexHtmlContent =
  fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8');

export default {
  input: 'main.js',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [
    replace({ DEPENDENCIES: require('./package.json').dependencies }),
    resolve(),
    commonjs(),
    graphql(),
    html({ html: indexHtmlContent.replace('main.ts', 'main.js') }),
  ]
}