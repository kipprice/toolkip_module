import { MPrimitive } from "../modelPrimitive"
import { MDate } from "../modelDate";
import { IModelTransform } from '../../_shared';

describe('ModelPrimitive', () => {
    describe('getting and setting', () => {
        
        it('has an appropriate default value', () => {
            const model = new MPrimitive<string>();
            expect(model.getData()).toEqual(null);
        })
    
        it('sets an appropriate value', () => {
            const model = new MPrimitive<string>('hello')
            expect(model.getData()).toEqual('hello');
        })

    })
    

    describe('notifying listeners', () => {

        it('notifies about changes', () => {
            expect.assertions(3);
            const model = new MPrimitive<string>('womp');
            model.addEventListener((payload) => {
                expect(payload.oldValue).toEqual('womp');
                expect(payload.value).toEqual('wompers');
                expect(payload.eventType).toEqual('modify');
            })
            model.setData('wompers');
        })
    
        it('calculates the correct change type', () => {
            expect.assertions(1);
            const model = new MPrimitive<string>();
            model.addEventListener(({ eventType }) => {
                expect(eventType).toEqual('add');
            })
            model.setData('hello')
        })
    
        it('calculates a remove type', () => {
            expect.assertions(2);
            const model = new MPrimitive<string>('hello');
            model.addEventListener(({ eventType }) => {
                expect(eventType).toEqual('remove');
            });
            model.setData('');
            expect(model.getData()).toEqual('');
        })

    })
    

    describe('import and export', () => {

        const transforms: IModelTransform<string> = {
            incoming: (s) => s.toUpperCase(),
            outgoing: (s) => s.toLowerCase()
        }
        it('imports a simple value', () => {
            const model = new MPrimitive<string>( 'hello', { "_" : transforms } );
            expect(model.getData()).toEqual('HELLO');
        })

        it('exports a simple value', () => {
            const model = new MPrimitive<string>( 'HELLO', { "_" : transforms } );
            expect(model.export()).toEqual('hello')
        })
    })
})