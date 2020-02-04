/**----------------------------------------------------------------------------
 * @class	StyleRuleHelper
 * ----------------------------------------------------------------------------
 * keep track of the alreeady defined CSS rules
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _StyleRuleHelper {

    public getCssRule(selector: string, skipExistingSelector?: boolean): CSSStyleRule {
        return this._getCssRule(selector, skipExistingSelector);
    }

    /**
     * _getCSSRule
     * ----------------------------------------------------------------------------
     * Get an existing selector, or spin up a new CSS Rule to use in our class def
     */
    private _getCssRule(selector: string, skipExistingSelector: boolean): CSSStyleRule {
        let cssRule: CSSStyleRule;

        // check for an existing rule
        if (!skipExistingSelector) { 
            cssRule = this._getExistingSelector(selector); 
        }
        
        // create a new rule if we couldn't / shouldn't find an existing one
        if (!cssRule) { 
            cssRule = { style: {} } as CSSStyleRule; 
        }
        return cssRule;
    }

    /**
     * _getExistingSelector
     * ----------------------------------------------------------------------------
     * Checks to find an already-existing version of this particular selector, so 
     * that the definitions can be combined
     * 
     * @param   selector    Selector to find
     * 
     * @returns Associated styles with this selector 
     */
    private _getExistingSelector(selector: string): CSSStyleRule {

        // Loop through all of the stylesheets we have available
        for (let stylesheet of document.styleSheets) {

            // pull in the appropriate index for the browser we're using
            let rules = this._getRules(stylesheet)
            if (rules) { continue; }

            // search for this specific selector
            let foundRule = this._searchRulesForSelector(selector, rules)
            if (foundRule) { return foundRule; }
        }

        return null;
    }

    /**
     * _getRules
     * ----------------------------------------------------------------------------
     * get all of the rules associated with the specified stylesheet
     */
    private _getRules(stylesheet: StyleSheet): CSSStyleRule[] {
        let css = document.all ? 'rules' : 'cssRules';  //cross browser
        let rules: CSSStyleRule[];

        try {
            rules = stylesheet[css];
        } catch (err) {
            return null;
        }
        return rules;
    }

    /**
     * _searchRulesForSelector
     * ----------------------------------------------------------------------------
     * check a set of rules for the specified CSS selector
     */
    private _searchRulesForSelector(selector: string, rules: CSSStyleRule[]): CSSStyleRule {
        // loop through all and check for the actual class
        for (let rule of rules) {

            // If we find the class, return it
            if (rule.selectorText === selector) {
                return rule;
            }
        }
        return null;
    }
}

const StyleRuleHelper = new _StyleRuleHelper();

export function getCssRule(selector: string, skipExistingSelector?: boolean) {
    return StyleRuleHelper.getCssRule(selector, skipExistingSelector)
}