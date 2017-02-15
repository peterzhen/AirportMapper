let hidden = false;

export const bindSidebarDrawer = () => {
  const button = document.getElementById("hide-sidebar-button");
  const sideBar = document.getElementById("side-bar");

  button.onclick = event => {
    if (hidden === false){
      closeSidebar(button, sideBar);
    } else {
      openSidebar(button, sideBar);
    }
  };
};

const closeSidebar = (button, sideBar) => {
  sideBar.style.left = "-275px";
  button.innerHTML = ">";
  hidden = true;
};

const openSidebar = (button, sideBar) => {
  sideBar.style.left = "0px";
  button.innerHTML = "<";
  hidden = false;
};
