module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: "eslint:recommended",
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        semi: 1,
        quotes: ["error", "double"],
        "multiline-comment-style": ["error", "separate-lines"],
        "@typescript-eslint/explicit-module-boundary-types": 0,
    },
};
