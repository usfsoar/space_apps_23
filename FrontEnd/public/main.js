let main_visual=document.getElementById("main-visual");
let projector_visual=document.getElementById("projector-visual");

let current_visual="main-visual";
let option=document.getElementById("btSwitcher");

option.addEventListener('click', changeView.bind());

function changeView(){
    if(current_visual=="main-visual"){
        current_visual="projector-visual";
        main_visual.style.display = "none";
        projector_visual.style.display = "block";
    }else{
        current_visual="main-visual";
        projector_visual.style.display = "none";
        main_visual.style.display = "block";
    }
}

let full_screen=document.getElementById("projector-header")
let switch_button=document.getElementById("btSwitcher")
window.addEventListener('resize', (evt) => { 
    if (window.innerHeight == screen.height) {
        full_screen.style.display = "none";
        switch_button.style.display = "none";
    } else {
        full_screen.style.display = "block";
        switch_button.style.display = "block";
    }
});