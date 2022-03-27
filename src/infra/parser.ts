import { lex, Scanner, TokenBase } from '@sakumatakuya/mark-up-base';
import { Parser } from '../entity/parser';
import { Token, TokenParseStyle } from '../entity/token';

export class MarkUpParser implements Parser {
  constructor(
    public styles: TokenParseStyle[],
    private space = '[ \\t]',
    private lineBreak = '[\\n\\r]'
  ) {}

  private getBoxType(token: TokenBase<TokenBase<Token>>): string {
    for (const t of this.styles) {
      if (token.content.match(t.match)) {
        return t.boxType;
      }
    }

    return '';
  }

  private parseContent(token: TokenBase<TokenBase<Token>>): Token[] {
    const result: Token[] = [];
    for (const t of this.styles) {
      const matches = [...token.content.matchAll(t.match)];
      if (matches.length > 0) {
        result.push(
          ...matches.map((match) => {
            return {
              content: '',
              children: this.parseInnerContent(match[1]),
              type: t.contentType,
            };
          })
        );
        break;
      }
    }

    result[result.length - 1].children = token.children as Token[];

    return result;
  }

  private parseInnerContent(text: string): Token[] {}

  parse(text: string): Token {
    const tokens = lex<Token>(
      text,
      new Scanner(this.space, this.lineBreak),
      this.transform
    );
    return {
      content: '',
      children: tokens,
      type: 'root',
    };
  }

  private transform(children: TokenBase<TokenBase<Token>>[]): Token {
    const newChildren: Token[] = [];
    for (const child of children) {
      newChildren.push(...this.parseContent(child));
    }

    return {
      content: '',
      children: newChildren,
      type: this.getBoxType(children[0]),
    };
  }
}
