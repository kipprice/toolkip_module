import { ErrorRenderer, ErrorType } from '../_interfaces';

export abstract class _StringRenderer implements ErrorRenderer {
    public error(details: any): boolean {
        const msg = this._generateMessage('error', details)
        return this._innerWarn(msg);
    }
    public warn(details: any): boolean {
        const msg = this._generateMessage('warning', details)
        return this._innerWarn(msg);
    }
    public log(details: any): boolean {
        const msg = this._generateMessage('info', details)
        return this._innerWarn(msg);
    }

    private _generateMessage(type: ErrorType, details: any): string {
        return `${type.toUpperCase()}: ${JSON.stringify(details)}`;
    }

    protected abstract _innerError(msg: string): boolean;
    protected abstract _innerWarn(msg: string): boolean;
    protected abstract _innerLog(msg: string): boolean;
}