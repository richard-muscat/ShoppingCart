/**
 * Created by Richard on 05/06/2016.
 */
angular.module('shoppingcart.products.edit', [
        'shoppingcart.service.products'
    ])

    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.products.edit', {
                url: '/edit',
                views: {
                    '@shoppingcart.products': {
                        controller: 'EditProductController',
                        templateUrl: 'products/edit.product.template.html'
                    }
                },
                params: {
                    product: null
                }
            });
    })

    .controller('EditProductController',  function EditProductController($scope, $state,$stateParams, ProductsService){
        $scope.editProduct = $stateParams.product;


        function updateProduct(){
            ProductsService.updateProduct($scope.editProduct)
                .then(returnToProducts(true));
        }

        function returnToProducts(updated) {
            $state.go('shoppingcart.products',{updated: updated});
        }

        function cancelEditing() {
            returnToProducts(false);
        }

        $scope.cancelEditing = cancelEditing;
        $scope.updateProduct = updateProduct;

    })
;
