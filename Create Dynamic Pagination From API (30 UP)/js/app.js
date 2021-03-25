import { renderPagination, renderUser } from './template.js';
import {
  getDataRelocateURL,
  generateAPIURL,
  getUserData,
} from './utilities.js';

const DEFAULT_API_URL = 'https://reqres.in/api/users/?per_page=2&page=1';
const inputNumber = document.querySelector('#numberOption');

let userData = [];
const paginationOption = document.querySelectorAll('.pagination-option');

/* 
  If the user has a "search params" (e.g /?per_page=2&page=1) in the URL,
  the user can get the result based on the search params query
*/

// check if the user has some query
if (window.location.search) {
  const params = window.location.search;
  const search = new URLSearchParams(params);

  if (params.includes('page')) {
    userData.page = parseInt(search.get('page'));
  }

  if (params.includes('per_page')) {
    userData.per_page = parseInt(search.get('per_page'));
  }

  getUserData(generateAPIURL(userData.per_page, userData.page), userData)
    .then((data) => {
      userData = data;
      renderUser(userData);
      renderPagination(userData);
    })
    .catch((err) => err);
} else {
  /* If the user doesnt have some query, then
    fetch the API with default link variable declaration (DEFAULT_API_URL)
  */

  getUserData(DEFAULT_API_URL, userData)
    .then((data) => {
      userData = data;
      renderUser(userData);
      renderPagination(userData);
    })
    .catch((err) => err);
}

paginationOption.forEach((option) => {
  option.addEventListener('click', async () => {
    if (option.classList.contains('pagination-next')) {
      if (userData.page !== userData.total_pages) {
        userData.page = userData.page + 1;
      }
    }

    if (option.classList.contains('pagination-prev')) {
      if (userData.page !== 1) {
        userData.page = userData.page - 1;
      }
    }
    const paginationNumber = document.querySelectorAll('.pagination-number');
    paginationNumber.forEach((item) => {
      if (item.classList.contains('pagination-active')) {
        item.classList.remove('pagination-active');
      }

      if (parseInt(item.dataset.urlpage) === userData.page) {
        item.classList.add('pagination-active');
      }
    });

    await getDataRelocateURL(userData);
  });
});

inputNumber.addEventListener('change', async function () {
  try {
    userData.per_page = parseInt(this.value);

    const data = await getDataRelocateURL(userData, renderPagination);
    userData = data;

    if (userData.total_pages < userData.total) {
      await getDataRelocateURL(userData, renderPagination);
    }
  } catch (error) {
    console.log(error);
  }
});
