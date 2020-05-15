import { HistoryChain } from "../history"

describe('HistoryChain', () => {
    it('keeps track of current state', () => {
        const chain = new HistoryChain<number>();
        chain.push(1);
        chain.push(2);
        chain.push(3);

        expect(chain.currentState).toEqual(3);
    })

    it('can return to previous states', () => {
        const chain = new HistoryChain<number>();
        chain.push(1);
        chain.push(2);
        chain.push(3);

        chain.navigateBack();
        expect(chain.currentState).toEqual(2);
        expect(chain.navigateBack()).toEqual(1);
    })

    it('can return to future states', () => {
        const chain = new HistoryChain<number>();
        chain.push(1);
        chain.push(2);
        chain.push(3);

        chain.navigateBack();
        chain.navigateBack();
        expect(chain.navigateForward()).toEqual(2);
        expect(chain.navigateForward()).toEqual(3);

    })

})