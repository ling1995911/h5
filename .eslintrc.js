module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'quotes': [1, 'single'],
    'semi': [2, 'never'],
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    'no-console': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
