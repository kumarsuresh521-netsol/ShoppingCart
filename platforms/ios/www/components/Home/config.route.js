(function() {
    'use strict';
    homeModule
        .config(function($stateProvider) {
            $stateProvider
                .state('app.home', {
                    cache:'false',
                    url: '/home:position_id',

                    views: {
                'menuContent' :{
                    templateUrl: 'components/Home/home.html'
                         }
            }
                })
        });
})();


                    
           