var menuSrvc;

menuSrvc = (function($log, $http, $q) {

    
    var mc = this;
   mc.$log = $log;
    mc.$http = $http;
    mc.$q = $q;
var deferred ;
  
var menuSrvc ;
           
            //$log.debug("get globalCompanyFields service");
            //console.log(username);
            deferred = mc.$q.defer();
            $http.post('http://magento-netsol.netsol.local/magento_1.9/index.php/phonegapapp/categories/categories')
                .success((function(_this) {
                    return function(data, status) {
                        //$log.debug("globalCompanyFields " + (angular.toJson(data, true)));
                        var menuSrvc= data ;
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to Login" + status);
                        $log.error("Failed to Login Service");
                        return deferred.reject(data);
                    };
                })(this));
            return deferred.promise;

       
    
 

    return menuSrvc;
});

menuModule.factory('menuSrvc', menuSrvc);