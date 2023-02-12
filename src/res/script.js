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
  document
    .getElementById("theme_switch_icon")
    .setAttribute("data", "/res/theme_switch_light.svg");
  document
    .getElementById("page_start_icon")
    .setAttribute("data", "/res/up_triangle_light.svg");
  document
    .getElementById("menu_icon")
    .setAttribute("data", "/res/menu_icon_light.svg");
}

function dark_theme() {
  var light_stylesheet = document.getElementById("light-stylesheet");
  var dark_stylesheet = document.getElementById("dark-stylesheet");
  console.log(dark_stylesheet);
  disable_stylesheet(light_stylesheet);
  enable_stylesheet(dark_stylesheet);
  document
    .getElementById("theme_switch_icon")
    .setAttribute("data", "/res/theme_switch_dark.svg");
  document
    .getElementById("page_start_icon")
    .setAttribute("data", "/res/up_triangle_dark.svg");
  document
    .getElementById("menu_icon")
    .setAttribute("data", "/res/menu_icon_dark.svg");
}

function switch_theme() {
  console.log("switch_theme");
  var light_stylesheet = document.getElementById("light-stylesheet");
  if (light_stylesheet.rel === "stylesheet alternate") {
    light_theme();
  } else {
    dark_theme();
  }
}
function page_start() {
  console.log("page_start");
  window.scrollTo(0, 0);
}
function display_menu() {
  console.log("display_menu");
  var node = document.getElementById("dropdown");
  console.log(node.style.display);
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
  .getElementById("theme_switch_button")
  .addEventListener("click", switch_theme);
document
  .getElementById("page_start_button")
  .addEventListener("click", page_start);
document.getElementById("menu_button").addEventListener("click", display_menu);

const system_theme = window.matchMedia("(prefers-color-scheme: dark)");
if (system_theme.matches) {
  dark_theme();
}
document
  .getElementById("site_icon_container")
  .addEventListener("click", home);

function process_path() {
  var pathname = location.pathname;
  pathname = pathname.slice(1, pathname.length);
  console.log(pathname);
  var path_parts = pathname.split("/");
  console.log(path_parts);
  console.log(path_parts.length);
  var element = document.getElementById("breadcrumbs");
  var link = "/";
  if (path_parts.length > 1) {
    for (var i = 0; i < path_parts.length - 1; i++) {
      link += path_parts[i];
      link += "/";
      console.log(link);
      console.log(path_parts[i]);
      var new_link = '<a href="' + link + '">' + path_parts[i] + "/</a>";
      console.log(new_link);
      element.innerHTML += new_link;
    }
  }
  var filename_index = path_parts.length - 1;
  if (path_parts[filename_index] !== "index.html") {
    link += path_parts[filename_index];
    console.log(path_parts[filename_index].split(".")[0]);
    var new_link =
      '<a href="' +
      link +
      '">' +
      path_parts[filename_index].split(".")[0] +
      "</a>";
    element.innerHTML += new_link;
  }
}

process_path();
