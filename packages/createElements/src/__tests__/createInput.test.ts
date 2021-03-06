import { createInput, createButton, createLabeledInput } from '../createInputs';

describe('creating inputs', () => {
    it('creates an input', () => {
        const input = createInput({
            type: 'number',
            id: 'ipt'
        });
        expect(input.id).toEqual('ipt');
        expect(input.tagName).toEqual('INPUT');
        expect(input.getAttribute('type')).toEqual('number');
    })

    it('can listen for an event on the input', () => {
        const cb = jest.fn();
        const input = createInput({
            type: 'number',
            onChange: (ev) => { cb(); }
        });

        const changeEvent = new Event('change');
        input.dispatchEvent(changeEvent);
        expect(cb).toHaveBeenCalled();
    })

    it('can create a label with the input', () => {
        const [ label, input ] = createLabeledInput(
            { content: 'hello' },
            { type: 'number', id: 'btn_id' }
        );
        expect(input.tagName).toEqual('INPUT');
        expect(input.getAttribute('type')).toEqual('number')
        expect(label.tagName).toEqual('LABEL');
        expect(label.getAttribute('for')).toEqual('btn_id');
    })

    it('creates an id for the pair', () => {
        const [ label, input ] = createLabeledInput(
            { content: 'labelling' },
            { type: 'text' },
        );
        const id = input.id;
        expect(id).toBeTruthy();
        expect(label.getAttribute('for')).toEqual(id);
    })
})

describe('creating buttons', () => {
    it('creates a button', () => {
        const btn = createButton({
            label: 'Click Me',
            onClick: () => null
        });
        expect(btn.tagName).toEqual('BUTTON');
        expect(btn.innerHTML).toEqual('Click Me');
    })

    it('fires an event', () => {
        const cb = jest.fn();
        const btn = createButton({ label: 'Click Me', id: 'btn', onClick: cb });
        btn.click();
        expect(cb).toHaveBeenCalled();

    })
})