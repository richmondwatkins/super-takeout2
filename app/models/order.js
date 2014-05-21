/* jshint unused:false */
'use strict';

var orders = global.nss.db.collection('orders');
var dishes = global.nss.db.collection('dishes');
var Mongo = require('mongodb');
// var bcrypt = require('bcrypt');
// var _ = require('lodash');

class Order{
  constructor(obj, userId){

    this.meal = obj;
    this.date = new Date();
    this.userId = userId;
    this.calories = obj.calories;
    this.total = obj.total;

  }

  static findByDishId(dishId, fn){
    var dishIdArray =  dishId.map(id=>Mongo.ObjectID(id));
    dishes.find({_id:{ $in: dishIdArray}}).toArray((e, records)=>{
      fn(records);

  });
 }

}

module.exports = Order;
// { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
