import { trim } from '@toolkip/primitive-helpers';
import { IKeyValPair } from '@toolkip/object-helpers';
import { StandardElement, DrawableElement, isDrawable, IDrawable } from '@toolkip/shared-types';
import { TypedClassDefinition } from './_interfaces';

/**
 * addClass
 * ----------------------------------------------------------------------------
 * Allows a user to safely add a CSS class to an element's existing list of CSS classes
 * @param   elem      The element that should have its class updated
 * @param   newClass  The class to add the element
 * 
 * @returns the provided element
 */
export function addClass(elem: DrawableElement, newClass: string): DrawableElement {
  let cls: string;
  let e: StandardElement;

  if (!elem || !newClass) return;

  // Handle Drawables being passed in
  if (isDrawable(elem)) {
    e = elem.base;
  } else {
    e = elem as StandardElement;
  }

  // Still suport setting the class if the class is not originally set
  cls = e.getAttribute("class");
  if (!cls) {
    e.setAttribute("class", newClass);
    return;
  }

  cls = " " + cls + " ";

  if (cls.indexOf(" " + newClass + " ") === -1) {
    cls = cls + newClass;
    e.setAttribute("class", trim(cls));
  }

  return elem;
};

/**
 * removeClass
 * ----------------------------------------------------------------------------
 * Allows a user to safely remove a CSS class to an element's existing list of 
 * CSS classes
 * 
 * @param   elem      The element that should have its class updated
 * @param   newClass  The class to remove from the element
 * 
 * @returns the provided element
 */
export function removeClass(elem: DrawableElement, oldClass: string): DrawableElement {
  ;
  let cls: string;
  let len: number;
  let e: StandardElement;

  // Quit if we're missing something
  if (!elem || !oldClass) return;

  // Handle Drawables being passed in
  if (isDrawable(elem)) {
    e = elem.base;
  } else {
    e = elem as StandardElement;
  }

  // Pull out the CSS class
  cls = " " + e.getAttribute("class") + " ";
  len = cls.length;
  cls = cls.replace(" " + oldClass + " ", " ");

  // Only reset the class attribute if it actually changed
  if (cls.length !== len) {
    e.setAttribute("class", trim(cls));
  }

  return elem;

};

/**
 * addOrRemoveClass
 * ----------------------------------------------------------------------------
 * handle selection-state style decisions where we will want to add or remove
 * a particular class based on the result of a particular evaluation
 * 
 * @param   elem      the element to update classes on
 * @param   clsName   the name of the class to add or remove
 * @param   shouldAdd if true, adds the class instead of removing
 * 
 * @returns the element that was updated
 */
export function addOrRemoveClass(elem: DrawableElement, clsName: string, shouldAdd: boolean): DrawableElement {
  if (shouldAdd) {
    addClass(elem, clsName);
  } else {
    removeClass(elem, clsName);
  }
  return elem;
}

/**
 * hasClass
 * ----------------------------------------------------------------------------
 * Checks whether a provided HTML element has a CSS class applied
 * 
 * @param   elem  The element to check
 * @param   cls   The CSS class to check for
 * 
 * @returns True if the element has the CSS class applied; false otherwise
 */
export function hasClass(elem: HTMLElement | IDrawable, cls: string): boolean {
  let e: DrawableElement;
  let cur_cls: string;

  if (!elem) return;

  // Handle Drawables being passed in
  if (isDrawable(elem)) {
    e = elem.base;
  } else {
    e = elem;
  }

  // Grab the current CSS class and check if the passed-in class is present
  cur_cls = " " + (e as StandardElement).getAttribute("class") + " ";
  if (cur_cls.indexOf(" " + cls + " ") === -1) {
    return false;
  }

  return true;
};

export function clearClass(elem: DrawableElement): void {
  if (!elem) { return; }
  let e: DrawableElement;
  if (isDrawable(elem)) {
    e = elem.base;
  } else {
    e = elem;
  }
  e.setAttribute("class", "");
}

/**
 * setProperty
 * ----------------------------------------------------------------------------
 * Sets the CSS definition for a given class and attribute.
 *
 * @param {string} cls   - The class to change
 * @param {string} item  - The attribute within the class to update
 * @param {string} val   - The new value to set the attribute to
 * @param {bool} force   - If true, will create the CSS attribute even if it doesn't exist
 *
 * @return {bool} True if the CSS was successfully set, false otherwise
 */
