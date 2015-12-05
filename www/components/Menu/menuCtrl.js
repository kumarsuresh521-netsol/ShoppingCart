var menuCtrl;
//menuModule.$inject = [$state];
menuCtrl = (function($state ,$rootScope,$scope,$timeout) {

    
    function menuCtrl($scope , $rootScope,  homeSrvc , $state,$timeout) {
//console.log($scope); 
        this.state = $state ;
        this.homeSrvc= homeSrvc;
        this.scope = $scope;
        
        if(localStorage.getItem("customer_id")){
            this.username = localStorage.getItem("firstname");
        } else {
            this.username = "Guest";
        }
//console.log("categoryis");   console.log(homeSrvc.children[0].children);
    this.categories = homeSrvc.children[0].children;
    
    
   this.rootscope = $rootScope; 
}


menuCtrl.prototype.getSub = function(position_id, category_id, category_name) { //alert(position_id); alert(category_id); alert(category_name);


    var  listc = this.homeSrvc; //console.log(listc); console.log("duckssssssss");
   //alert(listc.children[0].children[position_id].children.length);
         if (listc.children[0].children[position_id].children.length > 0){
                this.state.go("app.home", {position_id:position_id});
            } else {
              this.state.go("app.prodListing", {'category_id':category_id, 'category_name':category_name});
            }
        }
    
menuCtrl.prototype.LogOut = function() {
    localStorage.setItem("email", '');
    localStorage.setItem("firstname", '');
    localStorage.setItem("lastname", '');
    localStorage.setItem("customer_id", '');
    alert("You Logout Successfully");
    this.state.go("login");
    return;
}
    

return menuCtrl;
    
})();



menuModule.controller('menuCtrl', menuCtrl);
