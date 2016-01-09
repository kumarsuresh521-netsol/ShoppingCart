var cartCtrl;

cartCtrl = (function($rootScope,$scope,$ionicLoading, $ionicSideMenuDelegate,$state, cartSrvc) {   
        function cartCtrl($rootScope, $scope,$ionicSideMenuDelegate,$state, cartSrvc, $ionicLoading) {
        
        this.state = $state;
        var self = this;
         var grandTotal = 0;

        $ionicLoading.show();

        if(localStorage.getItem("cartid") && localStorage.getItem("cartid") != '' && localStorage.getItem("cartid") != 'undefined'){
            var cartid = localStorage.getItem("cartid");

            cartSrvc.getCartProducts(cartid).then(function(response) {
                    self.cartProducts = response.products;

                    if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){

                        if(self.cartProducts){
                            self.cartTotal = response.products.length;
                            localStorage.setItem("cartTotal", self.cartTotal);
                        }else {
                            self.cartTotal = 0; 
                        }

                    }
                
                    if(self.cartProducts){
                        for(i=0; i<self.cartProducts.length;i++){
                            grandTotal += parseInt(self.cartProducts[i].subTotal);
                        }
                        self.cartProducts.grandTotal = grandTotal;
                    }
                    console.log(self.cartProducts);
                    
             }).finally(function(){
                $ionicLoading.hide();
            });
        } else {
            $ionicLoading.hide();
            cartSrvc.showToastBanner("Your Cart Is Empty.", "long", "center");
        }


            function updateCart(msg_id){
                $ionicLoading.show();
                var customer_id = localStorage.getItem("customer_id");              
                cartSrvc.updateCartProducts(self.cartProducts, cartid, customer_id).then(function(response) {
                }).finally(function(){
                    $ionicLoading.hide();
                    if(msg_id == 2){
                    cartSrvc.showToastBanner("Product deleted from cart successfully.", "long", "center");
                    }
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
                for(i=0; i<=self.cartProducts.length; i++ ){
                    if(self.cartProducts[i]){
                        if(self.cartProducts[i].product_id == product_id){
                            self.cartProducts.splice(i,1);
                        }
                        self.cartProducts.total = '';
                    }
                }
                    updateCart(2); 
                    var cartTotal = self.cartProducts.length;
                    localStorage.setItem("cartTotal", cartTotal);
                    self.cartTotal = cartTotal;
            }
      /*      
            cartCtrl.prototype.updateCart = function(){
                updateCart();   
            }
        
        */
        cartCtrl.prototype.GoToCheckOut = function(){  console.log(localStorage.getItem("customer_id"));
            //updateCart(1); 
            if(localStorage.getItem("customer_id") && localStorage.getItem("customer_id") != ''){
                $state.go("app.checkout");
            } else {
                $state.go("app.login",{ 'route': 'cart' });
            }
        }
            
        cartCtrl.prototype.ApplyCoupan = function(){
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

    return cartCtrl;
})();

cartModule.controller('cartCtrl', cartCtrl);

