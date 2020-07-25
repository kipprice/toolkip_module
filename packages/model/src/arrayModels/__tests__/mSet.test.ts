import { MSet } from '../mSet';
import { setupModelWrapping } from '../../helpers/modelFactory';
import { MObject } from '../../objectModels';
import { createModelTransform } from '../../transforms';

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

    it('notifies when nested in another model', () => {
        const model = new MObject({
            set: []
        }, {
            set: createModelTransform(MSet)
        });
        
        const fn = jest.fn();
        model.addEventListener(fn);
        model.set('set', ['a']);
        expect(model.get('set')).toMatchObject(['a']);
        expect(fn).toHaveBeenCalled();
    })
})