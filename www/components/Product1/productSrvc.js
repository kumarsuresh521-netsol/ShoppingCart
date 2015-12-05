var productSrvc;

productSrvc = (function($log, $http, $q) {

    var pd = this;
    pd.$log = $log;
    pd.$http = $http;
    pd.$q = $q;
var productSrvc ;
    $log.debug("constructing productSrvc");

    var productSrvc = {
        
        getData: function(prid) {
            var deferred;
            $log.debug("get globalCompanyFields service");
            //console.log(username);
            deferred = pd.$q.defer();
            $http.post('http://localhost:8025/magento_1.9/index.php/phonegapapp/Product/ProductDetail/', {
                    id: prid 
                })
                .success((function(_this) {
                    return function(data, status) {
                        $log.debug("globalCompanyFields " + (angular.toJson(data, true)));
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