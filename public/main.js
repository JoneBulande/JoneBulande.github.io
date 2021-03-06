"use strict";

(function () {
  "use strict";

  var t, e, o, n;
  document.querySelector(".btn-menu").addEventListener("click", function (t) {
    t.preventDefault(), t.target.classList.toggle("ativo"), document.querySelector("[data-menu]").classList.toggle("ativo");
  }), function () {
    var t = document.querySelectorAll("[data-menu] a");

    function e(e) {
      e.preventDefault(), t.forEach(function (t) {
        t.classList.remove("underline");
      }), e.target.classList.add("underline");
      var o = e.target.getAttribute("href"),
          n = document.querySelector(o),
          a = document.querySelector("[data-menu]"),
          i = document.querySelector(".btn-menu");
      a.classList.contains("ativo") && (i.classList.remove("ativo"), a.classList.remove("ativo")), n.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    }

    t.forEach(function (t) {
      t.addEventListener("click", e);
    });
  }(), t = document.querySelectorAll('[data-anime="right"]'), e = document.querySelectorAll('[data-anime="left"]'), o = document.querySelectorAll('[data-anime="up"]'), n = .8 * window.innerHeight, window.addEventListener("scroll", function () {
    t.forEach(function (t) {
      t.getBoundingClientRect().top - n < 0 ? t.classList.add("ativo") : t.classList.remove("ativo");
    }), e.forEach(function (t) {
      t.getBoundingClientRect().top - n < 0 ? t.classList.add("ativo") : t.classList.remove("ativo");
    }), o.forEach(function (t) {
      t.getBoundingClientRect().top - n < 0 ? t.classList.add("ativo") : t.classList.remove("ativo");
    });
  });
})();