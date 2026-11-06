/* Saprano Sound — behaviour layer.
   Three motions only: image reveals, the reel play affordance, navigation transitions.
   All of them live behind prefers-reduced-motion checks in CSS. */

(function () {
  "use strict";

  /* ---- Header: hairline appears once the page scrolls ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---- Reading-progress bar + scroll parallax for floating photos.
         One shared passive scroll listener, transforms only, rAF-coalesced. ---- */
  var progressBar = document.querySelector(".scroll-progress");
  var parallaxItems = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  if (progressBar || parallaxItems.length) {
    var frameQueued = false;
    var parallaxOk = function () {
      /* Skip parallax on touch/reduced-motion; the drift animation already
         carries the effect and continuous transforms cost battery. */
      return !reduceMotion.matches && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    };
    var paint = function () {
      frameQueued = false;
      if (progressBar) {
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        var pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        progressBar.style.setProperty("--progress", pct.toFixed(4));
      }
      if (parallaxOk()) {
        var mid = window.innerHeight / 2;
        for (var i = 0; i < parallaxItems.length; i++) {
          var el = parallaxItems[i];
          var rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue;
          var speed = parseFloat(el.getAttribute("data-parallax")) || 0;
          var offset = (rect.top + rect.height / 2 - mid) * speed;
          el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
        }
      }
    };
    var queuePaint = function () {
      if (!frameQueued) {
        frameQueued = true;
        window.requestAnimationFrame(paint);
      }
    };
    window.addEventListener("scroll", queuePaint, { passive: true });
    window.addEventListener("resize", queuePaint, { passive: true });
    queuePaint();
  }

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    var nav = document.getElementById(toggle.getAttribute("aria-controls"));
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      if (nav) nav.classList.toggle("is-open", !open);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        if (nav) nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* ---- Image reveals, optionally staggered within a [data-stagger] group ---- */
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, index) {
      if (child.classList.contains("reveal")) child.style.setProperty("--stagger", String(index));
    });
  });
  var revealables = document.querySelectorAll(".reveal");
  if (revealables.length) {
    if (!("IntersectionObserver" in window)) {
      revealables.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
      revealables.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ---- Reel play affordance (video never autoplays) ---- */
  document.querySelectorAll("[data-reel]").forEach(function (frame) {
    var video = frame.querySelector("video");
    var overlay = frame.querySelector(".play-overlay");
    if (!video || !overlay) return;
    var start = function () {
      overlay.setAttribute("hidden", "");
      video.setAttribute("controls", "");
      var played = video.play();
      if (played && typeof played.catch === "function") {
        played.catch(function () { overlay.removeAttribute("hidden"); });
      }
      video.focus({ preventScroll: true });
    };
    overlay.addEventListener("click", start);
    video.addEventListener("play", function () { overlay.setAttribute("hidden", ""); });
    video.addEventListener("pause", function () {
      if (video.currentTime === 0) overlay.removeAttribute("hidden");
    });
  });

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- Contact form: MailJS is the whole backend (public config only) ---- */
  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var submit = form.querySelector("button[type='submit']");
    var statusNode = function (message, state) {
      if (!status) return;
      status.textContent = message;
      if (state) status.setAttribute("data-state", state);
      else status.removeAttribute("data-state");
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var honeypot = form.querySelector("input[name='website']");
      if (honeypot && honeypot.value) {
        form.reset();
        statusNode("Thanks — your inquiry has been received.", "success");
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        statusNode("Please complete each required field.", "error");
        return;
      }

      var config = window.SAPRANO_CONFIG || {};
      var ready = config.publicKey && config.serviceId && config.templateId && window.emailjs;

      if (!ready) {
        statusNode(
          "This form isn’t accepting messages yet — please try again shortly.",
          "error"
        );
        return;
      }

      var pageUrl = form.querySelector("input[name='page_url']");
      if (pageUrl) pageUrl.value = window.location.href;

      if (submit) submit.disabled = true;
      statusNode("Sending…");

      if (!window.__sapranoEmailJsReady) {
        window.emailjs.init({ publicKey: config.publicKey });
        window.__sapranoEmailJsReady = true;
      }

      var params = {};
      new FormData(form).forEach(function (value, key) {
        if (key !== "website") params[key] = value;
      });

      /* Template extras: every variable the email template uses is always filled. */
      params.time = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
      });
      params.message = String(params.message || "").replace(/\r?\n/g, "<br>");
      /* Phone is rendered inside a tel: link — keep it to phone characters. */
      params.phone = String(params.phone || "").replace(/[^0-9()+\-.\s]/g, "").trim();
      if (!params.phone) params.phone = "Not provided";

      window.emailjs
        .send(config.serviceId, config.templateId, params)
        .then(function () {
          form.reset();
          statusNode("Thanks — your message is on its way to Tony. He'll follow up shortly.", "success");
        })
        .catch(function () {
          statusNode(
            "Something went wrong sending that. Please try again in a moment.",
            "error"
          );
        })
        .finally(function () {
          if (submit) submit.disabled = false;
        });
    });
  });
})();
