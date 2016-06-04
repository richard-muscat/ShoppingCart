/**
 * Created by Richard on 28/05/2016.
 */

angular.module('shoppingcart.products', [
        'shoppingcart.service.products'
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
                }
            });
    })

    .controller('ProductsController',  function ProductsController($scope, ProductsService){
        ProductsService.getAll()
            .then(function (result) {
                $scope.products = result;

            });


    })
;