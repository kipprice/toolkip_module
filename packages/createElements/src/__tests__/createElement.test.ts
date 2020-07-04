import { createElement, IChild, createElements } from "..";
import { IDrawable } from "@toolkip/shared-types";
import { StandardElement } from "@toolkip/shared-types";
import { StyleLibrary } from '@toolkip/style-libraries';

describe('basic element creation', () => {
    it('creates a basic div', () => {
        const elem = createElement({ type: "div" });
        expect (elem.tagName).toEqual("DIV")
    })

    it('creates multiple basic elements', () => {
        const [ first, second ] = createElements([ { id: 'one' }, { id: 'two' } ]);
        expect(first.id).toEqual('one');
        expect(second.id).toEqual('two');
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

    it('creates a set of styles', () => {
        createElement({ styles: { '.cls': { fontSize: '10pt' } }});
        const result = StyleLibrary.get('create_elements');
        expect(result).toMatchObject({ '.cls': { fontSize: '10pt' }})
    })

    it('creates a set of styles even when provided in the cls field', () => {
        createElement({ cls: { 
            name: 'other', 
            styles: { '.other': { fontSize: '5pt' } } 
        }});
        const result = StyleLibrary.get('create_elements');
        expect(result).toMatchObject({ '.other': { fontSize: '5pt' }})
    })

    it('creates an element with the specified content', () => {
        const elem = createElement({ content: 'test content' });
        expect(elem.innerHTML).toEqual('test content');

        const elem2 = createElement({ innerText: 'innertext' });
        expect(elem2.innerText).toEqual('innertext');
    })

    it('creates an element with the specified attribute', () => {
        const elem = createElement({
            type: 'a',
            attr: { 
                'href': 'https://kipprice.com'
            }
        });
        expect(elem.getAttribute('href')).toEqual('https://kipprice.com');
    })

    it('creates an element with a child element', () => {
        const elem = createElement({ id: 'parent', children: [ { id: 'child'} ] });
        expect(elem.id).toEqual('parent');
        expect(elem.children.length).toEqual(1);
        expect(elem.children[0].id).toEqual('child');
    })

    it('allows nesting child elements via nested arrays', () => {
        const elem = createElement({
            id: 'parent',
            children: [
                [ { id: 'childA' } ],
                [ { id: 'childB' }, { id: 'childC' } ]
            ]
        });
        expect(elem.id).toEqual('parent');
        expect(elem.children.length).toEqual(3);
        expect(elem.children[0].id).toEqual('childA');
        expect(elem.children[1].id).toEqual('childB');
        expect(elem.children[2].id).toEqual('childC');
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