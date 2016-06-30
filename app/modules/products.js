/**
 * Created by Richard on 28/05/2016.
 */
"use strict";
angular.module('shoppingcart.home.categories.products', [
        'shoppingcart.service.categories',
        'shoppingcart.service.products',
        'shoppingcart.service.orders',
        'shoppingcart.categories.products.create',
        'shoppingcart.categories.products.edit'
    ])

    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.home.categories.products', {
                //url: 'categories/:category',
                url: 'categories/:category',
                data:{
                    orderQuantity:""
                },
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

    .controller('ProductsController', function ProductsController($scope, ProductsService, CategoriesService,OrdersService,UsersService, $state,$stateParams) {
        console.log($stateParams.updated);

        CategoriesService.setCurrentCategory();

        if ($stateParams.category) {
            CategoriesService.getCategoryByName($stateParams.category).then(function (category) {
                console.log(category.name);
                CategoriesService.setCurrentCategory(category);
            })
        }
        $scope.getCurrentCategory = CategoriesService.getCurrentCategory;
        $scope.getCurrentCategoryName = CategoriesService.getCurrentCategoryName;
        $scope.getCurrentCategoryId = CategoriesService.getCurrentCategoryId;

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

        function addToCart(product){
            var currentUser = UsersService.getCurrentUser();
            if(currentUser===null)
            {
                $state.go('shoppingcart.login');
            }
            else
            {
                OrdersService.updateCart(product,currentUser);
                $state.go('shoppingcart.home',{addToCart:true});
               // var totalQuantity = OrderService.getItemCount();

            }
        }

        $scope.addToCart = addToCart;
        $scope.deleteProduct = deleteProduct;
        $scope.getAll = getAll;
    })
;