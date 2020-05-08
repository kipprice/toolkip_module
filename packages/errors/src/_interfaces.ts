export type ErrorType = 'error' | 'warning' | 'info';

export interface ErrorRenderer {
    error(details: any): boolean;
    warn(details: any): boolean;
    log(details: any): boolean;
}   