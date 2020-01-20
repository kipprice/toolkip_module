import { _CodeEvent } from '../../codeEvent';

class _SimpleEvent extends _CodeEvent<{data: number}> {
    protected get _name(): string { return "simpleevent"; }
}

export const SimpleEvent = new _SimpleEvent();