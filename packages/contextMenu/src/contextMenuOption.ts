import { _Drawable, removeClass, addClass, hasClass } from '@toolkip/drawable';
import { IOption } from './_interfaces';
import { createElement } from '@toolkip/create-elements';

export class ContextMenuOption extends _Drawable<'menuSelectedText' | '<menuSelectedBG' | 'menuSelectedBorder', any, IOption> {

    //..........................................
    //#region STYLES
    
    protected static _uncoloredStyles = {
        ".ctxOption" : {
			padding: "4px 10px",
			cursor: "pointer",
            position: "relative",
            
            nested: {
                '.subMenu.disabled': {
                    display: 'none'
                },

                '.subMenu': {
                    position: 'absolute',
                    backgroundColor: "<menuOptBG>",
                    width: "100%",
                    top: "0",
                    boxShadow: "1px 1px 1px 1px rgba(0,0,0,.1)",
                    left: "calc(100% - 1px)",
                    borderLeft: "1px solid <menuBorder>"
                },

                '.subMenu .subMenu': {
                    backgroundColor: "<menuOptNested>",
			        borderLeft: "1px solid <menuBorderNested>"
                }
            }
        },

		".ctxOption:hover": {
			backgroundColor: "<menuSelectedText:#DDD>",
			color: "<menuOptBG:#000>",
            borderLeft: "7px solid <menuSelectedBorder>",
            
            nested: {
                '.subMenu:not(.disabled)': {
                    display: 'block'
                }
            }
		}
    }
    
    //#endregion
    //..........................................

    //.....................
    //#region PROPERTIES
    
    protected _elems: {
        base: HTMLElement;
        label: HTMLElement;
        sub_menu: HTMLElement;
    };
    public get elems() { return this._elems; }
    
    //#endregion
    //.....................

    protected _createElements(opts: IOption) {
        this._createBase({
            cls: 'ctxOption',
            eventListeners: {
                click: (e) => {
                    opts.callback(e)
                }
            },
            children: [
                { key: 'label', content: opts.label },
                { key: 'sub_menu', cls: 'subMenu hidden disabled'}
            ]
        });
    }

    /**
	 * _createSubMenu
	 * ----------------------------------------------------------------------------
	 * creates a sub menu 
	 * @param	srcOption	The option to nest under
	 */
	private _createSubMenu(noStyles?: boolean): void {
        removeClass(this._elems.sub_menu, 'disabled');
		this._elems.label.innerHTML += "...";
    }
    
    public addOption(subOption: IOption, noStyles?: boolean) {
        if (hasClass(this._elems.sub_menu, 'disabled')) { 
            this._createSubMenu(noStyles);
        }

        const out = new ContextMenuOption(subOption);
        out.draw(this._elems.sub_menu);
        return out;
    }
}