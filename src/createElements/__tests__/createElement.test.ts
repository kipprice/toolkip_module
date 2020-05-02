import { createElement } from "..";
import { IDrawable } from "../../shared";
import { StandardElement } from "../../shared";

describe('basic element creation', () => {
    it('creates a basic div', () => {
        const elem = createElement({ type: "div" });
        expect (elem.tagName).toEqual("DIV")
    })

    it('creates an element with a specific id', () => {
        const elem = createElement({ id: "sample" });
        expect(elem.id).toEqual("sample");
    })

    it('creates an element with a specific class name', () => {
        const elem = createElement({ cls: 'hello' });
        expect(elem.className).toEqual('hello');
    })

    it('creates an element with several classnames', () => {
        const elem = createElement({ cls: ['hello', 'world'] });
        expect(elem.className).toEqual('hello world');
    })

    it('creates an element with a child element', () => {
        const elem = createElement({ id: 'parent', children: [ { id: 'child'} ] });
        expect(elem.id).toEqual('parent');
        expect(elem.children.length).toEqual(1);
        expect(elem.children[0].id).toEqual('child');
    })

    it('populates an object with keys', () => {
        const obj = { parent: null, child: null };
        createElement(
            { key: 'parent', children: [{ id: 'child', key: 'child' }]},
            obj
        );

        expect(obj.parent).toBeTruthy();
        expect(obj.parent.id).toBeFalsy();
        expect(obj.child).toBeTruthy();
        expect(obj.child.id).toEqual('child');
    })

    it('creates a drawable when requested', () => {
        const obj = { drw: null }
        createElement(
            { key: 'drw', drawable: FakeDrawable },
            obj
        )
        expect(obj.drw).toBeTruthy();
        expect(obj.drw.draw).toBeTruthy();
    })

    it('creates an event listener', () => {
        let clicked = false; 
        const onClick = () => {
            clicked = true;
        }
        const elem = createElement({ eventListeners: { click: onClick }});
        elem.click();
        expect(clicked).toBeTruthy();
    })
})

class FakeDrawable implements IDrawable {
    public draw() { return null; }
    public erase() { return null; }
    public base: StandardElement = null;
}