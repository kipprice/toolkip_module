import { _StringRenderer } from "./_stringRenderer";

export class SilentRenderer extends _StringRenderer {

    private _history: string[];
    public get history(): string[] { return this._history; }

    protected _innerError(msg: string) {
        return this._addToHistory(msg);
    }

    protected _innerWarn(msg: string) {
        return this._addToHistory(msg);
    }

    protected _innerLog(msg: string) {
        return this._addToHistory(msg);
    }

    protected _addToHistory(msg: string): boolean {
        this._history.push(msg);
        return true;
    }
}