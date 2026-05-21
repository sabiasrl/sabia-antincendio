(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  var body = document.body;

  var closeMenu = function () {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Apri menu");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Chiudi menu" : "Apri menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  document.querySelectorAll('a.brand[href="#top"], a.nav__logo[href="#top"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      if (window.history && window.history.replaceState) {
        var path = window.location.pathname + window.location.search;
        window.history.replaceState(null, "", path);
      }
      closeMenu();
    });
  });

  document.querySelectorAll(".faq__question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq__item");
      var panel = item && item.querySelector(".faq__answer");
      if (!item || !panel) return;
      var open = item.classList.toggle("faq__item--open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    });
  });

  document.querySelectorAll(".gallery__item img").forEach(function (img) {
    img.setAttribute("draggable", "false");
  });
})();
