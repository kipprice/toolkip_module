import { ModelDate } from "../modelDate";

describe('ModelDate', () => {
    it('has an appropriate default value', () => {
        const model = new ModelDate();
        expect(model.getData()).toEqual(null);
    })

    it('handles importing an existing date', () => {
        const dt = new Date('2020-10-10 00:00Z-05:00');
        const model = new ModelDate(dt);
        expect(model.getData().getDate()).toEqual(10);
        dt.setDate(20);
        expect(model.getData().getDate()).toEqual(10);
    });
})