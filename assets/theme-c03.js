(function () {
  var y = new Date().getFullYear();
  document.querySelectorAll('.copyright-year').forEach(function (el) { el.textContent = y; });
})();
