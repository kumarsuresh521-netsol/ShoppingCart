var productSrvc;

productSrvc = (function($log, $http, $q) {

    var pd = this;
    pd.$log = $log;
    pd.$http = $http;
    pd.$q = $q;
var productSrvc ;
    //$log.debug("constructing productSrvc");

    var productSrvc = {
        
        getData: function(prid) {
            var deferred;
            //$log.debug("get globalCompanyFields service");
            //console.log(username);
            deferred = pd.$q.defer();
            $http.post('http://magento-netsol.netsol.local/magento_1.9/index.php/phonegapapp/products/productDetail', {
                    productId: prid 
                })
                .success((function(_this) {
                    return function(data, status) {
                        //$log.debug("globalCompanyFields " + (angular.toJson(data, true)));
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to product" + status);
                        $log.error("Failed to product Service");
                        return deferred.reject(data);
                    };
                })(this));
           return deferred.promise;
        },
        addToCart: function(response) {
            var deferred;
            //$log.debug("add to cart");
            //console.log(username);
            deferred = pd.$q.defer();
            $http.post('http://magento-netsol.netsol.local/magento_1.9/index.php/phonegapapp/cart/addCart', {
                   "products":response["products"],
                   "customer":response["customer"],
                   "shopping_cart_id":response["shopping_cart_id"]
                })
                .success((function(_this) {
                    return function(data, status) {
                        //$log.debug("globalCompanyFields " + (angular.toJson(data, true)));
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to product" + status);
                        $log.error("Failed to product Service");
                        return deferred.reject(data);
                    };
                })(this));
           return deferred.promise;
        }

    
}

    return productSrvc;
});

productModule.factory('productSrvc', productSrvc);