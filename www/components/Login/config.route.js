(function() {
    'use strict';
    loginModule
        .config(function($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login:route',
                    templateUrl: 'components/Login/login.html'
                })
        });
})();