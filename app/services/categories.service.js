/**
 * Created by Richard on 08/06/2016.
 */
angular.module('shoppingcart.service.categories', [])
    .service('CategoriesService', function ($http) {

        var baseUrl = 'http://localhost:3000/';
        var url = baseUrl + 'categories';
        var currentCategory;

        var getAll = function () {

            return $http.get(url).then(transformResponse);
        };

        var createCategory = function (category) {
            return $http.post(url, category);
        };

        var updateCategory = function (category) {
            return $http.put(url + '/' + category.id, category);
        };

        var deleteCategory = function (category) {
            return $http.delete(url + '/' + category.id);
        };

        var getCurrentCategory = function(){
          return currentCategory;
        };


        var getCurrentCategoryName = function () {
            return currentCategory ? currentCategory.name : '';
        };

        var getCurrentCategoryId = function(){
            return currentCategory? currentCategory.id:'';
        }
        var setCurrentCategory = function (category) {
            currentCategory = category;
        };

        var getCategoryByName = function(categoryName){
            return $http({
                url:url,
                method: "GET",
                params: {name: categoryName}
            }).then(categoryResponse);
        };




        function categoryResponse(response)
        {
            if (response.data.length <= 0) {
                console.log("no category was found with that name");
                return null;
            } else {
                var categoryResult = response.data[0];
                return new Category(categoryResult.id,categoryResult.name);
            }

        }



        function transformResponse(response) {
            var categories = [];
            angular.forEach(response.data, function (value, key) {
                var cat = new Category(value['id'], value['name']);
                categories.push(cat);
            });
            return categories;
        }

        return {
            getAll: getAll,
            createCategory: createCategory,
            updateCategory: updateCategory,
            deleteCategory: deleteCategory,
            getCurrentCategoryName: getCurrentCategoryName,
            setCurrentCategory: setCurrentCategory,
            getCategoryByName: getCategoryByName,
            getCurrentCategoryId:getCurrentCategoryId

        };
    });
