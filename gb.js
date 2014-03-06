function draw_gb_rect(gb, color, x, y, w, h, sc, bc) {
    'use strict';
    // create the outline of the rect based supplied values
    gb.beginPath();
    gb.moveTo(x, y + sc);
    gb.quadraticCurveTo(x, y, x + sc, y);
    gb.lineTo(x + w - sc, y);
    gb.quadraticCurveTo(x + w, y, x + w, y + sc);
    gb.lineTo(x + w, y + h - bc);
    gb.quadraticCurveTo(x + w, y + h, x + w - bc, y + h);
    gb.lineTo(x + sc, y + h);
    gb.quadraticCurveTo(x, y + h, x, y + h - sc);
    gb.lineTo(x, y + sc);
    gb.closePath();
    // fill in the shape created with supplied color
    gb.fillStyle = color;
    gb.fill();
}

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
        gb_sc_bg_sc = 10,
        gb_sc_bg_bc = 40,
        gb_sc_x = 85,
        gb_sc_y = 80,
        gb_sc_h = 170,
        gb_sc_w = gb_w - gb_sc_x * 2,
        gb_dpad_x = 75,
        gb_dpad_y = 400,
        gb_dpad_w = 45,
        gb_dpad_h = 30,
        c_black = 'rgb(0,0,0)',
        c_shell = 'rgb(190,186,183)',
        c_face = 'rgb(88,88,100)',
        c_screen = 'rgb(80,100,20)';

    canvas = document.getElementById('gb');
    gb = canvas.getContext('2d');

    draw_gb_rect(gb, c_shell, gb_x, gb_y, gb_w, gb_h, gb_sc, gb_bc);
    draw_gb_rect(gb,
                 c_face,
                 gb_sc_bg_x,
                 gb_sc_bg_y,
                 gb_sc_bg_w,
                 gb_sc_bg_h,
                 gb_sc_bg_sc,
                 gb_sc_bg_bc);

    // draw the screen
    gb.fillStyle = c_screen;
    gb.fillRect(gb_sc_x, gb_sc_y, gb_sc_w, gb_sc_h);

    gb.fillStyle = c_black;
    gb.fillRect(gb_dpad_x - gb_dpad_w,
                gb_dpad_y - gb_dpad_h / 2,
                gb_dpad_w * 2,
                gb_dpad_h);

    gb.fillRect(gb_dpad_x - gb_dpad_h / 2,
                gb_dpad_y - gb_dpad_w,
                gb_dpad_h,
                gb_dpad_w * 2);

}

draw_gb();
