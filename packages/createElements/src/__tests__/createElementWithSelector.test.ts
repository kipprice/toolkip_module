import { MObject, select, Selector, ISelector } from '@toolkip/model';
import { IIdentifiable } from '../../../identifiable/typings';
import { createElement, IChild } from '..';
import { StyleLibrary } from '@toolkip/style-libraries';

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

const startColor = 'rgb(100, 100, 100)';
const transitionColor = 'rgb(50, 50, 50)';

describe('create element with selectors', () => {
    
    describe('element with selectors', () => {
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

        it('allows for a generic selector', () => {
            const model = setupModel();
            const selector = setupStringSelector(model);
    
            const elem = createElement({
                selector: {
                    selector, 
                    applyCb: ({ value }, elem) => {
                        if (value.indexOf('_') !== -1) {
                            elem.style.backgroundColor = startColor;
                        } else {
                            elem.style.backgroundColor = transitionColor;
                        }
                    }
                }
            });
    
            expect(elem.style.backgroundColor).toEqual(startColor);
            model.set('name', 'Oscar');
            expect(elem.style.backgroundColor).toEqual(transitionColor);
        })
    })

    describe('class manipulation', () => {
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

        it('allows selecting just one class', () => {
            const model = new MObject({ cls: 'styled' });
    
            const elem = createElement({
                cls: [
                    'regular',
                    select(model, (m) => m.cls),
                    'otherRegular'
                ]
            });
    
            expect(elem.className).toContain('regular');
            expect(elem.className).toContain('otherRegular');
            expect(elem.className).toContain('styled');
    
            model.set('cls', 'notStyled');
            expect(elem.className).not.toContain('styled');
            expect(elem.className).toContain('regular');
            expect(elem.className).toContain('notStyled');
        })
    })
    
    describe('children & content', () => {
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

        it('allows selecting on nested selectors', () => {
            const model = new MObject<ISimpleModel>();
    
            const selectName = select(model, (m) => m.name);
            const selectAge = select(model, (m) => m.age);
    
            const elem = createElement({
                content: select(model, (m) => m).select((m) => {
                    return selectName.select((name) => {
                        return selectAge.select((age) => {
                            if (!name) {
                                return '';
                            }
                            return `${name} is ${age} years old`
                        })
                    })
                })
            })
    
            expect(elem.innerHTML).toEqual('');
            model.set('name', 'Big Bird');
            model.set('age', 10);
            expect(elem.innerHTML).toEqual('Big Bird is 10 years old');
            model.set('age', 24);
            expect(elem.innerHTML).toEqual('Big Bird is 24 years old');
        })
    })
    
    describe('other attributes', () => {
        it('allows for attributes to be set through selectors', () => {
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
    })

    describe('style selectors', () => {
        it('allows selecting on styles', () => {
            const model = new MObject({ color: startColor });
            const elem = createElement({
                styles: [
                   { '.nonselected': { fontSize: '10pt' }},
                   select(model, (m) => {
                       return { '.selected': { color: m.color }}
                   })
                ]
            })

            expect(StyleLibrary.get('create_elements')).toMatchObject({ '.selected': { color: startColor }})
            model.set('color', transitionColor);
            expect(StyleLibrary.get('create_elements')).toMatchObject({ '.selected': { color: transitionColor }})
        })
    
        it('allows selecting on individual style', () => {
            const model = new MObject({ color: startColor });
            const elem = createElement({
                style: {
                    color: select(model, (m) => m.color),
                    fontWeight: 'bold'
                }
            });

            expect(elem.style.fontWeight).toEqual('bold');
            expect(elem.style.color).toEqual(startColor);
            model.set('color', transitionColor);
            expect(elem.style.color).toEqual(transitionColor);
        })

        it('allows selecting on style', () => {
            const model = new MObject({ color: startColor })
            const elem = createElement({
                style: select(model, (m) => {
                    return { color: m.color }
                })
            });

            expect(elem.style.color).toEqual(startColor);
            model.set('color', transitionColor);
            expect(elem.style.color).toEqual(transitionColor);
        })
    })

})