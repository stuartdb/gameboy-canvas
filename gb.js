(function () {
    'use strict';

    /**
     * Rotate the context by the specified angle
     * @param {Object} context Canvas context to rotate
     * @param {Number} x X position to rotate around
     * @param {Number} y Y position to rotate around
     * @param {Number} r Angle in radians
     **/
    function rotate_context(context, x, y, r) {
        // translate context to x,y, rotate it, return to 'real' 0,0
        context.translate(x, y);
        context.rotate(r);
        context.translate(-x, -y);
    }

    /**
     * Draws a rectangle in the shape of the gameboy console.
     * It's fairly unique in that the lower right corner has a large curve.
     * All other corners have a small curve.
     * @param {Object} context Canvas context to draw rect on.
     * @param {String} color RGB color string 'rgb(0,0,0)'
     * @param {Number} x X position to start drawing top left corner of rect
     * @param {Number} y Y position to start drawing top left corner of rect
     * @param {Number} w Width of the rect
     * @param {Number} h Height of the rect
     * @param {Number} sc Size of the small corners
     * @param {Number} bc Size of the lower right large corner
     **/
    function draw_gb_rect(context, color, x, y, w, h, sc, bc) {
        context.beginPath();
        context.moveTo(x, y + sc);
        context.quadraticCurveTo(x, y, x + sc, y);
        context.lineTo(x + w - sc, y);
        context.quadraticCurveTo(x + w, y, x + w, y + sc);
        context.lineTo(x + w, y + h - bc);
        context.quadraticCurveTo(x + w, y + h, x + w - bc, y + h);
        context.lineTo(x + sc, y + h);
        context.quadraticCurveTo(x, y + h, x, y + h - sc);
        context.lineTo(x, y + sc);
        context.closePath();
        context.fillStyle = color;
        context.fill();
    }

    /**
     * Draws a rectangle with curved ends.
     * The height represents the size of the sides that will have curved ends
     * Which means the width will almost always be the longest dimension.
     * If you want the opposite to that, specify an angle of 90
     * @param {Object} context Canvas context to draw rect on.
     * @param {String} color RGB color string 'rgb(0,0,0)'
     * @param {Number} cx X position of the centre of the rect
     * @param {Number} cy Y position of the centre of the rect
     * @param {Number} w Width of the rect
     * @param {Number} h Height of the rect
     * @param {Number} a The angle of the rect
     **/
    function draw_curved_rect(context, color, cx, cy, w, h, a) {
        // x,y is set to top left of rect after curve to begin pathing
        // r is angle converted to radians which is what rotate accepts
        var x = cx + h - w * 0.5,
            y = cy - h * 0.5,
            r = (Math.PI / 180) * a;

        rotate_context(context, cx, cy, r);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + w - h, y);
        context.bezierCurveTo(x + w, y, x + w, y + h, x + w - h, y + h);
        context.lineTo(x, y + h);
        context.bezierCurveTo(x - h, y + h, x - h, y, x, y);
        context.closePath();
        context.fillStyle = color;
        context.fill();
        rotate_context(context, cx, cy, -r);
    }

    /**
     * Draws a rectangle with smoothed corners.
     * @param {Object} context Canvas context to draw rect on.
     * @param {String} color RGB color string 'rgb(0,0,0)'
     * @param {Number} cx X position of the centre of the rect
     * @param {Number} cy Y position of the centre of the rect
     * @param {Number} w Width of the rect
     * @param {Number} h Height of the rect
     * @param {Number} cs Curve size, size of rounded edges
     * @param {Number} a Angle of the rect
     **/
    function draw_smooth_rect(context, color, cx, cy, w, h, sc, a) {
        // x,y is set to top left of rect (0,0)
        // r is angle converted to radians which is what rotate accepts
        var x = cx - w * 0.5,
            y = cy - h * 0.5,
            r = (Math.PI / 180) * a;

        rotate_context(context, cx, cy, r);
        context.beginPath();
        context.moveTo(x, y + sc);
        context.quadraticCurveTo(x, y, x + sc, y);
        context.lineTo(x + w - sc, y);
        context.quadraticCurveTo(x + w, y, x + w, y + sc);
        context.lineTo(x + w, y + h - sc);
        context.quadraticCurveTo(x + w, y + h, x + w - sc, y + h);
        context.lineTo(x + sc, y + h);
        context.quadraticCurveTo(x, y + h, x, y + h - sc);
        context.lineTo(x, y + sc);
        context.closePath();
        context.fillStyle = color;
        context.fill();
        rotate_context(context, cx, cy, -r);
    }

    /**
     * Draws circle at specified location
     * @param {Object} context Canvas context to draw rect on.
     * @param {String} color RGB color string 'rgb(0,0,0)'
     * @param {Number} x X position of the centre of the circle
     * @param {Number} y Y position of the centre of the circle
     * @param {Number} r Radius of circle
     **/
    function draw_circle(context, color, x, y, r) {
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = color;
        context.fill();
    }

    /**
     * Draws a line between two locations
     * @param {Object} context Canvas context to draw line on.
     * @param {String} color RGB color string 'rgb(0,0,0)'
     * @param {Number} sx X position of the start of the line
     * @param {Number} sy Y position of the start of the line
     * @param {Number} ex X position of the end of the line
     * @param {Number} ey Y position of the end of the line
     * @param {Number} w Width or thickness of the line
     **/
    function draw_line(context, color, sx, sy, ex, ey, w) {
        context.beginPath();
        context.moveTo(sx, sy);
        context.lineTo(ex, ey);
        context.closePath();
        context.lineWidth = w;
        context.strokeStyle = color;
        context.stroke();
    }

    /**
     * Draws a triangle at the specified location
     * @param {Object} context Canvas context to draw trigangle on.
     * @param {String} color RGB color string 'rgb(0,0,0)'
     * @param {Number} cx X position of the center of the triangle
     * @param {Number} cy Y position of the center of the triangle
     * @param {Number} w Width or length of one side
     * @param {Number} a Angle of the triangle
     **/
    function draw_triangle(context, color, cx, cy, w, a) {
        var x = cx - w / 2,
            y = cy + w / 2,
            r = (Math.PI / 180) * a;

        rotate_context(context, cx, cy, r);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + w, y);
        context.lineTo(x + w / 2, y - w);
        context.lineTo(x, y);
        context.closePath();
        context.fillStyle = color;
        context.fill();
        rotate_context(context, cx, cy, -r);
    }

    /**
     * Main function to draw the Gameboy to the canvas.
     *
     * It may seem like a tedious approach to manually enter co ords for everything.
     * Relying on relative positions to other shapes gets super messy though,
     * especially when you feel like making very small adjustments to random parts.
     **/
    function draw_gb() {
        var canvas,
            context,
            color_a_b = 'rgb(140,30,80)',
            color_dpad = 'rgb(0,0,0)',
            color_shell = 'rgb(190,190,190)',
            color_face = 'rgb(88,88,100)',
            color_detail = 'rgb(200,200,200)',
            color_battery = 'rgb(40,40,40)',
            color_line_1 = 'rgb(140,30,80)',
            color_line_2 = 'rgb(20,30,120)',
            color_screen = 'rgb(80,100,20)';

        canvas = document.getElementById('gameboy');
        context = canvas.getContext('2d');

        // console
        draw_gb_rect(context, color_shell, 0, 0, 360, 592, 10, 70);

        // screen background
        draw_gb_rect(context, color_face, 30, 50, 300, 230, 10, 40);

        // screen
        context.fillStyle = color_screen;
        context.fillRect(85, 80, 190, 170);

        // dpad
        draw_smooth_rect(context, color_dpad, 75, 400, 90, 30, 6, 0);
        draw_smooth_rect(context, color_dpad, 75, 400, 90, 30, 6, 90);

        // a and b buttons
        draw_circle(context, color_a_b, 250, 400, 20);
        draw_circle(context, color_a_b, 310, 380, 20);

        // start and select
        draw_curved_rect(context, color_face, 130, 490, 40, 15, 337.5);
        draw_curved_rect(context, color_face, 190, 490, 40, 15, 337.5);

        // grill
        draw_curved_rect(context, color_detail, 255, 555, 50, 5, 67.5);
        draw_curved_rect(context, color_detail, 270, 547.5, 50, 5, 67.5);
        draw_curved_rect(context, color_detail, 285, 540, 50, 5, 67.5);
        draw_curved_rect(context, color_detail, 300, 532.5, 50, 5, 67.5);
        draw_curved_rect(context, color_detail, 315, 525, 50, 5, 67.5);
        draw_curved_rect(context, color_detail, 330, 517.5, 50, 5, 67.5);

        // battery light
        draw_circle(context, color_battery, 55, 140, 5);

        // headphone detail
        draw_curved_rect(context, color_detail, 160, 575, 40, 15, 0);
        draw_line(context, color_detail, 165, 575, 165, 592, 3);
        draw_line(context, color_detail, 172, 575, 172, 592, 3);
        draw_line(context, color_detail, 179, 575, 179, 592, 3);

        // on off detail
        draw_curved_rect(context, color_detail, 80, 15, 50, 15, 0);
        draw_line(context, color_detail, 70, 15, 70, 0, 3);
        draw_line(context, color_detail, 77, 15, 77, 0, 3);
        draw_line(context, color_detail, 84, 15, 84, 0, 3);

        // lines at top of console
        draw_line(context, color_detail, 0, 30, 360, 30, 3);
        draw_line(context, color_detail, 30, 0, 30, 30, 3);
        draw_line(context, color_detail, 330, 0, 330, 30, 3);

        // lines on the screen face
        draw_line(context, color_line_1, 40, 60, 320, 60, 3);
        draw_line(context, color_line_2, 40, 65, 320, 65, 3);

        // small triangle details around dpad
        draw_triangle(context, color_detail, 75, 350, 7, 0);
        draw_triangle(context, color_detail, 25, 400, 7, 270);
        draw_triangle(context, color_detail, 125, 400, 7, 90);
        draw_triangle(context, color_detail, 75, 450, 7, 180);
    }

    draw_gb();
}());
