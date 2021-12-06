window.addEventListener('load', function () {
  if (window.matchMedia('(min-width: 768px)').matches) {
    var intervalId;

    document.querySelectorAll('.b-trends').forEach(function (trendsElem) {
      var nextButton = trendsElem.querySelector('.b-trends-button-next');
      var prevButton = trendsElem.querySelector('.b-trends-button-prev');
      var bodyElem = trendsElem.querySelector('.b-trends-wrapper__body');
      var wrapperElem = trendsElem.querySelector('.b-trends-wrapper');

      var itemsWidth = 0;
      trendsElem.querySelectorAll('.b-trends__item').forEach(function (item) {
        itemsWidth += 1 * item.clientWidth;
      });
      itemsWidth +=
        (trendsElem.querySelectorAll('.b-trends__item').length - 1) * 20;

      //mouse wheel
      bodyElem.addEventListener('wheel', function (e) {
        e.preventDefault();
        if (e.deltaY > 0) {
          nextButton.click();
        } else {
          prevButton.click();
        }
      });

      //next button
      nextButton.addEventListener('click', function (e) {
        e.preventDefault();
        var scroll = bodyElem.clientWidth / 2;
        wrapperElem.classList.remove('start');
        animateScroll(
          bodyElem,
          bodyElem.scrollLeft,
          bodyElem.scrollLeft + scroll,
          500,
          function () {
            prevButton.classList.remove('disabled');
            if (
              1 * bodyElem.scrollLeft >=
              1 * itemsWidth - 1 * bodyElem.clientWidth
            ) {
              nextButton.classList.add('disabled');
              wrapperElem.classList.add('finish');
            }
          }
        );
      });

      //prev button
      prevButton.addEventListener('click', function (e) {
        e.preventDefault();
        var scroll = bodyElem.clientWidth / 2;
        wrapperElem.classList.remove('finish');
        animateScroll(
          bodyElem,
          bodyElem.scrollLeft,
          bodyElem.scrollLeft - scroll,
          500,
          function () {
            nextButton.classList.remove('disabled');
            if (1 * bodyElem.scrollLeft <= 0) {
              prevButton.classList.add('disabled');
              wrapperElem.classList.add('start');
            }
          }
        );
      });
    });
  }

  function animateScroll(elem, start, end, time, callback) {
    var dif = Math.round(end - start);
    if (dif === 0) return;

    var step = Math.round(dif / (time / 10));
    var counter = 0;

    clearInterval(intervalId);

    intervalId = setInterval(function () {
      elem.scrollLeft = start + step * ++counter;

      if (
        (step > 0 && start + step * counter > end) ||
        (step < 0 && start + step * counter < end)
      ) {
        elem.scrollLeft = end;
        clearInterval(intervalId);
        callback();
        return;
      }
    }, 10);
  }
});
