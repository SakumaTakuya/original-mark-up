import { Token } from './token';

export interface Builder {
  build(token: Token): string;
}
