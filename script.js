let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let color = "WHITE";
let mouseDown = false;
let lastCoords = null;


function initializeCanvasFunction(can){
    can.onmousedown = (e) => {
        mouseDown = true;
        onDraw(e);
    };
    can.onmouseup = (e) => {
        mouseDown = false;
        lastCoords = null;
    }
    can.onmousemove = (e) => onDraw(e);
    can.touchstart = can.onmousedown;
    can.touchend = can.onmouseup;
    can.touchmove = can.onmousemove;
}

function drawBackground(){
    ctx.fillStyle = "BLACK";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, height/2, width, 1);
    ctx.fillRect(width/2, 0, 1, height);
    lineTo(0,0,width,height, color);
    lineTo(width,0,0,height, color);
}

function onDraw(e){
    if(mouseDown){
        var rect = canvas.getBoundingClientRect();
        let x = e.clientX-rect.left;
        let y = e.clientY-rect.top;
        let coords = [];
        coords.push([x, y]);
        coords.push([width-x, y]);
        coords.push([x, height-y]);
        coords.push([width-x, height-y]);
        coords.push([y, x]);
        coords.push([y, width-x]);
        coords.push([height-y, x]);
        coords.push([height-y, width-x]);
        if(lastCoords != null){
            for(let i = 0; i < coords.length; i++){
                //ctx.fillRect(coords[i][0], coords[i][1], 1, 1);
                lineTo(coords[i][0], coords[i][1], lastCoords[i][0], lastCoords[i][1], color);            
            }
        }
        lastCoords = coords;
    }
}

function lineTo(x, y, x1, y1, color){
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

drawBackground();
initializeCanvasFunction(canvas);
