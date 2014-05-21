/* global ajax */
/* jshint unused: false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#order').on('change', '.menu', getDishes);
    $('#add').click(addMenu);
    $('#order').on('click', '#delete', removeMenu);
    $('#order').on('change', 'input', findTotal);
    $('#order').on('blur', 'input', findTotal);
  }

  function findTotal(){
    var items = $('.menu-item').toArray();     // .data().cost;
    var total = 0;
    var totalCals = 0;

     items.forEach(item=>{
       var cost = $(item).find('.dish').find(':selected').attr('data-cost') * 1;
       var qty = $(item).children(':first').val();

       var cals = $(item).find('.dish').find(':selected').attr('data-calories') * 1;

       if(qty < 0){
         return qty === 0;
       }
       if(!isNaN(cost)){

         total += cost * qty;
         totalCals += cals * qty;

       }

   });
   $('.total').val(total);
   $('.cals').val(totalCals);

   $('#total').text('$' + total);
   $('#calories').text('Calories:' + totalCals);
  }



  function removeMenu(e){
    var menus = $('.menu-item');
    if(menus.length > 1){
    $(this).closest('.menu-item').remove();
    e.preventDefault();
      findTotal();
    }
    e.preventDefault();
  }

  function getDishes(){
      var menu = $(this).val();  //represents the .menu select box
      var next = $(this).next();
      ajax( `/dishes/${menu}`, 'get', null, h=>{
        next.empty().append(h);
        findTotal();
      });
  }

  function addMenu(){   //does the same thing as the commented out code below..code below uses a html partrition
  var no =  $('.menu-item:last-child').clone();
  $('#order').append(no);
  findTotal();
  }

// function addMenu(){
//   ajax(`/orders/addmenu`, 'get', null, h=>{
//     $('#order').append(h);
//   });
// }




})();
