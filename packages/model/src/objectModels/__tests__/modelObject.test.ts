import { ISimpleModel } from './_interfaces';
import { ModelObject } from '..';
import { setupModelWrapping } from '../../helpers/modelFactory';

setupModelWrapping();

describe('ModelObject', () => {
    it('handles default values', () => {
        const model = new ModelObject<ISimpleModel>();
        expect(model.getData()).toMatchObject({});
    })

    it('handles simple values', () => {
        const data = { name: 'Cookie Monster', age: 10 };
        const model = new ModelObject<ISimpleModel>(data);
        expect(model.getData()).toMatchObject(data);
    })

    it('can retrieve specific values', () => {
        const model = new ModelObject<ISimpleModel>({ name: 'Cookie Monster', age: 10 });
        expect(model.get('age')).toEqual(10);
    })

    it('handles notifying listeners', () => {
        expect.assertions(2);
        const data = { name: 'Cookie Monster', age: 10 };
        const model = new ModelObject<ISimpleModel>(data);
        model.addEventListener((payload) => {
            expect(payload.oldValue).toEqual('Cookie Monster');
            expect(payload.value).toEqual('Big Bird');
        })
        model.set('name', 'Big Bird');
    })

    it('notifies on specific properties and not others', () => {
        expect.assertions(1);
        const model = new ModelObject<ISimpleModel>({ name: 'Cookie Monster', age: 10 });
        model.addKeyedListener('name', (payload) => {
            expect(true).toBeTruthy();
        })
        model.set('name', 'Big Bird');
        model.set('age', 15);
    })

    it('notifies across properties as appropriate', () => {
        expect.assertions(2);
        const data = { name: 'Cookie Monster', age: 10 };
        const model = new ModelObject<ISimpleModel>(data);
        model.addEventListener((payload) => {
            expect(payload.eventType).toEqual('modify');
        })
        model.set('name', 'Big Bird');
        model.set('age', 12);
    })

    it('does not notify multiple times', () => {
        expect.assertions(2);
        const model = new ModelObject<ISimpleModel>({ name: 'Cookie Monster', age: 10 });
        model.addEventListener((payload) => {
            expect(payload.key).toEqual('name');
        })
        model.set('name', 'Big Bird');
        model.set('name', 'Elmo');
    })
})