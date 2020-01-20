import { BucketHelper } from '../bucketer';
describe('bucketer', () => {
    it('buckets appropriately', () => {
        let values = [
            { name: 'a', value: 'one' },
            { name: 'b', value: 'two' },
            { name: 'c', value: 'one' }
        ];
        let comp = BucketHelper.bucket(
            values, 
            (elem) => elem.value
        )

        expect(comp).toMatchObject({
            'one': [{ name: 'a', value: 'one' }, { name: 'c', value: 'one' }],
            'two': [{ name: 'b', value: 'two' }]
        });
    });

    it('fails gracefully when there is nothing to bucket', () => {
        expect(
            () => BucketHelper.bucket(null, () => 'hello' )
        ).not.toThrowError();

        expect(
            () => BucketHelper.bucket([], () => 'hello' )
        ).not.toThrowError();
    });
})