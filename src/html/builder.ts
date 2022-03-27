import { Builder } from '../entity/builder';
import { Token } from '../entity/token';

export class HtmlBuilder implements Builder {
  constructor(private tagMap: TagMap) {}

  build(token: Token): string {
    const tag = this.tagMap[token.type] || 'div';
    let result = '';
    for (const child of token.children) {
      const inner = this.build(child);
      result += inner;
    }
    return `<${tag}>${token.content}${result}</${tag}>`;
  }
}

export type TagMap = {
  [id in string]: string;
};
