import { SimpleModel, ISimpleModel } from "./classes/simpleModel"
import { ComplexModel, IComplexModel } from "./classes/complexModel";
import { shortDate, dateDiff } from "@toolkip/primitive-helpers";
import { Model } from "../_model";

const createSimpleModel = () => {
    return new SimpleModel({ name: 'Kip', age: 30 });
}

const createComplexModel = (props: Partial<IComplexModel> = {}) => {
    const data = {
        date: '2020-10-23 12:00 PM' as any,
        nestedArray: [],
        nestedObject: {name: 'Kip', age: 30 },
        nestedModel: new SimpleModel({ name: 'kippers', age: 8 }),
        ...props
    }

    return new ComplexModel(data);
}

describe('_Model', () => {
    describe('creating models', () => {
        it('creates a simple model', () => {
            const model = createSimpleModel();
            expect(model.get('name')).toEqual('Kip');
            expect(model.get('age')).toEqual(30);
        })
    
        it('creates a complex model', () => {
            const date = new Date('2019-10-23');
            const model = createComplexModel({ date: date.toString() as any });
            
            expect(model.date).toBeInstanceOf(Date);
            expect(dateDiff(date, model.date)).toEqual(0);
            expect(model.get('nestedArray')).toBeInstanceOf(Array);
            expect(model.nestedObject).toBeInstanceOf(Object);
            expect(model.nestedModel).toBeInstanceOf(SimpleModel);
        })
    })

    describe('updating', () => {
        it('makes models immutable through getters if not wrapped in a model', () => {
            const nestedObject = { name: 'kippers', age: 8 };
            const model = createComplexModel({ nestedObject });
            model.nestedObject.name = 'wompers';
            expect(model.nestedObject.name).toEqual('kippers');
        })
    
        it('allows models to be updated through setters', () => {
            const model = createSimpleModel();
            expect(model.get('name')).toEqual('Kip');
            model.set('name', 'kippers');
            expect(model.get('name')).toEqual('kippers')
        })
    
        it ('allows models to be updated through wrapped models and events', () => {
            const nestedModel = new SimpleModel({ name: 'kippers', age: 8 });
            const model = createComplexModel({ nestedModel });
    
            // register the callback for the update function
            const cb = jest.fn((data) => {
                expect(data.key).toEqual('nestedModel');
            })
            model.registerListener(cb);
    
            model.nestedModel.set('name', 'wompers');
            expect(model.nestedModel.get('name')).toEqual('wompers');
            expect(cb).toHaveBeenCalled();
        })
    
        it('allows for arrays to be copied over', () => {
            const nestedArray = [ { name: 'A', age: 0 }, { name: 'B', age: 1 }, { name: 'C', age: 2 } ];
            const model = createComplexModel({ nestedArray });
            expect(model.get('nestedArray').length).toEqual(3);
            expect(model.get('nestedArray')[2].name).toEqual('C');
        })
    
        it('handles updating complex objects appropriately', () => {
            const anotherDate = new Date('2013-05-27');
            const model = createComplexModel({ anotherDate });
            expect(model.get('anotherDate')).toBeInstanceOf(Date);
        })

        it('does not update if there are no clear changes', () => {
            const model = createSimpleModel();
            const fn = jest.fn();
            model.registerListener(fn);
            model.set('name', 'Kip');
            expect(fn).not.toHaveBeenCalled();
        })
    })

    describe('event listeners', () => {
        it('notifies listeners of changes', () => {
            const model = createSimpleModel();
            const fn = jest.fn();
            model.registerListener(fn);
            model.set('name', 'kippers');
            model.set('age', 5);
            expect(fn).toBeCalledTimes(2);
        });
    
        it('allows listening on children', () => {
            const model = createComplexModel();
            const fn = jest.fn();
    
            const nestedModel = model.nestedModel;
            nestedModel.registerListener(fn);
            nestedModel.set('name', 'kip');
            expect(fn).toHaveBeenCalled();
    
            nestedModel.set('age', 10);
            expect(fn).toHaveBeenCalledTimes(2);
            expect(model.nestedModel.get('age')).toEqual(10);
        })
    
        it('only notifies for the right target', () => {
            const model = createComplexModel();
            const parent = jest.fn();
            model.registerListener(parent);
    
            const nestedModel = model.nestedModel;
            const child = jest.fn();
            nestedModel.registerListener(child);
    
            nestedModel.set('age', 2);
            model.set('anotherDate', new Date());
    
            expect(parent).toHaveBeenCalledTimes(2);
            expect(child).toHaveBeenCalledTimes(1);
        })
    })

    describe('saving to simple objects', () => {
        it('saves to a simple object correctly', () => {
            const model = createSimpleModel();
            const expectedModel = { name: 'Kip', age: 30 }
            expect(model.export()).toMatchObject(expectedModel);
        })

        it('saves to a complex object appropriately', () => {
            const model = createComplexModel();
            const expectedModel = {
                date: '10/23/20',
                nestedArray: [],
                nestedObject: {name: 'Kip', age: 30 },
                nestedModel: { name: 'kippers', age: 8 }
            }
            expect(model.export()).toMatchObject(expectedModel);
        })
    });

    describe('undo and redo', () => {
        it('handles undoing changes', () => {
            const model = createSimpleModel();
            model.set('name', 'Kippers');
            model.set('age', 10);
            expect(model.export()).toMatchObject({ name: 'Kippers', age: 10 });
    
            model.undo();
            expect(model.export()).toMatchObject({ name: 'Kippers', age: 30 });
    
            model.undo();
            expect(model.export()).toMatchObject({ name: 'Kip', age: 30 });
        });
    
        it('handles undoing complex changes', () => {
            const model = createComplexModel();
            model.set('nestedObject', { name: 'another', age: 0 });
            expect(model.get('nestedObject')).toMatchObject({ name: 'another', age: 0 });
            model.undo();
            expect(model.get('nestedObject')).toMatchObject({ name: 'Kip', age: 30 });
        })
    
        it('handles undoing nested changes', () => {
            const model = createComplexModel();
            const { nestedModel } = model;
            nestedModel.set('name', 'null');
            expect(model.nestedModel.export()).toMatchObject({ name: 'null', age: 8 });
            nestedModel.undo();
            expect(model.nestedModel.export()).toMatchObject({ name: 'kippers', age: 8 });
        })
    
        it('does not undo beyond the first iteration', () => {
            const model = createSimpleModel();
            expect(model.export()).toMatchObject({ name: 'Kip', age: 30 });
            model.undo();
            expect(model.export()).toMatchObject({ name: 'Kip', age: 30 });
        })
    
        it('handles redoing changes', () => {
            const model = createSimpleModel();
            model.set('name', 'Kippers');
            model.set('age', 10);
            expect(model.export()).toMatchObject({ name: 'Kippers', age: 10 });
    
            model.undo();
            expect(model.export()).toMatchObject({ name: 'Kippers', age: 30 });
    
            model.redo();
            expect(model.export()).toMatchObject({ name: 'Kippers', age: 10 });
        });
    
        it('does not keep redoing beyond options to redo', () => {
            const model = createSimpleModel();
            model.set('name', 'kippers');
            expect(model.export()).toMatchObject({ name: 'kippers', age: 30 });
            model.redo();
            expect(model.export()).toMatchObject({ name: 'kippers', age: 30 });
        })
    })

    describe('instance without class def', () => {
        it('can create a model via an instantiation call', () => {
            const model = new Model<ISimpleModel>(
                { name: 'Kip', age: 30}, 
                { age: { incoming: (age: number) => age / 2 } } );
            expect(model.export()).toMatchObject({ name: 'Kip', age: 15});
        })

        it('can create a nested model via instantiation', () => {
            const model = new Model<IComplexModel>(
                { nestedModel: new Model<ISimpleModel>({ name: 'nested', age: 10 })}
            );
            expect(model.get('nestedModel').export()).toMatchObject({ name: 'nested', age: 10 });
        })
    })
})

