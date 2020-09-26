import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { readFileSync } from 'fs';

import _commonjs from '@rollup/plugin-commonjs';
import _replace from '@rollup/plugin-replace';
import _graphql from '@apollo-elements/rollup-plugin-graphql';

const graphql = fromRollup(_graphql);
const replace = fromRollup(_replace);
const commonjs = fromRollup(_commonjs);

const cjsIncludes = [
  '**/node_modules/**/*.cjs.js',
  '**/node_modules/**/*.cjs',
  '**/node_modules/fast-json-stable-stringify/index.js',
  '**/graphql-tag/**/*',
  '**/node_modules/zen-observable/**/*',
];

const DEPENDENCIES =
  JSON.stringify(JSON.parse(readFileSync('./package.json', 'utf-8')).dependencies);

export default /** @type {import('@web/dev-server').DevServerConfig} */ {
  nodeResolve: true,
  appIndex: 'index.html',
  port: 8765,
  open: true,
  rootDir: '.',
  watch: true,
  mimeTypes: {
    '**/*.graphql': 'js',
  },
  plugins: [
    esbuildPlugin({ ts: true }),
    commonjs({ include: cjsIncludes }),
    graphql(),
    replace({ DEPENDENCIES }),
  ],
};
