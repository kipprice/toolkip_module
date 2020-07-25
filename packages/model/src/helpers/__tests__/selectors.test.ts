import { MPrimitive, Model } from '../../primitiveModels';
import { select, rawSelect } from '../selectors';
import { MObject } from '../../objectModels';
import { ISimpleModel } from '../../_shared/__tests__/_interfaces';
import { setupModelWrapping } from '../../helpers/modelFactory';
import { MArray, MManager } from '../../arrayModels';

setupModelWrapping();

describe('Selectors', () => {
    it('allows for selecting on un-keyed models', () => {
        expect.assertions(3);

        const model = new MPrimitive<string>();

        select(model).apply(
            ({ value }) => { expect(value).toEqual(model.getData()) }
        );
        
        model.setData('hello');
        model.setData('goodbye');
    })

    it('handles applying the current value', () => {
        const model = new MPrimitive<string>('hello');
        select(model).apply((v) => expect(v).toBeTruthy() );
        model.setData('good day');
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
        }, true);

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
> 
    it('can be chained', () => {
        interface IChainedObject { obj: ISimpleModel }
        const model = new MObject<IChainedObject>({
            obj: { name: 'Big Bird', age: 11 }
        });

        const cb = jest.fn();
        select(model, (m) => m.obj)
            .select((s) => s.name)
            .apply(cb, true)

        model.update('obj', { name: 'Cookie Monster' });
        model.update('obj', { age: 10 });
        model.getModel('obj').set('age', 8 );
        model.getModel('obj').set('name', 'Elmo');

        expect(cb).toHaveBeenCalledTimes(2);
    })

    it('can be chained to an array', () => {

        const results = [];

        const model = new MArray<ISimpleModel>([
            { name: 'Big Bird', age: 11 },
            { name: 'Elmo', age: 8 },
            { name: 'Cookie Monster', age: 10 }
        ]);

        select(model, (data: ISimpleModel[], event) => event ? data[event.key] : null)
            .select((data: ISimpleModel) => data && `Hello ${data.name}!`)
            .apply(({ value }) => results.push(value), true)

        model.update(1, { name: 'Elmer' });
        model.update(2, { name: 'Cookie Angel' });

        // select applys to the last selected element, so the first age change shouldn't
        // do anything, but the second should
        model.update(2, { age: 11 });
        model.update(0, { age: 12 });

        expect(results).toMatchObject([
            'Hello Elmer!',
            'Hello Cookie Angel!',
            'Hello Big Bird!'
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

    it('can select via a map across elements', () => {
        let results: string[] = [];
        const model = new MArray<ISimpleModel>();
        select<ISimpleModel[]>(model)
            .mapSelect<string>( (e) => e.name )
            .apply(({ value }) => { results = value });

        model.setData([
            { name: 'Big Bird', age: 11 },
            { name: 'Elmo', age: 8 },
            { name: 'Cookie Monster', age: 10 }
        ]);

        expect(results).toMatchObject([
            'Big Bird',
            'Elmo',
            'Cookie Monster'
        ]);

        model.update(0, { age: 12 });
        model.update(1, { age: 7 });

        expect(results).toMatchObject([
            'Big Bird',
            'Elmo',
            'Cookie Monster'
        ])
    })

    it('can have multiple listeners', () => {
        const model = new MObject({ name: 'Big Bird', age: 10 });
        const nameFunc = jest.fn( ({ value }) => expect(typeof value).toEqual('string') )
        const ageFunc = jest.fn( ({ value }) => expect(typeof value).toEqual('number') )

        select(model, (data) => data.name).apply(nameFunc);
        select(model, (data) => data.age).apply(ageFunc);

        model.setData({ name: 'Elmo', age: 8 });
        model.set('name', 'Oscar');

        expect(nameFunc).toHaveBeenCalledTimes(3);
        expect(ageFunc).toHaveBeenCalledTimes(2);
    })

    it('can listen at different levels', () => {
        const model = new MArray<ISimpleModel>();
        const subModels = [];
        const results = [];

        select(model, (data, event) => event && data[event.key], { eventTypes: ['add'] })
            .apply((payload) => {
                const targetModel = payload.eventChain.target as MArray<ISimpleModel>;

                const subModel = targetModel.getModel(payload.key);
                subModels.push(subModel);

                select( subModel, (data) => data.name, { eventTypes: [ 'modify' ] } )
                    .apply(({ value }) => results.push(value), true );
            }, true);

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

    it('can chain selectors through select', () => {
        const model = new Model<ISimpleModel>({ name: 'Big Bird', age: 10 });
        const firstSelector = select(model, (m) => m.name);
        const secondSelector = select(firstSelector, (name) => name.toUpperCase());
        secondSelector.apply(({ value }) => {
             expect(value).toEqual("BIG BIRD");
        })
    
    })

    it('can listen for a model that does not yet exist', () => {
        const model = new Model<any>();

        const firstSelector = select(model, (m) => m?.name );

        const secondSelector = select(firstSelector, 
            (name) => name?.toUpperCase() );

        secondSelector.apply((payload) => {
            const { value } = payload;
            expect(value).toEqual('OSCAR');
        }, true);

        model.import({ name: 'Oscar', age: 45 });
    })

    it('can return nested selectors', () => {
        const model = new MObject<ISimpleModel>({ name: 'Big Bird', age: 10 });
        const firstSelector = select(model, (m) => m.name);
        const secondSelector = select(model, (m) => m.age);

        const nestedSelects = firstSelector.select((name) => {
            return secondSelector.select((age) => {
                return `${name} is ${age} years old`
            })
        });

        expect(nestedSelects.getData()).toEqual('Big Bird is 10 years old');
        model.set('name', 'Oscar');
        expect(nestedSelects.getData()).toEqual('Oscar is 10 years old');
        model.set('age', 42);
        expect(nestedSelects.getData()).toEqual('Oscar is 42 years old');

    })

    it('can run a filter select', () => {
        expect.assertions(3);

        const model = new MArray<ISimpleModel>([ { name: 'Big Bird', age: 10 }, { name: 'Oscar', age: 42 } ]);
        const selector = select(model, (m) => m)
                .filterSelect((model) => model.age < 15 ? true : false)
                .mapSelect((m) => m.name);

        let val = null;
        const cb = jest.fn((payload) => {
            val = payload.value;
        })
        selector.apply(cb);
        expect(val).toMatchObject(['Big Bird']);
        model.add({ name: 'Elmo', age: 8 })
        expect(val).toMatchObject(['Big Bird', 'Elmo']);
        expect(cb).toHaveBeenCalledTimes(2);
    })
})

describe('Raw Selectors', () => {
    it('allows selecting on non-models', () => {
        const obj = { name: 'Big Bird', age: 10 };
        const fn = jest.fn(({ value }) => { expect(value).toEqual('Big Bird') })
        rawSelect(obj, (o) => o.name)
            .apply(fn);

        expect(fn).toHaveBeenCalledTimes(1);
    })
})