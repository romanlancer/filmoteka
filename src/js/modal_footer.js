const refs = {
  openModalLink: document.querySelector('[data-footer-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal-footer]'),
};

function onClickEscape(event) {
  if (event.key === 'Escape') {
    console.log(event.key);
    refs.modal.classList.add('is-hidden');
    document.removeEventListener('keydown', onClickEscape);
  }
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  document.removeEventListener('keydown', onClickEscape);
  // modal.innerHTML = '';
}

function openModal() {
  refs.modal.classList.remove('is-hidden');
  document.addEventListener('keydown', onClickEscape);
}

refs.openModalLink.addEventListener('click', openModal);
