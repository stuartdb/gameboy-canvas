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

/**
* Draws a rectangle with curved ends.
* The height represents the size of the sides that will have curved ends
* Which means the width will almost always be the longest dimension.
* If you want the opposite to that, specify an angle of 90
* @param {Object} con Canvas context to draw rect on.
* @param {String} color RGB color string 'rgb(0,0,0)'
* @param {Number} cx X position of the centre of the rect
* @param {Number} cy Y position of the centre of the rect
* @param {Number} w Width of the rect
* @param {Number} h Height of the rect
* @param {Number} a The angle of the rect
**/
function draw_curved_rect(con, color, cx, cy, w, h, a) {
    'use strict';
    // x,y is set to top left of rect after curve to begin pathing
    // r is angle converted to radians which is what rotate() accepts
    var x = cx + h - w * 0.5,
        y = cy - h * 0.5,
        r = (Math.PI / 180) * a;

    // translate context to centre of rect, rotate it, return to 'real' 0,0
    con.translate(cx, cy);
    con.rotate(r);
    con.translate(-cx, -cy);

    con.beginPath();
    con.moveTo(x, y);
    con.lineTo(x + w - h, y);
    con.bezierCurveTo(x + w, y, x + w, y + h, x + w - h, y + h);
    con.lineTo(x, y + h);
    con.bezierCurveTo(x - h, y + h, x - h, y, x, y);
    con.closePath();
    con.fillStyle = color;
    con.fill();

    // the previous context rotation has to be undone
    con.translate(cx, cy);
    con.rotate(-r);
    con.translate(-cx, -cy);
}

/**
* Draws a rectangle with smoothed corners.
* @param {Object} con Canvas context to draw rect on.
* @param {String} color RGB color string 'rgb(0,0,0)'
* @param {Number} cx X position of the centre of the rect
* @param {Number} cy Y position of the centre of the rect
* @param {Number} w Width of the rect
* @param {Number} h Height of the rect
* @param {Number} cs Curve size, size of rounded edges
* @param {Number} a Angle of the rect
**/
function draw_smooth_rect(con, color, cx, cy, w, h, sc, a) {
    'use strict';
    // x,y is set to top left of rect (0,0)
    // r is angle converted to radians which is what rotate() accepts
    var x = cx - w * 0.5,
        y = cy - h * 0.5,
        r = (Math.PI / 180) * a;

    // translate context to centre of rect, rotate it, return to 'real' 0,0
    con.translate(cx, cy);
    con.rotate(r);
    con.translate(-cx, -cy);

    con.beginPath();
    con.moveTo(x, y + sc);
    con.quadraticCurveTo(x, y, x + sc, y);
    con.lineTo(x + w - sc, y);
    con.quadraticCurveTo(x + w, y, x + w, y + sc);
    con.lineTo(x + w, y + h - sc);
    con.quadraticCurveTo(x + w, y + h, x + w - sc, y + h);
    con.lineTo(x + sc, y + h);
    con.quadraticCurveTo(x, y + h, x, y + h - sc);
    con.lineTo(x, y + sc);
    con.closePath();
    con.fillStyle = color;
    con.fill();

    // the previous context rotation has to be undone
    con.translate(cx, cy);
    con.rotate(-r);
    con.translate(-cx, -cy);
}

/**
* Draws circle at specified location
* @param {Object} con Canvas context to draw rect on.
* @param {String} color RGB color string 'rgb(0,0,0)'
* @param {Number} x X position of the centre of the circle
* @param {Number} y Y position of the centre of the circle
* @param {Number} r Radius of circle
**/
function draw_circle(con, color, x, y, r) {
    'use strict';
    con.beginPath();
    con.arc(x, y, r, 0, Math.PI * 2);
    con.closePath();
    con.fillStyle = color;
    con.fill();
}

/**
* Draws a line between two locations
* @param {Object} con Canvas context to draw line on.
* @param {String} color RGB color string 'rgb(0,0,0)'
* @param {Number} sx X position of the start of the line
* @param {Number} sy Y position of the start of the line
* @param {Number} ex X position of the end of the line
* @param {Number} ey Y position of the end of the line
* @param {Number} w Width or thickness of the line
**/
function draw_line(con, color, sx, sy, ex, ey, w) {
    "use strict";
    con.beginPath();
    con.moveTo(sx, sy);
    con.lineTo(ex, ey);
    con.closePath();
    con.lineWidth = w;
    con.strokeStyle = color;
    con.stroke();
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
        c_shell = 'rgb(190,190,190)',
        c_face = 'rgb(88,88,100)',
        c_grill = 'rgb(200,200,200)',
        c_battery = 'rgb(40,40,40)',
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

    draw_smooth_rect(gb,
                     c_black,
                     gb_dpad_x,
                     gb_dpad_y,
                     gb_dpad_w * 2,
                     gb_dpad_h,
                     6,
                     0);

    draw_smooth_rect(gb,
                     c_black,
                     gb_dpad_x,
                     gb_dpad_y,
                     gb_dpad_w * 2,
                     gb_dpad_h,
                     6,
                     90);

    draw_circle(gb, c_ab, gb_bbut_x, gb_bbut_y, gb_bbut_rad);
    draw_circle(gb, c_ab, gb_abut_x, gb_abut_y, gb_abut_rad);

    // start and select
    draw_curved_rect(gb, c_face, 130, 490, 40, 15, 337.5);
    draw_curved_rect(gb, c_face, 190, 490, 40, 15, 337.5);

    // grill
    draw_curved_rect(gb, c_grill, 255, 555, 50, 5, 67.5);
    draw_curved_rect(gb, c_grill, 270, 547.5, 50, 5, 67.5);
    draw_curved_rect(gb, c_grill, 285, 540, 50, 5, 67.5);
    draw_curved_rect(gb, c_grill, 300, 532.5, 50, 5, 67.5);
    draw_curved_rect(gb, c_grill, 315, 525, 50, 5, 67.5);
    draw_curved_rect(gb, c_grill, 330, 517.5, 50, 5, 67.5);

    // battery light
    draw_circle(gb, c_battery, 60, 140, 5);

    // headphone detail
    draw_curved_rect(gb, c_grill, 160, 575, 40, 15, 0);
    draw_line(gb, c_grill, 165, 575, 165, 592, 3);
    draw_line(gb, c_grill, 172, 575, 172, 592, 3);
    draw_line(gb, c_grill, 179, 575, 179, 592, 3);
}

draw_gb();
