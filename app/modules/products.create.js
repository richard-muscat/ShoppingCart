/**
 * Created by Richard on 04/06/2016.
 */
angular.module('shoppingcart.products.create', [
        'shoppingcart.service.products'
    ])

    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingcart.products.create', {
                url: '/create',
                views: {
                    'products@': {
                        controller: 'CreateProductController',
                        templateUrl: 'products/create.product.template.html'
                    }
                }
            });
    })

    .controller('CreateProductController',  function CreateProductController($scope, $state, ProductsService){

        function resetForm(){
            $scope.newProduct ={
                name:''
            };
        }

        function createProduct(){
            ProductsService.createProduct(new Product(null,$scope.newProduct.name))
                .then(returnToProducts());
        }

        function returnToProducts() {
            $state.go('shoppingcart.products');
        }

        function cancelCreating() {
            returnToProducts();
        }

        $scope.cancelCreating = cancelCreating;
        $scope.createProduct = createProduct;

        resetForm();
    })
;

