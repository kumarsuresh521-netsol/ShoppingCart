(function() {
    'use strict';

    prodListingModule
        .config(function($stateProvider) {

            $stateProvider
                .state('app.prodListing', {
                    cache: 'false',
                    url: '/prodListing/:category_id/:category_name',
                    views: {
                'menuContent' :{
                    templateUrl: 'components/ProductListing/prodListing.html'
                         }
            },
                    
                })
        });
})();