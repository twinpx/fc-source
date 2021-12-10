/*document.querySelectorAll('.b-switcher').forEach(function (switcher) {
  var underline = switcher.querySelector('.b-switcher__underline');
  switcher.querySelectorAll('.b-switcher__item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      moveUnderline(item);
    });
  });

  switcher.querySelector('.b-switcher__item').click();

  function moveUnderline(item) {
    switcher.querySelectorAll('.b-switcher__item').forEach(function (item) {
      item.classList.remove('active');
    });
    item.classList.add('active');
    underline.style.width = item.offsetWidth + 'px';
    underline.style.left =
      item.getBoundingClientRect().left -
      switcher.getBoundingClientRect().left +
      'px';
  }
});*/
