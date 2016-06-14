/**
 * Created by Richard on 14/06/2016.
 */
/**
 * Created by Richard on 14/06/2016.
 */
/**
 * Created by Richard on 08/06/2016.
 */
"use strict";
angular.module('shoppingcart.register', [
        'shoppingcart.service.users'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.register', {
                url: '/register',
                views: {  /*
                 'navlogin@': {
                 controller: 'NavController',
                 templateUrl: 'users/login.template.html'
                 },

                 'categories@': {
                 controller: 'CategoriesController',
                 templateUrl: 'categories/categories.template.html'
                 },*/
                    'products@': {
                        controller: 'RegisterController',
                        templateUrl: 'users/cartUser.template.html'
                    }

                },
                params: {
                    cartUser: null
                }
            });
    })

    .controller('RegisterController', function RegisterController($scope,$state, $stateParams, UsersService) {

        function register()
        {/*
            UsersService.authenticate($scope.auth.username, $scope.auth.password)
                .then(function (result) {

                    console.log(result.success);
                    if(result.success) {
                        $state.go('shoppingcart.home', {cartUser: result.cartUser});
                    }else{
                        $scope.error = "The username and password you entered do not match.";
                    }

                });*/
        }



        $scope.register = register;

    })
;