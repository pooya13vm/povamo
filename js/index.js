(function ($) {
  var selectors = [];

  var checkBinded = false;
  var checkLock = false;
  var defaults = {
    interval: 250,
    force_process: false,
  };
  var $window = $(window);

  var $priorAppeared = [];

  function isAppeared() {
    return $(this).is(":appeared");
  }

  function isNotTriggered() {
    return !$(this).data("_appear_triggered");
  }

  function process() {
    checkLock = false;

    for (
      var index = 0, selectorsLength = selectors.length;
      index < selectorsLength;
      index++
    ) {
      var $appeared = $(selectors[index]).filter(isAppeared);

      $appeared
        .filter(isNotTriggered)
        .data("_appear_triggered", true)
        .trigger("appear", [$appeared]);

      if ($priorAppeared[index]) {
        var $disappeared = $priorAppeared[index].not($appeared);
        $disappeared
          .data("_appear_triggered", false)
          .trigger("disappear", [$disappeared]);
      }
      $priorAppeared[index] = $appeared;
    }
  }

  function addSelector(selector) {
    selectors.push(selector);
    $priorAppeared.push();
  }

  // ":appeared" custom filter
  $.expr.pseudos.appeared = $.expr.createPseudo(function (_arg) {
    return function (element) {
      var $element = $(element);

      if (!$element.is(":visible")) {
        return false;
      }

      var windowLeft = $window.scrollLeft();
      var windowTop = $window.scrollTop();
      var offset = $element.offset();
      var left = offset.left;
      var top = offset.top;

      if (
        top + $element.height() >= windowTop &&
        top - ($element.data("appear-top-offset") || 0) <=
          windowTop + $window.height() &&
        left + $element.width() >= windowLeft &&
        left - ($element.data("appear-left-offset") || 0) <=
          windowLeft + $window.width()
      ) {
        return true;
      }
      return false;
    };
  });

  $.fn.extend({
    // watching for element's appearance in browser viewport
    appear: function (selector, options) {
      $.appear(this, options);
      return this;
    },
  });

  $.extend({
    appear: function (selector, options) {
      var opts = $.extend({}, defaults, options || {});

      if (!checkBinded) {
        var onCheck = function () {
          if (checkLock) {
            return;
          }
          checkLock = true;

          setTimeout(process, opts.interval);
        };

        $(window).scroll(onCheck).resize(onCheck);
        checkBinded = true;
      }

      if (opts.force_process) {
        setTimeout(process, opts.interval);
      }

      addSelector(selector);
    },
    // force elements's appearance check
    force_appear: function () {
      if (checkBinded) {
        process();
        return true;
      }
      return false;
    },
  });
})(
  (function () {
    if (typeof module !== "undefined") {
      // Node
      return require("jquery");
    }
    return jQuery;
  })()
);
// ====================from main page====================================
$(document).ready(function () {
  new WOW().init();
  var x = $("a[href$='s']");
  x.on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        2000,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

$(window)
  .scroll(function () {
    var offsetTop = $(window).scrollTop();
    var documentHeight = $(document).height() - $(window).height();
    var percent = (offsetTop / documentHeight) * 100 + "%";
    $(".progress").css({ width: percent });
    $("#skills").css({ backgroundPositionX: offsetTop + "px" });
    if (offsetTop > 600) {
      $(".navbar").css({ background: "rgba(255,255,255,0.5)" });
    } else {
      $(".navbar").css({ background: "none" });
    }
  })
  .scroll();

$(document).ready(function () {
  new WOW().init();
});

$("#bottom_form").submit(function (e) {
  e.preventDefault();
  $("#submit-btn").html(
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...'
  );

  formData = {
    name: $("input[name=name]").val(),
    name2: $("input[name=name2]").val(),
    subject: $("input[name=subject]").val(),
    message: $("textarea#message").val(),
  };
  let data =
    "name : " +
    formData.name +
    " // " +
    "subject : " +
    formData.subject +
    " // " +
    "email : " +
    formData.name2 +
    " // " +
    formData.message;
  Email.send({
    Host: "smtp.gmail.com",
    Username: "povamo13@gmail.com",
    Password: "63961313",
    To: "pooya_vm@yahoo.com",
    From: "povamo13@gmail.com",
    Subject: "from site",
    Body: data,
  }).then(() => {
    $("#submit-btn").html("Thank You");
    $("#bottom_form").trigger("reset");
    $("#submit-btn").removeClass("btn-indigo");
    $("#submit-btn").addClass("btn-info");
  });
});
