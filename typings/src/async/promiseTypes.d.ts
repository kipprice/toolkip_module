/**
 * wait
 * ----------------------------------------------------------------------------
 * Set a timeout and resolve a promise when the timeout is done
 * @param   timeInMs    Time to wait before executing the
 */
export declare function wait(timeInMs: number): Promise<any>;
/**
 * onNextRender
 * ----------------------------------------------------------------------------
 * Run some code the next time the screen is rendering
 */
export declare function nextRender(): Promise<any>;
