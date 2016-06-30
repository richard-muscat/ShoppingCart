/**
 * Created by Richard on 28/05/2016.
 */

angular.module('shoppingcart.service.products', [])
    .service('ProductsService', function ($http) {

        var baseUrl = 'http://localhost:3000/';
        var url = baseUrl + 'products';

        var getAll = function () {

            return $http.get(url,{cache: true}).then(transformResponse);
        };

        function deleteAllProductsResponseFromCache() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(url);
        }

        var getProductById = function(productId){
            return $http.get(url+'/'+ productId)
                .then(processGetProductByIdResponse);
        };

        var createProduct = function (product) {
            deleteAllProductsResponseFromCache();
            return $http.post(url, product);
        };

        var updateProduct = function (product) {
            deleteAllProductsResponseFromCache();
            return $http.put(url + '/' + product.id, product);
        };

        var deleteProduct = function (product) {
            deleteAllProductsResponseFromCache();
            return $http.delete(url + '/' + product.id);
        };


        function processGetProductByIdResponse(response){
            if(response.data === null)
            {
                return null;
            }
            else
            {
                var resultProduct = response.data;

                return new Product(resultProduct.id, resultProduct.categoryId, resultProduct.name);
            }

        }

        function transformResponse(response) {
            var products = [];
            angular.forEach(response.data, function (value, key) {
                var prod = new Product(value['id'], value['categoryId'],value['name']);
                products.push(prod);
            });
            return products;
        }

        return {
            getAll: getAll,
            createProduct: createProduct,
            deleteProduct: deleteProduct,
            updateProduct: updateProduct,
            getProductById:getProductById
        };
    });
