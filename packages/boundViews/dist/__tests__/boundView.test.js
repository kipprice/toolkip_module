"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_async_1 = require("@kipprice/toolkip-async");
const simpleview_1 = require("./classes/simpleview");
const complexView_1 = require("./classes/complexView");
const composableView_1 = require("./classes/composableView");
describe("bound view", () => {
    setupMatchMedia();
    it("creates a simple bound view", () => {
        const simpleView = new simpleview_1.SimpleBoundView();
        expect(simpleView.elems.name.innerHTML).toBeFalsy();
    });
    it("updates basic data", () => __awaiter(void 0, void 0, void 0, function* () {
        const simpleView = new simpleview_1.SimpleBoundView();
        simpleView.model = { name: "Kip", count: 0 };
        yield toolkip_async_1.nextRender();
        expect(simpleView.elems.name.innerHTML).toEqual("Kip");
    }));
    it("doesn't update when instructed to skip", () => __awaiter(void 0, void 0, void 0, function* () {
        const simpleView = new simpleview_1.SimpleBoundView(true);
        simpleView.model = { name: "Kip", count: 0 };
        yield toolkip_async_1.nextRender();
        expect(simpleView.elems.name.innerHTML).not.toEqual("Kip");
    }));
    it("updates with custom functions", () => __awaiter(void 0, void 0, void 0, function* () {
        const simpleView = new simpleview_1.SimpleBoundView();
        simpleView.model = { name: "Kip", count: 0 };
        yield toolkip_async_1.nextRender();
        expect(simpleView.elems.count.innerHTML).toEqual("Total: " + 0);
    }));
    it("creates a nested bound view", () => __awaiter(void 0, void 0, void 0, function* () {
        const complexView = new complexView_1.ComplexBoundView();
        complexView.model = {
            childArray: [],
            childDict: {},
            coreChild: { name: "Kip", count: 0 }
        };
        // need a render per layer that's being updated
        yield toolkip_async_1.nextRender();
        yield toolkip_async_1.nextRender();
        // verify that the child view got updated
        const childView = complexView.elems.coreChild;
        expect(childView).toBeInstanceOf(simpleview_1.SimpleBoundView);
        expect(childView.base).toBeInstanceOf(HTMLDivElement);
        expect(childView.base.childElementCount).toEqual(2);
        expect(childView.elems.name.innerHTML).toEqual("Kip");
    }));
    it("creates an array of nested views", () => __awaiter(void 0, void 0, void 0, function* () {
        const complexView = new complexView_1.ComplexBoundView();
        complexView.model = {
            childArray: [
                { name: "c1", count: 1 },
                { name: "c2", count: 2 }
            ],
            childDict: {},
            coreChild: { name: "Kip", count: 0 }
        };
        // need a render per layer that's being updated
        yield toolkip_async_1.nextRender();
        yield toolkip_async_1.nextRender();
        const childView = complexView.elems.childArray;
        expect(childView).toBeInstanceOf(HTMLElement);
        expect(childView.childElementCount).toEqual(2);
        const grandChildView = childView.children[0];
        expect(grandChildView.childElementCount).toEqual(2);
        expect(grandChildView.children[0].innerHTML).toEqual("c1");
        expect(grandChildView.children[1].innerHTML).toEqual("Total: 1");
    }));
    it("creates dict of nested views", () => __awaiter(void 0, void 0, void 0, function* () {
        const complexView = new complexView_1.ComplexBoundView();
        complexView.model = {
            childArray: [],
            childDict: {
                c1: { name: "c1", count: 1 },
                c2: { name: "c2", count: 2 }
            },
            coreChild: { name: "Kip", count: 0 }
        };
        // need a render per layer that's being updated
        yield toolkip_async_1.nextRender();
        yield toolkip_async_1.nextRender();
        const childView = complexView.elems.childDict;
        expect(childView).toBeInstanceOf(HTMLElement);
        expect(childView.childElementCount).toEqual(2);
        const grandChildView = childView.children[0];
        expect(grandChildView.childElementCount).toEqual(2);
        expect(grandChildView.children[0].innerHTML).toEqual("c1");
        expect(grandChildView.children[1].innerHTML).toEqual("Total: 1");
    }));
});
describe("composable bound view", () => {
    it("creates a composed bound view", () => __awaiter(void 0, void 0, void 0, function* () {
        const elems = {};
        const composed = new composableView_1.ComposableView({
            cls: "base",
            children: [
                { key: "name", bindTo: "name" },
                { bindTo: "count" }
            ]
        }, elems);
        expect(elems.base).toBeTruthy();
        expect(elems.base.childElementCount).toEqual(2);
        expect(elems.name).toBeTruthy();
        expect(elems.count).toBeFalsy();
        composed.model = {
            name: "kip",
            count: 21
        };
        yield toolkip_async_1.nextRender();
        yield toolkip_async_1.nextRender();
        expect(elems.name.innerHTML).toEqual("kip");
    }));
    it("creates a nested composed view", () => __awaiter(void 0, void 0, void 0, function* () {
        const elems = {};
        const composed = new composableView_1.ComposableView({
            children: [
                { key: "core", bindTo: "coreChild", drawable: () => new composableView_1.ComposableView({
                        children: [
                            { bindTo: "name" },
                            { bindTo: "count", key: "count" }
                        ]
                    }) },
                { bindTo: "childArray", key: "array" },
                { bindTo: "childDict" }
            ]
        }, elems);
        expect(elems.core).toBeTruthy();
        expect(elems.core.base.childElementCount).toEqual(2);
        composed.model = {
            coreChild: {
                name: "abc",
                count: -1
            },
            childArray: [],
            childDict: {}
        };
        yield toolkip_async_1.nextRender();
        yield toolkip_async_1.nextRender();
        const countElem = elems.core.elems.count;
        expect(countElem.innerHTML).toEqual("-1");
    }));
});
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
