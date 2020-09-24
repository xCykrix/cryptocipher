module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-tsdoc'
  ],
  extends: [
    'eslint:recommended',
    'standard-with-typescript'
  ],
  env: {
    es6: true
  },
  rules: {
    "tsdoc/syntax": "warn"
  }
}
