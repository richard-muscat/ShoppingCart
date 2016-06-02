/**
 * Created by Richard on 28/05/2016.
 */
'use strict';

angular.module('shoppingcart.models.products',[])
.service('ProductsService', function ($http){

    var baseUrl = 'http://localhost:3000/';

    var getAll = function(){
        var url = baseUrl + 'products';
        return $http.get(url).then(transformResponse)
    };


    function transformResponse(response){
        var products = [];
        angular.forEach(response.data,function(value,key){
            var prod = new Product(value["id"],value["name"]);
            products.push(prod);
        });
        return products
    }

    return {
        getAll: getAll
    };
});