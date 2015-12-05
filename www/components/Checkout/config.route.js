(function() {
    'use strict';
    checkoutModule
        .config(function($stateProvider) {
            $stateProvider
                .state('app.checkout', {
                    url: '/checkout',

                    views: {
                'menuContent' :{
                    templateUrl: 'components/Checkout/checkout.html'
                         }
            }
                })
                .state('app.payment', {
                    url: '/payment',
                    views: {
                        'menuContent' :{
                            templateUrl: 'components/Checkout/payment.html'
                        }
                    }
                })
                
                .state('app.success', {
                    url: '/success',
                    views: {
                        'menuContent' :{
                            templateUrl: 'components/Checkout/success.html'
                        }
                    }
                })
                
                .state('app.shipping', {
                    url: '/shipping',
                    views: {
                        'menuContent' :{
                            templateUrl: 'components/Checkout/shipping.html'
                        }
                    }
                })

        });




})();


                    
           