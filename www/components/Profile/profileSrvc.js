var profileSrvc;

profileSrvc = (function($log, $http, $q, $state, constants) {

    var pro = this;
    pro.$log = $log;
    pro.$http = $http;
    pro.$q = $q;

    $log.debug("constructing profileSrvc");

    var profileSrvc = {
        getProfile: function(customer_id) {
           
            var deferred;
            $log.debug("get profile service");
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/getUserDetail', {
                    customerId: customer_id
                })
                .success((function(_this) {
                    return function(data, status) {
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
          /*  var userInfo = {
                    "customer_id":8,
                    "email":"sarvagya.pandey@netsolutionsindia.com",
                    "firstname":"Suresh",
                    "city":"Chandigarh",
                    "company":"Net Solutions",
                    "postcode":"160121",
                    "telephone":"9876543210",
                    "fax":"0123456987"
                }
                return userInfo; */
        },
        getMyOrder: function(customer_id) {
           
            var deferred;
            $log.debug("get profile service");
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/getOrderListing', {
                    customerId: customer_id
                })
                .success((function(_this) {
                    return function(data, status) {
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
        },
        getMyOrderDetail: function(orderId) {
           
            var deferred;
            $log.debug("get profile service");
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/getOrderDetails', {
                    orderId: orderId
                })
                .success((function(_this) {
                    return function(data, status) {
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
        }
    }

    return profileSrvc;
});

profileModule.factory('profileSrvc', profileSrvc);