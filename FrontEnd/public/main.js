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
    console.log(current_visual)
}