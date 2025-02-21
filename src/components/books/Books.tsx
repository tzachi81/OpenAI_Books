import React, { useMemo } from "react";

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

  const { error, loading, books, page, itemsPerPage, filtered } =
    booksState.context;

  if (loading) return <BookLoader />;
  if (error !== "") return <p>{error}</p>;

  const collection: IBook[] = useMemo(() => {
    return filtered.length > 0 ? filtered : books;
  }, [filtered, books]);

  const currentItems: IBook[] = useMemo(() => {
    if (collection.length > 0) {
      const startIndex =
        page > 1 ? page * itemsPerPage - itemsPerPage : page - 1;
      const currentItemsTemp = collection.slice(
        startIndex,
        startIndex + itemsPerPage
      );
      return currentItemsTemp;
    }
    return [];
  }, [page, filtered, books]);

  return (
    <div className={classes.books}>
      <div className={classes.booksResultsHeader}>
        {collection.length > 0 && (
          <label>{`Found ${collection.length} book${
            collection.length > 1 ? "s" : ""
          }`}</label>
        )}
        <button onClick={onGetBooksClick} title="Get books" value={"Get Books"}>
          Get Books
        </button>
      </div>

      {collection.length > 0 ? (
        <>
          <Filters booksState={booksState} sendToBooks={sendToBooks} />
          <ul>
            {currentItems.length > 0 &&
              currentItems.map((book: IBook) => {
                return <BookItem key={book.id} book={book} />;
              })}
          </ul>
          {collection.length > itemsPerPage && (
            <Pagination
              booksState={booksState}
              collection={collection}
              sendToBooks={sendToBooks}
            />
          )}
        </>
      ) : (
        <p>Sorry, no books were found</p>
      )}
    </div>
  );
};
