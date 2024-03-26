export interface RichText {
  annotations: Annotations
  href: string | null
  plain_text: string
  text: Text
  type: string
  equation?: Equation
  code?: Code
}

export interface Equation {
  expression: string
}

export interface Code {
  caption: string
  language: string
  rich_text: RichText[]
}

export interface Text {
  content: string
  link: Link | null
}

export interface Link {
  url: string
}

export interface Annotations {
  bold: boolean
  code: boolean
  color: string
  italic: boolean
  strikethrough: boolean
  underline: boolean
}

export interface Block {
  object: string
  id: string
  parent: Parent
  created_time: string
  last_edited_time: string
  created_by: EditedBy
  last_edited_by: EditedBy
  has_children: boolean
  archived: boolean
  type: string
  paragraph?: BlockItem
  bulleted_list_item?: BlockItem
  numbered_list_item?: BlockItem
  heading_1?: BlockItem
  heading_2?: BlockItem
  heading_3?: BlockItem
  image?: Image
  equation?: Equation
  [key: string]: any
}

export interface Parent {
  type: string
  page_id: string
}

export interface EditedBy {
  object: string
  id: string
}

export interface BlockItem {
  rich_text: RichText[]
  is_toggleable?: boolean
  color: string
}

export interface Image {
  caption: string
  type: string
  file?: File
}

export interface File {
  url: string
  expiry_time: string
}
