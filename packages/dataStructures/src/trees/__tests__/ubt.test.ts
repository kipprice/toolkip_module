import { BinaryTree } from "../binaryTree";

describe('Unbalanced Bianary Tree', () => {
    it('can add values', () => {
        const tree = new BinaryTree<number>(5);
        tree.add(4);
        expect(tree.getDepth()).toEqual(2);
        expect(tree.exists(4)).toBeTruthy()
    })

    it('updates depth', () => {
        const tree = new BinaryTree<number>(5);
        tree.add(4);
        tree.add(6);
        tree.add(3);
        tree.add(7);
        tree.add(8);

        expect(tree.getDepth()).toEqual(4);
    })
    it('is in order', () => {
        const tree = new BinaryTree<number>(5);
        tree.add(4);
        tree.add(6);
        tree.add(3);
        tree.add(7);
        tree.add(8);

        const expectedOutput = "5->(4->(3,_),6->(_,7->(_,8)))";
        expect(tree.exists(8)).toBeTruthy();
        expect(tree.toString()).toEqual(expectedOutput);
    })


    it('does not balance', () => {
        const tree = new BinaryTree<number>(1);
        tree.add(2);
        tree.add(3);
        
        expect(tree.isBalanced()).toBeFalsy();
        const expectedOutput = "1->(_,2->(_,3))"
        expect(tree.toString()).toEqual(expectedOutput);
    })

    it('is not complete', () => {
        const tree = new BinaryTree<number>(1);
        tree.add(2);
        tree.add(3);
        expect(tree.isComplete()).toBeFalsy();
    })

    it('calculates leaf node accurately', () => {
        const tree = new BinaryTree<number>(1);
        expect(tree.isLeafNode()).toBeTruthy();
        tree.add(2);
        tree.add(3);
        expect(tree.isLeafNode()).toBeFalsy();
    })

    it('calculates max', () => {
        const tree = new BinaryTree<number>(1);
        for (let i = 2; i < 10; i += 1) {
            tree.add(i);
        }
        expect(tree.max()).toEqual(9);
    })

    it('calculates min', () => {
        const tree = new BinaryTree<number>(10);
        for (let i = 9; i > 0; i -= 1) {
            tree.add(i);
        }
        expect(tree.min()).toEqual(1);
    })

    it('can remove nodes', () => {
        const tree = new BinaryTree<number>(5);
        tree.add(4);
        tree.add(6);
        tree.add(3);
        tree.add(7);
        tree.add(8);

        tree.remove(6);

        // TODO: uncomment when remove is written
        // expect(tree.getDepth()).toEqual(3);
        // const expectedOutput = "5->(4->(3,_),7->(_,8))"
        // expect(tree.toString()).toEqual(expectedOutput);
    })
});