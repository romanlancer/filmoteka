import users from './users';
import studentTpl from '../templates/student.hbs';
import Glide from '@glidejs/glide';

const slide = document.querySelector('[data-footer-list]');
const userMarkup = renderUserCard(users);

function renderUserCard(users) {
  const marcup = studentTpl(users);
  // console.log('~ marcup', marcup);
  slide.insertAdjacentHTML('beforeend', marcup);
  new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    swipeThreshold: true,
  }).mount();
}

// function renderUserCard(data) {
//   return users
//     .map(({ name, role, img, discription }) => {
//       return `
//       <div class="swiper-slide ">
//         <img class="student-foto"
//           src=${img} alt=${name} />
//         <div class="student__card">
//           <h3 class="student__name">${name}</h3>
//           <p class="student__role">${role}</p>
//           <p class="student__about">
//             ${discription}
//           </p>
//         </div>
//       </div>`;
//     })
//     .join('');
// }

slide.insertAdjacentHTML('beforeend', userMarkup);
