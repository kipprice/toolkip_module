import { IdentifiableModel } from '../identifiableModel';
import { IIdentifiableModel } from './_interfaces';
import { setupModelWrapping } from '../../helpers/modelFactory';

setupModelWrapping();

describe('IdentifiableModel', () => {
    it('assigns a new ID with an empty starter', () => {
        const model = new IdentifiableModel<IIdentifiableModel>();
        expect(model.get('id')).toBeTruthy();
    })

    it('assigns a new ID when all but an id is passed', () => {
        const model = new IdentifiableModel<IIdentifiableModel>({ name: 'Big Bird'});
        expect(model.id).toBeTruthy();
    })

    it('does not assign an id if it is provided', () => {
        const model = new IdentifiableModel<IIdentifiableModel>({ id: '11-IdentifiableModel', name: 'Big Bird' });
        expect(model.id).toEqual('11-IdentifiableModel');
    })

    it('assigns ids based on last ID', () => {
        const modelA = new IdentifiableModel<IIdentifiableModel>({ id: '20-IdentifiableModel' });
        const modelB = new IdentifiableModel<IIdentifiableModel>();
        expect(modelA.id).toEqual('20-IdentifiableModel');
        expect(modelB.id).toEqual('21-IdentifiableModel');
    })

    it('assigns a suffix if missing', () => {
        // TODO: make this work
        // const modelA = new IdentifiableModel<IIdentifiableModel>({ id: '20' });
        // const modelB = new IdentifiableModel<IIdentifiableModel>();
        // expect(modelA.id).toEqual('20-IdentifiableModel');
        // expect(modelB.id).toEqual('21-IdentifiableModel');
    })
})