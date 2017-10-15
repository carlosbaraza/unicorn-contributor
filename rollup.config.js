import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import cli from 'rollup-plugin-cli';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/unicorn-contributor',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          "es2015",
          {
            "modules": false
          }
        ]
      ],
      plugins: [
        "external-helpers",
        "transform-object-rest-spread"
      ]
    }),
    cli(),
    json(),
    commonjs()
  ]
};
