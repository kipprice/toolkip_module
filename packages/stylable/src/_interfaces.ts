import { IStandardStyles } from '@kipprice/toolkip-styleHelpers";
import { _Stylable } from ".";


export interface ICreatedStyles {
    [key: string]: boolean;
}

export interface IStylableDependency {
    createStyles(uniqueKey?: string, styles?: IStandardStyles, forceOverride?: boolean);
    new?: (...addlArgs: any[]) => _Stylable;
    name: string;
}