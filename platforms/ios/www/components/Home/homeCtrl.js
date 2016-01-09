var homeCtrl;

homeCtrl = (function($rootScope,$scope,$ionicSideMenuDelegate,$state) {

    function homeCtrl($rootScope,$stateParams, $scope,homeSrvc,$ionicSideMenuDelegate,$state) {
        
        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartid")){
            this.cartTotal = localStorage.getItem("cartTotal");    
        } else {
            this.cartTotal = 0;
        }
        
        if($stateParams.position_id){
            var position_id = $stateParams.position_id;
        } else {
            var position_id = 1;
        }
       
       this.category = homeSrvc.children[0].children[position_id];
       this.categoryHeading = homeSrvc.children[0].children[position_id].name ; 
       this.showMe = true;
       this.state = $state;
       this.rootScope = $rootScope;

     }

     homeCtrl.prototype.showMeSearch = function(searchproducts){

        this.rootScope.srch = this.searchproducts;
    
        this.state.go("app.prodListing");

     }

     homeCtrl.prototype.showProducts = function(category_id, category_name){
        this.state.go("app.prodListing",{ category_id:category_id, category_name:category_name });
    }
       
    return homeCtrl;
})();

homeModule.controller('homeCtrl', homeCtrl);

