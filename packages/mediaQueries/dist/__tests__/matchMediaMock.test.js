"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// taken from this stack overflow post:
// https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
function setupMatchMedia() {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
}
exports.setupMatchMedia = setupMatchMedia;
describe('mediaQueries', () => {
    it('has a simple test', () => {
    });
});
