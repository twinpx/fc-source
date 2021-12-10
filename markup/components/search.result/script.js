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
      try {
        const response = await fetch(
          '/components/search.result/result.html?page=3'
        );
        const result = await response.text();
        this[tabName].innerHTML = result;
      } catch (err) {
        throw err;
      }
    }
  }

  document.querySelectorAll('.b-search-result').forEach((searchResultBlock) => {
    const switcherElem = searchResultBlock.querySelector('.b-switcher');
    const switcher = new Switcher(switcherElem);
    const tabsElem = searchResultBlock.querySelector(
      '.b-search-result__results-tabs'
    );
    const tabs = new Tabs(tabsElem);
    switcher.items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        switcher.setActiveItem(item);
        //show tab
        tabs.setActiveTab(item.getAttribute('data-tab'));
        //fetch data
        tabs.fetchData(item.getAttribute('data-tab'));
      });
    });
    switcher.items[0].click();
  });
});
