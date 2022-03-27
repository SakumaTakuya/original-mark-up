import { Token, TokenParseStyle } from './token';

export interface Parser {
  parse(text: string): Token;
  styles: TokenParseStyle[];
}
