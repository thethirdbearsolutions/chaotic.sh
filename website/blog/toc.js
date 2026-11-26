// Post table of contents: always open beside the post on wide screens,
// collapsible above it on narrow ones, with the section in view marked.
(function () {
  var nav = document.querySelector(".post-toc");
  if (!nav) return;
  var details = nav.querySelector("details");
  var wide = window.matchMedia("(min-width: 960px)");
  function fit() { details.open = wide.matches; }
  fit();
  if (wide.addEventListener) wide.addEventListener("change", fit);

  var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
  var heads = links.map(function (a) { return document.getElementById(decodeURIComponent(a.hash.slice(1))); });
  function mark() {
    var current = 0;
    for (var i = 0; i < heads.length; i++) {
      if (heads[i] && heads[i].getBoundingClientRect().top < window.innerHeight * 0.3) current = i;
    }
    links.forEach(function (a, i) {
      if (i === current) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", mark, { passive: true });
  mark();
})();
