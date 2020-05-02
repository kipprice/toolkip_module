import { _BoundView } from ".."
import { setupMatchMedia } from "../../mediaQueries/__tests__/matchMediaMock.test";
import { nextRender } from "../..";
import { SimpleBoundView } from "./simpleview";
import { ComplexBoundView } from "./complexView";
import { ComposableView } from "./composableView";
import { ISimpleModel, IComplexModel } from "./_interfaces";

describe("bound view", () => {
    setupMatchMedia();

    it("creates a simple bound view", () => {
        const simpleView = new SimpleBoundView();
        expect(simpleView.elems.name.innerHTML).toBeFalsy();
    })

    it ("updates basic data", async () => {
        const simpleView = new SimpleBoundView();
        simpleView.model = { name: "Kip", count: 0 }
        await nextRender();
        expect(simpleView.elems.name.innerHTML).toEqual("Kip");
    })

    it ("doesn't update when instructed to skip", async () => {
        const simpleView = new SimpleBoundView(true);
        simpleView.model = { name: "Kip", count: 0 }
        await nextRender();
        expect(simpleView.elems.name.innerHTML).not.toEqual("Kip");
    })

    it("updates with custom functions", async () => {
        const simpleView = new SimpleBoundView();
        simpleView.model = { name: "Kip", count: 0 }
        await nextRender();
        expect(simpleView.elems.count.innerHTML).toEqual("Total: " + 0);
    })

    it("creates a nested bound view", async () => {
        const complexView = new ComplexBoundView();
        complexView.model = {
            childArray: [], 
            childDict: {},
            coreChild: { name: "Kip", count: 0 }
        };

        // need a render per layer that's being updated
        await nextRender();
        await nextRender();

        // verify that the child view got updated
        const childView = complexView.elems.coreChild;
        expect(childView).toBeInstanceOf(SimpleBoundView);
        expect(childView.base).toBeInstanceOf(HTMLDivElement);
        expect(childView.base.childElementCount).toEqual(2);
        expect(childView.elems.name.innerHTML).toEqual("Kip");
    });

    it("creates an array of nested views", async () => {
        const complexView = new ComplexBoundView();
        complexView.model = {
            childArray: [
                { name: "c1", count: 1 },
                { name: "c2", count: 2 }
            ], 
            childDict: {},
            coreChild: { name: "Kip", count: 0 }
        };

        // need a render per layer that's being updated
        await nextRender();
        await nextRender();

        const childView = complexView.elems.childArray;
        expect(childView).toBeInstanceOf(HTMLElement);
        expect(childView.childElementCount).toEqual(2);
        
        const grandChildView = childView.children[0];
        expect(grandChildView.childElementCount).toEqual(2);
        expect(grandChildView.children[0].innerHTML).toEqual("c1");
        expect(grandChildView.children[1].innerHTML).toEqual("Total: 1");
    })

    it ("creates dict of nested views", async () => {
        const complexView = new ComplexBoundView();
        complexView.model = {
            childArray: [],
            childDict: {
                c1: { name: "c1", count: 1 },
                c2: { name: "c2", count: 2 }
            }, 
            coreChild: { name: "Kip", count: 0 }
        };

        // need a render per layer that's being updated
        await nextRender();
        await nextRender();

        const childView = complexView.elems.childDict;
        expect(childView).toBeInstanceOf(HTMLElement);
        expect(childView.childElementCount).toEqual(2);
        
        const grandChildView = childView.children[0];
        expect(grandChildView.childElementCount).toEqual(2);
        expect(grandChildView.children[0].innerHTML).toEqual("c1");
        expect(grandChildView.children[1].innerHTML).toEqual("Total: 1");
    })
})

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

        await nextRender();
        await nextRender();

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

        await nextRender();
        await nextRender();

        const countElem = elems.core.elems.count as HTMLElement;
        expect(countElem.innerHTML).toEqual("-1");
    })
})


