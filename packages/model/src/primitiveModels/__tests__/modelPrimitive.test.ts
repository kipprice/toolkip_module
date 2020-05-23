import { MPrimitive } from "../modelPrimitive"
import { MDate } from "../modelDate";

describe('ModelPrimitive', () => {
    it('has an appropriate default value', () => {
        const model = new MPrimitive<string>();
        expect(model.getData()).toEqual(null);
    })

    it('sets an appropriate value', () => {
        const model = new MPrimitive<string>('hello')
        expect(model.getData()).toEqual('hello');
    })

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
})