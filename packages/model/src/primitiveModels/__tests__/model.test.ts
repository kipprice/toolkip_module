import { Model } from '../modelAny';
import { setupModelWrapping } from '../../helpers/modelFactory';
import { ISimpleModel, IIdentifiableModel } from '../../_shared/__tests__/_interfaces';
import { MObject } from '../../objectModels/modelObject';
import { MArray, MManager } from '../../arrayModels';

setupModelWrapping();

describe('Generic model', () => {
    it('allows creating a basic untyped model with a primitive value', () => {
        const model = new Model<string>('hello');
        expect(model.getData()).toEqual('hello')
    });

    it('allows creating a model with a numeric value', () => {
        const model = new Model<number>();
        model.setData(10);
        expect(model.getData()).toEqual(10)
    });

    it('allows creating a model object', () => {
        const model = new Model<ISimpleModel>();
        const data = { name: 'Big Bird', age: 10 };
        model.setData(data);
        expect(model.getData()).toMatchObject(data)
        expect(model.getData() === data).toBeFalsy();
    })

    it('allows creating an array', () => {
        const model = new Model<string[]>();
        const data = ['A', 'B', 'C'];
        model.setData(data);
        expect(model.getData()).toMatchObject(data);
        const nestedModel = model.getModel();
        expect(nestedModel).toBeInstanceOf(MArray);
    })

    it('can create an identifiable manager', () => {
        const model = new Model<IIdentifiableModel[]>();
        const data = [{ id: '1', name: 'Big Bird' }];
        model.setData(data);
        expect(model.getData()).toMatchObject(data);
        const nestedModel = model.getModel();
        expect(nestedModel).toBeInstanceOf(MManager);
    })

    it('can get the inner model if requested', () => {
        const model = new Model<ISimpleModel>();
        const data = { name: 'Big Bird', age: 10 };
        model.setData(data);
        const nestedModel = model.getModel();
        expect(nestedModel).toBeInstanceOf(MObject);
    })

    it('listens to events on the model', () => {
        expect.assertions(2);

        const data = { name : 'Big Bird', age: 10 };
        const model = new Model<ISimpleModel>(data);
        model.addEventListener((payload) => {
            const { value } = payload;
            expect(value).toMatchObject({ name: 'Big Bird', age: 11 });
        })
        const nestedModel = model.getModel();
        nestedModel.set('age', 11);
        expect(model.getData()).toMatchObject({ name: 'Big Bird', age: 11 });
    })

    it('carries over listeners when the model changes', () => {
        expect.assertions(2);
        const data = { name: 'Big Bird', age: 10 };
        const model = new Model<ISimpleModel>();

        const cb = jest.fn(({ value }) => {
            expect(value).toMatchObject(model.getData())
        });
        model.addEventListener(cb);
        
        model.setData(data);
        expect(cb).toBeCalledTimes(1);
    })
    
})