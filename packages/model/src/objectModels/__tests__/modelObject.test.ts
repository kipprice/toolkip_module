import { ISimpleModel, IComplexModel } from './_interfaces';
import { MObject } from '..';
import { setupModelWrapping } from '../../helpers/modelFactory';
import { createModelDateTransform, ShortDateTransform } from '../../transforms';

setupModelWrapping();

describe('ModelObject', () => {
    describe('getters and setters', () => {
        it('handles default values', () => {
            const model = new MObject<ISimpleModel>();
            expect(model.getData()).toMatchObject({});
        })
    
        it('handles simple values', () => {
            const data = { name: 'Cookie Monster', age: 10 };
            const model = new MObject<ISimpleModel>(data);
            expect(model.getData()).toMatchObject(data);
        })
    
        it('can retrieve specific values', () => {
            const model = new MObject<ISimpleModel>({ name: 'Cookie Monster', age: 10 });
            expect(model.get('age')).toEqual(10);
        })

        it('sets the whole object at once', () => {
            const data = { name: 'Cookie Monster', age: 10 };
            const model = new MObject<ISimpleModel>(data);
            expect(model.getData()).toMatchObject(data);
    
            const updatedData = { name: 'Big Bird', age: 11 }
            model.setData(updatedData);
            expect(model.getData()).toMatchObject(updatedData);
        })
    })

    describe('listener handling', () => {
        it('handles notifying listeners', () => {
            expect.assertions(2);
            const data = { name: 'Cookie Monster', age: 10 };
            const model = new MObject<ISimpleModel>(data);
            model.addEventListener((payload) => {
                expect(payload.oldValue).toEqual('Cookie Monster');
                expect(payload.value).toEqual('Big Bird');
            })
            model.set('name', 'Big Bird');
        })
    
        it('notifies on specific properties and not others', () => {
            expect.assertions(1);
            const model = new MObject<ISimpleModel>({ name: 'Cookie Monster', age: 10 });
            model.addKeyedListener('name', (payload) => {
                expect(true).toBeTruthy();
            })
            model.set('name', 'Big Bird');
            model.set('age', 15);
        })
    
        it('notifies across properties as appropriate', () => {
            expect.assertions(2);
            const data = { name: 'Cookie Monster', age: 10 };
            const model = new MObject<ISimpleModel>(data);
            model.addEventListener((payload) => {
                expect(payload.eventType).toEqual('modify');
            })
            model.set('name', 'Big Bird');
            model.set('age', 12);
        })
    
        it('does not notify multiple times', () => {
            expect.assertions(2);
            const model = new MObject<ISimpleModel>({ name: 'Cookie Monster', age: 10 });
            model.addEventListener((payload) => {
                expect(payload.key).toEqual('name');
            })
            model.set('name', 'Big Bird');
            model.set('name', 'Elmo');
        })
    })

    describe('importing and exporting', () => {
        it('imports with global transforms', () => {
            // TODO: 
        })

        it('imports with keyed transforms', () => {
            const data = { name: 'Cookie Monster', age: 10 };
            const nameTx = {
                incoming: (name: string) => name?.toUpperCase()
            }
            const model = new MObject<ISimpleModel>(data, { name: nameTx } );
            expect(model.get('name')).toEqual('COOKIE MONSTER');
        })

        it('exports with global transforms', () => {
            // TODO: 
        })

        it('exports with keyed transforms', () => {
            const data = { name: 'Cookie Monster', age: 10 };
            const nameTx = {
                outgoing: (name: string) => name.toUpperCase()
            }
            const model = new MObject<ISimpleModel>(data, { name: nameTx } );
            const exportedData = model.export();
            expect(exportedData.name).toEqual('COOKIE MONSTER');
        })
    })

    describe('nested models', () => {
        const identifiableRecords = [
            { id: '1-Identifiable', name: 'Kermit' },
            { id: '2-Identifiable', name: 'Gonzo' }
        ]

        const allRecords = [
            { name: 'Cookie Monster', age: 10 },
            { name: 'Elmo', age: 8 }
        ];

        const data: IComplexModel = {
            activeRecord: allRecords[1],
            allRecords,
            identifiableRecords,
            basicDate: new Date('2020-05-10'),
            transformedDate: '2020-10-10 00:00Z-05:00'
        };

        const createComplexModel = () => {
            return new MObject<IComplexModel>(
                data, 
                { transformedDate: createModelDateTransform(ShortDateTransform) }
            );
        }

        it('handles transforms on complex models', () => {
            const model = createComplexModel();
            expect(model.getData()).toMatchObject({
                ...data,
                transformedDate: new Date('2020-10-10  00:00Z-05:00')
            })
        })

        it('listens on nested models', () => {
            expect.assertions(2);

            const model = createComplexModel();
            model.addKeyedListener('activeRecord', (payload) => {
                expect(payload.eventType).toEqual('modify');
            });       

            model.set('activeRecord', model.get('allRecords')[0]);
            expect(model.getData()).toEqual({
                ...data,
                activeRecord: allRecords[0],
                transformedDate: new Date('2020-10-10  00:00Z-05:00')
            });
        })

        it('exports nested models', () => {
            const model = createComplexModel();
            expect(model.export()).toMatchObject({
                ...data,
                basicDate: new Date('2020-05-10').toString(),
                transformedDate: '10/10/20'
            })
        })
    })

})