import { isIdentifiableModel, isModel } from '..';
import { IdentifiableModel, ModelObject } from '../../objectModels';
import { setupModelWrapping } from '../../helpers/modelFactory';
import { ModelPrimitive } from '../../primitiveModels';
import { ModelArray, ModelManager } from '../../arrayModels';

setupModelWrapping();

describe('identfiable guards', () => {
    it('identfies an identifiable', () => {
        const identifiable = {
            greeting: 'hello',
            id: '1-test',
        };
        const model = new IdentifiableModel(identifiable);
        expect(isIdentifiableModel(model)).toBeTruthy();
    });

    it('identifies a non-identifiable', () => {
        const identifiable = {
            greeting: 'hello',
            id: '1-test',
        };
        const model = new ModelObject(identifiable);
        expect(isIdentifiableModel(model)).toBeFalsy();
    });
});

describe('model guards', () => {
    it('identifies a primitive model', () => {
        const m = new ModelPrimitive('hello');
        expect(isModel(m)).toBeTruthy();
    })

    it('identifies an object model', () => {
        const m = new ModelObject({ name: 'Cookie Monster', age: 10 });
        expect(isModel(m)).toBeTruthy(); 
    })

    it('identifies an array model', () => {
        const m = new ModelArray(['A', 'B', 'C']);
        expect(isModel(m)).toBeTruthy();
    })

    it ('identifies a model manager', () => {
        const m = new ModelManager();
        expect(isModel(m)).toBeTruthy();
    })

    it('identifies a non-model appropriately', () => {
        const data = { name: 'Cookie Monster', age: 10 }
        expect(isModel(data)).toBeFalsy();
        const m = new ModelObject(data);
        expect(isModel(m)).toBeTruthy();
        expect(isModel(m.getData())).toBeFalsy();
    })
});
