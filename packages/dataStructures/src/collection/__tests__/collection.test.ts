import { Collection } from '../collection';
import { SortOrderEnum } from '@toolkip/comparable';
import { CollectionTypeEnum } from '../_interfaces';

describe('Collection', () => {
    describe('adding', () => {
        it('adds elements that are not yet present', () => {
            const collection = new Collection();
            collection.add('a', 1);
            expect(collection.toString()).toEqual('a => 1')
        })

        it('adds multiple elements under different keys', () => {
            const collection = new Collection();
            collection.add('a', 1);
            collection.add('b', 2);
            expect(collection.toString()).toEqual('a => 1, b => 2');
        })

        it('adds element to the right spot', () => {
            const collection = new Collection();
            expect(collection.add('a', 1)).toEqual(0);
            expect(collection.add('b', 2)).toEqual(1);
        })

        it('replaces when appropriate', () => {
            const collection = new Collection(CollectionTypeEnum.ReplaceDuplicateKeys);
            collection.add('a', 1);
            const reAdd = collection.add('a', 5);
            expect(collection.toString()).toEqual('a => 5');
            expect(reAdd).not.toEqual(-1);
        })

        it('returns the right index when replacing', () => {
            const collection = new Collection(CollectionTypeEnum.ReplaceDuplicateKeys);
            collection.add('a', 1);
            collection.add('b', 2);
            collection.add('c', 3);
            const reAdd = collection.add('b', 5);
            expect(reAdd).toEqual(1)
        })

        it('does not replace if not enabled', () => {
            const collection = new Collection(CollectionTypeEnum.IgnoreDuplicateKeys);
            collection.add('a', 1);
            const reAdd = collection.add('a', 5);
            expect(collection.toString()).toEqual('a => 1')
            expect(reAdd).toEqual(-1);
        })
    })
    

    describe('removing', () => {
        it('removes a single element', () => {
            const collection = new Collection();
            collection.add('a', 1);
            collection.add('b', 2);
            collection.add('c', 3);
            collection.remove('b');
            expect(collection.toString()).toEqual('a => 1, c => 3');
            expect(collection.toArray()).toMatchObject([
                { key: 'a', value: 1 },
                { key: 'c', value: 3 }
            ])
        })

        it('removes the last element', () => {
            const collection = new Collection();
            collection.add('a', 1);
            collection.remove('a');
            expect(collection.toString()).toEqual('');
        })

        it('removes from a sorted array appropriately', () => {
            const collection = new Collection();
            collection.add('a', 3);
            collection.add('b', 4);
            collection.add('c', 1);
            collection.add('d', 2);
            collection.sort((a, b) => {
                return (a.value < b.value) ? 
                            SortOrderEnum.CORRECT_ORDER 
                            : (a.value > b.value) ? 
                                SortOrderEnum.INCORRECT_ORDER 
                                : 0
            });
            collection.remove('a');
            expect(collection.toString()).toEqual('c => 1, d => 2, b => 4');
            expect(collection.getIndex('b')).toEqual(2)
        })

        it('removes multiples from the sorted array appropriately', () => {
            const collection = new Collection();
            collection.add('a', 3);
            collection.add('b', 4);
            collection.add('c', 1);
            collection.add('d', 2);
            collection.sort((a, b) => {
                return (a.value < b.value) ? 
                            SortOrderEnum.CORRECT_ORDER 
                            : (a.value > b.value) ? 
                                SortOrderEnum.INCORRECT_ORDER 
                                : 0
            });
            collection.remove('d');
            collection.remove('a');
            expect(collection.toString()).toEqual('c => 1, b => 4');
            expect(collection.getIndex('b')).toEqual(1);
        })
    })

    describe('finding', () => {
        it('gets an element by ID', () => {
            const collection = new Collection();
            collection.add('a', 1);
            collection.add('b', 2);
            expect(collection.getElement('a')).toMatchObject({ key: 'a', value: 1 });
        })

        it('gets a value by ID', () => {
            const collection = new Collection();
            collection.add('a', 1);
            collection.add('b', 2);
            expect(collection.getValue('a')).toEqual(1);
        })
        it('gets an index', () => {
            const collection = new Collection();
            collection.add('a', 1);
            collection.add('b', 2);
            collection.add('c', 3);
            expect(collection.getIndex('b')).toEqual(1);
        })

        it('gets a sorted index', () => {
            const collection = new Collection();
            collection.add('a', 3);
            collection.add('b', 4);
            collection.add('c', 1);
            collection.add('d', 2);
            collection.sort((a, b) => {
                return (a.value < b.value) ? 
                            SortOrderEnum.CORRECT_ORDER 
                            : (a.value > b.value) ? 
                                SortOrderEnum.INCORRECT_ORDER 
                                : 0
            });
            expect(collection.getIndex('c')).toEqual(0);
        })
    })

    describe('exporting', () => {
        it('converts to a key-val array', () => {
            const collection = new Collection();
            collection.add('a', 1);
            collection.add('b', 2);
            const result = collection.toArray();
            expect(result).toMatchObject([
                { key: 'a', value: 1 },
                { key: 'b', value: 2 }
            ]);
        })

        it('converts to a val array', () => {
            const collection = new Collection();
            collection.add('a', 1);
            collection.add('b', 2);
            const result = collection.toValueArray();
            expect(result).toMatchObject([ 1, 2 ]);
        })

        it('converts to a key-val dict', () => {
            const collection = new Collection();
            collection.add('a', 1);
            collection.add('b', 2);
            const result = collection.toDictionary();
            expect(result).toMatchObject({
                a: { key: 'a', value: 1 },
                b: { key: 'b', value: 2 }
            });
        })

        it('converts to a val array', () => {
            const collection = new Collection();
            collection.add('a', 1);
            collection.add('b', 2);
            const result = collection.toValueDictionary();
            expect(result).toMatchObject({ a: 1, b: 2 });
        })
    });

    describe('sorting', () => {
        it('can sort values', () => {
            const collection = new Collection();
            collection.add('a', 2);
            collection.add('b', 1);
            collection.sort((a, b) => (a.value < b.value) ? SortOrderEnum.CORRECT_ORDER : (a.value > b.value) ? SortOrderEnum.INCORRECT_ORDER : 0);
            expect(collection.toValueArray()).toMatchObject([ 1, 2 ]);
            expect(collection.toArray()).toMatchObject([
                { key: 'b', value: 1 },
                { key: 'a', value: 2 }
            ])
        })

        it('stringifies to the sorted order', () => {
            const collection = new Collection();
            collection.add('a', 2);
            collection.add('b', 1);
            collection.sort((a, b) => (a.value < b.value) ? SortOrderEnum.CORRECT_ORDER : (a.value > b.value) ? SortOrderEnum.INCORRECT_ORDER : 0);
            expect(collection.toString()).toEqual('b => 1, a => 2');
        })
    })
})