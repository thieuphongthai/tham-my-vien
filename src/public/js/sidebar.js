let sidebarBtn = document.querySelector("#sidebarToggleBtn");
let sidebar = document.querySelector("#sidebar-wrapper");
sidebarBtn.onclick = function(){
    sidebar.classList.toggle("active");
    sidebarBtn.classList.toggle("rotate");
}