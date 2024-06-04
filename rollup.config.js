import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/mogl3d-editor.js',
      format: 'cjs'
    },
    {
      file: 'dist/mogl3d-editor.module.js',
      format: 'es'
    }
  ],
  plugins: [resolve(), commonjs()]
};
