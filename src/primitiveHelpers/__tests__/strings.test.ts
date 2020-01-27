import { join } from "..";

describe('primitiveHelpers -> strings', () => {
    it('joins strings appropriately', () => {
        let out = join('::', 'A', 'B', 'ZED');
        expect(out).toEqual("A::B::ZED")
    })

    
})