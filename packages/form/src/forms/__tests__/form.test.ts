import { EmbeddedForm } from '../embeddedForm';
import { _Form } from '../_form';
import { FullScreenForm } from '../fullScreenForm';
import { PopupForm } from '../popupForm';
import { TextField, NumberField } from '../../simpleFields';
import { InlineForm } from '../inlineForm';

setupMatchMedia();

// taken from this stack overflow post:
// https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
function setupMatchMedia() {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
}

const formChildren = {
    name: new TextField('name'),
    age: new NumberField('age')
}

describe('Embedded Form', () => {
    it('creates an embedded form', () => {
        const frm = new EmbeddedForm({ });
        expect(frm).toBeInstanceOf(_Form);
    })

    it('creates with elements', () => {
        const frm = new EmbeddedForm({ }, formChildren);
        expect(frm).toBeInstanceOf(_Form);
        const nameField = frm.base.querySelector("#name\\|input");
        expect(nameField).toBeTruthy();
        expect(nameField).toBeInstanceOf(HTMLInputElement);
    })

})

describe('Fullscreen Form', () => {

    it('creates a fullscreen form', () => {
        const frm = new FullScreenForm({});
        expect(frm).toBeInstanceOf(_Form);
    })

    it('creates with elements', () => {
        const frm = new FullScreenForm({ }, formChildren);
        expect(frm).toBeInstanceOf(_Form);
        const nameField = frm.base.querySelector("#name\\|input");
        expect(nameField).toBeTruthy();
        expect(nameField).toBeInstanceOf(HTMLInputElement);
    })
})

describe('Popup Form', () => {
    it('creates a popup form', () => {
        const frm = new PopupForm({});
        expect(frm).toBeInstanceOf(_Form);
    })

    it('creates with elements', () => {
        const frm = new PopupForm({ }, formChildren);
        expect(frm).toBeInstanceOf(_Form);
        const nameField = frm.base.querySelector("#name\\|input");
        expect(nameField).toBeTruthy();
        expect(nameField).toBeInstanceOf(HTMLInputElement);
    })
})

describe('Inline Form', () => {
    it('creates inline form', () => {
        const frm = new InlineForm({});
        expect(frm).toBeInstanceOf(_Form)
    })
})
