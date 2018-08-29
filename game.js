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
 * http://users.wpi.edu/~bmoriarty/ps/api.html\
 */


/**
 * Sand contains gameplay specific functions and variables for sand particles
 */
var Sand = {
    // possible colors for the sand
    Color_Default: 0xfff,
    // other colors

    // Keep track of all active sand particles
    dropsX: [],
    dropsY: [],

    // FUNCTIONS
    /**
     * Stop particles from moving when they hit the bottom of the available grid
     */
    sandStop: function (x, y) {
        // Remove sand from array once hit bottom of available grid
    },

    tick: function () {
        var len,    // amount of current active particles
            i,      // Current index of particle array
            x, y;   // X and Y position for current particle

        len = Sand.dropsX.length;

        // Loop through each active particle, set position or stop it
        while (i < len) {
            // Get current active particle

            // Check if bead is at the bottom row

            // Check if bead is at bottom of currently available grid
                // Check if bead is allowed to move left or right
                    // Check for both and randomly move
                    // Check individually and move to that side
                // If not, stop
        }
    }
};

/**
 * Meta contains information for the game window and definitions
 */
var Meta = {
    GRID_WIDTH: 50,
    GRID_HEIGHT: 50,

    BG_COLOR: 0xFFFFFF,

    BOTTOM_ROW: 49,

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

