export interface IBooksContext {
  books: IBook[],
  filtered: IBook[],
  page: number,
  itemsPerPage: number,
  filters: IFilter,
  error: string,
  loading: boolean
}

export interface IFilter{
  category: string,
    value: string
}
export interface IBook {
  id: number,
  title: string,
  author: string,
  publication_year: number,
  genre: string[],
  description: string,
  cover_image: string,
}

export type TBooksEvents = 'FETCH' | 'DEACTIVATE' | 'UPDATE_FILTERS' | 'FIRST' | 'LAST' | 'PREVIOUS' | 'NEXT';

export interface IBooksEvents{
  type: keyof TBooksEvents,
  payload?: any
}