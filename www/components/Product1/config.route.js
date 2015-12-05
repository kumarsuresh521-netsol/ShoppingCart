(function() {
    'use strict';
    productModule
        .config(function($stateProvider) {
            $stateProvider
                .state('product', {
                	cache:'false',
                    url: '/product',
                    templateUrl: 'components/Product/product.html'
                })
        });
})();