/**
 * Created by Richard on 29/05/2016.
 */
'use strict';

angular.
module('productcategoryList').
component('productcategoryList', {
    templateUrl: 'productcategory-list/productcategory-list.template.html',
    controller: ['ProductCategoryModel', function ProductCategoryListController(ProductCategoryModel) {
        var self = this;
        console.log("calling service");
        ProductCategoryModel.getProductCategories()
            .then(function(result){
                self.productcategories = result;
            })
    }]
});


