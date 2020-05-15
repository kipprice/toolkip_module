import { IModelTransform, IModel } from './_interfaces';
import { shortDate } from '@toolkip/primitive-helpers';
import { IConstructor } from '@toolkip/object-helpers';
import { Model } from './_model';

// helper for transforming strings into dates and vice versa
export const StringifiedDateTransform: IModelTransform<Date> = {
    incoming: (data: Date) => new Date(data.toString()),
    outgoing: (data: Date) => shortDate(data) as any as Date
}

export const generateModelTransform = <M extends IModel>(ctor: IConstructor<M>): IModelTransform<M> => {
    return {
        incoming: (data: M) => new ctor(data)
    }
}