import React from 'react';

import classes from "./Books.module.scss";
import BookLoader from './assets/images/book-loader.svg?react';

import { IBook } from '../../machines/booksMachine/books.types';

import { BookItem } from "./bookItem/BookItem";
import { Filters } from '../filters/Filters';

interface IBooksProps {
  booksState: any,
  sendToBooks: any
}

export const Books: React.FC<IBooksProps> = (props) => {

  const {booksState, sendToBooks} = props;

  const onGetBooksClick = () => sendToBooks({ type: "FETCH" });

  const { error, loading, books } = booksState.context;

  if (loading) return <BookLoader/>;
  if (error !== '') return <p>{error}</p>;

  return (
    <>
      <>
        <button
          onClick={onGetBooksClick}
          title="Get books"
          value={"Get Books"}
        >
          Get Books
        </button>
        <code> powered by: https://www.freetestapi.com/apis/books</code>
      </>
      {books.length > 0 ? (

        <div className={classes.books}>
          <h2>Books ({books.length})</h2>
          <Filters booksState={booksState} sendToBooks={sendToBooks}/>
          <ul>
            {books.map((book: IBook) => {
              return <BookItem key={book.id} book={book} />;
            })}
          </ul>
        </div>
      ) : (
        <p>Sorry, no books were found</p>
      )}
    </>
  );
};
