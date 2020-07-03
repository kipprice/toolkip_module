import { addClasses, getClasses, addClass, removeClass } from '../css';

const createElem = (startingCls?: string) => { 
    const elem = document.createElement('span');
    if (startingCls) { elem.className = startingCls; }
    return elem;
}

describe('addClass', () => {
    it('adds a class', () => {
        const elem = createElem();
        addClass(elem, 'a');
        expect(elem.className).toEqual('a');
    })

    it('adds to a class with existing classes', () => {
        const elem = createElem('x y z');
        addClass(elem, 'a');
        expect(elem.className).toEqual('x y z a');
    })

    it('does not add superfluous spaces', () => {
        const elem = createElem();
        addClass(elem, '   a   ');
        expect(elem.className).toEqual('a');
    })

    it('does not add the class if it already is applied', () => {
        const elem = createElem('c a b');
        addClass(elem, 'a');
        expect(elem.className).toEqual('c a b');
    })

    it('can add multiple classes', () => {
        const elem = createElem('x y z');
        addClass(elem, 'a b c');
        expect(elem.className).toEqual('x y z a b c');
    })
})

describe('addClasses', () => {
    it('adds a class', () => {
        const elem = createElem();
        addClasses(elem, 'a');
        expect(elem.className).toEqual('a');
    })

    it('adds multiple classes', () => {
        const elem = createElem();
        addClasses(elem, 'a', 'b');
        expect(elem.className).toEqual('a b');
    })

    it('does not add the same class', () => {
        const elem = createElem('c a b');
        addClasses(elem, 'a');
        expect(elem.className).toEqual('c a b');
    })
})

describe('getClasses', () => {
    it('returns an empty array when an elem has no classes', () => {
        const elem = createElem();
        const result = getClasses(elem);
        expect(result).toMatchObject([])
    })
})

describe('removeClass', () => {
    it('removes a class', () => {
        const elem = createElem('b a');
        removeClass(elem, 'a');
        expect(elem.className).toEqual('b');
    })

    it('removes the last class', () => {
        const elem = createElem('a');
        removeClass(elem, 'a');
        expect(elem.className).toBeFalsy();
    })

    it('does not affect an element without the class', () => {
        const elem = createElem('a b c');
        removeClass(elem, 'z');
        expect(elem.className).toEqual('a b c');
    })

    it('can remove multiple consecutive classes', () => {
        const elem = createElem('a b c');
        removeClass(elem, 'b c');
        expect(elem.className).toEqual('a');
    })
})