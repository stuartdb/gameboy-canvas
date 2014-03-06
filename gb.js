function draw_gb() {
    'use strict';
    var canvas,
        gb,
        w,
        h,
        x,
        y,
        gb_sc,
        gb_bc;

    // width and height of console
    w = 430;
    h = 700;
    // x and y start position
    x = 0;
    y = 0;
    // curve sizes for the console corners
    gb_sc = 20;
    gb_bc = 100;

    canvas = document.getElementById('gb');
    gb = canvas.getContext('2d');

    // draw the outline of the console
    gb.beginPath();

    // start with top left edge curve
    gb.moveTo(x, gb_sc);
    gb.quadraticCurveTo(x, y, gb_sc, y);
    gb.lineTo(w-gb_sc, 0);
    gb.quadraticCurveTo(w, y, w, gb_sc);
    gb.lineTo(w, h-gb_bc);
    gb.quadraticCurveTo(w, h, w-gb_bc, h);
    gb.lineTo(gb_sc, h);
    gb.quadraticCurveTo(x, h, x, h-gb_sc);
    gb.lineTo(x, y+gb_sc);

    // fill the console
    gb.fillStyle = 'rgb(190,186,183)';
    gb.fill();

    // describe the 'pen'
    gb.lineWidth = 2;
    gb.strokeStyle = 'rgb(190,186,183)';
    gb.stroke();

}

draw_gb();
