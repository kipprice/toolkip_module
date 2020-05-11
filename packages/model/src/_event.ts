import { ModelEventPayload } from './_interfaces';
import { Model } from './_model';
import { CodeEvent } from '@toolkip/code-event';

export class ModelEvent<M> extends CodeEvent<ModelEventPayload<M>, Model<M>> { }