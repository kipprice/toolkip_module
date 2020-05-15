import { clone } from "..";

describe('Cloning functions', () => {
    it('clones primitives appropriately', () => {
        expect(clone('abc')).toEqual('abc');
        expect(clone(123)).toEqual(123);
        expect(clone(true)).toEqual(true);
        expect(clone(null)).toEqual(null);
        expect(clone(undefined)).toEqual(undefined);
        // TODO: symbol cloning
    })

    it('clones a primitive array', () => {
        const arr = ['a','b', 'c'];
        expect(clone(arr)).toMatchObject(arr);
        expect(clone(arr) === arr).toBeFalsy();
    });

    it('clones a primitive object', () => {
        const obj = { name: 'Kip', age: 30 };
        expect(clone(obj)).toMatchObject(obj);
        expect(clone(obj) === obj).toBeFalsy();
    })

    it('clones a date appropriately', () => {
        const dt = new Date('2020-02-14');
        expect(clone(dt).valueOf()).toEqual(dt.valueOf());
        expect(clone(dt) === dt).toBeFalsy();
    })

    it('handles nested objects', () => {
        const obj = {
            name: 'Kip',
            info: {
                'email': 'email@email.com',
                'cell': '+1 888 000-0000'
            }
        }
        expect(clone(obj)).toMatchObject(obj);
    })

    it('handles custom cloning functions', () => {
        const obj = {
            name: 'Kip',
            date: '2020-02-14'
        }

        const clonedObj = clone<any>(obj, [{
            typeGuard: (v, key) => key === 'date',
            cloner: (v) => new Date(v as any) as any
        }]);

        expect(clonedObj).toMatchObject({
            name: 'Kip',
            date: new Date('2020-02-14')
        });
    });

    it('handles class cloning', () => {
        class Clonable {
            protected _property: string;
            public getProperty(): string { return this._property; }
            public doSomething() { return this._property + "!"; }

            constructor(prop: string) {
                this._property = prop;
            }
        }
        const clonable = new Clonable('hello');
        const cloned = clone(clonable);
        expect(cloned.getProperty()).toEqual(clonable.getProperty());
        expect(cloned.doSomething()).toEqual(clonable.doSomething());
    });
})