import { ModelPrimitive } from "../modelPrimitive"
import { ModelDate } from "../modelDate";

describe('ModelPrimitive', () => {
    it('has an appropriate default value', () => {
        const model = new ModelPrimitive<string>();
        expect(model.getData()).toEqual(null);
    })

    it('sets an appropriate value', () => {
        const model = new ModelPrimitive<string>('hello')
        expect(model.getData()).toEqual('hello');
    })

    it('notifies about changes', () => {
        expect.assertions(3);
        const model = new ModelPrimitive<string>('womp');
        model.addEventListener((payload) => {
            expect(payload.oldValue).toEqual('womp');
            expect(payload.value).toEqual('wompers');
            expect(payload.eventType).toEqual('modify');
        })
        model.setData('wompers');
    })

    it('calculates the correct change type', () => {
        expect.assertions(1);
        const model = new ModelPrimitive<string>();
        model.addEventListener(({ eventType }) => {
            expect(eventType).toEqual('add');
        })
        model.setData('hello')
    })
})