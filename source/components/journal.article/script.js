(function ($) {
  'use strict';

  $(function () {
    $('.b-article').addtocopy({
      htmlcopytxt:
        '<br>Подробнее: <a href="' +
        window.location.href +
        '">' +
        window.location.href +
        '</a>',
      minlen: 50,
      addcopyfirst: false,
    });

    //replace data-reclist with placeholder
    document.querySelectorAll('[data-reclist]').forEach(function (elem) {
      const reclistWrapper = document.createElement('div');
      reclistWrapper.classList.add('b-article-reclist-wrapper');
      //show placeholder
      const placeholder = document.createElement('div');
      placeholder.classList.add('b-ph-reclist');
      placeholder.innerHTML = `
      <div class="b-ph__recipe">
        <div class="b-ph__img"></div>
        <div class="b-ph__text">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="b-ph__recipe">
        <div class="b-ph__img"></div>
        <div class="b-ph__text">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="b-ph__recipe">
        <div class="b-ph__img"></div>
        <div class="b-ph__text">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="b-ph__recipe">
        <div class="b-ph__img"></div>
        <div class="b-ph__text">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="b-ph__recipe">
        <div class="b-ph__img"></div>
        <div class="b-ph__text">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="b-ph__recipe">
        <div class="b-ph__img"></div>
        <div class="b-ph__text">
          <div></div>
          <div></div>
        </div>
      </div>
    `;
      reclistWrapper.appendChild(placeholder);
      elem.after(reclistWrapper);
      elem.remove();
      reclistWrapper.style.height = reclistWrapper.clientHeight + 'px';

      //fetch data
      const reclistNumber = elem.getAttribute('data-reclist');
      (async () => {
        const response = await fetch(
          `${window.reclistUrl}?reclist=${reclistNumber}`
        );
        const result = await response.text();
        const recipes = document.createElement('div');
        recipes.classList.add('b-article-recipes');
        recipes.innerHTML = result;
        placeholder.after(recipes);

        //insert html
        setTimeout(() => {
          reclistWrapper.style.height = recipes.clientHeight + 'px';
          reclistWrapper.classList.add('i-loaded');
          setTimeout(() => {
            placeholder.remove();
          }, 500);
          //lazyload
          $(recipes).find('[data-original]').lazyload();
        }, 100);
      })();
    });

    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
})(jQuery);
