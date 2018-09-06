// game.js for Perlenspiel 3.2

// jslint and jshint options
/*jslint*/
/*jshint -W097*/ // Removes check that "use strict" is only inside functions instead of globally
/*global PS*/
/* node: true, nomen: true, white: true */

"use strict";
/*
 * Use strict is important, DO NOT REMOVE!!!
 * Any of the functions may be taken out if they are not used
 * All of the debugs may be taken out
 * Comments above functions describe what functions and parameters are used for
 */

/*
 * All additional functions and their uses/parameters can be found at:
 * http://users.wpi.edu/~bmoriarty/ps/api.html
 */


/**
 * Sand contains gameplay specific functions and variables for sand particles
 */
var Sand = {
    // possible colors for the sand
    // each one 4 spaces
    Color_Default: 0xefefef,
    Color_Current: 0xfff,
    Color_Yellow: 0xdbd848,
    Color_Blue: 0x1ac6ff,
    Color_Pink: 0xff66ff,
    Color_Orange: 0xff9933,
    Color_Green: 0x00e600,
    Color_White: 0xf2f2f2,
    Color_Black: 0x1a1a1a,
    Color_Brown: 0x7b481e,

    // Used to continuously add particles to grid
    dragging: false,

    // Keep track of all active sand particles
    dropsX: [],
    dropsY: [],

    // FUNCTIONS
    /**
     * Stop particles from moving when they hit the bottom of the available grid
     * @param {number} x The x position of the particle
     * @param {number} y The y position of the particle
     * @param {number} i The index of the particle in the array
     */
    sandStop: function (x, y, i) {
        // Remove sand from array once hit bottom of available grid
        Sand.dropsX.splice(i, 1);
        Sand.dropsY.splice(i, 1);
    },

    /**
     * Update the acive sand particles every frame
     */
    tick: function () {
        var len,    // amount of current active particles
            i,      // Current index of particle array
            x, y,   // X and Y position for current particle
            left, right, // Left and Right side of the particle
            rand,   // Used to randomly move particle left or right
            color;  // Color of the currently falling particle

        len = Sand.dropsX.length;

        // Loop through each active particle, set position or stop it
        i = 0;
        while (i < len) {
            // Get current active particle
            x = Sand.dropsX[i];
            y = Sand.dropsY[i];

            // Get color of active particle
            color = PS.color(x, y);

            // Check if bead is at the bottom row
            if (y < Meta.BOTTOM_ROW) {
                // Check if bead is at bottom of currently available grid
                if (PS.color(x, y + 1) !== Sand.Color_Default) {
                    // Check if bead is allowed to move left or right
                    left = x - 1;
                    right = x + 1;

                    // Check for both and randomly move
                    if (Sand.checkAvailableSide(left, y) &&
                    Sand.checkAvailableSide(right, y)) {
                        // Random move
                        // clear current particle
                        PS.color(x, y, Sand.Color_Default);

                        // pick random number (0, 1), add to x and save it in array
                        rand = Math.floor(Math.random() * 2);
                        x += rand == 1 ? 1 : -1;
                        Sand.dropsX[i] = x;
                        i += 1;

                        // change color of new particle
                        PS.color(x, y, color);

                    // Check individually and move to that side
                    } else if (Sand.checkAvailableSide(left, y)) {
                        //Move to left
                        //clear current particle
                        PS.color(x, y, Sand.Color_Default);

                        //decrement x by 1 and save it in array
                        x -= 1;
                        Sand.dropsX[i] = x;
                        i += 1;

                        //change color of new particle
                        PS.color(x, y, color);

                    } else if (Sand.checkAvailableSide(right, y)) {
                        // Move to right
                        //clear current particle
                        PS.color(x, y, Sand.Color_Default);

                        //increment x by 1 and save it in array
                        x += 1;
                        Sand.dropsX[i] = x;
                        i += 1;

                        //change color of new particle
                        PS.color(x, y, color);

                    } else { // Bottom available row, stop particle
                        Sand.sandStop(x, y, i);
                        len -= 1;
                    }
                } else { // Continue to drop particle
                    //clear current particle
                    PS.color(x, y, Sand.Color_Default);
                    
                    //increment y by 1 and save it in array
                    y += 1;
                    Sand.dropsY[i] = y;

                    //change color of new particle
                    PS.color(x, y, color);

                    //move to next index
                    i += 1;
                }
            } else { // Bottom row, stop particle
                Sand.sandStop(x, y, i);
                len -= 1;
            }
        }
    },

    /**
     * Check to one side of particle to see if it is available to move to that side
     * @param {number} side The left or right side x value of the current particle
     * @param {number} y The y value of the current particle
     */
    checkAvailableSide: function (side, y) {
        return (side < Meta.RIGHT_SIDE && side >= 0 &&
                y < Meta.BOTTOM_ROW &&
                (y === 0 || PS.color(side, y - 1) === Sand.Color_Default) &&
                PS.color(side, y) === Sand.Color_Default &&
                PS.color(side, y + 1) === Sand.Color_Default);
    }
};

