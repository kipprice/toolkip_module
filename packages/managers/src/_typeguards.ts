import { DataManager } from './dataManager';

export function isDataManager(test: any): test is DataManager<any> {
    return test instanceof DataManager;
}