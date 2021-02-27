function _chart() {
  $(".mainChart").appear();
  $(".mainChart").on("appear", function (event, $all_appeared_elements) {
    setTimeout(function () {
      $(".chart").easyPieChart({
        easing: "easeOutElastic",
        delay: 3000,
        barColor: "#553",
        scaleColor: false,
        lineWidth: 12,
        trackWidth: 15,
        size: 250,
        lineCap: "round",
        animate: 2000,
        onStep: function (from, to, percent) {
          this.el.children[0].innerHTML = Math.round(percent);
        },
      });
    }, 500);
  });
  $.appear(".mainChart", {
    interval: 2500,
  });
  $.appear("mainChart", {
    force_process: true, // default: false
  });
}
$(document).ready(function () {
  _chart();
});
