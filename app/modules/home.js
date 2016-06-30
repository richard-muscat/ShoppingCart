/**
 * Created by Richard on 08/06/2016.
 */
"use strict";
angular.module('shoppingcart.home', [
        'shoppingcart.home.categories',
        'shoppingcart.home.categories.products',
        'shoppingcart.service.orders',
        'shoppingcart.service.users'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.home', {
                url: '/',
                data:{
                    orderQuantity:""
                },
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
                    }

                },

                params:
                {
                    addToCart: false
                }

            });
    })

    .controller('NavController', function NavController($scope,$state,$stateParams,OrdersService,UsersService) {
        $scope.currentUser = UsersService.getCurrentUser();
        setNavBar();
        //$scope.orderQuantity = $state.current.data.orderQuantity;

        if($stateParams.addToCart)
        {
            $scope.orderQuantity++;
            $stateParams.addToCart = false;
        }




        $scope.order;
        $scope.orderDetails =[];



        function navAction() {
            console.log("login link pressed");
            if($scope.currentUser !== null) {
                UsersService.resetCurrentUser();
                OrdersService.resetCurrentOrder();
              $scope.currentUser = null;
                setNavBar();



            } else {
                $state.go('shoppingcart.login');
            }
        }

        function setNavBar(){
            if ($scope.currentUser !== null) {
                $scope.loggedInStatus = "Hi, " + $scope.currentUser.firstname;
                $scope.nav = "Log Out";
                populateCart();

            } else {
                $scope.order ="";
                $scope.orderDetails =[];
                $scope.loggedInStatus = "";
                $scope.nav = "Log In";
                $scope.orderQuantity = "";


            }
        }

        function populateCart(){

                OrdersService.getOrderForUser($scope.currentUser.id)
                    .then(function (result) {
                        $scope.order = result;
                        getItems($scope.order.id);
                    });

        }

        function getItems(orderId){
            OrdersService.getOrderDetails(orderId)
                .then(function(items){
                    $scope.orderQuantity = OrdersService.getItemCount();
                    $scope.orderDetails = items;
                    console.log($scope.orderDetails.length);

                });
        }

        function cartAction(){
            if($scope.currentUser!==null && $scope.orderQuantity>0)
            {
                $state.go('shoppingcart.cart');
            }
        }


        $scope.navAction = navAction;
        $scope.setNavBar = setNavBar;
        $scope.populateCart = populateCart;
        $scope.cartAction = cartAction;
    })


;