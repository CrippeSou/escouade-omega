(function () {
  var imgs = document.querySelectorAll('img:not([loading])');
  imgs.forEach(function (img) { img.setAttribute('loading', 'lazy'); });
})();
