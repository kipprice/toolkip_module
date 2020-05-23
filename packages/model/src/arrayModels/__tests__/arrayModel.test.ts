import { MArray } from '../arrayModel';
import { ISimpleModel } from './_interfaces';
import { setupModelWrapping } from '../../helpers/modelFactory';

setupModelWrapping();

describe('ModelArray', () => {
    it('sets an appropriate default value', () => {
        const model = new MArray<ISimpleModel>();
        expect(model.getData()).toMatchObject([]);
    })

    it('sets values into the array', () => {
        const data = { name: 'Cookie Monster', age: 10 };
        const model = new MArray<ISimpleModel>([data]);
        expect(model.getData()).toMatchObject([ data ])
    })

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
        
    })
})