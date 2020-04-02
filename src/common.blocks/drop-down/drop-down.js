$('.drop-down__button_increase').click(function(){
  var $input = $(this).parent().find('input');
  $input.val(parseInt($input.val()) + 1);
  $input.change();
  return false;
});
$('.drop-down__button_decrease').click(function () {
  var $input = $(this).parent().find('input');
  var count = parseInt($input.val()) - 1;
  count = count < 1 ? 0 : count;
  $input.val(count);
  $input.change();
  return false;
});