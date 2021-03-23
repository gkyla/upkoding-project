const API_URL = 'https://reqres.in/api/users/';
const input = document.querySelector('#search');
const box = document.querySelector('.box');
let userData = [];

async function getUserData() {
  try {
    const res = await fetch(API_URL);
    const payload = await res.json();

    userData = payload.data.map((user) => {
      return {
        ...user,
        username: `@${user.first_name.toLowerCase()}_${user.id}`,
      };
    });
  } catch (error) {
    console.error(error);
  }
}

function renderUser(arr) {
  box.classList.remove('empty');
  box.innerHTML = '';

  arr.forEach((user) => {
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
}

function renderEmpty() {
  box.innerHTML = `Sorry no data found 😭`;
  box.classList.add('empty');
}

input.addEventListener('input', function () {
  const filteredData = userData.filter((user) => {
    const lowered = this.value.toLowerCase();
    const currentUser = user;

    for (const val in currentUser) {
      /* 
         Prevent user to search the image by using https keyword on the input field 
         since this looping will look up through every property value (the user data contain image link)
         it will check the image link too.
      */
      if (
        typeof currentUser[val] === 'string' &&
        !currentUser[val].startsWith('https')
      ) {
        const lowerCaseVal = currentUser[val].toLowerCase();
        if (lowerCaseVal.includes(lowered)) {
          return true;
        }
      }
    }
  });

  if (filteredData.length > 0) {
    renderUser(filteredData);
  } else {
    renderEmpty();
  }
});

// Default will be disabled (because of data not being fetched yet)
input.setAttribute('disabled', true);

// Wait till the fetch process complete
getUserData().then(() => {
  // Remove the disabled attribute
  input.removeAttribute('disabled');

  renderUser(userData);
});
