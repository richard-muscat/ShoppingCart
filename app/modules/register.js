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

                }
            });
    })

    .controller('RegisterController', function RegisterController($scope,$state, $stateParams, UsersService) {


        function resetForm(){
            $scope.newUser ={
                firstname:'',
                lastname:'',
                username:'',
                password:''
            };
        }

        function register(){
            UsersService.createUser(new CartUser(null,
                                                $scope.newUser.firstname,
                                                $scope.newUser.lastname,
                                                $scope.newUser.username,
                                                $scope.newUser.password,
                                                false))
                .then(getRegisteredUser);
        }

        function getRegisteredUser()
        {
            UsersService.authenticate($scope.newUser.username, $scope.newUser.password)
                .then(function (result) {

                    console.log(result.success);
                    if(result.success) {
                        $state.go('shoppingcart.home', {cartUser: result.cartUser});
                    }
                });
        }



        $scope.register = register;
        resetForm();
    })
;