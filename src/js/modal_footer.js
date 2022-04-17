import { openModal } from './render_footer_modal';

const refs = {
  footerModal: document.querySelector('.footer-modal'),
  openModalLink: document.querySelector('[data-footer-open]'),
  modal: document.querySelector('[data-modal-footer]'),
  backdrop: document.querySelector('.js-backdrop'),
  addBodyClass: document.querySelector('body'),
  btnEng: document.querySelector('.btn-en'),
  btnUkr: document.querySelector('.btn-ua'),
};

refs.openModalLink.addEventListener('click', openModal);
refs.backdrop.addEventListener('click', onBackdropClick);

export function onClickEscape(event) {
  if (event.key === 'Escape') {
    console.log(event.key);
    refs.modal.classList.add('is-hidden');
    refs.addBodyClass.classList.remove('modal-open');
    document.removeEventListener('keydown', onClickEscape);
  }
}

export function closeModal() {
  refs.modal.classList.add('is-hidden');
  refs.addBodyClass.classList.remove('modal-open');
  document.removeEventListener('keydown', onClickEscape);
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}
