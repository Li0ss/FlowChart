var arrowBtn, boxBtn, btns, holder;
var addPop, addBtn, addText;
var mode = "move";
window.onload = function () {
    btns = document.getElementsByClassName("mode");
    // Mode button listeners
    Array.from(btns).forEach(element => {
        element.addEventListener("click",function(){changeMode(element.name)});
    });
    renderButtonSelection();
    // Create box listeners
    addPop = document.getElementById("addBox");
    addBtn = document.getElementById("addBoxBtn");
    addText = document.getElementById("boxNameInput");
    addNum = document.getElementById("boxNum");

    // Create box button
    document.getElementById("add").addEventListener("click",function(){toggleElementVisibility(addPop)});
    // Clear all lines button
    document.getElementById("clearAll").addEventListener("click",function (){clearAllChildElements(lineHolder)});
    // Box color buttons
    Array.from(document.getElementsByClassName("color")).forEach(element => {
        element.addEventListener("click",function(){createBox(element.name)});
    });
    // Holders
    holder = document.getElementById("holder");
    lineHolder = document.getElementById("lineHolder");
    holder.onmousedown = function () {arrow()}

}
// Arrow drawing
function arrow(){
    if(mode == "arrow"){
        // Gets mouse starting position
        let startX = window.event.clientX;
        let startY = window.event.clientY;
        // On mouse button release, gets new mouse position
        holder.onmouseup = function () {
            // Creates line
            let line = document.createElementNS('http://www.w3.org/2000/svg','line');
            // Sets line coordinates
            line.setAttribute("x1",startX);
            line.setAttribute("y1",startY);
            line.setAttribute("x2",window.event.clientX);
            line.setAttribute("y2",window.event.clientY);
            line.setAttribute("class","line");
            // Adds remove listener
            line.addEventListener("click",function () {if(mode == "remove"){lineHolder.removeChild(line);}});
            // Appends to line hoder
            lineHolder.appendChild(line);
        }
    }
    else{
        holder.onmouseup = null;
    }
}
// Create Box
function createBox(color = "#70d6ff"){
    // Gets add box text input
    let text = addText.value;
    // Creates n buttons according to addNum.value
    for (let i = 0; i < addNum.value; i++) {
        let boxInstance = document.createElement("div");
        // Box text
        boxInstance.innerHTML = text;
        boxInstance.addEventListener("mousedown",function(){boxClick(boxInstance)});
        // Box styling
        boxInstance.classList.add("flowSpot");
        boxInstance.style.backgroundColor = color;
        // Appends box to holder
        holder.appendChild(boxInstance);
    }
    // Hides add box pop-up
    toggleElementVisibility(addPop);
}
// Changes current mode
function changeMode(modeName){
    mode = modeName;
    renderButtonSelection();
    enableResize();
}
// Apply style changes to buttons
function renderButtonSelection(){
    Array.from(btns).forEach(element => {
        if(element.name == mode){
            element.style.backgroundColor = "green";
        }else{
            element.style.backgroundColor = "#457b9d";
        }
    });
}
// Box on click interaction
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
// Box drag
function moveBox(element){
    let e = window.event;
    let posX = startPosX - e.clientX;
    let posY = startPosY - e.clientY;
    startPosX = e.clientX;
    startPosY = e.clientY;
    // Sets box position
    element.style.left = (element.offsetLeft - posX) + "px";
    element.style.top = (element.offsetTop - posY) + "px"; 
}
function closeBox(element){
    document.onmousemove = null;
    document.onmouseup = null;
}
// Enable box resizing
function enableResize(){
    let boxes = document.getElementsByClassName("flowSpot");
    Array.from(boxes).forEach(element => {
        if(mode == "resize"){
            element.style.resize = "both";
        }else{
            element.style.resize = "none";
        }
    });
}
function toggleElementVisibility(element){
    if(element.style.visibility == "visible"){
        addPop.style.visibility = "hidden";
    }else{
        addPop.style.visibility = "visible";
    }
}
function clearAllChildElements(element){
    while(element.lastElementChild){
        element.removeChild(lineHolder.lastElementChild);
    }
}