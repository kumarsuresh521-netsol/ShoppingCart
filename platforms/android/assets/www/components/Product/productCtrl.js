var productCtrl;

productCtrl = (function($rootScope,$scope,$state,productSrvc, $ionicSideMenuDelegate, $ionicLoading, cartSrvc, $ionicHistory) {

    function productCtrl($rootScope,$scope,productSrvc,$state,$stateParams, $ionicSideMenuDelegate, $ionicLoading, cartSrvc, $ionicHistory) {
            $ionicLoading.show();
            if($stateParams.product_id){
                var product_id = $stateParams.product_id;
            } else {
                var product_id = 1;
            }
            
           this.state = $state;
           var self = this;
           
           
           if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
                self.cartTotal = localStorage.getItem("cartTotal");    
            } else {
                self.cartTotal = '0';
            }
           
            productSrvc.getData(product_id).then(function(response) { //console.log('response');console.log(response);
                self.pdata = response;
                self.productid = response.product_id;
                if(self.pdata.special_price){
                    self.discount = (1 - (self.pdata.special_price / self.pdata.price)) * 100;
                }
             }).finally(function(){
                $ionicLoading.hide();
             });

             var product_one = window.localStorage.getItem('compare_product_one_id');
             $ionicLoading.show();
             if(product_one && product_one != 'NULL'){
                productSrvc.getData(product_one).then(function(response) { console.log('product_one');console.log(response);
                    self.pCOData = response;
                    if(self.pCOData.special_price){
                        self.pCOData.discount = (1 - (self.pCOData.special_price / self.pCOData.price)) * 100;
                    }
                 }).finally(function(){
                    $ionicLoading.hide();
                 });
             }

             var product_two = window.localStorage.getItem('compare_product_two_id');
             $ionicLoading.show();
             if(product_two && product_two != 'NULL'){
                productSrvc.getData(product_two).then(function(response) { console.log('response');console.log(response);
                    self.pCTData = response;
                    if(self.pCTData.special_price){
                        self.pCTData.discount = (1 - (self.pCTData.special_price / self.pCTData.price)) * 100;
                    }
                 }).finally(function(){
                    $ionicLoading.hide();
                 });
             }
           
           productCtrl.prototype.addToCart = function(id){
                $scope.options = [];
         // Check Options are selected or not...   
         if(self.pdata.optionid){    
                if(self.Color == '' || self.Color == 'undefined' || self.Color == 'null' || self.Color == undefined){
                        cartSrvc.showToastBanner("Please Select Color options.", "short", "center");
                        return;
                    }

                    if(self.Manufacturers == '' || self.Manufacturers == 'undefined' || self.Manufacturers == 'null' || self.Manufacturers == undefined){
                        cartSrvc.showToastBanner("Please Select Manufacturers options.", "short", "center");
                        return;
                    }

                    if(self.Size == '' ||self.Size == 'undefined' || self.Size == 'null' || self.Size == undefined){
                        cartSrvc.showToastBanner("Please Select Size options.", "short", "center");
                        return;
                    }
            }
        // Options code end here...
                $ionicLoading.show();
                if(self.pdata.optionid){
                var options1 = {};
                var options2 = {};
                var options3 = {};

                var opt = {};
                for(i=0; i<self.pdata.optionid.length; i++){ 
                    var oid = self.pdata.optionid[i].option_id;
                    var ovalue = self.pdata.optionid[i].title;
                    
                    if(i == 0){
                        options1['key'] = oid;
                        options1['value'] = self.Color;
                        $scope.options.push(options1);
                    } else if(i == 1){
                        options2['key'] = oid;
                        options2['value'] = self.Manufacturers;
                        $scope.options.push(options2);
                        
                    } else if(i == 2){
                        options3['key'] = oid;
                        options3['value'] = self.Size;
                        $scope.options.push(options3);
                    }
                }
                
                //options = {[options1], [options2], [options3]};
                
               } else {
                $scope.options = null;
               }
               //console.log($scope.options);
                var products = {};
                 var request = {};
                products['product_id'] = self.pdata.product_id;
                products['quantity'] = '1';
                products['sku'] = self.pdata.sku;
                products['options'] = $scope.options;
                products['bundle_option'] = null;
                products['bundle_option_qty'] = null;
                products['links'] = null;
                
                var products1 = [products];
                
                var customer = {};
                customer['customer_as_guest'] = false;
                customer['customer_id'] = localStorage.getItem('customer_id');
                if(localStorage.getItem("cartid") && localStorage.getItem("cartid") != '' && localStorage.getItem("cartid") != 'undefined'){
                    var cartid = localStorage.getItem("cartid");
                } else {
                    var cartid = null;
                } 
                
                request["products"]= products1;
                request["customer"]= customer;
                request["shopping_cart_id"]= cartid;
                //console.log(self.pdata);
                //console.log(request);

                productSrvc.addToCart(request).then(function(response) { console.log("add to cart response");console.log(response);
                        
                    if(response.errorMsg){
                        $ionicLoading.hide();
                        cartSrvc.showToastBanner(response.errorMsg, "short", "center");
                        return;
                    }
                    if(response.cart_id){
                        localStorage.setItem("cartid", response.cart_id);
                        
                          if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
                                var cartTotal = localStorage.getItem("cartTotal");
                            } else {
                                var cartTotal = 0;
                            }
                        
                        localStorage.setItem("cartTotal", parseInt(cartTotal) + 1);

                        self.cartTotal = parseInt(cartTotal) + 1; //alert(self.cartTotal);

                        $ionicLoading.hide();
                        
                        cartSrvc.showToastBanner(response.msg, "short", "center");
                    }
                }); 

                $ionicHistory.nextViewOptions({
                  disableBack: true
                });
         }
         
         productCtrl.prototype.showMeSearch = function(searchproducts){ 
            window.localStorage['search'] = this.searchproducts;
            this.state.go("app.prodListing");
         }
         
         productCtrl.prototype.fetchDetail = function(product_id){
            this.state.go("app.product",{ 'product_id':product_id });
         }

         productCtrl.prototype.addToWishlist = function(product_id){
            alert("Wishlist Added");
        }

        productCtrl.prototype.goToProductDetails = function(product_id){
            this.state.go("app.product",{ 'product_id':product_id });
        }

        productCtrl.prototype.goToCart = function(){
            if(self.cartTotal > 0){
                this.state.go("app.cart");
            } else {
                cartSrvc.showToastBanner("Cart is empty.", "short", "center");
            }
            
        }

        productCtrl.prototype.addToShare = function(){
            window.plugins.socialsharing.share(self.pdata.name, self.pdata.name, self.pdata.productimage[0].url);
        }

        productCtrl.prototype.goToCompare = function(){
            var product_one = window.localStorage.getItem('compare_product_one_id');
            var product_two = window.localStorage.getItem('compare_product_two_id');
            if(product_one || product_two){
                this.state.go("app.productsCompare");
            } else {
                cartSrvc.showToastBanner("Please add product for compare.", "short", "center");
            }
            
        }

        productCtrl.prototype.removeToCampare = function(product_id){
           
            if(product_id){
                var product_one = window.localStorage.getItem('compare_product_one_id');
                var product_two = window.localStorage.getItem('compare_product_two_id');

                    if(product_one == product_id){
                        window.localStorage.removeItem('compare_product_one_id');

                        if(product_two){
                            window.localStorage.setItem('compare_product_one_id',product_two);

                            window.localStorage.removeItem('compare_product_two_id');
                        }

                    } else {
                        window.localStorage.removeItem('compare_product_two_id');
                    }

                cartSrvc.showToastBanner("Product removed successfully.", "short", "center");
                
                    if(product_one || product_two){
                        
                    } else {
                        this.state.go("app.banner");
                        return;
                    }
            } else {
                cartSrvc.showToastBanner("Server Error.", "short", "center");
            }

            $state.reload();
        }


        productCtrl.prototype.addToCompare = function(product_id){ 
            
            if(product_id){
                var product_one = window.localStorage.getItem('compare_product_one_id');
                var product_two = window.localStorage.getItem('compare_product_two_id');
//alert(product_id); alert(product_one); alert(product_two);
                if(product_one != product_id && product_two != product_id){
                    if(product_two){
                        cartSrvc.showToastBanner("Your Compare cart is full.", "short", "center");
                    } else {
                        
                        if(product_one){
                            window.localStorage.setItem('compare_product_two_id', product_id);
                        } else {
                            window.localStorage.setItem('compare_product_one_id', product_id);
                        }
                        cartSrvc.showToastBanner("Your product is add to compare successfully.", "short", "center");
                    }
                } else {
                    cartSrvc.showToastBanner("Already added to compare cart.", "short", "center");
                }
                
                
            }

        }


    }

    return productCtrl;
})();

productModule.controller('productCtrl', productCtrl);

