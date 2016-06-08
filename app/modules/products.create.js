/**
 * Created by Richard on 04/06/2016.
 */
//TODO change to .admin
angular.module('shoppingcart.categories.products.create', [
        'shoppingcart.service.products'
    ])

    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.products.create', {
                url: '/products/create',
                views: {
                    '@shoppingcart.products': {
                        controller: 'CreateProductController',
                        templateUrl: 'products/create.product.template.html'
                    }
                }
            });
    })

    .controller('CreateProductController',  function CreateProductController($scope, $state,$stateParams, ProductsService){

        function resetForm(){
            $scope.newProduct ={
                name:''
            };
        }

        function createProduct(){
            ProductsService.createProduct(new Product(null,$scope.newProduct.name))
                .then(returnToProducts(true));
        }

        function returnToProducts(updated) {
            $state.go('shoppingcart.products',{updated: updated});
        }

        function cancelCreating() {
            returnToProducts(false);
        }

        $scope.cancelCreating = cancelCreating;
        $scope.createProduct = createProduct;

        resetForm();
    })
;

