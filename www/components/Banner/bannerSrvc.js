var bannerSrvc;

bannerSrvc = (function($log, $http, $q) {
    
    var bc = this;
    bc.$log = $log;
    bc.$http = $http;
    bc.$q = $q;
//bc.rdata = [];
     
     bannerSrvc = {
        
        getBdata: function() {
        
            var deferred;
            //$log.debug("get globalCompanyFields service");
            //console.log(username);
            deferred = bc.$q.defer();
            //$http.get('http://localhost:8025/magento_1.9/index.php/phonegapapp/Banner/bdetail')
            $http.get('http://magento-netsol.netsol.local/magento_1.9/index.php/phonegapapp/products/bannerSlider')
                .success((function(_this) {
                    return function(data, status) {
                        //$log.debug("globalCompanyFields " + (angular.toJson(data, true)));
                        return deferred.resolve(data);
                       // bc.rdata = deferred.resolve(data);

                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to fetch products" + status);
                        $log.error("Failed to fetch mens products");
                        return deferred.reject(data);
                    };
               })(this));
            return deferred.promise;
            },
            
            
            getBdataSecond: function() {
        
            var deferred;
            
            deferred = bc.$q.defer();
            $http.get('http://magento-netsol.netsol.local/magento_1.9/index.php/phonegapapp/products/newProductcollection')
                .success((function(_this) {
                    return function(data, status) { //console.log(data);
                       //$log.debug("globalCompanyFields ffff " + (angular.toJson(data, true)));
                        return deferred.resolve(data);
                     };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        return deferred.reject(data);
                    };
               })(this));
            return deferred.promise;
            },
            
            getBdataSpecial: function() {
        
            var deferred;
            
            deferred = bc.$q.defer();
            $http.get('http://magento-netsol.netsol.local/magento_1.9/index.php/phonegapapp/products/specialProducts')
                .success((function(_this) {
                    return function(data, status) { //console.log(data);
                       //$log.debug("globalCompanyFields ffff " + (angular.toJson(data, true)));
                        return deferred.resolve(data);
                     };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        return deferred.reject(data);
                    };
               })(this));
            return deferred.promise;
            }
}


  return bannerSrvc;
});  

bannerModule.factory('bannerSrvc', bannerSrvc)