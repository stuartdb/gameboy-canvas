function draw_gb() {
    'use strict';
    var canvas,
        gb,
        gb_x = 0,
        gb_y = 0,
        gb_w = 360,
        gb_h = 592,
        gb_sc = 10,
        gb_bc = 70,
        gb_sc_bg_x = 30,
        gb_sc_bg_y = 50,
        gb_sc_bg_h = 230,
        gb_sc_bg_w = gb_w - gb_sc_bg_x * 2,
        gb_sc_x = 85,
        gb_sc_y = 80,
        gb_sc_h = 170,
        gb_sc_w = gb_w - gb_sc_x * 2,
        c_shell = 'rgb(190,186,183)',
        c_face = 'rgb(88,88,100)',
        c_screen = 'rgb(80,100,20)';

    canvas = document.getElementById('gb');
    gb = canvas.getContext('2d');

    // path out the outline of the console
    // start with top left edge curve
    gb.beginPath();
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
    // fill in the outline path of the console
    gb.fillStyle = c_shell;
    gb.fill();

    // draw the background of the screen
    gb.fillStyle = c_face;
    gb.fillRect(gb_sc_bg_x, gb_sc_bg_y, gb_sc_bg_w, gb_sc_bg_h);

    // draw the screen
    gb.fillStyle = c_screen;
    gb.fillRect(gb_sc_x, gb_sc_y, gb_sc_w, gb_sc_h);

}

draw_gb();
