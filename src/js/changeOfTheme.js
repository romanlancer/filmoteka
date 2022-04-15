import { refs } from './refs';
import { addToStorage, getFromStorage } from './storage';

window.onload = autoTheme();
checkStorageOfTheme();

refs.changeOfTheme.addEventListener('change', onThemeSelected);

function onThemeSelected(event) {
  let themeCheck = event.target.value;

  if (themeCheck === 'dark') {
    addToStorage('theme', 'dark');
    darkTheme();
  } else if (themeCheck === 'light') {
    addToStorage('theme', 'light');
    lightTheme();
  } else {
    addToStorage('theme', 'auto');
    autoTheme();
  }
}

function darkTheme() {
  document.body.style.backgroundColor = '#2C2B2B';
  refs.footer.style.backgroundColor = '#000000';
  refs.sliderTitle.style.color = '#FFFFFF';
  refs.footerSupp.style.color = '#FFFFFF';
  refs.footerApp.style.color = '#FFFFFF';
  refs.footerJoin.style.color = '#FFFFFF';
  refs.footerEmail.style.color = '#FFFFFF';
  refs.footerCopy.style.color = '#FFFFFF';
  // зміни для модалки фільму
  refs.modalMovie.style.backgroundColor = '#2C2B2B';
  // refs.movieDataTitle.style.color = '#FFF';
  //   refs.movieDataValue.style.color = '#FFF';
  //   refs.movieDataAbout.style.color = '#FFF';
  //   refs.movieDataAboutTitle.style.color = '#FFF';
}

function lightTheme() {
  document.body.style.backgroundColor = '#FFFFFF';
  refs.sliderTitle.style.color = '#000000';
  refs.footer.style.backgroundColor = '#F7F7F7';
  refs.footerSupp.style.color = '#545454';
  refs.footerApp.style.color = '#545454';
  refs.footerJoin.style.color = '#545454';
  refs.footerEmail.style.color = '#545454';
  refs.footerCopy.style.color = '#545454';
  refs.modalMovie.style.backgroundColor = '#ffffff';

  // зміни для модалки фільму
  refs.modalMovie.style.backgroundColor = '#fff';
  // refs.movieDataTitle.style.color = '#000';
  // refs.movieDataValue.style.color = '#000';
  // refs.movieDataAbout.style.color = '#000';
  // refs.movieDataAboutTitle.style.color = '#000';
}

function autoTheme() {
  const date = new Date();
  const dateNow = date.getHours();

  if (dateNow >= 6 && dateNow <= 22) {
    lightTheme();
  } else {
    darkTheme();
  }
}

function checkStorageOfTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    darkTheme();
  } else if (localStorage.getItem('theme') === 'light') {
    lightTheme();
  } else {
    autoTheme();
  }
}

function checkThemeAutoAttribute() {
  if (refs.themeAuto.hasAttribute(selected)) {
    refs.themeAuto.removeAttribute(selected);
  } else {
    refs.themeAuto.setAttribute(selected, true);
  }
}

function checkThemeDarkAttribute() {
  if (refs.themeDark.hasAttribute(selected)) {
    refs.themeDark.removeAttribute(selected);
  } else {
    refs.themeDark.setAttribute(selected, true);
  }
}

function checkThemeLightAttribute() {
  if (refs.themeLight.hasAttribute(selected)) {
    refs.themeLight.removeAttribute(selected);
  } else {
    refs.themeLight.setAttribute(selected, true);
  }
}
