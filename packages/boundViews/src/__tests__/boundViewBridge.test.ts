import { _BoundViewBridge } from '../_boundViewBridge';
import { BasicBoundViewBridge } from './classes/viewBridge';
import { setupMatchMedia } from './_shared';

setupMatchMedia();
describe('bound bridge view', () => {
    it('updates from model changes', () => {
        const bv = new BasicBoundViewBridge();
        bv.model = ['hello there'];
        expect(bv.base.innerHTML).toEqual('hello there');
    })

    it('updates as array', () => {
        const bv = new BasicBoundViewBridge();
        bv.model = ['a', 'b', 'c'];
        expect(bv.base.innerHTML).toEqual('a:b:c');
        bv.model = ['z'];
        expect(bv.base.innerHTML).toEqual('z');
    })
})

