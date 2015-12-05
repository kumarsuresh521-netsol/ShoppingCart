var signupCtrl;

signupCtrl = (function() {
    
    function signupCtrl(signupSrvc, $state) {
        
        if(localStorage.getItem("customer_id") && localStorage.getItem("customer_id") != ''){
            $state.go("app.banner");
            return;
        }
        this.signupSrvc = signupSrvc;
        this.user = {};
        
        this.ShowPassword = 'password';
    }

    signupCtrl.prototype.userLogin = function() {
        var signup = this.signupSrvc.chkLogin(this.user.username, this.user.password, this.user.firstname, this.user.lastname)
        alert("success"); console.log(signup);
        
    }
    return signupCtrl;

})();
signupModule.controller('signupCtrl', signupCtrl);