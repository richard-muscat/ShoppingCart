/**
 * Created by Richard on 28/05/2016.
 */
"use strict";
angular.module('shoppingcart.categories.products', [
        'shoppingcart.service.products',
        'shoppingcart.categories.products.create',
        'shoppingcart.categories.products.edit'
    ])

    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.home.categories.products', {
                //url: 'categories/:category',
                url: '/prods',
                views: {
                    'products@': {
                        controller: 'ProductsController',
                        templateUrl: 'products/products.template.html'
                    }
                },
                params: {
                    updated: false
                }
            });
    })

    .controller('ProductsController', function ProductsController($scope, ProductsService, $stateParams) {
        console.log($stateParams.updated);
        getAll();
        if ($stateParams.updated) {
            console.log("entered if statement");
            getAll();
            $stateParams.updated = false;
        }

        function getAll() {
            console.log("called get all");
            ProductsService.getAll()
                .then(function (result) {
                    $scope.products = result;

                });
        }
        function deleteProduct(product){
            ProductsService.deleteProduct(product)
            .then(getAll());
        }

        $scope.deleteProduct = deleteProduct;
        $scope.getAll = getAll;
    })
;