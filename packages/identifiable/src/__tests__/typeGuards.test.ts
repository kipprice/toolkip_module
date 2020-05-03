import { isIdentifiableModel, IIdentifiable } from "..";
import { _Model } from "@kipprice/toolkip-model";

describe("identfiable guards", () => {
    it("identfies an identifiable", () => {
        const identifiable = {
            greeting: "hello",
            id: "1-test"
        }
        const model = new IdModel(identifiable);
        expect(isIdentifiableModel(model)).toEqual(true);
    })

    it("identifies a non-identifiable", () => {
        const identifiable = {
            greeting: "hello",
            id: "1-test"
        }
        const model = new Model(identifiable);
        expect(isIdentifiableModel(model)).toEqual(false);
    })
})

interface SimpleInterface {
    greeting: string;
    farewell: string;
}


class Model extends _Model<SimpleInterface> implements SimpleInterface {

    /** greeting */
    protected _greeting: string;
    public get greeting () : string { return this._greeting; }
    public set greeting (data : string) { this._setValue( "greeting", data ); }
    
    /** farewell */
    protected _farewell: string;
    public get farewell () : string { return this._farewell; }
    public set farewell (data : string) { this._setValue( "farewell", data ); }
    
 }

class IdModel extends _Model<SimpleInterface & IIdentifiable> { 

    /** greeting */
    protected _greeting: string;
    public get greeting () : string { return this._greeting; }
    public set greeting (data : string) { this._setValue( "greeting", data ); }
    
    /** farewell */
    protected _farewell: string;
    public get farewell () : string { return this._farewell; }
    public set farewell (data : string) { this._setValue( "farewell", data ); }

    /** id */
    protected _id: string;
    public get id () : string { return this._id; }
    public set id (data : string) { this._setValue( "id", data ); }
    
}