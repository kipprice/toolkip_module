import { isIdentifiableModel, isModel, isArrayModel, isObjectModel, isPrimitiveModel, isDateModel, isManagerModel } from '..';
import { MIdentifiable, MObject } from '../../objectModels';
import { setupModelWrapping } from '../../helpers/modelFactory';
import { MPrimitive, MDate } from '../../primitiveModels';
import { MArray, MManager } from '../../arrayModels';

setupModelWrapping();

describe('identfiable guards', () => {
    it('identfies an identifiable', () => {
        const identifiable = {
            greeting: 'hello',
            id: '1-test',
        };
        const model = new MIdentifiable(identifiable);
        expect(isIdentifiableModel(model)).toBeTruthy();
    });

    it('identifies a non-identifiable', () => {
        const identifiable = {
            greeting: 'hello',
            id: '1-test',
        };
        const model = new MObject(identifiable);
        expect(isIdentifiableModel(model)).toBeFalsy();
    });
});

describe('model guards', () => {
    it('identifies a primitive model', () => {
        const m = new MPrimitive('hello');
        expect(isModel(m)).toBeTruthy();
        expect(isPrimitiveModel(m)).toBeTruthy();
    })

    it('identifies a date model', () => {
        const m = new MDate(new Date('2020-05-20'));
        expect(isModel(m)).toBeTruthy();
        expect(isDateModel(m)).toBeTruthy();
    })

    it('identifies an object model', () => {
        const m = new MObject({ name: 'Cookie Monster', age: 10 });
        expect(isModel(m)).toBeTruthy(); 
        expect(isObjectModel(m)).toBeTruthy();
    })

    it('identifies an array model', () => {
        const m = new MArray(['A', 'B', 'C']);
        expect(isModel(m)).toBeTruthy();
        expect(isArrayModel(m)).toBeTruthy();
    })

    it ('identifies a model manager', () => {
        const m = new MManager();
        expect(isModel(m)).toBeTruthy();
        expect(isManagerModel(m)).toBeTruthy();
    })

    it('identifies a non-model appropriately', () => {
        const data = { name: 'Cookie Monster', age: 10 }
        expect(isModel(data)).toBeFalsy();
        const m = new MObject(data);
        expect(isModel(m)).toBeTruthy();
        expect(isModel(m.getData())).toBeFalsy();
    })
});
