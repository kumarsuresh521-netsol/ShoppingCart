var productCtrl;

productCtrl = (function($rootScope,$scope,$state,productSrvc, $ionicSideMenuDelegate) {

    function productCtrl($rootScope,$scope,productSrvc,$state,$stateParams, $ionicSideMenuDelegate) {
           // console.log($stateParams);
            
            if($stateParams.product_id){
                var product_id = $stateParams.product_id;
            } else {
                var product_id = 1;
            }
           this.state = $state;
           var self = this;
           
            productSrvc.getData(product_id).then(function(response) { console.log("RERERERE"); console.log(response); //return;
                    self.pdata = response; console.log(self.pdata.productimage[1].url);console.log(self.pdata.productimage[0].url);console.log(self.pdata.productimage[2].url);
                    self.productid = response.product_id;
             })
           
           productCtrl.prototype.addCart = function(id){ console.log($scope);
                var options = {};
                
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
                    } else if(i == 1){
                        options2['key'] = oid;
                        options2['value'] = self.Manufacturer;
                        
                    } else if(i == 2){
                        options3['key'] = oid;
                        options3['value'] = self.Size;
                    }
                }
                
                options[0] = options1;
                options[1] = options2;
                options[2] = options3; console.log(options);
                
               } else {
                options = null;
               }
               
                var products = {};
                 var request = {};
                products['product_id'] = self.productid;
                products['quantity'] = '1';
                products['sku'] = request.sku;
                products['options'] = [options];
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
                    var cartid = '';
                } 
                
                request["products"]= products1;
                request["customer"]= customer;
                request["shopping_cart_id"]= cartid;
               console.log(request);
                productSrvc.addToCart(request).then(function(response) { console.log(response); alert("ad to cart respone");
                    localStorage.setItem("cartid", response.cart_id);
                   //$state.go("app.cart");
                   alert("Product is add to cart successfully.");
                }); 
         }
         
         productCtrl.prototype.showMeSearch = function(searchproducts){
            window.localStorage['search'] = this.searchproducts;
            this.state.go("app.prodListing");
         }
    }

    

    return productCtrl;
})();

productModule.controller('productCtrl', productCtrl);

