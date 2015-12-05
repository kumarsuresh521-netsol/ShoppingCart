var prodListingSrvc;

prodListingSrvc = (function() {
    
  var prodListingSrvc = [{
    id: 0,
    name: 'New sneakers',
    price: '270',
    phone: '1234567',
    type: 'low',
    brand: 'Oxford',
    Discount: '0',
    color: 'black',
    img: 'product1.png'
  }, {
    id: 1,
    name: 'Perforated Oxfords',
    price: '180',
    type: 'low',
    brand: 'Oxford',
    Discount: '0',
    color: 'black',
    img: 'product2.png'
  }, {
    id: 2,
    name: 'G.H Bass & Co. Oxfords',
    price: '158',
    type: 'low',
    brand: 'Freaky',
    Discount: '145',
    color: 'orange',
    img: 'product3.png'

  }, {
    id: 3,
    name: 'Dot Loafers',
    price: '300',
    type: 'low',
    brand: 'Oxford',
    Discount: '10',
    color: 'red',
    img: 'product4.png'
  }, {
    id: 4,
    name: 'Canvas Oxfords',price: '30',
    type: 'low',
    brand: 'Freaky',
    Discount: '200',
    color: 'green',
    img: 'product1.png'
  },
  {
    id: 5,
    name: 'American Oxfords' ,
    price: '150',
    type: 'low',
    brand: 'swedish',
    Discount: '55',
    color: 'black',
    img: 'product2.png'
  },
  {
    id: 6,
    name: 'Newlanders',
    price: '170',
    type: 'low',
    brand: 'Oxford',
    Discount: '20',
    color: 'orange',
    img: 'product3.png'
  },
  {
    id: 7,
    name: 'High Rakcs',
    price: '425',
    type: 'high',
    brand: 'Oxford',
    Discount: '10',
    color: 'blue',
    img: 'product4.png'
  }];
  return prodListingSrvc;
  /*return {
    all: function() {
      return prodListingSrvc;
    },
    remove: function(id) {
      prodListingSrvc.splice(prodListingSrvc.indexOf(id), 1);
    },
    get: function(id) {
      for (var i = 0; i < prodListingSrvc.length; i++) {
        if (prodListingSrvc[i].id === parseInt(id)) {
          return prodListingSrvc[i];
        }
      }
      
    }
  };*/

});

prodListingModule.factory('prodListingSrvc', prodListingSrvc);