import { MObject, select } from '@toolkip/model';
import { IIdentifiable } from '../../../identifiable/typings';
import { createElement, IChild } from '..';

describe('create element with selectors', () => {
    interface ISimpleModel { name: string, age: number }
    interface IComplexModel { models: (ISimpleModel & IIdentifiable)[] }

    const setupModel = (data: ISimpleModel = { name: 'Big Bird', age: 11 }) => {
        const model = new MObject<ISimpleModel>(data);
        return model;
    }

    const setupComplexModel = (data?: IComplexModel) => {
        if (!data)  { data = {
            models: [
                { id: '1', name: 'Big Bird', age: 11 },
                { id: '2', name: 'Oscar', age: 45 }
            ]
        }}
        const model = new MObject<IComplexModel>(data);
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

    it('allows for a generic selector', () => {
        const model = setupModel();
        const selector = setupStringSelector(model);

        const elem = createElement({
            selector: {
                selector, 
                applyCb: ({ value }, elem) => {
                    if (value.indexOf('_') !== -1) {
                        elem.style.backgroundColor = 'rgb(50, 50, 50)';
                    } else {
                        elem.style.backgroundColor = 'rgb(100, 100, 100)';
                    }
                }
            }
        });

        expect(elem.style.backgroundColor).toEqual('rgb(50, 50, 50)');
        model.set('name', 'Oscar');
        expect(elem.style.backgroundColor).toEqual('rgb(100, 100, 100)');
    })

    it('allows for mapped selectors', () => {
        
        const model = setupComplexModel();
        const selector = select<IComplexModel>(model, (d) => d.models)
                            .mapSelect<IChild<any>>((m) => { return { content: m.name }});
        
        const elem = createElement({
            children: selector
        });

        expect(elem.children).toHaveLength(2);
        expect(elem.children[0].innerHTML).toEqual('Big Bird');
        expect(elem.children[1].innerHTML).toEqual('Oscar');

    })

    it('allows for children defined by selectors', () => {
        const model = setupComplexModel();
        const selector = select<IComplexModel>(model, (d) => d.models)
                            .mapSelect<IChild<any>>((m) => { return { content: m.name }});
        
        const elem = createElement({
            children: [
                { content: 'top' },
                selector,
                { content: 'bottom' }
            ]
        });

        expect(elem.children).toHaveLength(4);
        expect(elem.children[0].innerHTML).toEqual('top');
        expect(elem.children[1].innerHTML).toEqual('Big Bird');
        expect(elem.children[2].innerHTML).toEqual('Oscar');
        expect(elem.children[3].innerHTML).toEqual('bottom');
    })

    it('handles an empty children array', () => {
        const model = setupComplexModel({ models: [] });
        const selector = select<IComplexModel>(model, (d) => d.models)
                            .mapSelect<IChild<any>>((m) => { return { content: m.name } });

        const elem = createElement({
            children: [
                { content: 'top' },
                selector,
                { content: 'bottom' }
            ]
        });

        expect(elem.children).toHaveLength(2);
        expect(elem.children[0].innerHTML).toEqual('top');
        expect(elem.children[1].innerHTML).toEqual('bottom');
    })
})