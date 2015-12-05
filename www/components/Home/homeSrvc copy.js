var homeSrvc;

homeSrvc = (function($log, $http, $q) {

    

    var homeSrvc =  [
            {
                id:1,
                "name": "Men",
                "Subcategories": {
                    "Clothing": {
                        "description": "Mens Clothing",
                        "img" : "mens_clothing"
                    },
                    "Footwear": {
                        "description": "Mens Footwear",
                        "img" : "mens_footwear"
                    },
                    "Accesories": {
                        "description": "Mens Accesories",
                        "img" : "mens_accesories"
                    },
                    "Bags": {
                        "description": "Mens Bags",
                        "img" : "mens_bags"
                    }
                }
            },
            {
                id:2,
                "name": "Women",
                "Subcategories": [
                    {
                        "Clothing": {
                            "description": "Womens Clothing"
                        },
                        "Footwear": {
                            "description": "Womens Footwear"
                        },
                        "Dresses": {
                            "description": "Womens Dresses"
                        }
                    }
                ]
            },
            {
                id:3,
                "name": "Kids",
                "Subcategories": [
                    {
                        "Clothing": {
                            "description": "Kids Clothing"
                        },
                        "Footwear": {
                            "description": "Kids Footwear"
                        },
                        "Fashion": {
                            "description": "Kids Fashion"
                        }
                    }
                ]
            },
            {
                id:4,
                "name": "Accessories",
                "Subcategories": [
                    {
                        "Stoles and Scarfs": {
                            "description": "Stoles and Scarfs"
                        },
                        "Belts and Badges": {
                            "description": "Belts and Badges"
                        }
                    }
                ]
            },
            { 
                id:5,
                "name": "Handbags",
                "Subcategories": [
                    {
                        "Leather handbags": {
                            "description": "Leather handbags"
                        },
                        "Other handbags": {
                            "description": "Other handbags"
                        }
                    }
                ]
            }
        ]

    

    return homeSrvc;
});

homeModule.factory('homeSrvc', homeSrvc);