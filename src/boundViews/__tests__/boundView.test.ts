import { _BoundView, IBoundElemDefinition } from ".."
import { setupMatchMedia } from "../../mediaQueries/__tests__/matchMediaMock.test";
import { nextRender, IDictionary, IDrawableElements, IElemDefinition } from "../..";
import { BoundView } from "../boundView";

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
        const composed = new ComposableView<ISimpleModel>({
            cls: "base",
            children: [
                { key: "name", bindTo: "name" },
                { bindTo: "count" }
            ]
        });
        
        expect(composed.elems.base).toBeTruthy();
        expect(composed.elems.base.childElementCount).toEqual(2);
        
        expect(composed.elems.name).toBeTruthy();
        expect(composed.elems.count).toBeFalsy();

        composed.model = {
            name: "kip",
            count: 21
        };

        await nextRender();
        await nextRender();

        expect((composed.elems.name as any).innerHTML).toEqual("kip");
    })

    it("creates a nested composed view", async () => {
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
        });

        expect(composed.elems.core).toBeTruthy();
        expect((composed.elems.core as any).base.childElementCount).toEqual(2);
        
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

        const countElem = (composed.elems.core as ComposableView<IComplexModel>).elems.count as HTMLElement;
        expect(countElem.innerHTML).toEqual("-1");
    })
})

interface ISimpleModel {
    name: string;
    count: number;
}

interface IComplexModel {
    childArray: ISimpleModel[];
    coreChild: ISimpleModel;
    childDict: IDictionary<ISimpleModel>
}

abstract class SampleBV<M, E extends IDrawableElements = IDrawableElements> extends _BoundView<M> {
    protected _checkVisibility: boolean;

    constructor(doVizCheck?: boolean) {
        super();
        this._checkVisibility = doVizCheck;
    }

    protected _shouldSkipBindUpdate(elem) { 
        if (this._checkVisibility) {
            return super._shouldSkipBindUpdate(elem)
        }
        return false;
    }
}

class SimpleBoundView extends SampleBV<ISimpleModel> {

    protected _elems: {
        base: HTMLElement;
        name: HTMLElement;
        count: HTMLElement;
    }

    public get elems() { return this._elems; }

    protected _createElements() {
        this._createBase({
            key: "base",
            children: [
                { bindTo: "name", key: "name" },
                { 
                    bindTo: {
                        key: "count",
                        func: (v: number, elem: HTMLElement) => {
                            elem.innerHTML = "Total: " + v.toString();
                        }
                    }, 
                    key: "count" }
            ]
        })
    }

    
}

class ComplexBoundView extends SampleBV<IComplexModel> {

    protected _elems: {
        base: HTMLElement;
        childArray: HTMLElement;
        childDict: HTMLElement;
        coreChild: SimpleBoundView;
    };

    public get elems() { return this._elems; }
    
    protected _createElements() {
        this._createBase({
            key: "base",
            children: [
                { key: "childArray", bindTo: {
                    key: 'childArray',
                    mapToDrawable: SimpleBoundView
                }},

                { key: "childDict", bindTo: {
                    key: 'childDict',
                    mapToDrawable: () => new SimpleBoundView()
                }},

                { key: "coreChild", bindTo: "coreChild", drawable: SimpleBoundView }
            ]
        })

        this.setUpdateFunction("coreChild", (v, e) => {
            this._updateElem(v, e);
        })
    }
}

class ComposableView<T> extends BoundView<T> {
    protected _shouldSkipBindUpdate(elem) { 
        return false;
    }
}