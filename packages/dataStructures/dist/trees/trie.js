"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
const tree_1 = require("./tree");
/**----------------------------------------------------------------------------
 * @class	Trie
 * ----------------------------------------------------------------------------
 * Special form of tree that is really good at keeping track of words and
 * prefixes
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class Trie extends tree_1._Tree {
    //#endregion
    //.....................
    //..........................................
    //#region HANDLE ADDING WORDS
    add(word) {
        if (word.length === 0) {
            this._handleTerminatingWord();
        }
        else {
            this._handleNonTerminatingWord(word);
        }
    }
    _handleTerminatingWord() {
        this._terminates = true;
    }
    _handleNonTerminatingWord(word) {
        let splitWord = this._splitWord(word);
        if (!this._subTrees[splitWord.firstChar]) {
            this._subTrees[splitWord.firstChar] = new Trie(splitWord.firstChar);
        }
        this._subTrees[splitWord.firstChar].add(splitWord.restOfWord);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region REMOVE A WORD
    remove(word) {
        if (word.length === 0) {
            this._terminates = false;
        }
        else {
            let splitWord = this._splitWord(word);
            if (!this._subTrees[splitWord.firstChar]) {
                return;
            }
            this._subTrees[splitWord.firstChar].remove(splitWord.restOfWord);
        }
    }
    //#endregion
    //..........................................
    //..........................................
    //#region HANDLE FINDING A WORD
    exists(word) {
        if (word.length === 0) {
            return this._terminates;
        }
        let splitWord = this._splitWord(word);
        if (!this._subTrees[splitWord.firstChar]) {
            return false;
        }
        return this._subTrees[splitWord.firstChar].exists(splitWord.restOfWord);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region HELPERS
    _splitWord(word) {
        return {
            firstChar: word.charAt(0),
            restOfWord: toolkip_primitive_helpers_1.rest(word, 1)
        };
    }
}
exports.Trie = Trie;
//#endregion
//..........................................
