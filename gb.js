(function () {
    'use strict';
    var actions,
        canvas,
        colors,
        context,
        draw,
        init,
        shapes,
        update;

    actions = {
        /**
         * Rotate the context by the specified angle
         * @param {Number} x X position to rotate around
         * @param {Number} y Y position to rotate around
         * @param {Number} r Angle in radians
         **/
        rotate : function (x, y, r) {
            // translate context to x,y, rotate it, return to 'real' 0,0
            context.translate(x, y);
            context.rotate(r);
            context.translate(-x, -y);
        }
    };

    colors = {
        /**
         * Sets the color codes to black and white
         **/
        bw : function () {
            colors.ab = 'rgb(255,255,255)';
            colors.dpad = 'rgb(255,255,255)';
            colors.shell = 'rgb(0,0,0)';
            colors.face = 'rgb(255,255,255)';
            colors.detail = 'rgb(255,255,255)';
            colors.battery = 'rgb(0,0,0)';
            colors.line1 = 'rgb(0,0,0)';
            colors.line2 = 'rgb(0,0,0)';
            colors.screen = 'rgb(0,0,0)';
        },
        /**
         * Sets the color codes to the monochrome 4-shade palette if the
         * original screen. The four color codes used are the various shades
         * of olive
         **/
        mono : function () {
            var lightest = 'rgb(155,188,15)',
                light = 'rgb(139,172,15)',
                dark = 'rgb(48,98,48)',
                darkest = 'rgb(15,56,15)';

            colors.ab = dark;
            colors.dpad = darkest;
            colors.shell = lightest;
            colors.face = dark;
            colors.detail = light;
            colors.battery = darkest;
            colors.line1 = light;
            colors.line2 = lightest;
            colors.screen = lightest;
        },
        /**
         * Sets the color codes close to that of the original system.
         **/
        standard : function () {
            colors.ab = 'rgb(140,30,80)';
            colors.dpad = 'rgb(0,0,0)';
            colors.shell = 'rgb(190,190,190)';
            colors.face = 'rgb(88,88,100)';
            colors.detail = 'rgb(200,200,200)';
            colors.battery = 'rgb(40,40,40)';
            colors.line1 = 'rgb(140,30,80)';
            colors.line2 = 'rgb(20,30,120)';
            colors.screen = 'rgb(80,100,20)';
        },
        /**
         * Sets the color codes to some crazy rainbow colors
         **/
        rainbow : function () {
            colors.ab = 'rgb(255,0,0)';
            colors.dpad = 'rgb(255,0,255)';
            colors.shell = 'rgb(0,255,255)';
            colors.face = 'rgb(0,255,0)';
            colors.detail = 'rgb(0,0,255)';
            colors.battery = 'rgb(0,0,255)';
            colors.line1 = 'rgb(255,255,255)';
            colors.line2 = 'rgb(0,0,0)';
            colors.screen = 'rgb(255,255,0)';
        }
    };

    shapes = {
        /**
         * Draws a rectangle in the shape of the gameboy console.
         * It's fairly unique in that the lower right corner has a large curve.
         * All other corners have a small curve.
         * @param {String} color RGB color string 'rgb(0,0,0)'
         * @param {Number} x X position to start drawing top left corner
         * @param {Number} y Y position to start drawing top left corner
         * @param {Number} w Width of the rect
         * @param {Number} h Height of the rect
         * @param {Number} sc Size of the small corners
         * @param {Number} bc Size of the lower right large corner
         **/
        unique : function (color, x, y, w, h, sc, bc) {
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
        },

        /**
         * Draws a stadium, a rectangle with curved ends.
         * The height represents the size of the sides that will be curved.
         * Which means the width will almost always be the longest dimension.
         * If you want the opposite to that, specify an angle of 90
         * @param {String} color RGB color string 'rgb(0,0,0)'
         * @param {Number} cx X position of the centre of the rect
         * @param {Number} cy Y position of the centre of the rect
         * @param {Number} w Width of the rect
         * @param {Number} h Height of the rect
         * @param {Number} a The angle of the rect
         **/
        stadium : function (color, cx, cy, w, h, a) {
            // x,y is set to top left of rect after curve to begin pathing
            // r is angle converted to radians which is what rotate accepts
            var x = cx + h - w * 0.5,
                y = cy - h * 0.5,
                r = (Math.PI / 180) * a;

            actions.rotate(cx, cy, r);
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + w - h, y);
            context.bezierCurveTo(x + w, y, x + w, y + h, x + w - h, y + h);
            context.lineTo(x, y + h);
            context.bezierCurveTo(x - h, y + h, x - h, y, x, y);
            context.closePath();
            context.fillStyle = color;
            context.fill();
            actions.rotate(cx, cy, -r);
        },

        /**
         * Draws a rectellipse, a rectangle with smoothed corners.
         * @param {String} color RGB color string 'rgb(0,0,0)'
         * @param {Number} cx X position of the centre of the rect
         * @param {Number} cy Y position of the centre of the rect
         * @param {Number} w Width of the rect
         * @param {Number} h Height of the rect
         * @param {Number} cs Curve size, size of rounded edges
         * @param {Number} a Angle of the rect
         **/
        rectellipse : function (color, cx, cy, w, h, sc, a) {
            // x,y is set to top left of rect (0,0)
            // r is angle converted to radians which is what rotate accepts
            var x = cx - w * 0.5,
                y = cy - h * 0.5,
                r = (Math.PI / 180) * a;

            actions.rotate(cx, cy, r);
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
            actions.rotate(cx, cy, -r);
        },

        /**
         * Draws circle at specified location
         * @param {String} color RGB color string 'rgb(0,0,0)'
         * @param {Number} x X position of the centre of the circle
         * @param {Number} y Y position of the centre of the circle
         * @param {Number} r Radius of circle
         **/
        circle : function (color, x, y, r) {
            context.beginPath();
            context.arc(x, y, r, 0, Math.PI * 2);
            context.closePath();
            context.fillStyle = color;
            context.fill();
        },

        /**
         * Draws a line between two locations
         * @param {String} color RGB color string 'rgb(0,0,0)'
         * @param {Number} sx X position of the start of the line
         * @param {Number} sy Y position of the start of the line
         * @param {Number} ex X position of the end of the line
         * @param {Number} ey Y position of the end of the line
         * @param {Number} w Width or thickness of the line
         **/
        line : function (color, sx, sy, ex, ey, w) {
            context.beginPath();
            context.moveTo(sx, sy);
            context.lineTo(ex, ey);
            context.closePath();
            context.lineWidth = w;
            context.strokeStyle = color;
            context.stroke();
        },

        /**
         * Draws a triangle at the specified location
         * @param {String} color RGB color string 'rgb(0,0,0)'
         * @param {Number} cx X position of the center of the triangle
         * @param {Number} cy Y position of the center of the triangle
         * @param {Number} w Width or length of one side
         * @param {Number} a Angle of the triangle
         **/
        triangle : function (color, cx, cy, w, a) {
            var x = cx - w / 2,
                y = cy + w / 2,
                r = (Math.PI / 180) * a;

            actions.rotate(cx, cy, r);
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + w, y);
            context.lineTo(x + w / 2, y - w);
            context.lineTo(x, y);
            context.closePath();
            context.fillStyle = color;
            context.fill();
            actions.rotate(cx, cy, -r);
        }
    };

    /**
     * Main function to draw the various shapes to the canvas.
     *
     * Coordinates are entered in manually rather then relying on relative
     * positions. This makes it easier to make small adjustments.
     **/
    draw = function () {
        // console
        shapes.unique(colors.shell, 0, 0, 360, 592, 10, 70);

        // screen background
        shapes.unique(colors.face, 30, 50, 300, 230, 10, 40);

        // screen
        context.fillStyle = colors.screen;
        context.fillRect(85, 80, 190, 170);

        // dpad
        shapes.rectellipse(colors.dpad, 75, 400, 90, 30, 6, 0);
        shapes.rectellipse(colors.dpad, 75, 400, 90, 30, 6, 90);

        // a and b buttons
        shapes.circle(colors.ab, 250, 400, 20);
        shapes.circle(colors.ab, 310, 380, 20);

        // start and select
        shapes.stadium(colors.face, 130, 490, 40, 15, 337.5);
        shapes.stadium(colors.face, 190, 490, 40, 15, 337.5);

        // grill
        shapes.stadium(colors.detail, 255, 555, 50, 5, 67.5);
        shapes.stadium(colors.detail, 270, 547.5, 50, 5, 67.5);
        shapes.stadium(colors.detail, 285, 540, 50, 5, 67.5);
        shapes.stadium(colors.detail, 300, 532.5, 50, 5, 67.5);
        shapes.stadium(colors.detail, 315, 525, 50, 5, 67.5);
        shapes.stadium(colors.detail, 330, 517.5, 50, 5, 67.5);

        // battery light
        shapes.circle(colors.battery, 55, 140, 5);

        // headphone detail
        shapes.stadium(colors.detail, 160, 575, 40, 15, 0);
        shapes.line(colors.detail, 165, 575, 165, 592, 3);
        shapes.line(colors.detail, 172, 575, 172, 592, 3);
        shapes.line(colors.detail, 179, 575, 179, 592, 3);

        // on off detail
        shapes.stadium(colors.detail, 80, 15, 50, 15, 0);
        shapes.line(colors.detail, 70, 15, 70, 0, 3);
        shapes.line(colors.detail, 77, 15, 77, 0, 3);
        shapes.line(colors.detail, 84, 15, 84, 0, 3);

        // lines at top of console
        shapes.line(colors.detail, 0, 30, 360, 30, 3);
        shapes.line(colors.detail, 30, 0, 30, 30, 3);
        shapes.line(colors.detail, 330, 0, 330, 30, 3);

        // lines on the screen face
        shapes.line(colors.line1, 40, 60, 320, 60, 3);
        shapes.line(colors.line2, 40, 65, 320, 65, 3);

        // small triangle details around dpad
        shapes.triangle(colors.detail, 75, 350, 7, 0);
        shapes.triangle(colors.detail, 25, 400, 7, 270);
        shapes.triangle(colors.detail, 125, 400, 7, 90);
        shapes.triangle(colors.detail, 75, 450, 7, 180);
    };

    /**
     * The event handler for the color changing elements.
     * Calls the relevant color changing function based on who called it.
     * Then once the colors are set, it can redraw.
     * @param {Object} e Event object
     **/
    update = function (e) {
        console.log(e);

        if (e.currentTarget.id === 'bw') {
            colors.bw();
        } else if (e.currentTarget.id === 'standard') {
            colors.standard();
        } else if (e.currentTarget.id === 'mono') {
            colors.mono();
        } else if (e.currentTarget.id === 'rainbow') {
            colors.rainbow();
        }

        draw();
    };

    /**
     * Initial setup.
     * Grab the canvas, context, setup event handlers and set the default
     * color codes. Then call the draw function to draw shapes to the canvas.
     **/
    init = function () {
        var i,
            switches;

        canvas = document.getElementById('gameboy');
        context = canvas.getContext('2d');
        colors.standard();

        switches = document.getElementsByClassName('switch');

        for (i = 0; i < switches.length; i += 1) {
            switches[i].addEventListener("click", update, false);
        }

        draw();
    };

    init();
}());
