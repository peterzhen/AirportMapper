let hidden = false; //sidebar status

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

// close sidebar
const closeSidebar = (button, sideBar) => {
  sideBar.style.marginLeft = "-300px";
  button.innerHTML = ">";
  hidden = true;
};

// open sidebar
const openSidebar = (button, sideBar, map) => {
  sideBar.style.marginLeft = "0px";
  button.innerHTML = "<";
  hidden = false;
};

// triggers the map to resize based on available size
const resize = () => {
  setTimeout(() => {
    google.maps.event.trigger(map, "resize");
  }, 550);
};
