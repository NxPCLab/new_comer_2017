const $ = require("jquery");
window.$ = $;
require("popper.js");
require("bootstrap");

var timer = false;
let canvasWidth = 0;
let canvasHeight = 0;

let init = () => {
    let img = new Image();
    img.src = "./res/karaage.png";

    let rb = 200;
    let r = 0;
    let x = 0;

    canvasWidth  = $("body").width();
    canvasHeight = $("body").height();

    $("#canvas").attr({
        width: canvasWidth
    });
    $("#canvas").attr({
        height: canvasHeight
    });

    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    let draw = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.beginPath();
        for(let i = 0;i<10;i++) {
            r = rb + Math.sin((x + i * 36)  / 60) * 60;
            let theta = (x + i * 36) * (Math.PI / 180);
            let xp = Math.sin(theta*theta*theta);
            let yp = Math.cos(theta*theta*theta);
            context.drawImage(img, xp * r + (canvasWidth / 2 - 35), yp * r + (canvasHeight / 2 - 35), 70, 70);
        }
        x+=1;
        x = (x > /*360*/5760)? 0 : x ;
    }
    setInterval(draw, 20);
}

window.onload = init;

$(window).resize(function() {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {

        canvasWidth  = $("body").width();
        canvasHeight = $("body").height();

        $("#canvas").attr({
            width: canvasWidth
        });
        $("#canvas").attr({
            height: canvasHeight
        });
    }, 200);
});