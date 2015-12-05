var bannerCtrl;

bannerCtrl = (function($rootScope, $scope,$ionicLoading,$ionicSideMenuDelegate,$state) {
    
    function bannerCtrlFunction($rootScope,$scope,bannerSrvc,$ionicSideMenuDelegate,$state, $ionicLoading) {

       this.showMe = true;
       this.state = $state;
       this.rootScope = $rootScope;
        
        var self = this;
      
        bannerSrvc.getBdata().then(function(response) {
            self.category = response.images;
        });
       
        bannerSrvc.getBdataSecond().then(function(response) {
            self.categoryBanners = response ;
        });
        
        bannerSrvc.getBdataSpecial().then(function(response) {
            self.categoryBannersSpecial = response ;
        });
        
        bannerCtrl.prototype.showMeSearch = function($rootScope,searchproducts){

            console.log(this.searchproducts);
    
            this.rootScope.srch = this.searchproducts;
        
            this.state.go("app.prodListing");
            
          
        } 
    
        bannerCtrl.prototype.showProducts = function(product_id){
            this.state.go("product",{ product_id:product_id });
        }
    }


      
     
    return bannerCtrlFunction;
})();

bannerModule.controller('bannerCtrl', bannerCtrl);

