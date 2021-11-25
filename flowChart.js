var arrowBtn, boxBtn, btns, holder;
var addPop, addBtn, addText;
var mode = "move";
window.onload = function () {
    btns = document.getElementsByClassName("menu");
    // Btns listeners
    Array.from(btns).forEach(element => {
        element.addEventListener("click",function(){changeMode(element.name)});
    });
    renderButtonSelection();
    // Add box listeners
    addPop = document.getElementById("addBox");
    addBtn = document.getElementById("addBoxBtn");
    addText = document.getElementById("boxNameInput");

    document.getElementById("add").addEventListener("click",function(){toggleElementVisibility(addPop)})

    Array.from(document.getElementsByClassName("color")).forEach(element => {
        element.addEventListener("click",function(){createBox(element.name)});
    });
    // etc
    holder = document.getElementById("holder");
    lineHolder = document.getElementById("lineHolder");
    holder.onmousedown = function () {arrow()}

}
// Arrow drawing
function arrow(){
    if(mode == "arrow"){
        let startX = window.event.clientX;
        let startY = window.event.clientY;
        holder.onmouseup = function () {
            let line = document.createElementNS('http://www.w3.org/2000/svg','line');
            line.setAttribute("x1",startX);
            line.setAttribute("y1",startY);
            line.setAttribute("x2",window.event.clientX);
            line.setAttribute("y2",window.event.clientY);
            line.setAttribute("class","line");
            line.addEventListener("click",function () {if(mode == "remove"){lineHolder.removeChild(line);}});
            lineHolder.appendChild(line);
        }
    }
    else{
        holder.onmouseup = null;
    }
}
// Create Box
function createBox(color = "#70d6ff"){
    let text = addText.value;
    let boxInstance = document.createElement("div");
    boxInstance.innerHTML = text;
    boxInstance.addEventListener("mousedown",function(){boxClick(boxInstance)});
    boxInstance.classList.add("flowSpot");
    boxInstance.style.backgroundColor = color;

    holder.appendChild(boxInstance);
    toggleElementVisibility(addPop);
}
// Buttons
function changeMode(modeName){
    mode = modeName;
    renderButtonSelection();
    let boxes = document.getElementsByClassName("flowSpot");
    Array.from(boxes).forEach(element => {
        if(mode == "resize"){
            element.style.resize = "both";
        }else{
            element.style.resize = "none";
        }
    });
}
function renderButtonSelection(){
    Array.from(btns).forEach(element => {
        if(element.name == mode){
            element.style.borderRadius = "1rem";
        }else{
            element.style.borderRadius = "2rem";
        }
    });
}
// Text box drag
var startPosX, startPosY;
function boxClick(element){
    if(mode == "move"){
        let e = window.event;
        startPosX = e.clientX;
        startPosY = e.clientY;
        document.onmouseup = function () {closeBox()}
        document.onmousemove = function () {moveBox(element)}
    }else if(mode == "remove"){
        holder.removeChild(element);
    }
}
function moveBox(element){
    let e = window.event;
    let posX = startPosX - e.clientX;
    let posY = startPosY - e.clientY;
    startPosX = e.clientX;
    startPosY = e.clientY;
    element.style.left = (element.offsetLeft - posX) + "px";
    element.style.top = (element.offsetTop - posY) + "px"; 
}
function closeBox(element){
    document.onmousemove = null;
    document.onmouseup = null;
}
// Extra
function toggleElementVisibility(element){
    if(element.style.visibility == "visible"){
        addPop.style.visibility = "hidden";
    }else{
        addPop.style.visibility = "visible";
    }
}