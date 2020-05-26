import { IModelTransform } from '../_shared';
import { shortDate, shortDateTime } from '@toolkip/primitive-helpers';

export const ShortDateTransform: IModelTransform<Date | string> = {
    incoming: (data: Date | string) => new Date(data.toString()),
    outgoing: (data: Date) => shortDate(data)
}

export const ShortDateTimeTransform: IModelTransform<Date | string> = {
    incoming: (data: Date | string) => new Date(data.toString()),
    outgoing: (data: Date) => shortDateTime(data)
}

export const DefaultDateTransform: IModelTransform<Date | string> = {
    incoming: (data: Date | string) => new Date(data.toString()),
    outgoing: (data: Date) => data.toString()
}
