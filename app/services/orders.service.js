/**
 * Created by Richard on 08/06/2016.
 */
angular.module('shoppingcart.service.orders', ['shoppingcart.service.products'])
    .service('OrdersService', function ($http, ProductsService) {

        var baseUrl = 'http://localhost:3000/';
        var orderUrl = baseUrl + 'orders';
        var orderDetailUrl = baseUrl + 'orderdetail';
        var currentOrder = null;
        var currentOrderDetails = null;



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
                currentOrder = new Order(responseOrder.id, responseOrder.userId, responseOrder.status)
                return currentOrder;
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
            //(currentOrder.id,product.id,1)
            return $http.put(orderDetailUrl + '/' + orderdetail.id, new OrderDetail(orderdetail.id,orderdetail.orderId,orderdetail.productId,orderdetail.quantity));
        };

        var deleteOrderDetail = function (orderDetailId) {
            return $http.delete(orderDetailUrl + '/' + orderDetailId);
        };

        var getOrderDetails = function (orderId) {
            return $http.get(orderUrl + '/' + orderId + '/orderdetail/?_expand=product').then(processGetOrderDetailsResponse);
        };

        function processGetOrderDetailsResponse(response) {
            var orderDetails = [];
            angular.forEach(response.data, function (value, key) {
                var jsonProduct = value['product'];
                var product = new Product(jsonProduct.id, jsonProduct.categoryId, jsonProduct.name);
                var orderDetail = new OrderDetail(value['id'], value['orderId'], value['productId'], value['quantity'],product);
                orderDetails.push(orderDetail);
            });
            currentOrderDetails =  orderDetails;
            getItemCount();
            return currentOrderDetails;
        }


        //General
        var updateCart = function (product, cartUser) {
            if(currentOrder === null)
            {
                createOrderForUser(cartUser.id).then(getOrderForUser(cartUser.id).then(addToCart(product)));
            }
            else
            {
                (addToCart(product));
            }
        };

        function addToCart(product)
        {
            var notFound = true;
            currentOrderDetails.forEach(function(orderDetail){
                if(orderDetail.productId === product.id)
                {
                    orderDetail.quantity++;
                    notFound = false;
                    updateOrderDetail(orderDetail);
                }
            });
            if(notFound)
            {
                createOrderDetail(currentOrder.id,product.id,1);
            }
            //return getOrderDetails(currentOrder.id);
        }

        var getCurrentOrder = function(){
            return currentOrder;
        };

        var getCurrentOrderDetails = function(){
            return currentOrderDetails;
        };

        var resetCurrentOrder = function(){
          currentOrder = null;
          currentOrderDetails = [];

        };
        function getItemCount(){
            if(currentOrderDetails!==null){
                var total =0;
                currentOrderDetails.forEach(function(orderDetail){
                    total+=orderDetail.quantity;
                });
                return total;
            }
            else
            {
                return "";
            }
        }



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
            getOrderDetails: getOrderDetails,
            getCurrentOrder: getCurrentOrder,
            getCurrentOrderDetails: getCurrentOrderDetails,
            resetCurrentOrder: resetCurrentOrder,
            getItemCount : getItemCount,
            updateCart:updateCart
        };


    });