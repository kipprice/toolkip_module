import { MManager } from '../modelManager';
import { setupModelWrapping } from '../../helpers/modelFactory';
import { IIdentifiableModel } from './_interfaces';

setupModelWrapping();

describe('ModelManager', () => {
    it('sets appropriate default values', () => {
        const model = new MManager<IIdentifiableModel>();
        expect(model.getData()).toMatchObject([])
    })

    it('sets values when passed into the constructor', () => {
        const identifiables: IIdentifiableModel[] = [
            { id: '1-IdentifiableModel', name: 'A' },
            { id: '2-IdentifiableModel', name: 'B' }
        ]
        const model = new MManager<IIdentifiableModel>(identifiables);
        expect(model.getData()).toMatchObject(identifiables);
        expect(model.get('1-IdentifiableModel')).toMatchObject(identifiables[0]);
    })
})