window.addEventListener('load', () => {
  class Switcher {
    constructor(elem) {
      this.elem = elem;
      this.items = this.elem.querySelectorAll('.b-switcher__item');
      this.underline = this.elem.querySelector('.b-switcher__underline');
    }

    setActiveItem(elem) {
      //remove active
      this.items.forEach((item) => item.classList.remove('active'));
      //set active
      elem.classList.add('active');
      //move underline
      this.moveUnderline(elem);
    }

    moveUnderline(item) {
      this.underline.style.width = item.offsetWidth + 'px';
      this.underline.style.left =
        item.getBoundingClientRect().left -
        this.elem.getBoundingClientRect().left +
        'px';
    }
  }

  class Tabs {
    constructor(elem) {
      this.elem = elem;
      this.tabs = this.elem.querySelectorAll('.b-search-result__results');
      this.tabs.forEach((tab) => {
        this[tab.getAttribute('data-tab')] = tab;
      });
      this.elem.addEventListener('click', this.clickMore);
    }

    clickMore(e) {
      e.preventDefault();
      if (e.target.classList.contains('b-search-result__more')) {
        const moreBtn = e.target;
        moreBtn.parentNode.classList.add('i-preload');
        fetchMoreData(moreBtn);
      }

      async function fetchMoreData(moreBtn) {
        const tabs = moreBtn.closest('.b-search-result__results-tabs');
        tabs.classList.remove('i-ph-animated');
        try {
          const response = await fetch(moreBtn.getAttribute('href'));
          const result = await response.text();
          const div = document.createElement('div');
          const resultsElem = moreBtn.closest('.b-search-result__results');
          div.innerHTML = result;
          const resultBlock = div.querySelector(
            '.b-search-result__result-block'
          );
          moreBtn.parentNode.remove();
          resultsElem.append(resultBlock);
          resultBlock.querySelectorAll('a[ data-original ]').forEach((a) => {
            $(a).lazyload();
          });

          $(resultBlock).slideDown();

          //set address parameter PAGEN
          url.setURL(undefined, resultBlock.getAttribute('data-page'));
          //show
          tabs.classList.add('i-ph-animated');
          //scroll to
          setTimeout(() => {
            window.scrollTo({
              top: resultBlock.getBoundingClientRect().top + window.scrollY,
              behavior: 'smooth',
            });
          }, 500);
        } catch (err) {
          throw err;
        }
      }
    }

    setActiveTab(tabName) {
      //remove active
      this.tabs.forEach((tab) => tab.classList.remove('active'));
      //set active
      let activeTab = this[tabName];
      activeTab.classList.add('active');
    }

    async fetchData(tabName) {
      this.elem.classList.remove('i-ph-animated');
      try {
        const response = await fetch(
          '/components/search.result/result.html?page=3'
        );
        const result = await response.text();
        this[tabName].innerHTML = result;
        this[tabName].querySelectorAll('a[ data-original ]').forEach((a) => {
          $(a).lazyload();
        });
        this.elem.classList.add('i-ph-animated');
      } catch (err) {
        throw err;
      }
    }
  }

  class URL {
    constructor() {
      this.firstQuery = this.parseQuery(window.location.search);
    }

    setURL(type, page) {
      const queryObject = {};
      queryObject.type = type
        ? type
        : this.parseQuery(window.location.search).type;
      if (page) {
        queryObject.PAGEN_1 = page;
      }
      window.history.replaceState({}, '', this.getQuery(queryObject));
    }

    parseQuery(queryString) {
      var query = {};
      var pairs = (queryString[0] === '?'
        ? queryString.substr(1)
        : queryString
      ).split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
      }
      return query;
    }

    getQuery(queryObject) {
      var result = [];
      for (var k in queryObject) {
        result.push(k + '=' + queryObject[k]);
      }
      return '?' + result.join('&');
    }
  }

  const url = new URL();

  document.querySelectorAll('.b-search-result').forEach((searchResultBlock) => {
    const switcher = new Switcher(
      searchResultBlock.querySelector('.b-switcher')
    );
    const tabs = new Tabs(
      searchResultBlock.querySelector('.b-search-result__results-tabs')
    );

    //set first active
    if (url.firstQuery.type) {
      switcher.setActiveItem(
        Array.from(switcher.items).find(
          (item) => item.getAttribute('data-tab') === url.firstQuery.type
        )
      );
      tabs.setActiveTab(url.firstQuery.type);
      if (url.firstQuery.page) {
      }
    } else {
      switcher.setActiveItem(switcher.items[0]);
      tabs.setActiveTab(switcher.items[0].getAttribute('data-tab'));
    }

    //click
    switcher.items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tabName = item.getAttribute('data-tab');
        //set active
        switcher.setActiveItem(item);
        //show tab
        tabs.setActiveTab(tabName);
        //fetch data
        tabs.fetchData(tabName);

        //set url
        url.setURL(tabName);
      });
    });
  });
});
