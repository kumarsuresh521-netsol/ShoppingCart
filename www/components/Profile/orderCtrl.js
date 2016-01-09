var orderCtrl;

orderCtrl = (function($state,$rootScope, $scope, profileSrvc) {

    function orderCtrl($state,$rootScope, $scope, profileSrvc) {
        
       this.showMe = true;
       this.state = $state;
       this.rootScope = $rootScope;
        
        var self = this;

        var customer_id = localStorage.getItem('customer_id');
        
        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartid")){
            self.cartTotal = localStorage.getItem("cartTotal");    
        } else {
            self.cartTotal = 0;
        }
    
        profileSrvc.getMyOrder(customer_id).then(function(response) { console.log("order response"); console.log(response);
            self.orderInfo = response.orders;
        });

        orderCtrl.prototype.OrderDetail = function(orderId){
            if(orderId){
               profileSrvc.getMyOrderDetail(orderId).then(function(response) { console.log("order details response"); console.log(response);
                    self.orderDetail = response.order[0];
                });
            }
            
        }
    }

    return orderCtrl;
})();

profileModule.controller('orderCtrl', orderCtrl);
