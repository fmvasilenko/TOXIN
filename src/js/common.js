import RateButton from "../common.blocks/rate-button/rate-button";

let rateButtons = []; 

$('.rate-button').each( function(index, element) {
  rateButtons[index] = new RateButton($(element));
});