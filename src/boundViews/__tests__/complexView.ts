import { SampleBV } from "./_shared";
import { IComplexModel } from "./_interfaces";
import { SimpleBoundView } from "./simpleview";

export class ComplexBoundView extends SampleBV<IComplexModel> {

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