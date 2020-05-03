"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const toolkip_async_1 = require("@kipprice/toolkip-async");
describe('testing binding functions', () => {
    it('binds a simple primitive', () => __awaiter(void 0, void 0, void 0, function* () {
        let str = "hello";
        let test;
        __1.bind(() => str, (newVal) => { test = newVal; });
        yield toolkip_async_1.nextRender();
        expect(test).toEqual("hello");
        str = "goodbye";
        yield toolkip_async_1.nextRender();
        expect(test).toEqual("goodbye");
    }));
    it('binds a simple property', () => __awaiter(void 0, void 0, void 0, function* () {
        let obj = { str: "hello" };
        let test;
        __1.bind(() => obj.str, (newVal) => { test = newVal; });
        yield toolkip_async_1.nextRender();
        expect(test).toEqual("hello");
        obj.str = "goodbye";
        yield toolkip_async_1.nextRender();
        expect(test).toEqual("goodbye");
    }));
    it('binds a complex object', () => __awaiter(void 0, void 0, void 0, function* () {
        let obj = { str: "hello" };
        let test = obj.str;
        __1.bind(() => obj, (o) => {
            test = o.str;
        }, null, (a, b) => {
            return a.str === test;
        });
        yield toolkip_async_1.nextRender();
        expect(test).toEqual("hello");
        obj.str = "goodbye";
        yield toolkip_async_1.nextRender();
        expect(test).toEqual("goodbye");
        obj = { str: "hello again" };
        yield toolkip_async_1.nextRender();
        expect(test).toEqual("hello again");
    }));
});
