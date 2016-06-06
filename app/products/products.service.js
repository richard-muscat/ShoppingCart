/**
 * Created by Richard on 28/05/2016.
 */

angular.module('shoppingcart.service.products',[])
    .service('ProductsService', function($http) {

      var baseUrl = 'http://localhost:3000/';
      var url = baseUrl + 'products';

      var getAll = function() {

        return $http.get(url).then(transformResponse);
      };

      var createProduct = function(product) {
      return $http.post(url,product);
    };

      var updateProduct = function(product) {
        return $http.put(url + '/' + product.id,product);
      };

      var deleteProduct = function(product) {
      return $http.delete(url + '/' + product.id);
    };

      function transformResponse(response) {
        var products = [];
        angular.forEach(response.data,function(value, key) {
          var prod = new Product(value['id'],value['name']);
          products.push(prod);
        });
        return products;
      }

      return {
        getAll: getAll,
        createProduct: createProduct,
        deleteProduct: deleteProduct,
        updateProduct: updateProduct
      };
    });
