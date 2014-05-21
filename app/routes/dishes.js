/* jshint unused:false */
'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
// var User = traceur.require(__dirname + '/../models/user.js');
// var _ = require('lodash');

exports.menuOptions = (req, res)=>{
  console.log(req.params.menu);
  Dish.findByMenu(req.params.menu, dishes=>{
    res.render('dishes/menuOptions', {dishes:dishes});
  });
};
