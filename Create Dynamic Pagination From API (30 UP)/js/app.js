const DEFAULT_API_URL = 'https://reqres.in/api/users/';
const inputNumber = document.querySelector('#numberOption');

let userData = [];
let perPage = null;
let page = null;
let tempPage = null;

const paginationItemBox = document.querySelector('.pagination-item-box');
const paginationOption = document.querySelectorAll('.pagination-option');
const box = document.querySelector('.box');

function generateAPIURL(per_page, page) {
  return `https://reqres.in/api/users/?per_page=${per_page}&page=${page} `;
}

async function getUserData(url) {
  console.log(url);
  try {
    const res = await fetch(url);
    const payload = await res.json();
    const addUser = payload.data.map((user) => {
      return {
        ...user,
        username: `@${user.first_name.toLowerCase()}_${user.id}`,
      };
    });
    const pageAvailable = [];
    for (let i = 1; i <= payload.total_pages; i++) {
      pageAvailable.push(i);
    }

    userData = payload;
    userData.pageAvailable = pageAvailable;

    // Replace the data with the modified user
    userData.data = addUser;
  } catch (error) {
    console.error(error);
  }
}

if (window.location.search) {
  console.log('keganti');
  const params = window.location.search;
  const search = new URLSearchParams(params);

  if (params.includes('page')) {
    page = search.get('page');
  }

  if (params.includes('per_page')) {
    perPage = search.get('per_page');
  }

  getUserData(generateAPIURL(perPage, page))
    .then(() => {
      // Render
      renderUser(userData);
      renderPagination(userData);
    })
    .catch((err) => err);
} else {
  getUserData(DEFAULT_API_URL)
    .then(() => {
      page = userData.page;
      perPage = userData.per_page;

      // Render
      renderUser(userData);
      renderPagination(userData);
    })
    .catch((err) => err);
}

function renderEmpty() {
  box.innerHTML = `Sorry no data found 😭`;
  box.classList.add('empty');
}

function renderPagination(arr) {
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

  tempPage = userData.pageAvailable;

  handlePagination();
}

paginationOption.forEach((option) => {
  option.addEventListener('click', async () => {
    if (option.classList.contains('pagination-next')) {
      if (page !== userData.total_pages) {
        page = userData.page + 1;
      }
    }

    if (option.classList.contains('pagination-prev')) {
      if (page !== 1) {
        page = userData.page - 1;
      }
    }
    const paginationNumber = document.querySelectorAll('.pagination-number');
    paginationNumber.forEach((item) => {
      if (item.classList.contains('pagination-active')) {
        item.classList.remove('pagination-active');
      }

      if (parseInt(item.dataset.urlpage) === page) {
        item.classList.add('pagination-active');
      }
    });

    const generate = generateAPIURL(perPage, page);
    const splittedUrl = generate.split('/');
    const params = splittedUrl[splittedUrl.length - 1];

    history.pushState({ search: params }, null, params);
    await getUserData(generate);
    renderUser(userData);
  });
});

function handlePagination() {
  const paginationNumber = document.querySelectorAll('.pagination-number');

  paginationNumber.forEach((el) => {
    el.addEventListener('click', async function () {
      page = el.dataset.urlpage;
      const generate = generateAPIURL(perPage, page);
      const splittedUrl = generate.split('/');
      const params = splittedUrl[splittedUrl.length - 1];

      history.pushState({ search: params }, null, params);
      await getUserData(generate);
      renderUser(userData);

      paginationNumber.forEach((item) => {
        if (item.classList.contains('pagination-active')) {
          item.classList.remove('pagination-active');
        }

        if (parseInt(item.dataset.urlpage) === page) {
          item.classList.add('pagination-active');
        }
      });
    });
  });
}

function renderUser(arr) {
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
  console.log('page :', page);
  console.log('total_pages:', userData.total_pages);

  if (page > userData.total_pages) {
    page = userData.total_pages;
  } else {
    page = arr.page;
  }
}

inputNumber.addEventListener('change', async function () {
  /* 
    current Problem = page variable not updated 
    // total 12
    // 12 / perPage ( 12/ 1) - (12/3 ) 

    if (userData.total_pages < perPage) {
      page = 1;
    }
  */
  try {
    perPage = this.value;
    const generate = generateAPIURL(perPage, page);
    const splittedUrl = generate.split('/');
    const params = splittedUrl[splittedUrl.length - 1];
    console.log(generate);
    history.pushState({ search: params }, null, params);
    await getUserData(generate);
    renderUser(userData);
    renderPagination(userData);

    console.log(userData.total_pages);
    if (userData.total_pages < userData.total) {
      const generate = generateAPIURL(perPage, page);
      const splittedUrl = generate.split('/');
      const params = splittedUrl[splittedUrl.length - 1];
      console.log(generate);

      history.pushState({ search: params }, null, params);
      await getUserData(generate);
      renderUser(userData);
      renderPagination(userData);

      console.log(page);
    }

    // if (userData.total / perPage > userData.total_pages) {
    //   page = 1;
    // }
  } catch (error) {
    console.log(error);
  }
});

function getDataRelocateURL() {}
