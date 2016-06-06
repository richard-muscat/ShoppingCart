/**
 * Created by Richard on 06/06/2016.
 */

module.exports = function() {
  var shoppingCart = './';
  var shoppingCartApp = shoppingCart;
  var temp = './.tmp/';

  var config = {
    temp: temp,

    /**
     * Files paths
     */
    alljs: [
        './src/**/*.js',
        './*.js'
    ],
    shoppingCart: shoppingCart,
    css: temp + 'styles.css',
    index: shoppingCart + 'index.html',
    js: [
        shoppingCartApp + '**/*.module.js',
        shoppingCartApp + '**/*.js',
        '!' + shoppingCartApp + '**/*.spec.js',
        '!' + shoppingCartApp + 'node_modules/**/*',
        '!' + shoppingCartApp + 'bower_components/**/*'
    ],

    less: shoppingCart + 'styles/styles.less',

    /**
     * Bower and NPM locations
     */
    bower: {
      json: require('./bower.json'),
      directory: './bower_components/',
      ignorePath: '../..'
    }

  };

  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
};
