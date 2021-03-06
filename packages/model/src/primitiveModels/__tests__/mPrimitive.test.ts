import { MPrimitive } from "../modelPrimitive"
import { MDate } from "../modelDate";
import { IModelTransform } from '../../_shared';

describe('ModelPrimitive', () => {
    describe('getting and setting', () => {
        
        it('has an appropriate default value', () => {
            const model = new MPrimitive<string>();
            expect(model.getData()).toEqual(undefined);
        })
    
        it('sets an appropriate value', () => {
            const model = new MPrimitive<string>('hello')
            expect(model.getData()).toEqual('hello');
        })

        it('can set a falsy value', () => {
            const model = new MPrimitive<string>('hello');
            model.setData('');
            expect(model.getData()).toEqual('');
        })

        it('can set 0', () => {
            const model = new MPrimitive<number>(0);
            expect(model.getData()).toEqual(0);
        })

        it('can import falsy data', () => {
            const model = new MPrimitive<string>();
            expect(model.getData()).toEqual(undefined);
            model.import('');
            expect(model.getData()).toEqual('')
        }); 
        
        it('can import zero', () => {
            const model = new MPrimitive<number>();
            expect(model.getData()).toEqual(undefined);
            model.import(0);
            expect(model.getData()).toEqual(0)
        });

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

    describe('undo and redo', () => {
        it('undoes changes and notifies about it', () => {
            expect.assertions(6);

            const model = new MPrimitive<string>('hello');
            model.setData('goodbye');
            model.setData('goodnight');

            const cb = jest.fn((payload) => {
                expect(payload.eventType).toEqual('modify');
            })
            model.addEventListener(cb);

            expect(model.getData()).toEqual('goodnight');
            model.undo();
            expect(model.getData()).toEqual('goodbye');
            model.undo();
            expect(model.getData()).toEqual('hello');
            
            expect(cb).toHaveBeenCalledTimes(2);
        })

        it('redoes changes and notifies about it', () => {
            expect.assertions(6)

            const model = new MPrimitive<string>('hello');
            model.setData('goodbye');

            const cb = jest.fn((payload) => {
                expect(payload.eventType).toEqual('modify');
            })
            model.addEventListener(cb);

            expect(model.getData()).toEqual('goodbye');
            model.undo();
            expect(model.getData()).toEqual('hello');
            model.redo();
            expect(model.getData()).toEqual('goodbye');

            expect(cb).toHaveBeenCalledTimes(2);
        })
        
    })
})