/**
 * Created by Richard on 14/06/2016.
 */
/**
 * Created by Richard on 08/06/2016.
 */
"use strict";
angular.module('shoppingcart.login', [
        'shoppingcart.service.users',
        'shoppingcart.register'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.login', {
                url: '/login',
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
                        controller: 'LoginController',
                        templateUrl: 'users/login.template.html'
                    }

                },
                params: {
                    cartUser: null
                }
            });
    })

    .controller('LoginController', function LoginController($scope,$state, $stateParams, UsersService) {

        function loginUser()
        {
            UsersService.authenticate($scope.auth.username, $scope.auth.password)
                .then(function (result) {

                  console.log(result.success);
                  if(result.success) {
                        $state.go('shoppingcart.home');
                    }else{
                      $scope.error = "The username and password you entered do not match.";
                  }

        });
        }



        $scope.loginUser = loginUser;

    })
;