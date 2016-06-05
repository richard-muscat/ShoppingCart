/**
 * Created by Richard on 28/05/2016.
 */

angular.module('shoppingcart.products', [
        'shoppingcart.service.products',
        'shoppingcart.products.create',
        'shoppingcart.products.edit'
    ])

    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.products', {
                url: '/',
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

        getAll();
        if ($stateParams.updated) {
            getAll();
            $stateParams.updated = false;
        }

        function getAll() {
            ProductsService.getAll()
                .then(function (result) {
                    $scope.products = result;

                });
        }
        function deleteProduct(product){
            ProductsService.deleteProduct(product)
            .then(getAll())
        }



        $scope.deleteProduct = deleteProduct;
        $scope.getAll = getAll;
    })
;