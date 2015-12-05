(function() {
    'use strict';
    productModule
        .config(function($stateProvider) {
            $stateProvider
                .state('product', {
                	cache:'false',
                    url: '/product:product_id',
                    templateUrl: 'components/Product/product.html'
                })
        });
})();