"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * wait
 * ----------------------------------------------------------------------------
 * Set a timeout and resolve a promise when the timeout is done
 * @param   timeInMs    Time to wait before executing the
 */
function wait(timeInMs) {
    return new Promise(resolve => window.setTimeout(resolve, timeInMs));
}
exports.wait = wait;
/**
 * onNextRender
 * ----------------------------------------------------------------------------
 * Run some code the next time the screen is rendering
 */
function nextRender() {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            resolve();
        });
    });
}
exports.nextRender = nextRender;
