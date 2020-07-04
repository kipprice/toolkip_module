import { _KeyedModel } from '../_keyedModel';
import { MObject } from '../../objectModels';
import { setupModelWrapping } from '../../helpers';

class TestObject extends MObject<{ key: string, value: number }> { }

setupModelWrapping();

describe('Abstract models', () => {
    it('fires events on class extensions', () => {
        const t = new TestObject({ key: 'hello', value: 10 });
        const fn = jest.fn();
        t.addEventListener(fn);
        t.set('key', 'goodbye');
        t.set('value', 5);
        expect(fn).toHaveBeenCalledTimes(2);
    })
})