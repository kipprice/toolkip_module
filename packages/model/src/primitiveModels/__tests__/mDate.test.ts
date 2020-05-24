import { MDate } from "../modelDate";

describe('ModelDate', () => {
    it('has an appropriate default value', () => {
        const model = new MDate();
        expect(model.getData()).toEqual(null);
    })

    it('handles importing an existing date', () => {
        const dt = new Date('2020-10-10 00:00Z-05:00');
        const model = new MDate(dt);
        expect(model.getData().getDate()).toEqual(10);
    });

    it('does not allow modifications outside of setData', () => {
        const dt = new Date('2020-10-10 00:00Z-05:00');
        const model = new MDate(dt);
        dt.setDate(20);
        expect(model.getData().getDate()).toEqual(10);
    })

    it('can do a string transform', () => {
        const dtString = '2020-05-20 00:00Z-05:00';
        const model = new MDate(dtString);
        expect(model.getData().getDate()).toEqual(20);
    })

    it('can export to a string', () => {
        const date = new Date('2020-05-20 00:00Z-05:00');
        const model = new MDate(date);
        expect(model.export()).toContain('Wed May 20 2020');
    })
})