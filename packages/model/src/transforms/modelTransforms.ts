import { IConstructor } from '@toolkip/object-helpers';
import { IModel, IModelTransform } from '../_shared/_interfaces';
import { DefaultDateTransform } from './dateTransforms';
import { MDate } from '../primitiveModels';

export const createModelTransform = <X>(ctor: IConstructor<IModel<X>>) => {
    return {
        incoming: <K, T>(data: any, key: K, parentModel?: IModel<T>) => {
            const out = new ctor(data);
            if (parentModel) { 
                parentModel.addModelListener(out, key); 
            }
            return out as any as T;
        }
    }
}

export const createModelDateTransform = (tx: IModelTransform<Date | string> = DefaultDateTransform) => {
    return {
        incoming: <K, T>(data: any, key: K, parentModel?: IModel<T>) => {
            const out = new MDate(data, { "_": tx } ) 
            if (parentModel) { parentModel.addModelListener(out, key); }  
            return out as any as Date
        },
    }
}