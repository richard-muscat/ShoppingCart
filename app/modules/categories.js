/**
 * Created by Richard on 08/06/2016.
 */
"use strict";
angular.module('shoppingcart.home.categories', [
        'shoppingcart.service.categories',

    ])

    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.home.categories', {
                url: '/',
                views: {
                    'products@': {
                        controller: 'CategoriesController',
                        templateUrl: 'categories/categories.template.html'
                    }
                },
                params: {
                    updated: false
                }
            });
    })
    .controller('CategoriesController', function ProductsController($scope, ProductsService, $stateParams) {






    });