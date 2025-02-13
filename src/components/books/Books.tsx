import React, { useCallback, useEffect, useMemo } from "react";

import classes from "./Books.module.scss";
import BookLoader from "./assets/images/book-loader.svg?react";

import { IBook } from "../../machines/booksMachine/books.types";

import { BookItem } from "./bookItem/BookItem";
import { Filters } from "../filters/Filters";
import { Pagination } from "../pagination/Pagination";

interface IBooksProps {
  booksState: any;
  sendToBooks: any;
}

export const Books: React.FC<IBooksProps> = (props) => {
  const { booksState, sendToBooks } = props;

  const onGetBooksClick = () => sendToBooks({ type: "FETCH" });

  const { error, loading, books, page, itemsPerPage, filters } =
    booksState.context;

  if (loading) return <BookLoader />;
  if (error !== "") return <p>{error}</p>;

  const filteredItems = useCallback(() => {

    //TODO: improve filter when category is a collection (array of strings)
    if (Object.keys(filters).length > 0 && books.length > 0) {
      const { category, value } = filters;
      if (category !== "") {
        const filteredItems = books.filter(
          (book: IBook) => book[category as keyof IBook] === value
        );
        return filteredItems;
      }
    }
  }, [filters, books]);

  const currentItems = useMemo(() => {
    if (books.length > 0) {
      const startIndex =
        page > 1 ? page * itemsPerPage - itemsPerPage : page - 1;
      const currentItemsTemp = books.slice(
        startIndex,
        startIndex + itemsPerPage
      );
      return currentItemsTemp;
    }
  }, [page, books]);

  return (
    <div className={classes.books}>
      <div className={classes.booksResultsHeader}>
        {books.length > 0 && <label>Found {books.length} books</label>}
        <button onClick={onGetBooksClick} title="Get books" value={"Get Books"}>
          Get Books
        </button>
      </div>

      {books.length > 0 ? (
        <>
          <Filters booksState={booksState} sendToBooks={sendToBooks} />
          <ul>
            {filteredItems()?.length > 0 ? 
            (
              filteredItems().map((book: IBook) => {
                return <BookItem key={book.id} book={book} />;
              })
             ) : 
            (
              currentItems.map((book: IBook) => {
              return <BookItem key={book.id} book={book} />;
            }))
          }
          
          </ul>
          <Pagination booksState={booksState} sendToBooks={sendToBooks} />
        </>
      ) : (
        <p>Sorry, no books were found</p>
      )}
    </div>
  );
};
