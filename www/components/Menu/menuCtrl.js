var menuCtrl;
//menuModule.$inject = [$state];
menuCtrl = (function($state ,$rootScope,$scope,$timeout, $ionicLoading, menuSrvc) {

    
    function menuCtrl($scope , $rootScope , $state,$timeout, $ionicLoading, menuSrvc) {
//console.log($scope); 
        this.state = $state ;
        this.menuSrvc= menuSrvc;
        var mycategories = {};
        var self = this;
        
        if(localStorage.getItem("customer_id")){
            self.username = localStorage.getItem("firstname");
        } else {
            self.username = "Guest";
        }

        $ionicLoading.show();
        self.menuSrvc.getCategories().then(function(response) { console.log(response);
            //menushowCat(response);
            if(response.success == 1){
                self.youcategories = response.data.children[0].children;
            }
            
        }).finally(function(){
            $ionicLoading.hide();
        });

        var i = 0;

        function menushowCat(response){ console.log(response);
            if(response.length > 0 ){
                if(response[i]){
                    if(response[i].parent_id == 2){
                        mycategories[i] = response[i];
                        self.youcategories = mycategories;
                    }
                    i++;
                    menushowCat(response);
                }
            }
        }

        self.rootscope = $rootScope; 

       menuCtrl.prototype.getSub = function(index, position_id, category_id, category_name) {
            var myarray = [];
            for(x in self.youcategories){
                myarray.push(self.youcategories[x]);
            } //console.log("myarray"); alert(index);
//console.log(myarray); alert(myarray[index].children.length);
            if (myarray[index].children.length > 0){ ///alert("hi");
                self.state.go("app.home",{'category_id':category_id, 'category_name':category_name});
            } else {
              self.state.go("app.prodListing", {'category_id':category_id, 'category_name':category_name});
            }
        }

        menuCtrl.prototype.nav = function(state) {
            self.state.go(state);
        }
    }
 

return menuCtrl;
    
})();



menuModule.controller('menuCtrl', menuCtrl);
