"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe('basic element creation', () => {
    it('creates a basic div', () => {
        const elem = __1.createElement({ type: "div" });
        expect(elem.tagName).toEqual("DIV");
    });
    it('creates an element with a specific id', () => {
        const elem = __1.createElement({ id: "sample" });
        expect(elem.id).toEqual("sample");
    });
    it('creates an element with a specific class name', () => {
        const elem = __1.createElement({ cls: 'hello' });
        expect(elem.className).toEqual('hello');
    });
    it('creates an element with several classnames', () => {
        const elem = __1.createElement({ cls: ['hello', 'world'] });
        expect(elem.className).toEqual('hello world');
    });
    it('creates an element with a child element', () => {
        const elem = __1.createElement({ id: 'parent', children: [{ id: 'child' }] });
        expect(elem.id).toEqual('parent');
        expect(elem.children.length).toEqual(1);
        expect(elem.children[0].id).toEqual('child');
    });
    it('populates an object with keys', () => {
        const obj = { parent: null, child: null };
        __1.createElement({ key: 'parent', children: [{ id: 'child', key: 'child' }] }, obj);
        expect(obj.parent).toBeTruthy();
        expect(obj.parent.id).toBeFalsy();
        expect(obj.child).toBeTruthy();
        expect(obj.child.id).toEqual('child');
    });
    it('creates a drawable when requested', () => {
        const obj = { drw: null };
        __1.createElement({ key: 'drw', drawable: FakeDrawable }, obj);
        expect(obj.drw).toBeTruthy();
        expect(obj.drw.draw).toBeTruthy();
    });
    it('creates an event listener', () => {
        let clicked = false;
        const onClick = () => {
            clicked = true;
        };
        const elem = __1.createElement({ eventListeners: { click: onClick } });
        elem.click();
        expect(clicked).toBeTruthy();
    });
});
class FakeDrawable {
    constructor() {
        this.base = null;
    }
    draw() { return null; }
    erase() { return null; }
}
