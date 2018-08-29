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
    Color_Default: 0xfff,
    Drop_Color: 0xeee,
    // other colors

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
        PS.color(x, y, Sand.Drop_Color);

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
            left, right;    // Left and Right side of the particle

        len = Sand.dropsX.length;

        // Loop through each active particle, set position or stop it
        i = 0;
        while (i < len) {
            // Get current active particle
            x = Sand.dropsX[i];
            y = Sand.dropsY[i];

            // Check if bead is at the bottom row
            if (y < Meta.BOTTOM_ROW) {
                // Check if bead is at bottom of currently available grid
                if (PS.color(x, y + 1) !== PS.DEFAULT) {
                    // Check if bead is allowed to move left or right
                    left = x - 1;
                    right = x + 1;

                    // Check for both and randomly move
                    if (Sand.checkAvailableSide(left, y) &&
                    Sand.checkAvailableSide(right, y)) {
                        // Random move
                        //clear current particle
                        // pick random number (-1, 1) and add to x
                        // change color of new particle
                    // Check individually and move to that side
                    } else if (Sand.checkAvailableSide(left, y)) {
                        //Move to left
                        //clear current particle
                        //decrement x by 1
                        //change color of new particle
                    } else if (Sand.checkAvailableSide(right, y)) {
                        // Move to right
                        //clear current particle
                        //increment x by 1
                        //change color of new particle

                    } else { // If not, stop
                        
                    }               
                } else { // Continue to drop particle

                }
            }

        }
    },

    /**
     * Check to one side of particle to see if it is available to move to that side
     * @param {number} side The left or right side x value of the current particle
     * @param {number} y The y value of the current particle
     */
    checkAvailableSide: function (side, y) {
        return (side < Meta.RIGHT_SIDE && side > Meta.LEFT_SIDE &&
                y < Meta.BOTTOM_ROW &&
                PS.color(side, y - 1) === PS.DEFAULT &&
                PS.color(side, y) === PS.DEFAULT &&
                PS.color(side, y + 1) === PS.DEFAULT);
    }
};

/**
 * Meta contains information for the game window and definitions
 */
var Meta = {
    // Size of the grid
    GRID_WIDTH: 50,
    GRID_HEIGHT: 50,

    // Color of the grid
    BG_COLOR: 0xFFFFFF,

    // Constraints of the grid
    BOTTOM_ROW: 49,
    LEFT_SIDE: 0,
    RIGHT_SIDE: 49,

    // How fast the toy runs
    FRAME_RATE: 30
};

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
[system] = an object containing engine and platform information; see API documentation for details.
[options] = an object with optional parameters; see API documentation for details.
*/
PS.init = function (system, options) {
    // Verify function is being called
    PS.debug("PS.init() called\n");

    // Set grid size
    // Call first to avoid issues
    PS.gridSize(8, 8);

    // Display message above grid
    PS.statusText("Game");

    // Other initialization code
    // ...
};

