import { ModelEventPayload } from './_interfaces';
import { _Model } from '../abstractClasses/_model';
import { CodeEvent } from '@toolkip/code-event';

export class ModelEvent<M, K, X> 
    extends CodeEvent<ModelEventPayload<K, X>, _Model<M>> { }