import { _BoundView } from ".."
import { setupMatchMedia } from "../../mediaQueries/__tests__/matchMediaMock.test";
import { nextRender, IDictionary } from "../..";

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

interface SimpleModel {
    name: string;
    count: number;
}

interface ComplexModel {
    childArray: SimpleModel[];
    coreChild: SimpleModel;
    childDict: IDictionary<SimpleModel>
}

abstract class SampleBV<M> extends _BoundView<M> {
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

class SimpleBoundView extends SampleBV<SimpleModel> {

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

class ComplexBoundView extends SampleBV<ComplexModel> {

    protected _elems: {
        base: HTMLElement;
        childArray: HTMLElement;
        childDict: HTMLElement;
        coreChild: SimpleBoundView;
    }

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
            this._updateElem(e, v);
        })
    }
}