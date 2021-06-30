"use strict";

// - Добавить кнопку << , т.е. переход на первую страницу.
// - Добавить информацию о юзере (возраст, имейл, ...).
// - Цвет рамки (фона) карточкам генерить в зависимости от пола юзера.
// - * Сдалать возможным выбирать несколько карточек, список полных имен выбранных юзеров приводить в строку сверху. Выбранные карточки подсвечивать.
// - Застилить карточки.

const options = {
  results: 10,
  seed: "abc",
  page: 1,
};

loadUsers(options);

const [btnStart, btnPrev, btnNext] = document.querySelectorAll("button");
btnStart.addEventListener("click", btnStartHandler);
btnPrev.addEventListener("click", btnPrevHandler);
btnNext.addEventListener("click", btnNextHandler);

function btnStartHandler(e) {
  options.page = 1;
  loadUsers(options);
}

function btnPrevHandler(e) {
  if (options.page >= 1) {
    options.page--;
    loadUsers(options);
  }
}

function btnNextHandler(e) {
  options.page++;
  loadUsers(options);
}

function userListItemHandler(e) {
  console.log(this.name);
}

function loadUsers({ results, seed, page }) {
  fetch(
    `https://randomuser.me/api/?results=${results}&seed=${seed}&page=${page}`
  )
    .then(response => response.json())
    .then(({ results }) => renderUsers(results));
}

function renderUsers(users) {
  const userList = document.querySelector(".userList");
  if (userList) {
    userList.remove();
  }

  console.dir(users);

  const newUserList = document.createElement("ul");
  newUserList.classList.add("userList");
  document.getElementById("root").prepend(newUserList);

  const liUserCollection = users.map(user => createUserListItem(user));
  newUserList.append(...liUserCollection);
}

function createUserListItem({
  name: { first: firstName, last: lastName },
  picture: { large: userImageSrc },
  gender: gender,
  dob: { age: age },
  email: email,
  cell: cell,
  location: { country: country },
}) {
  const userListItem = document.createElement("li");
  userListItem.classList.add("userListItem");

  if (gender === "female") {
    userListItem.classList.add("female");
  }

  userListItem.append(createUserImage(userImageSrc));
  userListItem.append(createUserFullName(firstName, lastName));
  userListItem.append(createUserOtherData(age, email, cell, country));

  userListItem.addEventListener("click", e => chooseUser(firstName, lastName));

  return userListItem;
}

function createUserImage(userImageSrc) {
  const img = new Image();
  img.src = userImageSrc;
  img.alt = "user profile image";
  return img;
}

function createUserFullName(firstName, lastName) {
  const div = document.createElement("div");
  div.classList.add("userFullName");
  div.innerText = `${firstName} ${lastName}`;
  return div;
}

function createUserOtherData(age, email, cell, country) {
  const div = document.createElement("div");
  div.classList.add("userOtherData");
  div.innerText = `Age: ${age}, email: ${email}, cell: ${cell}, country: ${country}`;
  return div;
}

function chooseUser(firstName, lastName) {}
