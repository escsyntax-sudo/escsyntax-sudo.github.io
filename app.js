(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var value = document.getElementById('theme-value');
  var themeTimer = null;

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function paintLabel() {
    var theme = currentTheme();
    if (value) value.textContent = theme;
    if (toggle) toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }

  function setTheme(theme) {
    // Fade the surfaces for one beat so the switch reads as a change, not a flash.
    root.classList.add('theming');
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('kned-theme', theme); } catch (e) {}
    paintLabel();
    if (themeTimer) window.clearTimeout(themeTimer);
    themeTimer = window.setTimeout(function () {
      root.classList.remove('theming');
    }, 280);
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      toggle.focus({ preventScroll: true });
    });
  }

  // Keyboard shortcut: t toggles the theme when not typing in a field.
  document.addEventListener('keydown', function (event) {
    var tag = (event.target && event.target.tagName) || '';
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (event.key === 't' || event.key === 'T') {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    }
  });

  // Follow the OS only while the visitor has not chosen a theme.
  var media = window.matchMedia('(prefers-color-scheme: light)');
  media.addEventListener('change', function (event) {
    var saved = null;
    try { saved = localStorage.getItem('kned-theme'); } catch (e) {}
    if (!saved) setTheme(event.matches ? 'light' : 'dark');
  });

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  paintLabel();

  // Project rows: hover previews on pointer devices, click or tap pins the panel open.
  var projects = Array.prototype.slice.call(document.querySelectorAll('.project'));
  var hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  function setProject(project, open) {
    var button = project.querySelector('.project-row');
    var panel = project.querySelector('.project-panel');
    var cue = project.querySelector('.project-cue');
    project.setAttribute('data-open', open ? 'true' : 'false');
    if (button) button.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (panel) panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (cue) cue.textContent = open ? 'close' : 'detail';
  }

  var projectControllers = projects.map(function (project) {
    var button = project.querySelector('.project-row');
    var pinned = false;

    var controller = {
      close: function () {
        pinned = false;
        // Keep keyboard focus on solid ground: a link inside the panel is hidden when it shuts.
        var panel = project.querySelector('.project-panel');
        if (panel && panel.contains(document.activeElement)) {
          if (button) button.focus();
        }
        setProject(project, false);
      },
      open: function () {
        pinned = true;
        projectControllers.forEach(function (other) {
          if (other !== controller) other.close();
        });
        setProject(project, true);
      },
    };

    if (button) {
      button.addEventListener('click', function () {
        if (project.getAttribute('data-open') === 'true' && pinned) controller.close();
        else controller.open();
      });
    }

    project.addEventListener('mouseenter', function () {
      if (hoverPointer.matches && !pinned) setProject(project, true);
    });

    project.addEventListener('mouseleave', function () {
      if (hoverPointer.matches && !pinned) setProject(project, false);
    });

    return controller;
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    projectControllers.forEach(function (controller) {
      controller.close();
    });
  });

  // Section reveal: each section arrives once, in reading order.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var groups = Array.prototype.slice.call(document.querySelectorAll('.section-body'));

  if (!reduceMotion && 'IntersectionObserver' in window && groups.length) {
    groups.forEach(function (group) {
      var items = Array.prototype.slice.call(group.children);
      items.forEach(function (item, index) {
        item.classList.add('reveal-item');
        item.style.setProperty('--reveal-delay', index * 70 + 'ms');
      });

      var rows = group.querySelectorAll('.project, .stack-row');
      Array.prototype.forEach.call(rows, function (row, index) {
        row.classList.add('reveal-item');
        row.style.setProperty('--reveal-delay', 120 + index * 45 + 'ms');
      });
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    groups.forEach(function (group) {
      observer.observe(group);
    });
  }
})();
