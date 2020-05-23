// import { isIdentifiableModel, Model } from "..";
// import { Identifier, IIdentifiable } from '@toolkip/identifiable'

// describe("identfiable guards", () => {
//     it("identfies an identifiable", () => {
//         const identifiable = {
//             greeting: "hello",
//             id: "1-test"
//         }
//         const model = new IdModel(identifiable);
//         expect(isIdentifiableModel(model)).toEqual(true);
//     })

//     it("identifies a non-identifiable", () => {
//         const identifiable = {
//             greeting: "hello",
//             id: "1-test"
//         }
//         const model = new SimpleModel(identifiable);
//         expect(isIdentifiableModel(model)).toEqual(false);
//     })
// })

// interface SimpleInterface {
//     greeting: string;
//     farewell: string;
// }


// class SimpleModel extends Model<SimpleInterface> implements SimpleInterface {

//     /** greeting */
//     public get greeting () : string { return this._getValue('greeting') }
//     public set greeting (data : string) { this._setValue( "greeting", data ); }
    
//     /** farewell */
//     public get farewell () : string { return this._getValue('farewell') }
//     public set farewell (data : string) { this._setValue( "farewell", data ); }
    
// }

// class IdModel extends Model<SimpleInterface & IIdentifiable> { 

//     /** greeting */
//     public get greeting () : string { return this._getValue('greeting') }
//     public set greeting (data : string) { this._setValue( "greeting", data ); }
    
//     /** farewell */
//     public get farewell () : string { return this._getValue('farewell') }
//     public set farewell (data : string) { this._setValue( "farewell", data ); }

//     /** id */
//     public get id () : Identifier { return this._getValue('id') }
//     public set id (data : Identifier) { this._setValue( "id", data ); }
    
// }