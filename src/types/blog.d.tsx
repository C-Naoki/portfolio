export type Post = {
  id: string;
  last_edited_time: string;
  title: string;
  tags: Tag[];
  date: string;
  thumbnail: string | null;
  properties: any;
};

export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type TextItem = {
  type: string,
  plain_text: string,
  text: Text,
  equation: Equation | null,
}

export type Equation = {
  expression: string,
}

export type Text = {
  content: string,
  link: string | null,
}

export type Block = {
  object: string,
  id: string,
  type: string,
  [key: string]: any;
}

export type PostContent = {
  next_cursor: string | null,
  has_more: boolean,
  type: string,
  results: Block[],
}