import { MSet } from '../mSet';
import { setupModelWrapping } from '../../helpers/modelFactory';

setupModelWrapping();

describe('MSet', () => {
    it('does not allow duplicates', () => {
        const model = new MSet<string>(['hello']);
        expect(model.add('hello')).toBeFalsy();
        expect(model.getData()).toMatchObject(['hello']);
    })

    it('allows non-duplicates', () => {
        const model = new MSet<string>(['hello']);
        expect(model.add('goodbye')).toBeTruthy();
        expect(model.getData()).toMatchObject(['hello', 'goodbye']);
    })
})