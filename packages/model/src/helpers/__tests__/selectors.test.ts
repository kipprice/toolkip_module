import { MPrimitive } from '../../primitiveModels';
import { select } from '../selectors';
import { MObject } from '../../objectModels';
import { ISimpleModel } from '../../_shared/__tests__/_interfaces';
import { setupModelWrapping } from '../../helpers/modelFactory';
import { MArray } from '../../arrayModels';

setupModelWrapping();

describe('Selectors', () => {
    it('allows for selecting on un-keyed models', () => {
        expect.assertions(2);

        const model = new MPrimitive<string>();

        select(model).apply(
            ({ value }) => { expect(value).toEqual(model.getData()) }
        );
        
        model.setData('hello');
        model.setData('goodbye');
    })

    it('allows for selecting on object models', () => {

        const data = { name : 'Big Bird', age: 11 };
        const model = new MObject<ISimpleModel>(data);

        select(
            model,
            (value: ISimpleModel) => {
                return `${value.name} is ${value.age} years old`;
            }
        ).apply(({ value, oldValue }) => { 
            expect(oldValue).toEqual('Big Bird is 11 years old');
            expect(value).toEqual('Big Bird is 8 years old');
        });

        model.set('age', 8);

    })

    it('only fires for certain keys', () => {
        const data = { name: 'Big Bird', age: 11 };
        const model = new MObject<ISimpleModel>(data);
        const processor = jest.fn((value: ISimpleModel) => `Hello ${value.name}`);

        select(model, processor, { keys: ['name'] })
            .apply(({ value }) => { 
                expect(value).toContain('Hello');
                expect(value).not.toContain(model.get('age'));
            })
        
        model.set('name', 'Elmo');
        model.set('age', 8);
        model.set('name', 'Big Bird');

        // 1 time at the beginning + 2 updates
        expect(processor).toHaveBeenCalledTimes(3);
        
    })

    it('only fires for certain event types', () => {
        const data = { name: 'Big Bird', age: 11 };
        const model = new MObject<ISimpleModel>(data);
        const processor = jest.fn((val, { eventType }) => { 
            if (!eventType) { return; }
            expect(eventType).toEqual('modify')
        });

        select(model, processor, { eventTypes: ['modify'] });
        
        model.set('name', '');
        model.set('age', 12);
        model.set('name', 'Elmo');

        expect(processor).toHaveBeenCalledTimes(2);
    })

    it('can run a custom filter event', () => {
        const data = { name: 'Big Bird', age: 11 };
        const model = new MObject<ISimpleModel>(data);
        const processor = jest.fn((val, { eventType }) => { 
            if (!eventType) { return; }
            expect(eventType).toEqual('modify')
        });

        select(model, processor, { eventTypes: ['modify'] }).filter(({ value }) => {
            if (value % 2 === 1) { return true; }
            return false;
        });
        
        model.set('age', 13);
        model.set('age', 12);
        model.set('age', 11);

        expect(processor).toHaveBeenCalledTimes(2);
    })

    it('can be chained', () => {

        const results = [];

        const model = new MArray<ISimpleModel>([
            { name: 'Big Bird', age: 11 },
            { name: 'Elmo', age: 8 },
            { name: 'Cookie Monster', age: 10 }
        ]);

        select(model, (data: ISimpleModel[], event) => event ? data[event.key] : null)
            .select((data: ISimpleModel) => data && `Hello ${data.name}!`)
            .apply(({ value }) => results.push(value) )

        model.update(1, { name: 'Elmer' });
        model.update(2, { name: 'Cookie Angel' });
        model.update(0, { age: 12 });

        expect(results).toMatchObject([
            'Hello Elmer!',
            'Hello Cookie Angel!'
        ]);
        
    })

    it('can map across elements', () => {
        const results = [];

        const model = new MArray<ISimpleModel>();

        select(model).map((elem: ISimpleModel) => {
            results.push(`${elem.name} is ${elem.age} years old`);
        })

        model.setData([
            { name: 'Big Bird', age: 11 },
            { name: 'Elmo', age: 8 },
            { name: 'Cookie Monster', age: 10 }
        ]);

        expect(results).toMatchObject([
            'Big Bird is 11 years old',
            'Elmo is 8 years old',
            'Cookie Monster is 10 years old'
        ]);
    })

    it('can have multiple listeners', () => {
        const model = new MObject({ name: 'Big Bird', age: 10 });
        const nameFunc = jest.fn( ({ value }) => expect(typeof value).toEqual('string') )
        const ageFunc = jest.fn( ({ value }) => expect(typeof value).toEqual('number') )

        select(model, (data) => data.name).apply(nameFunc);
        select(model, (data) => data.age).apply(ageFunc);

        model.setData({ name: 'Elmo', age: 8 });
        model.set('name', 'Oscar');

        expect(nameFunc).toHaveBeenCalledTimes(2);
        expect(ageFunc).toHaveBeenCalledTimes(1);
    })

    it('can listen at different levels', () => {
        const model = new MArray<ISimpleModel>();
        const subModels = [];
        const results = [];

        select(model, (data, event) => event && data[event.key], { eventTypes: ['add'] })
            .apply((payload) => {
                const targetModel = payload.eventChain.target as MArray<ISimpleModel>;

                const subModel = targetModel.getModel(payload.key) as MObject<ISimpleModel>;
                subModels.push(subModel);

                select(
                    subModel, 
                    (data) => {
                        return data.name 
                    }, 
                    { eventTypes: [ 'modify' ] }
                )
                    .apply(({ value }) => results.push(value) );
            });

        model.add({ name: 'Big Bird', age: 11 });
        model.add({ name: 'Elmo', age: 8 });
        
        model.update(0, { name: 'Oscar' });
        model.update(1, { age: 9 });
        model.update(1, { name: 'Bert' })

        expect(subModels.length).toEqual(2);
        expect(results).toMatchObject([
            'Oscar',
            'Bert'
        ]);
    })
})