/**
 * Created by Richard on 28/05/2016.
 */
'use strict';

angular.module('shoppingcart',[
    'ui.router',
    'shoppingcart.cart',
    'shoppingcart.home',
    'shoppingcart.login',
    'shoppingcart.register',
    'shoppingcart.home.categories',
    'shoppingcart.home.categories.products',
    'shoppingcart.categories.products.create',
    'shoppingcart.categories.products.edit'

])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
            .state('shoppingcart', {
              url: '',
              abstract: true
            })
        ;
      $urlRouterProvider.otherwise('/');
    });
