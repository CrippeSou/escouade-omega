(function () {
  var links = document.querySelectorAll('a[href^="http"]');
  links.forEach(function (a) {
    if (a.hostname !== location.hostname) a.setAttribute('rel', 'noopener');
  });
})();
