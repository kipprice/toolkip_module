import { wait } from '..';

describe('testing async wait', () => {

    it('tests standard settimeout', async () => {
        return new Promise((resolve, reject) => {
            let start = +(new Date());
            window.setTimeout(() => {
                let end = +(new Date());
                expect(end - start).toBeGreaterThanOrEqual(1000);
                resolve();
            }, 1000)
        });
    })

    it('waits one second', async () => {
        expect.assertions(1);
        let startTime = +(new Date());
        await wait(1000);
        let endTime = +(new Date());
        expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
    });

    it('chains to hit three seconds', async () => {
        expect.assertions(4);

        let globalStartTime = +(new Date());
        let globalEndTime: number;;

        for (let i = 0; i < 3; i += 1) {
            let startTime = +(new Date());
            await wait(1000);

            let endTime = +(new Date());
            globalEndTime = endTime;

            let diff = endTime - startTime;
            expect(diff).toBeGreaterThanOrEqual(1000);
        }

        let diff = (globalEndTime - globalStartTime);
        expect(diff).toBeGreaterThanOrEqual(3000);
    });
})