/**
 * Meta contains information for the game window and definitions
 */
var Meta = {
    // Size of the grid
    GRID_WIDTH: 32,
    GRID_HEIGHT: 32,

    // Color of the grid
    BG_COLOR: 0xFFFFFF,

    // Constraints of the grid
    BOTTOM_ROW: 0,
    LEFT_SIDE: 0,
    RIGHT_SIDE: 0,

    // How fast the toy runs
    FRAME_RATE: 1,

    // Location for palette
    PALETTE_ROW: 0
};

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
[system] = an object containing engine and platform information; see API documentation for details.
[options] = an object with optional parameters; see API documentation for details.
*/
PS.init = function (system, options) {
    // Set grid size
    // Call first to avoid issues
    PS.gridSize(Meta.GRID_WIDTH, Meta.GRID_HEIGHT);

    // Display message above grid
    PS.statusText("Sand Drop");

    // Hide all borders
    PS.border(PS.ALL, PS.ALL, 0);

    // Set all beads to background color
    PS.color(PS.ALL, PS.ALL, Sand.Color_Default);

    // Start animation timer
    PS.timerStart(Meta.FRAME_RATE, Sand.tick);

    // Set Meta information
    Meta.BOTTOM_ROW = Meta.GRID_HEIGHT - 2;
    Meta.RIGHT_SIDE = Meta.GRID_WIDTH;
    Meta.PALETTE_ROW = Meta.GRID_HEIGHT - 1;

    // Initialize variables for Sand
    Sand.Color_Current = Sand.Color_Yellow;
    Sand.dragging = false;

    // Create color palette for sand
    CreatePalette();
};

PS.touch = function (x, y, data, options) {
    Sand.dragging = true;
    OnClick(x, y);
};

PS.release = function (x, y, data, options) {
    Sand.dragging = false;
};

PS.enter = function (x, y, data, options) {
    if(Sand.dragging === true) {
        CreateParticle(x, y);
    }
};

function CreatePalette() {
    var i = 0;

    for (i = 0; i < 4; ++i)
        PS.color(i, Meta.PALETTE_ROW, Sand.Color_Yellow);
    
    for (; i < 8; ++i)
        PS.color(i, Meta.PALETTE_ROW, Sand.Color_Blue);

    for (; i < 12; ++i)
        PS.color(i, Meta.PALETTE_ROW, Sand.Color_Pink);

    for (; i < 16; ++i)
        PS.color(i, Meta.PALETTE_ROW, Sand.Color_Orange);

    for (; i < 20; ++i)
        PS.color(i, Meta.PALETTE_ROW, Sand.Color_Green);

    for (; i < 24; ++i)
        PS.color(i, Meta.PALETTE_ROW, Sand.Color_White);

    for (; i < 28; ++i)
        PS.color(i, Meta.PALETTE_ROW, Sand.Color_Black);

    for (; i < 32; ++i)
        PS.color(i, Meta.PALETTE_ROW, Sand.Color_Brown);
}

function OnClick(x, y) {
    if (y >= Meta.PALETTE_ROW) {
        ChangeColor(x);
    } else {
        CreateParticle(x, y);
    }
}

function CreateParticle(x, y) {
    if (PS.color(x, y) !== Sand.Color_Default || y >= Meta.PALETTE_ROW) return;
    PS.color(x, y, Sand.Color_Current);
    Sand.dropsX.push(x);
    Sand.dropsY.push(y);
}

function ChangeColor(x) {
    Sand.Color_Current = PS.color(x, Meta.PALETTE_ROW);
}