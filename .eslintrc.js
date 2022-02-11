module.exports = {
    root: true,
    extends: ['airbnb-base', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import', 'simple-import-sort', 'prettier'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/no-shadow': ['error'],
                'no-shadow': 'off',
                'no-undef': 'off',
            },
        },
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
    },
    rules: {
        'prettier/prettier': 'error',
        'import/no-commonjs': 'off',
        'no-use-before-define': 'off',
        // 'import/default': 'off',
        'import/no-cycle': 'off',
        'import/no-relative-parent-imports': 'off',
        'import/no-useless-path-segments': [
            'error',
            {
                noUselessIndex: true,
                commonjs: false,
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                cjs: 'always',
                js: 'never',
                json: 'always',
                mjs: 'always',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/no-unresolved': [
            'error',
            {
                commonjs: true,
                caseSensitive: true,
                ignore: ['^:[a-z]'],
            },
        ],
        'import/no-deprecated': 'error',
        'import/no-amd': 'error',
        'import/prefer-default-export': 'off',
        'sort-imports': 'off',
        'import/order': 'off',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^\\u0000'],
                    ['^@?\\w'],
                    ['^components/'],
                    ['^models/'],
                    ['^util/'],
                    ['^\\.'],
                    ['^\\u0000.*\\.s?css$'],
                ],
            },
        ],
    },
    settings: {
        'import/extensions': ['.ts', '.tsx', '.js', '.mjs'],
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json'],
            },
        },
    },
};
