const refs = {
  openModalLink: document.querySelector('[data-footer-open]'),
  closeModalBtn: document.querySelector('[data-footer-close]'),
  modal: document.querySelector('[data-modal-footer]'),
  backdrop: document.querySelector('.js-backdrop'),
  addBodyClass: document.querySelector('body'),
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

function openModal() {
  refs.modal.classList.remove('is-hidden');
  refs.addBodyClass.classList.add('modal-open');
  document.addEventListener('keydown', onClickEscape);
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}
