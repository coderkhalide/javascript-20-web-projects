const allBookmark = document.getElementById("all-bookmark");
const addBookmarkBtn = document.getElementById("add-bookmark-button");

const overlay = document.getElementById("overlay");

const addBookmarkContainer = document.getElementById("add-bookmark-container");
const formCloseBtn = document.getElementById("form-close-button");
const addBookmarkForm = document.getElementById("add-bookmark-form");
const websiteName = document.getElementById("website-name");
const websiteURL = document.getElementById("website-url");

const showAddBookmarkForm = () => {
  overlay.classList.add("active");
  addBookmarkContainer.classList.add("active");
};

const hideAddBookmarkForm = () => {
  overlay.classList.remove("active");
  addBookmarkContainer.classList.remove("active");
};

const extractDomain = (url) => {
  let hostname;
  if (url.indexOf("://") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }
  hostname = hostname.split(":")[0];
  hostname = hostname.split("?")[0];
  return hostname;
};

const addBookmarkElement = (name, url) => {
  const container = document.createElement("div");
  const icon = document.createElement("i");
  const link = document.createElement("a");
  const image = document.createElement("img");
  const span = document.createElement("span");
  container.className = "bookmark-container";
  icon.classList.add("fas", "fa-window-close");
  link.className = "bookmark";
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  image.setAttribute(
    "src",
    `http://www.google.com/s2/favicons?domain=${extractDomain(url)}`
  );
  span.textContent = name;
  link.appendChild(image);
  link.appendChild(span);
  container.appendChild(icon);
  container.appendChild(link);
  allBookmark.appendChild(container);
};

const initialize = () => {
  const storageItems = localStorage.getItem("bookmarks");
  if (!storageItems) return;
  const bookmarks = JSON.parse(storageItems);
  for (const bookmark of bookmarks) {
    addBookmarkElement(bookmark.name, bookmark.url);
  }
};

const updateLocalStorage = () => {
  const bookmarks = [];
  const containers = allBookmark.children;
  for (const container of containers) {
    bookmarks.push({
      name: container.lastElementChild.lastElementChild.textContent,
      url: container.lastElementChild.href,
    });
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

const addBookmark = (event) => {
  event.preventDefault();
  const websiteNameValue = event.srcElement[0].value;
  const websiteURLValue = event.srcElement[1].value;
  addBookmarkElement(websiteNameValue, websiteURLValue);
  event.srcElement[0].value = "";
  event.srcElement[1].value = "";
  updateLocalStorage();
  websiteName.focus();
};

const deleteBookmark = (event) => {
  if (!event.srcElement.classList.contains("fa-window-close")) return;
  const closeBtn = event.srcElement;
  allBookmark.removeChild(closeBtn.parentNode);
  updateLocalStorage();
};

addBookmarkBtn.addEventListener("click", showAddBookmarkForm);
overlay.addEventListener("click", hideAddBookmarkForm);
formCloseBtn.addEventListener("click", hideAddBookmarkForm);
addBookmarkForm.addEventListener("submit", addBookmark);
window.addEventListener("click", deleteBookmark);

initialize();
