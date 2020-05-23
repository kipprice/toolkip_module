import { ModelEventPayload, IModel } from './_interfaces';
import { CodeEvent } from '@toolkip/code-event';

export class ModelEvent<M, K, X> 
    extends CodeEvent<ModelEventPayload<K, X>, IModel<M>> { }