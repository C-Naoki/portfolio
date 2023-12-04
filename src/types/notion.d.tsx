export type RichText = {
  annotations: Annotations,
  href: string | null,
  plain_text: string,
  text: Text,
  type: string,
  equation?: Equation,
}

export type Equation = {
  expression: string,
}

export type Text = {
  content: string,
  link: Link | null,
}

export type Link = {
  url: string,
}

export type Annotations = {
  bold: boolean,
  code: boolean,
  color: string,
  italic: boolean,
  strikethrough: boolean,
  underline: boolean,
}

export type Block = {
  object: string,
  id: string,
  parent: Parent,
  created_time: string,
  last_edited_time: string,
  created_by: EditedBy,
  last_edited_by: EditedBy,
  has_children: boolean,
  archived: boolean,
  type: string,
  paragraph?: BlockItem,
  bulleted_list_item?: BlockItem,
  numbered_list_item?: BlockItem,
  heading_1?: BlockItem,
  heading_2?: BlockItem,
  heading_3?: BlockItem,
  image?: Image,
  equation?: Equation,
  [key: string]: any;
}

export type Parent = {
  type: string,
  page_id: string,
}

export type EditedBy = {
  object: string,
  id: string,
}

export type BlockItem = {
  rich_text: RichText[],
  is_toggleable?: boolean,
  color: string,
}

export type Image = {
  caption: string,
  type: string,
  file?: File,
}

export type File = {
  url: string,
  expiry_time: string,
}
