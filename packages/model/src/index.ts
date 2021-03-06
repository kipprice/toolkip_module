export * from './_shared';
export * from './_typeguards';
export * from './abstractClasses';
export * from './primitiveModels';
export * from './objectModels';
export * from './arrayModels';
export * from './helpers';
export * from './transforms';

import { setupModelWrapping } from './helpers/modelFactory';
setupModelWrapping();