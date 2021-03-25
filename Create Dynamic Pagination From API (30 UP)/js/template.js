import { handlePagination } from './utilities.js';

const paginationItemBox = document.querySelector('.pagination-item-box');
const inputNumber = document.querySelector('#numberOption');
const box = document.querySelector('.box');

export function renderPagination(arr) {
  paginationItemBox.innerHTML = '';

  let i = 1;
  while (i <= arr.total_pages) {
    if (i !== arr.page) {
      paginationItemBox.innerHTML += `
              <button class="pagination-item pagination-number" data-urlpage="${i}">${i}</button>
          `;
    } else {
      paginationItemBox.innerHTML += `
              <button class="pagination-item pagination-number pagination-active" data-urlpage="${i}">${i}</button>
          `;
    }

    i++;
  }
  // handle for number pagination
  handlePagination(arr);
}

export function renderUser(arr) {
  inputNumber.value = arr.per_page;
  inputNumber.max = arr.total;
  inputNumber.min = 1;

  box.classList.remove('empty');
  box.innerHTML = '';

  arr.data.forEach((user) => {
    box.innerHTML += `
          <div class="card">
            <div class="img-section">
                <img src="${user.avatar}" alt="${user.first_name} Profile picture" />
            </div>
            <div class="info-section">
                <span class="username">${user.username}</span>
                <h1 class="title">${user.first_name} ${user.last_name}</h1>
                <p class="email">${user.email}</p>
            </div>
           </div>
          `;
  });

  if (arr.page > arr.total_pages) {
    arr.page = arr.total_pages;
  } else {
    arr.page = arr.page;
  }
}
