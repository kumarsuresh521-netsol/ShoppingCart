var loginCtrl;
var finalState;

loginCtrl = (function($state, $ionicHistory, $stateParams, $ionicLoading, $rootScope,$timeout,$scope, signupSrvc, $ionicSideMenuDelegate) {

    function loginCtrl($rootScope,loginSrvc,$state,$stateParams,$ionicLoading, $timeout,$scope, signupSrvc, $ionicSideMenuDelegate) {
        //alert(localStorage.getItem("customer_id"));
        if(localStorage.getItem("customer_id") && localStorage.getItem("customer_id") != '' && localStorage.getItem("customer_id") != null && localStorage.getItem("customer_id") != undefined){  
            $state.go("app.banner");
            return;
        } 

        if($stateParams.route && $stateParams.route != 'login'){
          var path = $stateParams.route; 
        } else {
          var path = 'banner';
        }
        

        
       this.loginSrvc = loginSrvc;
       this.signupSrvc = signupSrvc;
       
        this.user = {};
        this.fuser = {};
        this.ShowPassword = 'password';
        this.state = $state;
        this.msg = 'new';
        var finalState = 'new'; 

            loginCtrl.prototype.userLogin = function(finalState,$scope) { console.log("Login"); console.log(this.user); console.log(this.password);console.log("Login2"); 

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
              $ionicLoading.show();
               this.loginSrvc.chkLogin(this.user.username, this.user.password).then(function(response) {
                $ionicLoading.hide();
                   if(response.error == '0'){
                      //alert("Login Successfull.");
                      /*$rootScope.globals = {};
                      $rootScope.globals = {
                        currentUser: {
                            customer_id: response.entity_id,
                            firstname: response.firstname,
                            lastname: response.lastname,
                            email: response.email,
                        }
                      }; */
                      //console.log("rootsoup"); console.log($rootScope);

                      localStorage.setItem("email", response.email);
                      localStorage.setItem("firstname", response.firstname);
                      localStorage.setItem("lastname", response.lastname);
                      localStorage.setItem("customer_id", response.entity_id);
                      $state.go("app."+path);
                   }else{
                    alert("Your username or password is wrong.");
                   }
                   
               });
            }

            loginCtrl.prototype.forgotPassword = function() {
              if(!this.fuser.fusername){
                this.signupSrvc.showToastBanner("Please enter email address.", "short", "center");
                return;
             }

            if(this.fuser.fusername){
                 var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                 if(!re.test(this.fuser.fusername)){
                   this.signupSrvc.showToastBanner('Please Enter Your Valid Email', "short", "center");
                   return;
                 }
             }

             this.signupSrvc.showToastBanner('Password reset mail is sent.', "short", "center");
            }

            loginCtrl.prototype.isAvailable = function() { alert("isavailable");
                 window.plugins.googleplus.isAvailable(function(avail) {alert(avail)}); 
            }

            loginCtrl.prototype.login = function() {
                window.plugins.googleplus.login(
                {
                    'offline': true, 
                    'webApiKey': '801555343420-cef98b3pfgja3shmaioep0ks95iompvg.apps.googleusercontent.com',
                  },
                  function (obj) { console.log(obj);
                    document.querySelector("#image").src = obj.imageUrl;
                    document.querySelector("#image").style.visibility = 'visible';
                    document.querySelector("#feedback").innerHTML = "Hi, " + obj.displayName + ", " + obj.email;
                  },
                  function (msg) { console.log(msg);
                    document.querySelector("#feedback").innerHTML = "error: " + msg;
                  }
              );
            }

            loginCtrl.prototype.trySilentLogin = function() { 
                    window.plugins.googleplus.trySilentLogin(
                    {
                    'scopes': '... ', 
                    'offline': true,
                    'webApiKey': '801555343420-qhn1qql7kbk192tfg3un084epso2isrn.apps.googleusercontent.com',
                  },
                    function (obj) {  console.log(obj);
                      document.querySelector("#image").src = obj.imageUrl;
                      document.querySelector("#image").style.visibility = 'visible';
                      document.querySelector("#feedback").innerHTML = "Silent hi, " + obj.displayName + ", " + obj.email;
                    },
                    function (msg) { console.log(msg);
                      document.querySelector("#feedback").innerHTML = "error: " + msg;
                    }
                );
            }

            loginCtrl.prototype.logout = function() {
                window.plugins.googleplus.logout(
                    function (msg) { console.log(msg);
                      document.querySelector("#image").style.visibility = 'hidden';
                      document.querySelector("#feedback").innerHTML = msg;
                    }
                );
            }

            loginCtrl.prototype.disconnect = function() {
                      window.plugins.googleplus.disconnect(
                          function (msg) {  console.log(msg);
                            document.querySelector("#image").style.visibility = 'hidden';
                            document.querySelector("#feedback").innerHTML = msg;
                          }
                      );
            }

              window.onerror = function(what, line, file) {
                alert(what + '; ' + line + '; ' + file);
              };
              function handleOpenURL (url) {
                document.querySelector("#feedback").innerHTML = "App was opened by URL: " + url;
              }

            

            loginCtrl.prototype.gmailLogin = function() { alert("gamil");
            window.plugins.googleplus.isAvailable(function(avail) {alert(avail)});
            var obj;
                window.plugins.googleplus.login(
                  {},
                  function (obj) {
                    alert(JSON.stringify(obj)); // do something useful instead of alerting
                    console.log("success"); console.log(obj);
                  },
                  function (msg) {
                    alert('error: ' + msg);
                    console.log("success"); console.log(obj);
                  }
              );
            }
       
        

    }

     

    return loginCtrl;
})();

loginModule.controller('loginCtrl', loginCtrl);
