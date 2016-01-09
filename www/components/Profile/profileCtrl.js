var profileCtrl;

profileCtrl = (function($state, $stateParams,$rootScope, $scope, profileSrvc, bannerSrvc) {

    function profileCtrl($state, $stateParams,$rootScope, $scope, profileSrvc, bannerSrvc) {
        
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
        
        profileSrvc.getProfile(customer_id).then(function(response) { console.log("profile response"); console.log(response);
            self.profileInfo = response;
        });
    }

    return profileCtrl;
})();

profileModule.controller('profileCtrl', profileCtrl);
