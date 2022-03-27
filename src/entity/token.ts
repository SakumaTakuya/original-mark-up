export type Token = {
  content: string;
  children: Token[];
  type: string;
};

export type TokenParseStyle = {
  match: RegExp;
  contentType: string;
  boxType: string;
};
