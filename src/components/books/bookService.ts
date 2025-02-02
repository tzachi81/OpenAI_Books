import { IBook } from "../../machines/booksMachine/books.types";

export const filterByGivenProp = ((givenProp: string, value: string, data: IBook[]) => data.filter((book: any) => {
  const givenData = book[givenProp];
  return Array.isArray(givenData) ? givenData.includes(value) : givenData === value
})
);