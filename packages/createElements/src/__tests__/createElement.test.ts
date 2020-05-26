import { createElement } from "..";
import { IDrawable } from "@toolkip/shared-types";
import { StandardElement } from "@toolkip/shared-types";
import { MObject, select } from '@toolkip/model';

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

describe('selectable testing', () => {
    interface ISimpleModel { name: string, age: number }

    const setupModel = () => {
        const model = new MObject<ISimpleModel>({ name: 'Big Bird', age: 11 });
        return model;
    }

    const setupStringSelector = (model: MObject<ISimpleModel>) => {
        const selector = select<ISimpleModel, string>(
            model, 
            (data: ISimpleModel) => data.name && data.name.replace(" ", "_")
        )
        return selector;
    }
    it('allows for selectors to be set as IDs', () => {
        const model = setupModel();
        const selector = setupStringSelector(model);

        const elem = createElement({
            id: selector
        });

        expect(elem.id).toEqual('Big_Bird');
        model.set('name', 'Oscar');
        expect(elem.id).toEqual('Oscar');
    })

    it('allows for selectors to be set as class names', () => {
        const model = setupModel();
        const selector = setupStringSelector(model);

        const elem = createElement({
            cls: selector
        })

        expect(elem.className).toEqual('Big_Bird');
        model.set('name', 'Oscar');
        expect(elem.className).toEqual('Oscar');
    })

    it('allows for selectors to be set as content items', () => {
        const model = setupModel();
        const selector = setupStringSelector(model);

        const elem = createElement({
            content: selector
        })

        expect(elem.innerHTML).toEqual('Big_Bird');
        model.set('name', 'Oscar');
        expect(elem.innerHTML).toEqual('Oscar');
    })

    it('allows for attributes to be set as content items', () => {
        const model = setupModel();
        const selector = select<ISimpleModel, string>(model, (m) => `https://google.com/${m.age}` );

        const elem = createElement({
            type: 'a',
            attr: { 'href': selector }
        })

        expect(elem.getAttribute('href')).toEqual('https://google.com/11');
        model.set('age', 8);
        expect(elem.getAttribute('href')).toEqual('https://google.com/8');
    })
});

class FakeDrawable implements IDrawable {
    public draw() { return null; }
    public erase() { return null; }
    public base: StandardElement = null;
}