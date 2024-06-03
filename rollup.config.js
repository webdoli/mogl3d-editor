import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/mogl3d-editor.module.js', // 진입점 파일 경로
    output: [
        {
            file: 'lib/mogl3d-editor.module.js',
            format: 'es',
        },
        {
            file: 'lib/mogl3d-editor.js',
            format: 'cjs',
            exports: 'default',
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        terser() // 코드를 최소화하여 최적화
    ]
};
