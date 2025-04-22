export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ListPaginated {
  items: Array<User >;
  pages: number;
  currentPage: number;
  itemsPage: number;
  totalItems: number;
}
