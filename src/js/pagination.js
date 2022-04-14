import { createElement } from './createElement';
export default class Pagination {
  #currentPage = 1;

  constructor({ initialPage = 1, total = 1, onChange }) {
    this.#currentPage = initialPage;
    this.total = total;
    this.onChange = onChange;
    this.paginationList = [];
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
    if (this.currentPage >= this.total) {
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

  createPaginationList(currentPage) {
    let beforePage = currentPage - 2;
    let afterPage = currentPage + 2;

    this.paginationList = [];
    const prevArrow = createElement(
      'li',
      {
        class: `${currentPage === 1 ?
          'pagination-item pagination-button pagination-prev disabled' :
          'pagination-item pagination-button pagination-prev'}`
          
      },
      createElement('span', {}, ''),
    );
    this.paginationList.push(prevArrow);

    if (currentPage === 1) {
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

    if (currentPage > 4) {
      const startDots = createElement(
        'li',
        { class: 'pagination-item pagination-dots' },
        createElement('span', {}, '...'),
      );
      this.paginationList[1].classList.add('first-num');
      this.paginationList.push(startDots);
    }
    if (currentPage === 1) {
      afterPage = currentPage + 4;
    }
    if (currentPage === 2) {
      afterPage = currentPage + 3;
    }
    if (currentPage === this.total) {
      beforePage = currentPage - 4;
    }
    if (currentPage === this.total - 1) {
      beforePage = currentPage - 3;
    }

    if (beforePage < 2) {
      beforePage = 2;
    }
    if (afterPage >= this.total) {
      afterPage = this.total - 1;
    }

    for (let pageNumber = beforePage; pageNumber <= afterPage; pageNumber++) {
      if (pageNumber === currentPage) {
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

    if (currentPage < this.total - 3) {
      const endDots = createElement(
        'li',
        { class: 'pagination-item pagination-dots' },
        createElement('span', {}, '...'),
      );
      this.paginationList.push(endDots);
    }
if(this.total > 1){
    if (currentPage === this.total) {
      const lastElem = createElement(
        'li',
        {
          class: `${currentPage < this.total - 3
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
          class: `${currentPage < this.total - 3
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
        class: `${currentPage >= this.total ? 
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

    const paginationElem = this.createPaginationList(this.currentPage);
    parentElement.innerHTML = '';
    parentElement.append(...paginationElem);
  }

    renderPaginationDisabled(parentElement, totalPages, currentPage) {
    totalPages > 500 ? (this.total = 500) : (this.total = totalPages);

    const paginationElem = this.createPaginationList(currentPage);
    parentElement.innerHTML = '';
    parentElement.append(...paginationElem);
  }

  renderPaginationLoadMore(parentElement, currentPage, lang) {
   
    const loadMoreBtnRef = createElement(
        'button',
      { type: "button",
        class: `${currentPage >= this.total ? 
          'pagination-btn is-hidden' : 
          'pagination-btn'}` },
      `${lang === 'uk' ? 
        `Показати ще фільми` :
        `Show more films`
        }`,
    );
    if (this.total <= 1) {
      loadMoreBtnRef.classList.add('is-hidden')
    }
    if (document.querySelector('.pagination-btn')) {
      document.querySelector('.pagination-btn').remove();
    }
    parentElement.prepend(loadMoreBtnRef);
  }

}
