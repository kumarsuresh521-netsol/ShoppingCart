var productCtrl;

productCtrl = (function($rootScope,$scope,$state,productSrvc) {
/*.value("person", {
    firstName: "",
    lastName: "",

    getFullName: function ()
    {
      return this.firstName + " " + this.lastName;
    }
  })*/
   
function productCtrl($rootScope,$scope,productSrvc,$state,$stateParams) {

   console.log($stateParams);
	//this.pdata.name ="sadfsa";
    //$scope.pdata = this.pdata;
       this.state = $state;
       var self = this;
      //console.log(productSrvc);
productSrvc.getData("4").then(function(response) {
  
 

 //alert(self.pdata[0].name+"dfsgdsfg");

           //console.log(response);
          self.pdata = response ;
//$scope.fname = this.pdata[0].name;
          // alert(this.pdata[0].name);
         
       })

console.log(this.pdata);
     }

     productCtrl.prototype.showMeSearch = function(searchproducts){

        window.localStorage['search'] = this.searchproducts;
    
        this.state.go("app.prodListing");

     }
       
    

    return productCtrl;
})();

productModule.controller('productCtrl', productCtrl);

