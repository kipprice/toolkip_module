import { Trie } from "../trie"

describe('Trie', () => {
    it('adds appropriately', () => {
        const trie = new Trie();
        trie.add("and");
        expect(trie.exists("and")).toBeTruthy();
        
    });
    it('does not contain unfinished words', () => {
        const trie = new Trie();
        trie.add("and");
        expect(trie.exists("a")).toBeFalsy();
    });

    it('does not contain unadded words', () => {
        const trie = new Trie();
        trie.add("and");
        expect(trie.exists("babus")).toBeFalsy();
    })

    it('allows similar words', () => {
        const trie = new Trie();
        trie.add("and");
        trie.add("an");
        expect(trie.exists("an")).toBeTruthy();
        expect(trie.exists("and")).toBeTruthy();
    })

    it('removes words', () => {
        const trie = new Trie();
        trie.add("an");
        trie.add("and");
        expect(trie.exists("an")).toBeTruthy();
        trie.remove("an");
        expect(trie.exists("an")).toBeFalsy();
    })

    it('handles adding empty words', () => {
        const trie = new Trie();
        trie.add("");
        expect(trie.exists("")).toBeTruthy();
    })

    it("handles removing empt words", () => {
        const trie = new Trie();
        trie.add("");
        trie.remove("");
        expect(trie.exists("")).toBeFalsy();
    })

    it('can re-add words', () => {
        const trie = new Trie();
        trie.add("and");
        trie.add("and");
        expect(trie.exists("and")).toBeTruthy();
    })

    it('fails gracefully when removing unadded words', () => {
        const trie = new Trie();
        trie.add("and");
        trie.remove("babus");
        expect(trie.exists("and")).toBeTruthy();
        expect(trie.exists("babus")).toBeFalsy();
    })
})