export function setProperty(cls: string, item: string, val: string, force?: boolean): boolean {
  let i: number;
  let css: string;
  let sIdx: number;
  let rules: CSSRuleList;
  let rule: CSSStyleRule;

  // Loop through all of the stylesheets we have available
  for (sIdx = 0; sIdx < document.styleSheets.length; sIdx += 1) {

    // Pull in the appropriate index for the browser we're using
    css = document.all ? 'rules' : 'cssRules';  //cross browser
    rules = document.styleSheets[sIdx][css];

    // If we have rules to loop over...
    if (rules) {

      // ... loop through them and check if they are the class we are looking for
      for (i = 0; i < rules.length; i += 1) {
        rule = (<CSSStyleRule>rules[i]);

        // If we have a match on the class...
        if (rule.selectorText === cls) {

          // ... and the class has the item we're looking for ...
          if ((rule.style[item]) || (force)) {

            //... set it to our new value, and return true.
            rule.style[item] = val;
            return true;
          }
        }
      }
    }
  }

  // Return false if we didn't change anything
  return false;
};

/**
 * getProperty
 * ----------------------------------------------------------------------------
 * Grabs the value of a given CSS class's attribute
 *
 * @param {string} cls  - The CSS class to look within
 * @param {string} item - The attribute we want to grab the value for
 *
 * @return {string} The value of that particular CSS class's attribute
 */
export function getProperty(cls, item) {
  let i: number;
  let css: string;
  let sIdx: number;
  let rules: CSSRuleList;
  let rule: CSSStyleRule;

  // Loop through all of the stylesheets we have available
  for (sIdx = 0; sIdx < document.styleSheets.length; sIdx += 1) {

    // Pull in the appropriate index for the browser we're using
    css = document.all ? 'rules' : 'cssRules';  //cross browser
    rules = document.styleSheets[sIdx][css];

    // If we have an index...
    if (rules) {
      // ... loop through all and check for the actual class
      for (i = 0; i < rules.length; i += 1) {

        rule = (<CSSStyleRule>rules[i]);

        // If we find the class...
        if (rule.selectorText === cls) {

          // ... return what the item is set to (if anything)
          return (rule.style[item]);
        }
      }
    }
  }

  // Return a blank string if it couldn't be found
  return "";
};

/**
 * _old_CreateClass
 * ----------------------------------------------------------------------------
 * @deprecated
 * Creates a CSS class and adds it to the style of the document
 * @param  {string}      selector   CSS selector to use to define what elements get this style
 * @param  {any}         attr       Array of css attributes that should be applied to the class
 * @param  {boolean}     [noAppend] True if we shouldn't actually add the class to the documment yet
 * @return {HTMLElement}            The CSS style tag that was created
 */
function _old_CreateClass(selector: string, attr: TypedClassDefinition | IKeyValPair<string>[], noAppend?: boolean): HTMLStyleElement {
  //TODO: verify this can be removed entirely
  let cls: HTMLElement;
  let a: string;
  let styles: HTMLCollectionOf<HTMLStyleElement>;

  // Grab the style node of this document (or create it if it doesn't exist)
  styles = document.getElementsByTagName("style");
  if (noAppend || styles.length > 0) {
    cls = (<HTMLElement>styles[0]);
  } else {
    cls = document.createElement("style");
    cls.innerHTML = "";
  }

  // Loop through the attributes we were passed in to create the class
  cls.innerHTML += "\n" + selector + " {\n";
  for (a in attr) {
    if (attr.hasOwnProperty(a)) {
      if ((attr[a] as IKeyValPair<string>).key) {
        cls.innerHTML += "\t" + (attr[a] as IKeyValPair<string>).key + ": " + (attr[a] as IKeyValPair<string>).val + ";\n";
      } else {
        cls.innerHTML += "\t" + a + " : " + attr[a] + ";\n";
      }
    }
  }
  cls.innerHTML += "\n}";

  // Append the class to the head of the document
  if (!noAppend) { document.head.appendChild(cls); }

  // Return the style node
  return cls as HTMLStyleElement;
}

/**
 * getComputedStyle
 * ----------------------------------------------------------------------------
 * Gets the computed style of a given element
 *
 * @param {HTMLElement} elem - The element we are getting the style of
 * @param {string} attr - If passed in, the attribute to grab from the element's style
 *
 * @return {string} Either the particular value for the passed in attribute, or the whole style array.
 */
export function getComputedStyle(elem: IDrawable | HTMLElement, attr: string): CSSStyleDeclaration | string {
  let style: CSSStyleDeclaration;
  let e: Element;

  // Handle Drawables being passed in
  if (isDrawable(elem)) {
    e = elem.base;
  } else {
    e = elem;
  }

  // Use the library function on the window first
  if (window.getComputedStyle) {
    style = window.getComputedStyle(e);

    if (attr) {
      return style.getPropertyValue(attr);
    } else {
      return style;
    }

    // If that doesn't work, maybe it's through the currentStyle property
  } else if ((<any>e).currentStyle) {
    style = (<any>e).currentStyle;

    if (attr) {
      return style[attr];
    } else {
      return style;
    }
  }

  return null;
}
