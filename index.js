const showPopup = () => {
  document.body.style.overflow = 'hidden';
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  const wrapperMain = document.getElementsByClassName('main-wrapper')[0];
  wrapperMain.appendChild(wrapper);

  const container = document.getElementsByClassName('popup')[0];
  container.style.display = '';

  const wScreen = (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
  const hScreen = (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );

  container.style.top = `${(hScreen / 2) - (container.offsetHeight / 2)}px`;
  container.style.left = `${(wScreen / 2) - (container.offsetWidth / 2)}px`;

  const hidePopup = () => {
    container.style.display = 'none';
    wrapper.remove();
    document.body.style.overflow = '';
    closeButton.removeEventListener('click', hidePopup);
  };

  const closeButton = document.getElementById('close-button');
  closeButton.addEventListener('click', hidePopup);
};

const getCoords = (elem) => {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    right: box.right + pageXOffset,
    bottom: box.bottom + pageYOffset,
  };
};
const smoothHide = (elem) => {
  elem.style.opacity = '0';
  const timer1 = setTimeout(() => {
    elem.style.display = 'none';
  }, 250);
};
const smoothShow = (elem) => {
  elem.style.opacity = '1';
  const timer2 = setTimeout(() => {
    elem.style.display = '';
  }, 250);
};

const sidebarElem = document.getElementsByClassName('sidebar')[0];
const sidebarContentElem = document.getElementsByClassName('sidebar-content')[0];
let checkPoint = null;

const hideSidebar = () => {
 const scrolled = window.pageYOffset || document.documentElement.scrollTop;
 const contentBottom = getCoords(sidebarContentElem).bottom;
 console.log(scrolled, checkPoint);

 if ((checkPoint !== null) && (scrolled < checkPoint)) {
   checkPoint = null;
   smoothShow(sidebarElem);
   return;
 }

 if ((checkPoint === null) && (scrolled >= contentBottom)) {
   checkPoint = contentBottom;
   smoothHide(sidebarElem);
   return;
 }
};

const signButton = document.getElementById('sign-button');

document.addEventListener('scroll', hideSidebar);
signButton.addEventListener('click', showPopup);
