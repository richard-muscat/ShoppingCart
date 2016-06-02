/**
 * Created by Richard on 28/05/2016.
 */
'use strict';

angular.
    module('productList').
    component('productList', {
    templateUrl: 'product-list/product-list.template.html',
    controller: ['ProductsService', function ProductListController(ProductsService) {
        var self = this;
        ProductsService.getAll()
          .then(function(result){
                self.products = result;
          })
    }]
});


