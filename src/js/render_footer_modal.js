import { users, usersUA } from './users';
import Glide from '@glidejs/glide';
import { glideFooter, options } from './slider_glide';
import studentTpl from '../templates/student.hbs';
import { onClickEscape, closeModal } from './modal_footer';

const refs = {
  footerModal: document.querySelector('.footer-modal'),
  openModalLink: document.querySelector('[data-footer-open]'),
  modal: document.querySelector('[data-modal-footer]'),
  backdrop: document.querySelector('.js-backdrop'),
  addBodyClass: document.querySelector('body'),
  btnEng: document.querySelector('.btn-en'),
  btnUkr: document.querySelector('.btn-ua'),
};

export function openModal() {
  refs.modal.classList.remove('is-hidden');
  refs.addBodyClass.classList.add('modal-open');
  document.addEventListener('keydown', onClickEscape);
  refs.footerModal.innerHTML = '';

  const markup = `
  <div class="glide_footer">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides--footer"></ul>
      </div>
      <div class="glide__arrows" data-glide-el="controls">
            <button style="padding: 10px;
      box-shadow: none;
      border: none; left: 10px" class="glide__arrow glide__arrow--left arrow__footer" data-glide-dir="<">&#5130;</button>
            <button style="padding: 10px;
      box-shadow: none;
      border: none; right: 10px" class="glide__arrow glide__arrow--right arrow__footer" data-glide-dir=">">&#5125;</button>
        </div>
        <button class="footermodalbtn-close" data-footer-close>	
&#9587;</button>
    </div>
    `;

  refs.footerModal.insertAdjacentHTML('beforeend', markup);

  const slide = document.querySelector('.glide__slides--footer');
  const closeModalBtn = document.querySelector('[data-footer-close]');

  if (refs.btnEng.classList.contains('active-select')) {
    slide.insertAdjacentHTML('beforeend', studentTpl(users));
  } else if (refs.btnUkr.classList.contains('active-select')) {
    slide.insertAdjacentHTML('beforeend', studentTpl(usersUA));
  }

  glideFooter.destroy();
  let glidFooter = new Glide('.glide_footer', options);
  glidFooter.mount();

  closeModalBtn.addEventListener('click', closeModal);
}
