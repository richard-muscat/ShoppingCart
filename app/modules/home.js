/**
 * Created by Richard on 08/06/2016.
 */
"use strict";
angular.module('shoppingcart.home', [
        'shoppingcart.home.categories',
        'shoppingcart.home.categories.products',
        'shoppingcart.service.orders'
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

                    'categories@': {
                        controller: 'CategoriesController',
                        templateUrl: 'categories/categories.template.html'
                    },
                    'products@': {
                        controller: 'ProductsController',
                        templateUrl: 'products/products.template.html'
                    },
                    'cart@': {
                        controller: 'NavController',
                        templateUrl: 'orders/orders.template.html'
                    }

                },
                params: {
                    cartUser: null,

                }
            });
    })

    .controller('NavController', function NavController($scope,$state,$stateParams,OrdersService) {

        setNavBar();

        $scope.order;
        $scope.orderDetails =[];


        function navAction() {
            console.log("login link pressed");
            if($stateParams.cartUser !== null) {
              $stateParams.cartUser = null;
                setNavBar();



            } else {
                $state.go('shoppingcart.login');
            }
        }

        function setNavBar(){
            if ($stateParams.cartUser !== null) {
                $scope.loggedInStatus = "Hi, " + $stateParams.cartUser.firstname;
                $scope.nav = "Log Out";
                populateCart();

            } else {
                $scope.orderDetails =[];
                $scope.loggedInStatus = "";
                $scope.nav = "Log In";

            }
        }

        function populateCart(){

                OrdersService.getOrderForUser($stateParams.cartUser.id)
                    .then(function (result) {
                        $scope.order = result;
                        getItems($scope.order.id);
                    });

        }

        function getItems(orderId){
            OrdersService.getOrderDetails(orderId)
                .then(function(items){
                    $scope.orderDetails = items;

                });
        }


        $scope.navAction = navAction;

    })


;