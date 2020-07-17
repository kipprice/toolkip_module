import { _Drawable } from '@toolkip/drawable';
import { IShieldElements, IShieldOptions } from "./_interfaces";
import { IStandardStyles } from '@toolkip/style-helpers';


export abstract class _Shield<O extends IShieldOptions = IShieldOptions> extends _Drawable<'lightBackground' | 'darkBackground', IShieldElements, O> {

    //.....................
    //#region PROPERTIES
    
    protected _elems: IShieldElements;

    protected _showElementTimeout: number;

    protected _showingAtInstant: Date;
    
    //#endregion
    //.....................

    protected static _uncoloredStyles: IStandardStyles = {
        ".kipShield": {
            position: "fixed",
            backgroundColor: "<darkBackground:rgba(0,0,0,0.6)>",
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
            zIndex: "100"
        },

        '.kipShield.light': {
            backgroundColor: '<lightBackground:rgba(255,255,255,0.85)>'
        },

        ".kipShield .shieldContent": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%"
        }
    }

    constructor(opts?: O) {
        super(opts);
    }

    protected _createElements(opts?: O): void {
        this._createBase({
            key: 'base',
            cls: ['kipShield', opts?.theme],

            eventListeners: {
                click: () => opts?.onOverlayClick()
            },
            
            children: [{
                key: 'shieldContent',
                cls: 'shieldContent',
                eventListeners: {
                    click: (e) => e.stopPropagation()
                }
            }]
        })

        this._createShieldDetails(opts);
    };

    protected abstract _createShieldDetails(opts: O): void;

    public draw(parent?: HTMLElement): void {
        if (!parent) { parent = document.body; }

        // make sure the shield only shows if we are showing for long enough
        // for a human brain to process it
        this._showElementTimeout = window.setTimeout(() => {
            super.draw(parent);
            this._showElementTimeout = null;
        }, 200);
    }

    public erase(): void {
        if (this._showElementTimeout) {
            window.clearTimeout(this._showElementTimeout);
            return;
        }
        super.erase();
    }

}
