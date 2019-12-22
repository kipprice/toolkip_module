import { nextRender } from "../../typescript/async/promiseTypes";

describe('testing nextRender', () => {
    it('executes after a render', async () => {
        let counter = 1;
        window.requestAnimationFrame(() => {
            counter += 2;
        })
        await nextRender();
        expect(counter).toEqual(3);
    });
})