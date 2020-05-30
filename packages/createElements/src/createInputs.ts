import { IElemDefinition, IInputDefinition, IKeyedElems, IButtonDefinition } from './_interfaces';
import { IdentifierAssigner } from '@toolkip/identifiable';
import { createElement, createElements } from './createElement';

/**
 * createInput
 * ----------------------------------------------------------------------------
 * helper to easily create a form input element
 * 
 * @param   def             How to render the form input
 * @param   [keyedElems]    If provided, the object to map back into
 * 
 * @returns The created element
 */
export function createInput<T extends IKeyedElems, V>(def: IInputDefinition<T, V>, keyedElems?: T): HTMLInputElement {
    const convertedDef: IElemDefinition<T> = {
        ...def,
        type: 'input',
        attr: {
            ...def.attr,
            value: def.value,
            type: def.type
        },
        eventListeners: {
            change: def.onChange
        }
    }

    return createElement(convertedDef, keyedElems) as HTMLInputElement;
}

/**
 * createLabeledInput
 * ----------------------------------------------------------------------------
 * helper to create a 
 */
export function createLabeledInput<T extends IKeyedElems, V>(lblDef: IElemDefinition<T>, inputDef: IInputDefinition<T, V>, keyedElems?: T): [ HTMLLabelElement, HTMLInputElement ] {
    
    // ensure that we have an identifier for this to be able to pair the label effectively
    if (!inputDef.id) {
        const id = IdentifierAssigner.generateUniqueId("input", "genInput");
        inputDef.id = id;
        inputDef.attr = { ...inputDef.attr, name: id}
    }

    // point the label to the right ID
    lblDef.type = 'label';
    lblDef.attr = { ...lblDef.attr, for: inputDef.id };

    return [
        createElement(lblDef, keyedElems) as HTMLLabelElement,
        createInput(inputDef, keyedElems)
    ];
}

/**
 * createButton
 * ----------------------------------------------------------------------------
 * wrapper around createElement that makes it easier to add a new button
 */
export function createButton<T extends IKeyedElems>(def: IButtonDefinition<T>, keyedElems?: T): HTMLButtonElement {
    const convertedDef: IElemDefinition<T> = {
        ...def,
        type: 'button',
        eventListeners: {
            click: def.onClick
        },
        content: def.label
    }

    return createElement(convertedDef, keyedElems) as HTMLButtonElement;
}