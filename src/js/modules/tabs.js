const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);
  // active = document.querySelector(activeClass);

  /* --------------------- hiding the content of all tabs --------------------- */

  function hideTabContent() {
    content.forEach(item => {
      item.style.display = "none";
    });

    tab.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  /* ----- showing the content of the specific tab (first one by default) ----- */

  function showTabContent(i = 0) {
    content[i].style.display = "block";
    tab[i].classList.add(activeClass);
  }

  /* -------------------------- calling the functions ------------------------- */

  hideTabContent();
  showTabContent();

  /* ------------ apllying the events delegation on the tabs header ----------- */

  header.addEventListener('click', (e) => {
    const target = e.target;
    if (target &&
      (target.classList.contains(tabSelector.replace(/\./, '')) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};


export default tabs;