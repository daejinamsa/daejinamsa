/* 공통: 머리 메뉴 배경, 스크롤 등장, 지금 보고 있는 메뉴 표시 */
(function () {
  var hd = document.getElementById("hd");
  function onScroll() { if (hd) hd.classList.toggle("solid", window.scrollY > 40); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (el) { io.observe(el); });

    var links = {};
    document.querySelectorAll('.menu a[href^="#"]').forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var a = links[e.target.id]; if (!a) return;
        if (e.isIntersecting) { Object.keys(links).forEach(function (k) { links[k].classList.remove("on"); }); a.classList.add("on"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  } else rv.forEach(function (el) { el.classList.add("in"); });
})();
