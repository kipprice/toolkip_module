import { MManager } from '../modelManager';
import { IIdentifiableModel } from './_interfaces';
import { setupModelWrapping } from '../../helpers/modelFactory';

setupModelWrapping();

const identifiables: IIdentifiableModel[] = [
    { id: '1', name: 'A' },
    { id: '2', name: 'B' }
];

describe('ModelManager', () => {
    it('sets appropriate default values', () => {
        const model = new MManager<IIdentifiableModel>();
        expect(model.toArray()).toMatchObject([])
    })

    it('sets values when passed into the constructor', () => {
        const model = new MManager<IIdentifiableModel>(identifiables);
        expect(model.getData()).toMatchObject(identifiables);
        expect(model.get('1')).toMatchObject(identifiables[0]);
    })

    it('sets over existing values', () => {
        const model = new MManager<IIdentifiableModel>(identifiables);
        const data = { ...identifiables[0], name: 'Z' }
        model.set(identifiables[0].id, data);
        expect(model.get(identifiables[0].id)).toMatchObject(data);
    })

    it('clears appropriately', () => {
        expect.assertions(4);
        
        const model = new MManager(identifiables);
        model.addEventListener((payload) => {
            expect(payload.eventType).toEqual('remove');
            expect(payload.oldValue).toHaveLength(2);
        })
        model.clear();
        expect(model.toArray()).toMatchObject([]);
        expect(model.toArray()).toHaveLength(0);
    })

    it('handles events on keys', () => {
        expect.assertions(4);
        const model = new MManager(identifiables);
        model.addKeyedListener(identifiables[0].id, (payload) => {
            expect(payload.eventType).toEqual('modify');
            expect(payload.oldValue.name).toEqual('A');
            expect(payload.value.name).toEqual('Z');
        })
        model.set(identifiables[0].id, {...identifiables[0], name: 'Z' });
        expect(model.get(identifiables[0].id)).toEqual({ ...identifiables[0], name: 'Z' });
    })

    it('handles grabbing nested models and setting directly', () => {
        expect.assertions(5);

        const model = new MManager<IIdentifiableModel>(identifiables);
        const cb = jest.fn((payload) => {
            expect(payload.eventType).toEqual('modify');
            expect(payload.oldValue.name).toEqual('A');
            expect(payload.value.name).toEqual('Z');
        })
        model.addKeyedListener(identifiables[0].id, cb);

        const nestedModel = model.getModel(identifiables[0].id);
        nestedModel.set('name', 'Z');
        expect(model.get(identifiables[0].id)).toEqual({ ...identifiables[0], name: 'Z' });
        expect(cb).toHaveBeenCalledTimes(1);
    })

    it('can set multiple times from the same nested object', () => {
        expect.assertions(5);

        const model = new MManager<IIdentifiableModel>(identifiables);
        const cb = jest.fn((payload) => {
            expect(payload.eventType).toEqual('modify');
        });
        model.addEventListener(cb)

        const id = identifiables[0].id;

        // grab the model so we can work off of it
        // even though we're technically cloning this model,
        // the events are still tied back properly
        const nestedModel = model.getModel(id);
        nestedModel.set('name', 'Z');
        expect(model.get(id)).toEqual({ ...identifiables[0], name: 'Z' });
        
        // verify that the events are tied even though the model itself no
        // longer is
        nestedModel.set('name', 'Y');
        expect(model.get(id)).toEqual({ ...identifiables[0], name: 'Y' });

        expect(cb).toHaveBeenCalledTimes(2);
    })

    it('handles adding', () => {
        expect.assertions(3);
        const model = new MManager<IIdentifiableModel>();
        model.addEventListener((payload) => {
            expect(payload.eventType).toEqual('add');
        })
        model.add(identifiables[0]);
        model.add(identifiables[1]);
        expect(model.toArray()).toMatchObject(identifiables);
    })

    it('handles removing', () => {
        expect.assertions(3);
        const model = new MManager(identifiables);
        model.addEventListener((payload) => {
            expect(payload.eventType).toEqual('remove');
        })
        model.remove(identifiables[0].id);
        model.remove(identifiables[1].id);
        expect(model.toArray()).toMatchObject([]);
    })
})