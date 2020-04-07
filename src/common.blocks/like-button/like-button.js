$('.like-button').click(function(){
  //Changing the value and the icon
  let element = $(this).find('.like-button__number');
  let number = element.html();
  
  if(element.hasClass('like-button__number_liked')){
    if(number > 0)
      element.html(--number);
    $(this).find('.like-button__icon').html('favorite_border');
  }
  else {
    element.html(++number);
    $(this).find('.like-button__icon').html('favorite');
  }

  //Adding new classes
  $(this).toggleClass('like-button_liked');
  $(this).find('.like-button__icon').toggleClass('like-button__icon_liked');
  $(this).find('.like-button__number').toggleClass('like-button__number_liked');

  return false;
});