var shippingCtrl;

shippingCtrl = (function($scope,$ionicSideMenuDelegate,$state, cartSrvc, checkoutSrvc, $ionicLoading) {

    function shippingCtrl($scope,$state,cartSrvc, checkoutSrvc, $ionicLoading) { //console.log("$scope"); console.log($scope);
        
        this.state = $state;
        var self = this;
        self.paymentm = {};  
        self.shippingm = {}; 
        
        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartid")){
            self.cartTotal = localStorage.getItem("cartTotal");    
        } else {
            self.cartTotal = 0;
        }
         
         if(localStorage.getItem("cartid") && localStorage.getItem("cartid") != '' && localStorage.getItem("cartid") != 'undefined'){
            var cartid = localStorage.getItem("cartid");
        } else {
            alert("cart id not found");
            return;
        }

        var customerId = localStorage.getItem("customer_id");

                    $ionicLoading.show();
            checkoutSrvc.getUserShippingData(customerId, cartid).then(function(response) { //console.log(" shipping....");console.log(response);  
                self.shipping = {};
                self.shipping.fname = response.shipping.firstname;
                self.shipping.lname = response.shipping.lastname;
                self.shipping.address1 = response.shipping.street1;
                self.shipping.address2 = response.shipping.street2;
                self.shipping.city = response.shipping.city;
                self.shipping.state = response.shipping.region;
                self.shipping.countary = response.shipping.country_name;
                self.shipping.pincode = response.shipping.postcode;
                self.shipping.phone = response.shipping.telephone;
            }).finally(function(){
                $ionicLoading.hide();
            });

//Shipping.html Shipping Infomation
         shippingCtrl.prototype.ShippingInfo = function(){// alert("Shipping");
            var fname = self.shipping.fname;
            var lname = self.shipping.lname;
            var address1 = self.shipping.address1;
            var address2 = self.shipping.address2;
            var city = self.shipping.city;
            var state = self.shipping.state;
            var country = self.shipping.country;
            var pincode = self.shipping.pincode;
            var phone = self.shipping.phone;
            
            if(!fname){
                cartSrvc.showToastBanner("First Name is required.", "short", "center");
                return;
            }

            if(fname.length < 3){
                cartSrvc.showToastBanner("First Name is too short.", "short", "center");
                return;
            }

            if(fname > 16){
                cartSrvc.showToastBanner("First Name too long.", "short", "center");
                return;
            }

            if(lname > 16){
                cartSrvc.showToastBanner("Last Name is required.", "short", "center");
                return;
            }
            
            if(!address1){
                cartSrvc.showToastBanner("Address is required.", "short", "center");
                return;
            }

            if(!address2){
                cartSrvc.showToastBanner("Address 2 is required.", "short", "center");
                return;
            }

            if(!city){
                cartSrvc.showToastBanner("City is required.", "short", "center");
                return;
            }

            if(!state){
                cartSrvc.showToastBanner("State is required.", "short", "center");
                return;
            }
            
            if(!country){
                cartSrvc.showToastBanner("Country is required.", "short", "center");
                return;
            }

            if(!pincode){
                cartSrvc.showToastBanner("Pincode is required.", "short", "center");
                return;
            }

            if(!phone){
                cartSrvc.showToastBanner("Phone Number is required.", "short", "center");
                return;
            }

            shippingDetails = {
                'name': fname,
                'lname': lname,
                'address1': address1,
                'address2': address2,
                'city': city,
                'state': state,
                'country': country,
                'pincode': pincode,
                'phone': phone
            }
            
            $ionicLoading.show(); //console.log("shipping d");console.log(shippingDetails);
            checkoutSrvc.updateUserShippingData(customerId, shippingDetails).then(function(response) {
               console.log("shipping update"); //console.log(response);
            }).finally(function(){
                $ionicLoading.hide();
                $state.go("app.payment");
            });
            
         }
     }
    
    return shippingCtrl;
})();

checkoutModule.controller('shippingCtrl', shippingCtrl);

