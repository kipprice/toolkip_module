import { MIdentifiable } from '../identifiableModel';
import { IIdentifiableModel } from '../../_shared/__tests__/_interfaces';
import { setupModelWrapping } from '../../helpers/modelFactory';

setupModelWrapping();

describe('IdentifiableModel', () => {
    it('assigns a new ID with an empty starter', () => {
        const model = new MIdentifiable<IIdentifiableModel>();
        expect(model.get('id')).toBeTruthy();
    })

    it('assigns a new ID when all but an id is passed', () => {
        const model = new MIdentifiable<IIdentifiableModel>({ name: 'Big Bird'});
        expect(model.id).toBeTruthy();
    })

    it('does not assign an id if it is provided', () => {
        const model = new MIdentifiable<IIdentifiableModel>({ id: '11', name: 'Big Bird' });
        expect(model.id).toEqual('11');
    })

    it('assigns ids based on last ID', () => {
        const modelA = new MIdentifiable<IIdentifiableModel>({ id: '20' });
        const modelB = new MIdentifiable<IIdentifiableModel>();
        expect(modelA.id).toEqual('20');
        expect(modelB.id).toEqual('21');
    })

    it('assigns a suffix if requested', () => {
        const modelA = new MIdentifiable<IIdentifiableModel>(
            { id: '20-model' }, 
            null, 
            'model'
        );
        const modelB = new MIdentifiable<IIdentifiableModel>(
            null,
            null,
            'model'
        )
        expect(modelA.id).toEqual('20-model');
        expect(modelB.id).toEqual('21-model')
    })
})