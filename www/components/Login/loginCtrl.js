var loginCtrl;
var finalState;

loginCtrl = (function($state, $ionicHistory, $stateParams, $ionicLoading, $rootScope,$timeout,$scope) {

    function loginCtrl(loginSrvc,$state,$stateParams,$timeout,$scope) {
        
        if(localStorage.getItem("customer_id") && localStorage.getItem("customer_id") != ''){  
            $state.go("app.banner");
            return;
        }
        
       this.loginSrvc = loginSrvc;
       window.localStorage['id'] = 1 ;
	  
        this.user = {};
        this.ShowPassword = 'password';
        this.state = $state;
        this.msg = 'new';
        var finalState = 'new';
       
        

    }

     loginCtrl.prototype.userLogin = function(finalState,$scope) { this.state.go("app.banner");
/*
       this.loginSrvc.chkLogin(this.user.username, this.user.password).then(function(response) {

           if(response.error == '0'){
            $state.go("app.banner");
           }else{
            $state.go("app.login");
           }
           
       }).finally(function(){

            
       }) */
       
       this.loginSrvc.chkLogin(this.user.username, this.user.password);
    }

    return loginCtrl;
})();

loginModule.controller('loginCtrl', loginCtrl);
