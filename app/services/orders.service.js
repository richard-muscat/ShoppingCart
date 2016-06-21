/**
 * Created by Richard on 08/06/2016.
 */
angular.module('shoppingcart.service.orders', ['shoppingcart.service.products'])
    .service('OrdersService', function ($http, ProductsService) {

        var baseUrl = 'http://localhost:3000/';
        var orderUrl = baseUrl + 'orders';
        var orderDetailUrl = baseUrl + 'orderdetail';
        var currentOrder;
        var currentOrderDetail = [];


        //Order Services

        var createOrderForUser = function (userId) {
            return $http.post(orderUrl, new Order(null, userId, 0));
        };

        var createOrder = function (order) {
            return $http.post(orderUrl, order);
        };

        var updateOrder = function (order) {
            return $http.put(orderUrl + '/' + order.id, order);
        };

        var deleteOrder = function (orderId) {
            return $http.delete(orderUrl + '/' + orderId);
        };

        var getOrderForUser = function (userId) {
            var cartUrl = baseUrl + 'users/' + userId + '/orders';

            return $http({
                url: cartUrl,
                method: "GET",
                params: {status: 0}
            }).then(processUserCartResponse);
        };


        function processUserCartResponse(response) {
            if (response.data.length === 0) {
                return null;
            } else if (response.data.length > 1) {
                console.log("more than one cart found for current user");
                return null;
            } else {
                var responseOrder = response.data[0];
                return new Order(responseOrder.id, responseOrder.userId, responseOrder.status);
            }
        }


        //Order Details Services

        var createOrderDetail = function (orderId, productId, quantity) {
            return $http.post(orderDetailUrl, new OrderDetail(null, orderId, productId, quantity));
        };

        var insertOrderDetail = function (orderdetail) {
            return $http.post(orderDetailUrl, orderdetail);
        };

        var updateOrderDetail = function (orderdetail) {
            return $http.put(orderDetailUrl + '/' + orderdetail.id, orderdetail);
        };

        var deleteOrderDetail = function (orderDetailId) {
            return $http.delete(orderDetailUrl + '/' + orderDetailId);
        };

        var getOrderDetails = function (orderId) {
            return $http.get(orderUrl + '/' + orderId + '/orderdetail').then(processGetOrderDetailsResponse);
        };

        function processGetOrderDetailsResponse(response) {
            var orderDetails = [];
            angular.forEach(response.data, function (value, key) {
                ProductsService.getProductById(value['productId'])
                    .then(function(result){
                        var orderDetail = new OrderDetail(value['id'], value['orderId'], value['productId'], value['quantity'],result);
                        orderDetails.push(orderDetail);
                    });

            });
            return orderDetails;
        }


        //General
        var updateCart = function (product, cartUser) {

        };


        return {
            createOrderForUser: createOrderForUser,
            createOrder: createOrder,
            updateOrder: updateOrder,
            deleteOrder: deleteOrder,
            getOrderForUser: getOrderForUser,
            createOrderDetail: createOrderDetail,
            insertOrderDetail: insertOrderDetail,
            updateOrderDetail: updateOrderDetail,
            deleteOrderDetail: deleteOrderDetail,
            getOrderDetails: getOrderDetails
        };


    });