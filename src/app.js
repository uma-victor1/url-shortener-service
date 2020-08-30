const Hamburger = document.querySelector(".hamburger");
const Nav = document.querySelector(".nav");
const hamburgerLine = document.querySelector(".hamburger-line");
const inputField = document.getElementById("url");
const error = document.getElementById("error-msg");
const container = document.querySelector(".short-links");

let showMenu = false;

Hamburger.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    Hamburger.classList.toggle("change");
    Nav.classList.toggle("hidden");
    showMenu = true;
  } else {
    Hamburger.classList.toggle("change");
    Nav.classList.toggle("hidden");
    showMenu = false;
  }
}

// check inputField value is a URL using REGEX
function URLIsValid(inputField) {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
    inputField
  );
}

function Validate() {
  error.innerHTML = ""; // clear any error messages

  if (URLIsValid(inputField.value)) {
    error.innerHTML = "";
    error.style.display = "none";
    inputField.classList.remove("error");
    return true;
    // if URL is valid URL, clear error states and return true
  } else {
    error.innerHTML = "please add a link";
    error.style.display = "block";
    inputField.classList.add("error");
    return false;
    // if URL is not valid, add error states / add error message and return false
  }
  return false;
}

document.getElementById("shortenURL").addEventListener("submit", shortenLink);

function shortenLink(event) {
  event.preventDefault();
  Validate(); // check input field contains a URL

  if (Validate()) {
    // if validation is true post to api
    fetch("https://rel.ink/api/links/", {
      method: "POST",
      body: JSON.stringify({
        url: inputField.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        createShortLink(inputField.value, data.hashid);
      })
      .catch((err) => console.log(err));
  }
}

// create short link
function createShortLink(link, hashid) {
  var shortLink = "https://rel.ink/" + hashid;
  console.log(link);
  console.log(shortLink);

  // prepare data for local storage
  let data = {
    link, // original link
    shortLink, // shortened link
  };

  store(data);
}

// store new items
function store(item) {
  let items = get(); // look for any previously stored links
  items.push(item); // add new links to existing links
  console.log(items);
  localStorage.setItem("items", JSON.stringify(items)); // locally store updated items array
  getLinks(); // update visible short links
}

// Look for Items in local storage
function get() {
  let items;
  // check for previously stored items

  if (localStorage.getItem("items") == null) {
    items = [];
    // if no items found in local storage create array
  } else {
    items = JSON.parse(localStorage.getItem("items"));
    // if items found in local storage retrieve array
  }
  return items;
}

// Display Shortened Links

function showShortLinks(link, shortLink) {
  container.insertAdjacentHTML(
    "afterbegin",
    `
  <div class="item mt-4 bg-white px-6 pb-7 lg:flex text-xl text-left rounded-lg">
 <div class="w-full py-4"> <a href="${link}" class="item-link">${link}</a></div>
  <hr>
  <div class="w-full mt-3"><a href="${shortLink}" id="shortLink" class=" item-shortlink text-Cyan lg:ml-auto">${shortLink}</a></div>
  <button id="copy" class="copy-btn w-full m-auto btn rounded-lg mt-4">Copy</button>
  </div>
  `
  );
}

function getLinks() {
  // clear current list of links
  container.innerHTML = "";
  // get items from local storage
  let items = get();
  // for each item run function showShortLinks
  items.forEach((i) => {
    console.log(i);
    showShortLinks(i.link, i.shortLink);

    setCopyBtn();
  });
}

function setCopyBtn() {
  let copyBtn = document.querySelectorAll("#copy");
  // add event listener on click to all generated copy buttons
  copyBtn.forEach((e) => e.addEventListener("click", copyLink));
}

function copyLink(e) {
  // copy link

  let textarea = document.createElement("textarea"); // create textarea element
  textarea.value = e.target.previousSibling.previousSibling.innerText; // set value of text area
  document.body.appendChild(textarea); // append textarea to html document

  textarea.select(); // select textarea contents
  document.execCommand("copy"); // copy only works as part of an event action i.e click
  document.body.removeChild(textarea); // remove textarea from html document

  // update button styles

  e.target.innerHTML = "Copied!";
  e.target.classList.add("copied-btn");
}

getLinks(); // show stored short links on page load
