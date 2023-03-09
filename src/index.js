document.addEventListener('click', () => {
    document.getElementById("drop-list").classList.remove("show"); 
})


const menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', (event) => {
  document.getElementById("drop-list").classList.toggle("show");
  event.stopImmediatePropagation();
});

const formsButton = document.getElementById('form-button');
formsButton.addEventListener('click', () => {
  document.getElementById("form-filters").classList.toggle("hide");
  document.querySelector("section").classList.toggle("section-padding");
})