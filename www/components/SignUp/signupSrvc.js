var signupSrvc;

signupSrvc = (function($log, $http, $q, $state) {

    var sp = this;
    sp.$log = $log;
    sp.$http = $http;
    sp.$q = $q;

    $log.debug("constructing signupSrvc");
//{"email":"ss@smail.com","firstname":"ss","lastname":"sd","password":"123456","website_id":"1","store_id":"1","group_id":"1"}
    var signupSrvc = {
        chkLogin: function(username, password, firstname, lastname) {
            var deferred;
            $log.debug("get globalCompanyFields service");
            deferred = sp.$q.defer();
            $http.post('http://magento-netsol.netsol.local/magento_1.9/index.php/phonegapapp/users/register', {
                    email: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    website_id: 1,
                    store_id: 1,
                    group_id:1
                })
                .success((function(_this) {
                    return function(data, status) { console.log(data); console.log(status); console.log(data.error);
                        if(data.error == 0){
                            alert("Your Signup process is complete Successfully.");
                            
                            localStorage.setItem("email", data.email);
                            localStorage.setItem("firstname", data.firstname);
                            localStorage.setItem("lastname", data.lastname);
                            localStorage.setItem("customer_id", data.entity_id);
                            
                            $state.go("app.home");
                        } else {
                            alert("Error");
                        }
                        $log.debug("globalCompanyFields " + (angular.toJson(data, true))['error']);
                        return deferred.resolve(data);
                        //return data;
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to Signup" + status);
                        $log.error("Failed to Signup Service");
                        return deferred.reject(data);
                        
                    };
                })(this));
            return deferred.promise;
        }
    }
    return signupSrvc;
});

signupModule.factory('signupSrvc', signupSrvc);