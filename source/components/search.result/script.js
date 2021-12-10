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
        this.elem.classList.add('i-ph-animated');
      } catch (err) {
        throw err;
      }
    }

    isEmpty(tabName) {
      return !this[tabName].querySelectorAll('div').length;
    }
  }

  class URL {
    constructor() {}

    setURL(type, page) {
      const queryObject = { type };
      if (page) {
        queryObject.page = page;
      }
      window.history.replaceState({}, '', this.getQuery(queryObject));
    }

    getQuery(queryObject) {
      var result = [];
      for (var k in queryObject) {
        result.push(k + '=' + queryObject[k]);
      }
      return '?' + result.join('&');
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
  }

  document.querySelectorAll('.b-search-result').forEach((searchResultBlock) => {
    const switcherElem = searchResultBlock.querySelector('.b-switcher');
    const switcher = new Switcher(switcherElem);
    const tabsElem = searchResultBlock.querySelector(
      '.b-search-result__results-tabs'
    );
    const tabs = new Tabs(tabsElem);
    const url = new URL();
    switcher.items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tabName = item.getAttribute('data-tab');
        switcher.setActiveItem(item);
        //show tab
        tabs.setActiveTab(tabName);
        //fetch data
        if (tabs.isEmpty(tabName)) {
          tabs.fetchData(tabName);
        } else {
          tabs.reduce(tabName);
        }

        //set url
        url.setURL(tabName);
      });
    });
    switcher.items[0].click();
  });
});
