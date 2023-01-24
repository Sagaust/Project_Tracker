// JavaScript function that wraps everything
$(document).ready(function() {
  var today = moment();
  $('#current-time').text(today.format("D MMM YYYY"));

});
