$(document).ready(function () {
  $("#top-menu").click(function () {
    $(".menu").addClass("active");
  });
  $(".fa-window-close").click(function () {
    $(".menu").removeClass("active");
  });
});

$(window).scroll(function () {
  var offsetTop = $(window).scrollTop();
  var documentHeight = $(document).height() - $(window).height();
  var percent = (offsetTop / documentHeight) * 100 + "%";
  $(".progress").css({ width: percent });
  $(".back-holder2").css({ backgroundPositionX: offsetTop + "px" });
});
// Tooltips Initialization
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function () {
  new WOW().init();
});
