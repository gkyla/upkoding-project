import { renderUser } from './template.js';

export function generateAPIURL(per_page, page) {
  return `https://reqres.in/api/users/?per_page=${per_page}&page=${page} `;
}

export async function getUserData(url, userData) {
  try {
    const res = await fetch(url);
    const payload = await res.json();
    const addUser = payload.data.map((user) => {
      return {
        ...user,
        username: `@${user.first_name.toLowerCase()}_${user.id}`,
      };
    });

    userData = payload;

    // Replace the data with the modified user
    userData.data = addUser;

    return userData;
  } catch (error) {
    console.error(error);
  }
}

export async function getDataRelocateURL(arr, func) {
  const generate = generateAPIURL(arr.per_page, arr.page);
  const splittedUrl = generate.split('/');
  const params = splittedUrl[splittedUrl.length - 1];

  // Push URL & replace without Refreshing with history API
  history.pushState({ search: params }, null, params);
  const data = await getUserData(generate);
  renderUser(data);

  if (func) {
    func(data);
  }

  return data;
}

export function handlePagination(arr) {
  const paginationNumber = document.querySelectorAll('.pagination-number');

  paginationNumber.forEach((el) => {
    el.addEventListener('click', async function () {
      arr.page = parseInt(el.dataset.urlpage);
      await getDataRelocateURL(arr);

      paginationNumber.forEach((item) => {
        if (item.classList.contains('pagination-active')) {
          item.classList.remove('pagination-active');
        }

        if (parseInt(item.dataset.urlpage) === arr.page) {
          item.classList.add('pagination-active');
        }
      });
    });
  });
}
