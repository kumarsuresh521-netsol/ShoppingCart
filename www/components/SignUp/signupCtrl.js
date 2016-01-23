var signupCtrl;

signupCtrl = (function($rootScope,$scope,signupSrvc, $state, $ionicSideMenuDelegate, $ionicLoading) {
    
    function signupCtrl($rootScope,$scope,signupSrvc, $state, $ionicSideMenuDelegate, $ionicLoading) {
        
        if(localStorage.getItem("customer_id") && localStorage.getItem("customer_id") != ''){
           // $state.go("app.banner");
           // return;
        }
        this.signupSrvc = signupSrvc;
        this.user = {};
        this.ShowPassword = 'password';


        signupCtrl.prototype.userSignUp = function() { 
            if(!this.user.firstname){
                this.signupSrvc.showToastBanner("Please enter first name.", "short", "center");
                return;
            }

            if(this.user.firstname.length <3 || this.user.firstname.length > 10){
                this.signupSrvc.showToastBanner("Firstname length must be in 3-10.", "short", "center");
                return;
            }

            if(!this.user.lastname){
                this.signupSrvc.showToastBanner("Please enter last name.", "short", "center");
                return;
            }

            if(this.user.lastname.length <3 || this.user.lastname.length > 10){
                this.signupSrvc.showToastBanner("Lastname length must be in 3-10.", "short", "center");
                return;
            }

            if(!this.user.username){
                this.signupSrvc.showToastBanner("Please enter email address.", "short", "center");
                return;
            }

            if(this.user.username){
                 var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                 if(!re.test(this.user.username)){
                   this.signupSrvc.showToastBanner('Please Enter Your Valid Email', "short", "center");
                   return;
                 }
             }

            if(!this.user.password){
                this.signupSrvc.showToastBanner("Please enter password.", "short", "center");
                return;
            }

            if(this.user.password.length <5 || this.user.password.length >10){
                this.signupSrvc.showToastBanner("Password length must be in 5-10", "short", "center");
                return;
            }

            if(!this.user.cpassword){
                this.signupSrvc.showToastBanner("Please enter confirm password.", "short", "center");
                return;
            }

            if(this.user.password != this.user.cpassword){
                this.signupSrvc.showToastBanner("Both passwords are not match.", "short", "center");
                return;
            }

            var signup = this.signupSrvc.chkLogin(this.user.username, this.user.password, this.user.firstname, this.user.lastname).then(function(response){ console.log(response);
               if(response.error == 0 && response.entity_id){ alert("You signup process is successfully completed.");
                    $rootScope.globals = {};
                      $rootScope.globals = {
                        currentUser: {
                            customer_id: response.entity_id,
                            firstname: response.firstname,
                            lastname: response.lastname,
                            email: response.email,
                        }
                      };
                    $state.go("app.banner");
                } else { 
                    alert("Email is already exist.");
                return;
                }
            });
            
        }
    }

    
    return signupCtrl;

})();
signupModule.controller('signupCtrl', signupCtrl);