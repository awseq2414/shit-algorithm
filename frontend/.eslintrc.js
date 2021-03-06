module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6 : true
  },

  extends: [
    'airbnb-base'
  ],
  plugins: [
    'html','import'
  ],
  'rules': {
    // disable error
    'no-alert' : 0,
    'no-console' : 0,
    'no-undef' : 0,
    'import/first' : 0,
    'import/no-extraneous-dependencies' : 0,
    'no-mixed-spaces-and-tabs' : 0,
    'no-tabs' : 0,
    'linebreak-style' : 0,
    
  },
  "settings": {
    "ecmascript": 6,
    "import/parser": "webpack",
    "import/parser": "babel-eslint",
    "import/resolver": {"node": {"extensions": [".js", ".vue"]}},
  },
}
