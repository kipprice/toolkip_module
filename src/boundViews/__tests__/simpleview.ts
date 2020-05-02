import { SampleBV } from "./_shared";
import { ISimpleModel } from "./_interfaces";

export class SimpleBoundView extends SampleBV<ISimpleModel> {

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