// Mobile navigation toggle (CHT-238). Shared by every page.
// Below the breakpoint in css/style.css the nav collapses behind the
// hamburger button; this opens and closes it, and closes it again on
// Escape, on following a link, and when the window grows past the breakpoint.
(function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('nav-open', open);
    }

    function isOpen() {
        return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', function () {
        setOpen(!isOpen());
    });

    nav.addEventListener('click', function (event) {
        if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    // Keep in sync with the max-width breakpoint for .nav-toggle in style.css.
    var wide = window.matchMedia('(min-width: 901px)');
    var onWide = function (event) {
        if (event.matches) setOpen(false);
    };
    if (wide.addEventListener) {
        wide.addEventListener('change', onWide);
    } else if (wide.addListener) {
        wide.addListener(onWide);
    }
})();
