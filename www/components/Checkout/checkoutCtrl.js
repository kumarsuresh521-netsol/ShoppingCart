var checkoutCtrl;

checkoutCtrl = (function($scope,$ionicSideMenuDelegate,$state, cartSrvc) {

    function checkoutCtrl($scope,$state,cartSrvc) {
        
        this.state = $state;
        var self = this;
         
         if(localStorage.getItem("cartid") && localStorage.getItem("cartid") != '' && localStorage.getItem("cartid") != 'undefined'){
            var cartid = localStorage.getItem("cartid");// alert(cartid);   
           
            cartSrvc.getCartProducts(cartid).then(function(response) { console.log("CJEsdf sdfsdf sdf sdfCLPIT response"); console.log(response);
                    response.productlist[0].quantity = 1;
                    response.productlist[0].price = 130;
                    response.productlist[0].subTotal = 130;
                    
                    self.cartProducts = response.productlist;
                    
                    var grandTotal = 0;
                    for(i=0; i<self.cartProducts.length;i++){
                        grandTotal = grandTotal+self.cartProducts[i].subTotal;
                    }
                    self.cartProducts.total = grandTotal;
                    self.quantity = 1;
             })            
        }
         
         checkoutCtrl.prototype.GoToNav = function(route){
            $state.go("app."+route);
         }
     }  
    

    return checkoutCtrl;
})();

checkoutModule.controller('checkoutCtrl', checkoutCtrl);

