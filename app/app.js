/**
 * Created by Richard on 28/05/2016.
 */
'use strict';

angular.module('shoppingcart',[
    'ui.router',
    'shoppingcart.products',
    'shoppingcart.products.create',
    'shoppingcart.products.edit'

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
