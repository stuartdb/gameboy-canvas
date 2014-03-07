/**
* Draws a rectangle in the shape of the gameboy console.
* It's fairly unique in that the lower right corner has a large curve.
* All other corners have a small curve.
* @param {Object} con Canvas context to draw rect on.
* @param {String} color RGB color string 'rgb(0,0,0)'
* @param {Number} x X position to start drawing top left corner of rect
* @param {Number} y Y position to start drawing top left corner of rect
* @param {Number} w Width of the rect
* @param {Number} h Height of the rect
* @param {Number} sc Size of the small corners
* @param {Number} bc Size of the lower right large corner
**/
function draw_gb_rect(con, color, x, y, w, h, sc, bc) {
    'use strict';
    con.beginPath();
    con.moveTo(x, y + sc);
    con.quadraticCurveTo(x, y, x + sc, y);
    con.lineTo(x + w - sc, y);
    con.quadraticCurveTo(x + w, y, x + w, y + sc);
    con.lineTo(x + w, y + h - bc);
    con.quadraticCurveTo(x + w, y + h, x + w - bc, y + h);
    con.lineTo(x + sc, y + h);
    con.quadraticCurveTo(x, y + h, x, y + h - sc);
    con.lineTo(x, y + sc);
    con.closePath();
    con.fillStyle = color;
    con.fill();
}

function draw_curved_rect(gb, color, x, y, w, h) {
    'use strict';
//    w = w * 0.5;
//    h = h * 0.5;
    var tx = x,
        ty = y,
        a = 337.5,
        r = (Math.PI / 180) * a;

    // translate the xy of context to centre of rect
    gb.translate(tx, ty);
    // rotate the context
    gb.rotate(r);
    // translate the xy of context back to top left
    gb.translate(-tx, -ty);
    // go about drawing the rectangle on the rotated context

    // adjust x and y to be at the top left corner
    y = y - h * 0.5;
    x = x + h - w * 0.5;

    // x and y denotes center of rectangle
    gb.beginPath();
    gb.moveTo(x, y);
    gb.lineTo(x + w - h, y);
    gb.bezierCurveTo(x + w, y, x + w, y + h, x + w - h, y + h);
//    gb.quadraticCurveTo(x + w, y + h * 0.5, x + w - h * 0.5, y + h);
//    gb.quadraticCurveTo(x + w, y, x + w, y + h * 0.5);
//    gb.quadraticCurveTo(x + w, y + h, x + w - h, y + h);
    gb.lineTo(x, y + h);
    gb.bezierCurveTo(x - h, y + h, x - h, y, x, y);
//    gb.quadraticCurveTo(x - h, y + h, x - h, y + h * 0.5);
//    gb.quadraticCurveTo(x - h, y, x, y);

    // gb.moveTo(x, y - h * 0.5);
    // gb.lineTo(x + w / 2 - c, y - h / 2);
    // gb.arcTo(x + w / 2, y - h / 2, x + w / 2, y + h / 2);

    // gb.quadraticCurveTo(x + w / 2, y - h / 2, x + sc, y);
    // gb.lineTo(x + w - sc, y);
    // gb.quadraticCurveTo(x + w, y, x + w, y + sc);
    // gb.lineTo(x + w, y + h - bc);
    // gb.quadraticCurveTo(x + w, y + h, x + w - bc, y + h);
    // gb.lineTo(x + sc, y + h);
    // gb.quadraticCurveTo(x, y + h, x, y + h - sc);
    // gb.lineTo(x, y + sc);
    gb.closePath();
    // fill in the shape created with supplied color
    gb.fillStyle = color;
    gb.fill();

    // need to return the context back to it's original rotation
    // translate the xy of context to centre of rect again
    gb.translate(tx, ty);
    // reverse the rotation of the context
    gb.rotate(-r);
    // translate the xy of context back to top left
    gb.translate(-tx, -ty);
    // hopefully everything is back the way it should be

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
        gb_bbut_rad = 20,
        gb_bbut_x = 250,
        gb_bbut_y = gb_dpad_y,
        gb_abut_rad = gb_bbut_rad,
        gb_abut_x = gb_sc_bg_x + gb_sc_bg_w - gb_abut_rad,
        gb_abut_y = gb_bbut_y - gb_bbut_rad,
        c_ab = 'rgb(140,30,80)',
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

    // draw dpad
    gb.fillStyle = c_black;
    gb.fillRect(gb_dpad_x - gb_dpad_w,
                gb_dpad_y - gb_dpad_h / 2,
                gb_dpad_w * 2,
                gb_dpad_h);

    gb.fillRect(gb_dpad_x - gb_dpad_h / 2,
                gb_dpad_y - gb_dpad_w,
                gb_dpad_h,
                gb_dpad_w * 2);

    // draw buttons
    gb.beginPath();
    gb.arc(gb_bbut_x, gb_bbut_y, gb_bbut_rad, 0, Math.PI * 2);
    gb.closePath();
    gb.fillStyle = c_ab;
    gb.fill();

    gb.beginPath();
    gb.arc(gb_abut_x, gb_abut_y, gb_abut_rad, 0, Math.PI * 2);
    gb.closePath();
    gb.fillStyle = c_ab;
    gb.fill();

    draw_curved_rect(gb, c_face, 130, 490, 40, 15);
    draw_curved_rect(gb, c_face, 190, 490, 40, 15);

}

draw_gb();
