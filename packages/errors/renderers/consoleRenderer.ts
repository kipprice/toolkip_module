import { _StringRenderer } from "./_stringRenderer";

export class ConsoleRenderer extends _StringRenderer {
    
    protected _innerError(msg: string): boolean {
        console.error(msg);
        return true;
    }

    protected _innerWarn(msg: string): boolean {
        console.warn(msg);
        return true;
    }

    protected _innerLog(msg: string): boolean {
        console.log(msg);
        return true;
    }

}