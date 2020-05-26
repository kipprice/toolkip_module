import { IConstructor } from '@toolkip/object-helpers';
import { IModel, IModelTransform } from '../_shared/_interfaces';
import { DefaultDateTransform } from './dateTransforms';
import { MDate } from '../primitiveModels';

export const createModelTransform = <T>(ctor: IConstructor<IModel<T>>) => {
    return {
        incoming: (data: any) => new ctor(data) as any as T
    }
}

export const createModelDateTransform = (tx: IModelTransform<Date | string> = DefaultDateTransform) => {
    return {
        incoming: (data: any) => new MDate(data, { "_": tx } ) as any as Date,
    }
}