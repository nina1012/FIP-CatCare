import { authHandlers } from './auth';
import { catHandlers } from './cat';

export const handlers = [...authHandlers, ...catHandlers];
