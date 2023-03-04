function enable_stylesheet(node) {
  node.rel = "stylesheet";
}

function disable_stylesheet(node) {
  node.rel = "stylesheet alternate";
}

function light_theme() {
  var light_stylesheet = document.getElementById("light-stylesheet");
  var dark_stylesheet = document.getElementById("dark-stylesheet");
  disable_stylesheet(dark_stylesheet);
  enable_stylesheet(light_stylesheet);
  // var moon = document.createElement("i");
  // moon.classList = "fa-solid fa-moon";
  // var node = document.getElementById("theme-switch-button");
  // node.innerHTML = "";
  // node.appendChild(moon);
}

function dark_theme() {
  var light_stylesheet = document.getElementById("light-stylesheet");
  var dark_stylesheet = document.getElementById("dark-stylesheet");
  disable_stylesheet(light_stylesheet);
  enable_stylesheet(dark_stylesheet);
  // var sun = document.createElement("i");
  // sun.classList = "fa-solid fa-sun";
  // var node = document.getElementById("theme-switch-button");
  // node.innerHTML = "";
  // node.appendChild(sun);
}

function switch_theme() {
  var light_stylesheet = document.getElementById("light-stylesheet");
  if (light_stylesheet.rel === "stylesheet alternate") {
    light_theme();
  } else {
    dark_theme();
  }
}
function page_start() {
  window.scrollTo(0, 0);
}

function display_menu() {
  var node = document.getElementById("dropdown-line");
  if (node.style.display === "block") {
    node.style.display = "none";
  } else {
    node.style.display = "block";
  }
}
function home() {
  location.href = "/";
}

document
  .getElementById("theme-switch-button")
  .addEventListener("click", switch_theme);
document
  .getElementById("page-start-button")
  .addEventListener("click", page_start);
document.getElementById("menu-button").addEventListener("click", display_menu);

const system_theme = window.matchMedia("(prefers-color-scheme: dark)");
if (system_theme.matches) {
  dark_theme();
}
document
  .getElementById("site-banner-icon-container")
  .addEventListener("click", home);

function process_path() {
  var pathname = location.pathname;
  pathname = pathname.slice(1, pathname.length);
  var path_parts = pathname.split("/");
  var element = document.getElementById("breadcrumb-parts");
  var link = "/";
  if (path_parts.length > 1) {
    for (var i = 0; i < path_parts.length - 1; i++) {
      link += path_parts[i];
      link += "/";
      var new_link = '<a href="' + link + '">' + path_parts[i] + "/</a>";
      element.innerHTML += new_link;
    }
  }
  var filename_index = path_parts.length - 1;
  if (
    path_parts[filename_index] !== "index.html" &&
    path_parts[filename_index].length > 0
  ) {
    link += path_parts[filename_index];
    var new_link =
      '<a href="' +
      link +
      '">' +
      path_parts[filename_index].split(".")[0] +
      "</a>";
    element.innerHTML += new_link;
    if (location.pathname.includes("blog")) {
      author_name = document.getElementById("author-name").innerHTML;
      article_date = document.getElementById("article-date").innerHTML;
      title = document.getElementsByClassName("title")[0];
      metainfo_div = document.createElement("div");
      metainfo_div.classList = "document-metainfo"
      author_name_element = document.createElement("p");
      article_date_element = document.createElement("p");
      // author_name_element.classList = "document-metainfo";
      // article_date_element.classList = "document-metainfo";
      author_name_element.innerHTML = author_name;
      if (article_date.length === 0) {
        article_date_element.innerHTML = "undated";
        article_date_element.style.fontStyle = "italic";
      } else {
        article_date_element.innerHTML = article_date.split(" ")[1];
      }
      // title.parentNode.insertBefore(article_date_element, title.nextSibling);
      // title.parentNode.insertBefore(author_name_element, title.nextSibling);
      // title.parentNode.insertBefore(author_name_element, title);
      // title.parentNode.insertBefore(article_date_element, title);
      metainfo_div.appendChild(author_name_element);
      metainfo_div.appendChild(article_date_element);
      // title.parentNode.insertBefore(metainfo_div, title);
      title.parentNode.insertBefore(metainfo_div, title.nextSibling);

    }
  }
}

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    document.getElementById("page-start-button").style.display = "block";
  } else {
    document.getElementById("page-start-button").style.display = "none";
  }
}
function main() {
  process_path();
  var toc = document.getElementById("table-of-contents");
  if (toc) {
    toc.getElementsByTagName("h2")[0].innerHTML = "Contents";
  }
}

main();
