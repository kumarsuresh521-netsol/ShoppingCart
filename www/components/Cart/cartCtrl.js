var cartCtrl;

cartCtrl = (function($rootScope,$scope,$ionicLoading, $ionicSideMenuDelegate,$state, cartSrvc, $ionicPopover, productSrvc, $ionicPopup) {   
        function cartCtrl($rootScope, $scope,$ionicSideMenuDelegate,$state, cartSrvc, $ionicLoading, $ionicPopover, productSrvc, $ionicPopup) {
        
        this.state = $state;
        var self = this;
         var grandTotal = 0;

        //self.ShowCartProducts = true;

        

        $scope.$on('$stateChangeSuccess', function () {
            $ionicLoading.show();
            if(localStorage.getItem("cartid") && localStorage.getItem("cartid") != '' && localStorage.getItem("cartid") != 'undefined'){
                var cartid = localStorage.getItem("cartid");

                cartSrvc.getCartProducts(cartid).then(function(response) { console.log(response);
                        self.cartProducts = response.products;

                        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
                            if(self.cartProducts.length > 0){
                                self.cartTotal = response.products.length;
                                //localStorage.setItem("cartTotal", self.cartTotal);
                                // Grand Total ==> sum of products subtotal.. :-)
                                for(i=0; i<self.cartProducts.length;i++){
                                    grandTotal += parseInt(self.cartProducts[i].subTotal);
                                }
                                self.cartProducts.grandTotal = grandTotal;
                                self.ShowCartProducts = true; //alert("1"+self.ShowCartProducts);
                            }else {
                                self.ShowCartProducts = false; //alert("2"+self.ShowCartProducts);
                                self.cartTotal = 0; 
                            }
                            localStorage.setItem("cartTotal", self.cartTotal);
                        }
                        
                 }).finally(function(){

                    $ionicLoading.hide();
                });
            } else {
                self.ShowCartProducts = false;// alert("3"+self.ShowCartProducts);
                $ionicLoading.hide();
                cartSrvc.showToastBanner("Your Cart Is Empty.", "long", "center");
            }
        });

        var cartid = localStorage.getItem("cartid");


            function updateCart(msg_id, product_id){ alert(product_id);
                $ionicLoading.show();
                var customer_id = localStorage.getItem("customer_id"); 
                console.log("first"); console.log(self.cartProducts);
                if(product_id > 0){ console.log(product_id);
                    for(i=0; i<=self.cartProducts.length; i++ ){
                        if(self.cartProducts[i]){
                            if(self.cartProducts[i].product_id == product_id){
                                self.cartProducts[i].qty = 0;
                            }
                            self.cartProducts.total = '';
                        }   
                    }
                }
                 console.log("before"); console.log(self.cartProducts);
                cartSrvc.updateCartProducts(self.cartProducts, cartid, customer_id).then(function(response) { alert("duck");
                    console.log("Response");console.log(response); 
                    var grandTotal2 = 0;
                    if(response.success == 1){
                        for(i=0; i<=self.cartProducts.length; i++ ){
                            if(self.cartProducts[i]){
                                if(self.cartProducts[i].product_id == product_id){
                                    self.cartProducts.splice(i,1);
                                    console.log("after2"+i); console.log(self.cartProducts);
                                }
                                self.cartProducts.total = '';
                                grandTotal2 += parseInt(self.cartProducts[i].subTotal); //alert(grandTotal2);
                            } 
                        }
                    }
                     
                    self.cartProducts.grandTotal = grandTotal2;
                    return;
                    if(self.cartProducts.length = 0){
                        self.ShowCartProducts = false; //alert("4"+self.ShowCartProducts);
                    }

                }).finally(function(){
                    console.log("after"); console.log(self.cartProducts);
                    var cartTotal = self.cartProducts.length;
                    localStorage.setItem("cartTotal", cartTotal);
                    self.cartTotal = cartTotal;
                    
                    $ionicLoading.hide();

                    cartSrvc.showToastBanner("Product deleted from cart successfully.", "long", "center");                    
                });
             }
             
             
             cartCtrl.prototype.myquantity = function(product_id, type){
                 for(i=0; i<self.cartProducts.length; i++){
                    if(self.cartProducts[i]){
                        if(self.cartProducts[i].product_id  && self.cartProducts[i].product_id == product_id){
                            var quantity = self.cartProducts[i].qty;  
                        }
                    }
                 }

                if(type == 1){
                    quantity = quantity + 1;
                }
                
                if(type == 0){
                    quantity = quantity - 1;
                }
                
                if(quantity < 1){
                    quantity = 1;
                    return;
                }

                if(quantity > 9){
                    quantity = 9;
                }
                //alert(quantity);
                for(i=0; i<self.cartProducts.length; i++){
                    if(self.cartProducts[i].product_id && self.cartProducts[i].product_id == product_id){
                        self.cartProducts[i].qty = quantity;  
                    }
                 }
                  console.log(" after update "); console.log(self.cartProducts);

                
               
                for(i=0; i<self.cartProducts.length; i++ ){
                    if(self.cartProducts[i]){
                        if(self.cartProducts[i].product_id == product_id){
                            var gTotal = self.cartProducts.grandTotal - self.cartProducts[i].subTotal; //alert("before"+gTotal);

                           self.cartProducts[i].quantity = quantity;
                           self.cartProducts[i].subTotal = self.cartProducts[i].price * self.cartProducts[i].quantity; //alert(grandTotal); alert(self.cartProducts[i].subTotal);
                           gTotal += self.cartProducts[i].subTotal; //alert(grandTotal);
                           self.cartProducts.grandTotal = gTotal; //alert("after"+gTotal);
                        }
                    }
                }
                
                return self.quantity;
            }
            
            
            cartCtrl.prototype.deleteProduct = function(product_id){
                /*for(i=0; i<=self.cartProducts.length; i++ ){
                    if(self.cartProducts[i]){
                        if(self.cartProducts[i].product_id == product_id){
                            self.cartProducts.splice(i,1);
                        }
                        self.cartProducts.total = '';
                    }
                }
                
                    var cartTotal = self.cartProducts.length;
                    localStorage.setItem("cartTotal", cartTotal);
                    self.cartTotal = cartTotal; */
                updateCart(2, product_id); 
            }
      /*      
            cartCtrl.prototype.updateCart = function(){
                updateCart();   
            }
        
        */
        cartCtrl.prototype.GoToCheckOut = function(){  console.log(localStorage.getItem("customer_id"));
            updateCart(1, 0); 
            if(localStorage.getItem("customer_id") && localStorage.getItem("customer_id") != ''){
                $state.go("app.checkout");
            } else {
                $state.go("app.login",{ 'route': 'cart' });
            }
        }

        cartCtrl.prototype.addToWishlist = function(product_id){ //alert("Hi");
            var customerId = localStorage.getItem('customer_id');

            if(customerId && customerId != ''){
                //cartSrvc.showToastBanner("Product Successfully Added To Your Wishlist.", "short", "center");
                productSrvc.addToWishlist(product_id, customerId).then(function(response) { console.log("add to wishlist response");console.log(response);
                    if(response.success == 1){ //alert("hi");
                        //cartSrvc.showToastBanner("Product Successfully Added To Your Wishlist.", "short", "center");
                    } else {
                        cartSrvc.showToastBanner("Opps ! Some Server issue.", "short", "center");
                    }
                    
                });
            } else {
                $state.go("app.login",{ 'route': 'banner' });
            }

            
        }
            
        cartCtrl.prototype.ApplyCoupan = function(){

            var myPopupBilling = $ionicPopup.show({
            template: '<div class="list"> <label class="item item-input"> <input type="text" placeholder="Enter Your Coupan Code" ng-model="cc.coupanCode"> </label> </div>',
            title: 'Apply Coupon',
           
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Apply Coupon</b>',
                type: 'button-positive',
                onTap: function(e) { console.log($scope);

                    var coupanCode = self.coupanCode;
                    if(!coupanCode){
                        cartSrvc.showToastBanner("Please Enter your coupan code.", "short", "center");
                        return;
                    }

                    cartSrvc.applyCoupanCode(cartid, coupanCode).then(function(response) {
                        if(response.errorMsg){
                            cartSrvc.showToastBanner("Your Coupan Code is invalid.", "short", "center");
                            return;
                        } else{
                            cartSrvc.showToastBanner("Your Coupan Code is apply successfully.", "long", "center");
                        }
                    })
                }
              }
            ]
          });
        }

        

        //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
     }

    return cartCtrl;
})();

cartModule.controller('cartCtrl', cartCtrl);

