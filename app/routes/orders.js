/* jshint unused:false */
'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');
var orders = global.nss.db.collection('orders');
var _ = require('lodash');

exports.new = (req, res)=>{
  Dish.menu(menuItems=>{
    User.findById(req.session.userId, user=>{
      res.render('orders/new', {title: 'New Order', menuItems:menuItems, user:user}); //passing menuItems in lets you use it in the jade file that is being rendered
    });
  });
};

exports.addMenu = (req, res)=>{
  Dish.menu(menuItems=>{
  res.render('orders/addmenu', {title: 'New Order', menuItems:menuItems});
  });
};

exports.create = (req, res)=>{

  var dishObject = [];
  var selections = {};
  for(var i = 0; i < req.body.qty.length; i++){
    selections.qty = req.body.qty[i];
    selections.dishId = req.body.dishId[i];
    dishObject.push(selections);
  }

  Order.findByDishId(req.body.dishId, dishes=>{
    console.log(dishes);
      var order = {};
      var names = [];
    for(var j = 0; j < dishes.length; j++){
      names.push(dishes[j].name);
      order.selections = names;
    }
      order.total = req.body.total[0];
      order.calories = req.body.calories[0];

      orders.save(order, ()=>res.redirect('/orders'));

    });


};
  //tree.save(()=>res.render('trees/tree', {tree:tree}));
  // exports.login = (req, res)=>{
  //   var user = new User(req.body);
  //   user.login(u=>{
  //     if(u){
  //       req.session.userId = u._id;
  //     }else{
  //       req.session.userId = null;
  //     }
  //
  //     res.redirect('/');
  //   });
  // };
  //
