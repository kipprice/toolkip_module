import { ComposableView } from './classes/composableView';
import { ISimpleModel, IComplexModel } from './classes/_interfaces';
import { setupMatchMedia } from './_shared';

setupMatchMedia();

describe("composable bound view", () => {
    it("creates a composed bound view", async () => {
        const elems: {
            base: HTMLElement;
            name: HTMLElement;
            count: HTMLElement
        } = {} as any;

        const composed = new ComposableView<ISimpleModel>({
            cls: "base",
            children: [
                { key: "name", bindTo: "name" },
                { bindTo: "count" }
            ]
        }, elems);
        
        expect(elems.base).toBeTruthy();
        expect(elems.base.childElementCount).toEqual(2);
        
        expect(elems.name).toBeTruthy();
        expect(elems.count).toBeFalsy();

        composed.model = {
            name: "kip",
            count: 21
        };

        expect((elems.name as any).innerHTML).toEqual("kip");
    })

    it("creates a nested composed view", async () => {

        const elems: {
            base: HTMLElement;
            core: ComposableView<ISimpleModel>;
        } = {} as any;

        const composed = new ComposableView<IComplexModel>({
            children: [
                { key: "core", bindTo: "coreChild", drawable: () => new ComposableView<ISimpleModel>({
                    children: [
                        { bindTo: "name" },
                        { bindTo: "count", key: "count" }
                    ]
                }) },
                { bindTo: "childArray", key: "array" },
                { bindTo: "childDict" }
            ]
        }, elems);

        expect(elems.core).toBeTruthy();
        expect((elems.core as any).base.childElementCount).toEqual(2);
        
        composed.model = {
            coreChild: {
                name: "abc",
                count: -1
            }, 
            childArray: [],
            childDict: {}
        }

        const countElem = elems.core.elems.count as HTMLElement;
        expect(countElem.innerHTML).toEqual("-1");
    })
})