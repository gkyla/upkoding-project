import { handlePaginationControl } from './utilities.js';

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
  handlePaginationControl(arr);
}

export function renderOption(arr) {
  inputNumber.innerHTML = '';

  let i = 1;
  while (i <= arr.total) {
    inputNumber.innerHTML += `<option value="${i}" class="input-option">${i}</option>`;
    i++;
  }
  const option = document.querySelectorAll('.input-option');
  option[arr.per_page - 1].selected = true;
}

export function renderUser(arr) {
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

export function renderEmpty() {
  box.innerHTML = `
  Sorry no data found 😭
  <br> 
  Seems like the query you given is not available 
  <br>
  or the server is on a problem
  `;
  box.classList.add('empty');
}

export function mainRenderPage(userData) {
  renderUser(userData);
  renderPagination(userData);
  renderOption(userData);

  /* 
    Since the API doesnt throw error an error if the query is not valid 
    then we are just going to check if data is empty 
  */
  if (userData.data.length === 0) {
    renderEmpty(userData);
  }
}
