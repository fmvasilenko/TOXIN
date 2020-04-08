function changeDropdownField($drop_down){ //adding text to dropdown field
  /* $drop_down has the whole dropdown element in it */
  let str = '';

  $drop_down.find('.drop-down__input').each( function (index) { //creating a string
    if($(this).val() != 0) {

      if(str != '') str += ', ';

      str += $(this).val();
      str += ' ' + $(this).parents('.drop-down__option').find('.drop-down__option-title').text();
    }
  })

  if(str != '') $drop_down.find('.drop-down__field-input').val(str); //if str is not empty -> add it to the field
  else $drop_down.find('.drop-down__field-input').val('Выберите');

  return false;
};

$('.drop-down__button_increase').click(function(){ //increasing button
  var $input = $(this).parent().find('input');

  $input.val(parseInt($input.val()) + 1); //increasing the value
  $input.change();

  $(this).parent().find('.drop-down__button_decrease').prop("disabled", false); //activating the decrease button

  changeDropdownField($('.drop-down'));

  return false;
});

$('.drop-down__button_decrease').click(function () {//decreasing button
  var $input = $(this).parent().find('input');
  var count = parseInt($input.val()) - 1;

  count = count < 1 ? 0 : count; //decreasing the value
  $input.val(count);
  $input.change();

  if(count == 0) {
    $(this).prop("disabled", true); //disable the decrease button if the value is 0
  }

  changeDropdownField($('.drop-down'));

  return false;
});

$('.drop-down__expand-more').click(function(){  //expand-more button
  $('.drop-down__list').toggleClass('drop-down__list_drop');
  $('.drop-down__field').toggleClass('drop-down__field_drop');
})

$(document).ready(function(){
  $('.drop-down__input').each(function(index){  //disabling the decrease buttons after being generated
    if($(this).val() == 0) {
      $(this).parent().find('.drop-down__button_decrease').prop("disabled", true);
    }
  })
})
