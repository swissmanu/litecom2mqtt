import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'no-undef': 'off',
        },
    },
    {
        ignores: [
            'dist/',
            'src/litecom/restClient/'
        ],
    },

);
