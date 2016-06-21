/**
 * Created by Richard on 08/06/2016.
 */


angular.module('shoppingcart.service.users',[])
    .service('UsersService', function($http) {

        var baseUrl = 'http://localhost:3000/';
        var url = baseUrl + 'users';

        var getAll = function() {

            return $http.get(url).then(transformResponse);
        };






        var authenticate = function(username, password){
            return $http({
                url:url,
                method: "GET",
                params: {username: username,
                         password: password  }
            }).then(transformResponse);
        };


        var createUser = function(cartUser){
          //  var params = {firstname: cartUser.firstname, lastname: cartUser.lastname, username: cartUser.username, password:cartUser.password, isAdmin:cartUser.isAdmin};
            return $http.post(url,cartUser);
        }


        function transformResponse(response) {
            if (response.data.length <= 0) {
                return new LoginResponse(false, null);
            } else {
                var loggedInUser = response.data[0];
                var cartUser = new CartUser(loggedInUser.id, loggedInUser.firstname, loggedInUser.lastname, loggedInUser.username, null, loggedInUser.isAdmin);
                console.log("returning login response object");
                return new LoginResponse(true, cartUser);
            }

        }


        return {
            authenticate: authenticate,
            createUser: createUser
        };
    });


