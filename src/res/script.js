function enableStylesheet(node) {
  node.rel = "stylesheet";
}

function disableStylesheet(node) {
  node.rel = "stylesheet alternate";
}

function lightTheme() {
  var light_stylesheet = document.getElementById("light-stylesheet");
  var dark_stylesheet = document.getElementById("dark-stylesheet");
  disableStylesheet(dark_stylesheet);
  enableStylesheet(light_stylesheet);
  var moon = document.createElement("i");
  moon.classList = "fa-solid fa-moon";
  var themeButton = document.getElementById("theme-switch-button");
  themeButton.innerHTML = null;
  themeButton.appendChild(moon);
}

function darkTheme() {
  var light_stylesheet = document.getElementById("light-stylesheet");
  var dark_stylesheet = document.getElementById("dark-stylesheet");
  disableStylesheet(light_stylesheet);
  enableStylesheet(dark_stylesheet);
  var sun = document.createElement("i");
  sun.classList = "fa-regular fa-sun";
  var themeButton = document.getElementById("theme-switch-button");
  themeButton.innerHTML = null;
  themeButton.appendChild(sun);
}

function switchTheme() {
  var light_stylesheet = document.getElementById("light-stylesheet");
  if (light_stylesheet.rel === "stylesheet alternate") {
    lightTheme();
  } else {
    darkTheme();
  }
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function displayMenu() {
  var node = document.getElementById("dropdown-line");
  if (node.style.display === "block") {
    node.style.display = "none";
  } else {
    node.style.display = "block";
  }
}
function Home() {
  location.href = "/";
}

function scrollFunction() {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    document.getElementById("page-start-button").style.display = "block";
  } else {
    document.getElementById("page-start-button").style.display = "none";
  }
}

function prettyName(filename) {
  specialNames = ["dsa", "cs", "vcs"];
  var words = filename.split("-");
  var string = "";
  for (var i = 0; i < words.length; i++) {
    if (specialNames.includes(words[i])) {
      string += words[i].toUpperCase();
    } else {
      string += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    string += " ";
  }
  return string.slice(0, -1);
}

function newDivider() {
  var icon = document.createElement("i");
  icon.classList = "fa-solid fa-angle-right";
  console.log(icon);
  return icon;
}

function isIndexPage(path_parts) {
  filename_index = path_parts.length - 1;
  return (
    path_parts[filename_index] == "index.html" ||
    path_parts[filename_index].length == 0
  );
}

function writeBreadcrumbs() {
  // obtain the element to modify and the pathname
  var pathname = location.pathname;
  var target = document.getElementById("breadcrumb-parts");
  pathname = pathname.slice(1, pathname.length); // strip the leading slash
  var pathParts = pathname.split("/"); // divide into parts
  var link = "/"; // start building the link
  if (pathParts.length > 1) {
    // if not the root directory
    // create link for each dir
    for (var i = 0; i < pathParts.length - 1; i++) {
      link += pathParts[i];
      link += "/";
      var newLink = document.createElement("a");
      newLink.href = link;
      newLink.innerText = prettyName(pathParts[i]);
      target.appendChild(newDivider());
      target.appendChild(newLink);
    }
  }
  var filenameIndex = pathParts.length - 1;
  if (isIndexPage(pathParts) == false) {
    link += pathParts[filenameIndex];
    var newLink = document.createElement("a");
    newLink.href = link;
    newLink.innerText = prettyName(pathParts[filenameIndex].split(".")[0]);
    target.appendChild(newDivider());
    target.appendChild(newLink);
  }
}

function writeDocumentMetadata() {
  var pathname = location.pathname;
  pathname = pathname.slice(1, pathname.length);
  var path_parts = pathname.split("/");

  if (isIndexPage(path_parts) == false) {
    author_name = document.getElementById("author-name").innerText;
    article_date = document.getElementById("article-date").innerText;
    title = document.getElementsByClassName("title")[0];
    metainfo_div = document.createElement("div");
    metainfo_div.classList = "document-metainfo";
    author_name_element = document.createElement("p");
    article_date_element = document.createElement("p");
    author_name_element.innerHTML = author_name;
    if (article_date.length === 0) {
      article_date_element.innerText = "undated";
      article_date_element.style.fontStyle = "italic";
    } else {
      article_date_element.innerText = article_date.split(" ")[1];
    }
    metainfo_div.appendChild(author_name_element);
    metainfo_div.appendChild(article_date_element);
    title.parentNode.insertBefore(metainfo_div, title.nextSibling);
  }
}

function formatTOC() {
  var toc = document.getElementById("table-of-contents");
  if (toc) {
    toc.getElementsByTagName("h2")[0].innerText = "Contents";
  }
}

async function copyCode(block, icon) {
  let text = block.innerText;
  await navigator.clipboard.writeText(text);
  icon.classList = "fa-solid fa-check";
  setTimeout(
    (icon) => {
      icon.classList = "fa-regular fa-clipboard";
    },
    500,
    icon
  );
}

function addClipboardItems() {
  let blocks = document.getElementsByClassName("org-src-container");
  for (var i = 0; i < blocks.length; i++) {
    if (navigator.clipboard) {
      let icon = document.createElement("i");
      icon.classList = "fa-regular fa-clipboard";
      blocks[i].appendChild(icon);
      let block = blocks[i].querySelector("pre")
      icon.addEventListener("click", async () => {
        await copyCode(block, icon);
      });
    }
  }
  // blocks.forEach((block) => {
  //   if (navigator.clipboard) {
  //     let icon = document.createElement("i");
  //     icon.classList = "fa-regular fa-clipboard";
  //     block.appendChild(icon);
  //     icon.addEventListener("click", async () => {
  //       await copyCode(block, icon);
  //     });
  //   }
  // });
}

document
  .getElementById("theme-switch-button")
  .addEventListener("click", switchTheme);
document
  .getElementById("page-start-button")
  .addEventListener("click", scrollToTop);
document.getElementById("menu-button").addEventListener("click", displayMenu);
document
  .getElementById("site-banner-icon-container")
  .addEventListener("click", Home);

window.onscroll = function () {
  scrollFunction();
};

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
if (systemTheme.matches) {
  darkTheme();
}

writeBreadcrumbs();
writeDocumentMetadata();
formatTOC();
addClipboardItems();
