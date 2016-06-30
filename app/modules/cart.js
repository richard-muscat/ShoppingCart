/**
 * Created by Richard on 29/06/2016.
 */

"use strict";
angular.module('shoppingcart.cart', [
        'shoppingcart.home.categories',
        'shoppingcart.home.categories.products',
        'shoppingcart.service.orders'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.cart', {
                url: '/cart',
                views: {
                    'products@': {
                        controller: 'CartController',
                        templateUrl: 'orders/orders.template.html'
                    }

                }

            });
    })

    .controller('CartController', function CartController($scope,$state,$stateParams,OrdersService) {

        $scope.orderDetails = OrdersService.getCurrentOrderDetails();


    });