import users from './users';
import studentTpl from '../templates/student.hbs';

const slide = document.querySelector('.swiper-wrapper');
const userMarkup = renderUserCard(users);

function renderUserCard(users) {
  const marcup = studentTpl(users);
  // console.log('~ marcup', marcup);
  slide.insertAdjacentHTML('beforeend', marcup);
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
