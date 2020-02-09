import { IStandardStyles } from "../styleHelpers";
import { Stylable } from ".";


export interface ICreatedStyles {
    [key: string]: boolean;
}

export interface IStylableDependency {
    createStyles(uniqueKey?: string, styles?: IStandardStyles, forceOverride?: boolean);
    new?: (...addlArgs: any[]) => Stylable;
}