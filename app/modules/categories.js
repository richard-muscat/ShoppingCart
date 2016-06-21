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
                    'categories@': {
                        controller: 'CategoriesController',
                        templateUrl: 'categories/categories.template.html'
                    },
                    'products@': {
                        controller: 'ProductsController',
                        templateUrl: 'products/products.template.html'
                    }
                }
            });
    })
    .controller('CategoriesController', function CategoriesController($scope, CategoriesService, $stateParams) {


        CategoriesService.getAll()
            .then(function (result) {
                $scope.categories = result;
            });

        function isCurrentCategory(category) {
            return category.name === $scope.getCurrentCategoryName();
        }

        $scope.getCurrentCategoryName = CategoriesService.getCurrentCategoryName;
        $scope.isCurrentCategory = isCurrentCategory;
    });