export * from './_shared';
export * from './abstractClasses';
export * from './primitiveModels';
export * from './objectModels';
export * from './arrayModels';
export * from './helpers';

import { setupModelWrapping } from './helpers/modelFactory';
setupModelWrapping();