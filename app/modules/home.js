/**
 * Created by Richard on 08/06/2016.
 */
"use strict";
angular.module('shoppingcart.home', [
        'shoppingcart.categories.products',
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.home', {
                url: '/',
                views: {
                    'navlogin@': {
                        controller: 'NavController',
                        templateUrl: 'home/home.template.html'
                    },
/*
                    'categories@': {
                        controller: 'CategoriesController',
                        templateUrl: 'categories/categories.template.html'
                    },*/
                    'products@': {
                        controller: 'ProductsController',
                        templateUrl: 'products/products.template.html'
                    }

                },
                params: {
                    cartUser: null
                }
            });
    })

    .controller('NavController', function NavController($scope,$stateParams) {
        $stateParams.cartUser = new CartUser(1,"Richard","Muscat", "Richy", "petto",false);
        if ($stateParams.cartUser !== null) {
            $scope.loggedInStatus = "Hi, " + $stateParams.cartUser.firstname;
            $scope.nav = "Log Out";
        } else {
            $scope.loggedInStatus = "";
            $scope.nav = "Log In";
        }



    })
;