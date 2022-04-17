import users from './users';
import studentTpl from '../templates/student.hbs';
import Glide from '@glidejs/glide';

const slide = document.querySelector('.glide__slides');
const userMarkup = renderUserCard(users);

const options = {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  // autoplay: 1500,
  keyboard: true,
};

function renderUserCard(users) {
  const markup = studentTpl(users);
  // console.log('~ markup', markup);
  slide.insertAdjacentHTML('beforeend', markup);
}

const glideFooter = new Glide('.glide', options);
glideFooter.mount();

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
