import { users, usersUA } from './users';
// import renderUserCard from './render_footer_modal';
import Glide from '@glidejs/glide';
import studentTpl from '../templates/student.hbs';

const slide = document.querySelector('.glide__slides');

const refs = {
  openModalLink: document.querySelector('[data-footer-open]'),
  closeModalBtn: document.querySelector('[data-footer-close]'),
  modal: document.querySelector('[data-modal-footer]'),
  backdrop: document.querySelector('.js-backdrop'),
  addBodyClass: document.querySelector('body'),
  btnEng: document.querySelector('.btn-en'),
  btnUkr: document.querySelector('.btn-ua'),
};

refs.openModalLink.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onClickEscape(event) {
  if (event.key === 'Escape') {
    console.log(event.key);
    refs.modal.classList.add('is-hidden');
    refs.addBodyClass.classList.remove('modal-open');
    document.removeEventListener('keydown', onClickEscape);
  }
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  refs.addBodyClass.classList.remove('modal-open');
  document.removeEventListener('keydown', onClickEscape);
  // modal.innerHTML = '';
}

function renderUserCard(users) {
  const markup = studentTpl(users);
  // console.log('~ markup', markup);
  slide.insertAdjacentHTML('beforeend', markup);
}

const renderUserCardEn = renderUserCard(users);
const renderUserCardUa = renderUserCard(usersUA);

function openModal() {
  refs.modal.classList.remove('is-hidden');
  refs.addBodyClass.classList.add('modal-open');
  document.addEventListener('keydown', onClickEscape);
  if (refs.btnEng.classList.contains('active-select')) {
    const renderUserCardEn = renderUserCard(users);
    renderUserCard(users);
  } else {
    renderUserCard(usersUA);
  }
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}

const options = {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  // autoplay: 1500,
  keyboard: true,
};

const glideFooter = new Glide('.glide', options);
glideFooter.mount();
