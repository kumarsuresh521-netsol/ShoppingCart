var prodListingCtrl;



prodListingCtrl = (function($rootScope, $state , prodListingSrvc) {
	


	function prodListingCtrl($rootScope, prodListingSrvc , $state , $stateParams) {
        this.state = $state ;
	    var self = this;
    
    if($stateParams.category_id){
        var category_id = $stateParams.category_id;
        var category_name = $stateParams.category_name;
    }
  
    prodListingSrvc.getCdata(category_id).then(function(response) {
        self.prodListing = response ;
        self.categoryHeading = category_name;
    })

    
    this.showMe = false;
    this.showListing = true;

    this.searchproducts = $rootScope.srch;
  

    
}


	 prodListingCtrl.prototype.showMeSearch = function(){

			if(this.showMe == false){ 
				this.showMe = true;
			} else {
				this.showMe = false;
			}
		
    }

    prodListingCtrl.prototype.showMeSelect = function(){

    		if(this.showListing == false){ 
				this.showListing = true; 
			} else {
				this.showListing = false;
			}

    }

    prodListingCtrl.prototype.myclick = function(val){ 

        this.selectPrice = val;

    }


   prodListingCtrl.prototype.fetchDetail = function(product_id){ 
   
  this.state.go("product",{ product_id:product_id });

   }
   
    return prodListingCtrl;


})();


prodListingModule.controller('prodListingCtrl', prodListingCtrl);