import { bind } from '..';
import { nextRender } from "@kipprice/toolkip-async";

describe('testing binding functions', () => {
    it('binds a simple primitive', async () => {
        let str = "hello";
        let test;
        bind(
            () => str,
            (newVal: string) => { test = newVal; }
        );
        
        await nextRender();
        expect(test).toEqual("hello");
        
        str = "goodbye";
        await nextRender();
        expect(test).toEqual("goodbye");
    })

    it('binds a simple property', async () => {
        let obj = { str: "hello" };
        let test;
        bind(
            () => obj.str,
            (newVal: string) => { test = newVal; }
        );

        await nextRender();
        expect(test).toEqual("hello");
        
        obj.str = "goodbye";
        await nextRender();
        expect(test).toEqual("goodbye");
    })

    it('binds a complex object', async () => {
        let obj = { str: "hello" };
        let test = obj.str;
        bind(
            () => obj,
            (o: any) => { 
                test = o.str;
            },
            null,
            (a: any, b: any) => { 
                return a.str === test;
            }
        );

        await nextRender();
        expect(test).toEqual("hello");

        obj.str = "goodbye";
        await nextRender();
        expect(test).toEqual("goodbye");

        obj = { str: "hello again" };
        await nextRender();
        expect(test).toEqual("hello again");
    })
})