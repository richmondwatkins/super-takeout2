/* jshint unused:false */
'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');
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
  // console.log(req.body);
  var dishObject = [];
  var order = {};
  order.total = req.body.total[0];
  order.calories = req.body.calories[0];
  for(var i = 0; i < req.body.qty.length; i++){
    order.qty = req.body.qty[i];
    order.dishId = req.body.dishId[i];
    dishObject.push(order);

  }
  console.log(dishObject);
    // var orders = new Order(dishObject, req.session.userId);


    // Order.findByDishId(req.body.dishId, res=>{
    //     var cals = res[0].calories;
    //     console.log(cals);
    //
    // });

      // console.log(orders);
};
  //
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
