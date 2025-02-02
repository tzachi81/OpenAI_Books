import { IBook } from "../../machines/booksMachine/books.types";
import { Filter } from "./filter/Filter";
import classes from "./Filters.module.scss";

import React, { useCallback, useEffect, useMemo, useState } from "react";

interface IFiltersProps {
  booksState: any;
  sendToBooks: any;
}
interface IValidCategories {
  [key: string]: string[];
}

export const Filters: React.FC<IFiltersProps> = (props) => {
  const { booksState, sendToBooks } = props;

  const { books, filters } = booksState.context;

  useEffect(() => {
    console.log("books state", booksState.context);
  }, [booksState]);

  const validCategories: IValidCategories = {
    title: [],
    author: [],
    publication_year: [],
    genre: [],
  };

  const categoryLists = useMemo(() => {
    if (books.length > 0) {
      const validCategoriesKeys = Object.keys(validCategories);

      validCategoriesKeys.forEach((validCategory) => {
        books.forEach((book: any) => {
          const categoryItem = book[validCategory];

          const pushValidItem = (item: string) => {
            if (!validCategories[validCategory].includes(item)) {
              validCategories[validCategory].push(item);
            }
          };

          if (Array.isArray(categoryItem)) {
            categoryItem.forEach((item) => {
              pushValidItem(item);
            });
          } else {
            pushValidItem(categoryItem);
          }
        });
      });
    }
  }, [books, filters]);

  return (
    <>
      <h3>Filter</h3>
      <div className={classes.filters}>
        {Object.keys(validCategories).map((category) => (
          <Filter
            key={category}
            category={category}
            filterItems={validCategories[category]}
            booksState={booksState}
            sendToBooks={sendToBooks}
          />
        ))}
      </div>
    </>
  );
};
