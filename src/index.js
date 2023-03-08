const menuButton = document.getElementById('menu-button');

menuButton.addEventListener('click', () => {
  document.getElementById("drop-list").classList.toggle("show");
});

const formsButton = document.getElementById('form-button');
formsButton.addEventListener('click', () => {
  document.getElementById("form-filters").classList.toggle("show");
  document.querySelector("section").classList.toggle("section-padding");
})

/*    const dropdown = document.getElementById('drop-list');
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    } else {
        dropdown.classList.add('show');
    }
});


/* function openMenu() {
    document.getElementById("drop-list").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.drop-button')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");

        for (let i= 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}; */