import graphql from '@apollo-elements/rollup-plugin-graphql';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import html from '@open-wc/rollup-plugin-html';

import fs from 'fs';
import path from 'path';

const indexHtmlContent =
  fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8');

const DEPENDENCIES =
  JSON.stringify(require('./package.json').dependencies);

export default {
  input: 'main.js',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [
    replace({ DEPENDENCIES }),
    resolve(),
    commonjs(),
    graphql(),
    html({ html: indexHtmlContent.replace('main.ts', 'main.js') }),
  ]
}