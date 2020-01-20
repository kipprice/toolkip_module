import { Tree } from './tree';
import { IDictionary } from '../../objectHelpers/_interfaces';
/**----------------------------------------------------------------------------
 * @class	Trie
 * ----------------------------------------------------------------------------
 * Special form of tree that is really good at keeping track of words and
 * prefixes
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class Trie extends Tree<string> {
    protected _terminates: boolean;
    protected _subTrees: IDictionary<Trie>;
    add(word: string): void;
    protected _handleTerminatingWord(): void;
    protected _handleNonTerminatingWord(word: string): void;
    remove(word: string): void;
    exists(word: string): boolean;
    protected _splitWord(word: string): ISplitWord;
}
interface ISplitWord {
    firstChar: string;
    restOfWord: string;
}
export {};
