function draw_gb() {
    'use strict';
    var canvas,
        gb,
        gb_w,
        gb_h,
        gb_x,
        gb_y,
        gb_sc,
        gb_bc;

    // width and height of console
    gb_w = 430;
    gb_h = 700;
    // x and y start position
    gb_x = 0;
    gb_y = 0;
    // curve sizes for the console corners
    gb_sc = 20;
    gb_bc = 100;

    canvas = document.getElementById('gb');
    gb = canvas.getContext('2d');

    // draw the outline of the console
    gb.beginPath();
    // start with top left edge curve
    gb.moveTo(gb_x, gb_sc);
    gb.quadraticCurveTo(gb_x, gb_y, gb_sc, gb_y);
    gb.lineTo(gb_w - gb_sc, gb_y);
    gb.quadraticCurveTo(gb_w, gb_y, gb_w, gb_sc);
    gb.lineTo(gb_w, gb_h - gb_bc);
    gb.quadraticCurveTo(gb_w, gb_h, gb_w - gb_bc, gb_h);
    gb.lineTo(gb_sc, gb_h);
    gb.quadraticCurveTo(gb_x, gb_h, gb_x, gb_h - gb_sc);
    gb.lineTo(gb_x, gb_y + gb_sc);
    gb.closePath();
    // fill the console
    gb.fillStyle = 'rgb(190,186,183)';
    gb.fill();
    // describe the 'pen' and draw the line
    gb.lineWidth = 2;
    gb.strokeStyle = 'rgb(190,186,183)';
    gb.stroke();

}

draw_gb();
