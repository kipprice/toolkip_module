import { _BoundView } from ".."
import { SimpleBoundView } from "./classes/simpleview";
import { ComplexBoundView } from "./classes/complexView";
import { setupMatchMedia } from './_shared';
import { ArrayBoundView } from './classes/arrayView';
import { nextRender } from '@toolkip/async';

setupMatchMedia();

describe("bound view", () => {

    it("creates a simple bound view", () => {
        const simpleView = new SimpleBoundView();
        expect(simpleView.elems.name.innerHTML).toBeFalsy();
    })

    it ("updates basic data", async () => {
        const simpleView = new SimpleBoundView();
        simpleView.model = { name: "Kip", count: 0 }
        expect(simpleView.elems.name.innerHTML).toEqual("Kip");
    })

    it('updates array data', async () => {
        const arrayView = new ArrayBoundView();
        arrayView.model = [
            { name: 'Big Bird', count: 0 },
            { name: 'Oscar', count: 10 }
        ];
        arrayView.draw();
        await nextRender();
        expect(arrayView.base.children).toHaveLength(2);
    })

    it ('does not update when instructed to skip', async () => {
        const simpleView = new SimpleBoundView(true);
        simpleView.model = { name: "Kip", count: 0 }
        expect(simpleView.elems.name.innerHTML).not.toEqual("Kip");
    })

    it("updates with custom functions", async () => {
        const simpleView = new SimpleBoundView();
        simpleView.model = { name: "Kip", count: 0 }
        expect(simpleView.elems.count.innerHTML).toEqual("Total: 0");
    })

    it("creates a nested bound view", async () => {
        const complexView = new ComplexBoundView();
        complexView.model = {
            childArray: [], 
            childDict: {},
            coreChild: { name: "Kip", count: 0 }
        };

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

        const childView = complexView.elems.childDict;
        expect(childView).toBeInstanceOf(HTMLElement);
        expect(childView.childElementCount).toEqual(2);
        
        const grandChildView = childView.children[0];
        expect(grandChildView.childElementCount).toEqual(2);
        expect(grandChildView.children[0].innerHTML).toEqual("c1");
        expect(grandChildView.children[1].innerHTML).toEqual("Total: 1");
    })
})
