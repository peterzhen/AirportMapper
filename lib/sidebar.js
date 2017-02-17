let hidden = false;

// binds button to hide and show sidebar
export const bindSidebarDrawer = map => {
  const button = document.getElementById("hide-sidebar-button");
  const sideBar = document.getElementById("side-bar");

  button.onclick = event => {
    if (hidden === false){
      closeSidebar(button, sideBar, map);
    } else {
      openSidebar(button, sideBar, map);
    }
    resize();
  };
};

const closeSidebar = (button, sideBar) => {
  sideBar.style.marginLeft = "-300px";
  button.innerHTML = ">";
  hidden = true;
};

const openSidebar = (button, sideBar, map) => {
  sideBar.style.marginLeft = "0px";
  button.innerHTML = "<";
  hidden = false;
};

const resize = () => {
  setTimeout(() => {
    google.maps.event.trigger(map, "resize");
  }, 550);
};
