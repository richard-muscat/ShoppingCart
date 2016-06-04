/**
 * Created by Richard on 29/05/2016.
 */
'use strict';

angular.module('shoppingcart.models.productcategories',[])
    .service('ProductCategoryModel', function ($http){
        var productCategoryModel = this,
            URLS = {
                FETCH: 'http://localhost:3000/productcategories'
            },
            productcategories;

        function pextract(presult){
            return presult.data;
        }

        function  cacheProductCategories(presult)
        {
            productcategories = pextract(presult);
            return productcategories;
        }

        productCategoryModel.getProductCategories = function(){

            return $http.get(URLS.FETCH).then(cacheProductCategories);
        };
    });

