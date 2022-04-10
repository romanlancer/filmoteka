import { createElement } from './createElement';

export function eventListenerChangeHandler (handlerFunction) {
  document.querySelector('.pagination-list').replaceWith(document.querySelector('.pagination-list').cloneNode(true));
  document.querySelector('.pagination-list').addEventListener('click', handlerFunction);
}
export default class Pagination {
  #currentPage = 1;

  constructor({ initialPage = 1, total = 1, onChange }) {
    this.#currentPage = initialPage;
    this.total = total;
    this.onChange = onChange;
    this.paginationList = [];

    // this.parentElement.addEventListener('click', event => {
    //   console.log(this);
    //   if (
    //     event.target.parentNode.classList.contains('pagination-prev') ||
    //     event.target.classList.contains('pagination-prev')
    //   ) {
    //     this.prevPage();
    //   }
    //   if (
    //     event.target.parentNode.classList.contains('pagination-next') ||
    //     event.target.classList.contains('pagination-next')
    //   ) {
    //     this.nextPage();
    //   }
    //   if (
    //     event.target.parentNode.classList.contains('pagination-number') &&
    //     !event.target.parentNode.classList.contains('active')
    //   ) {
    //     const clickPage = parseInt(event.target.textContent);
    //     this.currentPage = clickPage;
    //   }
    //   if (
    //     event.target.classList.contains('pagination-number') &&
    //     !event.target.classList.contains('active')
    //   ) {
    //     const clickPage = parseInt(event.target.childNodes[0].textContent);
    //     this.currentPage = clickPage;
    //   }
    // });
  }

  get currentPage() {
    return this.#currentPage;
  }

  set currentPage(value) {
    this.#currentPage = value;

    if (this.onChange) {
      this.onChange(value);
    }
  }

  nextPage() {
    if (this.currentPage === this.total) {
      return;
    }

    this.currentPage += 1;
  }

  prevPage() {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage -= 1;
  }

  createPaginationList() {
    let beforePage = this.currentPage - 2;
    let afterPage = this.currentPage + 2;

    this.paginationList = [];
    const prevArrow = createElement(
      'li',
      {
        class: `${this.currentPage === 1 ?
          'pagination-item pagination-button pagination-prev disabled' :
          'pagination-item pagination-button pagination-prev'}`
          
      },
      createElement('span', {}, ''),
    );
    this.paginationList.push(prevArrow);

    if (this.currentPage === 1) {
      const firstElem = createElement(
        'li',
        { class: 'pagination-item pagination-number active' },
        createElement('span', {}, '1'),
      );
      this.paginationList.push(firstElem);
    } else {
      const firstElem = createElement(
        'li',
        { class: 'pagination-item pagination-number' },
        createElement('span', {}, '1'),
      );
      this.paginationList.push(firstElem);
    }

    if (this.currentPage > 4) {
      const startDots = createElement(
        'li',
        { class: 'pagination-item pagination-dots' },
        createElement('span', {}, '...'),
      );
      this.paginationList[1].classList.add('first-num');
      this.paginationList.push(startDots);
    }
    if (this.currentPage === 1) {
      afterPage = this.currentPage + 4;
    }
    if (this.currentPage === 2) {
      afterPage = this.currentPage + 3;
    }
    if (this.currentPage === this.total) {
      beforePage = this.currentPage - 4;
    }
    if (this.currentPage === this.total - 1) {
      beforePage = this.currentPage - 3;
    }

    if (beforePage < 2) {
      beforePage = 2;
    }
    if (afterPage >= this.total) {
      afterPage = this.total - 1;
    }
    console.log(beforePage);
    for (let pageNumber = beforePage; pageNumber <= afterPage; pageNumber++) {
      if (pageNumber === this.currentPage) {
        const item = createElement(
          'li',
          { class: 'pagination-item pagination-number active' },
          createElement('span', {}, `${pageNumber}`),
        );
        this.paginationList.push(item);
      } else {
        const item = createElement(
          'li',
          { class: 'pagination-item pagination-number' },
          createElement('span', {}, `${pageNumber}`),
        );
        this.paginationList.push(item);
      }
    }

    if (this.currentPage < this.total - 3) {
      const endDots = createElement(
        'li',
        { class: 'pagination-item pagination-dots' },
        createElement('span', {}, '...'),
      );
      this.paginationList.push(endDots);
    }
if(this.total > 1){
    if (this.currentPage === this.total) {
      const lastElem = createElement(
        'li',
        {
          class: `${this.currentPage < this.total - 3
              ? 'pagination-item pagination-number active last-num'
              : 'pagination-item pagination-number active'
            }`,
        },
        createElement('span', {}, `${this.total}`),
      );
      this.paginationList.push(lastElem);
    } else {
      const lastElem = createElement(
        'li',
        {
          class: `${this.currentPage < this.total - 3
              ? 'pagination-item pagination-number last-num'
              : 'pagination-item pagination-number'
            }`,
        },
        createElement('span', {}, `${this.total}`),
      );
      this.paginationList.push(lastElem);
    }
  }
    const nextArrow = createElement(
      'li',
      {
        class: `${this.currentPage === this.total ? 
          'pagination-item pagination-button pagination-next disabled' : 
          'pagination-item pagination-button pagination-next'}`
      },
      createElement('span', {}, ''),
    );
    this.paginationList.push(nextArrow);
    return this.paginationList;
  }
  renderPagination(parentElement, totalPages) {
    totalPages > 500 ? (this.total = 500) : (this.total = totalPages);

    const paginationElem = this.createPaginationList();
    parentElement.innerHTML = '';
    parentElement.append(...paginationElem);
  }
}
