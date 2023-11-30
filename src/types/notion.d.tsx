export type MultiSelectProperty = {
  name: string;
};

export type PageContent = {
  id: string;
  title: string;
  conf: MultiSelectProperty[];
  status: string;
  authors: MultiSelectProperty[];
  content: string;
};
