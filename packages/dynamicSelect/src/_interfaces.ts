import { IDrawableElements } from '@kipprice/toolkip-drawable';

export interface IDynamicSelect {
    select(opt: IDynamicOption)
}
/**
     * IDynamicOptionElems
     * 
     * 
     * 
     */
    export interface IDynamicOptionElems extends IDrawableElements {
        base: HTMLElement;
        text: HTMLElement;
    }

    /**
     * IDynamicOption
     * ----------------------------------------------------------------------------
     * Keep track of a choice for a dynamic selection
     */
    export interface IDynamicOption {
        id: string;
        display: string;
    }

    /**
     * IDynamicSelectElems
     * ----------------------------------------------------------------------------
     * Keep track of the elements used in the Dynamic Select field
     */
    export interface IDynamicSelectElems extends IDrawableElements {
        input: HTMLInputElement;
        drawer: HTMLElement;
        optionContainer: HTMLElement;
        loadingIcon: HTMLElement;
        innerOptions: HTMLElement;
        clearBtn: HTMLElement;
    }