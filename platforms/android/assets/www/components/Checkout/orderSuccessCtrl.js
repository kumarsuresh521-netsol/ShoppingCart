var orderSuccessCtrl;

orderSuccessCtrl = (function($scope,$state,$stateParams) {

    function orderSuccessCtrl($scope,$state,$stateParams) { //console.log("$scope"); console.log($scope);
        
        this.state = $state;
        var self = this; console.log($stateParams);
        self.order_id = $stateParams.order_id;
        }
    return orderSuccessCtrl;
})();

checkoutModule.controller('orderSuccessCtrl', orderSuccessCtrl);

