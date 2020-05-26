import { MArray } from '../arrayModel';
import { ISimpleModel } from '../../_shared/__tests__/_interfaces';
import { setupModelWrapping } from '../../helpers/modelFactory';
import { MObject } from '../../objectModels';

setupModelWrapping();

describe('ModelArray', () => {

    describe('getters and setters', () => {
        it('sets an appropriate default value', () => {
            const model = new MArray<ISimpleModel>();
            expect(model.getData()).toMatchObject([]);
        })

        it('sets values into the array', () => {
            const data = { name: 'Cookie Monster', age: 10 };
            const model = new MArray<ISimpleModel>([data]);
            expect(model.getData()).toMatchObject([ data ])
        })

        it('replaces the whole array', () => {
            const data = { name: 'Cookie Monster', age: 10 };
            const model = new MArray<ISimpleModel>([ data, data, data ]);
            expect(model.getData()).toHaveLength(3);
            model.setData([ data ]);
            expect(model.getData()).toHaveLength(1);
        })
    })

    describe('listeners', () => {
        it('can set multiple times from the same nested object', () => {
            //expect.assertions(5);
            const models = [
                { name: 'Big Bird', age: 11 },
                { name: 'Oscar', age: 54 }
            ]

            const model = new MArray<ISimpleModel>(models);
            const cb = jest.fn((payload) => {
                expect(payload.eventType).toEqual('modify');
            });
            model.addEventListener(cb)

    
            const nestedModel = model.getModel(0) as MObject<ISimpleModel>;
            nestedModel.set('name', 'Elmo');
            expect(model.get(0)).toEqual({ ...models[0], name: 'Elmo' });
            
            nestedModel.set('name', 'Grover');
            expect(model.get(0)).toEqual({ ...models[0], name: 'Grover' });
    
            expect(cb).toHaveBeenCalledTimes(2);
        })
    })

    describe('collection-specific functions', () => {
        it('processes adds differently', () => {
            expect.assertions(2);

            const data = { name: 'Cookie Monster', age: 10 };
            const model = new MArray<ISimpleModel>();
            model.addEventListener((payload) => {
                expect(payload.eventType).toEqual('add');
            })
            model.add(data);
            expect(model.getData()).toMatchObject([ data ])
        })

        it('processes removes differently', () => {
            expect.assertions(4);

            const data = { name: 'Cookie Monster', age: 10 };
            const model = new MArray<ISimpleModel>([data]);
            model.addEventListener((payload) => {
                expect(payload.eventType).toEqual('remove');
            })
            expect(model.getData()).toMatchObject([data]);
            model.remove(0);
            expect(model.getData()).toMatchObject([]);
            expect(model.getData()).toHaveLength(0);
        })

        it('clears the array appropriately', () => {
            expect.assertions(3);

            const data = { name: 'Cookie Monster', age: 10 };
            const model = new MArray<ISimpleModel>([ data, data ]);
            model.addEventListener((payload) => {
                expect(payload.eventType).toEqual('remove');
                expect(payload.oldValue).toHaveLength(2);
            });
            model.clear();
            expect(model.getData()).toHaveLength(0);
        })

        it('checks for containment', () => {
            const data = ['A', 'B', 'C'];
            const model = new MArray<string>(data);
            expect(model.contains('A')).toBeTruthy();
            expect(model.contains('C')).toBeTruthy();
            expect(model.contains('D')).toBeFalsy();
        })
    })
    
})