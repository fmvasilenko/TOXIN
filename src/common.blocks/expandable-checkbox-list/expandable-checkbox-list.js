$('.expandable-checkbox-list__title').click(function(){
  $(this).parent().find('.expandable-checkbox-list__list').slideToggle();
  $(this).parent().find('.expandable-checkbox-list__expand-more').toggleClass('expandable-checkbox-list__expand-more_upsidedown');
  return false;
});